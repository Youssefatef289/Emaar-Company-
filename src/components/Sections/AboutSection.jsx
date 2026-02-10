import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiAward, FiTarget, FiEye } from 'react-icons/fi'

const AboutSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const features = [
    {
      icon: FiAward,
      title: 'خبرة طويلة',
      description: 'أكثر من 15 عاماً من الخبرة في مجال التطوير العقاري والمقاولات',
    },
    {
      icon: FiTarget,
      title: 'رؤية واضحة',
      description: 'نسعى لتحقيق رؤية واضحة في تطوير مشاريع عقارية متميزة',
    },
    {
      icon: FiEye,
      title: 'جودة عالية',
      description: 'نلتزم بأعلى معايير الجودة في جميع مشاريعنا وخدماتنا',
    },
  ]

  return (
    <section ref={ref} className="section-padding bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            من نحن
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            شركة إعمار للتطوير العقاري هي شركة رائدة في مجال التطوير العقاري والمقاولات في مصر، 
            تأسست بهدف تقديم حلول متكاملة وعالية الجودة في قطاع العقارات.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold mb-6 text-gray-800">رؤيتنا</h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              نسعى لأن نكون الشركة الرائدة في مجال التطوير العقاري في مصر والمنطقة، 
              من خلال تقديم مشاريع متميزة تلبي احتياجات عملائنا وتضيف قيمة حقيقية للمجتمع.
            </p>
            <h3 className="text-3xl font-bold mb-6 text-gray-800 mt-8">رسالتنا</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              نلتزم بتقديم خدمات عالية الجودة في مجال التطوير العقاري والمقاولات، 
              مع التركيز على الابتكار والاستدامة ورضا العملاء، من خلال فريق عمل محترف 
              وشراكات استراتيجية قوية.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/image/medium  (4).webp"
                alt="شركة إعمار"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-primary-600 text-white p-6 rounded-xl shadow-xl hidden md:block">
              <div className="text-4xl font-bold">15+</div>
              <div className="text-lg">سنة خبرة</div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
              className="bg-white p-8 rounded-xl shadow-lg card-hover text-center"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="text-primary-600" size={32} />
              </div>
              <h4 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h4>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutSection

