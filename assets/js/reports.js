// ====================
// REPORTS.JS
// Financial Reports, Audit Log, and Export Tools
// ====================

// ==================== DATA STRUCTURES ====================

// Bursar's Daily Payments (Today's transactions)
let bursarsDailyData = [
    { id: 1, time: '08:15 AM', receiptNo: 'RCP-2026-0001', studentName: 'John Kamau', class: 'Form 4A', method: 'M-Pesa', amount: 25000, receivedBy: 'Bursar' },
    { id: 2, time: '08:45 AM', receiptNo: 'RCP-2026-0002', studentName: 'Mary Wanjiru', class: 'Form 3B', method: 'Cash', amount: 15000, receivedBy: 'Bursar' },
    { id: 3, time: '09:10 AM', receiptNo: 'RCP-2026-0003', studentName: 'Peter Ochieng', class: 'Form 2A', method: 'Bank Transfer', amount: 30000, receivedBy: 'Accountant' },
    { id: 4, time: '09:30 AM', receiptNo: 'RCP-2026-0004', studentName: 'Jane Akinyi', class: 'Form 1C', method: 'M-Pesa', amount: 20000, receivedBy: 'Bursar' },
    { id: 5, time: '10:00 AM', receiptNo: 'RCP-2026-0005', studentName: 'David Mwangi', class: 'Form 4B', method: 'Cash', amount: 25000, receivedBy: 'Bursar' },
    { id: 6, time: '10:30 AM', receiptNo: 'RCP-2026-0006', studentName: 'Grace Njeri', class: 'Form 3A', method: 'M-Pesa', amount: 18000, receivedBy: 'Bursar' },
    { id: 7, time: '11:00 AM', receiptNo: 'RCP-2026-0007', studentName: 'James Otieno', class: 'Form 2B', method: 'Bank Transfer', amount: 35000, receivedBy: 'Accountant' },
    { id: 8, time: '11:25 AM', receiptNo: 'RCP-2026-0008', studentName: 'Sarah Wambui', class: 'Form 1A', method: 'Cash', amount: 15000, receivedBy: 'Bursar' },
    { id: 9, time: '11:50 AM', receiptNo: 'RCP-2026-0009', studentName: 'Michael Kibet', class: 'Form 4A', method: 'M-Pesa', amount: 30000, receivedBy: 'Bursar' },
    { id: 10, time: '12:15 PM', receiptNo: 'RCP-2026-0010', studentName: 'Lucy Muthoni', class: 'Form 3C', method: 'Cash', amount: 12000, receivedBy: 'Bursar' },
    { id: 11, time: '01:30 PM', receiptNo: 'RCP-2026-0011', studentName: 'Daniel Koech', class: 'Form 2C', method: 'M-Pesa', amount: 22000, receivedBy: 'Bursar' },
    { id: 12, time: '02:00 PM', receiptNo: 'RCP-2026-0012', studentName: 'Faith Nyambura', class: 'Form 1B', method: 'Bank Transfer', amount: 28000, receivedBy: 'Accountant' },
    { id: 13, time: '02:30 PM', receiptNo: 'RCP-2026-0013', studentName: 'Patrick Mutua', class: 'Form 4C', method: 'Cash', amount: 20000, receivedBy: 'Bursar' },
    { id: 14, time: '03:00 PM', receiptNo: 'RCP-2026-0014', studentName: 'Rose Chebet', class: 'Form 3A', method: 'M-Pesa', amount: 25000, receivedBy: 'Bursar' },
    { id: 15, time: '03:30 PM', receiptNo: 'RCP-2026-0015', studentName: 'Joseph Kariuki', class: 'Form 2A', method: 'Bank Transfer', amount: 32000, receivedBy: 'Accountant' },
];

