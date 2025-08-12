"use client"

import { TaskManager } from "@/components/task-manager"
import { useLanguage } from "@/contexts/language-context"

export default function TasksPage() {
  const { t } = useLanguage()

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{t("tasks.title")}</h1>
      <TaskManager />
    </div>
  )
}
