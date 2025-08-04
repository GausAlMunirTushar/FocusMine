"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Trash2, Edit2, Plus, GripVertical } from "lucide-react"
import { useApp, type Task } from "@/contexts/app-context"
import { useLanguage } from "@/contexts/language-context"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function TaskManager() {
  const { state, dispatch } = useApp()
  const { t } = useLanguage()
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [editTitle, setEditTitle] = useState("")

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      dispatch({ type: "ADD_TASK", payload: { title: newTaskTitle.trim() } })
      setNewTaskTitle("")
    }
  }

  const handleToggleTask = (id: string) => {
    dispatch({ type: "TOGGLE_TASK", payload: { id } })
  }

  const handleDeleteTask = (id: string) => {
    dispatch({ type: "DELETE_TASK", payload: { id } })
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
    setEditTitle(task.title)
  }

  const handleSaveEdit = () => {
    if (editingTask && editTitle.trim()) {
      dispatch({
        type: "UPDATE_TASK",
        payload: { id: editingTask.id, title: editTitle.trim() },
      })
      setEditingTask(null)
      setEditTitle("")
    }
  }

  const pendingTasks = state.tasks.filter((task) => !task.completed)
  const completedTasks = state.tasks.filter((task) => task.completed)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            {t("tasks.addTask")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder={t("tasks.newTask")}
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
            />
            <Button onClick={handleAddTask}>{t("common.add")}</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {t("tasks.pending")}
              <Badge variant="secondary">{pendingTasks.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingTasks.map((task) => (
                <div key={task.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50">
                  <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
                  <Checkbox checked={task.completed} onCheckedChange={() => handleToggleTask(task.id)} />
                  <div className="flex-1">
                    <p className="font-medium">{task.title}</p>
                    {task.pomodorosCompleted > 0 && (
                      <p className="text-sm text-muted-foreground">🍅 {task.pomodorosCompleted} pomodoros</p>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" onClick={() => handleEditTask(task)}>
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleDeleteTask(task.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {pendingTasks.length === 0 && <p className="text-center text-muted-foreground py-8">No pending tasks</p>}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {t("tasks.completed")}
              <Badge variant="secondary">{completedTasks.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {completedTasks.map((task) => (
                <div key={task.id} className="flex items-center gap-3 p-3 border rounded-lg bg-muted/30">
                  <Checkbox checked={task.completed} onCheckedChange={() => handleToggleTask(task.id)} />
                  <div className="flex-1">
                    <p className="font-medium line-through text-muted-foreground">{task.title}</p>
                    {task.pomodorosCompleted > 0 && (
                      <p className="text-sm text-muted-foreground">🍅 {task.pomodorosCompleted} pomodoros</p>
                    )}
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => handleDeleteTask(task.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              {completedTasks.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No completed tasks</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={!!editingTask} onOpenChange={() => setEditingTask(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("tasks.edit")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSaveEdit()}
            />
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setEditingTask(null)}>
                {t("common.cancel")}
              </Button>
              <Button onClick={handleSaveEdit}>{t("common.save")}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
