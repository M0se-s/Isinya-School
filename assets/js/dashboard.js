// Dashboard interactions: wire buttons, select filters and search

document.addEventListener('DOMContentLoaded', () => {
    const rangeSelect = document.getElementById('collectionRangeSelect');
    const viewAllBtn = document.getElementById('viewAllPaymentsBtn');
    const sendRemindersBtn = document.querySelector('.send-reminders-btn');

    // Chart range filter
    if (rangeSelect) {
        rangeSelect.addEventListener('change', (e) => {
            const val = e.target.value;
            if (window.collectionChart) {
                // Demo: swap between two datasets
                if (val === 'Last Year') {
                    window.collectionChart.data.datasets[0].data = [55000, 48000, 76000, 72000, 60000, 62000, 41000, 42000, 70000, 85000, 78000, 82000];
                } else {
                    window.collectionChart.data.datasets[0].data = [65000, 59000, 80000, 81000, 56000, 55000, 40000, 45000, 78000, 92000, 85000, 90000];
                }
                window.collectionChart.update();
            }
        });
    }

    // View All button
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', () => {
            window.location.href = 'fee-management.html';
        });
    }

    // Send Reminders button
    if (sendRemindersBtn) {
        sendRemindersBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (typeof showComingSoon === 'function') showComingSoon('Reminders');
            else alert('Feature coming soon');
        });
    }

    // If header/search isn't loaded yet, wait for components to be loaded (loader.js dispatches 'componentsLoaded')
    function attachSearch() {
        const searchInput = document.getElementById('globalSearchInput');
        if (!searchInput) return;
        searchInput.addEventListener('input', (e) => {
            const q = e.target.value.toLowerCase().trim();
            document.querySelectorAll('tbody tr').forEach(row => {
                const name = row.querySelector('td span')?.textContent.toLowerCase() || '';
                row.style.display = name.includes(q) ? '' : 'none';
            });
        });
    }

    attachSearch();
    window.addEventListener('componentsLoaded', attachSearch);
});

// Render recent payments from dummy data
function renderRecentPayments() {
    const tbody = document.getElementById('recentPaymentsTbody');
    if (!tbody || !window.recentPayments) return;
    const colors = ['blue', 'purple', 'rose', 'emerald', 'amber'];
    tbody.innerHTML = window.recentPayments.slice(0, 10).map((p, i) => {
        const initials = p.studentName.split(' ').map(n => n[0]).join('');
        const color = colors[i % 5];
        return `<tr class="hover:bg-slate-50/50 transition-colors group">
            <td class="px-6 py-4"><div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-${color}-100 text-${color}-600 flex items-center justify-center text-xs font-bold">${initials}</div>
                <span class="text-sm font-medium">${p.studentName}</span></div></td>
            <td class="px-6 py-4 text-xs text-slate-500">${p.class}</td>
            <td class="px-6 py-4 text-xs text-slate-500">${p.date}</td>
            <td class="px-6 py-4 text-sm font-bold text-right">KES ${p.amount.toLocaleString()}</td>
        </tr>`;
    }).join('');
}

// Render on page load
document.addEventListener('DOMContentLoaded', () => {
    // setTimeout(renderRecentPayments, 100); // Commented out to use hardcoded HTML data
});
