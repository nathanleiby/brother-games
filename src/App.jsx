import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import "./App.css";

function App() {
  const [showBox, setShowBox] = useState(true);
  const [items, setItems] = useState(["Item 1", "Item 2", "Item 3"]);

  const addItem = () => {
    setItems([...items, `Item ${items.length + 1}`]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="app">
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="header"
      >
        <h1>Motion for React Demo</h1>
        <p>Exploring the power of Motion animations</p>
      </motion.header>

      <main className="main">
        {/* Enter Animation Section */}
        <section className="section">
          <h2>Enter Animations</h2>
          <div className="demo-grid">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="demo-box"
            >
              Spring Animation
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="demo-box"
            >
              Slide In
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="demo-box"
            >
              Fade Up
            </motion.div>
          </div>
        </section>

        {/* Gestures Section */}
        <section className="section">
          <h2>Gesture Animations</h2>
          <div className="demo-grid">
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "#ff6b6b" }}
              whileTap={{ scale: 0.95 }}
              className="demo-button"
            >
              Hover & Tap Me
            </motion.button>

            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="demo-box"
            >
              Hover to Rotate
            </motion.div>

            <motion.div
              whileHover={{
                scale: 1.2,
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
              }}
              className="demo-box"
            >
              Hover to Scale
            </motion.div>
          </div>
        </section>

        {/* Scroll Animations Section */}
        <section className="section">
          <h2>Scroll Animations</h2>
          <div className="scroll-container">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="scroll-item"
              >
                Scroll Item {i + 1}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Exit Animations Section */}
        <section className="section">
          <h2>Exit Animations</h2>
          <div className="demo-grid">
            <button
              onClick={() => setShowBox(!showBox)}
              className="demo-button"
            >
              {showBox ? "Hide" : "Show"} Box
            </button>

            <AnimatePresence>
              {showBox && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0, rotate: 180 }}
                  transition={{ duration: 0.5 }}
                  className="demo-box"
                >
                  Animated Box
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Layout Animations Section */}
        <section className="section">
          <h2>Layout Animations</h2>
          <div className="layout-demo">
            <button onClick={addItem} className="demo-button">
              Add Item
            </button>

            <div className="items-container">
              {items.map((item, index) => (
                <motion.div
                  key={item}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="layout-item"
                  onClick={() => removeItem(index)}
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Motion Values Section */}
        <section className="section">
          <h2>Motion Values</h2>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              backgroundColor: ["#ff6b6b", "#4ecdc4", "#45b7d1"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="motion-value-box"
          >
            Continuous Animation
          </motion.div>
        </section>
      </main>
    </div>
  );
}

export default App;
