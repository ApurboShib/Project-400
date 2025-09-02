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

export default function ManagerSignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    hostel: "",
  });

  const handleSignup = (e) => {
    e.preventDefault();
    console.log("[v0] Manager signup:", form);
    // Redirect to manager dashboard or show success
    window.location.href = "/manager/dashboard";
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Manager Signup
          </h1>
          <p className="text-muted-foreground">Create your manager account</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Register as Manager</CardTitle>
            <CardDescription className="text-center">
              Sign up to manage hostel operations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hostel">Hostel Name</Label>
                <Input
                  id="hostel"
                  type="text"
                  placeholder="Hostel Name"
                  value={form.hostel}
                  onChange={(e) => setForm({ ...form, hostel: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
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
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </form>
          </CardContent>
        </Card>
        <div className="text-center mt-6 space-y-2">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/manager-login" className="text-primary hover:underline">
              Manager Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
