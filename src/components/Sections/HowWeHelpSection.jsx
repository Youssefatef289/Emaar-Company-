import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiCheckCircle, FiArrowLeft, FiUsers, FiAward, FiTrendingUp, FiShield } from 'react-icons/fi'

const HowWeHelpSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const benefits = [
    {
      icon: FiCheckCircle,
      title: 'حلول متكاملة',
      description: 'نقدم حلولاً شاملة تغطي جميع احتياجاتك العقارية من التصميم حتى التسليم النهائي',
      color: 'bg-blue-500',
    },
    {
      icon: FiAward,
      title: 'جودة عالية',
      description: 'نلتزم بأعلى معايير الجودة في جميع مشاريعنا وخدماتنا لضمان رضا عملائنا',
      color: 'bg-green-500',
    },
    {
      icon: FiTrendingUp,
      title: 'استثمار ذكي',
      description: 'نساعدك في اتخاذ قرارات استثمارية مدروسة تضمن عائداً مربحاً على استثمارك',
      color: 'bg-purple-500',
    },
    {
      icon: FiShield,
      title: 'ضمان وموثوقية',
      description: 'نوفر ضمانات شاملة وخدمات ما بعد البيع لضمان راحتك وثقتك في مشروعك',
      color: 'bg-orange-500',
    },
    {
      icon: FiUsers,
      title: 'فريق محترف',
      description: 'فريق عمل متخصص وذو خبرة واسعة جاهز لخدمتك في أي وقت',
      color: 'bg-pink-500',
    },
    {
      icon: FiArrowLeft,
      title: 'دعم مستمر',
      description: 'نقدم دعم فني واستشاري مستمر قبل وأثناء وبعد إتمام مشروعك',
      color: 'bg-cyan-500',
    },
  ]

  const steps = [
    {
      number: '01',
      title: 'استشارة مجانية',
      description: 'نبدأ بفهم احتياجاتك وأهدافك من خلال استشارة مجانية مع فريقنا المتخصص',
    },
    {
      number: '02',
      title: 'تخطيط وتصميم',
      description: 'نقوم بتصميم حل مخصص يناسب احتياجاتك وميزانيتك بأحدث التقنيات',
    },
    {
      number: '03',
      title: 'تنفيذ احترافي',
      description: 'ننفذ مشروعك بأعلى معايير الجودة والاحترافية مع الالتزام بالمواعيد',
    },
    {
      number: '04',
      title: 'تسليم ومتابعة',
      description: 'نسلم مشروعك مكتملاً ونواصل متابعتك لضمان رضاك التام',
    },
  ]

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            كيف تستفيد منا
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            نقدم لك تجربة استثنائية في مجال التطوير العقاري مع حلول متكاملة وخدمات احترافية
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-gray-50 p-8 rounded-xl shadow-lg card-hover border border-gray-100"
            >
              <div className={`w-16 h-16 ${benefit.color} rounded-xl flex items-center justify-center mb-6 text-white`}>
                <benefit.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Steps Process */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            خطوات العمل معنا
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold shadow-lg">
                  {step.number}
                </div>
                <h4 className="text-xl font-bold mb-3 text-gray-800">{step.title}</h4>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="bg-primary-600 rounded-2xl p-8 md:p-12 text-center text-white"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            جاهزون لبدء مشروعك؟
          </h3>
          <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
            تواصل معنا اليوم واحصل على استشارة مجانية لمشروعك العقاري
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/contact" className="bg-white text-primary-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              تواصل معنا الآن
            </a>
            <a href="/projects" className="bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg border-2 border-white/30 hover:bg-primary-800 transition-all duration-300">
              شاهد مشاريعنا
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HowWeHelpSection

