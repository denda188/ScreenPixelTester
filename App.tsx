import React, { useState, useEffect, useCallback } from 'react';
import Dashboard from './components/Dashboard';
import TestRunner from './components/TestRunner';

// Custom hook to handle test state and fullscreen transitions
const useTestSession = () => {
  const [isTesting, setIsTesting] = useState(false);

  const startTest = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      }
      setIsTesting(true);
    } catch (err) {
      console.error("Fullscreen error:", err);
      // Allow test to start even if fullscreen fails
      setIsTesting(true);
    }
  }, []);

  const stopTest = useCallback(async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error("Exit fullscreen error:", err);
    } finally {
      setIsTesting(false);
    }
  }, []);

  // Sync state if user exits fullscreen via browser controls (ESC)
  useEffect(() => {
    const handleChange = () => {
      if (!document.fullscreenElement) setIsTesting(false);
    };
    document.addEventListener('fullscreenchange', handleChange);
    return () => document.removeEventListener('fullscreenchange', handleChange);
  }, []);

  return { isTesting, startTest, stopTest };
};

const App: React.FC = () => {
  const { isTesting, startTest, stopTest } = useTestSession();

  return (
    <div className="bg-slate-900 min-h-screen">
      {isTesting ? (
        <TestRunner initialIndex={0} onExit={stopTest} />
      ) : (
        <Dashboard onStart={startTest} />
      )}
    </div>
  );
};

export default App;