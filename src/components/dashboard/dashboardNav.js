import {
  IconCard,
  IconFile,
  IconGlobe,
  IconPalette,
  IconRefresh,
  IconUser,
} from './icons';

export const DASHBOARD_NAV = [
  { section: 'Main' },
  { to: '/dashboard/payments', label: 'My Payments', icon: IconCard },
  { to: '/dashboard/website-projects', label: 'Website Projects', icon: IconGlobe },
  { to: '/dashboard/logo-projects', label: 'Logo Projects', icon: IconPalette },
  { to: '/dashboard/revisions', label: 'My Revision', icon: IconRefresh },
  { section: 'Briefs' },
  { to: '/dashboard/logo-brief', label: 'Logo Brief', icon: IconFile },
  { to: '/dashboard/website-brief', label: 'Website Brief', icon: IconFile },
  { section: 'Account' },
  { to: '/dashboard/profile', label: 'Update Profile', icon: IconUser },
];

export const PAGE_META = {
  '/dashboard/payments': { title: 'My Payments', subtitle: 'View invoices and payment history' },
  '/dashboard/website-projects': { title: 'Website Projects', subtitle: 'Track website design & development' },
  '/dashboard/logo-projects': { title: 'Logo Projects', subtitle: 'Track logo design progress' },
  '/dashboard/revisions': { title: 'My Revision', subtitle: 'View and track your design revisions' },
  '/dashboard/logo-brief': { title: 'Logo Brief', subtitle: 'Submit or update your logo requirements' },
  '/dashboard/website-brief': { title: 'Website Brief', subtitle: 'Submit or update your website requirements' },
  '/dashboard/profile': { title: 'Update Profile', subtitle: 'Manage your account details' },
};
