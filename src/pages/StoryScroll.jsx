import { motion, useScroll, useTransform } from "motion/react";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { gamesData } from "../data/gamesData";
import { getLocationEvents } from "../data/locationData";
import MemoriesCamera from "../components/EasterEggs";
import LocationEvent from "../components/LocationEvent";

const StoryScroll = ({ setCurrentMode }) => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  const sortedGames = [...gamesData].sort((a, b) => a.year - b.year);
  const locationEvents = getLocationEvents();

  // Merge games and location events, sorted by year
  const allItems = [...sortedGames.map(game => ({ ...game, type: 'game' })),
                    ...locationEvents].sort((a, b) => a.year - b.year);

  // Group adjacent location events by year
  const timelineItems = [];
  let i = 0;
  while (i < allItems.length) {
    const item = allItems[i];

    if (item.type === 'location_change') {
      // Look for other location changes in the same year
      const sameYearMoves = [item];
      let j = i + 1;
      while (j < allItems.length &&
             allItems[j].type === 'location_change' &&
             allItems[j].year === item.year) {
        sameYearMoves.push(allItems[j]);
        j++;
      }

      // Add combined or single location event
      timelineItems.push({
        type: 'location_group',
        year: item.year,
        events: sameYearMoves,
        id: `location-${item.year}-${sameYearMoves.map(e => e.person).join('-')}`
      });

      i = j;
    } else {
      timelineItems.push(item);
      i++;
    }
  }
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
        <div className={`envelope-container ${isEnvelopeOpen ? 'opened' : ''}`}>
          {/* Envelope */}
          {!isEnvelopeOpen && (
            <div className="envelope" onClick={() => setIsEnvelopeOpen(true)}>
              <div className="envelope-flap"></div>
              <div className="envelope-body">
                <div className="envelope-address">
                  <div className="to-line">To: Mike</div>
                  <div className="from-line">From: Nate & Nick</div>
                </div>
              </div>
            </div>
          )}
          
          {/* Letter Content */}
          {isEnvelopeOpen && (
            <div className="letter-content">
              <h1 className="letter-title">
                Happy 50th, Mike!
              </h1>
              <p className="letter-text">
                We thought it'd be fun to look back on 20+ years of gaming memories.
                We've both been very happy to have this regular chance to hang out, no matter where we are in the world.
              </p>
              <div className="letter-signature">
                <p className="letter-closing">Love,</p>
                <p className="letter-names">Nate and Nick</p>
              </div>
            </div>
          )}
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

      {/* Timeline Items */}
      {timelineItems.map((item, index) => {
        const elements = [];

        if (item.type === 'location_group') {
          elements.push(<LocationEvent key={item.id} events={item.events} />);
        } else {
          // It's a game
          const game = item;
          elements.push(
            <div key={`game-${game.id}`} id={`game-${game.id}`}>
            <section
              className="game-chapter"
            >
              <div 
                className="chapter-content"
                style={{
                  '--hero-image': game.headerImage ? `url(${game.headerImage})` : undefined
                }}
                onClick={() => handleGameClick(game.id)}
                role="button"
                tabIndex={0}
              >
              </div>
              <div className="chapter-title-row">
                <h3 className="chapter-title">{game.title} ({game.year})</h3>
                <MemoriesCamera gameId={game.id} context="story" />
              </div>
            </section>
            </div>
          );
        }


        return elements;
      }).flat()}

      {/* Final Section */}
      <section className="final-section">
        <div className="final-content">
          <h2>The Journey Continues</h2>
          <p>Here's to many more games ahead!</p>
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
