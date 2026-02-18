import { Link } from 'react-router-dom'
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiInstagram, FiLinkedin, FiTwitter } from 'react-icons/fi'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const services = [
    'المقاولات العامة',
    'الأعمال المساحية',
    'التسويق العقاري',
    'أعمال المباني',
    'التشطيبات',
    'أعمال الطرق',
  ]

  const quickLinks = [
    { path: '/', label: 'الرئيسية' },
    { path: '/about', label: 'من نحن' },
    { path: '/services', label: 'خدماتنا' },
    { path: '/projects', label: 'مشاريعنا' },
    { path: '/contact', label: 'تواصل معنا' },
  ]

  const socialLinks = [
    { icon: FiFacebook, href: '#', label: 'Facebook' },
    { icon: FiInstagram, href: '#', label: 'Instagram' },
    { icon: FiLinkedin, href: '#', label: 'LinkedIn' },
    { icon: FiTwitter, href: '#', label: 'Twitter' },
  ]

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <img src="/image/logo-black.png" alt="شركة إعمار" className="h-12 mb-4" />
            <p className="text-gray-400 mb-4 leading-relaxed">
              شركة إعمار للتطوير العقاري - رائدة في مجال التطوير العقاري والمقاولات في مصر، 
              نسعى لتقديم أفضل الخدمات والحلول العقارية لعملائنا.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-primary-500 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">خدماتنا</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="hover:text-primary-400 transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">تواصل معنا</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 space-x-reverse">
                <FiMapPin className="mt-1 flex-shrink-0 text-primary-400" size={20} />
                <span className="text-gray-400">القاهرة، مصر</span>
              </li>
              <li className="flex items-center space-x-3 space-x-reverse">
                <FiPhone className="flex-shrink-0 text-primary-400" size={20} />
                <a href="tel:+201234567890" className="hover:text-primary-400 transition-colors">
                  +20 123 456 7890
                </a>
              </li>
              <li className="flex items-center space-x-3 space-x-reverse">
                <FiMail className="flex-shrink-0 text-primary-400" size={20} />
                <a href="mailto:info@emaar.com" className="hover:text-primary-400 transition-colors">
                  info@emaar.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © {currentYear} شركة إعمار للتطوير العقاري. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

