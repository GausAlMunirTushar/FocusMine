"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { LearningGoal, LearningSession } from "@/types/learning"
import { Clock, Plus, Calendar, Target, BookOpen, Timer, Edit, ExternalLink } from "lucide-react"

interface ProgressTrackerProps {
  goal: LearningGoal
  onUpdateGoal: (goal: LearningGoal) => void
  onAddSession: (session: LearningSession) => void
}

export function ProgressTracker({ goal, onUpdateGoal, onAddSession }: ProgressTrackerProps) {
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false)
  const [sessionDuration, setSessionDuration] = useState(25)
  const [sessionNotes, setSessionNotes] = useState("")
  const [pomodoroSessions, setPomodoroSessions] = useState(1)
  const [newProgress, setNewProgress] = useState(goal.progress)

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  const handleAddSession = () => {
    const session: LearningSession = {
      id: Date.now().toString(),
      goalId: goal.id,
      date: new Date(),
      duration: sessionDuration,
      notes: sessionNotes.trim() || undefined,
      pomodoroSessions,
    }

    onAddSession(session)

    // Update goal with new time spent
    const updatedGoal = {
      ...goal,
      timeSpent: goal.timeSpent + sessionDuration,
      sessions: [...goal.sessions, session],
      updatedAt: new Date(),
    }

    onUpdateGoal(updatedGoal)

    // Reset form
    setSessionDuration(25)
    setSessionNotes("")
    setPomodoroSessions(1)
    setIsSessionModalOpen(false)
  }

  const handleUpdateProgress = () => {
    const updatedGoal = {
      ...goal,
      progress: Math.max(0, Math.min(100, newProgress)),
      status: newProgress >= 100 ? ("completed" as const) : goal.status,
      updatedAt: new Date(),
    }
    onUpdateGoal(updatedGoal)
  }

  const getProgressColor = () => {
    if (goal.progress >= 100) return "bg-green-500"
    if (goal.progress >= 75) return "bg-blue-500"
    if (goal.progress >= 50) return "bg-yellow-500"
    return "bg-gray-500"
  }

  const recentSessions = goal.sessions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10)

  const totalPomodoroSessions = goal.sessions.reduce((sum, session) => sum + (session.pomodoroSessions || 0), 0)

  const averageSessionDuration = goal.sessions.length > 0 ? Math.round(goal.timeSpent / goal.sessions.length) : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">{goal.title}</h1>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline">{goal.type}</Badge>
            <Badge variant={goal.status === "completed" ? "default" : "secondary"}>
              {goal.status.replace("-", " ")}
            </Badge>
          </div>
          {goal.description && <p className="text-muted-foreground">{goal.description}</p>}
        </div>
        <Button onClick={() => setIsSessionModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Log Session
        </Button>
      </div>

      {/* Progress Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="w-4 h-4" />
              Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{goal.progress}%</span>
                <Button variant="ghost" size="sm" onClick={() => setNewProgress(goal.progress)}>
                  <Edit className="w-3 h-3" />
                </Button>
              </div>
              <Progress value={goal.progress} className="h-2" />
              <div className="flex gap-2">
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={newProgress}
                  onChange={(e) => setNewProgress(Number(e.target.value))}
                  className="h-8 text-sm"
                />
                <Button size="sm" onClick={handleUpdateProgress}>
                  Update
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Time Spent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatTime(goal.timeSpent)}</div>
            {goal.targetDuration && (
              <div className="text-sm text-muted-foreground">of {goal.targetDuration}h target</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{goal.sessions.length}</div>
            <div className="text-sm text-muted-foreground">Avg: {formatTime(averageSessionDuration)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Timer className="w-4 h-4" />
              Pomodoros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">🍅 {totalPomodoroSessions}</div>
            <div className="text-sm text-muted-foreground">Focus sessions</div>
          </CardContent>
        </Card>
      </div>

      {/* Details */}
      <Tabs defaultValue="sessions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sessions">Recent Sessions</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="sessions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Learning Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              {recentSessions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No sessions logged yet</p>
                  <p className="text-sm">Start tracking your learning progress!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentSessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {new Date(session.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4" />
                          {formatTime(session.duration)}
                        </div>
                        {session.pomodoroSessions && (
                          <div className="flex items-center gap-1 text-sm">
                            <Timer className="w-4 h-4" />🍅 {session.pomodoroSessions}
                          </div>
                        )}
                      </div>
                      {session.notes && (
                        <div className="text-sm text-muted-foreground max-w-xs truncate">{session.notes}</div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Learning Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={goal.notes || ""}
                onChange={(e) => onUpdateGoal({ ...goal, notes: e.target.value, updatedAt: new Date() })}
                placeholder="Add your learning notes, insights, and reflections..."
                rows={8}
                className="resize-none"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Learning Resources</CardTitle>
            </CardHeader>
            <CardContent>
              {goal.resources && goal.resources.length > 0 ? (
                <div className="space-y-2">
                  {goal.resources.map((resource, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 border rounded">
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                      <a
                        href={resource.startsWith("http") ? resource : `https://${resource}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-sm hover:underline truncate"
                      >
                        {resource}
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <ExternalLink className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No resources added yet</p>
                  <p className="text-sm">Edit this goal to add learning resources</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Log Session Modal */}
      <Dialog open={isSessionModalOpen} onOpenChange={setIsSessionModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Log Learning Session</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                min="1"
                value={sessionDuration}
                onChange={(e) => setSessionDuration(Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pomodoros">Pomodoro Sessions</Label>
              <Input
                id="pomodoros"
                type="number"
                min="0"
                max="10"
                value={pomodoroSessions}
                onChange={(e) => setPomodoroSessions(Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sessionNotes">Session Notes (optional)</Label>
              <Textarea
                id="sessionNotes"
                value={sessionNotes}
                onChange={(e) => setSessionNotes(e.target.value)}
                placeholder="What did you learn? Any insights or challenges?"
                rows={3}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleAddSession} className="flex-1">
                Log Session
              </Button>
              <Button onClick={() => setIsSessionModalOpen(false)} variant="outline" className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
