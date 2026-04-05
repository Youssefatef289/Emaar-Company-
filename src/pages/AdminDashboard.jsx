import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiBook,
  FiEdit,
  FiExternalLink,
  FiFolder,
  FiHome,
  FiLogOut,
  FiMapPin,
  FiPlus,
  FiTag,
  FiTrash2,
  FiX,
} from 'react-icons/fi'
import {
  FALLBACK_COURSE_MAP,
  FALLBACK_PREVIOUS_PROJECT_EMAAR_IMAGES,
  FALLBACK_PREVIOUS_PROJECT_GALLERY_IMAGES,
  FALLBACK_PREVIOUS_PROJECTS,
} from '../constants/fallbackData'
import { useAdminAuth } from '../contexts/AdminAuthContext'
import { api, apiImage } from '../services/api'

const TABS = [
  { id: 'overview', label: 'نظرة عامة', icon: FiHome },
  { id: 'offers', label: 'العروض', icon: FiTag },
  { id: 'real-estate', label: 'التسويق العقاري', icon: FiMapPin },
  { id: 'courses', label: 'الكورسات', icon: FiBook },
  { id: 'projects', label: 'المشاريع', icon: FiFolder },
]

const REAL_ESTATE_CATEGORIES = ['تمليك', 'إيجار', 'مخازن', 'إداري', 'أراضي']
const PROJECT_TYPES = ['current', 'previous']
const PROJECT_INSTALLMENT_DEFAULT_TITLE = 'اسأل عن عرض نظام التقسيط'
const PROJECT_INSTALLMENT_DEFAULT_DESCRIPTION =
  'تواصل معنا لمعرفة تفاصيل الوحدات المتاحة وأحدث عروض التقسيط المناسبة لكل برج ولكل شقة.'
const PROJECT_INSTALLMENT_DEFAULT_BADGES = ['20%', '40%']

function normalizeMatchValue(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[()]/g, ' ')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
}

function findFallbackCourseForAdmin(course) {
  const courseKeys = [course?.id, course?._id, course?.title, course?.name]
    .map(normalizeMatchValue)
    .filter(Boolean)

  if (courseKeys.length === 0) return null

  return Object.values(FALLBACK_COURSE_MAP).find((fallbackCourse) => {
    const fallbackKeys = [
      fallbackCourse.id,
      fallbackCourse.title,
      fallbackCourse.title.replace(/\(.+?\)/g, '').trim(),
    ]
      .map(normalizeMatchValue)
      .filter(Boolean)

    return courseKeys.some((key) => fallbackKeys.includes(key))
  }) || null
}

function mergeCourseWithFallbackForAdmin(course) {
  const fallbackCourse = findFallbackCourseForAdmin(course)

  if (!fallbackCourse) {
    return {
      ...course,
      usefulness: Array.isArray(course.usefulness) ? course.usefulness : [],
      content: Array.isArray(course.content) ? course.content : [],
      benefits: Array.isArray(course.benefits) ? course.benefits : [],
      syllabus: Array.isArray(course.syllabus) ? course.syllabus : [],
    }
  }

  return {
    ...fallbackCourse,
    ...course,
    _id: course._id,
    name: course.name || fallbackCourse.title,
    description: course.description || fallbackCourse.description,
    duration: course.duration || fallbackCourse.duration,
    price: course.price ?? fallbackCourse.price,
    image: course.image || fallbackCourse.image,
    registrationLink: course.registrationLink || fallbackCourse.registrationLink,
    whatsappNumber: course.whatsappNumber || fallbackCourse.whatsappNumber,
    importance: course.importance || fallbackCourse.importance,
    usefulness: Array.isArray(course.usefulness) && course.usefulness.length > 0
      ? course.usefulness
      : (fallbackCourse.usefulness || []),
    content: Array.isArray(course.content) && course.content.length > 0
      ? course.content
      : (fallbackCourse.content || []),
    benefits: Array.isArray(course.benefits) && course.benefits.length > 0
      ? course.benefits
      : (fallbackCourse.benefits || []),
    syllabus: Array.isArray(course.syllabus) && course.syllabus.length > 0
      ? course.syllabus
      : (fallbackCourse.syllabus || []),
    level: course.level || fallbackCourse.level,
    instructor: course.instructor || fallbackCourse.instructor,
    instructorBio: course.instructorBio || fallbackCourse.instructorBio,
    videoUrl: course.videoUrl || fallbackCourse.videoUrl,
  }
}

