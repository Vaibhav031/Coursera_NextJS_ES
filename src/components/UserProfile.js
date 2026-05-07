import React, { useState, useEffect } from 'react';
import './UserProfile.css';

function UserProfile({ streak, courses }) {
  const [badges, setBadges] = useState([]);
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    inProgressCourses: 0
  });

  useEffect(() => {
    loadBadges();
    calculateStats();
  }, [courses, streak]);

  const loadBadges = () => {
    const savedBadges = JSON.parse(localStorage.getItem('badges') || '[]');
    setBadges(savedBadges);
  };

  const calculateStats = () => {
    const completed = courses.filter(c => c.completed).length;
    const inProgress = courses.length - completed;
    
    setStats({
      totalCourses: courses.length,
      completedCourses: completed,
      inProgressCourses: inProgress
    });
  };

  const badgeDetails = {
    '7-day-streak': {
      icon: '🎉',
      title: '7-Day Streak',
      description: 'Learned for 7 consecutive days'
    },
    '30-day-streak': {
      icon: '🏆',
      title: '30-Day Streak',
      description: 'Learned for 30 consecutive days'
    },
    '100-day-streak': {
      icon: '⭐',
      title: '100-Day Streak',
      description: 'Learned for 100 consecutive days'
    }
  };

  return (
    <div className="user-profile">
      <div className="profile-header">
        <div className="avatar">
          <span>👤</span>
        </div>
        <h2>Vaibhav Bhardwaj</h2>
        <p className="user-id">Student ID: 220953348</p>
      </div>

      <div className="streak-section">
        <h3>🔥 Current Streak</h3>
        <div className="streak-card">
          <div className="streak-number">{streak}</div>
          <div className="streak-text">Days</div>
          <p className="streak-message">
            {streak === 0 && "Start your learning journey today!"}
            {streak > 0 && streak < 7 && "Keep going! You're building momentum!"}
            {streak >= 7 && streak < 30 && "Great job! You're on fire! 🔥"}
            {streak >= 30 && "Incredible dedication! You're a learning champion! 🏆"}
          </p>
        </div>
      </div>

      <div className="stats-section">
        <h3>📊 Learning Statistics</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{stats.totalCourses}</div>
            <div className="stat-label">Total Courses</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.completedCourses}</div>
            <div className="stat-label">Completed</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.inProgressCourses}</div>
            <div className="stat-label">In Progress</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {stats.totalCourses > 0 
                ? Math.round((stats.completedCourses / stats.totalCourses) * 100) 
                : 0}%
            </div>
            <div className="stat-label">Completion Rate</div>
          </div>
        </div>
      </div>

      <div className="badges-section">
        <h3>🏅 Badges & Achievements</h3>
        {badges.length === 0 ? (
          <p className="no-badges">No badges earned yet. Keep learning to earn badges!</p>
        ) : (
          <div className="badges-grid">
            {badges.map((badgeId, index) => (
              <div key={index} className="badge-card">
                <div className="badge-icon">{badgeDetails[badgeId]?.icon || '🏅'}</div>
                <div className="badge-title">{badgeDetails[badgeId]?.title || badgeId}</div>
                <div className="badge-description">
                  {badgeDetails[badgeId]?.description || 'Achievement unlocked!'}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="upcoming-badges">
          <h4>Next Milestones:</h4>
          <ul>
            {!badges.includes('7-day-streak') && (
              <li>🎉 7-Day Streak - {7 - streak} days to go!</li>
            )}
            {!badges.includes('30-day-streak') && streak >= 7 && (
              <li>🏆 30-Day Streak - {30 - streak} days to go!</li>
            )}
            {!badges.includes('100-day-streak') && streak >= 30 && (
              <li>⭐ 100-Day Streak - {100 - streak} days to go!</li>
            )}
          </ul>
        </div>
      </div>

      <div className="completed-courses">
        <h3>✓ Completed Courses</h3>
        {stats.completedCourses === 0 ? (
          <p className="no-completed">No courses completed yet. Start learning today!</p>
        ) : (
          <ul className="completed-list">
            {courses.filter(c => c.completed).map(course => (
              <li key={course.id}>
                <span className="check-icon">✓</span>
                {course.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
