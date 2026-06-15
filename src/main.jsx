import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import "tailwindcss";
// 🌟 استيراد مسجل الخدمة لتفعيل الـ PWA في بيئة الإنتاج
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// تفعيل التسجيل تلقائياً
serviceWorkerRegistration.register();