import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// ✅ Import Bootstrap CSS and JS bundle
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// (Optional) Import your custom CSS file if you have one

// ✅ Render the React app to the root div in index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
