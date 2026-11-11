// ==========================================
// 1. DATA SEEDS & WEEKLY ROSTER MATRIX
// ==========================================
const WEEKLY_ROSTER_DATA = [
    { day: 'Monday', date: 'Nov 09, 2026', shift: 'Morning Shift (08:00 AM - 04:00 PM)', officials: 'Kagawad Juan Dela Cruz (Duty Desk Lead), Kagawad Elena Roxas (Peace & Order)', station: 'Main Desk Hall A' },
    { day: 'Monday', date: 'Nov 09, 2026', shift: 'Evening Shift (04:00 PM - 12:00 AM)', officials: 'Kagawad Roberto Tan (Night Supervisor), Tanod Mario Gomez (Patrol Lead)', station: 'Main Desk Hall A' },
    { day: 'Monday', date: 'Nov 09, 2026', shift: 'Graveyard Shift (12:00 AM - 08:00 AM)', officials: 'Kagawad Antonio Santos (Overnight Officer), Tanod Carlos Reyes (Surveillance)', station: 'Night Counter' },
    { day: 'Tuesday', date: 'Nov 10, 2026', shift: 'Morning Shift (08:00 AM - 04:00 PM)', officials: 'Kagawad Maria Santos (Desk Lead), Kagawad Pedro Penduko (Welfare Officer)', station: 'Main Desk Hall A' },
    { day: 'Tuesday', date: 'Nov 10, 2026', shift: 'Evening Shift (04:00 PM - 12:00 AM)', officials: 'Kagawad Roberto Tan (Night Supervisor), Tanod Mario Gomez (Patrol Lead)', station: 'Main Desk Hall A' },
    { day: 'Tuesday', date: 'Nov 10, 2026', shift: 'Graveyard Shift (12:00 AM - 08:00 AM)', officials: 'Kagawad Antonio Santos (Overnight Officer), Tanod Carlos Reyes (Surveillance)', station: 'Night Counter' },
    { day: 'Wednesday', date: 'Nov 11, 2026', shift: 'Morning Shift (08:00 AM - 04:00 PM)', officials: 'Kagawad Juan Dela Cruz (Duty Desk Lead), Kagawad Antonio Santos (Assistance Lead)', station: 'Main Desk Hall A' },
    { day: 'Wednesday', date: 'Nov 11, 2026', shift: 'Evening Shift (04:00 PM - 12:00 AM)', officials: 'Kagawad Elena Roxas (Peace & Order), Tanod Carlos Reyes (Patrol Lead)', station: 'Main Desk Hall A' },
    { day: 'Wednesday', date: 'Nov 11, 2026', shift: 'Graveyard Shift (12:00 AM - 08:00 AM)', officials: 'Kagawad Maria Santos (Overnight Officer), Tanod Mario Gomez (Surveillance)', station: 'Night Counter' },
    { day: 'Thursday', date: 'Nov 12, 2026', shift: 'Morning Shift (08:00 AM - 04:00 PM)', officials: 'Kagawad Roberto Tan (Duty Desk Lead), Kagawad Maria Santos (Welfare Officer)', station: 'Main Desk Hall A' },
    { day: 'Thursday', date: 'Nov 12, 2026', shift: 'Evening Shift (04:00 PM - 12:00 AM)', officials: 'Kagawad Pedro Penduko (Night Supervisor), Tanod Mario Gomez (Patrol Lead)', station: 'Main Desk Hall A' },
    { day: 'Thursday', date: 'Nov 12, 2026', shift: 'Graveyard Shift (12:00 AM - 08:00 AM)', officials: 'Kagawad Juan Dela Cruz (Overnight Officer), Tanod Carlos Reyes (Surveillance)', station: 'Night Counter' },
    { day: 'Friday', date: 'Nov 13, 2026', shift: 'Morning Shift (08:00 AM - 04:00 PM)', officials: 'Kagawad Antonio Santos (Duty Desk Lead), Kagawad Elena Roxas (Peace & Order)', station: 'Main Desk Hall A' },
    { day: 'Friday', date: 'Nov 13, 2026', shift: 'Evening Shift (04:00 PM - 12:00 AM)', officials: 'Kagawad Juan Dela Cruz (Night Supervisor), Tanod Carlos Reyes (Patrol Lead)', station: 'Main Desk Hall A' },
    { day: 'Friday', date: 'Nov 13, 2026', shift: 'Graveyard Shift (12:00 AM - 08:00 AM)', officials: 'Kagawad Maria Santos (Overnight Officer), Tanod Mario Gomez (Surveillance)', station: 'Night Counter' },
    { day: 'Saturday', date: 'Nov 14, 2026', shift: 'Weekend Day Duty (08:00 AM - 04:00 PM)', officials: 'Kagawad Roberto Tan (Desk Lead), Kagawad Maria Santos (Records Lead)', station: 'Desk 2 Lobby' },
    { day: 'Saturday', date: 'Nov 14, 2026', shift: 'Weekend Night Duty (04:00 PM - 12:00 AM)', officials: 'Kagawad Pedro Penduko (Night Duty), Tanod Mario Gomez (Patrol Lead)', station: 'Desk 2 Lobby' },
    { day: 'Saturday', date: 'Nov 14, 2026', shift: 'Weekend Graveyard (12:00 AM - 08:00 AM)', officials: 'Kagawad Antonio Santos (Overnight), Tanod Carlos Reyes (Surveillance)', station: 'Night Counter' },
    { day: 'Sunday', date: 'Nov 15, 2026', shift: 'Weekend Day Duty (08:00 AM - 04:00 PM)', officials: 'Kagawad Antonio Santos (Desk Lead), Tanod Mario Gomez (Patrol Lead)', station: 'Desk 2 Lobby' },
    { day: 'Sunday', date: 'Nov 15, 2026', shift: 'Weekend Night Duty (04:00 PM - 12:00 AM)', officials: 'Kagawad Elena Roxas (Night Duty), Tanod Carlos Reyes (Patrol Lead)', station: 'Desk 2 Lobby' },
    { day: 'Sunday', date: 'Nov 15, 2026', shift: 'Weekend Graveyard (12:00 AM - 08:00 AM)', officials: 'Kagawad Roberto Tan (Overnight), Tanod Mario Gomez (Surveillance)', station: 'Night Counter' }
];

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

