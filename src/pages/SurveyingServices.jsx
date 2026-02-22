import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiClock, FiDollarSign, FiUsers, FiBook, FiArrowLeft, FiInfo, FiX, FiPlay } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { useLanguage } from '../contexts/LanguageContext'

const SurveyingServices = () => {
  const { t } = useLanguage()
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [videoUrl, setVideoUrl] = useState(null)
  const [showVideoInDetail, setShowVideoInDetail] = useState(false)

  // Mock data - In production, this would come from an API
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
    {
      id: 4,
      title: 'دورة Total Station (توتال ستيشن)',
      description: 'دورة متخصصة في استخدام جهاز Total Station للرفع المساحي الدقيق والتوقيع',
      duration: '45 ساعة',
      price: 6000,
      content: [
        'مقدمة في جهاز Total Station',
        'مكونات الجهاز وطرق التشغيل',
        'إعداد الجهاز والمعايرة',
        'الرفع المساحي باستخدام Total Station',
        'التوقيع والاستكشاف',
        'قياس المسافات والزوايا',
        'معالجة البيانات والتصدير',
        'التدريب العملي داخل الموقع',
        'حل المشاكل الشائعة',
        'تطبيقات عملية متقدمة',
      ],
      instructor: 'م. محمود السيد',
      instructorBio: 'خبير في أجهزة Total Station مع أكثر من 12 عامًا من الخبرة العملية',
      image: '/image/سعر-جهاز-توتال-ستيشن-سوكيا.jpg',
      videoUrl: 'https://www.youtube.com/embed/bkeLrvY5i2E',
    },
    {
      id: 5,
      title: 'دورة تعليم الأوتوكاد (AutoCAD)',
      description: 'دورة شاملة لتعلم برنامج AutoCAD من البداية إلى الاحتراف في الرسم والتصميم الهندسي',
      duration: '40 ساعة',
      price: 5000,
      content: [
        'مقدمة في برنامج AutoCAD',
        'واجهة البرنامج والأدوات الأساسية',
        'أوامر الرسم الأساسية (Line, Circle, Arc, etc.)',
        'أوامر التعديل (Move, Copy, Rotate, Scale)',
        'الطبقات (Layers) وإدارة الألوان',
        'النصوص والكتابة (Text, MText)',
        'الأبعاد والقياسات (Dimensions)',
        'الكتل والمراجع (Blocks & References)',
        'الطباعة والتصدير (Plot & Export)',
        'مشاريع عملية وتطبيقات متقدمة',
      ],
      instructor: 'م. أحمد محمد',
      instructorBio: 'خبير في برامج التصميم الهندسي مع أكثر من 15 عامًا من الخبرة في AutoCAD',
      image: '/image/maxresdefault.jpg',
      videoUrl: 'https://www.youtube.com/embed/nmA5m_7Enf8',
    },
  ]

  if (selectedCourse) {
    return (
      <div className="min-h-screen bg-gray-50 pb-16">
        <div className="container-custom">
          <button
            onClick={() => {
              setSelectedCourse(null)
              setShowVideoInDetail(false)
            }}
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

              {selectedCourse.videoUrl && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">فيديو تعريفي</h2>
                  {!showVideoInDetail ? (
                    <button
                      onClick={() => setShowVideoInDetail(true)}
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                    >
                      <FiPlay size={20} />
                      <span>شاهد الفيديو</span>
                    </button>
                  ) : (
                    <div className="bg-gray-100 rounded-xl shadow-lg overflow-hidden">
                      <div className="flex items-center justify-between p-4 bg-gray-200">
                        <h3 className="font-semibold text-gray-900">فيديو الدورة</h3>
                        <button
                          onClick={() => setShowVideoInDetail(false)}
                          className="text-gray-600 hover:text-gray-900 transition-colors"
                        >
                          <FiX size={24} />
                        </button>
                      </div>
                      <div className="aspect-video">
                        <iframe
                          src={selectedCourse.videoUrl}
                          title="فيديو الدورة"
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

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
              الدورات المساحية
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-white drop-shadow-md font-semibold">
              دورات تدريبية متخصصة وشاملة
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-custom">
        {/* Courses Packages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">الكورسات المتاحة</h2>
            <div className="w-24 h-1 mx-auto mb-6" style={{ backgroundColor: '#d6ac72' }}></div>
          </div>
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
        </motion.div>

        {/* Courses Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">الدورات التدريبية</h2>
            <div className="w-24 h-1 mx-auto mb-6" style={{ backgroundColor: '#d6ac72' }}></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden card-hover border border-gray-100"
              >
                <div 
                  className="relative h-48 overflow-hidden bg-gray-200 cursor-pointer"
                  onClick={() => course.videoUrl && setVideoUrl(course.videoUrl)}
                >
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    onError={(e) => {
                      e.target.src = '/image/medium (1).webp'
                    }}
                  />
                  {course.videoUrl && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-red-600 text-white rounded-full p-3 transform hover:scale-110 transition-transform">
                        <FiPlay size={24} />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">{course.title}</h3>
                  
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                    <div className="flex items-center text-gray-600 text-sm">
                      <FiClock className="ml-1.5" size={16} />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center font-bold text-base" style={{ color: '#d6ac72' }}>
                      <FiDollarSign size={16} />
                      <span>{course.price.toLocaleString()} ج.م</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {course.videoUrl && (
                      <button
                        onClick={() => setVideoUrl(course.videoUrl)}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold text-sm"
                      >
                        <FiPlay size={16} />
                        <span>شاهد الفيديو</span>
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="w-full btn-primary text-sm py-2.5"
                    >
                      عرض التفاصيل
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {videoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
            onClick={() => setVideoUrl(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative bg-black rounded-lg overflow-hidden max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setVideoUrl(null)}
                className="absolute top-4 left-4 z-10 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors"
              >
                <FiX size={24} />
              </button>
              <div className="aspect-video">
                <iframe
                  src={videoUrl}
                  title="فيديو الدورة"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SurveyingServices

