// ============================
// EDDIE TV - JAVASCRIPT
// Reality TV Streaming Platform
// ============================

// Stock video URLs (using free videos from various sources)
const STOCK_VIDEOS = [
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
];

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    setupChannelNavigation();
    setupCarousels();
    setupSearch();
    setupHoverEffects();
    setupAccessibility();
    setupSidebarResize();
    setupSidebarCollapse();
    setupVideoPlayer();
}

// ============================
// CHANNEL NAVIGATION
// ============================

function setupChannelNavigation() {
    const channelButtons = document.querySelectorAll('.channel-btn');
    const channelContents = document.querySelectorAll('.channel-content');

    channelButtons.forEach(button => {
        button.addEventListener('click', () => {
            const channelId = button.getAttribute('data-channel');
            
            // Remove active class from all buttons and content
            channelButtons.forEach(btn => btn.classList.remove('active'));
            channelContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const targetContent = document.getElementById(channelId);
            if (targetContent) {
                targetContent.classList.add('active');
                
                // Scroll to top of content smoothly
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                
                // Announce channel change for screen readers
                announceToScreenReader(`Nu kijken op ${button.querySelector('.channel-name').textContent}`);
            }
        });
    });
}

// ============================
// CAROUSEL FUNCTIONALITY
// ============================

function setupCarousels() {
    const carousels = document.querySelectorAll('.carousel');
    
    carousels.forEach(carousel => {
        const content = carousel.querySelector('.carousel-content');
        const prevBtn = carousel.querySelector('.carousel-btn.prev');
        const nextBtn = carousel.querySelector('.carousel-btn.next');
        
        if (!content || !prevBtn || !nextBtn) return;
        
        // Calculate scroll amount (width of one card plus gap)
        const scrollAmount = 300;
        
        // Previous button
        prevBtn.addEventListener('click', () => {
            content.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });
        
        // Next button
        nextBtn.addEventListener('click', () => {
            content.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
        
        // Update button visibility based on scroll position
        const updateButtonVisibility = () => {
            const maxScroll = content.scrollWidth - content.clientWidth;
            
            if (content.scrollLeft <= 0) {
                prevBtn.style.opacity = '0';
                prevBtn.style.pointerEvents = 'none';
            } else {
                prevBtn.style.opacity = '1';
                prevBtn.style.pointerEvents = 'auto';
            }
            
            if (content.scrollLeft >= maxScroll - 10) {
                nextBtn.style.opacity = '0';
                nextBtn.style.pointerEvents = 'none';
            } else {
                nextBtn.style.opacity = '1';
                nextBtn.style.pointerEvents = 'auto';
            }
        };
        
        // Initial check
        updateButtonVisibility();
        
        // Update on scroll
        content.addEventListener('scroll', updateButtonVisibility);
        
        // Update on window resize
        window.addEventListener('resize', updateButtonVisibility);
        
        // Touch/swipe support for mobile
        let isDown = false;
        let startX;
        let scrollLeft;
        
        content.addEventListener('mousedown', (e) => {
            isDown = true;
            content.style.cursor = 'grabbing';
            startX = e.pageX - content.offsetLeft;
            scrollLeft = content.scrollLeft;
        });
        
        content.addEventListener('mouseleave', () => {
            isDown = false;
            content.style.cursor = 'grab';
        });
        
        content.addEventListener('mouseup', () => {
            isDown = false;
            content.style.cursor = 'grab';
        });
        
        content.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - content.offsetLeft;
            const walk = (x - startX) * 2;
            content.scrollLeft = scrollLeft - walk;
        });
    });
}

// ============================
// SEARCH FUNCTIONALITY
// ============================

function setupSearch() {
    const searchInput = document.querySelector('.search-input');
    
    if (!searchInput) return;
    
    // Debounce function to limit search calls
    let searchTimeout;
    
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        
        searchTimeout = setTimeout(() => {
            const query = e.target.value.trim();
            
            if (query.length > 0) {
                performSearch(query);
            } else {
                clearSearchResults();
            }
        }, 300);
    });
    
    // Clear search on escape key
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            clearSearchResults();
            searchInput.blur();
        }
    });
}

function performSearch(query) {
    // In a real app, this would make an API call
    console.log(`Searching for: ${query}`);
    
    // Show search overlay with results
    announceToScreenReader(`Zoeken naar ${query}`);
}

function clearSearchResults() {
    // Clear any search results
    console.log('Clearing search results');
}

