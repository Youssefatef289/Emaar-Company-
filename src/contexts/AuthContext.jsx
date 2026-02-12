import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Error parsing user data:', error)
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    // In production, this would be an API call
    // For now, we'll simulate with localStorage
    try {
      // Simulate API call
      const mockUser = {
        id: Date.now(),
        email,
        name: email.split('@')[0],
        role: 'user',
        favorites: [],
        bookings: [],
      }
      
      setUser(mockUser)
      localStorage.setItem('user', JSON.stringify(mockUser))
      return { success: true, user: mockUser }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const register = async (name, email, password, phone) => {
    try {
      // Simulate API call
      const mockUser = {
        id: Date.now(),
        name,
        email,
        phone,
        role: 'user',
        favorites: [],
        bookings: [],
      }
      
      setUser(mockUser)
      localStorage.setItem('user', JSON.stringify(mockUser))
      return { success: true, user: mockUser }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const updateUser = (updatedUser) => {
    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
  }

  const addFavorite = (itemId, itemType) => {
    if (!user) return
    
    const favorite = { id: itemId, type: itemType, date: new Date() }
    const updatedUser = {
      ...user,
      favorites: [...(user.favorites || []), favorite],
    }
    updateUser(updatedUser)
  }

  const removeFavorite = (itemId) => {
    if (!user) return
    
    const updatedUser = {
      ...user,
      favorites: (user.favorites || []).filter(fav => fav.id !== itemId),
    }
    updateUser(updatedUser)
  }

  const addBooking = (booking) => {
    if (!user) return
    
    const newBooking = {
      id: Date.now(),
      ...booking,
      date: new Date(),
      status: 'pending',
    }
    const updatedUser = {
      ...user,
      bookings: [...(user.bookings || []), newBooking],
    }
    updateUser(updatedUser)
    return newBooking
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
    addFavorite,
    removeFavorite,
    addBooking,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