// Defaulters Data
let defaultersData = [
    { id: 1, name: 'Ahmed Hassan', admNo: 'ADM-2023-1234', class: 'Form 4A', totalFees: 45000, paid: 15000, outstanding: 30000, daysOverdue: 95, parentPhone: '0712345678' },
    { id: 2, name: 'Beatrice Wairimu', admNo: 'ADM-2023-1456', class: 'Form 3B', totalFees: 40000, paid: 18000, outstanding: 22000, daysOverdue: 72, parentPhone: '0723456789' },
    { id: 3, name: 'Collins Omondi', admNo: 'ADM-2024-2345', class: 'Form 2C', totalFees: 38000, paid: 10000, outstanding: 28000, daysOverdue: 88, parentPhone: '0734567890' },
    { id: 4, name: 'Diana Cheruiyot', admNo: 'ADM-2024-3456', class: 'Form 1A', totalFees: 35000, paid: 5000, outstanding: 30000, daysOverdue: 45, parentPhone: '0745678901' },
    { id: 5, name: 'Emmanuel Njoroge', admNo: 'ADM-2023-4567', class: 'Form 4B', totalFees: 45000, paid: 0, outstanding: 45000, daysOverdue: 120, parentPhone: '0756789012' },
    { id: 6, name: 'Florence Auma', admNo: 'ADM-2023-5678', class: 'Form 3C', totalFees: 40000, paid: 20000, outstanding: 20000, daysOverdue: 58, parentPhone: '0767890123' },
    { id: 7, name: 'George Kimani', admNo: 'ADM-2024-6789', class: 'Form 2A', totalFees: 38000, paid: 15000, outstanding: 23000, daysOverdue: 82, parentPhone: '0778901234' },
    { id: 8, name: 'Hannah Wangari', admNo: 'ADM-2024-7890', class: 'Form 1B', totalFees: 35000, paid: 12000, outstanding: 23000, daysOverdue: 37, parentPhone: '0789012345' },
    { id: 9, name: 'Isaac Rotich', admNo: 'ADM-2023-8901', class: 'Form 4C', totalFees: 45000, paid: 10000, outstanding: 35000, daysOverdue: 105, parentPhone: '0790123456' },
    { id: 10, name: 'Janet Mwende', admNo: 'ADM-2023-9012', class: 'Form 3A', totalFees: 40000, paid: 8000, outstanding: 32000, daysOverdue: 91, parentPhone: '0701234567' },
];

// Audit Log Data
let auditLogData = [
    { id: 1, timestamp: '2026-01-07 15:45', action: 'RECEIPT_VOIDED', description: 'Voided receipt RCP-2026-0098 - duplicate payment recorded', user: 'Bursar', reference: 'RCP-2026-0098', reason: 'Duplicate entry' },
    { id: 2, timestamp: '2026-01-07 14:30', action: 'FEE_EDITED', description: 'Updated fee structure for Form 1 - reduced by KES 2,000', user: 'Principal', reference: 'FEE-FORM1', reason: 'Board resolution' },
    { id: 3, timestamp: '2026-01-07 13:15', action: 'PAYMENT_RECORDED', description: 'Recorded KES 25,000 payment for John Kamau (ADM-2023-1234)', user: 'Bursar', reference: 'RCP-2026-0101', reason: 'Regular payment' },
    { id: 4, timestamp: '2026-01-07 11:45', action: 'INVOICE_CREATED', description: 'Generated invoice INV-2026-0245 for Mary Wanjiru', user: 'Accountant', reference: 'INV-2026-0245', reason: 'New term invoice' },
    { id: 5, timestamp: '2026-01-07 10:30', action: 'FEE_EDITED', description: 'Adjusted fee for Peter Ochieng - scholarship applied (50%)', user: 'Principal', reference: 'ADM-2023-5678', reason: 'Merit scholarship' },
    { id: 6, timestamp: '2026-01-07 09:20', action: 'RECEIPT_VOIDED', description: 'Voided receipt RCP-2026-0095 - incorrect amount entered', user: 'Bursar', reference: 'RCP-2026-0095', reason: 'Data entry error' },
    { id: 7, timestamp: '2026-01-06 16:50', action: 'INVOICE_DELETED', description: 'Deleted invoice INV-2026-0243 - student transferred', user: 'Accountant', reference: 'INV-2026-0243', reason: 'Student transferred out' },
    { id: 8, timestamp: '2026-01-06 15:35', action: 'PAYMENT_RECORDED', description: 'Recorded KES 15,000 payment for Jane Akinyi', user: 'Bursar', reference: 'RCP-2026-0100', reason: 'Partial payment' },
    { id: 9, timestamp: '2026-01-06 14:20', action: 'FEE_EDITED', description: 'Updated boarding fee - increased by KES 1,500', user: 'Principal', reference: 'FEE-BOARDING', reason: 'Cost adjustment' },
    { id: 10, timestamp: '2026-01-06 12:45', action: 'RECEIPT_VOIDED', description: 'Voided receipt RCP-2026-0092 - payment reversed by bank', user: 'Accountant', reference: 'RCP-2026-0092', reason: 'Bank reversal' },
];

