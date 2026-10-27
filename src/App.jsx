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
import MatrixRain from './components/MatrixRain';

function App() {
  useDynamicFavicon();

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-[#F7F6F3] dark:bg-[#161614] text-[#5C5A55] dark:text-[#A8A49C] selection:bg-[#E5E2DB] selection:text-[#1A1A18] dark:selection:bg-[#383632] dark:selection:text-[#FAF9F6] font-sans transition-colors duration-300">
        <MatrixRain />
        <ScrollProgress />
        <Navbar />
        <main className="relative z-10">
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
