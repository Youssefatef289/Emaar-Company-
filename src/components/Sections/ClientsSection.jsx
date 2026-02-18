import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

const ClientsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const clients = [
    { name: 'عميل 1', logo: '/image/medium  (11).webp', testimonial: 'خدمة ممتازة ومشروع رائع، أنصح بالتعامل معهم' },
    { name: 'عميل 2', logo: '/image/medium  (12).webp', testimonial: 'فريق محترف ومشاريع عالية الجودة' },
    { name: 'عميل 3', logo: '/image/medium  (13).webp', testimonial: 'راضون تماماً عن الخدمة والنتائج' },
    { name: 'عميل 4', logo: '/image/medium  (14).webp', testimonial: 'شركة موثوقة وتنفذ المشاريع في الوقت المحدد' },
  ]

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-custom">
            عملاؤنا وشركاؤنا
          </h2>
          <div className="about-section-divider"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            نفتخر بثقة عملائنا وشركائنا في جميع مشاريعنا
          </p>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-16"
        >
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            slidesPerView={1}
            spaceBetween={30}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="pb-12"
          >
            {clients.map((client, index) => (
              <SwiperSlide key={index}>
                <div className="bg-gray-50 p-8 rounded-xl shadow-lg h-full">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 ml-1"
                        style={{ color: '#d6ac72' }}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                    "{client.testimonial}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden ml-4">
                      <img
                        src={client.logo}
                        alt={client.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-gray-800">{client.name}</div>
                      <div className="text-sm text-gray-600">عميل</div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Client Logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8"
        >
          {[...Array(12)].map((_, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-400 font-semibold">شريك {index + 1}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ClientsSection

