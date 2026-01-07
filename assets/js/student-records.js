// Student Records Management System - Isinya Township Secondary School

// ============================================
// STATUS DEFINITIONS
// ============================================

const studentStatuses = {
    'Active': { label: 'Active', color: 'emerald', description: 'Currently enrolled and attending' },
    'On Leave': { label: 'On Leave', color: 'amber', description: 'Temporary leave of absence' },
    'Suspended': { label: 'Suspended', color: 'rose', description: 'Currently suspended' },
    'Deferred': { label: 'Deferred', color: 'blue', description: 'Enrollment deferred' },
    'Graduated': { label: 'Graduated', color: 'purple', description: 'Completed studies' },
    'Alumni': { label: 'Alumni', color: 'indigo', description: 'Former student' },
    'Transferred': { label: 'Transferred', color: 'slate', description: 'Transferred to another school' },
    'Withdrawn': { label: 'Withdrawn', color: 'gray', description: 'Withdrew from school' }
};

// ============================================
// DATA STORAGE
// ============================================

let studentsData = [
    {
        id: 'STU-001',
        firstName: 'Faith',
        lastName: 'Kipchoge',
        middleName: 'Wanjiru',
        admissionNumber: 'ADM-2023-089',
        dateOfBirth: '2008-03-15',
        gender: 'Female',
        nationalId: 'BC-2008-15678',
        nationality: 'Kenyan',
        classForm: 'Form 4-A',
        stream: 'Science',
        admissionDate: '2023-01-15',
        previousSchool: 'Kajiado Primary School',
        status: 'Active',
        enrollmentStatus: 'Active',
        isScholarship: true,
        guardianName: 'John Kamau',
        guardianRelationship: 'Father',
        guardianPhone: '+254 712 345 678',
        guardianEmail: 'jkamau@email.com',
        guardianAddress: 'P.O. Box 123, Isinya',
        bloodGroup: 'O+',
        allergies: 'None',
        medicalNotes: '',
        // Financial Information
        financialInfo: {
            totalFees: 82500,
            paidAmount: 82500,
            balance: 0,
            lastPayment: '2026-01-05',
            paymentHistory: [
                { date: '2026-01-05', amount: 82500, method: 'M-Pesa', reference: 'QA12345678' }
            ]
        },
        documents: {
            birthCertificate: { uploaded: true, fileName: 'Faith_BC.pdf', date: '2023-01-15' },
            nationalId: { uploaded: false, fileName: '', date: '' },
            academicRecords: { uploaded: true, fileName: 'Faith_Records.pdf', date: '2023-01-15' },
            medicalRecords: { uploaded: false, fileName: '', date: '' }
        }
    },
    {
        id: 'STU-002',
        firstName: 'James',
        lastName: 'Mwangi',
        middleName: 'Kariuki',
        admissionNumber: 'ADM-2023-112',
        dateOfBirth: '2009-07-22',
        gender: 'Male',
        nationalId: 'BC-2009-22456',
        nationality: 'Kenyan',
        classForm: 'Form 3-B',
        stream: 'Arts',
        admissionDate: '2023-01-20',
        previousSchool: 'Kitengela Primary',
        status: 'Active',
        enrollmentStatus: 'Active',
        isScholarship: false,
        guardianName: 'Sarah Mwangi',
        guardianRelationship: 'Mother',
        guardianPhone: '+254 722 456 789',
        guardianEmail: 'smwangi@email.com',
        guardianAddress: 'P.O. Box 456, Kitengela',
        bloodGroup: 'A+',
        allergies: 'Penicillin',
        medicalNotes: 'Asthmatic - carries inhaler',
        // Financial Information
        financialInfo: {
            totalFees: 61800,
            paidAmount: 46800,
            balance: 15000,
            lastPayment: '2026-01-03',
            paymentHistory: [
                { date: '2025-10-15', amount: 30000, method: 'Bank Transfer', reference: 'TRF-456789' },
                { date: '2026-01-03', amount: 16800, method: 'M-Pesa', reference: 'QA87654321' }
            ]
        },
        documents: {
            birthCertificate: { uploaded: true, fileName: 'James_BC.pdf', date: '2023-01-20' },
            nationalId: { uploaded: false, fileName: '', date: '' },
            academicRecords: { uploaded: true, fileName: 'James_Records.pdf', date: '2023-01-20' },
            medicalRecords: { uploaded: true, fileName: 'James_Medical.pdf', date: '2023-01-20' }
        }
    }
];

