import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  CreditCard,
  Calendar,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowLeft,
  Receipt,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import StudentSidebar from "@/components/StudentSidebar";

export default function StudentFee() {
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
    fetchFees();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch("/api/users/profile");
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else if (response.status === 401 || response.status === 403) {
        setAuthError(
          "You are not authenticated. Please sign in to view your fee details."
        );
        setUser(null);
      } else {
        setUser({ student_id: "UNC-2021-001" });
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      setUser({ student_id: "UNC-2021-001" });
    }
  };

  const fetchFees = async () => {
    try {
      const response = await fetch("/api/fee", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setFees(data.fees || []);
      }
    } catch (error) {
      console.error("Failed to fetch fees:", error);
    } finally {
      setLoading(false);
    }
  };

  // Mock data for demonstration
  const mockFees = [
    {
      id: 1,
      month: "January 2024",
      amount: 8500,
      due_date: "2024-01-05",
      status: "paid",
      paid_date: "2024-01-03",
      payment_method: "Online",
    },
    {
      id: 2,
      month: "February 2024",
      amount: 8500,
      due_date: "2024-02-05",
      status: "paid",
      paid_date: "2024-02-04",
      payment_method: "Cash",
    },
    {
      id: 3,
      month: "March 2024",
      amount: 8500,
      due_date: "2024-03-05",
      status: "overdue",
      days_overdue: 15,
    },
    {
      id: 4,
      month: "April 2024",
      amount: 8500,
      due_date: "2024-04-05",
      status: "pending",
    },
  ];

  const currentFees = fees.length > 0 ? fees : mockFees;
  const totalDue = currentFees
    .filter((fee) => fee.status !== "paid")
    .reduce((sum, fee) => sum + fee.amount, 0);
  const paidFees = currentFees.filter((fee) => fee.status === "paid").length;
  const totalFees = currentFees.length;
  const paymentProgress = (paidFees / totalFees) * 100;

  if (loading || authError) {
    return (
      <>
        {loading && (
          <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-muted-foreground">
                Loading fee information...
              </p>
            </div>
          </div>
        )}
        {authError && (
          <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="text-center">
              <p className="text-lg text-red-600 font-semibold mb-4">
                {authError}
              </p>
              <Button onClick={() => navigate("/student-login")}>
                Go to Login
              </Button>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <StudentSidebar />
      <div className="flex-1">
        {/* Header */}
        <header className="border-b border-border bg-background/95 backdrop-blur">
          <div className="container flex h-16 items-center justify-between px-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/student/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <h1 className="text-xl font-semibold">Fee Management</h1>
            </div>
            <Badge variant="secondary">{user?.student_id}</Badge>
          </div>
        </header>

        <div className="container px-4 py-8">
          {/* Fee Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Due</CardTitle>
                <AlertCircle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  ৳{totalDue.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Outstanding amount
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Monthly Fee
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">৳4000</div>
                <p className="text-xs text-muted-foreground">
                  Standard monthly fee
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Payment Progress
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {paidFees}/{totalFees}
                </div>
                <Progress value={paymentProgress} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {Math.round(paymentProgress)}% completed
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Next Due</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5th Apr</div>
                <p className="text-xs text-muted-foreground">
                  Next payment due date
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Fee Details */}
          <Tabs defaultValue="current" className="space-y-6">
            <TabsList>
              <TabsTrigger value="current">Current Fees</TabsTrigger>
              <TabsTrigger value="history">Payment History</TabsTrigger>
              <TabsTrigger value="breakdown">Fee Breakdown</TabsTrigger>
            </TabsList>

            {/* Current Fees */}
            <TabsContent value="current" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Outstanding Fees</CardTitle>
                  <CardDescription>
                    Fees that require immediate attention
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {currentFees
                      .filter((fee) => fee.status !== "paid")
                      .map((fee) => (
                        <div
                          key={fee.id}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div className="flex items-center space-x-4">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                fee.status === "overdue"
                                  ? "bg-red-500"
                                  : fee.status === "pending"
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                              }`}
                            ></div>
                            <div>
                              <h4 className="font-medium">{fee.month}</h4>
                              <p className="text-sm text-muted-foreground">
                                Due:{" "}
                                {new Date(fee.due_date).toLocaleDateString()}
                                {fee.days_overdue && (
                                  <span className="text-red-500 ml-2">
                                    ({fee.days_overdue} days overdue)
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <div className="font-semibold">
                                ৳{fee.amount.toLocaleString()}
                              </div>
                              <Badge
                                variant={
                                  fee.status === "overdue"
                                    ? "destructive"
                                    : "secondary"
                                }
                              >
                                {fee.status === "overdue"
                                  ? "Overdue"
                                  : "Pending"}
                              </Badge>
                            </div>
                            <Button size="sm">
                              <CreditCard className="h-4 w-4 mr-2" />
                              Pay Now
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payment History */}
            <TabsContent value="history" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Payment History</CardTitle>
                  <CardDescription>All your previous payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {currentFees
                      .filter((fee) => fee.status === "paid")
                      .map((fee) => (
                        <div
                          key={fee.id}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div className="flex items-center space-x-4">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <div>
                              <h4 className="font-medium">{fee.month}</h4>
                              <p className="text-sm text-muted-foreground">
                                Paid on:{" "}
                                {new Date(fee.paid_date).toLocaleDateString()}{" "}
                                via {fee.payment_method}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <div className="font-semibold">
                                ৳{fee.amount.toLocaleString()}
                              </div>
                              <Badge variant="secondary">Paid</Badge>
                            </div>
                            <Button variant="outline" size="sm">
                              <Receipt className="h-4 w-4 mr-2" />
                              Receipt
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Fee Breakdown */}
            <TabsContent value="breakdown" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Fee Breakdown</CardTitle>
                  <CardDescription>
                    Detailed breakdown of your monthly hostel fee
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span>Room Rent</span>
                      <span className="font-medium">৳1000</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span>Meal Charges</span>
                      <span className="font-medium">৳3000</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span>Electricity & Water</span>
                      <span className="font-medium">৳0</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span>Maintenance</span>
                      <span className="font-medium">৳0</span>
                    </div>
                    <div className="flex justify-between items-center py-2 font-semibold text-lg border-t-2">
                      <span>Total Monthly Fee</span>
                      <span>৳4000</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Available payment options</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Online Payment</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Pay securely using Bkash, Nagd, or Cards
                      </p>
                      <Button className="w-full">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Pay Online
                      </Button>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Cash Payment</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Pay directly to the hostel office during office hours
                      </p>
                      <Button
                        variant="outline"
                        className="w-full bg-transparent"
                      >
                        <Clock className="h-4 w-4 mr-2" />
                        Office Hours
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
