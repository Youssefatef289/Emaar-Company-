/**
 * تخزين لوحة التحكم في localStorage (بدون سيرفر أو MongoDB)
 */
const KEYS = {
  products: 'cms_products',
  realEstate: 'cms_realestate',
  courses: 'cms_courses',
  projects: 'cms_projects',
}

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

// ——— المنتجات ———
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
    const i = data.findIndex((x) => x._id === id)
    if (i === -1) return Promise.reject(new Error('المنتج غير موجود'))
    data[i] = { ...data[i], name: body.name ?? data[i].name, description: body.description ?? data[i].description, price: body.price !== undefined ? (body.price ? Number(body.price) : null) : data[i].price, image: body.image !== undefined ? body.image : data[i].image }
    set(KEYS.products, data)
    return Promise.resolve({ data: data[i] })
  },
  delete: (id) => {
    const data = get(KEYS.products).filter((x) => x._id !== id)
    set(KEYS.products, data)
    return Promise.resolve({ success: true })
  },
}

// ——— العقارات ———
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
    }
    data.unshift(item)
    set(KEYS.realEstate, data)
    return Promise.resolve({ data: item })
  },
  update: (id, body) => {
    const data = get(KEYS.realEstate)
    const i = data.findIndex((x) => x._id === id)
    if (i === -1) return Promise.reject(new Error('البطاقة غير موجودة'))
    const cur = data[i]
    data[i] = { ...cur, title: body.title ?? cur.title, description: body.description ?? cur.description, price: body.price !== undefined ? (body.price ? Number(body.price) : null) : cur.price, image: body.image !== undefined ? body.image : cur.image, contactLabel: body.contactLabel !== undefined ? body.contactLabel : cur.contactLabel }
    set(KEYS.realEstate, data)
    return Promise.resolve({ data: data[i] })
  },
  delete: (id) => {
    const data = get(KEYS.realEstate).filter((x) => x._id !== id)
    set(KEYS.realEstate, data)
    return Promise.resolve({ success: true })
  },
}

// ——— الكورسات ———
export const coursesStorage = {
  list: () => Promise.resolve({ data: get(KEYS.courses) }),
  create: (body) => {
    const data = get(KEYS.courses)
    const item = {
      _id: nextId(),
      name: body.name || '',
      description: body.description || '',
      price: body.price ? Number(body.price) : null,
      image: body.image || '',
      registrationLink: body.registrationLink || '',
    }
    data.unshift(item)
    set(KEYS.courses, data)
    return Promise.resolve({ data: item })
  },
  update: (id, body) => {
    const data = get(KEYS.courses)
    const i = data.findIndex((x) => x._id === id)
    if (i === -1) return Promise.reject(new Error('الكورس غير موجود'))
    const cur = data[i]
    data[i] = { ...cur, name: body.name ?? cur.name, description: body.description ?? cur.description, price: body.price !== undefined ? (body.price ? Number(body.price) : null) : cur.price, image: body.image !== undefined ? body.image : cur.image, registrationLink: body.registrationLink !== undefined ? body.registrationLink : cur.registrationLink }
    set(KEYS.courses, data)
    return Promise.resolve({ data: data[i] })
  },
  delete: (id) => {
    const data = get(KEYS.courses).filter((x) => x._id !== id)
    set(KEYS.courses, data)
    return Promise.resolve({ success: true })
  },
}

