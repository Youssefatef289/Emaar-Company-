import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiLock, FiUser } from 'react-icons/fi'
import { useAdminAuth } from '../contexts/AdminAuthContext'

const AdminLogin = () => {
  const { isAdmin, adminLogin } = useAdminAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (isAdmin) return <Navigate to="/admin" replace />

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await adminLogin(username, password)
      if (res.success) {
        navigate('/admin', { replace: true })
      } else {
        setError(res.message || 'فشل تسجيل الدخول')
      }
    } catch (err) {
      const msg = err.message || 'حدث خطأ في الاتصال'
      setError(msg.includes('لا يمكن الاتصال') ? msg : (msg === 'Failed to fetch' ? 'لا يمكن الاتصال بالخادم. شغّل السيرفر من مجلد server بالأمر: npm run dev' : msg))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-primary-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">تسجيل الدخول</h1>
            <p className="text-gray-600">لوحة تحكم إدارة الموقع</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="space-y-2">
                <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm">
                  {error}
                </div>
                {error.includes('الخادم') && (
                  <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                    تشغيل السيرفر: افتح طرفية في مجلد المشروع ثم نفّذ:<br />
                    <code className="bg-white px-1 rounded">cd server</code> ثم <code className="bg-white px-1 rounded">npm run dev</code>
                  </p>
                )}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">اسم المستخدم</label>
              <div className="relative">
                <FiUser className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="admin"
                  required
                  autoComplete="username"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">كلمة المرور</label>
              <div className="relative">
                <FiLock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold text-white transition-colors disabled:opacity-50"
              style={{ backgroundColor: '#b2884c' }}
            >
              {loading ? 'جاري تسجيل الدخول...' : 'دخول'}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-500">
            <a href="/" className="text-primary-600 hover:underline">العودة للموقع</a>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default AdminLogin
