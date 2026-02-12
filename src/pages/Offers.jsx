import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiTag, FiCalendar, FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const Offers = () => {
  // Mock data - In production, this would come from an API/Admin Dashboard
  const offers = [
    {
      id: 1,
      title: 'خصم 10% على جميع الوحدات السكنية',
      description: 'عرض خاص لفترة محدودة - خصم 10% على جميع الوحدات السكنية في مشروعنا الجديد',
      discount: 10,
      validUntil: '2024-12-31',
      image: '/image/medium (8).webp',
      link: '/real-estate-marketing',
      type: 'real-estate',
    },
    {
      id: 2,
      title: 'خصم 20% على دورات الأعمال المساحية',
      description: 'احصل على خصم 20% عند التسجيل في أي دورة من دوراتنا المساحية',
      discount: 20,
      validUntil: '2024-11-30',
      image: '/image/medium (9).webp',
      link: '/surveying-services',
      type: 'course',
    },
    {
      id: 3,
      title: 'تمويل ميسر حتى 10 سنوات',
      description: 'عروض تمويل ميسرة تصل إلى 10 سنوات بدون فوائد إضافية',
      discount: 0,
      validUntil: '2024-12-31',
      image: '/image/medium (10).webp',
      link: '/contact',
      type: 'financing',
    },
    {
      id: 4,
      title: 'عرض خاص للمشاريع التجارية',
      description: 'خصومات حصرية على الوحدات التجارية في أفضل المواقع',
      discount: 15,
      validUntil: '2024-12-15',
      image: '/image/medium (11).webp',
      link: '/real-estate-marketing',
      type: 'commercial',
    },
  ]

  const getOfferTypeLabel = (type) => {
    const types = {
      'real-estate': 'عقاري',
      'course': 'دورات',
      'financing': 'تمويل',
      'commercial': 'تجاري',
    }
    return types[type] || 'عام'
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            عروضنا الحصرية
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            استفد من أفضل العروض والخصومات على خدماتنا ومشاريعنا
          </p>
        </motion.div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover relative"
            >
              {/* Discount Badge */}
              {offer.discount > 0 && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg z-10">
                  خصم {offer.discount}%
                </div>
              )}

              {/* Type Badge */}
              <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                {getOfferTypeLabel(offer.type)}
              </div>

              <div className="relative h-64 overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{offer.title}</h3>
                <p className="text-gray-600 mb-4">{offer.description}</p>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center text-gray-600">
                    <FiCalendar className="ml-2" size={18} />
                    <span className="text-sm">صالح حتى: {offer.validUntil}</span>
                  </div>
                </div>

                <Link
                  to={offer.link}
                  className="btn-primary w-full flex items-center justify-center space-x-2 space-x-reverse"
                >
                  <span>استفد من العرض</span>
                  <FiArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-4">هل تبحث عن عرض خاص؟</h2>
          <p className="text-lg mb-6 opacity-90">
            تواصل معنا للحصول على عروض مخصصة تناسب احتياجاتك
          </p>
          <Link to="/contact" className="btn-secondary bg-white text-primary-600 hover:bg-gray-50 inline-block">
            تواصل معنا الآن
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default Offers

