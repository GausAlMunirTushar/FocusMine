"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Project, ProjectData } from "@/types/project"

interface ProjectContextType {
  projects: Project[]
  activeProject: Project | null
  projectData: ProjectData | null
  setActiveProject: (project: Project | null) => void
  createProject: (project: Omit<Project, "id" | "createdAt" | "updatedAt" | "stats">) => void
  updateProject: (project: Project) => void
  deleteProject: (projectId: string) => void
  updateProjectData: (projectId: string, data: Partial<ProjectData>) => void
  getProjectData: (projectId: string) => ProjectData
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

const defaultProjectData: ProjectData = {
  tasks: [],
  notes: [],
  timeBlocks: [],
  learningGoals: [],
  journalEntries: [],
  pomodoroSessions: [],
}

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([])
  const [activeProject, setActiveProjectState] = useState<Project | null>(null)
  const [projectData, setProjectData] = useState<ProjectData | null>(null)

  // Load projects from localStorage
  useEffect(() => {
    const savedProjects = localStorage.getItem("focusnest-projects")
    if (savedProjects) {
      try {
        const parsedProjects = JSON.parse(savedProjects).map((project: any) => ({
          ...project,
          createdAt: new Date(project.createdAt),
          updatedAt: new Date(project.updatedAt),
          stats: {
            ...project.stats,
            lastActivity: new Date(project.stats.lastActivity),
          },
        }))
        setProjects(parsedProjects)
      } catch (error) {
        console.error("Failed to load projects:", error)
      }
    }
  }, [])

  // Save projects to localStorage
  useEffect(() => {
    localStorage.setItem("focusnest-projects", JSON.stringify(projects))
  }, [projects])

  // Load project data when active project changes
  useEffect(() => {
    if (activeProject) {
      const data = getProjectData(activeProject.id)
      setProjectData(data)
    } else {
      setProjectData(null)
    }
  }, [activeProject])

  const setActiveProject = (project: Project | null) => {
    setActiveProjectState(project)
    if (project) {
      localStorage.setItem("focusnest-active-project", project.id)
    } else {
      localStorage.removeItem("focusnest-active-project")
    }
  }

  const createProject = (projectData: Omit<Project, "id" | "createdAt" | "updatedAt" | "stats">) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      stats: {
        totalTasks: 0,
        completedTasks: 0,
        totalPomodoros: 0,
        totalTimeSpent: 0,
        lastActivity: new Date(),
      },
    }

    setProjects((prev) => [newProject, ...prev])
    return newProject
  }

  const updateProject = (updatedProject: Project) => {
    setProjects((prev) => prev.map((project) => (project.id === updatedProject.id ? updatedProject : project)))

    if (activeProject?.id === updatedProject.id) {
      setActiveProjectState(updatedProject)
    }
  }

  const deleteProject = (projectId: string) => {
    setProjects((prev) => prev.filter((project) => project.id !== projectId))

    // Remove project data
    localStorage.removeItem(`focusnest-project-${projectId}`)

    if (activeProject?.id === projectId) {
      setActiveProject(null)
    }
  }

  const getProjectData = (projectId: string): ProjectData => {
    const savedData = localStorage.getItem(`focusnest-project-${projectId}`)
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        return {
          tasks:
            parsed.tasks?.map((task: any) => ({
              ...task,
              createdAt: new Date(task.createdAt),
            })) || [],
          notes:
            parsed.notes?.map((note: any) => ({
              ...note,
              createdAt: new Date(note.createdAt),
              updatedAt: new Date(note.updatedAt),
            })) || [],
          timeBlocks: parsed.timeBlocks || [],
          learningGoals:
            parsed.learningGoals?.map((goal: any) => ({
              ...goal,
              createdAt: new Date(goal.createdAt),
              updatedAt: new Date(goal.updatedAt),
              deadline: goal.deadline ? new Date(goal.deadline) : undefined,
              sessions:
                goal.sessions?.map((session: any) => ({
                  ...session,
                  date: new Date(session.date),
                })) || [],
            })) || [],
          journalEntries:
            parsed.journalEntries?.map((entry: any) => ({
              ...entry,
              date: new Date(entry.date),
              createdAt: new Date(entry.createdAt),
              updatedAt: new Date(entry.updatedAt),
            })) || [],
          pomodoroSessions:
            parsed.pomodoroSessions?.map((session: any) => ({
              ...session,
              completedAt: new Date(session.completedAt),
            })) || [],
        }
      } catch (error) {
        console.error("Failed to load project data:", error)
      }
    }
    return defaultProjectData
  }

  const updateProjectData = (projectId: string, data: Partial<ProjectData>) => {
    const currentData = getProjectData(projectId)
    const updatedData = { ...currentData, ...data }

    localStorage.setItem(`focusnest-project-${projectId}`, JSON.stringify(updatedData))

    if (activeProject?.id === projectId) {
      setProjectData(updatedData)
    }

    // Update project stats
    const project = projects.find((p) => p.id === projectId)
    if (project) {
      const updatedProject: Project = {
        ...project,
        stats: {
          totalTasks: updatedData.tasks.length,
          completedTasks: updatedData.tasks.filter((task) => task.completed).length,
          totalPomodoros: updatedData.pomodoroSessions.filter((s) => s.type === "pomodoro").length,
          totalTimeSpent: updatedData.pomodoroSessions.reduce((sum, s) => sum + s.duration, 0),
          lastActivity: new Date(),
        },
        updatedAt: new Date(),
      }
      updateProject(updatedProject)
    }
  }

  return (
    <ProjectContext.Provider
      value={{
        projects,
        activeProject,
        projectData,
        setActiveProject,
        createProject,
        updateProject,
        deleteProject,
        updateProjectData,
        getProjectData,
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}

export function useProject() {
  const context = useContext(ProjectContext)
  if (context === undefined) {
    throw new Error("useProject must be used within a ProjectProvider")
  }
  return context
}
