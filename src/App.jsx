import React, { useState } from 'react';


// --- Inline SVG Icons ---
const IconMail = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [displayTab, setDisplayTab] = useState("home"); 
  const [transitionClass, setTransitionClass] = useState("");

  const handleTabChange = (newTab) => {
    if (newTab === activeTab) return;

    setActiveTab(newTab);         // Set the target immediately
    setTransitionClass("fade-out");

    setTimeout(() => {
      setDisplayTab(newTab);      // Swap page AFTER fade-out finishes
      setTransitionClass("fade-in");

      setTimeout(() => {
        setTransitionClass("");   // Cleanup
      }, 300);
    }, 300);
  };


  return (
    <div className="app-container">
      <style>{`
        /* Reset & Base */
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background-color: #000; color: #fff; font-family: 'Helvetica Neue', sans-serif; overflow-x: hidden; }

        /* Layout */
        .app-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          position: relative;
        }

        /* Header (Right Aligned) */
        .main-header {
          position: fixed;
          top: 0;
          right: 0;
          padding: 2rem 3rem;
          z-index: 10000;
          background: linear-gradient(to bottom, rgba(0,0,0,0.8), transparent);
          width: 100%;
          display: flex;
          justify-content: flex-end;
        }

        .nav-tabs {
          display: flex;
          gap: 2.5rem;
        }

        .nav-btn {
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 4px;
          font-weight: 600;
          cursor: pointer;
          position: relative;
          padding-bottom: 5px;
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

        /* Main Content */
        .content-area {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        /* Page transition effect */
        .page-transition {
          opacity: 1;
          transition: opacity 0.3s ease-in-out;
          pointer-events: none;
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

        .transition-overlay {
          position: fixed;
          opacity: 1;
          top: 0; left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 9999;
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

        /* Logo Setup */
        .logo-container {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100vw;
          max-width: 1400px;
          aspect-ratio: 16 / 9;
          z-index: 50;
          display: flex;
          align-items: flex-end; /* Bottom alignment */
          justify-content: center; /* Horizontal center */
          gap: 0.5%; /* Space between letters */
          padding-bottom: 2%; /* Adjust to position text line */
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
          
          /* Blur in animation */
          filter: blur(20px);
          animation: blurIn 1s ease-out forwards;
          animation-delay: 0s; /* Starts immediately, or adjust timing */
        }

        @keyframes blurIn {
          to {
            filter: blur(0);
            opacity: 1;
          }
        }

        .logo-letter {
          width: auto;
          margin-bottom: 12%;
          object-fit: contain;
          z-index: 2;
          position: relative;
          
          /* Initial state - blurred and invisible */
          filter: blur(20px);
          opacity: 0;
          
          /* Animation */
          animation: blurIn 1s ease-out forwards;
        }

        /* Stagger each letter's start time */
        .logo-d { 
          height: 15%; 
          animation-delay: 0.2s;
        }
        .logo-r { 
          height: 16%; 
          animation-delay: 0.1s;
        }
        .logo-i { 
          height: 16%; 
          animation-delay: 0.12s;
        }
        .logo-v { 
          height: 16.5%; 
          animation-delay: 0.2s;
        }
        .logo-e { 
          height: 15%; 
          animation-delay: 0.1s;
        }
        .logo-n { 
          height: 18%; 
          animation-delay: 0.1s;
        }

        /* Section Containers */
        .section-container {
          position: fixed;        /* instead of relative */
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);  /* perfect centering */
          width: 100%;
          height: 100vh;
          z-index: 1;           /* sits on top of everything else */
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center; /* vertically center the content */
          pointer-events: none;
        }

        .section-title {
          font-size: 3rem;
          margin-bottom: 2rem;
          border-bottom: 1px solid #333;
          padding-bottom: 1rem;
          text-align: center;
        }

        /* Members Grid */
        .members-grid {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
        }

        .top-row {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 50%;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0;
        }

        .bottom-member {
          position: absolute;
          object-fit: cover;
        }

        .bottom-member.herman {
          width: 50%;
          // height: 50%;
          left: -2vw;
          bottom: 0;
        }

        .bottom-member.feder {
          max-height: 40vh;
          right: 5vw;
          bottom: 0;
        }

        .member-card {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border: none;
        }

        .benji-text {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: 600;
          letter-spacing: 2px;
          color: black;
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
        }

        .social-handle:hover {
          color: #fff;
        }

        @media (max-width: 768px) {
          .main-header {
            padding: 1rem;
            justify-content: center;
            background: rgba(0,0,0,0.8);
          }
          .nav-tabs { gap: 1.5rem; }
          .main-footer {
            flex-direction: column;
            gap: 1rem;
            padding: 1rem;
            position: relative; 
            background: #000;
          }
          .members-grid {
            gap: 0;
          }
        }
      `}</style>

      {/* Header */}
      <header className="main-header">
        <nav className="nav-tabs">
          <button className={`nav-btn ${activeTab === 'home' ? 'active' : ''}`} onClick={() => handleTabChange('home')}>Panic Driven</button>
          <button className={`nav-btn ${activeTab === 'gear' ? 'active' : ''}`} onClick={() => handleTabChange('gear')}>Gear</button>
          <button className={`nav-btn ${activeTab === 'about' ? 'active' : ''}`} onClick={() => handleTabChange('about')}>About Us</button>
        </nav>
      </header>

      <main className="content-area">
        <div className="transition-overlay">
          <div className={`page-transition ${transitionClass}`}>
            {displayTab === 'home' && (
            <section className="home-section">
              <div className="logo-container">
                <img 
                  src="/logo.png" 
                  alt="Panic Driven Base" 
                  className="logo-base" 
                />
                
                <img src="/logo-d.png" alt="D" className="logo-letter logo-d"/>
                <img src="/logo-r.png" alt="R" className="logo-letter logo-r"/>
                <img src="/logo-i.png" alt="I" className="logo-letter logo-i"/>
                <img src="/logo-v.png" alt="V" className="logo-letter logo-v"/>
                <img src="/logo-e.png" alt="E" className="logo-letter logo-e"/>
                <img src="/logo-n.png" alt="N" className="logo-letter logo-n"/>
              </div>
            </section>
          )}

          {displayTab === 'gear' && (
            <section className="section-container">
              <h2 className="section-title">Gear</h2>
              <p>cкиньте фоточки своих инструментов и я поставлю</p>
            </section>
          )}

          {displayTab === 'about' && (
            <section className="section-container">
              <h2 className="section-title">About Us</h2>
              <p>text</p>
              <div className="members-grid">
                <div className="top-row">
                  <div className="member-card benji-text"></div>
                  <img src="/dima.png" alt="Dima" className="member-card"/>
                </div>
                <img src="/herman.png" alt="Herman" className="bottom-member herman"/>
                <img src="/feder.png" alt="Feder" className="bottom-member feder"/>
              </div>
            </section>
          )}
          </div>
        </div>
        
      </main>

      <footer className="main-footer">
        <div className="footer-left">
          <p><IconMail size={16} /> 4len_coc@l.com</p>
        </div>
        <div className="social-links">
          <a href="https://www.instagram.com/panicdrivenband/" className="social-handle" target="_blank" rel="noopener noreferrer">@panicdrivenband</a>
        </div>
      </footer>
    </div>
  );
}