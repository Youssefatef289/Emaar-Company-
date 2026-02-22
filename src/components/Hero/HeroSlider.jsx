import { useState, useMemo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Controller } from 'swiper/modules'
import { Link } from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './HeroSlider.css'
import { ICONS } from '../../constants/assets'
import { useLanguage } from '../../contexts/LanguageContext'

const HeroSlider = () => {
  const [imageSwiper, setImageSwiper] = useState(null)
  const [textSwiper, setTextSwiper] = useState(null)
  const { language, t } = useLanguage()

  // بيانات السلايدر - الصور والنصوص معاً
  const slides = useMemo(() => [
    {
      id: 1,
      image: '/image/Slider/slider (1).jpg',
      subtitle: language === 'ar' ? 'ليه تختار' : 'Why Choose',
      title: language === 'ar' ? 'إعمار' : 'Emaar',
      titleSuffix: language === 'ar' ? 'للاستثمار العقاري؟' : 'for Real Estate Investment?',
      description: language === 'ar' 
        ? 'نقدم لك أفضل الفرص الاستثمارية في السوق العقاري المصري مع ضمانات عالية الجودة وخطط سداد مرنة تناسب احتياجاتك.'
        : 'We offer you the best investment opportunities in the Egyptian real estate market with high-quality guarantees and flexible payment plans that suit your needs.',
      primaryCta: language === 'ar' ? 'اطلب استشارة مجانية' : 'Request Free Consultation',
      primaryLink: '/contact',
      secondaryCta: language === 'ar' ? 'شاهد مشاريعنا' : 'View Our Projects',
      secondaryLink: '/projects',
    },
    {
      id: 2,
      image: '/image/Slider/slider (2).jpg',
      subtitle: language === 'ar' ? 'حقق حلمك مع' : 'Achieve Your Dream with',
      title: language === 'ar' ? 'إعمار' : 'Emaar',
      titleSuffix: language === 'ar' ? 'من غير ما تقلق من التكاليف' : 'Without Worrying About Costs',
      description: language === 'ar'
        ? 'خطط سداد مرنة وأسعار تنافسية تجعل حلمك في امتلاك عقار حقيقي. نضمن لك أفضل قيمة مقابل المال مع جودة لا مثيل لها.'
        : 'Flexible payment plans and competitive prices make your dream of owning real estate a reality. We guarantee you the best value for money with unmatched quality.',
      primaryCta: language === 'ar' ? 'اطلب عرض سعر' : 'Request a Quote',
      primaryLink: '/contact',
      secondaryCta: language === 'ar' ? 'تعرف على عروضنا' : 'View Our Offers',
      secondaryLink: '/offers',
    },
    {
      id: 3,
      image: '/image/Slider/slider (3).jpg',
      subtitle: language === 'ar' ? 'عمرك فكرت ليه الاستثمار في العقارات' : 'Have You Ever Wondered Why',
      title: language === 'ar' ? 'قيمته بتزيد مع الوقت' : 'Real Estate Investment',
      titleSuffix: language === 'ar' ? '' : 'Increases in Value Over Time',
      description: language === 'ar'
        ? 'الاستثمار العقاري هو الاستثمار الأكثر أماناً وربحية على المدى الطويل. مع إعمار، تضمن نمو قيمة استثمارك مع مرور الوقت.'
        : 'Real estate investment is the safest and most profitable investment in the long term. With Emaar, you ensure the growth of your investment value over time.',
      primaryCta: language === 'ar' ? 'ابدأ استثمارك الآن' : 'Start Your Investment Now',
      primaryLink: '/contact',
      secondaryCta: language === 'ar' ? 'تعرف علينا' : 'Learn About Us',
      secondaryLink: '/about',
    },
  ], [language])

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
                      <div className="flex flex-col sm:flex-row gap-4 justify-center hero-buttons">
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

