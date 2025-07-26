import { motion } from "motion/react";
import { gamesData } from "../data/gamesData";

const SpecialSections = () => {
  // Identify pandemic era games (2020-2021)
  const pandemicGames = gamesData.filter(game => 
    game.year >= 2020 && game.year <= 2021
  );

  // Platform evolution timeline
  const platformEvolution = [
    {
      era: "PBEM Era",
      years: "2004-2007",
      platform: "Email",
      games: ["Alpha Centauri", "Weewar"],
      description: "Turn-based strategy via email attachments"
    },
    {
      era: "Early Online",
      years: "2008-2015", 
      platform: "Steam + Skype",
      games: ["Left 4 Dead", "Borderlands", "Risk of Rain"],
      description: "Real-time co-op with voice chat"
    },
    {
      era: "Modern Era",
      years: "2016-2025",
      platform: "Discord + Steam",
      games: ["Factorio", "Terraria", "Generation Zero"],
      description: "Seamless communication and game integration"
    }
  ];

  // Geographic journey
  const geographicJourney = [
    {
      period: "The Beginning",
      years: "2004-2008",
      locations: ["Boston", "Oakland"],
      description: "Coast to coast gaming begins",
      games: ["Diablo", "Alpha Centauri", "Neverwinter Nights"]
    },
    {
      period: "The Expansion",
      years: "2009-2018",
      locations: ["Durham", "SF"],
      description: "New cities, same brotherhood",
      games: ["Borderlands", "Risk of Rain", "Factorio"]
    },
    {
      period: "The Convergence",
      years: "2019-2025",
      locations: ["Seattle"],
      description: "Finally in the same timezone",
      games: ["Terraria", "Generation Zero", "PlanetCrafter"]
    }
  ];

  return (
    <>
      {/* Pandemic Era Section */}
      <motion.section
        className="special-section pandemic-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="special-content">
          <motion.div
            className="section-header"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h2>🦠 The Pandemic Era (2020-2021)</h2>
            <p className="section-subtitle">
              When the world stopped, gaming kept us connected
            </p>
          </motion.div>

          <div className="pandemic-games">
            {pandemicGames.map((game, index) => (
              <motion.div
                key={game.id}
                className="pandemic-game"
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.2, duration: 0.8 }}
              >
                <div className="game-info">
                  <h3>{game.title}</h3>
                  <p>{game.description}</p>
                  <div className="memories">
                    {game.memories.map((memory, memIndex) => (
                      <span key={memIndex} className="memory-chip">
                        {memory}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="pandemic-reflection"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <p>
              "Distance meant nothing when we had good games. While the world went into lockdown, 
              we found new worlds to explore together."
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Platform Evolution Section */}
      <motion.section
        className="special-section platform-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="special-content">
          <motion.div
            className="section-header"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h2>📱 Platform Evolution</h2>
            <p className="section-subtitle">
              From email attachments to instant everything
            </p>
          </motion.div>

          <div className="platform-timeline">
            {platformEvolution.map((era, index) => (
              <motion.div
                key={era.era}
                className="platform-era"
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.3, duration: 0.8 }}
              >
                <div className="era-header">
                  <h3>{era.era}</h3>
                  <span className="era-years">{era.years}</span>
                </div>
                <div className="era-platform">
                  <strong>{era.platform}</strong>
                </div>
                <p className="era-description">{era.description}</p>
                <div className="era-games">
                  {era.games.map((gameName, gameIndex) => (
                    <span key={gameIndex} className="era-game">
                      {gameName}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Geographic Journey Section */}
      <motion.section
        className="special-section geography-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="special-content">
          <motion.div
            className="section-header"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h2>🗺️ The Geographic Journey</h2>
            <p className="section-subtitle">
              Following the games across the continent
            </p>
          </motion.div>

          <div className="geography-timeline">
            {geographicJourney.map((period, index) => (
              <motion.div
                key={period.period}
                className="geography-period"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.3, duration: 0.8 }}
              >
                <div className="period-header">
                  <h3>{period.period}</h3>
                  <span className="period-years">{period.years}</span>
                </div>
                <div className="period-locations">
                  {period.locations.map((location, locIndex) => (
                    <span key={locIndex} className="location-badge">
                      📍 {location}
                    </span>
                  ))}
                </div>
                <p className="period-description">{period.description}</p>
                <div className="period-games">
                  {period.games.map((gameName, gameIndex) => (
                    <span key={gameIndex} className="period-game">
                      {gameName}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="geography-reflection"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <p>
              "From 3,000 miles apart to the same city - the games brought us together 
              long before geography ever could."
            </p>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};

export default SpecialSections;