import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi'
import { useLanguage } from '../../contexts/LanguageContext'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false)
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const { language, t } = useLanguage()

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
    { 
      path: '/projects', 
      label: 'مشارعنا', 
      labelEn: 'Our Projects',
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
                className="h-14 w-auto object-contain"
              />
              <div className="flex flex-col text-center">
                <span className="text-xl md:text-2xl font-bold text-primary-700 whitespace-nowrap">
                  اعمار
                </span>
                <span className="text-sm md:text-base font-semibold text-gray-700 whitespace-nowrap">
                  للمقاولات و الاعمال المساحيه
                </span>
                <span className="text-sm md:text-base font-semibold text-gray-700 whitespace-nowrap">
                  و الاستثمار العفارى
                </span>
              </div>
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
                        className="flex items-center space-x-1 space-x-reverse text-gray-700 font-semibold hover:text-primary-700 transition-colors duration-300"
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
                              to="/current-projects"
                              className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                              onClick={() => setIsProjectsDropdownOpen(false)}
                            >
                              المشاريع السابقه والحاليه
                            </Link>
                            <Link
                              to="/projects"
                              className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                              onClick={() => setIsProjectsDropdownOpen(false)}
                            >
                              {t('nav.allProjects')}
                            </Link>
                            <Link
                              to="/projects?type=سكني"
                              className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                              onClick={() => setIsProjectsDropdownOpen(false)}
                            >
                              {t('nav.residential')}
                            </Link>
                            <Link
                              to="/projects?type=تجاري"
                              className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                              onClick={() => setIsProjectsDropdownOpen(false)}
                            >
                              {t('nav.commercial')}
                            </Link>
                            <Link
                              to="/projects?type=إداري"
                              className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
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
                          ? 'text-primary-700'
                          : 'hover:text-primary-700'
                      }`}
                    >
                      {language === 'ar' ? link.label : link.labelEn}
                    </Link>
                  )}
                </div>
              ))}
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
                <div key={link.path}>
                  {link.hasDropdown ? (
                    <div>
                      <div className="flex items-center justify-between py-2">
                        <span className={`font-semibold transition-colors text-gray-700 ${
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
                                className="block py-2 text-sm text-gray-600 hover:text-primary-700 transition-colors"
                              >
                                المشاريع السابقه والحاليه
                              </Link>
                              <Link
                                to="/projects"
                                onClick={() => {
                                  setIsMobileMenuOpen(false)
                                  setIsProjectsDropdownOpen(false)
                                }}
                                className="block py-2 text-sm text-gray-600 hover:text-primary-700 transition-colors"
                              >
                                {t('nav.allProjects')}
                              </Link>
                              <Link
                                to="/projects?type=سكني"
                                onClick={() => {
                                  setIsMobileMenuOpen(false)
                                  setIsProjectsDropdownOpen(false)
                                }}
                                className="block py-2 text-sm text-gray-600 hover:text-primary-700 transition-colors"
                              >
                                {t('nav.residential')}
                              </Link>
                              <Link
                                to="/projects?type=تجاري"
                                onClick={() => {
                                  setIsMobileMenuOpen(false)
                                  setIsProjectsDropdownOpen(false)
                                }}
                                className="block py-2 text-sm text-gray-600 hover:text-primary-700 transition-colors"
                              >
                                {t('nav.commercial')}
                              </Link>
                              <Link
                                to="/projects?type=إداري"
                                onClick={() => {
                                  setIsMobileMenuOpen(false)
                                  setIsProjectsDropdownOpen(false)
                                }}
                                className="block py-2 text-sm text-gray-600 hover:text-primary-700 transition-colors"
                              >
                                {t('nav.administrative')}
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
                      className={`block py-2 font-semibold transition-colors text-gray-700 ${
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar

