import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import { ScrollRefProvider } from './context/scroll-ref/ScrollRefContext.jsx'
import { ReducersProvider } from './context/reducers/ReducersContext.jsx'
import './assets/GlobalStyle.css'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ReducersProvider>
        <ScrollRefProvider>
          <App />
        </ScrollRefProvider>
      </ReducersProvider>
    </BrowserRouter>
  </StrictMode>
)
serviceWorkerRegistration.register()
