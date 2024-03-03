import React, { useState } from 'react';

function AddClass() {
  const [response, setResponse] = useState(null);

  const fetchData = async () => {
    try {
      console.log('Fetching data...');
      // Directly use the target URL with the specific endpoint
      const response = await fetch("/api", {
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
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Setting response data in state');
      setResponse(data);
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    }
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
