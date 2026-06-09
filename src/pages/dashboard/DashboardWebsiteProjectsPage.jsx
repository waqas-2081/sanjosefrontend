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

function WebsiteProjectModal({ projectId, onClose }) {
  const { data: p, loading, error } = useApi(
    projectId ? `/dashboard/website-projects/${projectId}` : null,
    { skip: !projectId }
  );

  return (
    <DetailModal
      open={!!projectId}
      onClose={onClose}
      title="Website Project Details"
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
            <ModalField label="Website"    value={fmt(p.current_website)} />
          </ModalSection>

          {(p.business_name || p.business_type || p.target_audience) && (
            <ModalSection title="Business">
              <ModalField label="Business Name"   value={fmt(p.business_name)} />
              <ModalField label="Business Type"   value={fmt(p.business_type)} />
              <ModalField label="Target Audience" value={fmt(p.target_audience)} fullWidth />
            </ModalSection>
          )}

          {(p.overall_feel || p.color_preference || p.addon_features) && (
            <ModalSection title="Design">
              <ModalField label="Overall Feel"   value={fmt(p.overall_feel)} />
              <ModalField label="Color Palette"  value={fmt(p.color_preference)} />
              <ModalField label="Add-ons"        value={fmt(p.addon_features)} fullWidth />
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

export default function DashboardWebsiteProjectsPage() {
  useDocumentTitle('Website Projects | Client Dashboard');
  const { data, loading, error } = useApi('/dashboard/website-projects');
  const [selectedId, setSelectedId] = useState(null);

  const items = (data || []).map((p) => ({
    id:      p.id,
    ref:     p.ref,
    title:   p.title || p.business_name || 'Website Project',
    package: p.package,
    status:  p.status,
    date:    p.date,
  }));

  return (
    <>
      <ResourceListPage
        title="Website projects"
        searchPlaceholder="Search website projects…"
        items={items}
        variant="projects"
        newLink="/dashboard/website-brief"
        newLabel="New brief"
        loading={loading}
        error={error}
        onViewDetail={(row) => setSelectedId(row.id)}
      />
      <WebsiteProjectModal
        projectId={selectedId}
        onClose={() => setSelectedId(null)}
      />
    </>
  );
}