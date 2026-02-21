import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}

const translations = {
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      offers: 'عروضنا',
      currentProjects: 'مشاريعنا الحالية',
      pastProjects: 'المشاريع السابقة',
      realEstateMarketing: 'التسويق العقاري',
      surveyingServices: 'الأعمال المساحية',
      contact: 'تواصل معنا',
      allProjects: 'جميع المشاريع السابقة',
      residential: 'مشاريع سكنية',
      commercial: 'مشاريع تجارية',
      administrative: 'مشاريع إدارية',
    },
    common: {
      readMore: 'اقرأ المزيد',
      viewDetails: 'عرض التفاصيل',
      contact: 'تواصل',
      search: 'بحث',
      filter: 'فلترة',
      reset: 'إعادة تعيين',
      loading: 'جاري التحميل...',
      noResults: 'لا توجد نتائج',
    },
    hero: {
      slide1: {
        subtitle: 'ليه تختار',
        title: 'إعمار',
        titleSuffix: 'للاستثمار العقاري؟',
        description: 'نقدم لك أفضل الفرص الاستثمارية في السوق العقاري المصري مع ضمانات عالية الجودة وخطط سداد مرنة تناسب احتياجاتك.',
        primaryCta: 'اطلب استشارة مجانية',
        secondaryCta: 'شاهد مشاريعنا',
      },
      slide2: {
        subtitle: 'حقق حلمك مع',
        title: 'إعمار',
        titleSuffix: 'من غير ما تقلق من التكاليف',
        description: 'خطط سداد مرنة وأسعار تنافسية تجعل حلمك في امتلاك عقار حقيقي. نضمن لك أفضل قيمة مقابل المال مع جودة لا مثيل لها.',
        primaryCta: 'اطلب عرض سعر',
        secondaryCta: 'تعرف على عروضنا',
      },
      slide3: {
        subtitle: 'عمرك فكرت ليه الاستثمار في العقارات',
        title: 'قيمته بتزيد مع الوقت',
        titleSuffix: '',
        description: 'الاستثمار العقاري هو الاستثمار الأكثر أماناً وربحية على المدى الطويل. مع إعمار، تضمن نمو قيمة استثمارك مع مرور الوقت.',
        primaryCta: 'ابدأ استثمارك الآن',
        secondaryCta: 'تعرف علينا',
      },
    },
    stats: {
      completedProjects: 'مشروع منجز',
      satisfiedClients: 'عميل راضٍ',
      yearsExperience: 'سنة خبرة',
      professionalTeam: 'فريق محترف',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      offers: 'Our Offers',
      currentProjects: 'Current Projects',
      pastProjects: 'Past Projects',
      realEstateMarketing: 'Real Estate Marketing',
      surveyingServices: 'Surveying Services',
      contact: 'Contact Us',
      allProjects: 'All Past Projects',
      residential: 'Residential Projects',
      commercial: 'Commercial Projects',
      administrative: 'Administrative Projects',
    },
    common: {
      readMore: 'Read More',
      viewDetails: 'View Details',
      contact: 'Contact',
      search: 'Search',
      filter: 'Filter',
      reset: 'Reset',
      loading: 'Loading...',
      noResults: 'No Results',
    },
    hero: {
      slide1: {
        subtitle: 'Why Choose',
        title: 'Emaar',
        titleSuffix: 'for Real Estate Investment?',
        description: 'We offer you the best investment opportunities in the Egyptian real estate market with high-quality guarantees and flexible payment plans that suit your needs.',
        primaryCta: 'Request Free Consultation',
        secondaryCta: 'View Our Projects',
      },
      slide2: {
        subtitle: 'Achieve Your Dream with',
        title: 'Emaar',
        titleSuffix: 'Without Worrying About Costs',
        description: 'Flexible payment plans and competitive prices make your dream of owning real estate a reality. We guarantee you the best value for money with unmatched quality.',
        primaryCta: 'Request a Quote',
        secondaryCta: 'View Our Offers',
      },
      slide3: {
        subtitle: 'Have You Ever Wondered Why',
        title: 'Real Estate Investment',
        titleSuffix: 'Increases in Value Over Time',
        description: 'Real estate investment is the safest and most profitable investment in the long term. With Emaar, you ensure the growth of your investment value over time.',
        primaryCta: 'Start Your Investment Now',
        secondaryCta: 'Learn About Us',
      },
    },
    stats: {
      completedProjects: 'Completed Projects',
      satisfiedClients: 'Satisfied Clients',
      yearsExperience: 'Years of Experience',
      professionalTeam: 'Professional Team',
    },
  },
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'ar'
  })

  useEffect(() => {
    localStorage.setItem('language', language)
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = language
  }, [language])

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar')
  }

  const t = (key) => {
    const keys = key.split('.')
    let value = translations[language]
    for (const k of keys) {
      value = value?.[k]
    }
    return value || key
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

