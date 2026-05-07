import React, { useState, useEffect } from 'react';
import { openDB } from 'idb';
import './CourseCard.css';

function CourseCard({ course, onClick }) {
  const [isOfflineAvailable, setIsOfflineAvailable] = useState(false);

  useEffect(() => {
    checkOfflineAvailability();
  }, [course.id]);

  const checkOfflineAvailability = async () => {
    try {
      const db = await openDB('ELearningDB', 1);
      const offlineCourse = await db.get('courses', course.id);
      setIsOfflineAvailable(!!offlineCourse);
    } catch (error) {
      console.error('Error checking offline availability:', error);
    }
  };

  const handleDownloadOffline = async (e) => {
    e.stopPropagation();
    
    try {
      const db = await openDB('ELearningDB', 1);
      
      // Store course data (excluding video)
      await db.put('courses', {
        id: course.id,
        title: course.title,
        description: course.description,
        content: course.content,
        tags: course.tags,
        imageUrl: course.imageUrl,
        downloadedAt: new Date().toISOString()
      });

      setIsOfflineAvailable(true);
      alert(`${course.title} is now available offline!`);
    } catch (error) {
      console.error('Error downloading course:', error);
      alert('Failed to download course for offline use.');
    }
  };

  const handleRemoveOffline = async (e) => {
    e.stopPropagation();
    
    try {
      const db = await openDB('ELearningDB', 1);
      await db.delete('courses', course.id);
      setIsOfflineAvailable(false);
      alert(`${course.title} removed from offline storage.`);
    } catch (error) {
      console.error('Error removing offline course:', error);
    }
  };

  return (
    <div className="course-card" onClick={onClick}>
      <div className="course-image">
        <img src={course.imageUrl || '/placeholder-course.jpg'} alt={course.title} />
        {isOfflineAvailable && (
          <div className="offline-badge">
            <span>📥 Available Offline</span>
          </div>
        )}
        {course.completed && (
          <div className="completed-badge">
            <span>✓ Completed</span>
          </div>
        )}
      </div>
      
      <div className="course-content">
        <h3>{course.title}</h3>
        <p>{course.description}</p>
        
        <div className="course-tags">
          {course.tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>

        <div className="course-actions">
          {!isOfflineAvailable ? (
            <button 
              className="btn-download"
              onClick={handleDownloadOffline}
            >
              📥 Download for Offline
            </button>
          ) : (
            <button 
              className="btn-remove-offline"
              onClick={handleRemoveOffline}
            >
              🗑️ Remove Offline
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
