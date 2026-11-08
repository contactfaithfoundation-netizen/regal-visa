import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Immediately remove the native HTML pre-hydration screen as soon as JavaScript bundle executes
const preloaderEl = document.getElementById('initial-loader');
if (preloaderEl) {
  preloaderEl.remove();
}

createRoot(document.getElementById('root')!).render(<App />);
