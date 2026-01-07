// Navigation Logic
function setupNavigation() {
    const navLinks = document.querySelectorAll('.sidebar-link');
    const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        const tooltip = link.getAttribute('data-tooltip');

        if (tooltip && !link.getAttribute('aria-label')) {
            link.setAttribute('aria-label', tooltip);
        }
        
        // Set active state based on current page
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'dashboard.html') ||
            (currentPage === 'index.html' && linkPage === 'dashboard.html')) {
            link.classList.add('bg-slate-100', 'text-slate-900', 'font-semibold');
            link.classList.remove('text-slate-500');
        } else {
            link.classList.remove('bg-slate-100', 'text-slate-900', 'font-semibold');
            link.classList.add('text-slate-500');
        }
    });
}

// Global Search Functionality
function setupGlobalSearch() {
    // Support only globalSearchInput (header)
    const searchInputs = [
        document.getElementById('globalSearchInput')
    ].filter(input => input !== null);

    if (searchInputs.length === 0) return;

    searchInputs.forEach(searchInput => {
        let searchTimeout;
        
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            
            // Debounce search for better performance
            searchTimeout = setTimeout(() => {
                const searchTerm = e.target.value.toLowerCase().trim();
                performSearch(searchTerm);
            }, 300);
        });

        // Handle Enter key
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                clearTimeout(searchTimeout);
                const searchTerm = e.target.value.toLowerCase().trim();
                performSearch(searchTerm);
            }
        });
    });
}

function performSearch(searchTerm) {
    // Clear previous highlights
    removeHighlights();

    if (!searchTerm) {
        showAllContent();
        return;
    }

    let resultsFound = 0;

    // Only search in visible content (not hidden tabs)
    const visibleContent = document.querySelectorAll('.fee-tab-content:not(.hidden), main > *:not(.fee-tab-content)');
    
    // Search in table rows (works for student records, fee management, etc.)
    const tableRows = document.querySelectorAll('tbody tr');
    tableRows.forEach(row => {
        // Check if row is in a hidden tab
        const isInHiddenTab = row.closest('.fee-tab-content.hidden') !== null;
        if (isInHiddenTab) {
            return; // Skip hidden content
        }

        const rowText = row.textContent.toLowerCase();
        if (rowText.includes(searchTerm)) {
            row.style.display = '';
            highlightText(row, searchTerm);
            resultsFound++;
        } else {
            row.style.display = 'none';
        }
    });

    // Search in cards (dashboard cards, stats, etc.)
    const cards = document.querySelectorAll('.glass-card, .bg-white.rounded-2xl, .col-span-3, .col-span-4, .col-span-5');
    cards.forEach(card => {
        // Check if card is in a hidden tab
        const isInHiddenTab = card.closest('.fee-tab-content.hidden') !== null;
        if (isInHiddenTab) {
            return; // Skip hidden content
        }

        // Don't fade out the main content container
        if (card.closest('main') && card.contains(document.querySelector('.fee-tab-content'))) {
            return;
        }

        const cardText = card.textContent.toLowerCase();
        if (cardText.includes(searchTerm)) {
            card.style.opacity = '1';
            highlightText(card, searchTerm);
            resultsFound++;
        } else {
            // Fade out non-matching cards instead of hiding completely
            card.style.opacity = '0.3';
        }
    });

    // Show feedback
    showSearchFeedback(searchTerm, resultsFound);
}

function highlightText(element, searchTerm) {
    // Skip if element already has highlights
    if (element.querySelector('.search-highlight')) return;

    const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    const nodesToHighlight = [];
    let node;

    while (node = walker.nextNode()) {
        if (node.nodeValue.toLowerCase().includes(searchTerm)) {
            nodesToHighlight.push(node);
        }
    }

    nodesToHighlight.forEach(textNode => {
        const parent = textNode.parentNode;
        if (parent.classList && parent.classList.contains('search-highlight')) return;

        const text = textNode.nodeValue;
        const lowerText = text.toLowerCase();
        const index = lowerText.indexOf(searchTerm);

        if (index !== -1) {
            const before = text.substring(0, index);
            const match = text.substring(index, index + searchTerm.length);
            const after = text.substring(index + searchTerm.length);

            const fragment = document.createDocumentFragment();
            
            if (before) fragment.appendChild(document.createTextNode(before));
            
            const highlight = document.createElement('mark');
            highlight.className = 'search-highlight';
            highlight.style.backgroundColor = '#fef08a';
            highlight.style.padding = '2px 4px';
            highlight.style.borderRadius = '4px';
            highlight.style.fontWeight = '600';
            highlight.textContent = match;
            fragment.appendChild(highlight);
            
            if (after) fragment.appendChild(document.createTextNode(after));

            parent.replaceChild(fragment, textNode);
        }
    });
}

