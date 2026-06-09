import { Helmet } from 'react-helmet';
import { useParams, useSearchParams } from 'react-router-dom';
import ResetPasswordPanel from '../components/auth/ResetPasswordPanel';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

function safeDecode(value) {
  if (!value) return '';
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function readResetParams(tokenParam, searchParams) {
  const fromQuery = searchParams.get('token') || '';
  const token = safeDecode(tokenParam || fromQuery).trim();
  const email = safeDecode(searchParams.get('email') || '').trim();
  return { token, email };
}

export default function ResetPasswordPage() {
  useDocumentTitle('Reset Password | San Jose Logo Design');
  const { token: tokenParam } = useParams();
  const [searchParams] = useSearchParams();
  const { token, email } = readResetParams(tokenParam, searchParams);

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Set a new password for your San Jose Logo Design client account."
        />
      </Helmet>
      <ResetPasswordPanel token={token} email={email} />
    </>
  );
}
