import React, { useState } from 'react';
import './Dashboard.css'; // Assuming your custom CSS is in Dashboard.css

function Dashboard() {
  const [formData, setFormData] = useState({
    requested_courses: ["CPSC 2120"],
    traditional: "True",
    rate: "False",
    start: "9:00AM",
    end: "6:00PM",
    num: "5"
  });

  const handleChange = (index, value) => {
    const newRequestedCourses = [...formData.requested_courses];
    if (index !== null) {
      newRequestedCourses[index] = value;
    }
    setFormData({ ...formData, requested_courses: newRequestedCourses });
  };

  const handleAddCourse = () => {
    setFormData({ ...formData, requested_courses: [...formData.requested_courses, ""] });
  };

  const handleRemoveCourse = (index) => {
    const newRequestedCourses = formData.requested_courses.filter((_, i) => i !== index);
    setFormData({ ...formData, requested_courses: newRequestedCourses });
  };

  const handleOtherFieldChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Filter out empty courses
    const filteredCourses = formData.requested_courses.filter(course => course.trim() !== "");
  
    // Validate time format and range
    const timeFormatRegex = /^(7|8|9|10|11):[0-5][0-9](AM|PM)$|^(12:00PM|12:00AM|1[0-1]:[0-5][0-9]PM)$/;
    const isValidStartTime = timeFormatRegex.test(formData.start);
    const isValidEndTime = timeFormatRegex.test(formData.end);
  
    // Ensure start time is before end time
    const convertTimeToMinutes = (time) => {
      const [hour, minutePart] = time.split(':');
      const minutes = parseInt(minutePart.slice(0, 2), 10);
      const period = minutePart.slice(2);
      let totalMinutes = parseInt(hour, 10) * 60 + minutes;
      if (period === 'PM' && hour !== '12') totalMinutes += 12 * 60;
      if (period === 'AM' && hour === '12') totalMinutes = minutes;
      return totalMinutes;
    };
  
    const startTimeMinutes = convertTimeToMinutes(formData.start);
    const endTimeMinutes = convertTimeToMinutes(formData.end);
  
    if (startTimeMinutes >= endTimeMinutes) {
      alert("Start time must be before End time.");
      return;
    }
  
    // Update formData with filtered courses and proceed with submission
    const updatedFormData = { ...formData, requested_courses: filteredCourses };
    console.log(updatedFormData);
    // Here you would typically send your updatedFormData to a backend server or similar
  };
  

  return (
    <div className="container-fluid min-vh-100 mw-100 p-5 custom-background">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="mb-4 text-center">Course Registration Form</h2>
          <form onSubmit={handleSubmit} className="custom-form">
            {formData.requested_courses.map((course, index) => (
              <div key={index} className="mb-3 d-flex align-items-center">
                <input
                  type="text"
                  className="form-control"
                  value={course}
                  onChange={(e) => handleChange(index, e.target.value)}
                  placeholder="Enter course code"
                />
                <button type="button" className="btn btn-danger ms-2" onClick={() => handleRemoveCourse(index)}>Remove</button>
              </div>
            ))}
            <button type="button" className="btn btn-primary mb-3" onClick={handleAddCourse}>Add Course</button>

            <div className="form-row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Traditional</label>
                <select
                  className="form-select"
                  value={formData.traditional}
                  onChange={(e) => handleOtherFieldChange('traditional', e.target.value)}>
                  <option value="True">Yes</option>
                  <option value="False">No</option>
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Rate</label>
                <select
                  className="form-select"
                  value={formData.rate}
                  onChange={(e) => handleOtherFieldChange('rate', e.target.value)}>
                  <option value="True">Yes</option>
                  <option value="False">No</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Start Time</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.start}
                  onChange={(e) => handleOtherFieldChange('start', e.target.value)}
                  placeholder="Start Time"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">End Time</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.end}
                  onChange={(e) => handleOtherFieldChange('end', e.target.value)}
                  placeholder="End Time"
                />
              </div>
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-success">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