function removeHighlights() {
    const highlights = document.querySelectorAll('.search-.bg-white.rounded-2xl, .col-span-3, .col-span-4, .col-span-5, highlight');
    highlights.forEach(highlight => {
        const parent = highlight.parentNode;
        const text = highlight.textContent;
        parent.replaceChild(document.createTextNode(text), highlight);
    });

    // Remove any existing search feedback
    const feedback = document.getElementById('searchFeedback');
    if (feedback) feedback.remove();
}

function showAllContent() {
    // Show all table rows
    const tableRows = document.querySelectorAll('tbody tr');
    tableRows.forEach(row => {
        row.style.display = '';
    });

    // Reset card opacity
    const cards = document.querySelectorAll('.glass-card, [class*="bg-"][class*="rounded-"]');
    cards.forEach(card => {
        card.style.opacity = '1';
    });

    // Remove feedback
    const feedback = document.getElementById('searchFeedback');
    if (feedback) feedback.remove();
}

function showSearchFeedback(searchTerm, resultsCount) {
    // Remove existing feedback
    let feedback = document.getElementById('searchFeedback');
    if (feedback) feedback.remove();

    // Create new feedback
    feedback = document.createElement('div');
    feedback.id = 'searchFeedback';
    feedback.className = 'fixed top-20 right-8 bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-lg z-50 animate-slide-in';
    
    if (resultsCount > 0) {
        feedback.innerHTML = `
            <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <ion-icon name="checkmark-circle" class="text-emerald-600 text-xl"></ion-icon>
                </div>
                <div>
                    <p class="text-sm font-semibold text-slate-900">Found ${resultsCount} result${resultsCount !== 1 ? 's' : ''}</p>
                    <p class="text-xs text-slate-500">for "${searchTerm}"</p>
                </div>
            </div>
        `;
    } else {
        feedback.innerHTML = `
            <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                    <ion-icon name="alert-circle" class="text-amber-600 text-xl"></ion-icon>
                </div>
                <div>
                    <p class="text-sm font-semibold text-slate-900">No results found</p>
                    <p class="text-xs text-slate-500">for "${searchTerm}"</p>
                </div>
            </div>
        `;
    }

    document.body.appendChild(feedback);

    // Auto-remove after 3 seconds
    setTimeout(() => {
        feedback.style.opacity = '0';
        feedback.style.transform = 'translateY(-10px)';
        feedback.style.transition = 'all 0.3s ease';
        setTimeout(() => feedback.remove(), 300);
    }, 3000);
}

const SIDEBAR_BREAKPOINTS = {
    mobileMax: 640,
    tabletMax: 1024
};

