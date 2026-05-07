import React, { useState, useEffect } from 'react';
import './App.css';
import CourseList from './components/CourseList';
import CourseDetail from './components/CourseDetail';
import ErrorBoundary from './components/ErrorBoundary';
import UserProfile from './components/UserProfile';
import StreakTracker from './components/StreakTracker';
import SearchFilter from './components/SearchFilter';
import { openDB } from 'idb';

function App() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [view, setView] = useState('courses'); // 'courses', 'detail', 'profile'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [streak, setStreak] = useState(0);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Initialize IndexedDB
    initDB();
    
    // Load courses
    loadCourses();
    
    // Check streak
    checkStreak();
    
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const initDB = async () => {
    await openDB('ELearningDB', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('courses')) {
          db.createObjectStore('courses', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('videoProgress')) {
          db.createObjectStore('videoProgress', { keyPath: 'videoId' });
        }
      },
    });
  };

  const loadCourses = () => {
    // Sample course data
    const sampleCourses = [
      {
        id: 1,
        title: 'Complete React Course',
        description: 'Learn React from basics to advanced concepts',
        tags: ['Programming', 'Web Development'],
        videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
        content: 'This is a comprehensive React course covering hooks, context, and more...',
        imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80',
        completed: false,
        offline: false
      },
      {
        id: 2,
        title: 'UI/UX Design Fundamentals',
        description: 'Master the principles of user interface and user experience design',
        tags: ['Design', 'UX'],
        videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-10s.mp4',
        content: 'Learn design thinking, wireframing, prototyping, and user testing...',
        imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
        completed: false,
        offline: false
      },
      {
        id: 3,
        title: 'Digital Marketing Mastery',
        description: 'Comprehensive guide to digital marketing strategies',
        tags: ['Marketing', 'Business'],
        videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-15s.mp4',
        content: 'SEO, SEM, social media marketing, email marketing, and analytics...',
        imageUrl: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&q=80',
        completed: false,
        offline: false
      },
      {
        id: 4,
        title: 'Python for Data Science',
        description: 'Learn Python programming for data analysis and visualization',
        tags: ['Programming', 'Data Science'],
        videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-20s.mp4',
        content: 'NumPy, Pandas, Matplotlib, data cleaning, and machine learning basics...',
        imageUrl: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&q=80',
        completed: false,
        offline: false
      },
      {
        id: 5,
        title: 'Advanced JavaScript',
        description: 'Deep dive into JavaScript ES6+ features and patterns',
        tags: ['Programming', 'Web Development'],
        videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-30s.mp4',
        content: 'Async/await, promises, modules, closures, and functional programming...',
        imageUrl: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=600&q=80',
        completed: false,
        offline: false
      }
    ];
    setCourses(sampleCourses);
  };

  const checkStreak = () => {
    const lastLogin = localStorage.getItem('lastLogin');
    const currentStreak = parseInt(localStorage.getItem('streak') || '0');
    const today = new Date().toDateString();

    if (lastLogin === today) {
      // Already logged in today — just restore streak
      setStreak(currentStreak);
    } else {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      if (lastLogin === yesterday.toDateString()) {
        // Logged in yesterday — increment streak
        const newStreak = currentStreak + 1;
        setStreak(newStreak);
        localStorage.setItem('streak', newStreak.toString());
        localStorage.setItem('lastLogin', today);
        checkStreakBadges(newStreak);
      } else if (!lastLogin) {
        // Very first visit ever — start streak at 1 and save today
        setStreak(1);
        localStorage.setItem('streak', '1');
        localStorage.setItem('lastLogin', today);
      } else {
        // Missed one or more days — reset streak
        setStreak(1);
        localStorage.setItem('streak', '1');
        localStorage.setItem('lastLogin', today);
      }
    }
  };

  const recordCourseActivity = () => {
    // Called whenever a user opens a course — counts as daily activity
    const today = new Date().toDateString();
    const lastActivity = localStorage.getItem('lastCourseActivity');
    if (lastActivity !== today) {
      localStorage.setItem('lastCourseActivity', today);
      // Re-run streak check so an interaction on a new day also advances the streak
      checkStreak();
    }
  };

  const checkStreakBadges = (streakCount) => {
    const badges = JSON.parse(localStorage.getItem('badges') || '[]');
    
    if (streakCount === 7 && !badges.includes('7-day-streak')) {
      badges.push('7-day-streak');
      localStorage.setItem('badges', JSON.stringify(badges));
      showNotification('Achievement Unlocked!', '🎉 7-Day Streak Badge Earned!');
    } else if (streakCount === 30 && !badges.includes('30-day-streak')) {
      badges.push('30-day-streak');
      localStorage.setItem('badges', JSON.stringify(badges));
      showNotification('Achievement Unlocked!', '🏆 30-Day Streak Badge Earned!');
    } else if (streakCount === 100 && !badges.includes('100-day-streak')) {
      badges.push('100-day-streak');
      localStorage.setItem('badges', JSON.stringify(badges));
      showNotification('Achievement Unlocked!', '⭐ 100-Day Streak Badge Earned!');
    }
  };

  const showNotification = (title, body) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body, icon: '/logo192.png' });
    }
  };

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setView('detail');
    recordCourseActivity();
  };

  const handleCourseComplete = (courseId) => {
    setCourses(courses.map(course => 
      course.id === courseId ? { ...course, completed: true } : course
    ));
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
                        selectedTags.some(tag => course.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1>🎓 E-Learning Platform</h1>
          <nav>
            <button 
              className={view === 'courses' ? 'active' : ''}
              onClick={() => setView('courses')}
            >
              Courses
            </button>
            <button 
              className={view === 'profile' ? 'active' : ''}
              onClick={() => setView('profile')}
            >
              Profile
            </button>
          </nav>
        </div>
      </header>

      <main className="main-content">
        {view === 'courses' && (
          <>
            <SearchFilter 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              allTags={['Programming', 'Design', 'Marketing', 'Business', 'Data Science', 'Web Development', 'UX']}
            />
            <CourseList 
              courses={filteredCourses} 
              onCourseSelect={handleCourseSelect}
            />
          </>
        )}

        {view === 'detail' && selectedCourse && (
          <ErrorBoundary>
            <CourseDetail 
              course={selectedCourse}
              onBack={() => setView('courses')}
              onComplete={handleCourseComplete}
            />
            </ErrorBoundary>
        )}

        {view === 'profile' && (
          <UserProfile 
            streak={streak}
            courses={courses}
          />
        )}
      </main>

      <StreakTracker streak={streak} />
    </div>
  );
}

export default App;
