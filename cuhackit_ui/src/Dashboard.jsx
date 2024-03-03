import React, { useState } from 'react';
import './Dashboard.css'; // Assuming your custom CSS is in Dashboard.css

function App() {
  const [formData, setFormData] = useState({
    requested_courses: ["CPSC 2120"],
    traditional: "True",
    rate: "False",
    start: "9:00AM",
    end: "6:00PM",
    num: "5"
  });

  const [resp, setResp] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    setIsLoading(true);
    console.log('Fetching data based on form submission...');
    try {
      const response = await fetch("/api", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          requested_courses: formData.requested_courses.filter(course => course.trim() !== "")
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      let data = await response.json();
      console.log('Setting response data in state:', data);
      setResp(JSON.parse(data)); 
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    } finally {
      setIsLoading(false);
    }
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
          <br></br>
          {isLoading && <p>Loading...</p>}
          {!isLoading && resp && (
            <div>
              <h2>Your Recommended Classes:</h2>
                {resp.courses.map((course, index) => (
                  <div key={index} className="card mb-3" style={{ width: '18rem' }}>
                    <div className="card-body">
                      <h5 className="card-title">{course.course_code} {course.course_num} - Section {course.section_num}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">{course.days} {course.start_time} - {course.end_time}</h6>
                      <p className="card-text">Instructor: {course.instructor}</p>
                      <p className="card-text">{course.traditional ? 'Traditional' : 'Online'}</p>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
