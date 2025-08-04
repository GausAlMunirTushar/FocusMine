"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type ThemeMode = "light" | "dark" | "system"

interface ThemeContextType {
  mode: ThemeMode
  setMode: (mode: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function CustomThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("system")

  useEffect(() => {
    const savedMode = localStorage.getItem("focusnest-theme-mode") as ThemeMode
    if (savedMode) setMode(savedMode)
  }, [])

  useEffect(() => {
    localStorage.setItem("focusnest-theme-mode", mode)

    const root = document.documentElement

    if (mode === "dark" || (mode === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }, [mode])

  const handleSetMode = (newMode: ThemeMode) => {
    setMode(newMode)
  }

  return <ThemeContext.Provider value={{ mode, setMode: handleSetMode }}>{children}</ThemeContext.Provider>
}

export function useCustomTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useCustomTheme must be used within a CustomThemeProvider")
  }
  return context
}
