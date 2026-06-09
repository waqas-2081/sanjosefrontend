import { useState } from 'react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import ResourceListPage from '../../components/dashboard/ResourceListPage';
import DetailModal, { ModalField, ModalSection } from '../../components/dashboard/DetailModal';
import { useApi } from '../../hooks/useApi';

function fmt(value) {
  if (value === null || value === undefined || value === '') return null;
  if (Array.isArray(value)) return value.length ? value.join(', ') : null;
  return String(value);
}

function LogoProjectModal({ projectId, onClose }) {
  const { data: p, loading, error } = useApi(
    projectId ? `/dashboard/logo-projects/${projectId}` : null,
    { skip: !projectId }
  );

  return (
    <DetailModal
      open={!!projectId}
      onClose={onClose}
      title="Logo Project Details"
      loading={loading}
      error={error}
    >
      {p && (
        <>
          <ModalSection title="Project">
            <ModalField label="Project #"  value={fmt(p.ref)} />
            <ModalField label="Package"    value={fmt(p.package)} />
            <ModalField label="Status"     value={fmt(p.status_label || p.status)} />
            <ModalField label="Started"    value={fmt(p.date)} />
            <ModalField label="Manager"    value={fmt(p.manager)} />
            <ModalField label="Business"   value={fmt(p.business_name)} />
          </ModalSection>

          {(p.business_type || p.tagline || p.target_audience) && (
            <ModalSection title="Brief">
              <ModalField label="Business Type"   value={fmt(p.business_type)} />
              <ModalField label="Tagline"         value={fmt(p.tagline)} fullWidth />
              <ModalField label="Target Audience" value={fmt(p.target_audience)} fullWidth />
            </ModalSection>
          )}

          {(p.logo_style || p.colors || p.fonts) && (
            <ModalSection title="Design Preferences">
              <ModalField label="Logo Style" value={fmt(p.logo_style)} />
              <ModalField label="Colors"     value={fmt(p.colors)} />
              <ModalField label="Fonts"      value={fmt(p.fonts)} />
            </ModalSection>
          )}

          {p.additional_notes && (
            <ModalSection title="Notes">
              <ModalField label="Additional Notes" value={fmt(p.additional_notes)} fullWidth />
            </ModalSection>
          )}
        </>
      )}
    </DetailModal>
  );
}

export default function DashboardLogoProjectsPage() {
  useDocumentTitle('Logo Projects | Client Dashboard');
  const { data, loading, error } = useApi('/dashboard/logo-projects');
  const [selectedId, setSelectedId] = useState(null);

  const items = (data || []).map((p) => ({
    id:      p.id,
    ref:     p.ref,
    title:   p.title || p.business_name || 'Logo Project',
    package: p.package,
    status:  p.status,
    date:    p.date,
  }));

  return (
    <>
      <ResourceListPage
        title="Logo projects"
        searchPlaceholder="Search logo projects…"
        items={items}
        variant="projects"
        newLink="/dashboard/logo-brief"
        newLabel="New brief"
        loading={loading}
        error={error}
        onViewDetail={(row) => setSelectedId(row.id)}
      />
      <LogoProjectModal
        projectId={selectedId}
        onClose={() => setSelectedId(null)}
      />
    </>
  );
}