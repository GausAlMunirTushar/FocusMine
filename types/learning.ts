export interface LearningGoal {
  id: string
  title: string
  type: "book" | "course" | "article" | "video" | "documentation" | "other"
  description?: string
  targetDuration?: number // in hours
  deadline?: Date
  status: "not-started" | "in-progress" | "completed" | "paused"
  progress: number // 0-100
  timeSpent: number // in minutes
  sessions: LearningSession[]
  tags: string[]
  createdAt: Date
  updatedAt: Date
  notes?: string
  resources?: string[] // URLs or references
}

export interface LearningSession {
  id: string
  goalId: string
  date: Date
  duration: number // in minutes
  notes?: string
  pomodoroSessions?: number
}
