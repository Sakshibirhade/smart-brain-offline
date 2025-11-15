import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { Clock, DollarSign } from "lucide-react";

interface ExtendReservationDialogProps {
  bookingId?: string;
  onExtend?: (hours: number) => void;
}

export function ExtendReservationDialog({ bookingId, onExtend }: ExtendReservationDialogProps) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [hours, setHours] = useState("1");
  const hourlyRate = 50; // Base rate per hour

  useEffect(() => {
    if (!bookingId) return;

    // Simulate checking if user has been inside for a while
    const timer = setTimeout(() => {
      const random = Math.random();
      if (random < 0.7) { // 70% chance to show extension prompt
        setOpen(true);
      }
    }, 5000); // Show after 5 seconds (in real app, check actual duration)

    return () => clearTimeout(timer);
  }, [bookingId]);

  const handleExtend = () => {
    onExtend?.(parseInt(hours));
    setOpen(false);
  };

  if (!bookingId) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            {t("extendReservation")}
          </DialogTitle>
          <DialogDescription>{t("extendMessage")}</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>{t("extendFor")}</Label>
            <Select value={hours} onValueChange={setHours}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 {t("additionalHours")}</SelectItem>
                <SelectItem value="2">2 {t("additionalHours")}</SelectItem>
                <SelectItem value="3">3 {t("additionalHours")}</SelectItem>
                <SelectItem value="4">4 {t("additionalHours")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between p-4 bg-accent/10 rounded-lg">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-accent" />
              <span className="font-medium">{t("additionalCost")}</span>
            </div>
            <span className="text-lg font-bold">₹{hourlyRate * parseInt(hours)}</span>
          </div>
        </div>

        <DialogFooter className="flex gap-2 sm:gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            {t("notNow")}
          </Button>
          <Button onClick={handleExtend} className="bg-gradient-primary">
            {t("extend")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
