import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiMapPin, FiImage, FiArrowRight, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const PreviousProjects = () => {
  const [selectedProjectImages, setSelectedProjectImages] = useState(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedGalleryImageIndex, setSelectedGalleryImageIndex] = useState(null)
  const [cardImageIndices, setCardImageIndices] = useState({})

  // المشاريع السابقة
  const previousProjects = [
    {
      id: 'beni-suef-post',
      title: 'مبنى البريد - بنى سويف',
      location: 'بنى سويف',
      type: 'حكومي',
      status: 'مكتمل',
      description: 'مبنى البريد ودراسات إسلامية في بنى سويف',
      image: '/image/Beni Suef Post Office, Islamic Studies/Post office (1).jpg',
      images: [
        '/image/Beni Suef Post Office, Islamic Studies/Post office (1).jpg',
        '/image/Beni Suef Post Office, Islamic Studies/Post office (2).jpg',
        '/image/Beni Suef Post Office, Islamic Studies/Post office (3).jpg',
        '/image/Beni Suef Post Office, Islamic Studies/Post office (4).jpg',
        '/image/Beni Suef Post Office, Islamic Studies/Post office (5).jpg',
        '/image/Beni Suef Post Office, Islamic Studies/Post office (6).jpg',
        '/image/Beni Suef Post Office, Islamic Studies/Post office (7).jpg',
        '/image/Beni Suef Post Office, Islamic Studies/Post office (8).jpg',
        '/image/Beni Suef Post Office, Islamic Studies/Post office (9).jpg',
        '/image/Beni Suef Post Office, Islamic Studies/Post office (10).jpg',
        '/image/Beni Suef Post Office, Islamic Studies/Post office (11).jpg',
        '/image/Beni Suef Post Office, Islamic Studies/Post office (12).jpg',
        '/image/Beni Suef Post Office, Islamic Studies/Post office (13).jpg',
        '/image/Beni Suef Post Office, Islamic Studies/Post office (14).jpg',
        '/image/Beni Suef Post Office, Islamic Studies/Post office (15).jpg',
        '/image/Beni Suef Post Office, Islamic Studies/Post office (16).jpg',
        '/image/Beni Suef Post Office, Islamic Studies/Post office (17).jpg',
      ],
    },
    {
      id: 'al-harbi',
      title: 'شركة الحربي',
      location: 'مصر',
      type: 'تجاري',
      status: 'مكتمل',
      description: 'مشروع شركة الحربي',
      image: '/image/Al-Harbi Company/Al-Harbi Company (1).jpg',
      images: [
        '/image/Al-Harbi Company/Al-Harbi Company (1).jpg',
        '/image/Al-Harbi Company/Al-Harbi Company (2).jpg',
        '/image/Al-Harbi Company/Al-Harbi Company (3).jpg',
        '/image/Al-Harbi Company/Al-Harbi Company (4).jpg',
        '/image/Al-Harbi Company/Al-Harbi Company (5).jpg',
        '/image/Al-Harbi Company/Al-Harbi Company (6).jpg',
        '/image/Al-Harbi Company/Al-Harbi Company (7).jpg',
      ],
    },
    {
      id: 'workers-university',
      title: 'البوابات - الجامعة العمالية',
      location: 'مصر',
      type: 'تعليمي',
      status: 'مكتمل',
      description: 'بوابات الجامعة العمالية',
      image: '/image/البوبات/الجامعة العمالية/Workers\' University Gates (1).JPG',
      images: [
        '/image/البوبات/الجامعة العمالية/Workers\' University Gates (1).JPG',
        '/image/البوبات/الجامعة العمالية/Workers\' University Gates (2).JPG',
        '/image/البوبات/الجامعة العمالية/Workers\' University Gates (3).JPG',
        '/image/البوبات/الجامعة العمالية/Workers\' University Gates (4).jpg',
        '/image/البوبات/الجامعة العمالية/Workers\' University Gates (5).jpg',
        '/image/البوبات/الجامعة العمالية/Workers\' University Gates (6).jpg',
        '/image/البوبات/الجامعة العمالية/Workers\' University Gates (7).jpg',
        '/image/البوبات/الجامعة العمالية/Workers\' University Gates (8).jpg',
        '/image/البوبات/الجامعة العمالية/Workers\' University Gates (9).jpg',
        '/image/البوبات/الجامعة العمالية/Workers\' University Gates (10).jpg',
        '/image/البوبات/الجامعة العمالية/Workers\' University Gates (11).jpg',
        '/image/البوبات/الجامعة العمالية/Workers\' University Gates (12).jpg',
        '/image/البوبات/الجامعة العمالية/Workers\' University Gates (13).jpg',
        '/image/البوبات/الجامعة العمالية/Workers\' University Gates (14).JPG',
        '/image/البوبات/الجامعة العمالية/Workers\' University Gates (15).JPG',
        '/image/البوبات/الجامعة العمالية/Workers\' University Gates (16).JPG',
      ],
    },
    {
      id: 'beni-suef-university',
      title: 'البوابات - جامعة بنى سويف',
      location: 'بنى سويف',
      type: 'تعليمي',
      status: 'مكتمل',
      description: 'بوابات جامعة بنى سويف',
      image: '/image/البوبات/جامعة بنى سويف/Beni Suef University Gates (1).JPG',
      images: [
        '/image/البوبات/جامعة بنى سويف/Beni Suef University Gates (1).JPG',
        '/image/البوبات/جامعة بنى سويف/Beni Suef University Gates (2).JPG',
        '/image/البوبات/جامعة بنى سويف/Beni Suef University Gates (3).JPG',
        '/image/البوبات/جامعة بنى سويف/Beni Suef University Gates (4).JPG',
      ],
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

  // جميع الصور من المشاريع
  const allProjectImages = [
    '/image/Our projects/Our projects (1).jpg',
    '/image/Our projects/Our projects (2).jpg',
    '/image/Our projects/Our projects (3).jpg',
    '/image/Our projects/Our projects (4).jpg',
    '/image/Our projects/Our projects (5).jpg',
    '/image/Our projects/Our projects (6).jpg',
    '/image/Our projects/Our projects (7).jpg',
    '/image/Our projects/Our projects (8).jpg',
    '/image/Our projects/Our projects (9).jpg',
    '/image/Our projects/Our projects (10).jpg',
    '/image/Our projects/Our projects (11).jpg',
    '/image/Our projects/Our projects (12).jpg',
    '/image/Our projects/Our projects (13).jpg',
    '/image/Our projects/Our projects (14).jpg',
    '/image/Our projects/Our projects (15).jpg',
    '/image/Our projects/Our projects (16).jpg',
    '/image/Our projects/Our projects (17).jpg',
    '/image/Our projects/Our projects (18).jpg',
    '/image/Our projects/Our projects (19).jpg',
    '/image/Our projects/Our projects (20).jpg',
    '/image/Our projects/Our projects (21).jpg',
    '/image/Our projects/Our projects (22).jpg',
    '/image/Our projects/Our projects (23).jpg',
    '/image/Our projects/Our projects (24).jpg',
    '/image/Our projects/Our projects (25).jpg',
    '/image/Our projects/Our projects (26).jpg',
    '/image/Our projects/Our projects (27).jpg',
    '/image/Our projects/Our projects (28).jpg',
    '/image/Our projects/Our projects (29).jpg',
    '/image/Our projects/Our projects (30).jpg',
  ]

  const handleGalleryImageClick = (index) => {
    setSelectedGalleryImageIndex(index)
  }

  const handleCloseGalleryModal = () => {
    setSelectedGalleryImageIndex(null)
  }

  const handleNextGalleryImage = () => {
    if (selectedGalleryImageIndex !== null && selectedGalleryImageIndex < allProjectImages.length - 1) {
      setSelectedGalleryImageIndex(selectedGalleryImageIndex + 1)
    }
  }

  const handlePrevGalleryImage = () => {
    if (selectedGalleryImageIndex !== null && selectedGalleryImageIndex > 0) {
      setSelectedGalleryImageIndex(selectedGalleryImageIndex - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Hero Section */}
      <div className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #d6ac72 0%, #c49a5f 50%, #b2884c 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'url(/image/Beni Suef Post Office, Islamic Studies/Post office (1).jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-lg">
              المشاريع السابقة
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-white drop-shadow-md font-semibold">
              استعرض مشاريعنا المكتملة التي نفذناها باحترافية عالية
            </p>
            <p className="text-lg text-white drop-shadow-md">
              مشاريع متميزة بجودة عالية وتصميم عصري
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-custom mt-12">
        {/* Previous Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {previousProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md overflow-hidden card-hover"
            >
              <div className="relative h-56 overflow-hidden group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={cardImageIndices[project.id] || 0}
                    src={project.images[cardImageIndices[project.id] || 0]}
                    alt={project.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = '/image/medium (1).webp'
                    }}
                  />
                </AnimatePresence>
                
                {/* Navigation Buttons */}
                {project.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        const currentIndex = cardImageIndices[project.id] || 0
                        const newIndex = currentIndex > 0 ? currentIndex - 1 : project.images.length - 1
                        setCardImageIndices({ ...cardImageIndices, [project.id]: newIndex })
                      }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                    >
                      <FiChevronLeft size={20} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        const currentIndex = cardImageIndices[project.id] || 0
                        const newIndex = currentIndex < project.images.length - 1 ? currentIndex + 1 : 0
                        setCardImageIndices({ ...cardImageIndices, [project.id]: newIndex })
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                    >
                      <FiChevronRight size={20} />
                    </button>
                    
                    {/* Image Indicators */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      {project.images.slice(0, 5).map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-1.5 rounded-full transition-all ${
                            (cardImageIndices[project.id] || 0) === idx
                              ? 'bg-white w-6'
                              : 'bg-white/50 w-1.5'
                          }`}
                        />
                      ))}
                      {project.images.length > 5 && (
                        <span className="text-white text-xs mr-1">+{project.images.length - 5}</span>
                      )}
                    </div>
                  </>
                )}
                
                <div className="absolute top-2 right-2 text-white px-2 py-1 rounded-full text-xs font-semibold z-10" style={{ backgroundColor: '#d6ac72' }}>
                  {project.type}
                </div>
                <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold z-10">
                  {project.status}
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{project.description}</p>
                
                <div className="flex items-center text-gray-700 text-sm mb-4">
                  <FiMapPin className="ml-2" size={14} style={{ color: '#d6ac72' }} />
                  <span>{project.location}</span>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleViewImages(project.images, 0)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm shadow-md hover:shadow-lg"
                  >
                    <FiImage size={16} />
                    <span>رؤية الصور ({project.images.length})</span>
                  </button>
                  <Link
                    to={`/projects/${project.id}`}
                    className="w-full btn-primary text-sm py-2.5 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                  >
                    <span>عرض التفاصيل</span>
                    <FiArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Emaar Towers Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">أبراج إعمار</h2>
            <div className="w-24 h-1 mx-auto mb-6" style={{ backgroundColor: '#d6ac72' }}></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              استعرض صور مشروع أبراج إعمار
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
            {[
              '/image/Our projects/Our projects  Emaar tower (12).jpg',
              '/image/Our projects/Our projects  Emaar tower (13).jpg',
              '/image/Our projects/Our projects  Emaar tower (14).jpg',
              '/image/Our projects/Our projects  Emaar tower (15).jpg',
              '/image/Our projects/Our projects  Emaar tower (16).jpg',
              '/image/Our projects/Our projects  Emaar tower (17).jpg',
              '/image/Our projects/Our projects  Emaar tower (18).jpg',
              '/image/Our projects/Our projects  Emaar tower (19).jpg',
              '/image/Our projects/Our projects  Emaar tower (20).jpg',
              '/image/Our projects/Our projects  Emaar tower (21).jpg',
              '/image/Our projects/Our projects  Emaar tower (22).jpg',
              '/image/Our projects/Our projects  Emaar tower (23).jpg',
              '/image/Our projects/Our projects  Emaar tower (24).jpg',
              '/image/Our projects/Our projects  Emaar tower (25).jpg',
              '/image/Our projects/Our projects  Emaar tower (26).jpg',
            ].map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-all"
                onClick={() => {
                  const emaarTowerImages = [
                    '/image/Our projects/Our projects  Emaar tower (12).jpg',
                    '/image/Our projects/Our projects  Emaar tower (13).jpg',
                    '/image/Our projects/Our projects  Emaar tower (14).jpg',
                    '/image/Our projects/Our projects  Emaar tower (15).jpg',
                    '/image/Our projects/Our projects  Emaar tower (16).jpg',
                    '/image/Our projects/Our projects  Emaar tower (17).jpg',
                    '/image/Our projects/Our projects  Emaar tower (18).jpg',
                    '/image/Our projects/Our projects  Emaar tower (19).jpg',
                    '/image/Our projects/Our projects  Emaar tower (20).jpg',
                    '/image/Our projects/Our projects  Emaar tower (21).jpg',
                    '/image/Our projects/Our projects  Emaar tower (22).jpg',
                    '/image/Our projects/Our projects  Emaar tower (23).jpg',
                    '/image/Our projects/Our projects  Emaar tower (24).jpg',
                    '/image/Our projects/Our projects  Emaar tower (25).jpg',
                    '/image/Our projects/Our projects  Emaar tower (26).jpg',
                  ]
                  setSelectedProjectImages(emaarTowerImages)
                  setSelectedImageIndex(index)
                }}
              >
                <img
                  src={image}
                  alt={`أبراج إعمار ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                  onError={(e) => {
                    console.error('Failed to load image:', image);
                    e.target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 text-white text-sm font-semibold transition-opacity">
                    اضغط للتكبير
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mb-8">
            <p className="text-xl font-semibold text-gray-800 mb-6">
              هذه الصور من مشروع أبراج إعمار
            </p>
            <Link
              to="/projects/1"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white border-2 rounded-lg font-semibold text-lg transition-all hover:shadow-lg"
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
              <span>عرض التفاصيل</span>
              <FiArrowRight size={20} />
            </Link>
          </div>
        </motion.div>

        {/* Images Gallery Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">معرض الصور</h2>
            <div className="w-24 h-1 mx-auto mb-6" style={{ backgroundColor: '#d6ac72' }}></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              استعرض صور مشاريعنا المكتملة
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {allProjectImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-all"
                onClick={() => handleGalleryImageClick(index)}
              >
                <img
                  src={image}
                  alt={`مشروع ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                  onError={(e) => {
                    console.error('Failed to load image:', image);
                    e.target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 text-white text-sm font-semibold transition-opacity">
                    اضغط للتكبير
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Project Images Modal */}
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

      {/* Gallery Images Modal */}
      <AnimatePresence>
        {selectedGalleryImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={handleCloseGalleryModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseGalleryModal}
                className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors z-10"
                aria-label="إغلاق"
              >
                <FiX size={24} />
              </button>
              
              {selectedGalleryImageIndex > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevGalleryImage();
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 rounded-full p-3 transition-colors z-10"
                  aria-label="الصورة السابقة"
                >
                  <span className="text-2xl">‹</span>
                </button>
              )}
              
              {selectedGalleryImageIndex < allProjectImages.length - 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextGalleryImage();
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 rounded-full p-3 transition-colors z-10"
                  aria-label="الصورة التالية"
                >
                  <span className="text-2xl">›</span>
                </button>
              )}
              
              <img
                src={allProjectImages[selectedGalleryImageIndex]}
                alt={`مشروع ${selectedGalleryImageIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full text-sm">
                {selectedGalleryImageIndex + 1} / {allProjectImages.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PreviousProjects

