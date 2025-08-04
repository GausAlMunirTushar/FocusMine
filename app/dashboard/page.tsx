"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Timer, CheckSquare, Target, TrendingUp } from "lucide-react"
import { useApp } from "@/contexts/app-context"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"

export default function DashboardPage() {
  const { state } = useApp()
  const { t } = useLanguage()

  const pendingTasks = state.tasks.filter((task) => !task.completed)
  const completedTasks = state.tasks.filter((task) => task.completed)

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t("dashboard.title")}</h1>
        <Link href="/">
          <Button>
            <Timer className="w-4 h-4 mr-2" />
            {t("dashboard.quickStart")}
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("dashboard.todayPomodoros")}</CardTitle>
            <Timer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{state.completedPomodoros}</div>
            <p className="text-xs text-muted-foreground">Focus sessions completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("dashboard.pendingTasks")}</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingTasks.length}</div>
            <p className="text-xs text-muted-foreground">Tasks to complete</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("dashboard.completedTasks")}</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTasks.length}</div>
            <p className="text-xs text-muted-foreground">Tasks completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Productivity</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {completedTasks.length > 0 ? Math.round((completedTasks.length / state.tasks.length) * 100) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">Task completion rate</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {state.tasks.slice(0, 5).map((task) => (
                <div key={task.id} className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${task.completed ? "bg-green-500" : "bg-yellow-500"}`} />
                  <span className={task.completed ? "line-through text-muted-foreground" : ""}>{task.title}</span>
                  {task.pomodorosCompleted > 0 && (
                    <span className="text-sm text-muted-foreground">🍅 {task.pomodorosCompleted}</span>
                  )}
                </div>
              ))}
              {state.tasks.length === 0 && <p className="text-muted-foreground">No tasks yet</p>}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/" className="block">
              <Button className="w-full justify-start">
                <Timer className="w-4 h-4 mr-2" />
                Start Pomodoro Session
              </Button>
            </Link>
            <Link href="/tasks" className="block">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <CheckSquare className="w-4 h-4 mr-2" />
                Manage Tasks
              </Button>
            </Link>
            <Link href="/settings" className="block">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Timer className="w-4 h-4 mr-2" />
                Adjust Timer Settings
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
