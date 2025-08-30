import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, ArrowRight, CheckCircle, Users, DollarSign, FileText } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="mx-auto w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-large animate-float">
            <Wallet className="h-10 w-10 text-white" />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-primary">
              InFlow360
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
              Payment & Invoices Made Simple
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Streamline your business with our modern, playful yet professional invoice management system. 
              Create, send, and track invoices with ease.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:shadow-glow transition-smooth hover-lift text-lg px-8 py-6"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button 
                variant="outline" 
                size="lg" 
                className="hover-lift text-lg px-8 py-6"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Everything you need to manage payments
          </h3>
          <p className="text-muted-foreground text-lg">
            Powerful features designed for modern businesses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="shadow-soft hover-lift">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Smart Invoicing</CardTitle>
              <CardDescription>
                Create professional invoices in seconds with our intuitive interface
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center justify-center gap-2">
                  <CheckCircle className="h-4 w-4 text-accent-green" />
                  Auto-calculations
                </li>
                <li className="flex items-center justify-center gap-2">
                  <CheckCircle className="h-4 w-4 text-accent-green" />
                  Custom templates
                </li>
                <li className="flex items-center justify-center gap-2">
                  <CheckCircle className="h-4 w-4 text-accent-green" />
                  PDF export
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover-lift">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-gradient-success rounded-lg flex items-center justify-center mb-4">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Payment Tracking</CardTitle>
              <CardDescription>
                Monitor payments in real-time with detailed analytics and insights
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center justify-center gap-2">
                  <CheckCircle className="h-4 w-4 text-accent-green" />
                  Real-time updates
                </li>
                <li className="flex items-center justify-center gap-2">
                  <CheckCircle className="h-4 w-4 text-accent-green" />
                  Payment reminders
                </li>
                <li className="flex items-center justify-center gap-2">
                  <CheckCircle className="h-4 w-4 text-accent-green" />
                  Status tracking
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover-lift">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-gradient-warm rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Client Management</CardTitle>
              <CardDescription>
                Organize and manage your clients with comprehensive contact management
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center justify-center gap-2">
                  <CheckCircle className="h-4 w-4 text-accent-green" />
                  Contact database
                </li>
                <li className="flex items-center justify-center gap-2">
                  <CheckCircle className="h-4 w-4 text-accent-green" />
                  Payment history
                </li>
                <li className="flex items-center justify-center gap-2">
                  <CheckCircle className="h-4 w-4 text-accent-green" />
                  Client insights
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">
            Ready to streamline your invoicing?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of businesses already using PayFlow
          </p>
          <Link to="/register">
            <Button 
              size="lg" 
              className="bg-white/20 hover:bg-white/30 text-white border-white/30 hover:shadow-glow transition-smooth hover-lift text-lg px-8 py-6"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
