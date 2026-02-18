import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiMapPin, FiCalendar, FiArrowRight, FiHome } from 'react-icons/fi'

const CurrentProjects = () => {
  // Mock data - In production, this would come from an API
  const projects = [
    {
      id: 1,
      title: 'مشروع إعمار الجديد',
      location: 'المعادي، القاهرة',
      type: 'سكني',
      status: 'قيد الإنشاء',
      completionDate: '2025-06-30',
      description: 'مشروع سكني فاخر يضم وحدات سكنية وتجارية في موقع مميز',
      image: '/image/medium (12).webp',
      units: 150,
      progress: 65,
    },
    {
      id: 2,
      title: 'مشروع إعمار التجاري',
      location: 'مدينة نصر، القاهرة',
      type: 'تجاري',
      status: 'قيد الإنشاء',
      completionDate: '2025-03-15',
      description: 'مجمع تجاري متكامل يضم محلات ومكاتب في قلب مدينة نصر',
      image: '/image/medium (13).webp',
      units: 80,
      progress: 45,
    },
    {
      id: 3,
      title: 'مشروع إعمار السكني المميز',
      location: 'الشروق، القاهرة',
      type: 'سكني',
      status: 'قيد الإنشاء',
      completionDate: '2025-09-30',
      description: 'مجمع سكني راقي بتشطيبات فاخرة ومرافق متكاملة',
      image: '/image/medium (14).webp',
      units: 200,
      progress: 30,
    },
  ]

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
            مشاريعنا الحالية
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            تعرف على مشاريعنا الجارية وأحدث التطورات
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 text-white px-3 py-1 rounded-full text-sm font-semibold" style={{ backgroundColor: '#d6ac72' }}>
                  {project.type}
                </div>
                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {project.status}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <FiMapPin className="ml-2" size={18} />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FiHome className="ml-2" size={18} />
                    <span>{project.units} وحدة</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FiCalendar className="ml-2" size={18} />
                    <span>تاريخ الانتهاء: {project.completionDate}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">نسبة الإنجاز</span>
                    <span className="text-sm font-bold" style={{ color: '#d6ac72' }}>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ backgroundColor: '#d6ac72' }}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                <Link
                  to={`/projects/${project.id}`}
                  className="btn-primary w-full flex items-center justify-center space-x-2 space-x-reverse"
                >
                  <span>عرض التفاصيل</span>
                  <FiArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 rounded-2xl p-8 text-center text-white"
          style={{ background: 'linear-gradient(to right, #d6ac72, #c49a5f)' }}
        >
          <h2 className="text-3xl font-bold mb-4">استفسر عن مشاريعنا</h2>
          <p className="text-lg mb-6 opacity-90">
            تواصل معنا لمعرفة المزيد عن مشاريعنا الحالية والوحدات المتاحة
          </p>
          <Link to="/contact" className="btn-secondary bg-white hover:bg-gray-50 inline-block" style={{ color: '#d6ac72' }}>
            تواصل معنا الآن
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default CurrentProjects

