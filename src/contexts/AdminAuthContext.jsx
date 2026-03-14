import { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../services/api'

const AdminAuthContext = createContext()

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext)
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider')
  }
  return context
}

const TOKEN_KEY = 'adminToken'
const ADMIN_KEY = 'adminUser'

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY)
    const saved = localStorage.getItem(ADMIN_KEY)
    if (token && saved) {
      try {
        setAdmin(JSON.parse(saved))
      } catch (e) {
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(ADMIN_KEY)
      }
    }
    setLoading(false)
  }, [])

  const adminLogin = async (username, password) => {
    try {
      const res = await api.auth.login(username, password)
      if (res.success && res.token) {
        localStorage.setItem(TOKEN_KEY, res.token)
        localStorage.setItem(ADMIN_KEY, JSON.stringify(res.admin))
        setAdmin(res.admin)
        return { success: true }
      }
      return { success: false, message: res.message || 'فشل تسجيل الدخول' }
    } catch (e) {
      return { success: false, message: e.message || 'حدث خطأ' }
    }
  }

  const adminLogout = () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(ADMIN_KEY)
    setAdmin(null)
  }

  const refreshAdmin = async () => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (!token) return
    try {
      const res = await api.auth.me()
      if (res.success && res.admin) {
        setAdmin(res.admin)
        localStorage.setItem(ADMIN_KEY, JSON.stringify(res.admin))
      }
    } catch (e) {
      adminLogout()
    }
  }

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        loading,
        adminLogin,
        adminLogout,
        refreshAdmin,
        isAdmin: !!admin,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  )
}
