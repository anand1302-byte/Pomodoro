'use client'

import { useState, useEffect, useRef } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'
import anime from 'animejs'

const TIMER_MODES = {
  pomodoro: { duration: 25 * 60, label: 'Work', color: 'pomodoro' },
  shortBreak: { duration: 5 * 60, label: 'Short Break', color: 'shortBreak' },
  longBreak: { duration: 15 * 60, label: 'Long Break', color: 'longBreak' }
}

export default function PomodoroTimer({ theme, isDarkMode, onSessionComplete }) {
  const [mode, setMode] = useState('pomodoro')
  const [timeLeft, setTimeLeft] = useState(TIMER_MODES.pomodoro.duration)
  const [isRunning, setIsRunning] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [hasNotificationPermission, setHasNotificationPermission] = useState(false)
  const timerRef = useRef(null)
  const circleRef = useRef(null)
  const audioRef = useRef(null)

  useEffect(() => {
    let interval = null
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => {
          if (time <= 1) {
            setIsRunning(false)
            setIsCompleted(true)
            handleTimerComplete()
            return 0
          }
          return time - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning, timeLeft])

  useEffect(() => {
    if (circleRef.current) {
      const progress = 1 - (timeLeft / TIMER_MODES[mode].duration)
      anime({
        targets: circleRef.current,
        strokeDashoffset: 628 * (1 - progress),
        duration: 1000,
        easing: 'easeInOutQuad'
      })
    }
  }, [timeLeft, mode])

  const handleModeChange = (newMode) => {
    if (mode !== newMode) {
      anime({
        targets: '.timer-content',
        scale: [1, 0.9, 1],
        duration: 300,
        easing: 'easeInOutQuad'
      })
      
      setMode(newMode)
      setTimeLeft(TIMER_MODES[newMode].duration)
      setIsRunning(false)
      setIsCompleted(false)
    }
  }

  const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      const permission = await Notification.requestPermission()
      setHasNotificationPermission(permission === 'granted')
    } else if (Notification.permission === 'granted') {
      setHasNotificationPermission(true)
    }
  }

  const handleTimerComplete = () => {
    const sessionDuration = TIMER_MODES[mode].duration
    
    // Track session completion
    if (onSessionComplete) {
      onSessionComplete(mode, sessionDuration)
    }
    
    // Play bell sound
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log('Audio play failed:', e))
    }
    
    // Send notification
    if (hasNotificationPermission && 'Notification' in window) {
      new Notification(`${TIMER_MODES[mode].label} Complete!`, {
        body: `Your ${TIMER_MODES[mode].label.toLowerCase()} session has finished.`,
        icon: '/favicon.ico'
      })
    }
  }

  const toggleTimer = () => {
    if (!isRunning) {
      requestNotificationPermission()
    }
    setIsRunning(!isRunning)
    setIsCompleted(false)
  }

  const resetTimer = () => {
    setTimeLeft(TIMER_MODES[mode].duration)
    setIsRunning(false)
    setIsCompleted(false)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const currentColor = theme[TIMER_MODES[mode].color]

  return (
    <div className={`card text-center transition-colors duration-300 ${
      isDarkMode ? 'bg-black border-gray-500' : ''
    }`}>
      <div className="flex justify-center space-x-1 sm:space-x-2 mb-6 sm:mb-8">
        {Object.entries(TIMER_MODES).map(([key, config]) => (
          <button
            key={key}
            onClick={() => handleModeChange(key)}
            className={`px-2 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 text-xs sm:text-sm ${
              mode === key 
                ? 'text-white shadow-lg' 
                : isDarkMode 
                  ? 'text-gray-300 hover:text-white' 
                  : 'text-gray-600 hover:text-gray-800'
            }`}
            style={{
              backgroundColor: mode === key ? theme[config.color] : 'transparent'
            }}
          >
            <span className="hidden sm:inline">{config.label}</span>
            <span className="sm:hidden">{config.label.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      <div className="timer-content relative mb-6 sm:mb-8">
        <svg className="w-48 h-48 sm:w-64 sm:h-64 mx-auto transform -rotate-90" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r="90"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className={isDarkMode ? 'text-gray-500' : 'text-gray-200'}
          />
          <circle
            ref={circleRef}
            cx="100"
            cy="100"
            r="90"
            stroke={currentColor}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray="628"
            strokeDashoffset="628"
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div 
              className="text-2xl sm:text-4xl font-bold mb-2"
              style={{ color: currentColor }}
            >
              {formatTime(timeLeft)}
            </div>
            <div className={`text-xs sm:text-sm ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {TIMER_MODES[mode].label}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-3 sm:space-x-4">
        <button
          onClick={toggleTimer}
          className="btn-primary text-white px-6 sm:px-8 py-3 text-base sm:text-lg"
          style={{ backgroundColor: currentColor }}
        >
          {isRunning ? <Pause className="w-5 h-5 sm:w-6 sm:h-6" /> : <Play className="w-5 h-5 sm:w-6 sm:h-6" />}
        </button>
        
        <button
          onClick={resetTimer}
          className={`btn-primary px-3 sm:px-4 py-3 transition-colors ${
            isDarkMode 
              ? 'bg-gray-600 text-white hover:bg-gray-500' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {isCompleted && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg animate-fade-in">
          🎉 {TIMER_MODES[mode].label} completed!
        </div>
      )}
      
      <audio ref={audioRef} preload="auto">
        <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT" type="audio/wav" />
      </audio>
    </div>
  )
}