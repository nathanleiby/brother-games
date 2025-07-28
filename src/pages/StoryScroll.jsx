import { motion, useScroll, useTransform } from "motion/react";
import { useNavigate } from "react-router-dom";
import { gamesData } from "../data/gamesData";
import MemoriesCamera from "../components/EasterEggs";

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
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Brother Games
          </h1>
          <p className="hero-subtitle">
            Across 20 years and a lot of distance, we've played a lot of games together and kept in touch...
          </p>

        </div>
      </section>

      {/* Timeline Progress */}
      <motion.div
        className="timeline-progress"
        style={{
          scaleX: scrollYProgress,
          transformOrigin: "0%",
        }}
      />

      {/* Game Chapters with Special Sections */}
      {sortedGames.map((game, index) => (
        <div key={`game-${game.id}`} id={`game-${game.id}`}>
        <section
          className="game-chapter"
          style={{
            backgroundImage: game.headerImage ? `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${game.headerImage})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Memories Camera */}
          <MemoriesCamera gameId={game.id} context="story" />
          
          <div className="chapter-content">
            <div
              className="chapter-header clickable-title"
              onClick={() => handleGameClick(game.id)}
            >
              <h2 className="game-title">{game.title}</h2>
              <div className="game-meta">
                <span className="year">{game.year}</span>
              </div>
            </div>
          </div>
        </section>
        </div>
      ))}

      {/* Final Section */}
      <section className="final-section">
        <div className="final-content">
          <h2>The Journey Continues</h2>
          <p>Twenty years of gaming together</p>
          <div
            className="collection-link"
            onClick={handleShelfClick}
          >
            Explore Game Shelf →
          </div>
        </div>
      </section>
    </div>
  );
};

export default StoryScroll;
