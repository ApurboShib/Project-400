import React, { useState } from "react";
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

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("[v0] Admin login:", form);
    window.location.href = "/admin/dashboard";
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Admin Portal
          </h1>
          <p className="text-muted-foreground">
            Administrative access to hostel management
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Admin Login</CardTitle>
            <CardDescription className="text-center">
              Access administrative dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Admin Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@unchostel.com"
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
                  placeholder="Enter admin password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <Link
                  to="/admin-forgot-password"
                  className="text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Button type="submit" className="w-full">
                Access Admin Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>
        <div className="text-center mt-6 space-y-2">
          <p className="text-sm text-muted-foreground">
            Need admin access?{" "}
            <Link to="/signup" className="text-primary hover:underline">
              Request Admin Account
            </Link>
          </p>
          <p className="text-sm text-muted-foreground">
            Are you a student?{" "}
            <Link to="/student-login" className="text-primary hover:underline">
              Student Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
