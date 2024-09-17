import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import { ScrollRefProvider } from './context/scroll-ref/ScrollRefContext.jsx'
import { ReducersProvider } from './context/reducers/ReducersContext.jsx'
import { AuthProvider } from './context/auth/asdasdAuthContext.jsx'
import App from './App.jsx'
import './assets/GlobalStyle.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ReducersProvider>
        <ScrollRefProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ScrollRefProvider>
      </ReducersProvider>
    </BrowserRouter>
  </StrictMode>
)
serviceWorkerRegistration.register()
