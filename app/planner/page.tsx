"use client"

import { useState, useEffect } from "react"
import { TimeGrid } from "@/components/planner/time-grid"
import { TaskDrawer } from "@/components/planner/task-drawer"
import { DaySelector } from "@/components/planner/day-selector"
import type { TimeBlock, DayPlan } from "@/types/planner"

export default function PlannerPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [dayPlans, setDayPlans] = useState<DayPlan[]>([])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [editingBlock, setEditingBlock] = useState<TimeBlock | undefined>()
  const [defaultStartTime, setDefaultStartTime] = useState<string>()

  // Load plans from localStorage
  useEffect(() => {
    const savedPlans = localStorage.getItem("focusnest-day-plans")
    if (savedPlans) {
      try {
        setDayPlans(JSON.parse(savedPlans))
      } catch (error) {
        console.error("Failed to load day plans:", error)
      }
    }
  }, [])

  // Save plans to localStorage
  useEffect(() => {
    localStorage.setItem("focusnest-day-plans", JSON.stringify(dayPlans))
  }, [dayPlans])

  const formatDateKey = (date: Date) => {
    return date.toISOString().split("T")[0]
  }

  const getCurrentDayPlan = (): DayPlan => {
    const dateKey = formatDateKey(selectedDate)
    return dayPlans.find((plan) => plan.date === dateKey) || { date: dateKey, blocks: [] }
  }

  const updateDayPlan = (updatedPlan: DayPlan) => {
    setDayPlans((plans) => {
      const existingIndex = plans.findIndex((plan) => plan.date === updatedPlan.date)
      if (existingIndex >= 0) {
        const newPlans = [...plans]
        newPlans[existingIndex] = updatedPlan
        return newPlans
      } else {
        return [...plans, updatedPlan]
      }
    })
  }

  const handleCreateBlock = (startTime: string) => {
    setDefaultStartTime(startTime)
    setEditingBlock(undefined)
    setIsDrawerOpen(true)
  }

  const handleUpdateBlock = (block: TimeBlock) => {
    const currentPlan = getCurrentDayPlan()
    const updatedBlocks = currentPlan.blocks.map((b) => (b.id === block.id ? block : b))
    updateDayPlan({ ...currentPlan, blocks: updatedBlocks })
  }

  const handleDeleteBlock = (blockId: string) => {
    const currentPlan = getCurrentDayPlan()
    const updatedBlocks = currentPlan.blocks.filter((b) => b.id !== blockId)
    updateDayPlan({ ...currentPlan, blocks: updatedBlocks })
  }

  const handleSaveBlock = (block: TimeBlock) => {
    const currentPlan = getCurrentDayPlan()
    const existingIndex = currentPlan.blocks.findIndex((b) => b.id === block.id)

    let updatedBlocks: TimeBlock[]
    if (existingIndex >= 0) {
      updatedBlocks = currentPlan.blocks.map((b) => (b.id === block.id ? block : b))
    } else {
      updatedBlocks = [...currentPlan.blocks, block]
    }

    // Sort blocks by start time
    updatedBlocks.sort((a, b) => a.startTime.localeCompare(b.startTime))

    updateDayPlan({ ...currentPlan, blocks: updatedBlocks })
  }

  const currentPlan = getCurrentDayPlan()

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <DaySelector selectedDate={selectedDate} onDateChange={setSelectedDate} />

      <TimeGrid
        blocks={currentPlan.blocks}
        onUpdateBlock={handleUpdateBlock}
        onDeleteBlock={handleDeleteBlock}
        onCreateBlock={handleCreateBlock}
        selectedDate={selectedDate}
      />

      <TaskDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSave={handleSaveBlock}
        block={editingBlock}
        defaultStartTime={defaultStartTime}
      />
    </div>
  )
}
