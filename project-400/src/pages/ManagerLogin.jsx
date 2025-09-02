import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export default function ManagerLoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("[v0] Manager login:", form);
    window.location.href = "/manager/dashboard";
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Manager Portal
          </h1>
          <p className="text-muted-foreground">Access your manager dashboard</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Manager Login</CardTitle>
            <CardDescription className="text-center">
              Sign in to manage hostel operations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="manager.email@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <Link
                  to="/forgot-password"
                  className="text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Button type="submit" className="w-full">
                Sign In to Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-6 space-y-2">
          {/* Manager signup removed, managers are assigned by admin */}
          <p className="text-sm text-muted-foreground">
            Are you an admin?{" "}
            <Link to="/admin-login" className="text-primary hover:underline">
              Admin Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
