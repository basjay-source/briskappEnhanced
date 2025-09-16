import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import i18n from './i18n/index.ts'
import App from './App.tsx'

declare global {
  interface Window {
    i18n: typeof i18n;
  }
}

window.i18n = i18n;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
