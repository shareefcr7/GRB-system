import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { publicService } from '../../services/api';

const EMOJIS = ['😞', '😕', '😐', '😊', '🤩'];
const LABELS = ['Terrible', 'Bad', 'Okay', 'Great', 'Amazing!'];

const ReviewScanner = () => {
  const { businessId } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const data = await publicService.getBusiness(businessId);
        setBusiness(data);
      } catch (error) {
        console.error('Failed to load business', error);
      } finally {
        setLoading(false);
        setTimeout(() => setShowCard(true), 100);
      }
    };
    fetchBusiness();
  }, [businessId]);

  const activeRating = hoveredRating || rating;

  const handleRatingSubmit = (selectedRating) => {
    setSubmitted(true);
    
    if (selectedRating >= 4) {
      if (business?.googleReviewLink) {
        // Fire API call in background so we don't block the UI
        publicService.submitReview(businessId, { rating: selectedRating }).catch(e => {
          console.error('Failed logging review', e);
        });
        
        // Immediate redirect to prevent mobile browser pop-up blockers
        setTimeout(() => {
          window.location.replace(business.googleReviewLink);
        }, 400); 
      } else {
        setTimeout(() => navigate(`/thank-you`), 400);
      }
    } else {
      setTimeout(() => navigate(`/feedback/${businessId}?rating=${selectedRating}`), 400);
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner}></div>
        <p style={styles.loadingText}>Loading experience...</p>
        <style>{spinnerKeyframes}</style>
      </div>
    );
  }

  if (!business) {
    return (
      <div style={styles.errorContainer}>
        <div style={styles.errorCard}>
          <div style={styles.errorIconWrap}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h2 style={styles.errorTitle}>Invalid QR Code</h2>
          <p style={styles.errorText}>Please scan a valid business QR code to continue.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.pageContainer}>
      {/* Animated background gradient */}
      <div style={styles.bgOverlay}></div>
      <div style={styles.bgGlow}></div>

      <div style={{
        ...styles.card,
        opacity: showCard ? 1 : 0,
        transform: showCard ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
      }}>
        {/* Business Avatar */}
        <div style={styles.avatarRing}>
          <div style={styles.avatar}>
            <span style={styles.avatarLetter}>
              {business.name.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>

        <h1 style={styles.heading}>Rate your visit</h1>
        <p style={styles.subtext}>
          How was your experience at
        </p>
        <p style={styles.businessName}>{business.name}</p>

        {/* Emoji Indicator */}
        <div style={styles.emojiContainer}>
          <span style={{
            ...styles.emoji,
            opacity: activeRating > 0 ? 1 : 0,
            transform: activeRating > 0 ? 'scale(1)' : 'scale(0.5)',
          }}>
            {activeRating > 0 ? EMOJIS[activeRating - 1] : ''}
          </span>
          <span style={{
            ...styles.emojiLabel,
            opacity: activeRating > 0 ? 1 : 0,
          }}>
            {activeRating > 0 ? LABELS[activeRating - 1] : ''}
          </span>
        </div>

        {/* Star Rating */}
        <div style={styles.starRow}>
          {[1, 2, 3, 4, 5].map((star) => {
            const isActive = activeRating >= star;
            return (
              <button
                key={star}
                style={{
                  ...styles.starButton,
                  transform: isActive ? 'scale(1.2)' : 'scale(1)',
                  filter: isActive ? 'drop-shadow(0 0 12px rgba(250, 204, 21, 0.7))' : 'none',
                }}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => {
                  if (submitted) return;
                  setRating(star);
                  if (navigator.vibrate) navigator.vibrate(50);
                  setTimeout(() => handleRatingSubmit(star), 600);
                }}
                disabled={submitted}
              >
                <span style={{
                  ...styles.starIcon,
                  color: isActive ? '#FBBF24' : 'rgba(255,255,255,0.15)',
                }}>
                  ★
                </span>
              </button>
            );
          })}
        </div>

        {/* Tap hint */}
        <p style={styles.tapHint}>
          {submitted ? '✨ Redirecting...' : 'Tap a star to rate'}
        </p>

        {/* Divider */}
        <div style={styles.divider}></div>

        {/* Branding */}
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
  @keyframes glowPulse {
    0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
    50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.1); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-6px); }
  }
