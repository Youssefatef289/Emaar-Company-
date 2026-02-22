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
      title: 'خصم 20% على دورات المساحة',
      description: 'احصل على خصم 20% عند التسجيل في أي من دوراتنا المساحية',
      discount: 20,
      validUntil: '2024-11-30',
      image: '/image/medium (9).webp',
      link: '/surveying-services',
      type: 'course',
    },
    {
      id: 3,
      title: 'تمويل سهل حتى 10 سنوات',
      description: 'عروض تمويل سهلة حتى 10 سنوات بدون فوائد إضافية',
      discount: 0,
      validUntil: '2024-12-31',
      image: '/image/medium (10).webp',
      link: '/contact',
      type: 'financing',
    },
    {
      id: 4,
      title: 'عرض خاص للمشاريع التجارية',
      description: 'خصومات حصرية على الوحدات التجارية في مواقع ممتازة',
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
                  خصم {offer.discount}%
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
                    href={`https://wa.me/201005617186?text=${encodeURIComponent(`I want to take advantage of the offer: ${offer.title}`)}`}
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
              <p className="text-lg md:text-xl mb-2 text-white drop-shadow-md font-semibold">
                تهنئة بمناسبة شهر رمضان المبارك
              </p>
              <p className="text-base md:text-lg text-white drop-shadow-md">
                وكما عودناكم على التميز في البناء والتطوير، نعدكم بالتميز في الجوائز!
              </p>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 md:p-8 mb-6 border border-white/30">
              <div className="text-center mb-6">
                <p className="text-xl md:text-2xl font-bold mb-4 text-white drop-shadow-md">
                  📺 "شوف الفيديو الجوائز للآخر عشان تعرف هتكسب إيه!"
                </p>
                <p className="text-lg md:text-xl font-semibold mb-2 text-white drop-shadow-md">
                  ✨ شعارنا في رمضان: "إعمار.. الكل معها كسبان" ✨
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-extrabold mb-4 text-center text-white drop-shadow-md">🗓️ مواعيد المسابقة:</h3>
                <div className="bg-white/20 rounded-lg p-4 mb-4 border border-white/30">
                  <p className="text-lg mb-2 text-white font-semibold">انتظروا أسئلتنا الدينية مرتين أسبوعياً:</p>
                  <ul className="space-y-2 text-right">
                    <li className="flex items-center gap-2 text-white">
                      <span>📅</span>
                      <span>يومي (الاثنين والخميس)</span>
                    </li>
                    <li className="flex items-center gap-2 text-white">
                      <span>🕔</span>
                      <span>الساعة 5:00 مساءً</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-extrabold mb-4 text-center text-white drop-shadow-md">📝 شروط وطريقة المشاركة (هام جداً):</h3>
                <div className="bg-white/20 rounded-lg p-4 space-y-3 text-right border border-white/30">
                  <p className="font-semibold mb-3 text-white">لضمان دخول اسمك في السحب على جوائز الفيديو، يرجى اتباع الخطوات التالية:</p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2 text-white">
                      <span>✅</span>
                      <span>الإجابة: اكتب إجابتك الصحيحة في تعليق واحد فقط على منشور السؤال.</span>
                    </div>
                    <div className="flex items-start gap-2 text-white">
                      <span>📸</span>
                      <span>سكرين شوت: خذ لقطة شاشة (Screen Shot) لتعليقك.</span>
                    </div>
                    <div className="flex items-start gap-2 text-white">
                      <span>📩</span>
                      <span>إرسال البيانات: أرسل "السكرين شوت" في رسالة خاصة (على الصفحة أو عبر الواتساب) مصحوبة برقم تليفونك للتواصل في حال الفوز.</span>
                    </div>
                    <div className="flex items-start gap-2 text-white">
                      <span>⏱️</span>
                      <span>المهلة الزمنية: الإجابة متاحة من وقت نزول السؤال وحتى موعد نزول السؤال القادم.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-extrabold mb-4 text-center text-white drop-shadow-md">⚖️ شروط الفوز (هام جداً):</h3>
                <div className="bg-red-600/30 border-2 border-red-500/70 rounded-lg p-4">
                  <p className="text-center font-bold text-lg text-white drop-shadow-md">
                    يجب الإجابة على جميع الأسئلة طوال شهر رمضان؛ وفوات أي حلقة يعني الاستبعاد التلقائي من السحب. 🚫
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-extrabold mb-4 text-center text-white drop-shadow-md">🏆 الجوائز:</h3>
                <p className="text-center text-lg bg-white/20 rounded-lg p-4 text-white font-semibold border border-white/30">
                  جوائز قيمة ومنوعة كما ظهرت في الفيديو، بانتظار الملتزمين بالشروط وأصحاب الإجابات الصحيحة.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-extrabold mb-4 text-center text-white drop-shadow-md">🎊 موعد التتويج:</h3>
                <p className="text-center text-lg bg-white/20 rounded-lg p-4 text-white font-semibold border border-white/30">
                  سيتم إجراء القرعة العلنية وتوزيع الجوائز على الفائزين بعد عطلة عيد الفطر المبارك مباشرة. 🎁🌙
                </p>
              </div>

              <div className="text-center bg-yellow-500/30 border-2 border-yellow-400/70 rounded-lg p-4 mb-6">
                <p className="font-bold text-lg text-white drop-shadow-md">
                  ⚠️🎁 وما تنساش تسال على العروض
                </p>
              </div>

              <div className="text-center">
                <p className="text-xl font-bold text-white drop-shadow-md">
                  🏗️ مع إعمار.. دقة في التطوير.. ثقة في البناء.. والكل كسبان! 🌙
                </p>
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

