import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './assets/index.css'
import { ThemeProvider } from './useTheme'


ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </>,
)
