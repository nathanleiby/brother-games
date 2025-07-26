export const gamesData = [
  {
    id: "diablo",
    title: "Diablo",
    year: 2004,
    platforms: ["PC"],
    memories: ["First co-op adventure together"],
    locations: ["Boston", "Oakland"],
    tags: ["rpg", "co-op", "classic"],
    epicMemoryLevel: 8,
    description: "Our first major co-op gaming experience together",
    headerImage: "https://images.igdb.com/igdb/image/upload/t_1080p/co1rcf.webp",
    steamAppId: null,
    images: {
      header: "https://images.igdb.com/igdb/image/upload/t_1080p/co1rcf.webp",
      capsule: "https://images.igdb.com/igdb/image/upload/t_1080p/co1rcf.webp",
      screenshots: []
    }
  },
  {
    id: "alpha-centauri",
    title: "Alpha Centauri",
    year: 2004,
    yearRange: "2004-2006",
    platforms: ["PC"],
    playStyle: "PBEM",
    memories: ["Holiday sessions in person", "Email strategy discussions"],
    locations: ["Boston", "Oakland"],
    tags: ["strategy", "turn-based", "pbem"],
    specialNote: "Transitioned from in-person to play-by-email",
    epicMemoryLevel: 9,
    description:
      "The game that evolved our gaming relationship from in-person to long-distance",
    steamAppId: 2204130,
    headerImage: "https://cdn.akamai.steamstatic.com/steam/apps/2204130/header.jpg",
    images: {
      header: "https://cdn.akamai.steamstatic.com/steam/apps/2204130/header.jpg",
      capsule: "https://cdn.akamai.steamstatic.com/steam/apps/2204130/capsule_616x353.jpg",
      screenshots: []
    }
  },
  {
    id: "factorio",
    title: "Factorio",
    year: 2016,
    platforms: ["PC"],
    memories: ["Wiki reading obsession", "Factory optimization discussions"],
    locations: ["Durham", "SF", "Seattle"],
    tags: ["strategy", "automation", "obsession"],
    epicMemoryLevel: 10,
    description: "The game that consumed our lives with factory optimization",
    steamAppId: 427520,
    headerImage: "https://cdn.akamai.steamstatic.com/steam/apps/427520/header.jpg",
    images: {
      header: "https://cdn.akamai.steamstatic.com/steam/apps/427520/header.jpg",
      capsule: "https://cdn.akamai.steamstatic.com/steam/apps/427520/capsule_616x353.jpg",
      screenshots: []
    }
  },
  {
    id: "borderlands",
    title: "Borderlands",
    year: 2009,
    platforms: ["PC", "Xbox 360"],
    memories: ["The epic weapon mishap", "Co-op loot hunting"],
    locations: ["Boston", "LA"],
    tags: ["fps", "co-op", "loot", "epic-memory"],
    epicMemoryLevel: 10,
    description: "Home to one of our most legendary gaming moments",
    steamAppId: 8980,
    headerImage: "https://cdn.akamai.steamstatic.com/steam/apps/8980/header.jpg",
    images: {
      header: "https://cdn.akamai.steamstatic.com/steam/apps/8980/header.jpg",
      capsule: "https://cdn.akamai.steamstatic.com/steam/apps/8980/capsule_616x353.jpg",
      screenshots: []
    }
  },
  {
    id: "terraria",
    title: "Terraria",
    year: 2011,
    platforms: ["PC"],
    memories: ["Wiki reading collaboration", "Building adventures"],
    locations: ["Durham", "SF"],
    tags: ["sandbox", "building", "wiki"],
    epicMemoryLevel: 7,
    description: "A collaborative building and exploration adventure",
    steamAppId: 105600,
    headerImage: "https://cdn.akamai.steamstatic.com/steam/apps/105600/header.jpg",
    images: {
      header: "https://cdn.akamai.steamstatic.com/steam/apps/105600/header.jpg",
      capsule: "https://cdn.akamai.steamstatic.com/steam/apps/105600/capsule_616x353.jpg",
      screenshots: []
    }
  },
  {
    id: "generation-zero",
    title: "Generation Zero",
    year: 2019,
    platforms: ["PC"],
    memories: ["Photo shoots", "Bicycle riding adventures"],
    locations: ["SF", "Seattle"],
    tags: ["fps", "survival", "photography"],
    epicMemoryLevel: 8,
    description: "Unique blend of gaming and real-world photography",
    steamAppId: 704270,
    headerImage: "https://cdn.akamai.steamstatic.com/steam/apps/704270/header.jpg",
    images: {
      header: "https://cdn.akamai.steamstatic.com/steam/apps/704270/header.jpg",
      capsule: "https://cdn.akamai.steamstatic.com/steam/apps/704270/capsule_616x353.jpg",
      screenshots: []
    }
  },
];

// Helper functions for filtering and sorting
export const filterGames = (games, filters) => {
  return games.filter((game) => {
    if (filters.yearRange && filters.yearRange.length === 2) {
      if (game.year < filters.yearRange[0] || game.year > filters.yearRange[1]) {
        return false;
      }
    }
    if (filters.platforms && filters.platforms.length > 0) {
      if (
        !filters.platforms.some((platform) => game.platforms.includes(platform))
      ) {
        return false;
      }
    }
    if (filters.tags && filters.tags.length > 0) {
      if (!filters.tags.some((tag) => game.tags.includes(tag))) {
        return false;
      }
    }
    if (filters.locations && filters.locations.length > 0) {
      if (
        !filters.locations.some((location) => game.locations.includes(location))
      ) {
        return false;
      }
    }
    return true;
  });
};

export const sortGames = (games, sortBy) => {
  const sorted = [...games];
  switch (sortBy) {
    case "chronological":
      return sorted.sort((a, b) => a.year - b.year);
    case "alphabetical":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "epic-memory":
      return sorted.sort((a, b) => b.epicMemoryLevel - a.epicMemoryLevel);
    case "random":
      return sorted.sort(() => Math.random() - 0.5);
    default:
      return sorted;
  }
};

export const getStats = (games) => {
  const years = games.map((game) => game.year);
  const platforms = [...new Set(games.flatMap((game) => game.platforms))];
  const tags = [...new Set(games.flatMap((game) => game.tags))];
  const locations = [...new Set(games.flatMap((game) => game.locations))];

  return {
    totalGames: games.length,
    yearRange: `${Math.min(...years)} - ${Math.max(...years)}`,
    yearsActive: Math.max(...years) - Math.min(...years) + 1,
    platforms: platforms.length,
    uniqueTags: tags.length,
    locations: locations.length,
    averageEpicLevel: Math.round(
      games.reduce((sum, game) => sum + game.epicMemoryLevel, 0) / games.length
    ),
  };
};
