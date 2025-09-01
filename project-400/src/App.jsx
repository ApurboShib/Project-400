import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "@/components/Homepage/homepage";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
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
          <Route
            path="/student-login"
            element={<div>Student Login Page</div>}
          />
          <Route path="/admin-login" element={<div>Admin Login Page</div>} />
          <Route path="/guest" element={<div>Guest Access Page</div>} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default App;
