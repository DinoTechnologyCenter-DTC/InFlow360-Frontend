import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, Phone, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ForgotPassword() {
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setSent(true);
      toast({
        title: "Reset Link Sent! 📧",
        description: `Recovery instructions sent to ${phone}`,
      });
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
              Forgot Password?
            </CardTitle>
            <CardDescription>
              Don't worry! We'll help you reset your account access.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <p className="text-sm text-muted-foreground">
                  Enter the phone number associated with your account
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
                    Sending...
                  </div>
                ) : (
                  "Send Reset Instructions"
                )}
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-accent-green/10 rounded-full flex items-center justify-center">
                <Phone className="h-8 w-8 text-accent-green" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Check Your Phone</h3>
                <p className="text-muted-foreground">
                  We've sent recovery instructions to {phone}
                </p>
              </div>
              <Button 
                onClick={() => setSent(false)}
                variant="outline" 
                className="w-full hover-lift"
              >
                Try Different Number
              </Button>
            </div>
          )}

          <div className="text-center pt-4 border-t">
            <Link 
              to="/login" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-smooth"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}