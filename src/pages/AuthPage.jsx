import { Helmet } from 'react-helmet';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthPanel from '../components/auth/AuthPanel';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useAuth } from '../context/AuthContext';

export default function AuthPage() {
  useDocumentTitle('Sign In | San Jose Logo Design');
  const { login } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const from      = location.state?.from?.pathname || '/dashboard';

  const handleLogin = async (formData) => {
    await login(formData); // throws on failure — LoginForm catches & shows error
    navigate(from, { replace: true });
  };

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <meta
          name="description"
          content="Sign in to your San Jose Logo Design client account."
        />
      </Helmet>
      <AuthPanel onLogin={handleLogin} />
    </>
  );
}