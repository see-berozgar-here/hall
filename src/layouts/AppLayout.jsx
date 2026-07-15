import { Outlet } from 'react-router-dom';
import HeaderShell from '../components/common/HeaderShell.jsx';
import FooterShell from '../components/common/FooterShell.jsx';
import SkipLink from '../components/common/SkipLink.jsx';

export default function AppLayout() {
  return (
    <>
      <SkipLink />
      <HeaderShell />
      <main id="main-content" tabIndex="-1">
        <Outlet />
      </main>
      <FooterShell />
    </>
  );
}
