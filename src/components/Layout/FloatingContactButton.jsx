import { useState } from 'react'
import { 
  FaPhoneAlt, 
  FaWhatsapp, 
  FaFacebook,
  FaInstagram,
  FaYoutube
} from 'react-icons/fa'
import { FiMessageCircle, FiX } from 'react-icons/fi'
import './FloatingContactButton.css'

// TikTok Icon Component
const TikTokIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
)

const FloatingContactButton = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const contactLinks = [
    {
      name: 'واتساب',
      icon: FaWhatsapp,
      href: 'https://wa.me/201005617186',
      color: 'whatsapp-color',
      gradient: 'linear-gradient(0deg, #00B100, #09db09)',
    },
    {
      name: 'فيسبوك',
      icon: FaFacebook,
      href: 'https://facebook.com/emaar',
      color: 'facebook-color',
      gradient: 'linear-gradient(0deg, #1877F2, #42A5F5)',
    },
    {
      name: 'إنستجرام',
      icon: FaInstagram,
      href: 'https://instagram.com/emaar',
      color: 'instagram-color',
      gradient: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
    },
    {
      name: 'تيك توك',
      icon: TikTokIcon,
      href: 'https://tiktok.com/@emaar',
      color: 'tiktok-color',
      gradient: 'linear-gradient(0deg, #000000, #FE2C55)',
    },
    {
      name: 'يوتيوب',
      icon: FaYoutube,
      href: 'https://youtube.com/@emaar',
      color: 'youtube-color',
      gradient: 'linear-gradient(0deg, #FF0000, #FF4444)',
    },
  ]

  return (
    <div className="floating-contact-wrapper">
      <div id="main-div">
        <div 
          id="main-button" 
          className={`wave ${isOpen ? 'open' : ''}`}
          onClick={handleToggle}
        >
          {isOpen ? <FiX size={20} /> : <FiMessageCircle size={20} />}
        </div>
        <button 
          className={isOpen ? 'open' : ''}
          onClick={() => window.location.href = '/contact'}
        >
          <FaPhoneAlt style={{ marginLeft: '8px' }} />
          استشارة مجانية
        </button>
        {contactLinks.map((link, index) => {
          const Icon = link.icon
          return (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${link.color} ${isOpen ? 'open' : ''}`}
              style={{ 
                background: link.gradient
              }}
              aria-label={link.name}
            >
              <Icon size={20} />
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default FloatingContactButton
