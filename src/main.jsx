import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Riego from './Riego.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Riego />
  </StrictMode>,
)
