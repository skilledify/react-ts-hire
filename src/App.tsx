import { BrowserRouter, Route, Routes } from 'react-router'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import BuyingPage from './pages/BuyingPage'
import RentingPage from './pages/RentingPage'
import SellingPage from './pages/SellingPage'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import NotFoundPage from './pages/NotFoundPage'
import { AppRoutes } from './constants/global.constants'
import { AuthProvider } from './context/AuthContext'

/**
 * Декларативная конфигурация маршрутов React Router 7.
 * Все страницы обёрнуты в MainLayout через layout-route (path без element),
 * путь-константы берутся из global.constants.
 * AuthProvider обеспечивает фронтенд-аутентификацию (localStorage) для всего приложения.
 */
export default function App() {
  return (
    <BrowserRouter basename="/react-ts-hire">
      <AuthProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path={AppRoutes.HOME_PAGE} element={<HomePage />} />
            <Route path={AppRoutes.ABOUT_PAGE} element={<AboutPage />} />
            <Route path={AppRoutes.BUYING_PAGE} element={<BuyingPage />} />
            <Route path={AppRoutes.RENTING_PAGE} element={<RentingPage />} />
            <Route path={AppRoutes.SELLING_PAGE} element={<SellingPage />} />
            <Route path={AppRoutes.CONTACT_PAGE} element={<ContactPage />} />
            <Route path={AppRoutes.LOGIN_PAGE} element={<LoginPage />} />
            <Route path={AppRoutes.SIGNUP_PAGE} element={<SignUpPage />} />
            <Route path={AppRoutes.NOTFOUND_PAGE} element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

