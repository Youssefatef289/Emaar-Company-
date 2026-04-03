import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiCheckCircle, FiClock, FiDollarSign, FiUsers } from 'react-icons/fi'
import { useAuth } from '../contexts/AuthContext'
import { FALLBACK_COURSE_MAP } from '../constants/fallbackData'
import { api } from '../services/api'

export default function CourseBooking() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const { user, isAuthenticated, addBooking } = useAuth()

  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)

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
  }, [isAuthenticated, navigate, user])

  useEffect(() => {
    let cancelled = false

    api.courses
      .get(courseId)
      .then((response) => {
        if (cancelled) return
        const cmsCourse = response.data
        setCourse({
          id: cmsCourse._id,
          title: cmsCourse.name,
          duration: cmsCourse.duration,
          price: cmsCourse.price,
          instructor: cmsCourse.instructor,
        })
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

  const handleChange = (event) => {
    setFormData((state) => ({ ...state, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!course) return

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1200))

    addBooking({
      courseId: course.id,
      courseTitle: course.title,
      ...formData,
    })

    setIsSubmitting(false)
    setBookingSuccess(true)

    setTimeout(() => {
      navigate('/profile')
    }, 3000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: '#d6ac72' }} />
          <p className="text-gray-600">جارٍ التحميل...</p>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 pb-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg">الدورة غير موجودة</p>
        </div>
      </div>
    )
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
          <h2 className="text-2xl font-extrabold text-gray-900 mb-4">تم الحجز بنجاح</h2>
          <p className="text-gray-600 mb-6">
            تم إرسال طلب الحجز وسنتواصل معك قريبًا لتأكيد التفاصيل.
          </p>
          <p className="text-sm text-gray-500">سيتم تحويلك إلى الملف الشخصي خلال لحظات...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="container-custom max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <h1 className="text-3xl font-extrabold text-gray-900 mb-6">حجز الدورة</h1>

          <div className="bg-primary-50 rounded-lg p-6 mb-2">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-4">{course.title}</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {course.duration && (
                <InfoCard icon={FiClock} label="المدة" value={course.duration} />
              )}
              {course.price !== null && course.price !== undefined && (
                <InfoCard icon={FiDollarSign} label="السعر" value={`${Number(course.price).toLocaleString()} جنيه`} />
              )}
              {course.instructor && (
                <InfoCard icon={FiUsers} label="المدرب" value={course.instructor} />
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6">معلومات الحجز</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField label="الاسم الكامل *">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
            </FormField>

            <FormField label="البريد الإلكتروني *">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
            </FormField>

            <FormField label="رقم الهاتف *">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="01XXXXXXXXX"
              />
            </FormField>

            <FormField label="ملاحظات">
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="أي ملاحظات إضافية..."
              />
            </FormField>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                بعد إرسال طلب الحجز سنتواصل معك خلال وقت قصير لتأكيد المقعد وترتيب خطوات الدفع.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'جارٍ إرسال الطلب...' : 'إرسال طلب الحجز'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

function InfoCard({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <Icon style={{ color: '#d6ac72' }} size={24} />
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="font-bold text-gray-900">{value}</p>
      </div>
    </div>
  )
}

function FormField({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      {children}
    </div>
  )
}
