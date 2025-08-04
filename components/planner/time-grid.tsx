"use client"

import type React from "react"

import { useState, useRef } from "react"
import type { TimeBlock } from "@/types/planner"
import { Button } from "@/components/ui/button"
import { Clock, Plus, Trash2, CheckCircle } from "lucide-react"

interface TimeGridProps {
  blocks: TimeBlock[]
  onUpdateBlock: (block: TimeBlock) => void
  onDeleteBlock: (blockId: string) => void
  onCreateBlock: (startTime: string) => void
  selectedDate: Date
}

export function TimeGrid({ blocks, onUpdateBlock, onDeleteBlock, onCreateBlock, selectedDate }: TimeGridProps) {
  const [draggedBlock, setDraggedBlock] = useState<TimeBlock | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  // Generate hour slots from 6 AM to 11 PM
  const hours = Array.from({ length: 18 }, (_, i) => i + 6)

  const formatTime = (hour: number) => {
    const period = hour >= 12 ? "PM" : "AM"
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
    return `${displayHour}:00 ${period}`
  }

  const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number)
    return hours * 60 + minutes
  }

  const minutesToTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`
  }

  const getBlockPosition = (block: TimeBlock) => {
    const startMinutes = timeToMinutes(block.startTime)
    const startHour = Math.floor(startMinutes / 60)

    if (startHour < 6 || startHour > 23) return null

    const top = ((startMinutes - 6 * 60) / 60) * 80 // 80px per hour
    const height = (block.duration / 60) * 80

    return { top, height }
  }

  const handleTimeSlotClick = (hour: number) => {
    const time = `${hour.toString().padStart(2, "0")}:00`
    onCreateBlock(time)
  }

  const handleDragStart = (e: React.DragEvent, block: TimeBlock) => {
    setDraggedBlock(block)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e: React.DragEvent, hour: number) => {
    e.preventDefault()
    if (!draggedBlock) return

    const newTime = `${hour.toString().padStart(2, "0")}:00`
    const updatedBlock = { ...draggedBlock, startTime: newTime }
    onUpdateBlock(updatedBlock)
    setDraggedBlock(null)
  }

  const toggleBlockCompletion = (block: TimeBlock) => {
    onUpdateBlock({ ...block, completed: !block.completed })
  }

  return (
    <div className="flex-1 bg-background">
      <div className="h-full overflow-auto">
        <div ref={gridRef} className="relative" style={{ height: `${hours.length * 80}px` }}>
          {/* Hour labels and grid lines */}
          {hours.map((hour, index) => (
            <div key={hour} className="absolute w-full flex" style={{ top: `${index * 80}px` }}>
              <div className="w-20 flex-shrink-0 p-2 text-sm text-muted-foreground border-r">{formatTime(hour)}</div>
              <div
                className="flex-1 border-b border-dashed border-muted-foreground/20 hover:bg-muted/20 cursor-pointer transition-colors relative group"
                style={{ height: "80px" }}
                onClick={() => handleTimeSlotClick(hour)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, hour)}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}

          {/* Time blocks */}
          {blocks.map((block) => {
            const position = getBlockPosition(block)
            if (!position) return null

            return (
              <div
                key={block.id}
                className={`absolute left-20 right-4 rounded-lg border-l-4 p-3 cursor-move shadow-sm transition-all hover:shadow-md ${
                  block.completed
                    ? "bg-green-50 dark:bg-green-950/20 border-l-green-500 opacity-75"
                    : "bg-blue-50 dark:bg-blue-950/20 border-l-blue-500"
                }`}
                style={{
                  top: `${position.top}px`,
                  height: `${position.height}px`,
                  minHeight: "60px",
                }}
                draggable
                onDragStart={(e) => handleDragStart(e, block)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-medium text-sm truncate ${block.completed ? "line-through" : ""}`}>
                      {block.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{block.startTime}</span>
                      <span>•</span>
                      <span>{block.duration}min</span>
                      {block.pomodoroSessions && (
                        <>
                          <span>•</span>
                          <span>🍅 {block.pomodoroSessions}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 ml-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleBlockCompletion(block)
                      }}
                    >
                      <CheckCircle
                        className={`w-4 h-4 ${
                          block.completed ? "text-green-600 fill-current" : "text-muted-foreground"
                        }`}
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-destructive"
                      onClick={(e) => {
                        e.stopPropagation()
                        onDeleteBlock(block.id)
                      }}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                {block.description && <p className="text-xs text-muted-foreground line-clamp-2">{block.description}</p>}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
