import { motion } from "motion/react";
import { useParams, useNavigate } from "react-router-dom";
import { gamesData } from "../data/gamesData";

const GameDetail = ({ setCurrentMode }) => {
  const { gameId } = useParams();
  const navigate = useNavigate();

  const game = gamesData.find((g) => g.id === gameId);

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
  };

  return (
    <motion.div
      className="game-detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
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

      {/* Game Header */}
      <motion.div
        className="game-header"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {game.headerImage && (
          <div className="header-image">
            <img 
              src={game.headerImage} 
              alt={game.title}
              loading="lazy"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}
        
        <div className="header-content">
          <h1 className="game-title">{game.title}</h1>
          <div className="game-meta">
            <span className="year">{game.year}</span>
            <span className="epic-level">
              Epic Memory Level: {game.epicMemoryLevel}/10
            </span>
          </div>
          <p className="game-description">{game.description}</p>
        </div>
      </motion.div>

      {/* Game Info Grid */}
      <motion.div
        className="game-info-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        {/* Platforms */}
        <div className="info-section">
          <h3>Platforms</h3>
          <div className="platforms-list">
            {game.platforms.map((platform) => (
              <span key={platform} className="platform-badge">
                {platform}
              </span>
            ))}
          </div>
        </div>

        {/* Locations */}
        <div className="info-section">
          <h3>Where We Played</h3>
          <div className="locations-list">
            {game.locations.map((location) => (
              <span key={location} className="location-badge">
                {location}
              </span>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="info-section">
          <h3>Tags</h3>
          <div className="tags-list">
            {game.tags.map((tag) => (
              <span key={tag} className="tag-badge">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Special Notes */}
        {game.specialNote && (
          <div className="info-section special-note">
            <h3>Special Note</h3>
            <p>{game.specialNote}</p>
          </div>
        )}

        {game.playStyle && (
          <div className="info-section">
            <h3>Play Style</h3>
            <p>{game.playStyle}</p>
          </div>
        )}
      </motion.div>

      {/* Memories Section */}
      <motion.div
        className="memories-section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <h2>Memories</h2>
        <div className="memories-list">
          {game.memories.map((memory, index) => (
            <motion.div
              key={index}
              className="memory-item"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
            >
              <div className="memory-content">
                <span className="memory-text">{memory}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Screenshots Gallery */}
      {game.images?.screenshots && game.images.screenshots.length > 0 && (
        <motion.div
          className="screenshots-section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <h2>Screenshots</h2>
          <div className="screenshots-grid">
            {game.images.screenshots.map((screenshot, index) => (
              <motion.div
                key={index}
                className="screenshot-item"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                <img 
                  src={screenshot}
                  alt={`${game.title} screenshot ${index + 1}`}
                  loading="lazy"
                  onError={(e) => {
                    e.target.parentElement.style.display = 'none';
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Related Games */}
      <motion.div
        className="related-games"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        <h2>Related Games</h2>
        <div className="related-grid">
          {gamesData
            .filter(
              (g) =>
                g.id !== game.id &&
                (g.year === game.year ||
                  g.platforms.some((p) => game.platforms.includes(p)) ||
                  g.tags.some((t) => game.tags.includes(t)))
            )
            .slice(0, 3)
            .map((relatedGame) => (
              <motion.div
                key={relatedGame.id}
                className="related-card"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/game/${relatedGame.id}`)}
              >
                <h4>{relatedGame.title}</h4>
                <span className="related-year">{relatedGame.year}</span>
                <p>{relatedGame.description}</p>
              </motion.div>
            ))}
        </div>
      </motion.div>

      {/* Navigation Footer */}
      <motion.div
        className="detail-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        <div className="footer-actions">
          <button onClick={handleBackClick}>← Back to Shelf</button>
          <button onClick={handleStoryClick}>View in Story Mode</button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GameDetail;
