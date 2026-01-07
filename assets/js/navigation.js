// Navigation Logic
function setupNavigation() {
    const navLinks = document.querySelectorAll('.sidebar-link');
    const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        
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

// Initialize navigation on page load
document.addEventListener('DOMContentLoaded', () => {
    // Wait for components to load before setting up navigation
    setTimeout(setupNavigation, 200);
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { setupNavigation };
}
