import { motion } from 'framer-motion'
import HeroSlider from '../components/Hero/HeroSlider'
import AboutSection from '../components/Sections/AboutSection'
import ServicesSection from '../components/Sections/ServicesSection'
import ProjectsSection from '../components/Sections/ProjectsSection'
import ClientsSection from '../components/Sections/ClientsSection'
import StatsSection from '../components/Sections/StatsSection'
import HowWeHelpSection from '../components/Sections/HowWeHelpSection'

const Home = () => {
  return (
    <div className="w-full">
      <HeroSlider />
      <AboutSection />
      <StatsSection />
      <ServicesSection />
      <HowWeHelpSection />
      <ProjectsSection />
      <ClientsSection />
    </div>
  )
}

export default Home

