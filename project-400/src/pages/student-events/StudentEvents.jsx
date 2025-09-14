import { useEffect, useState } from "react";
import StudentSidebar from "@/components/StudentSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, MapPin, RefreshCcw, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StudentEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchEvents = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/events", { credentials: "include" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load events");
      setEvents(data.events || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const filtered = events.filter(
    (e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      (e.description || "").toLowerCase().includes(search.toLowerCase()) ||
      (e.location || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background flex">
      <StudentSidebar />
      <div className="flex-1 p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold">Upcoming Events</h1>
              <p className="text-muted-foreground">
                Club, cultural and hostel activities
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <Input
                placeholder="Search events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-56"
              />
              <Button
                variant="outline"
                className="bg-transparent"
                onClick={fetchEvents}
                disabled={loading}
              >
                {loading ? "Loading" : <RefreshCcw className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          {loading ? (
            <div className="p-6 text-center">Loading events...</div>
          ) : filtered.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center text-muted-foreground">
                No events found.
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((ev) => (
                <Card key={ev.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-lg">
                      <span>{ev.title}</span>
                      <Badge variant="secondary">
                        {ev.event_type || "general"}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm text-muted-foreground leading-relaxed">
                      {ev.description || "No description provided."}
                    </div>
                    <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />{" "}
                        {new Date(ev.event_date).toLocaleDateString()}
                      </div>
                      {ev.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" /> {ev.location}
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" /> Posted{" "}
                        {new Date(ev.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
