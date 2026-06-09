import { useCallback, useMemo, useState } from 'react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import ResourceListPage from '../../components/dashboard/ResourceListPage';
import DetailModal, { ModalField, ModalSection } from '../../components/dashboard/DetailModal';
import { IconGlobe, IconPalette } from '../../components/dashboard/icons';
import {
  STATUS_LABELS,
  cloneProjectRevisions,
  getProjectsByType,
} from '../../data/dashboardMockData';
import styles from './DashboardRevisionsPage.module.css';

const MAX_IMAGES = 3;

function formatDate() {
  return new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function buildRevisionTitle(notes) {
  const trimmed = notes.trim();
  if (!trimmed) return 'New revision';
  return trimmed.length > 48 ? `${trimmed.slice(0, 48)}…` : trimmed;
}

function ProjectPicker({ step, projectType, onTypeSelect, onProjectSelect, onBack }) {
  const projects = useMemo(
    () => (projectType ? getProjectsByType(projectType) : []),
    [projectType]
  );

  if (step === 'type') {
    return (
      <>
        <p className={styles.modalIntro}>
          Choose whether this belongs to a website project or a logo project.
        </p>
        <div className={styles.typeGrid}>
          <button type="button" className={styles.typeCard} onClick={() => onTypeSelect('website')}>
            <span className={styles.typeIcon}>
              <IconGlobe />
            </span>
            <span className={styles.typeLabel}>Website Projects</span>
            <span className={styles.typeHint}>Revisions for website work</span>
          </button>
          <button type="button" className={styles.typeCard} onClick={() => onTypeSelect('logo')}>
            <span className={styles.typeIcon}>
              <IconPalette />
            </span>
            <span className={styles.typeLabel}>Logo Projects</span>
            <span className={styles.typeHint}>Revisions for logo designs</span>
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <button type="button" className={styles.backBtn} onClick={onBack}>
        ← Back to project type
      </button>
      <div className={styles.projectList}>
        {projects.map((project) => (
          <button
            key={project.id}
            type="button"
            className={styles.projectOption}
            onClick={() => onProjectSelect(project)}
          >
            <span>
              <span className={styles.projectOptionTitle}>{project.title}</span>
              <span className={styles.projectOptionMeta}>
                {project.id} · {project.package}
              </span>
            </span>
            <span className={styles.projectOptionArrow} aria-hidden="true">
              →
            </span>
          </button>
        ))}
      </div>
    </>
  );
}

function getProjectMap() {
  const all = [...getProjectsByType('website'), ...getProjectsByType('logo')];
  return Object.fromEntries(all.map((project) => [project.id, project]));
}

function inferProjectType(projectId) {
  return String(projectId).startsWith('WEB') ? 'website' : 'logo';
}

function flattenRevisions(revisionsByProject) {
  const projectMap = getProjectMap();

  return Object.entries(revisionsByProject).flatMap(([projectId, list]) => {
    const project = projectMap[projectId];
    const projectType = inferProjectType(projectId);

    return list.map((revision) => ({
      ...revision,
      projectId,
      projectTitle: revision.projectTitle || project?.title || projectId,
      projectType: revision.projectType || projectType,
      projectPackage: revision.projectPackage || project?.package || '',
    }));
  });
}

function AddRevisionModal({ open, onClose, onSubmit }) {
  const [step, setStep] = useState('type');
  const [projectType, setProjectType] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [notes, setNotes] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');

  const clearImages = useCallback((list) => {
    list.forEach((img) => URL.revokeObjectURL(img.url));
  }, []);

  const reset = useCallback(() => {
    setStep('type');
    setProjectType(null);
    setSelectedProject(null);
    setNotes('');
    setImages((prev) => {
      clearImages(prev);
      return [];
    });
    setError('');
  }, [clearImages]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    setStep('form');
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const remaining = MAX_IMAGES - images.length;
    if (remaining <= 0) {
      setError(`You can upload a maximum of ${MAX_IMAGES} images.`);
      e.target.value = '';
      return;
    }

    const nextFiles = files.slice(0, remaining);
    setError(
      files.length > remaining
        ? `Only ${remaining} more image${remaining === 1 ? '' : 's'} can be added.`
        : ''
    );

    const nextImages = nextFiles.map((file) => ({
      id: `${file.name}-${file.lastModified}`,
      name: file.name,
      url: URL.createObjectURL(file),
      file,
    }));

    setImages((prev) => [...prev, ...nextImages]);
    e.target.value = '';
  };

  const removeImage = (id) => {
    setImages((prev) => {
      const target = prev.find((img) => img.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((img) => img.id !== id);
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!notes.trim()) {
      setError('Please enter your revision feedback.');
      return;
    }

    onSubmit({
      project: { ...selectedProject, type: projectType },
      notes: notes.trim(),
      images,
    });
    handleClose();
  };

  const modalTitle =
    step === 'type' ? 'Select project type' : step === 'projects' ? 'Choose a project' : 'Add revision';

  return (
    <DetailModal open={open} onClose={handleClose} title={modalTitle}>
      {step === 'form' ? (
        <form className={styles.revisionForm} onSubmit={handleSubmit} noValidate>
          <div className={styles.selectedProjectBanner}>
            <span className={styles.selectedProjectLabel}>
              {projectType === 'website' ? 'Website Project' : 'Logo Project'}
            </span>
            <strong>{selectedProject?.title}</strong>
            <span>{selectedProject?.id}</span>
          </div>

          <label className={styles.formLabel} htmlFor="revision-notes">
            Revision details
          </label>
          <textarea
            id="revision-notes"
            className={styles.textarea}
            rows={4}
            placeholder="Describe what you would like changed in this revision…"
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
              if (error) setError('');
            }}
          />

          <div className={styles.uploadBlock}>
            <div className={styles.uploadHead}>
              <label className={styles.formLabel} htmlFor="revision-images">
                Attach images
              </label>
              <span className={styles.uploadCount}>
                {images.length}/{MAX_IMAGES}
              </span>
            </div>
            <p className={styles.uploadHint}>You can upload up to 3 images (JPG, PNG, WEBP).</p>

            <label
              className={`${styles.uploadBtn} ${images.length >= MAX_IMAGES ? styles.uploadBtnDisabled : ''}`}
            >
              <input
                id="revision-images"
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                multiple
                disabled={images.length >= MAX_IMAGES}
                onChange={handleImageChange}
              />
              Choose images
            </label>

            {images.length > 0 ? (
              <div className={styles.previewGrid}>
                {images.map((image) => (
                  <div key={image.id} className={styles.previewCard}>
                    <img src={image.url} alt={image.name} className={styles.previewImage} />
                    <button
                      type="button"
                      className={styles.removeImageBtn}
                      onClick={() => removeImage(image.id)}
                      aria-label={`Remove ${image.name}`}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          {error ? <p className={styles.formError}>{error}</p> : null}

          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={() => {
                setStep('projects');
                setSelectedProject(null);
                setNotes('');
                setImages((prev) => {
                  clearImages(prev);
                  return [];
                });
                setError('');
              }}
            >
              Back
            </button>
            <button type="submit" className={styles.submitBtn}>
              Add revision
            </button>
          </div>
        </form>
      ) : (
        <ProjectPicker
          step={step}
          projectType={projectType}
          onTypeSelect={(type) => {
            setProjectType(type);
            setStep('projects');
          }}
          onProjectSelect={handleProjectSelect}
          onBack={() => {
            setStep('type');
            setProjectType(null);
          }}
        />
      )}
    </DetailModal>
  );
}

function RevisionDetailModal({ revision, onClose }) {
  return (
    <DetailModal open={!!revision} onClose={onClose} title="Revision details">
      {revision ? (
        <>
          <ModalSection title="Revision">
            <ModalField label="Revision #" value={revision.ref} />
            <ModalField
              label="Project"
              value={revision.projectTitle}
            />
            <ModalField
              label="Project type"
              value={revision.projectType === 'website' ? 'Website Project' : 'Logo Project'}
            />
            <ModalField label="Status" value={STATUS_LABELS[revision.status] || revision.status} />
            <ModalField label="Submitted" value={revision.date} />
            <ModalField label="Details" value={revision.notes} fullWidth />
          </ModalSection>

          {revision.images?.length ? (
            <ModalSection title="Attached images">
              <div className={styles.detailImages}>
                {revision.images.map((image) => (
                  <a
                    key={image.id || image.url}
                    href={image.url}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.detailImageLink}
                  >
                    <img src={image.url} alt={image.name || 'Revision image'} />
                  </a>
                ))}
              </div>
            </ModalSection>
          ) : null}
        </>
      ) : null}
    </DetailModal>
  );
}

export default function DashboardRevisionsPage() {
  useDocumentTitle('My Revision | Client Dashboard');
  const [revisionsByProject, setRevisionsByProject] = useState(cloneProjectRevisions);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [detailRevision, setDetailRevision] = useState(null);

  const revisions = useMemo(
    () => flattenRevisions(revisionsByProject),
    [revisionsByProject]
  );

  const tableItems = useMemo(
    () =>
      revisions.map((revision) => ({
        id: revision.id,
        ref: revision.ref,
        title: revision.title,
        project: revision.projectTitle,
        projectMeta: `${revision.projectType === 'website' ? 'Website' : 'Logo'} · ${revision.projectId}`,
        package: revision.images?.length ? `${revision.images.length} image(s)` : 'No images',
        status: revision.status,
        date: revision.date,
        _raw: revision,
      })),
    [revisions]
  );

  const handleAddRevision = ({ project, notes, images }) => {
    const existing = revisionsByProject[project.id] || [];
    const nextNumber = existing.length + 1;

    const newRevision = {
      id: `REV-${project.id}-${Date.now()}`,
      ref: `Revision ${nextNumber}`,
      title: buildRevisionTitle(notes),
      status: 'review',
      date: formatDate(),
      notes,
      projectId: project.id,
      projectTitle: project.title,
      projectType: project.type,
      projectPackage: project.package,
      images: images.map((image) => ({
        id: image.id,
        name: image.name,
        url: image.url,
      })),
    };

    setRevisionsByProject((prev) => ({
      ...prev,
      [project.id]: [...existing, newRevision],
    }));
  };

  if (revisions.length === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon} aria-hidden="true">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 12a9 9 0 1 1-2.64-6.36"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
              <path
                d="M21 3v6h-6"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className={styles.emptyTitle}>No project selected</h2>
          <p className={styles.emptyText}>
            Add a revision request by choosing your website or logo project.
          </p>
          <button type="button" className={styles.selectBtn} onClick={() => setAddModalOpen(true)}>
            Add revision
          </button>
        </div>

        <AddRevisionModal
          open={addModalOpen}
          onClose={() => setAddModalOpen(false)}
          onSubmit={handleAddRevision}
        />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <ResourceListPage
        searchPlaceholder="Search revisions…"
        items={tableItems}
        variant="revisions"
        emptyMessage="No revisions yet. Click Add revision to submit your first request."
        onNewClick={() => setAddModalOpen(true)}
        newLabel="Add revision"
        onViewDetail={(row) => setDetailRevision(row._raw)}
      />

      <AddRevisionModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddRevision}
      />

      <RevisionDetailModal
        revision={detailRevision}
        onClose={() => setDetailRevision(null)}
      />
    </div>
  );
}
