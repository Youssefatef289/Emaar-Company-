import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMapPin, FiMaximize2, FiFilter } from 'react-icons/fi'
import ProjectModal from '../components/ProjectModal'

const Projects = () => {
  const [filter, setFilter] = useState('الكل')
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
      description: 'مشروع سكني راقي يضم وحدات سكنية عصرية بمواصفات فاخرة',
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
      description: 'مجمع تجاري متكامل يضم محلات ومكاتب ومرافق خدمية',
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
      description: 'مجمع فيلات فاخر بمساحات واسعة وتصميم عصري',
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
      description: 'برج أعمال حديث يضم مكاتب ومحلات تجارية',
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
      description: 'مشروع سكني متكامل بمرافق وخدمات عالية الجودة',
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
      description: 'مركز تسوق حديث يضم محلات ومطاعم وترفيه',
      features: [
        'محلات متنوعة',
        'مطاعم و كافيهات',
        'صالة ترفيهية',
        'مواقف واسعة',
        'نظام تكييف',
        'موقع حيوي',
      ],
    },
    {
      id: 7,
      image: '/image/medium  (15).webp',
      title: 'مشروع الأمل السكني',
      location: 'الإسكندرية',
      area: '5500 متر مربع',
      status: 'قيد التنفيذ',
      type: 'سكني',
      description: 'مشروع سكني راقي بموقع مميز ومرافق متكاملة',
      features: [
        'شقق فاخرة',
        'مرافق متكاملة',
        'حدائق',
        'أماكن ترفيه',
        'خدمات أمنية',
        'موقع مميز',
      ],
    },
    {
      id: 8,
      image: '/image/medium  (16).webp',
      title: 'برج المال والأعمال',
      location: 'المعادي',
      area: '3500 متر مربع',
      status: 'مكتمل',
      type: 'تجاري',
      description: 'برج متعدد الأغراض للمكاتب والمحلات التجارية',
      features: [
        'مكاتب متعددة',
        'محلات تجارية',
        'قاعات',
        'مواقف',
        'نظام إدارة',
        'موقع استراتيجي',
      ],
    },
    {
      id: 9,
      image: '/image/medium  (17).webp',
      title: 'مجمع النجوم السكني',
      location: 'القاهرة الجديدة',
      area: '7000 متر مربع',
      status: 'قيد التنفيذ',
      type: 'سكني',
      description: 'مجمع سكني فاخر بمساحات خضراء ومرافق ترفيهية',
      features: [
        'شقق فاخرة',
        'مساحات خضراء',
        'مرافق ترفيهية',
        'نادي رياضي',
        'خدمات متكاملة',
        'موقع هادئ',
      ],
    },
  ]

  const filters = ['الكل', 'سكني', 'تجاري', 'قيد التنفيذ', 'مكتمل']

  const filteredProjects = filter === 'الكل'
    ? projects
    : filter === 'قيد التنفيذ' || filter === 'مكتمل'
    ? projects.filter((p) => p.status === filter)
    : projects.filter((p) => p.type === filter)

  const getStatusColor = (status) => {
    if (status === 'مكتمل') return 'bg-green-100 text-green-800'
    if (status === 'قيد التنفيذ') return 'bg-blue-100 text-blue-800'
    return 'bg-gray-100 text-gray-800'
  }

  const handleOpenModal = (project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  return (
    <div className="pt-32 pb-16 bg-gray-50 min-h-screen">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            مشاريعنا
          </h1>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            استعرض مشاريعنا المتميزة في التطوير العقاري
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-12 flex flex-wrap justify-center gap-4"
        >
          {filters.map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                filter === filterOption
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
              }`}
            >
              {filterOption}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
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
                <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
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
                  className="w-full btn-primary"
                >
                  عرض التفاصيل
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">لا توجد مشاريع متاحة في هذا التصنيف</p>
          </div>
        )}
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}

export default Projects

