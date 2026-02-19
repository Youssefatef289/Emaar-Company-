import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiClock, FiDollarSign, FiUsers, FiBook, FiArrowLeft, FiInfo } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
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
      {/* Hero Section */}
      <div 
        className="relative py-20 md:py-28 overflow-hidden mb-16"
        style={{ background: 'linear-gradient(135deg, #d6ac72 0%, #c49a5f 50%, #b2884c 100%)' }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'url(/image/medium (5).webp)', 
            backgroundSize: 'cover', 
            backgroundPosition: 'center' 
          }}></div>
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-lg">
              الأعمال المساحية
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-white drop-shadow-md font-semibold">
              خدمات مساحية احترافية ودورات تدريبية متخصصة
            </p>
            <p className="text-base md:text-lg text-white/90 drop-shadow-md max-w-2xl mx-auto leading-relaxed">
              نقدم لكم أفضل الخدمات المساحية والدورات التدريبية الشاملة من البداية إلى الاحتراف
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 text-white">
                <p className="text-sm font-semibold">📐 مساحة تطبيقية</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 text-white">
                <p className="text-sm font-semibold">🎓 دورات تدريبية</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 text-white">
                <p className="text-sm font-semibold">💼 شهادات معتمدة</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container-custom">

        {/* Diploma Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header with Golden Background */}
            <div 
              className="p-8 md:p-12 text-center text-white"
              style={{ background: 'linear-gradient(135deg, #d6ac72 0%, #c49a5f 50%, #b2884c 100%)' }}
            >
              <div className="mb-4">
                <span className="text-4xl md:text-5xl">📢</span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 drop-shadow-lg leading-tight">
                يعلن مكتب إعمار للأعمال المساحية
              </h2>
              <p className="text-xl md:text-2xl lg:text-3xl font-bold drop-shadow-md mb-3" style={{ color: '#fff8e7' }}>
                دبلومة المساحة المتكاملة
              </p>
              <p className="text-base md:text-lg lg:text-xl mt-4 drop-shadow-md max-w-3xl mx-auto leading-relaxed">
                في كورس واحد متكامل وشامل من البداية إلى الاحتراف
              </p>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              {/* Course Content */}
              <div className="mb-10">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center" style={{ color: '#d6ac72' }}>
                  محتوى الدبلومة
                </h3>
                <div className="space-y-5">
                  <div className="bg-gradient-to-l from-gray-50 to-primary-50 rounded-xl p-5 md:p-6 border-r-4 shadow-sm hover:shadow-md transition-shadow" style={{ borderRightColor: '#d6ac72' }}>
                    <p className="text-gray-900 font-bold text-lg md:text-xl mb-3" style={{ color: '#b2884c' }}>
                      1- دراسة المساحة المستوية والمساحة الجيوديسية
                    </p>
                    <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                      بجميع مراحلها - التعليم والتدريب داخل الموقع على الأجهزة المساحية (Level - G.P.S - Total station) وطرق تنفيذ الأعمال المساحية المطلوبة
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-l from-gray-50 to-primary-50 rounded-xl p-5 md:p-6 border-r-4 shadow-sm hover:shadow-md transition-shadow" style={{ borderRightColor: '#d6ac72' }}>
                    <p className="text-gray-900 font-bold text-lg md:text-xl mb-3" style={{ color: '#b2884c' }}>
                      2- التدريب على البرامج الهندسية والمساحية
                    </p>
                    <p className="text-gray-700 text-base md:text-lg leading-relaxed font-semibold">
                      (AUTOCAD - SURFER)
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-l from-gray-50 to-primary-50 rounded-xl p-5 md:p-6 border-r-4 shadow-sm hover:shadow-md transition-shadow" style={{ borderRightColor: '#d6ac72' }}>
                    <p className="text-gray-900 font-bold text-lg md:text-xl" style={{ color: '#b2884c' }}>
                      3- شرح برنامج Civil 3D
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-l from-gray-50 to-primary-50 rounded-xl p-5 md:p-6 border-r-4 shadow-sm hover:shadow-md transition-shadow" style={{ borderRightColor: '#d6ac72' }}>
                    <p className="text-gray-900 font-bold text-lg md:text-xl mb-3" style={{ color: '#b2884c' }}>
                      4- مقدمة عن نظم المعلومات الجغرافية
                    </p>
                    <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                      وشرح برنامج Arc GIS
                    </p>
                  </div>
                </div>
              </div>

              {/* Certificates */}
              <div className="mb-10">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center" style={{ color: '#d6ac72' }}>
                  يحصل المتدرب في نهاية الدبلومة على
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex items-start space-x-3 space-x-reverse bg-gradient-to-l from-primary-50 to-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-primary-100">
                    <FiBook size={28} style={{ color: '#d6ac72' }} className="flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-gray-900 font-bold text-lg mb-1">كتب ومذكرات علمية</p>
                      <p className="text-gray-600 text-base">في المساحة ونظم المعلومات الجغرافية</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 space-x-reverse bg-gradient-to-l from-primary-50 to-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-primary-100">
                    <FiBook size={28} style={{ color: '#d6ac72' }} className="flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-gray-900 font-bold text-lg mb-1">شهادة خبرة معتمدة</p>
                      <p className="text-gray-600 text-base">من الشركة</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 space-x-reverse bg-gradient-to-l from-primary-50 to-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-primary-100">
                    <FiBook size={28} style={{ color: '#d6ac72' }} className="flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-gray-900 font-bold text-lg">شهادة قياس مهارة</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 space-x-reverse bg-gradient-to-l from-primary-50 to-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-primary-100">
                    <FiBook size={28} style={{ color: '#d6ac72' }} className="flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-gray-900 font-bold text-lg">كارنية مزاولة المهنة</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 space-x-reverse bg-gradient-to-l from-primary-50 to-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-primary-100">
                    <FiBook size={28} style={{ color: '#d6ac72' }} className="flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-gray-900 font-bold text-lg">كارنية رابطة مهندسي المساحة</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 space-x-reverse bg-gradient-to-l from-primary-50 to-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-primary-100">
                    <FiBook size={28} style={{ color: '#d6ac72' }} className="flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-gray-900 font-bold text-lg mb-1">تغيير المسمى الوظيفي</p>
                      <p className="text-gray-600 text-base">في البطاقة الشخصية</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mb-10 space-y-5">
                <div className="bg-gradient-to-l from-blue-50 to-blue-100 rounded-xl p-5 md:p-6 border-r-4 shadow-sm" style={{ borderRightColor: '#3b82f6' }}>
                  <p className="text-gray-900 font-bold text-lg md:text-xl">
                    ✨ مساعدة المتميزين لإيجاد فرص عمل داخل أو خارج مصر
                  </p>
                </div>
                
                <div className="bg-gradient-to-l from-green-50 to-green-100 rounded-xl p-5 md:p-6 border-r-4 shadow-sm" style={{ borderRightColor: '#10b981' }}>
                  <p className="text-gray-900 font-bold text-lg md:text-xl mb-2">
                    يوجد أيضاً بشركة إعمار دورة تفصيلية عن الإشراف المعماري
                  </p>
                  <p className="text-gray-700 text-base">
                    باحترافية كاملة
                  </p>
                </div>
                
                <div className="bg-gradient-to-l from-yellow-50 to-yellow-100 rounded-xl p-5 md:p-6 border-r-4 shadow-sm" style={{ borderRightColor: '#f59e0b' }}>
                  <p className="text-gray-900 font-bold text-lg md:text-xl">
                    🎯 هدفنا الرئيسي هو إتقان المتدرب لمجال المساحة بمنتهى الإتقان والأمانة
                  </p>
                  <p className="text-gray-700 text-base mt-2">
                    على أيدي أساتذة ومهندسين متخصصين في مجال المساحة
                  </p>
                </div>
              </div>

              {/* Contact Info */}
              <div 
                className="rounded-xl p-8 md:p-10 text-center text-white shadow-lg"
                style={{ background: 'linear-gradient(135deg, #d6ac72 0%, #c49a5f 50%, #b2884c 100%)' }}
              >
                <h3 className="text-2xl md:text-3xl font-bold mb-6 drop-shadow-lg">
                  للحجز والاستعلام
                </h3>
                <a 
                  href="tel:01011942703"
                  className="text-3xl md:text-4xl lg:text-5xl font-bold hover:underline drop-shadow-md block transition-transform hover:scale-105"
                >
                  01011942703
                </a>
              </div>

              {/* Courses Packages */}
              <div className="mt-10">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center" style={{ color: '#d6ac72' }}>
                  الكورسات المتاحة
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                  {[
                    { 
                      id: 'surveying-package',
                      title: 'باكدج المساحة (الميزان - التوتال ستيشن)',
                      duration: '60 ساعة',
                      price: 8000
                    },
                    { 
                      id: 'autocad',
                      title: 'الأوتوكاد',
                      duration: '40 ساعة',
                      price: 5000
                    },
                    { 
                      id: 'civil-3d',
                      title: 'سيفيل 3D',
                      duration: '50 ساعة',
                      price: 7000
                    },
                    { 
                      id: '3d-max',
                      title: '3D Max',
                      duration: '45 ساعة',
                      price: 6000
                    },
                    { 
                      id: 'revit',
                      title: 'الريفيت',
                      duration: '50 ساعة',
                      price: 7000
                    }
                  ].map((course) => {
                    const handleWhatsApp = () => {
                      const message = `مرحباً، أريد الاستفسار عن دورة: ${course.title}`
                      const url = `https://wa.me/201011942703?text=${encodeURIComponent(message)}`
                      window.open(url, '_blank')
                    }

                    return (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-xl border-2 shadow-lg hover:shadow-xl transition-all overflow-hidden"
                        style={{ borderColor: '#d6ac72' }}
                      >
                        <div className="p-5">
                          <h4 className="text-gray-900 font-bold text-lg mb-3 leading-tight min-h-[3rem]">
                            {course.title}
                          </h4>
                          <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <FiClock className="ml-1" size={16} />
                              <span>{course.duration}</span>
                            </div>
                            <div className="font-bold" style={{ color: '#d6ac72' }}>
                              {course.price.toLocaleString()} ج.م
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Link
                              to={`/surveying-services/course/${course.id}`}
                              className="w-full bg-white border-2 text-center py-2.5 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
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
                              <FiInfo size={18} />
                              <span>التفاصيل</span>
                            </Link>
                            <button
                              onClick={handleWhatsApp}
                              className="w-full bg-green-500 text-white py-2.5 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                            >
                              <FaWhatsapp size={18} />
                              <span>واتساب</span>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
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

