import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { WeatherAlert } from "@/components/WeatherAlert";
import { LateArrivalTimer } from "@/components/LateArrivalTimer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Car, MapPin, Navigation, Zap } from "lucide-react";
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
  const [showTimer, setShowTimer] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

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
      
      // Auto-select default vehicle if exists
      const defaultVehicle = data?.find(v => v.is_default);
      if (defaultVehicle) {
        setSelectedVehicle(defaultVehicle.id);
      }
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  const handleBooking = async () => {
    if (!selectedSlot || !selectedVehicle || !bookingDate || !bookingTime) {
      toast({
        title: t("missingInfo"),
        description: t("fillAllFields"),
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const qrCode = `SMARTPARK-${Date.now()}-${otp}`;

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

      await supabase
        .from("parking_slots")
        .update({ status: "reserved" })
        .eq("id", selectedSlot);

      toast({
        title: t("bookingSuccess"),
        description: t("otpMessage", { otp }),
      });

      setShowTimer(true);
      setSelectedSlot("");
      setSelectedVehicle("");
      setBookingDate("");
      setBookingTime("");
      fetchSlots();
    } catch (error: any) {
      toast({
        title: t("bookingFailed"),
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getSlotIcon = (type: string) => {
    switch (type) {
      case "two_wheeler": return <Car className="w-4 h-4" />;
      case "four_wheeler": return <Car className="w-5 h-5" />;
      case "ev_charging": return <Zap className="w-4 h-4" />;
      default: return <Car className="w-4 h-4" />;
    }
  };

  const getSlotTypeLabel = (type: string) => {
    switch (type) {
      case "two_wheeler": return t("twoWheeler");
      case "four_wheeler": return t("fourWheeler");
      case "ev_charging": return t("evCharging");
      default: return type;
    }
  };

  return (
    <Layout>
      <div className="space-y-6 pb-20">
        <div className="bg-gradient-hero p-6 rounded-2xl">
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {t("bookSlot")}
          </h1>
          <p className="text-muted-foreground mt-1">{t("reserveSpace")}</p>
        </div>

        <WeatherAlert />

        {showTimer && bookingDate && bookingTime && (
          <LateArrivalTimer
            bookingDate={bookingDate}
            bookingTime={bookingTime}
            penaltyAmount={100}
          />
        )}

        {/* Filter */}
        <div className="space-y-2">
          <Label className="text-base font-semibold">{t("filterByType")}</Label>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="bg-card shadow-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("allTypes")}</SelectItem>
              <SelectItem value="two_wheeler">{t("twoWheeler")}</SelectItem>
              <SelectItem value="four_wheeler">{t("fourWheeler")}</SelectItem>
              <SelectItem value="ev_charging">{t("evCharging")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Booking Form */}
        <Card className="shadow-md border-2">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
            <CardTitle>{t("bookingDetails")}</CardTitle>
            <CardDescription>{t("fillDetails")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label className="text-base font-semibold">{t("selectVehicle")}</Label>
              <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder={t("chooseVehicle")} />
                </SelectTrigger>
                <SelectContent>
                  {vehicles.map((vehicle) => (
                    <SelectItem key={vehicle.id} value={vehicle.id}>
                      <div className="flex items-center gap-2">
                        <Car className="w-4 h-4" />
                        {vehicle.vehicle_number}
                        {vehicle.is_default && (
                          <Badge variant="secondary" className="ml-2">Default</Badge>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-base font-semibold">{t("date")}</Label>
                <Input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-base font-semibold">{t("time")}</Label>
                <Input
                  type="time"
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  className="bg-background"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Slots */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            {t("availableSlots")} ({slots.length})
          </h2>
          <div className="grid gap-3">
            {slots.map((slot) => (
              <Card
                key={slot.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedSlot === slot.id
                    ? "border-primary ring-2 ring-primary/20 shadow-glow bg-gradient-to-r from-primary/5 to-accent/5"
                    : "hover:border-primary/50 shadow-sm"
                }`}
                onClick={() => setSelectedSlot(slot.id)}
              >
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${selectedSlot === slot.id ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                        {getSlotIcon(slot.slot_type)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">
                          Slot {slot.slot_number}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {t("floor")} {slot.floor_level}
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-gradient-primary">
                      {getSlotTypeLabel(slot.slot_type)}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{slot.distance_to_entry}m {t("fromEntry")}</span>
                    </div>
                    {slot.nearby_landmarks && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Navigation className="w-4 h-4" />
                        <span>{slot.nearby_landmarks}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Button
          className="w-full bg-gradient-primary shadow-lg hover:shadow-glow transition-all duration-300"
          size="lg"
          onClick={handleBooking}
          disabled={loading || !selectedSlot || !selectedVehicle}
        >
          {loading ? t("booking") : t("confirmBooking")}
        </Button>
      </div>
    </Layout>
  );
}
