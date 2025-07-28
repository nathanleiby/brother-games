import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { gamesData } from '../data/gamesData';

const MemoriesCamera = ({ gameId, onMemoriesOpen, context = "default" }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Find the game data
  const game = gamesData.find(g => g.id === gameId);
  
  // Only show camera if game has memories or screenshots
  if (!game || (!game.memories?.length && !game.screenshots?.length)) {
    return null;
  }

  // Create carousel items - prioritize screenshots, fallback to text memories
  const carouselItems = [];
  
  if (game.screenshots?.length > 0) {
    game.screenshots.forEach((screenshot, index) => {
      carouselItems.push({
        type: 'screenshot',
        content: screenshot,
        description: game.memories?.[index] || null
      });
    });
  } else if (game.memories?.length > 0) {
    game.memories.forEach((memory) => {
      carouselItems.push({
        type: 'memory',
        content: memory
      });
    });
  }

  const handleCameraClick = () => {
    setShowModal(true);
    setCurrentIndex(0);
    onMemoriesOpen?.(gameId);
  };

  const handleCloseModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowModal(false);
  };

  const nextItem = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
  };

  const prevItem = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') nextItem();
    if (e.key === 'ArrowLeft') prevItem();
    if (e.key === 'Escape') handleCloseModal(e);
  };

  return (
    <>
      <motion.div
        className={`memories-camera ${context === "story" ? "memories-camera-story" : "memories-camera-detail"}`}
        onClick={handleCameraClick}
        whileHover={{ scale: 1.2, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 1 }}
      >
        📸
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="memories-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <motion.div
              className="memories-carousel-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="carousel-header">
                <h3>{game.title}</h3>
                <div className="carousel-counter">
                  {currentIndex + 1} / {carouselItems.length}
                </div>
                <button onClick={handleCloseModal}>×</button>
              </div>
              
              <div className="carousel-content">
                {carouselItems.length > 1 && (
                  <button className="carousel-nav carousel-prev" onClick={prevItem}>
                    ←
                  </button>
                )}
                
                <div className="carousel-item">
                  {carouselItems[currentIndex]?.type === 'screenshot' ? (
                    <div className="carousel-screenshot">
                      <img 
                        src={`${import.meta.env.BASE_URL}screenshots/${carouselItems[currentIndex].content}`}
                        alt={`${game.title} screenshot ${currentIndex + 1}`}
                        className="carousel-image"
                        onError={(e) => {
                          console.error(`Failed to load screenshot: ${carouselItems[currentIndex].content}`);
                          e.target.style.display = 'none';
                        }}
                      />
                      {carouselItems[currentIndex].description && (
                        <div className="carousel-description">
                          {carouselItems[currentIndex].description}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="carousel-memory">
                      <div className="memory-text">
                        {carouselItems[currentIndex]?.content}
                      </div>
                    </div>
                  )}
                </div>
                
                {carouselItems.length > 1 && (
                  <button className="carousel-nav carousel-next" onClick={nextItem}>
                    →
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MemoriesCamera;