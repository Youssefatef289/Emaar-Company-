import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMapPin, FiCalendar, FiHome, FiDollarSign, FiArrowLeft, FiLayers, FiX } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const ProjectDetail = () => {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(null)

  // Mock data - In production, this would come from an API
  const projects = {
    1: {
      id: 1,
      title: 'أبراج إعمار',
      location: 'بنى سويف',
      address: 'بنى سويف - حى الرمد - خلف ارض الطيارين',
      type: 'سكني',
      status: 'قيد الإنشاء',
      completionDate: '2025-12-31',
      description: 'مجمع أبراج فاخر بتصميم عصري وخدمات متكاملة.',
      longDescription: `
        4 ابراج كل برج منفصل عن الاخر
        شقق سكنيه - شقق اداريه - محلات - بدروم
        العنوان: بنى سويف - حى الرمد - خلف ارض الطيارين
        
        أبراج إعمار هو مشروع فاخر يتميز بتصميم عصري يجمع بين الفخامة والراحة، مع مراعاة أعلى معايير الجودة في البناء والتشطيب.
        
        يضم المشروع 4 أبراج منفصلة، كل برج يتكون من 7 طوابق، وكل طابق يحتوي على 4 شقق.
        المشروع يضم شقق سكنية، شقق إدارية، محلات، وبدروم.
      `,
      images: [
        '/image/Our current projects/Emaar Towers/Emaar Towers (1).jpg',
        '/image/Our current projects/Emaar Towers/Emaar Towers  (2).jpg',
        '/image/Our current projects/Emaar Towers/Emaar Towers (3).jpg',
        '/image/Our current projects/Emaar Towers/Emaar Towers  (4).jpg',
        '/image/Our current projects/Emaar Towers/Emaar Towers (5).jpg',
        '/image/Our current projects/Emaar Towers/Emaar Towers Split (1).jpg',
        '/image/Our current projects/Emaar Towers/Emaar Towers Split (2).jpg',
        '/image/Our current projects/Emaar Towers/Emaar Towers Split (3).jpg',
        '/image/Our current projects/Emaar Towers/Emaar Towers Split (4).jpg',
        '/image/Our current projects/Emaar Towers/Emaar Towers Split (5).jpg',
      ],
      video: null,
      floors: 7,
      progress: 75,
      startingPrice: 3500000,
      features: [],
      coordinates: { lat: 29.0661, lng: 31.0994 }, // Mock coordinates for Beni Suef
      towers: [
        {
          id: 1,
          name: 'برج 1',
          location: 'على ش 10 و ش 12 ناصيه',
          basement: true,
          shops: true,
          apartments: [
            { 
              number: 1, 
              area: 110, 
              unit: 'م²',
              rooms: 2,
              bathrooms: 2,
              features: ['2 غرفة نوم', 'مطبخ', 'ريسبشن', '2 حمام', 'طرقة']
            },
            { 
              number: 2, 
              area: 135, 
              unit: 'م²',
              rooms: 3,
              bathrooms: 2,
              features: ['3 غرفة نوم', 'مطبخ', 'ريسبشن', '2 حمام', 'طرقة']
            },
            { 
              number: 3, 
              area: 155, 
              unit: 'م²',
              rooms: 3,
              bathrooms: 2,
              features: ['3 غرفة نوم', 'مطبخ', 'ريسبشن', '2 حمام', 'طرقة']
            },
            { 
              number: 4, 
              area: 230, 
              unit: 'م²',
              rooms: 4,
              bathrooms: 2,
              features: ['4 غرفة نوم', 'مطبخ', 'ريسبشن', '2 حمام', 'طرقة']
            },
          ],
        },
        {
          id: 2,
          name: 'برج 2',
          location: 'على ش 10 واجهه',
          basement: true,
          shops: true,
          apartments: [
            { 
              number: 1, 
              area: 110, 
              unit: 'م²',
              rooms: 2,
              bathrooms: 2,
              features: ['2 غرفة نوم', 'مطبخ', 'ريسبشن', '2 حمام', 'طرقة']
            },
            { 
              number: 2, 
              area: 135, 
              unit: 'م²',
              rooms: 3,
              bathrooms: 2,
              features: ['3 غرفة نوم', 'مطبخ', 'ريسبشن', '2 حمام', 'طرقة']
            },
            { 
              number: 3, 
              area: 155, 
              unit: 'م²',
              rooms: 3,
              bathrooms: 2,
              features: ['3 غرفة نوم', 'مطبخ', 'ريسبشن', '2 حمام', 'طرقة']
            },
            { 
              number: 4, 
              area: 196, 
              unit: 'م²',
              rooms: 4,
              bathrooms: 2,
              features: ['4 غرفة نوم', 'مطبخ', 'ريسبشن', '2 حمام', 'طرقة']
            },
          ],
        },
        {
          id: 3,
          name: 'برج 3',
          location: 'على ش 10 واجهه',
          basement: true,
          shops: true,
          apartments: [
            { 
              number: 1, 
              area: 110, 
              unit: 'م²',
              rooms: 2,
              bathrooms: 2,
              features: ['2 غرفة نوم', 'مطبخ', 'ريسبشن', '2 حمام', 'طرقة']
            },
            { 
              number: 2, 
              area: 135, 
              unit: 'م²',
              rooms: 3,
              bathrooms: 2,
              features: ['3 غرفة نوم', 'مطبخ', 'ريسبشن', '2 حمام', 'طرقة']
            },
            { 
              number: 3, 
              area: 155, 
              unit: 'م²',
              rooms: 3,
              bathrooms: 2,
              features: ['3 غرفة نوم', 'مطبخ', 'ريسبشن', '2 حمام', 'طرقة']
            },
            { 
              number: 4, 
              area: 196, 
              unit: 'م²',
              rooms: 4,
              bathrooms: 2,
              features: ['4 غرفة نوم', 'مطبخ', 'ريسبشن', '2 حمام', 'طرقة']
            },
          ],
        },
        {
          id: 4,
          name: 'برج 4',
          location: 'على ش 10 واجهه',
          basement: true,
          shops: true,
          apartments: [
            { 
              number: 1, 
              area: 110, 
              unit: 'م²',
              rooms: 2,
              bathrooms: 2,
              features: ['2 غرفة نوم', 'مطبخ', 'ريسبشن', '2 حمام', 'طرقة']
            },
            { 
              number: 2, 
              area: 135, 
              unit: 'م²',
              rooms: 3,
              bathrooms: 2,
              features: ['3 غرفة نوم', 'مطبخ', 'ريسبشن', '2 حمام', 'طرقة']
            },
            { 
              number: 3, 
              area: 155, 
              unit: 'م²',
              rooms: 3,
              bathrooms: 2,
              features: ['3 غرفة نوم', 'مطبخ', 'ريسبشن', '2 حمام', 'طرقة']
            },
            { 
              number: 4, 
              area: 196, 
              unit: 'م²',
              rooms: 4,
              bathrooms: 2,
              features: ['4 غرفة نوم', 'مطبخ', 'ريسبشن', '2 حمام', 'طرقة']
            },
          ],
        },
      ],
    },
    2: {
      id: 2,
      title: 'رويال سيتي',
      location: 'امتداد الرمد خلف ارض الطيارين امام ابراج اعمار',
      address: 'امتداد الرمد خلف ارض الطيارين امام ابراج اعمار',
      type: 'سكني',
      status: 'قيد الإنشاء',
      completionDate: '2025-09-30',
      description: 'مجمع سكني راقي بتشطيبات فاخرة ومرافق متكاملة',
      longDescription: `
        رويال سيتي هو مجمع سكني راقي يتميز بتصميم عصري ومرافق متكاملة.
        يضم المشروع 7 طوابق، وكل طابق يحتوي على 4 شقق.
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
      floors: 7,
      progress: 55,
      startingPrice: 2800000,
      features: [],
      coordinates: { lat: 29.0661, lng: 31.0994 }, // Mock coordinates for Beni Suef
      towers: [
        {
          id: 1,
          name: 'رويال سيتي',
          location: 'امتداد الرمد خلف ارض الطيارين امام ابراج اعمار',
          basement: false,
          shops: false,
          apartments: [
            { 
              number: 1, 
              area: 115, 
              unit: 'م²',
              rooms: 2,
              bathrooms: 2,
              features: ['2 غرفة نوم', 'مطبخ', 'ريسبشن', '2 حمام', 'طرقة']
            },
            { 
              number: 2, 
              area: 150, 
              unit: 'م²',
              rooms: 3,
              bathrooms: 2,
              features: ['3 غرفة نوم', 'مطبخ', 'ريسبشن', '2 حمام', 'طرقة']
            },
            { 
              number: 3, 
              area: 175, 
              unit: 'م²',
              rooms: 3,
              bathrooms: 2,
              features: ['3 غرفة نوم', 'مطبخ', 'ريسبشن', '2 حمام', 'طرقة']
            },
            { 
              number: 4, 
              area: 175, 
              unit: 'م²',
              rooms: 3,
              bathrooms: 2,
              features: ['3 غرفة نوم', 'مطبخ', 'ريسبشن', '2 حمام', 'طرقة']
            },
          ],
        },
      ],
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

            {/* Apartments Details */}
            {project.towers && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">تفاصيل الشقق</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.towers.map((tower) => (
                    <div key={tower.id} className="border-2 rounded-xl p-6" style={{ borderColor: '#d6ac72' }}>
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{tower.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{tower.location}</p>
                        <div className="flex gap-2 mb-3">
                          {tower.basement && (
                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">بدروم</span>
                          )}
                          {tower.shops && (
                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">محلات</span>
                          )}
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">الشقق:</h4>
                        {tower.apartments.map((apt) => (
                          <div key={apt.number} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-gray-900 font-semibold">
                                شقة رقم {apt.number}
                              </span>
                              <span className="font-bold text-lg" style={{ color: '#d6ac72' }}>
                                {apt.area} {apt.unit}
                              </span>
                            </div>
                            {apt.rooms && (
                              <div className="flex items-center gap-4 text-xs text-gray-600 mb-2">
                                <span>{apt.rooms} غرفة</span>
                                {apt.bathrooms && <span>{apt.bathrooms} حمام</span>}
                              </div>
                            )}
                            {apt.features && apt.features.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                {apt.features.map((feature, idx) => (
                                  <span key={idx} className="text-xs bg-white text-gray-700 px-2 py-1 rounded-full border border-gray-300">
                                    {feature}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Images Gallery */}
            {project.images.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">معرض الصور</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {project.images.map((image, index) => (
                    <div 
                      key={`${image}-${index}`} 
                      className="relative h-64 rounded-lg overflow-hidden cursor-pointer group"
                      onClick={() => setSelectedImage(image)}
                    >
                      <img
                        src={image}
                        alt={`${project.title} - ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                        onError={(e) => {
                          console.error('Failed to load image:', image);
                          e.target.style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 text-white text-sm font-semibold transition-opacity">
                          اضغط للتكبير
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                {project.images.length === 0 && (
                  <p className="text-center text-gray-500 py-8">لا توجد صور متاحة</p>
                )}
              </motion.div>
            )}

            {/* Image Modal */}
            <AnimatePresence>
              {selectedImage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                  onClick={() => setSelectedImage(null)}
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors z-10"
                      aria-label="إغلاق"
                    >
                      <FiX size={24} />
                    </button>
                    <img
                      src={selectedImage}
                      alt={project.title}
                      className="max-w-full max-h-full object-contain rounded-lg"
                    />
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full text-sm">
                      {project.images.indexOf(selectedImage) + 1} / {project.images.length}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

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
                {project.units && (
                  <div className="flex items-center text-gray-700">
                    <FiHome className="ml-2" size={20} style={{ color: '#d6ac72' }} />
                    <span>{project.units} وحدة</span>
                  </div>
                )}
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

