// Centralized location data for each person by time period
export const locationHistory = {
  nate: [
    { startYear: null, endYear: 2006, location: "Oak Ridge" },
    { startYear: 2006, endYear: 2010, location: "Boston" },
    { startYear: 2010, endYear: 2012, location: "Seattle" },
    { startYear: 2012, endYear: 2013, location: "New Delhi" },
    { startYear: 2013, endYear: 2015, location: "Oakland" },
    { startYear: 2015, endYear: null, location: "San Francisco" }
  ],
  nick: [
    { startYear: null, endYear: 2007, location: "Boston" },
    { startYear: 2007, endYear: 2008, location: "Beijing" },
    { startYear: 2008, endYear: 2010, location: "Durham" },
    { startYear: 2010, endYear: 2015, location: "Boston" },
    { startYear: 2016, endYear: null, location: "Alexandria" }
  ],
  mike: [
    { startYear: null, endYear: 2006, location: "Oakland" },
    { startYear: 2006, endYear: null, location: "Los Angeles" }
  ]
};

// Get location for a person in a given year
export const getLocationForYear = (person, year) => {
  const history = locationHistory[person.toLowerCase()];
  if (!history) return null;
  
  const period = history.find(period => {
    const afterStart = period.startYear === null || year >= period.startYear;
    const beforeEnd = period.endYear === null || year <= period.endYear;
    return afterStart && beforeEnd;
  });
  
  return period ? period.location : null;
};

// Get all locations where the group was during a game's timeframe
export const getGroupLocationsForGame = (gameYear, yearRange = null) => {
  console.log(`getGroupLocationsForGame called with gameYear: ${gameYear}, yearRange: ${yearRange}`);
  const people = ['nate', 'nick', 'mike'];
  const locations = new Set();
  
  // If there's a year range (contains a dash), get locations for all years in that range
  if (yearRange && yearRange.includes('-')) {
    console.log('Using year range logic');
    const [startYear, endYear] = yearRange.split('-').map(y => parseInt(y.trim()));
    for (let year = startYear; year <= endYear; year++) {
      people.forEach(person => {
        const location = getLocationForYear(person, year);
        if (location) locations.add(location);
      });
    }
  } else {
    // Single year
    console.log('Using single year logic');
    const year = parseInt(gameYear);
    console.log(`Parsed year: ${year}`);
    people.forEach(person => {
      const location = getLocationForYear(person, year);
      console.log(`${person} in ${year}: ${location}`);
      if (location) locations.add(location);
    });
  }
  
  const result = Array.from(locations);
  console.log(`Final locations: ${result}`);
  return result;
};

// Location mappings for legacy data
export const locationMappings = {
  "SF": "San Francisco",
  "Durham": "Durham", 
  "Boston": "Boston",
  "Oakland": "Oakland",
  "Seattle": "Seattle",
  "LA": "Los Angeles",
  "India": "New Delhi"
};

// Normalize location names
export const normalizeLocation = (location) => {
  return locationMappings[location] || location;
};

// Get all location change events for the timeline
export const getLocationEvents = () => {
  const events = [];
  
  Object.entries(locationHistory).forEach(([person, history]) => {
    history.forEach(period => {
      if (period.startYear) {
        events.push({
          year: period.startYear,
          type: 'location_change',
          person: person.charAt(0).toUpperCase() + person.slice(1),
          location: period.location,
          id: `${person}-${period.startYear}-${period.location}`
        });
      }
    });
  });
  
  return events.sort((a, b) => a.year - b.year);
};