// ——— المشاريع ———
export const projectsStorage = {
  list: (type) => {
    const data = get(KEYS.projects)
    const filtered = type ? data.filter((x) => x.type === type) : data
    return Promise.resolve({ data: filtered })
  },
  get: (id) => {
    const data = get(KEYS.projects)
    const item = data.find((x) => x._id === id)
    if (!item) return Promise.reject(new Error('المشروع غير موجود'))
    return Promise.resolve({ data: item })
  },
  create: (body) => {
    const data = get(KEYS.projects)
    const images = Array.isArray(body.images) ? body.images : (body.image ? [body.image] : [])
    const image = body.image || (images[0] || '')
    const item = {
      _id: nextId(),
      name: body.name || '',
      description: body.description || '',
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
    const i = data.findIndex((x) => x._id === id)
    if (i === -1) return Promise.reject(new Error('المشروع غير موجود'))
    const cur = data[i]
    const images = body.images !== undefined ? (Array.isArray(body.images) ? body.images : []) : cur.images
    const image = body.image !== undefined ? body.image : (cur.image || (images && images[0]))
    data[i] = { ...cur, name: body.name ?? cur.name, description: body.description ?? cur.description, image, images: images || cur.images || [], type: body.type !== undefined ? body.type : cur.type }
    set(KEYS.projects, data)
    return Promise.resolve({ data: data[i] })
  },
  delete: (id) => {
    const data = get(KEYS.projects).filter((x) => x._id !== id)
    set(KEYS.projects, data)
    return Promise.resolve({ success: true })
  },
}

const SEED_FLAG = 'cms_seeded'

/** إزالة البطاقات التجريبية (منتج / عقاري / كورس تجريبي) من لوحة التحكم */
function removeTrialItems() {
  const trial = (name) => (name || '').includes('تجريبي')
  const p = get(KEYS.products).filter((x) => !trial(x.name))
  const r = get(KEYS.realEstate).filter((x) => !trial(x.title))
  const c = get(KEYS.courses).filter((x) => !trial(x.name))
  if (p.length !== get(KEYS.products).length) set(KEYS.products, p)
  if (r.length !== get(KEYS.realEstate).length) set(KEYS.realEstate, r)
  if (c.length !== get(KEYS.courses).length) set(KEYS.courses, c)
}

/** إضافة بطاقات من صور الصفحات عند الفراغ — منتجات، عقارات، كورسات، مشاريع */
export function seedIfEmpty() {
  removeTrialItems()
  const products = get(KEYS.products)
  const realEstate = get(KEYS.realEstate)
  const courses = get(KEYS.courses)
  const projects = get(KEYS.projects)

  // منتجات — صور من الموقع (صفحة العروض/العقارات)
  if (products.length === 0) {
    productsStorage.create({ name: 'عرض تمليك', description: 'وحدة من صفحة التسويق العقاري', price: 2500000, image: '/image/medium (1).webp' })
    productsStorage.create({ name: 'عرض إيجار', description: 'وحدة إيجار', price: 5000, image: '/image/medium (2).webp' })
    productsStorage.create({ name: 'عرض تجاري', description: 'وحدة تجارية', price: 1500000, image: '/image/medium (3).webp' })
    productsStorage.create({ name: 'عرض أراضي', description: 'أرض سكنية', price: 3000000, image: '/image/medium (4).webp' })
  }
  // بطاقات عقارية — صور من صفحة التسويق العقاري
  if (realEstate.length === 0) {
    realEstateStorage.create({ title: 'شقة تمليك فاخرة', description: 'بني سويف الجديدة', price: 2500000, image: '/image/medium (1).webp', contactLabel: 'تواصل' })
    realEstateStorage.create({ title: 'شقة إيجار عائلية', description: 'تشطيب سوبر لوكس', price: 5000, image: '/image/medium (4).webp', contactLabel: 'تواصل' })
    realEstateStorage.create({ title: 'مخزن تجاري', description: 'مساحة واسعة', price: 1500000, image: '/image/medium (6).webp', contactLabel: 'تواصل' })
    realEstateStorage.create({ title: 'أرض سكنية', description: 'بني سويف', price: 3000000, image: '/image/medium (3).webp', contactLabel: 'تواصل' })
  }
  // كورسات — صور من صفحة الدورات التدريبية (SurveyingServices)
  if (courses.length === 0) {
    coursesStorage.create({ name: 'باكدج المساحة (الميزان - التوتال ستيشن)', description: '24 ساعة', price: 1500, image: '/image/Courses/Area package (leveling - total station).jpg', registrationLink: '' })
    coursesStorage.create({ name: 'الأوتوكاد', description: '20 ساعة', price: 700, image: '/image/Courses/Auto cat.jpeg', registrationLink: '' })
    coursesStorage.create({ name: 'سيفيل 3D', description: '20 ساعة', price: 700, image: '/image/Courses/Civil 3D.jpg', registrationLink: '' })
    coursesStorage.create({ name: '3D Max', description: '20 ساعة', price: 2000, image: '/image/Courses/3D Max.jpeg', registrationLink: '' })
    coursesStorage.create({ name: 'الريفيت', description: '20 ساعة', price: 2000, image: '/image/Courses/Revit.jpg', registrationLink: '' })
  }
  // مشاريع — فقط عند الفراغ ومرة واحدة (لا نكتب فوق مشاريع موجودة)
  if (projects.length === 0 && !localStorage.getItem(SEED_FLAG)) {
  // مشاريع حالية: أبراج إعمار و رويال سيتي — بجميع الصور من CurrentProjects
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
    description: 'مجمع سكني راقي بتشطيبات فاخرة ومرافق متكاملة',
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
  // مشاريع سابقة — جميع الصور من PreviousProjects
  projectsStorage.create({
    name: 'مبنى البريد - بنى سويف',
    description: 'مبنى البريد ودراسات إسلامية في بنى سويف',
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
    description: 'مشروع شركة الحربي',
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
    description: 'بوابات الجامعة العمالية',
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
    name: 'البوابات - جامعة بنى سويف',
    description: 'بوابات جامعة بنى سويف',
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
