import React, { useEffect, useState, useCallback, useRef } from 'react';
import { TEST_PATTERNS } from '../constants';
import { PatternType } from '../types';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface TestRunnerProps {
  initialIndex: number;
  onExit: () => void;
}

const TestRunner: React.FC<TestRunnerProps> = ({ initialIndex, onExit }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [showControls, setShowControls] = useState(true);
  const [showInfo, setShowInfo] = useState(true);
  
  const mouseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentPattern = TEST_PATTERNS[currentIndex];

  // Navigation Logic
  const navigate = useCallback((direction: 'next' | 'prev') => {
    setCurrentIndex(prev => {
      const len = TEST_PATTERNS.length;
      return direction === 'next' 
        ? (prev + 1) % len 
        : (prev - 1 + len) % len;
    });
  }, []);

  // UI Interaction Handlers
  const handleUserActivity = useCallback(() => {
    setShowControls(true);
    if (mouseTimerRef.current) clearTimeout(mouseTimerRef.current);
    mouseTimerRef.current = setTimeout(() => setShowControls(false), 2000);
  }, []);

  // Event Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      handleUserActivity();
      switch (e.key) {
        case 'ArrowRight': case ' ': navigate('next'); break;
        case 'ArrowLeft': navigate('prev'); break;
        case 'Escape': onExit(); break;
        case 'i': setShowInfo(prev => !prev); break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (mouseTimerRef.current) clearTimeout(mouseTimerRef.current);
    };
  }, [navigate, onExit, handleUserActivity]);

  // Auto-hide info panel on pattern change
  useEffect(() => {
    setShowInfo(true);
    const timer = setTimeout(() => setShowInfo(false), 3000);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const renderPatternContent = () => {
    const { type, value, render } = currentPattern;
    if (type === PatternType.SOLID) return <div className="w-full h-full transition-colors duration-200" style={{ backgroundColor: value }} />;
    if (type === PatternType.GRADIENT) return <div className="w-full h-full transition-all duration-200" style={{ background: value }} />;
    return render ? render() : null;
  };

  return (
    <div 
      className={`fixed inset-0 z-50 select-none bg-black ${showControls ? 'cursor-default' : 'cursor-none'}`}
      onClick={() => navigate('next')}
      onMouseMove={handleUserActivity}
      onContextMenu={(e) => { e.preventDefault(); navigate('prev'); }}
    >
      {/* Pattern View */}
      <div className="absolute inset-0 z-0">
        {renderPatternContent()}
      </div>

      {/* Info Overlay */}
      <div className={`absolute top-24 left-0 w-full flex justify-center pointer-events-none transition-opacity duration-1000 z-10 ${showInfo ? 'opacity-100' : 'opacity-0'}`}>
        <div 
          className="bg-black/60 backdrop-blur-sm text-white px-8 py-4 rounded-3xl flex flex-col items-center shadow-lg border border-white/10 pointer-events-auto"
          onClick={(e) => e.stopPropagation()} 
        >
          <span className="text-xl font-bold tracking-wide">{currentPattern.name}</span>
          <span className="text-xs text-gray-300 mt-1 mb-3">{currentPattern.description}</span>
          <button onClick={onExit} className="p-2 hover:bg-white/20 rounded-full text-white/70 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Bottom Controls */}
      <div 
        className={`absolute bottom-0 left-0 w-full p-6 flex justify-between items-end transition-transform duration-300 z-20 ${showControls ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="bg-black/50 backdrop-blur text-white/70 px-4 py-2 rounded-lg text-sm border border-white/10">
          {currentIndex + 1} / {TEST_PATTERNS.length}
        </div>

        <div className="flex gap-4 bg-black/50 backdrop-blur p-2 rounded-full border border-white/10 shadow-2xl">
          <button onClick={() => navigate('prev')} className="p-3 hover:bg-white/20 rounded-full text-white transition-colors">
            <ChevronLeft size={24} />
          </button>
          <button onClick={onExit} className="p-3 hover:bg-red-500/80 rounded-full text-white transition-colors">
            <X size={24} />
          </button>
          <button onClick={() => navigate('next')} className="p-3 hover:bg-white/20 rounded-full text-white transition-colors">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestRunner;