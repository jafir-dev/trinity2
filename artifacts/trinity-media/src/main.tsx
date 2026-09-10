import { createRoot } from 'react-dom/client';

import App from './App';

import './index.css';

// Theme is managed by ThemeProvider — no hardcoded dark class

createRoot(document.getElementById('root')!).render(<App />);
