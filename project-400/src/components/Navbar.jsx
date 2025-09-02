import { Button } from "@/components/ui/button";
import { Building2, LogIn, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-[color:var(--background)]/95 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--background)]/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Building2 className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-foreground">UNC</span>
        </div>
        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="text-foreground hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Contact
          </Link>
        </nav>
        {/* Auth Buttons */}
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/signup">
              <UserPlus className="h-4 w-4 mr-2" />
              Sign Up
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