// Add generated students from dummy data
if (window.generatedStudents) studentsData.push(...generatedStudents);

// File storage simulation
let uploadedFiles = {};

// ============================================
// STUDENT PROFILE MANAGEMENT
// ============================================

// Open Add Student Modal
function openAddStudentModal() {
    // Reset form
    document.getElementById('addStudentForm').reset();
    
    // Generate new admission number
    const year = new Date().getFullYear();
    const nextNum = String(studentsData.length + 1).padStart(3, '0');
    document.getElementById('admissionNumber').value = `ADM-${year}-${nextNum}`;
    
    openModal('addStudentModal');
}

// Submit Add Student
function submitAddStudent() {
    // Collect form data
    const studentData = {
        id: 'STU-' + String(studentsData.length + 1).padStart(3, '0'),
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        middleName: document.getElementById('middleName').value,
        admissionNumber: document.getElementById('admissionNumber').value,
        dateOfBirth: document.getElementById('dateOfBirth').value,
        gender: document.getElementById('gender').value,
        nationalId: document.getElementById('nationalId').value,
        nationality: document.getElementById('nationality').value || 'Kenyan',
        classForm: document.getElementById('classForm').value,
        stream: document.getElementById('stream').value,
        admissionDate: document.getElementById('admissionDate').value,
        previousSchool: document.getElementById('previousSchool').value,
        status: document.getElementById('studentStatus').value || 'Active',
        isScholarship: document.getElementById('isScholarship').checked,
        guardianName: document.getElementById('guardianName').value,
        guardianRelationship: document.getElementById('guardianRelationship').value,
        guardianPhone: document.getElementById('guardianPhone').value,
        guardianEmail: document.getElementById('guardianEmail').value,
        guardianAddress: document.getElementById('guardianAddress').value,
        bloodGroup: document.getElementById('bloodGroup').value,
        allergies: document.getElementById('allergies').value || 'None',
        medicalNotes: document.getElementById('medicalNotes').value,
        documents: {
            birthCertificate: { uploaded: false, fileName: '', date: '' },
            nationalId: { uploaded: false, fileName: '', date: '' },
            academicRecords: { uploaded: false, fileName: '', date: '' },
            medicalRecords: { uploaded: false, fileName: '', date: '' }
        }
    };

    // Validate required fields
    if (!studentData.firstName || !studentData.lastName || !studentData.admissionNumber || 
        !studentData.dateOfBirth || !studentData.gender || !studentData.classForm || 
        !studentData.guardianName || !studentData.guardianPhone) {
        showNotification('Validation Error', 'Please fill in all required fields marked with *', 'error');
        return;
    }

    // Add to students array
    studentsData.push(studentData);

    // Show success notification
    showNotification('Student Added Successfully!', 
        `${studentData.firstName} ${studentData.lastName} has been added to the system.`, 
        'success');

    // Close modal and refresh table
    closeModal('addStudentModal');
    refreshStudentTable();
}

// Open Edit Student Modal
function openEditStudentModal(studentId) {
    const student = studentsData.find(s => s.id === studentId);
    if (!student) return;

    // Populate form with student data
    document.getElementById('editFirstName').value = student.firstName;
    document.getElementById('editLastName').value = student.lastName;
    document.getElementById('editMiddleName').value = student.middleName || '';
    document.getElementById('editAdmissionNumber').value = student.admissionNumber;
    document.getElementById('editDateOfBirth').value = student.dateOfBirth;
    document.getElementById('editGender').value = student.gender;
    document.getElementById('editNationalId').value = student.nationalId;
    document.getElementById('editNationality').value = student.nationality;
    document.getElementById('editClassForm').value = student.classForm;
    document.getElementById('editStream').value = student.stream || '';
    document.getElementById('editStudentStatus').value = student.status;
    document.getElementById('editIsScholarship').checked = student.isScholarship;
    document.getElementById('editGuardianName').value = student.guardianName;
    document.getElementById('editGuardianRelationship').value = student.guardianRelationship;
    document.getElementById('editGuardianPhone').value = student.guardianPhone;
    document.getElementById('editGuardianEmail').value = student.guardianEmail || '';
    document.getElementById('editBloodGroup').value = student.bloodGroup || '';
    document.getElementById('editAllergies').value = student.allergies;
    document.getElementById('editMedicalNotes').value = student.medicalNotes || '';

    // Store student ID for later use
    document.getElementById('editStudentForm').setAttribute('data-student-id', studentId);

    openModal('editStudentModal');
}

