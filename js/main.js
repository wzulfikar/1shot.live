// Import Preact and htm
import { h, render } from 'https://unpkg.com/preact@10.13.1/dist/preact.module.js';
import { useState, useEffect } from 'https://unpkg.com/preact@10.13.1/hooks/dist/hooks.module.js';
import htm from 'https://unpkg.com/htm@3.1.1/dist/htm.module.js';

// Import our App component
import { App } from './app.js';

// Make these available globally for our components
window.h = h;
window.useState = useState;
window.useEffect = useEffect;
window.html = htm.bind(h);

// Render the Preact app
render(html`<${App} />`, document.getElementById('games-app')); 