function mergeProjectWithDashboardDefaults(project) {
  const isCurrentProject = project?.type !== 'previous'

  return {
    ...project,
    longDescription: project?.longDescription || project?.description || '',
    location: project?.location || '',
    address: project?.address || '',
    categoryLabel: project?.categoryLabel || '',
    statusLabel: project?.statusLabel || '',
    completionDate: project?.completionDate || '',
    floors: project?.floors ?? '',
    progress: project?.progress ?? '',
    units: project?.units ?? '',
    features: Array.isArray(project?.features) ? project.features : [],
    video: project?.video || '',
    latitude: project?.latitude ?? project?.coordinates?.lat ?? '',
    longitude: project?.longitude ?? project?.coordinates?.lng ?? '',
    offerTitle: project?.offerTitle || (isCurrentProject ? PROJECT_INSTALLMENT_DEFAULT_TITLE : ''),
    offerDescription: project?.offerDescription || (isCurrentProject ? PROJECT_INSTALLMENT_DEFAULT_DESCRIPTION : ''),
    offerBadges: Array.isArray(project?.offerBadges) && project.offerBadges.length > 0
      ? project.offerBadges
      : (isCurrentProject ? PROJECT_INSTALLMENT_DEFAULT_BADGES : []),
    towers: Array.isArray(project?.towers) ? project.towers : [],
    images: Array.isArray(project?.images) ? project.images : [],
  }
}

function formatSyllabusField(value) {
  if (!Array.isArray(value) || value.length === 0) return ''

  return value
    .map((item, index) => {
      if (!item) return ''

      if (typeof item === 'string') {
        return `${index + 1} | ${item}`
      }

      const section = String(item.section || item.group || item.module || '').trim()
      const serial = String(item.serial || item.number || item.id || index + 1).trim()
      const topic = String(item.topic || item.title || item.name || item.content || '').trim()
      const duration = String(item.duration || '').trim()
      const note = String(item.note || item.type || item.kind || '').trim()
      const parts = [section, serial, topic, duration, note].filter(Boolean)

      return parts.join(' | ')
    })
    .filter(Boolean)
    .join('\n')
}

function parseSyllabusField(rawValue) {
  return String(rawValue || '')
    .split(/\r?\n/)
    .map((line, index) => {
      const parts = line
        .split('|')
        .map((part) => part.trim())
        .filter(Boolean)

      if (parts.length === 0) return null

      if (parts.length === 1) {
        return {
          serial: String(index + 1),
          topic: parts[0],
          duration: '',
          note: '',
          section: '',
        }
      }

      if (parts.length === 2) {
        return {
          serial: parts[0],
          topic: parts[1],
          duration: '',
          note: '',
          section: '',
        }
      }

      if (parts.length === 3) {
        return {
          serial: parts[0],
          topic: parts[1],
          duration: parts[2],
          note: '',
          section: '',
        }
      }

      if (parts.length === 4) {
        return {
          serial: parts[0],
          topic: parts[1],
          duration: parts[2],
          note: parts[3],
          section: '',
        }
      }

      return {
        section: parts[0],
        serial: parts[1],
        topic: parts[2],
        duration: parts[3] || '',
        note: parts[4] || '',
      }
    })
    .filter(Boolean)
}

function formatJsonField(value) {
  if (!Array.isArray(value) || value.length === 0) return ''
  return JSON.stringify(value, null, 2)
}

function parseJsonField(rawValue, fieldLabel) {
  const trimmedValue = String(rawValue || '').trim()
  if (!trimmedValue) return []

  try {
    const parsed = JSON.parse(trimmedValue)
    if (!Array.isArray(parsed)) {
      throw new Error(`${fieldLabel} يجب أن يكون على هيئة مصفوفة JSON.`)
    }
    return parsed
  } catch (error) {
    throw new Error(error?.message || `تعذر قراءة ${fieldLabel}.`)
  }
}

