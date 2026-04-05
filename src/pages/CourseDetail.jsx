import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiBook, FiCheck, FiClock, FiDollarSign, FiUsers } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { FALLBACK_COURSE_MAP } from '../constants/fallbackData'
import { api, apiImage } from '../services/api'

const DEFAULT_WHATSAPP = '01027347377'

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

function normalizeTextField(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function normalizeCourseMatchValue(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[()]/g, ' ')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
}

function normalizeSyllabusField(value) {
  if (!Array.isArray(value)) return []

  return value
    .map((item, index) => {
      if (!item) return null

      if (typeof item === 'string') {
        const topic = item.trim()
        return topic ? { serial: String(index + 1), topic, duration: '', note: '' } : null
      }

      const topic = normalizeTextField(item.topic || item.title || item.name || item.content)
      const duration = normalizeTextField(item.duration)
      const note = normalizeTextField(item.note || item.type || item.kind)
      const section = normalizeTextField(item.section || item.group || item.module)
      const serial = normalizeTextField(item.serial || item.number || item.id) || String(index + 1)

      if (!topic) return null

      return { serial, topic, duration, note, section }
    })
    .filter(Boolean)
}

function findFallbackCourse(course) {
  const courseKeys = [course?.id, course?._id, course?.title, course?.name]
    .map(normalizeCourseMatchValue)
    .filter(Boolean)

  if (courseKeys.length === 0) return null

  return Object.values(FALLBACK_COURSE_MAP).find((fallbackCourse) => {
    const fallbackKeys = [
      fallbackCourse.id,
      fallbackCourse.title,
      fallbackCourse.title.replace(/\(.+?\)/g, '').trim(),
    ]
      .map(normalizeCourseMatchValue)
      .filter(Boolean)

    return courseKeys.some((key) => fallbackKeys.includes(key))
  }) || null
}

function mergeCourseWithFallback(course) {
  const fallbackCourse = findFallbackCourse(course)

  if (!fallbackCourse) {
    return course
  }

  return {
    ...fallbackCourse,
    ...course,
    id: course.id || course._id || fallbackCourse.id,
    title: course.title || course.name || fallbackCourse.title,
    description: course.description || fallbackCourse.description,
    duration: course.duration || fallbackCourse.duration,
    price: course.price ?? fallbackCourse.price,
    image: course.image || fallbackCourse.image,
    registrationLink: course.registrationLink || fallbackCourse.registrationLink,
    whatsappNumber: course.whatsappNumber || fallbackCourse.whatsappNumber,
    importance: course.importance || fallbackCourse.importance,
    usefulness: Array.isArray(course.usefulness) && course.usefulness.length > 0 ? course.usefulness : fallbackCourse.usefulness,
    content: Array.isArray(course.content) && course.content.length > 0 ? course.content : fallbackCourse.content,
    benefits: Array.isArray(course.benefits) && course.benefits.length > 0 ? course.benefits : fallbackCourse.benefits,
    syllabus: Array.isArray(course.syllabus) && course.syllabus.length > 0 ? course.syllabus : fallbackCourse.syllabus,
    level: course.level || fallbackCourse.level,
    instructor: course.instructor || fallbackCourse.instructor,
    instructorBio: course.instructorBio || fallbackCourse.instructorBio,
    videoUrl: course.videoUrl || fallbackCourse.videoUrl,
  }
}

function groupSyllabusField(items) {
  return items.reduce((groups, item) => {
    const title = normalizeTextField(item.section)
    const lastGroup = groups[groups.length - 1]

    if (!lastGroup || lastGroup.title !== title) {
      groups.push({ title, items: [item] })
      return groups
    }

    lastGroup.items.push(item)
    return groups
  }, [])
}

