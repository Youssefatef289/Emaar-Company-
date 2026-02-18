import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'

const HeroSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-primary-400 font-semibold mb-4 text-lg md:text-xl"
            >
              من التصميم حتى التسليم
            </motion.p>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="text-gradient bg-gradient-to-r from-white via-primary-200 to-white bg-clip-text text-transparent">
                خدمات شاملة ومتكاملة
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-xl md:text-2xl mb-8 text-gray-300 leading-relaxed"
            >
              نقدم خدمات متكاملة تشمل المقاولات، التشطيبات، والتسويق العقاري
              <br className="hidden md:block" />
              لبناء مستقبل أفضل
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link 
                to="/contact" 
                className="btn-primary text-lg bg-primary-500 hover:bg-primary-500 text-white px-8 py-4 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                اطلب عرض سعر
              </Link>
              <Link 
                to="/about" 
                className="btn-secondary text-lg bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg transition-all duration-300"
              >
                تعرف علينا
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1, duration: 0.6 }}
              className="mt-12 grid grid-cols-3 gap-6"
            >
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary-400">150+</div>
                <div className="text-gray-400 text-sm md:text-base">مشروع منجز</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary-400">15+</div>
                <div className="text-gray-400 text-sm md:text-base">سنة خبرة</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary-400">500+</div>
                <div className="text-gray-400 text-sm md:text-base">عميل راضٍ</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/image/medium  (1).webp"
                  alt="شركة إعمار للتطوير العقاري"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary-500 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -top-6 -right-6 w-40 h-40 bg-primary-400 rounded-full opacity-10 blur-3xl"></div>
              
              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.2, duration: 0.5, type: "spring" }}
                className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-xl"
              >
                <div className="text-2xl font-bold text-primary-500">15+</div>
                <div className="text-sm text-gray-600">سنة خبرة</div>
              </motion.div>
            </div>

            {/* Secondary Images */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="rounded-xl overflow-hidden shadow-lg"
              >
                <img
                  src="/image/medium  (2).webp"
                  alt="مشاريعنا"
                  className="w-full h-32 object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="rounded-xl overflow-hidden shadow-lg"
              >
                <img
                  src="/image/medium  (3).webp"
                  alt="خدماتنا"
                  className="w-full h-32 object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center text-white/60">
          <span className="text-sm mb-2">انتقل للأسفل</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-3 bg-white/60 rounded-full"></div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default HeroSection

