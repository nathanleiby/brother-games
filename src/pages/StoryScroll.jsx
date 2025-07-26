import { motion, useScroll, useTransform } from "motion/react";
import { useNavigate } from "react-router-dom";
import { gamesData } from "../data/gamesData";

const StoryScroll = ({ setCurrentMode }) => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();

  const sortedGames = [...gamesData].sort((a, b) => a.year - b.year);
  const totalGames = sortedGames.length;

  const handleGameClick = (gameId) => {
    navigate(`/game/${gameId}`);
  };

  const handleShelfClick = () => {
    setCurrentMode("shelf");
    navigate("/shelf");
  };

  return (
    <div className="story-scroll">
      {/* Hero Section */}
      <motion.section
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="hero-content">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="hero-title"
          >
            Brother Games
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="hero-subtitle"
          >
            A 20+ year journey through gaming memories
          </motion.p>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="hero-description"
          >
            From Diablo in 2004 to today, explore the games that shaped our
            brotherhood
          </motion.p>

          <motion.button
            className="shelf-button"
            onClick={handleShelfClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            Browse Game Shelf
          </motion.button>
        </div>
      </motion.section>

      {/* Timeline Progress */}
      <motion.div
        className="timeline-progress"
        style={{
          scaleX: scrollYProgress,
          transformOrigin: "0%",
        }}
      />

      {/* Game Chapters */}
      {sortedGames.map((game, index) => (
        <motion.section
          key={game.id}
          className="game-chapter"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="chapter-content">
            <motion.div
              className="chapter-header"
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h2 className="game-title">{game.title}</h2>
              <div className="game-meta">
                <span className="year">{game.year}</span>
                <span className="platforms">{game.platforms.join(", ")}</span>
              </div>
            </motion.div>

            <motion.div
              className="chapter-body"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="game-description">{game.description}</p>

              <div className="memories">
                <h3>Memories</h3>
                <ul>
                  {game.memories.map((memory, memIndex) => (
                    <motion.li
                      key={memIndex}
                      initial={{ x: -50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.7 + memIndex * 0.1,
                      }}
                      viewport={{ once: true }}
                    >
                      {memory}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="game-locations">
                <h3>Where We Played</h3>
                <div className="location-tags">
                  {game.locations.map((location, locIndex) => (
                    <motion.span
                      key={locIndex}
                      className="location-tag"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.8 + locIndex * 0.1,
                      }}
                      viewport={{ once: true }}
                    >
                      {location}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.button
              className="explore-button"
              onClick={() => handleGameClick(game.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              viewport={{ once: true }}
            >
              Explore {game.title}
            </motion.button>
          </div>
        </motion.section>
      ))}

      {/* Final Section */}
      <motion.section
        className="final-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="final-content">
          <h2>The Journey Continues</h2>
          <p>More games, more memories, more brotherhood</p>
          <motion.button
            className="shelf-button"
            onClick={handleShelfClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Our Full Collection
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
};

export default StoryScroll;
