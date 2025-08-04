export interface TimeBlock {
  id: string
  title: string
  startTime: string // HH:MM format
  duration: number // in minutes
  description?: string
  color?: string
  completed?: boolean
  pomodoroSessions?: number
}

export interface DayPlan {
  date: string // YYYY-MM-DD format
  blocks: TimeBlock[]
}
