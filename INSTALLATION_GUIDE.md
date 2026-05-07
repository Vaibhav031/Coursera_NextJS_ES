# E-Learning Platform - Complete Installation Guide

## Project Information
- **Student Name:** Vaibhav Bhardwaj
- **Registration Number:** 220953348
- **Section:** CCE 'A'
- **Guide:** Shankar Biradar (Assistant Professor)
- **Institution:** Manipal Institute of Technology

---

## Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software

1. **Node.js** (v14.0.0 or higher)
   - Download from: https://nodejs.org/
   - Verify installation:
     ```bash
     node --version
     npm --version
     ```

2. **Code Editor** (Choose one)
   - Visual Studio Code (Recommended): https://code.visualstudio.com/
   - WebStorm: https://www.jetbrains.com/webstorm/
   - Sublime Text: https://www.sublimetext.com/

3. **Modern Web Browser**
   - Google Chrome (Recommended)
   - Mozilla Firefox
   - Microsoft Edge
   - Safari

---

## Installation Steps

### Step 1: Extract Project Files

1. Extract the ZIP file to your desired location
2. You should see the following structure:
   ```
   elearning-platform/
   ├── public/
   ├── src/
   ├── package.json
   ├── README.md
   └── INSTALLATION_GUIDE.md
   ```

### Step 2: Open Terminal/Command Prompt

**Windows:**
- Press `Win + R`, type `cmd`, press Enter
- OR right-click in the project folder and select "Open in Terminal"

**Mac/Linux:**
- Press `Cmd + Space`, type "Terminal", press Enter
- OR right-click in the project folder and select "Open in Terminal"

### Step 3: Navigate to Project Directory

```bash
cd path/to/elearning-platform
```

Example:
```bash
cd C:\Users\YourName\Desktop\elearning-platform
```

### Step 4: Install Dependencies

Run the following command to install all required packages:

```bash
npm install
```

**What this does:**
- Installs React and React-DOM
- Installs react-confetti for animations
- Installs idb for IndexedDB
- Installs all other dependencies listed in package.json

**Expected output:**
- You'll see a progress indicator
- Installation may take 2-5 minutes
- Final message: "added X packages"

**If you encounter errors:**
- Try: `npm install --legacy-peer-deps`
- OR: `npm cache clean --force` then retry

### Step 5: Start Development Server

```bash
npm start
```

**What happens:**
- Webpack starts compiling the application
- Development server starts on port 3000
- Browser automatically opens to http://localhost:3000

