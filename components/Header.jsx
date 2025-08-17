'use client'

import { Timer, BarChart3, Settings, LogIn, Flame } from 'lucide-react'
import { signOut } from 'next-auth/react'

export default function Header({ session, streak, onReportsClick, onSettingsClick, onLoginClick }) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <Timer className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Premium Pomodoro</h1>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={onReportsClick}
              className="btn-primary bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Reports</span>
            </button>
            
            <button
              onClick={onSettingsClick}
              className="btn-primary bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4"
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
                  className="btn-primary bg-red-500 text-white hover:bg-red-600 px-2 sm:px-4"
                >
                  <span className="hidden sm:inline">Sign Out</span>
                  <span className="sm:hidden">Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="btn-primary bg-blue-600 text-white hover:bg-blue-700 flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4"
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">Sign In</span>
                <span className="sm:hidden">In</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}