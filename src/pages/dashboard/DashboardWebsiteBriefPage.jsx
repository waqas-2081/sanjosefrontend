import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import WebsiteBriefPage from '../WebsiteBriefPage';
import styles from '../../components/dashboard/DashboardUI.module.css';

export default function DashboardWebsiteBriefPage() {
  useDocumentTitle('Website Brief | Client Dashboard');

  return (
    <div className={`${styles.briefPanel} ${styles.briefEmbed}`}>
      <WebsiteBriefPage embedded />
    </div>
  );
}


