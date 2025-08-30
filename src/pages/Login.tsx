import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, Phone, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
      toast({
        title: "OTP Sent! 📱",
        description: `Verification code sent to ${phone}`,
      });
    }, 1500);
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Welcome back! 🎉",
        description: "Successfully logged in to your account",
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
              Welcome to PayFlow
            </CardTitle>
            <CardDescription>
              Sign in to manage your invoices and payments
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === "phone" ? (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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
                    Sending OTP...
                  </div>
                ) : (
                  "Send Verification Code"
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Verification Code
                </Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="shadow-soft focus:shadow-medium transition-smooth text-center text-lg tracking-widest"
                  maxLength={6}
                  required
                />
                <p className="text-sm text-muted-foreground text-center">
                  Code sent to {phone}
                </p>
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-gradient-primary hover:shadow-glow transition-smooth"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Verifying...
                  </div>
                ) : (
                  "Verify & Sign In"
                )}
              </Button>

              <Button 
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => setStep("phone")}
              >
                ← Back to phone number
              </Button>
            </form>
          )}

          <div className="space-y-4 pt-4 border-t">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary hover:underline font-medium">
                  Sign up
                </Link>
              </p>
              <Link 
                to="/forgot-password" 
                className="text-sm text-muted-foreground hover:text-primary transition-smooth"
              >
                Forgot your phone number?
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}