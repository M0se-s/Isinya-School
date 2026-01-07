// Modal State Management
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) {
        modal.classList.remove('hidden');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) {
        modal.classList.add('hidden');
    }
}

// Student Detail Modal Logic (Legacy/Dashboard)
function openStudentModal(name, grade, initials, isScholarship) {
    const modalAvatar = document.getElementById('modalAvatar');
    const modalScholarship = document.getElementById('modalScholarship');
    document.getElementById('modalName').textContent = name;
    document.getElementById('modalGrade').textContent = grade;
    modalAvatar.textContent = initials;
    const colors = ['bg-blue-100 text-blue-600', 'bg-purple-100 text-purple-600', 'bg-rose-100 text-rose-600', 'bg-amber-100 text-amber-600'];
    modalAvatar.className = `w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold ${colors[name.length % colors.length]}`;
    modalScholarship.innerHTML = isScholarship ? `<span class="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-wide flex items-center gap-1"><ion-icon name="star"></ion-icon> Scholarship</span>` : '';
    openModal('studentModal');
}

// Close on overlay click
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal(overlay.id);
        });
    });

    // Initialize Dashboard Charts
    initDashboardCharts();

    // Initialize Sidebar Navigation
    setupNavigation();
});

// Navigation Logic
function setupNavigation() {
    const navLinks = document.querySelectorAll('.sidebar-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetScreenId = link.getAttribute('data-target');
            showScreen(targetScreenId);
            
            // Update active state
            navLinks.forEach(l => {
                l.classList.remove('sidebar-item-active');
                l.classList.add('sidebar-item-inactive'); // Add hover styles back
                l.classList.add('text-slate-500');
            });
            link.classList.add('sidebar-item-active');
            link.classList.remove('sidebar-item-inactive');
            link.classList.remove('text-slate-500');
        });
    });
}

function showScreen(screenId) {
    // Hide all screens
    const screens = document.querySelectorAll('.screen-content');
    screens.forEach(screen => {
        screen.classList.add('hidden');
    });

    // Show target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.remove('hidden');
        
        // Initialize specific screen charts if not already done
        if (screenId === 'fee-management-screen' && !window.feeChartsInitialized) {
            initFeeCharts();
            window.feeChartsInitialized = true;
        } else if (screenId === 'reports-screen' && !window.reportsChartsInitialized) {
            initReportsCharts();
            window.reportsChartsInitialized = true;
        }
    }
}

// Chart Initializations
function initDashboardCharts() {
    const collectionCtx = document.getElementById('collectionChart');
    if (collectionCtx) {
        new Chart(collectionCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Paid', data: [65000, 59000, 80000, 81000, 56000, 55000, 40000, 45000, 78000, 92000, 85000, 90000],
                    backgroundColor: '#22c55e', borderRadius: 6, barThickness: 12
                }, {
                    label: 'Outstanding', data: [-15000, -12000, -8000, -5000, -10000, -15000, -25000, -30000, -12000, -8000, -10000, -5000],
                    backgroundColor: '#cbd5e1', borderRadius: 6, barThickness: 12
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { stacked: true, grid: { display: false }, border: { display: false } },
                    y: { stacked: true, grid: { color: '#f1f5f9' }, border: { display: false }, ticks: { callback: v => Math.abs(v) >= 1000 ? (Math.abs(v)/1000) + 'k' : Math.abs(v) } }
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
                datasets: [{ data: [65, 20, 15], backgroundColor: ['#22c55e', '#f59e0b', '#ef4444'], borderWidth: 0, cutout: '80%' }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20, font: { size: 10, weight: '600' } } } } }
        });
    }
}

function initFeeCharts() {
    // Fee Collection Trend (Line Chart)
    const feeTrendCtx = document.getElementById('feeTrendChart');
    if (feeTrendCtx) {
        new Chart(feeTrendCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'This Week',
                    data: [12000, 19000, 3000, 5000, 2000, 3000, 15000],
                    borderColor: '#22c55e',
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Last Week',
                    data: [10000, 15000, 8000, 12000, 5000, 6000, 20000],
                    borderColor: '#94a3b8',
                    borderDash: [5, 5],
                    tension: 0.4,
                    fill: false
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { position: 'top', align: 'end', labels: { usePointStyle: true, boxWidth: 8 } } },
                scales: {
                    x: { grid: { display: false }, border: { display: false } },
                    y: { grid: { color: '#f1f5f9' }, border: { display: false } }
                }
            }
        });
    }
}

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
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { position: 'right', labels: { usePointStyle: true, padding: 20 } } }
            }
        });
    }

    // Attendance/Performance
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
                responsive: true, maintainAspectRatio: false,
                scales: { y: { beginAtZero: true, max: 12 } } // 12 points = A
            }
        });
    }
}

// Fee Management Tab Switching (Legacy)
function switchTab(tabName, event) {
    event.preventDefault();
    
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.add('hidden');
    });
    
    // Remove active state from all tab buttons (support both modern-tab and institutional-tab)
    document.querySelectorAll('.modern-tab, .institutional-tab').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.remove('hidden');
    }
    
    // Activate clicked button
    const button = event.target.closest('.modern-tab, .institutional-tab');
    if (button) {
        button.classList.add('active');
    }
    
    // Reinitialize Lucide icons for dynamic content
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Fee Management Tab Switching (New Design)
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
    
    // Initialize fee collection chart if on overview tab
    if (tabName === 'overview' && !window.feeCollectionChartInit) {
        initFeeCollectionChart();
        window.feeCollectionChartInit = true;
    }
}

// Initialize Fee Collection Chart
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
