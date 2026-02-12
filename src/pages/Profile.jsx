import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { FiUser, FiMail, FiPhone, FiCalendar, FiPackage, FiHeart } from 'react-icons/fi'

const Profile = () => {
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  if (!isAuthenticated || !user) {
    navigate('/')
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="container-custom max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <div className="flex items-center space-x-4 space-x-reverse mb-6">
            <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {user.name?.charAt(0) || 'U'}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
        </motion.div>

        {/* User Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">معلومات الحساب</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 space-x-reverse">
              <FiUser className="text-primary-600" size={20} />
              <div>
                <p className="text-sm text-gray-600">الاسم</p>
                <p className="font-semibold text-gray-900">{user.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 space-x-reverse">
              <FiMail className="text-primary-600" size={20} />
              <div>
                <p className="text-sm text-gray-600">البريد الإلكتروني</p>
                <p className="font-semibold text-gray-900">{user.email}</p>
              </div>
            </div>
            {user.phone && (
              <div className="flex items-center space-x-3 space-x-reverse">
                <FiPhone className="text-primary-600" size={20} />
                <div>
                  <p className="text-sm text-gray-600">رقم الهاتف</p>
                  <p className="font-semibold text-gray-900">{user.phone}</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Bookings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <div className="flex items-center space-x-3 space-x-reverse mb-6">
            <FiPackage className="text-primary-600" size={24} />
            <h2 className="text-2xl font-bold text-gray-900">حجوزاتي</h2>
          </div>
          {user.bookings && user.bookings.length > 0 ? (
            <div className="space-y-4">
              {user.bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-900">{booking.courseTitle}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {booking.status === 'confirmed' ? 'مؤكد' :
                       booking.status === 'pending' ? 'قيد المراجعة' :
                       'ملغي'}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm space-x-4 space-x-reverse">
                    <div className="flex items-center">
                      <FiCalendar className="ml-1" size={16} />
                      <span>{new Date(booking.date).toLocaleDateString('ar-EG')}</span>
                    </div>
                    {booking.phone && (
                      <div className="flex items-center">
                        <FiPhone className="ml-1" size={16} />
                        <span>{booking.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-8">لا توجد حجوزات حالية</p>
          )}
        </motion.div>

        {/* Favorites */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="flex items-center space-x-3 space-x-reverse mb-6">
            <FiHeart className="text-primary-600" size={24} />
            <h2 className="text-2xl font-bold text-gray-900">مفضلاتي</h2>
          </div>
          {user.favorites && user.favorites.length > 0 ? (
            <div className="space-y-4">
              {user.favorites.map((favorite) => (
                <div
                  key={favorite.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {favorite.type === 'unit' ? 'وحدة عقارية' : 'مشروع'}
                      </p>
                      <p className="text-sm text-gray-600">ID: {favorite.id}</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(favorite.date).toLocaleDateString('ar-EG')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-8">لا توجد عناصر مفضلة</p>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Profile