// Desktop Sidebar Collapse/Expand Toggle with responsive handling
function setupSidebarToggle() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const mobileBackdrop = document.getElementById('mobileBackdrop');

    if (!sidebar) return;

    const updateToggleState = (isCollapsed) => {
        sidebar.classList.toggle('collapsed', isCollapsed);

        if (!sidebarToggle) return;

        sidebarToggle.setAttribute('aria-expanded', (!isCollapsed).toString());
        sidebarToggle.setAttribute('aria-label', isCollapsed ? 'Expand sidebar' : 'Collapse sidebar');
        sidebarToggle.setAttribute('title', isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar');
    };

    const syncCollapsedPreference = () => {
        const savedState = localStorage.getItem('sidebarCollapsed');
        updateToggleState(savedState === 'true');
    };

    const applyResponsiveState = () => {
        const width = window.innerWidth;
        const isMobile = width <= SIDEBAR_BREAKPOINTS.mobileMax;
        const isTablet = width > SIDEBAR_BREAKPOINTS.mobileMax && width <= SIDEBAR_BREAKPOINTS.tabletMax;
        const isMobileOpen = sidebar.classList.contains('translate-x-0');

        if (isMobile) {
            sidebar.classList.remove('sidebar-compact');
            sidebar.classList.remove('collapsed');

            if (!isMobileOpen) {
                sidebar.classList.add('-translate-x-full');
                sidebar.classList.add('hidden');
                if (mobileBackdrop) mobileBackdrop.classList.add('hidden');
            }

            if (sidebarToggle) {
                sidebarToggle.setAttribute('aria-hidden', 'true');
                sidebarToggle.setAttribute('aria-expanded', 'false');
                sidebarToggle.setAttribute('aria-label', 'Sidebar hidden on mobile');
                sidebarToggle.setAttribute('title', 'Sidebar hidden on mobile');
            }

            return;
        }

        if (document.body.style.overflow === 'hidden') {
            document.body.style.overflow = '';
        }

        sidebar.classList.remove('hidden');
        sidebar.classList.remove('-translate-x-full');
        sidebar.classList.remove('translate-x-0');
        sidebar.style.transform = '';

        if (isTablet) {
            sidebar.classList.add('sidebar-compact');
            sidebar.classList.remove('collapsed');

            if (sidebarToggle) {
                sidebarToggle.setAttribute('aria-hidden', 'true');
                sidebarToggle.setAttribute('aria-expanded', 'false');
                sidebarToggle.setAttribute('aria-label', 'Sidebar locked to icon mode on tablet');
                sidebarToggle.setAttribute('title', 'Sidebar locked to icon mode on tablet');
            }

            return;
        }

        sidebar.classList.remove('sidebar-compact');

        if (sidebarToggle) {
            sidebarToggle.removeAttribute('aria-hidden');
        }

        syncCollapsedPreference();
    };

    window.__applyResponsiveSidebarState = applyResponsiveState;

    applyResponsiveState();
    window.addEventListener('resize', applyResponsiveState);
    window.addEventListener('orientationchange', applyResponsiveState);

    if (!sidebarToggle) return;

    syncCollapsedPreference();

    sidebarToggle.addEventListener('click', () => {
        if (window.innerWidth <= SIDEBAR_BREAKPOINTS.tabletMax) {
            return;
        }

        const nextCollapsed = !sidebar.classList.contains('collapsed');
        updateToggleState(nextCollapsed);
        localStorage.setItem('sidebarCollapsed', nextCollapsed.toString());
    });
}

// Mobile Menu Toggle
function setupMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const sidebar = document.getElementById('sidebar');
    const mobileBackdrop = document.getElementById('mobileBackdrop');
    
    if (!mobileMenuToggle || !sidebar || !mobileBackdrop) return;
    
    // Toggle sidebar visibility
    function toggleSidebar() {
        const isOpen = sidebar.classList.contains('translate-x-0');
        
        if (isOpen) {
            // Close sidebar
            sidebar.classList.remove('translate-x-0');
            sidebar.classList.add('-translate-x-full');
            mobileBackdrop.classList.add('hidden');
            document.body.style.overflow = '';
        } else {
            // Open sidebar
            sidebar.classList.remove('hidden');
            sidebar.classList.remove('-translate-x-full');
            sidebar.classList.add('translate-x-0');
            mobileBackdrop.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        }

        if (typeof window.__applyResponsiveSidebarState === 'function') {
            window.__applyResponsiveSidebarState();
        }
    }
    
    // Toggle on button click
    mobileMenuToggle.addEventListener('click', toggleSidebar);
    
    // Close on backdrop click
    mobileBackdrop.addEventListener('click', toggleSidebar);
    
    // Close sidebar when clicking a link (for better UX)
    const sidebarLinks = sidebar.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                toggleSidebar();
            }
        });
    });
    
    // Close sidebar on window resize to desktop size
    window.addEventListener('resize', () => {
        const width = window.innerWidth;

        if (width > SIDEBAR_BREAKPOINTS.mobileMax) {
            sidebar.classList.remove('translate-x-0', '-translate-x-full');
            sidebar.classList.remove('hidden');
            mobileBackdrop.classList.add('hidden');
            document.body.style.overflow = '';
        } else if (!sidebar.classList.contains('translate-x-0')) {
            sidebar.classList.add('hidden');
        }

        if (typeof window.__applyResponsiveSidebarState === 'function') {
            window.__applyResponsiveSidebarState();
        }
    });
}

// Initialize navigation and search on page load
document.addEventListener('DOMContentLoaded', () => {
    // Wait for components to load before setting up navigation
    setTimeout(() => {
        setupNavigation();
        setupGlobalSearch();
        setupMobileMenu();
        setupSidebarToggle();
    }, 200);
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { setupNavigation };
}
