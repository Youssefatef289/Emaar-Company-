import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { FiSearch, FiFilter, FiMapPin, FiHome, FiDollarSign, FiMaximize2 } from 'react-icons/fi'
import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../contexts/AuthContext'

const RealEstateMarketing = () => {
  const { t } = useLanguage()
  const { isAuthenticated, addFavorite } = useAuth()
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
  const units = [
    {
      id: 1,
      title: 'شقة فاخرة في قلب القاهرة',
      area: 'المعادي',
      rooms: 3,
      finishing: 'سوبر لوكس',
      areaSize: 120,
      floor: 5,
      price: 2500000,
      image: '/image/medium (1).webp',
      description: 'شقة فاخرة بتشطيب سوبر لوكس في موقع مميز',
    },
    {
      id: 2,
      title: 'شقة دوبلكس راقية',
      area: 'مدينة نصر',
      rooms: 4,
      finishing: 'لوكس',
      areaSize: 180,
      floor: 2,
      price: 3500000,
      image: '/image/medium (2).webp',
      description: 'دوبلكس راقي بمساحة واسعة',
    },
    {
      id: 3,
      title: 'شقة استوديو حديثة',
      area: 'زايد',
      rooms: 1,
      finishing: 'نص تشطيب',
      areaSize: 60,
      floor: 10,
      price: 800000,
      image: '/image/medium (3).webp',
      description: 'شقة استوديو حديثة بموقع ممتاز',
    },
    {
      id: 4,
      title: 'شقة عائلية كبيرة',
      area: 'الشروق',
      rooms: 5,
      finishing: 'سوبر لوكس',
      areaSize: 250,
      floor: 3,
      price: 4500000,
      image: '/image/medium (4).webp',
      description: 'شقة عائلية كبيرة بتشطيب فاخر',
    },
  ]

  const filteredUnits = useMemo(() => {
    return units.filter(unit => {
      const matchesSearch = unit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           unit.area.toLowerCase().includes(searchTerm.toLowerCase())
      
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
  }, [searchTerm, filters])

  const areas = [...new Set(units.map(unit => unit.area))]
  const finishingTypes = [...new Set(units.map(unit => unit.finishing))]

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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-lg">
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

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600 text-sm">
            تم العثور على <span className="font-bold" style={{ color: '#d6ac72' }}>{filteredUnits.length}</span> وحدة
          </p>
        </div>

        {/* Units Grid */}
        {filteredUnits.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredUnits.map((unit, index) => (
              <motion.div
                key={unit.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden card-hover"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={unit.image}
                    alt={unit.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-2 right-2 text-white px-2 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#d6ac72' }}>
                    {unit.finishing}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">{unit.title}</h3>
                  
                  <div className="space-y-1.5 mb-3">
                    <div className="flex items-center text-gray-600 text-sm">
                      <FiMapPin className="ml-1.5" size={14} />
                      <span>{unit.area}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <FiHome className="ml-1.5" size={14} />
                      <span>{unit.rooms} غرف</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <FiMaximize2 className="ml-1.5" size={14} />
                      <span>{unit.areaSize} م²</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <span className="ml-1.5">الدور: {unit.floor}</span>
                    </div>
                    <div className="flex items-center font-bold text-base pt-1" style={{ color: '#d6ac72' }}>
                      <FiDollarSign size={16} />
                      <span>{unit.price.toLocaleString()} جنيه</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-xs mb-3 line-clamp-2">{unit.description}</p>

                  <div className="flex gap-2">
                    <a
                      href={`/real-estate-marketing/${unit.id}`}
                      className="flex-1 btn-primary text-center text-sm py-2"
                    >
                      عرض التفاصيل
                    </a>
                    {isAuthenticated && (
                      <button
                        onClick={() => addFavorite(unit.id, 'unit')}
                        className="px-3 py-2 border-2 rounded-lg hover:bg-primary-50 transition-colors text-sm"
                        style={{ color: '#d6ac72', borderColor: '#d6ac72' }}
                      >
                        ♡
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">لا توجد وحدات مطابقة لمعايير البحث</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default RealEstateMarketing

