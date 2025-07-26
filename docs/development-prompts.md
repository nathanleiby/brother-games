# Gaming Memory Site - Cursor Development Prompts

## Initial Setup Prompt

Create a React SPA that tells the story of 20+ years of gaming memories between three brothers. The site should have two main modes:

1. **Story-scroll mode**: A cinematic journey through time where each game gets a full-screen "chapter" as users scroll down
2. **Game shelf mode**: An interactive library view where users can browse, filter, and jump to specific games

**Technical Requirements:**

- React SPA with smooth scroll animations (use Framer Motion or GSAP)
- Responsive design that works on mobile and desktop
- Smooth transition between story mode and game shelf mode
- URL routing that supports both modes
- Modern, game-themed aesthetic

**Key Features:**

- Interactive timeline spanning 2004-2025
- Geographic context (games played across Boston, LA, Durham, India, SF, Seattle)
- Rich media support (screenshots, game art, embedded memories)
- Filtering/sorting in shelf mode (by year, genre, "epic memory level")
- Breadcrumb navigation showing progress through the story

Start with the basic React setup, routing structure, and a simple version of both viewing modes.

---

## Game Data Structure Prompt

Here's the game data to integrate. Create a robust data structure that supports both chronological storytelling and flexible filtering:

```javascript
const gamesData = [
  {
    title: "Diablo",
    year: 2004,
    platforms: ["PC"],
    memories: ["First co-op adventure together"],
    locations: ["Boston", "Oakland"],
    tags: ["rpg", "co-op", "classic"],
  },
  {
    title: "Alpha Centauri",
    year: 2004,
    yearRange: "2004-2006",
    platforms: ["PC"],
    playStyle: "PBEM",
    memories: ["Holiday sessions in person", "Email strategy discussions"],
    locations: ["Boston", "Oakland"],
    tags: ["strategy", "turn-based", "pbem"],
    specialNote: "Transitioned from in-person to play-by-email",
  },
  // ... continue with all games from the list
];
```

Create helper functions for:

- Filtering by year range, platform, tags
- Sorting by different criteria
- Generating "stats" (total games, years active, most played genres)
- Finding games with special memories or inside jokes

---

## Story-Scroll Implementation Prompt

Implement the story-scroll mode with these features:

**Visual Design:**

- Each game gets a full-screen section with unique styling that matches the game's aesthetic
- Smooth scroll transitions between sections
- Animated elements that reveal as you scroll (use Intersection Observer)
- Progress indicator showing journey through the timeline
- Floating navigation that shows current game/year

**Interactive Elements:**

- Hover effects that reveal additional memories
- Clickable elements for deeper exploration
- Smooth parallax effects for background elements
- Animated game icons that "collect" as you progress

**Special Sections:**

- "Pandemic Era" highlighting games that kept the brothers connected
- "Platform Evolution" showing the shift from email to Skype to Discord
- "Geography" showing how they stayed connected across moves
- Memory highlights like "The Borderlands weapon mishap" with special visual treatment

**Technical:**

- Use Framer Motion for scroll animations
- Implement smooth scrolling with proper easing
- Add keyboard navigation (arrow keys, space bar)
- Include a "jump to game shelf" button that smoothly transitions modes

---

## Game Shelf Implementation Prompt

Create the interactive game shelf with these features:

**Layout:**

- Grid of game "covers" or cards that look like a real game collection
- Responsive grid that adapts to screen size
- Smooth hover animations and card interactions
- Visual hierarchy showing most memorable games prominently

**Filtering & Sorting:**

- Filter by: year range, genre, platform, location, special tags
- Sort by: chronological, alphabetical, "epic memory level", random
- Search functionality for quick game finding
- Active filters shown as removable chips

**Game Cards:**

- Game title, year, and key platforms
- Preview of memories/inside jokes
- Visual indicators for special categories (most emails, longest campaign, etc.)
- Click to expand for full memory details

**Interactive Features:**

- "Random memory" button for nostalgia browsing
- Ability to bookmark favorite memories
- Stats dashboard showing gaming brotherhood metrics
- Easter eggs hidden throughout (inside jokes as clickable elements)

**Visual Polish:**

- Game-themed color schemes
- Smooth animations for filtering transitions
- Loading states and micro-interactions
- Retro gaming aesthetic elements

---

## Memory Detail Views Prompt

When users click on individual games, create rich detail views:

**Content Structure:**

- Game header with title, year, platforms
- Memory timeline for games played across multiple years
- Screenshot/image gallery if available
- Email excerpts or conversation snippets
- Inside jokes and running themes
- Connection to other games in the series

**Interactive Elements:**

- Image galleries with lightbox viewing
- Expandable memory sections
- Links to related games or time periods
- "Share this memory" functionality
- Navigation to previous/next games chronologically

**Special Game Treatments:**

- Alpha Centauri: Focus on PBEM evolution and strategy discussions
- Factorio: Highlight the obsession and wiki-reading
- Generation Zero: Feature the photo shoots and bicycle riding
- Borderlands: The epic weapon mishap story
- Terraria: Wiki reading collaboration

Create templates that can be customized for games with particularly rich memories vs. simpler entries.

---

## Final Polish & Deployment Prompt

Add these finishing touches:

**Performance & UX:**

- Lazy loading for images and heavy content
- Smooth loading states and skeleton screens
- Error handling for missing images/data
- Mobile-optimized touch interactions
- Accessibility features (keyboard navigation, screen reader support)

**Easter Eggs & Personal Touches:**

- Hidden clickable elements with inside jokes
- Konami code for special content
- Random quotes from gaming sessions
- Achievement-style notifications for exploration milestones
- "Brotherhood stats" with fun metrics

**Deployment:**

- Build optimization for fast loading
- SEO-friendly routing and meta tags
- Social sharing with custom previews
- Simple analytics to see which memories get the most attention

**Future Expansion:**

- Easy way to add new games/memories
- Comment system for Mike to add his own recollections
- Photo upload capability for future gaming sessions
- Export functionality to save memories

Focus on creating something that feels personal, nostalgic, and technically polished - a true celebration of 20+ years of gaming brotherhood.
