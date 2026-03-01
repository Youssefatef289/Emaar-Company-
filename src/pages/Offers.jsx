import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiTag, FiCalendar, FiArrowRight, FiInfo } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Offers = () => {
  // Mock data - In production, this would come from an API/Admin Dashboard
  const offers = [
    {
      id: 1,
      title: '🥇 الجائزة الأولى - نص تشطيب شقتك مجاناً',
      description: 'نص تشطيب "شقتك" مجاناً - واحد من العملاء القدام.. أيوه.. التشطيب علينا إحنا!',
      discount: 50,
      discountType: 'percentage',
      validUntil: '2024-04-10',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
      link: '/real-estate-marketing',
      type: 'ramadan',
    },
    {
      id: 2,
      title: '🥈 الجائزة الثانية - خصم 1000 جنيه على كل متر',
      description: 'خصم ألف جنيه كاملين على "كل متر" - لواحد بس من أي عميل جديد هيتعاقد وهيجز معانا',
      discount: 1000,
      discountType: 'amount',
      validUntil: '2024-04-10',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
      link: '/real-estate-marketing',
      type: 'ramadan',
    },
    {
      id: 3,
      title: '🥉 الجائزة الثالثة - خصم 10% على المصنعيات',
      description: 'خصم عشرة في المية على "المصنعيات" كلها! لواحد بس حابب بشطب شقته معانا',
      discount: 10,
      discountType: 'percentage',
      validUntil: '2024-04-10',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      link: '/real-estate-marketing',
      type: 'ramadan',
    },
    {
      id: 4,
      title: '💰 الجائزة الرابعة - 5000 جنيه كاش',
      description: '5 آلاف جنيه "كاش" - هيتوزعوا على 5 فايزين!',
      discount: 5000,
      discountType: 'amount',
      validUntil: '2024-04-10',
      image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=600&fit=crop',
      link: '/contact',
      type: 'ramadan',
    },
  ]

  const getOfferTypeLabel = (type) => {
    const types = {
      'real-estate': 'عقاري',
      'course': 'دورات',
      'financing': 'تمويل',
      'commercial': 'تجاري',
      'ramadan': 'رمضان',
    }
    return types[type] || 'عام'
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Hero Section */}
      <div className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #d6ac72 0%, #c49a5f 50%, #b2884c 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'url(/image/medium (8).webp)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-white drop-shadow-lg">
              عروضنا الحصرية
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-white drop-shadow-md font-semibold">
              استفد من أفضل العروض والخصومات على خدماتنا ومشاريعنا
            </p>
            <p className="text-lg text-white drop-shadow-md">
              عروض محدودة في انتظارك - لا تفوت الفرصة
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-custom mt-12">

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md overflow-hidden card-hover relative flex flex-col"
            >
              {/* Discount Badge */}
              {offer.discount > 0 && (
                <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm z-10">
                  {offer.discountType === 'amount' 
                    ? `${offer.discount.toLocaleString()} ج.م`
                    : `خصم ${offer.discount}%`
                  }
                </div>
              )}

              {/* Type Badge */}
              <div className="absolute top-3 left-3 text-white px-2 py-1 rounded-full text-xs font-semibold z-10" style={{ backgroundColor: '#d6ac72' }}>
                {getOfferTypeLabel(offer.type)}
              </div>

              <div className="relative h-48 overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>

              <div className="p-4 flex-grow flex flex-col">
                <h3 className="text-lg font-extrabold text-gray-900 mb-2 line-clamp-2">{offer.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-grow">{offer.description}</p>

                <div className="flex items-center text-gray-600 mb-4">
                  <FiCalendar className="ml-2" size={14} />
                  <span className="text-xs">صالح حتى: {offer.validUntil}</span>
                </div>

                <div className="flex flex-col gap-2">
                  <a
                    href={`https://wa.me/201027347377?text=${encodeURIComponent(`I want to take advantage of the offer: ${offer.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-white transition-all hover:shadow-lg"
                    style={{ backgroundColor: '#25D366' }}
                  >
                    <FaWhatsapp size={18} />
                    <span>احصل على العرض</span>
                  </a>
                  <Link
                    to={offer.link}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-all hover:shadow-lg border-2"
                    style={{ color: '#d6ac72', borderColor: '#d6ac72' }}
                  >
                    <FiInfo size={16} />
                    <span>تفاصيل العرض</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Ramadan Competition Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 rounded-2xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #d6ac72 0%, #c49a5f 50%, #b2884c 100%)' }}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)' }}></div>
          </div>
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-white drop-shadow-lg">🎊 مسابقة رمضان المبارك 🎊</h2>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 md:p-8 mb-6 border border-white/30">
              {/* Video and Text Side by Side Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {/* Competition Text - Left Side */}
                <div className="order-1 lg:order-1 space-y-6 text-right">
                  {/* Main Title */}
                  <div className="text-center lg:text-right">
                    <p className="text-2xl md:text-3xl font-extrabold mb-4 text-white drop-shadow-lg">
                      جاهزين؟.. لأقوى مفاجأة في رمضان!
                    </p>
                  </div>

                  {/* Introduction */}
                  <div className="bg-white/20 rounded-lg p-5 border border-white/30">
                    <p className="text-lg md:text-xl mb-3 text-white leading-relaxed">
                      السنة دي.. "إعمار" محضرة لكم مفاجأه كبيرة.. بجد.. فوق الخيال!
                    </p>
                    <p className="text-lg md:text-xl text-white leading-relaxed">
                      مسابقتنا الدينية.. معاكم طول الشهر الكريم.. كل يوم سؤال جديد.. وفرصة جديدة.. عشان تكسبوا معانا!
                    </p>
                  </div>

                  {/* Prizes Section */}
                  <div className="bg-white/20 rounded-lg p-5 border border-white/30">
                    <h3 className="text-xl md:text-2xl font-extrabold mb-5 text-center text-white drop-shadow-md">
                      تيجوا نعرف الجوايز؟.. ركزوا بقى..
                    </h3>
                    
                    <div className="space-y-3">
                      {/* Prize 1 */}
                      <div className="bg-yellow-500/30 rounded-lg p-4 border border-yellow-400/50 hover:bg-yellow-500/40 transition-colors">
                        <p className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                          <span className="text-2xl">🥇</span>
                          <span>الجايزة الأولى:</span>
                        </p>
                        <p className="text-base text-white pr-6">
                          نص تشطيب "شقتك".. واحد من العملاء القدام.. أيوه.. التشطيب علينا إحنا!
                        </p>
                      </div>

                      {/* Prize 2 */}
                      <div className="bg-yellow-500/30 rounded-lg p-4 border border-yellow-400/50 hover:bg-yellow-500/40 transition-colors">
                        <p className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                          <span className="text-2xl">🥈</span>
                          <span>والتانية؟</span>
                        </p>
                        <p className="text-base text-white pr-6">
                          خصم ألف جنيه.. كاملين.. على "كل متر"— لواحد بس من أي عميل جديد هيتعاقد وهيجز معانا
                        </p>
                      </div>

                      {/* Prize 3 */}
                      <div className="bg-yellow-500/30 rounded-lg p-4 border border-yellow-400/50 hover:bg-yellow-500/40 transition-colors">
                        <p className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                          <span className="text-2xl">🥉</span>
                          <span>أما التالتة:</span>
                        </p>
                        <p className="text-base text-white pr-6">
                          فهي خصم عشرة في المية.. على "المصنعيات".. كلها! لواحد بس حابب بشطب شقته معانا
                        </p>
                      </div>

                      {/* Prize 4 */}
                      <div className="bg-yellow-500/30 rounded-lg p-4 border border-yellow-400/50 hover:bg-yellow-500/40 transition-colors">
                        <p className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                          <span className="text-2xl">💰</span>
                          <span>والجايزة الرابعة:</span>
                        </p>
                        <p className="text-base text-white pr-6">
                          5 آلاف جنيه "كاش".. هيتوزعوا على 5 فايزين!
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="text-center bg-green-500/30 border-2 border-green-400/70 rounded-lg p-5">
                    <p className="text-xl md:text-2xl font-bold text-white drop-shadow-md mb-2">
                      مستنيين إيه؟.. شاركوا.. جاوبوا.. واكسبوا..
                    </p>
                    <p className="text-lg md:text-xl font-bold text-white drop-shadow-md">
                      وخلي "إعمار"— تكمّل حلم بيتكم!
                    </p>
                  </div>
                </div>

                {/* Video Section - Right Side */}
                <div className="order-2 lg:order-2">
                  <div className="sticky top-6">
                    <video
                      controls
                      className="w-full rounded-xl shadow-2xl"
                      style={{ maxHeight: '600px' }}
                    >
                      <source src="/image/Ages competition in Ramadan.mp4" type="video/mp4" />
                      متصفحك لا يدعم تشغيل الفيديو.
                    </video>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 rounded-2xl p-8 text-center text-white"
          style={{ background: 'linear-gradient(to right, #d6ac72, #c49a5f)' }}
        >
          <h2 className="text-3xl font-extrabold mb-4">هل تبحث عن عرض خاص؟</h2>
          <p className="text-lg mb-6 opacity-90">
            تواصل معنا للحصول على عروض مخصصة تناسب احتياجاتك
          </p>
          <Link to="/contact" className="btn-secondary bg-white hover:bg-gray-50 inline-block" style={{ color: '#d6ac72' }}>
            تواصل معنا الآن
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default Offers

