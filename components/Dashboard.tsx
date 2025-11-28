import React from 'react';
import { Play, Monitor, AlertCircle, Palette, Type } from 'lucide-react';
import { TEST_PATTERNS } from '../constants';
import { PatternType, TestPattern } from '../types';

interface DashboardProps {
  onStart: () => void;
}

// Sub-component for individual pattern previews to declutter main render
const PatternThumbnail: React.FC<{ pattern: TestPattern }> = ({ pattern }) => (
  <div className="group relative w-8 h-8 sm:w-9 sm:h-9 bg-slate-800/40 rounded-sm border border-white/5 overflow-hidden cursor-help hover:border-emerald-500/50 transition-all hover:scale-110 hover:z-10 hover:bg-slate-800">
    <div className="w-full h-full opacity-50 group-hover:opacity-100 transition-opacity">
      {pattern.type === PatternType.SOLID && (
        <div style={{ backgroundColor: pattern.value }} className="w-full h-full" />
      )}
      {pattern.type === PatternType.GRADIENT && (
        <div style={{ background: pattern.value }} className="w-full h-full" />
      )}
      {pattern.type === PatternType.COMPONENT && (
        <div className="w-full h-full flex items-center justify-center">
          {pattern.id === 'grid' && <div className="w-3 h-3 border border-red-500/50 rounded-[1px]" />}
          {pattern.id === 'text' && <Type size={12} className="text-slate-500 group-hover:text-slate-300" />}
          {pattern.id === 'contrast' && <div className="w-4 h-4 bg-gradient-to-br from-black to-white rounded-[1px]" />}
        </div>
      )}
    </div>
    {/* Tooltip */}
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/90 text-white text-[9px] rounded border border-white/10 opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-20 backdrop-blur-md transition-opacity">
      {pattern.name}
    </div>
  </div>
);

const FeatureItem: React.FC<{ icon: React.ElementType, label: string, colorClass: string }> = ({ icon: Icon, label, colorClass }) => (
  <div className="flex flex-col items-center gap-2">
    <Icon className={`w-6 h-6 ${colorClass}`} />
    <span>{label}</span>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col overflow-hidden">
      
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-12 relative z-10">
        <div className="text-center space-y-4 max-w-4xl animate-fade-in-up">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-emerald-400 to-teal-400 drop-shadow-2xl">
            PixelPerfect
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 font-light max-w-2xl mx-auto">
            Professional Monitor Calibration & Defect Detection
          </p>
        </div>

        {/* Start Button */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-200"></div>
          <button 
            onClick={onStart}
            className="relative flex items-center gap-4 px-16 py-6 bg-slate-900 rounded-full leading-none text-emerald-400 hover:text-white border border-emerald-500/30 hover:bg-emerald-600/10 transition-all duration-200 group-hover:scale-[1.02]"
          >
            <Play className="w-8 h-8 fill-current" />
            <span className="text-2xl font-bold tracking-wide">START TEST</span>
          </button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 pt-8 text-slate-500 text-sm">
          <FeatureItem icon={Monitor} label="Dead Pixel Check" colorClass="text-blue-500" />
          <FeatureItem icon={AlertCircle} label="Backlight Bleed" colorClass="text-amber-500" />
          <FeatureItem icon={Palette} label="Color Accuracy" colorClass="text-purple-500" />
        </div>
      </div>

      {/* Footer / Pattern Sequence */}
      <div className="border-t border-white/5 bg-black/20 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3 mb-2 opacity-40 hover:opacity-100 transition-opacity justify-center">
             <div className="h-px bg-slate-700 w-12"></div>
             <h3 className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                Test Sequence
             </h3>
             <div className="h-px bg-slate-700 w-12"></div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-1.5">
            {TEST_PATTERNS.map((pattern) => (
              <PatternThumbnail key={pattern.id} pattern={pattern} />
            ))}
          </div>
          
          <div className="text-center mt-2 text-[9px] text-slate-700/50">
             Press <strong>ESC</strong> to exit fullscreen
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;