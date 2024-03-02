import { useState } from 'react'
import './App.css'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

// calculate if the class is a fifty min course
function classType(startHr, startMin, endHr, endMin) {
  if (endMin < startMin) {
    endHr--;
    endMin += 60;
  }
  let classTime = (endMin - startMin) + (endHr - startHr);

  if (classTime == 50) {
    return 1;
  }
  else if (classTime == 75) {
    return 0;
  }
  else {
    return -1;
  }
}

function dateCalc(start, end) {
  //splits start min and hrs
  let [startHrStr, startMeridiem] = start.split(':');
  startHr = parseInt(startHrStr, 10);
  //12, 30PM

  //splits end min and hrs
  let [endHrStr, endMeridiem] = end.split(':');
  endHr = parseInt(endHrStr, 10);
  //1, 20PM

  //splits min and meridiem
  startMin = parseInt(startMeridiem.substring(0,2), 10);
  //30

  //converts 12hr blocks to 24hr
  if (startMeridiem[2] == 'P' && startHr != 12) {
    startHr += 12;
  }
  //12

  //splits min and meridiem
  endMin = parseInt(endMeridiem.substring(0,2), 10);
  //20

  //converts 12hr blocks to 24hr
  if (endMeridiem[2] == 'P' && endHr != 12) {
    endHr += 12;
  }
  //13

  let isFiftyMinClass = classType(startTimeHr, startTimeMin, endTimeHr, endTimeMin);
  if (isFiftyMinClass == 1) {
    height = 44;

  }
  else if (isFiftyMinClass == 0) {
    height = 66;
  }
}

function createData(hour, empty) {
  return { hour, empty };
}

function computeStart(start) {
  // let [startHrStr, startMeridiem] = start.split(':');
  // startHr = parseInt(startHrStr, 10);
  // //splits min and meridiem
  // startMin = parseInt(startMeridiem.substring(0,2), 10);
  // //converts 12hr blocks to 24hr
  // if (startMeridiem[2] == 'P' && startHr != 12) {
  //   startHr += 12;
  // }

  // return (((startHr*60) + startMin) * 60) / 53;

}

function Course() {
  //import * as data from './course_data.json';
  //let {course_code, course_num, section_num, days, start_time, end_time, instructor, traditional} = data;
  //dateCalc(start_time, end_time);

  getComputedStyle(document.documentElement).getPropertyValue('--hr');
  getComputedStyle(document.documentElement).getPropertyValue('--day');
  // let pixTop = computeStart(start_time);
  // document.documentElement.style.setProperty('--hr', pixTop + "px");

  let days = "MWF";
  if (days == "MWF") {
    return (
      <div>
        {document.documentElement.style.setProperty('--day', '350px')}
          <Card>
            <CardContent id="class1"class="fiftyMinClass">
              <Typography variant="body2" color="text.secondary">
                Class 1
              </Typography>
            </CardContent>
          </Card>
        {document.documentElement.style.setProperty('--day', '550px')}
        <div>
        <Card>
          <CardContent id="class2"class="fiftyMinClass">
            <Typography variant="body2" color="text.secondary">
              Class 2
            </Typography>
          </CardContent>
        </Card>
        </div>
        {document.documentElement.style.setProperty('--day', '1110px')}
        <div>
         <Card>
           <CardContent id="class3"class="fiftyMinClass">
             <Typography variant="body2" color="text.secondary">
               Class 3
             </Typography>
           </CardContent>
         </Card>
         {document.documentElement.style.setProperty('--day', '950px')}
         </div>
      </div>
       
    )
  }
  // else if (days == "MW") {
  //   return (
  //     <div>
        // <Card>
        //   <CardContent class="fiftyMinClass" size="left:500px;" >
        //     <Typography variant="body2" color="text.secondary">
        //       Class 1
        //     </Typography>
        //   </CardContent>
        // </Card>
  //     </div>
  //   )
  // }
  // else if (days == "TR") {

  // }
}

function App() {
  const [count, setCount] = useState(0)


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

// class="fiftyMinClass"
// class="seventyFiveMinClass"

  return (
  <>
    <div id="div2">
     <TableContainer component={Paper}>
      <Table 
        sx={{ minWidth: 1000 }} 
        aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Monday</TableCell>
            <TableCell align="right">Tuesday</TableCell>
            <TableCell align="right">Wednesday</TableCell>
            <TableCell align="right">Thursday</TableCell>
            <TableCell align="right">Friday</TableCell>
            <TableCell align="right"></TableCell>
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
              <TableCell align="right">{row.empty}</TableCell>
              <TableCell align="right">{row.empty}</TableCell>
              <TableCell align="right">{row.empty}</TableCell>
              <TableCell align="right">{row.empty}</TableCell>
              <TableCell align="right">{row.empty}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      </div>
  </>
  )
}

export default App;
export {Course};
