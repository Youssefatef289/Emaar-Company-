import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMapPin, FiCalendar, FiHome, FiDollarSign, FiArrowLeft, FiLayers } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const ProjectDetail = () => {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  // Mock data - In production, this would come from an API
  const projects = {
    1: {
      id: 1,
      title: 'أبراج إعمار',
      location: 'مدينة نصر، القاهرة',
      address: 'شارع مصطفى النحاس، مدينة نصر، القاهرة',
      type: 'سكني',
      status: 'قيد الإنشاء',
      completionDate: '2025-12-31',
      description: 'مجمع أبراج سكني فاخر يضم وحدات سكنية عصرية بتشطيبات راقية ومرافق متكاملة في موقع استراتيجي بمدينة نصر',
      longDescription: `
        أبراج إعمار هو مشروع سكني فاخر يقع في قلب مدينة نصر، أحد أرقى المناطق السكنية في القاهرة. 
        يتميز المشروع بتصميم عصري يجمع بين الفخامة والراحة، مع مراعاة أعلى معايير الجودة في البناء والتشطيب.
        
        يضم المشروع 15 طابقاً مع 240 وحدة سكنية متنوعة تتراوح بين الشقق العادية والدوبلكس والبنتهاوس، 
        بالإضافة إلى وحدات تجارية في الطابق الأرضي.
        
        المرافق والخدمات:
        - نادي رياضي مجهز بأحدث الأجهزة
        - مساحات خضراء واسعة
        - موقف سيارات تحت الأرض
        - أمن 24/7
        - خدمات صيانة متكاملة
        - مصاعد عالية السرعة
        - نظام إطفاء حريق متكامل
        - أندية اجتماعية
        - مناطق ترفيهية للأطفال
      `,
      images: [
        '/image/Our current projects/Emaar Towers/Emaar Towers (1).jpg',
        '/image/Our current projects/Emaar Towers/Emaar Towers (2).jpg',
        '/image/Our current projects/Emaar Towers/Emaar Towers (3).jpg',
        '/image/Our current projects/Emaar Towers/Emaar Towers (4).jpg',
        '/image/Our current projects/Emaar Towers/Emaar Towers (5).jpg',
        '/image/Our current projects/Emaar Towers/Emaar Towers Split (1).jpg',
        '/image/Our current projects/Emaar Towers/Emaar Towers Split (2).jpg',
        '/image/Our current projects/Emaar Towers/Emaar Towers Split (3).jpg',
        '/image/Our current projects/Emaar Towers/Emaar Towers Split (4).jpg',
        '/image/Our current projects/Emaar Towers/Emaar Towers Split (5).jpg',
      ],
      video: null,
      units: 240,
      floors: 15,
      progress: 75,
      startingPrice: 3500000,
      features: [
        'نادي رياضي مجهز',
        'مساحات خضراء واسعة',
        'موقف سيارات تحت الأرض',
        'أمن 24/7',
        'خدمات صيانة متكاملة',
        'مصاعد عالية السرعة',
        'نظام إطفاء حريق متكامل',
      ],
      coordinates: { lat: 30.0626, lng: 31.3197 }, // Mock coordinates for Nasr City
    },
    2: {
      id: 2,
      title: 'رويال سيتي',
      location: 'الشروق، القاهرة',
      address: 'طريق القاهرة - السويس الصحراوي، الشروق، القاهرة',
      type: 'سكني',
      status: 'قيد الإنشاء',
      completionDate: '2025-09-30',
      description: 'مجمع سكني راقي بتشطيبات فاخرة ومرافق متكاملة في منطقة الشروق المتميزة، يضم وحدات سكنية متنوعة بأسعار تنافسية',
      longDescription: `
        رويال سيتي هو مجمع سكني راقي يقع في منطقة الشروق المتميزة، يتميز بتصميم عصري ومرافق متكاملة.
        يضم المشروع 12 طابقاً مع 180 وحدة سكنية متنوعة بتشطيبات فاخرة.
        
        يتميز المشروع بموقع استراتيجي على طريق القاهرة - السويس الصحراوي، مما يوفر سهولة الوصول 
        إلى جميع مناطق القاهرة الكبرى.
        
        المرافق والخدمات:
        - حدائق واسعة
        - منطقة ألعاب للأطفال
        - نادي اجتماعي
        - موقف سيارات
        - أمن 24/7
        - خدمات صيانة
        - مسجد
        - مناطق ترفيهية
        - مساحات خضراء
      `,
      images: [
        '/image/Our current projects/Royal city/royal city (1).jpg',
        '/image/Our current projects/Royal city/royal city (2).jpg',
        '/image/Our current projects/Royal city/royal city (3).jpg',
        '/image/Our current projects/Royal city/Royal City Apartment (1).jpg',
        '/image/Our current projects/Royal city/Royal City Apartment (2).jpg',
        '/image/Our current projects/Royal city/Royal City Apartment (3).jpg',
        '/image/Our current projects/Royal city/Royal City Apartment (4).jpg',
      ],
      video: null,
      units: 180,
      floors: 12,
      progress: 55,
      startingPrice: 2800000,
      features: [
        'حدائق واسعة',
        'منطقة ألعاب للأطفال',
        'نادي اجتماعي',
        'موقف سيارات',
        'أمن 24/7',
        'خدمات صيانة',
        'مسجد',
      ],
      coordinates: { lat: 30.1286, lng: 31.6250 }, // Mock coordinates for Shorouk
    },
  }

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProject(projects[id])
      setLoading(false)
    }, 500)
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: '#d6ac72' }}></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 pb-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">المشروع غير موجود</p>
          <Link to="/current-projects" style={{ color: '#d6ac72' }}>
            العودة إلى المشاريع
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="container-custom max-w-6xl">
        {/* Back Button */}
        <Link
          to="/current-projects"
          className="flex items-center mb-6"
          style={{ color: '#d6ac72' }}
        >
          <FiArrowLeft className="ml-2" size={20} />
          <span>العودة إلى المشاريع</span>
        </Link>

        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8"
        >
          <div className="relative h-96 overflow-hidden">
            <img
              src={project.images[0]}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 right-6 text-white">
              <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="flex items-center">
                  <FiMapPin className="ml-1" size={18} />
                  <span>{project.location}</span>
                </div>
                <span className="px-3 py-1 rounded-full text-sm font-semibold text-white" style={{ backgroundColor: '#d6ac72' }}>
                  {project.type}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">عن المشروع</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {project.longDescription || project.description}
              </p>
            </motion.div>

            {/* Images Gallery */}
            {project.images.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">معرض الصور</h2>
                <div className="grid grid-cols-2 gap-4">
                  {project.images.slice(1).map((image, index) => (
                    <div key={index} className="relative h-64 rounded-lg overflow-hidden">
                      <img
                        src={image}
                        alt={`${project.title} - ${index + 2}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Video */}
            {project.video && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">فيديو المشروع</h2>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src={project.video}
                    title={project.title}
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              </motion.div>
            )}

            {/* Google Maps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">الموقع</h2>
              <div className="h-96 rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${project.coordinates.lat},${project.coordinates.lng}`}
                />
              </div>
              <p className="mt-4 text-gray-600">
                <FiMapPin className="inline ml-1" size={16} />
                {project.address}
              </p>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">معلومات المشروع</h3>
              <div className="space-y-4">
                <div className="flex items-center text-gray-700">
                  <FiHome className="ml-2" size={20} style={{ color: '#d6ac72' }} />
                  <span>{project.units} وحدة</span>
                </div>
                {project.floors && (
                  <div className="flex items-center text-gray-700">
                    <FiLayers className="ml-2" size={20} style={{ color: '#d6ac72' }} />
                    <span>{project.floors} طابق</span>
                  </div>
                )}
                <div className="flex items-center text-gray-700">
                  <FiCalendar className="ml-2" size={20} style={{ color: '#d6ac72' }} />
                  <span>تاريخ الانتهاء: {project.completionDate}</span>
                </div>
                {project.startingPrice && (
                  <div className="flex items-center text-gray-700">
                    <FiDollarSign className="ml-2" size={20} style={{ color: '#d6ac72' }} />
                    <span>السعر يبدأ من: {project.startingPrice.toLocaleString()} جنيه</span>
                  </div>
                )}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-center items-center mb-4">
                    <div className="relative w-32 h-32">
                      <svg className="transform -rotate-90 w-32 h-32">
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="rgba(214, 172, 114, 0.2)"
                          strokeWidth="8"
                          fill="none"
                        />
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="#d6ac72"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 56}`}
                          strokeDashoffset={`${2 * Math.PI * 56 * (1 - project.progress / 100)}`}
                          strokeLinecap="round"
                          className="transition-all duration-500"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <span className="text-3xl font-bold block" style={{ color: '#d6ac72' }}>{project.progress}%</span>
                          <span className="text-sm text-gray-600">نسبة الإنجاز</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {project.features && (
                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-bold text-gray-700 mb-3" style={{ color: '#d6ac72' }}>المميزات:</h4>
                    <ul className="space-y-2">
                      {project.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-gray-700 text-sm">
                          <span className="ml-2" style={{ color: '#d6ac72' }}>•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Contact Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl shadow-lg p-6 text-white"
              style={{ background: 'linear-gradient(to right, #d6ac72, #c49a5f)' }}
            >
              <h3 className="text-xl font-bold mb-4">استفسر عن المشروع</h3>
              <p className="mb-6 opacity-90">
                تواصل معنا لمعرفة المزيد عن هذا المشروع والوحدات المتاحة
              </p>
              <Link
                to="/contact"
                className="block w-full bg-white text-center py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                style={{ color: '#d6ac72' }}
              >
                تواصل معنا
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail

