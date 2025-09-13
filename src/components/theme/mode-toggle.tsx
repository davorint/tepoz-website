"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "motion/react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-10 w-10">
        <div className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-10 w-10 bg-white/80 dark:bg-white/10 backdrop-blur-sm dark:backdrop-blur-md border border-slate-300/30 dark:border-white/20 hover:bg-white/90 dark:hover:bg-white/20 hover:scale-110 dark:hover:scale-125 transition-all duration-200 dark:duration-300 rounded-full">
          <AnimatePresence mode="wait">
            {resolvedTheme === 'light' ? (
              <motion.div
                key="sun"
                initial={{ rotate: -90, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                exit={{ rotate: 90, scale: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute"
              >
                <Sun className="h-[1.2rem] w-[1.2rem] text-amber-500" />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ rotate: 90, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                exit={{ rotate: -90, scale: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute"
              >
                <Moon className="h-[1.2rem] w-[1.2rem] text-blue-300" />
              </motion.div>
            )}
          </AnimatePresence>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border-slate-300 dark:border-slate-600 shadow-xl shadow-slate-300/20 dark:shadow-white/15">
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className={`text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors ${theme === 'light' ? 'bg-slate-100 dark:bg-slate-700/50' : ''}`}
        >
          <Sun className="mr-2 h-4 w-4 text-amber-500" />
          <span>Light</span>
          {theme === 'light' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="ml-auto w-2 h-2 bg-amber-400 rounded-full"
            />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className={`text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors ${theme === 'dark' ? 'bg-slate-100 dark:bg-slate-700/50' : ''}`}
        >
          <Moon className="mr-2 h-4 w-4 text-blue-300" />
          <span>Dark</span>
          {theme === 'dark' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="ml-auto w-2 h-2 bg-blue-400 rounded-full"
            />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}