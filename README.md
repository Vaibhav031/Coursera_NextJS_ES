# E-Learning Platform with Enhanced User Engagement Features

**Author:** Vaibhav Bhardwaj  
**Registration Number:** 220953348  
**Section:** CCE 'A'  
**Guide:** Shankar Biradar (Assistant Professor)  
**Institution:** Manipal Institute of Technology, School of Computer Engineering

## Project Overview

This is a modern e-learning platform built with React that implements five key features to enhance user engagement and learning outcomes:

### Features Implemented

#### 1. **Offline Mode for Course Content** ✅
- Download text-based course materials and images for offline access
- Uses IndexedDB for local storage
- "Available Offline" badge on downloaded courses
- Excludes videos to optimize storage
- Seamless offline/online transitions

#### 2. **Course Reminder Notification System** ✅
- Browser-based push notifications
- Reminder options: "1 hour", "Tomorrow", or "No reminders"
- Scheduled notifications for unfinished courses
- Permission request handling
- Click notification to navigate directly to course

#### 3. **Streak Tracking for Daily Learning** ✅
- Tracks consecutive days of learning activity
- Visible streak counter on profile
- Badge system for milestones (7-day, 30-day, 100-day streaks)
- Automatic reset on missed days
- Persistent storage using localStorage
- Motivational notifications on badge achievements

#### 4. **Animated Course Completion Confetti** ✅
- Confetti animation on course completion (3-5 seconds)
- Motivational completion message
- Smooth animations using react-confetti
- Non-intrusive celebration design

#### 5. **Search and Filter Courses with Tags** ✅
- Real-time search by title and description
- Debounced search for performance
- Tag-based filtering (Programming, Design, Marketing, etc.)
- Multi-tag selection support
- Instant results without page reload
- Clear active filters display

#### 6. **Auto-Resume Video Playback** ✅
- Saves video timestamp every 5 seconds
- "Resume Watching" button
- Progress bar showing watch percentage
- Per-video timestamp storage
- Automatic cleanup on course completion

## Technology Stack

### Frontend
- **React.js** - UI framework
- **CSS3** - Styling and animations
- **JavaScript (ES6+)** - Core logic

### Storage & APIs
- **IndexedDB** - Offline course content storage
- **LocalStorage** - User preferences, streaks, video progress
- **Browser Notification API** - Course reminders
- **idb** - Promise-based IndexedDB wrapper

### Additional Libraries
- **react-confetti** - Celebration animations

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation Steps

1. **Clone/Extract the project files**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   - Navigate to `http://localhost:3000`

5. **Enable notifications**
   - Allow browser notifications when prompted
   - This is required for the reminder feature

## Project Structure

```
elearning-platform/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── CourseList.js
│   │   ├── CourseList.css
│   │   ├── CourseCard.js
│   │   ├── CourseCard.css
│   │   ├── CourseDetail.js
│   │   ├── CourseDetail.css
│   │   ├── SearchFilter.js
│   │   ├── SearchFilter.css
│   │   ├── ReminderManager.js
│   │   ├── ReminderManager.css
│   │   ├── StreakTracker.js
│   │   ├── StreakTracker.css
│   │   ├── UserProfile.js
│   │   └── UserProfile.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Features Usage Guide

### Offline Mode
1. Navigate to any course card
2. Click "📥 Download for Offline" button
3. Course content is saved to IndexedDB
4. "Available Offline" badge appears
5. Access course content even without internet

### Course Reminders
1. Open a course detail page
2. Click on reminder options
3. Choose: "Remind me in 1 hour" or "Remind me tomorrow"
4. Receive browser notification at scheduled time
5. Click notification to return to course

### Streak Tracking
1. Login and interact with courses daily
2. View your streak in the bottom-right corner
3. Check profile for detailed streak stats
4. Earn badges at 7, 30, and 100-day milestones
5. Miss a day? Streak resets to encourage consistency

### Course Completion
1. Complete watching all course content
2. Click "Mark as Complete" button
3. Enjoy the confetti celebration! 🎉
4. See motivational completion message
5. Track completed courses in your profile

### Search & Filter
1. Use the search bar to find courses by title/description
2. Select tags to filter by category
3. Combine search and tags for precise results
4. Clear all filters with one click
5. Results update instantly

### Auto-Resume Videos
1. Start watching a course video
2. Video progress is automatically saved every 5 seconds
3. Return to the video later
4. Click "▶ Resume Watching" to continue from last position
5. Progress bar shows overall completion percentage

## Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

**Note:** Notification API requires HTTPS in production environments.

## Local Storage Data

The application stores the following data locally:

- **IndexedDB** - Offline course content
- **LocalStorage:**
  - `lastLogin` - Last login date for streak tracking
  - `streak` - Current streak count
  - `badges` - Earned achievement badges
  - `video_progress_{courseId}` - Video playback timestamps
  - `courseReminders` - Scheduled reminder times

## Future Enhancements

- Backend integration with REST API
- User authentication system
- Course progress synchronization across devices
- Advanced analytics dashboard
- Social features (comments, ratings)
- Mobile app version
- More badge types and gamification elements

## Testing

### Manual Testing Checklist
- [ ] Offline mode saves and retrieves courses
- [ ] Reminders trigger at correct times
- [ ] Streak increments daily
- [ ] Confetti plays on course completion
- [ ] Search filters courses in real-time
- [ ] Video resumes from saved timestamp
- [ ] All features work across browsers
- [ ] Responsive design on mobile/tablet

## Troubleshooting

### Notifications not working
- Check browser notification permissions
- Ensure HTTPS in production
- Verify Notification API support

### Offline mode not saving
- Check IndexedDB browser support
- Clear browser cache and retry
- Verify sufficient storage space

### Streak not updating
- Check localStorage is enabled
- Verify system date/time is correct
- Clear localStorage and restart

## Credits

**Developed by:** Vaibhav Bhardwaj (220953348)  
**Under the guidance of:** Shankar Biradar, Assistant Professor  
**Institution:** Manipal Institute of Technology  
**School:** Computer Engineering  
**Project Duration:** January 2026 - April 2026

## License

This project is developed as part of academic curriculum at Manipal Institute of Technology.

---

For any queries or support, please contact:
- Email: vaibhavbhardwaj@manipal.edu
- Registration Number: 220953348
