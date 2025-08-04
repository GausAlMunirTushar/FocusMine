"use client"

import { useState, useEffect } from "react"
import { LearningList } from "@/components/learning/learning-list"
import { LearningFormModal } from "@/components/learning/learning-form-modal"
import { ProgressTracker } from "@/components/learning/progress-tracker"
import type { LearningGoal, LearningSession } from "@/types/learning"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function LearningPage() {
  const [goals, setGoals] = useState<LearningGoal[]>([])
  const [selectedGoal, setSelectedGoal] = useState<LearningGoal | null>(null)
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [editingGoal, setEditingGoal] = useState<LearningGoal | undefined>()

  // Load goals from localStorage
  useEffect(() => {
    const savedGoals = localStorage.getItem("focusnest-learning-goals")
    if (savedGoals) {
      try {
        const parsedGoals = JSON.parse(savedGoals).map((goal: any) => ({
          ...goal,
          createdAt: new Date(goal.createdAt),
          updatedAt: new Date(goal.updatedAt),
          deadline: goal.deadline ? new Date(goal.deadline) : undefined,
          sessions: goal.sessions.map((session: any) => ({
            ...session,
            date: new Date(session.date),
          })),
        }))
        setGoals(parsedGoals)
      } catch (error) {
        console.error("Failed to load learning goals:", error)
      }
    }
  }, [])

  // Save goals to localStorage
  useEffect(() => {
    localStorage.setItem("focusnest-learning-goals", JSON.stringify(goals))
  }, [goals])

  const handleCreateGoal = () => {
    setEditingGoal(undefined)
    setIsFormModalOpen(true)
  }

  const handleEditGoal = (goal: LearningGoal) => {
    setEditingGoal(goal)
    setIsFormModalOpen(true)
  }

  const handleSaveGoal = (goal: LearningGoal) => {
    setGoals((prevGoals) => {
      const existingIndex = prevGoals.findIndex((g) => g.id === goal.id)
      if (existingIndex >= 0) {
        const newGoals = [...prevGoals]
        newGoals[existingIndex] = goal
        return newGoals
      } else {
        return [goal, ...prevGoals]
      }
    })

    // Update selected goal if it's the same one
    if (selectedGoal?.id === goal.id) {
      setSelectedGoal(goal)
    }
  }

  const handleUpdateGoal = (goal: LearningGoal) => {
    handleSaveGoal(goal)
  }

  const handleAddSession = (session: LearningSession) => {
    // Session is already added in ProgressTracker component
    // This is just for consistency
  }

  const handleSelectGoal = (goal: LearningGoal) => {
    setSelectedGoal(goal)
  }

  const handleBackToList = () => {
    setSelectedGoal(null)
  }

  if (selectedGoal) {
    return (
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <Button onClick={handleBackToList} variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Learning Goals
          </Button>
        </div>
        <ProgressTracker goal={selectedGoal} onUpdateGoal={handleUpdateGoal} onAddSession={handleAddSession} />
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <LearningList
        goals={goals}
        onSelectGoal={handleSelectGoal}
        onCreateGoal={handleCreateGoal}
        onUpdateGoal={handleUpdateGoal}
      />

      <LearningFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSave={handleSaveGoal}
        goal={editingGoal}
      />
    </div>
  )
}
