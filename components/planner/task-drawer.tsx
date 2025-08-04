"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { TimeBlock } from "@/types/planner"
import { Clock, Timer } from "lucide-react"

interface TaskDrawerProps {
  isOpen: boolean
  onClose: () => void
  onSave: (block: TimeBlock) => void
  block?: TimeBlock
  defaultStartTime?: string
}

export function TaskDrawer({ isOpen, onClose, onSave, block, defaultStartTime }: TaskDrawerProps) {
  const [title, setTitle] = useState("")
  const [startTime, setStartTime] = useState("")
  const [duration, setDuration] = useState(60)
  const [description, setDescription] = useState("")
  const [pomodoroSessions, setPomodoroSessions] = useState(0)

  useEffect(() => {
    if (block) {
      setTitle(block.title)
      setStartTime(block.startTime)
      setDuration(block.duration)
      setDescription(block.description || "")
      setPomodoroSessions(block.pomodoroSessions || 0)
    } else if (defaultStartTime) {
      setTitle("")
      setStartTime(defaultStartTime)
      setDuration(60)
      setDescription("")
      setPomodoroSessions(0)
    }
  }, [block, defaultStartTime, isOpen])

  const handleSave = () => {
    if (!title.trim() || !startTime) return

    const timeBlock: TimeBlock = {
      id: block?.id || Date.now().toString(),
      title: title.trim(),
      startTime,
      duration,
      description: description.trim(),
      pomodoroSessions,
      completed: block?.completed || false,
    }

    onSave(timeBlock)
    onClose()
  }

  const durationOptions = [
    { value: 15, label: "15 minutes" },
    { value: 25, label: "25 minutes (Pomodoro)" },
    { value: 30, label: "30 minutes" },
    { value: 45, label: "45 minutes" },
    { value: 60, label: "1 hour" },
    { value: 90, label: "1.5 hours" },
    { value: 120, label: "2 hours" },
    { value: 180, label: "3 hours" },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            {block ? "Edit Time Block" : "Create Time Block"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What are you working on?"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input id="startTime" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Select value={duration.toString()} onValueChange={(value) => setDuration(Number(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {durationOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value.toString()}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pomodoroSessions" className="flex items-center gap-2">
              <Timer className="w-4 h-4" />
              Pomodoro Sessions (optional)
            </Label>
            <Input
              id="pomodoroSessions"
              type="number"
              min="0"
              max="10"
              value={pomodoroSessions}
              onChange={(e) => setPomodoroSessions(Number(e.target.value))}
              placeholder="0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add notes or details..."
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={handleSave} className="flex-1" disabled={!title.trim() || !startTime}>
              {block ? "Update" : "Create"} Block
            </Button>
            <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
