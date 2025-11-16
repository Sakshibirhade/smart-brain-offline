import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Eye, Moon, Smartphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const EyeProtection = () => {
  const [showWarning, setShowWarning] = useState(false);
  const [warningType, setWarningType] = useState<"proximity" | "time" | "light" | null>(null);
  const [studyTime, setStudyTime] = useState(0);

  useEffect(() => {
    // Track study time
    const timeInterval = setInterval(() => {
      setStudyTime((prev) => prev + 1);
      
      // Show warning every 20 minutes (1200 seconds)
      if (studyTime > 0 && studyTime % 1200 === 0) {
        setWarningType("time");
        setShowWarning(true);
        setTimeout(() => setShowWarning(false), 10000);
      }
    }, 1000);

    // Monitor ambient light using the Ambient Light API (where supported)
    if ("AmbientLightSensor" in window) {
      try {
        const sensor = new (window as any).AmbientLightSensor();
        sensor.addEventListener("reading", () => {
          // If light level is very low (< 50 lux), warn user
          if (sensor.illuminance < 50) {
            setWarningType("light");
            setShowWarning(true);
            setTimeout(() => setShowWarning(false), 8000);
          }
        });
        sensor.start();

        return () => {
          sensor.stop();
          clearInterval(timeInterval);
        };
      } catch (error) {
        console.log("Ambient light sensor not available");
      }
    }

    // Monitor device orientation for proximity detection
    const handleOrientation = (event: DeviceOrientationEvent) => {
      // If device is very close to face (beta angle near 90 degrees)
      if (event.beta && Math.abs(event.beta) > 80) {
        setWarningType("proximity");
        setShowWarning(true);
        setTimeout(() => setShowWarning(false), 5000);
      }
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation);
    }

    return () => {
      clearInterval(timeInterval);
      if (window.DeviceOrientationEvent) {
        window.removeEventListener("deviceorientation", handleOrientation);
      }
    };
  }, [studyTime]);

  const getWarningMessage = () => {
    switch (warningType) {
      case "proximity":
        return {
          title: "Too Close! 👀",
          description: "Keep your device at least 30cm away from your eyes to prevent strain.",
          icon: <Eye className="w-5 h-5" />,
        };
      case "time":
        return {
          title: "Time for a Break! ⏰",
          description: "You've been studying for 20 minutes. Take a 20-second break and look 20 feet away (20-20-20 rule)!",
          icon: <Smartphone className="w-5 h-5" />,
        };
      case "light":
        return {
          title: "Low Light Warning! 💡",
          description: "The room is too dark. Turn on more lights to reduce eye strain.",
          icon: <Moon className="w-5 h-5" />,
        };
      default:
        return null;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const message = getWarningMessage();

  return (
    <>
      {/* Study Time Badge */}
      <div className="fixed top-20 right-4 z-40">
        <Badge variant="outline" className="gap-2">
          <Eye className="w-3 h-3" />
          Study Time: {formatTime(studyTime)}
        </Badge>
      </div>

      {/* Warning Alert */}
      {showWarning && message && (
        <div className="fixed top-32 left-4 right-4 z-50 animate-scale-in">
          <Alert className="glass-effect border-2 border-yellow-500 bg-yellow-500/10 shadow-glow">
            <div className="flex items-center gap-2">
              {message.icon}
              <AlertTitle className="mb-0">{message.title}</AlertTitle>
            </div>
            <AlertDescription className="mt-2">{message.description}</AlertDescription>
          </Alert>
        </div>
      )}
    </>
  );
};
