// Fee Management System - Isinya Township Secondary School

// ============================================
// DATA STORAGE (Local Storage Simulation)
// ============================================

let invoicesData = [
    { id: 'INV-2026-0847', studentId: 1, studentName: 'Faith Kipchoge', class: 'Form 4-A', date: '2026-01-05', dueDate: '2026-02-05', totalAmount: 82500, paidAmount: 82500, balance: 0, status: 'Paid', items: [{name: 'Tuition Fee', amount: 45000}, {name: 'Boarding Fee', amount: 25000}, {name: 'Exam Fee', amount: 5000}, {name: 'Activity Fee', amount: 7500}] },
    { id: 'INV-2026-0846', studentId: 2, studentName: 'James Mwangi', class: 'Form 3-B', date: '2026-01-05', dueDate: '2026-02-05', totalAmount: 61800, paidAmount: 46800, balance: 15000, status: 'Partial', items: [{name: 'Tuition Fee', amount: 45000}, {name: 'Boarding Fee', amount: 16800}] }
];

// Add generated invoices from dummy data
if (window.generatedInvoices) invoicesData.push(...generatedInvoices);

let pledgesData = [
    { id: 'PLG-001', donorName: 'John Kamau', donorType: 'Alumni', email: 'jkamau@email.com', phone: '+254712345678', amount: 50000, fulfilled: 50000, balance: 0, status: 'Fulfilled', datePledged: '2025-12-15', expectedDate: '2026-01-15', purpose: 'Library expansion' },
    { id: 'PLG-002', donorName: 'Mary Wanjiku', donorType: 'Parent', email: 'mwanjiku@email.com', phone: '+254723456789', amount: 30000, fulfilled: 10000, balance: 20000, status: 'Partial', datePledged: '2026-01-03', expectedDate: '2026-03-01', purpose: 'Sports equipment' }
];

let receiptsData = [
    { id: 'REC-2026-1253', name: 'Faith Kipchoge', date: '2026-01-07', type: 'Tuition', amount: 82500, method: 'M-Pesa', reference: 'QA12345678' },
    { id: 'REC-2026-1252', name: 'John Kamau', date: '2026-01-06', type: 'Donation', amount: 50000, method: 'Bank Transfer', reference: 'TRF-789456' }
];

// Add generated receipts from dummy data
if (window.generatedReceipts) receiptsData.push(...generatedReceipts);

// ============================================
// TAB SWITCHING
// ============================================

function switchFeeTab(tabName, event) {
    // Remove active class from all tabs
    document.querySelectorAll('.fee-tab').forEach(tab => {
        tab.classList.remove('active', 'bg-emerald-500', 'text-white');
        tab.classList.add('text-slate-600');
    });
    
    // Add active class to clicked tab
    if (event) {
        event.target.classList.add('active', 'bg-emerald-500', 'text-white');
        event.target.classList.remove('text-slate-600');
    }
    
    // Hide all tab contents
    document.querySelectorAll('.fee-tab-content').forEach(content => {
        content.classList.add('hidden');
    });
    
    // Show selected tab content
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.remove('hidden');
    }

    // Initialize tab-specific features
    if (tabName === 'accounting') {
        initCashFlowChart();
    }
}

// ============================================
// BILLING & INVOICING FEATURES
// ============================================

// Open Generate Invoice Modal
function openGenerateInvoiceModal() {
    openModal('generateInvoiceModal');
    updateInvoiceTotal();
}

// Update invoice total when fee items are checked/unchecked
function updateInvoiceTotal() {
    const feeItems = document.querySelectorAll('#feeItemsContainer input[type="checkbox"]');
    let total = 0;
    
    feeItems.forEach((checkbox, index) => {
        if (checkbox.checked) {
            const amountInput = checkbox.parentElement.querySelector('input[type="number"]');
            total += parseFloat(amountInput.value || 0);
        }
    });
    
    // Update total display if elements exist
    const totalDisplay = document.querySelector('#generateInvoiceForm .text-emerald-600.font-mono');
    if (totalDisplay) {
        totalDisplay.textContent = 'KES ' + total.toLocaleString();
    }
}

