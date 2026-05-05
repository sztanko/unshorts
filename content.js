// YouTube Shorts Blocker - Content Script

const MESSAGE = "No shorts for you, George!";

// Function to create replacement element
function createReplacementElement() {
  const div = document.createElement('div');
  div.className = 'no-shorts-message';
  div.textContent = MESSAGE;
  return div;
}

// Function to block shorts on main page (home, subscriptions, etc.)
function blockShortsOnMainPage() {
  // Target Shorts shelf sections
  const shortsSelectors = [
    'ytd-reel-shelf-renderer',
    'ytd-rich-shelf-renderer[is-shorts]',
    '[is-shorts]'
  ];

  shortsSelectors.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      if (!el.classList.contains('shorts-blocked')) {
        el.classList.add('shorts-blocked');
        el.style.display = 'none';
      }
    });
  });

  // Also remove individual short items in grid/list views
  const shortItems = document.querySelectorAll('a[href*="/shorts/"]');
  shortItems.forEach(link => {
    const parent = link.closest('ytd-grid-video-renderer, ytd-rich-item-renderer, ytd-video-renderer');
    if (parent && !parent.classList.contains('shorts-blocked')) {
      parent.classList.add('shorts-blocked');
      parent.style.display = 'none';
    }
  });
}

// Function to hide shorts video player
function replaceShortsPlayer() {
  // Check if we're on a shorts URL
  if (!window.location.pathname.includes('/shorts/')) {
    return;
  }

  // Target the shorts player container - only specific shorts elements
  const selectors = [
    'ytd-reel-video-renderer',
    'ytd-shorts',
    '#shorts-container'
  ];

  selectors.forEach(selector => {
    const player = document.querySelector(selector);
    if (player && !player.classList.contains('shorts-blocked')) {
      player.classList.add('shorts-blocked');
      player.style.display = 'none';
    }
  });
}

// Function to remove Shorts menu item from sidebar
function removeShortsMenuItem() {
  // Find all guide entry renderers (sidebar menu items)
  const guideEntries = document.querySelectorAll('ytd-guide-entry-renderer');

  guideEntries.forEach(entry => {
    // Check if this entry links to Shorts
    const link = entry.querySelector('a[title="Shorts"], a[href*="/shorts"]');
    if (link && !entry.classList.contains('shorts-blocked')) {
      entry.classList.add('shorts-blocked');
      entry.style.display = 'none';
    }
  });
}

// Main observer to watch for dynamically loaded content
function observeYouTube() {
  const observer = new MutationObserver((mutations) => {
    blockShortsOnMainPage();
    replaceShortsPlayer();
    removeShortsMenuItem();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Initial run
  blockShortsOnMainPage();
  replaceShortsPlayer();
  removeShortsMenuItem();
}

// Wait for page load and start observing
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', observeYouTube);
} else {
  observeYouTube();
}

// Also run on URL changes (for SPA navigation)
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    setTimeout(() => {
      blockShortsOnMainPage();
      replaceShortsPlayer();
      removeShortsMenuItem();
    }, 100);
  }
}).observe(document, { subtree: true, childList: true });
