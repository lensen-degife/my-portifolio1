import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { PagePreloader } from './components/PagePreloader'
import { ProgressBar } from './components/ProgressBar'
import { Overlay } from './components/Overlay'
import { Cursor } from './components/Cursor'
import Interaction from './Interaction'

import { Home } from './pages/home/Home'
import { About } from './pages/about/About'
import { Acheivments } from './pages/acheivment/Acheivments'
import { Contact } from './pages/contact/Contact'

function App() {
  return (
    <>
      <PagePreloader />
      <ProgressBar />
      <Overlay />
      <Cursor />
      <Interaction />

      <Nav />
      <Home />
      hello
      <About />
      <Acheivments />
      <Contact />
      <Footer />
    </>
  )
}

export default App