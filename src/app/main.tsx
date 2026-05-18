import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App' // Verifique se o export no App.tsx é { App } ou default App
/* import './styles/index.css'  */
// @ts-ignore
import '../styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)