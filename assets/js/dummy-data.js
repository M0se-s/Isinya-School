// Dummy Data Generator - Isinya Township Secondary School
// Generate realistic demo data with dates from the last 12 months

// Helper function to generate random dates within last year
function getRandomDate(daysBack) {
    const date = new Date('2026-01-07');
    date.setDate(date.getDate() - Math.floor(Math.random() * daysBack));
    return date.toISOString().split('T')[0];
}

// Names pool
const names = {
    first: ['Faith', 'James', 'Mary', 'John', 'Grace', 'Peter', 'Sarah', 'David', 'Lucy', 'Daniel', 'Joy', 'Michael', 'Ruth', 'Brian', 'Esther', 'Kevin', 'Jane', 'Victor', 'Mercy', 'Dennis', 'Rose', 'Mark', 'Ann', 'Paul', 'Betty', 'Samuel', 'Elizabeth', 'Joseph', 'Martha', 'Emmanuel', 'Rebecca', 'Joshua', 'Hannah', 'Stephen', 'Naomi', 'Thomas', 'Deborah', 'Isaac', 'Lydia', 'Benjamin', 'Priscilla', 'Timothy', 'Eunice', 'Matthew', 'Tabitha', 'Andrew', 'Dorcas', 'Philip', 'Abigail', 'Simon'],
    last: ['Kipchoge', 'Mwangi', 'Kamau', 'Ochieng', 'Wanjiru', 'Njoroge', 'Mutua', 'Chebet', 'Kimani', 'Otieno', 'Kariuki', 'Wambui', 'Nyambura', 'Kiprono', 'Achieng', 'Mburu', 'Njenga', 'Rotich', 'Maina', 'Korir']
};
const classes = ['Form 1-A', 'Form 1-B', 'Form 2-A', 'Form 2-B', 'Form 3-A', 'Form 3-B', 'Form 4-A', 'Form 4-B'];
const methods = ['M-Pesa', 'Bank Transfer', 'Cash'];

// Generate 25 recent payments (increased from 10)
const recentPayments = Array.from({length: 25}, (_, i) => ({
    id: `REC-2026-${1260+i}`,
    studentName: `${names.first[i % 50]} ${names.last[i % 20]}`,
    class: classes[i % 8],
    date: getRandomDate(60),
    amount: [45000, 25000, 82500, 61800, 30000, 50000, 40000, 35000, 75000, 55000][i % 10]
}));

// Generate 50 additional invoices (increased from 28)
const generatedInvoices = Array.from({length: 50}, (_, i) => {
    const total = [45000, 61800, 82500, 50000, 70000, 38000, 55000, 65000, 48000, 72000][i % 10];
    const paid = Math.random() > 0.3 ? total : Math.floor(total * (0.5 + Math.random() * 0.5));
    return {
        id: `INV-2026-${900+i}`,
        studentId: i+3,
        studentName: `${names.first[(i+2) % 50]} ${names.last[(i+2) % 20]}`,
        class: classes[(i+2) % 8],
        date: getRandomDate(180),
        dueDate: getRandomDate(30),
        totalAmount: total,
        paidAmount: paid,
        balance: total - paid,
        status: paid === total ? 'Paid' : paid > 0 ? 'Partial' : 'Unpaid',
        items: [{name: 'Tuition Fee', amount: 45000}]
    };
});

// Generate 25 additional receipts (increased from 10)
const generatedReceipts = Array.from({length: 25}, (_, i) => ({
    id: `REC-2026-${1254+i}`,
    name: `${names.first[(i+3) % 50]} ${names.last[(i+3) % 20]}`,
    date: getRandomDate(90),
    type: ['Tuition', 'Donation', 'Activity Fee', 'Exam Fee'][i % 4],
    amount: [45000, 30000, 25000, 50000, 15000, 20000, 35000, 40000][i % 8],
    method: methods[i % 3],
    reference: `REF${Math.random().toString(36).substr(2, 9).toUpperCase()}`
}));

// Generate 50 additional students (increased from 28)
const generatedStudents = Array.from({length: 50}, (_, i) => {
    const fn = names.first[(i+2) % 50];
    const ln = names.last[(i+2) % 20];
    const total = [45000, 61800, 82500, 50000, 70000, 38000, 55000, 65000][i % 8];
    const paid = Math.random() > 0.2 ? total : Math.floor(total * 0.7);
    return {
        id: `STU-${String(i+3).padStart(3, '0')}`,
        firstName: fn,
        lastName: ln,
        middleName: '',
        admissionNumber: `ADM-2025-${String(100+i).padStart(3, '0')}`,
        dateOfBirth: `200${8+i%3}-0${(i%9)+1}-15`,
        gender: i % 2 ? 'Male' : 'Female',
        nationalId: `BC-200${8+i%3}-${10000+i}`,
        nationality: 'Kenyan',
        classForm: classes[(i+2) % 8],
        stream: ['Science', 'Arts', 'Business'][i % 3],
        admissionDate: getRandomDate(900),
        previousSchool: 'Primary School',
        status: 'Active',
        enrollmentStatus: 'Active',
        isScholarship: i % 4 === 0,
        guardianName: `${names.first[(i+10) % 50]} ${ln}`,
        guardianRelationship: ['Father', 'Mother', 'Guardian'][i % 3],
        guardianPhone: `+254 7${i+10} 000 ${String(i).padStart(3, '0')}`,
        guardianEmail: `${fn.toLowerCase()}${i}@email.com`,
        guardianAddress: `P.O. Box ${100+i}, Isinya`,
        bloodGroup: ['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-'][i % 8],
        allergies: 'None',
        medicalNotes: '',
        financialInfo: {
            totalFees: total,
            paidAmount: paid,
            balance: total - paid,
            lastPayment: getRandomDate(60),
            paymentHistory: []
        },
        documents: {
            birthCertificate: {uploaded: true, fileName: `${fn}_BC.pdf`, date: getRandomDate(700)},
            nationalId: {uploaded: false, fileName: '', date: ''},
            academicRecords: {uploaded: true, fileName: `${fn}_Records.pdf`, date: getRandomDate(700)},
            medicalRecords: {uploaded: false, fileName: '', date: ''}
        }
    };
});
