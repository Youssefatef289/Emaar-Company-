import { motion } from 'framer-motion'
import { FiAward, FiTarget, FiEye, FiUsers, FiCheckCircle } from 'react-icons/fi'
import AboutSection from '../components/Sections/AboutSection'

const About = () => {
  const values = [
    {
      icon: FiAward,
      title: 'الجودة',
      description: 'نلتزم بأعلى معايير الجودة في جميع مشاريعنا',
    },
    {
      icon: FiTarget,
      title: 'الالتزام',
      description: 'نلتزم بمواعيد التسليم والمواصفات المتفق عليها',
    },
    {
      icon: FiEye,
      title: 'الشفافية',
      description: 'شفافية كاملة في التعامل مع عملائنا',
    },
    {
      icon: FiUsers,
      title: 'رضا العملاء',
      description: 'رضا عملائنا هو أولويتنا القصوى',
    },
  ]

  const achievements = [
    'أكثر من 150 مشروعًا مكتملاً بنجاح',
    'فريق محترف يزيد عن 50 موظفًا',
    'شراكات استراتيجية مع شركات كبرى',
    'شهادات جودة معتمدة',
    'نسبة رضا العملاء 98%',
  ]

  return (
    <div className="pt-32 pb-16 bg-white min-h-screen">
      <AboutSection />
      
      <div className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
              قيمنا
            </h2>
            <div className="w-24 h-1 mx-auto mb-6" style={{ backgroundColor: '#d6ac72' }}></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-white p-8 rounded-xl shadow-lg card-hover text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon style={{ color: '#d6ac72' }} size={32} />
                </div>
                <h4 className="text-xl font-bold mb-3 text-gray-800">{value.title}</h4>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl font-bold mb-6 text-gray-800">إنجازاتنا</h3>
              <ul className="space-y-4">
                {achievements.map((achievement, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="flex items-start"
                  >
                    <FiCheckCircle className="ml-3 mt-1 flex-shrink-0" style={{ color: '#d6ac72' }} size={24} />
                    <span className="text-lg text-gray-700">{achievement}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/image/about/about (1).jpg"
                  alt="إنجازاتنا"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About

