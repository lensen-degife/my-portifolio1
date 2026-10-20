import { ThemeProvider } from './context/ThemeContext';
import { useDynamicFavicon } from './hooks/useDynamicFavicon';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import GitHub from './sections/GitHub';
import Timeline from './sections/Timeline';
import Achievements from './sections/Achievements';
import Contact from './sections/Contact';

function App() {
  useDynamicFavicon();

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-[#030305] text-slate-800 dark:text-slate-200 selection:bg-purple-600/30 selection:text-purple-200 font-sans">
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <GitHub />
          <Timeline />
          <Achievements />
          <Contact />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </ThemeProvider>
  );
}

export default App;