import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import ScrollToTop from './components/layout/ScrollToTop';
import './styles/globalMotion.css';
import AboutPage from './pages/AboutPage';
import AnimationsPage from './pages/AnimationsPage';
import BlogDetail from './pages/BlogDetail';
import BlogsPage from './pages/BlogsPage';
import CompletePaymentPage from './pages/CompletePaymentPage';
import ContactPage from './pages/ContactPage';
import DigitalMarketingPage from './pages/DigitalMarketingPage';
import LogoBriefPage from './pages/LogoBriefPage';
import LogoDesignPage from './pages/LogoDesignPage';
import MobileAppsPage from './pages/MobileAppsPage';
import PaymentInfoPage from './pages/PaymentInfoPage';
import PortfolioPage from './pages/PortfolioPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsConditionsPage from './pages/TermsConditionsPage';
import SeoPage from './pages/SeoPage';
import ServicesPage from './pages/ServicesPage';
import WebsiteBriefPage from './pages/WebsiteBriefPage';
import WebsitePage from './pages/WebsitePage';
import HomePage from './pages/HomePage';
import LogoCreatorPage from './pages/logo-creator';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="logo-creator" element={<LogoCreatorPage />} />
        <Route element={<MainLayout />}>
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
          <Route path="search-engine-optimization-services" element={<SeoPage />} />

          <Route path="services" element={<ServicesPage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="terms-condition" element={<TermsConditionsPage />} />
          <Route path="logo-brief" element={<LogoBriefPage />} />
          <Route path="website-brief" element={<WebsiteBriefPage />} />
          <Route path="payment-info" element={<PaymentInfoPage />} />
          <Route path="complete-payment" element={<CompletePaymentPage />} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