**Expected output:**
```
Compiled successfully!

You can now view elearning-platform in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

### Step 6: Enable Browser Notifications

1. When the app loads, you'll see a notification permission request
2. Click "Allow" to enable course reminders
3. This is required for the reminder notification feature

---

## Verification Checklist

After installation, verify these features work:

- [ ] Application loads without errors
- [ ] You can see 5 sample courses
- [ ] Search bar filters courses in real-time
- [ ] Tag buttons filter courses by category
- [ ] Streak tracker appears in bottom-right corner
- [ ] Profile page shows user stats
- [ ] Course detail page loads when clicking a course
- [ ] "Download for Offline" button works
- [ ] Reminder options appear on course detail page
- [ ] Video player shows (even if no actual video)

---

## Building for Production

When you're ready to create a production build:

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

To serve the production build locally:
```bash
npm install -g serve
serve -s build
```

---

## Troubleshooting

### Issue: "npm: command not found"
**Solution:** Node.js is not installed or not in PATH
- Reinstall Node.js from https://nodejs.org/
- Restart your terminal

### Issue: "Port 3000 is already in use"
**Solution:** Another app is using port 3000
- Kill the process using port 3000
- OR start on different port: `PORT=3001 npm start` (Mac/Linux)
- OR use: `set PORT=3001 && npm start` (Windows)

### Issue: Browser doesn't open automatically
**Solution:** Manually navigate to http://localhost:3000

### Issue: "Cannot find module 'react'"
**Solution:** Dependencies not installed properly
- Delete `node_modules` folder
- Delete `package-lock.json`
- Run `npm install` again

### Issue: Blank white screen
**Solution:** JavaScript error occurred
- Open browser DevTools (F12)
- Check Console tab for errors
- Verify all files are present in src/ folder

### Issue: Notifications not working
**Solution:** Browser permissions
- Check browser notification settings
- Ensure notifications are allowed for localhost
- Try in Chrome/Firefox (better support)

### Issue: Offline mode not saving
**Solution:** IndexedDB not supported
- Use modern browser (Chrome, Firefox, Edge)
- Check browser privacy settings
- Ensure IndexedDB is not blocked

---

## File Structure Explained

```
elearning-platform/
│
├── public/                      # Static files
│   ├── index.html              # Main HTML template
│   ├── manifest.json           # PWA manifest
│   └── favicon.ico             # App icon
│
├── src/                         # Source code
│   ├── components/             # React components
│   │   ├── CourseList.js       # Displays list of courses
│   │   ├── CourseCard.js       # Individual course card
│   │   ├── CourseDetail.js     # Course detail page
│   │   ├── SearchFilter.js     # Search and filter UI
│   │   ├── ReminderManager.js  # Reminder system
│   │   ├── StreakTracker.js    # Streak display widget
│   │   ├── UserProfile.js      # User profile page
│   │   └── OfflineManager.js   # Offline functionality
│   │
│   ├── App.js                  # Main application component
│   ├── App.css                 # Main application styles
│   ├── index.js                # Application entry point
│   └── index.css               # Global styles
│
├── package.json                # Dependencies and scripts
├── README.md                   # Project documentation
└── INSTALLATION_GUIDE.md       # This file
```

---

## Available Scripts

### `npm start`
- Runs the app in development mode
- Open http://localhost:3000 to view
- Page reloads on file changes
- Lint errors appear in console

### `npm test`
- Launches test runner (if tests are added)
- Runs in interactive watch mode

### `npm run build`
- Builds the app for production
- Optimizes for best performance
- Output in `build/` folder
- Files are minified and hashed

### `npm run eject`
- **WARNING: This is a one-way operation!**
- Removes create-react-app abstraction
- Gives full control over configuration
- Only use if you need custom webpack config

---

## Development Tips

### Hot Reloading
- Changes to `.js` and `.css` files auto-reload
- No need to restart server
- Saves development time

### Browser DevTools
- Press `F12` to open DevTools
- Check Console for errors
- Use Application tab to inspect:
  - LocalStorage
  - IndexedDB
  - Notifications

### Testing Features

**Offline Mode:**
1. Click "Download for Offline" on any course
2. Open DevTools > Application > IndexedDB
3. Verify course data is stored

**Streak Tracking:**
1. Check bottom-right corner for streak
2. View profile to see detailed stats
3. LocalStorage > check `streak` and `lastLogin`

**Reminders:**
1. Set a reminder for "1 hour"
2. Check DevTools > Application > LocalStorage
3. Look for `courseReminders` entry

**Video Progress:**
1. Play a video (or simulate)
2. Check LocalStorage for `video_progress_{courseId}`
3. Reload page and verify resume functionality

---

## Customization Guide

### Adding More Courses

Edit `src/App.js`, find the `loadCourses()` function:

```javascript
const sampleCourses = [
  {
    id: 6, // Increment ID
    title: 'Your Course Title',
    description: 'Course description',
    tags: ['Tag1', 'Tag2'],
    videoUrl: 'https://example.com/video.mp4',
    content: 'Detailed course content...',
    imageUrl: '/images/course-image.jpg',
    completed: false,
    offline: false
  },
  // Add more courses...
];
```

### Changing Color Scheme

Edit CSS files to customize colors:

**Primary Colors:**
- Purple gradient: `#667eea` to `#764ba2`
- Edit in `App.css`, `UserProfile.css`, etc.

**Accent Colors:**
- Streak: `#FF6B6B` to `#FF8E53` (StreakTracker.css)
- Success: `#4CAF50` (CourseCard.css)
- Warning: `#FF9800` (CourseDetail.css)

### Adding More Tags

Edit `src/App.js`, find the `SearchFilter` component:

```javascript
<SearchFilter 
  allTags={['Programming', 'Design', 'Marketing', 'Your New Tag']}
/>
```

---

## Browser Support Matrix

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| IndexedDB | ✅ | ✅ | ✅ | ✅ |
| Notifications | ✅ | ✅ | ⚠️* | ✅ |
| LocalStorage | ✅ | ✅ | ✅ | ✅ |
| Confetti | ✅ | ✅ | ✅ | ✅ |
| Responsive | ✅ | ✅ | ✅ | ✅ |

*⚠️ Safari notifications work but require HTTPS in production

---

## Performance Optimization

### Production Build
- Minified JavaScript and CSS
- Optimized images
- Code splitting
- Lazy loading

### Best Practices Implemented
- Debounced search (300ms delay)
- Efficient re-renders with React hooks
- LocalStorage for fast access
- IndexedDB for large data

---

## Security Considerations

### Local Storage
- Data stored in browser only
- Not accessible by other websites
- Cleared when user clears browser data

### Notifications
- Requires explicit user permission
- Cannot send without approval
- Scheduled locally (not server-based)

### Offline Data
- Stored in browser's IndexedDB
- Encrypted by browser
- Isolated per domain

---

## Getting Help

If you encounter issues:

1. **Check this guide** for troubleshooting steps
2. **Review console errors** in browser DevTools
3. **Verify file structure** matches expected layout
4. **Check Node.js version** is 14.0.0 or higher
5. **Clear browser cache** and restart

**Contact Information:**
- Student: Vaibhav Bhardwaj
- Email: vaibhavbhardwaj@manipal.edu
- Registration: 220953348

---

## Next Steps After Installation

1. ✅ Verify all features work
2. 📝 Read README.md for feature details
3. 🎨 Customize colors and content if desired
4. 🧪 Test on different browsers
5. 📱 Test responsive design on mobile
6. 🚀 Build for production when ready

---

**Congratulations! Your E-Learning Platform is now ready to use!** 🎉

Start exploring the features and happy learning!
