import { motion, useScroll, useTransform } from "motion/react";
import { useNavigate } from "react-router-dom";
import { gamesData } from "../data/gamesData";
import { getLocationEvents } from "../data/locationData";
import MemoriesCamera from "../components/EasterEggs";
import LocationEvent from "../components/LocationEvent";

const StoryScroll = ({ setCurrentMode }) => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();

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
          );
        }
        
        // Add spacer between consecutive games
        const nextItem = timelineItems[index + 1];
        if (nextItem && 
            item.type !== 'location_group' && 
            nextItem.type !== 'location_group') {
          elements.push(
            <div key={`spacer-${index}`} className="timeline-spacer"></div>
          );
        }
        
        return elements;
      }).flat()}

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
