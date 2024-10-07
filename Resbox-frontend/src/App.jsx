import { Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './pages/Home/Home'
import NotFound from './pages/404/NotFound'
import RecoveryPassword from './pages/Recovery-password/RecoveryPassword'
import Dashboard from './pages/isAuth/dashboard/Dashboard'
import ProtectedRoute from './components/protected-route/ProtectedRoute'
import MyBox from './pages/isAuth/my-box/MyBox'
import PromoBox from './pages/isAuth/promo-box/PromoBox'
import Partner from './pages/isAuth/partner/Partner'
import Operations from './pages/isAuth/operations/Operations'
import CartItems from './pages/isAuth/cart-items/CartItems'
import Invoice from './pages/isAuth/invoice/Invoice'
/* import Comments from './pages/isAuth/comments/Comments' */

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
        <Route
          path={`/my-boxes`}
          element={
            <ProtectedRoute>
              <MyBox />
            </ProtectedRoute>
          }
        />
        <Route
          path={`/promo-box`}
          element={
            <ProtectedRoute>
              <PromoBox />
            </ProtectedRoute>
          }
        />
        <Route
          path={`/partner`}
          element={
            <ProtectedRoute>
              <Partner />
            </ProtectedRoute>
          }
        />
        <Route
          path={`/operations`}
          element={
            <ProtectedRoute>
              <Operations />
            </ProtectedRoute>
          }
        />
        <Route
          path={`/invoice/:invoice`}
          element={
            <ProtectedRoute>
              <Invoice />
            </ProtectedRoute>
          }
        />
        {/* <Route path={`/comments/:partner`} element={<ProtectedRoute><Comments /></ProtectedRoute>}/> */}
        <Route
          path={`/cart-items`}
          element={
            <ProtectedRoute>
              <CartItems />
            </ProtectedRoute>
          }
        />

        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  )
}
export default App
