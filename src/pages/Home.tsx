import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Car, MapPin, Clock, TrendingUp } from "lucide-react";
import type { Booking } from "@/types/parking";

export default function Home() {
  const navigate = useNavigate();
  const [activeBooking, setActiveBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActiveBooking();
  }, []);

  const fetchActiveBooking = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("bookings")
        .select(`
          *,
          vehicles(*),
          parking_slots(*)
        `)
        .eq("user_id", user.id)
        .in("booking_status", ["pending", "active"])
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      setActiveBooking(data);
    } catch (error) {
      console.error("Error fetching booking:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-6 pb-20">
        <div>
          <h1 className="text-3xl font-bold">Welcome Back!</h1>
          <p className="text-muted-foreground">Manage your parking with ease</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Car className="w-4 h-4 text-primary" />
                Active Parking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{activeBooking ? "1" : "0"}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">0</p>
            </CardContent>
          </Card>
        </div>

        {/* Active Booking Card */}
        {activeBooking && (
          <Card className="border-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Active Booking
              </CardTitle>
              <CardDescription>
                Slot {activeBooking.parking_slots?.slot_number} • Floor {activeBooking.parking_slots?.floor_level}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Car className="w-4 h-4" />
                <span>{activeBooking.vehicles?.vehicle_number}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4" />
                <span>
                  {new Date(activeBooking.booking_date + " " + activeBooking.booking_time).toLocaleString()}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  className="flex-1"
                  onClick={() => navigate("/track-car")}
                >
                  View Location
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/scan")}
                >
                  Exit
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Quick Actions</h2>
          <div className="grid gap-3">
            <Card 
              className="cursor-pointer hover:border-primary transition-colors"
              onClick={() => navigate("/book-slot")}
            >
              <CardContent className="flex items-center gap-4 p-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Car className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Book a Slot</h3>
                  <p className="text-sm text-muted-foreground">Find and reserve parking</p>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:border-primary transition-colors"
              onClick={() => navigate("/scan")}
            >
              <CardContent className="flex items-center gap-4 p-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Scan QR Code</h3>
                  <p className="text-sm text-muted-foreground">Entry or exit parking</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
