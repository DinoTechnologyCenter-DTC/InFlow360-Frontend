import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, Share, ArrowLeft, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ConfettiParticle = ({ delay }: { delay: number }) => (
  <div 
    className="absolute w-2 h-2 bg-accent-orange rounded-full animate-confetti"
    style={{
      left: `${Math.random() * 100}%`,
      animationDelay: `${delay}ms`,
      backgroundColor: ['hsl(var(--accent-orange))', 'hsl(var(--accent-pink))', 'hsl(var(--accent-green))', 'hsl(var(--primary))'][Math.floor(Math.random() * 4)]
    }}
  />
);

export default function PaymentConfirmation() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);

  // Mock data - in real app, this would come from URL params or API
  const paymentData = {
    invoiceId: searchParams.get("invoice") || "INV-001",
    amount: searchParams.get("amount") || "2500",
    client: "Acme Corporation",
    paymentMethod: "•••• 4242",
    transactionId: "TXN-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString()
  };

  useEffect(() => {
    // Hide confetti after animation completes
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4 relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-10">
          {[...Array(50)].map((_, i) => (
            <ConfettiParticle key={i} delay={i * 100} />
          ))}
        </div>
      )}

      <div className="w-full max-w-2xl space-y-6 animate-slide-in-up">
        {/* Success Header */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 bg-gradient-success rounded-full flex items-center justify-center shadow-large animate-float">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Payment Successful! 🎉
            </h1>
            <p className="text-lg text-muted-foreground">
              Your payment has been processed successfully
            </p>
          </div>
        </div>

        {/* Payment Details Card */}
        <Card className="shadow-large hover-lift">
          <CardHeader className="text-center pb-4">
            <CardTitle className="flex items-center justify-center gap-2">
              <Sparkles className="h-5 w-5 text-accent-orange" />
              Payment Receipt
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Amount */}
            <div className="text-center py-6 border rounded-lg bg-gradient-subtle">
              <p className="text-sm text-muted-foreground mb-2">Amount Paid</p>
              <p className="text-4xl font-bold bg-gradient-success bg-clip-text text-transparent">
                ${parseInt(paymentData.amount).toLocaleString()}
              </p>
            </div>

            {/* Payment Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Invoice ID</p>
                  <p className="font-semibold">{paymentData.invoiceId}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Client</p>
                  <p className="font-semibold">{paymentData.client}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Payment Method</p>
                  <p className="font-semibold">{paymentData.paymentMethod}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Transaction ID</p>
                  <p className="font-semibold font-mono text-sm">{paymentData.transactionId}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Date & Time</p>
                  <p className="font-semibold">{paymentData.date} at {paymentData.time}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Badge className="bg-accent-green text-white">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Completed
                  </Badge>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
              <Button 
                className="flex-1 bg-gradient-primary hover:shadow-glow transition-smooth"
                onClick={() => navigate("/dashboard")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <Button variant="outline" className="hover-lift">
                <Download className="h-4 w-4 mr-2" />
                Download Receipt
              </Button>
              <Button variant="outline" className="hover-lift">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-3">What's Next?</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                A confirmation email has been sent to your registered email
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                The invoice has been marked as paid in your dashboard
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                You can download or share this receipt anytime
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}