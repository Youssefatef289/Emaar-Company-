import { motion } from 'framer-motion'
import HeroSection from '../components/Hero/HeroSection'
import AboutSection from '../components/Sections/AboutSection'
import ServicesSection from '../components/Sections/ServicesSection'
import ProjectsSection from '../components/Sections/ProjectsSection'
import StatsSection from '../components/Sections/StatsSection'
import HowWeHelpSection from '../components/Sections/HowWeHelpSection'
import './Home.css'

const Home = () => {
  return (
    <div className="w-full">
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <ServicesSection />
      <HowWeHelpSection />
      <ProjectsSection />
    </div>
  )
}

export default Home

