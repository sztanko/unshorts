# YouTube Shorts Blocker

A Chrome extension that removes YouTube Shorts from your browsing experience and replaces them with a stern message.

## Features

- Hides all YouTube Shorts sections on the main page, home feed, and subscriptions
- Replaces individual Shorts videos with the message "No shorts for you, George!"
- Works on dynamically loaded content
- Clean, minimal implementation

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top right corner
3. Click "Load unpacked"
4. Select the folder containing these extension files
5. The extension will now be active on YouTube

## Files

- `manifest.json` - Extension configuration
- `content.js` - Main logic for blocking shorts
- `styles.css` - Styling for the replacement message
- `README.md` - This file

## Notes

You'll need to add icon files (icon16.png, icon48.png, icon128.png) or remove the icons section from the manifest if you don't want to create icons.

## Testing

1. Visit youtube.com
2. Shorts sections should be hidden from the main page
3. Navigate to any shorts URL (e.g., youtube.com/shorts/xxxxx)
4. You should see "No shorts for you, George!" instead of the video
