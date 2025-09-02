import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Save,
  User,
  GraduationCap,
  Heart,
  Upload,
  CheckCircle,
  Clock,
  AlertCircle,
  Users,
  FileText,
  Camera,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  TrendingUp,
  MapPin,
  Building,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function StudentProfile() {
  const [user, setUser] = useState(null);
  const [basicInfo, setBasicInfo] = useState({
    room_number: "",
    building: "",
    email: "",
    phone: "",
    geeta_attendance: 0,
    prayer_attendance: 0,
    due_amount: 0,
    due_month: "",
  });
  const [activePhase, setActivePhase] = useState("personal");
  const [profileData, setProfileData] = useState({
    // Basic Info (existing)
    full_name: "",
    phone: "",
    room_number: "",

    // Phase 1: Personal Details
    father_name: "",
    mother_name: "",
    date_of_birth: "",
    blood_group: "",
    religion: "",
    guardian_contact: "",
    permanent_address: "",
    current_address: "",

    // Phase 2: Academic Details
    student_type: "", // school/college/nursing/university
    institute_name: "",
    department: "",
    semester_year: "",
    admission_session: "",

    // Phase 3: Emergency + Identity
    emergency_contact_name: "",
    emergency_contact_phone: "",
    emergency_contact_relation: "",
    medical_conditions: "",
    profile_photo: null,
    id_card_upload: null,
  });

  const [completionStatus, setCompletionStatus] = useState({
    personal: 0,
    academic: 0,
    emergency: 0,
    overall: 0,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
    fetchBasicInfo();
  }, []);
  const fetchBasicInfo = async () => {
    try {
      const response = await fetch("/api/users/basic-info", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setBasicInfo(data.basicInfo);
      }
    } catch (error) {
      console.error("Failed to fetch basic info:", error);
    }
  };

  useEffect(() => {
    calculateCompletionStatus();
  }, [profileData]);

  const calculateCompletionStatus = () => {
    const personalFields = [
      "father_name",
      "mother_name",
      "date_of_birth",
      "blood_group",
      "religion",
      "guardian_contact",
      "permanent_address",
      "current_address",
    ];
    const academicFields = [
      "student_type",
      "institute_name",
      "department",
      "semester_year",
      "admission_session",
    ];
    const emergencyFields = [
      "emergency_contact_name",
      "emergency_contact_phone",
      "emergency_contact_relation",
    ];

    const personalComplete = personalFields.filter((field) =>
      profileData[field]?.trim()
    ).length;
    const academicComplete = academicFields.filter((field) =>
      profileData[field]?.trim()
    ).length;
    const emergencyComplete = emergencyFields.filter((field) =>
      profileData[field]?.trim()
    ).length;

    const personalPercent = Math.round(
      (personalComplete / personalFields.length) * 100
    );
    const academicPercent = Math.round(
      (academicComplete / academicFields.length) * 100
    );
    const emergencyPercent = Math.round(
      (emergencyComplete / emergencyFields.length) * 100
    );
    const overallPercent = Math.round(
      ((personalComplete + academicComplete + emergencyComplete) /
        (personalFields.length +
          academicFields.length +
          emergencyFields.length)) *
        100
    );

    setCompletionStatus({
      personal: personalPercent,
      academic: academicPercent,
      emergency: emergencyPercent,
      overall: overallPercent,
    });
  };

  const fetchUserProfile = async () => {
    try {
      const response = await fetch("/api/users/profile", {
        credentials: "include",
      });
      const text = await response.text();
      try {
        const data = JSON.parse(text);
        if (response.ok) {
          setUser(data.user);
          setProfileData((prev) => ({
            ...prev,
            full_name: data.user.full_name || "",
            phone: data.user.phone || "",
            room_number: data.user.room_number || "",
            // Load extended profile data if available
            ...data.user.extended_profile,
          }));
        } else {
          navigate("/student-login");
        }
      } catch (jsonError) {
        console.error("Response was not valid JSON:", text);
        setError("Server returned invalid response");
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        setMessage("Profile updated successfully!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setError(data.error || "Failed to update profile");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const getPhaseIcon = (phase, status) => {
    if (status === 100) return <CheckCircle className="h-5 w-5 text-primary" />;
    if (status > 0) return <Clock className="h-5 w-5 text-accent" />;
    return <AlertCircle className="h-5 w-5 text-muted-foreground" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/student/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-balance">
                Student Profile
              </h1>
              <p className="text-sm text-muted-foreground">
                Complete your profile in 3 simple phases
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="font-medium">
            {user?.student_id}
          </Badge>
        </div>
      </header>

      <div className="container px-4 py-8 max-w-4xl">
        <div className="mb-8 space-y-6">
          {/* Profile Overview Card */}
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-balance">
                    {user?.full_name || "Complete Your Profile"}
                  </h2>
                  <div className="flex items-center space-x-4 text-muted-foreground mb-4">
                    <div className="flex items-center space-x-1">
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">
                        {basicInfo.email || user?.email}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Phone className="h-4 w-4" />
                      <span className="text-sm">
                        {basicInfo.phone || "Not provided"}
                      </span>
                    </div>
                  </div>

                  {/* Overall Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Profile Completion
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {completionStatus.overall}%
                      </span>
                    </div>
                    <Progress
                      value={completionStatus.overall}
                      className="h-2"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Basic Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Room & Building Info */}
            <Card>
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <Building className="h-4 w-4 text-primary" />
                <div className="ml-3">
                  <CardTitle className="text-sm font-medium">
                    Room & Building
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm">
                      Room: {basicInfo.room_number || "Not assigned"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Building className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm">
                      Building: {basicInfo.building || "Not assigned"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Geeta Class Attendance */}
            <Card>
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <Calendar className="h-4 w-4 text-accent" />
                <div className="ml-3">
                  <CardTitle className="text-sm font-medium">
                    Geeta Class
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Attendance
                    </span>
                    <span className="text-xs font-medium">
                      {basicInfo.geeta_attendance}%
                    </span>
                  </div>
                  <Progress
                    value={basicInfo.geeta_attendance}
                    className="h-1"
                  />
                  <Badge
                    variant={
                      basicInfo.geeta_attendance >= 75
                        ? "default"
                        : "destructive"
                    }
                    className="text-xs"
                  >
                    {basicInfo.geeta_attendance >= 75
                      ? "Good"
                      : "Needs Improvement"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Prayer Attendance */}
            <Card>
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <TrendingUp className="h-4 w-4 text-accent" />
                <div className="ml-3">
                  <CardTitle className="text-sm font-medium">
                    Prayer Attendance
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Attendance
                    </span>
                    <span className="text-xs font-medium">
                      {basicInfo.prayer_attendance}%
                    </span>
                  </div>
                  <Progress
                    value={basicInfo.prayer_attendance}
                    className="h-1"
                  />
                  <Badge
                    variant={
                      basicInfo.prayer_attendance >= 75
                        ? "default"
                        : "destructive"
                    }
                    className="text-xs"
                  >
                    {basicInfo.prayer_attendance >= 75
                      ? "Excellent"
                      : "Needs Improvement"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Due Amount */}
            <Card
              className={
                basicInfo.due_amount > 0
                  ? "border-destructive/50 bg-destructive/5"
                  : ""
              }
            >
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <DollarSign
                  className={`h-4 w-4 ${
                    basicInfo.due_amount > 0
                      ? "text-destructive"
                      : "text-primary"
                  }`}
                />
                <div className="ml-3">
                  <CardTitle className="text-sm font-medium">
                    Fee Status
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {basicInfo.due_amount > 0 ? (
                    <>
                      <div className="text-lg font-bold text-destructive">
                        ৳{basicInfo.due_amount}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Due for {basicInfo.due_month}
                      </div>
                      <Badge variant="destructive" className="text-xs">
                        Payment Required
                      </Badge>
                    </>
                  ) : (
                    <>
                      <div className="text-lg font-bold text-primary">৳0</div>
                      <div className="text-xs text-muted-foreground">
                        All payments up to date
                      </div>
                      <Badge variant="default" className="text-xs">
                        Paid
                      </Badge>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card
            className={`cursor-pointer transition-all hover:shadow-md ${
              activePhase === "personal" ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => setActivePhase("personal")}
          >
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              {getPhaseIcon("personal", completionStatus.personal)}
              <div className="ml-3">
                <CardTitle className="text-sm font-medium">
                  Phase 1: Personal
                </CardTitle>
                <CardDescription className="text-xs">
                  Basic personal information
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Progress
                  </span>
                  <span className="text-xs font-medium">
                    {completionStatus.personal}%
                  </span>
                </div>
                <Progress value={completionStatus.personal} className="h-1" />
              </div>
            </CardContent>
          </Card>

          <Card
            className={`cursor-pointer transition-all hover:shadow-md ${
              activePhase === "academic" ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => setActivePhase("academic")}
          >
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              {getPhaseIcon("academic", completionStatus.academic)}
              <div className="ml-3">
                <CardTitle className="text-sm font-medium">
                  Phase 2: Academic
                </CardTitle>
                <CardDescription className="text-xs">
                  Educational background
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Progress
                  </span>
                  <span className="text-xs font-medium">
                    {completionStatus.academic}%
                  </span>
                </div>
                <Progress value={completionStatus.academic} className="h-1" />
              </div>
            </CardContent>
          </Card>

          <Card
            className={`cursor-pointer transition-all hover:shadow-md ${
              activePhase === "emergency" ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => setActivePhase("emergency")}
          >
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              {getPhaseIcon("emergency", completionStatus.emergency)}
              <div className="ml-3">
                <CardTitle className="text-sm font-medium">
                  Phase 3: Emergency
                </CardTitle>
                <CardDescription className="text-xs">
                  Emergency contacts & identity
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Progress
                  </span>
                  <span className="text-xs font-medium">
                    {completionStatus.emergency}%
                  </span>
                </div>
                <Progress value={completionStatus.emergency} className="h-1" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs
          value={activePhase}
          onValueChange={setActivePhase}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger
              value="personal"
              className="flex items-center space-x-2"
            >
              <Users className="h-4 w-4" />
              <span>Personal</span>
            </TabsTrigger>
            <TabsTrigger
              value="academic"
              className="flex items-center space-x-2"
            >
              <GraduationCap className="h-4 w-4" />
              <span>Academic</span>
            </TabsTrigger>
            <TabsTrigger
              value="emergency"
              className="flex items-center space-x-2"
            >
              <Heart className="h-4 w-4" />
              <span>Emergency</span>
            </TabsTrigger>
          </TabsList>

          {/* Phase 1: Personal Details */}
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>Personal Information</span>
                </CardTitle>
                <CardDescription>
                  Complete your basic personal and family details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {message && (
                    <div className="text-green-600 bg-green-100 rounded p-2 text-sm mb-2">
                      <CheckCircle className="h-4 w-4" />
                      {message}
                    </div>
                  )}

                  {error && (
                    <div className="text-red-600 bg-red-100 rounded p-2 text-sm mb-2">
                      <AlertCircle className="h-4 w-4" />
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="full_name">Full Name *</Label>
                      <Input
                        id="full_name"
                        placeholder="Enter your full name"
                        value={profileData.full_name}
                        onChange={(e) =>
                          handleChange("full_name", e.target.value)
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date_of_birth">Date of Birth *</Label>
                      <Input
                        id="date_of_birth"
                        type="date"
                        value={profileData.date_of_birth}
                        onChange={(e) =>
                          handleChange("date_of_birth", e.target.value)
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="father_name">Father's Name *</Label>
                      <Input
                        id="father_name"
                        placeholder="Enter father's name"
                        value={profileData.father_name}
                        onChange={(e) =>
                          handleChange("father_name", e.target.value)
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mother_name">Mother's Name *</Label>
                      <Input
                        id="mother_name"
                        placeholder="Enter mother's name"
                        value={profileData.mother_name}
                        onChange={(e) =>
                          handleChange("mother_name", e.target.value)
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="blood_group">Blood Group *</Label>
                      <Select
                        value={profileData.blood_group}
                        onValueChange={(value) =>
                          handleChange("blood_group", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select blood group" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A+">A+</SelectItem>
                          <SelectItem value="A-">A-</SelectItem>
                          <SelectItem value="B+">B+</SelectItem>
                          <SelectItem value="B-">B-</SelectItem>
                          <SelectItem value="AB+">AB+</SelectItem>
                          <SelectItem value="AB-">AB-</SelectItem>
                          <SelectItem value="O+">O+</SelectItem>
                          <SelectItem value="O-">O-</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="religion">Religion *</Label>
                      <Input
                        id="religion"
                        placeholder="Enter your religion"
                        value={profileData.religion}
                        onChange={(e) =>
                          handleChange("religion", e.target.value)
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Contact Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={profileData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="guardian_contact">
                        Guardian Contact *
                      </Label>
                      <Input
                        id="guardian_contact"
                        type="tel"
                        placeholder="Enter guardian's phone number"
                        value={profileData.guardian_contact}
                        onChange={(e) =>
                          handleChange("guardian_contact", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="permanent_address">
                        Permanent Address *
                      </Label>
                      <Textarea
                        id="permanent_address"
                        placeholder="Enter your permanent address"
                        value={profileData.permanent_address}
                        onChange={(e) =>
                          handleChange("permanent_address", e.target.value)
                        }
                        required
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="current_address">Current Address *</Label>
                      <Textarea
                        id="current_address"
                        placeholder="Enter your current address"
                        value={profileData.current_address}
                        onChange={(e) =>
                          handleChange("current_address", e.target.value)
                        }
                        required
                        rows={3}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={saving}>
                    {saving ? (
                      "Saving..."
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Personal Information
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Phase 2: Academic Details */}
          <TabsContent value="academic">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <span>Academic Information</span>
                </CardTitle>
                <CardDescription>
                  Provide details about your educational background
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="student_type">Student Type *</Label>
                      <Select
                        value={profileData.student_type}
                        onValueChange={(value) =>
                          handleChange("student_type", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select student type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="school">School Student</SelectItem>
                          <SelectItem value="college">
                            College Student
                          </SelectItem>
                          <SelectItem value="nursing">
                            Nursing Student
                          </SelectItem>
                          <SelectItem value="university">
                            University Student
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="institute_name">
                        University / Institute Name *
                      </Label>
                      <Input
                        id="institute_name"
                        placeholder="Enter your institute name"
                        value={profileData.institute_name}
                        onChange={(e) =>
                          handleChange("institute_name", e.target.value)
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="department">Department *</Label>
                      <Input
                        id="department"
                        placeholder="Enter your department"
                        value={profileData.department}
                        onChange={(e) =>
                          handleChange("department", e.target.value)
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="semester_year">Semester / Year *</Label>
                      <Input
                        id="semester_year"
                        placeholder="e.g., 3rd Semester, 2nd Year"
                        value={profileData.semester_year}
                        onChange={(e) =>
                          handleChange("semester_year", e.target.value)
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="admission_session">
                        Admission Session *
                      </Label>
                      <Input
                        id="admission_session"
                        placeholder="e.g., 2023-2024, Spring 2023"
                        value={profileData.admission_session}
                        onChange={(e) =>
                          handleChange("admission_session", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={saving}>
                    {saving ? (
                      "Saving..."
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Academic Information
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Phase 3: Emergency + Identity */}
          <TabsContent value="emergency">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-primary" />
                  <span>Emergency & Identity</span>
                </CardTitle>
                <CardDescription>
                  Emergency contacts, medical information, and identity
                  documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">
                      Emergency Contact Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="emergency_contact_name">
                          Emergency Contact Name *
                        </Label>
                        <Input
                          id="emergency_contact_name"
                          placeholder="Enter emergency contact name"
                          value={profileData.emergency_contact_name}
                          onChange={(e) =>
                            handleChange(
                              "emergency_contact_name",
                              e.target.value
                            )
                          }
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="emergency_contact_phone">
                          Emergency Contact Phone *
                        </Label>
                        <Input
                          id="emergency_contact_phone"
                          type="tel"
                          placeholder="Enter emergency contact phone"
                          value={profileData.emergency_contact_phone}
                          onChange={(e) =>
                            handleChange(
                              "emergency_contact_phone",
                              e.target.value
                            )
                          }
                          required
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="emergency_contact_relation">
                          Relationship *
                        </Label>
                        <Select
                          value={profileData.emergency_contact_relation}
                          onValueChange={(value) =>
                            handleChange("emergency_contact_relation", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select relationship" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="parent">Parent</SelectItem>
                            <SelectItem value="guardian">Guardian</SelectItem>
                            <SelectItem value="sibling">Sibling</SelectItem>
                            <SelectItem value="relative">Relative</SelectItem>
                            <SelectItem value="friend">Friend</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">
                      Medical Information
                    </h4>
                    <div className="space-y-2">
                      <Label htmlFor="medical_conditions">
                        Medical Conditions
                      </Label>
                      <Textarea
                        id="medical_conditions"
                        placeholder="List any medical conditions, allergies, or medications (optional)"
                        value={profileData.medical_conditions}
                        onChange={(e) =>
                          handleChange("medical_conditions", e.target.value)
                        }
                        rows={3}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">
                      Document Uploads
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="profile_photo">
                          Passport-size Photo
                        </Label>
                        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                          <Camera className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground mb-2">
                            Upload your passport-size photo
                          </p>
                          <Button variant="outline" size="sm">
                            <Upload className="h-4 w-4 mr-2" />
                            Choose File
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="id_card_upload">NID / ID Card</Label>
                        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                          <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground mb-2">
                            Upload your NID or ID card
                          </p>
                          <Button variant="outline" size="sm">
                            <Upload className="h-4 w-4 mr-2" />
                            Choose File
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={saving}>
                    {saving ? (
                      "Saving..."
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Emergency & Identity Information
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
