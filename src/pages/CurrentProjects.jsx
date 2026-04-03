import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiLayers, FiMapPin, FiX } from 'react-icons/fi'
import { FALLBACK_CURRENT_PROJECTS } from '../constants/fallbackData'
import { api, apiImage } from '../services/api'

export default function CurrentProjects() {
  const [apiProjects, setApiProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedProjectImages, setSelectedProjectImages] = useState(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  useEffect(() => {
    api.projects
      .list('current')
      .then((response) => setApiProjects(response.data || []))
      .catch(() => setApiProjects([]))
      .finally(() => setLoading(false))
  }, [])

  const useCmsProjects = apiProjects.length > 0

  const projects = useMemo(() => {
    if (!useCmsProjects) return FALLBACK_CURRENT_PROJECTS
    return apiProjects.map((project) => ({
      id: project._id,
      _id: project._id,
      title: project.name,
      description: project.description,
      image: project.image || project.images?.[0] || '',
      images: Array.isArray(project.images) && project.images.length > 0
        ? project.images
        : project.image ? [project.image] : [],
      type: 'مشروع حالي',
      projectType: project.type,
      fromCms: true,
    }))
  }, [apiProjects, useCmsProjects])

  const closeModal = () => {
    setSelectedProjectImages(null)
    setSelectedImageIndex(0)
  }

  const showImages = (images, index = 0) => {
    setSelectedProjectImages(images)
    setSelectedImageIndex(index)
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div
        className="relative py-20 md:py-28 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #d6ac72 0%, #c49a5f 50%, #b2884c 100%)' }}
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'url(/image/Our current projects/Emaar Towers/Emaar Towers (1).jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-white drop-shadow-lg">
              مشاريعنا الحالية
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-white drop-shadow-md font-semibold">
              عند وجود مشاريع مضافة من لوحة التحكم، يتم عرضها هنا فقط بدل البيانات الثابتة.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-custom mt-12">
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500" />
          </div>
        ) : projects.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">لا توجد مشاريع حالية حتى الآن</h2>
            <p className="text-gray-600">يمكنك إضافة مشروع حالي من لوحة التحكم ليظهر هنا مباشرة.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project._id || project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
              >
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  {project.image ? (
                    <img
                      src={apiImage(project.image)}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">بدون صورة</div>
                  )}
                  <div
                    className="absolute top-3 right-3 text-white px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: '#d6ac72' }}
                  >
                    {project.type}
                  </div>
                  {!project.fromCms && project.progress != null && (
                    <div className="absolute top-3 left-3 bg-white/90 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                      {project.progress}% إنجاز
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-extrabold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{project.description}</p>

                  {!project.fromCms && (
                    <div className="space-y-2 mb-4 text-sm text-gray-700">
                      {project.location && (
                        <div className="flex items-center gap-2">
                          <FiMapPin size={15} style={{ color: '#d6ac72' }} />
                          <span>{project.location}</span>
                        </div>
                      )}
                      {project.floors && (
                        <div className="flex items-center gap-2">
                          <FiLayers size={15} style={{ color: '#d6ac72' }} />
                          <span>{project.floors} طوابق</span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex flex-col gap-3">
                    {project.images?.length > 1 && (
                      <button
                        type="button"
                        onClick={() => showImages(project.images)}
                        className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                      >
                        عرض الصور ({project.images.length})
                      </button>
                    )}
                    <Link
                      to={`/projects/${project._id || project.id}`}
                      className="btn-primary w-full flex items-center justify-center gap-2 py-3"
                    >
                      <span>عرض التفاصيل</span>
                      <FiArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-16 rounded-2xl p-8 text-center text-white"
          style={{ background: 'linear-gradient(to right, #d6ac72, #c49a5f)' }}
        >
          <h2 className="text-3xl font-bold mb-4">استفسر عن مشاريعنا الحالية</h2>
          <p className="text-lg mb-6 opacity-90">
            تواصل معنا لمعرفة المزيد عن الوحدات المتاحة وخطط التنفيذ الحالية.
          </p>
          <Link to="/contact" className="btn-secondary bg-white hover:bg-gray-50 inline-block" style={{ color: '#d6ac72' }}>
            تواصل معنا الآن
          </Link>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProjectImages && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-5xl w-full"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeModal}
                className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors z-10"
              >
                <FiX size={24} />
              </button>
              <img
                src={apiImage(selectedProjectImages[selectedImageIndex])}
                alt=""
                className="w-full max-h-[80vh] object-contain rounded-xl"
              />
              {selectedProjectImages.length > 1 && (
                <div className="flex justify-center gap-2 mt-4 flex-wrap">
                  {selectedProjectImages.map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
                        selectedImageIndex === index ? 'border-white' : 'border-transparent'
                      }`}
                    >
                      <img src={apiImage(image)} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
