import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Separator from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CreditCard,
  UtensilsCrossed,
  Heart,
  Calendar,
  Building2,
  Bell,
  User,
  LogOut,
  Home,
  FileText,
  CalendarDays,
  MessageSquare,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function StudentDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-sidebar border-r border-sidebar-border">
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-8">
              <Building2 className="h-8 w-8 text-sidebar-primary" />
              <span className="text-2xl font-bold text-sidebar-foreground">
                UNC
              </span>
            </div>

            <nav className="space-y-2">
              <Link
                to="/student/dashboard"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-sidebar-accent text-sidebar-accent-foreground"
              >
                <Home className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/student/profile"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
              >
                <User className="h-5 w-5" />
                <span>My Profile</span>
              </Link>
              <Link
                to="/student/fees"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
              >
                <CreditCard className="h-5 w-5" />
                <span>Fees</span>
              </Link>
              <Link
                to="/student/meals"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
              >
                <UtensilsCrossed className="h-5 w-5" />
                <span>Meals</span>
              </Link>
              <Link
                to="/student/leave"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
              >
                <CalendarDays className="h-5 w-5" />
                <span>Leave</span>
              </Link>
              <Link
                to="/student/events"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
              >
                <Calendar className="h-5 w-5" />
                <span>Events</span>
              </Link>
              <Link
                to="/student/notices"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
              >
                <Bell className="h-5 w-5" />
                <span>Notices</span>
              </Link>

              <Separator className="my-4" />

              <Link
                to="/logout"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome, Apurbo Shib Joy
            </h1>
            <p className="text-muted-foreground">
              Here's your hostel dashboard overview
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Cards */}
            <div className="lg:col-span-2 space-y-6">
              {/* Room Info */}
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Building2 className="h-6 w-6 text-primary" />
                    <CardTitle>Room Information</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        Room 202
                      </p>
                      <p className="text-muted-foreground">Babul-Badol</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground mb-2">
                        Roommates
                      </p>
                      <div className="flex -space-x-2">
                        <Avatar className="h-8 w-8 border-2 border-background">
                          <AvatarImage src="/diverse-student-studying.png" />
                          <AvatarFallback>AK</AvatarFallback>
                        </Avatar>
                        <Avatar className="h-8 w-8 border-2 border-background">
                          <AvatarImage src="/diverse-students-studying.png" />
                          <AvatarFallback>VS</AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Fee Card */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-6 w-6 text-primary" />
                      <CardTitle>Monthly Fees</CardTitle>
                    </div>
                    <Badge variant="destructive">Due</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-foreground">
                        ৳3500
                      </p>
                      <p className="text-muted-foreground">December 2024</p>
                    </div>
                    <Button>Pay Now</Button>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Base Fee</span>
                      <span>৳4000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Leave Deduction (6 days)
                      </span>
                      <span className="text-green-600">-৳500</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full bg-transparent">
                    <FileText className="h-4 w-4 mr-2" />
                    View Payment History
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <UtensilsCrossed className="h-6 w-6 text-primary" />
                    <CardTitle>This Week's Menu</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-2 text-center">
                    {/* Header Row */}
                    <div className="font-semibold text-sm text-muted-foreground">
                      Mon
                    </div>
                    <div className="font-semibold text-sm text-muted-foreground">
                      Tue
                    </div>
                    <div className="font-semibold text-sm text-muted-foreground">
                      Wed
                    </div>
                    <div className="font-semibold text-sm text-muted-foreground">
                      Thu
                    </div>
                    <div className="font-semibold text-sm text-muted-foreground">
                      Fri
                    </div>
                    <div className="font-semibold text-sm text-muted-foreground">
                      Sat
                    </div>
                    <div className="font-semibold text-sm text-muted-foreground">
                      Sun
                    </div>

                    {/* Breakfast Row */}
                    <div className="p-2 bg-muted rounded text-xs">
                      <div className="font-medium">Breakfast</div>
                      <div>Poha</div>
                    </div>
                    <div className="p-2 bg-muted rounded text-xs">
                      <div className="font-medium">Breakfast</div>
                      <div>Upma</div>
                    </div>
                    <div className="p-2 bg-muted rounded text-xs">
                      <div className="font-medium">Breakfast</div>
                      <div>Paratha</div>
                    </div>
                    <div className="p-2 bg-muted rounded text-xs">
                      <div className="font-medium">Breakfast</div>
                      <div>Idli</div>
                    </div>
                    <div className="p-2 bg-muted rounded text-xs">
                      <div className="font-medium">Breakfast</div>
                      <div>Dosa</div>
                    </div>
                    <div className="p-2 bg-muted rounded text-xs">
                      <div className="font-medium">Breakfast</div>
                      <div>Poori</div>
                    </div>
                    <div className="p-2 bg-muted rounded text-xs">
                      <div className="font-medium">Breakfast</div>
                      <div>Bread</div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full mt-4 bg-transparent"
                  >
                    View Full Weekly Menu
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Activity Cards */}
            <div className="space-y-6">
              {/* Geeta Class */}
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Heart className="h-6 w-6 text-primary" />
                    <CardTitle className="text-lg">Geeta Class</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium">Monday after Prayer</p>
                    <p className="text-sm text-muted-foreground">
                      7:30 AM - 8:00 AM
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">This Week</span>
                    <Badge variant="secondary">Attended</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Daily Prayer */}
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Heart className="h-6 w-6 text-primary" />
                    <CardTitle className="text-lg">Daily Prayer</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium">6:45 AM Daily</p>
                    <p className="text-sm text-muted-foreground">
                      Mandatory Attendance
                    </p>
                  </div>
                  <Button className="w-full">Mark as Attended</Button>
                </CardContent>
              </Card>

              {/* Notices Panel */}
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Bell className="h-6 w-6 text-primary" />
                    <CardTitle className="text-lg">Latest Notices</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="font-medium text-sm">Hostel Maintenance</p>
                    <p className="text-xs text-muted-foreground">
                      Water supply will be interrupted tomorrow from 10 AM to 2
                      PM
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      2 hours ago
                    </p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="font-medium text-sm">New Meal Timings</p>
                    <p className="text-xs text-muted-foreground">
                      Dinner timing changed to 8:00 PM from next week
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      1 day ago
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    View All Notices
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
