import { motion } from 'framer-motion'
import {
  FiHome,
  FiMap,
  FiTrendingUp,
  FiLayers,
  FiTool,
  FiNavigation,
  FiDroplet,
} from 'react-icons/fi'

const Services = () => {
  const services = [
    {
      icon: FiHome,
      title: 'المقاولات العامة',
      description: 'نقدم خدمات المقاولات العامة بمعايير عالمية وجودة عالية، مع فريق محترف وذو خبرة واسعة في تنفيذ المشاريع الكبرى',
      features: [
        'تنفيذ المشاريع السكنية والتجارية',
        'إدارة المشاريع المتكاملة',
        'ضمان الجودة والالتزام بالمواعيد',
        'استخدام أحدث التقنيات والمواد',
      ],
      color: 'bg-blue-500',
    },
    {
      icon: FiMap,
      title: 'الأعمال المساحية',
      description: 'خدمات مساحية دقيقة ومحترفة لجميع أنواع المشاريع، باستخدام أحدث الأجهزة والتقنيات',
      features: [
        'رفع مساحي دقيق',
        'تحديد الحدود والمساحات',
        'خرائط طبوغرافية',
        'تقارير مساحية معتمدة',
      ],
      color: 'bg-green-500',
    },
    {
      icon: FiTrendingUp,
      title: 'التسويق العقاري',
      description: 'حلول تسويقية متكاملة لتعزيز قيمة المشاريع العقارية وزيادة المبيعات',
      features: [
        'استراتيجيات تسويقية متكاملة',
        'إدارة المبيعات',
        'تطوير العلامة التجارية',
        'حملات إعلانية فعالة',
      ],
      color: 'bg-purple-500',
    },
    {
      icon: FiLayers,
      title: 'أعمال المباني',
      description: 'بناء وتشييد المباني السكنية والتجارية بأعلى المعايير والجودة',
      features: [
        'تصميم معماري عصري',
        'تنفيذ دقيق للمواصفات',
        'استخدام مواد عالية الجودة',
        'مراقبة مستمرة للجودة',
      ],
      color: 'bg-orange-500',
    },
    {
      icon: FiTool,
      title: 'التشطيبات',
      description: 'تشطيبات فاخرة وعصرية تناسب جميع الأذواق والميزانيات',
      features: [
        'تشطيبات داخلية وخارجية',
        'أعمال الدهانات والديكور',
        'تركيب الأرضيات والبلاط',
        'أعمال السباكة والكهرباء',
      ],
      color: 'bg-pink-500',
    },
    {
      icon: FiNavigation,
      title: 'أعمال الطرق',
      description: 'تنفيذ مشاريع الطرق والبنية التحتية بجودة عالية',
      features: [
        'رصف الطرق والشوارع',
        'أعمال الصرف الصحي',
        'إنارة الطرق',
        'أعمال اللاندسكيب',
      ],
      color: 'bg-yellow-500',
    },
    {
      icon: FiDroplet,
      title: 'شبكات المياه والصرف الصحي',
      description: 'تصميم وتنفيذ شبكات المياه والصرف الصحي بكفاءة عالية',
      features: [
        'تصميم شبكات المياه',
        'تنفيذ شبكات الصرف الصحي',
        'صيانة وإصلاح الشبكات',
        'تركيب محطات المعالجة',
      ],
      color: 'bg-cyan-500',
    },
  ]

  return (
    <div className="pt-32 pb-16 bg-gray-50 min-h-screen">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            خدماتنا
          </h1>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            نقدم مجموعة شاملة من الخدمات المتخصصة في مجال التطوير العقاري والمقاولات
          </p>
        </motion.div>

        <div className="space-y-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
            >
              <div className="flex-1">
                <div className={`w-20 h-20 ${service.color} rounded-xl flex items-center justify-center mb-6 text-white`}>
                  <service.icon size={40} />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                  {service.title}
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <span className="text-primary-600 ml-3 mt-1">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={`/image/medium  (${index + 18}).webp`}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Services

