// Chart Initializations

// Dashboard Charts
function initDashboardCharts() {
    const collectionCtx = document.getElementById('collectionChart');
    if (collectionCtx) {
        new Chart(collectionCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Paid', 
                    data: [65000, 59000, 80000, 81000, 56000, 55000, 40000, 45000, 78000, 92000, 85000, 90000],
                    backgroundColor: '#22c55e', 
                    borderRadius: 6, 
                    barThickness: 12
                }, {
                    label: 'Outstanding', 
                    data: [-15000, -12000, -8000, -5000, -10000, -15000, -25000, -30000, -12000, -8000, -10000, -5000],
                    backgroundColor: '#cbd5e1', 
                    borderRadius: 6, 
                    barThickness: 12
                }]
            },
            options: {
                responsive: true, 
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { stacked: true, grid: { display: false }, border: { display: false } },
                    y: { 
                        stacked: true, 
                        grid: { color: '#f1f5f9' }, 
                        border: { display: false }, 
                        ticks: { callback: v => Math.abs(v) >= 1000 ? (Math.abs(v)/1000) + 'k' : Math.abs(v) } 
                    }
                }
            }
        });
    }

    const enrollmentCtx = document.getElementById('enrollmentChart');
    if (enrollmentCtx) {
        new Chart(enrollmentCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Paid', 'Partial', 'Unpaid'],
                datasets: [{ 
                    data: [65, 20, 15], 
                    backgroundColor: ['#22c55e', '#f59e0b', '#ef4444'], 
                    borderWidth: 0, 
                    cutout: '80%' 
                }]
            },
            options: { 
                responsive: true, 
                maintainAspectRatio: false, 
                plugins: { 
                    legend: { 
                        position: 'bottom', 
                        labels: { 
                            usePointStyle: true, 
                            padding: 20, 
                            font: { size: 10, weight: '600' } 
                        } 
                    } 
                } 
            }
        });
    }
}

// Fee Management Charts
function initFeeCharts() {
    initFeeCollectionChart();
}

function initFeeCollectionChart() {
    const ctx = document.getElementById('feeCollectionChart');
    if (ctx) {
        new Chart(ctx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Collected',
                    data: [450000, 380000, 520000, 410000, 490000, 550000],
                    backgroundColor: '#10B981',
                    borderRadius: 6,
                    barThickness: 16
                }, {
                    label: 'Expected',
                    data: [500000, 500000, 550000, 500000, 550000, 600000],
                    backgroundColor: '#e2e8f0',
                    borderRadius: 6,
                    barThickness: 16
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { grid: { display: false }, border: { display: false } },
                    y: { 
                        grid: { color: '#f1f5f9' }, 
                        border: { display: false },
                        ticks: { callback: v => (v/1000) + 'k' }
                    }
                }
            }
        });
    }
}

// Reports Charts
function initReportsCharts() {
    // Revenue Distribution
    const revenueCtx = document.getElementById('revenueReportChart');
    if (revenueCtx) {
        new Chart(revenueCtx.getContext('2d'), {
            type: 'pie',
            data: {
                labels: ['Tuition Fees', 'Transport', 'Boarding', 'Lunch Program', 'Other'],
                datasets: [{
                    data: [45, 15, 25, 10, 5],
                    backgroundColor: ['#22c55e', '#3b82f6', '#8b5cf6', '#f59e0b', '#64748b'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true, 
                maintainAspectRatio: false,
                plugins: { 
                    legend: { 
                        position: 'right', 
                        labels: { 
                            usePointStyle: true, 
                            padding: 20 
                        } 
                    } 
                }
            }
        });
    }

    // Performance Chart
    const performanceCtx = document.getElementById('performanceReportChart');
    if (performanceCtx) {
        new Chart(performanceCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Form 1', 'Form 2', 'Form 3', 'Form 4'],
                datasets: [{
                    label: 'Avg Grade (Points)',
                    data: [8.5, 7.2, 7.8, 6.9],
                    backgroundColor: '#8b5cf6',
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true, 
                maintainAspectRatio: false,
                scales: { 
                    y: { 
                        beginAtZero: true, 
                        max: 12 
                    } 
                }
            }
        });
    }
}

// Fee Tab Switching
function switchFeeTab(tabName, event) {
    event.preventDefault();
    
    // Hide all fee tab contents
    document.querySelectorAll('.fee-tab-content').forEach(tab => {
        tab.classList.add('hidden');
    });
    
    // Remove active state from all fee tab buttons
    document.querySelectorAll('.fee-tab').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.remove('hidden');
    }
    
    // Activate clicked button
    const button = event.target.closest('.fee-tab');
    if (button) {
        button.classList.add('active');
    }
}

// Initialize charts on page load
document.addEventListener('DOMContentLoaded', () => {
    // Determine which page we're on and initialize appropriate charts
    const path = window.location.pathname;
    
    if (path.includes('dashboard') || path.endsWith('/') || path.endsWith('index.html')) {
        initDashboardCharts();
    } else if (path.includes('fee-management')) {
        initFeeCharts();
    } else if (path.includes('reports')) {
        initReportsCharts();
    }
    
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        initDashboardCharts, 
        initFeeCharts, 
        initReportsCharts,
        switchFeeTab 
    };
}
