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

// Student Detail Modal Logic
function openStudentModal(name, grade, initials, isScholarship) {
    const modalAvatar = document.getElementById('modalAvatar');
    const modalScholarship = document.getElementById('modalScholarship');
    document.getElementById('modalName').textContent = name;
    document.getElementById('modalGrade').textContent = grade;
    modalAvatar.textContent = initials;
    const colors = ['bg-blue-100 text-blue-600', 'bg-purple-100 text-purple-600', 'bg-rose-100 text-rose-600', 'bg-amber-100 text-amber-600'];
    modalAvatar.className = `w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold ${colors[name.length % colors.length]}`;
    modalScholarship.innerHTML = isScholarship ? `<span class="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wide flex items-center gap-1"><ion-icon name="star"></ion-icon> Scholarship</span>` : '';
    openModal('studentModal');
}

// Close on overlay click
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal(overlay.id);
        });
    });
});

// Show auto-closing toast notification
function showToast(message, type = 'success', duration = 2000) {
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 z-[100] max-w-md bg-white rounded-xl shadow-2xl border border-slate-200 p-4 transform transition-all duration-300 translate-x-full`;
    
    const iconMap = {
        'success': { icon: 'checkmark-circle', color: 'text-emerald-600', bg: 'bg-emerald-50' },
        'error': { icon: 'close-circle', color: 'text-rose-600', bg: 'bg-rose-50' },
        'info': { icon: 'information-circle', color: 'text-blue-600', bg: 'bg-blue-50' },
        'warning': { icon: 'warning', color: 'text-amber-600', bg: 'bg-amber-50' }
    };

    const style = iconMap[type] || iconMap['success'];

    toast.innerHTML = `
        <div class="flex items-center gap-3" role="status" aria-live="polite">
            <div class="w-8 h-8 rounded-lg ${style.bg} flex items-center justify-center flex-shrink-0">
                <ion-icon name="${style.icon}" class="text-xl ${style.color}"></ion-icon>
            </div>
            <div class="flex-1 min-w-0">
                <div class="text-sm font-medium text-slate-900">${message}</div>
            </div>
        </div>
    `;

    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => {
        toast.classList.remove('translate-x-full');
    }, 10);

    // Auto-close after duration
    setTimeout(() => {
        toast.classList.add('translate-x-full');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { openModal, closeModal, openStudentModal, showToast };
}