// Generate Invoice
function generateInvoice() {
    const studentSelect = document.getElementById('invoiceStudentSelect');
    const invoiceDate = document.getElementById('invoiceDate').value;
    const dueDate = document.getElementById('invoiceDueDate').value;
    const notes = document.getElementById('invoiceNotes').value;
    const sendEmail = document.getElementById('sendEmailCheckbox').checked;

    if (!studentSelect.value) {
        alert('Please select a student');
        return;
    }

    // Generate new invoice number
    const newInvoiceNum = 'INV-2026-' + String(Math.floor(Math.random() * 9000) + 1000);
    
    // Collect selected fee items
    const feeItems = [];
    let totalAmount = 0;
    document.querySelectorAll('#feeItemsContainer input[type="checkbox"]:checked').forEach(checkbox => {
        const container = checkbox.parentElement;
        const itemName = container.querySelector('p.font-medium').textContent;
        const amount = parseFloat(container.querySelector('input[type="number"]').value);
        feeItems.push({ name: itemName, amount: amount });
        totalAmount += amount;
    });

    // Create new invoice object
    const newInvoice = {
        id: newInvoiceNum,
        studentId: parseInt(studentSelect.value),
        studentName: studentSelect.options[studentSelect.selectedIndex].text.split(' - ')[0],
        class: studentSelect.options[studentSelect.selectedIndex].text.split(' - ')[1],
        date: invoiceDate,
        dueDate: dueDate,
        totalAmount: totalAmount,
        paidAmount: 0,
        balance: totalAmount,
        status: 'Unpaid',
        items: feeItems,
        notes: notes
    };

    // Add to invoices data
    invoicesData.unshift(newInvoice);

    // Show success notification
    showNotification('Invoice Generated Successfully!', `Invoice ${newInvoiceNum} has been created for ${newInvoice.studentName}.`, 'success');

    // Send email if requested
    if (sendEmail) {
        setTimeout(() => {
            showNotification('Email Sent', `Invoice sent to parent/guardian email address.`, 'success');
        }, 1000);
    }

    // Close modal and refresh table
    closeModal('generateInvoiceModal');
    refreshInvoiceTable();
}

// View Invoice Details
function viewInvoiceDetails(invoiceId) {
    const invoice = invoicesData.find(inv => inv.id === invoiceId);
    if (!invoice) return;

    let itemsHTML = invoice.items.map(item => 
        `<div class="flex justify-between py-1">
            <span>${item.name}</span>
            <span class="font-mono">KES ${item.amount.toLocaleString()}</span>
        </div>`
    ).join('');

    const detailsHTML = `
        <div class="space-y-3">
            <div><strong>Invoice:</strong> ${invoice.id}</div>
            <div><strong>Student:</strong> ${invoice.studentName} (${invoice.class})</div>
            <div><strong>Date:</strong> ${formatDate(invoice.date)}</div>
            <div><strong>Due Date:</strong> ${formatDate(invoice.dueDate)}</div>
            <div class="border-t pt-3 mt-3">
                <strong class="block mb-2">Fee Items:</strong>
                ${itemsHTML}
            </div>
            <div class="border-t pt-3 mt-3 space-y-1">
                <div class="flex justify-between font-bold">
                    <span>Total:</span>
                    <span class="font-mono">KES ${invoice.totalAmount.toLocaleString()}</span>
                </div>
                <div class="flex justify-between text-emerald-600">
                    <span>Paid:</span>
                    <span class="font-mono">KES ${invoice.paidAmount.toLocaleString()}</span>
                </div>
                <div class="flex justify-between text-amber-600 font-bold">
                    <span>Balance:</span>
                    <span class="font-mono">KES ${invoice.balance.toLocaleString()}</span>
                </div>
            </div>
        </div>
    `;

    showNotification('Invoice Details', detailsHTML, 'info');
}

// Send Invoice via Email
function sendInvoiceEmail(invoiceId) {
    const invoice = invoicesData.find(inv => inv.id === invoiceId);
    if (!invoice) return;

    // Populate modal with invoice details
    document.getElementById('emailInvoiceNumber').textContent = invoice.id;
    document.getElementById('emailStudentName').textContent = invoice.studentName;
    
    openModal('sendInvoiceEmailModal');
}

