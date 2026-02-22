import { motion } from 'framer-motion'
import {
  FiHome,
  FiMap,
  FiTrendingUp,
  FiLayers,
  FiTool,
  FiNavigation,
  FiDroplet,
} from 'react-icons/fi'

const Services = () => {
  const services = [
    {
      icon: FiHome,
      title: 'General Contracting',
      description: 'We provide general contracting services with international standards and high quality, with a professional team with extensive experience in executing major projects',
      features: [
        'Execution of residential and commercial projects',
        'Integrated project management',
        'Quality assurance and commitment to deadlines',
        'Use of latest technologies and materials',
      ],
      color: 'bg-blue-500',
    },
    {
      icon: FiMap,
      title: 'Surveying Works',
      description: 'Accurate and professional surveying services for all types of projects, using the latest equipment and technologies',
      features: [
        'Accurate surveying',
        'Boundary and area determination',
        'Topographic maps',
        'Certified surveying reports',
      ],
      color: 'bg-green-500',
    },
    {
      icon: FiTrendingUp,
      title: 'Real Estate Marketing',
      description: 'Integrated marketing solutions to enhance the value of real estate projects and increase sales',
      features: [
        'Integrated marketing strategies',
        'Sales management',
        'Brand development',
        'Effective advertising campaigns',
      ],
      color: 'bg-purple-500',
    },
    {
      icon: FiLayers,
      title: 'Building Works',
      description: 'Construction and building of residential and commercial buildings with the highest standards and quality',
      features: [
        'Modern architectural design',
        'Precise execution of specifications',
        'Use of high-quality materials',
        'Continuous quality monitoring',
      ],
      color: 'bg-orange-500',
    },
    {
      icon: FiTool,
      title: 'Finishing Works',
      description: 'Luxury and modern finishing that suits all tastes and budgets',
      features: [
        'Interior and exterior finishing',
        'Painting and decoration works',
        'Flooring and tile installation',
        'Plumbing and electrical works',
      ],
      color: 'bg-pink-500',
    },
    {
      icon: FiNavigation,
      title: 'Road Works',
      description: 'Execution of road and infrastructure projects with high quality',
      features: [
        'Road and street paving',
        'Sewage works',
        'Road lighting',
        'Landscaping works',
      ],
      color: 'bg-yellow-500',
    },
    {
      icon: FiDroplet,
      title: 'Water and Sewage Networks',
      description: 'Design and implementation of water and sewage networks with high efficiency',
      features: [
        'Water network design',
        'Sewage network implementation',
        'Network maintenance and repair',
        'Treatment plant installation',
      ],
      color: 'bg-cyan-500',
    },
  ]

  return (
    <div className="pt-32 pb-16 bg-gray-50 min-h-screen">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Our Services
          </h1>
          <div className="w-24 h-1 mx-auto mb-6" style={{ backgroundColor: '#d6ac72' }}></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We provide a comprehensive range of specialized services in real estate development and contracting
          </p>
        </motion.div>

        <div className="space-y-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
            >
              <div className="flex-1">
                <div className={`w-20 h-20 ${service.color} rounded-xl flex items-center justify-center mb-6 text-white`}>
                  <service.icon size={40} />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                  {service.title}
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <span className="ml-3 mt-1" style={{ color: '#d6ac72' }}>✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={`/image/about/about (${(index % 4) + 1}).jpg`}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Services

