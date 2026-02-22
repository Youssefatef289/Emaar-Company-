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
      image: '/image/medium (1).webp',
      ...getSlideData('slide1'),
    },
    {
      id: 2,
      image: '/image/medium (2).webp',
      ...getSlideData('slide2'),
    },
    {
      id: 3,
      image: '/image/medium (3).webp',
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

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
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
              className="relative w-full min-h-[80vh] flex items-center"
              style={{
                background: 'linear-gradient(135deg, #d6ac72 0%, #c49a5f 50%, #b2884c 100%)',
              }}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />

              <div className="container-custom relative z-10 py-20 md:py-28">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Text Content */}
                  <motion.div
                    initial={{ opacity: 0, x: language === 'ar' ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="hero-text-section text-white"
                  >
                    {slide.subtitle && (
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-xl md:text-2xl font-semibold mb-4 text-white/90"
                      >
                        {slide.subtitle}
                      </motion.p>
                    )}

                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight drop-shadow-lg"
                    >
                      {slide.title}
                      {slide.titleSuffix && (
                        <span className="block mt-2">{slide.titleSuffix}</span>
                      )}
                    </motion.h1>

                    {slide.description && (
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="text-lg md:text-xl mb-8 text-white/90 drop-shadow-md leading-relaxed"
                      >
                        {slide.description}
                      </motion.p>
                    )}

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                      className="flex flex-wrap gap-4"
                    >
                      {slide.primaryCta && (
                        <Link
                          to="/contact"
                          className="bg-white text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                        >
                          {slide.primaryCta}
                        </Link>
                      )}
                      {slide.secondaryCta && (
                        <Link
                          to="/projects"
                          className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-all duration-300"
                        >
                          {slide.secondaryCta}
                        </Link>
                      )}
                    </motion.div>
                  </motion.div>

                  {/* Image Section */}
                  <motion.div
                    initial={{ opacity: 0, x: language === 'ar' ? 50 : -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="hero-image-wrapper rounded-2xl overflow-hidden"
                  >
                    <img
                      src={slide.image}
                      alt={slide.title || 'Emaar Company'}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/image/medium (1).webp'
                      }}
                    />
                  </motion.div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all z-20"
                aria-label="Previous slide"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all z-20"
                aria-label="Next slide"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* Slide Indicators */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentSlide
                        ? 'bg-white w-8'
                        : 'bg-white/50 hover:bg-white/75'
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

