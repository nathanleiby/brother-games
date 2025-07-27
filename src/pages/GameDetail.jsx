import { motion } from "motion/react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { gamesData } from "../data/gamesData";
import EasterEggs from "../components/EasterEggs";

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
      {/* Easter Egg */}
      <EasterEggs gameId={game.id} />
      {/* Navigation */}
      <div className="detail-navigation">
        <motion.button
          className="back-button"
          onClick={handleBackClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Back to Shelf
        </motion.button>
        <motion.button
          className="story-button"
          onClick={handleStoryClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View in Story Mode
        </motion.button>
      </div>

      {/* Compact Game Header */}
      <div className="compact-game-header">
        <div className="header-main-content">
          <div className="compact-header-image">
            {game.headerImage && !imageError ? (
              <img 
                src={game.headerImage} 
                alt={game.title}
                loading="lazy"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="image-placeholder">
                <span>{game.title}</span>
              </div>
            )}
          </div>
          
          <div className="header-info">
            <div className="title-section">
              <h1 className="compact-game-title">{game.title}</h1>
              <span className="compact-year">{game.year}</span>
            </div>
            
            {game.description && (
              <p className="compact-description">{game.description}</p>
            )}

            <div className="compact-badges">
              {/* Locations */}
              <div className="badge-group">
                <span className="badge-label">Cities:</span>
                {game.locations.map((location) => (
                  <span key={location} className="compact-badge location">
                    {location}
                  </span>
                ))}
              </div>

              {/* Tags */}
              <div className="badge-group">
                <span className="badge-label">Tags:</span>
                {game.tags.map((tag) => (
                  <span key={tag} className="compact-badge tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Special Notes and Play Style */}
            {(game.specialNote || game.playStyle) && (
              <div className="compact-notes">
                {game.playStyle && (
                  <p><strong>Play Style:</strong> {game.playStyle}</p>
                )}
                {game.specialNote && (
                  <p><strong>Note:</strong> {game.specialNote}</p>
                )}
              </div>
            )}

            {/* Related Games - Inline */}
            <div className="inline-related">
              <h4>Related Games</h4>
              <div className="related-chips">
                {gamesData
                  .filter(
                    (g) =>
                      g.id !== game.id &&
                      (g.year === game.year ||
                        g.tags.some((t) => game.tags.includes(t)))
                  )
                  .slice(0, 8)
                  .map((relatedGame) => (
                    <span
                      key={relatedGame.id}
                      className="related-chip"
                      onClick={() => navigate(`/game/${relatedGame.id}`)}
                    >
                      {relatedGame.title} ({relatedGame.year})
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Screenshots Gallery - Full Width */}
      {game.images?.screenshots && game.images.screenshots.length > 0 && (
        <div className="compact-screenshots-full">
          <h3>Screenshots</h3>
          <div className="compact-screenshots-grid-full">
            {game.images.screenshots.slice(0, 6).map((screenshot, index) => (
              <div key={index} className="compact-screenshot">
                <img 
                  src={screenshot}
                  alt={`${game.title} screenshot ${index + 1}`}
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div class="screenshot-placeholder">Screenshot unavailable</div>';
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default GameDetail;
