"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckSquare, FileText, Timer, Calendar, BookOpen, PenTool, BarChart3 } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

interface ProjectTabsProps {
  projectId: string
}

export function ProjectTabs({ projectId }: ProjectTabsProps) {
  const router = useRouter()
  const pathname = usePathname()

  const tabs = [
    { value: "", label: "Overview", icon: BarChart3 },
    { value: "tasks", label: "Tasks", icon: CheckSquare },
    { value: "notes", label: "Notes", icon: FileText },
    { value: "pomodoro", label: "Focus", icon: Timer },
    { value: "planner", label: "Planner", icon: Calendar },
    { value: "learning", label: "Learning", icon: BookOpen },
    { value: "journal", label: "Journal", icon: PenTool },
    { value: "reports", label: "Reports", icon: BarChart3 },
  ]

  const getCurrentTab = () => {
    const segments = pathname.split("/")
    const lastSegment = segments[segments.length - 1]
    return lastSegment === projectId ? "" : lastSegment
  }

  const handleTabChange = (value: string) => {
    const basePath = `/projects/${projectId}`
    const newPath = value ? `${basePath}/${value}` : basePath
    router.push(newPath)
  }

  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-[73px] z-30">
      <div className="container mx-auto px-4">
        <Tabs value={getCurrentTab()} onValueChange={handleTabChange}>
          <TabsList className="h-12 bg-transparent border-0 p-0">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-2 h-12 px-4 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none"
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  )
}
