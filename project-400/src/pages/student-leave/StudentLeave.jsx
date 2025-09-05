import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CalendarDays,
  Calculator,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import StudentSidebar from "@/components/StudentSidebar";
import { useState, useEffect } from "react";

export default function LeaveApplicationPage() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  // Fetch leave history on mount
  useEffect(() => {
    fetch("/api/student-leave", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setLeaveHistory(data.leaveRequests || []);
        setLoadingHistory(false);
      })
      .catch(() => setLoadingHistory(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/student-leave", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          start_date: fromDate,
          end_date: toDate,
          reason,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit");
      setSuccess("Leave application submitted!");
      setFromDate("");
      setToDate("");
      setReason("");
      setEmergencyContact("");
      // Optionally refetch leave history
      fetch("/api/student-leave", { credentials: "include" })
        .then((res) => res.json())
        .then((data) => setLeaveHistory(data.leaveRequests || []));
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <StudentSidebar />
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Leave Application
            </h1>
            <p className="text-muted-foreground">
              Apply for leave and track your applications
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Leave Application Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CalendarDays className="h-5 w-5" />
                  <span>Apply for Leave</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="from-date">From Date</Label>
                      <Input
                        id="from-date"
                        type="date"
                        className="mt-2"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="to-date">To Date</Label>
                      <Input
                        id="to-date"
                        type="date"
                        className="mt-2"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="reason">Reason for Leave</Label>
                    <Textarea
                      id="reason"
                      placeholder="Please provide a detailed reason for your leave..."
                      className="mt-2 min-h-[100px]"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="emergency-contact">Emergency Contact</Label>
                    <Input
                      id="emergency-contact"
                      placeholder="Phone number for emergency contact"
                      className="mt-2"
                      value={emergencyContact}
                      onChange={(e) => setEmergencyContact(e.target.value)}
                    />
                  </div>

                  {error && <div className="text-red-600 text-sm">{error}</div>}
                  {success && (
                    <div className="text-green-600 text-sm">{success}</div>
                  )}

                  <Button
                    className="w-full"
                    type="submit"
                    disabled={submitting}
                  >
                    {submitting ? "Submitting..." : "Submit Leave Application"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Live Deduction Calculator */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="h-5 w-5" />
                  <span>Fee Deduction Calculator</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">
                      Selected Duration
                    </span>
                    <span className="font-medium">7 days</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">
                      Base Monthly Fee
                    </span>
                    <span className="font-medium">৳4000</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">
                      Daily Rate
                    </span>
                    <span className="font-medium">৳100</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-muted-foreground">
                      Days Eligible for Deduction
                    </span>
                    <span className="font-medium">1 day (6+ days rule)</span>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Total Deduction</span>
                      <span className="text-2xl font-bold text-green-600">
                        ৳600
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-medium">Adjusted Fee</span>
                      <span className="text-xl font-bold">৳3400</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <AlertCircle className="h-4 w-4 inline mr-1" />
                    Fee deduction applies only for leaves of 6+ days
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Leave Application Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Leave Application History</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Application Date</TableHead>
                    <TableHead>Leave Period</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Deduction</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loadingHistory ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : leaveHistory.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">
                        No leave applications found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    leaveHistory.map((leave) => (
                      <TableRow key={leave.id}>
                        <TableCell>
                          {new Date(leave.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {new Date(leave.start_date).toLocaleDateString()} -{" "}
                          {new Date(leave.end_date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{leave.total_days} days</TableCell>
                        <TableCell>{leave.reason}</TableCell>
                        <TableCell>
                          {leave.status === "pending" && (
                            <Badge
                              variant="secondary"
                              className="flex items-center space-x-1"
                            >
                              <Clock className="h-3 w-3" />
                              <span>Pending</span>
                            </Badge>
                          )}
                          {leave.status === "approved" && (
                            <Badge
                              variant="default"
                              className="flex items-center space-x-1"
                            >
                              <CheckCircle className="h-3 w-3" />
                              <span>Approved</span>
                            </Badge>
                          )}
                          {leave.status === "rejected" && (
                            <Badge
                              variant="destructive"
                              className="flex items-center space-x-1"
                            >
                              <XCircle className="h-3 w-3" />
                              <span>Rejected</span>
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>৳{leave.deduction || 0}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
