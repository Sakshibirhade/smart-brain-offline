import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, Navigation, Car } from "lucide-react";
import type { ParkingHistory } from "@/types/parking";

export default function TrackCar() {
  const [history, setHistory] = useState<ParkingHistory[]>([]);
  const [activeParking, setActiveParking] = useState<ParkingHistory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchParkingHistory();
  }, []);

  const fetchParkingHistory = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("parking_history")
        .select(`
          *,
          parking_slots(*),
          bookings(*)
        `)
        .eq("user_id", user.id)
        .order("parked_at", { ascending: false });

      if (error) throw error;

      setHistory(data || []);
      const active = data?.find((h) => !h.retrieved_at);
      setActiveParking(active || null);
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-6 pb-20">
        <div>
          <h1 className="text-3xl font-bold">Track My Car</h1>
          <p className="text-muted-foreground">Find your parked vehicle</p>
        </div>

        {activeParking ? (
          <Card className="border-primary">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Car className="w-5 h-5 text-primary" />
                    Current Location
                  </CardTitle>
                  <CardDescription>Your car is parked here</CardDescription>
                </div>
                <Badge className="bg-green-500">Active</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Slot Number</p>
                  <p className="text-2xl font-bold">
                    {activeParking.parking_slots?.slot_number}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Floor Level</p>
                  <p className="text-2xl font-bold">
                    {activeParking.floor_level}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>
                    {activeParking.parking_slots?.distance_to_entry}m from entry
                  </span>
                </div>
                {activeParking.parking_slots?.nearby_landmarks && (
                  <div className="flex items-center gap-2 text-sm">
                    <Navigation className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Near: {activeParking.parking_slots.nearby_landmarks}
                    </span>
                  </div>
                )}
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Directions</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Take elevator to Floor {activeParking.floor_level}</li>
                  <li>Turn right from elevator</li>
                  <li>
                    Walk towards {activeParking.parking_slots?.nearby_landmarks}
                  </li>
                  <li>
                    Your car is at Slot {activeParking.parking_slots?.slot_number}
                  </li>
                </ol>
              </div>

              <p className="text-xs text-muted-foreground">
                Parked since: {new Date(activeParking.parked_at).toLocaleString()}
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Car className="w-16 h-16 text-muted-foreground mb-4" />
              <p className="text-lg font-semibold">No Active Parking</p>
              <p className="text-sm text-muted-foreground">
                You don't have any active parking sessions
              </p>
            </CardContent>
          </Card>
        )}

        {/* Parking History */}
        {history.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Parking History</h2>
            <div className="grid gap-3">
              {history.slice(0, 5).map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold">
                          Slot {item.parking_slots?.slot_number}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Floor {item.floor_level}
                        </p>
                      </div>
                      <Badge variant={item.retrieved_at ? "secondary" : "default"}>
                        {item.retrieved_at ? "Completed" : "Active"}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {new Date(item.parked_at).toLocaleDateString()}
                      {item.retrieved_at && (
                        <> • Retrieved: {new Date(item.retrieved_at).toLocaleString()}</>
                      )}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
