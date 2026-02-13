import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Stars, MoveRight, RotateCcw } from 'lucide-react';
import HeartBackground from './components/HeartBackground';
import begGif from './assets/beg.gif';
import happyGif from './assets/happy.gif';

function App() {
  const [accepted, setAccepted] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0 });

  const handleYes = () => {
    setAccepted(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff7eb3', '#ff758c', '#ffffff'],
    });
    
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff7eb3', '#ff758c', '#ffffff']
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff7eb3', '#ff758c', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const handleNoHover = () => {
    const x = Math.random() * (window.innerWidth - 100) - (window.innerWidth / 2 - 50);
    const y = Math.random() * (window.innerHeight - 100) - (window.innerHeight / 2 - 50);
    setNoBtnPos({ x, y });
    setNoCount(prev => prev + 1);
  };

  const noPhrases = [
    "No",
    "Apa bener?",
    "Yakin bener?",
    "Yakin????",
    "Yakin nda mau?",
    "YAKIN NDA MAU???",
    "Dahlah",
    "Bukan glen orgnya",
    "Dahlah",
    "Bukan glen orgnya",
    "Dahlah",
  ];

  const getNoText = () => {
    return noPhrases[Math.min(noCount, noPhrases.length - 1)];
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <HeartBackground />
      
      {/* Floating "No" Button (when active) */}
      <AnimatePresence>
        {!accepted && noCount > 0 && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              x: noBtnPos.x, 
              y: noBtnPos.y,
              scale: 1, 
              opacity: 1 
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onHoverStart={handleNoHover}
            onClick={handleNoHover}
            className="fixed z-50 px-8 py-4 bg-gray-100/90 backdrop-blur-sm text-gray-500 font-bold rounded-full text-xl hover:bg-gray-200 transition-colors shadow-lg border border-gray-200 cursor-pointer whitespace-nowrap"
            style={{ 
              left: '50%', 
              top: '50%',
              transform: 'translate(-50%, -50%)' // Center initial reference point
            }}
          >
            {getNoText()}
          </motion.button>
        )}
      </AnimatePresence>
      
      <motion.div 
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="relative z-10 w-full max-w-lg"
      >
        {/* Card Container */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 shadow-2xl rounded-[2.5rem] p-8 md:p-12 text-center relative overflow-hidden">
          
          {/* Decorative Corner Elements */}
          <div className="absolute top-4 left-4 text-2xl animate-pulse">💝</div>
          <div className="absolute top-4 right-4 text-2xl animate-pulse delay-75">💝</div>
          <div className="absolute bottom-4 left-4 text-2xl animate-pulse delay-150">💝</div>
          <div className="absolute bottom-4 right-4 text-2xl animate-pulse delay-300">💝</div>

          <AnimatePresence mode="wait">
            {!accepted ? (
              <motion.div
                key="question"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="space-y-8 py-4"
              >
                <div className="flex justify-center mb-8">
                  <img 
                    src={begGif} 
                    alt="Please say yes" 
                    className="rounded-2xl shadow-xl border-4 border-pink-200 w-full max-w-[250px]"
                  />
                </div>
                
                <div className="space-y-2">
                  <h1 className="text-4xl md:text-5xl font-pacifico text-pink-600 leading-tight drop-shadow-sm">
                    Will you be my Valentine?
                  </h1>
                  <p className="text-gray-700 font-medium text-lg opacity-90">
                    Please say yes! 🥺
                  </p>
                </div>

                <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-8 min-h-[60px] relative z-20">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleYes}
                    className="group px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-full text-xl shadow-lg hover:shadow-pink-300/50 transition-all flex items-center gap-2 overflow-hidden relative"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Heart className="fill-current w-6 h-6 group-hover:animate-ping" /> Yes!
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </motion.button>

                  {/* Placeholder "No" Button (initial state only) */}
                  {noCount === 0 && (
                    <motion.button
                      onHoverStart={handleNoHover}
                      onClick={handleNoHover}
                      className="px-8 py-4 bg-gray-100/80 backdrop-blur-sm text-gray-500 font-bold rounded-full text-xl hover:bg-gray-200 transition-colors shadow-inner border border-gray-200"
                    >
                      No
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="space-y-6 py-8"
              >
                <div className="flex justify-center mb-8">
                  <img 
                    src={happyGif} 
                    alt="Yippee Cat" 
                    className="rounded-2xl shadow-xl border-4 border-pink-200 w-full max-w-[250px]"
                  />
                </div>

                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-pacifico text-pink-600 leading-tight">
                    Wooooo!!!
                  </h2>
                  <p className="text-xl md:text-2xl text-gray-700 font-medium">
                    Terima kasih Tessa sayang
                    <br />I love you so much! ❤️
                  </p>
                </div>

                <div className="pt-8 flex justify-center gap-4">
                  <Stars className="w-8 h-8 text-yellow-500 animate-spin-slow" />
                  <Heart className="w-8 h-8 text-red-500 fill-current animate-bounce" />
                  <Stars className="w-8 h-8 text-yellow-500 animate-spin-slow" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <footer className="fixed bottom-4 text-pink-800/40 text-sm font-medium z-50">
        <div className="flex flex-col items-center gap-2">
          {accepted && (
            <button 
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 text-pink-600 hover:text-pink-800 transition-colors text-sm font-bold bg-white/50 px-4 py-2 rounded-full shadow-sm hover:bg-white/80"
            >
              <RotateCcw className="w-4 h-4" />
              Main lagi?
            </button>
          )}
          <span>GBondz</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
