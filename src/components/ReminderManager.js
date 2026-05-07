import React, { useState, useEffect } from 'react';
import './ReminderManager.css';

function ReminderManager({ course }) {
  const [reminderSet, setReminderSet] = useState(false);
  const [reminderTime, setReminderTime] = useState(null);

  useEffect(() => {
    checkExistingReminder();
  }, [course.id]);

  const checkExistingReminder = () => {
    const reminders = JSON.parse(localStorage.getItem('courseReminders') || '{}');
    if (reminders[course.id]) {
      setReminderSet(true);
      setReminderTime(new Date(reminders[course.id]));
    }
  };

  const setReminder = (option) => {
    let reminderDate = new Date();
    
    switch(option) {
      case '1hour':
        reminderDate.setHours(reminderDate.getHours() + 1);
        break;
      case 'tomorrow':
        reminderDate.setDate(reminderDate.getDate() + 1);
        reminderDate.setHours(9, 0, 0, 0); // 9 AM tomorrow
        break;
      case 'none':
        removeReminder();
        return;
      default:
        return;
    }

    // Store reminder
    const reminders = JSON.parse(localStorage.getItem('courseReminders') || '{}');
    reminders[course.id] = reminderDate.toISOString();
    localStorage.setItem('courseReminders', JSON.stringify(reminders));

    setReminderSet(true);
    setReminderTime(reminderDate);

    // Schedule notification
    scheduleNotification(reminderDate);
    
    alert(`Reminder set for ${reminderDate.toLocaleString()}`);
  };

  const scheduleNotification = (reminderDate) => {
    const now = new Date();
    const timeDiff = reminderDate.getTime() - now.getTime();

    if (timeDiff > 0) {
      setTimeout(() => {
        showNotification();
      }, timeDiff);
    }
  };

  const showNotification = () => {
    if ('Notification' in window && Notification.permission === 'granted') {
      const notification = new Notification('Course Reminder', {
        body: `Time to continue learning: ${course.title}`,
        icon: '/logo192.png',
        badge: '/logo192.png',
        tag: `course-${course.id}`,
        requireInteraction: true
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };
    }
  };

  const removeReminder = () => {
    const reminders = JSON.parse(localStorage.getItem('courseReminders') || '{}');
    delete reminders[course.id];
    localStorage.setItem('courseReminders', JSON.stringify(reminders));
    
    setReminderSet(false);
    setReminderTime(null);
    alert('Reminder removed');
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        alert('Notification permission granted!');
      } else {
        alert('Notification permission denied. Please enable it in browser settings.');
      }
    }
  };

  return (
    <div className="reminder-manager">
      <h3>📅 Set a Reminder</h3>
      
      {Notification.permission === 'default' && (
        <div className="permission-request">
          <p>Enable notifications to receive course reminders</p>
          <button onClick={requestNotificationPermission}>
            Enable Notifications
          </button>
        </div>
      )}

      {reminderSet && reminderTime && (
        <div className="active-reminder">
          <p>✓ Reminder set for: {reminderTime.toLocaleString()}</p>
          <button 
            className="btn-remove"
            onClick={() => setReminder('none')}
          >
            Remove Reminder
          </button>
        </div>
      )}

      {!reminderSet && (
        <div className="reminder-options">
          <button 
            className="btn-reminder"
            onClick={() => setReminder('1hour')}
            disabled={Notification.permission !== 'granted'}
          >
            ⏰ Remind me in 1 hour
          </button>
          <button 
            className="btn-reminder"
            onClick={() => setReminder('tomorrow')}
            disabled={Notification.permission !== 'granted'}
          >
            📅 Remind me tomorrow
          </button>
          <button 
            className="btn-reminder no-reminder"
            onClick={() => setReminder('none')}
          >
            🚫 No reminders
          </button>
        </div>
      )}
    </div>
  );
}

export default ReminderManager;
