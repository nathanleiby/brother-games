import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import "./App.css";

// Components
import Navigation from "./components/Navigation";
import StoryScroll from "./pages/StoryScroll";
import GameShelf from "./pages/GameShelf";
import GameDetail from "./pages/GameDetail";

function App() {
  const [currentMode, setCurrentMode] = useState("story");

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
      </div>
    </Router>
  );
}

export default App;
