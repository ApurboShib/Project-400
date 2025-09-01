import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  UtensilsCrossed,
  Heart,
  Users,
  Calendar,
  Building2,
  LogIn,
  UserPlus,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container px-4 py-16 md:py-24">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="space-y-4 max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              UNC – Smart Living & Hostel Management Portal
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Your all-in-one hostel platform for meals, fees, prayer, events,
              and leadership.
            </p>
          </div>

          {/* Login Options */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <Button size="lg" className="flex-1" asChild>
              <Link to="/student-login">Student Login</Link>
            </Button>
            <Button size="lg" variant="secondary" className="flex-1" asChild>
              <Link to="/admin-login">Admin Login</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1 bg-transparent"
              asChild
            >
              <Link to="/guest">Guest Access</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="container px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need for Hostel Life
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Streamline your hostel experience with our comprehensive management
            system
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Smart Fee Tracker */}
          <Card className="relative overflow-hidden">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">Smart Fee Tracker</CardTitle>
                  <Badge variant="secondary" className="mt-1">
                    Automated
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Auto deduction for long leaves. Never worry about manual
                calculations again.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Meal Planner */}
          <Card className="relative overflow-hidden">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <UtensilsCrossed className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">Meal Planner</CardTitle>
                  <Badge variant="secondary" className="mt-1">
                    Student Managed
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Set by student manager. View weekly menu anytime, anywhere.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Prayer & Geeta Class */}
          <Card className="relative overflow-hidden">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">
                    Prayer & Geeta Class
                  </CardTitle>
                  <Badge variant="secondary" className="mt-1">
                    Mandatory
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Track mandatory attendance for daily prayers and weekly Geeta
                classes.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Monthly Student Manager */}
          <Card className="relative overflow-hidden">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">
                    Monthly Student Manager
                  </CardTitle>
                  <Badge variant="secondary" className="mt-1">
                    Leadership
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Student-led leadership system. Rotate monthly for fair
                governance.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Leave System */}
          <Card className="relative overflow-hidden">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">Leave System</CardTitle>
                  <Badge variant="secondary" className="mt-1">
                    Smart Detection
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Auto-detect and reduce fee after 6+ days leave. Transparent and
                fair.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Additional Features Card */}
          <Card className="relative overflow-hidden md:col-span-2 lg:col-span-1">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">Complete Management</CardTitle>
                  <Badge variant="secondary" className="mt-1">
                    All-in-One
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Events, notices, complaints, room management, and much more in
                one platform.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="container px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Building2 className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold text-foreground">
                UNC Portal
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 UNC Hostel Management Portal. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
