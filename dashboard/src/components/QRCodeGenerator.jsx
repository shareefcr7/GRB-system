import React, { useEffect, useRef, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { Download, Upload, Trash2, Layout, Palette, Type, Smartphone, Check } from 'lucide-react';
import { jsPDF } from 'jspdf';

const QRCodeGenerator = ({ defaultUrl = 'https://grb-dashboard.vercel.app' }) => {
  const [url, setUrl] = useState(defaultUrl);
  const [dotsColor, setDotsColor] = useState('#ff9c33');
  const [dotsGradient, setDotsGradient] = useState({
    type: 'linear',
    rotation: 45,
    colorStops: [
      { offset: 0, color: '#ff9c33' },
      { offset: 1, color: '#e91e63' },
    ],
  });
  const [dotsType, setDotsType] = useState('rounded');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [logo, setLogo] = useState(null);
  const [label, setLabel] = useState('@MALABARMENU');
  const [labelColor, setLabelColor] = useState('#e91e63');
  const [size, setSize] = useState(1024);
  const [frameType, setFrameType] = useState('none'); // 'none', 'rounded-ios', 'square'
  
  const qrRef = useRef(null);
  const [qrCode, setQrCode] = useState(null);

  useEffect(() => {
    const qrCodeStyling = new QRCodeStyling({
      width: 300,
      height: 300,
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
        margin: 10,
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
      qrCode.update({
        data: url,
        image: logo,
        dotsOptions: {
          color: dotsColor,
          type: dotsType,
          gradient: dotsGradient,
        },
        backgroundOptions: {
          color: frameType === 'instagram' ? '#ffffff' : bgColor,
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
  }, [qrCode, url, dotsColor, dotsType, dotsGradient, bgColor, logo, frameType]);

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
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadQR = async (format) => {
    if (!qrCode) return;

    if (format === 'pdf') {
       // PDF generation logic
       const doc = new jsPDF({
         orientation: 'p',
         unit: 'mm',
       });
       
       const canvas = qrRef.current.querySelector('canvas');
       if (canvas) {
         const imgData = canvas.toDataURL('image/png');
         doc.addImage(imgData, 'PNG', 10, 10, 190, 190);
         if (label) {
           doc.setTextColor(labelColor);
           doc.setFontSize(24);
           doc.text(label, 105, 210, { align: 'center' });
         }
         doc.save('grb-qr-code.pdf');
       }
       return;
    }

    qrCode.update({ width: size, height: size });
    qrCode.download({ name: 'grb-qr-code', extension: format }).then(() => {
      qrCode.update({ width: 300, height: 300 });
    });
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
                { id: 'card', label: 'Card' }
              ].map((style) => (
                <button
                  key={style.id}
                  onClick={() => setFrameType(style.id)}
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
                <span className="text-sm text-gray-600">Background</span>
                <input 
                  type="color" 
                  disabled={frameType === 'instagram'}
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className={`w-10 h-10 rounded-full overflow-hidden border-none cursor-pointer ${frameType === 'instagram' ? 'opacity-30 cursor-not-allowed' : ''}`}
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
              <div className="flex items-center gap-4">
                <label className="flex-grow flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:bg-gray-100 transition-all">
                  <Upload size={18} className="text-gray-400" />
                  <span className="text-sm text-gray-500">Upload Image</span>
                  <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                </label>
                {logo && (
                  <button 
                    onClick={() => setLogo(null)}
                    className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
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
          
          {/* Instagram Style Container */}
          <div 
            className={`p-10 mb-8 transition-all duration-500 ${frameType === 'none' ? '' : 'shadow-xl rounded-[3rem]'}`}
            style={{ 
              background: frameType === 'instagram' 
                ? `linear-gradient(45deg, ${dotsGradient.colorStops[0].color}, ${dotsGradient.colorStops[1].color})` 
                : frameType === 'card' ? '#f8fafc' : 'transparent',
              padding: frameType === 'none' ? '0' : '2.5rem'
            }}
          >
            <div 
              className={`flex flex-col items-center justify-center min-w-[280px] min-h-[350px] transition-all duration-500 ${
                frameType === 'instagram' ? 'bg-white p-8 rounded-[2.5rem] shadow-inner' : 
                frameType === 'card' ? 'bg-white p-6 rounded-2xl border border-gray-100' : ''
              }`}
            >
              <div ref={qrRef} className="qr-container scale-90" />
              {label && (
                <div 
                  className="mt-6 font-black text-2xl tracking-tighter uppercase text-center"
                  style={{ color: labelColor }}
                >
                  {label}
                </div>
              )}
            </div>
          </div>

          <div className="w-full space-y-3">
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
            Ready to scan
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
