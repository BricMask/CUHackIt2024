// Define a route configuration
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './NavBar';
import Dashboard from './Dashboard';
import AddClass from './AddClass';
import DisplayClasses from './DisplayClasses';
import Login from './Login';
import NotFound from './NotFound';
import Footer from './Footer';
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
