import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiSearch, FiFilter, FiMapPin, FiHome, FiDollarSign, FiMaximize2 } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../contexts/AuthContext'
import { api, apiImage } from '../services/api'

const RealEstateMarketing = () => {
  const { t } = useLanguage()
  const { isAuthenticated, addFavorite } = useAuth()
  const [apiUnits, setApiUnits] = useState([])
  const [apiLoading, setApiLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('الكل')
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    area: '',
    rooms: '',
    finishing: '',
    minArea: '',
    maxArea: '',
    floor: '',
    minPrice: '',
    maxPrice: '',
  })
  const [showFilters, setShowFilters] = useState(false)

  // Mock data - In production, this would come from an API
  const allUnits = {
    'تمليك': [
      {
        id: 1,
        title: 'شقة تمليك فاخرة - بني سويف',
        area: 'بني سويف الجديدة',
        rooms: 3,
        finishing: 'سوبر لوكس',
        areaSize: 120,
        floor: 5,
        price: 2500000,
        image: '/image/medium (1).webp',
        description: 'شقة تمليك فاخرة بتشطيب سوبر لوكس في موقع مميز',
        type: 'تمليك',
      },
      {
        id: 2,
        title: 'شقة تمليك دوبلكس',
        area: 'بني سويف',
        rooms: 4,
        finishing: 'لوكس',
        areaSize: 180,
        floor: 2,
        price: 3500000,
        image: '/image/medium (2).webp',
        description: 'دوبلكس راقي بمساحة واسعة',
        type: 'تمليك',
      },
      {
        id: 3,
        title: 'شقة تمليك استوديو',
        area: 'بني سويف الجديدة',
        rooms: 1,
        finishing: 'نص تشطيب',
        areaSize: 60,
        floor: 10,
        price: 800000,
        image: '/image/medium (3).webp',
        description: 'شقة استوديو حديثة بموقع ممتاز',
        type: 'تمليك',
      },
    ],
    'إيجار': [
      {
        id: 4,
        title: 'شقة إيجار عائلية',
        area: 'بني سويف',
        rooms: 3,
        finishing: 'سوبر لوكس',
        areaSize: 130,
        floor: 4,
        price: 5000,
        image: '/image/medium (4).webp',
        description: 'شقة إيجار عائلية بتشطيب فاخر',
        type: 'إيجار',
        monthlyRent: true,
      },
      {
        id: 5,
        title: 'شقة إيجار راقية',
        area: 'بني سويف الجديدة',
        rooms: 2,
        finishing: 'لوكس',
        areaSize: 90,
        floor: 6,
        price: 3500,
        image: '/image/medium (5).webp',
        description: 'شقة إيجار راقية بموقع مميز',
        type: 'إيجار',
        monthlyRent: true,
      },
    ],
    'مخازن': [
      {
        id: 6,
        title: 'مخزن تجاري للبيع',
        area: 'بني سويف',
        rooms: 0,
        finishing: 'نص تشطيب',
        areaSize: 200,
        floor: 0,
        price: 1500000,
        image: '/image/medium (6).webp',
        description: 'مخزن تجاري بمساحة واسعة',
        type: 'مخازن',
      },
      {
        id: 7,
        title: 'مخزن كبير',
        area: 'بني سويف الجديدة',
        rooms: 0,
        finishing: 'نص تشطيب',
        areaSize: 300,
        floor: 0,
        price: 2200000,
        image: '/image/medium (7).webp',
        description: 'مخزن كبير بموقع استراتيجي',
        type: 'مخازن',
      },
    ],
    'إداري': [
      {
        id: 8,
        title: 'شقة إداري للبيع',
        area: 'بني سويف',
        rooms: 2,
        finishing: 'لوكس',
        areaSize: 100,
        floor: 3,
        price: 1800000,
        image: '/image/medium (1).webp',
        description: 'شقة إداري مناسبة للمكاتب',
        type: 'إداري',
      },
      {
        id: 9,
        title: 'شقة إداري فاخرة',
        area: 'بني سويف الجديدة',
        rooms: 3,
        finishing: 'سوبر لوكس',
        areaSize: 150,
        floor: 5,
        price: 2800000,
        image: '/image/medium (2).webp',
        description: 'شقة إداري فاخرة بموقع مميز',
        type: 'إداري',
      },
    ],
    'أراضي': [
      {
        id: 10,
        title: 'أرض سكنية للبيع',
        area: 'بني سويف الجديدة',
        rooms: 0,
        finishing: '',
        areaSize: 500,
        floor: 0,
        price: 3000000,
        image: '/image/medium (3).webp',
        description: 'أرض سكنية بمساحة 500 متر',
        type: 'أراضي',
      },
      {
        id: 11,
        title: 'أرض تجارية',
        area: 'بني سويف',
        rooms: 0,
        finishing: '',
        areaSize: 300,
        floor: 0,
        price: 2500000,
        image: '/image/medium (4).webp',
        description: 'أرض تجارية بموقع استراتيجي',
        type: 'أراضي',
      },
    ],
  }

  useEffect(() => {
    api.realEstate.list()
      .then((res) => setApiUnits(res.data || []))
      .catch(() => setApiUnits([]))
      .finally(() => setApiLoading(false))
  }, [])

  const units = activeTab === 'الكل' 
    ? Object.values(allUnits).flat() 
    : allUnits[activeTab] || []

  const displayUnits = apiUnits.length > 0 ? apiUnits : units
  const useCmsData = apiUnits.length > 0

  const filteredUnits = useMemo(() => {
    const list = useCmsData ? apiUnits : units
    return list.filter(unit => {
      const title = (unit.title || unit.name || '').toLowerCase()
      const area = (unit.area || '').toLowerCase()
      const desc = (unit.description || '').toLowerCase()
      const matchesSearch = !searchTerm || title.includes(searchTerm.toLowerCase()) ||
                           area.includes(searchTerm.toLowerCase()) || desc.includes(searchTerm.toLowerCase())
      if (useCmsData) return matchesSearch
      const matchesArea = !filters.area || unit.area === filters.area
      const matchesRooms = !filters.rooms || unit.rooms === parseInt(filters.rooms)
      const matchesFinishing = !filters.finishing || unit.finishing === filters.finishing
      const matchesMinArea = !filters.minArea || unit.areaSize >= parseInt(filters.minArea)
      const matchesMaxArea = !filters.maxArea || unit.areaSize <= parseInt(filters.maxArea)
      const matchesFloor = !filters.floor || unit.floor === parseInt(filters.floor)
      const matchesMinPrice = !filters.minPrice || unit.price >= parseInt(filters.minPrice)
      const matchesMaxPrice = !filters.maxPrice || unit.price <= parseInt(filters.maxPrice)
      return matchesSearch && matchesArea && matchesRooms && matchesFinishing &&
             matchesMinArea && matchesMaxArea && matchesFloor && matchesMinPrice && matchesMaxPrice
    })
  }, [searchTerm, filters, useCmsData, apiUnits, units])

  const areas = [...new Set(units.map(unit => unit.area).filter(Boolean))]
  const finishingTypes = [...new Set(units.map(unit => unit.finishing).filter(Boolean))]

  const handleResetFilters = () => {
    setFilters({
      area: '',
      rooms: '',
      finishing: '',
      minArea: '',
      maxArea: '',
      floor: '',
      minPrice: '',
      maxPrice: '',
    })
    setSearchTerm('')
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Hero Section */}
      <div className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #d6ac72 0%, #c49a5f 50%, #b2884c 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'url(/image/medium (1).webp)', 
            backgroundSize: 'cover', 
            backgroundPosition: 'center' 
          }}></div>
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-white drop-shadow-lg">
              التسويق العقاري
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-white drop-shadow-md font-semibold">
              اكتشف أفضل الوحدات السكنية والتجارية المتاحة لدينا
            </p>
            <p className="text-lg text-white drop-shadow-md">
              وحدات فاخرة بمواقع مميزة وأسعار تنافسية
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-custom mt-12">

        {/* Tabs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-2 mb-6"
        >
          <div className="flex flex-wrap gap-2 justify-center">
            {['الكل', 'تمليك', 'إيجار', 'مخازن', 'إداري', 'أراضي'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab)
                  setSearchTerm('')
                  handleResetFilters()
                }}
                className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
                  activeTab === tab
                    ? 'text-white shadow-lg transform scale-105'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                style={activeTab === tab ? { backgroundColor: '#d6ac72' } : {}}
              >
                {tab === 'الكل' && 'الكل'}
                {tab === 'تمليك' && 'شقق تمليك'}
                {tab === 'إيجار' && 'شقق إيجار'}
                {tab === 'مخازن' && 'مخازن'}
                {tab === 'إداري' && 'شقق إداري'}
                {tab === 'أراضي' && 'أراضي'}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-5 mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <FiSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ابحث عن منطقة أو عنوان..."
                className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-#d6ac72 focus:border-transparent"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 text-white rounded-lg hover:opacity-90 transition-colors flex items-center justify-center space-x-2 space-x-reverse"
              style={{ backgroundColor: '#d6ac72' }}
            >
              <FiFilter size={20} />
              <span>فلترة</span>
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">المنطقة</label>
                <select
                  value={filters.area}
                  onChange={(e) => setFilters({ ...filters, area: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-#d6ac72"
                >
                  <option value="">جميع المناطق</option>
                  {areas.map(area => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">عدد الغرف</label>
                <select
                  value={filters.rooms}
                  onChange={(e) => setFilters({ ...filters, rooms: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-#d6ac72"
                >
                  <option value="">جميع الأعداد</option>
                  <option value="1">1 غرفة</option>
                  <option value="2">2 غرف</option>
                  <option value="3">3 غرف</option>
                  <option value="4">4 غرف</option>
                  <option value="5">5+ غرف</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">حالة التشطيب</label>
                <select
                  value={filters.finishing}
                  onChange={(e) => setFilters({ ...filters, finishing: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-#d6ac72"
                >
                  <option value="">جميع الأنواع</option>
                  {finishingTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الدور</label>
                <input
                  type="number"
                  value={filters.floor}
                  onChange={(e) => setFilters({ ...filters, floor: e.target.value })}
                  placeholder="أي دور"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-#d6ac72"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">المساحة (م²) - من</label>
                <input
                  type="number"
                  value={filters.minArea}
                  onChange={(e) => setFilters({ ...filters, minArea: e.target.value })}
                  placeholder="الحد الأدنى"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-#d6ac72"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">المساحة (م²) - إلى</label>
                <input
                  type="number"
                  value={filters.maxArea}
                  onChange={(e) => setFilters({ ...filters, maxArea: e.target.value })}
                  placeholder="الحد الأقصى"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-#d6ac72"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">السعر - من</label>
                <input
                  type="number"
                  value={filters.minPrice}
                  onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                  placeholder="الحد الأدنى"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-#d6ac72"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">السعر - إلى</label>
                <input
                  type="number"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                  placeholder="الحد الأقصى"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-#d6ac72"
                />
              </div>

              <div className="md:col-span-2 lg:col-span-4 flex justify-end">
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  إعادة تعيين
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* منتصف الصفحة: قريباً — البطاقات مُزالة، التابات والبحث فقط */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center min-h-[400px] py-16"
        >
          <div className="text-center">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4" style={{ color: '#d6ac72' }}>
              قريباً
            </h2>
            <p className="text-xl md:text-2xl text-gray-600">
              سنقوم بإضافة الوحدات العقارية قريباً
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default RealEstateMarketing

