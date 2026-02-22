import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import {
  FiHome,
  FiMap,
  FiTrendingUp,
  FiLayers,
  FiTool,
  FiNavigation,
  FiDroplet,
} from 'react-icons/fi'

const ServicesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const services = [
    {
      icon: FiHome,
      title: 'المقاولات العامة',
      description: 'نقدم خدمات المقاولات العامة بمعايير دولية وجودة عالية',
      color: 'bg-blue-500',
    },
    {
      icon: FiMap,
      title: 'الأعمال المساحية',
      description: 'خدمات مساحية دقيقة ومحترفة لجميع أنواع المشاريع',
      color: 'bg-green-500',
    },
    {
      icon: FiTrendingUp,
      title: 'التسويق العقاري',
      description: 'حلول تسويقية متكاملة لتعزيز قيمة المشاريع العقارية',
      color: 'bg-purple-500',
    },
    {
      icon: FiLayers,
      title: 'أعمال البناء',
      description: 'تشييد وبناء المباني السكنية والتجارية بأعلى المعايير',
      color: 'bg-orange-500',
    },
    {
      icon: FiTool,
      title: 'أعمال التشطيب',
      description: 'تشطيب فاخر وعصري يناسب جميع الأذواق والميزانيات',
      color: 'bg-pink-500',
    },
    {
      icon: FiNavigation,
      title: 'أعمال الطرق',
      description: 'تنفيذ مشاريع الطرق والبنية التحتية بجودة عالية',
      color: 'bg-yellow-500',
    },
    {
      icon: FiDroplet,
      title: 'شبكات المياه والصرف',
      description: 'تصميم وتنفيذ شبكات المياه والصرف بكفاءة عالية',
      color: 'bg-cyan-500',
    },
  ]

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-custom">
            خدماتنا
          </h2>
          <div className="services-section-divider"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            نقدم مجموعة شاملة من الخدمات المتخصصة في التطوير العقاري والمقاولات
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-white p-8 rounded-xl shadow-lg card-hover border border-gray-100"
            >
              <div className={`w-16 h-16 ${service.color} rounded-xl flex items-center justify-center mb-6 text-white`}>
                <service.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
              <Link
                to="/services"
                className="services-section-link inline-flex items-center"
              >
                اعرف المزيد
                <span className="mr-2">←</span>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-center mt-12"
        >
          <Link to="/services" className="btn-primary text-lg">
            عرض جميع الخدمات
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default ServicesSection

