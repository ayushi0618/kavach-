import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, X, Play, ShieldAlert } from 'lucide-react';

import SlideWelcome from '../slides/SlideWelcome';
import SlideIntro from '../slides/SlideIntro';
import SlideWorkflow from '../slides/SlideWorkflow';
import SlideExecSummary from '../slides/SlideExecSummary';

const slides = [
  { id: 'welcome', component: SlideWelcome },
  { id: 'intro', component: SlideIntro },
  { id: 'workflow', component: SlideWorkflow },
  { id: 'summary', component: SlideExecSummary },
];

export default function PresentationEngine() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) setCurrentSlide(c => c + 1);
  };
  const handlePrev = () => {
    if (currentSlide > 0) setCurrentSlide(c => c - 1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'Space') handleNext();
    if (e.key === 'ArrowLeft') handlePrev();
    if (e.key === 'Escape') navigate('/');
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const CurrentComponent = slides[currentSlide].component;

  return (
    <div className="fixed inset-0 bg-white overflow-hidden text-gray-800 font-sans flex flex-col z-[200]">
      {/* Disclaimer */}
      <div className="absolute top-4 left-4 z-50 flex items-center gap-2 bg-black/50 text-white px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm">
        <ShieldAlert size={14} className="text-khaki" />
        Sample Demonstration Data
      </div>

      {/* Main Slide Area */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full"
          >
            <CurrentComponent />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Presentation Controls Overlay */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white shadow-2xl px-6 py-3 rounded-full border border-gray-200 z-50">
        <button onClick={handlePrev} disabled={currentSlide === 0} className="p-2 text-olive disabled:opacity-30 hover:bg-gray-100 rounded-full transition">
          <ChevronLeft size={24} />
        </button>
        
        <div className="text-sm font-bold text-gray-500 w-24 text-center">
          Slide {currentSlide + 1} / {slides.length}
        </div>

        <button onClick={handleNext} disabled={currentSlide === slides.length - 1} className="p-2 text-olive disabled:opacity-30 hover:bg-gray-100 rounded-full transition">
          <ChevronRight size={24} />
        </button>
        
        <div className="w-px h-6 bg-gray-300 mx-2"></div>
        
        <button onClick={() => navigate('/')} className="text-sm font-bold text-danger hover:underline">
          Exit Tour
        </button>
      </div>
    </div>
  );
}
