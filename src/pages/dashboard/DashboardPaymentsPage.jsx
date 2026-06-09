import { useState } from 'react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import ResourceListPage from '../../components/dashboard/ResourceListPage';
import DetailModal, { ModalField, ModalSection } from '../../components/dashboard/DetailModal';
import { useApi } from '../../hooks/useApi';
import { useAuth } from '../../context/AuthContext';

function fmt(value) {
  if (value === null || value === undefined || value === '') return null;
  return String(value);
}

function PaymentDetailModal({ paymentId, onClose }) {
  const { data, loading, error } = useApi(
    paymentId ? `/dashboard/payments/${paymentId}` : null,
    { skip: !paymentId }
  );

  const p = data;
  const invoiceLink = p?.payment_link ? `/genrate/invoice-${p.payment_link}` : null;

  return (
    <DetailModal
      open={!!paymentId}
      onClose={onClose}
      title="Payment Details"
      loading={loading}
      error={error}
    >
      {p && (
        <>
          <ModalSection title="Summary">
            <ModalField label="Invoice #"      value={fmt(p.ref)} />
            <ModalField label="Amount"         value={fmt(p.amount)} />
            <ModalField label="Status"         value={fmt(p.status_label || p.status)} />
            <ModalField label="Payment Method" value={fmt(p.payment_method_label || p.payment_method)} />
            <ModalField label="Date"           value={fmt(p.date)} />
            <ModalField label="Package"        value={fmt(p.package)} fullWidth />
          </ModalSection>

          {(p.customer_name || p.email || p.phone) && (
            <ModalSection title="Contact">
              <ModalField label="Name"  value={fmt(p.customer_name)} />
              <ModalField label="Email" value={fmt(p.email)} />
              <ModalField label="Phone" value={fmt(p.phone)} />
            </ModalSection>
          )}

          {invoiceLink && (
            <div style={{ marginTop: '0.75rem' }}>
              <a
                href={invoiceLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.55rem 1.1rem',
                  background: '#ff5e2c',
                  color: '#fff',
                  borderRadius: '10px',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  textDecoration: 'none',
                }}
              >
                <i className="fa-solid fa-file-invoice" />
                View Invoice
                <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '0.75rem' }} />
              </a>
            </div>
          )}
        </>
      )}
    </DetailModal>
  );
}

export default function DashboardPaymentsPage() {
  useDocumentTitle('My Payments | Client Dashboard');
  const { data, loading, error } = useApi('/dashboard/payments');
  const [selectedId, setSelectedId] = useState(null);

  const items = (data || []).map((p) => ({
    id:     p.id,
    ref:    p.ref,
    title:  p.title || p.package || 'Payment',
    amount: p.amount,
    status: p.status,
    date:   p.date,
  }));

  return (
    <>
      <ResourceListPage
        title="Payment history"
        searchPlaceholder="Search payments…"
        items={items}
        variant="payments"
        loading={loading}
        error={error}
        onViewDetail={(row) => setSelectedId(row.id)}
      />
      <PaymentDetailModal
        paymentId={selectedId}
        onClose={() => setSelectedId(null)}
      />
    </>
  );
}