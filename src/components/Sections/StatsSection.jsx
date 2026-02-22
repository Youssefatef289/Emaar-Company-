import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'

const StatsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const stats = [
    { number: 150, suffix: '+', label: 'مشروع مكتمل' },
    { number: 500, suffix: '+', label: 'عميل راضٍ' },
    { number: 15, suffix: '+', label: 'سنة خبرة' },
    { number: 50, suffix: '+', label: 'فريق محترف' },
  ]

  const [counters, setCounters] = useState(stats.map(() => 0))

  useEffect(() => {
    if (inView) {
      const duration = 2000
      const steps = 60
      const interval = duration / steps
      const timers = []

      stats.forEach((stat, index) => {
        let current = 0
        const increment = stat.number / steps
        const timer = setInterval(() => {
          current += increment
          if (current >= stat.number) {
            current = stat.number
            clearInterval(timer)
          }
          setCounters((prev) => {
            const newCounters = [...prev]
            newCounters[index] = Math.floor(current)
            return newCounters
          })
        }, interval)
        timers.push(timer)
      })

      return () => {
        timers.forEach(timer => clearInterval(timer))
      }
    }
  }, [inView, stats])

  return (
    <section ref={ref} className="section-padding stats-section text-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-5xl md:text-6xl font-bold mb-2">
                {counters[index]}{stat.suffix}
              </div>
              <div className="text-xl md:text-2xl text-primary-100">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default StatsSection

