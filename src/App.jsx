import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import { AuthProvider } from './contexts/AuthContext'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import NewsTicker from './components/Layout/NewsTicker'
import FloatingContactButton from './components/Layout/FloatingContactButton'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import Offers from './pages/Offers'
import CurrentProjects from './pages/CurrentProjects'
import RealEstateMarketing from './pages/RealEstateMarketing'
import SurveyingServices from './pages/SurveyingServices'
import CourseBooking from './pages/CourseBooking'
import CourseDetail from './pages/CourseDetail'
import Profile from './pages/Profile'
import ProjectDetail from './pages/ProjectDetail'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-white">
            <NewsTicker />
            <Navbar />
            <main className="flex-grow w-full pt-[120px] md:pt-[120px]">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/offers" element={<Offers />} />
                <Route path="/current-projects" element={<CurrentProjects />} />
                <Route path="/real-estate-marketing" element={<RealEstateMarketing />} />
                <Route path="/surveying-services" element={<SurveyingServices />} />
                <Route path="/surveying-services/course/:courseId" element={<CourseDetail />} />
                <Route path="/surveying-services/course/:courseId/book" element={<CourseBooking />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Routes>
            </main>
            <Footer />
            <FloatingContactButton />
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  )
}

export default App