// Submit Edit Student
function submitEditStudent() {
    const studentId = document.getElementById('editStudentForm').getAttribute('data-student-id');
    const student = studentsData.find(s => s.id === studentId);
    
    if (!student) return;

    // Update student data
    student.firstName = document.getElementById('editFirstName').value;
    student.lastName = document.getElementById('editLastName').value;
    student.middleName = document.getElementById('editMiddleName').value;
    student.dateOfBirth = document.getElementById('editDateOfBirth').value;
    student.gender = document.getElementById('editGender').value;
    student.nationalId = document.getElementById('editNationalId').value;
    student.nationality = document.getElementById('editNationality').value;
    student.classForm = document.getElementById('editClassForm').value;
    student.stream = document.getElementById('editStream').value;
    student.status = document.getElementById('editStudentStatus').value;
    student.isScholarship = document.getElementById('editIsScholarship').checked;
    student.guardianName = document.getElementById('editGuardianName').value;
    student.guardianRelationship = document.getElementById('editGuardianRelationship').value;
    student.guardianPhone = document.getElementById('editGuardianPhone').value;
    student.guardianEmail = document.getElementById('editGuardianEmail').value;
    student.bloodGroup = document.getElementById('editBloodGroup').value;
    student.allergies = document.getElementById('editAllergies').value;
    student.medicalNotes = document.getElementById('editMedicalNotes').value;

    showNotification('Student Updated!', 
        `${student.firstName} ${student.lastName}'s information has been updated successfully.`, 
        'success');

    closeModal('editStudentModal');
    refreshStudentTable();
}

// View Student Profile
function viewStudentProfile(studentId) {
    const student = studentsData.find(s => s.id === studentId);
    if (!student) return;

    // Populate view modal
    const initials = (student.firstName[0] + student.lastName[0]).toUpperCase();
    document.getElementById('viewStudentAvatar').textContent = initials;
    document.getElementById('viewStudentName').textContent = `${student.firstName} ${student.middleName ? student.middleName + ' ' : ''}${student.lastName}`;
    document.getElementById('viewStudentAdmNo').textContent = student.admissionNumber;
    document.getElementById('viewStudentClass').textContent = student.classForm + (student.stream ? ' - ' + student.stream : '');
    
    const scholarshipBadge = document.getElementById('viewStudentScholarship');
    if (student.isScholarship) {
        scholarshipBadge.classList.remove('hidden');
    } else {
        scholarshipBadge.classList.add('hidden');
    }

    // Personal Information
    document.getElementById('viewFullName').textContent = `${student.firstName} ${student.middleName ? student.middleName + ' ' : ''}${student.lastName}`;
    document.getElementById('viewDOB').textContent = formatDate(student.dateOfBirth);
    document.getElementById('viewGender').textContent = student.gender;
    document.getElementById('viewNationalId').textContent = student.nationalId;

    // Academic Information
    document.getElementById('viewCurrentClass').textContent = student.classForm;
    document.getElementById('viewStream').textContent = student.stream || 'N/A';
    document.getElementById('viewAdmissionDate').textContent = formatDate(student.admissionDate);
    document.getElementById('viewStatus').textContent = student.status;

    // Set status in dropdown
    const statusSelect = document.getElementById('updateStatusSelect');
    if (statusSelect) {
        statusSelect.value = student.status;
    }

    // Financial Information
    if (student.financialInfo) {
        const fi = student.financialInfo;
        document.getElementById('viewTotalFees').textContent = `KES ${fi.totalFees?.toLocaleString() || '0'}`;
        document.getElementById('viewPaidAmount').textContent = `KES ${fi.paidAmount?.toLocaleString() || '0'}`;
        document.getElementById('viewBalance').textContent = `KES ${fi.balance?.toLocaleString() || '0'}`;
        document.getElementById('viewLastPayment').textContent = fi.lastPayment ? formatDate(fi.lastPayment) : 'N/A';
        
        // Calculate and display progress
        const progress = fi.totalFees > 0 ? Math.round((fi.paidAmount / fi.totalFees) * 100) : 0;
        document.getElementById('viewPaymentProgress').textContent = `${progress}%`;
        document.getElementById('viewPaymentProgressBar').style.width = `${progress}%`;
        
        // Color the balance based on status
        const balanceEl = document.getElementById('viewBalance');
        if (fi.balance === 0) {
            balanceEl.classList.remove('text-amber-700', 'text-rose-700');
            balanceEl.classList.add('text-emerald-700');
        } else if (fi.balance > 20000) {
            balanceEl.classList.remove('text-amber-700', 'text-emerald-700');
            balanceEl.classList.add('text-rose-700');
        }
        
        // Payment History
        const historyContainer = document.getElementById('viewPaymentHistory');
        if (fi.paymentHistory && fi.paymentHistory.length > 0) {
            historyContainer.innerHTML = fi.paymentHistory.map(payment => `
                <div class="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                            <ion-icon name="cash-outline" class="text-emerald-600"></ion-icon>
                        </div>
                        <div>
                            <p class="font-medium text-slate-900">KES ${payment.amount.toLocaleString()}</p>
                            <p class="text-xs text-slate-500">${payment.method} • ${payment.reference}</p>
                        </div>
                    </div>
                    <span class="text-sm text-slate-600">${formatDate(payment.date)}</span>
                </div>
            `).join('');
        } else {
            historyContainer.innerHTML = '<p class="text-sm text-slate-500 text-center py-4">No payment history available</p>';
        }
    }

    // Store student ID in modal for export/status update
    document.getElementById('viewStudentModal').setAttribute('data-student-id', studentId);

    // Guardian Information
    document.getElementById('viewGuardianName').textContent = student.guardianName;
    document.getElementById('viewGuardianRelation').textContent = student.guardianRelationship;
    document.getElementById('viewGuardianPhone').textContent = student.guardianPhone;
    document.getElementById('viewGuardianEmail').textContent = student.guardianEmail || 'N/A';

    // Medical Information
    document.getElementById('viewBloodGroup').textContent = student.bloodGroup || 'N/A';
    document.getElementById('viewAllergies').textContent = student.allergies;
    document.getElementById('viewMedicalNotes').textContent = student.medicalNotes || 'None';

    // Documents List
    const documentsList = document.getElementById('viewDocumentsList');
    const docs = [];
    
    if (student.documents.birthCertificate.uploaded) {
        docs.push(`
            <div class="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div class="flex items-center gap-2">
                    <ion-icon name="document-outline" class="text-emerald-600"></ion-icon>
                    <span class="text-sm font-medium">Birth Certificate</span>
                </div>
                <span class="text-xs text-slate-500">${formatDate(student.documents.birthCertificate.date)}</span>
            </div>
        `);
    }
    
    if (student.documents.nationalId.uploaded) {
        docs.push(`
            <div class="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div class="flex items-center gap-2">
                    <ion-icon name="card-outline" class="text-emerald-600"></ion-icon>
                    <span class="text-sm font-medium">National ID/Passport</span>
                </div>
                <span class="text-xs text-slate-500">${formatDate(student.documents.nationalId.date)}</span>
            </div>
        `);
    }
    
    if (student.documents.academicRecords.uploaded) {
        docs.push(`
            <div class="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div class="flex items-center gap-2">
                    <ion-icon name="school-outline" class="text-emerald-600"></ion-icon>
                    <span class="text-sm font-medium">Academic Records</span>
                </div>
                <span class="text-xs text-slate-500">${formatDate(student.documents.academicRecords.date)}</span>
            </div>
        `);
    }
    
    if (student.documents.medicalRecords.uploaded) {
        docs.push(`
            <div class="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div class="flex items-center gap-2">
                    <ion-icon name="medical-outline" class="text-emerald-600"></ion-icon>
                    <span class="text-sm font-medium">Medical Records</span>
                </div>
                <span class="text-xs text-slate-500">${formatDate(student.documents.medicalRecords.date)}</span>
            </div>
        `);
    }
    
    if (docs.length === 0) {
        documentsList.innerHTML = '<p class="text-sm text-slate-500">No documents uploaded yet</p>';
    } else {
        documentsList.innerHTML = docs.join('');
    }

    // Populate Status History
    const statusHistoryContainer = document.getElementById('viewStatusHistory');
    if (student.statusHistory && student.statusHistory.length > 0) {
        const sortedHistory = [...student.statusHistory].reverse(); // Show most recent first
        statusHistoryContainer.innerHTML = sortedHistory.map(entry => {
            const date = new Date(entry.changedAt);
            const formattedDate = date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            
            const statusConfig = studentStatuses[entry.status] || { color: 'slate', label: entry.status };
            
            return `
                <div class="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                    <div class="w-8 h-8 rounded-lg bg-${statusConfig.color}-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <ion-icon name="checkmark-circle" class="text-${statusConfig.color}-600"></ion-icon>
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2 mb-1">
                            <span class="px-2 py-0.5 bg-${statusConfig.color}-100 text-${statusConfig.color}-700 text-xs font-semibold rounded-full">
                                ${entry.status}
                            </span>
                            ${entry.previousStatus ? `<span class="text-xs text-slate-500">from ${entry.previousStatus}</span>` : ''}
                        </div>
                        <p class="text-xs text-slate-600 mb-1">${entry.note || 'Status updated'}</p>
                        <p class="text-xs text-slate-500">${formattedDate} • by ${entry.changedBy}</p>
                    </div>
                </div>
            `;
        }).join('');
    } else {
        statusHistoryContainer.innerHTML = '<p class="text-sm text-slate-500 text-center py-4">No status history available</p>';
    }

    openModal('viewStudentModal');
}

