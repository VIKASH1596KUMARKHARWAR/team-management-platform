// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';

// Remove or comment out this line if not used
// import reportWebVitals from './reportWebVitals'; 
import store from './redux/store'; // Adjust the path as necessary

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
