import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false)
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { path: '/', label: 'الرئيسية' },
    { path: '/projects', label: 'مشاريعنا', hasDropdown: true },
    { path: '/services', label: 'خدماتنا' },
    { path: '/about', label: 'من نحن' },
    { path: '/contact', label: 'تواصل معنا' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <div className="container-custom py-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl px-8 py-4 flex items-center justify-between shadow-2xl">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 space-x-reverse">
              <img 
                src="/image/Logo.png" 
                alt="شركة إعمار" 
                className="h-10 w-auto object-contain"
              />
              <span className="text-2xl font-bold text-primary-600">
                إعمار
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-10 space-x-reverse">
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
                        <span>{link.label}</span>
                        <FiChevronDown size={16} />
                      </Link>
                      <AnimatePresence>
                        {isProjectsDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl py-2 min-w-[200px]"
                          >
                            <Link
                              to="/projects"
                              className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                              onClick={() => setIsProjectsDropdownOpen(false)}
                            >
                              جميع المشاريع
                            </Link>
                            <Link
                              to="/projects?type=سكني"
                              className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                              onClick={() => setIsProjectsDropdownOpen(false)}
                            >
                              مشاريع سكنية
                            </Link>
                            <Link
                              to="/projects?type=تجاري"
                              className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                              onClick={() => setIsProjectsDropdownOpen(false)}
                            >
                              مشاريع تجارية
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
                      {link.label}
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white rounded-xl mx-4 mt-2 shadow-xl border border-gray-200"
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
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar

