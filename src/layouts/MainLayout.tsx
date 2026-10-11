// src/layouts/MainLayout.tsx
import { Outlet } from 'react-router'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'

/**
 * Общий каркас приложения: шапка, область страницы (<Outlet />) и подвал.
 * Маршруты объявляются декларативно в App.tsx через этот layout-route.
 */
export default function MainLayout() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <ScrollToTop />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}