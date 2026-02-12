import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiMessageCircle, 
  FiX, 
  FiFacebook, 
  FiInstagram,
  FiPhone,
  FiMail
} from 'react-icons/fi'
import { FaWhatsapp, FaYoutube } from 'react-icons/fa'

const FloatingContactButton = () => {
  const [isOpen, setIsOpen] = useState(false)

  const contactLinks = [
    {
      name: 'واتساب',
      icon: FaWhatsapp,
      href: 'https://wa.me/201234567890',
      color: 'bg-green-500 hover:bg-green-600',
      delay: 0.1,
    },
    {
      name: 'فيسبوك',
      icon: FiFacebook,
      href: 'https://facebook.com/emaar',
      color: 'bg-blue-600 hover:bg-blue-700',
      delay: 0.2,
    },
    {
      name: 'إنستجرام',
      icon: FiInstagram,
      href: 'https://instagram.com/emaar',
      color: 'bg-pink-600 hover:bg-pink-700',
      delay: 0.3,
    },
    {
      name: 'يوتيوب',
      icon: FaYoutube,
      href: 'https://youtube.com/@emaar',
      color: 'bg-red-600 hover:bg-red-700',
      delay: 0.4,
    },
    {
      name: 'اتصل بنا',
      icon: FiPhone,
      href: 'tel:+201234567890',
      color: 'bg-primary-600 hover:bg-primary-700',
      delay: 0.5,
    },
    {
      name: 'البريد الإلكتروني',
      icon: FiMail,
      href: 'mailto:info@emaar.com',
      color: 'bg-gray-600 hover:bg-gray-700',
      delay: 0.6,
    },
  ]

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 space-y-3"
          >
            {contactLinks.map((link, index) => {
              const Icon = link.icon
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: link.delay }}
                  className={`${link.color} text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 flex items-center space-x-3 space-x-reverse group`}
                  aria-label={link.name}
                >
                  <Icon size={20} />
                  <span className="text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {link.name}
                  </span>
                </motion.a>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`${isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-primary-600 hover:bg-primary-700'} text-white p-4 rounded-full shadow-2xl transition-all`}
        aria-label={isOpen ? 'Close contact menu' : 'Open contact menu'}
      >
        {isOpen ? <FiX size={24} /> : <FiMessageCircle size={24} />}
      </motion.button>
    </div>
  )
}

export default FloatingContactButton

