import React, { useState } from 'react';

// --- Icons ---
const IconMail = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

// --- Logo Letter Config ---
const LOGO_LETTERS = [
  { src: '/logo-d.png', alt: 'D', height: '15%', delay: '0.2s', className: 'logo-d' },
  { src: '/logo-r.png', alt: 'R', height: '16%', delay: '0.1s', className: 'logo-r' },
  { src: '/logo-i.png', alt: 'I', height: '16%', delay: '0.12s', className: 'logo-i' },
  { src: '/logo-v.png', alt: 'V', height: '16.5%', delay: '0.2s', className: 'logo-v' },
  { src: '/logo-e.png', alt: 'E', height: '15%', delay: '0.1s', className: 'logo-e' },
  { src: '/logo-n.png', alt: 'N', height: '18%', delay: '0.1s', className: 'logo-n' },
];

// --- Nav Items ---
const NAV_ITEMS = [
  { id: 'home', label: 'Panic Driven' },
  { id: 'gear', label: 'Gear' },
  { id: 'about', label: 'About Us' },
];

// --- Components ---
const Header = ({ activeTab, onTabChange }) => (
  <header className="main-header">
    <nav className="nav-tabs">
      {NAV_ITEMS.map(({ id, label }) => (
        <button
          key={id}
          className={`nav-btn ${activeTab === id ? 'active' : ''}`}
          onClick={() => onTabChange(id)}
        >
          {label}
        </button>
      ))}
    </nav>
  </header>
);

const Footer = () => (
  <footer className="main-footer">
    <div className="footer-left">
      <p><IconMail size={16} /> address@mail.com</p>
    </div>
    <div className="social-links">
      <a 
        href="https://www.instagram.com/panicdrivenband/" 
        className="social-handle" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        @panicdrivenband
      </a>
    </div>
  </footer>
);

const HomePage = () => (
  <section className="home-section">
    <div className="logo-container">
      <img 
        src="/logo.png" 
        alt="Panic Driven Base" 
        className="logo-base" 
      />
      {LOGO_LETTERS.map(({ src, alt, className }) => (
        <img 
          key={alt}
          src={src} 
          alt={alt} 
          className={`logo-letter ${className}`}
        />
      ))}
    </div>
  </section>
);

const GearPage = () => (
  <section className="section-container">
    <h2 className="section-title">Gear</h2>
    <p>work in progress :P</p>
  </section>
);

const AboutPage = () => (
  <section className="about-section">
    <div className="about-content">
      <h2 className="section-title">About Us</h2>
      <p>lol, lmao even</p>
    </div>
  </section>
);

