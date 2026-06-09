import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API_BASE = 'https://admin.sanjoselogodesign.com/api';

export default function InvoicePage() {
  // Route: "genrate/*"
  // For URL /genrate/invoice-65975125488341, params['*'] = "invoice-65975125488341"
  // Strip the "invoice-" prefix to get the raw token.
  const params = useParams();
  const slug   = params['*'] || '';                         // "invoice-65975125488341"
  const token  = slug.startsWith('invoice-')
    ? slug.slice('invoice-'.length)                         // "65975125488341"
    : slug;

  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'Invoice | San Jose Logo Design';

    if (!token) {
      setError('Invalid invoice link.');
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const res = await fetch(`${API_BASE}/payment-requests/by-link/${token}`, {
          headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
        });
        const data = await res.json().catch(() => null);
        if (!res.ok || !data?.success) throw new Error(data?.message || 'Invoice not found.');
        setInfo(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  const methodLabel = {
    stripe:  'Card (Stripe)',
    paypal:  'PayPal',
    cashapp: 'Cash App Pay',
    zelle:   'Zelle',
  }[info?.payment_method] || (info?.payment_method || '—');

  const invoiceNumber = `INV-${token?.toUpperCase()}`;

  /* ── Inline styles (standalone page — no global CSS dependency) ── */
  const s = {
    body: {
      margin: 0,
      padding: 0,
      background: '#0d0d1a',
      fontFamily: "'DM Sans', 'Segoe UI', Arial, sans-serif",
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    page: {
      width: '100%',
      maxWidth: '1100px',
      padding: '30px 16px 60px',
      boxSizing: 'border-box',
    },
    invoice: {
      background: '#000',
      borderRadius: '12px',
      padding: '40px',
      color: '#fff',
      overflow: 'hidden',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      paddingBottom: '20px',
      marginBottom: '20px',
      borderBottom: '1px solid rgba(255,94,44,1)',
    },
    logo: { maxWidth: '200px', height: 'auto' },
    companyDetails: {
      textAlign: 'right',
      color: '#fff',
      fontSize: '14px',
      lineHeight: '1.7',
    },
    companyLink: { color: 'rgba(255,94,44,1)', textDecoration: 'none' },
    billedSection: { marginBottom: '30px' },
    billedTitle: { fontSize: '22px', fontWeight: '700', marginBottom: '12px', color: '#fff' },
    billedLabel: { color: '#aaa', fontSize: '13px', marginBottom: '4px' },
    billedLine: { color: 'rgb(255, 255, 255)', fontSize: '14px', margin: '2px 0' },
    methodBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      marginTop: '12px',
      padding: '7px 14px',
      borderRadius: '6px',
      background: 'rgba(255,94,44,0.15)',
      border: '1px solid rgba(255,94,44,0.8)',
      color: '#fff',
      fontSize: '13px',
    },
    table: { width: '100%', borderCollapse: 'collapse', marginBottom: '0' },
    th: {
      padding: '14px 16px',
      border: '2px solid rgba(255,94,44,1)',
      color: '#fff',
      fontWeight: '600',
      fontSize: '14px',
      textAlign: 'left',
      background: 'transparent',
    },
    thRight: {
      padding: '14px 16px',
      border: '2px solid rgba(255,94,44,1)',
      color: '#fff',
      fontWeight: '600',
      fontSize: '14px',
      textAlign: 'right',
      background: 'transparent',
    },
    td: {
      padding: '14px 16px',
      border: '2px solid rgba(255,94,44,1)',
      color: '#fff',
      fontSize: '14px',
      verticalAlign: 'top',
    },
    tdRight: {
      padding: '14px 16px',
      border: '2px solid rgba(255,94,44,1)',
      color: '#fff',
      fontSize: '14px',
      textAlign: 'right',
    },
    orderNo: { color: '#fff', fontSize: '24px', fontWeight: '700' },
    packageName: { margin: '0', fontWeight: '600', fontSize: '15px', color: '#fff' },
    tfootTd: {
      padding: '12px 20px',
      border: '2px solid rgba(255,94,44,1)',
      textAlign: 'right',
      color: '#fff',
      fontSize: '14px',
    },
    tfootTotal: {
      padding: '14px 20px',
      border: '2px solid rgba(255,94,44,1)',
      textAlign: 'right',
      color: 'rgba(255,120,16,1)',
      fontSize: '20px',
      fontWeight: '700',
    },
    footer: {
      marginTop: '32px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '16px',
      borderTop: '1px solid #333',
      gap: '16px',
      flexWrap: 'wrap',
    },
    footerLink: { color: '#aaa', textDecoration: 'none', marginRight: '12px', fontSize: '13px' },
    printBtn: {
      background: 'linear-gradient(90deg, rgba(255,120,16,1) 0%, rgba(255,94,44,1) 100%)',
      border: 'none',
      borderRadius: '8px',
      color: '#fff',
      padding: '10px 28px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      letterSpacing: '0.5px',
      textTransform: 'uppercase',
    },
    center: { textAlign: 'center', padding: '80px 20px', color: '#fff' },
    spinnerWrap: {
      display: 'inline-block',
      width: '36px', height: '36px',
      border: '3px solid rgba(255,120,16,0.2)',
      borderTopColor: 'rgba(255,120,16,1)',
      borderRadius: '50%',
      marginBottom: '16px',
    },
  };

  const Shell = ({ children }) => (
    <div style={s.body}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes invoiceSpin { to { transform: rotate(360deg); } }
        .invoice-spinner { animation: invoiceSpin 0.8s linear infinite; }
        * { box-sizing: border-box; }
        @media print { .no-print { display: none !important; } body { background: #000 !important; } }
      `}</style>
      <div style={s.page}>{children}</div>
    </div>
  );

  if (loading) {
    return (
      <Shell>
        <div style={{ ...s.invoice, ...s.center }}>
          <div style={s.spinnerWrap} className="invoice-spinner" /><br />
          <p>Loading invoice…</p>
        </div>
      </Shell>
    );
  }

  if (error) {
    return (
      <Shell>
        <div style={{ ...s.invoice, ...s.center }}>
          <div style={{ fontSize: '40px', marginBottom: '16px', color: 'rgba(255,94,44,1)' }}>⚠</div>
          <h2 style={{ color: '#fff', margin: '0 0 10px' }}>Invoice Not Found</h2>
          <p style={{ color: '#aaa' }}>{error}</p>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div style={s.invoice}>

        {/* ── HEADER ── */}
        <div style={s.header}>
          <div>
            <img
              src="https://i.ibb.co/SXJsgrF/logo-white.png"
              alt="San Jose Logo Design"
              style={s.logo}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
          <div style={s.companyDetails}>
            <div style={{ fontWeight: '600', fontSize: '15px', marginBottom: '4px' }}>San Jose Logo Design</div>
            <div>475 S 11th St, San Jose, CA 95112</div>
            <div>
              <a href="mailto:info@sanjoselogodesign.com" style={s.companyLink}>
                info@sanjoselogodesign.com
              </a>
            </div>
            <div>(510) 279-7593</div>
          </div>
        </div>

        {/* ── BILLED TO ── */}
        <div style={s.billedSection}>
          <div style={s.billedLabel}>Billed To</div>
          <div style={s.billedLine}>{info.customer_name}</div>
          {info.email && <div style={s.billedLine}>{info.email}</div>}
          {info.phone && <div style={s.billedLine}>{info.phone}</div>}
          <div style={s.billedLine}>{invoiceNumber}</div>
          <div style={s.methodBadge}>✓ &nbsp;Paid via {methodLabel}</div>
        </div>

        {/* ── TABLE ── */}
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Order #</th>
              <th style={s.th}>Package Description</th>
              <th style={s.thRight}>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={s.td}><span style={s.orderNo}>{info.id}</span></td>
              <td style={s.td}><p style={s.packageName}>{info.package_name || 'Custom Package'}</p></td>
              <td style={s.tdRight}>${Number(info.amount).toFixed(2)}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2} style={s.tfootTd}><strong>Amount Paid</strong></td>
              <td style={s.tfootTotal}>${Number(info.amount).toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>

        {/* ── FOOTER ── */}
        <div style={s.footer}>
          <div>
            <a href="https://sanjoselogodesign.com/privacy-policy" target="_blank" rel="noopener noreferrer" style={s.footerLink}>
              Privacy Policy
            </a>
            <a href="https://sanjoselogodesign.com/terms-condition" target="_blank" rel="noopener noreferrer" style={s.footerLink}>
              Terms &amp; Conditions
            </a>
          </div>
          <button className="no-print" style={s.printBtn} onClick={() => window.print()}>
            🖨 Print Invoice
          </button>
        </div>

      </div>
    </Shell>
  );
}