import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { publicService } from '../../services/api';

const EMOJIS = ['😞', '😕', '😐', '😊', '🤩'];

const InternalFeedback = () => {
  const { businessId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const rating = Number(searchParams.get('rating') || 3);

  const [business, setBusiness] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const data = await publicService.getBusiness(businessId);
        setBusiness(data);
      } catch (error) {
        console.error('Failed to load business', error);
      }
    };
    fetchBusiness();
    setTimeout(() => setShowCard(true), 100);
  }, [businessId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (phone && !/^\+?[0-9]{10,15}$/.test(phone)) {
      alert('Please enter a valid phone number (10 to 15 digits).');
      return;
    }

    setIsSubmitting(true);

    try {
      await publicService.submitReview(businessId, {
        rating: Number(rating),
        feedback,
        customerName: name || 'Anonymous',
        customerPhone: phone || 'No Phone'
      });
      navigate('/thank-you');
    } catch (err) {
      console.error('Submit review error', err);
      alert('Failed to submit feedback. Try again.');
      setIsSubmitting(false);
    }
  };

  const getInputStyle = (fieldName) => ({
    ...styles.input,
    borderColor: focusedField === fieldName ? 'rgba(99, 102, 241, 0.6)' : 'rgba(255, 255, 255, 0.08)',
    background: focusedField === fieldName ? 'rgba(99, 102, 241, 0.08)' : 'rgba(255, 255, 255, 0.04)',
    boxShadow: focusedField === fieldName ? '0 0 20px rgba(99, 102, 241, 0.15)' : 'none',
  });

  return (
    <div style={styles.pageContainer}>
      <div style={styles.bgOverlay}></div>
      <div style={styles.bgGlow}></div>

      <div style={styles.card}>
        {/* Emoji + Stars */}
        <div style={styles.ratingDisplay}>
          <span style={styles.emojiLarge}>{EMOJIS[rating - 1]}</span>
          <div style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((s) => (
              <span
                key={s}
                style={{
                  ...styles.starDisplay,
                  color: s <= rating ? '#FBBF24' : 'rgba(255,255,255,0.1)',
                  filter: s <= rating ? 'drop-shadow(0 0 6px rgba(250, 204, 21, 0.5))' : 'none',
                }}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <h2 style={styles.heading}>We want to make it right.</h2>
        <p style={styles.subtext}>
          Please tell <strong style={styles.businessNameInline}>{business?.name || 'us'}</strong> how we can improve.
          Your feedback goes directly to the team.
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.fieldGroup}>
            <textarea
              id="feedback"
              name="feedback"
              rows={4}
              required
              style={{
                ...styles.textarea,
                borderColor: focusedField === 'feedback' ? 'rgba(99, 102, 241, 0.6)' : 'rgba(255, 255, 255, 0.08)',
                background: focusedField === 'feedback' ? 'rgba(99, 102, 241, 0.08)' : 'rgba(255, 255, 255, 0.04)',
                boxShadow: focusedField === 'feedback' ? '0 0 20px rgba(99, 102, 241, 0.15)' : 'none',
              }}
              placeholder="What could we have done better?"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              onFocus={() => setFocusedField('feedback')}
              onBlur={() => setFocusedField(null)}
            />
          </div>

          <div style={styles.inputGroup}>
            <div style={styles.inputIcon}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(199,210,254,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <input
              id="name"
              name="name"
              type="text"
              style={getInputStyle('name')}
              placeholder="Your Name (Optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
            />
          </div>

          <div style={styles.inputGroup}>
            <div style={styles.inputIcon}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(199,210,254,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <input
              id="phone"
              name="phone"
              type="tel"
              maxLength={15}
              pattern="^\+?[0-9]{10,15}$"
              title="Please enter a valid phone number (10 to 15 digits)"
              style={getInputStyle('phone')}
              placeholder="Phone Number (Optional)"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/[^0-9+]/g, ''))}
              onFocus={() => setFocusedField('phone')}
              onBlur={() => setFocusedField(null)}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              ...styles.submitButton,
              opacity: isSubmitting ? 0.6 : 1,
              transform: isSubmitting ? 'scale(0.98)' : 'scale(1)',
            }}
          >
            {isSubmitting ? (
              <span style={styles.submitContent}>
                <span style={styles.miniSpinner}></span>
                Sending securely...
              </span>
            ) : (
              <span style={styles.submitContent}>
                Submit Feedback
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}>
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </span>
            )}
          </button>
        </form>

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
  @keyframes glowPulse {
    0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
    50% { opacity: 0.5; transform: translate(-50%, -50%) scale(1.1); }
  }
  @keyframes miniSpin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-4px); }
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
    background: 'linear-gradient(-45deg, #0f0c29, #1a1a3e, #24243e, #0f0c29)',
    backgroundSize: '400% 400%',
    animation: 'bgShift 15s ease infinite',
  },
  bgOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(ellipse at 30% 20%, rgba(99, 102, 241, 0.12) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(236, 72, 153, 0.08) 0%, transparent 60%)',
    zIndex: 0,
  },
  bgGlow: {
    position: 'absolute',
    top: '30%',
    left: '50%',
    width: '350px',
    height: '350px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)',
    animation: 'glowPulse 4s ease-in-out infinite',
    zIndex: 0,
    pointerEvents: 'none',
  },
  card: {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    maxWidth: '420px',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '28px',
    padding: '36px 28px 28px',
    textAlign: 'center',
    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
    transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  ratingDisplay: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '20px',
  },
  emojiLarge: {
    fontSize: '40px',
    animation: 'float 2.5s ease-in-out infinite',
  },
  starsRow: {
    display: 'flex',
    gap: '4px',
  },
  starDisplay: {
    fontSize: '24px',
    transition: 'all 0.2s ease',
    lineHeight: 1,
  },
  heading: {
    color: '#ffffff',
    fontSize: '24px',
    fontWeight: '800',
    margin: '0 0 8px',
    letterSpacing: '-0.3px',
    fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
  },
  subtext: {
    color: 'rgba(199, 210, 254, 0.6)',
    fontSize: '14px',
    margin: '0 0 24px',
    lineHeight: '1.6',
    fontFamily: "'Inter', sans-serif",
  },
  businessNameInline: {
    color: '#c7d2fe',
    fontWeight: '600',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  fieldGroup: {},
  textarea: {
    width: '100%',
    padding: '16px',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    background: 'rgba(255, 255, 255, 0.04)',
    color: '#ffffff',
    fontSize: '14px',
    fontFamily: "'Inter', sans-serif",
    resize: 'vertical',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
    minHeight: '110px',
  },
  inputGroup: {
    position: 'relative',
  },
  inputIcon: {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
    zIndex: 1,
  },
  input: {
    width: '100%',
    padding: '14px 16px 14px 42px',
    borderRadius: '14px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    background: 'rgba(255, 255, 255, 0.04)',
    color: '#ffffff',
    fontSize: '14px',
    fontFamily: "'Inter', sans-serif",
    outline: 'none',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
  },
  submitButton: {
    width: '100%',
    padding: '16px',
    borderRadius: '16px',
    border: 'none',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: '700',
    fontFamily: "'Inter', sans-serif",
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 24px rgba(99, 102, 241, 0.35)',
    marginTop: '4px',
  },
  submitContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniSpinner: {
    width: '16px',
    height: '16px',
    border: '2px solid rgba(255,255,255,0.3)',
    borderTopColor: '#fff',
    borderRadius: '50%',
    animation: 'miniSpin 0.6s linear infinite',
    marginRight: '8px',
    display: 'inline-block',
  },
  divider: {
    height: '1px',
    width: '60px',
    margin: '20px auto 14px',
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

export default InternalFeedback;
