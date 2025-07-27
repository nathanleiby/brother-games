# Gaming Memory Site V2 - Claude Code Implementation Guide

## Setup

1. **Create Requirements File**

   ```bash
   # In your project root
   mkdir -p docs
   touch docs/v2-requirements.md
   ```

2. **Add V2 Requirements** (paste all prompts we workshopped into `/docs/v2-requirements.md`)

## Claude Code Command Sequence

### Step 1: Initial Analysis & Simplification

```bash
claude-code "I have a gaming memory site that needs a v2 redesign. The requirements are in /docs/v2-requirements.md. Start by analyzing the current codebase and implementing the V2 Simplification Prompt - focus on removing UI complexity and streamlining interactions."
```

**Expected outcome:** Cleaned header, removed CTAs, simplified navigation

### Step 2: Authentic Content Integration

```bash
claude-code "Now implement the Authentic Memories Integration Prompt from /docs/v2-requirements.md - replace generic content with real memories, but only where we have specific ones listed. Don't add generic filler content."
```

**Expected outcome:** Real memories for Borderlands 2, Generation Zero, Terraria, etc. Generic games get minimal treatment.

### Step 3: Performance Fixes

```bash
claude-code "Apply the V2 Performance & Technical Fixes from /docs/v2-requirements.md - specifically fix the shelf view loading lag and clean up unnecessary animations."
```

**Expected outcome:** Faster shelf loading, smoother performance, minimal animations

### Step 4: Final Polish

```bash
claude-code "Complete the V2 Final Polish prompt from /docs/v2-requirements.md - handle missing assets like Neverwinter Nights cover art and ensure the user flow creates a documentary experience."
```

**Expected outcome:** Missing images sourced, clean user flow, documentary feel

## Pro Tips for Claude Code

### Before Starting

- **Backup your v1:** `git checkout -b v1-backup` before beginning
- **Create v2 branch:** `git checkout -b v2-redesign`

### During Development

- **Let Claude analyze first:** It will read your existing code structure before making changes
- **Reference specific components:** "Update the Header component" vs "fix the header"
- **Ask for explanations:** "Explain what's causing the performance issue before fixing it"
- **Request incremental changes:** Don't ask for everything at once

### Useful Follow-up Commands

```bash
# If you need clarification
claude-code "Explain the changes you just made to the header component"

# If something breaks
claude-code "The shelf view is still laggy after your changes. Debug the loading issue step by step"

# For specific tweaks
claude-code "Remove the breadcrumb animation but keep the smooth scrolling between games"

# For testing
claude-code "Add some console logs to help debug the performance issues"
```

### Troubleshooting

- **If Claude suggests major refactoring:** Ask it to create a backup first
- **If changes break existing features:** Reference the specific functionality that broke
- **If you want to revert:** `git checkout v1-backup -- [specific-file]`

## V2 Requirements Document Template

Save this as `/docs/v2-requirements.md`:

---

## V2 Simplification Prompt

**Gaming Memory Site V2 - Simplify First**

**Remove UI Complexity:**

- Header: Replace prominent view toggles with single subtle "Game Index" link
- Story scroll: Remove all mid-story "Browse Shelf" CTAs and navigation noise
- Eliminate unnecessary context sections (platform evolution, geography emphasis, etc.)
- Focus on: Game → Year → Actual Memory (if we have one)

**Streamline Interactions:**

- Remove excessive hover effects and micro-animations
- Keep only essential scroll animations
- Eliminate "breadcrumb collection" and progress gamification
- Simple, clean transitions between games

**Content Hierarchy:**

- Games with specific memories get full treatment
- Games without specific memories get minimal entry (just title, year, brief context)
- No filler content or generic descriptions

---

## Authentic Memories Integration Prompt

**Replace Generic Content with Real Memories - ONLY WHERE SPECIFIED:**

**Games with Specific Memories:**

- **Borderlands 2**: "Trying to share an epic weapon and accidentally throwing it off the edge of the world"
- **Generation Zero**: "Photo shoots" and "Bicycle Riding"
- **Terraria**: "Reading wikis" together
- **Alpha Centauri**: "2004 holidays in person, 2005-2006 PBEM" transition
- **Slice n Dice**: Email thread starting 2022-10-18 with victory screenshots

**Games WITHOUT specific memories listed:**

- Keep minimal: Just title, year, platforms
- No generic "first adventure" or "great co-op experience" text
- Let the authentic memories shine by not diluting them

---

## V2 Performance & Technical Fixes Prompt

**Fix Core Performance Issues:**

**Shelf View Loading:**

- Implement proper lazy loading for game cards/images
- Pre-load shelf components during story scroll (progressive loading)
- Add loading states that don't feel jarring
- Cache rendered shelf view after first visit

**Animation Cleanup:**

- Remove scroll-triggered animations that don't serve the story
- Keep only: smooth scrolling between games, simple fade-ins for content
- Eliminate parallax effects, excessive hover states, "collecting" animations
- Focus on performance over visual flair

**Code Optimization:**

- Minimize re-renders during scroll
- Optimize image loading and sizing
- Clean up unused dependencies and code paths

---

## V2 Final Polish Prompt

**Content & Experience Refinement:**

**Missing Assets:**

- Source appropriate Neverwinter Nights cover art from official Bioware/Wikipedia sources
- Create simple, clean placeholders for authentic screenshots/emails with clear labels
- Remove placeholder Lorem ipsum and generic gaming descriptions

**User Flow:**

- Story scroll becomes the definitive experience - no competing CTAs
- Natural conclusion leads to "Explore the complete collection" (shelf view)
- Clean, distraction-free progression through 20+ years of memories

**Quality Control:**

- Every piece of text should either be authentic memory or essential context
- Remove marketing-speak and feature bloat
- Focus on Mike's experience: "This is our story" not "This is a cool interactive site"
