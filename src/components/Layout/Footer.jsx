import { Link } from 'react-router-dom'
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiInstagram, FiYoutube } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const services = [
    'المقاولات العامة',
    'الأعمال المساحية',
    'التسويق العقاري',
    'التطوير العقاري',
    'الاستثمار العقاري',
  ]

  const quickLinks = [
    { path: '/', label: 'الرئيسية' },
    { path: '/about', label: 'من نحن' },
    { path: '/offers', label: 'عروضنا' },
    { path: '/projects', label: 'مشاريعنا' },
    { path: '/real-estate-marketing', label: 'التسويق العقاري' },
    { path: '/surveying-services', label: 'الدورات المساحية' },
    { path: '/contact', label: 'تواصل معنا' },
  ]

  const socialLinks = [
    { icon: FaWhatsapp, href: 'https://wa.me/2010027347377', label: 'WhatsApp', color: '#25D366' },
    { icon: FiFacebook, href: 'https://www.facebook.com/share/18Aw9QebCy/', label: 'Facebook', color: '#1877F2' },
    { icon: FiInstagram, href: 'https://www.instagram.com/emaarcompany1?igsh=MTF4NmJ2dWJvd3huNQ==', label: 'Instagram', color: '#E4405F' },
    { icon: FiYoutube, href: 'https://youtube.com/channel/UCZfRI4IthrN74NOuJO-KVzw?si=6WRGbj5O4mRQ4699', label: 'YouTube', color: '#FF0000' },
  ]

  return (
    <footer className="footer-container">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="footer-company">
            <div className="footer-logo mb-4">
              <img src="/image/Logo.png" alt="Emaar Company" className="h-14 mb-3" />
              <div className="footer-company-name">
                <h3 className="text-xl font-bold mb-1">إعمار</h3>
                <p className="text-sm">المقاولات والأعمال المساحية</p>
                <p className="text-sm">والاستثمار العقاري</p>
              </div>
            </div>
            <p className="footer-description mb-6 leading-relaxed">
              شركة إعمار للمقاولات والأعمال المساحية والاستثمار العقاري - رائدة في التطوير العقاري والمقاولات في مصر، 
              نسعى لتقديم أفضل الخدمات والحلول العقارية لعملائنا.
            </p>
            <div className="flex space-x-3 space-x-reverse">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  style={{ backgroundColor: social.color }}
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">روابط سريعة</h3>
            <ul className="footer-links">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="footer-link"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h3 className="footer-title">خدماتنا</h3>
            <ul className="footer-links">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="footer-link"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3 className="footer-title">تواصل معنا</h3>
            <ul className="footer-contact">
              <li className="footer-contact-item">
                <FiMapPin className="footer-icon" size={20} />
                <span>الزراعيين - عبد السلام عارف - اعلى مطعم بكار</span>
              </li>
              <li className="footer-contact-item">
                <FiPhone className="footer-icon" size={20} />
                <a href="tel:+201005617186" className="footer-link" style={{ cursor: 'pointer' }}>
                  0100 561 7186
                </a>
              </li>
              <li className="footer-contact-item">
                <FiPhone className="footer-icon" size={20} />
                <a href="tel:+2010027347377" className="footer-link" style={{ cursor: 'pointer' }}>
                  0102 734 7377
                </a>
              </li>
              <li className="footer-contact-item">
                <FiMail className="footer-icon" size={20} />
                <a href="mailto:emaarcompany83@gmail.com" className="footer-link">
                  emaarcompany83@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} شركة إعمار للمقاولات والأعمال المساحية والاستثمار العقاري. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

