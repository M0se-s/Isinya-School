// Component Loader Utility
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        const html = await response.text();
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = html;
        }
    } catch (error) {
        console.error(`Error loading component ${componentPath}:`, error);
    }
}

// Load all common components
async function loadComponents() {
    await Promise.all([
        loadComponent('sidebar-container', '../components/sidebar.html'),
        loadComponent('header-container', '../components/header.html'),
        loadComponent('modals-container', '../components/modals.html')
    ]);
    
    // Dispatch event when components are loaded
    window.dispatchEvent(new Event('componentsLoaded'));
}

// Initialize components on page load
document.addEventListener('DOMContentLoaded', () => {
    loadComponents();
});
