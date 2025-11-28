import React from 'react';
import { PatternType, TestPattern } from './types';

// Grid Pattern Component
const GridPattern = () => (
  <div className="w-full h-full bg-black relative overflow-hidden">
    <div className="absolute inset-0" 
      style={{
        backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px),
                          linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}
    />
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-full h-[1px] bg-red-500 absolute"></div>
      <div className="h-full w-[1px] bg-red-500 absolute"></div>
      <div className="w-64 h-64 border border-red-500 rounded-full"></div>
    </div>
  </div>
);

// Readability Test Component
const ReadabilityPattern = () => (
  <div className="w-full h-full bg-white text-black flex flex-col items-center justify-center p-8 overflow-auto">
    <div className="max-w-4xl space-y-8 text-center">
      <h1 className="text-4xl font-bold mb-4">Text Readability & Sharpness Test</h1>
      
      <div className="space-y-2">
        <p className="text-xs">12px - The quick brown fox jumps over the lazy dog.</p>
        <p className="text-sm">14px - The quick brown fox jumps over the lazy dog.</p>
        <p className="text-base">16px - The quick brown fox jumps over the lazy dog.</p>
        <p className="text-lg">18px - The quick brown fox jumps over the lazy dog.</p>
        <p className="text-xl">20px - The quick brown fox jumps over the lazy dog.</p>
        <p className="text-2xl">24px - The quick brown fox jumps over the lazy dog.</p>
        <p className="text-4xl font-serif">36px Serif - The quick brown fox jumps over the lazy dog.</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-8">
        <div className="p-4 bg-gray-100 border border-gray-300">Gray 100</div>
        <div className="p-4 bg-gray-200 border border-gray-400">Gray 200</div>
        <div className="p-4 bg-gray-800 text-white">Gray 800</div>
        <div className="p-4 bg-black text-white border border-gray-800">Black</div>
      </div>
    </div>
  </div>
);

// Contrast Squares
const ContrastPattern = () => (
  <div className="w-full h-full flex flex-wrap">
    {Array.from({ length: 100 }).map((_, i) => {
      const lightness = i; // 0 to 99
      return (
        <div 
          key={i} 
          style={{ backgroundColor: `hsl(0, 0%, ${lightness}%)`, width: '1%', height: '100%' }} 
          title={`Lightness: ${lightness}%`}
        />
      );
    })}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/50 px-4 py-2 rounded text-white font-mono pointer-events-none">
      Contrast / Gamma Gradient
    </div>
  </div>
);


export const TEST_PATTERNS: TestPattern[] = [
  // Primary Colors (RGB)
  {
    id: 'red',
    name: 'Red',
    type: PatternType.SOLID,
    value: '#FF0000',
    description: 'Check for stuck pixels (appear as cyan, green, or blue dots).',
  },
  {
    id: 'green',
    name: 'Green',
    type: PatternType.SOLID,
    value: '#00FF00',
    description: 'Check for stuck pixels (appear as magenta, red, or blue dots).',
  },
  {
    id: 'blue',
    name: 'Blue',
    type: PatternType.SOLID,
    value: '#0000FF',
    description: 'Check for stuck pixels (appear as yellow, red, or green dots).',
  },
  // Secondary Colors (CMY)
  {
    id: 'yellow',
    name: 'Yellow',
    type: PatternType.SOLID,
    value: '#FFFF00',
    description: 'Combination of Red and Green subpixels.',
  },
  {
    id: 'cyan',
    name: 'Cyan',
    type: PatternType.SOLID,
    value: '#00FFFF',
    description: 'Combination of Green and Blue subpixels.',
  },
  {
    id: 'magenta',
    name: 'Magenta',
    type: PatternType.SOLID,
    value: '#FF00FF',
    description: 'Combination of Red and Blue subpixels.',
  },
  // Luminance
  {
    id: 'white',
    name: 'White',
    type: PatternType.SOLID,
    value: '#FFFFFF',
    description: 'Check for dead pixels (black dots) and color uniformity.',
  },
  {
    id: 'black',
    name: 'Black',
    type: PatternType.SOLID,
    value: '#000000',
    description: 'Check for stuck pixels (bright dots) and backlight bleeding.',
  },
  // Gradients
  {
    id: 'grad-h',
    name: 'Gradient Horizontal',
    type: PatternType.GRADIENT,
    value: 'linear-gradient(to right, black, white)',
    description: 'Smoothness test (Horizontal). Check for banding.',
  },
  {
    id: 'grad-v',
    name: 'Gradient Vertical',
    type: PatternType.GRADIENT,
    value: 'linear-gradient(to bottom, black, white)',
    description: 'Smoothness test (Vertical). Check for banding.',
  },
  // Complex Patterns
  {
    id: 'contrast',
    name: 'Contrast Steps',
    type: PatternType.COMPONENT,
    value: 'component',
    render: () => <ContrastPattern />,
    description: 'Check ability to distinguish dark and light shades.',
  },
  {
    id: 'grid',
    name: 'Alignment Grid',
    type: PatternType.COMPONENT,
    value: 'component',
    render: () => <GridPattern />,
    description: 'Check for screen geometry and distortion.',
  },
  {
    id: 'text',
    name: 'Text Readability',
    type: PatternType.COMPONENT,
    value: 'component',
    render: () => <ReadabilityPattern />,
    description: 'Check text sharpness and clarity.',
  },
];
