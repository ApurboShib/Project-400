import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

function AdminLogin() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "admin",
  });
  const [selectedTab, setSelectedTab] = useState("admin");

  const handleLogin = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome Back
          </h1>
          <p className="text-muted-foreground">
            Sign in to your UNC Hostel admin/manager account
          </p>
        </div>
        <Tabs
          defaultValue={selectedTab}
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="admin">Admin</TabsTrigger>
            <TabsTrigger value="manager">Manager</TabsTrigger>
          </TabsList>
          <TabsContent value="admin">
            <Card>
              <CardHeader>
                <CardTitle>Admin Login</CardTitle>
                <CardDescription>
                  Access administrative dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Email</Label>
                    <Input
                      id="admin-email"
                      type="email"
                      placeholder="admin@unchostel.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          email: e.target.value,
                          role: "admin",
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Password</Label>
                    <Input
                      id="admin-password"
                      type="password"
                      value={form.password}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          password: e.target.value,
                          role: "admin",
                        })
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
                    Sign In as Admin
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="manager">
            <Card>
              <CardHeader>
                <CardTitle>Manager Login</CardTitle>
                <CardDescription>Access manager dashboard</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="manager-email">Email</Label>
                    <Input
                      id="manager-email"
                      type="email"
                      placeholder="manager.email@example.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          email: e.target.value,
                          role: "manager",
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="manager-password">Password</Label>
                    <Input
                      id="manager-password"
                      type="password"
                      value={form.password}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          password: e.target.value,
                          role: "manager",
                        })
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
                    Sign In as Manager
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <div className="text-center mt-6 space-y-2">
          {/* Conditional signup link for admin/manager based on selected tab */}
          {selectedTab === "admin" ? (
            <p className="text-sm text-muted-foreground">
              Need an admin account?{" "}
              <Link to="/admin-signup" className="text-primary hover:underline">
                Admin Signup
              </Link>
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Need a manager account?{" "}
              <Link
                to="/manager-signup"
                className="text-primary hover:underline"
              >
                Manager Signup
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
