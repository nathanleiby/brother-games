import { useNavigate } from "react-router-dom";

const GameTile = ({ game, onClick, className = "" }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick(game.id);
    } else {
      navigate(`/game/${game.id}`);
    }
  };

  return (
    <div
      className={`game-tile ${className}`}
      onClick={handleClick}
      title={`${game.title} (${game.year})`}
    >
      <div className="tile-image">
        {(game.images?.capsule || game.headerImage) ? (
          <img 
            src={game.images?.capsule || game.headerImage} 
            alt={game.title}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        ) : (
          <div className="tile-placeholder">
            <span>{game.title}</span>
          </div>
        )}
      </div>
      <div className="tile-info">
        <h3 className="tile-title">{game.title}</h3>
        <span className="tile-year">{game.year}</span>
      </div>
    </div>
  );
};

export default GameTile;