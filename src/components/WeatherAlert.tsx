import { CloudRain, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";

export function WeatherAlert() {
  const { t } = useLanguage();
  const [weather, setWeather] = useState<"rain" | "traffic" | null>(null);

  useEffect(() => {
    // Simulate weather/traffic API check
    const random = Math.random();
    if (random < 0.3) setWeather("rain");
    else if (random < 0.5) setWeather("traffic");
  }, []);

  if (!weather) return null;

  return (
    <Alert className="bg-gradient-to-r from-accent/10 to-primary/10 border-accent/50">
      {weather === "rain" ? (
        <CloudRain className="h-4 w-4" />
      ) : (
        <AlertTriangle className="h-4 w-4" />
      )}
      <AlertTitle>{t("weatherAlert")}</AlertTitle>
      <AlertDescription>
        {weather === "rain" ? t("rainPredicted") : t("heavyTraffic")}
      </AlertDescription>
    </Alert>
  );
}
