import React, { useEffect, useRef, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { Download, Upload, Trash2, Layout, Palette, Type, Smartphone, Check, Star } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { toPng, toSvg } from 'html-to-image';

const QRCodeGenerator = ({ defaultUrl = 'https://grb-dashboard.vercel.app', businessName = 'Your Business' }) => {
  const [url, setUrl] = useState(defaultUrl);
  const [centerText, setCenterText] = useState('');

  const generateTextLogo = (text, color) => {
    if (!text) return null;
    const width = Math.max(100, text.length * 22 + 40);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} 100">
      <rect x="0" y="0" width="${width}" height="100" rx="30" ry="30" fill="${color}"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="40" font-weight="bold" fill="#ffffff" text-anchor="middle" dominant-baseline="central">${text}</text>
    </svg>`;
    return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
  };

  const [dotsColor, setDotsColor] = useState('#4285F4'); // Google Blue
  const [dotsGradient, setDotsGradient] = useState({
    type: 'linear',
    rotation: 45,
    colorStops: [
      { offset: 0, color: '#4285F4' },
      { offset: 1, color: '#34A853' },
    ],
  });
  const [dotsType, setDotsType] = useState('rounded');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [logo, setLogo] = useState(null);
  const [label, setLabel] = useState('Review us on Google');
  const [labelColor, setLabelColor] = useState('#5f6368');
  const [labelFont, setLabelFont] = useState('Inter, sans-serif');
  const [showStars, setShowStars] = useState(true);
  const [frameBgColor, setFrameBgColor] = useState('#ffffff');
  const [size, setSize] = useState(1024);
  const [frameType, setFrameType] = useState('google'); // 'none', 'instagram', 'card', 'google'
  
  const qrRef = useRef(null);
  const [qrCode, setQrCode] = useState(null);

  useEffect(() => {
    const qrCodeStyling = new QRCodeStyling({
      width: 280,
      height: 280,
      data: url,
      image: logo,
      dotsOptions: {
        color: dotsColor,
        type: dotsType,
        gradient: dotsGradient,
      },
      backgroundOptions: {
        color: bgColor,
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 8,
        imageSize: 0.4,
      },
      cornersSquareOptions: {
        type: 'extra-rounded',
      },
      cornersDotOptions: {
        type: 'dot',
      },
      qrOptions: {
        errorCorrectionLevel: 'H',
      },
    });

    setQrCode(qrCodeStyling);
  }, []);

  useEffect(() => {
    if (qrCode) {
      const getCenterImage = () => {
        if (logo) return logo;
        if (centerText) return generateTextLogo(centerText, dotsColor);
        if (frameType === 'google') return 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_\"G\"_logo.svg';
        return null;
      };

      qrCode.update({
        data: url,
        image: getCenterImage(),
        dotsOptions: {
          color: dotsColor,
          type: dotsType,
          gradient: dotsGradient,
        },
        backgroundOptions: {
          color: bgColor,
        },
        cornersSquareOptions: {
          type: dotsType === 'rounded' || dotsType === 'extra-rounded' ? 'extra-rounded' : 'square',
          gradient: dotsGradient,
        },
        cornersDotOptions: {
          type: dotsType === 'rounded' || dotsType === 'extra-rounded' ? 'dot' : 'square',
          gradient: dotsGradient,
        },
      });
    }
  }, [qrCode, url, dotsColor, dotsType, dotsGradient, bgColor, logo, frameType, centerText]);

  useEffect(() => {
    if (qrRef.current && qrCode) {
      qrRef.current.innerHTML = '';
      qrCode.append(qrRef.current);
    }
  }, [qrCode]);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setLogo(reader.result);
        setCenterText('');
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadQR = async (format) => {
    const frameNode = document.getElementById('qr-download-frame');
    if (!frameNode) return;

    // Use a high pixel ratio for print-quality export
    const scale = size / frameNode.offsetWidth;

    if (format === 'pdf') {
       const dataUrl = await toPng(frameNode, { pixelRatio: scale, skipFonts: false });
       const doc = new jsPDF({
         orientation: 'p',
         unit: 'mm',
       });
       
       // Calculate properties to fit on PDF maintaining aspect ratio
       const imgProps = doc.getImageProperties(dataUrl);
       const pdfWidth = doc.internal.pageSize.getWidth();
       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
       
       doc.addImage(dataUrl, 'PNG', 10, 10, pdfWidth - 20, (pdfWidth - 20) * (imgProps.height / imgProps.width));
       doc.save(`grb-qr-${businessName.replace(/\s+/g, '-')}.pdf`);
       return;
    } else if (format === 'svg') {
       const dataUrl = await toSvg(frameNode, { pixelRatio: 1, skipFonts: false });
       const link = document.createElement('a');
       link.download = `grb-qr-${businessName.replace(/\s+/g, '-')}.svg`;
       link.href = dataUrl;
       link.click();
    } else {
       const dataUrl = await toPng(frameNode, { pixelRatio: scale, skipFonts: false });
       const link = document.createElement('a');
       link.download = `grb-qr-${businessName.replace(/\s+/g, '-')}.png`;
       link.href = dataUrl;
       link.click();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Controls */}
      <div className="lg:col-span-12 xl:col-span-8 space-y-6">
        {/* URL Input */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Smartphone size={20} />
            </div>
            <h3 className="font-bold text-gray-800">Target URL</h3>
          </div>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="https://example.com"
          />
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Style Selection */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                <Layout size={20} />
              </div>
              <h3 className="font-bold text-gray-800">QR Style</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'rounded', label: 'Rounded' },
                { id: 'dots', label: 'Dots' },
                { id: 'classy', label: 'Classy' },
                { id: 'square', label: 'Square' },
                { id: 'extra-rounded', label: 'Extra Rounded' }
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => setDotsType(type.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    dotsType === type.id 
                      ? 'bg-purple-600 text-white shadow-md' 
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </section>

          {/* Frame Selection */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <Layout size={20} />
              </div>
              <h3 className="font-bold text-gray-800">Frame Style</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'none', label: 'No Frame' },
                { id: 'instagram', label: 'Instagram' },
                { id: 'google', label: 'Google Style' },
                { id: 'card', label: 'Card' }
              ].map((style) => (
                <button
                  key={style.id}
                  onClick={() => {
                    setFrameType(style.id);
                    if (style.id === 'google') {
                      setDotsColor('#4285F4');
                      setDotsGradient({
                        type: 'linear',
                        rotation: 45,
                        colorStops: [
                          { offset: 0, color: '#4285F4' },
                          { offset: 1, color: '#34A853' },
                        ]
                      });
                      setLabel('Review us on Google');
                      setLabelColor('#5f6368');
                    }
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    frameType === style.id 
                      ? 'bg-indigo-600 text-white shadow-md' 
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Color Customization */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-pink-50 text-pink-600 rounded-lg">
                <Palette size={20} />
              </div>
              <h3 className="font-bold text-gray-800">Colors & Gradient</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Start Color</span>
                <input 
                  type="color" 
                  value={dotsGradient.colorStops[0].color}
                  onChange={(e) => setDotsGradient({
                    ...dotsGradient,
                    colorStops: [
                      { ...dotsGradient.colorStops[0], color: e.target.value },
                      dotsGradient.colorStops[1]
                    ]
                  })}
                  className="w-10 h-10 rounded-full overflow-hidden border-none cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">End Color</span>
                <input 
                  type="color" 
                  value={dotsGradient.colorStops[1].color}
                  onChange={(e) => setDotsGradient({
                    ...dotsGradient,
                    colorStops: [
                      dotsGradient.colorStops[0],
                      { ...dotsGradient.colorStops[1], color: e.target.value }
                    ]
                  })}
                  className="w-10 h-10 rounded-full overflow-hidden border-none cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">QR Background</span>
                <input 
                  type="color" 
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-10 h-10 rounded-full overflow-hidden border-none cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Frame Background</span>
                <input 
                  type="color" 
                  value={frameBgColor}
                  onChange={(e) => setFrameBgColor(e.target.value)}
                  disabled={frameType === 'none'}
                  className={`w-10 h-10 rounded-full overflow-hidden border-none cursor-pointer ${frameType === 'none' ? 'opacity-30 cursor-not-allowed' : ''}`}
                />
              </div>
            </div>
          </section>

          {/* Logo Upload & Label */}
          <div className="space-y-6">
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                  <Upload size={20} />
                </div>
                <h3 className="font-bold text-gray-800">Center Logo</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <span className="text-sm text-gray-500">Text as Icon (e.g. Initials)</span>
                  <input
                    type="text"
                    value={centerText}
                    onChange={(e) => {
                      setCenterText(e.target.value);
                      if (e.target.value) setLogo(null);
                    }}
                    className="w-full px-4 py-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="e.g. GRB"
                  />
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex-grow h-px bg-gray-200"></div>
                  <span>OR</span>
                  <div className="flex-grow h-px bg-gray-200"></div>
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex-grow flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:bg-gray-100 transition-all">
                    <Upload size={18} className="text-gray-400" />
                    <span className="text-sm text-gray-500">Upload Logo</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                  </label>
                  {(logo || centerText || frameType === 'google') && (
                    <button 
                      onClick={() => {
                        setLogo(null);
                        setCenterText('');
                      }}
                      className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  )}
                </div>
              </div>
            </section>

            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                  <Type size={20} />
                </div>
                <h3 className="font-bold text-gray-800">Bottom Label</h3>
              </div>
              <div className="space-y-3">
                <input
                  type="text"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  className="w-full px-4 py-2 text-sm rounded-lg border border-gray-200"
                  placeholder="Text below QR"
                />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Text color</span>
                  <input 
                    type="color" 
                    value={labelColor}
                    onChange={(e) => setLabelColor(e.target.value)}
                    className="w-8 h-8 rounded-full overflow-hidden border-none cursor-pointer"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Font Style</span>
                  <select 
                    value={labelFont}
                    onChange={(e) => setLabelFont(e.target.value)}
                    className="px-3 py-1 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Inter, sans-serif">Inter</option>
                    <option value="Arial, sans-serif">Arial</option>
                    <option value="'Times New Roman', serif">Times New Roman</option>
                    <option value="'Courier New', monospace">Courier</option>
                    <option value="'Comic Sans MS', cursive">Comic Sans</option>
                    <option value="Impact, sans-serif">Impact</option>
                  </select>
                </div>
                <label className="flex items-center gap-3 cursor-pointer pt-2">
                  <input 
                    type="checkbox"
                    checked={showStars}
                    onChange={(e) => setShowStars(e.target.checked)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                  />
                  <span className="text-sm font-medium text-gray-700">Show 5 Stars</span>
                </label>
              </div>
            </section>
          </div>
        </div>

        {/* Export Size */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
           <h3 className="font-bold text-gray-800 mb-4">Export Size</h3>
           <div className="flex gap-4">
             {[512, 1024, 2048].map((s) => (
               <button
                 key={s}
                 onClick={() => setSize(s)}
                 className={`flex-1 py-3 rounded-xl border-2 transition-all font-semibold ${
                   size === s 
                    ? 'border-blue-600 bg-blue-50 text-blue-600' 
                    : 'border-gray-100 bg-white text-gray-500 hover:border-gray-200'
                 }`}
               >
                 {s}px
               </button>
             ))}
           </div>
        </section>
      </div>

      {/* Preview */}
      <div className="lg:col-span-12 xl:col-span-4 sticky top-8">
        <div className={`bg-white p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 flex flex-col items-center transition-all duration-500`}>
          <h3 className="text-xl font-bold text-gray-800 mb-8">Live Preview</h3>
          
          {/* Frame Container */}
          <div 
            id="qr-download-frame"
            className={`transition-all duration-500 relative flex ${
              frameType === 'none' ? '' : 
              frameType === 'google' ? 'p-1.5 overflow-hidden rounded-[2.5rem] shadow-xl' :
              'p-10 shadow-xl rounded-[3rem]'
            }`}
            style={{ 
              background: frameType === 'instagram' 
                ? `linear-gradient(45deg, ${dotsGradient.colorStops[0].color}, ${dotsGradient.colorStops[1].color})` 
                : frameType === 'card' ? '#f8fafc' : 'transparent',
              padding: frameType === 'none' ? '0' : (frameType === 'google' ? '6px' : '2.5rem')
            }}
          >
            {/* Google multi-color border effect */}
            {frameType === 'google' && (
              <div className="absolute inset-0 z-0 flex flex-wrap">
                 <div className="w-1/2 h-1/2 bg-[#4285F4]"></div>
                 <div className="w-1/2 h-1/2 bg-[#EA4335]"></div>
                 <div className="w-1/2 h-1/2 bg-[#FBBC05]"></div>
                 <div className="w-1/2 h-1/2 bg-[#34A853]"></div>
              </div>
            )}

            <div 
              className={`flex flex-col items-center justify-center min-w-[280px] min-h-[350px] transition-all duration-500 relative z-10 w-full h-full ${
                frameType === 'instagram' ? 'p-8 rounded-[2.5rem] shadow-inner' : 
                frameType === 'card' ? 'p-6 rounded-2xl border border-gray-100' : 
                frameType === 'google' ? 'p-6 rounded-[2.2rem]' : ''
              }`}
              style={{
                backgroundColor: frameType === 'none' ? 'transparent' : frameBgColor
              }}
            >
              <div ref={qrRef} className="qr-container scale-90" />
              {(label || showStars) && (
                <div 
                  className={`mt-4 tracking-tight text-center ${frameType === 'google' ? 'text-xl font-bold' : 'text-2xl uppercase font-black tracking-tighter'}`}
                  style={{ color: labelColor, fontFamily: labelFont }}
                >
                  {label && <div>{label}</div>}
                  {showStars && (
                    <div className="flex justify-center mt-1 text-[#FBBC05] gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={20} fill="currentColor" stroke="none" />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="w-full space-y-3 mt-8">
            <button 
              onClick={() => downloadQR('png')}
              className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-black transition-all shadow-lg active:scale-95"
            >
              <Download size={20} />
              Download PNG
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => downloadQR('svg')}
                className="py-3 bg-white border-2 border-gray-100 text-gray-700 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-all font-mono"
              >
                SVG
              </button>
              <button 
                onClick={() => downloadQR('pdf')}
                className="py-3 bg-white border-2 border-gray-100 text-gray-700 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-all font-mono"
              >
                PDF
              </button>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-full text-sm font-medium">
            <Check size={16} />
            Ready for print
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
