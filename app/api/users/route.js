import { NextResponse } from 'next/server';

// In-memory storage (replace with actual database)
let users = [
  { id: 1, email: 'admin@dashboard.com', loginCount: 45, lastLogin: new Date(), country: 'USA', isActive: true },
  { id: 2, email: 'user1@example.com', loginCount: 23, lastLogin: new Date(Date.now() - 3600000), country: 'India', isActive: true },
  { id: 3, email: 'user2@example.com', loginCount: 67, lastLogin: new Date(Date.now() - 7200000), country: 'UK', isActive: false },
  { id: 4, email: 'user3@example.com', loginCount: 12, lastLogin: new Date(Date.now() - 1800000), country: 'Canada', isActive: true },
];

export async function GET() {
  try {
    const totalUsers = users.length;
    const activeUsers = users.filter(user => user.isActive).length;
    const totalLogins = users.reduce((sum, user) => sum + user.loginCount, 0);
    
    return NextResponse.json({
      success: true,
      data: {
        users,
        stats: {
          totalUsers,
          activeUsers,
          totalLogins,
          countries: users.reduce((acc, user) => {
            acc[user.country] = (acc[user.country] || 0) + 1;
            return acc;
          }, {})
        }
      }
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { email, country = 'Unknown' } = await request.json();
    
    const existingUser = users.find(user => user.email === email);
    
    if (existingUser) {
      existingUser.loginCount += 1;
      existingUser.lastLogin = new Date();
      existingUser.isActive = true;
    } else {
      const newUser = {
        id: users.length + 1,
        email,
        loginCount: 1,
        lastLogin: new Date(),
        country,
        isActive: true
      };
      users.push(newUser);
    }
    
    return NextResponse.json({ success: true, message: 'User data updated' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}