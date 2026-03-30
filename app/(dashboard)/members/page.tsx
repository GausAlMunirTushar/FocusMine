"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/language-context";
import {
  Plus,
  MoreVertical,
  Mail,
  User,
  Search,
  UserPlus,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
} from "lucide-react";

interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "away";
  avatar?: string;
  tasksCompleted: number;
  pomodorosToday: number;
}

const initialMembers: Member[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Frontend Developer",
    status: "active",
    tasksCompleted: 24,
    pomodorosToday: 6,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Backend Developer",
    status: "active",
    tasksCompleted: 31,
    pomodorosToday: 8,
  },
  {
    id: "3",
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "Designer",
    status: "away",
    tasksCompleted: 18,
    pomodorosToday: 3,
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah@example.com",
    role: "Project Manager",
    status: "inactive",
    tasksCompleted: 12,
    pomodorosToday: 0,
  },
  {
    id: "5",
    name: "Mike Brown",
    email: "mike@example.com",
    role: "Full Stack Developer",
    status: "active",
    tasksCompleted: 42,
    pomodorosToday: 7,
  },
];

export default function MembersPage() {
  const { t } = useLanguage();
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    role: "",
  });

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddMember = () => {
    const member: Member = {
      id: Date.now().toString(),
      ...newMember,
      status: "active",
      tasksCompleted: 0,
      pomodorosToday: 0,
    };
    setMembers([...members, member]);
    setNewMember({ name: "", email: "", role: "" });
    setIsDialogOpen(false);
  };

  const handleDeleteMember = (id: string) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "inactive":
        return "bg-gray-500";
      case "away":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const activeMembers = members.filter((m) => m.status === "active").length;
  const totalTasks = members.reduce((sum, m) => sum + m.tasksCompleted, 0);
  const totalPomodoros = members.reduce(
    (sum, m) => sum + m.pomodorosToday,
    0
  );

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Team Members</h1>
          <p className="text-muted-foreground">
            Manage your team and track productivity
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="w-4 h-4 mr-2" />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Team Member</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input
                  placeholder="John Doe"
                  value={newMember.name}
                  onChange={(e) =>
                    setNewMember({ ...newMember, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  value={newMember.email}
                  onChange={(e) =>
                    setNewMember({ ...newMember, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Role</label>
                <Input
                  placeholder="Frontend Developer"
                  value={newMember.role}
                  onChange={(e) =>
                    setNewMember({ ...newMember, role: e.target.value })
                  }
                />
              </div>
              <Button onClick={handleAddMember} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Member
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{members.length}</div>
            <p className="text-xs text-muted-foreground">
              {activeMembers} active now
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tasks Completed
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTasks}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today&apos;s Pomodoros
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPomodoros}</div>
            <p className="text-xs text-muted-foreground">Focus sessions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Productivity</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {members.length > 0
                ? Math.round(totalTasks / members.length)
                : 0}
            </div>
            <p className="text-xs text-muted-foreground">Avg tasks/member</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredMembers.map((member) => (
          <Card key={member.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                      {getInitials(member.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {member.role}
                    </p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Mail className="w-4 h-4 mr-2" />
                      Send Email
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Member
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDeleteMember(member.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${getStatusColor(
                    member.status
                  )}`}
                />
                <Badge variant="secondary" className="capitalize">
                  {member.status}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                {member.email}
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-xs text-muted-foreground">
                    Tasks Completed
                  </p>
                  <p className="text-lg font-semibold">{member.tasksCompleted}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Pomodoros Today
                  </p>
                  <p className="text-lg font-semibold">{member.pomodorosToday}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-12">
          <User className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold">No members found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or add a new member
          </p>
        </div>
      )}
    </div>
  );
}
