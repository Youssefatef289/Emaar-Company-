import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import {
  FiHome,
  FiMap,
  FiTrendingUp,
  FiLayers,
  FiTool,
  FiNavigation,
  FiDroplet,
} from 'react-icons/fi'

const ServicesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const services = [
    {
      icon: FiHome,
      title: 'General Contracting',
      description: 'We provide general contracting services with international standards and high quality',
      color: 'bg-blue-500',
    },
    {
      icon: FiMap,
      title: 'Surveying Works',
      description: 'Accurate and professional surveying services for all types of projects',
      color: 'bg-green-500',
    },
    {
      icon: FiTrendingUp,
      title: 'Real Estate Marketing',
      description: 'Integrated marketing solutions to enhance the value of real estate projects',
      color: 'bg-purple-500',
    },
    {
      icon: FiLayers,
      title: 'Building Works',
      description: 'Construction and building of residential and commercial buildings with the highest standards',
      color: 'bg-orange-500',
    },
    {
      icon: FiTool,
      title: 'Finishing Works',
      description: 'Luxury and modern finishing that suits all tastes and budgets',
      color: 'bg-pink-500',
    },
    {
      icon: FiNavigation,
      title: 'Road Works',
      description: 'Execution of road and infrastructure projects with high quality',
      color: 'bg-yellow-500',
    },
    {
      icon: FiDroplet,
      title: 'Water and Sewage Networks',
      description: 'Design and implementation of water and sewage networks with high efficiency',
      color: 'bg-cyan-500',
    },
  ]

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-custom">
            Our Services
          </h2>
          <div className="services-section-divider"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We provide a comprehensive range of specialized services in real estate development and contracting
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-white p-8 rounded-xl shadow-lg card-hover border border-gray-100"
            >
              <div className={`w-16 h-16 ${service.color} rounded-xl flex items-center justify-center mb-6 text-white`}>
                <service.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
              <Link
                to="/services"
                className="services-section-link inline-flex items-center"
              >
                Learn More
                <span className="mr-2">←</span>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-center mt-12"
        >
          <Link to="/services" className="btn-primary text-lg">
            View All Services
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default ServicesSection

