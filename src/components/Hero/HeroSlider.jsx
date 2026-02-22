import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'
import './HeroSlider.css'

const HeroSlider = () => {
  const { t, language } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)

  // Get slide data from translations
  const getSlideData = (slideKey) => {
    try {
      const slide = t(`hero.${slideKey}`)
      return typeof slide === 'object' && slide !== null ? slide : {}
    } catch (error) {
      return {}
    }
  }

  const slides = [
    {
      id: 1,
      image: '/image/Slider/slider (1).jpg',
      ...getSlideData('slide1'),
    },
    {
      id: 2,
      image: '/image/Slider/slider (2).jpg',
      ...getSlideData('slide2'),
    },
    {
      id: 3,
      image: '/image/Slider/slider (3).jpg',
      ...getSlideData('slide3'),
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }


  return (
    <div className="hero-slider-container relative overflow-hidden">
      <AnimatePresence mode="wait">
        {slides.map((slide, index) => {
          if (index !== currentSlide) return null

          return (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative w-full min-h-[80vh] flex items-center bg-white"
            >
              <div className="container-custom relative z-10 py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                  {/* Image Section - على اليمين */}
                  <motion.div
                    initial={{ opacity: 0, x: language === 'ar' ? 50 : -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="order-2 lg:order-1 hero-image-wrapper rounded-2xl overflow-hidden shadow-2xl"
                  >
                    <img
                      src={slide.image}
                      alt={slide.title || 'Emaar Company'}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/image/Slider/slider (1).jpg'
                      }}
                    />
                  </motion.div>

                  {/* Text Content - على اليسار */}
                  <motion.div
                    initial={{ opacity: 0, x: language === 'ar' ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="order-1 lg:order-2 hero-text-section"
                  >
                    {slide.subtitle && (
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-lg md:text-xl font-semibold mb-3 text-gray-600"
                        style={{ color: '#d6ac72' }}
                      >
                        {slide.subtitle}
                      </motion.p>
                    )}

                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-gray-900"
                    >
                      {slide.title}
                      {slide.titleSuffix && (
                        <span className="block mt-2" style={{ color: '#d6ac72' }}>
                          {slide.titleSuffix}
                        </span>
                      )}
                    </motion.h1>

                    {slide.description && (
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="text-base md:text-lg mb-8 text-gray-700 leading-relaxed max-w-xl"
                      >
                        {slide.description}
                      </motion.p>
                    )}

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.6 }}
                      className="flex flex-wrap gap-4 mt-8"
                    >
                      {slide.primaryCta && (
                        <Link
                          to="/contact"
                          className="px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-white"
                          style={{ backgroundColor: '#d6ac72' }}
                        >
                          {slide.primaryCta}
                        </Link>
                      )}
                      {slide.secondaryCta && (
                        <Link
                          to="/projects"
                          className="px-8 py-4 rounded-lg font-bold text-lg border-2 transition-all duration-300 text-gray-900 hover:bg-gray-50"
                          style={{ borderColor: '#d6ac72', color: '#d6ac72' }}
                        >
                          {slide.secondaryCta}
                        </Link>
                      )}
                    </motion.div>
                  </motion.div>
                </div>
              </div>

              {/* Slide Indicators */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-3 rounded-full transition-all ${
                      index === currentSlide
                        ? 'bg-gray-800 w-8'
                        : 'bg-gray-400 w-3 hover:bg-gray-600'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

export default HeroSlider

