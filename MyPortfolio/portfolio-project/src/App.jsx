import { Routes, Route } from 'react-router'
import { Home } from './components/Home'

function App() {

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route />
      <Route />
      <Route />
    </Routes>
  )
}

export default App
