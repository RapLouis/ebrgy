// DUTY SHIFTS & WEEKLY SCHEDULE DATABASE (MONDAY - SUNDAY)
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

const TODAY_ANNOUNCEMENTS = [
    { time: '08:00 AM - 11:00 AM', title: 'Barangay Clean-Up & Drainage Clearing Drive', location: 'Purok 1 to 4', details: 'Residents and Tanods mobilization.' },
    { time: '01:00 PM - 03:30 PM', title: 'Free Anti-Rabies Vaccination for Pets', location: 'Barangay Covered Court', details: 'City Vet Office mobile drive.' },
    { time: '04:00 PM - 06:00 PM', title: 'Lupong Tagapapayapa Mediation Hearing', location: 'Session Hall A', details: 'Scheduled land boundary disputes.' }
];

const UPCOMING_EVENTS = [
    { date: 'Nov 12, 2026', title: 'Barangay Youth Basketball & Volleyball League', location: 'Main Covered Court' },
    { date: 'Nov 15, 2026', title: 'Quarterly General Barangay Assembly', location: 'Multipurpose Hall & Online' },
    { date: 'Nov 18, 2026', title: 'Free Maternal & Pediatric Health Checkup', location: 'Barangay Health Center' },
    { date: 'Nov 22, 2026', title: 'Sangguniang Kabataan (SK) Leadership Seminar', location: 'Session Hall B' }
];

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

// MODAL CONTROLLERS
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
}

window.closeAppointmentModal = function() {
    const modal = document.getElementById('appointmentModal');
    if (modal) modal.classList.add('hidden');
}

function updateModalOfficials() {
    const dateVal = document.getElementById('apptDate').value;
    const officialSelect = document.getElementById('apptOfficial');
    if (!officialSelect) return;

    let officialsList = ['Kagawad Juan Dela Cruz (Duty Desk Lead)', 'Kagawad Elena Roxas (Peace & Order)', 'Kagawad Roberto Tan (Night Supervisor)', 'Tanod Mario Gomez (Patrol Lead)'];
    
    if (WEEKLY_ROSTER_DATA.length > 0 && dateVal) {
        const match = WEEKLY_ROSTER_DATA.filter(r => {
            try {
                return new Date(r.date).toDateString() === new Date(dateVal).toDateString();
            } catch(e) { return false; }
        });
        if (match.length > 0) {
            officialsList = [];
            match.forEach(m => {
                m.officials.split(',').forEach(off => {
                    const cleanOff = off.trim();
                    if (cleanOff && !officialsList.includes(cleanOff)) officialsList.push(cleanOff);
                });
            });
        }
    }

    officialSelect.innerHTML = '<option value="">Select On-Duty Official...</option>' + officialsList.map(o => `<option value="${o}">${o} (On-Duty)</option>`).join('');
}

function handleAppointmentSubmit(e) {
    e.preventDefault();
    const code = `APPT-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    const name = document.getElementById('apptName').value;
    const service = document.getElementById('apptService').value;
    const official = document.getElementById('apptOfficial').value;
    const date = document.getElementById('apptDate').value;
    const time = document.getElementById('appTimeSlot').value;

    const ticket = document.getElementById('appointmentTicket');
    if (ticket) {
        ticket.classList.remove('hidden');
        ticket.innerHTML = `
            <div class="flex items-center justify-between border-b border-emerald-300 pb-2 mb-2">
                <div class="flex items-center gap-1.5 font-bold text-emerald-900">
                    <i class="fa-solid fa-circle-check text-emerald-600"></i> Appointment Confirmed!
                </div>
                <span class="font-mono font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded text-[11px]">${code}</span>
            </div>
            <div class="grid grid-cols-2 gap-2 text-slate-700 text-xs">
                <div><b>Resident:</b> ${name}</div>
                <div><b>Service:</b> ${service}</div>
                <div><b>Official:</b> <span class="text-brand-800 font-bold">${official}</span></div>
                <div><b>Schedule:</b> ${date} @ ${time}</div>
            </div>
            <div class="mt-2 text-slate-500 text-[11px] text-center border-t border-emerald-200 pt-1">
                Please present code ${code} at Desk 2.
            </div>
        `;
    }
}

// STANDARD CLOCK & DUTY SHIFT RENDERER
const DUTY_SHIFTS = [
    { id: 'morning', name: 'Morning Shift', timeRange: '08:00 AM - 04:00 PM', officials: [{ name: 'Kagawad Juan Dela Cruz', role: 'Duty Desk Lead', phone: '09178880011', station: 'Main Desk Hall A' }, { name: 'Kagawad Elena Roxas', role: 'Peace & Order Duty', phone: '09187770022', station: 'Barangay Outpost 1' }] },
    { id: 'afternoon', name: 'Evening Shift', timeRange: '04:00 PM - 12:00 AM', officials: [{ name: 'Kagawad Roberto Tan', role: 'Night Supervisor', phone: '09205550033', station: 'Main Desk Hall A' }, { name: 'Tanod Mario Gomez', role: 'Patrol Lead', phone: '09994440044', station: 'Mobile Unit' }] },
    { id: 'graveyard', name: 'Graveyard Shift', timeRange: '12:00 AM - 08:00 AM', officials: [{ name: 'Kagawad Antonio Santos', role: 'Overnight Officer', phone: '09173330055', station: 'Main Desk Hall A' }, { name: 'Tanod Carlos Reyes', role: 'Surveillance Officer', phone: '09182220066', station: 'CCTV Monitoring' }] }
];

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
                <div class="bg-slate-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between">
                    <div>
                        <span class="text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">Active Duty</span>
                        <h4 class="font-bold text-slate-900 text-sm mt-1">${o.name}</h4>
                        <p class="text-xs text-slate-500">${o.role} • ${o.station}</p>
                    </div>
                    <a href="tel:${o.phone}" class="bg-emerald-600 text-white w-9 h-9 rounded-full flex items-center justify-center text-sm shadow">
                        <i class="fa-solid fa-phone"></i>
                    </a>
                </div>
            `).join('');
        }
    };
    updateTime();
    setInterval(updateTime, 1000);
}

