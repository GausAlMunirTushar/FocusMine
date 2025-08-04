"use client"

import { ProjectCard } from "./project-card"
import type { Project } from "@/types/project"
import { FolderOpen } from "lucide-react"

interface ProjectGridProps {
  projects: Project[]
  onEdit: (project: Project) => void
  onDelete: (projectId: string) => void
  onToggleFavorite: (project: Project) => void
  onToggleArchive: (project: Project) => void
}

export function ProjectGrid({ projects, onEdit, onDelete, onToggleFavorite, onToggleArchive }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <FolderOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
        <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
        <p className="text-muted-foreground">Create your first project to get started!</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleFavorite={onToggleFavorite}
          onToggleArchive={onToggleArchive}
        />
      ))}
    </div>
  )
}