let filteredAuditLogData = [...auditLogData];
let filteredDefaultersData = [...defaultersData];

// ==================== DATE UTILITIES ====================

function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}

function getCurrentDate() {
    return formatDate(new Date());
}

// ==================== TAB SWITCHING ====================

function switchReportTab(tabName, event) {
    // Remove active class from all tabs
    document.querySelectorAll('.report-tab').forEach(tab => {
        tab.classList.remove('active', 'bg-emerald-500', 'text-white');
        tab.classList.add('text-slate-600', 'hover:bg-slate-100');
    });

    // Add active class to clicked tab
    event.target.classList.add('active', 'bg-emerald-500', 'text-white');
    event.target.classList.remove('text-slate-600', 'hover:bg-slate-100');

    // Hide all tab contents
    document.querySelectorAll('.report-tab-content').forEach(content => {
        content.classList.add('hidden');
    });

    // Show selected tab content
    document.getElementById(tabName).classList.remove('hidden');

    // Initialize specific tab if needed
    if (tabName === 'analytics') {
        initializeAnalyticsCharts();
    }
}

// ==================== BURSAR'S DAILY REPORT ====================

function renderBursarsDailyTable() {
    const tbody = document.getElementById('bursarsDailyTableBody');
    if (!tbody) return;

    tbody.innerHTML = bursarsDailyData.map(payment => `
        <tr class="hover:bg-slate-50">
            <td class="px-6 py-4 text-sm text-slate-600">${payment.time}</td>
            <td class="px-6 py-4 text-sm font-mono text-slate-900">${payment.receiptNo}</td>
            <td class="px-6 py-4 text-sm text-slate-900 font-medium">${payment.studentName}</td>
            <td class="px-6 py-4 text-sm text-slate-600">${payment.class}</td>
            <td class="px-6 py-4">
                <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getPaymentMethodClass(payment.method)}">
                    <ion-icon name="${getPaymentMethodIcon(payment.method)}"></ion-icon>
                    ${payment.method}
                </span>
            </td>
            <td class="px-6 py-4 text-right text-sm font-semibold text-slate-900 font-mono">KES ${payment.amount.toLocaleString()}</td>
            <td class="px-6 py-4 text-sm text-slate-600">${payment.receivedBy}</td>
        </tr>
    `).join('');
}

function getPaymentMethodClass(method) {
    const classes = {
        'Cash': 'bg-emerald-100 text-emerald-700',
        'M-Pesa': 'bg-blue-100 text-blue-700',
        'Bank Transfer': 'bg-purple-100 text-purple-700'
    };
    return classes[method] || 'bg-slate-100 text-slate-700';
}

function getPaymentMethodIcon(method) {
    const icons = {
        'Cash': 'cash',
        'M-Pesa': 'phone-portrait',
        'Bank Transfer': 'business'
    };
    return icons[method] || 'card';
}

function refreshBursarsDaily() {
    renderBursarsDailyTable();
    showNotification('Data refreshed successfully', 'success');
}

