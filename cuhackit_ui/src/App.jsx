// Define a route configuration
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './NavBar';
import Dashboard from './Dashboard';
import AddClass from './AddClass';
import DisplayClasses from './DisplayClasses';
import Login from './Login';
import NotFound from './NotFound';
import Footer from './Footer';
import { Auth } from "../components/auth"
import { db } from '../config/firebase';
import { collection, query, getDocs } from 'firebase/firestore';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const routeConfig = {
  dashboard: { path: "/", component: Dashboard },
  addClass: { path: "/add-class", component: AddClass },
  displayClasses: { path: "/display-classes", component: DisplayClasses },
  login: { path: "/login", component: Login },
  notFound: { path: "*", component: () => <Navigate to="/" replace /> }
};

// App component remains mostly unchanged
function App() {
  const [classesList, setClassesList] = useState([]);

  useEffect(() => {
    // Define an async function inside the useEffect hook
    const fetchClasses = async () => {
      try {
        const classesCollectionRef = collection(db, "movies");
        console.log('Collection Reference:', classesCollectionRef); 

        const q = query(collection(db, "movies")); 
        const querySnapshot = await getDocs(q);
        
        const classes = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data()); 
          classes.push({ id: doc.id, ...doc.data() });
        });
        console.log('Collection classes:', classes);

        setClassesList(classes); 
      } catch (error) {
        console.error("Error fetching documents: ", error); 
      }
    };

    fetchClasses(); 
  }, []); 



  return (
    <Router>
      <NavBar />
      <Routes>
        {Object.entries(routeConfig).map(([key, { path, component: Component, props }]) => (
          <Route key={key} path={path} element={<Component {...props} />} />
        ))}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App; // This line is crucial
