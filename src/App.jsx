import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import "./App.css";

// Components
import Navigation from "./components/Navigation";
import StoryScroll from "./pages/StoryScroll";
import GameShelf from "./pages/GameShelf";
import GameDetail from "./pages/GameDetail";
import BrotherhoodStats from "./components/BrotherhoodStats";

// Hooks
import { useKonamiCode } from "./hooks/useKonamiCode";

// Utils
import { preloadScreenshots } from "./utils/imagePreloader";

function App() {
  const [currentMode, setCurrentMode] = useState("story");
  const [showBrotherhoodStats, setShowBrotherhoodStats] = useState(false);
  const konamiUnlocked = useKonamiCode();

  // Preload all screenshots after initial render
  useEffect(() => {
    // Delay preloading to avoid blocking initial page load
    const timer = setTimeout(() => {
      preloadScreenshots();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Show Brotherhood Stats when Konami code is entered
  if (konamiUnlocked && !showBrotherhoodStats) {
    setShowBrotherhoodStats(true);
  }

  return (
    <Router>
      <div className="app">
        <Navigation currentMode={currentMode} setCurrentMode={setCurrentMode} />

        <AnimatePresence mode="wait">
          <Routes>
            <Route
              path="/"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <StoryScroll setCurrentMode={setCurrentMode} />
                </motion.div>
              }
            />
            <Route
              path="/shelf"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <GameShelf setCurrentMode={setCurrentMode} />
                </motion.div>
              }
            />
            <Route
              path="/game/:gameId"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <GameDetail setCurrentMode={setCurrentMode} />
                </motion.div>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>

        {/* Brotherhood Stats Modal */}
        <BrotherhoodStats
          isVisible={showBrotherhoodStats}
          onClose={() => setShowBrotherhoodStats(false)}
        />
      </div>
    </Router>
  );
}

export default App;
