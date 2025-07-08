'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Download, Upload, Heart, Palette, ShoppingBag, Gift, Bitcoin, CreditCard, Smartphone, MapPin } from 'lucide-react';

const ThinkNiceNow = () => {
  const [logoColor, setLogoColor] = useState('#ff1493');
  const [bgImage, setBgImage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [currentPopup, setCurrentPopup] = useState(0);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);

  const colors = ['#ff1493', '#ff4500', '#87ceeb', '#9acd32', '#000000'];
  
  const popupMessages = [
    "You are enough, just as you are ✨",
    "Your kindness creates ripples of joy 🌊",
    "Today is full of possibilities 🌟"
  ];

  const inspirationalQuotes = [
    "Spread kindness like confetti",
    "Be the reason someone smiles today",
    "Your positive energy is contagious",
    "Choose joy, spread love",
    "Small acts, big impact"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setShowPopup(true);
      setCurrentPopup(prev => (prev + 1) % popupMessages.length);
      setTimeout(() => setShowPopup(false), 3000);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === 'string') {
          setUploadedImage(e.target.result);
          setBgImage(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const generatePrintableDesign = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;
    
    // Background
    if (ctx) {
      if (bgImage) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          drawLogo();
        };
        img.src = bgImage;
      } else {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawLogo();
      }
    }

    function drawLogo() {
      if (!ctx) return;
      ctx.fillStyle = logoColor;
      ctx.font = 'bold 48px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('THINK NICE NOW', canvas.width / 2, canvas.height / 2);
      
      // Download
      const link = document.createElement('a');
      link.download = 'think-nice-now-design.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  type LogoTileProps = {
    color: string;
    index: number;
  };

  const LogoTile: React.FC<LogoTileProps> = ({ color, index }) => (
    <motion.div
      key={`${color}-${index}`}
      className="inline-block p-4 m-2 opacity-20 hover:opacity-60 transition-opacity"
      animate={{
        rotate: [0, 5, -5, 0],
        scale: [1, 1.1, 1]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay: index * 0.2
      }}
    >
      <div 
        className="text-lg font-bold"
        style={{ color }}
      >
        THINK NICE NOW
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Animated Background Pattern */}
      <motion.div 
        className="fixed inset-0 z-0"
        style={{ y }}
      >
        <div className="absolute inset-0 flex flex-wrap justify-center items-center">
          {Array.from({ length: 50 }).map((_, i) => (
            <LogoTile 
              key={i} 
              color={colors[i % colors.length]} 
              index={i} 
            />
          ))}
        </div>
      </motion.div>

      {/* Popup Messages */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed top-20 right-8 z-50 bg-gradient-to-r from-pink-500 to-orange-400 text-white p-6 rounded-2xl shadow-2xl max-w-sm"
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <div className="text-lg font-medium">
              {popupMessages[currentPopup]}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}
        <motion.header 
          className="text-center py-12 px-4 bg-white/90 backdrop-blur-sm"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-orange-400 to-blue-400 bg-clip-text text-transparent">
            THINK NICE NOW
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A movement of positivity. Customize your message, spread kindness, and make the world a little brighter.
          </p>
        </motion.header>

        {/* Logo Customizer */}
        <motion.section 
          className="py-16 px-4 bg-white/95 backdrop-blur-sm"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
              <Palette className="inline mr-3" />
              Customize Your Logo
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              {/* Live Preview */}
              <div className="text-center">
                <div 
                  className="w-80 h-60 mx-auto rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-2xl mb-6"
                  style={{ 
                    backgroundColor: logoColor,
                    backgroundImage: bgImage ? `url(${bgImage})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <span className={bgImage ? 'text-white drop-shadow-lg' : ''}>
                    THINK NICE NOW
                  </span>
                </div>
                
                <motion.button
                  onClick={generatePrintableDesign}
                  className="bg-gradient-to-r from-pink-500 to-orange-400 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="inline mr-2" />
                  Print Your Design
                </motion.button>
              </div>

              {/* Controls */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Choose Color</h3>
                  <div className="flex gap-3">
                    {colors.map((color) => (
                      <motion.button
                        key={color}
                        onClick={() => setLogoColor(color)}
                        className="w-12 h-12 rounded-full border-4 border-white shadow-lg"
                        style={{ backgroundColor: color }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Background Image</h3>
                  <div className="space-y-4">
                    <motion.button
                      onClick={() => fileInputRef.current && fileInputRef.current.click()}
                      className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-pink-400 transition-colors"
                      whileHover={{ scale: 1.02 }}
                    >
                      <Upload className="inline mr-2" />
                      Upload Background Image
                    </motion.button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    {bgImage && (
                      <button
                        onClick={() => {setBgImage(''); setUploadedImage(null);}}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove Background
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Inspirational Quotes */}
        <motion.section 
          className="py-16 px-4 bg-gradient-to-r from-blue-50 to-green-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Words of Positivity
          </h2>
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {inspirationalQuotes.map((quote, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-lg font-medium text-gray-700">
                  "{quote}"
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Donation Section */}
        <motion.section 
          className="py-16 px-4 bg-white/95 backdrop-blur-sm"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
              <Heart className="inline mr-3 text-pink-500" />
              Support the Movement
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div 
                className="bg-gradient-to-br from-pink-500 to-pink-600 text-white p-6 rounded-2xl text-center"
                whileHover={{ scale: 1.05 }}
              >
                <MapPin className="mx-auto mb-4" size={40} />
                <h3 className="font-bold text-lg mb-2">Wise</h3>
                <p className="text-sm opacity-90">International transfers</p>
              </motion.div>
              
              <motion.div 
                className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-2xl text-center"
                whileHover={{ scale: 1.05 }}
              >
                <Smartphone className="mx-auto mb-4" size={40} />
                <h3 className="font-bold text-lg mb-2">Revolut</h3>
                <p className="text-sm opacity-90">Quick & easy payments</p>
              </motion.div>
              
              <motion.div 
                className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl text-center"
                whileHover={{ scale: 1.05 }}
              >
                <CreditCard className="mx-auto mb-4" size={40} />
                <h3 className="font-bold text-lg mb-2">Stripe</h3>
                <p className="text-sm opacity-90">Credit card payments</p>
              </motion.div>
              
              <motion.div 
                className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl text-center"
                whileHover={{ scale: 1.05 }}
              >
                <Bitcoin className="mx-auto mb-4" size={40} />
                <h3 className="font-bold text-lg mb-2">Crypto</h3>
                <p className="text-sm opacity-90">NFT minting & wallet</p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Future Products */}
        <motion.section 
          className="py-16 px-4 bg-gradient-to-r from-gray-50 to-gray-100"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 text-gray-800">
              <ShoppingBag className="inline mr-3" />
              Coming Soon
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Merchandise drops to spread positivity everywhere
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {['Stickers', 'Posters', 'T-Shirts', 'Hats', 'Mugs', 'Pins'].map((item, index) => (
                <motion.div
                  key={item}
                  className="bg-white p-6 rounded-2xl shadow-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Gift className="mx-auto mb-4 text-pink-500" size={40} />
                  <h3 className="font-semibold text-lg">{item}</h3>
                  <p className="text-gray-500 text-sm mt-2">Coming soon...</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="py-8 px-4 bg-gray-800 text-white text-center">
          <p>&copy; 2025 Think Nice Now. Spreading positivity, one message at a time.</p>
        </footer>
      </div>
    </div>
  );
};

export default ThinkNiceNow;