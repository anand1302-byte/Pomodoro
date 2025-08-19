'use client'

import { useState, useEffect } from 'react'
import { Plus, Check, Trash2, Lock } from 'lucide-react'
import anime from 'animejs'

export default function TodoList({ session, isDarkMode, onTaskLimitReached }) {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks')
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = () => {
    if (!newTask.trim()) return
    
    if (!session && tasks.length >= 3) {
      onTaskLimitReached()
      return
    }

    const task = {
      id: Date.now(),
      text: newTask.trim(),
      completed: false
    }

    setTasks(prev => [...prev, task])
    setNewTask('')

    // Animate new task
    setTimeout(() => {
      anime({
        targets: `[data-task-id="${task.id}"]`,
        translateY: [-20, 0],
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutQuad'
      })
    }, 50)
  }

  const toggleTask = (id) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id) => {
    anime({
      targets: `[data-task-id="${id}"]`,
      translateX: 300,
      opacity: 0,
      duration: 300,
      easing: 'easeInQuad',
      complete: () => {
        setTasks(prev => prev.filter(task => task.id !== id))
      }
    })
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask()
    }
  }

  const canAddTask = session || tasks.length < 3

  return (
    <div className={`card transition-colors duration-300 ${
      isDarkMode ? 'bg-black border-gray-500' : ''
    }`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-xl font-semibold ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>Tasks</h2>
        {!session && (
          <div className={`flex items-center space-x-1 text-sm ${
            isDarkMode ? 'text-gray-300' : 'text-gray-500'
          }`}>
            <Lock className="w-4 h-4" />
            <span>{tasks.length}/3</span>
          </div>
        )}
      </div>

      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={canAddTask ? "Add a new task..." : "Sign in to add more tasks"}
          disabled={!canAddTask}
          className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-500 text-white placeholder-gray-300 disabled:bg-gray-900' 
              : 'bg-white border-gray-300 text-gray-900 disabled:bg-gray-100'
          } disabled:cursor-not-allowed`}
        />
        <button
          onClick={addTask}
          disabled={!canAddTask || !newTask.trim()}
          className="btn-primary bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {!canAddTask && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm">
          You've reached the 3-task limit. Sign in to add unlimited tasks!
        </div>
      )}

      <div className="space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            data-task-id={task.id}
            className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 ${
              task.completed 
                ? isDarkMode 
                  ? 'bg-green-900/30 border-green-600' 
                  : 'bg-green-50 border-green-200'
                : isDarkMode 
                  ? 'bg-gray-800 border-gray-500 hover:bg-gray-700' 
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            }`}
          >
            <button
              onClick={() => toggleTask(task.id)}
              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                task.completed
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'border-gray-300 hover:border-green-400'
              }`}
            >
              {task.completed && <Check className="w-3 h-3" />}
            </button>
            
            <span className={`flex-1 ${
              task.completed 
                ? isDarkMode ? 'line-through text-gray-500' : 'line-through text-gray-500'
                : isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {task.text}
            </span>
            
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500 hover:text-red-700 p-1"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        
        {tasks.length === 0 && (
          <div className={`text-center py-8 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-500'
          }`}>
            No tasks yet. Add one to get started!
          </div>
        )}
      </div>
    </div>
  )
}