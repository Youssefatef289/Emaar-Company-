import { motion } from 'framer-motion'
import HeroSlider from '../components/Hero/HeroSlider'
import AboutSection from '../components/Sections/AboutSection'
import ServicesSection from '../components/Sections/ServicesSection'
import ProjectsSection from '../components/Sections/ProjectsSection'
import ClientsSection from '../components/Sections/ClientsSection'
import StatsSection from '../components/Sections/StatsSection'

const Home = () => {
  return (
    <div className="w-full">
      <HeroSlider />
      <AboutSection />
      <StatsSection />
      <ServicesSection />
      <ProjectsSection />
      <ClientsSection />
    </div>
  )
}

export default Home

