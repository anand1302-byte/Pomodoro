'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Users, Activity, Globe, Clock, Eye, LogIn, CheckCircle, Zap, PieChart, BarChart3, LogOut } from 'lucide-react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import anime from 'animejs';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

const countryData = [
  { name: 'USA', value: 35, color: '#3B82F6' },
  { name: 'India', value: 25, color: '#10B981' },
  { name: 'UK', value: 15, color: '#F59E0B' },
  { name: 'Canada', value: 12, color: '#EF4444' },
  { name: 'Germany', value: 8, color: '#8B5CF6' },
  { name: 'Others', value: 5, color: '#06B6D4' }
];

const activeUsersData = [
  { time: '00:00', users: 120 },
  { time: '04:00', users: 80 },
  { time: '08:00', users: 200 },
  { time: '12:00', users: 350 },
  { time: '16:00', users: 280 },
  { time: '20:00', users: 180 },
  { time: '24:00', users: 140 }
];

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [realTimeUsers, setRealTimeUsers] = useState(247);
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    const email = localStorage.getItem('userEmail');
    
    if (!loggedIn) {
      router.push('/login');
    } else {
      setIsLoggedIn(true);
      setUserEmail(email);
      
      // Track user login
      fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, country: 'USA' })
      });
      
      // Animate dashboard elements
      setTimeout(() => {
        anime({
          targets: '.dashboard-card',
          opacity: [0, 1],
          translateY: [30, 0],
          delay: anime.stagger(100),
          duration: 800,
          easing: 'easeOutQuart'
        });
        
        anime({
          targets: '.chart-container',
          opacity: [0, 1],
          scale: [0.9, 1],
          delay: 400,
          duration: 1000,
          easing: 'easeOutQuart'
        });
      }, 100);
    }

    // Simulate real-time user count updates
    const interval = setInterval(() => {
      setRealTimeUsers(prev => Math.max(50, prev + Math.floor(Math.random() * 10) - 5));
    }, 3000);

    return () => clearInterval(interval);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    router.push('/login');
  };

  const statsCards = [
    { title: 'Total Users', value: '12,847', icon: Users, color: 'bg-blue-500', change: '+12%' },
    { title: 'Active Users', value: realTimeUsers.toLocaleString(), icon: Activity, color: 'bg-green-500', change: '+8%' },
    { title: 'Traffic Overview', value: '45.2K', icon: Globe, color: 'bg-purple-500', change: '+15%' },
    { title: 'User Sessions', value: '8,924', icon: Clock, color: 'bg-orange-500', change: '+5%' },
    { title: 'Page Views', value: '156.8K', icon: Eye, color: 'bg-pink-500', change: '+22%' },
    { title: 'Login Count', value: '3,247', icon: LogIn, color: 'bg-indigo-500', change: '+18%' },
    { title: 'Task Completion', value: '89.4%', icon: CheckCircle, color: 'bg-emerald-500', change: '+3%' },
    { title: 'Streak Count', value: '1,456', icon: Zap, color: 'bg-yellow-500', change: '+7%' }
  ];

  if (!isLoggedIn) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">Loading...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <h1 className="ml-3 text-xl font-bold text-gray-900">Analytics Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">{realTimeUsers} users online</span>
              </div>
              <span className="text-sm text-gray-600">{userEmail}</span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((card, index) => (
            <div key={index} className="dashboard-card bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow opacity-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                  <p className="text-sm text-green-600 font-medium">{card.change}</p>
                </div>
                <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center`}>
                  <card.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pie Chart */}
          <div className="chart-container bg-white rounded-xl shadow-sm border border-gray-200 p-6 opacity-0">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Users by Country</h3>
              <PieChart className="w-5 h-5 text-gray-500" />
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={countryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {countryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {countryData.map((country, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: country.color }}></div>
                  <span className="text-sm text-gray-600">{country.name}: {country.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Line Chart */}
          <div className="chart-container bg-white rounded-xl shadow-sm border border-gray-200 p-6 opacity-0">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">24h Active Users</h3>
              <BarChart3 className="w-5 h-5 text-gray-500" />
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activeUsersData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="time" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="users" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Real-time Activity */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Real-time Activity</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Activity className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{realTimeUsers}</p>
              <p className="text-sm text-gray-600">Active Now</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Globe className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">47</p>
              <p className="text-sm text-gray-600">Countries</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">2.4m</p>
              <p className="text-sm text-gray-600">Avg. Session</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}