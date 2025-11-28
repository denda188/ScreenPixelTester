import { ReactNode } from 'react';

export enum PatternType {
  SOLID = 'SOLID',
  GRADIENT = 'GRADIENT',
  COMPONENT = 'COMPONENT',
}

export interface TestPattern {
  id: string;
  name: string;
  type: PatternType;
  value: string; // Hex code for SOLID, css gradient for GRADIENT, or description for COMPONENT
  render?: () => ReactNode; // Custom component renderer
  description: string;
}

export interface TestState {
  isActive: boolean;
  currentIndex: number;
  isFullscreen: boolean;
}
