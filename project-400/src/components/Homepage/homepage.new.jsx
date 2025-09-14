import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  UtensilsCrossed,
  Heart,
  Users,
  Calendar,
  Building2,
} from "lucide-react";
import SacredSymbolCycler from "@/components/SacredSymbolCycler";
import { Link } from "react-router-dom";

const features = [
  {
    icon: CreditCard,
    title: "Smart Fee Tracker",
    badge: "Automated",
    desc: "Auto deduction for long leaves. Never worry about manual calculations again.",
  },
  {
    icon: UtensilsCrossed,
    title: "Meal Planner",
    badge: "Student Managed",
    desc: "Set by student manager. View weekly menu anytime, anywhere.",
  },
  {
    icon: Heart,
    title: "Prayer & Geeta Class",
    badge: "Mandatory",
    desc: "Track attendance for daily prayers and weekly Geeta classes.",
  },
  {
    icon: Users,
    title: "Monthly Student Manager",
    badge: "Leadership",
    desc: "Rotating leadership model for fairness and responsibility.",
  },
  {
    icon: Calendar,
    title: "Leave System",
    badge: "Smart Detection",
    desc: "Auto-detect & reduce fees after extended leave—transparent and fair.",
  },
  {
    icon: Building2,
    title: "Complete Management",
    badge: "All-in-One",
    desc: "Events, notices, complaints, rooms & more unified in one platform.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 select-none overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-aurora opacity-[0.07] animate-aurora-shift" />
        <div className="absolute -top-32 -left-32 w-[42rem] h-[42rem] rounded-full blur-3xl bg-aurora-2/20" />
        <div className="absolute -bottom-40 -right-40 w-[46rem] h-[46rem] rounded-full blur-3xl bg-aurora-3/20" />
      </div>
      <section className="relative container px-4 pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="mx-auto max-w-6xl flex flex-col-reverse lg:flex-row items-center gap-12">
          <div className="w-full text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface/60 backdrop-blur px-4 py-1 text-xs tracking-wide uppercase font-medium text-content-muted mb-6 glass-panel animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-soft" />{" "}
              Launching Excellence
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight gradient-text animate-reveal">
              UNC Smart Living & Hostel Management Portal
            </h1>
            <p className="mt-6 text-lg md:text-2xl text-content-muted max-w-3xl animate-slide-up">
              Meals, fees, attendance, leadership & wellbeing—streamlined with
              an adaptive, transparent system.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full max-w-xl animate-scale-in">
              <Button size="lg" className="flex-1 btn-primary-gradient" asChild>
                <Link to="/student-login">Student Login</Link>
              </Button>
              <Button size="lg" variant="secondary" className="flex-1" asChild>
                <Link to="/admin-login">Admin Login</Link>
              </Button>
            </div>
          </div>
          <div className="w-full flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square">
              <div
                aria-hidden
                className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-aurora-2/25 via-aurora-3/20 to-aurora-4/30 blur-2xl"
              />
              <div className="absolute inset-0 rounded-[2rem] border border-border/50 backdrop-blur-2xl bg-surface/35 shadow-elevated overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 opacity-30 bg-gradient-radial-soft" />
                <SacredSymbolCycler />
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                >
                  <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-primary/25 to-transparent" />
                  <div className="absolute bottom-0 right-0 w-28 h-28 bg-gradient-to-tl from-aurora-3/30 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative container px-4 pb-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-content mb-4">
            Everything You Need For Hostel Life
          </h2>
          <p className="text-content-muted max-w-2xl mx-auto text-lg">
            Streamline your hostel experience with our comprehensive management
            system.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <Card
                key={f.title}
                className="relative overflow-hidden glass-panel hover-lift group"
              >
                <div className="absolute inset-px rounded-[calc(var(--radius)-1px)] bg-gradient-radial-soft opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <CardHeader className="relative z-10">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-primary/12 text-primary shadow-soft">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold tracking-tight">
                        {f.title}
                      </CardTitle>
                      <Badge
                        variant="secondary"
                        className="mt-1 text-[11px] tracking-wide uppercase"
                      >
                        {f.badge}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CardDescription className="text-sm leading-relaxed text-content-muted">
                    {f.desc}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
      <footer className="relative border-t border-border/70 bg-surface/60 backdrop-blur">
        <div className="container px-4 py-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Building2 className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold">UNC Portal</span>
            </div>
            <p className="text-xs md:text-sm text-content-muted tracking-wide">
              © {new Date().getFullYear()} UNC Hostel Management Portal. All
              rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
