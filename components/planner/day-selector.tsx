"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"

interface DaySelectorProps {
  selectedDate: Date
  onDateChange: (date: Date) => void
}

export function DaySelector({ selectedDate, onDateChange }: DaySelectorProps) {
  const formatDate = (date: Date) => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    const yesterday = new Date(today)
    yesterday.setDate(today.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      })
    }
  }

  const goToPreviousDay = () => {
    const previousDay = new Date(selectedDate)
    previousDay.setDate(selectedDate.getDate() - 1)
    onDateChange(previousDay)
  }

  const goToNextDay = () => {
    const nextDay = new Date(selectedDate)
    nextDay.setDate(selectedDate.getDate() + 1)
    onDateChange(nextDay)
  }

  const goToToday = () => {
    onDateChange(new Date())
  }

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-2">
        <Calendar className="w-5 h-5" />
        <h1 className="text-xl font-semibold">Daily Planner</h1>
      </div>

      <div className="flex items-center gap-2">
        <Button onClick={goToPreviousDay} variant="outline" size="sm">
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <Button onClick={goToToday} variant="ghost" className="min-w-32">
          {formatDate(selectedDate)}
        </Button>

        <Button onClick={goToNextDay} variant="outline" size="sm">
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