export default function AdminDashboard() {
  const { admin, adminLogout } = useAdminAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [realEstate, setRealEstate] = useState([])
  const [courses, setCourses] = useState([])
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const currentProjects = useMemo(
    () => projects.filter((project) => project.type === 'current'),
    [projects]
  )
  const previousProjects = useMemo(
    () => projects.filter((project) => project.type === 'previous'),
    [projects]
  )

  const loadRealEstate = async () => {
    const result = await api.realEstate.list()
    setRealEstate(result.data || [])
  }

  const loadCourses = async () => {
    const result = await api.courses.list()
    setCourses((result.data || []).map(mergeCourseWithFallbackForAdmin))
  }

  const loadProjects = async () => {
    const result = await api.projects.list()
    setProjects((result.data || []).map(mergeProjectWithDashboardDefaults))
  }

  const loadDashboard = async () => {
    setLoading(true)
    setError('')
    try {
      await Promise.all([loadRealEstate(), loadCourses(), loadProjects()])
    } catch (err) {
      setError(err?.message || 'حدث خطأ أثناء تحميل البيانات')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDashboard()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 flex-shrink-0 bg-white shadow-lg md:min-h-screen border-l border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">لوحة التحكم</h2>
          <p className="text-sm text-gray-500 truncate">{admin?.username}</p>
        </div>

        <nav className="p-2 space-y-1">
          {TABS.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-right transition-colors ${
                  isActive ? 'text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
                style={isActive ? { backgroundColor: '#b2884c' } : {}}
              >
                <Icon size={20} />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="p-2 mt-auto border-t border-gray-200">
          <Link
            to="/"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            <FiHome size={20} />
            <span>الموقع</span>
          </Link>
          <button
            type="button"
            onClick={adminLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50"
          >
            <FiLogOut size={20} />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm">
            {error}
          </div>
        )}

        {loading && (
          <div className="mb-4 py-2 px-4 rounded-lg bg-amber-50 text-amber-800 text-sm flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-amber-500 border-t-transparent" />
            جاري التحميل...
          </div>
        )}

        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">نظرة عامة</h1>
              <p className="text-gray-500 text-sm mt-1">
                ملخص سريع للأقسام المرتبطة بلوحة التحكم، مع روابط مباشرة لكل صفحة.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <StatCard label="بطاقات العقارات" value={realEstate.length} icon={FiMapPin} />
              <StatCard label="الكورسات" value={courses.length} icon={FiBook} />
              <StatCard label="المشاريع الحالية" value={currentProjects.length} icon={FiFolder} />
              <StatCard label="المشاريع السابقة" value={previousProjects.length} icon={FiFolder} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <QuickLinkCard
                title="العروض"
                description="صفحة قراءة فقط في هذه المرحلة، بدون ربط ببطاقات من لوحة التحكم."
                dashboardAction={() => setActiveTab('offers')}
                dashboardLabel="فتح تبويب العروض"
                sitePath="/offers"
              />
              <QuickLinkCard
                title="التسويق العقاري"
                description={`عدد البطاقات الحالية: ${realEstate.length}`}
                dashboardAction={() => setActiveTab('real-estate')}
                dashboardLabel="إدارة بطاقات العقارات"
                sitePath="/real-estate-marketing"
              />
              <QuickLinkCard
                title="الكورسات"
                description={`عدد الكورسات الحالية: ${courses.length}`}
                dashboardAction={() => setActiveTab('courses')}
                dashboardLabel="إدارة الكورسات"
                sitePath="/surveying-services"
              />
              <QuickLinkCard
                title="المشاريع"
                description={`الحالية: ${currentProjects.length} | السابقة: ${previousProjects.length}`}
                dashboardAction={() => setActiveTab('projects')}
                dashboardLabel="إدارة المشاريع"
                sitePath="/current-projects"
                secondarySitePath="/previous-projects"
                secondarySiteLabel="عرض المشاريع السابقة"
              />
            </div>
          </div>
        )}

        {activeTab === 'offers' && (
          <div className="space-y-6">
            <SectionHeader
              title="العروض"
              description="العروض ثابتة حاليًا، ولا يتم إنشاء بطاقات لها من لوحة التحكم في هذه المرحلة."
              sitePath="/offers"
            />
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <RamadanOffersBlock />
              </div>
            </section>
          </div>
        )}

        {activeTab === 'real-estate' && (
          <CrudSection
            title="بطاقات التسويق العقاري"
            description="كل بطاقة تضاف هنا ستظهر فقط في صفحة التسويق العقاري."
            sitePath="/real-estate-marketing"
            siteLabel="عرض الصفحة في الموقع"
            items={realEstate}
            loading={loading}
            emptyMessage="لا توجد بطاقات عقارية حتى الآن."
            onReload={loadRealEstate}
            api={api.realEstate}
            columns={[
              { key: 'title', label: 'العنوان' },
              { key: 'description', label: 'الوصف', truncate: 90 },
              { key: 'category', label: 'التصنيف' },
              { key: 'price', label: 'السعر', format: formatCurrency },
            ]}
            formFields={[
              { key: 'title', label: 'العنوان', required: true },
              { key: 'description', label: 'الوصف', type: 'textarea' },
              { key: 'price', label: 'السعر', type: 'number' },
              { key: 'category', label: 'التصنيف', type: 'select', options: REAL_ESTATE_CATEGORIES },
              { key: 'contactLabel', label: 'نص زر التواصل' },
            ]}
          />
        )}

        {activeTab === 'courses' && (
          <CrudSection
            title="إدارة الكورسات"
            description="كل كورس يضاف هنا سيظهر فقط في صفحة الدورات وصفحات التفاصيل والحجز الخاصة به."
            sitePath="/surveying-services"
            siteLabel="عرض صفحة الدورات"
            items={courses}
            loading={loading}
            emptyMessage="لا توجد كورسات حتى الآن."
            onReload={loadCourses}
            api={api.courses}
            columns={[
              { key: 'name', label: 'اسم الكورس' },
              { key: 'description', label: 'الوصف', truncate: 90 },
              { key: 'duration', label: 'المدة' },
              { key: 'price', label: 'السعر', format: formatCurrency },
            ]}
            formFields={[
              { key: 'name', label: 'اسم الكورس', required: true },
              { key: 'description', label: 'الوصف', type: 'textarea' },
              { key: 'price', label: 'السعر', type: 'number' },
              { key: 'duration', label: 'المدة' },
              { key: 'level', label: 'المستوى' },
              { key: 'instructor', label: 'المدرب' },
              { key: 'instructorBio', label: 'نبذة عن المدرب', type: 'textarea' },
              { key: 'importance', label: 'أهمية الكورس', type: 'textarea' },
              {
                key: 'usefulness',
                label: 'كيفية استفادة الطالب من الكورس',
                type: 'textarea',
                multilineList: true,
                helpText: 'اكتب كل فائدة أو نتيجة في سطر منفصل.',
              },
              { key: 'registrationLink', label: 'رابط التسجيل', type: 'url' },
              { key: 'videoUrl', label: 'رابط الفيديو', type: 'url' },
              { key: 'whatsappNumber', label: 'رقم الواتساب', type: 'tel' },
              {
                key: 'content',
                label: 'محتوى الكورس',
                type: 'textarea',
                multilineList: true,
                helpText: 'اكتب كل عنصر في سطر منفصل.',
              },
              {
                key: 'benefits',
                label: 'مميزات الدورة',
                type: 'textarea',
                multilineList: true,
                helpText: 'اكتب كل ميزة في سطر منفصل.',
              },
              {
                key: 'syllabusText',
                payloadKey: 'syllabus',
                label: 'الخطة التفصيلية للكورس',
                type: 'textarea',
                rows: 8,
                getValue: (source) => formatSyllabusField(source.syllabus),
                parseValue: (rawValue) => parseSyllabusField(rawValue),
                helpText:
                  'اكتب كل سطر بهذا الشكل: القسم | المسلسل | المحور | المدة | الملاحظة. ويمكن حذف القسم إذا لم يكن مطلوبًا.',
              },
            ]}
          />
        )}

        {activeTab === 'projects' && (
          <div className="space-y-8">
            <CrudSection
              title="المشاريع الحالية"
              description="الإضافة من هذا القسم تضبط نوع المشروع على current بشكل افتراضي."
              sitePath="/current-projects"
              siteLabel="عرض المشاريع الحالية"
              items={currentProjects}
              loading={loading}
              emptyMessage="لا توجد مشاريع حالية حتى الآن."
              onReload={loadProjects}
              api={api.projects}
              createDefaults={mergeProjectWithDashboardDefaults({ type: 'current' })}
              columns={[
                { key: 'name', label: 'اسم المشروع' },
                { key: 'description', label: 'الوصف', truncate: 100 },
                {
                  key: 'type',
                  label: 'النوع',
                  format: (value) => (value === 'current' ? 'مشروع حالي' : 'مشروع سابق'),
                },
              ]}
              formFields={projectFormFields}
            />

            <CrudSection
              title="المشاريع السابقة"
              description="الإضافة من هذا القسم تضبط نوع المشروع على previous بشكل افتراضي."
              sitePath="/previous-projects"
              siteLabel="عرض المشاريع السابقة"
              items={previousProjects}
              loading={loading}
              emptyMessage="لا توجد مشاريع سابقة حتى الآن."
              onReload={loadProjects}
              api={api.projects}
              createDefaults={mergeProjectWithDashboardDefaults({ type: 'previous' })}
              showAllImages
              extraContent={<PreviousProjectsStaticGallery />}
              columns={[
                { key: 'name', label: 'اسم المشروع' },
                { key: 'description', label: 'الوصف', truncate: 100 },
                {
                  key: 'type',
                  label: 'النوع',
                  format: (value) => (value === 'current' ? 'مشروع حالي' : 'مشروع سابق'),
                },
              ]}
              formFields={projectFormFields}
            />
          </div>
        )}
      </main>
    </div>
  )
}

