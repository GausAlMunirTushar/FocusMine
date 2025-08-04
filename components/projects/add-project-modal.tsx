"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Project } from "@/types/project"

interface AddProjectModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (project: Omit<Project, "id" | "createdAt" | "updatedAt" | "stats">) => void
  project?: Project
}

const projectColors = [
  "#3b82f6", // blue
  "#10b981", // emerald
  "#f59e0b", // amber
  "#ef4444", // red
  "#8b5cf6", // violet
  "#06b6d4", // cyan
  "#84cc16", // lime
  "#f97316", // orange
  "#ec4899", // pink
  "#6366f1", // indigo
]

const projectEmojis = [
  "💼",
  "🚀",
  "📱",
  "💻",
  "🎨",
  "📚",
  "🔬",
  "🏠",
  "💡",
  "⚡",
  "🎯",
  "📊",
  "🛠️",
  "🌟",
  "🔥",
  "💎",
  "🎪",
  "🎭",
  "🎨",
  "🎵",
]

export function AddProjectModal({ isOpen, onClose, onSave, project }: AddProjectModalProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [color, setColor] = useState(projectColors[0])
  const [emoji, setEmoji] = useState("")
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    if (project) {
      setName(project.name)
      setDescription(project.description || "")
      setColor(project.color)
      setEmoji(project.emoji || "")
      setIsFavorite(project.isFavorite)
    } else {
      setName("")
      setDescription("")
      setColor(projectColors[0])
      setEmoji("")
      setIsFavorite(false)
    }
  }, [project, isOpen])

  const handleSave = () => {
    if (!name.trim()) return

    const projectData = {
      name: name.trim(),
      description: description.trim() || undefined,
      color,
      emoji: emoji || undefined,
      isFavorite,
      isArchived: project?.isArchived || false,
    }

    onSave(projectData)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{project ? "Edit Project" : "Create New Project"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Project Name *</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="My Awesome Project" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What is this project about?"
              rows={3}
            />
          </div>

          <div className="space-y-3">
            <Label>Project Color</Label>
            <div className="grid grid-cols-5 gap-2">
              {projectColors.map((projectColor) => (
                <button
                  key={projectColor}
                  className={`w-10 h-10 rounded-lg border-2 transition-all ${
                    color === projectColor ? "border-foreground scale-110" : "border-transparent"
                  }`}
                  style={{ backgroundColor: projectColor }}
                  onClick={() => setColor(projectColor)}
                />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label>Project Icon (optional)</Label>
            <div className="grid grid-cols-10 gap-2">
              <button
                className={`w-8 h-8 rounded border-2 flex items-center justify-center text-sm ${
                  emoji === "" ? "border-foreground bg-muted" : "border-transparent"
                }`}
                onClick={() => setEmoji("")}
              >
                {name.charAt(0).toUpperCase() || "A"}
              </button>
              {projectEmojis.map((projectEmoji) => (
                <button
                  key={projectEmoji}
                  className={`w-8 h-8 rounded border-2 flex items-center justify-center text-lg ${
                    emoji === projectEmoji ? "border-foreground bg-muted" : "border-transparent"
                  }`}
                  onClick={() => setEmoji(projectEmoji)}
                >
                  {projectEmoji}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="favorite"
              checked={isFavorite}
              onChange={(e) => setIsFavorite(e.target.checked)}
              className="rounded"
            />
            <Label htmlFor="favorite">Add to favorites</Label>
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={handleSave} className="flex-1" disabled={!name.trim()}>
              {project ? "Update" : "Create"} Project
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
