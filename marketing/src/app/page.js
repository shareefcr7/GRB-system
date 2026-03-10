import React from 'react';

const QRBrackets = () => (
  <>
    <div className="qr-bracket qr-bracket-tl qr-bracket-animated"></div>
    <div className="qr-bracket qr-bracket-tr qr-bracket-animated"></div>
    <div className="qr-bracket qr-bracket-bl qr-bracket-animated"></div>
    <div className="qr-bracket qr-bracket-br qr-bracket-animated"></div>
  </>
);

const QRPixelGrid = ({ className = '' }) => (
  <svg className={`absolute opacity-[0.04] ${className}`} width="200" height="200" viewBox="0 0 200 200">
    {[0,1,2,3,4,5,6,7].map(r => [0,1,2,3,4,5,6,7].map(c => (
      Math.random() > 0.4 && <rect key={`${r}-${c}`} x={c*25} y={r*25} width="20" height="20" rx="3" fill="currentColor" className="text-blue-400"/>
    )))}
  </svg>
);

const FloatingQR = ({ size = 60, className = '', delay = '0s' }) => (
  <div className={`absolute ${className}`} style={{ animationDelay: delay }}>
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" className="opacity-10">
      <rect x="2" y="2" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" className="text-blue-400"/>
      <rect x="6" y="6" width="8" height="8" rx="1" fill="currentColor" className="text-blue-400"/>
      <rect x="42" y="2" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" className="text-blue-400"/>
      <rect x="46" y="6" width="8" height="8" rx="1" fill="currentColor" className="text-blue-400"/>
      <rect x="2" y="42" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" className="text-blue-400"/>
      <rect x="6" y="46" width="8" height="8" rx="1" fill="currentColor" className="text-blue-400"/>
      <rect x="24" y="24" width="12" height="12" rx="2" fill="currentColor" className="text-cyan-400" opacity="0.5"/>
    </svg>
  </div>
);

