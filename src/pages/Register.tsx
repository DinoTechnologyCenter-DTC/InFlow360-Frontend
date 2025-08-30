import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, Phone, User, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    otp: ""
  });
  const [step, setStep] = useState<"details" | "otp">("details");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmitDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
      toast({
        title: "OTP Sent! 📱",
        description: `Verification code sent to ${formData.phone}`,
      });
    }, 1500);
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Account Created! 🎉",
        description: "Welcome to InFlow360! Let's get started.",
      });
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-large hover-lift">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center animate-float">
            <Wallet className="h-8 w-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl bg-gradient-primary bg-clip-text text-transparent">
              Create Account
            </CardTitle>
            <CardDescription>
              Join InFlow360 and start managing your invoices
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === "details" ? (
            <form onSubmit={handleSubmitDetails} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="shadow-soft focus:shadow-medium transition-smooth"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Company Name
                </Label>
                <Input
                  id="company"
                  type="text"
                  placeholder="Acme Corporation"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="shadow-soft focus:shadow-medium transition-smooth"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="shadow-soft focus:shadow-medium transition-smooth"
                  required
                />
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-gradient-primary hover:shadow-glow transition-smooth"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating Account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">Verification Code</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={formData.otp}
                  onChange={(e) => setFormData({...formData, otp: e.target.value})}
                  className="shadow-soft focus:shadow-medium transition-smooth text-center text-lg tracking-widest"
                  maxLength={6}
                  required
                />
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-gradient-primary hover:shadow-glow transition-smooth"
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Verify & Continue"}
              </Button>

              <Button 
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => setStep("details")}
              >
                ← Back to details
              </Button>
            </form>
          )}

          <div className="text-center pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}