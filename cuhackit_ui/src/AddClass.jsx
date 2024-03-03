import React, { useState } from 'react';

function AddClass() {

  const [response, setResponse] = useState(null);
    
  const fetchData = () => {
    console.log('Fetching data...'); // Added log statement
    fetch('http://localhost:5000/process', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        requested_courses: ["CPSC 3120", "CPSC 1011", "GEOL 1010", "CPSC 2310", "CPSC 2120"],
        traditional: "True",
        rate: "False",
        start: "9:00AM",
        end: "6:00PM",
        num: "5"
      })
    })
    .then(response => {
      console.log('Received response from server'); // Added log statement
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Setting response data in state'); // Added log statement
      setResponse(data);
    })
    .catch(error => {
      console.error('There was a problem with your fetch operation:', error);
    });
  };
  
  return (
    <div className="container-fluid min-vh-100 mw-100">
      <button onClick={fetchData}>Fetch Data</button>
      {response && (
        <div>
          <h2>Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default AddClass;
