'use client'

import { useState } from 'react'
import { X, Palette } from 'lucide-react'

const colorPresets = [
  { name: 'Default', pomodoro: '#3B82F6', shortBreak: '#EF4444', longBreak: '#10B981' },
  { name: 'Ocean', pomodoro: '#0EA5E9', shortBreak: '#F97316', longBreak: '#06B6D4' },
  { name: 'Forest', pomodoro: '#059669', shortBreak: '#DC2626', longBreak: '#16A34A' },
  { name: 'Sunset', pomodoro: '#DC2626', shortBreak: '#F59E0B', longBreak: '#7C3AED' },
  { name: 'Minimal', pomodoro: '#374151', shortBreak: '#6B7280', longBreak: '#9CA3AF' }
]

export default function SettingsModal({ theme, onThemeChange, onClose }) {
  const [selectedTheme, setSelectedTheme] = useState(theme)

  const handleColorChange = (type, color) => {
    const newTheme = { ...selectedTheme, [type]: color }
    setSelectedTheme(newTheme)
  }

  const applyPreset = (preset) => {
    setSelectedTheme(preset)
  }

  const saveSettings = () => {
    onThemeChange(selectedTheme)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <Palette className="w-5 h-5 mr-2" />
              Theme Colors
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pomodoro Color
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={selectedTheme.pomodoro}
                    onChange={(e) => handleColorChange('pomodoro', e.target.value)}
                    className="w-12 h-8 rounded border border-gray-300"
                  />
                  <input
                    type="text"
                    value={selectedTheme.pomodoro}
                    onChange={(e) => handleColorChange('pomodoro', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Short Break Color
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={selectedTheme.shortBreak}
                    onChange={(e) => handleColorChange('shortBreak', e.target.value)}
                    className="w-12 h-8 rounded border border-gray-300"
                  />
                  <input
                    type="text"
                    value={selectedTheme.shortBreak}
                    onChange={(e) => handleColorChange('shortBreak', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Long Break Color
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={selectedTheme.longBreak}
                    onChange={(e) => handleColorChange('longBreak', e.target.value)}
                    className="w-12 h-8 rounded border border-gray-300"
                  />
                  <input
                    type="text"
                    value={selectedTheme.longBreak}
                    onChange={(e) => handleColorChange('longBreak', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Color Presets</h4>
            <div className="grid grid-cols-2 gap-2">
              {colorPresets.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => applyPreset(preset)}
                  className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-left transition-colors"
                >
                  <div className="text-sm font-medium text-gray-900 mb-2">{preset.name}</div>
                  <div className="flex space-x-1">
                    <div 
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: preset.pomodoro }}
                    />
                    <div 
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: preset.shortBreak }}
                    />
                    <div 
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: preset.longBreak }}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="btn-primary bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={saveSettings}
            className="btn-primary bg-blue-600 text-white hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}