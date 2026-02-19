import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiClock, FiDollarSign, FiBook, FiUsers, FiCheck } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

const CourseDetail = () => {
  const { courseId } = useParams()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)

  // Mock data - In production, this would come from an API
  const courses = {
    'surveying-package': {
      id: 'surveying-package',
      title: 'باكدج المساحة (الميزان - التوتال ستيشن)',
      description: 'دورة شاملة في المساحة التطبيقية تغطي جميع أساسيات المساحة المستوية والجيوديسية مع التدريب العملي على الأجهزة المساحية الحديثة',
      duration: '60 ساعة',
      price: 8000,
      level: 'مبتدئ - متقدم',
      instructor: 'م. محمود أحمد',
      instructorBio: 'خبير مساحي مع أكثر من 15 عامًا من الخبرة في المساحة التطبيقية',
      content: [
        'مقدمة في المساحة المستوية والجيوديسية',
        'التدريب على جهاز الميزان (Level)',
        'التدريب على جهاز GPS',
        'التدريب على جهاز Total Station',
        'طرق تنفيذ الأعمال المساحية المطلوبة',
        'التدريب العملي داخل الموقع',
        'معالجة البيانات المساحية',
        'تطبيقات عملية شاملة'
      ],
      benefits: [
        'شهادة معتمدة من الشركة',
        'كتب ومذكرات علمية',
        'تدريب عملي على الأجهزة',
        'مساعدة في إيجاد فرص عمل',
        'كارنية مزاولة المهنة'
      ],
      image: '/image/medium (5).webp',
      whatsappNumber: '01011942703'
    },
    'autocad': {
      id: 'autocad',
      title: 'الأوتوكاد',
      description: 'دورة متكاملة في برنامج AutoCAD من الأساسيات إلى المستوى المتقدم، مع التركيز على التطبيقات المساحية والهندسية',
      duration: '40 ساعة',
      price: 5000,
      level: 'مبتدئ - متوسط',
      instructor: 'م. سارة محمد',
      instructorBio: 'خبيرة في برامج التصميم الهندسي مع أكثر من 10 أعوام من الخبرة',
      content: [
        'مقدمة في برنامج AutoCAD',
        'الأوامر الأساسية والرسم',
        'التعديل والتحرير',
        'طباعة المخططات',
        'التطبيقات المساحية',
        'مشاريع عملية',
        'نصائح واحترافيات'
      ],
      benefits: [
        'شهادة معتمدة',
        'ملفات تدريبية',
        'مشاريع عملية',
        'دعم فني بعد الدورة'
      ],
      image: '/image/medium (6).webp',
      whatsappNumber: '01011942703'
    },
    'civil-3d': {
      id: 'civil-3d',
      title: 'سيفيل 3D',
      description: 'دورة متخصصة في برنامج Civil 3D للتطبيقات المدنية والمساحية، من الأساسيات إلى المستوى المتقدم',
      duration: '50 ساعة',
      price: 7000,
      level: 'متوسط - متقدم',
      instructor: 'د. أحمد علي',
      instructorBio: 'خبير في برامج التصميم المدني والمساحي',
      content: [
        'مقدمة في Civil 3D',
        'إنشاء الأسطح والمنحنيات',
        'التصميم الطرقي',
        'التصميم المساحي',
        'معالجة البيانات المساحية',
        'التطبيقات العملية',
        'مشاريع متقدمة'
      ],
      benefits: [
        'شهادة معتمدة',
        'ملفات تدريبية شاملة',
        'مشاريع عملية',
        'دعم فني مستمر'
      ],
      image: '/image/medium (7).webp',
      whatsappNumber: '01011942703'
    },
    '3d-max': {
      id: '3d-max',
      title: '3D Max',
      description: 'دورة شاملة في برنامج 3D Max للتصميم ثلاثي الأبعاد والتقديم المعماري',
      duration: '45 ساعة',
      price: 6000,
      level: 'مبتدئ - متوسط',
      instructor: 'م. يوسف محمود',
      instructorBio: 'مصمم معماري متخصص في التصميم ثلاثي الأبعاد',
      content: [
        'مقدمة في 3D Max',
        'النمذجة ثلاثية الأبعاد',
        'المواد والإضاءة',
        'الكاميرات والحركة',
        'التقديم والرندر',
        'مشاريع عملية',
        'نصائح احترافية'
      ],
      benefits: [
        'شهادة معتمدة',
        'ملفات تدريبية',
        'مكتبة مواد مجانية',
        'دعم فني'
      ],
      image: '/image/medium (5).webp',
      whatsappNumber: '01011942703'
    },
    'revit': {
      id: 'revit',
      title: 'الريفيت',
      description: 'دورة متخصصة في برنامج Revit للتصميم المعماري والهندسي باستخدام تقنية BIM',
      duration: '50 ساعة',
      price: 7000,
      level: 'مبتدئ - متقدم',
      instructor: 'م. نورا أحمد',
      instructorBio: 'خبيرة في تقنيات BIM والتصميم المعماري',
      content: [
        'مقدمة في Revit و BIM',
        'إنشاء المشاريع',
        'النمذجة المعمارية',
        'الرسومات والتفاصيل',
        'التقديم والتصور',
        'التنسيق مع الفرق',
        'مشاريع متقدمة'
      ],
      benefits: [
        'شهادة معتمدة',
        'ملفات تدريبية',
        'مكتبة عناصر مجانية',
        'دعم فني مستمر'
      ],
      image: '/image/medium (6).webp',
      whatsappNumber: '01011942703'
    }
  }

  useEffect(() => {
    const foundCourse = courses[courseId]
    if (foundCourse) {
      setCourse(foundCourse)
    }
    setLoading(false)
  }, [courseId])

  const handleWhatsApp = () => {
    const message = `مرحباً، أريد الاستفسار عن دورة: ${course?.title}`
    const url = `https://wa.me/${course?.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: '#d6ac72' }}></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900 mb-4">الدورة غير موجودة</p>
          <Link to="/surveying-services" className="btn-primary inline-block">
            العودة إلى الدورات
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="container-custom">
        {/* Back Button */}
        <Link
          to="/surveying-services"
          className="flex items-center mb-6 mt-8"
          style={{ color: '#d6ac72' }}
        >
          <FiArrowLeft className="ml-2" size={20} />
          <span className="font-semibold">العودة إلى الدورات</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Hero Image */}
          <div className="relative h-64 md:h-96">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                {course.title}
              </h1>
              <p className="text-lg md:text-xl text-white/90 drop-shadow-md">
                {course.description}
              </p>
            </div>
          </div>

          <div className="p-6 md:p-8">
            {/* Course Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="flex items-center space-x-3 space-x-reverse bg-primary-50 p-4 rounded-lg">
                <FiClock size={24} style={{ color: '#d6ac72' }} />
                <div>
                  <p className="text-sm text-gray-600">المدة</p>
                  <p className="font-bold text-gray-900">{course.duration}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 space-x-reverse bg-primary-50 p-4 rounded-lg">
                <FiDollarSign size={24} style={{ color: '#d6ac72' }} />
                <div>
                  <p className="text-sm text-gray-600">السعر</p>
                  <p className="font-bold text-gray-900">{course.price.toLocaleString()} جنيه</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 space-x-reverse bg-primary-50 p-4 rounded-lg">
                <FiUsers size={24} style={{ color: '#d6ac72' }} />
                <div>
                  <p className="text-sm text-gray-600">المستوى</p>
                  <p className="font-bold text-gray-900">{course.level}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 space-x-reverse bg-primary-50 p-4 rounded-lg">
                <FiBook size={24} style={{ color: '#d6ac72' }} />
                <div>
                  <p className="text-sm text-gray-600">المدرب</p>
                  <p className="font-bold text-gray-900">{course.instructor}</p>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4" style={{ color: '#d6ac72' }}>
                محتوى الدورة
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {course.content.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 space-x-reverse bg-gray-50 p-4 rounded-lg">
                    <FiCheck className="mt-1 flex-shrink-0" size={20} style={{ color: '#d6ac72' }} />
                    <span className="text-gray-700 text-base">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits Section */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4" style={{ color: '#d6ac72' }}>
                المميزات
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {course.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3 space-x-reverse bg-primary-50 p-4 rounded-lg">
                    <FiCheck className="mt-1 flex-shrink-0" size={20} style={{ color: '#d6ac72' }} />
                    <span className="text-gray-800 font-semibold text-base">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructor Section */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4" style={{ color: '#d6ac72' }}>
                عن المدرب
              </h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-800 font-bold text-lg mb-2">{course.instructor}</p>
                <p className="text-gray-700 text-base">{course.instructorBio}</p>
              </div>
            </div>

            {/* Booking Section */}
            <div 
              className="rounded-xl p-8 text-center text-white mb-8"
              style={{ background: 'linear-gradient(135deg, #d6ac72 0%, #c49a5f 50%, #b2884c 100%)' }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 drop-shadow-lg">
                طريقة الحجز
              </h2>
              <p className="text-lg md:text-xl mb-6 drop-shadow-md">
                للحجز والاستعلام عن الدورة، يمكنك التواصل معنا عبر واتساب
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleWhatsApp}
                  className="bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-50 transition-colors flex items-center justify-center gap-3 shadow-lg"
                >
                  <FaWhatsapp size={24} />
                  <span>حجز عبر واتساب</span>
                </button>
                <a
                  href={`tel:${course.whatsappNumber}`}
                  className="bg-white text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-3 shadow-lg"
                >
                  <span>اتصل بنا: {course.whatsappNumber}</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default CourseDetail

