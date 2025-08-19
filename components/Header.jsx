'use client'

import { Timer, BarChart3, Settings, LogIn, Flame, Moon, Sun } from 'lucide-react'
import { signOut } from 'next-auth/react'

export default function Header({ session, streak, isDarkMode, onToggleDarkMode, onReportsClick, onSettingsClick, onLoginClick }) {
  return (
    <header className={`shadow-sm border-b transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-black border-gray-500' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <Timer className={`w-6 h-6 sm:w-8 sm:h-8 ${
              isDarkMode ? 'text-blue-400' : 'text-blue-600'
            }`} />
            <h1 className={`text-lg sm:text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>FocusFlow</h1>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={onToggleDarkMode}
              className={`btn-primary flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 text-white hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span className="hidden sm:inline">{isDarkMode ? 'Light' : 'Dark'}</span>
            </button>
            
            <button
              onClick={onReportsClick}
              className={`btn-primary flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 text-white hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Reports</span>
            </button>
            
            <button
              onClick={onSettingsClick}
              className={`btn-primary flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 text-white hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </button>
            
            {session ? (
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="flex items-center space-x-1 sm:space-x-2 bg-orange-100 text-orange-700 px-2 sm:px-3 py-2 rounded-lg">
                  <Flame className="w-4 h-4" />
                  <span className="font-medium text-sm sm:text-base">{streak}</span>
                </div>
                <button
                  onClick={() => signOut()}
                  className="btn-primary bg-red-500 text-white hover:bg-red-600 px-2 sm:px-4 flex items-center space-x-1 sm:space-x-2"
                >
                  <LogIn className="w-4 h-4 rotate-180" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="btn-primary bg-blue-600 text-white hover:bg-blue-700 flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4"
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}