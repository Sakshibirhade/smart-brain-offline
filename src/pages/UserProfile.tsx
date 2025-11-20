import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { User as UserIcon, GraduationCap, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { z } from "zod";

const profileSchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name too long"),
  grade: z.number().int().min(1).max(12),
  parentEmail: z.string().trim().email("Invalid email address").max(255, "Email too long").optional().or(z.literal("")),
});

export default function UserProfile() {
  const [profile, setProfile] = useState<any>(null);
  const [fullName, setFullName] = useState("");
  const [grade, setGrade] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (error) throw error;
      setProfile(data);
      setFullName(data?.full_name || "");
      setGrade(data?.grade?.toString() || "");
      setParentEmail(data?.parent_email || "");
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const updateProfile = async () => {
    setLoading(true);
    try {
      // Validate inputs
      const validationResult = profileSchema.safeParse({
        fullName: fullName.trim(),
        grade: parseInt(grade),
        parentEmail: parentEmail.trim(),
      });
      
      if (!validationResult.success) {
        const errors = validationResult.error.issues.map(err => err.message).join(", ");
        throw new Error(errors);
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          full_name: validationResult.data.fullName,
          grade: validationResult.data.grade,
          parent_email: validationResult.data.parentEmail || null,
        });

      if (error) throw error;

      toast({
        title: t("success"),
        description: "Your profile has been updated successfully",
      });

      fetchProfile();
    } catch (error: any) {
      toast({
        title: t("error"),
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="text-center space-y-2">
        <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto flex items-center justify-center">
          <UserIcon className="w-10 h-10 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-bold">{t("profile")}</h1>
        <p className="text-muted-foreground">{t("editProfile")}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your profile details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">{t("fullName")}</Label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                id="fullName"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="grade">{t("grade")}</Label>
            <div className="relative">
              <GraduationCap className="absolute left-3 top-3 w-4 h-4 text-muted-foreground z-10" />
              <Select value={grade} onValueChange={setGrade}>
                <SelectTrigger className="pl-10">
                  <SelectValue placeholder="Select your grade" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((g) => (
                    <SelectItem key={g} value={g.toString()}>
                      Grade {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="parentEmail">{t("parentEmail")}</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                id="parentEmail"
                type="email"
                placeholder="parent@example.com"
                value={parentEmail}
                onChange={(e) => setParentEmail(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Button onClick={updateProfile} disabled={loading} className="w-full">
            {loading ? t("loading") : t("save")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
