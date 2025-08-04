"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowLeft, MoreHorizontal, Star, Archive, Settings, Download } from "lucide-react"
import type { Project } from "@/types/project"
import Link from "next/link"

interface ProjectHeaderProps {
  project: Project
  onEdit: () => void
  onToggleFavorite: () => void
  onToggleArchive: () => void
  onExport: () => void
}

export function ProjectHeader({ project, onEdit, onToggleFavorite, onToggleArchive, onExport }: ProjectHeaderProps) {
  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/projects">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Projects
              </Button>
            </Link>

            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-sm"
                style={{ backgroundColor: project.color }}
              >
                {project.emoji || project.name.charAt(0).toUpperCase()}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold">{project.name}</h1>
                  {project.isFavorite && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                  {project.isArchived && <Badge variant="secondary">Archived</Badge>}
                </div>
                {project.description && <p className="text-sm text-muted-foreground">{project.description}</p>}
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onEdit}>
                <Settings className="w-4 h-4 mr-2" />
                Project Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onToggleFavorite}>
                <Star className="w-4 h-4 mr-2" />
                {project.isFavorite ? "Remove from favorites" : "Add to favorites"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onToggleArchive}>
                <Archive className="w-4 h-4 mr-2" />
                {project.isArchived ? "Unarchive" : "Archive"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onExport}>
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
