import { Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './pages/Home/Home'
import NotFound from './pages/404/NotFound'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  )
}
export default App
