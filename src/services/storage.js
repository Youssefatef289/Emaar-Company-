/**
 * تخزين بيانات لوحة التحكم في localStorage بدون سيرفر.
 */
const KEYS = {
  products: 'cms_products',
  realEstate: 'cms_realestate',
  courses: 'cms_courses',
  projects: 'cms_projects',
}

const SEED_FLAG = 'cms_seeded'

function get(key) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function set(key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}

function nextId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

function normalizeListField(value) {
  if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean)
  if (typeof value === 'string') {
    return value
      .split(/\r?\n|,/)
      .map((item) => item.trim())
      .filter(Boolean)
  }
  return []
}

function normalizeNumberField(value) {
  if (value === '' || value === null || value === undefined) return null
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

function normalizeObjectArrayField(value) {
  return Array.isArray(value) ? value.filter(Boolean) : []
}

function buildCoordinates(body, current = {}) {
  const latitude = normalizeNumberField(body.latitude !== undefined ? body.latitude : current.latitude)
  const longitude = normalizeNumberField(body.longitude !== undefined ? body.longitude : current.longitude)

  if (latitude === null || longitude === null) {
    return {
      latitude,
      longitude,
      coordinates: current.coordinates || null,
    }
  }

  return {
    latitude,
    longitude,
    coordinates: {
      lat: latitude,
      lng: longitude,
    },
  }
}

export const productsStorage = {
  list: () => Promise.resolve({ data: get(KEYS.products) }),
  create: (body) => {
    const data = get(KEYS.products)
    const item = {
      _id: nextId(),
      name: body.name || '',
      description: body.description || '',
      price: body.price ? Number(body.price) : null,
      image: body.image || '',
    }
    data.unshift(item)
    set(KEYS.products, data)
    return Promise.resolve({ data: item })
  },
  update: (id, body) => {
    const data = get(KEYS.products)
    const index = data.findIndex((item) => item._id === id)
    if (index === -1) return Promise.reject(new Error('المنتج غير موجود'))

    const current = data[index]
    data[index] = {
      ...current,
      name: body.name ?? current.name,
      description: body.description ?? current.description,
      price: body.price !== undefined ? (body.price ? Number(body.price) : null) : current.price,
      image: body.image !== undefined ? body.image : current.image,
    }

    set(KEYS.products, data)
    return Promise.resolve({ data: data[index] })
  },
  delete: (id) => {
    set(KEYS.products, get(KEYS.products).filter((item) => item._id !== id))
    return Promise.resolve({ success: true })
  },
}

export const realEstateStorage = {
  list: () => Promise.resolve({ data: get(KEYS.realEstate) }),
  create: (body) => {
    const data = get(KEYS.realEstate)
    const item = {
      _id: nextId(),
      title: body.title || '',
      description: body.description || '',
      price: body.price ? Number(body.price) : null,
      image: body.image || '',
      contactLabel: body.contactLabel || 'تواصل',
      category: body.category || '',
    }
    data.unshift(item)
    set(KEYS.realEstate, data)
    return Promise.resolve({ data: item })
  },
  update: (id, body) => {
    const data = get(KEYS.realEstate)
    const index = data.findIndex((item) => item._id === id)
    if (index === -1) return Promise.reject(new Error('البطاقة غير موجودة'))

    const current = data[index]
    data[index] = {
      ...current,
      title: body.title ?? current.title,
      description: body.description ?? current.description,
      price: body.price !== undefined ? (body.price ? Number(body.price) : null) : current.price,
      image: body.image !== undefined ? body.image : current.image,
      contactLabel: body.contactLabel !== undefined ? body.contactLabel : current.contactLabel,
      category: body.category !== undefined ? body.category : current.category,
    }

    set(KEYS.realEstate, data)
    return Promise.resolve({ data: data[index] })
  },
  delete: (id) => {
    set(KEYS.realEstate, get(KEYS.realEstate).filter((item) => item._id !== id))
    return Promise.resolve({ success: true })
  },
}

export const coursesStorage = {
  list: () => Promise.resolve({ data: get(KEYS.courses) }),
  get: (id) => {
    const data = get(KEYS.courses)
    const item = data.find((course) => course._id === id)
    if (!item) return Promise.reject(new Error('الكورس غير موجود'))
    return Promise.resolve({ data: item })
  },
  create: (body) => {
    const data = get(KEYS.courses)
    const item = {
      _id: nextId(),
      name: body.name || '',
      description: body.description || '',
      price: body.price ? Number(body.price) : null,
      image: body.image || '',
      registrationLink: body.registrationLink || '',
      duration: body.duration || '',
      level: body.level || '',
      instructor: body.instructor || '',
      instructorBio: body.instructorBio || '',
      videoUrl: body.videoUrl || '',
      importance: body.importance || '',
      usefulness: normalizeListField(body.usefulness),
      content: normalizeListField(body.content),
      benefits: normalizeListField(body.benefits),
      syllabus: normalizeObjectArrayField(body.syllabus),
      whatsappNumber: body.whatsappNumber || '01027347377',
    }
    data.unshift(item)
    set(KEYS.courses, data)
    return Promise.resolve({ data: item })
  },
  update: (id, body) => {
    const data = get(KEYS.courses)
    const index = data.findIndex((item) => item._id === id)
    if (index === -1) return Promise.reject(new Error('الكورس غير موجود'))

    const current = data[index]
    data[index] = {
      ...current,
      name: body.name ?? current.name,
      description: body.description ?? current.description,
      price: body.price !== undefined ? (body.price ? Number(body.price) : null) : current.price,
      image: body.image !== undefined ? body.image : current.image,
      registrationLink: body.registrationLink !== undefined ? body.registrationLink : current.registrationLink,
      duration: body.duration !== undefined ? body.duration : current.duration,
      level: body.level !== undefined ? body.level : current.level,
      instructor: body.instructor !== undefined ? body.instructor : current.instructor,
      instructorBio: body.instructorBio !== undefined ? body.instructorBio : current.instructorBio,
      videoUrl: body.videoUrl !== undefined ? body.videoUrl : current.videoUrl,
      importance: body.importance !== undefined ? body.importance : current.importance,
      usefulness: body.usefulness !== undefined ? normalizeListField(body.usefulness) : current.usefulness,
      content: body.content !== undefined ? normalizeListField(body.content) : current.content,
      benefits: body.benefits !== undefined ? normalizeListField(body.benefits) : current.benefits,
      syllabus: body.syllabus !== undefined ? normalizeObjectArrayField(body.syllabus) : current.syllabus,
      whatsappNumber: body.whatsappNumber !== undefined ? body.whatsappNumber : current.whatsappNumber,
    }

    set(KEYS.courses, data)
    return Promise.resolve({ data: data[index] })
  },
  delete: (id) => {
    set(KEYS.courses, get(KEYS.courses).filter((item) => item._id !== id))
    return Promise.resolve({ success: true })
  },
}

export const projectsStorage = {
  list: (type) => {
    const data = get(KEYS.projects)
    return Promise.resolve({ data: type ? data.filter((item) => item.type === type) : data })
  },
  get: (id) => {
    const data = get(KEYS.projects)
    const item = data.find((project) => project._id === id)
    if (!item) return Promise.reject(new Error('المشروع غير موجود'))
    return Promise.resolve({ data: item })
  },
  create: (body) => {
    const data = get(KEYS.projects)
    const images = Array.isArray(body.images) ? body.images.filter(Boolean) : (body.image ? [body.image] : [])
    const image = body.image || images[0] || ''
    const { latitude, longitude, coordinates } = buildCoordinates(body)
    const item = {
      _id: nextId(),
      name: body.name || '',
      description: body.description || '',
      longDescription: body.longDescription || '',
      location: body.location || '',
      address: body.address || '',
      categoryLabel: body.categoryLabel || '',
      statusLabel: body.statusLabel || '',
      completionDate: body.completionDate || '',
      floors: normalizeNumberField(body.floors),
      progress: normalizeNumberField(body.progress),
      units: normalizeNumberField(body.units),
      features: normalizeListField(body.features),
      video: body.video || '',
      latitude,
      longitude,
      coordinates,
      offerTitle: body.offerTitle || '',
      offerDescription: body.offerDescription || '',
      offerBadges: normalizeListField(body.offerBadges),
      towers: normalizeObjectArrayField(body.towers),
      image,
      images,
      type: body.type || 'current',
    }
    data.unshift(item)
    set(KEYS.projects, data)
    return Promise.resolve({ data: item })
  },
  update: (id, body) => {
    const data = get(KEYS.projects)
    const index = data.findIndex((item) => item._id === id)
    if (index === -1) return Promise.reject(new Error('المشروع غير موجود'))

    const current = data[index]
    const images = body.images !== undefined
      ? (Array.isArray(body.images) ? body.images.filter(Boolean) : [])
      : current.images
    const image = body.image !== undefined ? body.image : (current.image || images?.[0] || '')
    const { latitude, longitude, coordinates } = buildCoordinates(body, current)

    data[index] = {
      ...current,
      name: body.name ?? current.name,
      description: body.description ?? current.description,
      longDescription: body.longDescription !== undefined ? body.longDescription : current.longDescription,
      location: body.location !== undefined ? body.location : current.location,
      address: body.address !== undefined ? body.address : current.address,
      categoryLabel: body.categoryLabel !== undefined ? body.categoryLabel : current.categoryLabel,
      statusLabel: body.statusLabel !== undefined ? body.statusLabel : current.statusLabel,
      completionDate: body.completionDate !== undefined ? body.completionDate : current.completionDate,
      floors: body.floors !== undefined ? normalizeNumberField(body.floors) : current.floors,
      progress: body.progress !== undefined ? normalizeNumberField(body.progress) : current.progress,
      units: body.units !== undefined ? normalizeNumberField(body.units) : current.units,
      features: body.features !== undefined ? normalizeListField(body.features) : current.features,
      video: body.video !== undefined ? body.video : current.video,
      latitude,
      longitude,
      coordinates,
      offerTitle: body.offerTitle !== undefined ? body.offerTitle : current.offerTitle,
      offerDescription: body.offerDescription !== undefined ? body.offerDescription : current.offerDescription,
      offerBadges: body.offerBadges !== undefined ? normalizeListField(body.offerBadges) : current.offerBadges,
      towers: body.towers !== undefined ? normalizeObjectArrayField(body.towers) : current.towers,
      image,
      images: images || current.images || [],
      type: body.type !== undefined ? body.type : current.type,
    }

    set(KEYS.projects, data)
    return Promise.resolve({ data: data[index] })
  },
  delete: (id) => {
    set(KEYS.projects, get(KEYS.projects).filter((item) => item._id !== id))
    return Promise.resolve({ success: true })
  },
}

function removeTrialItems() {
  const isTrial = (value) => (value || '').includes('تجريبي')
  const products = get(KEYS.products).filter((item) => !isTrial(item.name))
  const realEstate = get(KEYS.realEstate).filter((item) => !isTrial(item.title))
  const courses = get(KEYS.courses).filter((item) => !isTrial(item.name))

  set(KEYS.products, products)
  set(KEYS.realEstate, realEstate)
  set(KEYS.courses, courses)
}

/**
 * إبقاء وظيفة البذور متاحة فقط عند الحاجة اليدوية.
 */
export function seedIfEmpty() {
  removeTrialItems()

  const products = get(KEYS.products)
  const realEstate = get(KEYS.realEstate)
  const courses = get(KEYS.courses)
  const projects = get(KEYS.projects)

  if (products.length === 0) {
    productsStorage.create({ name: 'عرض تمليك', description: 'وحدة من صفحة التسويق العقاري', price: 2500000, image: '/image/medium (1).webp' })
    productsStorage.create({ name: 'عرض إيجار', description: 'وحدة إيجار', price: 5000, image: '/image/medium (2).webp' })
    productsStorage.create({ name: 'عرض تجاري', description: 'وحدة تجارية', price: 1500000, image: '/image/medium (3).webp' })
    productsStorage.create({ name: 'عرض أراضٍ', description: 'أرض سكنية', price: 3000000, image: '/image/medium (4).webp' })
  }

  if (realEstate.length === 0) {
    realEstateStorage.create({ title: 'شقة تمليك فاخرة', description: 'بني سويف الجديدة', price: 2500000, image: '/image/medium (1).webp', contactLabel: 'تواصل', category: 'تمليك' })
    realEstateStorage.create({ title: 'شقة إيجار عائلية', description: 'تشطيب سوبر لوكس', price: 5000, image: '/image/medium (4).webp', contactLabel: 'تواصل', category: 'إيجار' })
    realEstateStorage.create({ title: 'مخزن تجاري', description: 'مساحة واسعة', price: 1500000, image: '/image/medium (6).webp', contactLabel: 'تواصل', category: 'مخازن' })
    realEstateStorage.create({ title: 'أرض سكنية', description: 'بني سويف', price: 3000000, image: '/image/medium (3).webp', contactLabel: 'تواصل', category: 'أراضي' })
  }

  if (courses.length === 0) {
    coursesStorage.create({ name: 'باكدج المساحة (الميزان - التوتال ستيشن)', description: 'دورة شاملة للتطبيق العملي', duration: '24 ساعة', price: 1500, image: '/image/Courses/Area package (leveling - total station).jpg', registrationLink: '' })
    coursesStorage.create({ name: 'الأوتوكاد', description: 'تعلم أساسيات الرسم الهندسي', duration: '20 ساعة', price: 700, image: '/image/Courses/Auto cat.jpeg', registrationLink: '' })
    coursesStorage.create({ name: 'سيفيل 3D', description: 'تطبيقات مدنية ومساحية', duration: '20 ساعة', price: 700, image: '/image/Courses/Civil 3D.jpg', registrationLink: '' })
    coursesStorage.create({ name: '3D Max', description: 'النمذجة الثلاثية والريندر', duration: '20 ساعة', price: 2000, image: '/image/Courses/3D Max.jpeg', registrationLink: '' })
    coursesStorage.create({ name: 'الريفيت', description: 'مدخل عملي لتقنية BIM', duration: '20 ساعة', price: 2000, image: '/image/Courses/Revit.jpg', registrationLink: '' })
  }

  if (projects.length === 0 && !localStorage.getItem(SEED_FLAG)) {
    projectsStorage.create({
      name: 'أبراج إعمار',
      description: 'مجمع أبراج فاخر بتصميم عصري وخدمات متكاملة.',
      type: 'current',
      images: [
        '/image/Our current projects/Emaar Towers/Emaar Towers (1).jpg',
        '/image/Our current projects/Emaar Towers/Emaar Towers (2).jpg',
        '/image/Our current projects/Emaar Towers/Emaar Towers (3).jpg',
        '/image/Our current projects/Emaar Towers/Emaar Towers (4).jpg',
        '/image/Our current projects/Emaar Towers/Emaar Towers (5).jpg',
        '/image/Our current projects/Emaar Towers/Emaar Towers Split (1).jpg',
        '/image/Our current projects/Emaar Towers/Emaar Towers Split (2).jpg',
        '/image/Our current projects/Emaar Towers/Emaar Towers Split (3).jpg',
        '/image/Our current projects/Emaar Towers/Emaar Towers Split (4).jpg',
        '/image/Our current projects/Emaar Towers/Emaar Towers Split (5).jpg',
      ],
    })

    projectsStorage.create({
      name: 'رويال سيتي',
      description: 'مجمع سكني راقٍ بتشطيبات فاخرة ومرافق متكاملة.',
      type: 'current',
      images: [
        '/image/Our current projects/Royal city/royal city (1).jpg',
        '/image/Our current projects/Royal city/royal city (2).jpg',
        '/image/Our current projects/Royal city/royal city (3).jpg',
        '/image/Our current projects/Royal city/Royal City Apartment (1).jpg',
        '/image/Our current projects/Royal city/Royal City Apartment (2).jpg',
        '/image/Our current projects/Royal city/Royal City Apartment (3).jpg',
        '/image/Our current projects/Royal city/Royal City Apartment (4).jpg',
      ],
    })

    projectsStorage.create({
      name: 'مبنى البريد - بني سويف',
      description: 'مبنى البريد والدراسات الإسلامية في بني سويف.',
      type: 'previous',
      images: [
        '/image/Beni Suef Post Office, Islamic Studies/Post office (1).jpg',
        '/image/Beni Suef Post Office, Islamic Studies/Post office (2).jpg',
        '/image/Beni Suef Post Office, Islamic Studies/Post office (3).jpg',
        '/image/Beni Suef Post Office, Islamic Studies/Post office (4).jpg',
        '/image/Beni Suef Post Office, Islamic Studies/Post office (5).jpg',
        '/image/Beni Suef Post Office, Islamic Studies/Post office (6).jpg',
        '/image/Beni Suef Post Office, Islamic Studies/Post office (7).jpg',
        '/image/Beni Suef Post Office, Islamic Studies/Post office (8).jpg',
        '/image/Beni Suef Post Office, Islamic Studies/Post office (9).jpg',
        '/image/Beni Suef Post Office, Islamic Studies/Post office (10).jpg',
        '/image/Beni Suef Post Office, Islamic Studies/Post office (11).jpg',
        '/image/Beni Suef Post Office, Islamic Studies/Post office (12).jpg',
        '/image/Beni Suef Post Office, Islamic Studies/Post office (13).jpg',
        '/image/Beni Suef Post Office, Islamic Studies/Post office (14).jpg',
        '/image/Beni Suef Post Office, Islamic Studies/Post office (15).jpg',
        '/image/Beni Suef Post Office, Islamic Studies/Post office (16).jpg',
        '/image/Beni Suef Post Office, Islamic Studies/Post office (17).jpg',
      ],
    })

    projectsStorage.create({
      name: 'شركة الحربي',
      description: 'مشروع شركة الحربي.',
      type: 'previous',
      images: [
        '/image/Al-Harbi Company/Al-Harbi Company (1).jpg',
        '/image/Al-Harbi Company/Al-Harbi Company (2).jpg',
        '/image/Al-Harbi Company/Al-Harbi Company (3).jpg',
        '/image/Al-Harbi Company/Al-Harbi Company (4).jpg',
        '/image/Al-Harbi Company/Al-Harbi Company (5).jpg',
        '/image/Al-Harbi Company/Al-Harbi Company (6).jpg',
        '/image/Al-Harbi Company/Al-Harbi Company (7).jpg',
      ],
    })

    projectsStorage.create({
      name: 'البوابات - الجامعة العمالية',
      description: 'بوابات الجامعة العمالية.',
      type: 'previous',
      images: [
        "/image/البوبات/الجامعة العمالية/Workers' University Gates (1).JPG",
        "/image/البوبات/الجامعة العمالية/Workers' University Gates (2).JPG",
        "/image/البوبات/الجامعة العمالية/Workers' University Gates (3).JPG",
        "/image/البوبات/الجامعة العمالية/Workers' University Gates (4).jpg",
        "/image/البوبات/الجامعة العمالية/Workers' University Gates (5).jpg",
        "/image/البوبات/الجامعة العمالية/Workers' University Gates (6).jpg",
        "/image/البوبات/الجامعة العمالية/Workers' University Gates (7).jpg",
        "/image/البوبات/الجامعة العمالية/Workers' University Gates (8).jpg",
        "/image/البوبات/الجامعة العمالية/Workers' University Gates (9).jpg",
        "/image/البوبات/الجامعة العمالية/Workers' University Gates (10).jpg",
        "/image/البوبات/الجامعة العمالية/Workers' University Gates (11).jpg",
        "/image/البوبات/الجامعة العمالية/Workers' University Gates (12).jpg",
        "/image/البوبات/الجامعة العمالية/Workers' University Gates (13).jpg",
        "/image/البوبات/الجامعة العمالية/Workers' University Gates (14).JPG",
        "/image/البوبات/الجامعة العمالية/Workers' University Gates (15).JPG",
        "/image/البوبات/الجامعة العمالية/Workers' University Gates (16).JPG",
      ],
    })

    projectsStorage.create({
      name: 'البوابات - جامعة بني سويف',
      description: 'بوابات جامعة بني سويف.',
      type: 'previous',
      images: [
        '/image/البوبات/جامعة بنى سويف/Beni Suef University Gates (1).JPG',
        '/image/البوبات/جامعة بنى سويف/Beni Suef University Gates (2).JPG',
        '/image/البوبات/جامعة بنى سويف/Beni Suef University Gates (3).JPG',
        '/image/البوبات/جامعة بنى سويف/Beni Suef University Gates (4).JPG',
      ],
    })

    localStorage.setItem(SEED_FLAG, '1')
  }
}