const DUTY_SHIFTS = [
    { id: 'morning', name: 'Morning Shift', timeRange: '08:00 AM - 04:00 PM', officials: [{ name: 'Kagawad Juan Dela Cruz', role: 'Duty Desk Lead', phone: '09178880011', station: 'Main Desk Hall A' }, { name: 'Kagawad Elena Roxas', role: 'Peace & Order Duty', phone: '09187770022', station: 'Barangay Outpost 1' }] },
    { id: 'afternoon', name: 'Evening Shift', timeRange: '04:00 PM - 12:00 AM', officials: [{ name: 'Kagawad Roberto Tan', role: 'Night Supervisor', phone: '09205550033', station: 'Main Desk Hall A' }, { name: 'Tanod Mario Gomez', role: 'Patrol Lead', phone: '09994440044', station: 'Mobile Unit' }] },
    { id: 'graveyard', name: 'Graveyard Shift', timeRange: '12:00 AM - 08:00 AM', officials: [{ name: 'Kagawad Antonio Santos', role: 'Overnight Officer', phone: '09173330055', station: 'Main Desk Hall A' }, { name: 'Tanod Carlos Reyes', role: 'Surveillance Officer', phone: '09182220066', station: 'CCTV Monitoring' }] }
];


// ==========================================
// 2. LOCAL STORAGE SEED INITIALIZATION
// ==========================================
function initLocalStorage() {
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
}


