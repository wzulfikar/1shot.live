// @ts-nocheck

import type { SupabaseClient } from '@supabase/supabase-js';
import type { VNode } from 'https://unpkg.com/preact@10.13.1/dist/preact.module.js';
import type { StateUpdater } from 'https://unpkg.com/preact@10.13.1/hooks/dist/hooks.module.js';

declare global {
  // Hooks from Preact
  const useState: <T>(initialState: T | (() => T)) => [T, StateUpdater<T>];
  const useEffect: typeof import('preact/hooks').useEffect;
  const useRef: typeof import('preact/hooks').useRef;
  const useMemo: typeof import('preact/hooks').useMemo;
  // htm bound to h for JSX-like syntax
  const h: typeof import('preact').h;
  const html: (strings: TemplateStringsArray, ...values: any[]) => VNode<any>;
  
  // Supabase client on window
  interface Window {
    supabase: {
      createClient: (url: string, key: string) => SupabaseClient;
    }
    PUBLIC_ENV: {
      supabaseKey: string;
      turnstileSiteKey: string;
    }
  }
}

export { };
