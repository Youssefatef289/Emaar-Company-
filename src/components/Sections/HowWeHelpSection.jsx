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
      title: 'Integrated Solutions',
      description: 'We provide comprehensive solutions covering all your real estate needs from design to final delivery',
      color: 'bg-blue-500',
    },
    {
      icon: FiAward,
      title: 'High Quality',
      description: 'We are committed to the highest quality standards in all our projects and services to ensure customer satisfaction',
      color: 'bg-green-500',
    },
    {
      icon: FiTrendingUp,
      title: 'Smart Investment',
      description: 'We help you make informed investment decisions that ensure a profitable return on your investment',
      color: 'bg-purple-500',
    },
    {
      icon: FiShield,
      title: 'Guarantee and Reliability',
      description: 'We provide comprehensive guarantees and after-sales services to ensure your comfort and confidence in your project',
      color: 'bg-orange-500',
    },
    {
      icon: FiUsers,
      title: 'Professional Team',
      description: 'A specialized and experienced team ready to serve you at any time',
      color: 'bg-pink-500',
    },
    {
      icon: FiArrowLeft,
      title: 'Continuous Support',
      description: 'We provide continuous technical and advisory support before, during, and after completing your project',
      color: 'bg-cyan-500',
    },
  ]

  const steps = [
    {
      number: '01',
      title: 'Free Consultation',
      description: 'We start by understanding your needs and goals through a free consultation with our specialized team',
    },
    {
      number: '02',
      title: 'Planning and Design',
      description: 'We design a customized solution that fits your needs and budget using the latest technologies',
    },
    {
      number: '03',
      title: 'Professional Execution',
      description: 'We execute your project with the highest quality and professionalism standards while meeting deadlines',
    },
    {
      number: '04',
      title: 'Delivery and Follow-up',
      description: 'We deliver your completed project and continue to follow up to ensure your complete satisfaction',
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-custom">
            How We Help You
          </h2>
          <div className="how-we-help-divider"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We provide you with an exceptional experience in real estate development with integrated solutions and professional services
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
                <div className="how-we-help-step-circle text-2xl font-bold">
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
          className="how-we-help-cta"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            جاهزون لبدء مشروعك؟
          </h3>
          <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
            تواصل معنا اليوم واحصل على استشارة مجانية لمشروعك العقاري
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/contact" className="how-we-help-cta-button-white">
              تواصل معنا الآن
            </a>
            <a href="/projects" className="how-we-help-cta-button-dark">
              شاهد مشاريعنا
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HowWeHelpSection

