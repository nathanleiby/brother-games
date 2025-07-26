import { motion } from "motion/react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { gamesData, filterGames, sortGames, getStats } from "../data/gamesData";

const GameShelf = ({ setCurrentMode }) => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    yearRange: null,
    platforms: [],
    tags: [],
    locations: [],
  });
  const [sortBy, setSortBy] = useState("chronological");
  const [searchTerm, setSearchTerm] = useState("");

  // Get all unique values for filters
  const allPlatforms = [
    ...new Set(gamesData.flatMap((game) => game.platforms)),
  ];
  const allTags = [...new Set(gamesData.flatMap((game) => game.tags))];
  const allLocations = [
    ...new Set(gamesData.flatMap((game) => game.locations)),
  ];
  const allYears = [...new Set(gamesData.map((game) => game.year))].sort();

  // Filter and sort games
  const filteredGames = useMemo(() => {
    let filtered = filterGames(gamesData, filters);

    if (searchTerm) {
      filtered = filtered.filter(
        (game) =>
          game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          game.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          game.memories.some((memory) =>
            memory.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    return sortGames(filtered, sortBy);
  }, [filters, sortBy, searchTerm]);

  const stats = getStats(gamesData);

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
      platforms: [],
      tags: [],
      locations: [],
    });
    setSearchTerm("");
  };

  return (
    <div className="game-shelf">
      {/* Header */}
      <motion.div
        className="shelf-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Game Collection</h1>
        <p>Browse our gaming memories across {stats.yearsActive} years</p>
      </motion.div>

      {/* Stats */}
      <motion.div
        className="stats-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number">{stats.totalGames}</span>
            <span className="stat-label">Games</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats.yearsActive}</span>
            <span className="stat-label">Years</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats.locations}</span>
            <span className="stat-label">Cities</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats.averageEpicLevel}/10</span>
            <span className="stat-label">Avg Epic Level</span>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        className="filters-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search games, memories, or descriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-controls">
          <div className="filter-group">
            <label>Sort by:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="chronological">Chronological</option>
              <option value="alphabetical">Alphabetical</option>
              <option value="epic-memory">Epic Memory Level</option>
              <option value="random">Random</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Platforms:</label>
            <div className="filter-tags">
              {allPlatforms.map((platform) => (
                <button
                  key={platform}
                  className={`filter-tag ${
                    filters.platforms.includes(platform) ? "active" : ""
                  }`}
                  onClick={() => {
                    const newPlatforms = filters.platforms.includes(platform)
                      ? filters.platforms.filter((p) => p !== platform)
                      : [...filters.platforms, platform];
                    handleFilterChange("platforms", newPlatforms);
                  }}
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label>Tags:</label>
            <div className="filter-tags">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  className={`filter-tag ${
                    filters.tags.includes(tag) ? "active" : ""
                  }`}
                  onClick={() => {
                    const newTags = filters.tags.includes(tag)
                      ? filters.tags.filter((t) => t !== tag)
                      : [...filters.tags, tag];
                    handleFilterChange("tags", newTags);
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <button className="clear-filters" onClick={clearFilters}>
            Clear All Filters
          </button>
        </div>
      </motion.div>

      {/* Active Filters */}
      {(filters.platforms.length > 0 ||
        filters.tags.length > 0 ||
        searchTerm) && (
        <motion.div
          className="active-filters"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <span>Active filters:</span>
          {filters.platforms.map((platform) => (
            <span key={platform} className="active-filter">
              {platform} ×
            </span>
          ))}
          {filters.tags.map((tag) => (
            <span key={tag} className="active-filter">
              {tag} ×
            </span>
          ))}
          {searchTerm && (
            <span className="active-filter">"{searchTerm}" ×</span>
          )}
        </motion.div>
      )}

      {/* Games Grid */}
      <motion.div
        className="games-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        {filteredGames.length === 0 ? (
          <div className="no-results">
            <h3>No games found</h3>
            <p>Try adjusting your filters or search terms</p>
            <button onClick={clearFilters}>Clear Filters</button>
          </div>
        ) : (
          filteredGames.map((game, index) => (
            <motion.div
              key={game.id}
              className="game-card"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleGameClick(game.id)}
            >
              {(game.images?.capsule || game.headerImage) && (
                <div className="card-image">
                  <img 
                    src={game.images?.capsule || game.headerImage} 
                    alt={game.title}
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
              
              <div className="card-header">
                <h3 className="card-title">{game.title}</h3>
                <div className="card-meta">
                  <span className="year">{game.year}</span>
                  <span className="epic-level">
                    Epic: {game.epicMemoryLevel}/10
                  </span>
                </div>
              </div>

              <div className="card-platforms">
                {game.platforms.map((platform) => (
                  <span key={platform} className="platform-tag">
                    {platform}
                  </span>
                ))}
              </div>

              <p className="card-description">{game.description}</p>

              <div className="card-memories">
                <h4>Memories:</h4>
                <ul>
                  {game.memories.slice(0, 2).map((memory, memIndex) => (
                    <li key={memIndex}>{memory}</li>
                  ))}
                  {game.memories.length > 2 && (
                    <li className="more-memories">
                      +{game.memories.length - 2} more
                    </li>
                  )}
                </ul>
              </div>

              <div className="card-locations">
                {game.locations.map((location) => (
                  <span key={location} className="location-tag">
                    {location}
                  </span>
                ))}
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
};

export default GameShelf;
