'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Header from '../components/Header'
import PomodoroTimer from '../components/PomodoroTimer'
import TodoList from '../components/TodoList'
import ReportsModal from '../components/ReportsModal'
import SettingsModal from '../components/SettingsModal'
import LoginModal from '../components/LoginModal'
import { trackingService } from '../lib/tracking'

export default function Home() {
  const { data: session } = useSession()
  const [showReports, setShowReports] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [streak, setStreak] = useState(0)
  const [theme, setTheme] = useState({
    pomodoro: '#3B82F6',
    shortBreak: '#EF4444',
    longBreak: '#10B981'
  })

  useEffect(() => {
    if (session) {
      const userId = session.user.email
      setStreak(trackingService.getStreak(userId))
      
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme) setTheme(JSON.parse(savedTheme))
    }
  }, [session])

  const handleTaskLimitReached = () => {
    setShowLogin(true)
  }

  const updateTheme = (newTheme) => {
    setTheme(newTheme)
    localStorage.setItem('theme', JSON.stringify(newTheme))
  }

  const handleSessionComplete = (mode, duration) => {
    if (session) {
      const userId = session.user.email
      trackingService.saveSession(userId, mode, duration)
      setStreak(trackingService.getStreak(userId))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header 
        session={session}
        streak={streak}
        onReportsClick={() => setShowReports(true)}
        onSettingsClick={() => setShowSettings(true)}
        onLoginClick={() => setShowLogin(true)}
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8 md:h-[500px] lg:h-[600px]">
            <div className="flex-1 min-h-[400px] md:min-h-0">
              <PomodoroTimer 
                theme={theme} 
                onSessionComplete={handleSessionComplete}
              />
            </div>
            <div className="flex-1 min-h-[400px] md:min-h-0">
              <TodoList 
                session={session}
                onTaskLimitReached={handleTaskLimitReached}
              />
            </div>
          </div>
        </div>
      </main>

      {showReports && (
        <ReportsModal 
          session={session}
          onClose={() => setShowReports(false)}
        />
      )}

      {showSettings && (
        <SettingsModal 
          theme={theme}
          onThemeChange={updateTheme}
          onClose={() => setShowSettings(false)}
        />
      )}

      {showLogin && (
        <LoginModal onClose={() => setShowLogin(false)} />
      )}
    </div>
  )
}