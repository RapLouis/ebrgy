// ==========================================
// DEFAULT INITIAL DATA SEEDS
// ==========================================
const DEFAULT_REPORTS = [
    { id: 'BRGY-2026-1001', reporter: 'Ramon Mercado', category: 'Electrical & Power Lines', location: 'Purok 3', description: 'Low-hanging electric wire near basketball court.', status: 'Dispatched', date: 'Nov 10, 2026' },
    { id: 'BRGY-2026-1002', reporter: 'Liza Ramos', category: 'Garbage & Sanitation', location: 'Purok 1', description: 'Storm debris uncollected near drainage channel.', status: 'Resolved', date: 'Nov 09, 2026' }
];

const DEFAULT_ANNOUNCEMENTS = [
    { id: 'ANN-1', time: '08:00 AM - 11:00 AM', title: 'Barangay Clean-Up & Drainage Clearing Drive', location: 'Purok 1 to 4', details: 'Residents and Tanods mobilization.' },
    { id: 'ANN-2', time: '01:00 PM - 03:30 PM', title: 'Free Anti-Rabies Vaccination for Pets', location: 'Barangay Covered Court', details: 'City Vet Office mobile drive.' },
    { id: 'ANN-3', time: '04:00 PM - 06:00 PM', title: 'Lupong Tagapapayapa Mediation Hearing', location: 'Session Hall A', details: 'Scheduled land boundary disputes.' }
];

const DEFAULT_EVENTS = [
    { id: 'EVT-1', date: 'Nov 12, 2026', title: 'Barangay Youth Basketball & Volleyball League', location: 'Main Covered Court' },
    { id: 'EVT-2', date: 'Nov 15, 2026', title: 'Quarterly General Barangay Assembly', location: 'Multipurpose Hall & Online' },
    { id: 'EVT-3', date: 'Nov 18, 2026', title: 'Free Maternal & Pediatric Health Checkup', location: 'Barangay Health Center' },
    { id: 'EVT-4', date: 'Nov 22, 2026', title: 'Sangguniang Kabataan (SK) Leadership Seminar', location: 'Session Hall B' }
];

const DEFAULT_FORM_REQUESTS = [
    { code: 'CLAIM-894014', docType: 'Certificate of Residency', applicant: 'Raphael Gabion', purpose: 'Scholarship Application', status: 'Ready for Pickup', date: 'Nov 11, 2026', fee: '₱50.00' }
];

const DEFAULT_APPOINTMENTS = [
    { id: 'APPT-2026-882104', residentName: 'Elena Roxas', phone: '09175551234', service: 'Blotter & Dispute Mediation', official: 'Kagawad Roberto Tan — Night Supervisor', date: '2026-11-12', timeSlot: '09:00 AM - 10:00 AM', notes: 'Property boundary inquiry', status: 'Confirmed' }
];

function ensureDefaultsInitialized() {
    if (!localStorage.getItem('brgy_reports')) {
        localStorage.setItem('brgy_reports', JSON.stringify(DEFAULT_REPORTS));
    }
    if (!localStorage.getItem('brgy_announcements')) {
        localStorage.setItem('brgy_announcements', JSON.stringify(DEFAULT_ANNOUNCEMENTS));
    }
    if (!localStorage.getItem('brgy_events')) {
        localStorage.setItem('brgy_events', JSON.stringify(DEFAULT_EVENTS));
    }
    if (!localStorage.getItem('brgy_form_requests')) {
        localStorage.setItem('brgy_form_requests', JSON.stringify(DEFAULT_FORM_REQUESTS));
    }
    if (!localStorage.getItem('brgy_appointments')) {
        localStorage.setItem('brgy_appointments', JSON.stringify(DEFAULT_APPOINTMENTS));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    ensureDefaultsInitialized();
    refreshAdminData();
});

window.refreshAdminData = function() {
    ensureDefaultsInitialized();
    renderAdminReports();
    renderAdminAppointments();
    renderAdminDocs();
    updateAdminStats();
};

