import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiClock, FiDollarSign, FiUsers, FiBook, FiArrowLeft, FiInfo, FiX, FiPlay } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { useLanguage } from '../contexts/LanguageContext'

const SurveyingServices = () => {
  const { t } = useLanguage()
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [videoUrl, setVideoUrl] = useState(null)
  const [showVideoInDetail, setShowVideoInDetail] = useState(false)

  // Mock data - In production, this would come from an API
  const courses = [
    {
      id: 1,
      title: 'Advanced Applied Surveying Course',
      description: 'Comprehensive course covering all fundamentals of applied surveying and modern techniques',
      duration: '40 hours',
      price: 5000,
      content: [
        'Introduction to Applied Surveying',
        'Using Modern Surveying Equipment',
        'Surveying and Layout',
        'Geodetic Surveying',
        'Photogrammetry',
        'Practical Applications',
      ],
      instructor: 'Dr. Mohamed Ahmed',
      instructorBio: 'Surveying expert with over 20 years of experience',
      image: '/image/medium (5).webp',
    },
    {
      id: 2,
      title: 'GPS Surveying Course',
      description: 'Learn to use GPS technologies in surveying',
      duration: '30 hours',
      price: 4000,
      content: [
        'Introduction to GPS Systems',
        'Using GPS Surveying Equipment',
        'Data Processing',
        'Practical Applications',
      ],
      instructor: 'Eng. Ahmed Mahmoud',
      instructorBio: 'Specialist in GPS systems and modern surveying',
      image: '/image/medium (6).webp',
    },
    {
      id: 3,
      title: 'Photogrammetry Course',
      description: 'Learn photogrammetry techniques and remote sensing',
      duration: '35 hours',
      price: 4500,
      content: [
        'Photogrammetry Fundamentals',
        'Aerial Photography',
        'Image Processing',
        'Remote Sensing',
        'Practical Applications',
      ],
      instructor: 'Dr. Sara Ali',
      instructorBio: 'Expert in photogrammetry and remote sensing',
      image: '/image/medium (7).webp',
    },
    {
      id: 4,
      title: 'Total Station Course',
      description: 'Specialized course in using Total Station for precise surveying and layout',
      duration: '45 hours',
      price: 6000,
      content: [
        'Introduction to Total Station',
        'Device Components and Operation Methods',
        'Device Setup and Calibration',
        'Surveying with Total Station',
        'Layout and Exploration',
        'Distance and Angle Measurement',
        'Data Processing and Export',
        'On-site Practical Training',
        'Troubleshooting Common Issues',
        'Advanced Practical Applications',
      ],
      instructor: 'Eng. Mahmoud El-Sayed',
      instructorBio: 'Total Station expert with over 12 years of practical experience',
      image: '/image/سعر-جهاز-توتال-ستيشن-سوكيا.jpg',
      videoUrl: 'https://www.youtube.com/embed/bkeLrvY5i2E',
    },
    {
      id: 5,
      title: 'AutoCAD Training Course',
      description: 'Comprehensive course to learn AutoCAD from basics to professional level in engineering drawing and design',
      duration: '40 hours',
      price: 5000,
      content: [
        'Introduction to AutoCAD',
        'Program Interface and Basic Tools',
        'Basic Drawing Commands (Line, Circle, Arc, etc.)',
        'Modification Commands (Move, Copy, Rotate, Scale)',
        'Layers and Color Management',
        'Text and Writing (Text, MText)',
        'Dimensions and Measurements',
        'Blocks and References',
        'Printing and Export (Plot & Export)',
        'Practical Projects and Advanced Applications',
      ],
      instructor: 'Eng. Ahmed Mohamed',
      instructorBio: 'Expert in engineering design software with over 15 years of AutoCAD experience',
      image: '/image/maxresdefault.jpg',
      videoUrl: 'https://www.youtube.com/embed/nmA5m_7Enf8',
    },
  ]

  if (selectedCourse) {
    return (
      <div className="min-h-screen bg-gray-50 pb-16">
        <div className="container-custom">
          <button
            onClick={() => {
              setSelectedCourse(null)
              setShowVideoInDetail(false)
            }}
            className="flex items-center mb-6"
            style={{ color: '#d6ac72' }}
          >
            <FiArrowLeft className="ml-2" size={20} />
            <span>Back to Courses</span>
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="relative h-96">
              <img
                src={selectedCourse.image}
                alt={selectedCourse.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedCourse.title}</h1>
              <p className="text-lg text-gray-600 mb-6">{selectedCourse.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center space-x-3 space-x-reverse bg-primary-50 p-4 rounded-lg">
                  <FiClock size={24} style={{ color: '#d6ac72' }} />
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-bold text-gray-900">{selectedCourse.duration}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 space-x-reverse bg-primary-50 p-4 rounded-lg">
                  <FiDollarSign size={24} style={{ color: '#d6ac72' }} />
                  <div>
                    <p className="text-sm text-gray-600">Price</p>
                    <p className="font-bold text-gray-900">EGP {selectedCourse.price.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 space-x-reverse bg-primary-50 p-4 rounded-lg">
                  <FiUsers size={24} style={{ color: '#d6ac72' }} />
                  <div>
                    <p className="text-sm text-gray-600">Instructor</p>
                    <p className="font-bold text-gray-900">{selectedCourse.instructor}</p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Content</h2>
                <ul className="space-y-3">
                  {selectedCourse.content.map((item, index) => (
                    <li key={index} className="flex items-start space-x-3 space-x-reverse">
                      <FiBook className="mt-1 flex-shrink-0" size={18} style={{ color: '#d6ac72' }} />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Instructor</h2>
                <p className="text-gray-700">{selectedCourse.instructorBio}</p>
              </div>

              {selectedCourse.videoUrl && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Introductory Video</h2>
                  {!showVideoInDetail ? (
                    <button
                      onClick={() => setShowVideoInDetail(true)}
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                    >
                      <FiPlay size={20} />
                      <span>شاهد الفيديو</span>
                    </button>
                  ) : (
                    <div className="bg-gray-100 rounded-xl shadow-lg overflow-hidden">
                      <div className="flex items-center justify-between p-4 bg-gray-200">
                        <h3 className="font-semibold text-gray-900">Course Video</h3>
                        <button
                          onClick={() => setShowVideoInDetail(false)}
                          className="text-gray-600 hover:text-gray-900 transition-colors"
                        >
                          <FiX size={24} />
                        </button>
                      </div>
                      <div className="aspect-video">
                        <iframe
                          src={selectedCourse.videoUrl}
                          title="Course Video"
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              <Link
                to={`/surveying-services/course/${selectedCourse.id}/book`}
                className="btn-primary inline-block text-center w-full md:w-auto"
              >
                Book Course Now
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Hero Section */}
      <div 
        className="relative py-20 md:py-28 overflow-hidden mb-16"
        style={{ background: 'linear-gradient(135deg, #d6ac72 0%, #c49a5f 50%, #b2884c 100%)' }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'url(/image/medium (5).webp)', 
            backgroundSize: 'cover', 
            backgroundPosition: 'center' 
          }}></div>
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-lg">
              Surveying Courses
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-white drop-shadow-md font-semibold">
              Specialized and comprehensive training courses
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-custom">
        {/* Courses Packages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Available Courses</h2>
            <div className="w-24 h-1 mx-auto mb-6" style={{ backgroundColor: '#d6ac72' }}></div>
          </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                  {[
                    { 
                      id: 'surveying-package',
                      title: 'Surveying Package (Level - Total Station)',
                      duration: '60 hours',
                      price: 8000
                    },
                    { 
                      id: 'autocad',
                      title: 'AutoCAD',
                      duration: '40 hours',
                      price: 5000
                    },
                    { 
                      id: 'civil-3d',
                      title: 'Civil 3D',
                      duration: '50 hours',
                      price: 7000
                    },
                    { 
                      id: '3d-max',
                      title: '3D Max',
                      duration: '45 hours',
                      price: 6000
                    },
                    { 
                      id: 'revit',
                      title: 'Revit',
                      duration: '50 hours',
                      price: 7000
                    }
                  ].map((course) => {
                    const handleWhatsApp = () => {
                      const message = `Hello, I would like to inquire about the course: ${course.title}`
                      const url = `https://wa.me/201011942703?text=${encodeURIComponent(message)}`
                      window.open(url, '_blank')
                    }

                    return (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-xl border-2 shadow-lg hover:shadow-xl transition-all overflow-hidden"
                        style={{ borderColor: '#d6ac72' }}
                      >
                        <div className="p-5">
                          <h4 className="text-gray-900 font-bold text-lg mb-3 leading-tight min-h-[3rem]">
                            {course.title}
                          </h4>
                          <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <FiClock className="ml-1" size={16} />
                              <span>{course.duration}</span>
                            </div>
                            <div className="font-bold" style={{ color: '#d6ac72' }}>
                              EGP {course.price.toLocaleString()}
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Link
                              to={`/surveying-services/course/${course.id}`}
                              className="w-full bg-white border-2 text-center py-2.5 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                              style={{ borderColor: '#d6ac72', color: '#d6ac72' }}
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#d6ac72'
                                e.target.style.color = 'white'
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'white'
                                e.target.style.color = '#d6ac72'
                              }}
                            >
                              <FiInfo size={18} />
                              <span>Details</span>
                            </Link>
                            <button
                              onClick={handleWhatsApp}
                              className="w-full bg-green-500 text-white py-2.5 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                            >
                              <FaWhatsapp size={18} />
                              <span>WhatsApp</span>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
        </motion.div>

        {/* Courses Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Training Courses</h2>
            <div className="w-24 h-1 mx-auto mb-6" style={{ backgroundColor: '#d6ac72' }}></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden card-hover border border-gray-100"
              >
                <div 
                  className="relative h-48 overflow-hidden bg-gray-200 cursor-pointer"
                  onClick={() => course.videoUrl && setVideoUrl(course.videoUrl)}
                >
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    onError={(e) => {
                      e.target.src = '/image/medium (1).webp'
                    }}
                  />
                  {course.videoUrl && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-red-600 text-white rounded-full p-3 transform hover:scale-110 transition-transform">
                        <FiPlay size={24} />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">{course.title}</h3>
                  
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                    <div className="flex items-center text-gray-600 text-sm">
                      <FiClock className="ml-1.5" size={16} />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center font-bold text-base" style={{ color: '#d6ac72' }}>
                      <FiDollarSign size={16} />
                      <span>EGP {course.price.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {course.videoUrl && (
                      <button
                        onClick={() => setVideoUrl(course.videoUrl)}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold text-sm"
                      >
                        <FiPlay size={16} />
                        <span>Watch Video</span>
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="w-full btn-primary text-sm py-2.5"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {videoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
            onClick={() => setVideoUrl(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative bg-black rounded-lg overflow-hidden max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setVideoUrl(null)}
                className="absolute top-4 left-4 z-10 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors"
              >
                <FiX size={24} />
              </button>
              <div className="aspect-video">
                <iframe
                  src={videoUrl}
                  title="Course Video"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SurveyingServices

