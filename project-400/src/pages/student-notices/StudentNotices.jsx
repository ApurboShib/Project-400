import { useEffect, useState, useMemo } from "react";
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
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  Search,
  Calendar,
  AlertCircle,
  Info,
  CheckCircle,
  Pin,
} from "lucide-react";

export default function StudentNotices() {
  const [searchTerm, setSearchTerm] = useState("");
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNotices = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/notices", { credentials: "include" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load notices");
      setNotices(data.notices || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const getNoticeIcon = (type) => {
    switch (type) {
      case "important":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getNoticeVariant = (type) => {
    switch (type) {
      case "important":
        return "destructive";
      case "warning":
        return "secondary";
      case "success":
        return "default";
      default:
        return "outline";
    }
  };

  const processed = useMemo(() => {
    return notices.map((n) => ({
      id: n.id,
      title: n.title,
      content: n.content,
      type: n.notice_type || "general",
      date: n.created_at,
      isPinned: n.is_urgent || false,
      author: n.created_by_name || "Admin",
      category: n.notice_type || "General",
    }));
  }, [notices]);

  const filteredNotices = processed.filter(
    (notice) =>
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pinnedNotices = filteredNotices.filter((notice) => notice.isPinned);
  const regularNotices = filteredNotices.filter((notice) => !notice.isPinned);
  const categories = [...new Set(processed.map((notice) => notice.category))];

  const NoticeCard = ({ notice }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            {notice.isPinned && <Pin className="h-4 w-4 text-primary" />}
            {getNoticeIcon(notice.type)}
            <CardTitle className="text-lg">{notice.title}</CardTitle>
          </div>
          <Badge variant={getNoticeVariant(notice.type)}>
            {notice.category}
          </Badge>
        </div>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <span className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {new Date(notice.date).toLocaleDateString()}
          </span>
          <span>By {notice.author}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed">{notice.content}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background flex">
      <StudentSidebar />
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Notices & Announcements</h1>
              <p className="text-muted-foreground">
                Latest updates from administration
              </p>
            </div>
            <Button
              variant="outline"
              className="bg-transparent"
              onClick={fetchNotices}
              disabled={loading}
            >
              {loading ? "Refreshing..." : "Refresh"}
            </Button>
          </div>
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
          </div>
          {loading ? (
            <div className="p-6 text-center">Loading notices...</div>
          ) : (
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pinned">Pinned</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="categories">Categories</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-6">
                <div className="space-y-4">
                  {pinnedNotices.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <Pin className="h-5 w-5 mr-2 text-primary" />
                        Pinned Notices
                      </h3>
                      <div className="space-y-4 mb-6">
                        {pinnedNotices.map((notice) => (
                          <NoticeCard key={notice.id} notice={notice} />
                        ))}
                      </div>
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Bell className="h-5 w-5 mr-2" />
                      All Notices
                    </h3>
                    <div className="space-y-4">
                      {regularNotices.map((notice) => (
                        <NoticeCard key={notice.id} notice={notice} />
                      ))}
                      {regularNotices.length === 0 &&
                        pinnedNotices.length === 0 && (
                          <Card>
                            <CardContent className="py-8 text-center text-muted-foreground">
                              No notices found.
                            </CardContent>
                          </Card>
                        )}
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="pinned" className="mt-6">
                <div className="space-y-4">
                  {pinnedNotices.length > 0 ? (
                    pinnedNotices.map((notice) => (
                      <NoticeCard key={notice.id} notice={notice} />
                    ))
                  ) : (
                    <Card>
                      <CardContent className="text-center py-8 text-muted-foreground">
                        No pinned notices.
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="recent" className="mt-6">
                <div className="space-y-4">
                  {filteredNotices
                    .slice() // copy
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .slice(0, 5)
                    .map((notice) => (
                      <NoticeCard key={notice.id} notice={notice} />
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="categories" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {categories.map((category) => {
                    const categoryNotices = filteredNotices.filter(
                      (n) => n.category === category
                    );
                    return (
                      <Card
                        key={category}
                        className="hover:shadow-md transition-shadow"
                      >
                        <CardHeader>
                          <CardTitle className="text-lg">{category}</CardTitle>
                          <CardDescription>
                            {categoryNotices.length} notices
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    );
                  })}
                </div>
                <div className="space-y-6">
                  {categories.map((category) => {
                    const categoryNotices = filteredNotices.filter(
                      (n) => n.category === category
                    );
                    return (
                      <div key={category}>
                        <h3 className="text-lg font-semibold mb-4">
                          {category}
                        </h3>
                        <div className="space-y-4">
                          {categoryNotices.map((notice) => (
                            <NoticeCard key={notice.id} notice={notice} />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  );
}
