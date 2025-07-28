import { getGroupLocationsForGame } from './locationData.js';

// Raw games data without computed locations
const rawGamesData = [
  {
    id: "diablo",
    title: "Diablo",
    year: 2004,
    yearRange: "2004",
    platforms: ["PC"],
    memories: [],
    tags: ["rpg", "co-op"],
    headerImage: "https://wallpapers.com/images/high/diablo-2-resurrected-1920-x-1080-u7g88mkivn6a8tx4.webp",
    steamAppId: null,
    images: {
      header: "https://wallpapers.com/images/high/diablo-2-resurrected-1920-x-1080-u7g88mkivn6a8tx4.webp",
      capsule: "https://wallpapers.com/images/high/diablo-2-resurrected-1920-x-1080-u7g88mkivn6a8tx4.webp",
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
    memories: ["2004 holidays in person", "In 2005-2006 we played by email, sending over 100 emails with attached *.sav files"],
    tags: ["strategy", "turn-based", "pbem"],
    specialNote: "Transitioned from in-person to play-by-email",
    steamAppId: 2204130,
    headerImage: "https://cdn.akamai.steamstatic.com/steam/apps/2204130/header.jpg",
    images: {
      header: "https://cdn.akamai.steamstatic.com/steam/apps/2204130/header.jpg",
      capsule: "https://cdn.akamai.steamstatic.com/steam/apps/2204130/capsule_616x353.jpg",
      screenshots: []
    }
  },
  {
    id: "weewar",
    title: "Weewar",
    year: 2007,
    yearRange: "2007",
    platforms: ["iPhone", "Web"],
    playStyle: "PBEM",
    memories: [],
    tags: ["strategy", "mobile", "pbem", "iphone"],
    headerImage: "https://www.geeked.info/wp-content/uploads/2008/11/weewarbattle.png",
    steamAppId: null,
    images: { 
      header: "https://www.geeked.info/wp-content/uploads/2008/11/weewarbattle.png", 
      capsule: "https://www.geeked.info/wp-content/uploads/2008/11/weewarbattle.png", 
      screenshots: [] 
    }
  },
  {
    id: "neverwinter-nights",
    title: "Neverwinter Nights",
    year: 2008,
    yearRange: "2008-2009",
    platforms: ["PC"],
    memories: [],
    tags: ["rpg", "d&d", "co-op"],
    headerImage: "https://cdn.akamai.steamstatic.com/steam/apps/704450/header.jpg",
    steamAppId: 704450,
    images: { 
      header: "https://cdn.akamai.steamstatic.com/steam/apps/704450/header.jpg", 
      capsule: "https://cdn.akamai.steamstatic.com/steam/apps/704450/capsule_616x353.jpg", 
      screenshots: [] 
    }
  },
  {
    id: "left-4-dead",
    title: "Left 4 Dead",
    year: 2010,
    yearRange: "2010",
    platforms: ["PC"],
    memories: [],
    tags: ["fps", "co-op", "zombies", "survival"],
    steamAppId: 500,
    headerImage: "https://cdn.akamai.steamstatic.com/steam/apps/500/header.jpg",
    images: {
      header: "https://cdn.akamai.steamstatic.com/steam/apps/500/header.jpg",
      capsule: "https://cdn.akamai.steamstatic.com/steam/apps/500/capsule_616x353.jpg",
      screenshots: []
    }
  },
  {
    id: "risk-of-rain",
    title: "Risk of Rain",
    year: 2011,
    yearRange: "2011, 2014",
    platforms: ["PC"],
    memories: [],
    tags: ["roguelike", "co-op", "challenging"],
    steamAppId: 248820,
    headerImage: "https://cdn.akamai.steamstatic.com/steam/apps/248820/header.jpg",
    images: {
      header: "https://cdn.akamai.steamstatic.com/steam/apps/248820/header.jpg",
      capsule: "https://cdn.akamai.steamstatic.com/steam/apps/248820/capsule_616x353.jpg",
      screenshots: []
    }
  },
  {
    id: "borderlands-original",
    title: "Borderlands",
    year: 2012,
    yearRange: "2012-2013",
    platforms: ["PC"],
    memories: [],
    tags: ["fps", "co-op", "loot"],
    steamAppId: 8980,
    headerImage: "https://cdn.akamai.steamstatic.com/steam/apps/8980/header.jpg",
    images: {
      header: "https://cdn.akamai.steamstatic.com/steam/apps/8980/header.jpg",
      capsule: "https://cdn.akamai.steamstatic.com/steam/apps/8980/capsule_616x353.jpg",
      screenshots: []
    }
  },
  {
    id: "trine-2",
    title: "Trine 2",
    year: 2013,
    yearRange: "2013",
    platforms: ["PC"],
    memories: [],
    tags: ["puzzle", "co-op", "platformer"],
    steamAppId: 35720,
    headerImage: "https://cdn.akamai.steamstatic.com/steam/apps/35720/header.jpg",
    images: {
      header: "https://cdn.akamai.steamstatic.com/steam/apps/35720/header.jpg",
      capsule: "https://cdn.akamai.steamstatic.com/steam/apps/35720/capsule_616x353.jpg",
      screenshots: []
    }
  },
  {
    id: "monaco",
    title: "Monaco",
    year: 2014,
    yearRange: "2014",
    platforms: ["PC"],
    memories: [],
    tags: ["stealth", "co-op", "heist"],
    steamAppId: 113020,
    headerImage: "https://cdn.akamai.steamstatic.com/steam/apps/113020/header.jpg",
    images: {
      header: "https://cdn.akamai.steamstatic.com/steam/apps/113020/header.jpg",
      capsule: "https://cdn.akamai.steamstatic.com/steam/apps/113020/capsule_616x353.jpg",
      screenshots: []
    }
  },
  {
    id: "torchlight",
    title: "Torchlight",
    year: 2015,
    yearRange: "2015",
    platforms: ["PC"],
    memories: [],
    tags: ["rpg", "dungeon-crawler", "loot"],
    steamAppId: 41500,
    headerImage: "https://cdn.akamai.steamstatic.com/steam/apps/41500/header.jpg",
    images: {
      header: "https://cdn.akamai.steamstatic.com/steam/apps/41500/header.jpg",
      capsule: "https://cdn.akamai.steamstatic.com/steam/apps/41500/capsule_616x353.jpg",
      screenshots: []
    }
  },
  {
    id: "torchlight-2",
    title: "Torchlight 2",
    year: 2015,
    yearRange: "2015",
    platforms: ["PC"],
    memories: [],
    tags: ["rpg", "dungeon-crawler", "co-op", "loot"],
    steamAppId: 200710,
    headerImage: "https://cdn.akamai.steamstatic.com/steam/apps/200710/header.jpg",
    images: {
      header: "https://cdn.akamai.steamstatic.com/steam/apps/200710/header.jpg",
      capsule: "https://cdn.akamai.steamstatic.com/steam/apps/200710/capsule_616x353.jpg",
      screenshots: []
    }
  },
  {
    id: "forced",
    title: "FORCED: Slightly Better Edition",
    year: 2015,
    yearRange: "2015",
    platforms: ["PC"],
    memories: [],
    tags: ["co-op", "action"],
    steamAppId: 249990,
    headerImage: "https://cdn.akamai.steamstatic.com/steam/apps/249990/header.jpg",
    images: {
      header: "https://cdn.akamai.steamstatic.com/steam/apps/249990/header.jpg",
      capsule: "https://cdn.akamai.steamstatic.com/steam/apps/249990/capsule_616x353.jpg",
      screenshots: []
    }
  },
  {
    id: "ascension",
    title: "Ascension: Deckbuilding Game",
    year: 2016,
    yearRange: "2016",
    platforms: ["PC", "Mobile"],
    memories: [],
    tags: ["card-game", "strategy"],
    steamAppId: 320430,
    headerImage: "https://cdn.akamai.steamstatic.com/steam/apps/320430/header.jpg",
    images: {
      header: "https://cdn.akamai.steamstatic.com/steam/apps/320430/header.jpg",
      capsule: "https://cdn.akamai.steamstatic.com/steam/apps/320430/capsule_616x353.jpg",
      screenshots: []
    }
  },
  {
    id: "sanctum-2",
    title: "Sanctum 2",
    year: 2016,
    yearRange: "2016-2017",
    platforms: ["PC"],
    memories: [],
    tags: ["tower-defense", "fps", "co-op", "strategy"],
    steamAppId: 210770,
    headerImage: "https://cdn.akamai.steamstatic.com/steam/apps/210770/header.jpg",
    images: {
      header: "https://cdn.akamai.steamstatic.com/steam/apps/210770/header.jpg",
      capsule: "https://cdn.akamai.steamstatic.com/steam/apps/210770/capsule_616x353.jpg",
      screenshots: []
    }
  },
  {
    id: "borderlands-2",
    title: "Borderlands 2",
    year: 2016,
    yearRange: "2014, 2016-2017",
    platforms: ["PC"],
    memories: ["Trying to share an epic weapon and accidentally throwing it off the edge of the world"],
    tags: ["fps", "co-op", "loot", "sequel"],
    steamAppId: 49520,
    headerImage: "https://cdn.akamai.steamstatic.com/steam/apps/49520/header.jpg",
    images: {
      header: "https://cdn.akamai.steamstatic.com/steam/apps/49520/header.jpg",
      capsule: "https://cdn.akamai.steamstatic.com/steam/apps/49520/capsule_616x353.jpg",
      screenshots: []
    }
  },
  {
    id: "dungeon-of-the-endless",
    title: "Dungeon of the Endless",
    year: 2017,
    yearRange: "2017-2018",
    platforms: ["PC"],
    memories: [],
    tags: ["roguelike", "tower-defense", "co-op"],
    steamAppId: 249050,
    headerImage: "https://cdn.akamai.steamstatic.com/steam/apps/249050/header.jpg",
    images: {
      header: "https://cdn.akamai.steamstatic.com/steam/apps/249050/header.jpg",
      capsule: "https://cdn.akamai.steamstatic.com/steam/apps/249050/capsule_616x353.jpg",
      screenshots: []
    }
  },
  {
    id: "factorio",
    title: "Factorio",
    year: 2019,
    yearRange: "2019-2020", 
    platforms: ["PC"],
    memories: ["Victory!"],
    screenshots: ["factorio-victory-hq.png"],
    tags: ["strategy", "automation", "obsession", "wiki"],
    steamAppId: 427520,
    headerImage: "https://cdn.akamai.steamstatic.com/steam/apps/427520/header.jpg",
    images: {
      header: "https://cdn.akamai.steamstatic.com/steam/apps/427520/header.jpg",
      capsule: "https://cdn.akamai.steamstatic.com/steam/apps/427520/capsule_616x353.jpg",
      screenshots: ["factorio-victory-hq.png"]
    }
  },
  {
    id: "for-the-king",
    title: "For the King",
    year: 2020,
    yearRange: "2020-2021",
    platforms: ["PC"],
    memories: [],
    tags: ["rpg", "strategy", "co-op", "tabletop"],
    steamAppId: 527230,
    headerImage: "https://cdn.akamai.steamstatic.com/steam/apps/527230/header.jpg",
    images: {
      header: "https://cdn.akamai.steamstatic.com/steam/apps/527230/header.jpg",
      capsule: "https://cdn.akamai.steamstatic.com/steam/apps/527230/capsule_616x353.jpg",
      screenshots: []
    }
  },
  {
    id: "fumbbl-blood-bowl",
    title: "FUMBBL Blood Bowl",
    year: 2020,
    yearRange: "2020",
    platforms: ["Web"],
    playStyle: "Turn-based",
    memories: ["League highlights spreadsheet"],
    screenshots: ["fumbbl-highlights.png"],
    tags: ["strategy", "turn-based", "fantasy", "sports"],
    steamAppId: null,
    headerImage: "https://cdn.akamai.steamstatic.com/steam/apps/236690/header.jpg",
    images: {
      header: "https://cdn.akamai.steamstatic.com/steam/apps/236690/header.jpg",
      capsule: "https://cdn.akamai.steamstatic.com/steam/apps/236690/capsule_616x353.jpg",
      screenshots: ["fumbbl-highlights.png"]
    }
  },
  {
    id: "wildermyth",
    title: "Wildermyth",
    year: 2021,
    yearRange: "2021",
    platforms: ["PC"],
    memories: [],
    tags: ["rpg", "storytelling", "procedural"],
    steamAppId: 763890,
    headerImage: "https://cdn.akamai.steamstatic.com/steam/apps/763890/header.jpg",
    images: {
      header: "https://cdn.akamai.steamstatic.com/steam/apps/763890/header.jpg",
      capsule: "https://cdn.akamai.steamstatic.com/steam/apps/763890/capsule_616x353.jpg",
      screenshots: []
    }
  },
  {
    id: "dying-light",
    title: "Dying Light",
    year: 2022,
    yearRange: "2022",
    platforms: ["PC"],
    memories: ["Sniping this boss from above and lighting him on fire to avoid the fight"],
    screenshots: ["dying-light-boss.png"],
    tags: ["survival", "zombies", "parkour", "co-op"],
    steamAppId: 239140,
    headerImage: "https://cdn.akamai.steamstatic.com/steam/apps/239140/header.jpg",
    images: {
      header: "https://cdn.akamai.steamstatic.com/steam/apps/239140/header.jpg",
      capsule: "https://cdn.akamai.steamstatic.com/steam/apps/239140/capsule_616x353.jpg",
      screenshots: ["dying-light-boss.png"]
    }
  },
  {
    id: "slice-n-dice",
    title: "Slice n Dice",
    year: 2022,
    yearRange: "2022-2024",
    platforms: ["Mobile", "PC"],
    memories: [],
    screenshots: ["slice-n-dice-victory.png"],
    tags: ["strategy", "dice", "roguelike", "mobile"],
    steamAppId: 1775490,
    headerImage: "https://cdn.akamai.steamstatic.com/steam/apps/1775490/header.jpg",
    images: {
      header: "https://cdn.akamai.steamstatic.com/steam/apps/1775490/header.jpg",
      capsule: "https://cdn.akamai.steamstatic.com/steam/apps/1775490/capsule_616x353.jpg",
      screenshots: ["slice-n-dice-victory.png"]
    }
  },
  {
    id: "terraria",
    title: "Terraria",
    year: 2023,
    yearRange: "2023-2024",
    platforms: ["PC"],
    memories: ["Reading wikis together"],
    tags: ["sandbox", "building", "wiki", "exploration"],
    steamAppId: 105600,
    headerImage: "https://cdn.akamai.steamstatic.com/steam/apps/105600/header.jpg",
    images: {
      header: "https://cdn.akamai.steamstatic.com/steam/apps/105600/header.jpg",
      capsule: "https://cdn.akamai.steamstatic.com/steam/apps/105600/capsule_616x353.jpg",
      screenshots: []
    }
  },
  {
    id: "gloomhaven",
    title: "Gloomhaven",
    year: 2024,
    yearRange: "2024",
    platforms: ["PC"],
    memories: [],
    tags: ["rpg", "tactical", "campaign", "complex"],
    steamAppId: 780290,
    headerImage: "https://cdn.akamai.steamstatic.com/steam/apps/780290/header.jpg",
    images: {
      header: "https://cdn.akamai.steamstatic.com/steam/apps/780290/header.jpg",
      capsule: "https://cdn.akamai.steamstatic.com/steam/apps/780290/capsule_616x353.jpg",
      screenshots: []
    }
  },
  {
    id: "generation-zero",
    title: "Generation Zero",
    year: 2024,
    yearRange: "2024-2025",
    platforms: ["PC"],
    memories: ["Photo shoots", "Bicycle riding adventures", "Swedish robot hunting"],
    screenshots: ["generation-zero-bikes-1.png", "generation-zero-bikes-2.png"],
    tags: ["fps", "survival", "photography", "sweden"],
    steamAppId: 704270,
    headerImage: "https://cdn.akamai.steamstatic.com/steam/apps/704270/header.jpg",
    images: {
      header: "https://cdn.akamai.steamstatic.com/steam/apps/704270/header.jpg",
      capsule: "https://cdn.akamai.steamstatic.com/steam/apps/704270/capsule_616x353.jpg",
      screenshots: ["generation-zero-bikes-1.png", "generation-zero-bikes-2.png"]
    }
  },
  {
    id: "alien-swarm-reactive-drop",
    title: "Alien Swarm: Reactive Drop",
    year: 2025,
    yearRange: "2025",
    platforms: ["PC"],
    memories: [],
    tags: ["co-op", "aliens", "top-down", "team-based"],
    steamAppId: 563560,
    headerImage: "https://cdn.akamai.steamstatic.com/steam/apps/563560/header.jpg",
    images: {
      header: "https://cdn.akamai.steamstatic.com/steam/apps/563560/header.jpg",
      capsule: "https://cdn.akamai.steamstatic.com/steam/apps/563560/capsule_616x353.jpg",
      screenshots: []
    }
  },
  {
    id: "planetcrafter",
    title: "PlanetCrafter",
    year: 2025,
    yearRange: "2025",
    platforms: ["PC"],
    memories: [],
    tags: ["survival", "terraforming", "crafting", "space"],
    steamAppId: 1284190,
    headerImage: "https://cdn.akamai.steamstatic.com/steam/apps/1284190/header.jpg",
    images: {
      header: "https://cdn.akamai.steamstatic.com/steam/apps/1284190/header.jpg",
      capsule: "https://cdn.akamai.steamstatic.com/steam/apps/1284190/capsule_616x353.jpg",
      screenshots: []
    }
  },
  {
    id: "barotrauma",
    title: "Barotrauma",
    year: 2021,
    yearRange: "2021",
    platforms: ["PC"],
    memories: [],
    screenshots: ["barotrauma-2.png"],
    tags: ["co-op", "submarine", "survival", "chaotic"],
    steamAppId: 602960,
    headerImage: "https://cdn.akamai.steamstatic.com/steam/apps/602960/header.jpg",
    images: {
      header: "https://cdn.akamai.steamstatic.com/steam/apps/602960/header.jpg",
      capsule: "https://cdn.akamai.steamstatic.com/steam/apps/602960/capsule_616x353.jpg",
      screenshots: ["barotrauma-2.png"]
    }
  }
];

// Add computed locations to each game
export const gamesData = rawGamesData.map(game => ({
  ...game,
  locations: getGroupLocationsForGame(game.year, game.yearRange)
}));

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
  };
};
