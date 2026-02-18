import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Controller } from 'swiper/modules'
import { Link } from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './HeroSlider.css'
import { ICONS } from '../../constants/assets'

const HeroSlider = () => {
  const [imageSwiper, setImageSwiper] = useState(null)
  const [textSwiper, setTextSwiper] = useState(null)

  // بيانات السلايدر - الصور والنصوص معاً
  const slides = [
    {
      id: 1,
      image: '/image/Slider/slider (1).jpg',
      subtitle: 'ليه تختار',
      title: 'إعمار',
      titleSuffix: 'للاستثمار العقاري؟',
      description: 'نقدم لك أفضل الفرص الاستثمارية في السوق العقاري المصري مع ضمانات عالية الجودة وخطط سداد مرنة تناسب احتياجاتك.',
      primaryCta: 'اطلب استشارة مجانية',
      primaryLink: '/contact',
      secondaryCta: 'شاهد مشاريعنا',
      secondaryLink: '/projects',
    },
    {
      id: 2,
      image: '/image/Slider/slider (2).jpg',
      subtitle: 'حقق حلمك مع',
      title: 'إعمار',
      titleSuffix: 'من غير ما تقلق من التكاليف',
      description: 'خطط سداد مرنة وأسعار تنافسية تجعل حلمك في امتلاك عقار حقيقي. نضمن لك أفضل قيمة مقابل المال مع جودة لا مثيل لها.',
      primaryCta: 'اطلب عرض سعر',
      primaryLink: '/contact',
      secondaryCta: 'تعرف على عروضنا',
      secondaryLink: '/offers',
    },
    {
      id: 3,
      image: '/image/Slider/slider (3).jpg',
      subtitle: 'عمرك فكرت ليه الاستثمار في العقارات',
      title: 'قيمته بتزيد مع الوقت',
      titleSuffix: '',
      description: 'الاستثمار العقاري هو الاستثمار الأكثر أماناً وربحية على المدى الطويل. مع إعمار، تضمن نمو قيمة استثمارك مع مرور الوقت.',
      primaryCta: 'ابدأ استثمارك الآن',
      primaryLink: '/contact',
      secondaryCta: 'تعرف علينا',
      secondaryLink: '/about',
    },
  ]

  return (
    <div className="relative w-full overflow-hidden bg-gray-900 hero-slider-container">
      <div className="container-custom mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 py-12 lg:py-20 min-h-[85vh]">
          {/* قسم الصور - الجانب الأيسر */}
          <div className="w-full lg:w-1/2 relative order-1 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl hero-image-wrapper">
              <Swiper
                modules={[Autoplay, Controller]}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                loop={true}
                speed={800}
                onSwiper={setImageSwiper}
                controller={{ control: textSwiper }}
                className="hero-image-slider"
              >
                {slides.map((slide) => (
                  <SwiperSlide key={slide.id}>
                    <div className="relative w-full h-full min-h-[400px] lg:min-h-[600px]">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {/* قسم النصوص - الجانب الأيمن */}
          <div className="w-full lg:w-1/2 flex items-center justify-center hero-text-section relative order-2 lg:order-2">
            <div className="w-full hero-text-slider">
              <Swiper
                modules={[Autoplay, Controller]}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                loop={true}
                speed={800}
                onSwiper={setTextSwiper}
                controller={{ control: imageSwiper }}
                allowTouchMove={false}
                className="w-full"
              >
                {slides.map((slide) => (
                  <SwiperSlide key={slide.id}>
                    <div className="max-w-2xl mx-auto hero-text-content text-center lg:text-right">
                      {slide.subtitle && (
                        <p className="hero-subtitle mb-4 text-base md:text-lg lg:text-xl">
                          {slide.subtitle}
                        </p>
                      )}
                      <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-5 lg:mb-6 leading-tight">
                        {slide.title}
                        {slide.titleSuffix && (
                          <>
                            <br />
                            <span className="hero-title-suffix">{slide.titleSuffix}</span>
                          </>
                        )}
                      </h1>
                      <p className="text-base md:text-lg lg:text-xl mb-8 lg:mb-10 leading-relaxed max-w-xl lg:max-w-2xl lg:mr-0 mx-auto">
                        {slide.description}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end hero-buttons">
                        <Link
                          to={slide.primaryLink}
                          className="btn-primary text-sm md:text-base lg:text-lg px-6 md:px-8 py-3 md:py-4 inline-flex items-center justify-center gap-2 flex-row-reverse font-semibold rounded-lg transition-all hover:shadow-lg"
                        >
                          <img
                            src={ICONS.plus}
                            alt=""
                            className="w-4 h-4 md:w-5 md:h-5 opacity-90"
                            loading="lazy"
                            decoding="async"
                          />
                          <span>{slide.primaryCta}</span>
                        </Link>
                        <Link
                          to={slide.secondaryLink}
                          className="btn-secondary text-sm md:text-base lg:text-lg px-6 md:px-8 py-3 md:py-4 inline-flex items-center justify-center font-semibold rounded-lg transition-all hover:shadow-lg"
                          style={{ color: '#d6ac72', borderColor: '#d6ac72', borderWidth: '2px' }}
                        >
                          {slide.secondaryCta}
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSlider

