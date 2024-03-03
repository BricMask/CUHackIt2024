import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function Dashboard() {
  return (
    <div className="container-fluid min-vh-100 mw-100">
      <h2>Required Classes:</h2>
      <form>
          <textarea name="classes" id="classes" cols="30" rows="4"></textarea><br></br> 

        <button type="submit">Submit</button>
      </form>
    </div>

    
  );
}
export default Dashboard;

// function handleSubmit(event) {
//   event.preventDefault();

//   const data = new FormData(event.target);

//   var value = Object.fromEntries(data.entries());

//   value.topics = data.getAll("topics");

// }

// const form = document.querySelector("form");
// form.addEventListener("submit", handleSubmit);