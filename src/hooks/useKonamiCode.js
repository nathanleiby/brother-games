import { useEffect, useState } from 'react';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA'
];

export const useKonamiCode = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [sequence, setSequence] = useState([]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const newSequence = [...sequence, event.code].slice(-KONAMI_CODE.length);
      setSequence(newSequence);

      if (newSequence.join(',') === KONAMI_CODE.join(',')) {
        setIsUnlocked(true);
        // Show celebration animation
        const celebration = document.createElement('div');
        celebration.innerHTML = '🎮 BROTHER GAMES MASTER UNLOCKED! 🎮';
        celebration.style.cssText = `
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: linear-gradient(135deg, #64ffda, #00bcd4);
          color: #1a1a2e;
          padding: 2rem;
          border-radius: 12px;
          font-size: 1.5rem;
          font-weight: bold;
          z-index: 10000;
          text-align: center;
          box-shadow: 0 10px 30px rgba(100, 255, 218, 0.5);
          animation: konami-celebration 3s ease-out forwards;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
          @keyframes konami-celebration {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
            50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
            100% { opacity: 0; transform: translate(-50%, -50%) scale(1); }
          }
        `;
        document.head.appendChild(style);
        document.body.appendChild(celebration);
        
        setTimeout(() => {
          document.body.removeChild(celebration);
          document.head.removeChild(style);
        }, 3000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sequence]);

  return isUnlocked;
};