// Confirm Send Invoice Email
function confirmSendInvoiceEmail() {
    const email = document.getElementById('recipientEmail').value;
    const subject = document.getElementById('emailSubject').value;

    if (!email) {
        alert('Please enter recipient email');
        return;
    }

    // Simulate sending email
    showNotification('Email Sent Successfully!', `Invoice has been sent to ${email}`, 'success');
    closeModal('sendInvoiceEmailModal');
}

// Record Payment for Invoice
function recordPayment(invoiceId) {
    const invoice = invoicesData.find(inv => inv.id === invoiceId);
    if (!invoice) return;

    // Populate payment modal
    document.getElementById('paymentInvoiceNumber').textContent = invoice.id;
    document.getElementById('paymentStudentName').textContent = invoice.studentName;
    
    openModal('recordPaymentModal');
}

// Confirm Record Payment
function confirmRecordPayment() {
    const invoiceId = document.getElementById('paymentInvoiceNumber').textContent;
    const amount = parseFloat(document.getElementById('paymentAmount').value);
    const paymentDate = document.getElementById('paymentDate').value;
    const method = document.getElementById('paymentMethod').value;
    const reference = document.getElementById('paymentReference').value;
    const generateReceipt = document.getElementById('generateReceiptCheckbox').checked;

    if (!amount || amount <= 0) {
        alert('Please enter a valid payment amount');
        return;
    }

    const invoice = invoicesData.find(inv => inv.id === invoiceId);
    if (!invoice) return;

    if (amount > invoice.balance) {
        alert('Payment amount cannot exceed balance due');
        return;
    }

    // Update invoice
    invoice.paidAmount += amount;
    invoice.balance -= amount;
    
    if (invoice.balance === 0) {
        invoice.status = 'Paid';
    } else if (invoice.paidAmount > 0) {
        invoice.status = 'Partial';
    }

    // Generate receipt if requested
    if (generateReceipt) {
        const receiptId = 'REC-2026-' + String(Math.floor(Math.random() * 9000) + 1000);
        receiptsData.unshift({
            id: receiptId,
            name: invoice.studentName,
            date: paymentDate,
            type: 'Tuition',
            amount: amount,
            method: method,
            reference: reference
        });
    }

    showNotification('Payment Recorded!', `Payment of KES ${amount.toLocaleString()} has been recorded for invoice ${invoiceId}.`, 'success');
    
    closeModal('recordPaymentModal');
    refreshInvoiceTable();
}

