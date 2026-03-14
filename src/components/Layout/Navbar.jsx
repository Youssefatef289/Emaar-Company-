import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiChevronDown, FiLogIn, FiLayout, FiLogOut } from 'react-icons/fi'
import { useLanguage } from '../../contexts/LanguageContext'
import { useAdminAuth } from '../../contexts/AdminAuthContext'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false)
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const { language, t } = useLanguage()
  const { isAdmin, adminLogout } = useAdminAuth()

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
    { path: '/services', label: 'خدماتنا', labelEn: 'Our Services' },
    { path: '/offers', label: 'عروضنا', labelEn: 'Our Offers' },
    { 
      path: '/projects', 
      label: 'مشارعنا', 
      labelEn: 'Our Projects',
      hasDropdown: true 
    },
    { path: '/real-estate-marketing', label: 'التسويق العقاري', labelEn: 'Real Estate Marketing' },
    { path: '/surveying-services', label: 'الدورات التدريبية', labelEn: 'Training Courses' },
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
            <div className="container-custom max-w-7xl mx-auto px-4 md:px-8 py-2 md:py-3 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-1.5 md:gap-2">
              <img 
                src="/image/Logo.png" 
                alt="شركة إعمار" 
                className="h-16 md:h-20 w-auto object-contain"
              />
              <div className="flex flex-col text-right">
                <span className="text-xl md:text-2xl lg:text-3xl font-extrabold text-primary-700 whitespace-nowrap">
                  اعمار
                </span>
                <span className="text-xs md:text-sm font-bold text-gray-700 whitespace-nowrap leading-tight">
                  للمقاولات و الاعمال المساحيه
                </span>
                <span className="text-xs md:text-sm font-bold text-gray-700 whitespace-nowrap leading-tight">
                  و الاستثمار العفارى
                </span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-3 lg:gap-4 space-x-reverse">
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
                        className="flex items-center gap-0.5 text-sm text-gray-700 font-semibold hover:text-primary-700 transition-colors duration-300"
                      >
                        <span>{language === 'ar' ? link.label : link.labelEn}</span>
                        <FiChevronDown size={14} />
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
                              to="/current-projects"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                              onClick={() => setIsProjectsDropdownOpen(false)}
                            >
                              المشاريع الحالية
                            </Link>
                            <Link
                              to="/previous-projects"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                              onClick={() => setIsProjectsDropdownOpen(false)}
                            >
                              المشاريع السابقة
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      className={`text-sm text-gray-700 font-semibold transition-colors duration-300 ${
                        location.pathname === link.path
                          ? 'text-primary-700'
                          : 'hover:text-primary-700'
                      }`}
                    >
                      {language === 'ar' ? link.label : link.labelEn}
                    </Link>
                  )}
                </div>
              ))}
              {/* زر تسجيل الدخول / لوحة التحكم - في نهاية القائمة */}
              {isAdmin ? (
                <>
                  <Link
                    to="/admin"
                    className="flex items-center gap-1 text-sm text-gray-700 font-semibold hover:text-primary-700 transition-colors"
                  >
                    <FiLayout size={16} />
                    <span>لوحة التحكم</span>
                  </Link>
                  <button
                    onClick={adminLogout}
                    className="flex items-center gap-1 text-sm text-gray-700 font-semibold hover:text-primary-700 transition-colors"
                  >
                    <FiLogOut size={16} />
                    <span>تسجيل الخروج</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/admin/login"
                  className="flex items-center gap-1 text-sm text-gray-700 font-semibold hover:text-primary-700 transition-colors"
                >
                  <FiLogIn size={16} />
                  <span>تسجيل الدخول</span>
                </Link>
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
            <div className="container-custom py-3 space-y-1">
              {navLinks.map((link) => (
                <div key={link.path}>
                  {link.hasDropdown ? (
                    <div>
                      <div className="flex items-center justify-between py-2">
                        <span className={`text-sm font-semibold transition-colors text-gray-700 ${
                          location.pathname === link.path
                            ? 'text-primary-700'
                            : ''
                        }`}>
                          {language === 'ar' ? link.label : link.labelEn}
                        </span>
                        <button
                          onClick={() => setIsProjectsDropdownOpen(!isProjectsDropdownOpen)}
                          className="p-1"
                        >
                          <FiChevronDown 
                            size={18} 
                            className={`transition-transform ${isProjectsDropdownOpen ? 'rotate-180' : ''}`}
                          />
                        </button>
                      </div>
                      <AnimatePresence>
                        {isProjectsDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pr-4 space-y-2 mt-2">
                              <Link
                                to="/current-projects"
                                onClick={() => {
                                  setIsMobileMenuOpen(false)
                                  setIsProjectsDropdownOpen(false)
                                }}
                                className="block py-1.5 pr-4 text-sm text-gray-600 hover:text-primary-700 transition-colors"
                              >
                                المشاريع الحالية
                              </Link>
                              <Link
                                to="/previous-projects"
                                onClick={() => {
                                  setIsMobileMenuOpen(false)
                                  setIsProjectsDropdownOpen(false)
                                }}
                                className="block py-1.5 pr-4 text-sm text-gray-600 hover:text-primary-700 transition-colors"
                              >
                                المشاريع السابقة
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block py-2 text-sm font-semibold transition-colors text-gray-700 ${
                        location.pathname === link.path
                          ? 'text-primary-700'
                          : 'hover:text-primary-700'
                      }`}
                    >
                      {language === 'ar' ? link.label : link.labelEn}
                    </Link>
                  )}
                </div>
              ))}
              {/* تسجيل الدخول / لوحة التحكم في أسفل القائمة */}
              {isAdmin ? (
                <>
                  <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 py-2 text-sm font-semibold text-primary-700">
                    <FiLayout size={18} />
                    <span>لوحة التحكم</span>
                  </Link>
                  <button onClick={() => { adminLogout(); setIsMobileMenuOpen(false); }} className="flex items-center gap-2 py-2 text-sm font-semibold text-gray-700 w-full text-right">
                    <FiLogOut size={18} />
                    <span>تسجيل الخروج</span>
                  </button>
                </>
              ) : (
                <Link to="/admin/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 py-2 text-sm font-semibold text-primary-700">
                  <FiLogIn size={18} />
                  <span>تسجيل الدخول</span>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar

