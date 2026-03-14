import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiMapPin, FiCalendar, FiArrowRight, FiHome, FiLayers, FiTrendingUp, FiX, FiImage } from 'react-icons/fi'
import { api, apiImage } from '../services/api'

const CurrentProjects = () => {
  const [selectedProjectImages, setSelectedProjectImages] = useState(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [apiProjects, setApiProjects] = useState([])
  const [apiLoading, setApiLoading] = useState(true)

  useEffect(() => {
    api.projects.list('current')
      .then((res) => setApiProjects(res.data || []))
      .catch(() => setApiProjects([]))
      .finally(() => setApiLoading(false))
  }, [])

  // Mock data - used when no CMS data
  const mockProjects = [
    {
      id: 1,
      title: 'أبراج إعمار',
      location: 'بنى سويف - حى الرمد - خلف ارض الطيارين',
      type: 'سكني',
      status: 'قيد الإنشاء',
      completionDate: '2026-12-30',
      description: 'مجمع أبراج فاخر بتصميم عصري وخدمات متكاملة.',
      cardNote: '4 ابراج كل برج منفصل عن الاخر',
      cardUnitsMix: 'شقق سكنيه - شقق اداريه - محلات - بدروم',
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
      pricing: {
        pricePerSquareMeter: {
          '110': 10000,
          '115': 10000,
          '135': 11500,
          '155': 11500,
          '196': 11500,
          '230': 12000,
        },
        installment: {
          twoYears: {
            downPayment: 50,
            priceIncrease: 1000,
          },
          threeYears: {
            downPayment: 20,
            priceIncrease: 2000,
          }
        }
      },
      longDescription: `
        أبراج إعمار هو مشروع سكني فاخر يقع في بنى سويف - حى الرمد - خلف ارض الطيارين. 
        يتميز المشروع بتصميم عصري يجمع بين الفخامة والراحة، مع مراعاة أعلى معايير الجودة في البناء والتشطيب.
        
        يضم المشروع 4 أبراج منفصلة، كل برج يتكون من 7 طوابق، وكل طابق يحتوي على 4 شقق.
        المشروع يضم شقق سكنية، شقق إدارية، محلات، وبدروم.
      `,
    },
    {
      id: 2,
      title: 'رويال سيتي',
      location: 'امتداد الرمد خلف ارض الطيارين امام ابراج اعمار',
      type: 'سكني',
      status: 'قيد الإنشاء',
      completionDate: '2026-12-30',
      description: 'مجمع سكني راقي بتشطيبات فاخرة ومرافق متكاملة',
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
      cardNote: '4 شقق بالدور',
      features: [],
      pricing: {
        pricePerSquareMeter: {
          '115': 10000,
          '150': 11500,
          '175': 11000,
        },
        installment: {
          twoYears: {
            downPayment: 50,
            priceIncrease: 1000,
          },
          threeYears: {
            downPayment: 20,
            priceIncrease: 2000,
          }
        }
      },
      longDescription: `
        رويال سيتي هو مجمع سكني راقي يتميز بتصميم عصري ومرافق متكاملة.
        يضم المشروع 7 طوابق، وكل طابق يحتوي على 4 شقق.
      `,
    },
  ]

  // عرض بطاقتي مشاريع إعمار وأبراج إعمار فقط (أبراج إعمار + رويال سيتي)
  const projects = mockProjects
  const useCmsProjects = false

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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-white drop-shadow-lg">
              مشاريعنا الحالية
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-white drop-shadow-md font-semibold">
              تعرف على مشاريعنا الجارية وأحدث التطورات
            </p>
            <p className="text-lg text-white drop-shadow-md">
              مشاريع متميزة بجودة عالية وتصميم عصري
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-custom mt-12">

        {/* Projects Grid */}
        {apiLoading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500" />
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id || project._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md overflow-hidden card-hover"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={useCmsProjects && project.image ? apiImage(project.image) : project.image}
                  alt={project.title || project.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-2 right-2 text-white px-2 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#d6ac72' }}>
                  {project.type}
                </div>
                {!useCmsProjects && (
                  <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    {project.status}
                  </div>
                )}
                {!useCmsProjects && project.progress != null && (
                <div className="absolute bottom-2 right-2">
                  <div className="relative w-16 h-16">
                    <svg className="transform -rotate-90 w-16 h-16">
                      <circle cx="32" cy="32" r="28" stroke="rgba(255,255,255,0.3)" strokeWidth="4" fill="none" />
                      <circle
                        cx="32" cy="32" r="28"
                        stroke="#ffffff" strokeWidth="4" fill="none"
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
                )}
              </div>

              <div className="p-4">
                <h3 className="text-xl font-extrabold text-gray-900 mb-2">{project.title || project.name}</h3>
                <p className="text-sm text-gray-600 mb-3 leading-relaxed line-clamp-2">{project.description}</p>
                {!useCmsProjects && (project.cardNote || project.cardUnitsMix) && (
                  <div className="mb-3 space-y-1">
                    {project.cardNote && <p className="text-xs font-bold text-gray-800">{project.cardNote}</p>}
                    {project.cardUnitsMix && <p className="text-xs text-gray-700">{project.cardUnitsMix}</p>}
                  </div>
                )}

                {!useCmsProjects && (
                <div className="space-y-2 mb-4">
                  {project.location && (
                  <div className="flex items-center text-gray-700 text-sm">
                    <FiMapPin className="ml-2" size={14} style={{ color: '#d6ac72' }} />
                    <span>{project.location}</span>
                  </div>
                  )}
                  {project.floors && (
                    <div className="flex items-center text-gray-700 text-sm">
                      <FiLayers className="ml-2" size={14} style={{ color: '#d6ac72' }} />
                      <span>{project.floors} طوابق</span>
                    </div>
                  )}
                  {project.pricing && (
                    <div className="mt-2 pt-2 border-t border-gray-200">
                      <p className="text-xs font-bold text-gray-800 mb-1" style={{ color: '#d6ac72' }}>أسعار المتر (كاش):</p>
                      <div className="flex flex-wrap gap-2 text-xs">
                        {project.id === 1 ? (
                          <>
                            <span className="bg-yellow-50 px-2 py-1 rounded">110/115: {project.pricing.pricePerSquareMeter['110'].toLocaleString()} ج.م</span>
                            <span className="bg-yellow-50 px-2 py-1 rounded">135/155/196: {project.pricing.pricePerSquareMeter['135'].toLocaleString()} ج.م</span>
                            <span className="bg-yellow-50 px-2 py-1 rounded">230: {project.pricing.pricePerSquareMeter['230'].toLocaleString()} ج.م</span>
                          </>
                        ) : (
                          <>
                            <span className="bg-yellow-50 px-2 py-1 rounded">115: {project.pricing.pricePerSquareMeter['115'].toLocaleString()} ج.م</span>
                            <span className="bg-yellow-50 px-2 py-1 rounded">150: {project.pricing.pricePerSquareMeter['150'].toLocaleString()} ج.م</span>
                            <span className="bg-yellow-50 px-2 py-1 rounded">175: {project.pricing.pricePerSquareMeter['175'].toLocaleString()} ج.م</span>
                          </>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mt-2">
                        تقسيط متاح: سنتين (مقدم 50%) أو 3 سنوات (مقدم 20%)
                      </p>
                    </div>
                  )}
                </div>
                )}

                {!useCmsProjects && project.features && project.features.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.features.slice(0, 3).map((feature, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">{feature}</span>
                      ))}
                    </div>
                  </div>
                )}

                <Link
                  to={`/projects/${project.id || project._id}`}
                  className="btn-primary w-full flex items-center justify-center space-x-2 space-x-reverse text-sm py-2"
                >
                  <span>عرض التفاصيل</span>
                  <FiArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 rounded-2xl p-8 text-center text-white"
          style={{ background: 'linear-gradient(to right, #d6ac72, #c49a5f)' }}
        >
          <h2 className="text-3xl font-bold mb-4">استفسر عن مشاريعنا</h2>
          <p className="text-lg mb-6 opacity-90">
            تواصل معنا لمعرفة المزيد عن مشاريعنا الحالية والوحدات المتاحة
          </p>
          <Link to="/contact" className="btn-secondary bg-white hover:bg-gray-50 inline-block" style={{ color: '#d6ac72' }}>
            تواصل معنا الآن
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
                aria-label="إغلاق"
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
                  aria-label="الصورة السابقة"
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
                  aria-label="الصورة التالية"
                >
                  <span className="text-2xl">›</span>
                </button>
              )}
              
              <img
                src={selectedProjectImages[selectedImageIndex]}
                alt={`صورة ${selectedImageIndex + 1}`}
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

