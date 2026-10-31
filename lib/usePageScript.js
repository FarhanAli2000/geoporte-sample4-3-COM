'use client';

import { useEffect } from 'react';

// Runs a page's DOM/animation setup once after hydration.
// Internal links are plain <a> tags, so every page is a full load and nothing needs tearing down.
export default function usePageScript(init) {
  useEffect(() => {
    if (window.__gpInit) return; // React strict mode runs effects twice in development
    window.__gpInit = true;
    // A failing animation must not unmount the page the way an uncaught effect error would.
    try {
      init();
    } catch (err) {
      console.error('Page script failed:', err);
    }
  }, [init]);
}

// Window `load` may already have fired by the time React hydrates.
export const onLoad = (fn) => (document.readyState === 'complete' ? fn() : window.addEventListener('load', fn));