function exportBursarsDaily() {
    // Demo: Show export success toast instead of download
    showToast('Export successful: Bursar\'s Daily Report', 'success', 2000);
}

function generateBursarsDailyCSV() {
    let csv = 'Time,Receipt No,Student Name,Class,Payment Method,Amount,Received By\n';
    bursarsDailyData.forEach(payment => {
        csv += `${payment.time},${payment.receiptNo},${payment.studentName},${payment.class},${payment.method},${payment.amount},${payment.receivedBy}\n`;
    });
    const total = bursarsDailyData.reduce((sum, p) => sum + p.amount, 0);
    csv += `\nTOTAL,,,,,${total},\n`;
    return csv;
}

// ==================== DEFAULTERS LIST ====================

function renderDefaultersTable() {
    const tbody = document.getElementById('defaultersTableBody');
    if (!tbody) return;

    tbody.innerHTML = filteredDefaultersData.map(student => `
        <tr class="hover:bg-slate-50">
            <td class="px-6 py-4 text-sm text-slate-900 font-medium">${student.name}</td>
            <td class="px-6 py-4 text-sm font-mono text-slate-600">${student.admNo}</td>
            <td class="px-6 py-4 text-sm text-slate-600">${student.class}</td>
            <td class="px-6 py-4 text-right text-sm text-slate-900 font-mono">KES ${student.totalFees.toLocaleString()}</td>
            <td class="px-6 py-4 text-right text-sm text-emerald-600 font-mono">KES ${student.paid.toLocaleString()}</td>
            <td class="px-6 py-4 text-right text-sm font-semibold text-rose-600 font-mono">KES ${student.outstanding.toLocaleString()}</td>
            <td class="px-6 py-4 text-center">
                <span class="inline-flex px-3 py-1 rounded-full text-xs font-medium ${getDaysOverdueClass(student.daysOverdue)}">
                    ${student.daysOverdue} days
                </span>
            </td>
            <td class="px-6 py-4 text-center">
                <div class="flex items-center justify-center gap-2">
                    <button onclick="contactParent('${student.parentPhone}', '${student.name}')" class="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors" title="Call Parent">
                        <ion-icon name="call-outline" class="text-lg"></ion-icon>
                    </button>
                    <button onclick="sendSMS('${student.parentPhone}', '${student.name}', ${student.outstanding})" class="p-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-600 rounded-lg transition-colors" title="Send SMS">
                        <ion-icon name="chatbubble-outline" class="text-lg"></ion-icon>
                    </button>
                    <button onclick="viewPaymentHistory(${student.id})" class="p-2 bg-purple-100 hover:bg-purple-200 text-purple-600 rounded-lg transition-colors" title="View History">
                        <ion-icon name="time-outline" class="text-lg"></ion-icon>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function getDaysOverdueClass(days) {
    if (days >= 90) return 'bg-rose-100 text-rose-700';
    if (days >= 60) return 'bg-amber-100 text-amber-700';
    return 'bg-blue-100 text-blue-700';
}

function filterDefaulters() {
    const classFilter = document.getElementById('defaultersClassFilter').value;
    const amountFilter = parseInt(document.getElementById('defaultersAmountFilter').value) || 0;
    const durationFilter = parseInt(document.getElementById('defaultersDurationFilter').value) || 0;

    filteredDefaultersData = defaultersData.filter(student => {
        const matchesClass = !classFilter || student.class === classFilter;
        const matchesAmount = !amountFilter || student.outstanding >= amountFilter;
        const matchesDuration = !durationFilter || student.daysOverdue >= durationFilter;
        return matchesClass && matchesAmount && matchesDuration;
    });

    renderDefaultersTable();
    showNotification(`Found ${filteredDefaultersData.length} defaulters matching criteria`, 'info');
}

function clearDefaultersFilters() {
    document.getElementById('defaultersClassFilter').value = '';
    document.getElementById('defaultersAmountFilter').value = '';
    document.getElementById('defaultersDurationFilter').value = '';
    filteredDefaultersData = [...defaultersData];
    renderDefaultersTable();
    showNotification('Filters cleared', 'info');
}

function exportDefaultersList() {
    // Demo: Show export success toast instead of download
    showToast('Export successful: Defaulters List', 'success', 2000);
}

function generateDefaultersCSV() {
    let csv = 'Student Name,Admission No,Class,Total Fees,Paid,Outstanding,Days Overdue,Parent Phone\n';
    filteredDefaultersData.forEach(student => {
        csv += `${student.name},${student.admNo},${student.class},${student.totalFees},${student.paid},${student.outstanding},${student.daysOverdue},${student.parentPhone}\n`;
    });
    return csv;
}

function contactParent(phone, studentName) {
    showNotification(`Initiating call to ${phone} (${studentName}'s parent)`, 'info');
    // In real implementation, this would integrate with phone system
}

function sendSMS(phone, studentName, amount) {
    const message = `Dear Parent, this is to remind you that ${studentName} has an outstanding fee balance of KES ${amount.toLocaleString()}. Please make payment at your earliest convenience. - Isinya Township Secondary School`;
    showNotification(`SMS sent to ${phone}`, 'success');
    // In real implementation, this would integrate with SMS gateway
}

function viewPaymentHistory(studentId) {
    showNotification('Opening payment history...', 'info');
    // In real implementation, this would open a modal with payment history
}

// ==================== AUDIT LOG ====================

function renderAuditLogTable() {
    const tbody = document.getElementById('auditLogTableBody');
    if (!tbody) return;

    tbody.innerHTML = filteredAuditLogData.map(entry => `
        <tr class="hover:bg-slate-50">
            <td class="px-6 py-4 text-sm text-slate-600 font-mono">${entry.timestamp}</td>
            <td class="px-6 py-4">
                <span class="inline-flex px-3 py-1 rounded-full text-xs font-medium ${getActionClass(entry.action)}">
                    ${formatActionType(entry.action)}
                </span>
            </td>
            <td class="px-6 py-4 text-sm text-slate-900">${entry.description}</td>
            <td class="px-6 py-4 text-sm text-slate-600 font-medium">${entry.user}</td>
            <td class="px-6 py-4 text-sm font-mono text-blue-600">${entry.reference}</td>
            <td class="px-6 py-4 text-center">
                <button onclick="viewAuditDetails(${entry.id})" class="px-3 py-1.5 bg-purple-100 hover:bg-purple-200 text-purple-600 rounded-lg text-xs font-medium transition-colors">
                    View Details
                </button>
            </td>
        </tr>
    `).join('');
}

function getActionClass(action) {
    const classes = {
        'FEE_EDITED': 'bg-blue-100 text-blue-700',
        'RECEIPT_VOIDED': 'bg-rose-100 text-rose-700',
        'PAYMENT_RECORDED': 'bg-emerald-100 text-emerald-700',
        'INVOICE_CREATED': 'bg-purple-100 text-purple-700',
        'INVOICE_DELETED': 'bg-amber-100 text-amber-700'
    };
    return classes[action] || 'bg-slate-100 text-slate-700';
}

function formatActionType(action) {
    return action.replace(/_/g, ' ');
}

function filterAuditLog() {
    const actionFilter = document.getElementById('auditActionFilter').value;
    const dateFrom = document.getElementById('auditDateFrom').value;
    const dateTo = document.getElementById('auditDateTo').value;
    const userFilter = document.getElementById('auditUserFilter').value;

    filteredAuditLogData = auditLogData.filter(entry => {
        const matchesAction = !actionFilter || entry.action === actionFilter;
        const matchesUser = !userFilter || entry.user === userFilter;
        
        let matchesDate = true;
        if (dateFrom || dateTo) {
            const entryDate = new Date(entry.timestamp.split(' ')[0]);
            if (dateFrom) matchesDate = matchesDate && entryDate >= new Date(dateFrom);
            if (dateTo) matchesDate = matchesDate && entryDate <= new Date(dateTo);
        }
        
        return matchesAction && matchesUser && matchesDate;
    });

    renderAuditLogTable();
    showNotification(`Found ${filteredAuditLogData.length} audit entries`, 'info');
}

function clearAuditFilters() {
    document.getElementById('auditActionFilter').value = '';
    document.getElementById('auditDateFrom').value = '';
    document.getElementById('auditDateTo').value = '';
    document.getElementById('auditUserFilter').value = '';
    filteredAuditLogData = [...auditLogData];
    renderAuditLogTable();
    showNotification('Audit filters cleared', 'info');
}

function exportAuditLog() {
    // Demo: Show export success toast instead of download
    showToast('Export successful: Audit Log', 'success', 2000);
}

function generateAuditLogCSV() {
    let csv = 'Timestamp,Action,Description,User,Reference,Reason\n';
    filteredAuditLogData.forEach(entry => {
        csv += `${entry.timestamp},${entry.action},"${entry.description}",${entry.user},${entry.reference},"${entry.reason}"\n`;
    });
    return csv;
}

function viewAuditDetails(entryId) {
    const entry = auditLogData.find(e => e.id === entryId);
    if (entry) {
        const details = `
Action: ${formatActionType(entry.action)}
Timestamp: ${entry.timestamp}
Description: ${entry.description}
User: ${entry.user}
Reference: ${entry.reference}
Reason: ${entry.reason}
        `;
        alert(details); // In production, this would be a modal
    }
}

// ==================== ANALYTICS CHARTS ====================

let chartsInitialized = false;

function initializeAnalyticsCharts() {
    // Prevent re-initialization
    if (chartsInitialized) return;

    // Wait a bit for the tab to be visible
    setTimeout(() => {
        // Revenue Distribution Chart - Modern Doughnut with Gradient Effect
        const revenueCtx = document.getElementById('revenueReportChart');
        if (revenueCtx) {
            new Chart(revenueCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Tuition Fees', 'Boarding Fees', 'Exam Fees', 'Activity Fees', 'Other'],
                    datasets: [{
                        data: [45, 30, 12, 8, 5],
                        backgroundColor: [
                            '#10b981',
                            '#3b82f6',
                            '#8b5cf6',
                            '#f59e0b',
                            '#6366f1'
                        ],
                        borderWidth: 3,
                        borderColor: '#ffffff',
                        hoverOffset: 15,
                        hoverBorderWidth: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    cutout: '65%',
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 15,
                                font: {
                                    size: 12,
                                    family: "'Inter', sans-serif",
                                    weight: '500'
                                },
                                usePointStyle: true,
                                pointStyle: 'circle'
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            padding: 12,
                            titleFont: {
                                size: 14,
                                weight: 'bold'
                            },
                            bodyFont: {
                                size: 13
                            },
                            cornerRadius: 8,
                            callbacks: {
                                label: function(context) {
                                    return context.label + ': ' + context.parsed + '%';
                                }
                            }
                        }
                    },
                    animation: {
                        animateRotate: true,
                        animateScale: true,
                        duration: 1000,
                        easing: 'easeInOutQuart'
                    }
                }
            });
        }

        // Payment Methods Chart - Modern Pie with Shadow
        const paymentMethodsCtx = document.getElementById('paymentMethodsChart');
        if (paymentMethodsCtx) {
            new Chart(paymentMethodsCtx, {
                type: 'pie',
                data: {
                    labels: ['M-Pesa', 'Bank Transfer', 'Cash', 'Cheque'],
                    datasets: [{
                        data: [45, 32, 20, 3],
                        backgroundColor: [
                            '#3b82f6',
                            '#8b5cf6',
                            '#10b981',
                            '#f59e0b'
                        ],
                        borderWidth: 3,
                        borderColor: '#ffffff',
                        hoverOffset: 15,
                        hoverBorderWidth: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 15,
                                font: {
                                    size: 12,
                                    family: "'Inter', sans-serif",
                                    weight: '500'
                                },
                                usePointStyle: true,
                                pointStyle: 'circle'
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            padding: 12,
                            titleFont: {
                                size: 14,
                                weight: 'bold'
                            },
                            bodyFont: {
                                size: 13
                            },
                            cornerRadius: 8,
                            callbacks: {
                                label: function(context) {
                                    return context.label + ': ' + context.parsed + '%';
                                }
                            }
                        }
                    },
                    animation: {
                        animateRotate: true,
                        animateScale: true,
                        duration: 1000,
                        easing: 'easeInOutQuart'
                    }
                }
            });
        }

        // Collection Trends Chart - Modern Line with Gradient Fill
        const collectionTrendsCtx = document.getElementById('collectionTrendsChart');
        if (collectionTrendsCtx) {
            const gradient = collectionTrendsCtx.getContext('2d').createLinearGradient(0, 0, 0, 250);
            gradient.addColorStop(0, 'rgba(16, 185, 129, 0.3)');
            gradient.addColorStop(1, 'rgba(16, 185, 129, 0.0)');

            new Chart(collectionTrendsCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Collections (KES Millions)',
                        data: [2.5, 3.2, 2.8, 3.5, 3.1, 2.9, 3.4, 3.8, 3.3, 3.6, 3.2, 3.0],
                        borderColor: '#10b981',
                        backgroundColor: gradient,
                        borderWidth: 3,
                        tension: 0.4,
                        fill: true,
                        pointRadius: 5,
                        pointHoverRadius: 8,
                        pointBackgroundColor: '#10b981',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        pointHoverBackgroundColor: '#059669',
                        pointHoverBorderColor: '#ffffff',
                        pointHoverBorderWidth: 3
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    interaction: {
                        intersect: false,
                        mode: 'index'
                    },
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                            labels: {
                                font: {
                                    size: 13,
                                    family: "'Inter', sans-serif",
                                    weight: '600'
                                },
                                color: '#10b981',
                                padding: 15,
                                usePointStyle: true
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            padding: 12,
                            titleFont: {
                                size: 14,
                                weight: 'bold'
                            },
                            bodyFont: {
                                size: 13
                            },
                            cornerRadius: 8,
                            callbacks: {
                                label: function(context) {
                                    return 'KES ' + context.parsed.y + 'M';
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)',
                                drawBorder: false
                            },
                            ticks: {
                                font: {
                                    size: 11,
                                    family: "'Inter', sans-serif"
                                },
                                color: '#64748b',
                                callback: function(value) {
                                    return 'KES ' + value + 'M';
                                }
                            }
                        },
                        x: {
                            grid: {
                                display: false,
                                drawBorder: false
                            },
                            ticks: {
                                font: {
                                    size: 11,
                                    family: "'Inter', sans-serif"
                                },
                                color: '#64748b'
                            }
                        }
                    },
                    animation: {
                        duration: 1500,
                        easing: 'easeInOutQuart'
                    }
                }
            });
        }

        // Outstanding by Class Chart - Modern Bar with Gradient
        const outstandingByClassCtx = document.getElementById('outstandingByClassChart');
        if (outstandingByClassCtx) {
            new Chart(outstandingByClassCtx, {
                type: 'bar',
                data: {
                    labels: ['Form 1', 'Form 2', 'Form 3', 'Form 4'],
                    datasets: [{
                        label: 'Outstanding Fees (KES)',
                        data: [280, 320, 350, 250],
                        backgroundColor: [
                            'rgba(59, 130, 246, 0.8)',
                            'rgba(139, 92, 246, 0.8)',
                            'rgba(245, 158, 11, 0.8)',
                            'rgba(239, 68, 68, 0.8)'
                        ],
                        borderColor: [
                            '#3b82f6',
                            '#8b5cf6',
                            '#f59e0b',
                            '#ef4444'
                        ],
                        borderWidth: 2,
                        borderRadius: 8,
                        hoverBackgroundColor: [
                            'rgba(59, 130, 246, 1)',
                            'rgba(139, 92, 246, 1)',
                            'rgba(245, 158, 11, 1)',
                            'rgba(239, 68, 68, 1)'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                            labels: {
                                font: {
                                    size: 13,
                                    family: "'Inter', sans-serif",
                                    weight: '600'
                                },
                                padding: 15,
                                usePointStyle: true
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            padding: 12,
                            titleFont: {
                                size: 14,
                                weight: 'bold'
                            },
                            bodyFont: {
                                size: 13
                            },
                            cornerRadius: 8,
                            callbacks: {
                                label: function(context) {
                                    return 'KES ' + context.parsed.y + ',000';
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)',
                                drawBorder: false
                            },
                            ticks: {
                                font: {
                                    size: 11,
                                    family: "'Inter', sans-serif"
                                },
                                color: '#64748b',
                                callback: function(value) {
                                    return 'KES ' + value + 'K';
                                }
                            }
                        },
                        x: {
                            grid: {
                                display: false,
                                drawBorder: false
                            },
                            ticks: {
                                font: {
                                    size: 11,
                                    family: "'Inter', sans-serif",
                                    weight: '600'
                                },
                                color: '#1e293b'
                            }
                        }
                    },
                    animation: {
                        duration: 1200,
                        easing: 'easeInOutQuart'
                    }
                }
            });
        }

        chartsInitialized = true;
    }, 100);
}