const projectFormFields = [
  { key: 'name', label: 'اسم المشروع', required: true },
  { key: 'description', label: 'وصف مختصر', type: 'textarea' },
  { key: 'longDescription', label: 'وصف صفحة التفاصيل', type: 'textarea', rows: 6 },
  { key: 'location', label: 'المدينة أو المنطقة' },
  { key: 'address', label: 'العنوان التفصيلي', type: 'textarea', rows: 3 },
  { key: 'categoryLabel', label: 'تصنيف المشروع' },
  { key: 'statusLabel', label: 'حالة المشروع' },
  { key: 'completionDate', label: 'تاريخ الانتهاء', type: 'date' },
  { key: 'floors', label: 'عدد الطوابق', type: 'number' },
  { key: 'progress', label: 'نسبة الإنجاز', type: 'number' },
  { key: 'units', label: 'عدد الوحدات', type: 'number' },
  {
    key: 'features',
    label: 'مميزات المشروع',
    type: 'textarea',
    multilineList: true,
    helpText: 'اكتب كل ميزة في سطر منفصل.',
  },
  { key: 'offerTitle', label: 'عنوان عرض التقسيط' },
  {
    key: 'offerDescription',
    label: 'وصف عرض التقسيط',
    type: 'textarea',
    rows: 4,
  },
  {
    key: 'offerBadges',
    label: 'نسب عرض التقسيط',
    type: 'textarea',
    multilineList: true,
    helpText: 'اكتب كل نسبة أو شارة في سطر منفصل مثل 20% أو 40%.',
  },
  { key: 'latitude', label: 'خط العرض', type: 'number' },
  { key: 'longitude', label: 'خط الطول', type: 'number' },
  { key: 'video', label: 'رابط فيديو المشروع', type: 'url' },
  { key: 'type', label: 'نوع المشروع', type: 'select', options: PROJECT_TYPES },
  {
    key: 'imagesText',
    payloadKey: 'images',
    label: 'روابط الصور الإضافية',
    type: 'textarea',
    multilineList: true,
    helpText: 'كل رابط صورة في سطر منفصل. سيُستخدم الحقل لتعبئة معرض الصور في صفحة المشروع.',
  },
  {
    key: 'towersJson',
    payloadKey: 'towers',
    label: 'بيانات الأبراج والشقق (JSON)',
    type: 'textarea',
    rows: 12,
    getValue: (source) => formatJsonField(source.towers),
    parseValue: (rawValue) => parseJsonField(rawValue, 'بيانات الأبراج والشقق'),
    helpText: 'اختياري. أدخل مصفوفة JSON إذا أردت إدارة الأبراج والشقق من لوحة التحكم.',
  },
]

