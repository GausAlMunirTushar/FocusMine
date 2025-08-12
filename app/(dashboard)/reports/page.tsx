"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useApp } from "@/contexts/app-context"
import { useLanguage } from "@/contexts/language-context"
import { BarChart3, Target, TrendingUp } from "lucide-react"

export default function ReportsPage() {
  const { state } = useApp()
  const { t } = useLanguage()

  const completedTasks = state.tasks.filter((task) => task.completed)
  const totalPomodoros = state.tasks.reduce((sum, task) => sum + task.pomodorosCompleted, 0)

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{t("nav.reports")}</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pomodoros</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPomodoros}</div>
            <p className="text-xs text-muted-foreground">All time focus sessions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTasks.length}</div>
            <p className="text-xs text-muted-foreground">Total completed tasks</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Focus</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {completedTasks.length > 0 ? Math.round(totalPomodoros / completedTasks.length) : 0}
            </div>
            <p className="text-xs text-muted-foreground">Pomodoros per completed task</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Task Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {state.tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${task.completed ? "bg-green-500" : "bg-yellow-500"}`} />
                  <span className={task.completed ? "line-through text-muted-foreground" : ""}>{task.title}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>🍅 {task.pomodorosCompleted}</span>
                  <span>{task.completed ? "Completed" : "In Progress"}</span>
                </div>
              </div>
            ))}
            {state.tasks.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No tasks to show. Start by adding some tasks!</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
