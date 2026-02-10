import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { FiMapPin, FiMaximize2 } from 'react-icons/fi'
import ProjectModal from '../ProjectModal'

const ProjectsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const projects = [
    {
      id: 1,
      image: '/image/medium  (5).webp',
      title: 'مشروع النور السكني',
      location: 'القاهرة الجديدة',
      area: '5000 متر مربع',
      status: 'قيد التنفيذ',
      type: 'سكني',
      description: 'مشروع سكني راقي يضم وحدات سكنية عصرية بمواصفات فاخرة، مع مرافق متكاملة وخدمات عالية الجودة',
      features: [
        'وحدات سكنية عصرية',
        'مرافق ترفيهية متكاملة',
        'أماكن انتظار واسعة',
        'نظام أمني متطور',
        'خدمات صيانة مستمرة',
        'موقع مميز وهادئ',
      ],
    },
    {
      id: 2,
      image: '/image/medium  (6).webp',
      title: 'مجمع الأندلس التجاري',
      location: 'مدينة نصر',
      area: '3000 متر مربع',
      status: 'مكتمل',
      type: 'تجاري',
      description: 'مجمع تجاري متكامل يضم محلات ومكاتب ومرافق خدمية، مصمم بأحدث المعايير العالمية',
      features: [
        'محلات تجارية متنوعة',
        'مكاتب إدارية',
        'مواقف سيارات',
        'نظام تكييف مركزي',
        'أمان وحراسة 24/7',
        'موقع استراتيجي',
      ],
    },
    {
      id: 3,
      image: '/image/medium  (7).webp',
      title: 'فيلات الجنة السكنية',
      location: 'المنيا',
      area: '8000 متر مربع',
      status: 'قيد التنفيذ',
      type: 'سكني',
      description: 'مجمع فيلات فاخر بمساحات واسعة وتصميم عصري، يوفر تجربة سكنية استثنائية',
      features: [
        'فيلات بمساحات كبيرة',
        'حدائق خاصة',
        'مسابح فاخرة',
        'نادي رياضي',
        'منطقة أطفال',
        'تصميم عصري راقي',
      ],
    },
    {
      id: 4,
      image: '/image/medium  (8).webp',
      title: 'برج الأعمال',
      location: 'المعادي',
      area: '2500 متر مربع',
      status: 'مكتمل',
      type: 'تجاري',
      description: 'برج أعمال حديث يضم مكاتب ومحلات تجارية، مصمم لخدمة رجال الأعمال والمستثمرين',
      features: [
        'مكاتب فاخرة',
        'محلات تجارية',
        'قاعات اجتماعات',
        'مواقف متعددة الطوابق',
        'نظام إدارة ذكي',
        'موقع مميز',
      ],
    },
    {
      id: 5,
      image: '/image/medium  (9).webp',
      title: 'مشروع الواحة السكني',
      location: '6 أكتوبر',
      area: '6000 متر مربع',
      status: 'قيد التنفيذ',
      type: 'سكني',
      description: 'مشروع سكني متكامل بمرافق وخدمات عالية الجودة، يوفر بيئة سكنية مثالية',
      features: [
        'شقق بمواصفات فاخرة',
        'مرافق رياضية',
        'حدائق واسعة',
        'أماكن ترفيهية',
        'خدمات أمنية',
        'موقع هادئ',
      ],
    },
    {
      id: 6,
      image: '/image/medium  (10).webp',
      title: 'مركز التسوق الحديث',
      location: 'الزقازيق',
      area: '4000 متر مربع',
      status: 'مكتمل',
      type: 'تجاري',
      description: 'مركز تسوق حديث يضم محلات ومطاعم وترفيه، يوفر تجربة تسوق متكاملة',
      features: [
        'محلات متنوعة',
        'مطاعم و كافيهات',
        'صالة ترفيهية',
        'مواقف واسعة',
        'نظام تكييف',
        'موقع حيوي',
      ],
    },
  ]

  const handleOpenModal = (project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  const getStatusColor = (status) => {
    if (status === 'مكتمل') return 'bg-green-100 text-green-800'
    if (status === 'قيد التنفيذ') return 'bg-blue-100 text-blue-800'
    return 'bg-gray-100 text-gray-800'
  }

  return (
    <section ref={ref} className="section-padding bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            مشاريعنا
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            نفتخر بمشاريعنا المتميزة التي تعكس خبرتنا والتزامنا بالجودة
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg card-hover"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    onClick={() => handleOpenModal(project)}
                    className="bg-white text-primary-600 p-3 rounded-full hover:bg-primary-600 hover:text-white transition-colors"
                  >
                    <FiMaximize2 size={24} />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-gray-800">{project.title}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <FiMapPin className="ml-2" size={18} />
                    <span>{project.location}</span>
                  </div>
                  <div className="text-gray-600">
                    <span className="font-semibold">المساحة:</span> {project.area}
                  </div>
                  <div className="text-gray-600">
                    <span className="font-semibold">النوع:</span> {project.type}
                  </div>
                </div>
                <button
                  onClick={() => handleOpenModal(project)}
                  className="text-primary-600 font-semibold hover:text-primary-700 transition-colors inline-flex items-center"
                >
                  عرض التفاصيل
                  <span className="mr-2">←</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-center mt-12"
        >
          <Link to="/projects" className="btn-primary text-lg">
            عرض جميع المشاريع
          </Link>
        </motion.div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  )
}

export default ProjectsSection

