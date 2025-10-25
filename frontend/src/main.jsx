import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import axios from 'axios'

// Configure axios defaults
axios.defaults.baseURL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000' 
  : 'https://vtcdd-api.onrender.com'

// Add auth token to all requests
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token && config.url.includes('/api/')) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
