import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMapPin, FiCalendar, FiHome, FiDollarSign, FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const ProjectDetail = () => {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  // Mock data - In production, this would come from an API
  const projects = {
    1: {
      id: 1,
      title: 'مشروع إعمار الجديد',
      location: 'المعادي، القاهرة',
      address: 'شارع كورنيش المعادي، المعادي، القاهرة',
      type: 'سكني',
      status: 'قيد الإنشاء',
      completionDate: '2025-06-30',
      description: 'مشروع سكني فاخر يضم وحدات سكنية وتجارية في موقع مميز بقلب المعادي. يتميز المشروع بتصميم عصري ومرافق متكاملة.',
      longDescription: `
        مشروع إعمار الجديد هو مشروع سكني فاخر يقع في قلب المعادي، أحد أرقى المناطق السكنية في القاهرة. 
        يتميز المشروع بتصميم عصري يجمع بين الفخامة والراحة، مع مراعاة أعلى معايير الجودة في البناء والتشطيب.
        
        يضم المشروع وحدات سكنية متنوعة تتراوح بين الشقق العادية والدوبلكس والبنتهاوس، 
        بالإضافة إلى وحدات تجارية في الطابق الأرضي.
        
        المرافق والخدمات:
        - نادي رياضي مجهز بأحدث الأجهزة
        - مساحات خضراء واسعة
        - موقف سيارات تحت الأرض
        - أمن 24/7
        - خدمات صيانة متكاملة
      `,
      images: [
        '/image/medium (12).webp',
        '/image/medium (13).webp',
        '/image/medium (14).webp',
        '/image/medium (15).webp',
      ],
      video: null, // 'https://www.youtube.com/embed/...'
      units: 150,
      progress: 65,
      startingPrice: 2000000,
      coordinates: { lat: 29.9602, lng: 31.2569 }, // Mock coordinates for Maadi
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
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
          <Link to="/current-projects" className="text-primary-600 hover:text-primary-700">
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
          className="flex items-center text-primary-600 hover:text-primary-700 mb-6"
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
                <span className="px-3 py-1 bg-primary-600 rounded-full text-sm font-semibold">
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
                  <FiHome className="ml-2 text-primary-600" size={20} />
                  <span>{project.units} وحدة</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <FiCalendar className="ml-2 text-primary-600" size={20} />
                  <span>تاريخ الانتهاء: {project.completionDate}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <FiDollarSign className="ml-2 text-primary-600" size={20} />
                  <span>السعر يبدأ من: {project.startingPrice.toLocaleString()} جنيه</span>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">نسبة الإنجاز</span>
                    <span className="text-sm font-bold text-primary-600">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl shadow-lg p-6 text-white"
            >
              <h3 className="text-xl font-bold mb-4">استفسر عن المشروع</h3>
              <p className="mb-6 opacity-90">
                تواصل معنا لمعرفة المزيد عن هذا المشروع والوحدات المتاحة
              </p>
              <Link
                to="/contact"
                className="block w-full bg-white text-primary-600 text-center py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
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

