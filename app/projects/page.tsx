"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ProjectGrid } from "@/components/projects/project-grid"
import { AddProjectModal } from "@/components/projects/add-project-modal"
import { useProject } from "@/contexts/project-context"
import { Plus, Search, FolderOpen, Star, Archive } from "lucide-react"
import type { Project } from "@/types/project"

export default function ProjectsPage() {
  const { projects, createProject, updateProject, deleteProject } = useProject()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | undefined>()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const handleCreateProject = () => {
    setEditingProject(undefined)
    setIsModalOpen(true)
  }

  const handleEditProject = (project: Project) => {
    setEditingProject(project)
    setIsModalOpen(true)
  }

  const handleSaveProject = (projectData: Omit<Project, "id" | "createdAt" | "updatedAt" | "stats">) => {
    if (editingProject) {
      const updatedProject: Project = {
        ...editingProject,
        ...projectData,
        updatedAt: new Date(),
      }
      updateProject(updatedProject)
    } else {
      createProject(projectData)
    }
  }

  const handleToggleFavorite = (project: Project) => {
    updateProject({ ...project, isFavorite: !project.isFavorite, updatedAt: new Date() })
  }

  const handleToggleArchive = (project: Project) => {
    updateProject({ ...project, isArchived: !project.isArchived, updatedAt: new Date() })
  }

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchQuery.toLowerCase())

    switch (activeTab) {
      case "favorites":
        return matchesSearch && project.isFavorite && !project.isArchived
      case "archived":
        return matchesSearch && project.isArchived
      case "active":
        return matchesSearch && !project.isArchived
      default:
        return matchesSearch
    }
  })

  const activeProjects = projects.filter((p) => !p.isArchived)
  const favoriteProjects = projects.filter((p) => p.isFavorite && !p.isArchived)
  const archivedProjects = projects.filter((p) => p.isArchived)

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FolderOpen className="w-8 h-8" />
          <div>
            <h1 className="text-3xl font-bold">Projects</h1>
            <p className="text-muted-foreground">Organize your work into focused projects</p>
          </div>
        </div>
        <Button onClick={handleCreateProject}>
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all" className="flex items-center gap-2">
            All Projects
            <Badge variant="secondary">{projects.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="active" className="flex items-center gap-2">
            Active
            <Badge variant="secondary">{activeProjects.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="favorites" className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            Favorites
            <Badge variant="secondary">{favoriteProjects.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="archived" className="flex items-center gap-2">
            <Archive className="w-4 h-4" />
            Archived
            <Badge variant="secondary">{archivedProjects.length}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <ProjectGrid
            projects={filteredProjects}
            onEdit={handleEditProject}
            onDelete={deleteProject}
            onToggleFavorite={handleToggleFavorite}
            onToggleArchive={handleToggleArchive}
          />
        </TabsContent>
      </Tabs>

      {/* Add/Edit Project Modal */}
      <AddProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProject}
        project={editingProject}
      />
    </div>
  )
}
