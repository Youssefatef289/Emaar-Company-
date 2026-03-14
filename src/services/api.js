/**
 * واجهة البيانات تعتمد على localStorage فقط (بدون سيرفر أو MongoDB)
 */
import { productsStorage, realEstateStorage, coursesStorage, projectsStorage, seedIfEmpty } from './storage.js'

export { seedIfEmpty }

const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'Admin@123'
const TOKEN_KEY = 'adminToken'
const ADMIN_KEY = 'adminUser'

// ——— المصادقة (من الواجهة فقط) ———
export const auth = {
  login: (username, password) => {
    const u = (username || '').trim()
    const p = (password || '').trim()
    if (u !== ADMIN_USERNAME || p !== ADMIN_PASSWORD) {
      return Promise.resolve({ success: false, message: 'اسم المستخدم أو كلمة المرور غير صحيحة' })
    }
    const admin = { id: 'admin', username: ADMIN_USERNAME, name: 'Admin' }
    const token = 'local-' + Date.now()
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(ADMIN_KEY, JSON.stringify(admin))
    return Promise.resolve({ success: true, token, admin })
  },
  me: () => {
    const saved = localStorage.getItem(ADMIN_KEY)
    if (!saved) return Promise.reject(new Error('غير مصرح'))
    const admin = JSON.parse(saved)
    return Promise.resolve({ success: true, admin })
  },
}

// ——— الصور: الرابط كما هو (لا سيرفر) ———
export function apiImage(url) {
  if (!url) return ''
  if (url.startsWith('http') || url.startsWith('data:')) return url
  return url
}

// تحويل FormData أو object إلى object بسيط
function bodyToObject(body) {
  if (!body) return {}
  if (body instanceof FormData) {
    const o = {}
    body.forEach((v, k) => { o[k] = typeof v === 'string' ? v : (v && v.name ? v.name : String(v)) })
    return o
  }
  return typeof body === 'object' ? body : {}
}

// ——— المنتجات ———
export const products = {
  list: () => productsStorage.list(),
  create: (body) => productsStorage.create(bodyToObject(body)),
  update: (id, body) => productsStorage.update(id, bodyToObject(body)),
  delete: (id) => productsStorage.delete(id),
}

// ——— العقارات ———
export const realEstate = {
  list: () => realEstateStorage.list(),
  create: (body) => realEstateStorage.create(bodyToObject(body)),
  update: (id, body) => realEstateStorage.update(id, bodyToObject(body)),
  delete: (id) => realEstateStorage.delete(id),
}

// ——— الكورسات ———
export const courses = {
  list: () => coursesStorage.list(),
  create: (body) => coursesStorage.create(bodyToObject(body)),
  update: (id, body) => coursesStorage.update(id, bodyToObject(body)),
  delete: (id) => coursesStorage.delete(id),
}

// ——— المشاريع ———
export const projects = {
  list: (type) => projectsStorage.list(type),
  get: (id) => projectsStorage.get(id),
  create: (body) => projectsStorage.create(bodyToObject(body)),
  update: (id, body) => projectsStorage.update(id, bodyToObject(body)),
  delete: (id) => projectsStorage.delete(id),
}

export const api = {
  auth,
  products,
  realEstate,
  courses,
  projects,
}
