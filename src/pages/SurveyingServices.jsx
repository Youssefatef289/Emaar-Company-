import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowUpLeft, FiBookOpen, FiCheckCircle, FiClock, FiDollarSign, FiInfo } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { FALLBACK_COURSE_LIST } from '../constants/fallbackData'
import { api, apiImage } from '../services/api'

const DEFAULT_WHATSAPP = '201027347377'

const CARD_THEMES = [
  {
    accentBar: 'from-primary-700 via-primary-400 to-gold-500',
    pillClass: 'bg-primary-500/95',
    panelClass: 'border-primary-100 bg-gradient-to-br from-primary-50 via-white to-amber-50',
    iconClass: 'bg-primary-100 text-primary-700',
    placeholderClass: 'from-primary-200 via-primary-100 to-amber-100',
    shadow: '0 18px 45px rgba(214, 172, 114, 0.14)',
  },
  {
    accentBar: 'from-teal-700 via-teal-500 to-primary-300',
    pillClass: 'bg-teal-600/95',
    panelClass: 'border-teal-100 bg-gradient-to-br from-teal-50 via-white to-cyan-50',
    iconClass: 'bg-teal-100 text-teal-700',
    placeholderClass: 'from-teal-200 via-teal-100 to-cyan-100',
    shadow: '0 18px 45px rgba(20, 184, 166, 0.14)',
  },
  {
    accentBar: 'from-gold-600 via-gold-400 to-primary-700',
    pillClass: 'bg-gray-900/95',
    panelClass: 'border-gold-100 bg-gradient-to-br from-gold-50 via-white to-amber-50',
    iconClass: 'bg-gold-100 text-gold-700',
    placeholderClass: 'from-gold-200 via-gold-100 to-amber-100',
    shadow: '0 18px 45px rgba(245, 158, 11, 0.14)',
  },
]

function formatCoursePrice(price) {
  if (price === null || price === undefined || Number.isNaN(Number(price))) {
    return 'يحدد لاحقًا'
  }

  return `${Number(price).toLocaleString()} ج.م`
}

function getCourseHighlights(course) {
  if (Array.isArray(course.usefulness) && course.usefulness.length > 0) {
    return course.usefulness.slice(0, 2)
  }

  if (course.importance) {
    return [course.importance]
  }

  if (course.description) {
    return [course.description]
  }

  return ['محتوى تدريبي عملي يساعدك على التطبيق المباشر وتطوير مستواك المهني بسرعة.']
}

