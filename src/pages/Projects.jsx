import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Projects = () => {
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
          <div className="w-24 h-1 mx-auto mb-6" style={{ backgroundColor: '#d6ac72' }}></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            استعرض مشاريعنا المتميزة في التطوير العقاري
          </p>
        </motion.div>

        {/* Navigation Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          <Link
            to="/current-projects"
            className="bg-white rounded-2xl shadow-lg p-8 text-center card-hover group"
          >
            <div className="text-6xl mb-4">🏗️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Current Projects</h2>
            <p className="text-gray-600 mb-4">
              Learn about our ongoing projects and latest developments
            </p>
            <div className="inline-flex items-center gap-2 text-primary-700 font-semibold group-hover:gap-4 transition-all">
              <span>View Current Projects</span>
              <span>→</span>
            </div>
          </Link>

          <Link
            to="/previous-projects"
            className="bg-white rounded-2xl shadow-lg p-8 text-center card-hover group"
          >
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Previous Projects</h2>
            <p className="text-gray-600 mb-4">
              Browse our completed projects executed with high professionalism
            </p>
            <div className="inline-flex items-center gap-2 text-primary-700 font-semibold group-hover:gap-4 transition-all">
              <span>View Previous Projects</span>
              <span>→</span>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default Projects

