import { useState } from 'react'
import { FiX } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const NewsTicker = () => {
  const [isPaused, setIsPaused] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  // This will be fetched from API/Admin Dashboard in production
  const newsItems = [
    { id: 1, text: '🎉 عرض خاص: خصم 10% على جميع الوحدات السكنية في مشروعنا الجديد', type: 'offer' },
    { id: 2, text: '📢 افتتاح دورة جديدة في الأعمال المساحية - سجل الآن واحصل على خصم 20%', type: 'course' },
    { id: 3, text: '🏗️ إطلاق مشروع جديد في منطقة مميزة - استفسر الآن', type: 'project' },
    { id: 4, text: '✨ عروض تمويل ميسرة تصل إلى 10 سنوات - تواصل معنا', type: 'offer' },
    { id: 5, text: '🏆 حصلنا على جائزة أفضل شركة تطوير عقاري لعام 2024', type: 'award' },
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
      <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-primary-600 to-primary-800 text-white shadow-md h-[40px] flex items-center overflow-hidden">
        <div className="flex items-center h-full w-full">
          {/* News Label */}
          <div className="flex-shrink-0 px-4 md:px-6 bg-primary-700/50 h-full flex items-center z-10">
            <span className="text-sm font-bold whitespace-nowrap">
              📢 آخر الأخبار:
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
              {duplicatedItems.map((item, index) => (
                <Link
                  key={`${item.id}-${index}`}
                  to={getLinkPath(item.type)}
                  className="inline-block px-8 text-sm hover:underline flex items-center h-full transition-opacity hover:opacity-90"
                >
                  {item.text}
                  <span className="mx-6 text-white/30">•</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Close Button */}
          <div className="flex-shrink-0 px-3 md:px-4 h-full flex items-center z-10 bg-primary-700/50">
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

