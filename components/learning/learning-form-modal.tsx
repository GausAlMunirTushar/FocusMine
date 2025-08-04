"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import type { LearningGoal } from "@/types/learning"
import { CalendarIcon, X, Plus } from "lucide-react"
import { format } from "date-fns"

interface LearningFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (goal: LearningGoal) => void
  goal?: LearningGoal
}

export function LearningFormModal({ isOpen, onClose, onSave, goal }: LearningFormModalProps) {
  const [title, setTitle] = useState("")
  const [type, setType] = useState<LearningGoal["type"]>("book")
  const [description, setDescription] = useState("")
  const [targetDuration, setTargetDuration] = useState<number | undefined>()
  const [deadline, setDeadline] = useState<Date | undefined>()
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [notes, setNotes] = useState("")
  const [resources, setResources] = useState<string[]>([])
  const [newResource, setNewResource] = useState("")

  useEffect(() => {
    if (goal) {
      setTitle(goal.title)
      setType(goal.type)
      setDescription(goal.description || "")
      setTargetDuration(goal.targetDuration)
      setDeadline(goal.deadline)
      setTags(goal.tags)
      setNotes(goal.notes || "")
      setResources(goal.resources || [])
    } else {
      // Reset form
      setTitle("")
      setType("book")
      setDescription("")
      setTargetDuration(undefined)
      setDeadline(undefined)
      setTags([])
      setNotes("")
      setResources([])
    }
    setNewTag("")
    setNewResource("")
  }, [goal, isOpen])

  const handleSave = () => {
    if (!title.trim()) return

    const learningGoal: LearningGoal = {
      id: goal?.id || Date.now().toString(),
      title: title.trim(),
      type,
      description: description.trim() || undefined,
      targetDuration,
      deadline,
      status: goal?.status || "not-started",
      progress: goal?.progress || 0,
      timeSpent: goal?.timeSpent || 0,
      sessions: goal?.sessions || [],
      tags,
      createdAt: goal?.createdAt || new Date(),
      updatedAt: new Date(),
      notes: notes.trim() || undefined,
      resources: resources.filter((r) => r.trim()),
    }

    onSave(learningGoal)
    onClose()
  }

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleAddResource = () => {
    if (newResource.trim() && !resources.includes(newResource.trim())) {
      setResources([...resources, newResource.trim()])
      setNewResource("")
    }
  }

  const handleRemoveResource = (resourceToRemove: string) => {
    setResources(resources.filter((resource) => resource !== resourceToRemove))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{goal ? "Edit Learning Goal" : "Create Learning Goal"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Learn React Hooks"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select value={type} onValueChange={(value) => setType(value as LearningGoal["type"])}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="book">Book</SelectItem>
                  <SelectItem value="course">Course</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="article">Article</SelectItem>
                  <SelectItem value="documentation">Documentation</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What will you learn? Why is this important?"
              rows={3}
            />
          </div>

          {/* Duration and Deadline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="targetDuration">Target Duration (hours)</Label>
              <Input
                id="targetDuration"
                type="number"
                min="1"
                value={targetDuration || ""}
                onChange={(e) => setTargetDuration(e.target.value ? Number(e.target.value) : undefined)}
                placeholder="e.g., 20"
              />
            </div>

            <div className="space-y-2">
              <Label>Deadline (optional)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {deadline ? format(deadline, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={deadline} onSelect={setDeadline} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-sm">
                  {tag}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1 hover:bg-transparent"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag..."
                onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
              />
              <Button onClick={handleAddTag} size="sm" variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-2">
            <Label>Resources (URLs, references)</Label>
            <div className="space-y-2 mb-2">
              {resources.map((resource, index) => (
                <div key={index} className="flex items-center gap-2 p-2 border rounded">
                  <span className="flex-1 text-sm truncate">{resource}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-1"
                    onClick={() => handleRemoveResource(resource)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newResource}
                onChange={(e) => setNewResource(e.target.value)}
                placeholder="Add a resource URL or reference..."
                onKeyPress={(e) => e.key === "Enter" && handleAddResource()}
              />
              <Button onClick={handleAddResource} size="sm" variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional notes, thoughts, or plans..."
              rows={4}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <Button onClick={handleSave} className="flex-1" disabled={!title.trim()}>
              {goal ? "Update" : "Create"} Goal
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
