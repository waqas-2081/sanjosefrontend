import { Helmet } from 'react-helmet';
import ForgotPasswordPanel from '../components/auth/ForgotPasswordPanel';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function ForgotPasswordPage() {
  useDocumentTitle('Forgot Password | San Jose Logo Design');

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Reset your San Jose Logo Design client account password."
        />
      </Helmet>
      <ForgotPasswordPanel />
    </>
  );
}
