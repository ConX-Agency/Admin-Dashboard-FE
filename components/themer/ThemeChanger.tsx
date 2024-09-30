"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeChanger() {
  const { theme, setTheme } = useTheme()
  const isDarkMode = theme === "dark"

  const handleThemeChange = () => {
    setTheme(isDarkMode ? "light" : "dark")
  }

  return (
    <Button variant="ghost" size="icon" onClick={handleThemeChange} className="dark:hover:bg-neutral-700">
      {isDarkMode ? (
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}