import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiChevronDown, FiUser, FiLogOut } from 'react-icons/fi'
import { useLanguage } from '../../contexts/LanguageContext'
import { useAuth } from '../../contexts/AuthContext'
import LoginModal from '../Auth/LoginModal'
import RegisterModal from '../Auth/RegisterModal'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const { language, toggleLanguage, t } = useLanguage()
  const { user, logout, isAuthenticated } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { path: '/', label: 'الرئيسية', labelEn: 'Home' },
    { path: '/about', label: 'من نحن', labelEn: 'About Us' },
    { path: '/offers', label: 'عروضنا', labelEn: 'Our Offers' },
    { path: '/current-projects', label: 'مشاريعنا الحالية', labelEn: 'Current Projects' },
    { 
      path: '/projects', 
      label: 'المشاريع السابقة', 
      labelEn: 'Past Projects',
      hasDropdown: true 
    },
    { path: '/real-estate-marketing', label: 'التسويق العقاري', labelEn: 'Real Estate Marketing' },
    { path: '/surveying-services', label: 'الأعمال المساحية', labelEn: 'Surveying Services' },
    { path: '/contact', label: 'تواصل معنا', labelEn: 'Contact Us' },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'top-[40px]' : 'top-[40px]'
        }`}
      >
        <div className="w-full bg-white shadow-lg">
          <div className="w-full">
            <div className="container-custom max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 space-x-reverse">
              <img 
                src="/image/Logo.png" 
                alt="شركة إعمار" 
                className="h-10 w-auto object-contain"
              />
              <span className="text-xl md:text-2xl font-bold text-primary-600 whitespace-nowrap">
                إعمار للتطوير والتسويق العقاري
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6 space-x-reverse">
              {navLinks.map((link) => (
                <div key={link.path} className="relative">
                  {link.hasDropdown ? (
                    <div
                      onMouseEnter={() => setIsProjectsDropdownOpen(true)}
                      onMouseLeave={() => setIsProjectsDropdownOpen(false)}
                      className="relative"
                    >
                      <Link
                        to={link.path}
                        className="flex items-center space-x-1 space-x-reverse text-gray-700 font-semibold hover:text-primary-600 transition-colors duration-300"
                      >
                        <span>{language === 'ar' ? link.label : link.labelEn}</span>
                        <FiChevronDown size={16} />
                      </Link>
                      <AnimatePresence>
                        {isProjectsDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl py-2 min-w-[220px] z-50"
                          >
                            <Link
                              to="/projects"
                              className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                              onClick={() => setIsProjectsDropdownOpen(false)}
                            >
                              {t('nav.allProjects')}
                            </Link>
                            <Link
                              to="/projects?type=سكني"
                              className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                              onClick={() => setIsProjectsDropdownOpen(false)}
                            >
                              {t('nav.residential')}
                            </Link>
                            <Link
                              to="/projects?type=تجاري"
                              className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                              onClick={() => setIsProjectsDropdownOpen(false)}
                            >
                              {t('nav.commercial')}
                            </Link>
                            <Link
                              to="/projects?type=إداري"
                              className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                              onClick={() => setIsProjectsDropdownOpen(false)}
                            >
                              {t('nav.administrative')}
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      className={`text-gray-700 font-semibold transition-colors duration-300 ${
                        location.pathname === link.path
                          ? 'text-primary-600'
                          : 'hover:text-primary-600'
                      }`}
                    >
                      {language === 'ar' ? link.label : link.labelEn}
                    </Link>
                  )}
                </div>
              ))}
              
              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="px-3 py-1.5 rounded-lg bg-primary-50 text-primary-600 font-semibold hover:bg-primary-100 transition-colors text-sm"
              >
                {language === 'ar' ? 'EN' : 'AR'}
              </button>
              
              {/* Auth Buttons */}
              {isAuthenticated ? (
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 space-x-reverse text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    <FiUser size={18} />
                    <span className="text-sm font-semibold">{user?.name || 'حسابي'}</span>
                  </Link>
                  <button
                    onClick={logout}
                    className="flex items-center space-x-2 space-x-reverse text-red-600 hover:text-red-700 transition-colors"
                  >
                    <FiLogOut size={18} />
                    <span className="text-sm font-semibold">تسجيل الخروج</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="flex items-center space-x-2 space-x-reverse text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <FiUser size={18} />
                  <span className="text-sm font-semibold">تسجيل الدخول</span>
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg transition-colors text-gray-700"
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden bg-white rounded-xl mx-4 shadow-xl border border-gray-200 fixed left-0 right-0 z-40 ${
              isScrolled ? 'top-[120px]' : 'top-[120px]'
            }`}
          >
            <div className="container-custom py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2 font-semibold transition-colors text-gray-700 ${
                    location.pathname === link.path
                      ? 'text-primary-600'
                      : 'hover:text-primary-600'
                  }`}
                >
                  {language === 'ar' ? link.label : link.labelEn}
                </Link>
              ))}
              
              {/* Language Toggle - Mobile */}
              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={toggleLanguage}
                  className="w-full px-4 py-2 rounded-lg bg-primary-50 text-primary-600 font-semibold hover:bg-primary-100 transition-colors text-sm"
                >
                  {language === 'ar' ? 'English' : 'العربية'}
                </button>
              </div>
              
              {/* Auth Buttons - Mobile */}
              <div className="pt-2 space-y-2">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center space-x-2 space-x-reverse text-gray-700 hover:text-primary-600 transition-colors py-2"
                    >
                      <FiUser size={18} />
                      <span className="font-semibold">{user?.name || 'حسابي'}</span>
                    </Link>
                    <button
                      onClick={() => {
                        logout()
                        setIsMobileMenuOpen(false)
                      }}
                      className="flex items-center space-x-2 space-x-reverse text-red-600 hover:text-red-700 transition-colors py-2 w-full"
                    >
                      <FiLogOut size={18} />
                      <span className="font-semibold">تسجيل الخروج</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      setIsLoginOpen(true)
                    }}
                    className="flex items-center space-x-2 space-x-reverse text-gray-700 hover:text-primary-600 transition-colors py-2 w-full"
                  >
                    <FiUser size={18} />
                    <span className="font-semibold">تسجيل الدخول</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Auth Modals */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToRegister={() => {
          setIsLoginOpen(false)
          setIsRegisterOpen(true)
        }}
      />
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSwitchToLogin={() => {
          setIsRegisterOpen(false)
          setIsLoginOpen(true)
        }}
      />
    </>
  )
}

export default Navbar