function buildDefaultImportance(course) {
  const title = normalizeTextField(course.title) || 'هذا الكورس'
  const description = normalizeTextField(course.description)

  if (description) {
    return `${title} يمنح الطالب أساسًا واضحًا وتطبيقًا عمليًا يساعده على فهم المجال بشكل أفضل وتحويل المعرفة النظرية إلى خطوات قابلة للتنفيذ داخل الدراسة أو سوق العمل.`
  }

  return `${title} من الكورسات المهمة لأنه يساعد الطالب على بناء أساس قوي، وفهم خطوات العمل بشكل منظم، واكتساب خبرة عملية يمكن الاعتماد عليها في التطبيق الفعلي.`
}

function buildDefaultContent(course) {
  const title = normalizeTextField(course.title) || 'الكورس'

  return [
    `مقدمة شاملة في ${title} وأهم المفاهيم الأساسية المرتبطة به.`,
    'شرح الأدوات والخطوات العملية المستخدمة أثناء الدراسة والتطبيق.',
    'تدريب على أمثلة وتمارين تساعد على تثبيت المعلومات بشكل واضح.',
    'مراجعة عملية تساعد الطالب على تنفيذ المطلوب بثقة أكبر بعد انتهاء الكورس.',
  ]
}

function buildDefaultUsefulness(course) {
  const title = normalizeTextField(course.title) || 'الكورس'

  return [
    `فهم أساسيات ${title} بطريقة مرتبة وسهلة التطبيق.`,
    'اكتساب قدرة أفضل على تنفيذ المهام المطلوبة بشكل عملي ومنظم.',
    'رفع مستوى الطالب العلمي والمهاري بما يفيده في الدراسة أو العمل.',
    'الانتقال من الفهم النظري إلى التطبيق الفعلي بثقة أكبر.',
  ]
}

function buildDefaultBenefits(course) {
  const level = normalizeTextField(course.level)

  return [
    'شرح مبسط ومنظم مناسب لفهم الموضوع خطوة بخطوة.',
    'تطبيقات وتمارين عملية تساعد على تثبيت المعلومة.',
    level ? `محتوى مناسب لمستوى ${level}.` : 'محتوى مناسب للمبتدئين والراغبين في تطوير مستواهم.',
    'إمكانية الاستفادة من الكورس في الدراسة أو العمل بشكل مباشر.',
  ]
}

