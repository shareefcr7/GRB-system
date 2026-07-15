'use client';

import React, { useState, useEffect } from 'react';

const getEmbedUrl = (url) => {
  if (!url) return 'https://www.youtube.com/embed/dQw4w9WgXcQ';
  if (url.includes('/embed/')) return url;
  
  let videoId = '';
  try {
    if (url.includes('/shorts/')) {
      const parts = url.split('/shorts/');
      if (parts[1]) {
        videoId = parts[1].split('?')[0].split('&')[0];
      }
    } else {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      if (match && (match[2].length === 11 || match[2].length === 12)) {
        videoId = match[2];
      } else {
        const urlObj = new URL(url);
        if (urlObj.hostname === 'youtu.be') {
          videoId = urlObj.pathname.substring(1);
        } else if (urlObj.pathname.includes('/watch')) {
          videoId = urlObj.searchParams.get('v');
        } else if (urlObj.pathname.includes('/embed/')) {
          videoId = urlObj.pathname.split('/embed/')[1];
        }
      }
    }
  } catch (error) {
    console.error('Error parsing youtube link:', error);
  }
  
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId.substring(0, 11)}`;
  }
  return url;
};

const QRBrackets = () => (
  <>
    <div className="qr-bracket qr-bracket-tl qr-bracket-animated border-slate-300"></div>
    <div className="qr-bracket qr-bracket-tr qr-bracket-animated border-slate-300"></div>
    <div className="qr-bracket qr-bracket-bl qr-bracket-animated border-slate-300"></div>
    <div className="qr-bracket qr-bracket-br qr-bracket-animated border-slate-300"></div>
  </>
);

const QRPixelGrid = ({ className = '' }) => (
  <svg className={`absolute opacity-[0.03] ${className}`} width="200" height="200" viewBox="0 0 200 200">
    {[0,1,2,3,4,5,6,7].map(r => [0,1,2,3,4,5,6,7].map(c => (
      ((r * 3 + c * 7) % 5 > 1) && <rect key={`${r}-${c}`} x={c*25} y={r*25} width="20" height="20" rx="4" fill="currentColor" className="text-blue-500"/>
    )))}
  </svg>
);

// High-fidelity SVG mockups for icons to look like Lucide icons
const SearchIcon = () => (
  <svg className="w-4 h-4 text-slate-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);

const LockIcon = () => (
  <svg className="w-3.5 h-3.5 text-slate-500 mr-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
);

const UserPlusIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
);

const QrCodeIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect><line x1="7" y1="17" x2="7" y2="17.01"></line><line x1="17" y1="17" x2="17" y2="17.01"></line><line x1="17" y1="7" x2="17" y2="7.01"></line><line x1="7" y1="7" x2="7" y2="7.01"></line></svg>
);

const ScanIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M3 7V5a2 2 0 0 1 2-2h2"></path><path d="M17 3h2a2 2 0 0 1 2 2v2"></path><path d="M21 17v2a2 2 0 0 1-2 2h-2"></path><path d="M7 21H5a2 2 0 0 1-2-2v-2"></path><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
);

const ExternalLinkIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
);

const ArrowRightIcon = () => (
  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
);

const PlayIcon = () => (
  <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
);

const BackgroundQRFlowAnimation = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes floatQR {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(1deg); }
        }
        @keyframes flowLine {
          0% { stroke-dashoffset: 100; opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes laserSweepBg {
          0%, 100% { top: 0%; opacity: 0.1; }
          50% { top: 100%; opacity: 0.7; }
        }
        .animate-float-qr {
          animation: floatQR 6s ease-in-out infinite;
        }
        .animate-laser-bg {
          animation: laserSweepBg 4s ease-in-out infinite;
        }
        .flow-line-1 {
          stroke-dasharray: 20 10;
          animation: flowLine 8s linear infinite;
        }
        .flow-line-2 {
          stroke-dasharray: 15 15;
          animation: flowLine 6s linear infinite;
        }
        .flow-line-3 {
          stroke-dasharray: 30 10;
          animation: flowLine 10s linear infinite;
        }
      `}} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-full relative">
        {/* Left Side: Large Translucent Glowing QR Code */}
        <div className="absolute left-[1%] top-[25%] w-[220px] h-[220px] opacity-75 hidden xl:block animate-float-qr">
          <div className="w-full h-full bg-white rounded-3xl border border-slate-200 p-6 relative shadow-lg">
            <div className="animate-laser-bg absolute left-0 right-0 h-0.5 bg-blue-500 shadow-[0_0_12px_#4285F4]"></div>
            
            {/* Abstract QR grid layout */}
            <div className="w-full h-full flex flex-col justify-between opacity-95">
              {[0, 1, 2, 3, 4, 5].map(r => (
                <div key={r} className="flex justify-between w-full h-[12%]">
                  {[0, 1, 2, 3, 4, 5].map(c => (
                    <div 
                      key={c} 
                      className={`w-[12%] h-full rounded-md ${
                        (r===0 && c===0) || (r===0 && c===5) || (r===5 && c===0) || 
                        (r===1 && c===1) || (r===1 && c===4) || (r===4 && c===1) ||
                        (r===2 && c===2) || (r===3 && c===3) || (((r * 2 + c * 3) % 5) > 1) 
                          ? 'bg-slate-800 font-bold shadow-[0_0_2px_rgba(0,0,0,0.15)]' 
                          : 'bg-slate-100/50'
                      }`}
                    ></div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Google Review Outcome Hub */}
        <div className="absolute right-[1%] top-[30%] w-[250px] opacity-75 hidden xl:block animate-float-qr" style={{ animationDelay: '1.5s' }}>
          <div className="w-full bg-white border border-slate-200 rounded-3xl p-6 relative shadow-lg text-left">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#E8F0FE] text-[#1A73E8] flex items-center justify-center font-bold text-sm">G</div>
              <div>
                <p className="text-xs font-extrabold text-slate-850">Google Rating Boosted</p>
                <p className="text-[10px] text-slate-500">Live 5-Star Reviews</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 w-3/4 bg-slate-200/80 rounded-full"></div>
              <div className="h-3 w-5/6 bg-slate-200/80 rounded-full"></div>
              <div className="flex items-center gap-0.5">
                {[1,2,3,4,5].map(x => (
                  <span key={x} className="text-amber-500 text-xs">★</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Middle: Curved Flow Lines connecting QR code to Google Dashboard */}
        <svg className="absolute inset-0 w-full h-full hidden xl:block opacity-85" viewBox="0 0 1200 800" fill="none">
          {/* Path 1: Top Curve */}
          <path 
            id="flow-path-1" 
            d="M 240 320 C 450 200, 750 200, 960 380" 
            stroke="url(#gradient-blue)" 
            strokeWidth="4" 
            strokeLinecap="round"
            className="flow-line-1"
          />
          {/* Path 2: Middle Curve */}
          <path 
            id="flow-path-2" 
            d="M 240 340 C 450 300, 750 250, 960 400" 
            stroke="url(#gradient-green)" 
            strokeWidth="3" 
            strokeLinecap="round"
            className="flow-line-2"
          />
          {/* Path 3: Bottom Curve */}
          <path 
            id="flow-path-3" 
            d="M 240 360 C 450 400, 750 350, 960 420" 
            stroke="url(#gradient-yellow)" 
            strokeWidth="2" 
            strokeLinecap="round"
            className="flow-line-3"
          />

          {/* Define gradients */}
          <defs>
            <linearGradient id="gradient-blue" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4285F4" />
              <stop offset="100%" stopColor="#34A853" />
            </linearGradient>
            <linearGradient id="gradient-green" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#34A853" />
              <stop offset="100%" stopColor="#FBBC05" />
            </linearGradient>
              <linearGradient id="gradient-yellow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FBBC05" />
              <stop offset="100%" stopColor="#EA4335" />
            </linearGradient>
          </defs>
        </svg>

      </div>
    </div>
  );
};

export default function Home() {
  const [d, setD] = useState("https://mytruefeedback.com");
  
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/embed/dQw4w9WgXcQ');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hostname === "localhost") {
      setD("http://localhost:5173");
    }

    const fetchSettings = async () => {
      try {
        const apiBase = typeof window !== "undefined" && window.location.hostname === "localhost"
          ? "http://localhost:5001/api"
          : "https://grb-system.onrender.com/api";

        const response = await fetch(`${apiBase}/settings`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.watchDemoVideoUrl) {
            setVideoUrl(data.watchDemoVideoUrl);
          }
        }
      } catch (error) {
        console.warn('Could not load dynamic settings, using default video:', error.message);
      }
    };
    fetchSettings();
  }, []);

  const steps = [
    { 
      n: '01', 
      icon: <UserPlusIcon />, 
      title: 'Merchant Sign Up', 
      desc: 'Merchant signs up and sets up their business profile on GRB dashboard', 
      color: 'bg-blue-500', 
      link: `${d}/register`,
      detailTitle: 'Quick 60-Second Setup',
      detailDesc: 'Create your account, customize your branding, and input your Google Review address to immediately generate your marketing assets.',
      cta: 'Register Your Business',
      preview: (
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 text-left font-sans">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase">Merchant Signup</span>
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
          </div>
          <div className="space-y-3">
            <div className="h-9 bg-white border border-slate-200 rounded-lg px-3 flex items-center text-xs text-slate-400 font-medium">Business Name: Malabar Menu</div>
            <div className="h-9 bg-white border border-slate-200 rounded-lg px-3 flex items-center text-xs text-slate-400 font-medium">Admin Email: admin@malabarmenu.com</div>
            <div className="h-9 bg-white border border-slate-200 rounded-lg px-3 flex items-center text-xs text-slate-400 font-medium">Google Review Link: https://search.google...</div>
            <div className="h-9.5 bg-blue-600 rounded-lg flex items-center justify-center text-xs text-white font-bold shadow-sm shadow-blue-500/10">Create Profile →</div>
          </div>
        </div>
      )
    },
    { 
      n: '02', 
      icon: <QrCodeIcon />, 
      title: 'QR Code Generated', 
      desc: 'Branded QR code is automatically generated for store display', 
      color: 'bg-blue-600', 
      link: `${d}/login`,
      detailTitle: 'Automated QR Generation',
      detailDesc: 'Your business profile instantly generates clean, high-resolution QR graphics ready to print for tables, receipts, or store counters.',
      cta: 'View QR Code Panel',
      preview: (
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 text-center font-sans">
          <div className="w-28 h-28 bg-white border border-slate-200 rounded-xl mx-auto flex items-center justify-center relative p-3 shadow-sm mb-3">
            <div className="absolute inset-2 border-2 border-dashed border-blue-200 rounded-lg"></div>
            <svg className="w-16 h-16 text-slate-800" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM14.625 3.75c-.621 0-1.125.504-1.125 1.125v4.5c0 .621.504 1.125 1.125 1.125h4.5c.621 0 1.125-.504 1.125-1.125v-4.5c0-.621-.504-1.125-1.125-1.125h-4.5zM14.625 17.625h1.5m-1.5 1.5h1.5m3-3h1.5m-7.5-1.5h1.5m3-3h1.5m-1.5 1.5h1.5" /></svg>
          </div>
          <span className="text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-full px-3.5 py-1.5 shadow-sm inline-block">Download PDF Flyer</span>
        </div>
      )
    },
    { 
      n: '03', 
      icon: <ScanIcon />, 
      title: 'Customer Scans QR', 
      desc: 'Customers scan the QR code placed at your store location', 
      color: 'bg-emerald-500', 
      link: `${d}/r/demo`,
      detailTitle: 'Frictionless QR Scanning',
      detailDesc: 'Customers open their camera app and point at the QR code. They are instantly directed to your custom mobile rating page in under 2 seconds.',
      cta: 'Try Customer Scan Demo',
      preview: (
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-center font-sans">
          <div className="w-[140px] mx-auto bg-slate-900 rounded-[28px] p-2 shadow-md border-2 border-slate-800">
            <div className="bg-white rounded-[22px] overflow-hidden p-3 text-left">
              <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] mb-1.5">🏢</div>
              <p className="text-[10px] font-extrabold text-slate-800">Rate Malabar Menu</p>
              <div className="flex gap-0.5 my-1.5">{[1,2,3,4,5].map(x => <span key={x} className="text-amber-400 text-xs">★</span>)}</div>
              <div className="h-6 bg-[#4285F4] rounded-lg text-[9px] text-white font-bold flex items-center justify-center">Submit Rating</div>
            </div>
          </div>
        </div>
      )
    },
    { 
      n: '04', 
      icon: <ExternalLinkIcon />, 
      title: 'Google Reviews Redirect', 
      desc: 'High scores automatically redirect happy customers to leave a Google Review', 
      color: 'from-amber-500 to-orange-500', 
      link: `${d}/r/demo`,
      detailTitle: 'Automate 5-Star Reviews',
      detailDesc: 'Happy customers selecting 4 or 5 stars are immediately redirected to your official Google My Business write-a-review page, maximizing your positive rating volume.',
      cta: 'Try Auto-Redirect',
      preview: (
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 text-left font-sans">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center font-bold text-sm">G</div>
            <div>
              <p className="text-xs font-extrabold text-slate-800">Google My Business</p>
              <p className="text-[10px] text-slate-400">Review Submitted</p>
            </div>
          </div>
          <div className="p-3 bg-white border border-slate-100 rounded-xl space-y-1.5">
            <div className="flex gap-0.5">{[1,2,3,4,5].map(x => <span key={x} className="text-amber-400 text-xs">★</span>)}</div>
            <p className="text-[10px] text-slate-600 leading-relaxed font-medium">Amazing service and delicious food! 10/10 highly recommended.</p>
          </div>
        </div>
      )
    },
    { 
      n: '05', 
      icon: <LockIcon />, 
      title: 'Private Feedback Stored', 
      desc: 'Low-score feedback is stored internally and sent directly to management', 
      color: 'bg-red-500', 
      link: `${d}/r/demo`,
      detailTitle: 'Negative Review Intercept',
      detailDesc: 'Dissatisfied customers (1-3 stars) are routed to a private feedback form. This keeps complaints off public Google profiles, giving you a chance to resolve it privately.',
      cta: 'Try Feedback Form',
      preview: (
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-left font-sans">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded">Private Issue</span>
            <span className="text-[9px] text-slate-400 font-semibold">Today</span>
          </div>
          <p className="text-[11px] font-extrabold text-slate-800 mb-1">Customer: Anonymous</p>
          <div className="bg-white border border-slate-100 p-2.5 rounded-lg">
            <p className="text-[9px] text-slate-500 leading-relaxed">"The waiting time was very long and food arrived cold. Disappointed."</p>
          </div>
        </div>
      )
    },
    { 
      n: '06', 
      icon: <UserPlusIcon />, 
      title: 'Merchant Dashboard', 
      desc: 'Monitor reviews, analyze feedback trends, and manage branches', 
      color: 'bg-indigo-600', 
      link: `${d}/login`,
      detailTitle: 'Unified Merchant Dashboard',
      detailDesc: 'Track reviews from all branch locations, analyze rating statistics, check customer feedback details, and manage subscription settings dynamically.',
      cta: 'Open Dashboard Panel',
      preview: (
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 text-left font-sans">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-bold text-slate-700">Analytics Overview</span>
            <span className="text-[10px] text-slate-400 font-semibold">Active Locations: 3</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-3 border border-slate-100 rounded-xl">
              <span className="text-[9px] font-bold text-slate-400 uppercase">Total Scans</span>
              <p className="text-lg font-black text-slate-800">1,245</p>
            </div>
            <div className="bg-white p-3 border border-slate-100 rounded-xl">
              <span className="text-[9px] font-bold text-slate-400 uppercase">Avg Rating</span>
              <p className="text-lg font-black text-slate-800">4.8 ★</p>
            </div>
          </div>
        </div>
      )
    }
  ];
  
  const plans = [
    { name:'Starter', price:'2,500', icon:'🚀', color:'blue', features:['1 Business Location','Up to 100 QR scans/month','Basic review filtering','Email support','QR code generation','Basic analytics'] },
    { name:'Professional', price:'5,000', icon:'⚡', color:'blue', pop:true, features:['Up to 5 locations','1,000 QR scans/month','Advanced analytics','Priority support','Custom QR designs','Auto response templates'] },
    { name:'Enterprise', price:'10,000', icon:'🏢', color:'blue', features:['Unlimited locations','Unlimited QR scans','White-label solution','24/7 phone support','Custom integrations','Dedicated manager'] },
  ];
  
  const stats = [
    { v:'80,000+', l:'Positive Reviews', i:'⭐' },
    { v:'500+', l:'Indian Businesses', i:'🏢' },
    { v:'4.7★', l:'Avg Rating Boost', i:'📈' },
    { v:'99.9%', l:'Uptime', i:'🛡️' },
  ];

  return (
    <div className="min-h-screen mesh-gradient-bg relative">
      {/* Subtle Grid Pattern Overlay */}
      <div className="fixed inset-0 grid-pattern-overlay pointer-events-none z-0"></div>
      
      {/* Floating Circles & Mesh Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[5%] w-[450px] h-[450px] bg-blue-400/3 rounded-full blur-[120px] animate-float"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-green-400/2 rounded-full blur-[140px] animate-float-reverse"></div>
        <div className="absolute top-[60%] left-[20%] w-[350px] h-[350px] bg-yellow-400/2 rounded-full blur-[110px]"></div>
      </div>

      {/* Navbar */}
      <nav className="fixed w-full z-50">
        <div className="absolute inset-0 bg-white/70 backdrop-blur-md border-b border-slate-200/60 shadow-sm"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="flex justify-between items-center h-20">
            <a href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4285F4] to-[#1A73E8] flex items-center justify-center shadow-sm transition-all group-hover:shadow-md">
                <span className="font-extrabold text-white text-lg" style={{fontFamily:'var(--font-plus-jakarta)'}}>G</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-800" style={{fontFamily:'var(--font-plus-jakarta)'}}>GRB</span>
            </a>
            <div className="hidden md:flex items-center gap-1">
              {['Home', 'Workflow', 'Features', 'Pricing', 'Stories'].map(i=>(
                <a key={i} href={`#${i.toLowerCase()}`} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-50 transition-all">{i}</a>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <a href={`${d}/login`} className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all">Sign In</a>
              <a href={`${d}/register`} className="btn-primary-saas px-6 py-3 text-sm font-semibold rounded-xl text-white">Get Started</a>
            </div>
          </div>
        </div>
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section id="home" className="relative pt-36 pb-32 lg:pt-48 lg:pb-36 z-10 overflow-hidden">
        <BackgroundQRFlowAnimation />
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2.5 px-4.5 py-1.5 rounded-full border border-blue-100 bg-[#E8F0FE] mb-10 shadow-sm animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse"></span>
              <span className="text-xs font-bold text-[#1A73E8] uppercase tracking-wider">🔲 Smart QR Technology · Trusted by 500+ Businesses</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.95] mb-8 saas-heading text-slate-800">
              <span>Smart </span>
              <span className="text-gradient-qr">QR Reviews</span>
              <br />
              <span>For </span>
              <span className="text-[#FBBC05] saas-underline">Growth</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up">
              Intelligent QR-based review management that filters negative reviews, directs satisfied customers to Google Reviews, and builds your reputation automatically.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24 animate-fade-in-up">
              <a href={`${d}/register`} className="btn-primary-saas px-8 py-3.5 text-base font-bold rounded-2xl text-white flex items-center justify-center gap-2 shadow-lg">
                Start Free Trial
                <ArrowRightIcon />
              </a>
              <button onClick={() => setIsModalOpen(true)} className="btn-secondary-saas px-8 py-3.5 text-base font-semibold rounded-2xl flex items-center justify-center gap-2">
                <PlayIcon />
                Watch Demo
              </button>
            </div>

            {/* Dashboard Preview with Layered depth and Floating Cards */}
            <div className="relative max-w-5xl mx-auto mt-12">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/8 via-emerald-500/4 to-transparent rounded-[32px] blur-3xl -z-10 scale-95"></div>
              
              {/* Floating Reviews Cards */}
              <div className="absolute -left-12 top-1/4 w-60 premium-card p-4 hidden lg:block animate-float text-left z-20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white font-bold text-xs flex items-center justify-center">A</div>
                  <div>
                    <h5 className="font-bold text-xs text-slate-800">Amit S.</h5>
                    <p className="text-[10px] text-slate-400">Verified Customer</p>
                  </div>
                </div>
                <div className="flex text-amber-400 text-xs mb-1">★★★★★</div>
                <p className="text-xs text-slate-500 italic font-medium">&quot;Amazing experience! Super clean setup.&quot;</p>
              </div>

              <div className="absolute -right-12 top-1/2 w-64 premium-card p-4 hidden lg:block animate-float-reverse text-left z-20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-white font-bold text-xs flex items-center justify-center">S</div>
                  <div>
                    <h5 className="font-bold text-xs text-slate-800">Sneha M.</h5>
                    <p className="text-[10px] text-slate-400">Salon Owner</p>
                  </div>
                </div>
                <div className="flex text-amber-400 text-xs mb-1">★★★★★</div>
                <p className="text-xs text-slate-500 italic font-medium">&quot;Very convenient QR scan. Got 50+ reviews in 2 weeks!&quot;</p>
              </div>

              <div className="relative">
                <QRBrackets />
                <div className="rounded-[28px] overflow-hidden border border-slate-200/80 bg-white shadow-2xl relative">
                  <div className="qr-scan-line"></div>
                  
                  {/* Mock Browser Header */}
                  <div className="flex items-center gap-2 px-6 py-4 bg-slate-50 border-b border-slate-200/60">
                    <div className="flex gap-2">
                      <div className="w-3.5 h-3.5 rounded-full bg-[#EA4335]/90"></div>
                      <div className="w-3.5 h-3.5 rounded-full bg-[#FBBC05]/90"></div>
                      <div className="w-3.5 h-3.5 rounded-full bg-[#34A853]/90"></div>
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="h-7.5 rounded-xl bg-white border border-slate-200/60 flex items-center px-4 max-w-md mx-auto">
                        <SearchIcon />
                        <span className="text-xs text-slate-500">dashboard.grbsoftware.in</span>
                      </div>
                    </div>
                  </div>

                  {/* Mock Dashboard Layout */}
                  <div className="flex min-h-[420px] text-left">
                    <div className="w-60 bg-slate-50 border-r border-slate-200/60 p-6 hidden sm:flex flex-col">
                      <div className="flex items-center gap-2.5 mb-8">
                        <div className="w-8 h-8 rounded-lg bg-[#4285F4] flex items-center justify-center"><span className="text-xs font-black text-white">G</span></div>
                        <span className="font-extrabold text-sm text-slate-800">GRB Dashboard</span>
                      </div>
                      <div className="space-y-1.5 flex-1">
                        {[['📊','Overview',true],['⭐','Reviews'],['🔲','QR Codes'],['📈','Analytics']].map(([ic,lb,act],i)=>(
                          <div key={i} className={`flex items-center gap-3 px-3 py-3 text-sm rounded-xl transition-all ${act?'bg-[#E8F0FE] text-[#1A73E8] font-bold shadow-sm border border-blue-100':'text-slate-500 hover:text-slate-900 hover:bg-slate-200/40'}`}>
                            <span>{ic}</span> {lb}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Mock Dashboard Content */}
                    <div className="flex-1 p-8 bg-white">
                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Welcome back</p>
                          <p className="text-base font-bold text-slate-800">Rajesh Kumar</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4285F4] to-[#34A853] flex items-center justify-center text-sm font-extrabold text-white shadow-sm">R</div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {[['Total Reviews','847','↑ 12%','text-[#34A853]'],['Google Rating','4.7★','↑ 0.3','text-[#FBBC05]'],['Filtered','156','Caught','text-[#4285F4]']].map(([l,v,s,c],i)=>(
                          <div key={i} className="rounded-2xl bg-slate-50/60 border border-slate-200/60 p-5">
                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1.5">{l}</p>
                            <p className={`text-3xl font-extrabold text-slate-800`}>{v}</p>
                            <p className={`text-xs ${c} font-bold mt-1.5 flex items-center`}>{s}</p>
                          </div>
                        ))}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-2xl bg-slate-50/60 border border-slate-200/60 p-5">
                          <p className="text-xs font-bold text-slate-800 mb-4">Review Trend</p>
                          <div className="flex items-end gap-2 h-20">
                            {[35,45,32,55,48,62,58,70,65,80,75,90].map((h,i)=>(
                              <div key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-[#4285F4] to-[#34A853] opacity-80 hover:opacity-100 transition-opacity" style={{height:`${h}%`}}></div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="rounded-2xl bg-slate-50/60 border border-slate-200/60 p-5">
                          <p className="text-xs font-bold text-slate-800 mb-4">QR Scan Activity</p>
                          <div className="space-y-3">
                            {[['Today',85],['This Week',65],['This Month',45]].map(([l,w],i)=>(
                              <div key={i} className="flex items-center gap-3">
                                <span className="text-xs text-slate-500 w-16">{l}</span>
                                <div className="flex-1 bg-slate-200 rounded-full h-2.5">
                                  <div className="bg-[#4285F4] h-2.5 rounded-full transition-all duration-500" style={{width:`${w}%`}}></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Scrolling Logo Cloud (Social Proof) */}
      <section className="py-20 border-t border-b border-slate-200/60 relative z-10 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs font-bold text-slate-550 uppercase tracking-[0.25em] mb-12">Trusted by leading Indian businesses</p>
          <div className="relative flex overflow-x-hidden">
            <div className="animate-marquee flex gap-16 md:gap-24 items-center">
              {['Taj Hotels','Zomato','Swiggy','OYO','MakeMyTrip','Taj Hotels','Zomato','Swiggy','OYO','MakeMyTrip'].map((n, i)=>(
                <span key={`${n}-${i}`} className="text-2xl font-black tracking-wider text-slate-500 hover:text-slate-900 transition-colors" style={{fontFamily:'var(--font-plus-jakarta)'}}>{n}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== WORKFLOW SECTION (TIMELINE) ===== */}
      <section id="workflow" className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-slate-200 bg-white mb-6 shadow-sm">
              <span className="text-xs font-bold text-[#4285F4] uppercase tracking-wider">How it Works</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 saas-heading text-slate-800">
              <span>GRB </span><span className="text-gradient-qr saas-underline">Workflow</span>
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-slate-500 leading-relaxed">A clear, step-by-step process illustrating how the GRB system operates for merchants and customers. From sign-up to reputation growth — all automated.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Timeline Column */}
            <div className="relative pl-8 md:pl-12 border-l border-slate-200 space-y-6">
              {steps.map((s,i)=>(
                <div key={i} className="relative text-left">
                  {/* Timeline node */}
                  <div className={`absolute -left-[45px] md:-left-[61px] top-5 w-8 h-8 rounded-full bg-white border shadow-sm flex items-center justify-center z-10 transition-all duration-300 ${activeStep === i ? 'border-[#4285F4] scale-110 shadow-md' : 'border-slate-200'}`}>
                    <div className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${activeStep === i ? 'bg-[#4285F4]' : 'bg-slate-300'}`}></div>
                  </div>
                  
                  {/* Clickable Card */}
                  <button 
                    onClick={() => setActiveStep(i)}
                    onMouseEnter={() => setActiveStep(i)}
                    aria-label={`Show details for ${s.title}`}
                    className={`w-full premium-card p-6 relative group block text-left transition-all duration-300 border ${activeStep === i ? 'border-[#4285F4] shadow-md bg-white' : 'border-slate-200/60 hover:border-slate-300 bg-white/50'}`}
                  >
                    <QRBrackets />
                    <div className="flex items-start gap-5">
                      <div className={`w-12 h-12 rounded-xl border text-slate-700 flex items-center justify-center text-xl flex-shrink-0 shadow-sm transition-transform duration-300 ${activeStep === i ? 'bg-blue-50 border-blue-200 scale-105' : 'bg-slate-50 border-slate-200/60'}`}>
                        {s.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1.5">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{s.n}</span>
                          <h3 className="font-extrabold text-slate-800 text-lg" style={{fontFamily:'var(--font-plus-jakarta)'}}>{s.title}</h3>
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  </button>

                  {/* Mobile Accordion Details Panel */}
                  <div className={`lg:hidden transition-all duration-300 overflow-hidden ${activeStep === i ? 'max-h-[600px] mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-5 space-y-4 shadow-inner">
                      <h4 className="font-extrabold text-slate-800 text-base" style={{fontFamily:'var(--font-plus-jakarta)'}}>{s.detailTitle}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{s.detailDesc}</p>
                      <div className="py-2 flex justify-center">{s.preview}</div>
                      <a href={s.link} className="btn-primary-saas w-full py-3.5 text-xs font-bold text-center block rounded-xl text-white">
                        {s.cta} &rarr;
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Side Detail Panel */}
            <div className="hidden lg:block lg:sticky lg:top-36 text-left h-fit">
              <div className="premium-card p-8 border border-slate-200/60 bg-white relative shadow-lg">
                <QRBrackets />
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-slate-200 bg-white mb-6 shadow-sm">
                  <span className="text-xs font-bold text-[#4285F4] uppercase tracking-wider">Step Preview</span>
                </div>
                
                <h3 className="text-2xl font-extrabold leading-tight mb-4 text-slate-800 transition-all duration-300" style={{fontFamily:'var(--font-plus-jakarta)'}}>
                  {steps[activeStep].detailTitle}
                </h3>
                <p className="text-sm text-slate-500 mb-8 leading-relaxed transition-all duration-300">
                  {steps[activeStep].detailDesc}
                </p>

                {/* Live Preview Mockup container */}
                <div className="border border-slate-100 rounded-2xl bg-white p-4 shadow-inner mb-8 transition-all duration-300 flex justify-center">
                  <div className="w-full max-w-[280px]">
                    {steps[activeStep].preview}
                  </div>
                </div>

                <a 
                  href={steps[activeStep].link} 
                  className="btn-primary-saas w-full py-4 text-sm font-bold text-center block rounded-xl text-white transition-all shadow-md shadow-blue-500/10 hover:shadow-blue-500/20"
                >
                  {steps[activeStep].cta} &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS & FEATURES BENTO GRID ===== */}
      <section id="features" className="py-32 relative z-10 bg-white border-t border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Bento Cards (Top) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
            {stats.map((s,i)=>(
              <div key={i} className="premium-card p-8 text-center group relative"><QRBrackets />
                <span className="text-3xl mb-4 block group-hover:scale-125 transition-transform">{s.i}</span>
                <p className="text-4xl font-extrabold text-slate-800 mb-1.5" style={{fontFamily:'var(--font-plus-jakarta)'}}>{s.v}</p>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{s.l}</p>
              </div>
            ))}
          </div>

          {/* Bento Content Layout (Bottom) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center text-left">
            <div>
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-slate-200 bg-slate-50 mb-6 shadow-sm">
                <span className="text-xs font-bold text-[#4285F4] uppercase tracking-wider">Why GRB</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 saas-heading text-slate-800">
                <span>Intelligent QR filtering for </span><span className="text-gradient-qr saas-underline">modern businesses</span>
              </h2>
              <p className="text-lg text-slate-500 mb-10 leading-relaxed">GRB Software helps businesses automatically direct satisfied customers to Google Reviews while handling concerns privately.</p>
              <div className="space-y-5">
                {['Filter negative reviews before they go public','AI-powered sentiment analysis','Real-time dashboard & analytics','Custom branded QR codes'].map((f,i)=>(
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#E8F0FE] text-[#4285F4] flex items-center justify-center flex-shrink-0">
                      <CheckIcon />
                    </div>
                    <span className="text-slate-700 font-semibold text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ultra-realistic Phone Mockup */}
            <div className="flex justify-center">
              <div className="relative animate-float">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/6 to-[#34A853]/6 rounded-[48px] blur-3xl scale-95"></div>
                
                {/* Phone Frame */}
                <div className="w-[290px] bg-slate-900 rounded-[48px] p-3 shadow-2xl border-4 border-slate-800 relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6.5 bg-slate-900 rounded-b-2xl z-20"></div>
                  
                  {/* Phone Screen */}
                  <div className="w-full bg-[#FFFFFF] rounded-[38px] overflow-hidden relative border border-slate-200">
                    <div className="qr-scan-line"></div>
                    <div className="bg-[#4285F4] p-6 pt-10 text-left">
                      <p className="text-[10px] text-blue-100 uppercase tracking-widest font-bold mb-1">🔲 Scan & Rate</p>
                      <div className="flex items-center gap-1 mb-3">{[1,2,3,4,5].map(s=><span key={s} className="text-[#FBBC05] text-xl">★</span>)}</div>
                      <p className="text-white font-extrabold text-lg leading-snug">How was your experience?</p>
                    </div>
                    <div className="p-5 space-y-4 text-left">
                      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Your Feedback</p>
                        <p className="text-xs text-slate-700 font-medium leading-relaxed">Amazing food and service! Will visit again...</p>
                      </div>
                      <button className="w-full bg-[#4285F4] hover:bg-[#1A73E8] text-white rounded-xl py-3.5 text-xs font-bold transition-all shadow-md shadow-blue-500/10">Submit Review →</button>
                      <p className="text-[10px] text-slate-400 text-center font-semibold">Powered by GRB Software</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRICING SECTION ===== */}
      <section id="pricing" className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-slate-200 bg-white mb-6 shadow-sm"><span className="text-xs font-bold text-[#4285F4] uppercase tracking-wider">Pricing Plans</span></div>
            <h2 className="text-4xl md:text-6xl font-extrabold mb-4 saas-heading text-slate-800"><span>Pick your </span><span className="text-gradient-qr saas-underline">perfect plan</span></h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">Boost your Google Reviews with smart QR filtering technology.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((p,i)=>(
              <div key={i} className={`rounded-[28px] p-8.5 flex flex-col relative text-left bg-white border ${p.pop?'border-[#4285F4] shadow-md shadow-[#4285F4]/5':'border-slate-200 shadow-sm'}`}>
                {p.pop&&<div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-1 rounded-full bg-[#4285F4] text-xs font-bold text-white shadow-sm">Most Popular</div>}
                <QRBrackets />
                <div className="flex items-center gap-3.5 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[#E8F0FE] border border-blue-100 flex items-center justify-center"><span className="text-[#4285F4] font-bold">{p.icon}</span></div>
                  <span className="font-extrabold text-slate-800 text-base" style={{fontFamily:'var(--font-plus-jakarta)'}}>{p.name}</span>
                </div>
                <p className="text-sm text-slate-500 mb-6">{p.pop?'Ideal for growing businesses':'Perfect for '+p.name.toLowerCase()+' needs'}</p>
                <div className="mb-6"><span className="text-5xl font-black text-slate-800" style={{fontFamily:'var(--font-plus-jakarta)'}}>₹{p.price}</span><span className="text-[#4B5563] text-sm"> /month</span></div>
                <div className="h-px bg-slate-200/60 mb-6"></div>
                <ul className="space-y-3.5 mb-8 flex-1">
                  {p.features.map((f,j)=>(
                    <li key={j} className="flex items-center gap-3.5 text-sm text-slate-500">
                      <div className="text-[#34A853] flex-shrink-0"><CheckIcon /></div>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href={`${d}/register`} className={`w-full block py-4 text-center font-bold rounded-2xl transition-all ${p.pop?'btn-qr text-white':'border border-slate-200 text-[#4285F4] hover:bg-[#FAFBFC] hover:border-slate-300'}`}>Choose Plan</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SUCCESS STORIES (TESTIMONIALS) ===== */}
      <section id="stories" className="py-32 relative z-10 bg-[#FAFBFC] border-t border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-slate-200 bg-white mb-6 shadow-sm"><span className="text-xs font-bold text-[#34A853] uppercase tracking-wider">Success Stories</span></div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 saas-heading text-slate-800"><span>Real results from </span><span className="text-gradient-qr saas-underline">real businesses</span></h2>
          </div>
          <div className="premium-card rounded-[28px] overflow-hidden relative border border-slate-200 bg-white text-left"><QRBrackets />
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-10 lg:p-14 flex items-center justify-center bg-[#FAFBFC]">
                <div className="text-center">
                  <div className="w-28 h-28 mx-auto bg-gradient-to-br from-[#4285F4] via-[#34A853] to-[#FBBC05] rounded-full flex items-center justify-center text-white text-4xl font-extrabold shadow-lg mb-6">RK</div>
                  <p className="text-xl font-bold text-slate-850">Rajesh Kumar</p>
                  <p className="text-sm text-slate-500">Restaurant Owner, Mumbai</p>
                  <div className="flex items-center justify-center gap-1 mt-3">{[1,2,3,4,5].map(s=><span key={s} className="text-[#FBBC05] text-lg">★</span>)}</div>
                </div>
              </div>
              <div className="p-10 lg:p-14 flex flex-col justify-center">
                <div className="flex items-center gap-2.5 mb-5">
                  <span className="px-3.5 py-1 rounded-full border border-blue-100 bg-[#E8F0FE] text-[#1A73E8] text-xs font-bold">Professional Plan</span>
                  <span className="px-3.5 py-1 rounded-full border border-green-100 bg-[#E6F4EA] text-[#137333] text-xs font-bold">Verified</span>
                </div>
                <div className="text-xl text-[#111827] leading-relaxed mb-8 italic">&quot;GRB&apos;s QR system transformed our reviews. Our Google rating went from <span className="text-[#34A853] font-black not-italic">3.2 to 4.7 stars</span> in just 3 months. The smart QR filtering ensures only happy customers leave public reviews.&quot;</div>
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">{['bg-[#4285F4]','bg-[#34A853]','bg-[#FBBC05]'].map((c,i)=>(<div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-white flex items-center justify-center text-[10px] font-bold text-white`}>{['R','S','P'][i]}</div>))}</div>
                  <span className="text-xs text-[#4B5563] font-medium">+497 businesses growing with GRB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-32 relative z-10">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="relative animate-float">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/6 to-emerald-500/6 rounded-3xl blur-3xl"></div>
            <div className="premium-card rounded-[28px] p-12 md:p-20 relative border border-slate-200 bg-white"><QRBrackets />
              <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight saas-heading text-slate-800"><span>Ready to boost your </span><span className="text-gradient-qr saas-underline">Google Reviews</span><span>?</span></h2>
              <p className="text-lg text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">Scan. Filter. Grow. Take control of your online reputation with GRB&apos;s smart QR system.</p>
              <a href={`${d}/register`} className="btn-primary-saas inline-flex px-12 py-5 text-lg font-bold text-white items-center gap-3">
                Get Started Today 
                <ArrowRightIcon />
              </a>
              <p className="text-xs text-slate-400 mt-6 font-semibold">14-day free trial · No credit card required</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DARK PREMIUM FOOTER ===== */}
      <footer className="relative z-10 border-t border-slate-800 pt-20 pb-8 bg-[#0B0F19] text-slate-400">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 text-left">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#4285F4] flex items-center justify-center"><span className="font-extrabold text-white text-lg" style={{fontFamily:'var(--font-plus-jakarta)'}}>G</span></div>
                <span className="font-extrabold text-xl text-white" style={{fontFamily:'var(--font-plus-jakarta)'}}>GRB Software</span>
              </div>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed">Smart QR-based review management for modern Indian businesses.</p>
              <div className="flex items-center gap-3">
                {['X','in','ig'].map((ic,i)=>(<a key={i} href="#" className="w-10 h-10 rounded-xl border border-slate-800 bg-slate-900 flex items-center justify-center text-sm text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-800 transition-all">{ic}</a>))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-6">Quick Links</h4>
              <ul className="space-y-3">{['Home','Pricing','Use Cases','About Us','Contact','Privacy Policy'].map(l=>(<li key={l}><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">{l}</a></li>))}</ul>
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-6">Product</h4>
              <ul className="space-y-3">{['Features','How it Works','Integrations','Security','API Docs'].map(l=>(<li key={l}><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">{l}</a></li>))}</ul>
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-6">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-slate-450">📧 support@grbsoftware.in</li>
                <li className="flex items-center gap-3 text-sm text-slate-450">📞 +91 98765 43210</li>
                <li className="flex items-center gap-3 text-sm text-slate-450">📍 Mumbai, Maharashtra</li>
              </ul>
              <a href={`${d}/register`} className="btn-qr mt-6 inline-flex items-center justify-center px-6 py-3 text-sm font-bold rounded-xl text-white w-full">Get Started Free</a>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#9CA3AF]">© 2026 GRB Software. All rights reserved.</p>
            <div className="flex items-center gap-6">
              {['Terms of Service','Privacy Policy','Cookie Policy'].map(l=>(<a key={l} href="#" className="text-xs text-[#9CA3AF] hover:text-white transition-colors">{l}</a>))}
            </div>
          </div>
        </div>
      </footer>

      {/* Video Modal Component */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm transition-opacity">
          <div className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white font-bold flex items-center justify-center text-lg transition-all"
            >
              &times;
            </button>
            <div className="relative pb-[56.25%] h-0">
              <iframe 
                src={getEmbedUrl(videoUrl)}
                title="Google Review Explanation Video"
                className="absolute top-0 left-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Trigger redeployment after Vercel GitHub reconnect