// ==========================================
// 3. APPOINTMENT MODAL CONTROLLERS & LOGIC
// ==========================================
window.openAppointmentModal = function() {
    const modal = document.getElementById('appointmentModal');
    if (modal) {
        modal.classList.remove('hidden');
        const dateInput = document.getElementById('apptDate');
        if (dateInput && !dateInput.value) {
            dateInput.value = new Date().toISOString().split('T')[0];
        }
        updateModalOfficials();
    }
};

window.closeAppointmentModal = function() {
    const modal = document.getElementById('appointmentModal');
    if (modal) {
        modal.classList.add('hidden');
        resetAppointmentForm();
    }
};

window.openWeeklyRosterModal = function() {
    const modal = document.getElementById('weeklyRosterModal');
    if (modal) {
        modal.classList.remove('hidden');
        renderWeeklyMatrix();
    }
};

window.closeWeeklyRosterModal = function() {
    const modal = document.getElementById('weeklyRosterModal');
    if (modal) modal.classList.add('hidden');
};

window.closeReportSuccessModal = function() {
    const modal = document.getElementById('reportSuccessModal');
    if (modal) modal.classList.add('hidden');
};

function updateModalOfficials() {
    const dateVal = document.getElementById('apptDate').value;
    const officialSelect = document.getElementById('apptOfficial');
    if (!officialSelect) return;

    let defaultOfficials = [
        'Kagawad Juan Dela Cruz — Duty Desk Lead',
        'Kagawad Elena Roxas — Peace & Order',
        'Kagawad Roberto Tan — Night Supervisor',
        'Tanod Mario Gomez — Patrol Lead'
    ];

    let options = defaultOfficials;

    if (typeof WEEKLY_ROSTER_DATA !== 'undefined' && WEEKLY_ROSTER_DATA.length > 0 && dateVal) {
        const match = WEEKLY_ROSTER_DATA.filter(r => {
            try {
                return new Date(r.date).toDateString() === new Date(dateVal).toDateString();
            } catch(e) { return false; }
        });
        if (match.length > 0) {
            let extracted = [];
            match.forEach(m => {
                m.officials.split(',').forEach(off => {
                    let clean = off.trim().replace(/\(On-Duty\)/gi, '').trim();
                    clean = clean.replace(/\(([^)]+)\)/g, '— $1');
                    if (clean && !extracted.includes(clean)) extracted.push(clean);
                });
            });
            if (extracted.length > 0) options = extracted;
        }
    }

    officialSelect.innerHTML = '<option value="">Select On-Duty Official...</option>' + 
        options.map(o => `<option value="${o}">${o}</option>`).join('');
}

