import React from 'react';
import CourseCard from './CourseCard';
import './CourseList.css';

function CourseList({ courses, onCourseSelect }) {
  return (
    <div className="course-list">
      <h2>Available Courses ({courses.length})</h2>
      <div className="courses-grid">
        {courses.length === 0 ? (
          <p className="no-courses">No courses found matching your criteria.</p>
        ) : (
          courses.map(course => (
            <CourseCard 
              key={course.id} 
              course={course} 
              onClick={() => onCourseSelect(course)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default CourseList;
