'use client'

import { useState, useEffect } from 'react'
import { BarChart3, Clock, CheckCircle, TrendingUp } from 'lucide-react'

export default function StatsContainer({ isDarkMode }) {
  const [stats, setStats] = useState({
    pomodorosToday: 0,
    focusTime: '0h 0m',
    tasksCompleted: 0,
    productivityScore: 0
  })

  useEffect(() => {
    // Calculate stats from localStorage
    const sessions = JSON.parse(localStorage.getItem('sessions') || '[]')
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
    const today = new Date().toDateString()
    
    const todaySessions = sessions.filter(session => session.date === today)
    const completedTasks = tasks.filter(task => task.completed).length
    
    const totalMinutes = todaySessions.reduce((total, session) => {
      return total + (session.duration / 60)
    }, 0)
    
    const hours = Math.floor(totalMinutes / 60)
    const minutes = Math.floor(totalMinutes % 60)
    
    setStats({
      pomodorosToday: todaySessions.length,
      focusTime: `${hours}h ${minutes}m`,
      tasksCompleted: completedTasks,
      productivityScore: todaySessions.length > 0 ? Math.min(100, todaySessions.length * 25) : 0
    })
  }, [])

  return (
    <div className={`card transition-colors duration-300 ${
      isDarkMode ? 'bg-black border-gray-500' : ''
    }`}>
      <h2 className={`text-xl font-semibold mb-6 flex items-center gap-2 ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}>
        <BarChart3 className="w-5 h-5" />
        Today's Stats
      </h2>
      
      <div className="grid grid-cols-2 gap-6">
        <div className={`p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border ${
          isDarkMode ? 'bg-gray-800 border-gray-600 hover:bg-gray-750' : 'bg-gradient-to-br from-blue-50 to-white border-blue-100 hover:from-blue-100'
        }`}>
          <div className={`text-3xl font-bold mb-2 ${
            isDarkMode ? 'text-blue-400' : 'text-blue-600'
          }`}>
            {stats.pomodorosToday}
          </div>
          <div className={`text-sm font-medium ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Pomodoros Completed
          </div>
        </div>
        
        <div className={`p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border ${
          isDarkMode ? 'bg-gray-800 border-gray-600 hover:bg-gray-750' : 'bg-gradient-to-br from-green-50 to-white border-green-100 hover:from-green-100'
        }`}>
          <div className={`text-3xl font-bold mb-2 ${
            isDarkMode ? 'text-green-400' : 'text-green-600'
          }`}>
            {stats.focusTime}
          </div>
          <div className={`text-sm font-medium ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Focus Time
          </div>
        </div>
        
        <div className={`p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border ${
          isDarkMode ? 'bg-gray-800 border-gray-600 hover:bg-gray-750' : 'bg-gradient-to-br from-purple-50 to-white border-purple-100 hover:from-purple-100'
        }`}>
          <div className={`text-3xl font-bold mb-2 ${
            isDarkMode ? 'text-purple-400' : 'text-purple-600'
          }`}>
            {stats.tasksCompleted}
          </div>
          <div className={`text-sm font-medium ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Tasks Completed
          </div>
        </div>
        
        <div className={`p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border ${
          isDarkMode ? 'bg-gray-800 border-gray-600 hover:bg-gray-750' : 'bg-gradient-to-br from-orange-50 to-white border-orange-100 hover:from-orange-100'
        }`}>
          <div className={`text-3xl font-bold mb-2 ${
            isDarkMode ? 'text-orange-400' : 'text-orange-600'
          }`}>
            {stats.productivityScore}%
          </div>
          <div className={`text-sm font-medium ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Productivity
          </div>
        </div>
      </div>
    </div>
  )
}