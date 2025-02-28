// @ts-nocheck

import {
  h,
  render,
} from "https://unpkg.com/preact@10.13.1/dist/preact.module.js";
import {
  useState,
  useEffect,
  useRef,
  useMemo,
} from "https://unpkg.com/preact@10.13.1/hooks/dist/hooks.module.js";
import htm from "https://unpkg.com/htm@3.1.1/dist/htm.module.js";

// Import our root App component
import { App } from "./components/app.js";

// Make these available globally for our components
window.h = h;
window.useState = useState;
window.useEffect = useEffect;
window.useRef = useRef;
window.useMemo = useMemo;
window.html = htm.bind(h);

window.PUBLIC_ENV = {
  supabaseUrl: "https://rzmykjpcnmriyhnevune.supabase.co",
  supabaseKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6bXlranBjbm1yaXlobmV2dW5lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2OTg2NjEsImV4cCI6MjA1NjI3NDY2MX0.nlS-vjJTRz5ot2eaDkkR6e6pa-gTNXMsg3xiEwCOGJ0",
  turnstileSiteKey: "0x4AAAAAAA-9NQ4RRGfU8-HV",
};

// Render the App component
render(html`<${App} />`, document.getElementById("app-root"));