function SectionHeader({ title, description, sitePath }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      </div>
      {sitePath && (
        <Link
          to={sitePath}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:underline"
        >
          <FiExternalLink size={16} />
          <span>عرض الصفحة في الموقع</span>
        </Link>
      )}
    </div>
  )
}

function QuickLinkCard({
  title,
  description,
  dashboardAction,
  dashboardLabel,
  sitePath,
  secondarySitePath,
  secondarySiteLabel,
}) {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4">
      <div>
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={dashboardAction}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium"
          style={{ backgroundColor: '#b2884c' }}
        >
          <span>{dashboardLabel}</span>
        </button>
        <Link
          to={sitePath}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-100 text-primary-700 text-sm font-medium"
        >
          <FiExternalLink size={15} />
          <span>عرض الصفحة</span>
        </Link>
        {secondarySitePath && secondarySiteLabel && (
          <Link
            to={secondarySitePath}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium"
          >
            <FiExternalLink size={15} />
            <span>{secondarySiteLabel}</span>
          </Link>
        )}
      </div>
    </section>
  )
}

function StatCard({ label, value, icon: Icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow p-6 flex items-center justify-between"
    >
      <div>
        <p className="text-gray-500 text-sm">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      <div className="p-3 rounded-lg bg-primary-100">
        <Icon className="text-primary-600" size={24} />
      </div>
    </motion.div>
  )
}

