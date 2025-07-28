import { motion } from "motion/react";
import { useNavigate, useLocation } from "react-router-dom";

const Navigation = ({ currentMode, setCurrentMode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleModeChange = (mode) => {
    setCurrentMode(mode);
    if (mode === "story") {
      navigate("/");
    } else {
      navigate("/shelf");
    }
  };

  const handleBrandClick = () => {
    if (location.pathname === "/" && currentMode === "story") {
      // Already in story view, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Navigate to story view
      handleModeChange("story");
    }
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <motion.div
          className="nav-brand"
          onClick={handleBrandClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <h1>Brother Games</h1>
          <span className="subtitle">20+ Years of Gaming Memories</span>
        </motion.div>

        <div className="nav-modes">
          {location.pathname === "/" ? (
            <motion.button
              className="game-shelf-link"
              onClick={() => handleModeChange("shelf")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              Game Shelf
            </motion.button>
          ) : (
            <motion.button
              className="game-shelf-link"
              onClick={() => handleModeChange("story")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              Story
            </motion.button>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navigation;
