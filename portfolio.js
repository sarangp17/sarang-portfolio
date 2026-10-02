// All personal content lives here. Edit this file to update the site.
export const PROFILE = {
  name: 'Sarang Palsutkar',
  location: 'Nagpur, Maharashtra',
  email: 'sarangpalsutkar@gmail.com',
  github: 'https://github.com/sarangp17',
  linkedin: 'https://in.linkedin.com/in/sarangpalsutkar',
  status: 'Final-year B.Tech Computer Science & Engineering student',
  school: 'VIT Bhopal University',
  years: '2023 – 2027',
  cgpa: '8.16 / 10',
  targets: 'Entry-level jobs & internships in Data / ML / AI',
  availability: 'Also available for short-term work',
};

export const ABOUT = {
  intro:
    "I work at the intersection of data engineering, machine learning and AI. I build the pipelines that move and clean data, train and explain the models that learn from it, and wrap everything in apps people can actually use. I also love vibe coding: using AI assistants to turn an idea into a working, demoable product fast.",
  focus: [
    ['Data engineering', 'ETL pipelines with Airflow, Pandas and SQL, from API to dashboard'],
    ['ML & AI', 'XGBoost + SHAP, PyTorch, and LLM features with Groq and Ollama'],
    ['Data science & analysis', 'feature engineering, modeling, and Power BI reporting'],
    ['Vibe coding', 'shipping full-stack apps (FastAPI + React) quickly with AI tooling'],
  ],
  availability:
    "I'm looking for entry-level jobs and internships, and I'm also available for short-term work: data pipelines, dashboards, ML prototypes, or quick full-stack builds.",
  hobbies:
    "Football is my thing. I play it, and I also build with it: FootballIQ (match prediction) and a sports-stats ETL pipeline both come from that interest. I'm a team-oriented person and happiest when building alongside other people.",
  experience: {
    role: 'Intern — Advanced Software Engineering & AI Foundation',
    org: 'MPOnline Limited (JV of Govt. of Madhya Pradesh and TCS)',
    when: 'May 2026 – Aug 2026',
    points: [
      'Applied software engineering and AI/ML concepts through practical assignments and project work.',
      'Identified, reproduced, and fixed bugs encountered during practical tasks.',
      'Performed data handling, processing, and basic analysis as part of project work.',
    ],
  },
  certs: [
    'Introduction to Machine Learning — NPTEL (Jan–Apr 2025)',
    'Marketing Analytics — NPTEL (Jan–Apr 2026)',
    'Fundamentals of AI and ML — Viyarthi',
    'Python Essentials — Viyarthi',
  ],
};

export const SKILLS = [
  { group: 'Languages', items: ['Python', 'Java', 'C++', 'SQL'] },
  { group: 'Data analysis & visualization', items: ['Pandas', 'NumPy', 'Power BI', 'MS Excel'] },
  { group: 'ML & computer vision', items: ['PyTorch', 'XGBoost', 'scikit-learn', 'SHAP', 'OpenCV', 'MediaPipe'] },
  { group: 'Edge & LLM tooling', items: ['ONNX', 'Edge Impulse', 'Ollama (Llama 3.2)', 'Groq API'] },
  { group: 'Data engineering', items: ['Apache Airflow', 'Docker', 'ETL pipelines'] },
  { group: 'Web & backend', items: ['FastAPI', 'React', 'Tailwind CSS', 'HTML5', 'CSS3'] },
  { group: 'Databases', items: ['MySQL', 'MongoDB', 'SQLite'] },
  { group: 'Tools & platforms', items: ['Git', 'GitHub', 'Docker', 'VS Code', 'Google Colab'] },
];

// category: desktop | web | client | ml | data
export const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'desktop', label: 'Desktop' },
  { id: 'web', label: 'Web apps' },
  { id: 'client', label: 'Client work' },
  { id: 'ml', label: 'Edge AI' },
  { id: 'data', label: 'Data' },
];

