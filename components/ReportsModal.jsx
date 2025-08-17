'use client'

import { useState, useEffect } from 'react'
import { X, Clock, Calendar, Trophy, BarChart } from 'lucide-react'
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { trackingService } from '../lib/tracking'

export default function ReportsModal({ session, onClose }) {
  const [activeTab, setActiveTab] = useState('summary')
  const [userData, setUserData] = useState({
    totalHours: 0,
    daysAccessed: 0,
    streak: 0,
    weeklyData: [],
    detailData: []
  })

  useEffect(() => {
    if (session) {
      const userId = session.user.email
      const sessions = trackingService.getSessions(userId)
      
      setUserData({
        totalHours: trackingService.getTotalHours(userId),
        daysAccessed: trackingService.getDaysAccessed(userId),
        streak: trackingService.getStreak(userId),
        weeklyData: trackingService.getWeeklyData(userId),
        detailData: sessions.slice(-7).reverse().map(s => ({
          date: s.date,
          sessions: sessions.filter(sess => sess.date === s.date).length,
          focused: Math.round(sessions.filter(sess => sess.date === s.date).reduce((t, sess) => t + sess.duration/3600, 0) * 10) / 10 + 'h',
          breaks: sessions.filter(sess => sess.date === s.date && sess.mode !== 'pomodoro').length
        }))
      })
    }
  }, [session])

  if (!session) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 max-w-md mx-4 text-center">
          <div className="mb-4">
            <BarChart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Reports Locked</h3>
            <p className="text-gray-600">Sign in to access your productivity reports and analytics.</p>
          </div>
          <button
            onClick={onClose}
            className="btn-primary bg-blue-600 text-white hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900">Reports</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex border-b border-gray-200">
          {['summary', 'detail', 'ranking'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium capitalize transition-colors ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {activeTab === 'summary' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="card text-center">
                    <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{userData.totalHours}</div>
                    <div className="text-gray-600">Focused Hours</div>
                  </div>
                  <div className="card text-center">
                    <Calendar className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{userData.daysAccessed}</div>
                    <div className="text-gray-600">Days Accessed</div>
                  </div>
                  <div className="card text-center">
                    <Trophy className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{userData.streak}</div>
                    <div className="text-gray-600">Day Streak</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Focus Hours</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={userData.weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="hours" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'detail' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Detailed Analytics</h3>
              <div className="space-y-3">
                {userData.detailData.map((day, index) => (
                  <div key={index} className="card">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-gray-900">{day.date}</div>
                        <div className="text-sm text-gray-600">
                          {day.sessions} sessions • {day.focused} focused • {day.breaks} breaks
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-blue-600">{day.focused}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'ranking' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Global Ranking</h3>
              <div className="space-y-3">
                {[
                  { rank: 1, name: 'Alex Chen', hours: 45.2, streak: 21 },
                  { rank: 2, name: 'Sarah Kim', hours: 42.8, streak: 18 },
                  { rank: 3, name: 'You', hours: userData.totalHours, streak: userData.streak, isUser: true },
                  { rank: 4, name: 'Mike Johnson', hours: 23.1, streak: 12 },
                ].map((user, index) => (
                  <div key={index} className={`card ${user.isUser ? 'ring-2 ring-blue-500' : ''}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          user.rank <= 3 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {user.rank}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-600">{user.streak} day streak</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">{user.hours}h</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}