`;

const spinnerKeyframes = `
  @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
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
    background: 'linear-gradient(-45deg, #0f0c29, #1a1a3e, #24243e, #0f0c29)',
    backgroundSize: '400% 400%',
    animation: 'bgShift 15s ease infinite',
  },
  bgOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(ellipse at 30% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 60%)',
    zIndex: 0,
  },
  bgGlow: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, transparent 70%)',
    animation: 'glowPulse 4s ease-in-out infinite',
    zIndex: 0,
    pointerEvents: 'none',
  },
  card: {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    maxWidth: '400px',
    background: 'rgba(255, 255, 255, 0.06)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: '28px',
    padding: '40px 32px 32px',
    textAlign: 'center',
    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  avatarRing: {
    width: '90px',
    height: '90px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #6366f1, #a855f7, #6366f1)',
    backgroundSize: '200% 200%',
    animation: 'bgShift 3s ease infinite',
    padding: '3px',
    margin: '0 auto 24px',
    boxShadow: '0 0 30px rgba(99, 102, 241, 0.3)',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    background: '#1a1a3e',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: {
    fontSize: '32px',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #818cf8, #c084fc)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  heading: {
    color: '#ffffff',
    fontSize: '28px',
    fontWeight: '800',
    margin: '0 0 8px',
    letterSpacing: '-0.5px',
    fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
  },
  subtext: {
    color: 'rgba(199, 210, 254, 0.7)',
    fontSize: '14px',
    margin: '0',
    fontFamily: "'Inter', sans-serif",
  },
  businessName: {
    color: '#ffffff',
    fontSize: '22px',
    fontWeight: '700',
    margin: '4px 0 0',
    textShadow: '0 2px 10px rgba(99, 102, 241, 0.3)',
    fontFamily: "'Inter', sans-serif",
  },
  emojiContainer: {
    margin: '24px 0 8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    minHeight: '72px',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: '44px',
    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
    animation: 'float 2.5s ease-in-out infinite',
  },
  emojiLabel: {
    fontSize: '13px',
    fontWeight: '600',
    color: 'rgba(199, 210, 254, 0.8)',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    transition: 'opacity 0.3s ease',
    fontFamily: "'Inter', sans-serif",
  },
  starRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    margin: '8px 0 16px',
  },
  starButton: {
    background: 'none',
    border: 'none',
    padding: '6px',
    cursor: 'pointer',
    transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
    outline: 'none',
    WebkitTapHighlightColor: 'transparent',
  },
  starIcon: {
    fontSize: '42px',
    display: 'block',
    transition: 'color 0.2s ease',
    lineHeight: 1,
  },
  tapHint: {
    fontSize: '12px',
    color: 'rgba(199, 210, 254, 0.45)',
    letterSpacing: '0.5px',
    margin: '0 0 20px',
    fontFamily: "'Inter', sans-serif",
  },
  divider: {
    height: '1px',
    width: '60px',
    margin: '0 auto 16px',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
  },
  branding: {
    fontSize: '11px',
    color: 'rgba(199, 210, 254, 0.35)',
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
  // Loading
  loadingContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(-45deg, #0f0c29, #1a1a3e, #24243e)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
  },
  loadingSpinner: {
    width: '48px',
    height: '48px',
    border: '3px solid rgba(99, 102, 241, 0.2)',
    borderTopColor: '#6366f1',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  loadingText: {
    color: 'rgba(199, 210, 254, 0.5)',
    fontSize: '14px',
    fontFamily: "'Inter', sans-serif",
  },
  // Error
  errorContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(-45deg, #0f0c29, #1a1a3e, #24243e)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  errorCard: {
    background: 'rgba(255, 255, 255, 0.06)',
    backdropFilter: 'blur(24px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '24px',
    padding: '40px 32px',
    textAlign: 'center',
    maxWidth: '360px',
    width: '100%',
    boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
  },
  errorIconWrap: {
    marginBottom: '20px',
  },
  errorTitle: {
    color: '#ffffff',
    fontSize: '20px',
    fontWeight: '700',
    margin: '0 0 8px',
    fontFamily: "'Inter', sans-serif",
  },
  errorText: {
    color: 'rgba(199, 210, 254, 0.6)',
    fontSize: '14px',
    margin: 0,
    fontFamily: "'Inter', sans-serif",
  },
};

export default ReviewScanner;
