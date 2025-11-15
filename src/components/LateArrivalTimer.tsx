import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Clock, AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "./ui/badge";

interface LateArrivalTimerProps {
  bookingTime: string;
  bookingDate: string;
  penaltyAmount?: number;
}

export function LateArrivalTimer({ bookingTime, bookingDate, penaltyAmount = 100 }: LateArrivalTimerProps) {
  const { t } = useLanguage();
  const [timeRemaining, setTimeRemaining] = useState("");
  const [isLate, setIsLate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const bookingDateTime = new Date(`${bookingDate}T${bookingTime}`);
      const now = new Date();
      const diff = bookingDateTime.getTime() - now.getTime();

      if (diff <= 0) {
        setIsLate(true);
        const lateDiff = Math.abs(diff);
        const minutes = Math.floor(lateDiff / 60000);
        const seconds = Math.floor((lateDiff % 60000) / 1000);
        setTimeRemaining(`-${minutes}m ${seconds}s`);
      } else {
        const hours = Math.floor(diff / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [bookingTime, bookingDate]);

  return (
    <Card className={`border-2 ${isLate ? 'border-destructive bg-destructive/5' : 'border-accent bg-accent/5'}`}>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isLate ? (
              <AlertCircle className="w-5 h-5 text-destructive" />
            ) : (
              <Clock className="w-5 h-5 text-accent" />
            )}
            <span className="font-semibold">
              {isLate ? t("lateArrival") : t("arriveBy")}
            </span>
          </div>
          <Badge variant={isLate ? "destructive" : "secondary"}>
            {timeRemaining}
          </Badge>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{t("penaltyApplies")}</span>
          <span className="font-bold text-destructive">
            {t("penalty")}: ₹{penaltyAmount}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