// ============================================
// DOCUMENT MANAGEMENT
// ============================================

// Open Document Upload Modal
function openDocumentUploadModal(studentId) {
    const student = studentsData.find(s => s.id === studentId);
    if (!student) return;

    // Set student info
    document.getElementById('uploadStudentName').textContent = `${student.firstName} ${student.lastName}`;
    document.getElementById('uploadAdmissionNo').textContent = student.admissionNumber;

    // Store student ID
    document.getElementById('documentUploadModal').setAttribute('data-student-id', studentId);

    // Reset file inputs
    ['birthCert', 'nationalId', 'academicRecords', 'medicalRecords'].forEach(docType => {
        const fileInput = document.getElementById(docType + 'File');
        if (fileInput) fileInput.value = '';
        
        const preview = document.getElementById(docType + 'Preview');
        if (preview) preview.classList.add('hidden');
        
        const status = document.getElementById(docType + 'Status');
        if (status) {
            const doc = student.documents[docType === 'birthCert' ? 'birthCertificate' : docType];
            if (doc && doc.uploaded) {
                status.textContent = 'Uploaded';
                status.className = 'text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full';
            } else {
                status.textContent = 'Not Uploaded';
                status.className = 'text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-full';
            }
        }
    });

    openModal('documentUploadModal');
}

// Handle File Selection
function handleFileSelect(docType, input) {
    const file = input.files[0];
    if (!file) return;

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
        showNotification('File Too Large', 'Please upload a file smaller than 5MB', 'error');
        input.value = '';
        return;
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
        showNotification('Invalid File Type', 'Please upload PDF, JPEG, or PNG files only', 'error');
        input.value = '';
        return;
    }

    // Store file in memory (in real app, would upload to server)
    uploadedFiles[docType] = file;

    // Show preview
    const preview = document.getElementById(docType + 'Preview');
    const fileName = document.getElementById(docType + 'FileName');
    const status = document.getElementById(docType + 'Status');

    if (preview && fileName && status) {
        fileName.textContent = file.name;
        preview.classList.remove('hidden');
        status.textContent = 'Ready to Upload';
        status.className = 'text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full';
    }
}

