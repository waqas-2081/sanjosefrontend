import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { STATUS_LABELS } from '../../data/dashboardMockData';
import styles from './DashboardUI.module.css';

const BADGE_CLASS = {
  paid:        styles.badgePaid,
  pending:     styles.badgePending,
  in_progress: styles.badgeIn_progress,
  review:      styles.badgeReview,
  completed:   styles.badgeCompleted,
  cancelled:   styles.badgePending,
};

function StatusBadge({ status }) {
  return (
    <span className={`${styles.badge} ${BADGE_CLASS[status] || styles.badgeIn_progress}`}>
      {STATUS_LABELS[status] || status}
    </span>
  );
}

export default function ResourceListPage({
  title,
  newLink,
  newLabel = 'New',
  searchPlaceholder = 'Search…',
  items = [],
  variant = 'payments',
  loading = false,
  error = '',
  onViewDetail,
}) {
  const [query,  setQuery]  = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => {
    let list = items;
    if (filter !== 'all') list = list.filter((i) => i.status === filter);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (i) =>
          i.title?.toLowerCase().includes(q) ||
          i.id?.toString().toLowerCase().includes(q) ||
          (i.package && i.package.toLowerCase().includes(q))
      );
    }
    return list;
  }, [items, query, filter]);

  const isPayments = variant === 'payments';

  return (
    <div className={styles.page}>
      <section className={styles.panel}>
        <div className={styles.panelHead}>
          <div className={styles.panelActions}>
            <input
              type="search"
              className={styles.search}
              placeholder={searchPlaceholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search"
            />
            <select
              className={styles.filterSelect}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              aria-label="Filter by status"
            >
              <option value="all">All status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In progress</option>
              <option value="review">In review</option>
              <option value="completed">Completed</option>
            </select>
            {newLink ? (
              <Link to={newLink} className={styles.btnPrimary}>
                {newLabel}
              </Link>
            ) : null}
          </div>
        </div>

        {loading ? (
          <>
            <div className={`${styles.skeleton} ${styles.skeletonRow}`} />
            <div className={`${styles.skeleton} ${styles.skeletonRow}`} />
            <div className={`${styles.skeleton} ${styles.skeletonRow}`} />
          </>
        ) : error ? (
          <div style={{ padding: '2rem 1.25rem', color: '#ef4444', fontSize: '0.9rem' }}>
            <i className="fa-solid fa-circle-exclamation" style={{ marginRight: '0.5rem' }} />
            {error}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: '2.5rem 1.25rem', color: '#7b7f90', fontSize: '0.9rem', textAlign: 'center' }}>
            {query || filter !== 'all' ? 'No results match your search.' : `No ${isPayments ? 'payments' : 'projects'} found yet.`}
          </div>
        ) : (
          <>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>{isPayments ? 'Invoice' : 'Project'}</th>
                    <th>{isPayments ? 'Amount' : 'Package'}</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row) => (
                    <tr key={row.id}>
                      <td>
                        <span className={styles.rowTitle}>{row.title}</span>
                        <span className={styles.rowMeta}>{row.ref || row.id}</span>
                      </td>
                      <td>{isPayments ? row.amount : row.package}</td>
                      <td>
                        <StatusBadge status={row.status} />
                      </td>
                      <td>{row.date}</td>
                      <td>
                        <button
                          type="button"
                          className={styles.btnGhost}
                          onClick={() => onViewDetail && onViewDetail(row)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={styles.cardsGrid}>
              {filtered.map((row) => (
                <article key={row.id} className={styles.mobileCard}>
                  <div className={styles.mobileCardHead}>
                    <div>
                      <span className={styles.rowTitle}>{row.title}</span>
                      <span className={styles.rowMeta}>{row.ref || row.id}</span>
                    </div>
                    <StatusBadge status={row.status} />
                  </div>
                  <p className={styles.rowMeta}>
                    {isPayments ? `${row.amount} · ${row.date}` : `${row.package} · ${row.date}`}
                  </p>
                  <button
                    type="button"
                    className={styles.btnGhost}
                    style={{ marginTop: '0.75rem' }}
                    onClick={() => onViewDetail && onViewDetail(row)}
                  >
                    View details
                  </button>
                </article>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}