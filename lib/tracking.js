export const trackingService = {
  saveSession(userId, mode, duration) {
    const sessions = this.getSessions(userId)
    const today = new Date().toISOString().split('T')[0]
    
    sessions.push({
      date: today,
      mode,
      duration,
      timestamp: Date.now()
    })
    
    localStorage.setItem(`sessions_${userId}`, JSON.stringify(sessions))
    this.updateStreak(userId)
  },

  getSessions(userId) {
    const sessions = localStorage.getItem(`sessions_${userId}`)
    return sessions ? JSON.parse(sessions) : []
  },

  getWeeklyData(userId) {
    const sessions = this.getSessions(userId)
    const weekData = []
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      const dayName = date.toLocaleDateString('en', { weekday: 'short' })
      
      const dayHours = sessions
        .filter(s => s.date === dateStr)
        .reduce((total, s) => total + (s.duration / 3600), 0)
      
      weekData.push({ day: dayName, hours: Math.round(dayHours * 10) / 10 })
    }
    
    return weekData
  },

  getTotalHours(userId) {
    const sessions = this.getSessions(userId)
    return Math.round(sessions.reduce((total, s) => total + (s.duration / 3600), 0) * 10) / 10
  },

  getDaysAccessed(userId) {
    const sessions = this.getSessions(userId)
    const uniqueDates = [...new Set(sessions.map(s => s.date))]
    return uniqueDates.length
  },

  updateStreak(userId) {
    const now = Date.now()
    const lastStreakUpdate = localStorage.getItem(`lastStreakUpdate_${userId}`)
    
    if (!lastStreakUpdate) {
      localStorage.setItem(`streak_${userId}`, '1')
      localStorage.setItem(`lastStreakUpdate_${userId}`, now.toString())
      return 1
    }
    
    const hoursSinceLastUpdate = (now - parseInt(lastStreakUpdate)) / (1000 * 60 * 60)
    
    if (hoursSinceLastUpdate > 48) {
      localStorage.setItem(`streak_${userId}`, '1')
      localStorage.setItem(`lastStreakUpdate_${userId}`, now.toString())
      return 1
    }
    
    if (hoursSinceLastUpdate >= 24) {
      const currentStreak = this.getStreak(userId)
      const newStreak = currentStreak + 1
      localStorage.setItem(`streak_${userId}`, newStreak.toString())
      localStorage.setItem(`lastStreakUpdate_${userId}`, now.toString())
      return newStreak
    }
    
    return this.getStreak(userId)
  },

  getStreak(userId) {
    const streak = localStorage.getItem(`streak_${userId}`)
    return streak ? parseInt(streak) : 0
  }
}