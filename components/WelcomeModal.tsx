import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGetStarted: () => void;
  isNewUser: boolean;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose, onGetStarted, isNewUser }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            onGetStarted();
        } else if (event.key === 'Escape') {
            if (!isNewUser) {
                event.preventDefault();
                onClose();
            }
        }
    };
    if (isOpen) {
        document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
        document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onGetStarted, onClose, isNewUser]);

  return (
    <AnimatePresence>
      {isOpen && (
      /* @ts-ignore */
      <motion.div
        className="fixed inset-0 bg-[var(--bg-backdrop)] backdrop-blur-sm z-50 flex justify-center items-start overflow-y-auto"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <style>{`
          @keyframes wave {
              0% { transform: rotate( 0.0deg) }
              10% { transform: rotate(14.0deg) }
              20% { transform: rotate(-8.0deg) }
              30% { transform: rotate(14.0deg) }
              40% { transform: rotate(-4.0deg) }
              50% { transform: rotate(10.0deg) }
              60% { transform: rotate( 0.0deg) }
              100% { transform: rotate( 0.0deg) }
          }
          .animate-wave {
              animation-name: wave;
              animation-duration: 2.5s;
              animation-iteration-count: infinite;
              transform-origin: 70% 70%;
              display: inline-block;
          }
        `}</style>
        {/* @ts-ignore */}
        <motion.div
          className="bg-[var(--card-bg)] rounded-b-3xl sm:rounded-3xl shadow-xl w-full max-w-md p-6 text-[var(--text-primary)] text-center sm:my-16"
          onClick={e => e.stopPropagation()}
          initial={{ y: '-100vh', opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 30, delay: 0.1 } }}
          exit={{ y: '-100vh', opacity: 0, transition: { duration: 0.2 } }}
        >
          <div className="mb-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center shadow-lg">
                  <span className="text-4xl animate-wave">👋</span>
              </div>
          </div>
          <h2 className="text-3xl font-bold mb-4">Welcome!</h2>
          <p className="text-lg text-[var(--text-secondary)] mb-8">
            {isNewUser 
              ? "We're excited to help you manage chores and pocket money!"
              : "Welcome back! Ready to manage some chores?"
            }
          </p>
          <button
            onClick={onGetStarted}
            className="w-full py-3 px-6 rounded-xl bg-[var(--accent-primary)] text-[var(--accent-primary-text)] font-bold text-lg hover:bg-[var(--accent-secondary)] transition-colors shadow-lg"
          >
            Get Started
          </button>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeModal;