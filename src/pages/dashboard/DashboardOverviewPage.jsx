import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useAuth } from '../../context/AuthContext';
import { useApi } from '../../hooks/useApi';
import styles from '../../components/dashboard/DashboardUI.module.css';

const STATUS_LABELS = {
  paid:        'Paid',
  pending:     'Pending',
  in_progress: 'In progress',
  review:      'In review',
  completed:   'Completed',
  cancelled:   'Cancelled',
};

export default function DashboardOverviewPage() {
  useDocumentTitle('Client Dashboard | San Jose Logo Design');
  const { user } = useAuth();
  const { data, loading } = useApi('/dashboard/overview');

  const stats          = data?.stats           || [];
  const recentActivity = data?.recent_activity || [];
  const recentPayments = data?.recent_payments || [];
  const activeProjects = data?.active_projects || [];

  const displayName = user?.name || 'Client';

  return (
    <div className={styles.page}>
      <p style={{ margin: '0 0 1.25rem', color: '#7b7f90', fontSize: '0.95rem' }}>
        Hello, <strong style={{ color: '#333' }}>{displayName}</strong> — here's what's
        happening with your account.
      </p>

      {/* Stats */}
      <div className={styles.statsGrid}>
        {loading
          ? [1, 2, 3, 4].map((n) => (
              <div key={n} className={`${styles.skeleton} ${styles.statCard}`} style={{ minHeight: 90 }} />
            ))
          : stats.map((stat) => (
              <article key={stat.id} className={styles.statCard}>
                <span className={styles.statLabel}>{stat.label}</span>
                <p className={styles.statValue}>{stat.value}</p>
                <span
                  className={`${styles.statChange} ${stat.trend === 'up' ? styles.statChangeUp : ''}`}
                >
                  {stat.change}
                </span>
              </article>
            ))}
      </div>

      <div className={styles.overviewGrid}>
        {/* Recent Activity */}
        <section className={styles.panel}>
          <div className={styles.panelHead}>
            <h2 className={styles.panelTitle}>Recent activity</h2>
          </div>
          {loading ? (
            <div style={{ padding: '1rem 1.25rem' }}>
              {[1, 2, 3].map((n) => (
                <div key={n} className={`${styles.skeleton}`} style={{ height: 18, marginBottom: '0.75rem', borderRadius: 8 }} />
              ))}
            </div>
          ) : recentActivity.length === 0 ? (
            <p style={{ padding: '1.25rem', color: '#7b7f90', fontSize: '0.9rem' }}>No recent activity.</p>
          ) : (
            <ul className={styles.activityList}>
              {recentActivity.map((item) => (
                <li key={item.id} className={styles.activityItem}>
                  <span className={styles.activityDot} aria-hidden="true" />
                  <div>
                    <p className={styles.activityText}>{item.text}</p>
                    <p className={styles.activityTime}>{item.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Quick Actions */}
        <section className={styles.panel}>
          <div className={styles.panelHead}>
            <h2 className={styles.panelTitle}>Quick actions</h2>
          </div>
          <div className={styles.quickLinks}>
            <Link to="/dashboard/payments" className={styles.quickLink}>My Payments <span>→</span></Link>
            <Link to="/dashboard/website-projects" className={styles.quickLink}>Website Projects <span>→</span></Link>
            <Link to="/dashboard/logo-projects" className={styles.quickLink}>Logo Projects <span>→</span></Link>
            <Link to="/dashboard/logo-brief" className={styles.quickLink}>Submit logo brief <span>→</span></Link>
            <Link to="/dashboard/website-brief" className={styles.quickLink}>Submit website brief <span>→</span></Link>
            <Link to="/dashboard/profile" className={styles.quickLink}>Update profile <span>→</span></Link>
          </div>
        </section>
      </div>

      {/* Active Projects */}
      <section className={styles.panel} style={{ marginTop: '1.25rem' }}>
        <div className={styles.panelHead}>
          <h2 className={styles.panelTitle}>Active projects ({activeProjects.length})</h2>
          <Link to="/dashboard/logo-projects" className={styles.btnGhost}>View all</Link>
        </div>
        {loading ? (
          <div style={{ padding: '1rem 1.25rem' }}>
            <div className={`${styles.skeleton} ${styles.skeletonRow}`} />
            <div className={`${styles.skeleton} ${styles.skeletonRow}`} />
          </div>
        ) : activeProjects.length === 0 ? (
          <p style={{ padding: '1.25rem', color: '#7b7f90', fontSize: '0.9rem' }}>No active projects.</p>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Status</th>
                  <th>Progress</th>
                </tr>
              </thead>
              <tbody>
                {activeProjects.slice(0, 4).map((row) => (
                  <tr key={row.id}>
                    <td>
                      <span className={styles.rowTitle}>{row.title}</span>
                      <span className={styles.rowMeta}>{row.ref || row.id}</span>
                    </td>
                    <td>{STATUS_LABELS[row.status] || row.status}</td>
                    <td>{row.progress != null ? `${row.progress}%` : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Recent Payments */}
      <section className={styles.panel} style={{ marginTop: '1.25rem' }}>
        <div className={styles.panelHead}>
          <h2 className={styles.panelTitle}>Latest payments</h2>
          <Link to="/dashboard/payments" className={styles.btnGhost}>View all</Link>
        </div>
        {loading ? (
          <div style={{ padding: '1rem 1.25rem' }}>
            <div className={`${styles.skeleton} ${styles.skeletonRow}`} />
            <div className={`${styles.skeleton} ${styles.skeletonRow}`} />
          </div>
        ) : recentPayments.length === 0 ? (
          <p style={{ padding: '1.25rem', color: '#7b7f90', fontSize: '0.9rem' }}>No payments yet.</p>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentPayments.slice(0, 3).map((row) => (
                  <tr key={row.id}>
                    <td>
                      <span className={styles.rowTitle}>{row.title || row.package}</span>
                      <span className={styles.rowMeta}>{row.ref || row.id}</span>
                    </td>
                    <td>{row.amount}</td>
                    <td>{STATUS_LABELS[row.status] || row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}