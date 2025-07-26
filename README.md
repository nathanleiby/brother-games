# 🎮 Brothers Gaming Timeline

A beautiful interactive timeline showcasing all the games you and your brothers have played together throughout the years. Built with the Knight Lab Timeline library for a stunning visual experience.

## 🚀 Quick Start

1. Open `index.html` in your web browser
2. Navigate through your gaming history using the interactive timeline
3. Click on any event to see details and memories

## ✨ Features

- **Interactive Timeline**: Smooth scrolling through years of gaming memories
- **Beautiful Design**: Modern gradient background with gaming-themed styling
- **Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Rich Media**: Each game entry includes images and detailed descriptions
- **Customizable**: Easy to add, edit, or remove gaming memories

## 🎯 Customization

### Adding New Games

To add a new game to the timeline, add a new object to the `events` array in the JavaScript section:

```javascript
{
    "media": {
        "url": "https://your-image-url.com/game-image.jpg",
        "caption": "Brief description of the image",
        "credit": "Image credit or source"
    },
    "start_date": {
        "year": "2024"
    },
    "text": {
        "headline": "Game Title - Your Memory",
        "text": "<p>Your personal memory or story about playing this game together. Include specific details, inside jokes, or memorable moments.</p>"
    }
}
```

### Editing Existing Entries

1. Find the game entry in the `timelineData.events` array
2. Modify the `headline`, `text`, `media`, or `start_date` fields
3. Refresh the page to see your changes

### Styling Customization

The timeline uses CSS custom properties and can be easily styled by modifying the `<style>` section in the HTML file. Key areas to customize:

- **Background**: Change the gradient colors in the `body` style
- **Header**: Modify the header appearance and text
- **Timeline Colors**: Adjust the `default_bg_color` in the timeline options

## 🎮 Sample Games Included

The timeline comes pre-populated with popular games from different eras:

- **1995**: Super Mario Bros. - The beginning
- **1997**: GoldenEye 007 - Multiplayer madness
- **1999**: Pokemon Trading Card Game - Card battles
- **2001**: Halo: Combat Evolved - LAN parties
- **2003**: Mario Kart: Double Dash!! - Racing chaos
- **2004**: World of Warcraft - MMO adventures
- **2007**: Call of Duty 4: Modern Warfare - Competitive FPS
- **2011**: Minecraft - Creative building
- **2015**: Rocket League - Car soccer
- **2020**: Among Us - Pandemic deception
- **2021**: Valorant - Tactical gameplay
- **2023**: Baldur's Gate 3 - RPG co-op

## 🛠️ Technical Details

- **Framework**: Knight Lab Timeline 3
- **Images**: Unsplash stock photos (replace with your own gaming screenshots)
- **Responsive**: Mobile-first design
- **No Dependencies**: Pure HTML, CSS, and JavaScript

## 🎁 Perfect Gift

This timeline makes a perfect birthday gift for your brother! It's:

- **Personal**: Customized with your shared memories
- **Interactive**: Engaging way to relive gaming moments
- **Memorable**: Captures the bond you share through gaming
- **Shareable**: Easy to send via email or host online

## 📱 Sharing

To share with your brother:

1. Host the files on a web server (GitHub Pages, Netlify, etc.)
2. Send the URL to your brother
3. Or simply open the HTML file locally and share screenshots

---

_Built with love for brothers who game together_ 🎮❤️
