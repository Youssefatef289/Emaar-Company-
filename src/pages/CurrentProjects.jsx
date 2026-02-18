import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiMapPin, FiCalendar, FiArrowRight, FiHome, FiLayers, FiTrendingUp } from 'react-icons/fi'

const CurrentProjects = () => {
  // Mock data - In production, this would come from an API
  const projects = [
    {
      id: 1,
      title: 'أبراج إعمار',
      location: 'مدينة نصر، القاهرة',
      type: 'سكني',
      status: 'قيد الإنشاء',
      completionDate: '2025-12-31',
      description: 'مجمع أبراج سكني فاخر يضم وحدات سكنية عصرية بتشطيبات راقية ومرافق متكاملة في موقع استراتيجي بمدينة نصر',
      image: '/image/Our current projects/Emaar Towers/Emaar Towers (1).jpg',
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
      units: 240,
      progress: 75,
      floors: 15,
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
      `,
    },
    {
      id: 2,
      title: 'رويال سيتي',
      location: 'الشروق، القاهرة',
      type: 'سكني',
      status: 'قيد الإنشاء',
      completionDate: '2025-09-30',
      description: 'مجمع سكني راقي بتشطيبات فاخرة ومرافق متكاملة في منطقة الشروق المتميزة، يضم وحدات سكنية متنوعة بأسعار تنافسية',
      image: '/image/Our current projects/Royal city/royal city (1).jpg',
      images: [
        '/image/Our current projects/Royal city/royal city (1).jpg',
        '/image/Our current projects/Royal city/royal city (2).jpg',
        '/image/Our current projects/Royal city/royal city (3).jpg',
        '/image/Our current projects/Royal city/Royal City Apartment (1).jpg',
        '/image/Our current projects/Royal city/Royal City Apartment (2).jpg',
        '/image/Our current projects/Royal city/Royal City Apartment (3).jpg',
        '/image/Our current projects/Royal city/Royal City Apartment (4).jpg',
      ],
      units: 180,
      progress: 55,
      floors: 12,
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
      longDescription: `
        رويال سيتي هو مجمع سكني راقي يقع في منطقة الشروق المتميزة، يتميز بتصميم عصري ومرافق متكاملة.
        يضم المشروع 12 طابقاً مع 180 وحدة سكنية متنوعة بتشطيبات فاخرة.
        
        المرافق والخدمات:
        - حدائق واسعة
        - منطقة ألعاب للأطفال
        - نادي اجتماعي
        - موقف سيارات
        - أمن 24/7
        - خدمات صيانة
        - مسجد
      `,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Hero Section */}
      <div className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #d6ac72 0%, #c49a5f 50%, #b2884c 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'url(/image/Our current projects/Emaar Towers/Emaar Towers (1).jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-lg">
              مشاريعنا الحالية
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-white drop-shadow-md font-semibold">
              تعرف على مشاريعنا الجارية وأحدث التطورات
            </p>
            <p className="text-lg text-white drop-shadow-md">
              مشاريع متميزة بجودة عالية وتصميم عصري
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-custom mt-12">

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md overflow-hidden card-hover"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-2 right-2 text-white px-2 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#d6ac72' }}>
                  {project.type}
                </div>
                <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  {project.status}
                </div>
                
                {/* Circular Progress */}
                <div className="absolute bottom-2 right-2">
                  <div className="relative w-16 h-16">
                    <svg className="transform -rotate-90 w-16 h-16">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="4"
                        fill="none"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="#ffffff"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 28}`}
                        strokeDashoffset={`${2 * Math.PI * 28 * (1 - project.progress / 100)}`}
                        strokeLinecap="round"
                        className="transition-all duration-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{project.progress}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-sm text-gray-600 mb-3 leading-relaxed line-clamp-2">{project.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-700 text-sm">
                    <FiMapPin className="ml-2" size={14} style={{ color: '#d6ac72' }} />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center text-gray-700 text-sm">
                    <FiHome className="ml-2" size={14} style={{ color: '#d6ac72' }} />
                    <span>{project.units} وحدة</span>
                  </div>
                  {project.floors && (
                    <div className="flex items-center text-gray-700 text-sm">
                      <FiLayers className="ml-2" size={14} style={{ color: '#d6ac72' }} />
                      <span>{project.floors} طابق</span>
                    </div>
                  )}
                  {project.startingPrice && (
                    <div className="flex items-center text-gray-700 text-sm">
                      <FiTrendingUp className="ml-2" size={14} style={{ color: '#d6ac72' }} />
                      <span>من {project.startingPrice.toLocaleString()} جنيه</span>
                    </div>
                  )}
                </div>

                {/* Features Preview */}
                {project.features && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.features.slice(0, 3).map((feature, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <Link
                  to={`/projects/${project.id}`}
                  className="btn-primary w-full flex items-center justify-center space-x-2 space-x-reverse text-sm py-2"
                >
                  <span>عرض التفاصيل</span>
                  <FiArrowRight size={16} />
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

