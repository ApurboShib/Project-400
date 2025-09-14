import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "@/components/Homepage/homepage";
import StudentProfile from "@/pages/Student-profile/StudentProfile";
import StudentLoginPage from "@/pages/StudentLogin";
import ManagerLoginPage from "@/pages/ManagerLogin";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import StudentSignupPage from "@/pages/StudentSignup";
import StudentDashboardPage from "@/pages/student-dashboard/StudentDashboard";
import StudentFee from "@/pages/Student-Fee/StudentFee";
import ManagerSignupPage from "@/pages/ManagerSignup";
// import AdminSignupPage from "@/pages/AdminSignup";
import AdminLogin from "@/pages/AdminLogin";
import AdminSignup from "@/pages/AdminSignup";
import StudentLeave from "@/pages/student-leave/StudentLeave";
import StudentMeals from "@/pages/student-meals/StudentMeals";
import StudentNotices from "@/pages/student-notices/StudentNotices";
import StudentEvents from "@/pages/student-events/StudentEvents";
<Route path="/admin-signup" element={<AdminSignup />} />;
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import "./index.css";

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/student-login" element={<StudentLoginPage />} />
          <Route path="/manager-login" element={<ManagerLoginPage />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/student-signup" element={<StudentSignupPage />} />
          <Route path="/student/dashboard" element={<StudentDashboardPage />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/student/fees" element={<StudentFee />} />
          <Route path="/manager-signup" element={<ManagerSignupPage />} />
          <Route path="/admin-signup" element={<AdminSignup />} />
          <Route path="/student/leave" element={<StudentLeave />} />
          <Route path="/student/meals" element={<StudentMeals />} />
          <Route path="/student/notices" element={<StudentNotices />} />
          <Route path="/student/events" element={<StudentEvents />} />
        </Routes>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default App;