// Remove File
function removeFile(docType) {
    delete uploadedFiles[docType];
    
    const fileInput = document.getElementById(docType + 'File');
    const preview = document.getElementById(docType + 'Preview');
    const status = document.getElementById(docType + 'Status');

    if (fileInput) fileInput.value = '';
    if (preview) preview.classList.add('hidden');
    if (status) {
        status.textContent = 'Not Uploaded';
        status.className = 'text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-full';
    }
}

// Submit Documents
function submitDocuments() {
    const studentId = document.getElementById('documentUploadModal').getAttribute('data-student-id');
    const student = studentsData.find(s => s.id === studentId);
    
    if (!student) return;

    const uploadDate = new Date().toISOString().split('T')[0];
    let uploadCount = 0;

    // Process each document type
    const docMapping = {
        'birthCert': 'birthCertificate',
        'nationalId': 'nationalId',
        'academicRecords': 'academicRecords',
        'medicalRecords': 'medicalRecords'
    };

    Object.keys(docMapping).forEach(key => {
        if (uploadedFiles[key]) {
            const docKey = docMapping[key];
            student.documents[docKey] = {
                uploaded: true,
                fileName: uploadedFiles[key].name,
                date: uploadDate
            };
            uploadCount++;
        }
    });

    if (uploadCount > 0) {
        showNotification('Documents Uploaded!', 
            `${uploadCount} document(s) have been uploaded successfully for ${student.firstName} ${student.lastName}.`, 
            'success');
        
        // Clear uploaded files
        uploadedFiles = {};
        
        closeModal('documentUploadModal');
        refreshStudentTable();
    } else {
        showNotification('No Documents Selected', 'Please select at least one document to upload', 'warning');
    }
}

// ============================================
// TABLE MANAGEMENT
// ============================================

