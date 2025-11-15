import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ScanLine, CheckCircle, XCircle } from "lucide-react";

export default function ScanQR() {
  const [qrCode, setQrCode] = useState("");
  const [otp, setOtp] = useState("");
  const [action, setAction] = useState<"entry" | "exit">("entry");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleScan = async () => {
    if (!qrCode || !otp) {
      toast({
        title: "Missing Information",
        description: "Please enter both QR code and OTP",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Find booking
      const { data: booking, error: fetchError } = await supabase
        .from("bookings")
        .select("*, parking_slots(*), vehicles(*)")
        .eq("qr_code", qrCode)
        .eq("otp_code", otp)
        .maybeSingle();

      if (fetchError) throw fetchError;
      if (!booking) {
        throw new Error("Invalid QR code or OTP");
      }

      if (action === "entry") {
        // Mark entry
        const { error: updateError } = await supabase
          .from("bookings")
          .update({
            entry_time: new Date().toISOString(),
            booking_status: "active",
            otp_verified: true,
          })
          .eq("id", booking.id);

        if (updateError) throw updateError;

        // Update slot status
        await supabase
          .from("parking_slots")
          .update({ status: "occupied" })
          .eq("id", booking.slot_id);

        // Create parking history
        await supabase.from("parking_history").insert({
          user_id: user.id,
          booking_id: booking.id,
          slot_id: booking.slot_id,
          slot_coordinates_x: booking.parking_slots?.coordinates_x,
          slot_coordinates_y: booking.parking_slots?.coordinates_y,
          floor_level: booking.parking_slots?.floor_level,
        });

        toast({
          title: "Entry Successful",
          description: `Welcome! Parked at Slot ${booking.parking_slots?.slot_number}`,
        });
      } else {
        // Mark exit
        const entryTime = new Date(booking.entry_time!);
        const exitTime = new Date();
        const duration = Math.ceil((exitTime.getTime() - entryTime.getTime()) / (1000 * 60 * 60));
        const amount = duration * 50; // ₹50 per hour

        const { error: updateError } = await supabase
          .from("bookings")
          .update({
            exit_time: exitTime.toISOString(),
            booking_status: "completed",
          })
          .eq("id", booking.id);

        if (updateError) throw updateError;

        // Update slot status
        await supabase
          .from("parking_slots")
          .update({ status: "available" })
          .eq("id", booking.slot_id);

        // Create payment
        await supabase.from("payments").insert({
          booking_id: booking.id,
          user_id: user.id,
          amount: amount,
          payment_status: "pending",
        });

        toast({
          title: "Exit Successful",
          description: `Total: ₹${amount} for ${duration} hours`,
        });
      }

      setQrCode("");
      setOtp("");
    } catch (error: any) {
      toast({
        title: "Scan Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-6 pb-20">
        <div>
          <h1 className="text-3xl font-bold">Scan QR Code</h1>
          <p className="text-muted-foreground">Entry or exit parking</p>
        </div>

        {/* Action Selection */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant={action === "entry" ? "default" : "outline"}
            onClick={() => setAction("entry")}
            className="h-20"
          >
            <div className="flex flex-col items-center gap-2">
              <CheckCircle className="w-6 h-6" />
              <span>Entry</span>
            </div>
          </Button>
          <Button
            variant={action === "exit" ? "default" : "outline"}
            onClick={() => setAction("exit")}
            className="h-20"
          >
            <div className="flex flex-col items-center gap-2">
              <XCircle className="w-6 h-6" />
              <span>Exit</span>
            </div>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ScanLine className="w-5 h-5" />
              Scan Details
            </CardTitle>
            <CardDescription>
              Enter your QR code and OTP to {action}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="qr">QR Code</Label>
              <Input
                id="qr"
                placeholder="SMARTPARK-1234567890-123456"
                value={qrCode}
                onChange={(e) => setQrCode(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="otp">OTP</Label>
              <Input
                id="otp"
                placeholder="123456"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>

            <Button
              className="w-full"
              size="lg"
              onClick={handleScan}
              disabled={loading}
            >
              {loading ? "Processing..." : `Confirm ${action === "entry" ? "Entry" : "Exit"}`}
            </Button>
          </CardContent>
        </Card>

        <div className="bg-muted/50 p-4 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> Scan the QR code at the parking gate and enter your 6-digit OTP to complete the {action}.
          </p>
        </div>
      </div>
    </Layout>
  );
}
