"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/language-context";
import { Plus, MessageSquare, Calendar, User, Clock, Send } from "lucide-react";
import { format } from "date-fns";

interface StandupEntry {
  id: string;
  author: string;
  role: string;
  date: string;
  yesterday: string;
  today: string;
  blockers: string;
  mood: "happy" | "neutral" | "stressed";
}

const initialStandups: StandupEntry[] = [
  {
    id: "1",
    author: "John Doe",
    role: "Frontend Developer",
    date: new Date().toISOString(),
    yesterday: "Completed the dashboard layout and sidebar component",
    today: "Working on the standups page implementation",
    blockers: "Waiting for API endpoints",
    mood: "happy",
  },
  {
    id: "2",
    author: "Jane Smith",
    role: "Backend Developer",
    date: new Date(Date.now() - 86400000).toISOString(),
    yesterday: "Set up the database schema",
    today: "Implementing user authentication",
    blockers: "None",
    mood: "neutral",
  },
  {
    id: "3",
    author: "Alex Johnson",
    role: "Designer",
    date: new Date(Date.now() - 172800000).toISOString(),
    yesterday: "Created wireframes for the new features",
    today: "Reviewing UI components",
    blockers: "Need feedback on color scheme",
    mood: "stressed",
  },
];

export default function StandupsPage() {
  const { t } = useLanguage();
  const [standups, setStandups] = useState<StandupEntry[]>(initialStandups);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newStandup, setNewStandup] = useState({
    yesterday: "",
    today: "",
    blockers: "",
    mood: "neutral" as const,
  });

  const handleSubmitStandup = () => {
    const entry: StandupEntry = {
      id: Date.now().toString(),
      author: "Current User",
      role: "Team Member",
      date: new Date().toISOString(),
      ...newStandup,
    };
    setStandups([entry, ...standups]);
    setNewStandup({ yesterday: "", today: "", blockers: "", mood: "neutral" });
    setIsDialogOpen(false);
  };

  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case "happy":
        return "😊";
      case "neutral":
        return "😐";
      case "stressed":
        return "😅";
      default:
        return "😐";
    }
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case "happy":
        return "bg-green-500";
      case "neutral":
        return "bg-gray-500";
      case "stressed":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Daily Standups</h1>
          <p className="text-muted-foreground">
            Track what your team is working on
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Standup
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Your Daily Standup</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  What did you do yesterday?
                </label>
                <Textarea
                  placeholder="I completed..."
                  value={newStandup.yesterday}
                  onChange={(e) =>
                    setNewStandup({ ...newStandup, yesterday: e.target.value })
                  }
                  className="min-h-[80px]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  What will you do today?
                </label>
                <Textarea
                  placeholder="I will work on..."
                  value={newStandup.today}
                  onChange={(e) =>
                    setNewStandup({ ...newStandup, today: e.target.value })
                  }
                  className="min-h-[80px]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Any blockers or impediments?
                </label>
                <Textarea
                  placeholder="I'm blocked by..."
                  value={newStandup.blockers}
                  onChange={(e) =>
                    setNewStandup({ ...newStandup, blockers: e.target.value })
                  }
                  className="min-h-[80px]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">How are you feeling?</label>
                <Select
                  value={newStandup.mood}
                  onValueChange={(value: "happy" | "neutral" | "stressed") =>
                    setNewStandup({ ...newStandup, mood: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="happy">😊 Happy</SelectItem>
                    <SelectItem value="neutral">😐 Neutral</SelectItem>
                    <SelectItem value="stressed">😅 Stressed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSubmitStandup} className="w-full">
                <Send className="w-4 h-4 mr-2" />
                Submit Standup
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {standups.map((standup) => (
          <Card key={standup.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{standup.author}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {standup.role}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className={getMoodColor(standup.mood)}>
                    {getMoodEmoji(standup.mood)}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {format(new Date(standup.date), "MMM dd, yyyy")}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-blue-500" />
                    <h4 className="font-medium">Yesterday</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {standup.yesterday}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-green-500" />
                    <h4 className="font-medium">Today</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {standup.today}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-red-500" />
                    <h4 className="font-medium">Blockers</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {standup.blockers || "No blockers"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