function handleAppointmentSubmit(e) {
    e.preventDefault();
    const code = `APPT-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    const name = document.getElementById('apptName').value;
    const phone = document.getElementById('apptPhone').value;
    const service = document.getElementById('apptService').value;
    const official = document.getElementById('apptOfficial').value;
    const date = document.getElementById('apptDate').value;
    const time = document.getElementById('appTimeSlot').value;
    const notes = document.getElementById('apptNotes') ? document.getElementById('apptNotes').value : '';

    const ticket = document.getElementById('appointmentTicket');
    const form = document.getElementById('appointmentForm');

    if (form) form.classList.add('hidden');

    if (ticket) {
        ticket.classList.remove('hidden');
        ticket.innerHTML = `
            <div class="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-2xl p-6 text-white shadow-xl space-y-4">
                <div class="flex items-center justify-between border-b border-white/20 pb-3">
                    <div class="flex items-center gap-2.5">
                        <div class="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white text-base">
                            <i class="fa-solid fa-circle-check"></i>
                        </div>
                        <div>
                            <h4 class="font-extrabold text-sm text-white leading-tight">Appointment Confirmed!</h4>
                            <p class="text-[11px] text-emerald-100 font-medium">Barangay San Jose Consultation Pass</p>
                        </div>
                    </div>
                    <span class="font-mono font-bold bg-white/20 text-white px-2.5 py-1 rounded-lg text-xs tracking-wide">${code}</span>
                </div>

                <div class="grid grid-cols-2 gap-3 text-xs text-emerald-50">
                    <div class="bg-white/10 rounded-xl p-3">
                        <span class="text-[10px] uppercase font-bold text-emerald-200 block mb-0.5">Resident</span>
                        <strong class="text-white text-xs block">${name}</strong>
                        <span class="text-[11px] text-emerald-200">${phone}</span>
                    </div>
                    <div class="bg-white/10 rounded-xl p-3">
                        <span class="text-[10px] uppercase font-bold text-emerald-200 block mb-0.5">Assigned Official</span>
                        <strong class="text-white text-xs block">${official}</strong>
                    </div>
                    <div class="bg-white/10 rounded-xl p-3">
                        <span class="text-[10px] uppercase font-bold text-emerald-200 block mb-0.5">Service</span>
                        <span class="font-medium text-white">${service}</span>
                    </div>
                    <div class="bg-white/10 rounded-xl p-3">
                        <span class="text-[10px] uppercase font-bold text-emerald-200 block mb-0.5">Schedule</span>
                        <span class="font-medium text-white">${date} @ ${time}</span>
                    </div>
                </div>

                ${notes ? `<div class="bg-white/10 rounded-xl p-3 text-xs text-emerald-100"><b>Purpose:</b> "${notes}"</div>` : ''}

                <div class="pt-2 flex items-center justify-between text-xs text-emerald-100 border-t border-white/20">
                    <span class="font-medium"><i class="fa-solid fa-location-dot mr-1"></i> Desk 2 Hall A</span>
                    <button type="button" onclick="closeAppointmentModal()" class="bg-white hover:bg-emerald-50 text-emerald-900 font-bold px-4 py-2 rounded-xl transition-colors shadow-sm cursor-pointer">
                        Done & Close
                    </button>
                </div>
            </div>
        `;
    }
}

window.resetAppointmentForm = function() {
    const form = document.getElementById('appointmentForm');
    const ticket = document.getElementById('appointmentTicket');
    if (form) {
        form.reset();
        form.classList.remove('hidden');
    }
    if (ticket) {
        ticket.classList.add('hidden');
        ticket.innerHTML = '';
    }
};


// ==========================================
// 4. REAL-TIME CLOCK & ACTIVE DUTY MONITOR
// ==========================================
function initClockAndShift() {
    const updateTime = () => {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const dateStr = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
        const timeEl = document.getElementById('currentTimeStr');
        if (timeEl) timeEl.innerText = `${dateStr} • ${timeStr}`;

        const currentHour = now.getHours();
        let activeShift = DUTY_SHIFTS[0];
        if (currentHour >= 16 && currentHour < 24) activeShift = DUTY_SHIFTS[1];
        if (currentHour >= 0 && currentHour < 8) activeShift = DUTY_SHIFTS[2];

        const cardsContainer = document.getElementById('currentDutyCards');
        if (cardsContainer) {
            cardsContainer.innerHTML = activeShift.officials.map(o => `
                <div class="bg-slate-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
                    <div>
                        <span class="text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">Active Duty</span>
                        <h4 class="font-bold text-slate-900 text-sm mt-1">${o.name}</h4>
                        <p class="text-xs text-slate-500">${o.role} • ${o.station}</p>
                    </div>
                    <a href="tel:${o.phone}" class="bg-emerald-600 hover:bg-emerald-700 text-white w-9 h-9 rounded-full flex items-center justify-center text-sm shadow">
                        <i class="fa-solid fa-phone"></i>
                    </a>
                </div>
            `).join('');
        }
    };
    updateTime();
    setInterval(updateTime, 1000);
}

function renderWeeklyMatrix() {
    const tbody = document.getElementById('weeklyScheduleBody');
    if (!tbody) return;
    tbody.innerHTML = WEEKLY_ROSTER_DATA.map(r => `
        <tr class="hover:bg-slate-50 border-b border-slate-100">
            <td class="py-3 px-4 font-bold text-slate-900">${r.day}<br><span class="text-xs font-normal text-slate-500">${r.date}</span></td>
            <td class="py-3 px-4 font-medium text-brand-700">${r.shift.split('(')[0]}</td>
            <td class="py-3 px-4 text-xs font-mono">${r.shift.includes('(') ? r.shift.split('(')[1].replace(')', '') : ''}</td>
            <td class="py-3 px-4 text-xs">${r.officials}</td>
            <td class="py-3 px-4 text-xs font-medium text-slate-600">${r.station}</td>
        </tr>
    `).join('');
}


// ==========================================
// 5. INCIDENT & HAZARD REPORTING
// ==========================================
function handleReportSubmit(e) {
    e.preventDefault();
    const trackingID = `BRGY-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReport = {
        id: trackingID,
        reporter: document.getElementById('reporterName') ? document.getElementById('reporterName').value : 'Anonymous Resident',
        category: document.getElementById('reportCategory') ? document.getElementById('reportCategory').value : 'General Complaint',
        location: document.getElementById('reportLocation') ? document.getElementById('reportLocation').value : 'San Jose Area',
        description: document.getElementById('reportDescription') ? document.getElementById('reportDescription').value : 'No additional notes',
        status: 'Submitted',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    
    const reports = JSON.parse(localStorage.getItem('brgy_reports') || '[]');
    reports.unshift(newReport);
    localStorage.setItem('brgy_reports', JSON.stringify(reports));

    if (document.getElementById('reportForm')) document.getElementById('reportForm').reset();
    
    const modal = document.getElementById('reportSuccessModal');
    const idEl = document.getElementById('modalReportID');
    if (idEl) idEl.innerText = trackingID;
    if (modal) modal.classList.remove('hidden');

    quickTrack(trackingID);
}

function quickTrack(id) {
    const reports = JSON.parse(localStorage.getItem('brgy_reports') || '[]');
    const found = reports.find(r => r.id === id);
    const container = document.getElementById('trackingResult');
    if (!container) return;

    if (!found) {
        container.innerHTML = `<p class="text-rose-400 text-xs text-center py-6">ID Not Found: ${id}</p>`;
        return;
    }

    let statusBg = 'bg-amber-700';
    if (found.status === 'Dispatched') statusBg = 'bg-blue-600';
    if (found.status === 'Resolved') statusBg = 'bg-emerald-600';

    container.innerHTML = `
        <div class="space-y-2 text-xs">
            <div class="flex justify-between items-center font-bold text-white">
                <span class="text-brand-400">${found.id}</span>
                <span class="${statusBg} text-white px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase">${found.status}</span>
            </div>
            <p class="text-slate-300"><b>Category:</b> ${found.category} (${found.location})</p>
            <p class="text-slate-400 italic">"${found.description}"</p>
            <p class="text-[10px] text-slate-500">Filed on: ${found.date || 'Recent'}</p>
        </div>
    `;
}

function trackComplaint() {
    const val = document.getElementById('trackInput').value.trim().toUpperCase();
    if (val) quickTrack(val);
}


// ==========================================
// 6. FORM REQUESTS & PRINT TICKET
// ==========================================
function updateFormFeeNotice() {
    const type = document.getElementById('formType').value;
    const badge = document.getElementById('feeBadge');
    if (!badge) return;
    if (type.includes('Indigency') || type.includes('Job Seeker')) {
        badge.innerText = 'FREE (RA 11261)';
    } else {
        badge.innerText = '₱50.00';
    }
}

function handleFormDraftSubmit(e) {
    e.preventDefault();
    const code = `CLAIM-${Math.floor(100000 + Math.random() * 900000)}`;
    const docType = document.getElementById('formType').value;
    const applicant = document.getElementById('applicantName').value;
    const purpose = document.getElementById('applicantPurpose') ? document.getElementById('applicantPurpose').value : 'Official Document Request';
    const fee = (docType.includes('Indigency') || docType.includes('Job Seeker')) ? 'FREE (RA 11261)' : '₱50.00';
    
    const newRequest = {
        code: code,
        docType: docType,
        applicant: applicant,
        purpose: purpose,
        status: 'Submitted / Pending Review',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        fee: fee
    };

    const requests = JSON.parse(localStorage.getItem('brgy_form_requests') || '[]');
    requests.unshift(newRequest);
    localStorage.setItem('brgy_form_requests', JSON.stringify(requests));

    const container = document.getElementById('claimSlipContainer');
    if (container) {
        container.innerHTML = `
            <div id="printableTicket" class="bg-white border-2 border-dashed border-brand-300 rounded-xl p-4 text-xs space-y-2 text-slate-800">
                <div class="text-center border-b pb-2">
                    <span class="text-[10px] uppercase font-bold text-slate-400 block">Barangay San Jose Official Claim Ticket</span>
                    <strong class="font-mono text-brand-700 text-base">${code}</strong>
                </div>
                <div><b>Document Type:</b> ${docType}</div>
                <div><b>Applicant Name:</b> ${applicant}</div>
                <div><b>Purpose:</b> ${purpose}</div>
                <div><b>Fee Status:</b> <span class="font-bold text-emerald-700">${fee}</span></div>
                <div class="bg-amber-50 p-2.5 rounded text-center text-amber-900 font-bold mt-3">
                    <i class="fa-solid fa-clock mr-1"></i> Pickup Tomorrow @ 9:00 AM (Desk 2)
                </div>
            </div>
        `;
    }
    const btn = document.getElementById('printBtn');
    if (btn) {
        btn.disabled = false;
        btn.className = "text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white flex items-center justify-center gap-2 w-full py-2.5 rounded-lg shadow cursor-pointer";
    }
}

function printClaimSlip() {
    window.print();
}


// ==========================================
// 7. EVENTS & TIMELINE RENDERERS
// ==========================================
function renderTodaySchedule() {
    const list = document.getElementById('todayScheduleList');
    if (!list) return;
    const announcements = JSON.parse(localStorage.getItem('brgy_announcements') || JSON.stringify(DEFAULT_ANNOUNCEMENTS));
    
    list.innerHTML = announcements.map(item => `
        <div class="relative">
            <div class="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full bg-brand-600 border-2 border-white"></div>
            <div class="bg-slate-50 p-3 rounded-xl border border-slate-100 shadow-sm">
                <span class="text-xs font-bold text-brand-700">${item.time}</span>
                <h4 class="font-bold text-slate-900 text-sm mt-0.5">${item.title}</h4>
                <p class="text-xs text-slate-600">${item.details} (${item.location})</p>
            </div>
        </div>
    `).join('');
}

function renderCalendar() {
    const grid = document.getElementById('calendarEventsGrid');
    if (!grid) return;
    const events = JSON.parse(localStorage.getItem('brgy_events') || JSON.stringify(DEFAULT_EVENTS));
    
    grid.innerHTML = events.map(ev => `
        <div class="border border-slate-200 rounded-xl p-4 bg-white shadow-sm">
            <span class="text-xs font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">${ev.date}</span>
            <h4 class="font-bold text-slate-900 text-sm mt-2">${ev.title}</h4>
            <p class="text-xs text-slate-500 mt-1"><i class="fa-solid fa-map-pin mr-1"></i> ${ev.location}</p>
        </div>
    `).join('');
}

function initDates() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const opt = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    const tEl = document.getElementById('todayDateNotice');
    const tmEl = document.getElementById('tomorrowDateNotice');
    const tsEl = document.getElementById('todayShortDate');
    if (tEl) tEl.innerText = today.toLocaleDateString('en-US', opt);
    if (tmEl) tmEl.innerText = tomorrow.toLocaleDateString('en-US', opt);
    if (tsEl) tsEl.innerText = today.toLocaleDateString('en-US', opt);
}