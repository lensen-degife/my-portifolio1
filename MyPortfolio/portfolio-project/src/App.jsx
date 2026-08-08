// App.jsx
import { Routes, Route } from 'react-router'
import { Home } from './pages/home/Home'
import { About } from './pages/about/About'
import { Acheivments } from './pages/acheivment/Acheivments'
import { Contact } from './pages/contact/Contact'
import Interaction from './Interaction'
import { PagePreloader } from './components/PagePreloader'
import { ProgressBar } from './components/ProgressBar'
import { Overlay } from './components/Overlay'
import { Cursor } from './components/Cursor'

function App() {
  return (
    <>
      <PagePreloader />
      <ProgressBar />
      <Overlay />
      <Cursor />
      <Interaction />
      <Routes>
        <Route index element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='acheivments' element={<Acheivments />} />
        <Route path='contact' element={<Contact />} />
      </Routes>
    </>
  )
}
export default App