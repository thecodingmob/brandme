'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const INACTIVITY_LIMIT = 10 * 60 * 1000; // 10 minutes in milliseconds

export function useInactivityLogout(isLoggedIn: boolean) {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleLogout = useCallback(async () => {
    // Perform session logout call
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login?reason=inactivity');
    router.refresh();
  }, [router]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (isLoggedIn) {
      timerRef.current = setTimeout(() => {
        handleLogout();
      }, INACTIVITY_LIMIT);
    }
  }, [isLoggedIn, handleLogout]);

  useEffect(() => {
    if (!isLoggedIn) return;

    const activityEvents = [
      'mousemove',
      'mousedown',
      'keydown',
      'touchstart',
      'scroll',
    ];

    const handleUserActivity = () => {
      resetTimer();
    };

    activityEvents.forEach((event) => {
      window.addEventListener(event, handleUserActivity);
    });

    // Start initial timer
    resetTimer();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      activityEvents.forEach((event) => {
        window.removeEventListener(event, handleUserActivity);
      });
    };
  }, [isLoggedIn, resetTimer]);
}