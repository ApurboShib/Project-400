import {
  Home,
  User,
  CreditCard,
  UtensilsCrossed,
  CalendarDays,
  Calendar,
  Bell,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Separator from "@/components/ui/separator";
import { useState } from "react";

const primaryNav = [
  { to: "/student/dashboard", label: "Dashboard", icon: Home },
  { to: "/student/profile", label: "My Profile", icon: User },
  { to: "/student/fees", label: "Fees", icon: CreditCard },
];

const lifeNav = [
  { to: "/student/meals", label: "Meals", icon: UtensilsCrossed },
  { to: "/student/leave", label: "Leave", icon: CalendarDays },
  { to: "/student/events", label: "Events", icon: Calendar },
  { to: "/student/notices", label: "Notices", icon: Bell },
];

export default function DashboardSidebar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const [openLife, setOpenLife] = useState(true);

  const renderLink = (item) => {
    const active = isActive(item.to);
    const Icon = item.icon;
    return (
      <Link
        key={item.to}
        to={item.to}
        className={`group relative flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-xs tracking-wide transition-all duration-300 outline-none ${
          active
            ? "text-primary bg-primary/10 shadow-soft"
            : "text-content-muted hover:text-content hover:bg-overlay/30"
        }`}
      >
        <span
          className={`pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r-full h-6 bg-gradient-to-b from-aurora-1 to-aurora-3 transition-opacity duration-300 ${
            active ? "opacity-100" : "opacity-0 group-hover:opacity-70"
          }`}
        />
        <Icon className="h-5 w-5 shrink-0" />
        <span className="flex-1">{item.label}</span>
        {!active && (
          <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-radial-soft" />
        )}
      </Link>
    );
  };

  return (
    <aside className="w-64 min-h-screen border-r border-border/60 bg-surface/55 backdrop-blur-md glass-panel flex flex-col overflow-y-auto">
      <div className="p-5 flex flex-col gap-6">
        {/* Profile Block */}
        <div className="relative rounded-xl p-4 bg-gradient-to-br from-aurora-2/10 via-aurora-3/10 to-aurora-4/10 border border-border/50">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-overlay/50 flex items-center justify-center text-primary font-semibold tracking-wide">
              <span>ST</span>
              <span className="absolute inset-0 rounded-full ring-1 ring-primary/30 animate-pulse-soft" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">Student User</p>
              <p className="text-[11px] uppercase tracking-wide text-content-muted">
                Active Member
              </p>
            </div>
          </div>
        </div>

        {/* Primary Navigation */}
        <nav className="space-y-1">
          <p className="px-3 pb-1 text-[10px] font-semibold tracking-[0.15em] text-content-muted uppercase">
            Core
          </p>
          {primaryNav.map(renderLink)}
        </nav>

        {/* Collapsible Life Section */}
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setOpenLife((o) => !o)}
            className="w-full flex items-center gap-2 px-3 py-2 text-left text-[10px] font-semibold tracking-[0.15em] text-content-muted uppercase hover:text-content transition-colors"
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                openLife ? "rotate-0" : "-rotate-90"
              }`}
            />
            Campus Life
          </button>
          <div
            className={`mt-1 space-y-1 overflow-hidden transition-[height] duration-500 ease-out ${
              openLife ? "h-auto" : "h-0"
            }`}
          >
            {openLife && lifeNav.map(renderLink)}
          </div>
        </div>

        <Separator className="my-4" />
        <div>
          <Link
            to="/logout"
            className="group relative flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-xs tracking-wide text-danger hover:text-danger-fg/90 hover:bg-danger/10 transition-all duration-300"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
            <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-danger/5" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