export default function SurveyingServices() {
  const [apiCourses, setApiCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.courses
      .list()
      .then((response) => setApiCourses(response.data || []))
      .catch(() => setApiCourses([]))
      .finally(() => setLoading(false))
  }, [])

  const courses = useMemo(() => {
    if (apiCourses.length === 0) return FALLBACK_COURSE_LIST
    return apiCourses.map((course) => ({
      id: course._id,
      _id: course._id,
      title: course.name,
      description: course.description,
      duration: course.duration,
      price: course.price,
      image: course.image,
      registrationLink: course.registrationLink,
      whatsappNumber: course.whatsappNumber || DEFAULT_WHATSAPP,
      importance: course.importance,
      usefulness: course.usefulness,
      fromCms: true,
    }))
  }, [apiCourses])

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div
        className="relative mb-16 overflow-hidden py-20 md:py-28"
        style={{ background: 'linear-gradient(135deg, #d6ac72 0%, #c49a5f 50%, #b2884c 100%)' }}
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'url(/image/medium (5).webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            <h1 className="mb-6 text-4xl font-extrabold text-white drop-shadow-lg md:text-5xl lg:text-6xl">
              الدورات التدريبية
            </h1>
            <p className="mb-4 text-xl font-bold text-white drop-shadow-md md:text-2xl">
              كل كورس تتم إضافته من لوحة التحكم يظهر هنا فقط، مع صفحة تفاصيل وحجز مستقلة.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-extrabold text-gray-900 md:text-4xl">الكورسات المتاحة</h2>
            <div className="mx-auto mb-6 h-1 w-24" style={{ backgroundColor: '#d6ac72' }} />
            <p className="mx-auto max-w-3xl text-lg text-gray-600">
              عند وجود بيانات من لوحة التحكم يتم عرضها بدل البيانات الثابتة تلقائيًا.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary-500" />
            </div>
          ) : courses.length === 0 ? (
            <div className="rounded-2xl bg-white p-12 text-center shadow-lg">
              <h3 className="mb-2 text-2xl font-bold text-gray-900">لا توجد كورسات مضافة الآن</h3>
              <p className="text-gray-600">يمكنك إضافة أول كورس من لوحة التحكم ليظهر هنا مباشرة.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {courses.map((course, index) => {
                const courseId = course._id || course.id
                const whatsappNumber = String(course.whatsappNumber || DEFAULT_WHATSAPP).replace(/[^0-9]/g, '')
                const whatsappMessage = encodeURIComponent(`مرحبًا، أريد الاستفسار عن دورة: ${course.title}`)
                const theme = CARD_THEMES[index % CARD_THEMES.length]
                const highlights = getCourseHighlights(course)
                const imageUrl = course.image ? apiImage(course.image) : ''
                const displayPrice = formatCoursePrice(course.price)

                return (
                  <motion.article
                    key={courseId}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.06 }}
                    whileHover={{ y: -6 }}
                    className="group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-white/70 bg-white"
                    style={{ boxShadow: theme.shadow }}
                  >
                    <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-l ${theme.accentBar}`} />

                    <div className="relative h-52 overflow-hidden bg-gray-100">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={course.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${theme.placeholderClass}`}>
                          <div className="flex h-20 w-20 items-center justify-center rounded-[28px] bg-white/75 text-gray-700 shadow-lg backdrop-blur">
                            <FiBookOpen size={34} />
                          </div>
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />

                      <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
                        <span className="rounded-full bg-white/95 px-2.5 py-1.5 text-[11px] font-black text-gray-900 shadow-lg backdrop-blur">
                          برنامج تدريبي
                        </span>
                        <span className={`rounded-full px-2.5 py-1.5 text-[11px] font-bold text-white shadow-lg ${theme.pillClass}`}>
                          {course.registrationLink ? 'تسجيل مباشر' : 'تواصل سريع'}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-4 md:p-5">
                      <div className="mb-4">
                        <h3 className="min-h-[3.25rem] text-xl font-extrabold leading-snug text-gray-900">
                          {course.title}
                        </h3>
                        <p className="mt-2 min-h-[3.25rem] text-sm leading-6 text-gray-600 line-clamp-2">
                          {course.description || 'لا يوجد وصف مضاف لهذا الكورس حتى الآن.'}
                        </p>
                      </div>

                      <div className="mb-4 grid grid-cols-2 gap-2">
                        <CourseMetaCard
                          icon={FiClock}
                          label="المدة"
                          value={course.duration || 'حسب الخطة'}
                          theme={theme}
                        />
                        <CourseMetaCard
                          icon={FiDollarSign}
                          label="السعر"
                          value={displayPrice}
                          theme={theme}
                          accent
                        />
                      </div>

                      <div className={`mb-4 rounded-[22px] border p-3.5 ${theme.panelClass}`}>
                        <div className="mb-2.5 flex items-center gap-3">
                          <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${theme.iconClass}`}>
                            <FiCheckCircle size={18} />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-gray-500">أبرز ما ستتعلمه</p>
                            <p className="text-sm font-extrabold text-gray-900">نقاط سريعة</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {highlights.map((item, highlightIndex) => (
                            <div
                              key={`${courseId}-highlight-${highlightIndex}`}
                              className="flex items-start gap-2.5 rounded-xl bg-white/80 px-3 py-2.5 shadow-sm ring-1 ring-black/5"
                            >
                              <div className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${theme.iconClass}`}>
                                <FiCheckCircle size={12} />
                              </div>
                              <p className="text-sm leading-6 text-gray-700 line-clamp-2">{item}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-auto grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                        <Link
                          to={`/surveying-services/course/${courseId}`}
                          className="inline-flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-900 transition-all duration-300 hover:border-gray-900 hover:bg-gray-50"
                        >
                          <span>عرض التفاصيل</span>
                          <FiInfo size={18} />
                        </Link>

                        {course.registrationLink ? (
                          <a
                            href={course.registrationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-between rounded-xl bg-primary-500 px-4 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-primary-600"
                          >
                            <span>سجل الآن</span>
                            <FiArrowUpLeft size={18} />
                          </a>
                        ) : (
                          <a
                            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-between rounded-xl bg-green-500 px-4 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-green-600"
                          >
                            <span>واتساب مباشر</span>
                            <FaWhatsapp size={18} />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.article>
                )
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

function CourseMetaCard({ icon: Icon, label, value, theme, accent = false }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 px-3 py-3">
      <div className="mb-1.5 flex items-center gap-2">
        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${theme.iconClass}`}>
          <Icon size={15} />
        </div>
        <p className="text-xs font-bold text-gray-500">{label}</p>
      </div>
      <p className={`text-sm font-extrabold ${accent ? 'text-primary-700' : 'text-gray-900'}`}>{value}</p>
    </div>
  )
}
