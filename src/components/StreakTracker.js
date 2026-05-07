import React from 'react';
import './StreakTracker.css';

function StreakTracker({ streak }) {
  return (
    <div className="streak-tracker">
      <div className="streak-display">
        <span className="streak-icon">🔥</span>
        <span className="streak-count">{streak}</span>
        <span className="streak-label">Day Streak</span>
      </div>
    </div>
  );
}

export default StreakTracker;
