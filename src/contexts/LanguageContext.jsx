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