// TAB SWITCHING LOGIC
window.switchTab = function(tabName) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
        btn.classList.remove('border-brand-600', 'text-brand-600');
        btn.classList.add('border-transparent', 'text-slate-500');
    });

    const activeTab = document.getElementById(`tab-${tabName}`);
    const activeBtn = document.getElementById(`tabBtn-${tabName}`);
    if (activeTab) activeTab.classList.remove('hidden');
    if (activeBtn) {
        activeBtn.classList.remove('border-transparent', 'text-slate-500');
        activeBtn.classList.add('border-brand-600', 'text-brand-600');
    }
};

// ------------------------------------------
// 1. RENDER RESIDENT REPORTS TABLE
// ------------------------------------------
window.renderAdminReports = function() {
    const tbody = document.getElementById('adminReportsTable');
    if (!tbody) return;

    const reports = JSON.parse(localStorage.getItem('brgy_reports') || '[]');
    if (reports.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center py-6 text-slate-400 text-xs">No reports submitted yet.</td></tr>`;
        return;
    }

    tbody.innerHTML = reports.map((r, index) => {
        let badgeColor = 'bg-amber-100 text-amber-800 border-amber-300';
        if (r.status === 'Dispatched') badgeColor = 'bg-blue-100 text-blue-800 border-blue-300';
        if (r.status === 'Resolved') badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';

        return `
            <tr class="hover:bg-slate-50 border-b border-slate-100">
                <td class="py-3.5 px-4 font-mono font-bold text-brand-700">${r.id}</td>
                <td class="py-3.5 px-4 font-bold text-slate-900">${r.reporter || 'Resident'}</td>
                <td class="py-3.5 px-4">
                    <div class="font-semibold text-slate-800">${r.category}</div>
                    <div class="text-xs text-slate-500"><i class="fa-solid fa-location-dot mr-1 text-slate-400"></i>${r.location}</div>
                </td>
                <td class="py-3.5 px-4 text-xs italic text-slate-600 max-w-xs truncate" title="${r.description}">"${r.description}"</td>
                <td class="py-3.5 px-4">
                    <span class="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border ${badgeColor}">${r.status}</span>
                </td>
                <td class="py-3.5 px-4 text-right whitespace-nowrap">
                    <div class="inline-flex items-center justify-end gap-1.5">
                        <button onclick="updateReportStatus(${index}, 'Dispatched')" class="bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold px-2.5 py-1.5 rounded shadow cursor-pointer">
                            Dispatch
                        </button>
                        <button onclick="updateReportStatus(${index}, 'Resolved')" class="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold px-2.5 py-1.5 rounded shadow cursor-pointer">
                            Resolve
                        </button>
                        <button onclick="deleteReport(${index})" class="bg-rose-100 text-rose-700 hover:bg-rose-200 text-[11px] font-bold p-1.5 rounded cursor-pointer">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
};

window.updateReportStatus = function(index, newStatus) {
    const reports = JSON.parse(localStorage.getItem('brgy_reports') || '[]');
    if (reports[index]) {
        reports[index].status = newStatus;
        localStorage.setItem('brgy_reports', JSON.stringify(reports));
        refreshAdminData();
    }
};

window.deleteReport = function(index) {
    if (confirm('Are you sure you want to delete this incident report record?')) {
        const reports = JSON.parse(localStorage.getItem('brgy_reports') || '[]');
        reports.splice(index, 1);
        localStorage.setItem('brgy_reports', JSON.stringify(reports));
        refreshAdminData();
    }
};

window.filterAdminReports = function() {
    const input = document.getElementById('reportSearch');
    if (!input) return;
    const query = input.value.toLowerCase();
    const rows = document.querySelectorAll('#adminReportsTable tr');
    rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(query) ? '' : 'none';
    });
};

// ------------------------------------------
// 2. RENDER BOOKED APPOINTMENTS TABLE
// ------------------------------------------
window.renderAdminAppointments = function() {
    const tbody = document.getElementById('adminAppointmentsTable');
    if (!tbody) return;

    const appointments = JSON.parse(localStorage.getItem('brgy_appointments') || '[]');
    if (appointments.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="text-center py-6 text-slate-400 text-xs">No booked consultation appointments found.</td></tr>`;
        return;
    }

    tbody.innerHTML = appointments.map((a, index) => {
        let badgeColor = 'bg-amber-100 text-amber-800 border-amber-300';
        if (a.status === 'Confirmed') badgeColor = 'bg-blue-100 text-blue-800 border-blue-300';
        if (a.status === 'Completed') badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';

        return `
            <tr class="hover:bg-slate-50 border-b border-slate-100">
                <td class="py-3.5 px-4 font-mono font-bold text-brand-700">${a.id}</td>
                <td class="py-3.5 px-4 text-xs">
                    <strong class="font-bold text-slate-900 block">${a.residentName}</strong>
                    <span class="text-slate-400 text-[11px]"><i class="fa-solid fa-phone mr-1"></i>${a.phone}</span>
                </td>
                <td class="py-3.5 px-4 text-xs font-semibold text-slate-800">${a.service}</td>
                <td class="py-3.5 px-4 text-xs">
                    <span class="font-bold text-slate-900 block">${a.date}</span>
                    <span class="text-brand-600 font-mono text-[11px]">${a.timeSlot}</span>
                </td>
                <td class="py-3.5 px-4 text-xs font-bold text-slate-700">${a.official}</td>
                <td class="py-3.5 px-4">
                    <span class="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border ${badgeColor}">${a.status || 'Pending'}</span>
                </td>
                <td class="py-3.5 px-4 text-right whitespace-nowrap">
                    <div class="inline-flex items-center justify-end gap-1.5">
                        <button onclick="updateAppointmentStatus(${index}, 'Confirmed')" class="bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold px-2.5 py-1.5 rounded shadow cursor-pointer">
                            Confirm
                        </button>
                        <button onclick="updateAppointmentStatus(${index}, 'Completed')" class="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold px-2.5 py-1.5 rounded shadow cursor-pointer">
                            Complete
                        </button>
                        <button onclick="deleteAppointment(${index})" class="bg-rose-100 text-rose-700 hover:bg-rose-200 text-[11px] font-bold p-1.5 rounded cursor-pointer">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
};

window.updateAppointmentStatus = function(index, newStatus) {
    const appointments = JSON.parse(localStorage.getItem('brgy_appointments') || '[]');
    if (appointments[index]) {
        appointments[index].status = newStatus;
        localStorage.setItem('brgy_appointments', JSON.stringify(appointments));
        refreshAdminData();
    }
};

window.deleteAppointment = function(index) {
    if (confirm('Are you sure you want to delete this resident appointment booking?')) {
        const appointments = JSON.parse(localStorage.getItem('brgy_appointments') || '[]');
        appointments.splice(index, 1);
        localStorage.setItem('brgy_appointments', JSON.stringify(appointments));
        refreshAdminData();
    }
};

window.filterAdminAppointments = function() {
    const input = document.getElementById('appointmentSearch');
    if (!input) return;
    const query = input.value.toLowerCase();
    const rows = document.querySelectorAll('#adminAppointmentsTable tr');
    rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(query) ? '' : 'none';
    });
};

// ------------------------------------------
// 3. RENDER DOCUMENT REQUESTS TABLE
// ------------------------------------------
window.renderAdminDocs = function() {
    const tbody = document.getElementById('adminDocsTable');
    if (!tbody) return;

    const docs = JSON.parse(localStorage.getItem('brgy_form_requests') || '[]');
    if (docs.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center py-6 text-slate-400 text-xs">No document requests found.</td></tr>`;
        return;
    }

    tbody.innerHTML = docs.map((d, index) => `
        <tr class="hover:bg-slate-50 border-b border-slate-100">
            <td class="py-3.5 px-4 font-mono font-bold text-slate-900">${d.code}</td>
            <td class="py-3.5 px-4 font-bold text-brand-800">${d.docType}</td>
            <td class="py-3.5 px-4">${d.applicant}</td>
            <td class="py-3.5 px-4 font-bold text-emerald-700">${d.fee || '₱50.00'}</td>
            <td class="py-3.5 px-4">
                <span class="text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">${d.status || 'Ready for Pickup'}</span>
            </td>
            <td class="py-3.5 px-4 text-right whitespace-nowrap">
                <button onclick="printAdminTicket(${index})" class="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded shadow cursor-pointer">
                    <i class="fa-solid fa-print mr-1 text-amber-400"></i> Print Ticket
                </button>
            </td>
        </tr>
    `).join('');
};

window.printAdminTicket = function(index) {
    const docs = JSON.parse(localStorage.getItem('brgy_form_requests') || '[]');
    const item = docs[index];
    if (!item) return;

    const printBox = document.getElementById('adminPrintContainer');
    if (printBox) {
        printBox.innerHTML = `
            <div class="border-2 border-dashed border-slate-400 p-6 rounded-xl max-w-md mx-auto text-slate-900">
                <div class="text-center border-b pb-3 mb-3">
                    <h2 class="text-base font-bold uppercase">Barangay San Jose Official Claim Ticket</h2>
                    <span class="text-xs text-slate-500">Document Processing Voucher</span>
                    <div class="font-mono text-xl font-bold text-brand-700 mt-1">${item.code}</div>
                </div>
                <div class="space-y-1.5 text-xs">
                    <div><b>Document Type:</b> ${item.docType}</div>
                    <div><b>Applicant Full Name:</b> ${item.applicant}</div>
                    <div><b>Purpose:</b> ${item.purpose || 'Official Use'}</div>
                    <div><b>Fee Status:</b> ${item.fee || '₱50.00'}</div>
                    <div><b>Date Requested:</b> ${item.date || 'Today'}</div>
                </div>
                <div class="mt-4 pt-3 border-t text-center text-xs font-bold text-amber-900 bg-amber-50 p-2 rounded">
                    Ready for Pickup tomorrow @ 9:00 AM (Desk 2)
                </div>
            </div>
        `;
        window.print();
    }
};

// ------------------------------------------
// 4. ANNOUNCEMENT & EVENT CREATOR
// ------------------------------------------
window.handleCreateAnnouncement = function(e) {
    e.preventDefault();
    const newAnn = {
        id: `ANN-${Date.now()}`,
        time: document.getElementById('annTime').value,
        title: document.getElementById('annTitle').value,
        location: document.getElementById('annLocation').value,
        details: document.getElementById('annDetails').value
    };

    const list = JSON.parse(localStorage.getItem('brgy_announcements') || '[]');
    list.unshift(newAnn);
    localStorage.setItem('brgy_announcements', JSON.stringify(list));

    alert('📢 Announcement Published! It is now live on the Resident Portal.');
    e.target.reset();
    refreshAdminData();
};

window.handleCreateEvent = function(e) {
    e.preventDefault();
    const newEvt = {
        id: `EVT-${Date.now()}`,
        date: document.getElementById('evtDate').value,
        title: document.getElementById('evtTitle').value,
        location: document.getElementById('evtLocation').value
    };

    const list = JSON.parse(localStorage.getItem('brgy_events') || '[]');
    list.unshift(newEvt);
    localStorage.setItem('brgy_events', JSON.stringify(list));

    alert('📅 Community Event Added! It will appear on the Resident Calendar.');
    e.target.reset();
    refreshAdminData();
};

// ------------------------------------------
// 5. STATS & BADGE COUNTERS
// ------------------------------------------
function updateAdminStats() {
    const reports = JSON.parse(localStorage.getItem('brgy_reports') || '[]');
    const docs = JSON.parse(localStorage.getItem('brgy_form_requests') || '[]');
    const appointments = JSON.parse(localStorage.getItem('brgy_appointments') || '[]');
    const announcements = JSON.parse(localStorage.getItem('brgy_announcements') || '[]');

    const totalRepEl = document.getElementById('statTotalReports');
    const pendRepEl = document.getElementById('statPendingReports');
    const docReqEl = document.getElementById('statDocRequests');
    const apptEl = document.getElementById('statAppointments');
    const annEl = document.getElementById('statAnnouncements');

    if (totalRepEl) totalRepEl.innerText = reports.length;
    if (pendRepEl) pendRepEl.innerText = reports.filter(r => r.status === 'Submitted' || r.status === 'Dispatched').length;
    if (docReqEl) docReqEl.innerText = docs.length;
    if (apptEl) apptEl.innerText = appointments.length;
    if (annEl) annEl.innerText = announcements.length;

    const badge = document.getElementById('badgeAppointmentCount');
    if (badge) {
        if (appointments.length > 0) {
            badge.innerText = appointments.length;
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    }
}