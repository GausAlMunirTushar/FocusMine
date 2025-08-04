"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useProject } from "@/contexts/project-context"
import { ProjectHeader } from "@/components/projects/project-header"
import { ProjectTabs } from "@/components/projects/project-tabs"
import { ProjectSummary } from "@/components/projects/project-summary"
import { AddProjectModal } from "@/components/projects/add-project-modal"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, CheckSquare, FileText, Timer, BookOpen, PenTool, ArrowRight } from "lucide-react"
import Link from "next/link"
import type { Project } from "@/types/project"

export default function ProjectDashboard() {
  const params = useParams()
  const projectId = params.projectId as string
  const { projects, updateProject, projectData, getProjectData } = useProject()
  const [project, setProject] = useState<Project | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [currentProjectData, setCurrentProjectData] = useState(projectData)

  useEffect(() => {
    const foundProject = projects.find((p) => p.id === projectId)
    if (foundProject) {
      setProject(foundProject)
      const data = getProjectData(projectId)
      setCurrentProjectData(data)
    }
  }, [projectId, projects, getProjectData])

  if (!project || !currentProjectData) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Project not found</h2>
          <p className="text-muted-foreground mb-4">The project you're looking for doesn't exist.</p>
          <Link href="/projects">
            <Button>Back to Projects</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleEditProject = () => {
    setIsEditModalOpen(true)
  }

  const handleSaveProject = (projectData: Omit<Project, "id" | "createdAt" | "updatedAt" | "stats">) => {
    const updatedProject: Project = {
      ...project,
      ...projectData,
      updatedAt: new Date(),
    }
    updateProject(updatedProject)
    setProject(updatedProject)
  }

  const handleToggleFavorite = () => {
    const updatedProject = { ...project, isFavorite: !project.isFavorite, updatedAt: new Date() }
    updateProject(updatedProject)
    setProject(updatedProject)
  }

  const handleToggleArchive = () => {
    const updatedProject = { ...project, isArchived: !project.isArchived, updatedAt: new Date() }
    updateProject(updatedProject)
    setProject(updatedProject)
  }

  const handleExport = () => {
    const exportData = {
      project,
      data: currentProjectData,
      exportedAt: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${project.name.toLowerCase().replace(/\s+/g, "-")}-export.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const recentTasks = currentProjectData.tasks.filter((task) => !task.completed).slice(0, 5)

  const recentNotes = currentProjectData.notes
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 3)

  const activeLearningGoals = currentProjectData.learningGoals.filter((goal) => goal.status !== "completed").slice(0, 3)

  const recentJournalEntries = currentProjectData.journalEntries
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <ProjectHeader
        project={project}
        onEdit={handleEditProject}
        onToggleFavorite={handleToggleFavorite}
        onToggleArchive={handleToggleArchive}
        onExport={handleExport}
      />

      <ProjectTabs projectId={projectId} />

      <div className="container mx-auto p-6">
        <ProjectSummary project={project} projectData={currentProjectData} />

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Timer className="w-5 h-5" />
                Start Focus Session
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Begin a Pomodoro session for this project</p>
              <Link href={`/projects/${projectId}/pomodoro`}>
                <Button className="w-full">
                  <Timer className="w-4 h-4 mr-2" />
                  Start Timer
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <CheckSquare className="w-5 h-5" />
                Quick Task
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Add a new task to this project</p>
              <Link href={`/projects/${projectId}/tasks`}>
                <Button variant="outline" className="w-full bg-transparent">
                  <CheckSquare className="w-4 h-4 mr-2" />
                  Manage Tasks
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="w-5 h-5" />
                Plan Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Schedule time blocks for this project</p>
              <Link href={`/projects/${projectId}/planner`}>
                <Button variant="outline" className="w-full bg-transparent">
                  <Calendar className="w-4 h-4 mr-2" />
                  Open Planner
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Tasks */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CheckSquare className="w-5 h-5" />
                Pending Tasks
              </CardTitle>
              <Link href={`/projects/${projectId}/tasks`}>
                <Button variant="ghost" size="sm">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {recentTasks.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No pending tasks</p>
              ) : (
                <div className="space-y-2">
                  {recentTasks.map((task) => (
                    <div key={task.id} className="flex items-center gap-2 p-2 rounded border">
                      <div className="w-2 h-2 rounded-full bg-yellow-500" />
                      <span className="flex-1 text-sm">{task.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Notes */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Recent Notes
              </CardTitle>
              <Link href={`/projects/${projectId}/notes`}>
                <Button variant="ghost" size="sm">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {recentNotes.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No notes yet</p>
              ) : (
                <div className="space-y-2">
                  {recentNotes.map((note) => (
                    <div key={note.id} className="p-2 rounded border">
                      <h4 className="font-medium text-sm">{note.title || "Untitled"}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-2">{note.content.slice(0, 100)}...</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Learning Goals */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Active Learning
              </CardTitle>
              <Link href={`/projects/${projectId}/learning`}>
                <Button variant="ghost" size="sm">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {activeLearningGoals.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No active learning goals</p>
              ) : (
                <div className="space-y-2">
                  {activeLearningGoals.map((goal) => (
                    <div key={goal.id} className="p-2 rounded border">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-sm">{goal.title}</h4>
                        <span className="text-xs text-muted-foreground">{goal.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1">
                        <div
                          className="bg-blue-500 h-1 rounded-full transition-all"
                          style={{ width: `${goal.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Journal */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <PenTool className="w-5 h-5" />
                Recent Journal
              </CardTitle>
              <Link href={`/projects/${projectId}/journal`}>
                <Button variant="ghost" size="sm">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {recentJournalEntries.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No journal entries yet</p>
              ) : (
                <div className="space-y-2">
                  {recentJournalEntries.map((entry) => (
                    <div key={entry.id} className="p-2 rounded border">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-sm">{entry.title}</h4>
                        <span className="text-xs text-muted-foreground">
                          {new Date(entry.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{entry.content.slice(0, 100)}...</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Edit Project Modal */}
      <AddProjectModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProject}
        project={project}
      />
    </div>
  )
}