export const PROJECTS = [
  {
    id: 'footballiq', name: 'FootballIQ', icon: '⚽', category: 'web', tag: 'Full-stack + ML',
    summary: 'Premier League analytics dashboard with explainable match prediction.',
    points: [
      'FastAPI backend and React/Tailwind frontend with live data from ESPN, Fantasy Premier League, and Sky Sports/BBC feeds: scores, fixtures, team and player analytics, transfer news.',
      'Elo-style team ratings and rolling form features feed an XGBoost classifier predicting home/draw/away, with SHAP explanations on every prediction.',
      'Groq-powered AI Copilot grounded in current Elo ratings, plus a validation suite for endpoints, predictions, and data integrity.',
    ],
    stack: ['Python', 'FastAPI', 'XGBoost', 'SHAP', 'React', 'Groq API'],
    url: 'https://github.com/sarangp17/FootballIQ-Predictive-Analytics-Platform',
  },
 
  {
    id: 'autocall', name: 'AutoCall', icon: '📞', category: 'web', tag: 'SaaS platform',
    summary: 'Two-sided AI call-automation platform, built in about two weeks.',
    points: [
      'AI script generation, a voice call simulator with appointment booking, business and customer portals, and analytics.',
      'Google Calendar and Gmail OAuth integration; Web Speech API for voice; Llama 3.3 70B through Groq.',
    ],
    stack: ['FastAPI', 'React / Vite', 'Groq API', 'Google OAuth', 'Web Speech API'],
  },
  {
    id: 'focusflow', name: 'FocusFlow.exe', icon: '🖥️', category: 'desktop', tag: 'Desktop app',
    summary: 'Fully offline AI-powered productivity tracker for the desktop.',
    points: [
      'Monitors application and browser activity while keeping all processing local, for complete user privacy.',
      'Hybrid classifier: 40+ rule-based app mappings plus a locally run Llama 3.2 model (via Ollama) that labels YouTube activity as productive, non-productive, gaming, or neutral.',
      'React dashboard visualizing productivity trends, session history, and daily usage stats.',
    ],
    stack: ['Python', 'FastAPI', 'React', 'SQLite', 'Ollama'],
    url: 'https://github.com/sarangp17/focusflow',
  },
  {
    id: 'fusionnet', name: 'Crop Disease AI', icon: '🌾', category: 'ml', tag: 'Edge AI · Drones',
    summary: 'Lightweight crop disease classification for drones (FusionNet), running on an STM32N6 microcontroller.',
    points: [
      'Designed and trained FusionNet, a lightweight deep learning model built for resource-constrained drone hardware.',
      'OpenCV preprocessing and augmentation pipeline for robustness across varied field imaging conditions.',
      'Converted to ONNX and deployed on an STM32N6 via Edge Impulse for real-time on-device inference.',
    ],
    stack: ['Python', 'PyTorch', 'OpenCV', 'ONNX', 'Edge Impulse'],
    url: 'https://github.com/sarangp17/LIGHTWEIGHT-CROP-DISEASE-IMAGE-CLASSIFICATION-THROUGH-DRONE',
  },
  {
    id: 'voyage', name: 'Voyage AI', icon: '✈️', category: 'web', tag: 'In progress',
    summary: 'AI-powered travel planning web app, currently under construction.',
    points: ['Being built step by step: auth and foundation first, AI itinerary features next.'],
    stack: ['FastAPI', 'Next.js', 'SQLite / SQLAlchemy', 'Gemini API'],
  },
  {
    id: 'vms', name: 'VMS Finance', icon: '💼', category: 'client', tag: 'Client web build',
    summary: 'Multi-page, offline-capable financial advisory website.',
    points: [
      'Full site navigation, financial calculators, and regulatory disclosures, delivered as a ready-to-host package.',
    ],
    stack: ['HTML5', 'CSS3', 'JavaScript'],
  },
  {
    id: 'gesture', name: 'GestureHCI.exe', icon: '🖐️', category: 'desktop', tag: 'Desktop app',
    summary: 'Real-time hand-tracking interface: control the UI without a mouse or keyboard.',
    points: [
      'Computer-vision based human-computer interaction system using live hand tracking to drive interface controls.',
    ],
    stack: ['Python', 'OpenCV', 'MediaPipe', 'NumPy'],
    url: 'https://github.com/sarangp17/Gesture-Based-HCI-System',
  },
];
