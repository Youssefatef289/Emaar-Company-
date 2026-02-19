import { useState } from 'react'
import { FiX, FiGift, FiBookOpen, FiHome, FiDollarSign, FiAward } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const NewsTicker = () => {
  const [isPaused, setIsPaused] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  // This will be fetched from API/Admin Dashboard in production
  const newsItems = [
    { id: 1, text: '🎁 مسابقة رمضان المبارك: شارك في أسئلتنا الدينية مرتين أسبوعياً (الاثنين والخميس الساعة 5:00 مساءً) واكسب جوائز قيمة - شاهد الفيديو للتعرف على الجوائز', type: 'offer', icon: FiGift },
    { id: 2, text: '✨ شعارنا في رمضان: "إعمار.. الكل معها كسبان" - اتبع الشروط وكن من الفائزين', type: 'offer', icon: FiAward },
    { id: 3, text: '📺 شوف الفيديو الجوائز للآخر عشان تعرف هتكسب إيه! واستعد لتكون أحد الفائزين', type: 'offer', icon: FiGift },
    { id: 4, text: '🎊 موعد التتويج: سيتم إجراء القرعة العلنية وتوزيع الجوائز بعد عيد الفطر المبارك مباشرة', type: 'offer', icon: FiAward },
    { id: 5, text: 'عرض خاص: خصم 10% على جميع الوحدات السكنية في مشروعنا الجديد', type: 'offer', icon: FiDollarSign },
    { id: 6, text: 'افتتاح دورة جديدة في الأعمال المساحية - سجل الآن واحصل على خصم 20%', type: 'course', icon: FiBookOpen },
    { id: 7, text: 'إطلاق مشروع جديد في منطقة مميزة - استفسر الآن', type: 'project', icon: FiHome },
  ]

  // Duplicate items for seamless infinite scroll
  const duplicatedItems = [...newsItems, ...newsItems]

  if (!isVisible || newsItems.length === 0) return null

  const getLinkPath = (type) => {
    switch (type) {
      case 'offer':
        return '/offers'
      case 'course':
        return '/surveying-services'
      case 'project':
        return '/current-projects'
      default:
        return '/'
    }
  }

  // Calculate animation duration based on content length
  const animationDuration = newsItems.length * 15 // 15 seconds per item

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[60] text-white shadow-md h-[40px] flex items-center overflow-hidden" style={{ background: 'linear-gradient(to right, #b2884c, #8e6426)' }}>
        <div className="flex items-center h-full w-full">
          {/* News Label */}
          <div className="flex-shrink-0 px-4 md:px-6 h-full flex items-center z-10" style={{ backgroundColor: 'rgba(142, 100, 38, 0.5)' }}>
            <span className="text-sm font-bold whitespace-nowrap flex items-center gap-2 text-white">
              <FiBookOpen size={16} />
              آخر الأخبار:
            </span>
          </div>

          {/* Scrolling Ticker Container */}
          <div className="flex-1 overflow-hidden h-full relative">
            <div
              className={`flex items-center h-full whitespace-nowrap ticker-scroll ${
                isPaused ? 'paused' : ''
              }`}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              style={{
                animationDuration: `${animationDuration}s`,
              }}
            >
              {duplicatedItems.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <Link
                    key={`${item.id}-${index}`}
                    to={getLinkPath(item.type)}
                    className="inline-block px-8 text-sm hover:underline flex items-center gap-2 h-full transition-opacity hover:opacity-90 text-white"
                  >
                    <IconComponent size={16} className="flex-shrink-0" />
                    <span>{item.text}</span>
                    <span className="mx-6 text-white/30">•</span>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Close Button */}
          <div className="flex-shrink-0 px-3 md:px-4 h-full flex items-center z-10" style={{ backgroundColor: 'rgba(142, 100, 38, 0.5)' }}>
            <button
              onClick={() => setIsVisible(false)}
              className="p-1.5 hover:bg-white/20 rounded transition-colors"
              aria-label="Close news ticker"
            >
              <FiX size={16} />
            </button>
          </div>
        </div>
      </div>

    </>
  )
}

export default NewsTicker