// Refresh Invoice Table
function refreshInvoiceTable() {
    const tbody = document.getElementById('invoiceTableBody');
    if (!tbody) return;

    tbody.innerHTML = invoicesData.map(invoice => `
        <tr class="hover:bg-slate-50 transition-colors">
            <td class="px-6 py-4 font-mono text-sm font-bold text-emerald-600">${invoice.id}</td>
            <td class="px-6 py-4 font-medium">${invoice.studentName}</td>
            <td class="px-6 py-4 text-sm text-slate-600">${formatDate(invoice.date)}</td>
            <td class="px-6 py-4 text-right font-mono font-semibold">KES ${invoice.totalAmount.toLocaleString()}</td>
            <td class="px-6 py-4 text-right font-mono ${invoice.paidAmount > 0 ? 'text-emerald-600' : 'text-slate-500'}">KES ${invoice.paidAmount.toLocaleString()}</td>
            <td class="px-6 py-4 text-right font-mono ${invoice.balance > 0 ? 'text-amber-600' : 'text-slate-500'}">KES ${invoice.balance.toLocaleString()}</td>
            <td class="px-6 py-4 text-center">
                <span class="px-2.5 py-1 ${getStatusClass(invoice.status)} text-xs font-semibold rounded-full">${invoice.status}</span>
            </td>
            <td class="px-6 py-4 text-center">
                <div class="flex items-center justify-center gap-2">
                    <button onclick="viewInvoiceDetails('${invoice.id}')" class="p-1.5 hover:bg-slate-100 rounded-lg transition-colors" title="View Details">
                        <ion-icon name="eye-outline" class="text-lg text-slate-600"></ion-icon>
                    </button>
                    <button onclick="sendInvoiceEmail('${invoice.id}')" class="p-1.5 hover:bg-slate-100 rounded-lg transition-colors" title="Send Email">
                        <ion-icon name="mail-outline" class="text-lg text-blue-600"></ion-icon>
                    </button>
                    <button onclick="recordPayment('${invoice.id}')" class="p-1.5 hover:bg-slate-100 rounded-lg transition-colors" title="Record Payment" ${invoice.balance === 0 ? 'disabled style="opacity:0.5"' : ''}>
                        <ion-icon name="cash-outline" class="text-lg text-emerald-600"></ion-icon>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// ============================================
// PLEDGE MANAGEMENT FEATURES
// ============================================

// Open Record Pledge Modal
function openRecordPledgeModal() {
    openModal('recordPledgeModal');
}

// Confirm Record Pledge
function confirmRecordPledge() {
    const donorName = document.getElementById('donorName').value;
    const donorType = document.getElementById('donorType').value;
    const email = document.getElementById('donorEmail').value;
    const phone = document.getElementById('donorPhone').value;
    const amount = parseFloat(document.getElementById('pledgeAmount').value);
    const pledgeDate = document.getElementById('pledgeDate').value;
    const expectedDate = document.getElementById('pledgeExpectedDate').value;
    const purpose = document.getElementById('pledgePurpose').value;
    const notes = document.getElementById('pledgeNotes').value;

    if (!donorName || !amount) {
        alert('Please fill in all required fields');
        return;
    }

    const newPledgeId = 'PLG-' + String(Math.floor(Math.random() * 900) + 100).padStart(3, '0');

    const newPledge = {
        id: newPledgeId,
        donorName: donorName,
        donorType: donorType,
        email: email,
        phone: phone,
        amount: amount,
        fulfilled: 0,
        balance: amount,
        status: 'Pending',
        datePledged: pledgeDate,
        expectedDate: expectedDate,
        purpose: purpose,
        notes: notes
    };

    pledgesData.unshift(newPledge);

    showNotification('Pledge Recorded!', `Donation pledge ${newPledgeId} has been recorded for ${donorName}.`, 'success');
    
    closeModal('recordPledgeModal');
    refreshPledgeTable();
}

// View Pledge Details
function viewPledgeDetails(pledgeId) {
    const pledge = pledgesData.find(p => p.id === pledgeId);
    if (!pledge) return;

    const detailsHTML = `
        <div class="space-y-3">
            <div><strong>Pledge ID:</strong> ${pledge.id}</div>
            <div><strong>Donor:</strong> ${pledge.donorName}</div>
            <div><strong>Type:</strong> ${pledge.donorType}</div>
            <div><strong>Contact:</strong> ${pledge.email}</div>
            <div><strong>Phone:</strong> ${pledge.phone}</div>
            <div><strong>Date Pledged:</strong> ${formatDate(pledge.datePledged)}</div>
            <div><strong>Expected Date:</strong> ${formatDate(pledge.expectedDate)}</div>
            <div><strong>Purpose:</strong> ${pledge.purpose}</div>
            <div class="border-t pt-3 mt-3 space-y-1">
                <div class="flex justify-between font-bold">
                    <span>Pledged Amount:</span>
                    <span class="font-mono">KES ${pledge.amount.toLocaleString()}</span>
                </div>
                <div class="flex justify-between text-emerald-600">
                    <span>Fulfilled:</span>
                    <span class="font-mono">KES ${pledge.fulfilled.toLocaleString()}</span>
                </div>
                <div class="flex justify-between text-amber-600 font-bold">
                    <span>Balance:</span>
                    <span class="font-mono">KES ${pledge.balance.toLocaleString()}</span>
                </div>
            </div>
        </div>
    `;

    showNotification('Pledge Details', detailsHTML, 'info');
}

// Send Pledge Reminder
function sendPledgeReminder(pledgeId) {
    const pledge = pledgesData.find(p => p.id === pledgeId);
    if (!pledge) return;

    // Simulate sending reminder email
    showNotification('Reminder Sent!', `Pledge reminder email has been sent to ${pledge.donorName} at ${pledge.email}.`, 'success');
}

// Refresh Pledge Table
function refreshPledgeTable() {
    const tbody = document.getElementById('pledgeTableBody');
    if (!tbody) return;

    tbody.innerHTML = pledgesData.map(pledge => {
        const initials = pledge.donorName.split(' ').map(n => n[0]).join('');
        const colors = ['bg-blue-100 text-blue-600', 'bg-purple-100 text-purple-600', 'bg-rose-100 text-rose-600', 'bg-amber-100 text-amber-600'];
        const colorClass = colors[pledge.donorName.length % colors.length];

        return `
        <tr class="hover:bg-slate-50 transition-colors">
            <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full ${colorClass} flex items-center justify-center font-semibold text-sm">${initials}</div>
                    <div>
                        <p class="font-medium text-slate-900">${pledge.donorName}</p>
                        <p class="text-xs text-slate-500">${pledge.donorType}</p>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 text-sm text-slate-600">${formatDate(pledge.datePledged)}</td>
            <td class="px-6 py-4 text-right font-mono font-semibold">KES ${pledge.amount.toLocaleString()}</td>
            <td class="px-6 py-4 text-right font-mono text-emerald-600">KES ${pledge.fulfilled.toLocaleString()}</td>
            <td class="px-6 py-4 text-right font-mono text-amber-600">KES ${pledge.balance.toLocaleString()}</td>
            <td class="px-6 py-4 text-center">
                <span class="px-2.5 py-1 ${getStatusClass(pledge.status)} text-xs font-semibold rounded-full">${pledge.status}</span>
            </td>
            <td class="px-6 py-4 text-center">
                <div class="flex items-center justify-center gap-2">
                    <button onclick="viewPledgeDetails('${pledge.id}')" class="p-1.5 hover:bg-slate-100 rounded-lg transition-colors" title="View Details">
                        <ion-icon name="eye-outline" class="text-lg text-slate-600"></ion-icon>
                    </button>
                    <button onclick="sendPledgeReminder('${pledge.id}')" class="p-1.5 hover:bg-slate-100 rounded-lg transition-colors" title="Send Reminder" ${pledge.status === 'Fulfilled' ? 'disabled style="opacity:0.5"' : ''}>
                        <ion-icon name="mail-outline" class="text-lg text-blue-600"></ion-icon>
                    </button>
                </div>
            </td>
        </tr>
        `;
    }).join('');
}

// ============================================
// ACCOUNTING FEATURES
// ============================================

// Open Generate Receipt Modal
function openGenerateReceiptModal() {
    openModal('generateReceiptModal');
}

// Update Receipt Form based on type
function updateReceiptForm(type) {
    const tuitionFields = document.getElementById('tuitionReceiptFields');
    const donationFields = document.getElementById('donationReceiptFields');
    
    if (type === 'tuition') {
        tuitionFields.classList.remove('hidden');
        donationFields.classList.add('hidden');
    } else if (type === 'donation') {
        tuitionFields.classList.add('hidden');
        donationFields.classList.remove('hidden');
    } else {
        tuitionFields.classList.add('hidden');
        donationFields.classList.add('hidden');
    }
}

// Confirm Generate Receipt
function confirmGenerateReceipt() {
    const receiptType = document.getElementById('receiptType').value;
    const amount = parseFloat(document.getElementById('receiptAmount').value);
    const date = document.getElementById('receiptDate').value;
    const method = document.getElementById('receiptPaymentMethod').value;
    const reference = document.getElementById('receiptReference').value;
    const emailReceipt = document.getElementById('emailReceiptCheckbox').checked;

    if (!amount || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }

    let name = '';
    if (receiptType === 'tuition') {
        const invoiceSelect = document.getElementById('receiptInvoiceSelect');
        if (!invoiceSelect.value) {
            alert('Please select an invoice');
            return;
        }
        name = invoiceSelect.options[invoiceSelect.selectedIndex].text.split(' - ')[1].split(' (')[0];
    } else if (receiptType === 'donation') {
        name = document.getElementById('receiptDonorName').value;
        if (!name) {
            alert('Please enter donor name');
            return;
        }
    }

    const receiptId = 'REC-2026-' + String(Math.floor(Math.random() * 9000) + 1000);

    const newReceipt = {
        id: receiptId,
        name: name,
        date: date,
        type: receiptType === 'tuition' ? 'Tuition' : 'Donation',
        amount: amount,
        method: method,
        reference: reference
    };

    receiptsData.unshift(newReceipt);

    showNotification('Receipt Generated!', `Receipt ${receiptId} has been created successfully.`, 'success');

    if (emailReceipt) {
        setTimeout(() => {
            showNotification('Email Sent', 'Receipt has been emailed successfully.', 'success');
        }, 1000);
    }

    closeModal('generateReceiptModal');
    refreshTransactionTable();
}

// View Receipt
function viewReceipt(receiptId) {
    const receipt = receiptsData.find(r => r.id === receiptId);
    if (!receipt) return;

    const detailsHTML = `
        <div class="space-y-3">
            <div class="text-center border-b pb-3">
                <h3 class="font-bold text-lg">PAYMENT RECEIPT</h3>
                <p class="text-sm text-slate-600">Isinya Township Secondary School</p>
            </div>
            <div><strong>Receipt No:</strong> ${receipt.id}</div>
            <div><strong>Date:</strong> ${formatDate(receipt.date)}</div>
            <div><strong>Received From:</strong> ${receipt.name}</div>
            <div><strong>Payment Type:</strong> ${receipt.type}</div>
            <div><strong>Payment Method:</strong> ${receipt.method}</div>
            <div><strong>Reference:</strong> ${receipt.reference}</div>
            <div class="border-t pt-3 mt-3">
                <div class="flex justify-between font-bold text-lg">
                    <span>Amount Paid:</span>
                    <span class="font-mono text-emerald-600">KES ${receipt.amount.toLocaleString()}</span>
                </div>
            </div>
        </div>
    `;

    showNotification('Receipt', detailsHTML, 'info');
}

// Download Receipt
function downloadReceipt(receiptId) {
    showNotification('Download Started', `Receipt ${receiptId} is being downloaded as PDF...`, 'success');
}

// Email Receipt
function emailReceipt(receiptId) {
    const receipt = receiptsData.find(r => r.id === receiptId);
    if (!receipt) return;
    
    showNotification('Email Sent', `Receipt ${receiptId} has been emailed to ${receipt.name}.`, 'success');
}

// Export Accounting Data
function exportAccountingData() {
    openModal('exportDataModal');
}

// Confirm Export Data
function confirmExportData() {
    const format = document.getElementById('exportFormat').value;
    const dateRange = document.getElementById('exportDateRange').value;

    showNotification('Export Started', `Financial data is being exported in ${format.toUpperCase()} format...`, 'success');
    
    setTimeout(() => {
        showNotification('Export Complete', 'Your financial data has been downloaded successfully.', 'success');
        closeModal('exportDataModal');
    }, 2000);
}

// Update Cash Flow for Selected Month
function updateCashFlowMonth(month) {
    // In a real application, this would fetch data for the selected month
    showNotification('Data Updated', `Cash flow summary updated for ${month}`, 'info');
    initCashFlowChart();
}

// Initialize Cash Flow Chart
function initCashFlowChart() {
    const ctx = document.getElementById('cashFlowChart');
    if (!ctx) return;

    // Destroy existing chart if it exists
    if (window.cashFlowChartInstance) {
        window.cashFlowChartInstance.destroy();
    }

    window.cashFlowChartInstance = new Chart(ctx.getContext('2d'), {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [{
                label: 'Income',
                data: [650000, 720000, 680000, 800000],
                borderColor: '#10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: '#f1f5f9' },
                    border: { display: false },
                    ticks: {
                        callback: value => 'KES ' + (value / 1000) + 'K'
                    }
                },
                x: {
                    grid: { display: false },
                    border: { display: false }
                }
            }
        }
    });
}

// Refresh Transaction Table
function refreshTransactionTable() {
    const tbody = document.getElementById('transactionTableBody');
    if (!tbody) return;

    tbody.innerHTML = receiptsData.map(receipt => `
        <tr class="hover:bg-slate-50 transition-colors">
            <td class="px-6 py-4 font-mono text-sm font-bold text-blue-600">${receipt.id}</td>
            <td class="px-6 py-4 font-medium">${receipt.name}</td>
            <td class="px-6 py-4 text-sm text-slate-600">${formatDate(receipt.date)}</td>
            <td class="px-6 py-4">
                <span class="px-2 py-1 ${receipt.type === 'Tuition' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'} text-xs font-semibold rounded">${receipt.type}</span>
            </td>
            <td class="px-6 py-4 text-right font-mono font-semibold text-slate-900">KES ${receipt.amount.toLocaleString()}</td>
            <td class="px-6 py-4 text-center">
                <div class="flex items-center justify-center gap-2">
                    <button onclick="viewReceipt('${receipt.id}')" class="p-1.5 hover:bg-slate-100 rounded-lg transition-colors" title="View Receipt">
                        <ion-icon name="eye-outline" class="text-lg text-slate-600"></ion-icon>
                    </button>
                    <button onclick="downloadReceipt('${receipt.id}')" class="p-1.5 hover:bg-slate-100 rounded-lg transition-colors" title="Download">
                        <ion-icon name="download-outline" class="text-lg text-blue-600"></ion-icon>
                    </button>
                    <button onclick="emailReceipt('${receipt.id}')" class="p-1.5 hover:bg-slate-100 rounded-lg transition-colors" title="Email Receipt">
                        <ion-icon name="mail-outline" class="text-lg text-emerald-600"></ion-icon>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Format Date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Get Status Badge Class
function getStatusClass(status) {
    const statusClasses = {
        'Paid': 'bg-emerald-100 text-emerald-700',
        'Partial': 'bg-amber-100 text-amber-700',
        'Unpaid': 'bg-rose-100 text-rose-700',
        'Fulfilled': 'bg-emerald-100 text-emerald-700',
        'Pending': 'bg-slate-100 text-slate-700'
    };
    return statusClasses[status] || 'bg-slate-100 text-slate-700';
}

// Show Notification (Toast)
function showNotification(title, message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-[100] max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 transform transition-all duration-300 translate-x-full`;
    
    const iconMap = {
        'success': { icon: 'checkmark-circle', color: 'text-emerald-600', bg: 'bg-emerald-50' },
        'error': { icon: 'close-circle', color: 'text-rose-600', bg: 'bg-rose-50' },
        'info': { icon: 'information-circle', color: 'text-blue-600', bg: 'bg-blue-50' },
        'warning': { icon: 'warning', color: 'text-amber-600', bg: 'bg-amber-50' }
    };

    const style = iconMap[type] || iconMap['info'];

    notification.innerHTML = `
        <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded-xl ${style.bg} flex items-center justify-center flex-shrink-0">
                <ion-icon name="${style.icon}" class="text-2xl ${style.color}"></ion-icon>
            </div>
            <div class="flex-1 min-w-0">
                <h4 class="font-bold text-slate-900 mb-1">${title}</h4>
                <div class="text-sm text-slate-600">${message}</div>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" class="p-1 hover:bg-slate-100 rounded-lg transition-colors flex-shrink-0">
                <ion-icon name="close" class="text-xl text-slate-400"></ion-icon>
            </button>
        </div>
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 10);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ============================================
// VIEW STUDENT FEE DETAILS
// ============================================

function viewStudentFeeDetails(studentId, studentName, className, totalAmount, balance, status) {
    // Create and show a detailed modal for student fees
    const modal = document.createElement('div');
    modal.id = 'studentFeeDetailsModal';
    modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 modal-overlay';
    
    const statusColor = status === 'Paid' ? 'emerald' : status === 'Partial' ? 'amber' : 'rose';
    
    modal.innerHTML = `
        <div class="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden">
            <div class="bg-gradient-to-r from-emerald-500 to-emerald-600 p-6 text-white">
                <div class="flex items-start justify-between">
                    <div>
                        <h2 class="text-2xl font-bold">${studentName}</h2>
                        <p class="text-emerald-100 mt-1">${className} • ${studentId}</p>
                    </div>
                    <button onclick="closeModal('studentFeeDetailsModal')" class="p-2 hover:bg-white/20 rounded-full transition-colors">
                        <ion-icon name="close-outline" class="text-2xl"></ion-icon>
                    </button>
                </div>
            </div>
            <div class="p-6">
                <div class="grid grid-cols-2 gap-4 mb-6">
                    <div class="p-4 rounded-2xl border border-slate-200 bg-slate-50">
                        <p class="text-xs text-slate-500 font-semibold uppercase mb-1">Total Amount</p>
                        <p class="text-2xl font-bold text-slate-900">KES ${totalAmount.toLocaleString()}</p>
                    </div>
                    <div class="p-4 rounded-2xl border border-${statusColor}-200 bg-${statusColor}-50">
                        <p class="text-xs text-${statusColor}-600 font-semibold uppercase mb-1">Balance</p>
                        <p class="text-2xl font-bold text-${statusColor}-700">KES ${balance.toLocaleString()}</p>
                    </div>
                </div>
                
                <div class="mb-6">
                    <div class="flex items-center justify-between mb-3">
                        <h3 class="font-semibold text-slate-900">Fee Status</h3>
                        <span class="px-3 py-1 bg-${statusColor}-100 text-${statusColor}-700 text-sm font-semibold rounded-full">${status}</span>
                    </div>
                    <div class="space-y-2 text-sm text-slate-600">
                        <p><strong>Amount Paid:</strong> KES ${(totalAmount - balance).toLocaleString()}</p>
                        <p><strong>Payment Progress:</strong> ${Math.round((totalAmount - balance) / totalAmount * 100)}%</p>
                    </div>
                </div>
                
                <div class="flex gap-3">
                    <button onclick="recordPayment('${studentId}')" class="flex-1 px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold transition-colors">
                        <ion-icon name="cash-outline" class="text-lg"></ion-icon>
                        Record Payment
                    </button>
                    <button onclick="printInvoice('${studentId}')" class="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-colors">
                        <ion-icon name="print-outline" class="text-lg"></ion-icon>
                        Print Invoice
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.remove('hidden'), 10);
}

// Print invoice function
function printInvoice(studentId) {
    showNotification('Invoice Printing', 'Invoice is being prepared for printing...', 'info');
    closeModal('studentFeeDetailsModal');
}

// ============================================
// SEARCH FUNCTIONALITY
// ============================================

function initSearchFunctionality() {
    const searchInput = document.getElementById('feeSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const tableRows = document.querySelectorAll('.fee-tab-content:not(.hidden) table tbody tr');
            
            tableRows.forEach(row => {
                const studentName = row.querySelector('td')?.textContent.toLowerCase() || '';
                if (studentName.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize fee item checkboxes to update total
    const feeCheckboxes = document.querySelectorAll('#feeItemsContainer input[type="checkbox"]');
    feeCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateInvoiceTotal);
    });

    const feeAmountInputs = document.querySelectorAll('#feeItemsContainer input[type="number"]');
    feeAmountInputs.forEach(input => {
        input.addEventListener('input', updateInvoiceTotal);
    });

    // Initialize export date range toggle
    const exportRangeSelect = document.getElementById('exportDateRange');
    if (exportRangeSelect) {
        exportRangeSelect.addEventListener('change', (e) => {
            const customRange = document.getElementById('customDateRange');
            if (customRange) {
                customRange.classList.toggle('hidden', e.target.value !== 'custom');
            }
        });
    }

    // Initialize receipt type change
    const receiptTypeSelect = document.getElementById('receiptType');
    if (receiptTypeSelect) {
        receiptTypeSelect.addEventListener('change', (e) => updateReceiptForm(e.target.value));
    }

    // Initialize charts if on accounting tab
    initFeeCharts();
    
    // Initialize search functionality
    initSearchFunctionality();

    console.log('Fee Management System Initialized');
});
