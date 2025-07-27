import { motion } from "motion/react";
import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gamesData, filterGames, sortGames, getStats } from "../data/gamesData";
import GameTile from "../components/GameTile";

const GameShelf = ({ setCurrentMode }) => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    yearRange: null,
    tags: [],
    locations: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  // Get all unique values for filters
  const allTags = [...new Set(gamesData.flatMap((game) => game.tags))];
  const allLocations = [
    ...new Set(gamesData.flatMap((game) => game.locations)),
  ];
  const allYears = [...new Set(gamesData.map((game) => game.year))].sort();

  // Filter games (chronological by default)
  const filteredGames = useMemo(() => {
    let filtered = filterGames(gamesData, filters);
    return sortGames(filtered, "chronological");
  }, [filters]);

  const stats = getStats(gamesData);

  // Simulate loading time for initial render
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleGameClick = (gameId) => {
    navigate(`/game/${gameId}`);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      yearRange: null,
      tags: [],
      locations: [],
    });
  };

  if (isLoading) {
    return (
      <div className="game-shelf">
        <div className="shelf-header">
          <h1>Game Shelf</h1>
          <p>Loading our gaming memories...</p>
        </div>
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="game-shelf">
      {/* Compact Header */}
      <div className="compact-header">
        <div className="compact-filters">
          {(filters.tags.length > 0 || filters.locations.length > 0) && (
            <button onClick={clearFilters} className="clear-btn">Clear</button>
          )}
        </div>
      </div>


      {/* Games Grid */}
      <div className="games-grid">
        {filteredGames.length === 0 ? (
          <div className="no-results">
            <h3>No games found</h3>
            <p>Try adjusting your filters or search terms</p>
            <button onClick={clearFilters}>Clear Filters</button>
          </div>
        ) : (
          filteredGames.map((game) => (
            <GameTile
              key={game.id}
              game={game}
              onClick={handleGameClick}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default GameShelf;