// ============================
// HOVER EFFECTS & INTERACTIONS
// ============================

function setupHoverEffects() {
    const showCards = document.querySelectorAll('.show-card');
    
    showCards.forEach(card => {
        // Add hover sound effect (optional - commented out for now)
        card.addEventListener('mouseenter', () => {
            // Could add subtle sound effect here
            card.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.zIndex = '1';
        });
        
        // Click handler for cards
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking the play button
            if (e.target.classList.contains('play-overlay')) {
                playContent(card);
            } else {
                showContentDetails(card);
            }
        });
    });
    
    // Hero play buttons
    const heroPlayButtons = document.querySelectorAll('.hero-actions .btn-primary');
    heroPlayButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const heroSection = btn.closest('.hero-section');
            const title = heroSection.querySelector('.hero-title').textContent;
            playContent(null, title);
        });
    });
    
    // More info buttons
    const moreInfoButtons = document.querySelectorAll('.hero-actions .btn-secondary');
    moreInfoButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const heroSection = btn.closest('.hero-section');
            const title = heroSection.querySelector('.hero-title').textContent;
            showContentDetails(null, title);
        });
    });
}

function playContent(cardElement, title = null) {
    const contentTitle = title || cardElement.querySelector('.card-title').textContent;
    
    console.log(`Playing: ${contentTitle}`);
    announceToScreenReader(`Nu afspelen: ${contentTitle}`);
    
    // Get a random stock video
    const randomVideo = STOCK_VIDEOS[Math.floor(Math.random() * STOCK_VIDEOS.length)];
    
    // Open video modal
    openVideoModal(contentTitle, randomVideo);
}

function showContentDetails(cardElement, title = null) {
    const contentTitle = title || cardElement.querySelector('.card-title').textContent;
    
    console.log(`Showing details for: ${contentTitle}`);
    announceToScreenReader(`Details weergeven voor ${contentTitle}`);
    
    // In a real app, this would open a modal with:
    // - Full description
    // - Cast & crew
    // - Episodes list
    // - Ratings & reviews
    // - Similar content recommendations
    
    showNotification(`ℹ️ Details voor: ${contentTitle}`);
}

// ============================
// VIDEO PLAYER MODAL
// ============================

function setupVideoPlayer() {
    const modal = document.getElementById('videoModal');
    const closeBtn = document.querySelector('.video-close-btn');
    const overlay = document.querySelector('.video-modal-overlay');
    const videoPlayer = document.getElementById('videoPlayer');
    
    if (!modal || !closeBtn || !overlay || !videoPlayer) return;
    
    // Close button
    closeBtn.addEventListener('click', closeVideoModal);
    
    // Click overlay to close
    overlay.addEventListener('click', closeVideoModal);
    
    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeVideoModal();
        }
    });
}

function openVideoModal(title, videoUrl) {
    const modal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    const videoTitle = document.getElementById('videoTitle');
    const videoDescription = document.getElementById('videoDescription');
    
    if (!modal || !videoPlayer) return;
    
    // Set video source
    videoPlayer.src = videoUrl;
    videoPlayer.load(); // Force load the new video
    
    // Set title and description
    videoTitle.textContent = title;
    videoDescription.textContent = `Geniet van ${title}! Deze preview toont een demonstratievideo. In de volledige versie zou u hier de complete aflevering kunnen bekijken met alle functies zoals ondertiteling, kwaliteitsinstellingen en meer.`;
    
    // Show modal (full page)
    modal.classList.add('active');
    
    // Hide main content
    const mainContent = document.querySelector('.app-container');
    if (mainContent) {
        mainContent.style.display = 'none';
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Play video with error handling
    const playPromise = videoPlayer.play();
    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                console.log('Video playing successfully');
            })
            .catch(err => {
                console.log('Auto-play prevented, user needs to click play:', err);
                // Video will still be ready to play manually
            });
    }
    
    announceToScreenReader(`Video speler geopend voor ${title}`);
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    
    if (!modal || !videoPlayer) return;
    
    // Pause and reset video
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
    videoPlayer.src = ''; // Clear source to stop loading
    
    // Hide modal
    modal.classList.remove('active');
    
    // Show main content again
    const mainContent = document.querySelector('.app-container');
    if (mainContent) {
        mainContent.style.display = '';
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    announceToScreenReader('Video speler gesloten');
}

