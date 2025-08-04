"use client"

import {
  Timer,
  LayoutDashboard,
  CheckSquare,
  Settings,
  BarChart3,
  Globe,
  Moon,
  Sun,
  FileText,
  Calendar,
  BookOpen,
  FolderOpen,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useTheme } from "next-themes"
import { useLanguage } from "@/contexts/language-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { usePathname } from "next/navigation"

const menuItems = [
  {
    title: "nav.timer",
    url: "/timer",
    icon: Timer,
  },
  {
    title: "nav.dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Projects",
    url: "/projects",
    icon: FolderOpen,
  },
  {
    title: "nav.tasks",
    url: "/tasks",
    icon: CheckSquare,
  },
  {
    title: "Notes",
    url: "/notes",
    icon: FileText,
  },
  {
    title: "Planner",
    url: "/planner",
    icon: Calendar,
  },
  {
    title: "Learning",
    url: "/learning",
    icon: BookOpen,
  },
  {
    title: "nav.reports",
    url: "/reports",
    icon: BarChart3,
  },
  {
    title: "nav.settings",
    url: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Timer className="h-4 w-4" />
          </div>
          <span className="font-semibold">FocusNest</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url || pathname.startsWith(item.url + "/")}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title.startsWith("nav.") ? t(item.title) : item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  <span>{t("settings.theme")}</span>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" align="start">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun className="h-4 w-4 mr-2" />
                  {t("settings.light")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="h-4 w-4 mr-2" />
                  {t("settings.dark")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <Settings className="h-4 w-4 mr-2" />
                  {t("settings.system")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <Globe className="h-4 w-4" />
                  <span>{language === "en" ? "English" : "বাংলা"}</span>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" align="start">
                <DropdownMenuItem onClick={() => setLanguage("en")}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("bn")}>বাংলা</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
