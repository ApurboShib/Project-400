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

export default function AdminSignup() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignup = (e) => {
    e.preventDefault();
    // Add admin signup logic here
    console.log("Admin signup form submitted:", form);
    window.location.href = "/admin-login";
  };

  return (
    <div className="min-h-screen bg-[color:var(--background)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Admin Sign Up</CardTitle>
            <CardDescription className="text-center">
              Request administrative access to UNC Hostel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-signup-email">Admin Email</Label>
                <Input
                  id="admin-signup-email"
                  type="email"
                  placeholder="admin@unchostel.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-signup-password">Password</Label>
                <Input
                  id="admin-signup-password"
                  type="password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-signup-confirm-password">
                  Confirm Password
                </Label>
                <Input
                  id="admin-signup-confirm-password"
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) =>
                    setForm({ ...form, confirmPassword: e.target.value })
                  }
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-blue-500 text-white font-bold py-2 px-4 rounded shadow-lg hover:from-blue-500 hover:to-primary transition-colors duration-200"
              >
                Request Admin Account
              </Button>
            </form>
            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                Already have admin access?{" "}
                <Link
                  to="/admin-login"
                  className="text-primary hover:underline"
                >
                  Login here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
