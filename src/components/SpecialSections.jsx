import { motion } from "motion/react";
import { gamesData } from "../data/gamesData";

const SpecialSections = () => {
  // Identify pandemic era games (2020-2021)
  const pandemicGames = gamesData.filter(game => 
    game.year >= 2020 && game.year <= 2021
  );


  return (
    <>
      {/* Pandemic Era Section */}
      <motion.section
        className="special-section pandemic-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="special-content">
          <div className="section-header">
            <h2>🦠 The Pandemic Era (2020-2021)</h2>
            <p className="section-subtitle">
              When the world stopped, gaming kept us connected
            </p>
          </div>

          <div className="pandemic-games">
            {pandemicGames.map((game) => (
              <div
                key={game.id}
                className="pandemic-game"
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
              </div>
            ))}
          </div>

          <div className="pandemic-reflection">
            <p>
              "Distance meant nothing when we had good games. While the world went into lockdown, 
              we found new worlds to explore together."
            </p>
          </div>
        </div>
      </motion.section>

    </>
  );
};

export default SpecialSections;