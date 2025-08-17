# Premium Pomodoro Timer

A modern, professional Pomodoro timer application built with Next.js, featuring Google authentication, customizable themes, and productivity tracking.

## Features

- **Timer Modes**: Pomodoro (25min), Short Break (5min), Long Break (15min)
- **Task Management**: Add, complete, and delete tasks (3 tasks for guests, unlimited for logged-in users)
- **Authentication**: Google OAuth integration
- **Reports**: Detailed productivity analytics (logged-in users only)
- **Theme Customization**: Customize timer colors with presets
- **Animations**: Smooth transitions using Anime.js
- **Responsive Design**: Works on all devices

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js with Google Provider
- **Animations**: Anime.js
- **Icons**: Lucide React
- **Charts**: Recharts

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Google OAuth**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

3. **Environment Variables**
   Update `.env.local` with your credentials:
   ```
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

5. **Open Application**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### Timer
- Select between Pomodoro, Short Break, or Long Break modes
- Click play/pause to control the timer
- Reset timer with the reset button
- Timer works without authentication

### Tasks
- Add up to 3 tasks as a guest
- Sign in for unlimited tasks
- Check off completed tasks
- Delete tasks with the trash icon

### Reports
- Access detailed productivity analytics (requires sign-in)
- View summary with focus hours, days accessed, and streak
- Check detailed daily breakdowns
- See global ranking

### Settings
- Customize timer colors for each mode
- Choose from preset color themes
- Changes are saved automatically

## Project Structure

```
├── app/
│   ├── api/auth/[...nextauth]/route.js
│   ├── globals.css
│   ├── layout.jsx
│   └── page.jsx
├── components/
│   ├── AuthProvider.jsx
│   ├── Header.jsx
│   ├── LoginModal.jsx
│   ├── PomodoroTimer.jsx
│   ├── ReportsModal.jsx
│   ├── SettingsModal.jsx
│   └── TodoList.jsx
└── lib/
```

## Build for Production

```bash
npm run build
npm start
```

## License

MIT License