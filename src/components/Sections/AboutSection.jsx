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
      title: 'خبرة طويلة',
      description: 'أكثر من 15 عامًا من الخبرة في التطوير العقاري والمقاولات والأعمال المساحية',
    },
    {
      icon: FiTarget,
      title: 'رؤية واضحة',
      description: 'نسعى لتحقيق رؤية واضحة في تطوير مشاريع عقارية متميزة تلبي احتياجات السوق',
    },
    {
      icon: FiEye,
      title: 'جودة عالية',
      description: 'نلتزم بأعلى معايير الجودة في جميع مشاريعنا وخدماتنا مع ضمان الرضا التام',
    },
    {
      icon: FiUsers,
      title: 'فريق محترف',
      description: 'فريق متخصص وذو خبرة عالية في جميع مجالات التطوير العقاري والمقاولات',
    },
    {
      icon: FiTrendingUp,
      title: 'نمو مستمر',
      description: 'نمو مستمر في محفظة المشاريع والخدمات مع التوسع في مناطق جديدة',
    },
    {
      icon: FiShield,
      title: 'ضمانات قوية',
      description: 'نوفر ضمانات قوية وخطط دفع مرنة تناسب جميع احتياجات عملائنا',
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
            من نحن
          </h2>
          <div className="about-section-divider"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
            شركة إعمار للمقاولات والأعمال المساحية والاستثمار العقاري هي شركة رائدة في التطوير العقاري والمقاولات في مصر، 
            تأسست بهدف تقديم حلول متكاملة وعالية الجودة في قطاعات العقارات والمقاولات والمساحة.
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            نقدم خدمات شاملة تشمل التطوير العقاري والمقاولات العامة والأعمال المساحية 
            والاستثمار العقاري، مع التركيز على الجودة والابتكار ورضا العملاء.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold mb-6 text-gray-800">رؤيتنا</h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              نسعى لأن نكون الشركة الرائدة في التطوير العقاري والمقاولات والأعمال المساحية في مصر والمنطقة، 
              من خلال تقديم مشاريع متميزة تلبي احتياجات عملائنا وتضيف قيمة حقيقية للمجتمع. نهدف لبناء مستقبل أفضل 
              من خلال مشاريع مستدامة وعالية الجودة.
            </p>
            <h3 className="text-3xl font-bold mb-6 text-gray-800 mt-8">مهمتنا</h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              نلتزم بتقديم خدمات عالية الجودة في التطوير العقاري والمقاولات والأعمال المساحية، 
              مع التركيز على الابتكار والاستدامة ورضا العملاء، من خلال فريق محترف 
              وشراكات استراتيجية قوية. نسعى دائمًا لتجاوز توقعات عملائنا وتحقيق أفضل النتائج.
            </p>
            <h3 className="text-3xl font-bold mb-6 text-gray-800 mt-8">قيمنا</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              نؤمن بالشفافية والجودة والابتكار والالتزام. هذه القيم هي أساس كل ما نقوم به، 
              ونسعى دائمًا لتطبيقها في جميع مشاريعنا وخدماتنا لضمان رضا عملائنا وبناء علاقات طويلة الأمد.
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
              <div className="text-lg">سنوات خبرة</div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold mb-8 text-center text-gray-800">ما يميزنا</h3>
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

