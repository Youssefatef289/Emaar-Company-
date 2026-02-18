import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiMapPin, FiCalendar, FiHome, FiCheckCircle } from 'react-icons/fi'
import { getProjectTypeIcon } from '../constants/assets'

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!project) return null

  const getStatusColor = (status) => {
    if (status === 'مكتمل') return 'bg-green-100 text-green-800'
    if (status === 'قيد التنفيذ') return 'bg-blue-100 text-blue-800'
    return 'bg-gray-100 text-gray-800'
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 left-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:text-primary-500 transition-colors"
              >
                <FiX size={24} />
              </button>

              {/* Image */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h2 className="text-4xl font-bold mb-4 text-gray-800">{project.title}</h2>
                
                {project.description && (
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                )}

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FiMapPin className="text-primary-500" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-1">الموقع</h4>
                      <p className="text-gray-600">{project.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 space-x-reverse">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FiHome className="text-primary-500" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-1">المساحة</h4>
                      <p className="text-gray-600">{project.area}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 space-x-reverse">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <img
                        src={getProjectTypeIcon(project.type)}
                        alt=""
                        className="w-7 h-7"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-1">النوع</h4>
                      <p className="text-gray-600">{project.type}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 space-x-reverse">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FiCalendar className="text-primary-500" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-1">الحالة</h4>
                      <p className="text-gray-600">{project.status}</p>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                {project.features && (
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">المميزات</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {project.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-primary-500 ml-3 mt-1">✓</span>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <button className="btn-primary">
                    تواصل معنا
                  </button>
                  <button
                    onClick={onClose}
                    className="btn-secondary"
                  >
                    إغلاق
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ProjectModal

