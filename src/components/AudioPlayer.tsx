import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AudioPlayerProps {
  text: string;
  voice?: string;
}

export function AudioPlayer({ text, voice = "alloy" }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const handlePlayPause = async () => {
    if (isPlaying && audio) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    if (audio && !audio.ended) {
      audio.play();
      setIsPlaying(true);
      return;
    }

    try {
      setIsLoading(true);

      const { data, error } = await supabase.functions.invoke('text-to-speech', {
        body: { text, voice }
      });

      if (error) throw error;

      if (!data?.audioContent) {
        throw new Error('No audio content received');
      }

      // Convert base64 to blob
      const binaryString = atob(data.audioContent);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(blob);

      const newAudio = new Audio(audioUrl);
      newAudio.onended = () => setIsPlaying(false);
      newAudio.onerror = () => {
        toast({
          title: "Error",
          description: "Failed to play audio",
          variant: "destructive",
        });
        setIsPlaying(false);
      };

      setAudio(newAudio);
      await newAudio.play();
      setIsPlaying(true);
    } catch (error: any) {
      console.error('Error playing audio:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate audio",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handlePlayPause}
      disabled={isLoading}
      className="h-10 w-10"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : isPlaying ? (
        <VolumeX className="h-4 w-4" />
      ) : (
        <Volume2 className="h-4 w-4" />
      )}
    </Button>
  );
}
