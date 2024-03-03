import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import coursesData from './courses.json';

// Helper function to create row data
function createData(hour, empty = null) {
  return { hour, empty };
}

// Dummy data for table rows
const rows = [
  createData('7:00AM'),
  createData('8:00AM'),
  createData('9:00AM'),
  createData('10:00AM'),
  createData('11:00AM'),
  createData('12:00PM'),
  createData('1:00PM'),
  createData('2:00PM'),
  createData('3:00PM'),
  createData('4:00PM'),
  createData('5:00PM'),
  createData('6:00PM'),
  createData('7:00PM'),
  createData('8:00PM'),
  createData('9:00PM'),
  createData('10:00PM'),
  createData('11:00PM'),
];

function getColor(courseCode, instructor, sectionNumber) {
  // Combine course code, instructor name, and section number
  const combinedString = courseCode + instructor + sectionNumber;

  // Hashing based on combined string
  let hash = 0;
  for (let i = 0; i < combinedString.length; i++) {
    hash = combinedString.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Additional calculations based on hash
  const r = (hash & 0xFF0000) >> 16;
  const g = (hash & 0x00FF00) >> 8;
  const b = hash & 0x0000FF;

  // Convert to hex color
  const color = `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;

  return color;
}

function mapDayCodeToName(dayCode) {
  const dayMap = {
    'M': 'Monday',
    'T': 'Tuesday',
    'W': 'Wednesday',
    'R': 'Thursday',
    'F': 'Friday'
  };

  return dayCode.split('').map(code => dayMap[code]);
}

function DisplayClasses() {
  // Mapping courses to their times and days
  const courseMap = {};
  coursesData.courses.forEach(course => {
    const days = mapDayCodeToName(course.days); // Get array of full day names
    days.forEach(day => {
      if (!courseMap[day]) {
        courseMap[day] = {};
      }
      courseMap[day][course.start_time] = {
        ...course,
        color: getColor(course.course_code, course.instructor, course.section_num), // Assign a color based on instructor name
      };
    });
  });

  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <div className="container-fluid min-vh-100 mw-100">
      <h2>Display Classes</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              {weekdays.map(day => (
                <TableCell key={day} align="right">{day}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.hour}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.hour}
                </TableCell>
                {weekdays.map((day) => (
                  <TableCell
                    key={day}
                    align="right"
                    style={{
                      backgroundColor: courseMap[day] && courseMap[day][row.hour] ? courseMap[day][row.hour].color : "",
                    }}
                  >
                    {courseMap[day] && courseMap[day][row.hour] ? `${courseMap[day][row.hour].course_code} ${courseMap[day][row.hour].course_num} (${courseMap[day][row.hour].section_num})` : ""}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default DisplayClasses;
