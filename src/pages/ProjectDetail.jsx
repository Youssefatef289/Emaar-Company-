import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMapPin, FiCalendar, FiHome, FiArrowLeft, FiLayers, FiX } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { api, apiImage } from '../services/api'

const INSTALLMENT_OFFER_TITLE = 'اسأل عن عرض نظام التقسيط'
const INSTALLMENT_OFFER_BADGES = ['20%', '40%']
const INSTALLMENT_OFFER_DESCRIPTION =
  'تواصل معنا لمعرفة تفاصيل الوحدات المتاحة وأحدث عروض التقسيط المناسبة لكل برج ولكل شقة.'
const DEFAULT_PROJECT_COORDINATES = { lat: 29.0661, lng: 31.0994 }

function normalizeListField(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean)
  }

  if (typeof value === 'string') {
    return value
      .split(/\r?\n|,/)
      .map((item) => item.trim())
      .filter(Boolean)
  }

  return []
}

function normalizeNumberField(value) {
  if (value === '' || value === null || value === undefined) return null
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

function normalizeMatchValue(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[()]/g, ' ')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
}

function normalizeCoordinates(value, latitude, longitude) {
  const lat = normalizeNumberField(latitude ?? value?.lat)
  const lng = normalizeNumberField(longitude ?? value?.lng)

  if (lat === null || lng === null) return null

  return { lat, lng }
}

function findFallbackProjectByValue(fallbackProjects, projectValue) {
  const keys = [projectValue?._id, projectValue?.id, projectValue?.name, projectValue?.title]
    .map(normalizeMatchValue)
    .filter(Boolean)

  if (keys.length === 0) return null

  return Object.values(fallbackProjects).find((fallbackProject) => {
    const fallbackKeys = [fallbackProject?.id, fallbackProject?.name, fallbackProject?.title]
      .map(normalizeMatchValue)
      .filter(Boolean)

    return keys.some((key) => fallbackKeys.includes(key))
  }) || null
}

function mergeProjectWithCmsData(cmsProject, fallbackProject) {
  const images = Array.isArray(cmsProject?.images) && cmsProject.images.length > 0
    ? cmsProject.images
    : Array.isArray(fallbackProject?.images) && fallbackProject.images.length > 0
      ? fallbackProject.images
      : (cmsProject?.image ? [cmsProject.image] : [])

  const coordinates = normalizeCoordinates(
    cmsProject?.coordinates,
    cmsProject?.latitude,
    cmsProject?.longitude,
  ) || fallbackProject?.coordinates || DEFAULT_PROJECT_COORDINATES

  const features = normalizeListField(cmsProject?.features)
  const offerBadges = normalizeListField(cmsProject?.offerBadges)

  return {
    ...(fallbackProject || {}),
    id: cmsProject?._id,
    _id: cmsProject?._id,
    title: cmsProject?.name || fallbackProject?.title || '',
    name: cmsProject?.name || fallbackProject?.name || fallbackProject?.title || '',
    description: cmsProject?.description || fallbackProject?.description || '',
    longDescription:
      cmsProject?.longDescription ||
      cmsProject?.description ||
      fallbackProject?.longDescription ||
      fallbackProject?.description ||
      '',
    location: cmsProject?.location || fallbackProject?.location || '',
    address: cmsProject?.address || fallbackProject?.address || '',
    type: cmsProject?.type === 'previous' ? 'مشروع سابق' : 'مشروع حالي',
    projectType: cmsProject?.type || fallbackProject?.projectType || 'current',
    status: cmsProject?.statusLabel || fallbackProject?.status || '',
    statusLabel: cmsProject?.statusLabel || fallbackProject?.status || '',
    completionDate: cmsProject?.completionDate || fallbackProject?.completionDate || '',
    images,
    image: cmsProject?.image || images[0] || fallbackProject?.image || '',
    video: cmsProject?.video || fallbackProject?.video || null,
    floors: normalizeNumberField(cmsProject?.floors) ?? fallbackProject?.floors ?? null,
    progress: normalizeNumberField(cmsProject?.progress) ?? fallbackProject?.progress ?? 0,
    units: normalizeNumberField(cmsProject?.units) ?? fallbackProject?.units ?? null,
    features: features.length > 0 ? features : normalizeListField(fallbackProject?.features),
    coordinates,
    latitude: coordinates.lat,
    longitude: coordinates.lng,
    offerTitle: cmsProject?.offerTitle || '',
    offerDescription: cmsProject?.offerDescription || '',
    offerBadges,
    towers: Array.isArray(cmsProject?.towers) && cmsProject.towers.length > 0
      ? cmsProject.towers
      : (Array.isArray(fallbackProject?.towers) ? fallbackProject.towers : []),
    fromCms: true,
  }
}

