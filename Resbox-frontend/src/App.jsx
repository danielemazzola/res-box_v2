import { Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './pages/Home/Home'
import NotFound from './pages/404/NotFound'
import RecoveryPassword from './pages/Recovery-password/RecoveryPassword'
import Dashboard from './pages/isAuth/Dashboard'
import ProtectedRoute from './components/protected-route/ProtectedRoute'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path={`/recovery-password/:token`}
          element={<RecoveryPassword />}
        />
        <Route
          path={`/dashboard`}
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  )
}
export default App
