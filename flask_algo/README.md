To run: flask run

curl -X POST http://localhost:5000/process -H "Content-Type: application/json" -d '{
  "requested_courses": ["CPSC 3120", "CPSC 1011", "GEOL 1010", "CPSC 2310", "CPSC 2120"],
  "traditional": "True",
  "rate": "False",
  "start": "9:00AM",
  "end": "6:00PM",
  "num": "5"
}'

