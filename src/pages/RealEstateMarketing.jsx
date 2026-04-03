import { motion } from 'framer-motion'

export default function RealEstateMarketing() {
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div
        className="relative py-20 md:py-28 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #d6ac72 0%, #c49a5f 50%, #b2884c 100%)' }}
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'url(/image/medium (1).webp)',
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
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-white drop-shadow-lg">
              التسويق العقاري
            </h1>
            <p className="text-xl md:text-2xl text-white drop-shadow-md font-semibold">
              سيتم إضافة محتوى الصفحة قريبًا
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-center min-h-[60vh]"
        >
          <div className="text-center">
            <h2
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4"
              style={{ color: '#d6ac72' }}
            >
              قريبًا
            </h2>
            <p className="text-xl md:text-2xl text-gray-600">
              نعمل الآن على تجهيز صفحة التسويق العقاري
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
