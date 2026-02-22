import { motion } from 'framer-motion'
import HeroSlider from '../components/Hero/HeroSlider'
import AboutSection from '../components/Sections/AboutSection'
import ServicesSection from '../components/Sections/ServicesSection'
import ProjectsSection from '../components/Sections/ProjectsSection'
import HowWeHelpSection from '../components/Sections/HowWeHelpSection'
import './Home.css'

const Home = () => {
  return (
    <div className="w-full">
      <HeroSlider />
      <AboutSection />
      <ServicesSection />
      <HowWeHelpSection />
      <ProjectsSection />
    </div>
  )
}

export default Home

