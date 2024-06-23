/* eslint-disable import/no-unresolved */
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

// eslint-disable-next-line perfectionist/sort-imports
import Router from 'src/routes/sections';

import ThemeProvider from 'src/theme';

import './global.css';



// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}
