import { lazy, Suspense, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppLayout from './layouts/AppLayout.jsx';

const HomePage = lazy(() => import('./pages/HomePage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'));

function PageLoader({ isOverlay = false, isLeaving = false }) {
  return (
    <div
      className={`page-loader ${isOverlay ? 'page-loader-overlay' : ''} ${isLeaving ? 'page-loader-leaving' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading The Grand Royale website"
    >
      <div className="page-loader-mark" aria-hidden="true">GR</div>
      <span>The Grand Royale</span>
      <small>Preparing a luxury experience...</small>
      <div className="page-loader-line" aria-hidden="true" />
    </div>
  );
}

export default function App() {
  const [showInitialLoader, setShowInitialLoader] = useState(true);
  const [isLeavingLoader, setIsLeavingLoader] = useState(false);

  useEffect(() => {
    const leaveTimer = window.setTimeout(() => setIsLeavingLoader(true), 520);
    const removeTimer = window.setTimeout(() => setShowInitialLoader(false), 920);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  return (
    <>
      {showInitialLoader ? <PageLoader isOverlay isLeaving={isLeavingLoader} /> : null}

      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
