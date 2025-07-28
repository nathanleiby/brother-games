import { motion } from "motion/react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { gamesData } from "../data/gamesData";
import MemoriesCamera from "../components/EasterEggs";
import GameTile from "../components/GameTile";

const GameDetail = ({ setCurrentMode }) => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const game = gamesData.find((g) => g.id === gameId);

  // Reset image error when game changes
  useEffect(() => {
    setImageError(false);
  }, [gameId]);

  if (!game) {
    return (
      <div className="game-detail error">
        <h2>Game not found</h2>
        <button onClick={() => navigate("/shelf")}>Back to Game Shelf</button>
      </div>
    );
  }

  const handleBackClick = () => {
    navigate("/shelf");
  };

  const handleStoryClick = () => {
    setCurrentMode("story");
    navigate("/");
    // Scroll to the specific game section after navigation
    setTimeout(() => {
      const gameElement = document.getElementById(`game-${gameId}`);
      if (gameElement) {
        gameElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }, 100);
  };

  return (
    <motion.div className="game-detail">
      {/* Game Info Grid */}
      <div className="game-info-compact">
        {/* Main Content Area */}
        <div className="game-main-content">
          {/* Hero Game Image */}
          <div className="game-hero">
            <div className="hero-image-container">
              {game.headerImage && !imageError ? (
                <img 
                  src={game.headerImage} 
                  alt={game.title}
                  loading="lazy"
                  onError={() => setImageError(true)}
                  className="hero-image"
                />
              ) : (
                <div className="hero-placeholder">
                  <span>{game.title}</span>
                </div>
              )}
            </div>
          </div>

          {/* Content Sections */}
          <div className="game-content-right">
            {/* Game Title */}
            <div className="game-title-section">
              <div className="title-with-camera">
                <div className="title-content">
                  <h1 className="game-detail-title">{game.title}</h1>
                  <span className="game-detail-year">{game.year}</span>
                </div>
                <MemoriesCamera gameId={game.id} />
              </div>
            </div>
            {/* Description */}
            {game.description && (
              <div className="description-card">
                <p>{game.description}</p>
              </div>
            )}
            
            {/* Meta Info */}
            <div className="meta-cards">
              <div className="meta-card">
                <h4>Cities</h4>
                <div className="meta-tags">
                  {game.locations.map((location) => (
                    <span key={location} className="meta-tag location">
                      {location}
                    </span>
                  ))}
                </div>
              </div>

              <div className="meta-card">
                <h4>Tags</h4>
                <div className="meta-tags">
                  {game.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="meta-tag tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>


          </div>
        </div>

        {/* Related Games - Full Width */}
        <div className="related-section">
          <h3>Related Games</h3>
          <div className="related-tiles">
            {gamesData
              .filter(
                (g) =>
                  g.id !== game.id &&
                  (g.year === game.year ||
                    g.tags.some((t) => game.tags.includes(t)))
              )
              .sort((a, b) => {
                // Create deterministic "random" order based on game ID
                const seedA = game.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                const seedB = a.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                const seedC = b.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                return (seedA + seedB) % 100 - (seedA + seedC) % 100;
              })
              .slice(0, 5)
              .map((relatedGame) => (
                <GameTile
                  key={relatedGame.id}
                  game={relatedGame}
                  className="related-tile"
                />
              ))}
          </div>
        </div>
      </div>

      {/* Bottom Corner Navigation */}
      <div className="bottom-navigation">
        <motion.button
          className="back-button bottom-nav-button"
          onClick={handleBackClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Back to Shelf
        </motion.button>
        <motion.button
          className="story-button bottom-nav-button"
          onClick={handleStoryClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View in Story Mode
        </motion.button>
      </div>
    </motion.div>
  );
};

export default GameDetail;
