import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import { ScrollRefProvider } from './context/scroll-ref/ScrollRefContext.jsx'
import { ReducersProvider } from './context/reducers/ReducersContext.jsx'
import { AuthProvider } from './context/auth/AuthContext.jsx'
import App from './App.jsx'
import './assets/GlobalStyle.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_ID_CLIENT_GOOGLE}>
        <ReducersProvider>
          <ScrollRefProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </ScrollRefProvider>
        </ReducersProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>
)
serviceWorkerRegistration.register()
