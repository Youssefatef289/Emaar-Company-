import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Offers = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div
        className="relative overflow-hidden py-20 md:py-28"
        style={{ background: 'linear-gradient(135deg, #d6ac72 0%, #c49a5f 50%, #b2884c 100%)' }}
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'url(/image/medium (8).webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            <h1 className="mb-6 text-4xl font-extrabold text-white drop-shadow-lg md:text-5xl lg:text-6xl">
              عروضنا الحصرية
            </h1>
            <p className="text-xl font-semibold text-white drop-shadow-md md:text-2xl">
              تابع أحدث العروض والفرص الخاصة بمشاريعنا الحالية.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-custom">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 flex min-h-[55vh] items-center justify-center"
        >
          <div className="w-full max-w-4xl rounded-[32px] border border-white/70 bg-white px-6 py-12 text-center shadow-[0_28px_70px_rgba(17,24,39,0.08)] md:px-10 md:py-16">
            <div
              className="mx-auto mb-6 h-20 w-20 rounded-[28px]"
              style={{ background: 'linear-gradient(135deg, rgba(214, 172, 114, 0.18), rgba(196, 154, 95, 0.35))' }}
            />
            <h2 className="mb-4 text-3xl font-extrabold text-gray-900 md:text-5xl" style={{ color: '#b2884c' }}>
              انتظروا عروضنا
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg leading-8 text-gray-600 md:text-xl">
              نجهز لكم عروضًا جديدة قريبًا، ويمكنكم الآن زيارة المشاريع الحالية والاطلاع على عرض التقسيط 20% و40%.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/current-projects" className="btn-primary inline-flex items-center justify-center px-8 py-3.5">
                زيارة المشاريع الحالية
              </Link>
              <Link to="/contact" className="btn-secondary inline-flex items-center justify-center px-8 py-3.5">
                تواصل معنا
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default Offers
