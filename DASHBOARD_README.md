# Premium Analytics Dashboard

A modern, professional analytics dashboard built with Next.js, featuring secure login, real-time user tracking, and comprehensive analytics visualization.

## Features

### Authentication System
- **Secure Login**: Dedicated login page with predefined credentials
- **Session Management**: Persistent login state with localStorage
- **Route Protection**: Automatic redirect to login for unauthorized access

### Dashboard Analytics
- **8 Key Metrics Cards**: 
  - Total Users
  - Active Users (real-time)
  - Traffic Overview
  - User Sessions
  - Page Views
  - Login Count
  - Task Completion Stats
  - Streak Count

### Data Visualization
- **Pie Chart**: User distribution by country with interactive tooltips
- **Line Chart**: 24-hour active users trend with smooth animations
- **Real-time Updates**: Live user count with automatic refresh

### Real-time Tracking
- **Live User Monitoring**: Track active users in real-time
- **Geographic Analytics**: User distribution by location
- **Session Analytics**: Monitor user activities and engagement

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Animations**: Anime.js
- **Icons**: Lucide React
- **API**: Next.js API Routes

## Demo Credentials

```
Email: admin@dashboard.com
Password: admin123
```

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Access Application**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - You'll be redirected to the login page
   - Use the demo credentials to access the dashboard

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── users/route.js          # User management API
│   │   └── analytics/route.js      # Analytics data API
│   ├── dashboard/
│   │   └── page.jsx               # Main dashboard page
│   ├── login/
│   │   └── page.jsx               # Login page
│   └── page.jsx                   # Root redirect page
├── lib/
│   └── realtime.js                # Real-time tracking utilities
└── middleware.js                  # Route protection middleware
```

## API Endpoints

### Users API (`/api/users`)
- **GET**: Retrieve user statistics and data
- **POST**: Track user login and update data

### Analytics API (`/api/analytics`)
- **GET**: Fetch analytics data and metrics
- **POST**: Track user events and activities

## Dashboard Features

### Analytics Cards
Each card displays:
- Current metric value
- Percentage change indicator
- Color-coded icon
- Hover animations

### Charts
- **Pie Chart**: Interactive country distribution with legends
- **Line Chart**: 24-hour trend with tooltips and smooth curves
- **Responsive Design**: Adapts to different screen sizes

### Real-time Features
- Live user count updates every 3 seconds
- Animated metric changes
- Real-time activity indicators

## Customization

### Adding New Metrics
1. Update `statsCards` array in `dashboard/page.jsx`
2. Add corresponding API data in `api/analytics/route.js`
3. Include new tracking in `lib/realtime.js`

### Styling
- Modify Tailwind classes for visual changes
- Update color schemes in chart configurations
- Customize animations in anime.js calls

## Security Features

- Client-side authentication state management
- Route protection middleware
- Secure API endpoints
- Input validation and sanitization

## Performance Optimizations

- Lazy loading of chart components
- Efficient re-rendering with React hooks
- Optimized API calls with caching
- Smooth animations without blocking UI

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this project for learning and development purposes.