function initLocalStorage() {
    if (!localStorage.getItem('brgy_reports')) {
        localStorage.setItem('brgy_reports', JSON.stringify([{ id: 'BRGY-2026-1001', category: 'Electrical & Power Lines', location: 'Purok 3', status: 'Dispatched' }]));
    }
}

function handleReportSubmit(e) {
    e.preventDefault();
    const id = `BRGY-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    alert(`✅ Report Submitted! Tracking ID: ${id}`);
    document.getElementById('reportForm').reset();
}

function quickTrack(id) {
    const res = document.getElementById('trackingResult');
    if (res) res.innerHTML = `<div class="text-xs text-slate-200"><b>ID:</b> ${id}<br><b>Status:</b> Dispatched & Being Handled</div>`;
}

function trackComplaint() {
    const val = document.getElementById('trackInput').value.trim();
    if (val) quickTrack(val);
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

function updateFormFeeNotice() {
    const type = document.getElementById('formType').value;
    const badge = document.getElementById('feeBadge');
    if (!badge) return;
    if (type.includes('Indigency') || type.includes('Job Seeker')) badge.innerText = 'FREE (RA 11261)';
    else badge.innerText = '₱50.00';
}

function handleFormDraftSubmit(e) {
    e.preventDefault();
    const code = `CLAIM-${Math.floor(100000 + Math.random() * 900000)}`;
    const container = document.getElementById('claimSlipContainer');
    if (container) {
        container.innerHTML = `
            <div class="bg-white border-2 border-dashed border-brand-300 rounded-xl p-4 text-xs space-y-2 text-slate-800">
                <div class="text-center border-b pb-2">
                    <span class="text-[10px] uppercase font-bold text-slate-400 block">Barangay San Jose Official Claim Ticket</span>
                    <strong class="font-mono text-brand-700 text-base">${code}</strong>
                </div>
                <div><b>Document Type:</b> ${document.getElementById('formType').value}</div>
                <div><b>Applicant Name:</b> ${document.getElementById('applicantName').value}</div>
                <div><b>Purpose:</b> ${document.getElementById('applicantPurpose').value}</div>
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

function renderTodaySchedule() {
    const list = document.getElementById('todayScheduleList');
    if (!list) return;
    list.innerHTML = TODAY_ANNOUNCEMENTS.map(item => `
        <div class="relative">
            <div class="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full bg-brand-600 border-2 border-white"></div>
            <div class="bg-slate-50 p-3 rounded-xl border border-slate-100">
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
    grid.innerHTML = UPCOMING_EVENTS.map(ev => `
        <div class="border border-slate-200 rounded-xl p-4 bg-white shadow-sm">
            <span class="text-xs font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">${ev.date}</span>
            <h4 class="font-bold text-slate-900 text-sm mt-2">${ev.title}</h4>
            <p class="text-xs text-slate-500 mt-1"><i class="fa-solid fa-map-pin mr-1"></i> ${ev.location}</p>
        </div>
    `).join('');
}