export default function Home() {
  const d = "https://grb-dashboard.vercel.app";
  const steps = [
    { n:'01', icon:'👤', title:'Merchant Sign Up', desc:'Merchant signs up and sets up their business profile on GRB dashboard', color:'from-blue-500 to-cyan-400' },
    { n:'02', icon:'🔲', title:'QR Code Generated', desc:'Branded QR code is automatically generated for store display', color:'from-purple-500 to-pink-400' },
    { n:'03', icon:'📱', title:'Customer Scans QR', desc:'Customers scan the QR code placed at your store location', color:'from-cyan-500 to-emerald-400' },
    { n:'04', icon:'⭐', title:'Google Reviews Redirect', desc:'High scores automatically redirect happy customers to leave a Google Review', color:'from-amber-500 to-orange-400' },
    { n:'05', icon:'🔒', title:'Private Feedback Stored', desc:'Low-score feedback is stored internally and sent directly to management', color:'from-emerald-500 to-teal-400' },
  ];
  const plans = [
    { name:'Starter', price:'2,500', icon:'🚀', color:'blue', features:['1 Business Location','Up to 100 QR scans/month','Basic review filtering','Email support','QR code generation','Basic analytics'] },
    { name:'Professional', price:'5,000', icon:'⚡', color:'purple', pop:true, features:['Up to 5 locations','1,000 QR scans/month','Advanced analytics','Priority support','Custom QR designs','Auto response templates'] },
    { name:'Enterprise', price:'10,000', icon:'🏢', color:'emerald', features:['Unlimited locations','Unlimited QR scans','White-label solution','24/7 phone support','Custom integrations','Dedicated manager'] },
  ];
  const stats = [
    { v:'80,000+', l:'Positive Reviews', i:'⭐' },
    { v:'500+', l:'Indian Businesses', i:'🏢' },
    { v:'4.7★', l:'Avg Rating Boost', i:'📈' },
    { v:'99.9%', l:'Uptime', i:'🛡️' },
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden relative">
      {/* QR-Themed Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="qr-grid-bg absolute inset-0"></div>
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/8 rounded-full blur-[150px] animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/8 rounded-full blur-[150px] animate-float-reverse"></div>
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px]"></div>
        <FloatingQR size={80} className="top-[15%] left-[8%] float-qr-1" />
        <FloatingQR size={50} className="top-[25%] right-[10%] float-qr-2" delay="1s" />
        <FloatingQR size={70} className="bottom-[30%] left-[5%] float-qr-3" delay="2s" />
        <FloatingQR size={40} className="top-[60%] right-[8%] float-qr-1" delay="3s" />
        <QRPixelGrid className="top-[10%] right-[15%] text-blue-500 qr-deco-1" />
        <QRPixelGrid className="bottom-[20%] left-[10%] text-purple-500 qr-deco-2" />
      </div>

      {/* Navbar */}
      <nav className="fixed w-full z-50">
        <div className="absolute inset-0 bg-[#030712]/60 backdrop-blur-2xl border-b border-white/5"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="flex justify-between items-center h-20">
            <a href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all relative">
                <span className="font-black text-white text-lg" style={{fontFamily:'var(--font-space-grotesk)'}}>G</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-white" style={{fontFamily:'var(--font-space-grotesk)'}}>GRB</span>
            </a>
            <div className="hidden md:flex items-center gap-1">
              {['Home','Features','Pricing','Stories'].map(i=>(
                <a key={i} href={`#${i.toLowerCase()}`} className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all">{i}</a>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <a href={`${d}/login`} className="px-5 py-2.5 text-sm font-medium text-slate-300 hover:text-white rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all">Sign In</a>
              <a href={`${d}/login`} className="btn-qr px-6 py-2.5 text-sm font-semibold rounded-xl text-white">Get Started</a>
            </div>
          </div>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section id="home" className="relative pt-32 pb-20 lg:pt-44 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 mb-10 animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-sm font-medium text-blue-300">🔲 Smart QR Technology · Trusted by 500+ Businesses</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] mb-8 heading-premium heading-glow text-breathe text-auto-glow">
              <span className="text-white">Smart </span>
              <span className="text-gradient-qr">QR Reviews</span>
              <br />
              <span className="text-white">For </span>
              <span className="text-gradient-gold">Growth</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up">
              Intelligent QR-based review management that filters negative reviews, directs satisfied customers to Google Reviews, and builds your reputation automatically.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 animate-fade-in-up">
              <a href={`${d}/login`} className="btn-qr px-10 py-4 text-base font-bold rounded-2xl text-white flex items-center gap-2 animate-pulse-glow">
                Start Free Trial
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
              </a>
              <a href="#features" className="px-10 py-4 text-base font-semibold rounded-2xl text-slate-300 border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                Watch Demo
              </a>
            </div>

            {/* Dashboard Preview with QR Brackets */}
            <div className="relative max-w-5xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-500/20 rounded-3xl blur-3xl -z-10 scale-95"></div>
              <div className="relative">
                <QRBrackets />
                <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0a0f1e]/90 backdrop-blur-xl shadow-2xl relative">
                  <div className="qr-scan-line"></div>
                  <div className="flex items-center gap-2 px-5 py-3.5 bg-white/[0.03] border-b border-white/5">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="h-7 rounded-lg bg-white/5 flex items-center px-3 max-w-md mx-auto">
                        <svg className="w-3.5 h-3.5 text-slate-500 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                        <span className="text-xs text-slate-500">dashboard.grbsoftware.in</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex min-h-[380px]">
                    <div className="w-56 bg-gradient-to-b from-[#0f172a] to-[#0a0f1e] border-r border-white/5 p-5 hidden sm:flex flex-col">
                      <div className="flex items-center gap-2 mb-8">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"><span className="text-xs font-bold">G</span></div>
                        <span className="font-bold text-sm">GRB Dashboard</span>
                      </div>
                      <div className="space-y-1 flex-1">
                        {[['📊','Overview',true],['⭐','Reviews'],['🔲','QR Codes'],['📈','Analytics']].map(([ic,lb,act],i)=>(
                          <div key={i} className={`flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl transition-colors ${act?'bg-blue-500/10 border border-blue-500/20 text-blue-400 font-medium':'text-slate-500 hover:text-slate-300 hover:bg-white/5'}`}>
                            <span>{ic}</span> {lb}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex-1 p-6 bg-[#060a14]">
                      <div className="flex items-center justify-between mb-6">
                        <div><p className="text-xs text-slate-500">Welcome back</p><p className="text-sm font-semibold text-white">Rajesh Kumar</p></div>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-xs font-bold">R</div>
                      </div>
                      <div className="grid grid-cols-3 gap-3 mb-5">
                        {[['Total Reviews','847','↑ 12%','emerald'],['Google Rating','4.7★','↑ 0.3','amber'],['Filtered','156','Caught','blue']].map(([l,v,s,c],i)=>(
                          <div key={i} className="rounded-xl bg-white/[0.03] border border-white/5 p-4">
                            <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">{l}</p>
                            <p className={`text-2xl font-black ${i===1?'text-gradient-gold':'text-white'}`}>{v}</p>
                            <p className={`text-[10px] text-${c}-400 mt-1`}>{s}</p>
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-xl bg-white/[0.03] border border-white/5 p-4">
                          <p className="text-xs font-semibold text-slate-400 mb-3">Review Trend</p>
                          <div className="flex items-end gap-1.5 h-16">
                            {[35,45,32,55,48,62,58,70,65,80,75,90].map((h,i)=>(
                              <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-blue-600 to-cyan-400 opacity-80" style={{height:`${h}%`}}></div>
                            ))}
                          </div>
                        </div>
                        <div className="rounded-xl bg-white/[0.03] border border-white/5 p-4">
                          <p className="text-xs font-semibold text-slate-400 mb-3">QR Scan Activity</p>
                          <div className="space-y-2">
                            {[['Today',85],['This Week',65],['This Month',45]].map(([l,w],i)=>(
                              <div key={i} className="flex items-center gap-2"><span className="text-[10px] text-slate-500 w-16">{l}</span><div className="flex-1 bg-white/5 rounded-full h-2"><div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full" style={{width:`${w}%`}}></div></div></div>
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

      {/* Trusted By */}
      <section className="py-16 border-t border-b border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm font-medium text-slate-500 uppercase tracking-[0.2em] mb-10">Trusted by leading Indian businesses</p>
          <div className="flex items-center justify-center gap-12 md:gap-20 flex-wrap opacity-20">
            {['Taj Hotels','Zomato','Swiggy','OYO','MakeMyTrip'].map(n=>(<span key={n} className="text-lg md:text-xl font-bold tracking-wider text-white" style={{fontFamily:'var(--font-space-grotesk)'}}>{n}</span>))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="features" className="py-28 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div className="space-y-4">
              {steps.map((s,i)=>(
                <div key={i} className="glass-card rounded-2xl p-6 group cursor-default relative">
                  <QRBrackets />
                  <div className="flex items-center gap-5">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-2xl flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>{s.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{s.n}</span>
                        <h3 className="font-bold text-white text-lg" style={{fontFamily:'var(--font-space-grotesk)'}}>{s.title}</h3>
                      </div>
                      <p className="text-sm text-slate-400">{s.desc}</p>
                    </div>
                    <svg className="w-5 h-5 text-slate-600 group-hover:text-blue-400 transition-colors flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:sticky lg:top-32">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 mb-6">
                <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">How it Works</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6 heading-premium heading-glow">
                <span className="text-white">GRB </span><span className="text-gradient-qr heading-underline">Workflow</span>
              </h2>
              <p className="text-lg text-slate-400 mb-10 leading-relaxed">A clear, step-by-step process illustrating how the GRB system operates for merchants and customers. From sign-up to reputation growth — all automated.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={`${d}/login`} className="btn-qr px-8 py-4 text-base font-bold rounded-2xl text-white text-center">Start Free Trial</a>
                <a href="#demo" className="px-8 py-4 text-base font-semibold rounded-2xl text-slate-300 border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all text-center">Watch Demo</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-28 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            {stats.map((s,i)=>(
              <div key={i} className="glass-card rounded-2xl p-6 text-center group relative"><QRBrackets />
                <span className="text-3xl mb-3 block group-hover:scale-125 transition-transform">{s.i}</span>
                <p className="text-3xl md:text-4xl font-black text-white mb-1" style={{fontFamily:'var(--font-space-grotesk)'}}>{s.v}</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider">{s.l}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-6">
                <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">Why GRB</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6 heading-premium heading-glow">
                <span className="text-white">Intelligent QR filtering for </span><span className="text-gradient-qr heading-underline">modern businesses</span>
              </h2>
              <p className="text-lg text-slate-400 mb-8 leading-relaxed">GRB Software helps businesses automatically direct satisfied customers to Google Reviews while handling concerns privately.</p>
              <div className="space-y-4">
                {['Filter negative reviews before they go public','AI-powered sentiment analysis','Real-time dashboard & analytics','Custom branded QR codes'].map((f,i)=>(
                  <div key={i} className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0"><svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg></div><span className="text-slate-300">{f}</span></div>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative animate-float">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-[3rem] blur-2xl scale-90"></div>
                <div className="w-72 bg-[#0a0f1e] rounded-[2.5rem] border border-white/10 p-3 relative shadow-2xl">
                  <QRBrackets />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#030712] rounded-b-2xl z-10"></div>
                  <div className="w-full bg-[#060a14] rounded-[2rem] overflow-hidden relative">
                    <div className="qr-scan-line"></div>
                    <div className="bg-gradient-to-br from-blue-600 to-cyan-600 p-6 pt-10">
                      <p className="text-xs text-blue-200 mb-1">🔲 Scan & Rate</p>
                      <div className="flex items-center gap-1 mb-3">{[1,2,3,4,5].map(s=><span key={s} className="text-yellow-300 text-xl">★</span>)}</div>
                      <p className="text-white font-bold text-lg">How was your experience?</p>
                    </div>
                    <div className="p-5 space-y-3">
                      <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4">
                        <p className="text-xs text-slate-500 mb-1">Your Feedback</p>
                        <p className="text-sm text-slate-300">Amazing food and service! Will visit again...</p>
                      </div>
                      <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl py-3.5 text-sm font-bold">Submit Review →</button>
                      <p className="text-[10px] text-slate-600 text-center">Powered by GRB Software</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section id="pricing" className="py-28 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 mb-6"><span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Pricing Plans</span></div>
            <h2 className="text-4xl md:text-6xl font-black mb-4 heading-premium heading-glow"><span className="text-white">Pick your </span><span className="text-gradient-qr heading-underline">perfect plan</span></h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">Boost your Google Reviews with smart QR filtering technology.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {plans.map((p,i)=>(
              <div key={i} className={`rounded-3xl p-8 flex flex-col relative ${p.pop?'bg-gradient-to-b from-blue-600/10 via-purple-600/5 to-transparent border border-blue-500/20 animate-border-glow shadow-lg shadow-blue-500/5':'glass-card'}`}>
                {p.pop&&<div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-xs font-bold text-white shadow-lg shadow-blue-500/30">Most Popular</div>}
                <QRBrackets />
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-${p.color}-500/10 border border-${p.color}-500/20 flex items-center justify-center`}><span className={`text-${p.color}-400`}>{p.icon}</span></div>
                  <span className="font-bold text-white" style={{fontFamily:'var(--font-space-grotesk)'}}>{p.name}</span>
                </div>
                <p className="text-sm text-slate-500 mb-6">{p.pop?'Ideal for growing businesses':'Perfect for '+p.name.toLowerCase()+' needs'}</p>
                <div className="mb-6"><span className="text-5xl font-black text-white" style={{fontFamily:'var(--font-space-grotesk)'}}>₹{p.price}</span><span className="text-slate-500 text-sm"> /month</span></div>
                <div className="h-px bg-white/5 mb-6"></div>
                <ul className="space-y-3 mb-8 flex-1">
                  {p.features.map((f,j)=>(<li key={j} className="flex items-center gap-3 text-sm text-slate-400"><svg className={`w-4 h-4 text-${p.color}-400 flex-shrink-0`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>{f}</li>))}
                </ul>
                <a href={`${d}/login`} className={`w-full block py-4 text-center font-bold rounded-2xl text-white ${p.pop?'btn-qr':'border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all'}`}>Choose Plan</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SUCCESS STORIES ===== */}
      <section id="stories" className="py-28 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 mb-6"><span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Success Stories</span></div>
            <h2 className="text-4xl md:text-5xl font-black mb-4 heading-premium heading-glow"><span className="text-white">Real results from </span><span className="text-gradient-qr heading-underline">real businesses</span></h2>
          </div>
          <div className="glass-card rounded-3xl overflow-hidden relative"><QRBrackets />
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-10 lg:p-14 flex items-center justify-center bg-gradient-to-br from-blue-500/5 to-cyan-500/5">
                <div className="text-center">
                  <div className="w-28 h-28 mx-auto bg-gradient-to-br from-blue-400 via-cyan-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-4xl font-black mb-5 shadow-2xl shadow-cyan-500/20">RK</div>
                  <p className="text-xl font-bold text-white">Rajesh Kumar</p>
                  <p className="text-sm text-slate-400">Restaurant Owner, Mumbai</p>
                  <div className="flex items-center justify-center gap-1 mt-3">{[1,2,3,4,5].map(s=><span key={s} className="text-yellow-400 text-lg">★</span>)}</div>
                </div>
              </div>
              <div className="p-10 lg:p-14 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-xs font-semibold">Professional Plan</span>
                  <span className="px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-semibold">Verified</span>
                </div>
                <div className="text-xl text-slate-300 leading-relaxed mb-6 italic">&quot;GRB&apos;s QR system transformed our reviews. Our Google rating went from <span className="text-emerald-400 font-bold not-italic">3.2 to 4.7 stars</span> in just 3 months. The smart QR filtering ensures only happy customers leave public reviews.&quot;</div>
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">{['bg-blue-500','bg-cyan-500','bg-emerald-500'].map((c,i)=>(<div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-[#0a0f1e] flex items-center justify-center text-[10px] font-bold text-white`}>{['R','S','P'][i]}</div>))}</div>
                  <span className="text-xs text-slate-500">+497 businesses growing with GRB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-28 relative z-10">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-cyan-600/10 to-emerald-500/10 rounded-3xl blur-3xl"></div>
            <div className="glass-card rounded-3xl p-12 md:p-20 relative"><QRBrackets />
              <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight heading-premium heading-glow text-auto-glow"><span className="text-white">Ready to boost your </span><span className="text-gradient-qr heading-underline">Google Reviews</span><span className="text-white">?</span></h2>
              <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">Scan. Filter. Grow. Take control of your online reputation with GRB&apos;s smart QR system.</p>
              <a href={`${d}/login`} className="btn-qr inline-flex px-12 py-5 text-lg font-bold rounded-2xl text-white items-center gap-3 animate-pulse-glow">
                Get Started Today <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
              </a>
              <p className="text-sm text-slate-500 mt-6">14-day free trial · No credit card required</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="relative z-10 border-t border-white/5 pt-20 pb-8 bg-[#020510]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center"><span className="font-black text-white text-lg" style={{fontFamily:'var(--font-space-grotesk)'}}>G</span></div>
                <span className="font-bold text-xl text-white" style={{fontFamily:'var(--font-space-grotesk)'}}>GRB Software</span>
              </div>
              <p className="text-sm text-slate-500 mb-6 leading-relaxed">Smart QR-based review management for modern Indian businesses.</p>
              <div className="flex items-center gap-3">
                {['X','in','ig'].map((ic,i)=>(<a key={i} href="#" className="w-10 h-10 rounded-xl border border-white/5 bg-white/[0.02] flex items-center justify-center text-sm text-slate-500 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all">{ic}</a>))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Quick Links</h4>
              <ul className="space-y-3">{['Home','Pricing','Use Cases','About Us','Contact','Privacy Policy'].map(l=>(<li key={l}><a href="#" className="text-sm text-slate-500 hover:text-white transition-colors">{l}</a></li>))}</ul>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Product</h4>
              <ul className="space-y-3">{['Features','How it Works','Integrations','Security','API Docs'].map(l=>(<li key={l}><a href="#" className="text-sm text-slate-500 hover:text-white transition-colors">{l}</a></li>))}</ul>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-slate-500">📧 support@grbsoftware.in</li>
                <li className="flex items-center gap-3 text-sm text-slate-500">📞 +91 98765 43210</li>
                <li className="flex items-center gap-3 text-sm text-slate-500">📍 Mumbai, Maharashtra</li>
              </ul>
              <a href={`${d}/login`} className="btn-qr mt-6 inline-flex items-center justify-center px-6 py-3 text-sm font-bold rounded-xl text-white w-full">Get Started Free</a>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-600">© 2026 GRB Software. All rights reserved.</p>
            <div className="flex items-center gap-6">
              {['Terms of Service','Privacy Policy','Cookie Policy'].map(l=>(<a key={l} href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">{l}</a>))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