// ============================
// NOTIFICATIONS
// ============================

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Style it
    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        background: 'linear-gradient(135deg, #FF6B35 0%, #E55A28 100%)',
        color: 'white',
        padding: '16px 24px',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        zIndex: '1000',
        fontSize: '16px',
        fontWeight: '600',
        animation: 'slideInUp 0.3s ease',
        maxWidth: '400px'
    });
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutDown 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            transform: translateY(100px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutDown {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(100px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================
// ACCESSIBILITY
// ============================

function setupAccessibility() {
    // Create live region for announcements
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('role', 'status');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
    document.body.appendChild(liveRegion);
    
    // Store reference for announcements
    window.screenReaderAnnouncer = liveRegion;
    
    // Keyboard navigation improvements
    setupKeyboardNavigation();
    
    // Focus trap for modals (when implemented)
    setupFocusManagement();
}

function announceToScreenReader(message) {
    if (window.screenReaderAnnouncer) {
        window.screenReaderAnnouncer.textContent = message;
    }
}

function setupKeyboardNavigation() {
    // Arrow key navigation for carousels
    const carousels = document.querySelectorAll('.carousel-content');
    
    carousels.forEach(carousel => {
        carousel.setAttribute('tabindex', '0');
        
        carousel.addEventListener('keydown', (e) => {
            const scrollAmount = 300;
            
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                carousel.scrollBy({
                    left: -scrollAmount,
                    behavior: 'smooth'
                });
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                carousel.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Quick channel switching with number keys
    document.addEventListener('keydown', (e) => {
        const channelButtons = document.querySelectorAll('.channel-btn');
        
        if (e.key >= '1' && e.key <= '4') {
            e.preventDefault();
            const index = parseInt(e.key) - 1;
            if (channelButtons[index]) {
                channelButtons[index].click();
            }
        }
        
        // Escape key to close modals (when implemented)
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
}

function setupFocusManagement() {
    // Will be used when modals are implemented
    // Ensures focus stays within modal when open
}

function closeAllModals() {
    // Close any open modals
    console.log('Closing all modals');
}

// ============================
// LIVE VIEWER COUNT UPDATES
// ============================

function updateLiveViewerCounts() {
    const liveViewerElements = document.querySelectorAll('.live-viewers');
    
    liveViewerElements.forEach(element => {
        // Simulate live viewer count updates
        setInterval(() => {
            const currentCount = parseInt(element.textContent.replace(/\D/g, ''));
            const change = Math.floor(Math.random() * 200) - 100; // Random change -100 to +100
            const newCount = Math.max(1000, currentCount + change);
            
            element.textContent = `👥 ${newCount.toLocaleString('nl-NL')} kijkers`;
        }, 5000); // Update every 5 seconds
    });
    
    // Update viewer counts in live cards
    const liveInfoElements = document.querySelectorAll('.live-info');
    liveInfoElements.forEach(element => {
        setInterval(() => {
            const currentCount = parseInt(element.textContent.replace(/\D/g, ''));
            const change = Math.floor(Math.random() * 100) - 50;
            const newCount = Math.max(500, currentCount + change);
            
            element.textContent = `${newCount.toLocaleString('nl-NL')} kijkers nu`;
        }, 5000);
    });
}

// Start live updates
updateLiveViewerCounts();

// ============================
// PROGRESS BAR ANIMATION
// ============================

function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

// Animate progress bars when page loads
setTimeout(animateProgressBars, 500);

// ============================
// RESPONSIVE SIDEBAR TOGGLE
// ============================

function setupMobileSidebar() {
    // Create hamburger menu button for mobile
    const hamburger = document.createElement('button');
    hamburger.className = 'mobile-menu-btn';
    hamburger.innerHTML = '☰';
    hamburger.setAttribute('aria-label', 'Menu openen');
    
    Object.assign(hamburger.style, {
        display: 'none',
        position: 'fixed',
        top: '20px',
        left: '20px',
        width: '48px',
        height: '48px',
        background: 'rgba(255, 107, 53, 0.9)',
        border: 'none',
        borderRadius: '50%',
        color: 'white',
        fontSize: '24px',
        cursor: 'pointer',
        zIndex: '200',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)'
    });
    
    // Show on mobile
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    if (mediaQuery.matches) {
        hamburger.style.display = 'flex';
        hamburger.style.alignItems = 'center';
        hamburger.style.justifyContent = 'center';
    }
    
    mediaQuery.addEventListener('change', (e) => {
        if (e.matches) {
            hamburger.style.display = 'flex';
            hamburger.style.alignItems = 'center';
            hamburger.style.justifyContent = 'center';
        } else {
            hamburger.style.display = 'none';
        }
    });
    
    document.body.appendChild(hamburger);
    
    // Toggle sidebar
    const sidebar = document.querySelector('.sidebar');
    hamburger.addEventListener('click', () => {
        sidebar.classList.toggle('mobile-open');
        
        if (sidebar.classList.contains('mobile-open')) {
            hamburger.innerHTML = '✕';
            hamburger.setAttribute('aria-label', 'Menu sluiten');
        } else {
            hamburger.innerHTML = '☰';
            hamburger.setAttribute('aria-label', 'Menu openen');
        }
    });
    
    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
            sidebar.classList.remove('mobile-open');
            hamburger.innerHTML = '☰';
            hamburger.setAttribute('aria-label', 'Menu openen');
        }
    });
}

setupMobileSidebar();

// ============================
// SIDEBAR RESIZE
// ============================

function setupSidebarResize() {
    const sidebar = document.querySelector('.sidebar');
    const resizeHandle = document.querySelector('.resize-handle');
    const mainContent = document.querySelector('.main-content');
    
    if (!sidebar || !resizeHandle || !mainContent) return;
    
    let isResizing = false;
    let startX = 0;
    let startWidth = 0;
    
    const minWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sidebar-min-width'));
    const maxWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sidebar-max-width'));
    
    resizeHandle.addEventListener('mousedown', (e) => {
        // Don't allow resizing if sidebar is collapsed
        if (sidebar.classList.contains('collapsed')) return;
        
        isResizing = true;
        startX = e.clientX;
        startWidth = sidebar.offsetWidth;
        
        resizeHandle.classList.add('resizing');
        document.body.style.cursor = 'ew-resize';
        document.body.style.userSelect = 'none';
        
        e.preventDefault();
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isResizing) return;
        
        const diff = e.clientX - startX;
        let newWidth = startWidth + diff;
        
        // Clamp width between min and max
        newWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));
        
        // Update CSS variable
        document.documentElement.style.setProperty('--sidebar-width', `${newWidth}px`);
        
        // Update sidebar and main content
        sidebar.style.width = `${newWidth}px`;
        mainContent.style.marginLeft = `${newWidth}px`;
        mainContent.style.maxWidth = `calc(100vw - ${newWidth}px)`;
    });
    
    document.addEventListener('mouseup', () => {
        if (isResizing) {
            isResizing = false;
            resizeHandle.classList.remove('resizing');
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        }
    });
}

// ============================
// SIDEBAR COLLAPSE
// ============================

function setupSidebarCollapse() {
    const sidebar = document.querySelector('.sidebar');
    const collapseToggleClose = document.querySelector('.collapse-toggle-close');
    const collapseToggleOpen = document.querySelector('.collapse-toggle-open');
    const mainContent = document.querySelector('.main-content');
    
    if (!sidebar || !collapseToggleClose || !collapseToggleOpen || !mainContent) return;
    
    // Close button (X in sidebar)
    collapseToggleClose.addEventListener('click', () => {
        sidebar.classList.add('collapsed');
        mainContent.style.marginLeft = '0';
        mainContent.style.maxWidth = '100vw';
        announceToScreenReader('Sidebar ingeklapt');
    });
    
    // Open button (hamburger in top bar)
    collapseToggleOpen.addEventListener('click', () => {
        sidebar.classList.remove('collapsed');
        const sidebarWidth = sidebar.offsetWidth;
        mainContent.style.marginLeft = `${sidebarWidth}px`;
        mainContent.style.maxWidth = `calc(100vw - ${sidebarWidth}px)`;
        announceToScreenReader('Sidebar uitgeklapt');
    });
}

// ============================
// PERFORMANCE OPTIMIZATION
// ============================

// Lazy load images as they come into viewport
function setupLazyLoading() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // Load high-res image
                observer.unobserve(img);
            }
        });
    });
    
    const images = document.querySelectorAll('.card-image, .hero-background');
    images.forEach(img => imageObserver.observe(img));
}

setupLazyLoading();

// ============================
// ANALYTICS (Placeholder)
// ============================

function trackEvent(eventName, data) {
    console.log('Analytics Event:', eventName, data);
    // In production, send to analytics service
}

// Track page view
trackEvent('page_view', {
    page: 'home',
    timestamp: new Date().toISOString()
});

// Export functions for external use
window.EddieTV = {
    playContent,
    showContentDetails,
    announceToScreenReader,
    trackEvent
};

console.log('🎬 Eddie TV initialized successfully!');