function CrudSection({
  title,
  description,
  sitePath,
  siteLabel,
  items,
  loading,
  emptyMessage,
  onReload,
  api,
  columns,
  formFields,
  createDefaults = {},
  showAllImages = false,
  extraContent = null,
}) {
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({})
  const [saving, setSaving] = useState(false)
  const [failedImageIds, setFailedImageIds] = useState(() => new Set())

  const titleKey = columns[0]?.key || formFields[0]?.payloadKey || formFields[0]?.key || 'name'

  const buildFormState = (source = {}) => {
    const nextForm = {}
    formFields.forEach((field) => {
      const storageKey = field.payloadKey || field.key
      const rawValue = field.getValue ? field.getValue(source) : source[storageKey]
      nextForm[field.key] = field.getValue
        ? rawValue ?? ''
        : field.multilineList
          ? Array.isArray(rawValue) ? rawValue.join('\n') : ''
          : rawValue ?? ''
    })
    nextForm.image = source.image ?? ''
    return nextForm
  }

  const openCreate = () => {
    setEditing(null)
    setForm(buildFormState(createDefaults))
    setModalOpen(true)
  }

  const openEdit = (item) => {
    setEditing(item)
    setForm(buildFormState(item))
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditing(null)
    setForm({})
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)
    try {
      const payload = {}
      formFields.forEach((field) => {
        const storageKey = field.payloadKey || field.key
        const rawValue = form[field.key]

        if (field.parseValue) {
          payload[storageKey] = field.parseValue(rawValue, form)
          return
        }

        payload[storageKey] = field.multilineList
          ? String(rawValue || '')
              .split(/\r?\n/)
              .map((item) => item.trim())
              .filter(Boolean)
          : rawValue
      })
      payload.image = form.image ?? ''

      if (editing) {
        await api.update(editing._id, payload)
      } else {
        await api.create(payload)
      }

      closeModal()
      await onReload()
    } catch (err) {
      window.alert(err?.message || 'حدث خطأ أثناء الحفظ')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('هل أنت متأكد من الحذف؟')) return
    try {
      await api.delete(id)
      await onReload()
    } catch (err) {
      window.alert(err?.message || 'حدث خطأ أثناء الحذف')
    }
  }

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-5 border-b border-gray-100 bg-gray-50/60">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{title}</h1>
            {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
          </div>
          <div className="flex flex-wrap gap-3">
            {sitePath && (
              <Link
                to={sitePath}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-100 text-primary-700 text-sm font-medium"
              >
                <FiExternalLink size={15} />
                <span>{siteLabel || 'عرض الصفحة'}</span>
              </Link>
            )}
            <button
              type="button"
              onClick={openCreate}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium"
              style={{ backgroundColor: '#b2884c' }}
            >
              <FiPlus size={16} />
              <span>إضافة</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-6">
        {extraContent}
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-500" />
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-8 text-center text-sm text-gray-500">
            {emptyMessage}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {items.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
              >
                <div className="aspect-video bg-gray-100">
                  {item.image && !failedImageIds.has(item._id) ? (
                    <img
                      src={apiImage(item.image)}
                      alt={item[titleKey] || ''}
                      className="w-full h-full object-cover"
                      onError={() => setFailedImageIds((state) => new Set([...state, item._id]))}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                      بدون صورة
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h2 className="font-bold text-gray-900 mb-3">{item[titleKey] || '—'}</h2>
                  <div className="space-y-1.5 text-sm text-gray-600">
                    {columns.slice(1).map((column) => (
                      <p key={column.key}>
                        <span className="font-medium text-gray-700">{column.label}:</span>{' '}
                        {formatColumnValue(item[column.key], column)}
                      </p>
                    ))}
                  </div>
                  {showAllImages && Array.isArray(item.images) && item.images.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        جميع الصور ({item.images.length})
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {item.images.map((src, index) => (
                          <div
                            key={`${item._id}-image-${index}`}
                            className="aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200"
                          >
                            <img
                              src={apiImage(src)}
                              alt=""
                              className="w-full h-full object-cover"
                              onError={(event) => {
                                event.currentTarget.style.display = 'none'
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex gap-2 mt-4">
                    <button
                      type="button"
                      onClick={() => openEdit(item)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary-100 text-primary-700 text-sm font-medium"
                    >
                      <FiEdit size={14} />
                      تعديل
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item._id)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-sm font-medium"
                    >
                      <FiTrash2 size={14} />
                      حذف
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={closeModal}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold text-gray-900">
                {editing ? 'تعديل العنصر' : 'إضافة عنصر جديد'}
              </h2>
              <button type="button" onClick={closeModal} className="p-2 rounded-lg hover:bg-gray-100">
                <FiX size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              {formFields.map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      value={form[field.key] ?? ''}
                      onChange={(event) => setForm((state) => ({ ...state, [field.key]: event.target.value }))}
                      rows={field.rows || 4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  ) : field.type === 'select' ? (
                    <select
                      value={form[field.key] ?? ''}
                      onChange={(event) => setForm((state) => ({ ...state, [field.key]: event.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">اختر</option>
                      {field.options?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type || 'text'}
                      value={form[field.key] ?? ''}
                      onChange={(event) => setForm((state) => ({ ...state, [field.key]: event.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  )}
                  {field.helpText && <p className="text-xs text-gray-500 mt-1">{field.helpText}</p>}
                </div>
              ))}

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">الصورة</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  onChange={(event) => {
                    const file = event.target.files?.[0]
                    if (!file) return
                    const reader = new FileReader()
                    reader.onload = () => setForm((state) => ({ ...state, image: reader.result }))
                    reader.readAsDataURL(file)
                    event.target.value = ''
                  }}
                />
                <input
                  type="url"
                  value={typeof form.image === 'string' && !form.image.startsWith('data:') ? form.image : ''}
                  onChange={(event) => setForm((state) => ({ ...state, image: event.target.value }))}
                  placeholder="أو أدخل رابط الصورة"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
                {form.image && (
                  <img
                    src={typeof form.image === 'string' && form.image.startsWith('data:') ? form.image : apiImage(form.image)}
                    alt=""
                    className="h-24 w-24 rounded-lg object-cover border border-gray-200"
                  />
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-2 rounded-lg text-white font-medium disabled:opacity-50"
                  style={{ backgroundColor: '#b2884c' }}
                >
                  {saving ? 'جارٍ الحفظ...' : editing ? 'حفظ التعديلات' : 'إضافة'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </section>
  )
}

function PreviousProjectsStaticGallery() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <h2 className="text-lg font-bold text-gray-900">صور صفحة المشاريع السابقة</h2>
        <p className="text-sm text-gray-600 mt-1">
          هذه الصور ثابتة ومأخوذة من صفحة المشاريع السابقة في الموقع، وتظهر هنا للمتابعة فقط بدون تعديل أو حذف.
        </p>
      </div>

      <div className="space-y-5">
        {FALLBACK_PREVIOUS_PROJECTS.map((project) => (
          <StaticProjectImagesCard key={project.id} project={project} />
        ))}

        <StaticImageGalleryBlock
          title="صور أبراج إعمار في صفحة المشاريع السابقة"
          images={FALLBACK_PREVIOUS_PROJECT_EMAAR_IMAGES}
        />
        <StaticImageGalleryBlock
          title="معرض الصور في صفحة المشاريع السابقة"
          images={FALLBACK_PREVIOUS_PROJECT_GALLERY_IMAGES}
        />
      </div>
    </div>
  )
}

function StaticProjectImagesCard({ project }) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-gray-50/60 overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-white">
        <h3 className="text-base font-bold text-gray-900">{project.title}</h3>
        <p className="text-sm text-gray-500 mt-1">{project.description}</p>
      </div>
      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3">
        {project.images.map((image, index) => (
          <StaticImageThumb
            key={`${project.id}-${index}`}
            src={image}
            alt={`${project.title} ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

function StaticImageGalleryBlock({ title, images }) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-base font-bold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">إجمالي الصور: {images.length}</p>
      </div>
      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3">
        {images.map((image, index) => (
          <StaticImageThumb key={`${title}-${index}`} src={image} alt={`${title} ${index + 1}`} />
        ))}
      </div>
    </section>
  )
}

function StaticImageThumb({ src, alt }) {
  return (
    <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
      <img
        src={apiImage(src)}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
        onError={(event) => {
          event.currentTarget.style.display = 'none'
        }}
      />
    </div>
  )
}

function formatCurrency(value) {
  if (value === null || value === undefined || value === '') return '—'
  return `${Number(value).toLocaleString()} ج.م`
}

function formatColumnValue(value, column) {
  if (column.format) return column.format(value)
  if (value === null || value === undefined || value === '') return '—'
  if (Array.isArray(value)) return value.join('، ') || '—'
  if (column.truncate && String(value).length > column.truncate) {
    return `${String(value).slice(0, column.truncate)}...`
  }
  return String(value)
}

function RamadanOffersBlock() {
  return (
    <div
      className="rounded-xl p-6 text-white"
      style={{ background: 'linear-gradient(135deg, #d6ac72 0%, #c49a5f 50%, #b2884c 100%)' }}
    >
      <p className="text-2xl font-extrabold mb-3 text-center">انتظروا عروضنا</p>
      <p className="text-center text-sm md:text-base leading-7 text-white/95">
        صفحة العروض في الموقع تعرض حاليًا رسالة انتظار للعروض القادمة بدل عرض رمضان القديم.
      </p>
      <div className="mt-5 rounded-2xl border border-white/30 bg-white/15 p-4 text-sm md:text-base">
        <p className="font-bold mb-2">المتاح الآن:</p>
        <p className="leading-7">
          يمكن للعميل زيارة المشاريع الحالية والاستفسار عن عرض نظام التقسيط 20% و40%.
        </p>
      </div>
      <p className="text-center font-bold mt-4 text-lg">
        هذا التبويب للمتابعة فقط ولا يحتوي على بطاقات عروض قابلة للإدارة حاليًا.
      </p>
    </div>
  )
}
