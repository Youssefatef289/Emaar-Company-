import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiClock, FiDollarSign, FiUsers, FiCheckCircle } from 'react-icons/fi'
import { useAuth } from '../contexts/AuthContext'

const CourseBooking = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const { user, isAuthenticated, addBooking } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)

  // Mock course data - In production, this would come from an API
  const courses = {
    1: {
      id: 1,
      title: 'دورة المساحة التطبيقية المتقدمة',
      duration: '40 ساعة',
      price: 5000,
      instructor: 'د. محمد أحمد',
    },
    2: {
      id: 2,
      title: 'دورة الرفع المساحي باستخدام GPS',
      duration: '30 ساعة',
      price: 4000,
      instructor: 'م. أحمد محمود',
    },
    3: {
      id: 3,
      title: 'دورة المساحة التصويرية',
      duration: '35 ساعة',
      price: 4500,
      instructor: 'د. سارة علي',
    },
  }

  const course = courses[courseId]

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/surveying-services')
      return
    }

    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        notes: '',
      })
    }
  }, [user, isAuthenticated, navigate])

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 pb-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg">الدورة غير موجودة</p>
        </div>
      </div>
    )
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    const booking = addBooking({
      courseId: course.id,
      courseTitle: course.title,
      ...formData,
    })

    setIsSubmitting(false)
    setBookingSuccess(true)

    // Redirect after 3 seconds
    setTimeout(() => {
      navigate('/profile')
    }, 3000)
  }

  if (bookingSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 pb-16 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center"
        >
          <FiCheckCircle className="text-green-500 mx-auto mb-4" size={64} />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">تم الحجز بنجاح!</h2>
          <p className="text-gray-600 mb-6">
            تم إرسال تأكيد الحجز إلى بريدك الإلكتروني. سنتواصل معك قريبًا.
          </p>
          <p className="text-sm text-gray-500">سيتم تحويلك إلى صفحة الملف الشخصي...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="container-custom max-w-4xl">
        {/* Course Info */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-6">حجز الدورة</h1>
          
          <div className="bg-primary-50 rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{course.title}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 space-x-reverse">
                <FiClock style={{ color: '#d6ac72' }} size={24} />
                <div>
                  <p className="text-sm text-gray-600">المدة</p>
                  <p className="font-bold text-gray-900">{course.duration}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 space-x-reverse">
                <FiDollarSign style={{ color: '#d6ac72' }} size={24} />
                <div>
                  <p className="text-sm text-gray-600">السعر</p>
                  <p className="font-bold text-gray-900">{course.price.toLocaleString()} جنيه</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 space-x-reverse">
                <FiUsers style={{ color: '#d6ac72' }} size={24} />
                <div>
                  <p className="text-sm text-gray-600">المدرب</p>
                  <p className="font-bold text-gray-900">{course.instructor}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Booking Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">معلومات الحجز</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الاسم الكامل *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-#d6ac72 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                البريد الإلكتروني *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-#d6ac72 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                رقم الهاتف *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-#d6ac72 focus:border-transparent"
                placeholder="01XXXXXXXXX"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ملاحظات (اختياري)
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-#d6ac72 focus:border-transparent"
                placeholder="أي ملاحظات أو طلبات خاصة..."
              />
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>ملاحظة:</strong> بعد إرسال طلب الحجز، سنتواصل معك خلال 24 ساعة لتأكيد الحجز وإتمام عملية الدفع.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'جاري إرسال الطلب...' : 'إرسال طلب الحجز'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default CourseBooking

