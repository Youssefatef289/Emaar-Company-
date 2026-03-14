import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Offers = () => {
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

