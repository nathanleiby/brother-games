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

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, type: "spring" }}
      className="navigation"
    >
      <div className="nav-container">
        <motion.div
          className="nav-brand"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <h1>Brother Games</h1>
          <span className="subtitle">20+ Years of Gaming Memories</span>
        </motion.div>

        <div className="nav-modes">
          <motion.button
            className={`mode-button ${currentMode === "story" ? "active" : ""}`}
            onClick={() => handleModeChange("story")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <span className="mode-icon">📖</span>
            Story Scroll
          </motion.button>

          <motion.button
            className={`mode-button ${currentMode === "shelf" ? "active" : ""}`}
            onClick={() => handleModeChange("shelf")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <span className="mode-icon">🎮</span>
            Game Shelf
          </motion.button>
        </div>

        <div className="nav-progress">
          {location.pathname === "/" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="progress-indicator"
            >
              <span>Timeline: 2004-2025</span>
            </motion.div>
          )}
          {location.pathname === "/shelf" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="progress-indicator"
            >
              <span>Browse Collection</span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
