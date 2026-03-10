import React, { useEffect, useState } from 'react';

const ThankYou = () => {
  const [showContent, setShowContent] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setTimeout(() => setShowCheck(true), 300);
    setTimeout(() => setShowContent(true), 600);

    // Progress bar for redirect countdown
    const totalDuration = 5000;
    const interval = 50;
    let elapsed = 0;
    const timer = setInterval(() => {
      elapsed += interval;
      setProgress(Math.min((elapsed / totalDuration) * 100, 100));
      if (elapsed >= totalDuration) {
        clearInterval(timer);
        window.location.href = 'https://google.com';
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={styles.pageContainer}>
      <div style={styles.bgOverlay}></div>

      {/* Floating particles */}
      <div style={styles.particlesContainer}>
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{
            ...styles.particle,
            left: `${15 + i * 15}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${3 + i * 0.5}s`,
          }}></div>
        ))}
      </div>

      <div style={{
        ...styles.card,
        opacity: showContent ? 1 : 0,
        transform: showContent ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
      }}>
        {/* Animated check circle */}
        <div style={{
          ...styles.checkCircle,
          opacity: showCheck ? 1 : 0,
          transform: showCheck ? 'scale(1)' : 'scale(0.5)',
        }}>
          <svg width="48" height="48" viewBox="0 0 48 48" style={{
            opacity: showCheck ? 1 : 0,
            transition: 'opacity 0.4s ease 0.5s',
          }}>
            <path
              d="M14 24 L22 32 L34 16"
              fill="none"
              stroke="#34d399"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: 40,
                strokeDashoffset: showCheck ? 0 : 40,
                transition: 'stroke-dashoffset 0.6s ease 0.4s',
              }}
            />
          </svg>
        </div>

        {/* Success emoji */}
        <div style={{
          ...styles.successEmoji,
          opacity: showContent ? 1 : 0,
          transform: showContent ? 'scale(1)' : 'scale(0)',
        }}>
          🎉
        </div>

        <h2 style={styles.heading}>Thank You!</h2>
        <p style={styles.subtext}>
          Your feedback has been submitted successfully and sent directly to the management team.
        </p>

        <div style={styles.badge}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span>Securely delivered</span>
        </div>

        {/* Progress bar */}
        <div style={styles.progressContainer}>
          <div style={{
            ...styles.progressBar,
            width: `${progress}%`,
          }}></div>
        </div>
        <p style={styles.redirectText}>Redirecting automatically...</p>

        <div style={styles.divider}></div>
        <p style={styles.branding}>Powered by <span style={styles.brandHighlight}>GRB</span></p>
      </div>

      <style>{animationKeyframes}</style>
    </div>
  );
};

const animationKeyframes = `
  @keyframes bgShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px) scale(1); opacity: 0.6; }
    50% { transform: translateY(-20px) scale(1.1); opacity: 1; }
  }
  @keyframes particleRise {
    0% { transform: translateY(100vh) scale(0); opacity: 0; }
    20% { opacity: 0.6; }
    80% { opacity: 0.3; }
    100% { transform: translateY(-20vh) scale(1); opacity: 0; }
  }
  @keyframes checkGlow {
    0%, 100% { box-shadow: 0 0 20px rgba(52, 211, 153, 0.2), 0 0 40px rgba(52, 211, 153, 0.1); }
    50% { box-shadow: 0 0 30px rgba(52, 211, 153, 0.35), 0 0 60px rgba(52, 211, 153, 0.15); }
  }
  @keyframes emojiFloat {
    0%, 100% { transform: scale(1) translateY(0); }
    50% { transform: scale(1.1) translateY(-5px); }
  }
`;

const styles = {
  pageContainer: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    position: 'relative',
    overflow: 'hidden',
    background: 'linear-gradient(-45deg, #0f0c29, #0a1628, #1a1a3e, #0f0c29)',
    backgroundSize: '400% 400%',
    animation: 'bgShift 15s ease infinite',
  },
  bgOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(ellipse at 50% 40%, rgba(52, 211, 153, 0.08) 0%, transparent 60%), radial-gradient(ellipse at 30% 80%, rgba(99, 102, 241, 0.06) 0%, transparent 50%)',
    zIndex: 0,
  },
  particlesContainer: {
    position: 'absolute',
    inset: 0,
    zIndex: 0,
    pointerEvents: 'none',
    overflow: 'hidden',
  },
  particle: {
    position: 'absolute',
    bottom: '-20px',
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: 'rgba(52, 211, 153, 0.4)',
    animation: 'particleRise 5s ease-in-out infinite',
  },
  card: {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    maxWidth: '380px',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '28px',
    padding: '44px 32px 32px',
    textAlign: 'center',
    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
    transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  checkCircle: {
    width: '88px',
    height: '88px',
    borderRadius: '50%',
    background: 'rgba(52, 211, 153, 0.1)',
    border: '2px solid rgba(52, 211, 153, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px',
    animation: 'checkGlow 3s ease-in-out infinite',
    transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
  successEmoji: {
    fontSize: '36px',
    marginBottom: '16px',
    animation: 'emojiFloat 2.5s ease-in-out infinite',
    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.8s',
  },
  heading: {
    color: '#ffffff',
    fontSize: '30px',
    fontWeight: '800',
    margin: '0 0 10px',
    letterSpacing: '-0.5px',
    fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
  },
  subtext: {
    color: 'rgba(199, 210, 254, 0.6)',
    fontSize: '15px',
    margin: '0 0 20px',
    lineHeight: '1.6',
    fontFamily: "'Inter', sans-serif",
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '8px 16px',
    borderRadius: '20px',
    background: 'rgba(52, 211, 153, 0.1)',
    border: '1px solid rgba(52, 211, 153, 0.2)',
    color: 'rgba(52, 211, 153, 0.9)',
    fontSize: '12px',
    fontWeight: '600',
    letterSpacing: '0.5px',
    marginBottom: '24px',
    fontFamily: "'Inter', sans-serif",
  },
  progressContainer: {
    width: '100%',
    height: '3px',
    borderRadius: '10px',
    background: 'rgba(255, 255, 255, 0.06)',
    overflow: 'hidden',
    marginBottom: '10px',
  },
  progressBar: {
    height: '100%',
    borderRadius: '10px',
    background: 'linear-gradient(90deg, #34d399, #6366f1)',
    transition: 'width 0.05s linear',
  },
  redirectText: {
    fontSize: '11px',
    color: 'rgba(199, 210, 254, 0.35)',
    margin: '0 0 20px',
    fontFamily: "'Inter', sans-serif",
  },
  divider: {
    height: '1px',
    width: '60px',
    margin: '0 auto 14px',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)',
  },
  branding: {
    fontSize: '11px',
    color: 'rgba(199, 210, 254, 0.3)',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    fontWeight: '600',
    margin: 0,
    fontFamily: "'Inter', sans-serif",
  },
  brandHighlight: {
    background: 'linear-gradient(135deg, #818cf8, #c084fc)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontWeight: '800',
  },
};

export default ThankYou;
