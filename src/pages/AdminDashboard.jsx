import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiHome,
  FiPackage,
  FiMapPin,
  FiBook,
  FiFolder,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiX,
  FiLogOut,
  FiTag,
} from 'react-icons/fi'
import { useAdminAuth } from '../contexts/AdminAuthContext'
import { api, apiImage, seedIfEmpty } from '../services/api'

const TABS = [
  { id: 'overview', label: 'نظرة عامة', icon: FiHome },
  { id: 'offers', label: 'العروض', icon: FiTag },
  { id: 'real-estate', label: 'بطاقات التسويق العقاري', icon: FiMapPin },
  { id: 'courses', label: 'إدارة الكورسات', icon: FiBook },
  { id: 'projects', label: 'إدارة المشاريع', icon: FiFolder },
]

export default function AdminDashboard() {
  const { admin, adminLogout } = useAdminAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [stats, setStats] = useState({ products: 0, realEstate: 0, courses: 0, projects: 0 })
  const [products, setProducts] = useState([])
  const [realEstate, setRealEstate] = useState([])
  const [courses, setCourses] = useState([])
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [overviewProducts, setOverviewProducts] = useState([])
  const [overviewRealEstate, setOverviewRealEstate] = useState([])
  const [overviewCourses, setOverviewCourses] = useState([])
  const [overviewProjects, setOverviewProjects] = useState([])

  /** فتح مودال الإضافة أو التعديل من أزرار السيكشن — نحدد التبويب ثم نطلق التريجر */
  const [triggerAddForTab, setTriggerAddForTab] = useState(null)
  const [triggerEditForTab, setTriggerEditForTab] = useState(null)

  const loadOverview = async () => {
    try {
      try { seedIfEmpty() } catch (_) { /* تجاهل خطأ البذرة */ }
      const [p, r, c, pr] = await Promise.all([
        api.products.list(),
        api.realEstate.list(),
        api.courses.list(),
        api.projects.list(),
      ])
      const productList = p.data || []
      const realEstateList = r.data || []
      const coursesList = c.data || []
      const projectList = pr.data || []
      setStats({
        products: productList.length,
        realEstate: realEstateList.length,
        courses: coursesList.length,
        projects: projectList.length,
      })
      setOverviewProducts(productList)
      setOverviewRealEstate(realEstateList)
      setOverviewCourses(coursesList)
      setOverviewProjects(projectList)
    } catch (e) {
      setError(e?.message || 'حدث خطأ في تحميل البيانات')
    }
  }

  const loadProducts = () =>
    api.products.list().then((r) => {
      const data = r.data || []
      setProducts(data)
      setStats((s) => ({ ...s, products: data.length }))
    })
  const loadRealEstate = () =>
    api.realEstate.list().then((r) => {
      const data = r.data || []
      setRealEstate(data)
      setStats((s) => ({ ...s, realEstate: data.length }))
    })
  const loadCourses = () =>
    api.courses.list().then((r) => {
      const data = r.data || []
      setCourses(data)
      setStats((s) => ({ ...s, courses: data.length }))
    })
  const loadProjects = () =>
    api.projects.list().then((r) => {
      const data = r.data || []
      setProjects(data)
      setStats((s) => ({ ...s, projects: data.length }))
    })

  const loadAllForStats = () => {
    return Promise.all([
      api.products.list(),
      api.realEstate.list(),
      api.courses.list(),
      api.projects.list(),
    ]).then(([p, r, c, pr]) => {
      const pl = p.data || []
      const rl = r.data || []
      const cl = c.data || []
      const prl = pr.data || []
      setProducts(pl)
      setRealEstate(rl)
      setCourses(cl)
      setProjects(prl)
      setStats({ products: pl.length, realEstate: rl.length, courses: cl.length, projects: prl.length })
    })
  }

  useEffect(() => {
    setLoading(true)
    setError('')
    if (activeTab === 'overview') {
      loadOverview().finally(() => setLoading(false))
    } else if (activeTab === 'offers') {
      setLoading(false)
    } else {
      loadAllForStats().finally(() => setLoading(false))
    }
  }, [activeTab])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside className="w-full md:w-64 flex-shrink-0 bg-white shadow-lg md:min-h-screen border-l border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">لوحة التحكم</h2>
          <p className="text-sm text-gray-500 truncate">{admin?.username}</p>
        </div>
        <nav className="p-2 space-y-1">
          {TABS.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-right transition-colors ${
                  activeTab === tab.id ? 'text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
                style={activeTab === tab.id ? { backgroundColor: '#b2884c' } : {}}
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
            onClick={adminLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50"
          >
            <FiLogOut size={20} />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Main — نعرض دائماً الأرقام وجميع السكاشن وجميع الصور */}
      <main className="flex-1 p-4 md:p-8 min-h-[70vh] overflow-y-auto">
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
          <div className="space-y-10">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">نظرة عامة</h1>
              <p className="text-gray-500 text-sm mt-1">جميع الأعداد والصور والأقسام في مكان واحد</p>
            </div>

            {/* الإحصائيات — جميع الأعداد */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FiPackage size={20} className="text-primary-600" /> الإحصائيات
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="العروض" value="—" icon={FiTag} />
                <StatCard label="بطاقات العقارات" value={stats.realEstate} icon={FiMapPin} />
                <StatCard label="الكورسات" value={stats.courses} icon={FiBook} />
                <StatCard label="عدد المشاريع" value={stats.projects} icon={FiFolder} />
              </div>
            </section>

            {/* قسم ١: العروض — عروض رمضان (بدون بطاقات منتجات) */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b border-gray-100 bg-gray-50/50">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-100 text-primary-700 font-bold text-sm">1</span>
                  العروض — عروض رمضان
                </h2>
                <SectionActions setActiveTab={setActiveTab} tabId="offers" setTriggerAddForTab={setTriggerAddForTab} setTriggerEditForTab={setTriggerEditForTab} />
              </div>
              <div className="p-4">
                <RamadanOffersBlock />
              </div>
            </section>

            {/* قسم ٢: بطاقات التسويق العقاري — قريباً (بدون بطاقات) */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b border-gray-100 bg-gray-50/50">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-100 text-primary-700 font-bold text-sm">2</span>
                  بطاقات التسويق العقاري
                </h2>
                <SectionActions setActiveTab={setActiveTab} tabId="real-estate" />
              </div>
              <div className="p-4 flex items-center justify-center min-h-[180px]">
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-primary-600 mb-2">قريباً</h3>
                  <p className="text-gray-500 text-sm">سيتم إضافة بطاقات التسويق العقاري قريباً</p>
                </div>
              </div>
            </section>

            {/* قسم ٣: الكورسات */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b border-gray-100 bg-gray-50/50">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-100 text-primary-700 font-bold text-sm">3</span>
                  الكورسات <span className="text-gray-500 font-normal">({stats.courses})</span>
                </h2>
                <SectionActions setActiveTab={setActiveTab} tabId="courses" setTriggerAddForTab={setTriggerAddForTab} setTriggerEditForTab={setTriggerEditForTab} />
              </div>
              <div className="p-4">
                {overviewCourses.length === 0 ? (
                  <div className="rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-8 text-center">
                    <FiBook className="mx-auto text-gray-300 mb-2" size={48} />
                    <p className="text-gray-500 text-sm">لا توجد كورسات. الصور ستظهر هنا عند الإضافة.</p>
                    <p className="text-gray-400 text-xs mt-1">اضغط «إدارة الكورسات» أعلاه للإضافة.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {overviewCourses.map((item) => <DashboardImageCard key={item._id} item={item} type="course" />)}
                  </div>
                )}
              </div>
            </section>

            {/* قسم ٤: المشاريع — نعرض المشاريع دائماً (من لوحة التحكم أو بطاقتي أبراج إعمار ورويال سيتي) */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b border-gray-100 bg-gray-50/50">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-100 text-primary-700 font-bold text-sm">4</span>
                  المشاريع <span className="text-gray-500 font-normal">({stats.projects})</span>
                </h2>
                <SectionActions setActiveTab={setActiveTab} tabId="projects" setTriggerAddForTab={setTriggerAddForTab} setTriggerEditForTab={setTriggerEditForTab} />
              </div>
              <div className="p-4">
                {overviewProjects.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {overviewProjects.map((item) => <DashboardImageCard key={item._id} item={item} type="project" />)}
                  </div>
                ) : (
                  <>
                    <p className="text-gray-500 text-sm mb-4">بطاقات المشاريع الحالية (أبراج إعمار، رويال سيتي):</p>
                    <CurrentProjectsCardsFromPage />
                  </>
                )}
              </div>
            </section>

            {/* معرض جميع صور المشاريع السابقة */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b border-gray-100 bg-gray-50/50">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">معرض جميع صور المشاريع السابقة</h2>
                  <p className="text-sm text-gray-500 mt-0.5">كل الصور من مشاريعنا السابقة (مبنى البريد، شركة الحربي، البوابات، إلخ)</p>
                </div>
                <SectionActions setActiveTab={setActiveTab} tabId="projects" setTriggerAddForTab={setTriggerAddForTab} setTriggerEditForTab={setTriggerEditForTab} />
              </div>
              <div className="p-4">
                <PreviousProjectsImagesGallery projects={overviewProjects} staticPrevious={PREVIOUS_PROJECTS_STATIC} />
              </div>
            </section>

            {/* معرض جميع الصور من كل الأقسام */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b border-gray-100 bg-gray-50/50">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">معرض جميع الصور</h2>
                  <p className="text-sm text-gray-500 mt-0.5">كل الصور من العروض، العقارات، الكورسات، والمشاريع (بما فيها أبراج إعمار ورويال سيتي)</p>
                </div>
                <SectionActions setActiveTab={setActiveTab} tabId="projects" setTriggerAddForTab={setTriggerAddForTab} setTriggerEditForTab={setTriggerEditForTab} />
              </div>
              <div className="p-4">
                <AllImagesGallery
                  products={overviewProducts}
                  realEstate={overviewRealEstate}
                  courses={overviewCourses}
                  projects={overviewProjects}
                  staticProjects={CURRENT_PROJECTS_FROM_PAGE}
                />
              </div>
            </section>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <p className="text-gray-600 text-sm">العروض (رمضان)، بطاقات التسويق (قريباً)، الكورسات، والمشاريع (أبراج إعمار، رويال سيتي، والمشاريع السابقة). معرض الصور يعرض جميع صور المشاريع السابقة.</p>
            </div>
          </div>
        )}
        {activeTab === 'offers' && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatCard label="العروض" value="—" icon={FiTag} />
              <StatCard label="بطاقات العقارات" value={stats.realEstate} icon={FiMapPin} />
              <StatCard label="الكورسات" value={stats.courses} icon={FiBook} />
              <StatCard label="عدد المشاريع" value={stats.projects} icon={FiFolder} />
            </div>
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b border-gray-100">
                <h1 className="text-xl font-bold text-gray-900">عروض رمضان</h1>
                <SectionActions setActiveTab={setActiveTab} tabId="offers" setTriggerAddForTab={setTriggerAddForTab} setTriggerEditForTab={setTriggerEditForTab} />
              </div>
              <div className="p-6">
                <RamadanOffersBlock />
              </div>
              <div className="p-4 border-t border-gray-100">
                <Link to="/offers" className="text-primary-600 font-semibold text-sm hover:underline">عرض صفحة العروض في الموقع ←</Link>
              </div>
            </section>
          </>
        )}
        {activeTab === 'real-estate' && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatCard label="العروض" value="—" icon={FiTag} />
              <StatCard label="بطاقات العقارات" value={stats.realEstate} icon={FiMapPin} />
              <StatCard label="الكورسات" value={stats.courses} icon={FiBook} />
              <StatCard label="عدد المشاريع" value={stats.projects} icon={FiFolder} />
            </div>
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b border-gray-100">
                <h1 className="text-xl font-bold text-gray-900">بطاقات التسويق العقاري</h1>
                <SectionActions setActiveTab={setActiveTab} tabId="real-estate" />
              </div>
              <div className="p-12 flex items-center justify-center min-h-[320px]">
                <div className="text-center">
                  <h2 className="text-4xl font-bold mb-2" style={{ color: '#b2884c' }}>قريباً</h2>
                  <p className="text-gray-500">سيتم إضافة بطاقات التسويق العقاري قريباً</p>
                </div>
              </div>
            </section>
          </>
        )}
        {activeTab === 'courses' && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatCard label="العروض" value="—" icon={FiTag} />
              <StatCard label="بطاقات العقارات" value={stats.realEstate} icon={FiMapPin} />
              <StatCard label="الكورسات" value={stats.courses} icon={FiBook} />
              <StatCard label="عدد المشاريع" value={stats.projects} icon={FiFolder} />
            </div>
            <CrudSection
              title="إدارة الكورسات"
              items={courses}
              loading={loading}
              onReload={loadCourses}
              fields={[
                { key: 'name', label: 'اسم الكورس' },
                { key: 'description', label: 'الوصف', truncate: 60 },
                { key: 'price', label: 'السعر' },
              ]}
              imageKey="image"
              api={api.courses}
              formLabels={{ name: 'اسم الكورس', description: 'الوصف', price: 'السعر', registrationLink: 'رابط التسجيل' }}
              extraFields={[{ key: 'registrationLink', label: 'رابط التسجيل' }]}
              triggerOpenAdd={triggerAddForTab === 'courses'}
              onOpenAddDone={() => setTriggerAddForTab(null)}
              triggerOpenEdit={triggerEditForTab === 'courses'}
              onOpenEditDone={() => setTriggerEditForTab(null)}
            />
            <section className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                <h2 className="text-lg font-bold text-gray-900">معرض جميع الصور (كل الأقسام)</h2>
                <p className="text-sm text-gray-500 mt-0.5">جميع الصور من العروض، العقارات، الكورسات، والمشاريع</p>
              </div>
              <div className="p-4">
                <AllImagesGallery products={products} realEstate={realEstate} courses={courses} projects={projects} staticProjects={CURRENT_PROJECTS_FROM_PAGE} />
              </div>
            </section>
            <AllProductsAndProjectsBlock products={products} projects={projects} setActiveTab={setActiveTab} showProducts={true} showProjects={true} />
          </>
        )}
        {activeTab === 'projects' && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatCard label="العروض" value="—" icon={FiTag} />
              <StatCard label="بطاقات العقارات" value={stats.realEstate} icon={FiMapPin} />
              <StatCard label="الكورسات" value={stats.courses} icon={FiBook} />
              <StatCard label="عدد المشاريع" value={stats.projects} icon={FiFolder} />
            </div>

            {/* بطاقات المشاريع الحالية — من صفحة المشاريع الحالية: أبراج إعمار + رويال سيتي */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b border-gray-100 bg-gray-50/50">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">المشاريع الحالية</h2>
                  <p className="text-sm text-gray-500 mt-0.5">بطاقة أبراج إعمار وبطاقة رويال سيتي (من صفحة المشاريع الحالية)</p>
                </div>
                <SectionActions setActiveTab={setActiveTab} tabId="projects" setTriggerAddForTab={setTriggerAddForTab} setTriggerEditForTab={setTriggerEditForTab} />
              </div>
              <div className="p-4">
                <CurrentProjectsCardsFromPage />
                {projects.filter((p) => p.type === 'current').length > 0 && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="text-base font-bold text-gray-800 mb-4">مشاريع إضافية من لوحة التحكم</h3>
                    <div className="space-y-8">
                      {projects.filter((p) => p.type === 'current').map((project) => (
                        <ProjectCardWithAllImages key={project._id} project={project} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* صور مشاريعنا السابقة — جميع الصور */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b border-gray-100 bg-gray-50/50">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">صور مشاريعنا السابقة — جميع الصور</h2>
                  <p className="text-sm text-gray-500 mt-0.5">مشاريع نوع previous — نفس الصور في صفحة الموقع</p>
                </div>
                <SectionActions setActiveTab={setActiveTab} tabId="projects" setTriggerAddForTab={setTriggerAddForTab} setTriggerEditForTab={setTriggerEditForTab} />
              </div>
              <div className="p-4 space-y-8">
                {projects.filter((p) => p.type === 'previous').length === 0 ? (
                  <>
                    <p className="text-gray-500 text-sm mb-4">لا توجد مشاريع سابقة من لوحة التحكم. معرض الصور أدناه من مشاريعنا السابقة (مبنى البريد، شركة الحربي، البوابات).</p>
                    <PreviousProjectsImagesGallery projects={[]} staticPrevious={PREVIOUS_PROJECTS_STATIC} />
                  </>
                ) : (
                  <>
                    {projects.filter((p) => p.type === 'previous').map((project) => (
                      <ProjectCardWithAllImages key={project._id} project={project} />
                    ))}
                  </>
                )}
              </div>
            </section>

            <CrudSection
              title="إدارة المشاريع (إضافة / تعديل / حذف)"
              items={projects}
              loading={loading}
              onReload={loadProjects}
              fields={[
                { key: 'name', label: 'اسم المشروع' },
                { key: 'description', label: 'الوصف', truncate: 60 },
                { key: 'type', label: 'النوع' },
              ]}
              imageKey="image"
              api={api.projects}
              formLabels={{ name: 'اسم المشروع', description: 'وصف المشروع', type: 'نوع (current أو previous)' }}
              extraFields={[{ key: 'type', label: 'النوع', options: ['current', 'previous'] }]}
              triggerOpenAdd={triggerAddForTab === 'projects'}
              onOpenAddDone={() => setTriggerAddForTab(null)}
              triggerOpenEdit={triggerEditForTab === 'projects'}
              onOpenEditDone={() => setTriggerEditForTab(null)}
            />
            <section className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b border-gray-100 bg-gray-50/50">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">معرض جميع الصور (كل الأقسام)</h2>
                  <p className="text-sm text-gray-500 mt-0.5">جميع الصور من العروض، العقارات، الكورسات، والمشاريع</p>
                </div>
                <SectionActions setActiveTab={setActiveTab} tabId="projects" setTriggerAddForTab={setTriggerAddForTab} setTriggerEditForTab={setTriggerEditForTab} />
              </div>
              <div className="p-4">
                <AllImagesGallery products={products} realEstate={realEstate} courses={courses} projects={projects} staticProjects={CURRENT_PROJECTS_FROM_PAGE} />
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  )
}

/** بطاقتا المشاريع الحالية من صفحة المشاريع الحالية: أبراج إعمار + رويال سيتي */
const CURRENT_PROJECTS_FROM_PAGE = [
  {
    id: 'emaar-towers',
    name: 'أبراج إعمار',
    description: 'مجمع أبراج فاخر بتصميم عصري وخدمات متكاملة. بنى سويف - حى الرمد. 4 أبراج، شقق سكنية وإدارية، محلات، بدروم.',
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
  },
  {
    id: 'royal-city',
    name: 'رويال سيتي',
    description: 'مجمع سكني راقي بتشطيبات فاخرة ومرافق متكاملة. امتداد الرمد خلف ارض الطيارين امام ابراج اعمار. 4 شقق بالدور.',
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
  },
]

/** مشاريع سابقة ثابتة لعرض صورها عند عدم وجود بيانات من لوحة التحكم */
const PREVIOUS_PROJECTS_STATIC = [
  { name: 'مبنى البريد - بنى سويف', images: ['/image/Beni Suef Post Office, Islamic Studies/Post office (1).jpg', '/image/Beni Suef Post Office, Islamic Studies/Post office (2).jpg', '/image/Beni Suef Post Office, Islamic Studies/Post office (3).jpg', '/image/Beni Suef Post Office, Islamic Studies/Post office (4).jpg', '/image/Beni Suef Post Office, Islamic Studies/Post office (5).jpg', '/image/Beni Suef Post Office, Islamic Studies/Post office (6).jpg', '/image/Beni Suef Post Office, Islamic Studies/Post office (7).jpg', '/image/Beni Suef Post Office, Islamic Studies/Post office (8).jpg', '/image/Beni Suef Post Office, Islamic Studies/Post office (9).jpg', '/image/Beni Suef Post Office, Islamic Studies/Post office (10).jpg', '/image/Beni Suef Post Office, Islamic Studies/Post office (11).jpg', '/image/Beni Suef Post Office, Islamic Studies/Post office (12).jpg', '/image/Beni Suef Post Office, Islamic Studies/Post office (13).jpg', '/image/Beni Suef Post Office, Islamic Studies/Post office (14).jpg', '/image/Beni Suef Post Office, Islamic Studies/Post office (15).jpg', '/image/Beni Suef Post Office, Islamic Studies/Post office (16).jpg', '/image/Beni Suef Post Office, Islamic Studies/Post office (17).jpg'] },
  { name: 'شركة الحربي', images: ['/image/Al-Harbi Company/Al-Harbi Company (1).jpg', '/image/Al-Harbi Company/Al-Harbi Company (2).jpg', '/image/Al-Harbi Company/Al-Harbi Company (3).jpg', '/image/Al-Harbi Company/Al-Harbi Company (4).jpg', '/image/Al-Harbi Company/Al-Harbi Company (5).jpg', '/image/Al-Harbi Company/Al-Harbi Company (6).jpg', '/image/Al-Harbi Company/Al-Harbi Company (7).jpg'] },
  { name: 'البوابات - الجامعة العمالية', images: ["/image/البوبات/الجامعة العمالية/Workers' University Gates (1).JPG", "/image/البوبات/الجامعة العمالية/Workers' University Gates (2).JPG", "/image/البوبات/الجامعة العمالية/Workers' University Gates (3).JPG", "/image/البوبات/الجامعة العمالية/Workers' University Gates (4).jpg", "/image/البوبات/الجامعة العمالية/Workers' University Gates (5).jpg", "/image/البوبات/الجامعة العمالية/Workers' University Gates (6).jpg", "/image/البوبات/الجامعة العمالية/Workers' University Gates (7).jpg", "/image/البوبات/الجامعة العمالية/Workers' University Gates (8).jpg", "/image/البوبات/الجامعة العمالية/Workers' University Gates (9).jpg", "/image/البوبات/الجامعة العمالية/Workers' University Gates (10).jpg", "/image/البوبات/الجامعة العمالية/Workers' University Gates (11).jpg", "/image/البوبات/الجامعة العمالية/Workers' University Gates (12).jpg", "/image/البوبات/الجامعة العمالية/Workers' University Gates (13).jpg", "/image/البوبات/الجامعة العمالية/Workers' University Gates (14).JPG", "/image/البوبات/الجامعة العمالية/Workers' University Gates (15).JPG", "/image/البوبات/الجامعة العمالية/Workers' University Gates (16).JPG"] },
  { name: 'البوابات - جامعة بنى سويف', images: ['/image/البوبات/جامعة بنى سويف/Beni Suef University Gates (1).JPG', '/image/البوبات/جامعة بنى سويف/Beni Suef University Gates (2).JPG', '/image/البوبات/جامعة بنى سويف/Beni Suef University Gates (3).JPG', '/image/البوبات/جامعة بنى سويف/Beni Suef University Gates (4).JPG'] },
]

function CurrentProjectsCardsFromPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {CURRENT_PROJECTS_FROM_PAGE.map((project) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden"
        >
          <div className="aspect-video bg-gray-100">
            <img
              src={apiImage(project.image)}
              alt=""
              className="w-full h-full object-cover"
              onError={(e) => { e.target.style.display = 'none' }}
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-bold text-gray-900">{project.name}</h3>
            <p className="text-sm text-gray-600 mt-1 line-clamp-3">{project.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.images.slice(0, 6).map((src, idx) => (
                <div key={idx} className="w-12 h-12 rounded overflow-hidden border border-gray-200 flex-shrink-0">
                  <img src={apiImage(src)} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
              {project.images.length > 6 && <span className="text-xs text-gray-500 self-center">+{project.images.length - 6}</span>}
            </div>
            <Link to="/current-projects" className="inline-block mt-3 text-sm font-semibold text-primary-600 hover:underline">عرض صفحة المشاريع الحالية ←</Link>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

/** كتلة عروض رمضان (نفس محتوى صفحة العروض) */
function RamadanOffersBlock() {
  return (
    <div className="rounded-xl p-6 text-white" style={{ background: 'linear-gradient(135deg, #d6ac72 0%, #c49a5f 50%, #b2884c 100%)' }}>
      <p className="text-xl font-bold mb-4">🎊 مسابقة رمضان المبارك — الجوائز:</p>
      <div className="space-y-3">
        <div className="bg-white/20 rounded-lg p-3 border border-white/30">
          <p className="font-bold flex items-center gap-2"><span>🥇</span> الجائزة الأولى:</p>
          <p className="text-sm pr-4">نص تشطيب "شقتك" مجاناً — لواحد من العملاء القدامى، التشطيب علينا!</p>
        </div>
        <div className="bg-white/20 rounded-lg p-3 border border-white/30">
          <p className="font-bold flex items-center gap-2"><span>🥈</span> الثانية:</p>
          <p className="text-sm pr-4">خصم 1000 جنيه على كل متر — لواحد من العملاء الجدد</p>
        </div>
        <div className="bg-white/20 rounded-lg p-3 border border-white/30">
          <p className="font-bold flex items-center gap-2"><span>🥉</span> الثالثة:</p>
          <p className="text-sm pr-4">خصم 10% على المصنعيات كلها — لواحد يشطب معنا</p>
        </div>
        <div className="bg-white/20 rounded-lg p-3 border border-white/30">
          <p className="font-bold flex items-center gap-2"><span>💰</span> الرابعة:</p>
          <p className="text-sm pr-4">5000 جنيه كاش — توزع على 5 فائزين</p>
        </div>
      </div>
      <p className="text-center font-bold mt-4 text-lg">شاركوا.. جاوبوا.. واكسبوا مع إعمار!</p>
    </div>
  )
}

/** معرض صور المشاريع السابقة فقط — يخفي الصور التي لا تظهر، ويعرض مشاريع ثابتة عند الفراغ */
function PreviousProjectsImagesGallery({ projects, staticPrevious = [] }) {
  const previous = (projects || []).filter((p) => p.type === 'previous')
  const source = previous.length > 0 ? previous : (staticPrevious.length > 0 ? staticPrevious : [])
  const list = []
  source.forEach((p) => {
    const imgs = (p.images && p.images.length) ? p.images : (p.image ? [p.image] : [])
    imgs.forEach((src) => list.push({ src, label: p.name }))
  })
  const [failedSrcs, setFailedSrcs] = useState(() => new Set())
  const visibleList = list.filter(({ src }) => !failedSrcs.has(src))
  const handleError = (src) => setFailedSrcs((s) => new Set([...s, src]))
  if (list.length === 0) {
    return (
      <div className="rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-8 text-center">
        <p className="text-gray-500 text-sm">لا توجد صور للمشاريع السابقة حتى الآن.</p>
      </div>
    )
  }
  return (
    <div className="space-y-2">
      {visibleList.length < list.length && <p className="text-xs text-gray-500">تم إخفاء {list.length - visibleList.length} صورة غير ظاهرة.</p>}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
        {visibleList.map(({ src, label }, idx) => (
          <div key={`${src}-${idx}`} className="aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200 group relative">
            <img src={apiImage(src)} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" onError={() => handleError(src)} />
            {label && <span className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 truncate opacity-0 group-hover:opacity-100 transition-opacity block">{label}</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

/** معرض يجمع جميع الصور — يخفي الصور التي لا تظهر (لا يعرض مكانها) */
function AllImagesGallery({ products = [], realEstate = [], courses = [], projects = [], staticProjects = [] }) {
  const list = []
  ;(products || []).forEach((p) => { if (p.image) list.push({ src: p.image, label: p.name }) })
  ;(realEstate || []).forEach((r) => { if (r.image) list.push({ src: r.image, label: r.title }) })
  ;(courses || []).forEach((c) => { if (c.image) list.push({ src: c.image, label: c.name }) })
  ;(projects || []).forEach((p) => {
    const imgs = (p.images && p.images.length) ? p.images : (p.image ? [p.image] : [])
    imgs.forEach((src) => list.push({ src, label: p.name }))
  })
  ;(staticProjects || []).forEach((p) => {
    const imgs = (p.images && p.images.length) ? p.images : (p.image ? [p.image] : [])
    imgs.forEach((src) => list.push({ src, label: p.name }))
  })
  const seen = new Set()
  const uniqueList = list.filter(({ src }) => {
    if (seen.has(src)) return false
    seen.add(src)
    return true
  })
  const [failedSrcs, setFailedSrcs] = useState(() => new Set())
  const visibleList = uniqueList.filter(({ src }) => !failedSrcs.has(src))
  const handleError = (src) => setFailedSrcs((s) => new Set([...s, src]))
  if (uniqueList.length === 0) {
    return (
      <div className="rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-8 text-center">
        <p className="text-gray-500 text-sm">لا توجد صور حتى الآن. أضف منتجات أو عقارات أو كورسات أو مشاريع من التبويبات أعلاه.</p>
      </div>
    )
  }
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">إجمالي الصور المعروضة: <strong>{visibleList.length}</strong>{visibleList.length < uniqueList.length ? ` (تم إخفاء ${uniqueList.length - visibleList.length} صورة غير ظاهرة)` : ''}</p>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
        {visibleList.map(({ src, label }, idx) => (
          <div key={`${src}-${idx}`} className="aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200 group relative">
            <img
              src={apiImage(src)}
              alt=""
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              onError={() => handleError(src)}
            />
            {label && <span className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 truncate opacity-0 group-hover:opacity-100 transition-opacity block">{label}</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

/** بطاقة مشروع مع عرض جميع الصور (من project.images أو project.image) */
function ProjectCardWithAllImages({ project }) {
  const images = (project.images && project.images.length > 0) ? project.images : (project.image ? [project.image] : [])
  return (
    <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-900">{project.name || '—'}</h3>
        {project.description && <p className="text-sm text-gray-600 mt-1 line-clamp-2">{project.description}</p>}
      </div>
      <div className="p-4">
        {images.length === 0 ? (
          <p className="text-gray-500 text-sm">لا توجد صور</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {images.map((src, idx) => (
              <div key={idx} className="aspect-square rounded-lg overflow-hidden bg-gray-200 border border-gray-200">
                <img
                  src={apiImage(src)}
                  alt=""
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = ''; e.target.className = 'w-full h-full flex items-center justify-center bg-gray-300 text-gray-500 text-xs' }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function AllProductsAndProjectsBlock({ products, projects, setActiveTab, showProducts, showProjects }) {
  return (
    <div className="mt-8 space-y-8">
      {showProducts && (
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-lg font-bold text-gray-900">العروض — عروض رمضان</h2>
            <button type="button" onClick={() => setActiveTab('offers')} className="text-sm font-semibold text-primary-600 hover:text-primary-700">العروض ←</button>
          </div>
          <div className="p-4">
            <p className="text-gray-500 text-sm mb-2">عروض رمضان معروضة في تبويب «العروض».</p>
            <button type="button" onClick={() => setActiveTab('offers')} className="text-primary-600 font-semibold text-sm hover:underline">انتقال إلى العروض ←</button>
          </div>
        </section>
      )}
      {showProjects && (
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-lg font-bold text-gray-900">جميع المشاريع ({projects.length})</h2>
            <button type="button" onClick={() => setActiveTab('projects')} className="text-sm font-semibold text-primary-600 hover:text-primary-700">إدارة المشاريع ←</button>
          </div>
          <div className="p-4">
            {projects.length === 0 ? (
              <p className="text-gray-500 text-sm">لا توجد مشاريع.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {projects.map((item) => <DashboardImageCard key={item._id} item={item} type="project" />)}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  )
}

/** بطاقة موحّدة تعرض الصورة (مع placeholder عند الخطأ أو الغياب) + العنوان + معلومات إضافية */
function DashboardImageCard({ item, type, onImageError }) {
  const src = item.image ? apiImage(item.image) : ''
  const [imgFailed, setImgFailed] = useState(false)
  const showImg = src && !imgFailed
  const title = type === 'realEstate' ? (item.title || '—') : (item.name || '—')
  const handleError = () => { setImgFailed(true); onImageError?.() }
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="aspect-video bg-gray-100 relative">
        {showImg ? (
          <img src={src} alt="" className="w-full h-full object-cover" onError={handleError} />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-1">
            <FiPackage size={28} className="opacity-50" />
            <span className="text-xs">بدون صورة</span>
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-gray-900 truncate">{title}</h3>
        {item.price != null && <p className="text-sm text-primary-600 font-medium mt-0.5">{Number(item.price).toLocaleString()} ج.م</p>}
        {type === 'project' && <p className="text-xs text-gray-500 mt-0.5">{item.type === 'current' ? 'مشروع حالي' : item.type === 'previous' ? 'مشروع سابق' : item.type || '—'}</p>}
      </div>
    </motion.div>
  )
}

/** أزرار إضافة / تعديل / حذف في ترويسة كل سيكشن — إضافة وتعديل يفتحان المودال عند التبويب courses أو projects */
function SectionActions({ setActiveTab, tabId, setTriggerAddForTab, setTriggerEditForTab }) {
  const hasCrud = tabId === 'courses' || tabId === 'projects'
  const onAdd = () => {
    if (tabId) setActiveTab?.(tabId)
    if (hasCrud && setTriggerAddForTab) setTriggerAddForTab(tabId)
  }
  const onEdit = () => {
    if (tabId) setActiveTab?.(tabId)
    if (hasCrud && setTriggerEditForTab) setTriggerEditForTab(tabId)
  }
  const onDelete = () => {
    if (tabId) setActiveTab?.(tabId)
  }
  return (
    <div className="flex flex-wrap gap-2">
      <button type="button" onClick={onAdd} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-white text-sm font-medium" style={{ backgroundColor: '#b2884c' }}>
        <FiPlus size={14} />
        إضافة
      </button>
      <button type="button" onClick={onEdit} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary-100 text-primary-700 text-sm font-medium">
        <FiEdit size={14} />
        تعديل
      </button>
      <button type="button" onClick={onDelete} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-sm font-medium">
        <FiTrash2 size={14} />
        حذف
      </button>
    </div>
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
  items,
  loading,
  onReload,
  fields,
  imageKey,
  api,
  formLabels,
  extraFields = [],
  triggerOpenAdd,
  onOpenAddDone,
  triggerOpenEdit,
  onOpenEditDone,
}) {
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({})
  const [imageFile, setImageFile] = useState(null)
  const [failedImageIds, setFailedImageIds] = useState(() => new Set())

  const openCreate = () => {
    setEditing(null)
    setForm({})
    setImageFile(null)
    setModalOpen(true)
  }
  const openEdit = (item) => {
    setEditing(item)
    const f = {}
    fields.forEach(({ key }) => { f[key] = item[key] ?? '' })
    extraFields.forEach(({ key }) => { f[key] = item[key] ?? '' })
    if (imageKey && item[imageKey]) f.image = item[imageKey]
    setForm(f)
    setImageFile(null)
    setModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false)
    setEditing(null)
    setForm({})
    setImageFile(null)
  }

  useEffect(() => {
    if (triggerOpenAdd) {
      openCreate()
      onOpenAddDone?.()
    }
  }, [triggerOpenAdd])

  useEffect(() => {
    if (triggerOpenEdit) {
      if (items?.length > 0) {
        openEdit(items[0])
      } else {
        if (typeof window !== 'undefined') window.alert('لا يوجد عنصر للتعديل. أضف عنصراً أولاً.')
      }
      onOpenEditDone?.()
    }
  }, [triggerOpenEdit])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = { ...form }
      if (imageKey) payload.image = form.image ?? (editing && editing[imageKey]) ?? ''
      if (editing) {
        await api.update(editing._id, payload)
      } else {
        await api.create(payload)
      }
      closeModal()
      onReload()
    } catch (err) {
      alert(err.message || 'حدث خطأ')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('هل أنت متأكد من الحذف؟')) return
    try {
      await api.delete(id)
      onReload()
    } catch (err) {
      alert(err.message || 'حدث خطأ')
    }
  }

  const primaryKey = fields[0]?.key || 'name'

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium"
          style={{ backgroundColor: '#b2884c' }}
        >
          <FiPlus size={18} />
          إضافة
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-500" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl shadow overflow-hidden border border-gray-100"
            >
              <div className="aspect-video bg-gray-100">
                {item[imageKey] && !failedImageIds.has(item._id) ? (
                  <img
                    src={apiImage(item[imageKey])}
                    alt=""
                    className="w-full h-full object-cover"
                    onError={() => setFailedImageIds((s) => new Set([...s, item._id]))}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-1">
                    <FiPackage size={28} className="opacity-50" />
                    <span className="text-xs">بدون صورة</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {item[primaryKey] || '—'}
                </h3>
                {fields.slice(1).map(({ key, label, truncate }) => (
                  <p key={key} className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">{label}:</span>{' '}
                    {truncate && item[key]
                      ? String(item[key]).slice(0, truncate) + (item[key].length > truncate ? '...' : '')
                      : item[key] ?? '—'}
                  </p>
                ))}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => openEdit(item)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary-100 text-primary-700 text-sm font-medium"
                  >
                    <FiEdit size={14} />
                    تعديل
                  </button>
                  <button
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
      {items.length === 0 && !loading && (
        <p className="text-gray-500 text-center py-8">لا توجد عناصر. اضغط إضافة لإنشاء أول عنصر.</p>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={closeModal}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold text-gray-900">
                {editing ? 'تعديل' : 'إضافة جديد'}
              </h2>
              <button onClick={closeModal} className="p-2 rounded-lg hover:bg-gray-100">
                <FiX size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              {fields.map(({ key, type }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {formLabels[key] || key}
                  </label>
                  {key === 'description' ? (
                    <textarea
                      value={form[key] ?? ''}
                      onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      rows={3}
                    />
                  ) : (
                    <input
                      type={type || 'text'}
                      value={form[key] ?? ''}
                      onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  )}
                </div>
              ))}
              {extraFields.map(({ key, options }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {formLabels[key] || key}
                  </label>
                  {options ? (
                    <select
                      value={form[key] ?? ''}
                      onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    >
                      {options.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={form[key] ?? ''}
                      onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  )}
                </div>
              ))}
              {imageKey && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">رفع صورة (ملف)</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-sm"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    const reader = new FileReader()
                    reader.onload = () => setForm((f) => ({ ...f, image: reader.result }))
                    reader.readAsDataURL(file)
                    e.target.value = ''
                  }}
                />
                {form.image && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <img src={typeof form.image === 'string' && form.image.startsWith('data:') ? form.image : apiImage(form.image)} alt="" className="h-20 w-20 object-cover rounded border" />
                    <span className="text-xs text-gray-500">تم اختيار صورة</span>
                  </div>
                )}
                <div className="text-xs text-gray-500">أو أدخل رابط الصورة (اختياري):</div>
                <input
                  type="url"
                  value={typeof form.image === 'string' && !form.image.startsWith('data:') ? (form.image ?? '') : ''}
                  onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              )}
              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-2 rounded-lg text-white font-medium disabled:opacity-50"
                  style={{ backgroundColor: '#b2884c' }}
                >
                  {saving ? 'جاري الحفظ...' : (editing ? 'حفظ التعديلات' : 'إضافة')}
                </button>
                <button type="button" onClick={closeModal} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700">
                  إلغاء
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}
