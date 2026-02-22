import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { FiMapPin, FiMaximize2, FiLayers, FiTrendingUp } from 'react-icons/fi'
import ProjectModal from '../ProjectModal'
import { getProjectTypeIcon } from '../../constants/assets'

const ProjectsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const projects = [
    {
      id: 1,
      image: '/image/Our current projects/Emaar Towers/Emaar Towers (1).jpg',
      title: 'Emaar Towers',
      location: 'Beni Suef - Al-Ramad District - Behind Pilots Land',
      area: '4 Towers - 7 Floors',
      status: 'Under Construction',
      type: 'Residential',
      description: 'Luxury tower complex with modern design and integrated services. 4 towers, each tower separate from the other - Residential apartments - Administrative apartments - Shops - Basement',
      features: [
        '4 Separate Towers',
        '7 Floors per Tower',
        '4 Apartments per Floor',
        'Residential and Administrative Apartments',
        'Commercial Shops',
        'Basement',
      ],
      progress: 75,
      floors: 7,
      startingPrice: 3500000,
      cardNote: '4 towers, each tower separate from the other',
      cardUnitsMix: 'Residential apartments - Administrative apartments - Shops - Basement',
    },
    {
      id: 2,
      image: '/image/Our current projects/Royal city/royal city (1).jpg',
      title: 'Royal City',
      location: 'Al-Ramad Extension behind Pilots Land in front of Emaar Towers',
      area: '7 Floors',
      status: 'Under Construction',
      type: 'Residential',
      description: 'Upscale residential complex with luxury finishes and integrated facilities. 4 apartments per floor',
      features: [
        '7 Floors',
        '4 Apartments per Floor',
        'Luxury Finishes',
        'Integrated Facilities',
        'Prime Location',
      ],
      progress: 55,
      floors: 7,
      startingPrice: 2800000,
      cardNote: '4 apartments per floor',
    },
  ]

  const handleOpenModal = (project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  const getStatusColor = (status) => {
    if (status === 'Completed') return 'bg-green-100 text-green-800'
    if (status === 'Under Construction') return 'bg-blue-100 text-blue-800'
    return 'bg-gray-100 text-gray-800'
  }

  return (
    <section ref={ref} className="section-padding bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-custom">
            مشاريعنا
          </h2>
          <div className="projects-section-divider"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            نفخر بمشاريعنا المتميزة التي تعكس خبرتنا والتزامنا بالجودة
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg card-hover"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center gap-2 bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
                    <img
                      src={getProjectTypeIcon(project.type)}
                      alt=""
                      className="w-4 h-4"
                      loading="lazy"
                      decoding="async"
                    />
                    <span>{project.type}</span>
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    onClick={() => handleOpenModal(project)}
                    className="projects-section-button"
                  >
                    <FiMaximize2 size={24} />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-gray-800">{project.title}</h3>
                {project.cardNote && (
                  <p className="text-sm font-bold text-gray-800 mb-2" style={{ color: '#d6ac72' }}>
                    {project.cardNote}
                  </p>
                )}
                {project.cardUnitsMix && (
                  <p className="text-sm text-gray-700 mb-3">
                    {project.cardUnitsMix}
                  </p>
                )}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <FiMapPin className="ml-2" size={18} />
                    <span className="text-sm">{project.location}</span>
                  </div>
                  {project.floors && (
                    <div className="flex items-center text-gray-600 text-sm">
                      <FiLayers className="ml-2" size={16} style={{ color: '#d6ac72' }} />
                      <span>{project.floors} طوابق</span>
                    </div>
                  )}
                  {project.progress && (
                    <div className="flex items-center text-gray-600 text-sm">
                      <FiTrendingUp className="ml-2" size={16} style={{ color: '#d6ac72' }} />
                      <span>نسبة الإنجاز: {project.progress}%</span>
                      <div className="flex-1 mr-3 bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-300"
                          style={{ width: `${project.progress}%`, backgroundColor: '#d6ac72' }}
                        ></div>
                      </div>
                    </div>
                  )}
                  {project.startingPrice && (
                    <div className="text-gray-600 text-sm">
                      <span className="font-semibold">يبدأ من:</span> {project.startingPrice.toLocaleString()} ج.م
                    </div>
                  )}
                </div>
                <Link
                  to={`/projects/${project.id}`}
                  className="projects-section-link inline-flex items-center"
                >
                  عرض التفاصيل
                  <span className="mr-2">←</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-center mt-12"
        >
          <Link to="/projects" className="btn-primary text-lg">
            عرض جميع المشاريع
          </Link>
        </motion.div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  )
}

export default ProjectsSection