// ==================== EXPORT CENTER MODAL ====================

function openExportModal() {
    const modal = document.getElementById('exportModal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function closeExportModal() {
    const modal = document.getElementById('exportModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function exportReports() {
    const dateFrom = document.getElementById('exportDateFrom').value;
    const dateTo = document.getElementById('exportDateTo').value;
    const format = document.querySelector('input[name="exportFormat"]:checked').value;
    
    const selectedReports = [];
    if (document.getElementById('exportBursarsDaily').checked) selectedReports.push('Bursar\'s Daily');
    if (document.getElementById('exportDefaulters').checked) selectedReports.push('Defaulters List');
    if (document.getElementById('exportAuditLog').checked) selectedReports.push('Audit Log');
    if (document.getElementById('exportFinancialSummary').checked) selectedReports.push('Financial Summary');

    if (selectedReports.length === 0) {
        showNotification('Please select at least one report to export', 'warning');
        return;
    }

    if (!dateFrom || !dateTo) {
        showNotification('Please select date range', 'warning');
        return;
    }

    showNotification(`Exporting ${selectedReports.length} report(s) as ${format.toUpperCase()}...`, 'info');
    
    setTimeout(() => {
        closeExportModal();
        showNotification(`Successfully exported: ${selectedReports.join(', ')}`, 'success');
    }, 1500);
}

// ==================== UTILITY FUNCTIONS ====================

function downloadCSV(content, filename) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    const bgColors = {
        success: 'bg-emerald-500',
        error: 'bg-rose-500',
        warning: 'bg-amber-500',
        info: 'bg-blue-500'
    };
    
    notification.className = `fixed top-4 right-4 ${bgColors[type]} text-white px-6 py-3 rounded-xl shadow-lg z-50 flex items-center gap-2`;
    notification.innerHTML = `
        <ion-icon name="${type === 'success' ? 'checkmark-circle' : type === 'error' ? 'close-circle' : type === 'warning' ? 'warning' : 'information-circle'}" class="text-xl"></ion-icon>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ==================== INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', function() {
    // Set current date
    const currentDateElement = document.getElementById('currentDate');
    const todayDateDisplay = document.getElementById('todayDateDisplay');
    if (currentDateElement) currentDateElement.textContent = getCurrentDate();
    if (todayDateDisplay) todayDateDisplay.textContent = getCurrentDate();

    // Initialize tables
    renderBursarsDailyTable();
    renderDefaultersTable();
    renderAuditLogTable();

    // Set active tab
    const firstTab = document.querySelector('.report-tab.active');
    if (firstTab) {
        firstTab.classList.add('bg-emerald-500', 'text-white');
        firstTab.classList.remove('text-slate-600');
    }
});
