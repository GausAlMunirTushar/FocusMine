"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, Edit, Save, Download, Trash2, Tag, X } from "lucide-react"
import type { Note } from "@/types/notes"
import ReactMarkdown from "react-markdown"

interface NoteEditorProps {
  note: Note | null
  onSave: (note: Note) => void
  onDelete: (noteId: string) => void
  onExport: (note: Note, format: "md" | "txt") => void
}

export function NoteEditor({ note, onSave, onDelete, onExport }: NoteEditorProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    if (note) {
      setTitle(note.title)
      setContent(note.content)
      setTags(note.tags)
      setHasChanges(false)
    }
  }, [note])

  useEffect(() => {
    if (note) {
      const hasChanged =
        title !== note.title || content !== note.content || JSON.stringify(tags) !== JSON.stringify(note.tags)
      setHasChanges(hasChanged)
    }
  }, [title, content, tags, note])

  const handleSave = () => {
    if (!note) return

    const updatedNote: Note = {
      ...note,
      title: title.trim() || "Untitled",
      content,
      tags,
      updatedAt: new Date(),
    }

    onSave(updatedNote)
    setHasChanges(false)
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleSave()
    }
  }

  if (!note) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <Edit className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Select a note to start editing</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="border-b p-4">
        <div className="flex items-center justify-between mb-4">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title..."
            className="text-lg font-semibold border-none shadow-none p-0 h-auto focus-visible:ring-0"
            onKeyPress={handleKeyPress}
          />
          <div className="flex items-center gap-2">
            {hasChanges && (
              <Badge variant="outline" className="text-xs">
                Unsaved
              </Badge>
            )}
            <Button onClick={handleSave} size="sm" disabled={!hasChanges}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        {/* Tags */}
        <div className="flex items-center gap-2 mb-2">
          <Tag className="w-4 h-4 text-muted-foreground" />
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
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
            <div className="flex items-center gap-1">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add tag..."
                className="h-6 text-xs w-20"
                onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
              />
              <Button onClick={handleAddTag} size="sm" variant="ghost" className="h-6 px-2">
                +
              </Button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button onClick={() => onExport(note, "md")} size="sm" variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export MD
          </Button>
          <Button onClick={() => onExport(note, "txt")} size="sm" variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export TXT
          </Button>
          <Button onClick={() => onDelete(note.id)} size="sm" variant="outline" className="text-destructive">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1">
        <Tabs defaultValue="edit" className="h-full flex flex-col">
          <TabsList className="mx-4 mt-4 w-fit">
            <TabsTrigger value="edit" className="flex items-center gap-2">
              <Edit className="w-4 h-4" />
              Edit
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="edit" className="flex-1 p-4 pt-2">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start writing your note... (Markdown supported)"
              className="h-full resize-none font-mono text-sm"
              onKeyPress={handleKeyPress}
            />
          </TabsContent>

          <TabsContent value="preview" className="flex-1 p-4 pt-2">
            <div className="h-full overflow-auto prose prose-sm dark:prose-invert max-w-none">
              {content ? (
                <ReactMarkdown>{content}</ReactMarkdown>
              ) : (
                <p className="text-muted-foreground italic">Nothing to preview yet...</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