export default function CourseDetail() {
  const { courseId } = useParams()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    api.courses
      .get(courseId)
      .then((response) => {
        if (cancelled) return
        const cmsCourse = response.data
        setCourse(
          mergeCourseWithFallback({
            id: cmsCourse._id,
            _id: cmsCourse._id,
            title: cmsCourse.name,
            description: normalizeTextField(cmsCourse.description),
            duration: cmsCourse.duration,
            price: cmsCourse.price,
            level: cmsCourse.level,
            instructor: normalizeTextField(cmsCourse.instructor),
            instructorBio: normalizeTextField(cmsCourse.instructorBio),
            content: normalizeListField(cmsCourse.content),
            benefits: normalizeListField(cmsCourse.benefits),
            importance: normalizeTextField(cmsCourse.importance),
            usefulness: normalizeListField(cmsCourse.usefulness),
            syllabus: normalizeSyllabusField(cmsCourse.syllabus),
            image: cmsCourse.image,
            videoUrl: cmsCourse.videoUrl,
            registrationLink: cmsCourse.registrationLink,
            whatsappNumber: cmsCourse.whatsappNumber || DEFAULT_WHATSAPP,
            fromCms: true,
          }),
        )
      })
      .catch(() => {
        if (!cancelled) setCourse(FALLBACK_COURSE_MAP[courseId] || null)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [courseId])

  const whatsappHref = useMemo(() => {
    if (!course) return '#'
    const phone = String(course.whatsappNumber || DEFAULT_WHATSAPP).replace(/[^0-9]/g, '')
    const text = encodeURIComponent(`مرحبًا، أريد الاستفسار عن دورة: ${course.title}`)
    return `https://wa.me/${phone}?text=${text}`
  }, [course])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: '#d6ac72' }} />
          <p className="text-gray-600">جارٍ التحميل...</p>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-extrabold text-gray-900 mb-4">الدورة غير موجودة</p>
          <Link to="/surveying-services" className="btn-primary inline-block">
            العودة إلى الدورات
          </Link>
        </div>
      </div>
    )
  }

  const heroImage = course.image ? apiImage(course.image) : ''
  const courseContent = normalizeListField(course.content)
  const courseBenefits = normalizeListField(course.benefits)
  const courseUsefulness = normalizeListField(course.usefulness)
  const courseImportance = normalizeTextField(course.importance)
  const courseSyllabus = normalizeSyllabusField(course.syllabus)
  const courseSyllabusGroups = groupSyllabusField(courseSyllabus)
  const detailContent = courseContent.length > 0 ? courseContent : buildDefaultContent(course)
  const detailBenefits = courseBenefits.length > 0 ? courseBenefits : buildDefaultBenefits(course)
  const detailUsefulness = courseUsefulness.length > 0 ? courseUsefulness : buildDefaultUsefulness(course)
  const detailImportance = courseImportance || buildDefaultImportance(course)

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="container-custom">
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
          <div className="relative h-64 md:h-96 bg-gray-100">
            {heroImage ? (
              <img src={heroImage} alt={course.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">بدون صورة</div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-2 drop-shadow-lg">
                {course.title}
              </h1>
              {course.description && (
                <p className="text-lg md:text-xl text-white/90 drop-shadow-md">{course.description}</p>
              )}
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
              {course.duration && (
                <InfoCard icon={FiClock} label="المدة" value={course.duration} />
              )}
              {course.price !== null && course.price !== undefined && (
                <InfoCard
                  icon={FiDollarSign}
                  label="السعر"
                  value={`${Number(course.price).toLocaleString()} جنيه`}
                />
              )}
              {course.level && (
                <InfoCard icon={FiUsers} label="المستوى" value={course.level} />
              )}
              {course.instructor && (
                <InfoCard icon={FiBook} label="المدرب" value={course.instructor} />
              )}
            </div>

            {detailContent.length > 0 && (
              <Section title="محتوى الكورس">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {detailContent.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                      <FiCheck className="mt-1 flex-shrink-0" size={18} style={{ color: '#d6ac72' }} />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {courseSyllabusGroups.length > 0 && (
              <Section title="الخطة التفصيلية للكورس">
                <div className="space-y-6">
                  {courseSyllabusGroups.map((group, groupIndex) => (
                    <div
                      key={`${group.title || 'syllabus'}-${groupIndex}`}
                      className="overflow-hidden rounded-2xl border border-primary-100 bg-white shadow-sm"
                    >
                      {group.title && (
                        <div className="border-b border-primary-100 bg-gradient-to-r from-primary-50 via-white to-amber-50 px-5 py-4">
                          <h3 className="text-lg font-extrabold text-gray-900">{group.title}</h3>
                        </div>
                      )}
                      <div className="overflow-x-auto">
                        <table className="min-w-full text-right text-sm">
                          <thead className="bg-primary-50 text-gray-900">
                            <tr>
                              <th className="px-4 py-4 font-extrabold">م</th>
                              <th className="px-4 py-4 font-extrabold">المحور</th>
                              <th className="px-4 py-4 font-extrabold">المدة</th>
                              <th className="px-4 py-4 font-extrabold">النوع</th>
                            </tr>
                          </thead>
                          <tbody>
                            {group.items.map((item, index) => (
                              <tr key={`${group.title}-${item.serial}-${index}`} className="border-t border-gray-100">
                                <td className="px-4 py-4 font-bold text-primary-700">{item.serial}</td>
                                <td className="px-4 py-4 leading-7 text-gray-800">{item.topic}</td>
                                <td className="px-4 py-4 text-gray-600">{item.duration || 'حسب الشرح'}</td>
                                <td className="px-4 py-4">
                                  <span
                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                                      item.note === 'عملي'
                                        ? 'bg-blue-50 text-blue-700'
                                        : 'bg-amber-50 text-amber-700'
                                    }`}
                                  >
                                    {item.note || 'عام'}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {detailBenefits.length > 0 && (
              <Section title="مميزات الدورة">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {detailBenefits.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 bg-primary-50 p-4 rounded-lg">
                      <FiCheck className="mt-1 flex-shrink-0" size={18} style={{ color: '#d6ac72' }} />
                      <span className="text-gray-800 font-semibold">{item}</span>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {detailImportance && (
              <Section title="أهمية الكورس">
                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-6 border-r-4 shadow-md" style={{ borderColor: '#d6ac72' }}>
                  <div className="flex items-start gap-3 mb-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#d6ac72' }}>
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">لماذا هذا الكورس مهم؟</h3>
                  </div>
                  <p className="text-gray-800 text-lg leading-relaxed">{detailImportance}</p>
                </div>
              </Section>
            )}

            {detailUsefulness.length > 0 && (
              <Section title="كيفية استفادة الطالب من الكورس">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-md">
                  <div className="flex items-start gap-3 mb-6">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-blue-500">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">كيف سيستفيد الطالب؟</h3>
                  </div>
                  <div className="space-y-4">
                    {detailUsefulness.map((item, index) => (
                      <div key={index} className="flex items-start gap-4 bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-grow">
                          <p className="text-gray-800 text-base leading-relaxed font-medium">{item}</p>
                        </div>
                        <div className="flex-shrink-0">
                          <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Section>
            )}

            {course.videoUrl && (
              <Section title="فيديو تعريفي">
                <div className="bg-gray-50 rounded-xl overflow-hidden shadow-sm">
                  <div className="aspect-video w-full">
                    <iframe
                      src={course.videoUrl}
                      title={course.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              </Section>
            )}

            {(course.instructor || course.instructorBio) && (
              <Section title="عن المدرب">
                <div className="bg-gray-50 rounded-lg p-6">
                  {course.instructor && <p className="text-gray-900 font-extrabold text-lg mb-2">{course.instructor}</p>}
                  {course.instructorBio && <p className="text-gray-700">{course.instructorBio}</p>}
                </div>
              </Section>
            )}

            <div
              className="rounded-xl p-8 text-center text-white"
              style={{ background: 'linear-gradient(135deg, #d6ac72 0%, #c49a5f 50%, #b2884c 100%)' }}
            >
              <h2 className="text-2xl md:text-3xl font-extrabold mb-4 drop-shadow-lg">
                التسجيل والحجز
              </h2>
              <p className="text-lg md:text-xl mb-6 drop-shadow-md">
                إذا كان للكورس رابط تسجيل مباشر فسيتم استخدامه، وإلا يمكنك الحجز من خلال صفحة الحجز أو التواصل عبر واتساب.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {course.registrationLink ? (
                  <a
                    href={course.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-50 transition-colors shadow-lg"
                  >
                    سجل الآن
                  </a>
                ) : (
                  <Link
                    to={`/surveying-services/course/${course.id}/book`}
                    className="bg-white text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-50 transition-colors shadow-lg"
                  >
                    احجز الدورة الآن
                  </Link>
                )}
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-50 transition-colors flex items-center justify-center gap-3 shadow-lg"
                >
                  <FaWhatsapp size={24} />
                  <span>تواصل عبر واتساب</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function InfoCard({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 bg-primary-50 p-4 rounded-lg">
      <Icon size={24} style={{ color: '#d6ac72' }} />
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="font-bold text-gray-900">{value}</p>
      </div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4" style={{ color: '#d6ac72' }}>
        {title}
      </h2>
      {children}
    </div>
  )
}
