import React, { useState, useEffect, useRef } from 'react';
import Confetti from 'react-confetti';
import ReminderManager from './ReminderManager';
import './CourseDetail.css';

function CourseDetail({ course, onBack, onComplete }) {
  const [windowSize, setWindowSize] = React.useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 400,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  React.useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const [showConfetti, setShowConfetti] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [savedTimestamp, setSavedTimestamp] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    loadVideoProgress();
  }, [course.id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;
      const duration = video.duration;
      if (duration && !isNaN(duration) && duration > 0) {
        setVideoProgress((currentTime / duration) * 100);
      }
      // Save progress every 5 seconds
      if (Math.floor(currentTime) % 5 === 0 && currentTime > 0) {
        saveVideoProgress(currentTime);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [course.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadVideoProgress = () => {
    const saved = localStorage.getItem(`video_progress_${course.id}`);
    if (saved) {
      const timestamp = parseFloat(saved);
      setSavedTimestamp(timestamp);

      // Auto-seek to saved position once the video metadata is ready
      const video = videoRef.current;
      if (video) {
        const seekOnReady = () => {
          video.currentTime = timestamp;
          video.removeEventListener('loadedmetadata', seekOnReady);
        };
        if (video.readyState >= 1) {
          // Metadata already loaded — seek immediately
          video.currentTime = timestamp;
        } else {
          video.addEventListener('loadedmetadata', seekOnReady);
        }
      }
    }
  };

  const saveVideoProgress = (timestamp) => {
    localStorage.setItem(`video_progress_${course.id}`, timestamp.toString());
  };

  const handleResumeWatching = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const handleCompleteCourse = () => {
    onComplete(course.id);
    setShowConfetti(true);
    
    // Hide confetti after 5 seconds
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    // Clear video progress
    localStorage.removeItem(`video_progress_${course.id}`);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="course-detail">
      {showConfetti && (
        <div className="confetti-container">
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={300}
          />
          <div className="completion-message">
            <h2>🎉 Great Job!</h2>
            <p>You've completed this course!</p>
            <p>Keep up the excellent work!</p>
          </div>
        </div>
      )}

      <button className="btn-back" onClick={onBack}>
        ← Back to Courses
      </button>

      <div className="course-header">
        <h1>{course.title}</h1>
        <p className="course-description">{course.description}</p>
        
        <div className="course-meta">
          <div className="tags">
            {course.tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
          {course.completed && (
            <span className="completed-status">✓ Completed</span>
          )}
        </div>
      </div>

      <div className="video-section">
        <div className="video-player">
          <video 
            ref={videoRef}
            controls
            className="video-element"
            key={course.id}
            src={course.videoUrl}
          >
            Your browser does not support the video tag.
          </video>
          
          {savedTimestamp > 0 && (
            <div className="resume-banner">
              <p>▶ Auto-resumed from {formatTime(savedTimestamp)}</p>
              <button 
                className="btn-resume"
                onClick={handleResumeWatching}
              >
                ↺ Restart from beginning
              </button>
            </div>
          )}

          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${videoProgress}%` }}
            ></div>
          </div>
          <p className="progress-text">
            Video Progress: {Math.round(videoProgress)}%
          </p>
        </div>

        <ReminderManager course={course} />
      </div>

      <div className="course-content-section">
        <h2>Course Content</h2>
        <div className="content-text">
          <p>{course.content}</p>
        </div>

        {!course.completed && (
          <button 
            className="btn-complete"
            onClick={handleCompleteCourse}
          >
            ✓ Mark as Complete
          </button>
        )}
      </div>
    </div>
  );
}

export default CourseDetail;