// Refresh Student Table
function refreshStudentTable() {
    const tbody = document.getElementById('studentTableBody');
    if (!tbody) return;

    tbody.innerHTML = studentsData.map(student => {
        const initials = (student.firstName[0] + student.lastName[0]).toUpperCase();
        const colors = ['bg-blue-100 text-blue-600', 'bg-purple-100 text-purple-600', 'bg-orange-100 text-orange-600', 'bg-emerald-100 text-emerald-600', 'bg-rose-100 text-rose-600'];
        const colorClass = colors[student.id.charCodeAt(student.id.length - 1) % colors.length];

        return `
            <tr class="hover:bg-slate-50/80 transition-colors group">
                <td class="px-6 py-4 font-medium">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full ${colorClass} flex items-center justify-center font-bold text-xs">${initials}</div>
                        <div>
                            <div class="font-semibold text-slate-900">${student.firstName} ${student.lastName}</div>
                            <div class="text-xs text-slate-500">${student.gender}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 text-slate-500 font-mono text-xs">${student.admissionNumber}</td>
                <td class="px-6 py-4">
                    <div class="font-medium">${student.classForm}</div>
                    <div class="text-xs text-slate-500">${student.stream || 'N/A'}</div>
                </td>
                <td class="px-6 py-4 text-slate-500 text-xs">
                    <div class="font-medium text-slate-700">${student.guardianName}</div>
                    <div>${student.guardianPhone}</div>
                </td>
                <td class="px-6 py-4">
                    ${getStatusBadge(student.status)}
                    ${student.isScholarship ? '<div class="mt-1"><span class="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full uppercase">Scholarship</span></div>' : ''}
                </td>
                <td class="px-6 py-4 text-right">
                    <div class="flex items-center justify-end gap-1">
                        <button onclick="viewStudentProfile('${student.id}')" class="p-2 hover:bg-blue-100 rounded-lg text-slate-400 hover:text-blue-600 transition-colors" title="View Profile">
                            <ion-icon name="eye-outline" class="text-lg"></ion-icon>
                        </button>
                        <button onclick="openEditStudentModal('${student.id}')" class="p-2 hover:bg-emerald-100 rounded-lg text-slate-400 hover:text-emerald-600 transition-colors" title="Edit Details">
                            <ion-icon name="create-outline" class="text-lg"></ion-icon>
                        </button>
                        <button onclick="openDocumentUploadModal('${student.id}')" class="p-2 hover:bg-purple-100 rounded-lg text-slate-400 hover:text-purple-600 transition-colors" title="Upload Documents">
                            <ion-icon name="document-attach-outline" class="text-lg"></ion-icon>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Format Date
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Get Status Badge
function getStatusBadge(status) {
    const badges = {
        'Active': 'badge-success',
        'On Leave': 'badge-warning',
        'Suspended': 'badge-danger',
        'Graduated': 'badge-info'
    };
    const badgeClass = badges[status] || 'badge-secondary';
    return `<span class="${badgeClass}">${status.toUpperCase()}</span>`;
}

// Show Notification (Toast)
function showNotification(title, message, type = 'info') {
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

    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 10);

    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ============================================
// SEARCH AND FILTER
// ============================================

// Initialize search and filter functionality
function initializeSearchAndFilter() {
    const searchInput = document.querySelector('input[placeholder*="Search by name"]');
    const gradeFilter = document.querySelectorAll('select')[0];
    const statusFilter = document.querySelectorAll('select')[1];

    if (searchInput) {
        searchInput.addEventListener('input', filterStudents);
    }

    if (gradeFilter) {
        gradeFilter.addEventListener('change', filterStudents);
    }

    if (statusFilter) {
        statusFilter.addEventListener('change', filterStudents);
    }
}

// Filter Students
function filterStudents() {
    const searchTerm = document.querySelector('input[placeholder*="Search by name"]')?.value.toLowerCase() || '';
    const gradeFilter = document.querySelectorAll('select')[0]?.value || '';
    const statusFilter = document.querySelectorAll('select')[1]?.value || '';

    const filteredStudents = studentsData.filter(student => {
        const matchesSearch = 
            student.firstName.toLowerCase().includes(searchTerm) ||
            student.lastName.toLowerCase().includes(searchTerm) ||
            student.admissionNumber.toLowerCase().includes(searchTerm);

        const matchesGrade = !gradeFilter || student.classForm.includes(gradeFilter.replace('Form ', ''));
        const matchesStatus = !statusFilter || student.status === statusFilter;

        return matchesSearch && matchesGrade && matchesStatus;
    });

    // Update table with filtered results
    const tbody = document.getElementById('studentTableBody');
    if (!tbody) return;

    if (filteredStudents.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="px-6 py-12 text-center">
                    <div class="flex flex-col items-center justify-center gap-3">
                        <ion-icon name="search-outline" class="text-6xl text-slate-300"></ion-icon>
                        <p class="text-slate-500 font-medium">No students found</p>
                        <p class="text-sm text-slate-400">Try adjusting your search criteria</p>
                    </div>
                </td>
            </tr>
        `;
    } else {
        // Use the existing refresh logic but with filtered data
        const originalData = studentsData;
        studentsData = filteredStudents;
        refreshStudentTable();
        studentsData = originalData;
    }
}

// ============================================
// EXPORT INDIVIDUAL STUDENT DATA
// ============================================

function exportStudentData(studentId) {
    const student = studentsData.find(s => s.id === studentId);
    if (!student) {
        showNotification('Error', 'Student not found', 'error');
        return;
    }

    // Create CSV content
    const csvContent = `Student Data Export - ${student.firstName} ${student.lastName}
Generated: ${new Date().toLocaleString()}

PERSONAL INFORMATION
---------------------
Full Name,${student.firstName} ${student.middleName || ''} ${student.lastName}
Admission Number,${student.admissionNumber}
Date of Birth,${student.dateOfBirth}
Gender,${student.gender}
National ID/BC No.,${student.nationalId}
Nationality,${student.nationality}

ACADEMIC INFORMATION
---------------------
Current Class,${student.classForm}
Stream,${student.stream || 'N/A'}
Admission Date,${student.admissionDate}
Previous School,${student.previousSchool || 'N/A'}
Enrollment Status,${student.enrollmentStatus || student.status}
Scholarship Student,${student.isScholarship ? 'Yes' : 'No'}

GUARDIAN INFORMATION
---------------------
Guardian Name,${student.guardianName}
Relationship,${student.guardianRelationship}
Phone Number,${student.guardianPhone}
Email,${student.guardianEmail || 'N/A'}
Address,${student.guardianAddress || 'N/A'}

MEDICAL INFORMATION
---------------------
Blood Group,${student.bloodGroup || 'N/A'}
Allergies,${student.allergies || 'None'}
Medical Notes,${student.medicalNotes || 'None'}

FINANCIAL INFORMATION
---------------------
Total Fees,KES ${student.financialInfo?.totalFees?.toLocaleString() || '0'}
Amount Paid,KES ${student.financialInfo?.paidAmount?.toLocaleString() || '0'}
Balance Due,KES ${student.financialInfo?.balance?.toLocaleString() || '0'}
Last Payment Date,${student.financialInfo?.lastPayment || 'N/A'}
Payment Status,${student.financialInfo?.balance === 0 ? 'Fully Paid' : 'Outstanding Balance'}
`;

    // Demo: Show export success toast instead of download
    showToast(`Export successful: ${student.firstName} ${student.lastName}'s data`, 'success', 2000);
}

// Export all students data
function exportAllStudentsData() {
    let csvContent = 'Admission No,First Name,Last Name,Class,Status,Total Fees,Paid Amount,Balance,Guardian Name,Guardian Phone\n';
    
    studentsData.forEach(student => {
        csvContent += `${student.admissionNumber},${student.firstName},${student.lastName},${student.classForm},${student.status},${student.financialInfo?.totalFees || 0},${student.financialInfo?.paidAmount || 0},${student.financialInfo?.balance || 0},${student.guardianName},${student.guardianPhone}\n`;
    });

    // Demo: Show export success toast instead of download
    showToast('Export successful: All student data exported', 'success', 2000);
}

// ============================================
// UPDATE STUDENT STATUS
// ============================================

function updateStudentStatus(studentId, newStatus, note = '') {
    const student = studentsData.find(s => s.id === studentId);
    if (!student) return;

    const oldStatus = student.status;
    
    // Don't update if status is the same
    if (oldStatus === newStatus) {
        showToast('Status unchanged', 'info', 2000);
        return;
    }
    
    student.status = newStatus;
    student.enrollmentStatus = newStatus;
    student.statusLastChanged = new Date().toISOString().split('T')[0];

    // Add to status history
    if (!student.statusHistory) {
        student.statusHistory = [];
    }
    
    student.statusHistory.push({
        status: newStatus,
        changedAt: new Date().toISOString(),
        changedBy: 'Demo User',
        previousStatus: oldStatus,
        note: note || `Status changed from ${oldStatus} to ${newStatus}`
    });

    showNotification('Status Updated', 
        `${student.firstName}'s status changed from ${oldStatus} to ${newStatus}`, 
        'success');

    refreshStudentTable();
    
    // If viewing the student profile, update it
    if (!document.getElementById('viewStudentModal').classList.contains('hidden')) {
        viewStudentProfile(studentId);
    }
}

// Get status badge HTML
function getStatusBadge(status) {
    const statusConfig = studentStatuses[status] || { color: 'slate', label: status };
    return `<span class="px-2.5 py-1 bg-${statusConfig.color}-100 text-${statusConfig.color}-700 text-xs font-semibold rounded-full">${statusConfig.label}</span>`;
}

// ============================================
// INITIALIZATION
// ============================================

// Initialize status history for existing students (migration)
function initializeStatusHistory() {
    studentsData.forEach(student => {
        // Add statusHistory if it doesn't exist
        if (!student.statusHistory) {
            student.statusHistory = [
                {
                    status: student.status || 'Active',
                    changedAt: student.admissionDate || new Date().toISOString().split('T')[0],
                    changedBy: 'System',
                    note: 'Initial enrollment'
                }
            ];
        }
        // Add statusLastChanged if it doesn't exist
        if (!student.statusLastChanged) {
            student.statusLastChanged = student.admissionDate || new Date().toISOString().split('T')[0];
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize status history for all students
    initializeStatusHistory();
    
    // Initialize search and filters
    initializeSearchAndFilter();

    // Initial table load
    // refreshStudentTable(); // Commented out to use hardcoded HTML data

    console.log('Student Records Management System Initialized');
    console.log(`Total Students: ${studentsData.length}`);
    console.log('Available statuses:', Object.keys(studentStatuses).join(', '));
});
