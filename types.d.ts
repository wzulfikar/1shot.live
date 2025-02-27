// Global type definitions for variables defined in main.js

import type { VNode } from 'https://unpkg.com/preact@10.13.1/dist/preact.module.js';
import type { StateUpdater } from 'https://unpkg.com/preact@10.13.1/hooks/dist/hooks.module.js';

declare global {
  const h: typeof import('preact').h;

  // Hooks from Preact
  const useState: <T>(initialState: T | (() => T)) => [T, StateUpdater<T>];
  const useEffect: typeof import('preact/hooks').useEffect;

  // htm bound to h for JSX-like syntax
  const html: (strings: TemplateStringsArray, ...values: any[]) => VNode<any>;
}

export { };
