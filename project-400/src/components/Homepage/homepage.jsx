// Example icons for demonstration (replace with your own SVGs or icon components)
const Building2Icon = () => (
  <span role="img" aria-label="building">
    🏢
  </span>
);
const CreditCardIcon = () => (
  <span role="img" aria-label="credit-card">
    💳
  </span>
);
const UtensilsCrossedIcon = () => (
  <span role="img" aria-label="utensils">
    🍽️
  </span>
);
const HeartIcon = () => (
  <span role="img" aria-label="heart">
    ❤️
  </span>
);
const UsersIcon = () => (
  <span role="img" aria-label="users">
    👥
  </span>
);
const CalendarIcon = () => (
  <span role="img" aria-label="calendar">
    📅
  </span>
);
const LogInIcon = () => (
  <span role="img" aria-label="login">
    🔑
  </span>
);
const UserPlusIcon = () => (
  <span role="img" aria-label="user-plus">
    ➕
  </span>
);

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Building2Icon className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">UNC</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="/"
              className="text-foreground hover:text-primary transition-colors"
            >
              Home
            </a>
            <a
              href="/about"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              About
            </a>
            <a
              href="/contact"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            <a href="/login" className="btn btn-ghost btn-sm">
              <LogInIcon /> Login
            </a>
            <a href="/signup" className="btn btn-sm">
              <UserPlusIcon /> Sign Up
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container px-4 py-16 md:py-24">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="space-y-4 max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              UNC – Smart Living & Hostel Management Portal
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Your all-in-one hostel platform for meals, fees, prayer, events,
              and leadership.
            </p>
          </div>

          {/* Login Options */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <a href="/student-login" className="btn btn-lg flex-1">
              Student Login
            </a>
            <a href="/admin-login" className="btn btn-lg btn-secondary flex-1">
              Admin Login
            </a>
            <a
              href="/guest"
              className="btn btn-lg btn-outline flex-1 bg-transparent"
            >
              Guest Access
            </a>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="container px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need for Hostel Life
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Streamline your hostel experience with our comprehensive management
            system
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Smart Fee Tracker */}
          <div className="card relative overflow-hidden">
            <div className="card-header">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <CreditCardIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="card-title text-xl">Smart Fee Tracker</div>
                  <span className="badge badge-secondary mt-1">Automated</span>
                </div>
              </div>
            </div>
            <div className="card-content">
              <div className="card-description text-base">
                Auto deduction for long leaves. Never worry about manual
                calculations again.
              </div>
            </div>
          </div>

          {/* Meal Planner */}
          <div className="card relative overflow-hidden">
            <div className="card-header">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <UtensilsCrossedIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="card-title text-xl">Meal Planner</div>
                  <span className="badge badge-secondary mt-1">
                    Student Managed
                  </span>
                </div>
              </div>
            </div>
            <div className="card-content">
              <div className="card-description text-base">
                Set by student manager. View weekly menu anytime, anywhere.
              </div>
            </div>
          </div>

          {/* Prayer & Geeta Class */}
          <div className="card relative overflow-hidden">
            <div className="card-header">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <HeartIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="card-title text-xl">Prayer & Geeta Class</div>
                  <span className="badge badge-secondary mt-1">Mandatory</span>
                </div>
              </div>
            </div>
            <div className="card-content">
              <div className="card-description text-base">
                Track mandatory attendance for daily prayers and weekly Geeta
                classes.
              </div>
            </div>
          </div>

          {/* Monthly Student Manager */}
          <div className="card relative overflow-hidden">
            <div className="card-header">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <UsersIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="card-title text-xl">
                    Monthly Student Manager
                  </div>
                  <span className="badge badge-secondary mt-1">Leadership</span>
                </div>
              </div>
            </div>
            <div className="card-content">
              <div className="card-description text-base">
                Student-led leadership system. Rotate monthly for fair
                governance.
              </div>
            </div>
          </div>

          {/* Leave System */}
          <div className="card relative overflow-hidden">
            <div className="card-header">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <CalendarIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="card-title text-xl">Leave System</div>
                  <span className="badge badge-secondary mt-1">
                    Smart Detection
                  </span>
                </div>
              </div>
            </div>
            <div className="card-content">
              <div className="card-description text-base">
                Auto-detect and reduce fee after 6+ days leave. Transparent and
                fair.
              </div>
            </div>
          </div>

          {/* Additional Features Card */}
          <div className="card relative overflow-hidden md:col-span-2 lg:col-span-1">
            <div className="card-header">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Building2Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="card-title text-xl">Complete Management</div>
                  <span className="badge badge-secondary mt-1">All-in-One</span>
                </div>
              </div>
            </div>
            <div className="card-content">
              <div className="card-description text-base">
                Events, notices, complaints, room management, and much more in
                one platform.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="container px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Building2Icon className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold text-foreground">
                UNC Portal
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 UNC Hostel Management Portal. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
