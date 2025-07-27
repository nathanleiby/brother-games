import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { gamesData } from "../data/gamesData";

const GAMING_QUOTES = [
  "Just one more factory...",
  "Did you read the wiki for this yet?",
  "Wait, how do I throw this weapon to you?",
  "PBEM stands for Play By Email, right?",
  "Let's take a screenshot of this",
  "The bicycle physics in this game are amazing",
  "I've been thinking about optimal factory layouts...",
  "Should we start another campaign?",
  "This reminds me of that time in Borderlands...",
  "Wiki says we need to do this differently",
  "Photo shoot time!",
  "Remember when we played this on Xbox 360?",
  "Email strategy discussions incoming...",
  "One more turn... okay, actually one more turn",
  "Co-op mode activated",
  "Distance means nothing when you have good games"
];

const BrotherhoodStats = ({ isVisible, onClose }) => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [stats, setStats] = useState({});

  useEffect(() => {
    if (isVisible) {
      calculateStats();
      const interval = setInterval(() => {
        setCurrentQuote(prev => (prev + 1) % GAMING_QUOTES.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const calculateStats = () => {
    const years = gamesData.map(game => game.year);
    const platforms = [...new Set(gamesData.flatMap(game => game.platforms))];
    const locations = [...new Set(gamesData.flatMap(game => game.locations))];
    const tags = [...new Set(gamesData.flatMap(game => game.tags))];
    
    const coopGames = gamesData.filter(game => game.tags.includes('co-op'));
    const wikiGames = gamesData.filter(game => game.tags.includes('wiki'));
    const pbemGames = gamesData.filter(game => game.tags.includes('pbem'));
    
    const totalMemories = gamesData.reduce((sum, game) => sum + game.memories.length, 0);
    
    setStats({
      totalGames: gamesData.length,
      yearsActive: Math.max(...years) - Math.min(...years) + 1,
      platforms: platforms.length,
      locations: locations.length,
      coopGames: coopGames.length,
      wikiGames: wikiGames.length,
      pbemGames: pbemGames.length,
      totalMemories,
      longestCampaign: gamesData.find(game => game.yearRange)?.title || "Alpha Centauri"
    });
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className="brotherhood-stats-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="brotherhood-stats"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="stats-header">
          <h2>🎮 Brotherhood Gaming Stats 🎮</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="stats-grid">
          <div className="stat-item highlight">
            <span className="stat-number">{stats.totalGames}</span>
            <span className="stat-label">Epic Games Shared</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats.yearsActive}</span>
            <span className="stat-label">Years of Brotherhood</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats.locations}</span>
            <span className="stat-label">Cities Connected</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats.coopGames}</span>
            <span className="stat-label">Co-op Adventures</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats.wikiGames}</span>
            <span className="stat-label">Wiki Deep-Dives</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats.pbemGames}</span>
            <span className="stat-label">PBEM Campaigns</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats.totalMemories}</span>
            <span className="stat-label">Shared Memories</span>
          </div>
        </div>

        <div className="special-achievements">
          <div className="achievement">
            <span className="achievement-label">Longest Campaign:</span>
            <span className="achievement-value">{stats.longestCampaign}</span>
          </div>
        </div>

        <div className="gaming-quote">
          <motion.p
            key={currentQuote}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            "{GAMING_QUOTES[currentQuote]}"
          </motion.p>
        </div>

        <div className="easter-egg-note">
          <p>🥚 You found a secret! Use ↑↑↓↓←→←→BA to unlock this anytime</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BrotherhoodStats;