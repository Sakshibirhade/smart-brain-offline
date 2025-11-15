import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Car, MapPin, Navigation } from "lucide-react";
import type { ParkingSlot, Vehicle } from "@/types/parking";

export default function BookSlot() {
  const [slots, setSlots] = useState<ParkingSlot[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [selectedVehicle, setSelectedVehicle] = useState<string>("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSlots();
    fetchVehicles();
  }, [filterType]);

  const fetchSlots = async () => {
    try {
      let query = supabase
        .from("parking_slots")
        .select("*")
        .eq("status", "available")
        .order("floor_level", { ascending: true });

      if (filterType !== "all") {
        query = query.eq("slot_type", filterType as 'two_wheeler' | 'four_wheeler' | 'ev_charging');
      }

      const { data, error } = await query;
      if (error) throw error;
      setSlots(data || []);
    } catch (error) {
      console.error("Error fetching slots:", error);
    }
  };

  const fetchVehicles = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .eq("user_id", user.id);

      if (error) throw error;
      setVehicles(data || []);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  const handleBooking = async () => {
    if (!selectedSlot || !selectedVehicle || !bookingDate || !bookingTime) {
      toast({
        title: "Missing Information",
        description: "Please fill all fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Generate OTP and QR code
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const qrCode = `SMARTPARK-${Date.now()}-${otp}`;

      // Create booking
      const { error: bookingError } = await supabase
        .from("bookings")
        .insert({
          user_id: user.id,
          vehicle_id: selectedVehicle,
          slot_id: selectedSlot,
          booking_date: bookingDate,
          booking_time: bookingTime,
          otp_code: otp,
          qr_code: qrCode,
          booking_status: "pending",
        });

      if (bookingError) throw bookingError;

      // Update slot status
      await supabase
        .from("parking_slots")
        .update({ status: "reserved" })
        .eq("id", selectedSlot);

      toast({
        title: "Booking Successful!",
        description: `Your OTP is: ${otp}. Save your QR code for entry.`,
      });

      // Reset form
      setSelectedSlot("");
      setSelectedVehicle("");
      setBookingDate("");
      setBookingTime("");
      fetchSlots();
    } catch (error: any) {
      toast({
        title: "Booking Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getSlotTypeLabel = (type: string) => {
    switch (type) {
      case "two_wheeler": return "2-Wheeler";
      case "four_wheeler": return "4-Wheeler";
      case "ev_charging": return "EV Charging";
      default: return type;
    }
  };

  return (
    <Layout>
      <div className="space-y-6 pb-20">
        <div>
          <h1 className="text-3xl font-bold">Book a Slot</h1>
          <p className="text-muted-foreground">Reserve your parking space</p>
        </div>

        {/* Filter */}
        <div className="space-y-2">
          <Label>Filter by Type</Label>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="two_wheeler">2-Wheeler</SelectItem>
              <SelectItem value="four_wheeler">4-Wheeler</SelectItem>
              <SelectItem value="ev_charging">EV Charging</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Booking Form */}
        <Card>
          <CardHeader>
            <CardTitle>Booking Details</CardTitle>
            <CardDescription>Fill in your parking details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Select Vehicle</Label>
              <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a vehicle" />
                </SelectTrigger>
                <SelectContent>
                  {vehicles.map((vehicle) => (
                    <SelectItem key={vehicle.id} value={vehicle.id}>
                      {vehicle.vehicle_number}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <Input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div className="space-y-2">
                <Label>Time</Label>
                <Input
                  type="time"
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Slots */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">
            Available Slots ({slots.length})
          </h2>
          <div className="grid gap-3">
            {slots.map((slot) => (
              <Card
                key={slot.id}
                className={`cursor-pointer transition-all ${
                  selectedSlot === slot.id
                    ? "border-primary ring-2 ring-primary/20"
                    : "hover:border-primary/50"
                }`}
                onClick={() => setSelectedSlot(slot.id)}
              >
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">
                        Slot {slot.slot_number}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Floor {slot.floor_level}
                      </p>
                    </div>
                    <Badge>{getSlotTypeLabel(slot.slot_type)}</Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{slot.distance_to_entry}m from entry</span>
                    </div>
                    {slot.nearby_landmarks && (
                      <div className="flex items-center gap-2">
                        <Navigation className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {slot.nearby_landmarks}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Button
          className="w-full"
          size="lg"
          onClick={handleBooking}
          disabled={loading || !selectedSlot || !selectedVehicle}
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </Button>
      </div>
    </Layout>
  );
}
