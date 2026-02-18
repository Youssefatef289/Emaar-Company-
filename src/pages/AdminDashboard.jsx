import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FiHome, 
  FiPackage, 
  FiUsers, 
  FiFileText, 
  FiSettings,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiEye
} from 'react-icons/fi'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data - In production, this would come from an API
  const stats = {
    totalProjects: 12,
    totalUnits: 450,
    totalBookings: 89,
    totalUsers: 234,
  }

  const recentProjects = [
    { id: 1, name: 'مشروع إعمار الجديد', status: 'قيد الإنشاء', progress: 65 },
    { id: 2, name: 'مشروع إعمار التجاري', status: 'قيد الإنشاء', progress: 45 },
  ]

  const recentBookings = [
    { id: 1, course: 'دورة المساحة التطبيقية', user: 'أحمد محمد', date: '2024-01-15', status: 'مؤكد' },
    { id: 2, course: 'دورة GPS', user: 'سارة علي', date: '2024-01-14', status: 'قيد المراجعة' },
  ]

  const tabs = [
    { id: 'overview', label: 'نظرة عامة', icon: FiHome },
    { id: 'projects', label: 'المشاريع', icon: FiPackage },
    { id: 'bookings', label: 'الحجوزات', icon: FiFileText },
    { id: 'users', label: 'المستخدمين', icon: FiUsers },
    { id: 'news', label: 'الأخبار والعروض', icon: FiFileText },
    { id: 'settings', label: 'الإعدادات', icon: FiSettings },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">لوحة التحكم</h1>
          <p className="text-gray-600">إدارة الموقع والمحتوى</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      style={activeTab === tab.id ? { backgroundColor: '#d6ac72' } : {}}
                    >
                      <Icon size={20} />
                      <span>{tab.label}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-lg p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm mb-1">إجمالي المشاريع</p>
                        <p className="text-3xl font-bold text-gray-900">{stats.totalProjects}</p>
                      </div>
                      <div className="bg-primary-100 p-3 rounded-lg">
                        <FiPackage size={24} style={{ color: '#d6ac72' }} />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl shadow-lg p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm mb-1">إجمالي الوحدات</p>
                        <p className="text-3xl font-bold text-gray-900">{stats.totalUnits}</p>
                      </div>
                      <div className="bg-green-100 p-3 rounded-lg">
                        <FiHome className="text-green-600" size={24} />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl shadow-lg p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm mb-1">إجمالي الحجوزات</p>
                        <p className="text-3xl font-bold text-gray-900">{stats.totalBookings}</p>
                      </div>
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <FiFileText className="text-blue-600" size={24} />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-2xl shadow-lg p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm mb-1">إجمالي المستخدمين</p>
                        <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
                      </div>
                      <div className="bg-purple-100 p-3 rounded-lg">
                        <FiUsers className="text-purple-600" size={24} />
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Recent Projects */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-2xl shadow-lg p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">المشاريع الأخيرة</h2>
                    <button className="btn-primary flex items-center space-x-2 space-x-reverse">
                      <FiPlus size={18} />
                      <span>إضافة مشروع</span>
                    </button>
                  </div>
                  <div className="space-y-3">
                    {recentProjects.map((project) => (
                      <div
                        key={project.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{project.name}</h3>
                          <p className="text-sm text-gray-600">{project.status}</p>
                        </div>
                        <div className="flex items-center space-x-4 space-x-reverse">
                          <span className="text-sm font-semibold" style={{ color: '#d6ac72' }}>
                            {project.progress}%
                          </span>
                          <button className="p-2 hover:bg-gray-100 rounded-lg">
                            <FiEdit className="text-gray-600" size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Recent Bookings */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white rounded-2xl shadow-lg p-6"
                >
                  <h2 className="text-xl font-bold text-gray-900 mb-4">الحجوزات الأخيرة</h2>
                  <div className="space-y-3">
                    {recentBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div>
                          <h3 className="font-semibold text-gray-900">{booking.course}</h3>
                          <p className="text-sm text-gray-600">{booking.user} - {booking.date}</p>
                        </div>
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            booking.status === 'مؤكد' ? 'bg-green-100 text-green-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {booking.status}
                          </span>
                          <button className="p-2 hover:bg-gray-100 rounded-lg">
                            <FiEye className="text-gray-600" size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">إدارة المشاريع</h2>
                  <button className="btn-primary flex items-center space-x-2 space-x-reverse">
                    <FiPlus size={18} />
                    <span>إضافة مشروع جديد</span>
                  </button>
                </div>
                <p className="text-gray-600">قائمة بجميع المشاريع - يمكنك إضافة، تعديل، أو حذف المشاريع</p>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">إدارة الحجوزات</h2>
                <p className="text-gray-600">عرض وإدارة جميع حجوزات الدورات</p>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">إدارة المستخدمين</h2>
                <p className="text-gray-600">عرض وإدارة حسابات المستخدمين</p>
              </div>
            )}

            {activeTab === 'news' && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">إدارة الأخبار والعروض</h2>
                  <button className="btn-primary flex items-center space-x-2 space-x-reverse">
                    <FiPlus size={18} />
                    <span>إضافة خبر/عرض</span>
                  </button>
                </div>
                <p className="text-gray-600">إدارة شريط الأخبار والعروض الخاصة</p>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">الإعدادات</h2>
                <p className="text-gray-600">إعدادات الموقع العامة</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard

