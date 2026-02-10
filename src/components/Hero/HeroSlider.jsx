import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { Link } from 'react-router-dom'
import 'swiper/css'
import './HeroSlider.css'

const HeroSlider = () => {
  // صورة ثابتة واحدة
  const heroImage = '/image/hero.webp'

  // النصوص المتغيرة - تتقلب تلقائياً
  const textSlides = [
    {
      id: 1,
      subtitle: 'من التصميم حتى التسليم',
      title: 'خدمات شاملة ومتكاملة',
      description: 'نقدم خدمات متكاملة تشمل المقاولات، التشطيبات، الأعمال المساحية، والتسويق العقاري، لضمان تجربة تطوير عقاري متكاملة من التصميم حتى التسليم.',
      primaryCta: 'اطلب عرض سعر',
      primaryLink: '/contact',
      secondaryCta: 'تعرف علينا',
      secondaryLink: '/about',
    },
    {
      id: 2,
      subtitle: 'جودة عالية وتصميم عصري',
      title: 'مشاريع عقارية رائدة',
      description: 'نطور مشاريع سكنية وتجارية بمعايير عالية الجودة وتصميمات عصرية تعكس قوة العلامة التجارية وثقة عملائنا.',
      primaryCta: 'شاهد مشاريعنا',
      primaryLink: '/projects',
      secondaryCta: 'تواصل معنا',
      secondaryLink: '/contact',
    },
    {
      id: 3,
      subtitle: 'رؤية مستقبلية للعقارات',
      title: 'حلول عقارية موثوقة',
      description: 'نلتزم بتقديم حلول عقارية متكاملة مدعومة بخبرة طويلة وفريق متخصص لضمان تنفيذ مشاريعكم بأعلى مستويات الاحترافية.',
      primaryCta: 'استشارة مجانية',
      primaryLink: '/contact',
      secondaryCta: 'خدماتنا',
      secondaryLink: '/services',
    },
  ]

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-900">
      {/* صورة ثابتة */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      />

      {/* Slider للنصوص فقط */}
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="container-custom w-full">
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            loop={true}
            allowTouchMove={false}
            speed={800}
            className="w-full hero-text-slider"
          >
            {textSlides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="max-w-3xl mx-auto text-white hero-text-content text-center">
                  <p className="text-primary-400 font-semibold mb-4 text-lg md:text-xl">
                    {slide.subtitle}
                  </p>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-200 leading-relaxed">
                    {slide.description}
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Link to={slide.primaryLink} className="btn-primary text-base md:text-lg px-6 md:px-8 py-3 md:py-4">
                      {slide.primaryCta}
                    </Link>
                    <Link to={slide.secondaryLink} className="btn-secondary text-base md:text-lg px-6 md:px-8 py-3 md:py-4 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
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
  )
}

export default HeroSlider

