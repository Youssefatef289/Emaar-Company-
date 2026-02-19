import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX } from 'react-icons/fi'

const Projects = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null)
  const [selectedProjectImages, setSelectedProjectImages] = useState([])

  // جميع الصور من المشاريع
  const allImages = [
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

  const handleImageClick = (index) => {
    setSelectedImageIndex(index)
    setSelectedProjectImages(allImages)
  }

  const handleCloseModal = () => {
    setSelectedImageIndex(null)
    setSelectedProjectImages([])
  }

  const handleNextImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex < allImages.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1)
    }
  }

  const handlePrevImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1)
    }
  }

  return (
    <div className="pt-32 pb-16 bg-gray-50 min-h-screen">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            مشاريعنا
          </h1>
          <div className="w-24 h-1 mx-auto mb-6" style={{ backgroundColor: '#d6ac72' }}></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            استعرض مشاريعنا المتميزة في التطوير العقاري
          </p>
        </motion.div>

        {/* Images Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        >
          {allImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-all"
              onClick={() => handleImageClick(index)}
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
        </motion.div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors z-10"
                aria-label="إغلاق"
              >
                <FiX size={24} />
              </button>
              
              {selectedImageIndex > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevImage();
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 rounded-full p-3 transition-colors z-10"
                  aria-label="الصورة السابقة"
                >
                  <span className="text-2xl">‹</span>
                </button>
              )}
              
              {selectedImageIndex < allImages.length - 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextImage();
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 rounded-full p-3 transition-colors z-10"
                  aria-label="الصورة التالية"
                >
                  <span className="text-2xl">›</span>
                </button>
              )}
              
              <img
                src={allImages[selectedImageIndex]}
                alt={`مشروع ${selectedImageIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full text-sm">
                {selectedImageIndex + 1} / {allImages.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Projects

