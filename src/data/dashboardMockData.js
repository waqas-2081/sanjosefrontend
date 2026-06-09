export const DASHBOARD_USER = {
  name: 'Alex Morgan',
  email: 'alex@company.com',
  company: 'Morgan Ventures',
  phone: '+1 (408) 555-0142',
  memberSince: 'Jan 2025',
  avatarInitials: 'AM',
  avatarUrl: null,
};

export const OVERVIEW_STATS = [
  { id: 'payments', label: 'Total paid', value: '$12,480', change: '+8% this month', trend: 'up' },
  { id: 'active', label: 'Active projects', value: '5', change: '2 due this week', trend: 'neutral' },
  { id: 'briefs', label: 'Briefs submitted', value: '8', change: '3 awaiting review', trend: 'neutral' },
  { id: 'completed', label: 'Completed', value: '14', change: '+2 this quarter', trend: 'up' },
];

const payments = [
  { id: 'PAY-2401', title: 'Logo Design — Premium', amount: '$899.00', status: 'paid', date: 'Mar 12, 2026', method: 'Card', progress: 100 },
  { id: 'PAY-2398', title: 'Website Development', amount: '$2,400.00', status: 'paid', date: 'Feb 28, 2026', method: 'Card', progress: 100 },
  { id: 'PAY-2390', title: 'Brand Identity Add-on', amount: '$350.00', status: 'pending', date: 'Mar 18, 2026', method: 'Invoice', progress: 0 },
  { id: 'PAY-2382', title: 'SEO Monthly Retainer', amount: '$499.00', status: 'paid', date: 'Feb 01, 2026', method: 'Card', progress: 100 },
];

const websiteProjects = [
  { id: 'WEB-1024', title: 'Corporate Website Redesign', package: 'Business Pro', status: 'in_progress', date: 'Started Feb 10, 2026', progress: 68, manager: 'Sarah K.' },
  { id: 'WEB-1018', title: 'E-commerce Store', package: 'E-commerce', status: 'review', date: 'Started Jan 05, 2026', progress: 92, manager: 'James L.' },
  { id: 'WEB-1009', title: 'Landing Page — Campaign', package: 'Starter', status: 'completed', date: 'Delivered Dec 20, 2025', progress: 100, manager: 'Sarah K.' },
];

const logoProjects = [
  { id: 'LOGO-881', title: 'Morgan Ventures Logo', package: 'Premium Logo', status: 'in_progress', date: 'Started Mar 01, 2026', progress: 45, manager: 'Elena R.' },
  { id: 'LOGO-875', title: 'Product Line Mark', package: 'Standard', status: 'review', date: 'Started Feb 14, 2026', progress: 85, manager: 'Elena R.' },
  { id: 'LOGO-860', title: 'Event Badge Logo', package: 'Express', status: 'completed', date: 'Delivered Jan 30, 2026', progress: 100, manager: 'Mike T.' },
];

export const RECENT_ACTIVITY = [
  { id: 1, text: 'Website mockups uploaded for review', time: '2 hours ago', type: 'project' },
  { id: 2, text: 'Payment received for Logo Design — Premium', time: 'Yesterday', type: 'payment' },
  { id: 3, text: 'Logo brief #881 updated', time: '2 days ago', type: 'brief' },
  { id: 4, text: 'Profile email updated', time: '1 week ago', type: 'profile' },
];

export function getPayments() {
  return payments;
}

export function getWebsiteProjects() {
  return websiteProjects;
}

export function getLogoProjects() {
  return logoProjects;
}

export const PROJECT_REVISIONS = {
  'WEB-1024': [
    { id: 'REV-W-1024-1', ref: 'Revision 1', title: 'Homepage hero update', status: 'completed', date: 'Feb 18, 2026', notes: 'Updated hero banner and CTA placement.', images: [] },
    { id: 'REV-W-1024-2', ref: 'Revision 2', title: 'Services section layout', status: 'in_progress', date: 'Mar 05, 2026', notes: 'Adjusting grid and icon spacing.', images: [] },
  ],
  'WEB-1018': [
    { id: 'REV-W-1018-1', ref: 'Revision 1', title: 'Product card styling', status: 'review', date: 'Mar 10, 2026', notes: 'Awaiting approval on checkout flow.', images: [] },
  ],
  'WEB-1009': [
    { id: 'REV-W-1009-1', ref: 'Revision 1', title: 'Final copy tweaks', status: 'completed', date: 'Dec 15, 2025', notes: 'Headline and footer links updated.', images: [] },
  ],
  'LOGO-881': [
    { id: 'REV-L-881-1', ref: 'Revision 1', title: 'Icon mark refinement', status: 'in_progress', date: 'Mar 08, 2026', notes: 'Softer corners on the primary mark.', images: [] },
    { id: 'REV-L-881-2', ref: 'Revision 2', title: 'Color palette options', status: 'review', date: 'Mar 14, 2026', notes: 'Two alternate orange tones provided.', images: [] },
  ],
  'LOGO-875': [
    { id: 'REV-L-875-1', ref: 'Revision 1', title: 'Typography pairing', status: 'review', date: 'Feb 22, 2026', notes: 'Sans + serif lockup variations.', images: [] },
  ],
  'LOGO-860': [
    { id: 'REV-L-860-1', ref: 'Revision 1', title: 'Badge proportions', status: 'completed', date: 'Jan 22, 2026', notes: 'Final print-ready files delivered.', images: [] },
  ],
};

export function cloneProjectRevisions() {
  return Object.fromEntries(
    Object.entries(PROJECT_REVISIONS).map(([key, list]) => [key, list.map((item) => ({ ...item, images: [...(item.images || [])] }))])
  );
}

export function getProjectsByType(type) {
  return type === 'website' ? websiteProjects : logoProjects;
}

export function getRevisionsForProject(projectId) {
  return PROJECT_REVISIONS[projectId] || [];
}

export const STATUS_LABELS = {
  paid: 'Paid',
  pending: 'Pending',
  in_progress: 'In progress',
  review: 'In review',
  completed: 'Completed',
  cancelled: 'Cancelled',
};
