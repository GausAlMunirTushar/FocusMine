"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BookOpen,
  Video,
  FileText,
  Globe,
  GraduationCap,
  Plus,
  Search,
  Clock,
  Target,
  Play,
  Pause,
  CheckCircle,
  Calendar,
} from "lucide-react"
import type { LearningGoal } from "@/types/learning"

interface LearningListProps {
  goals: LearningGoal[]
  onSelectGoal: (goal: LearningGoal) => void
  onCreateGoal: () => void
  onUpdateGoal: (goal: LearningGoal) => void
}

export function LearningList({ goals, onSelectGoal, onCreateGoal, onUpdateGoal }: LearningListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "book":
        return BookOpen
      case "course":
        return GraduationCap
      case "video":
        return Video
      case "article":
        return FileText
      case "documentation":
        return Globe
      default:
        return BookOpen
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "in-progress":
        return "bg-blue-500"
      case "paused":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  const filteredGoals = goals.filter((goal) => {
    const matchesSearch =
      goal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      goal.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      goal.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesType = filterType === "all" || goal.type === filterType
    const matchesStatus = filterStatus === "all" || goal.status === filterStatus

    return matchesSearch && matchesType && matchesStatus
  })

  const toggleGoalStatus = (goal: LearningGoal) => {
    let newStatus: LearningGoal["status"]
    switch (goal.status) {
      case "not-started":
        newStatus = "in-progress"
        break
      case "in-progress":
        newStatus = "paused"
        break
      case "paused":
        newStatus = "in-progress"
        break
      case "completed":
        newStatus = "in-progress"
        break
      default:
        newStatus = "in-progress"
    }

    onUpdateGoal({ ...goal, status: newStatus, updatedAt: new Date() })
  }

  const markAsCompleted = (goal: LearningGoal) => {
    onUpdateGoal({
      ...goal,
      status: "completed",
      progress: 100,
      updatedAt: new Date(),
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-6 h-6" />
          <h1 className="text-2xl font-bold">Learning Tracker</h1>
          <Badge variant="secondary">{goals.length}</Badge>
        </div>
        <Button onClick={onCreateGoal}>
          <Plus className="w-4 h-4 mr-2" />
          New Goal
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search learning goals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="book">Books</SelectItem>
            <SelectItem value="course">Courses</SelectItem>
            <SelectItem value="video">Videos</SelectItem>
            <SelectItem value="article">Articles</SelectItem>
            <SelectItem value="documentation">Docs</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="not-started">Not Started</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Goals Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredGoals.length === 0 ? (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            <GraduationCap className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg mb-2">No learning goals found</p>
            <p className="text-sm">Create your first learning goal to get started!</p>
          </div>
        ) : (
          filteredGoals.map((goal) => {
            const TypeIcon = getTypeIcon(goal.type)
            const isOverdue = goal.deadline && new Date() > goal.deadline && goal.status !== "completed"

            return (
              <Card
                key={goal.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  goal.status === "completed" ? "opacity-75" : ""
                } ${isOverdue ? "border-red-200 dark:border-red-800" : ""}`}
                onClick={() => onSelectGoal(goal)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-lg ${getStatusColor(goal.status)} text-white`}>
                        <TypeIcon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base truncate">{goal.title}</CardTitle>
                        <Badge variant="outline" className="text-xs mt-1">
                          {goal.type}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleGoalStatus(goal)
                        }}
                      >
                        {goal.status === "in-progress" ? (
                          <Pause className="w-4 h-4" />
                        ) : goal.status === "completed" ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </Button>
                      {goal.status !== "completed" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={(e) => {
                            e.stopPropagation()
                            markAsCompleted(goal)
                          }}
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  {goal.description && <p className="text-sm text-muted-foreground line-clamp-2">{goal.description}</p>}

                  {/* Progress */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{formatTime(goal.timeSpent)}</span>
                    </div>
                    {goal.targetDuration && (
                      <div className="flex items-center gap-1">
                        <Target className="w-3 h-3" />
                        <span>{goal.targetDuration}h</span>
                      </div>
                    )}
                    {goal.deadline && (
                      <div className={`flex items-center gap-1 ${isOverdue ? "text-red-500" : ""}`}>
                        <Calendar className="w-3 h-3" />
                        <span>{goal.deadline.toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  {goal.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {goal.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {goal.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{goal.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
