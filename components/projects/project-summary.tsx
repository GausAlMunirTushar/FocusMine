"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Timer, CheckSquare, Clock, BookOpen, FileText, Calendar, TrendingUp } from "lucide-react"
import type { Project, ProjectData } from "@/types/project"

interface ProjectSummaryProps {
  project: Project
  projectData: ProjectData
}

export function ProjectSummary({ project, projectData }: ProjectSummaryProps) {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  const completionRate =
    project.stats.totalTasks > 0 ? Math.round((project.stats.completedTasks / project.stats.totalTasks) * 100) : 0

  const activeLearningGoals = projectData.learningGoals.filter((goal) => goal.status !== "completed").length
  const recentActivity = projectData.pomodoroSessions.filter((session) => {
    const dayAgo = new Date()
    dayAgo.setDate(dayAgo.getDate() - 1)
    return new Date(session.completedAt) > dayAgo
  }).length

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Task Progress</CardTitle>
          <CheckSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {project.stats.completedTasks}/{project.stats.totalTasks}
          </div>
          <div className="space-y-2 mt-2">
            <Progress value={completionRate} className="h-2" />
            <p className="text-xs text-muted-foreground">{completionRate}% complete</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Focus Sessions</CardTitle>
          <Timer className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">🍅 {project.stats.totalPomodoros}</div>
          <p className="text-xs text-muted-foreground">{recentActivity} in last 24h</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Time Spent</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatTime(project.stats.totalTimeSpent)}</div>
          <p className="text-xs text-muted-foreground">Total focus time</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Items</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1">
                <BookOpen className="w-3 h-3" />
                Learning
              </span>
              <span className="font-medium">{activeLearningGoals}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1">
                <FileText className="w-3 h-3" />
                Notes
              </span>
              <span className="font-medium">{projectData.notes.length}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Entries
              </span>
              <span className="font-medium">{projectData.journalEntries.length}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
