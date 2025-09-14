import { useEffect, useState } from "react";
import StudentSidebar from "@/components/StudentSidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, UtensilsCrossed, Clock, ChefHat, Star } from "lucide-react";

// Helper to get Monday of current week
function getWeekStart(date = new Date()) {
  const d = new Date(date);
  const day = d.getDay(); // 0 Sun .. 6 Sat
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when Sunday
  const monday = new Date(d.setDate(diff));
  monday.setHours(0, 0, 0, 0);
  return monday.toISOString().split("T")[0];
}

const dayNames = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export default function StudentMeals() {
  const [weekStart, setWeekStart] = useState(getWeekStart());
  const [mealPlans, setMealPlans] = useState([]); // raw rows from API
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMeals = async (week) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/meals?week=${encodeURIComponent(week)}`, {
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load meals");
      setMealPlans(data.mealPlans || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals(weekStart);
  }, [weekStart]);

  // Transform rows into structure { monday: { breakfast: {...}, lunch: {...} ... } }
  const structured = dayNames.reduce((acc, d, idx) => {
    const row = mealPlans.find((r) => r.day_of_week === idx);
    if (row) {
      acc[d] = {
        breakfast: row.breakfast ? { name: row.breakfast } : null,
        lunch: row.lunch ? { name: row.lunch } : null,
        dinner: row.dinner ? { name: row.dinner } : null,
      };
    } else {
      acc[d] = { breakfast: null, lunch: null, dinner: null };
    }
    return acc;
  }, {});

  const todayKey = new Date()
    .toLocaleDateString("en-US", { weekday: "long" })
    .toLowerCase();
  const todayMeals = structured[todayKey];

  const changeWeek = (direction) => {
    const current = new Date(weekStart + "T00:00:00");
    current.setDate(current.getDate() + direction * 7);
    setWeekStart(current.toISOString().split("T")[0]);
  };

  const renderStars = (rating) => {
    if (!rating) return null;
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background flex">
      <StudentSidebar />
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold">Meal Management</h1>
              <p className="text-muted-foreground">
                Weekly meal schedule and today's menu
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="bg-transparent"
                onClick={() => changeWeek(-1)}
              >
                &lt; Prev Week
              </Button>
              <Badge variant="secondary">Week of {weekStart}</Badge>
              <Button
                variant="outline"
                className="bg-transparent"
                onClick={() => changeWeek(1)}
              >
                Next Week &gt;
              </Button>
            </div>
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          {loading ? (
            <div className="p-6 text-center">Loading meals...</div>
          ) : (
            <>
              {/* Today's Meals */}
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <UtensilsCrossed className="h-6 w-6 mr-2" />
                  Today's Meals
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {todayMeals &&
                    Object.entries(todayMeals).map(([mealType, meal]) => (
                      <Card
                        key={mealType}
                        className="hover:shadow-md transition-shadow"
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg capitalize">
                              {mealType}
                            </CardTitle>
                            <Badge
                              variant={
                                mealType === "breakfast"
                                  ? "default"
                                  : mealType === "lunch"
                                  ? "secondary"
                                  : "outline"
                              }
                            >
                              <Clock className="h-3 w-3 mr-1" />
                              Scheduled
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <h3 className="font-semibold mb-2">
                            {meal ? meal.name : "—"}
                          </h3>
                          <div className="flex items-center space-x-1">
                            {renderStars(meal?.rating)}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>

              {/* Weekly Meal Plan */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>Weekly Meal Plan</span>
                  </CardTitle>
                  <CardDescription>Meals for the selected week</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue={todayKey} className="w-full">
                    <TabsList className="grid w-full grid-cols-7">
                      {dayNames.map((day) => (
                        <TabsTrigger
                          key={day}
                          value={day}
                          className="capitalize text-xs"
                        >
                          {day.slice(0, 3)}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    {dayNames.map((day) => {
                      const meals = structured[day];
                      return (
                        <TabsContent key={day} value={day} className="mt-6">
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold capitalize">
                              {day}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {["breakfast", "lunch", "dinner"].map((mt) => (
                                <Card
                                  key={mt}
                                  className="border-l-4 border-l-primary"
                                >
                                  <CardHeader className="pb-2">
                                    <CardTitle className="text-base capitalize flex items-center justify-between">
                                      {mt}
                                      <ChefHat className="h-4 w-4 text-muted-foreground" />
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <p className="font-medium mb-2">
                                      {meals[mt] ? meals[mt].name : "Not set"}
                                    </p>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </div>
                        </TabsContent>
                      );
                    })}
                  </Tabs>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
