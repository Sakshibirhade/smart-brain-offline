import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Settings, PlusCircle, Edit, Trash2, DollarSign, Users } from "lucide-react";
import type { ParkingSlot, Booking, Payment } from "@/types/parking";

export default function AdminDashboard() {
  const [slots, setSlots] = useState<ParkingSlot[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [slotNumber, setSlotNumber] = useState("");
  const [slotType, setSlotType] = useState<string>("two_wheeler");
  const [floorLevel, setFloorLevel] = useState("");
  const [distance, setDistance] = useState("");
  const [landmarks, setLandmarks] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSlots();
    fetchBookings();
    fetchPayments();
  }, []);

  const fetchSlots = async () => {
    try {
      const { data, error } = await supabase
        .from("parking_slots")
        .select("*")
        .order("floor_level", { ascending: true });

      if (error) throw error;
      setSlots(data || []);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("*, vehicles(*), parking_slots(*)")
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchPayments = async () => {
    try {
      const { data, error } = await supabase
        .from("payments")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) throw error;
      setPayments(data || []);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addSlot = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.from("parking_slots").insert({
        slot_number: slotNumber,
        slot_type: slotType as 'two_wheeler' | 'four_wheeler' | 'ev_charging',
        floor_level: parseInt(floorLevel),
        distance_to_entry: parseInt(distance),
        nearby_landmarks: landmarks,
        status: "available",
      });

      if (error) throw error;

      toast({ title: "Slot Added", description: "New parking slot created" });
      setSlotNumber("");
      setFloorLevel("");
      setDistance("");
      setLandmarks("");
      setOpen(false);
      fetchSlots();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const deleteSlot = async (id: string) => {
    try {
      const { error } = await supabase
        .from("parking_slots")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({ title: "Slot Deleted" });
      fetchSlots();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const updateSlotStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from("parking_slots")
        .update({ status: status as 'available' | 'occupied' | 'reserved' | 'maintenance' })
        .eq("id", id);

      if (error) throw error;

      toast({ title: "Status Updated" });
      fetchSlots();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  return (
    <Layout>
      <div className="space-y-6 pb-20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Settings className="w-8 h-8" />
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">Manage parking operations</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Total Slots</p>
                <p className="text-3xl font-bold">{slots.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-3xl font-bold text-green-500">
                  {slots.filter(s => s.status === "occupied").length}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Revenue</p>
                <p className="text-3xl font-bold">
                  ₹{payments.reduce((sum, p) => sum + Number(p.amount), 0)}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="slots">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="slots">Slots</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          <TabsContent value="slots" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Parking Slots</h2>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Add Slot
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Slot</DialogTitle>
                    <DialogDescription>Create a new parking slot</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Slot Number</Label>
                      <Input value={slotNumber} onChange={(e) => setSlotNumber(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Type</Label>
                      <Select value={slotType} onValueChange={setSlotType}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="two_wheeler">2-Wheeler</SelectItem>
                          <SelectItem value="four_wheeler">4-Wheeler</SelectItem>
                          <SelectItem value="ev_charging">EV Charging</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Floor</Label>
                        <Input type="number" value={floorLevel} onChange={(e) => setFloorLevel(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Distance (m)</Label>
                        <Input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Landmarks</Label>
                      <Input value={landmarks} onChange={(e) => setLandmarks(e.target.value)} />
                    </div>
                    <Button onClick={addSlot} disabled={loading} className="w-full">
                      {loading ? "Adding..." : "Add Slot"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-3">
              {slots.map((slot) => (
                <Card key={slot.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold">Slot {slot.slot_number}</h3>
                          <Badge variant={slot.status === "available" ? "default" : "secondary"}>
                            {slot.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Floor {slot.floor_level} • {slot.slot_type}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Select
                          value={slot.status}
                          onValueChange={(val) => updateSlotStatus(slot.id, val)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="available">Available</SelectItem>
                            <SelectItem value="occupied">Occupied</SelectItem>
                            <SelectItem value="reserved">Reserved</SelectItem>
                            <SelectItem value="maintenance">Maintenance</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteSlot(slot.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-4">
            <h2 className="text-xl font-semibold">Recent Bookings</h2>
            <div className="grid gap-3">
              {bookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">
                          {booking.vehicles?.vehicle_number}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Slot {booking.parking_slots?.slot_number} • Floor {booking.parking_slots?.floor_level}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(booking.booking_date + " " + booking.booking_time).toLocaleString()}
                        </p>
                      </div>
                      <Badge>{booking.booking_status}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="payments" className="space-y-4">
            <h2 className="text-xl font-semibold">Payment History</h2>
            <div className="grid gap-3">
              {payments.map((payment) => (
                <Card key={payment.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">₹{payment.amount}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(payment.created_at).toLocaleString()}
                        </p>
                      </div>
                      <Badge variant={payment.payment_status === "completed" ? "default" : "secondary"}>
                        {payment.payment_status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
