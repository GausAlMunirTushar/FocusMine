"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, FileText, Calendar, Tag } from "lucide-react"
import type { Note } from "@/types/notes"

interface NoteListSidebarProps {
  notes: Note[]
  selectedNote: Note | null
  onSelectNote: (note: Note) => void
  onCreateNote: () => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function NoteListSidebar({
  notes,
  selectedNote,
  onSelectNote,
  onCreateNote,
  searchQuery,
  onSearchChange,
}: NoteListSidebarProps) {
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="w-80 border-r bg-muted/30 flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5" />
          <h2 className="font-semibold">Notes</h2>
          <Badge variant="secondary" className="ml-auto">
            {notes.length}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9"
            />
          </div>

          <Button onClick={onCreateNote} className="w-full" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            New Note
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {filteredNotes.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No notes found</p>
            </div>
          ) : (
            <div className="space-y-1">
              {filteredNotes.map((note) => (
                <div
                  key={note.id}
                  onClick={() => onSelectNote(note)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                    selectedNote?.id === note.id ? "bg-muted border" : ""
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-medium text-sm truncate flex-1">{note.title || "Untitled"}</h3>
                    <Calendar className="w-3 h-3 text-muted-foreground ml-2 flex-shrink-0" />
                  </div>

                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                    {note.content.slice(0, 100) || "No content"}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {note.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs px-1 py-0">
                          <Tag className="w-2 h-2 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                      {note.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs px-1 py-0">
                          +{note.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{formatDate(note.updatedAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
