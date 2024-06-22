import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
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
];

export default navConfig;
