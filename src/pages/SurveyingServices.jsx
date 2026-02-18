import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiClock, FiDollarSign, FiUsers, FiBook, FiArrowLeft } from 'react-icons/fi'
import { useLanguage } from '../contexts/LanguageContext'

const SurveyingServices = () => {
  const { t } = useLanguage()
  const [selectedCourse, setSelectedCourse] = useState(null)

  // Mock data - In production, this would come from an API
  const services = [
    {
      id: 1,
      title: 'المساحة التطبيقية',
      description: 'خدمات المساحة التطبيقية الشاملة لجميع أنواع المشاريع',
      icon: '📐',
    },
    {
      id: 2,
      title: 'الرفع المساحي',
      description: 'رفع مساحي دقيق باستخدام أحدث الأجهزة والتقنيات',
      icon: '📏',
    },
    {
      id: 3,
      title: 'التخطيط والتصميم',
      description: 'خدمات التخطيط والتصميم المساحي للمشاريع الكبرى',
      icon: '🗺️',
    },
  ]

  const courses = [
    {
      id: 1,
      title: 'دورة المساحة التطبيقية المتقدمة',
      description: 'دورة شاملة تغطي جميع أساسيات المساحة التطبيقية والتقنيات الحديثة',
      duration: '40 ساعة',
      price: 5000,
      content: [
        'مقدمة في المساحة التطبيقية',
        'استخدام أجهزة المساحة الحديثة',
        'الرفع المساحي والتوقيع',
        'المساحة الجيوديسية',
        'المساحة التصويرية',
        'تطبيقات عملية',
      ],
      instructor: 'د. محمد أحمد',
      instructorBio: 'خبير مساحي مع أكثر من 20 عامًا من الخبرة',
      image: '/image/medium (5).webp',
    },
    {
      id: 2,
      title: 'دورة الرفع المساحي باستخدام GPS',
      description: 'تعلم استخدام تقنيات GPS في الرفع المساحي',
      duration: '30 ساعة',
      price: 4000,
      content: [
        'مقدمة في أنظمة GPS',
        'استخدام أجهزة GPS المساحية',
        'معالجة البيانات',
        'تطبيقات عملية',
      ],
      instructor: 'م. أحمد محمود',
      instructorBio: 'متخصص في أنظمة GPS والمساحة الحديثة',
      image: '/image/medium (6).webp',
    },
    {
      id: 3,
      title: 'دورة المساحة التصويرية',
      description: 'تعلم تقنيات المساحة التصويرية والاستشعار عن بعد',
      duration: '35 ساعة',
      price: 4500,
      content: [
        'أساسيات المساحة التصويرية',
        'التصوير الجوي',
        'معالجة الصور',
        'الاستشعار عن بعد',
        'تطبيقات عملية',
      ],
      instructor: 'د. سارة علي',
      instructorBio: 'خبيرة في المساحة التصويرية والاستشعار عن بعد',
      image: '/image/medium (7).webp',
    },
  ]

  if (selectedCourse) {
    return (
      <div className="min-h-screen bg-gray-50 pb-16">
        <div className="container-custom">
          <button
            onClick={() => setSelectedCourse(null)}
            className="flex items-center mb-6"
            style={{ color: '#d6ac72' }}
          >
            <FiArrowLeft className="ml-2" size={20} />
            <span>العودة إلى الدورات</span>
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="relative h-96">
              <img
                src={selectedCourse.image}
                alt={selectedCourse.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedCourse.title}</h1>
              <p className="text-lg text-gray-600 mb-6">{selectedCourse.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center space-x-3 space-x-reverse bg-primary-50 p-4 rounded-lg">
                  <FiClock size={24} style={{ color: '#d6ac72' }} />
                  <div>
                    <p className="text-sm text-gray-600">المدة</p>
                    <p className="font-bold text-gray-900">{selectedCourse.duration}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 space-x-reverse bg-primary-50 p-4 rounded-lg">
                  <FiDollarSign size={24} style={{ color: '#d6ac72' }} />
                  <div>
                    <p className="text-sm text-gray-600">السعر</p>
                    <p className="font-bold text-gray-900">{selectedCourse.price.toLocaleString()} جنيه</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 space-x-reverse bg-primary-50 p-4 rounded-lg">
                  <FiUsers size={24} style={{ color: '#d6ac72' }} />
                  <div>
                    <p className="text-sm text-gray-600">المدرب</p>
                    <p className="font-bold text-gray-900">{selectedCourse.instructor}</p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">المحتوى التعليمي</h2>
                <ul className="space-y-3">
                  {selectedCourse.content.map((item, index) => (
                    <li key={index} className="flex items-start space-x-3 space-x-reverse">
                      <FiBook className="mt-1 flex-shrink-0" size={18} style={{ color: '#d6ac72' }} />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">عن المدرب</h2>
                <p className="text-gray-700">{selectedCourse.instructorBio}</p>
              </div>

              <Link
                to={`/surveying-services/course/${selectedCourse.id}/book`}
                className="btn-primary inline-block text-center w-full md:w-auto"
              >
                احجز الدورة الآن
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            الأعمال المساحية
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            خدمات مساحية احترافية ودورات تدريبية متخصصة
          </p>
        </motion.div>

        {/* Services Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">خدماتنا</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-8 text-center card-hover"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Courses Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">الدورات التدريبية</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-gray-600">
                      <FiClock className="ml-2" size={18} />
                      <span className="text-sm">{course.duration}</span>
                    </div>
                    <div className="flex items-center font-bold" style={{ color: '#d6ac72' }}>
                      <FiDollarSign size={18} />
                      <span>{course.price.toLocaleString()} جنيه</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="w-full btn-primary"
                  >
                    عرض التفاصيل
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default SurveyingServices

