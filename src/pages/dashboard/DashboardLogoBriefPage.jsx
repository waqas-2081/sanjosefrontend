import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import LogoBriefPage from '../LogoBriefPage';
import styles from '../../components/dashboard/DashboardUI.module.css';

export default function DashboardLogoBriefPage() {
  useDocumentTitle('Logo Brief | Client Dashboard');

  return (
    <div className={`${styles.briefPanel} ${styles.briefEmbed}`}>
      <LogoBriefPage embedded />
    </div>
  );
}