const ProjectDetail = () => {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(null)

  // Mock data - used when id is not from CMS
  const projects = {
    1: {
      id: 1,
      title: 'أبراج إعمار',
      location: 'بنى سويف',
      address: 'بنى سويف - حى الرمد - خلف ارض الطيارين',
      type: 'سكني',
      status: 'قيد الإنشاء',
      completionDate: '2026-12-30',
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
      completionDate: '2026-12-30',
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
    api.projects.get(id)
      .then((res) => {
        const cmsProject = res.data
        const fallbackProject = findFallbackProjectByValue(projects, cmsProject)
        setProject(mergeProjectWithCmsData(cmsProject, fallbackProject))
      })
      .catch(() => {
        setProject(projects[id] || null)
      })
      .finally(() => setLoading(false))
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

  const getImageUrl = (url) => (project.fromCms && url ? apiImage(url) : url)
  const backPath = project.projectType === 'previous' ? '/previous-projects' : '/current-projects'
  const isCurrentProject = project.projectType !== 'previous'
  const offerTitle = project.offerTitle || INSTALLMENT_OFFER_TITLE
  const offerDescription = project.offerDescription || INSTALLMENT_OFFER_DESCRIPTION
  const offerBadges = Array.isArray(project.offerBadges) && project.offerBadges.length > 0
    ? project.offerBadges
    : INSTALLMENT_OFFER_BADGES
  const mapCoordinates = project.coordinates || DEFAULT_PROJECT_COORDINATES
  const progressValue = typeof project.progress === 'number' ? project.progress : 0

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="container-custom max-w-6xl">
        {/* Back Button */}
        <Link
          to={backPath}
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
              src={getImageUrl(project.images && project.images[0]) || getImageUrl(project.image)}
              alt={project.title || project.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 right-6 text-white">
              <h1 className="text-4xl font-extrabold mb-2">{project.title || project.name}</h1>
              <div className="flex items-center space-x-4 space-x-reverse">
                {project.location && (
                <div className="flex items-center">
                  <FiMapPin className="ml-1" size={18} />
                  <span>{project.location}</span>
                </div>
                )}
                {project.type && (
                <span className="px-3 py-1 rounded-full text-sm font-semibold text-white" style={{ backgroundColor: '#d6ac72' }}>
                  {project.type}
                </span>
                )}
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
              <h2 className="text-2xl font-extrabold text-gray-900 mb-4">عن المشروع</h2>
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
                <h2 className="text-2xl font-extrabold text-gray-900 mb-6">تفاصيل الشقق</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.towers.map((tower) => (
                    <div key={tower.id} className="border-2 rounded-xl p-6" style={{ borderColor: '#d6ac72' }}>
                      <div className="mb-4">
                        <h3 className="text-xl font-extrabold text-gray-900 mb-2">{tower.name}</h3>
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
                        {tower.apartments.map((apt) => {
                          return (
                          <div key={apt.number} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-gray-900 font-semibold">
                                شقة رقم {apt.number}
                              </span>
                              <div className="text-left">
                                <span className="font-bold text-lg block" style={{ color: '#d6ac72' }}>
                                  {apt.area} {apt.unit}
                                </span>
                              </div>
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
                            <div className="mt-3 rounded-lg border border-primary-100 bg-white p-3">
                              <div className="mb-2 flex flex-wrap gap-2">
                                {offerBadges.map((badge) => (
                                  <span
                                    key={`${tower.id}-${apt.number}-${badge}`}
                                    className="rounded-full bg-primary-500 px-3 py-1 text-xs font-bold text-white"
                                  >
                                    مقدم {badge}
                                  </span>
                                ))}
                              </div>
                              <p className="text-sm font-bold text-gray-900">{offerTitle}</p>
                              <p className="mt-1 text-xs leading-6 text-gray-600">
                                {offerDescription}
                              </p>
                            </div>
                          </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Pricing Section */}
            {isCurrentProject && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <h2 className="text-2xl font-extrabold text-gray-900 mb-6">اسأل عن عروض التقسيط</h2>
                <div className="rounded-2xl border border-primary-100 bg-gradient-to-br from-primary-50 via-white to-amber-50 p-6 md:p-8">
                  <div className="mb-5 flex flex-wrap gap-3">
                    {offerBadges.map((badge) => (
                      <span
                        key={`pricing-${badge}`}
                        className="rounded-full bg-primary-500 px-4 py-2 text-sm font-extrabold text-white"
                      >
                        مقدم {badge}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-extrabold text-gray-900 mb-3">{offerTitle}</h3>
                  <p className="text-gray-700 leading-8 mb-6">
                    {offerDescription}
                  </p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center rounded-xl bg-primary-500 px-6 py-3 text-sm font-extrabold text-white transition-colors hover:bg-primary-600"
                  >
                    اسأل الآن عن العرض
                  </Link>
                </div>
              </motion.div>
            )}

            {/* Images Gallery */}
            {project.images && project.images.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <h2 className="text-2xl font-extrabold text-gray-900 mb-6">معرض الصور</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {project.images.map((image, index) => (
                    <div 
                      key={`${image}-${index}`} 
                      className="relative h-64 rounded-lg overflow-hidden cursor-pointer group"
                      onClick={() => setSelectedImage(image)}
                    >
                      <img
                        src={getImageUrl(image)}
                        alt={`${project.title || project.name} - ${index + 1}`}
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
                      src={getImageUrl(selectedImage)}
                      alt={project.title || project.name}
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
                <h2 className="text-2xl font-extrabold text-gray-900 mb-6">فيديو المشروع</h2>
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
              <h2 className="text-2xl font-extrabold text-gray-900 mb-6">الموقع</h2>
              <div className="h-96 rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://maps.google.com/maps?q=${mapCoordinates.lat},${mapCoordinates.lng}&z=15&output=embed`}
                />
              </div>
              <p className="mt-4 text-gray-600">
                <FiMapPin className="inline ml-1" size={16} />
                {project.address || project.location}
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
              <h3 className="text-xl font-extrabold text-gray-900 mb-4">معلومات المشروع</h3>
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
                    <span>{project.floors} طوابق</span>
                  </div>
                )}
                <div className="flex items-center text-gray-700">
                  <FiCalendar className="ml-2" size={20} style={{ color: '#d6ac72' }} />
                  <span>تاريخ الانتهاء: {project.completionDate}</span>
                </div>
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
                          strokeDashoffset={`${2 * Math.PI * 56 * (1 - progressValue / 100)}`}
                          strokeLinecap="round"
                          className="transition-all duration-500"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <span className="text-3xl font-bold block" style={{ color: '#d6ac72' }}>{progressValue}%</span>
                          <span className="text-sm text-gray-600">نسبة الإنجاز</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {Array.isArray(project.features) && project.features.length > 0 && (
                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-extrabold text-gray-700 mb-3" style={{ color: '#d6ac72' }}>المميزات:</h4>
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
              <h3 className="text-xl font-extrabold mb-4">استفسر عن المشروع</h3>
              <p className="mb-6 opacity-90">
                {isCurrentProject
                  ? `تواصل معنا لمعرفة الوحدات المتاحة واسأل عن ${offerTitle}${offerBadges.length > 0 ? ` ${offerBadges.join(' و')}` : ''}`
                  : 'تواصل معنا لمعرفة المزيد عن هذا المشروع والتفاصيل المتاحة'}
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

