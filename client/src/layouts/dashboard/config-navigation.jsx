// eslint-disable-next-line import/no-unresolved
import SvgColor from 'src/components/svg-color';

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig1 = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'NGO',
    path: '/ngo',
    icon: icon('ic_user'),
  },
  {
    title: 'approval form',
    path: '/products',
    icon: icon('ic_aform'),
  },
  {
    title: 'renewal',
    path: '/renewalform',
    icon: icon('ic_rform'),
  },
  {
    title: 'volunteer',
    path: '/volunteer',
    icon: icon('ic_blog'),
  },
  {
    title: 'trustee',
    path: '/trustee',
    icon: icon('ic_blog'),
  },
  {
    title: 'AluminiNotification',
    path: '/AluminiNotification',
    icon: icon('ic_blog'),
  },
  {
    title: 'coursefile',
    path: '/coursefile',
    icon: icon('ic_blog'),
  },
  {
    title: 'volunteerapprovalform',
    path: '/volunteerapprovalform',
    icon: icon('ic_blog'),
  },
  {
    title: 'discussion',
    path: '/discussion',
    icon: icon('ic_blog'),
  },
];
const navConfig12 = (role) => {
  switch (role) {
    case 'student':
      return navConfig1.filter(item => ['dashboard', 'approval form', 'renewal','discussion'].includes(item.title));
    case 'volunteer':
      return navConfig1.filter(item => ['dashboard', 'volunteer', 'volunteerapprovalform'].includes(item.title));
    case 'trustee':
      return navConfig1.filter(item => ['dashboard', 'trustee'].includes(item.title));
    case 'alumni':
      return navConfig1.filter(item => ['dashboard', 'AluminiNotification', 'discussion'].includes(item.title));
    case 'NGO':
      return navConfig1.filter(item => ['dashboard', 'NGO'].includes(item.title));
    default:
      return navConfig1.filter(item => item.title === 'dashboard'); // Default to showing only dashboard for unknown roles
  }
};

// Example of retrieving user role from localStorage

const userRole = localStorage.getItem('role'); // Assuming 'userRole' is stored in localStorage

// Example of filtering navConfig based on user role
const navConfig = navConfig12(userRole);

// Log to verify the filtered configuration

export default navConfig;

