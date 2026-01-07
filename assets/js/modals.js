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
});

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { openModal, closeModal, openStudentModal };
}
