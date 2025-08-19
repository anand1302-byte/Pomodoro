import { NextResponse } from 'next/server';

// Mock analytics data
const generateAnalyticsData = () => {
  const now = new Date();
  const last24Hours = [];
  
  for (let i = 23; i >= 0; i--) {
    const hour = new Date(now.getTime() - (i * 60 * 60 * 1000));
    last24Hours.push({
      time: hour.toISOString(),
      activeUsers: Math.floor(Math.random() * 200) + 50,
      pageViews: Math.floor(Math.random() * 1000) + 200,
      sessions: Math.floor(Math.random() * 150) + 30
    });
  }
  
  return {
    realTimeUsers: Math.floor(Math.random() * 50) + 200,
    last24Hours,
    countryDistribution: {
      'USA': 35,
      'India': 25,
      'UK': 15,
      'Canada': 12,
      'Germany': 8,
      'Others': 5
    },
    totalStats: {
      totalUsers: 12847,
      activeUsers: Math.floor(Math.random() * 50) + 200,
      trafficOverview: 45200,
      userSessions: 8924,
      pageViews: 156800,
      loginCount: 3247,
      taskCompletion: 89.4,
      streakCount: 1456
    }
  };
};

export async function GET() {
  try {
    const analyticsData = generateAnalyticsData();
    
    return NextResponse.json({
      success: true,
      data: analyticsData
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { event, data } = await request.json();
    
    // Log analytics event (in real app, save to database)
    console.log('Analytics Event:', event, data);
    
    return NextResponse.json({ success: true, message: 'Event tracked' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}