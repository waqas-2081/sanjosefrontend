import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import ScrollToTop from './components/layout/ScrollToTop';
import './styles/globalMotion.css';
import AboutPage from './pages/AboutPage';
import AnimationsPage from './pages/AnimationsPage';
import BlogDetail from './pages/BlogDetail';
import BlogsPage from './pages/BlogsPage';
import CompletePaymentPage from './pages/CompletePaymentPage';
import PaymentCompletedPage from './pages/PaymentCompletedPage';
import InvoicePage from './pages/InvoicePage';
import ContactPage from './pages/ContactPage';
import DigitalMarketingPage from './pages/DigitalMarketingPage';
import MerchandisingPage from './pages/MerchandisingPage';
import LogoBriefPage from './pages/LogoBriefPage';
import LogoDesignPage from './pages/LogoDesignPage';
import MobileAppsPage from './pages/MobileAppsPage';
import PaymentInfoPage from './pages/PaymentInfoPage';
import PortfolioPage from './pages/PortfolioPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsConditionsPage from './pages/TermsConditionsPage';
import SeoPage from './pages/SeoPage';
import ServicesPage from './pages/ServicesPage';
import ThankYouPage from './pages/ThankYouPage';
import WebsiteBriefPage from './pages/WebsiteBriefPage';
import WebsitePage from './pages/WebsitePage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import LogoCreatorPage from './pages/logo-creator';
import LogoOfferPage from './pages/logo-offer';
import AuthPage from './pages/AuthPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import DashboardLayout from './components/dashboard/DashboardLayout';
import ProtectedRoute from './components/dashboard/ProtectedRoute';
import DashboardPaymentsPage from './pages/dashboard/DashboardPaymentsPage';
import DashboardWebsiteProjectsPage from './pages/dashboard/DashboardWebsiteProjectsPage';
import DashboardLogoProjectsPage from './pages/dashboard/DashboardLogoProjectsPage';
import DashboardRevisionsPage from './pages/dashboard/DashboardRevisionsPage';
import DashboardLogoBriefPage from './pages/dashboard/DashboardLogoBriefPage';
import DashboardWebsiteBriefPage from './pages/dashboard/DashboardWebsiteBriefPage';
import DashboardProfilePage from './pages/dashboard/DashboardProfilePage';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Standalone routes — NO site layout (no header/footer) */}
          <Route path="logo-creator" element={<LogoCreatorPage />} />
          <Route path="login" element={<AuthPage />} />

          {/*
            "genrate/invoice-65975125488341" — React Router cannot match params
            embedded mid-segment (invoice-:token won't work). Use a splat instead:
            path="genrate/*" captures everything after "genrate/" as params['*']
            e.g. "invoice-65975125488341" → InvoicePage strips the "invoice-" prefix.
          */}
          <Route path="genrate/*" element={<InvoicePage />} />

          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="payments" replace />} />
            <Route path="payments" element={<DashboardPaymentsPage />} />
            <Route path="website-projects" element={<DashboardWebsiteProjectsPage />} />
            <Route path="logo-projects" element={<DashboardLogoProjectsPage />} />
            <Route path="revisions" element={<DashboardRevisionsPage />} />
            <Route path="logo-brief" element={<DashboardLogoBriefPage />} />
            <Route path="website-brief" element={<DashboardWebsiteBriefPage />} />
            <Route path="profile" element={<DashboardProfilePage />} />
          </Route>

          {/* Main site layout */}
          <Route element={<MainLayout />}>
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="reset-password/:token?" element={<ResetPasswordPage />} />
            <Route path="signup" element={<Navigate to="/login" replace />} />
            <Route index element={<HomePage />} />
            <Route path="about-us" element={<AboutPage />} />
            <Route path="contact-us" element={<ContactPage />} />
            <Route path="blog" element={<BlogsPage />} />
            <Route path="blog/:slug" element={<BlogDetail />} />
            <Route path="logo-design-services" element={<LogoDesignPage />} />
            <Route path="website-design-development-services" element={<WebsitePage />} />
            <Route path="video-animation-services" element={<AnimationsPage />} />
            <Route path="mobile-app-development-services" element={<MobileAppsPage />} />
            <Route path="digital-marketing-services" element={<DigitalMarketingPage />} />
            <Route path="merchandising-services" element={<MerchandisingPage />} />
            <Route path="search-engine-optimization-services" element={<SeoPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="portfolio" element={<PortfolioPage />} />
            <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="terms-condition" element={<TermsConditionsPage />} />
            <Route path="logo-brief" element={<LogoBriefPage />} />
            <Route path="website-brief" element={<WebsiteBriefPage />} />
            <Route path="payment-info" element={<PaymentInfoPage />} />
            <Route path="complete-payment/:token" element={<CompletePaymentPage />} />
            <Route path="payment-completed/:token" element={<PaymentCompletedPage />} />
            <Route path="logo-offer" element={<LogoOfferPage />} />
            <Route path="thankyou" element={<ThankYouPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;