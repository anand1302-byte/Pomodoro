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
    const sessions = this.getSessions(userId)
    const dates = [...new Set(sessions.map(s => s.date))].sort()
    
    if (dates.length === 0) {
      localStorage.setItem(`streak_${userId}`, '0')
      return 0
    }
    
    let streak = 1
    const today = new Date().toISOString().split('T')[0]
    
    if (!dates.includes(today)) {
      localStorage.setItem(`streak_${userId}`, '0')
      return 0
    }
    
    for (let i = dates.length - 2; i >= 0; i--) {
      const current = new Date(dates[i + 1])
      const previous = new Date(dates[i])
      const diffDays = (current - previous) / (1000 * 60 * 60 * 24)
      
      if (diffDays === 1) {
        streak++
      } else {
        break
      }
    }
    
    localStorage.setItem(`streak_${userId}`, streak.toString())
    return streak
  },

  getStreak(userId) {
    const streak = localStorage.getItem(`streak_${userId}`)
    return streak ? parseInt(streak) : 0
  }
}