// --- Main App ---
export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [displayTab, setDisplayTab] = useState("home"); 
  const [transitionClass, setTransitionClass] = useState("");

  const handleTabChange = (newTab) => {
    if (newTab === activeTab) return;

    setActiveTab(newTab);
    setTransitionClass("fade-out");

    setTimeout(() => {
      setDisplayTab(newTab);
      setTransitionClass("fade-in");
      setTimeout(() => setTransitionClass(""), 300);
    }, 300);
  };

  const renderPage = () => {
    switch(displayTab) {
      case 'home': return <HomePage />;
      case 'gear': return <GearPage />;
      case 'about': return <AboutPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="app-container">
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { 
          background-color: #000; 
          color: #fff; 
          font-family: 'Helvetica Neue', Arial, sans-serif; 
          overflow: hidden;
          height: 100%;
          width: 100%;
          position: fixed;
        }

        .app-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          height: 100vh;
          width: 100vw;
          position: fixed;
          top: 0;
          left: 0;
          overflow: hidden;
        }

        /* Header */
        .main-header {
          position: fixed;
          top: 0;
          right: 0;
          padding: 1.5rem 3rem 3rem 2rem;
          z-index: 10000;
          background: linear-gradient(to bottom, rgba(0,0,0,0.8), transparent);
          width: 100%;
          display: flex;
          justify-content: flex-end;
        }

        .nav-tabs {
          display: flex;
          gap: 2rem;
        }

        .nav-btn {
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 4px;
          font-weight: 600;
          cursor: pointer;
          position: relative;
          padding-bottom: 5px;
          transition: color 0.2s;
          -webkit-tap-highlight-color: transparent;
          outline: none;
        }
        
        .nav-btn:focus {
          outline: none;
        }

        .nav-btn:hover, .nav-btn.active {
          color: #fff;
        }

        .nav-btn.active::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: #fff;
          box-shadow: 0 0 10px rgba(255,255,255,0.8);
        }

        /* Content Area */
        .content-area {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        /* Transitions */
        .transition-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 9999;
        }

        .page-transition {
          opacity: 1;
          transition: opacity 0.3s ease-in-out;
        }

        .page-transition.fade-out {
          opacity: 0;
        }

        .page-transition.fade-in {
          opacity: 0;
          animation: fadeInSmooth 0.3s forwards ease-in-out;
        }

        @keyframes fadeInSmooth {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes blurIn {
          to {
            filter: blur(0);
            opacity: 1;
          }
        }

        /* Home Section */
        .home-section {
          width: 100%;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          background: radial-gradient(circle, #1a1a1a 0%, #000000 90%); 
        }

        .logo-container {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          height: 60%;
          max-width: 1400px;
          aspect-ratio: 16 / 9;
          z-index: 50;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: 0.5%;
          padding-bottom: 2%;
        }

        .logo-base {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.05;
          object-fit: contain;
          z-index: 1;
          filter: blur(20px);
          animation: blurIn 1s ease-out forwards;
        }

        .logo-letter {
          width: auto;
          max-width: clamp(180px, 40vw, 420px);
          max-height: clamp(120px, 25vh, 300px);

          bottom: 22%;
          object-fit: contain;
          z-index: 2;
          position: relative;

          filter: blur(20px);
          opacity: 0;
          animation: blurIn 1s ease-out forwards;
        }
          
        @media (max-aspect-ratio: 1/2) {
          .logo-letter {
            max-width: 70vw;
            max-height: 6vh;
            bottom: 34%;
          }
        }

        ${LOGO_LETTERS.map(({ className, height, delay }) => `
          .${className} { 
            height: ${height}; 
            animation-delay: ${delay};
          }
        `).join('\n')}

        /* Section Containers */
        .section-container {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100vh;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .section-title {
          font-size: 3rem;
          margin-bottom: 2rem;
          border-bottom: 1px solid #333;
          padding-bottom: 1rem;
          text-align: center;
        }

        /* About Section */
        .about-section {
          width: 100%;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        /* Desktop/wide screens */
        .about-section {
          background-image: url('/about-desktop.png');
        }


        @media (max-width: 1280px){
          .about-section {
            background-image: url('/about-desktop-squareish.png');
          }
        }


        @media (max-width: 1024px){
          .about-section {
            background-image: url('/about-tablet.png');
          }
        }

        /* Mobile */
        @media (max-width: 768px) {
          .about-section {
            background-image: url('/about-mobile.png');
          }
        }

        @media (max-width: 450px) {
          .about-section {
            background-image: url('/about-mobile-narrow.png');
          }
        }

        @media (max-width: 450px) and (max-height: 690px) {
          .about-section {
            background-image: url('/about-mobile-narrow-small.png');
          }
        }

        /* Ultra-wide screens */
        @media (min-aspect-ratio: 16/9) {
          .about-section {
            background-image: url('/about-ultrawide.png');
          }
        }

        .about-content {
          position: relative;
          z-index: 10;
          text-align: center;
        }

        /* Footer */
        .main-footer {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 1.5rem 3rem;
          background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
          z-index: 10000;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer-left p {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.7);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .social-handle {
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          font-size: 0.9rem;
          letter-spacing: 1px;
          font-weight: 500;
          transition: color 0.2s;
        }

        .social-handle:hover {
          color: #fff;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .main-header {
            padding: 1rem;
            justify-content: center;
          }
          
          .nav-tabs { 
            gap: 0.8rem;
          }
          
          .nav-btn {
            font-size: 0.8rem;
            letter-spacing: 2px;
            white-space: nowrap;
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          .main-footer {
            flex-direction: row;
            gap: 1rem;
            padding: 1rem;
          }
          
          .footer-left p {
            font-size: 0.7rem;
          }
          
          .social-handle {
            font-size: 0.75rem;
          }
          
          .logo-container {
            max-width: 95vw;
          }
        }
      `}</style>

      <Header activeTab={activeTab} onTabChange={handleTabChange} />
      
      <main className="content-area">
        <div className="transition-overlay">
          <div className={`page-transition ${transitionClass}`}>
            {renderPage()}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}