import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiMapPin, FiCalendar, FiArrowRight, FiHome, FiLayers, FiTrendingUp, FiX, FiImage } from 'react-icons/fi'

const CurrentProjects = () => {
  const [selectedProjectImages, setSelectedProjectImages] = useState(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  // Mock data - In production, this would come from an API
  const projects = [
    {
      id: 1,
      title: 'Emaar Towers',
      location: 'Beni Suef - Al-Ramad District - Behind Pilots Land',
      type: 'Residential',
      status: 'Under Construction',
      completionDate: '2025-12-31',
      description: 'Luxury tower complex with modern design and integrated services.',
      cardNote: '4 towers, each tower separate from the other',
      cardUnitsMix: 'Residential apartments - Administrative apartments - Shops - Basement',
      image: '/image/Our current projects/Emaar Towers/Emaar Towers (1).jpg',
      images: [
        '/image/Our current projects/Emaar Towers/Emaar Towers (1).jpg',
        '/image/Our current projects/Emaar Towers/Emaar Towers (2).jpg',
        '/image/Our current projects/Emaar Towers/Emaar Towers (3).jpg',
        '/image/Our current projects/Emaar Towers/Emaar Towers (4).jpg',
        '/image/Our current projects/Emaar Towers/Emaar Towers (5).jpg',
        '/image/Our current projects/Emaar Towers/Emaar Towers Split (1).jpg',
        '/image/Our current projects/Emaar Towers/Emaar Towers Split (2).jpg',
        '/image/Our current projects/Emaar Towers/Emaar Towers Split (3).jpg',
        '/image/Our current projects/Emaar Towers/Emaar Towers Split (4).jpg',
        '/image/Our current projects/Emaar Towers/Emaar Towers Split (5).jpg',
      ],
      progress: 75,
      floors: 7,
      startingPrice: 3500000,
      features: [],
      longDescription: `
        Emaar Towers is a luxury residential project located in Beni Suef - Al-Ramad District - Behind Pilots Land. 
        The project features a modern design that combines luxury and comfort, with the highest quality standards in construction and finishing.
        
        The project includes 4 separate towers, each tower consists of 7 floors, and each floor contains 4 apartments.
        The project includes residential apartments, administrative apartments, shops, and basement.
      `,
    },
    {
      id: 2,
      title: 'Royal City',
      location: 'Al-Ramad Extension behind Pilots Land in front of Emaar Towers',
      type: 'Residential',
      status: 'Under Construction',
      completionDate: '2025-09-30',
      description: 'Upscale residential complex with luxury finishes and integrated facilities',
      image: '/image/Our current projects/Royal city/royal city (1).jpg',
      images: [
        '/image/Our current projects/Royal city/royal city (1).jpg',
        '/image/Our current projects/Royal city/royal city (2).jpg',
        '/image/Our current projects/Royal city/royal city (3).jpg',
        '/image/Our current projects/Royal city/Royal City Apartment (1).jpg',
        '/image/Our current projects/Royal city/Royal City Apartment (2).jpg',
        '/image/Our current projects/Royal city/Royal City Apartment (3).jpg',
        '/image/Our current projects/Royal city/Royal City Apartment (4).jpg',
      ],
      progress: 55,
      floors: 7,
      startingPrice: 2800000,
      cardNote: '4 apartments per floor',
      features: [],
      longDescription: `
        Royal City is an upscale residential complex featuring modern design and integrated facilities.
        The project includes 7 floors, and each floor contains 4 apartments.
      `,
    },
  ]


  const handleViewImages = (projectImages, index = 0) => {
    setSelectedProjectImages(projectImages)
    setSelectedImageIndex(index)
  }

  const handleCloseImageModal = () => {
    setSelectedProjectImages(null)
    setSelectedImageIndex(0)
  }

  const handleNextImage = () => {
    if (selectedProjectImages && selectedImageIndex < selectedProjectImages.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1)
    }
  }

  const handlePrevImage = () => {
    if (selectedProjectImages && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Hero Section */}
      <div className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #d6ac72 0%, #c49a5f 50%, #b2884c 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'url(/image/Our current projects/Emaar Towers/Emaar Towers (1).jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-lg">
              Our Current Projects
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-white drop-shadow-md font-semibold">
              Learn about our ongoing projects and latest developments
            </p>
            <p className="text-lg text-white drop-shadow-md">
              Distinguished projects with high quality and modern design
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-custom mt-12">

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md overflow-hidden card-hover"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-2 right-2 text-white px-2 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#d6ac72' }}>
                  {project.type}
                </div>
                <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  {project.status}
                </div>
                
                {/* Circular Progress */}
                <div className="absolute bottom-2 right-2">
                  <div className="relative w-16 h-16">
                    <svg className="transform -rotate-90 w-16 h-16">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="4"
                        fill="none"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="#ffffff"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 28}`}
                        strokeDashoffset={`${2 * Math.PI * 28 * (1 - project.progress / 100)}`}
                        strokeLinecap="round"
                        className="transition-all duration-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{project.progress}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-sm text-gray-600 mb-3 leading-relaxed line-clamp-2">{project.description}</p>
                {(project.cardNote || project.cardUnitsMix) && (
                  <div className="mb-3 space-y-1">
                    {project.cardNote && (
                      <p className="text-xs font-bold text-gray-800">
                        {project.cardNote}
                      </p>
                    )}
                    {project.cardUnitsMix && (
                      <p className="text-xs text-gray-700">
                        {project.cardUnitsMix}
                      </p>
                    )}
                  </div>
                )}

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-700 text-sm">
                    <FiMapPin className="ml-2" size={14} style={{ color: '#d6ac72' }} />
                    <span>{project.location}</span>
                  </div>
                  {project.floors && (
                    <div className="flex items-center text-gray-700 text-sm">
                      <FiLayers className="ml-2" size={14} style={{ color: '#d6ac72' }} />
                      <span>{project.floors} floors</span>
                    </div>
                  )}
                  {project.startingPrice && (
                    <div className="flex items-center text-gray-700 text-sm">
                      <FiTrendingUp className="ml-2" size={14} style={{ color: '#d6ac72' }} />
                      <span>From EGP {project.startingPrice.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                {/* Features Preview */}
                {project.features && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.features.slice(0, 3).map((feature, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <Link
                  to={`/projects/${project.id}`}
                  className="btn-primary w-full flex items-center justify-center space-x-2 space-x-reverse text-sm py-2"
                >
                  <span>View Details</span>
                  <FiArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 rounded-2xl p-8 text-center text-white"
          style={{ background: 'linear-gradient(to right, #d6ac72, #c49a5f)' }}
        >
          <h2 className="text-3xl font-bold mb-4">Inquire About Our Projects</h2>
          <p className="text-lg mb-6 opacity-90">
            Contact us to learn more about our current projects and available units
          </p>
          <Link to="/contact" className="btn-secondary bg-white hover:bg-gray-50 inline-block" style={{ color: '#d6ac72' }}>
            Contact Us Now
          </Link>
        </motion.div>
      </div>

      {/* Image Gallery Modal */}
      <AnimatePresence>
        {selectedProjectImages && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={handleCloseImageModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseImageModal}
                className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors z-10"
                aria-label="Close"
              >
                <FiX size={24} />
              </button>
              
              {selectedImageIndex > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handlePrevImage()
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 rounded-full p-3 transition-colors z-10"
                  aria-label="Previous image"
                >
                  <span className="text-2xl">‹</span>
                </button>
              )}
              
              {selectedImageIndex < selectedProjectImages.length - 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleNextImage()
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 rounded-full p-3 transition-colors z-10"
                  aria-label="Next image"
                >
                  <span className="text-2xl">›</span>
                </button>
              )}
              
              <img
                src={selectedProjectImages[selectedImageIndex]}
                alt={`Image ${selectedImageIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-lg"
                onError={(e) => {
                  e.target.src = '/image/medium (1).webp'
                }}
              />
              
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full text-sm">
                {selectedImageIndex + 1} / {selectedProjectImages.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CurrentProjects

