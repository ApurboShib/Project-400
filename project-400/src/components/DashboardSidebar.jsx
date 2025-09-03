import {
  Home,
  User,
  CreditCard,
  UtensilsCrossed,
  CalendarDays,
  Calendar,
  Bell,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";
import Separator from "@/components/ui/separator";

export default function DashboardSidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gray-100 border-r border-gray-300">
      <div className="p-6">
        <nav className="space-y-2">
          <Link
            to="/student/dashboard"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-gray-200 text-gray-900 font-semibold"
          >
            <Home className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          <Link
            to="/student/profile"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-colors"
          >
            <User className="h-5 w-5" />
            <span>My Profile</span>
          </Link>
          <Link
            to="/student/fees"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-colors"
          >
            <CreditCard className="h-5 w-5" />
            <span>Fees</span>
          </Link>
          <Link
            to="/student/meals"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-colors"
          >
            <UtensilsCrossed className="h-5 w-5" />
            <span>Meals</span>
          </Link>
          <Link
            to="/student/leave"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-colors"
          >
            <CalendarDays className="h-5 w-5" />
            <span>Leave</span>
          </Link>
          <Link
            to="/student/events"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-colors"
          >
            <Calendar className="h-5 w-5" />
            <span>Events</span>
          </Link>
          <Link
            to="/student/notices"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-colors"
          >
            <Bell className="h-5 w-5" />
            <span>Notices</span>
          </Link>
          <Separator className="my-4" />
          <Link
            to="/logout"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-red-100 hover:text-red-700 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </Link>
        </nav>
      </div>
    </aside>
  );
}
