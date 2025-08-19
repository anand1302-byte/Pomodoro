'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import PomodoroTimer from '../components/PomodoroTimer';
import TodoList from '../components/TodoList';
import StatsContainer from '../components/StatsContainer';
import ArticleContent from '../components/ArticleContent';
import LoginModal from '../components/LoginModal';
import ReportsModal from '../components/ReportsModal';
import SettingsModal from '../components/SettingsModal';

const DEFAULT_THEME = {
  pomodoro: '#ef4444',
  shortBreak: '#10b981',
  longBreak: '#3b82f6'
};

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const savedTheme = localStorage.getItem('pomodoroTheme');
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedTheme) {
      setTheme(JSON.parse(savedTheme));
    }
    if (savedDarkMode) {
      setIsDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
  };

  const handleSessionComplete = (mode, duration) => {
    // Track session completion for reports
    const today = new Date().toDateString();
    const sessions = JSON.parse(localStorage.getItem('sessions') || '[]');
    sessions.push({
      date: today,
      mode,
      duration,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('sessions', JSON.stringify(sessions));
  };

  const handleTaskLimitReached = () => {
    setShowLoginModal(true);
  };

  const handleReportsClick = () => {
    if (session) {
      setShowReportsModal(true);
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-black' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      <Header 
        session={session}
        streak={streak}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        onReportsClick={handleReportsClick}
        onSettingsClick={() => setShowSettingsModal(true)}
        onLoginClick={() => setShowLoginModal(true)}
      />
      
      <main className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          <PomodoroTimer 
            theme={theme}
            isDarkMode={isDarkMode}
            onSessionComplete={handleSessionComplete}
          />
          
          <TodoList 
            session={session}
            isDarkMode={isDarkMode}
            onTaskLimitReached={handleTaskLimitReached}
          />
        </div>
        
        <div className="max-w-4xl mx-auto mb-12">
          <StatsContainer isDarkMode={isDarkMode} />
        </div>
        
        <div className="max-w-5xl mx-auto">
          <ArticleContent isDarkMode={isDarkMode} />
        </div>
      </main>

      <footer className={`border-t py-3 mt-20 transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-black border-gray-500' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="container mx-auto px-4 text-center">
          <p className={`mb-2 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>© 2024 Premium Pomodoro. All rights reserved.</p>
          <button 
            onClick={() => router.push('/login')}
            className={`underline font-medium transition-colors ${
              isDarkMode 
                ? 'text-blue-400 hover:text-blue-300' 
                : 'text-blue-600 hover:text-blue-800'
            }`}
          >
            Admin Login
          </button>
        </div>
      </footer>

      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
      
      {showReportsModal && (
        <ReportsModal 
          session={session}
          onClose={() => setShowReportsModal(false)}
        />
      )}
      
      {showSettingsModal && (
        <SettingsModal 
          theme={theme}
          onThemeChange={setTheme}
          onClose={() => setShowSettingsModal(false)}
        />
      )}
    </div>
  );
}