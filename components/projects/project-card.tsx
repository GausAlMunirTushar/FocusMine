"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Star, MoreHorizontal, Archive, Edit, Trash2, Timer, CheckSquare, Clock } from "lucide-react"
import type { Project } from "@/types/project"
import Link from "next/link"

interface ProjectCardProps {
  project: Project
  onEdit: (project: Project) => void
  onDelete: (projectId: string) => void
  onToggleFavorite: (project: Project) => void
  onToggleArchive: (project: Project) => void
}

export function ProjectCard({ project, onEdit, onDelete, onToggleFavorite, onToggleArchive }: ProjectCardProps) {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  const completionRate =
    project.stats.totalTasks > 0 ? Math.round((project.stats.completedTasks / project.stats.totalTasks) * 100) : 0

  return (
    <Card className={`group hover:shadow-lg transition-all duration-200 ${project.isArchived ? "opacity-60" : ""}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm"
              style={{ backgroundColor: project.color }}
            >
              {project.emoji || project.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold truncate">{project.name}</h3>
                {project.isFavorite && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                {project.isArchived && <Archive className="w-4 h-4 text-muted-foreground" />}
              </div>
              {project.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
              )}
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(project)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onToggleFavorite(project)}>
                <Star className="w-4 h-4 mr-2" />
                {project.isFavorite ? "Remove from favorites" : "Add to favorites"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onToggleArchive(project)}>
                <Archive className="w-4 h-4 mr-2" />
                {project.isArchived ? "Unarchive" : "Archive"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(project.id)} className="text-destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-1">
              <CheckSquare className="w-3 h-3" />
              <span>Tasks</span>
            </div>
            <div className="font-semibold">
              {project.stats.completedTasks}/{project.stats.totalTasks}
            </div>
            {project.stats.totalTasks > 0 && <div className="text-xs text-muted-foreground">{completionRate}%</div>}
          </div>

          <div>
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-1">
              <Timer className="w-3 h-3" />
              <span>Focus</span>
            </div>
            <div className="font-semibold">🍅 {project.stats.totalPomodoros}</div>
            <div className="text-xs text-muted-foreground">sessions</div>
          </div>

          <div>
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-1">
              <Clock className="w-3 h-3" />
              <span>Time</span>
            </div>
            <div className="font-semibold">{formatTime(project.stats.totalTimeSpent)}</div>
            <div className="text-xs text-muted-foreground">spent</div>
          </div>
        </div>

        {/* Progress bar */}
        {project.stats.totalTasks > 0 && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progress</span>
              <span>{completionRate}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${completionRate}%`,
                  backgroundColor: project.color,
                }}
              />
            </div>
          </div>
        )}

        {/* Action button */}
        <Link href={`/projects/${project.id}`} className="block">
          <Button
            className="w-full bg-transparent"
            variant="outline"
            style={{ borderColor: project.color, color: project.color }}
          >
            Open Project
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
