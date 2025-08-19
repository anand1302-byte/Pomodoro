// Real-time tracking utilities
export class RealTimeTracker {
  constructor() {
    this.activeUsers = new Set();
    this.userLocations = new Map();
    this.sessionData = new Map();
  }

  // Track user activity
  trackUser(userId, location = null) {
    this.activeUsers.add(userId);
    if (location) {
      this.userLocations.set(userId, location);
    }
    
    // Remove user after 5 minutes of inactivity
    setTimeout(() => {
      this.activeUsers.delete(userId);
    }, 5 * 60 * 1000);
  }

  // Get current active users count
  getActiveUsersCount() {
    return this.activeUsers.size;
  }

  // Get user distribution by location
  getLocationDistribution() {
    const distribution = {};
    for (const [userId, location] of this.userLocations) {
      if (this.activeUsers.has(userId)) {
        distribution[location] = (distribution[location] || 0) + 1;
      }
    }
    return distribution;
  }

  // Track page view
  trackPageView(userId, page) {
    const sessionId = `${userId}_${Date.now()}`;
    this.sessionData.set(sessionId, {
      userId,
      page,
      timestamp: new Date(),
      duration: 0
    });
  }

  // Get session analytics
  getSessionAnalytics() {
    const sessions = Array.from(this.sessionData.values());
    const totalSessions = sessions.length;
    const avgDuration = sessions.reduce((sum, session) => sum + session.duration, 0) / totalSessions;
    
    return {
      totalSessions,
      avgDuration,
      activeSessions: sessions.filter(session => 
        Date.now() - session.timestamp.getTime() < 30 * 60 * 1000 // Active in last 30 minutes
      ).length
    };
  }
}

// Singleton instance
export const realTimeTracker = new RealTimeTracker();

// Utility functions for client-side tracking
export const trackUserActivity = async (userId, location) => {
  try {
    await fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'user_activity',
        data: { userId, location, timestamp: new Date() }
      })
    });
  } catch (error) {
    console.error('Failed to track user activity:', error);
  }
};

export const trackPageView = async (userId, page) => {
  try {
    await fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'page_view',
        data: { userId, page, timestamp: new Date() }
      })
    });
  } catch (error) {
    console.error('Failed to track page view:', error);
  }
};

// Get user's approximate location (for demo purposes)
export const getUserLocation = () => {
  const locations = ['USA', 'India', 'UK', 'Canada', 'Germany', 'France', 'Japan', 'Australia'];
  return locations[Math.floor(Math.random() * locations.length)];
};