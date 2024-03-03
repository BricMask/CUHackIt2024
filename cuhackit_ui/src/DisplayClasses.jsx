import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// Import Course component if needed for other purposes
import Course from './Course'; // Make sure this import path is correct
import courses from './courses.json';


// Helper function to create row data
function createData(hour, empty = null) {
  return { hour, empty };
}

// Dummy data for table rows
const rows = [
  createData('7am'),
  createData('8am'),
  createData('9am'),
  createData('10am'),
  createData('11am'),
  createData('12pm'),
  createData('1pm'),
  createData('2pm'),
  createData('3pm'),
  createData('4pm'),
  createData('5pm'),
  createData('6pm'),
  createData('7pm'),
  createData('8pm'),
  createData('9pm'),
  createData('10pm'),
  createData('11pm'),
];

function getRandomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function DisplayClasses() {
  // Mapping courses to their times and days
  const courseMap = {};
  courses.forEach(course => {
    if (!courseMap[course.day]) {
      courseMap[course.day] = {};
    }
    courseMap[course.day][course.startTime] = {
      ...course,
      color: getRandomColor(), // Assign a random color to each course
    };
  });

  return (
    <div className="container-fluid min-vh-100 mw-100">
      <h2>Display Classes</h2>
      <Course /> {/* Render the Course component */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell align="right">Monday</TableCell>
              <TableCell align="right">Tuesday</TableCell>
              <TableCell align="right">Wednesday</TableCell>
              <TableCell align="right">Thursday</TableCell>
              <TableCell align="right">Friday</TableCell>
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
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
                  <TableCell
                    key={day}
                    align="right"
                    style={{
                      backgroundColor: courseMap[day] && courseMap[day][row.hour] ? courseMap[day][row.hour].color : "",
                    }}
                  >
                    {courseMap[day] && courseMap[day][row.hour] ? `${courseMap[day][row.hour].className} (${courseMap[day][row.hour].courseNumber})` : ""}
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
