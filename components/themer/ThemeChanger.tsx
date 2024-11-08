import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"

export function ThemeChanger() {
  const { theme, setTheme } = useTheme()
  const isDarkMode = theme === "dark"
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeChange = () => {
    setTheme(isDarkMode ? "light" : "dark")
  }

  if (!mounted) return null

  return (
    <>
      <Button variant="ghost" size="icon" onClick={handleThemeChange} className="dark:hover:bg-neutral-700">
        <AnimatePresence mode="wait" initial={false}>
          {isDarkMode ? (
            <motion.div
              key="sun"
              initial={{ x: -25, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 25, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ x: -25, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 25, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
            </motion.div>
          )}
        </AnimatePresence>
        <span className="sr-only">Toggle theme</span>
      </Button>
    </>
  )
}
