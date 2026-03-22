# Scoreboard

A simple, high-contrast scoreboard application optimized for **Even Reality G2 glasses**.

![Scoreboard Preview](preview.png)

## Features

- 🏀 **Large, easy-to-read scores** - Optimized for AR glasses display
- ⏱️ **Game timer** - Countdown with visual warnings when time is low
- 🎯 **Period/Quarter tracking** - Supports 4 quarters + overtime
- 🎨 **High contrast design** - Black background with bright colors for AR visibility
- 📱 **Responsive** - Works on phone, tablet, and glasses
- 💾 **Auto-save** - State persists in local storage
- ⌨️ **Keyboard shortcuts** - Quick controls for desktop use

## Usage with Even Reality G2

1. Open the app in your phone's browser
2. Connect your G2 glasses
3. Cast/mirror the browser to your glasses
4. Press **"Toggle Controls"** to hide the control panel and show only the scoreboard
5. The scores and timer will display clearly on your glasses!

## Controls

### Score Buttons
- **+1, +2, +3** - Add points to each team
- **-1** - Subtract a point (for corrections)

### Timer Controls
- **Set** - Set custom time (MM:SS format)
- **Start/Stop** - Toggle the countdown
- **Reset** - Reset to 12:00

### Period/Quarter
- **1, 2, 3, 4** - Set the current period
- **OT** - Overtime

### Keyboard Shortcuts
- **Space** - Start/Stop timer
- **H** - Home team +1
- **Shift+H** - Home team -1
- **A** - Away team +1
- **Shift+A** - Away team -1
- **G** - Toggle glasses mode (hide controls)

## Glasses Mode

Press **"Toggle Controls"** or press **G** on keyboard to enter glasses mode:
- Hides all control buttons
- Shows only the scoreboard
- Larger text for better visibility
- Perfect for casting to G2 glasses

## Hosting Options

### GitHub Pages (Recommended)
1. Go to repository Settings > Pages
2. Set source to "main" branch
3. Access at: `https://yourusername.github.io/scoreboard`

### Local
Just open `index.html` in a browser - no server needed!

## Customization

Edit `styles.css` to customize:
- Colors (look for team colors: `#00aaff` for home, `#ffaa00` for away)
- Font sizes
- Timer warning thresholds

Edit `app.js` to change:
- Default timer duration (line with `timeRemaining: 720`)
- Keyboard shortcuts

## Tech Stack

- Pure HTML, CSS, JavaScript
- No dependencies
- No build step required
- Works offline

## License

MIT License - Free to use and modify!
