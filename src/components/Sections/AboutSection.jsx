import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiAward, FiTarget, FiEye, FiUsers, FiTrendingUp, FiShield } from 'react-icons/fi'
import { useState, useEffect } from 'react'

const AboutSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const aboutImages = [
    '/image/about/about (1).jpg',
    '/image/about/about (2).jpg',
    '/image/about/about (3).jpg',
    '/image/about/about (4).jpg',
  ]

  // Auto-slide images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % aboutImages.length)
    }, 4000) // Change image every 4 seconds

    return () => clearInterval(interval)
  }, [aboutImages.length])

  const features = [
    {
      icon: FiAward,
      title: 'Long Experience',
      description: 'More than 15 years of experience in real estate development, contracting, and surveying works',
    },
    {
      icon: FiTarget,
      title: 'Clear Vision',
      description: 'We strive to achieve a clear vision in developing distinguished real estate projects that meet market needs',
    },
    {
      icon: FiEye,
      title: 'High Quality',
      description: 'We are committed to the highest quality standards in all our projects and services with guaranteed satisfaction',
    },
    {
      icon: FiUsers,
      title: 'Professional Team',
      description: 'A specialized and highly experienced team in all areas of real estate development and contracting',
    },
    {
      icon: FiTrendingUp,
      title: 'Continuous Growth',
      description: 'Continuous growth in project portfolio and services with expansion into new areas',
    },
    {
      icon: FiShield,
      title: 'Strong Guarantees',
      description: 'We provide strong guarantees and flexible payment plans that suit all our clients\' needs',
    },
  ]

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
            About Us
          </h2>
          <div className="about-section-divider"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
            Emaar Company for Contracting, Surveying Works, and Real Estate Investment is a leading company in real estate development and contracting in Egypt, 
            established with the aim of providing integrated and high-quality solutions in the real estate, contracting, and surveying sectors.
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We provide comprehensive services including real estate development, general contracting, surveying works, 
            and real estate investment, with a focus on quality, innovation, and customer satisfaction.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold mb-6 text-gray-800">Our Vision</h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              We strive to be the leading company in real estate development, contracting, and surveying works in Egypt and the region, 
              by providing distinguished projects that meet our clients' needs and add real value to society. We aim to build a better future 
              through sustainable and high-quality projects.
            </p>
            <h3 className="text-3xl font-bold mb-6 text-gray-800 mt-8">Our Mission</h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              We are committed to providing high-quality services in real estate development, contracting, and surveying works, 
              with a focus on innovation, sustainability, and customer satisfaction, through a professional team 
              and strong strategic partnerships. We always strive to exceed our clients' expectations and achieve the best results.
            </p>
            <h3 className="text-3xl font-bold mb-6 text-gray-800 mt-8">Our Values</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              We believe in transparency, quality, innovation, and commitment. These values are the foundation of everything we do, 
              and we always strive to apply them in all our projects and services to ensure our clients' satisfaction and build long-term relationships.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={aboutImages[currentImageIndex]}
                alt="Emaar Company"
                className="w-full h-full object-cover transition-opacity duration-500"
              />
              <div className="absolute bottom-4 left-4 right-4 flex gap-2 justify-center">
                {aboutImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentImageIndex
                        ? 'bg-white w-8'
                        : 'bg-white/50 w-2 hover:bg-white/75'
                    }`}
                    aria-label={`Image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 about-section-badge hidden md:block">
              <div className="text-4xl font-bold">15+</div>
              <div className="text-lg">Years Experience</div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold mb-8 text-center text-gray-800">What Sets Us Apart</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                className="bg-white p-8 rounded-xl shadow-lg card-hover text-center hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="about-section-icon" size={32} />
                </div>
                <h4 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h4>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection

