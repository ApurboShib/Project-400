"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  GraduationCap,
  Phone,
  Home,
  Mail,
  MapPin,
  Calendar,
  BookOpen,
  Heart,
  Shield,
  Menu,
  Bell,
  Settings,
} from "lucide-react";

export default function StudentProfile() {
  const [profileData, setProfileData] = useState({
    // Personal Information
    full_name: "Apurbo Shib Joy",
    father_name: "Soves shib",
    mother_name: "Shilpi Shib",
    dob: "2002-05-15",
    gender: "Male",
    blood_group: "B+",
    religion: "Hindu",
    email: "apurbo.shibjoy@deu.edu.bd",
    phone: "+880 1712-345678",

    // Academic Information
    student_id: "UNC-2021-001",
    department: "Computer Science & Engineering",
    batch: "2021",
    year: "3rd Year",
    cgpa: "3.75",

    // Hostel Information
    room_number: "A-205",
    building: "Babul-Badol",
    floor: "2nd Floor",
    room_type: "Double Sharing",

    // Prayer & Religious
    prayer_attendance: "Regular",
    friday_prayer: "Always",

    // Emergency Information
    guardian_contact: "+880 1712-987654",
    emergency_contact: "+880 1712-555666",
    permanent_address: "Sylhet, Bangladesh",
    current_address: "somota 17, Sylhet, Bangladesh",

    // Hostel Management Summary
    hostel_summary:
      "Currently residing in Babul-Badol hostel, room A-205, 2nd floor. Maintains regular prayer attendance and follows vegetarian dietary restrictions. No medical conditions reported. Actively participates in hostel activities and maintains good relations with fellow residents.",
    
    // Additional Information
    medical_conditions: "None",
    dietary_restrictions: "vegetarian",
    hobbies: "Programming, Reading, Cricket",
  });

  const completion = {
    personal: 95,
    academic: 90,
    hostel: 85,
    emergency: 80,
    overall: 88,
  };

  const handleChange = (field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation Bar */}

      <div className="max-w-6xl mx-auto space-y-6 p-6">
        {/* Enhanced Header */}
        <Card className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-xl">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  {/* <img
                    src="/logo.png"
                    alt="Profile"
                    className="h-20 w-20 rounded-full border-4 border-white shadow-lg"
                  /> */}
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold">
                    {profileData.full_name}
                  </h1>
                  <p className="text-blue-100 text-lg">
                    ID: {profileData.student_id}
                  </p>
                  <div className="flex items-center space-x-4 mt-2">
                    <Badge
                      variant="secondary"
                      className="bg-white/20 text-white"
                    >
                      {profileData.department}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-white/20 text-white"
                    >
                      {profileData.year}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="relative w-24 h-24">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="white"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${
                        2 * Math.PI * 40 * (1 - completion.overall / 100)
                      }`}
                      className="transition-all duration-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">
                      {completion.overall}%
                    </span>
                  </div>
                </div>
                <p className="text-blue-100 mt-2">Profile Complete</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Tabs */}
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid grid-cols-4 rounded-xl shadow-lg bg-white p-1 h-14">
            <TabsTrigger
              value="personal"
              className="flex items-center gap-2 rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <User className="w-4 h-4" /> Personal
            </TabsTrigger>
            <TabsTrigger
              value="academic"
              className="flex items-center gap-2 rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <GraduationCap className="w-4 h-4" /> Academic
            </TabsTrigger>
            <TabsTrigger
              value="hostel"
              className="flex items-center gap-2 rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <Home className="w-4 h-4" /> Hostel
            </TabsTrigger>
            <TabsTrigger
              value="emergency"
              className="flex items-center gap-2 rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <Shield className="w-4 h-4" /> Emergency
            </TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-blue-900">
                  <User className="w-5 h-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <User className="w-4 h-4" /> Full Name
                    </Label>
                    <Input
                      value={profileData.full_name}
                      onChange={(e) =>
                        handleChange("full_name", e.target.value)
                      }
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Date of Birth
                    </Label>
                    <Input
                      type="date"
                      value={profileData.dob}
                      onChange={(e) => handleChange("dob", e.target.value)}
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Father's Name
                    </Label>
                    <Input
                      value={profileData.father_name}
                      onChange={(e) =>
                        handleChange("father_name", e.target.value)
                      }
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Mother's Name
                    </Label>
                    <Input
                      value={profileData.mother_name}
                      onChange={(e) =>
                        handleChange("mother_name", e.target.value)
                      }
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Gender
                    </Label>
                    <Select
                      value={profileData.gender}
                      onValueChange={(value) => handleChange("gender", value)}
                    >
                      <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Heart className="w-4 h-4" /> Blood Group
                    </Label>
                    <Input
                      value={profileData.blood_group}
                      onChange={(e) =>
                        handleChange("blood_group", e.target.value)
                      }
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Religion
                    </Label>
                    <Input
                      value={profileData.religion}
                      onChange={(e) => handleChange("religion", e.target.value)}
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Mail className="w-4 h-4" /> Email
                    </Label>
                    <Input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Phone className="w-4 h-4" /> Phone
                    </Label>
                    <Input
                      value={profileData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Academic Information Tab */}
          <TabsContent value="academic">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-green-900">
                  <GraduationCap className="w-5 h-5" />
                  Academic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Student ID
                    </Label>
                    <Input
                      value={profileData.student_id}
                      onChange={(e) =>
                        handleChange("student_id", e.target.value)
                      }
                      className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Department
                    </Label>
                    <Input
                      value={profileData.department}
                      onChange={(e) =>
                        handleChange("department", e.target.value)
                      }
                      className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Batch
                    </Label>
                    <Input
                      value={profileData.batch}
                      onChange={(e) => handleChange("batch", e.target.value)}
                      className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Current Year
                    </Label>
                    <Input
                      value={profileData.year}
                      onChange={(e) => handleChange("year", e.target.value)}
                      className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      CGPA
                    </Label>
                    <Input
                      value={profileData.cgpa}
                      onChange={(e) => handleChange("cgpa", e.target.value)}
                      className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" /> DEU Summary
                    </Label>
                    <Textarea
                      value={profileData.deu_summary}
                      onChange={(e) =>
                        handleChange("deu_summary", e.target.value)
                      }
                      className="border-gray-200 focus:border-green-500 focus:ring-green-500 min-h-[100px]"
                      placeholder="Brief summary of your academic journey and achievements at DEU..."
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Hostel Information Tab */}
          <TabsContent value="hostel">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-orange-900">
                  <Home className="w-5 h-5" />
                  Hostel Information
                  <Badge
                    variant="secondary"
                    className="ml-2 bg-orange-100 text-orange-800"
                  >
                    Read Only
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <Label className="text-sm font-medium text-blue-800">
                        Room Number
                      </Label>
                    </div>
                    <p className="text-lg font-semibold text-blue-900">
                      {profileData.room_number}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Home className="w-4 h-4 text-green-600" />
                      <Label className="text-sm font-medium text-green-800">
                        Building
                      </Label>
                    </div>
                    <p className="text-lg font-semibold text-green-900">
                      {profileData.building}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-purple-600" />
                      <Label className="text-sm font-medium text-purple-800">
                        Floor
                      </Label>
                    </div>
                    <p className="text-lg font-semibold text-purple-900">
                      {profileData.floor}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-lg border border-indigo-200">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-indigo-600" />
                      <Label className="text-sm font-medium text-indigo-800">
                        Room Type
                      </Label>
                    </div>
                    <p className="text-lg font-semibold text-indigo-900">
                      {profileData.room_type}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-4 rounded-lg border border-teal-200">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="w-4 h-4 text-teal-600" />
                      <Label className="text-sm font-medium text-teal-800">
                        Prayer Attendance
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-semibold text-teal-900">
                        {profileData.prayer_attendance}
                      </p>
                      {profileData.prayer_attendance === "Regular" && (
                        <Badge className="bg-green-500 text-white text-xs">
                          Excellent
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-lg border border-amber-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-amber-600" />
                      <Label className="text-sm font-medium text-amber-800">
                        Friday Prayer
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-semibold text-amber-900">
                        {profileData.friday_prayer}
                      </p>
                      {profileData.friday_prayer === "Always" && (
                        <Badge className="bg-green-500 text-white text-xs">
                          Perfect
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Additional Information Section */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-rose-50 to-rose-100 p-6 rounded-lg border border-rose-200">
                    <div className="flex items-center gap-2 mb-3">
                      <Heart className="w-5 h-5 text-rose-600" />
                      <Label className="text-base font-medium text-rose-800">
                        Dietary Restrictions
                      </Label>
                    </div>
                    <p className="text-rose-900 font-medium">
                      {profileData.dietary_restrictions}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-6 rounded-lg border border-cyan-200">
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen className="w-5 h-5 text-cyan-600" />
                      <Label className="text-base font-medium text-cyan-800">
                        Hobbies & Interests
                      </Label>
                    </div>
                    <p className="text-cyan-900 font-medium">
                      {profileData.hobbies}
                    </p>
                  </div>
                </div>

                {/* Information Note */}
                <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-orange-800">
                        Hostel Information
                      </p>
                      <p className="text-xs text-orange-700 mt-1">
                        This information is managed by the hostel administration
                        and cannot be modified by students. For any changes,
                        please contact the hostel office.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Emergency Information Tab */}
          <TabsContent value="emergency">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
              <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-red-900">
                  <Shield className="w-5 h-5" />
                  Emergency Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Phone className="w-4 h-4" /> Guardian Contact
                    </Label>
                    <Input
                      value={profileData.guardian_contact}
                      onChange={(e) =>
                        handleChange("guardian_contact", e.target.value)
                      }
                      className="border-gray-200 focus:border-red-500 focus:ring-red-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Phone className="w-4 h-4" /> Emergency Contact
                    </Label>
                    <Input
                      value={profileData.emergency_contact}
                      onChange={(e) =>
                        handleChange("emergency_contact", e.target.value)
                      }
                      className="border-gray-200 focus:border-red-500 focus:ring-red-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Medical Conditions
                    </Label>
                    <Input
                      value={profileData.medical_conditions}
                      onChange={(e) =>
                        handleChange("medical_conditions", e.target.value)
                      }
                      className="border-gray-200 focus:border-red-500 focus:ring-red-500"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> Permanent Address
                    </Label>
                    <Textarea
                      value={profileData.permanent_address}
                      onChange={(e) =>
                        handleChange("permanent_address", e.target.value)
                      }
                      className="border-gray-200 focus:border-red-500 focus:ring-red-500"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> Current Address
                    </Label>
                    <Textarea
                      value={profileData.current_address}
                      onChange={(e) =>
                        handleChange("current_address", e.target.value)
                      }
                      className="border-gray-200 focus:border-red-500 focus:ring-red-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Bottom spacing for fixed save button */}
        <div className="h-20"></div>
      </div>

      {/* Enhanced Fixed Bottom Save Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t shadow-2xl p-4 z-40">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">
                Auto-saved 2 minutes ago
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              className="border-gray-300 bg-transparent"
            >
              Cancel
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 shadow-lg">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
