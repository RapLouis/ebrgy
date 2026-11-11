// ==========================================
// 1. OFFICIALS POOL & RANDOMIZED WEEKLY ROSTER
// ==========================================
const OFFICIALS_POOL = [
    { name: 'Kagawad Juan Dela Cruz', role: 'Duty Desk Lead' },
    { name: 'Kagawad Elena Roxas', role: 'Peace & Order Lead' },
    { name: 'Kagawad Roberto Tan', role: 'Night Supervisor' },
    { name: 'Kagawad Antonio Santos', role: 'Overnight Officer' },
    { name: 'Kagawad Maria Santos', role: 'Welfare Lead' },
    { name: 'Kagawad Pedro Penduko', role: 'Public Safety Lead' },
    { name: 'Tanod Mario Gomez', role: 'Patrol Lead' },
    { name: 'Tanod Carlos Reyes', role: 'Surveillance Lead' }
];

const DAYS_LIST = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const SHIFTS_LIST = [
    { name: 'Morning Shift', time: '08:00 AM - 04:00 PM', station: 'Main Desk Hall A' },
    { name: 'Evening Shift', time: '04:00 PM - 12:00 AM', station: 'Main Desk Hall A' }
];

function generateRandomizedWeeklyRoster() {
    const roster = [];
    const baseDate = new Date();
    const currentDay = baseDate.getDay();
    const dayOffset = currentDay === 0 ? -6 : 1 - currentDay; // Shift to Monday

    DAYS_LIST.forEach((dayName, idx) => {
        const currentDate = new Date(baseDate);
        currentDate.setDate(baseDate.getDate() + dayOffset + idx);
        const dateStr = currentDate.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

        SHIFTS_LIST.forEach(shift => {
            const count = Math.floor(Math.random() * 2) + 1; // 1 or 2 officials (Max 2)
            const shuffled = [...OFFICIALS_POOL].sort(() => 0.5 - Math.random());
            const selected = shuffled.slice(0, count);
            const officialsStr = selected.map(o => `${o.name} (${o.role})`).join(', ');

            roster.push({
                day: dayName,
                date: dateStr,
                shift: `${shift.name} (${shift.time})`,
                officials: officialsStr,
                officialList: selected,
                station: shift.station
            });
        });
    });
    return roster;
}

// Get or seed persistent weekly schedule with strict validation fallback
function getWeeklyRoster() {
    let saved = localStorage.getItem('brgy_weekly_roster');
    if (!saved) {
        const newRoster = generateRandomizedWeeklyRoster();
        localStorage.setItem('brgy_weekly_roster', JSON.stringify(newRoster));
        return newRoster;
    }
    try {
        const parsed = JSON.parse(saved);
        if (!Array.isArray(parsed) || parsed.length !== 14 || parsed.some(r => r.shift.includes('Graveyard'))) {
            const newRoster = generateRandomizedWeeklyRoster();
            localStorage.setItem('brgy_weekly_roster', JSON.stringify(newRoster));
            return newRoster;
        }
        return parsed;
    } catch(e) {
        const newRoster = generateRandomizedWeeklyRoster();
        localStorage.setItem('brgy_weekly_roster', JSON.stringify(newRoster));
        return newRoster;
    }
}

const WEEKLY_ROSTER_DATA = getWeeklyRoster();

function getTomorrowDateString() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

// ==========================================
// 2. MATRIX RENDERER & MODAL CONTROLLERS
// ==========================================
function renderWeeklyMatrix() {
    const roster = getWeeklyRoster();
    const htmlRows = roster.map(r => `
        <tr class="hover:bg-slate-50 border-b border-slate-100">
            <td class="py-3.5 px-4 font-bold text-slate-900">${r.day}<br><span class="text-xs font-normal text-slate-500">${r.date}</span></td>
            <td class="py-3.5 px-4 font-medium text-brand-700">${r.shift.split('(')[0]}</td>
            <td class="py-3.5 px-4 text-xs font-mono">${r.shift.includes('(') ? r.shift.split('(')[1].replace(')', '') : ''}</td>
            <td class="py-3.5 px-4 text-xs font-medium text-slate-800">${r.officials}</td>
            <td class="py-3.5 px-4 text-xs font-medium text-slate-600">${r.station}</td>
        </tr>
    `).join('');

    const tbodies = document.querySelectorAll('#weeklyScheduleBody, #weeklyScheduleBodyModal');
    tbodies.forEach(tb => { tb.innerHTML = htmlRows; });
}

function openAppointmentModal() {
    const modal = document.getElementById('appointmentModal');
    if (modal) {
        modal.classList.remove('hidden');
        const dateInput = document.getElementById('apptDate');
        if (dateInput) {
            const minTomorrow = getTomorrowDateString();
            dateInput.min = minTomorrow;
            if (!dateInput.value || dateInput.value < minTomorrow) {
                dateInput.value = minTomorrow;
            }
        }
        updateModalOfficials();
    }
}

function closeAppointmentModal() {
    const modal = document.getElementById('appointmentModal');
    if (modal) {
        modal.classList.add('hidden');
        resetAppointmentForm();
    }
}

function openWeeklyRosterModal() {
    const modal = document.getElementById('weeklyRosterModal');
    if (modal) {
        modal.classList.remove('hidden');
        renderWeeklyMatrix();
    }
}

function closeWeeklyRosterModal() {
    const modal = document.getElementById('weeklyRosterModal');
    if (modal) modal.classList.add('hidden');
}

function closeReportSuccessModal() {
    const modal = document.getElementById('reportSuccessModal');
    if (modal) modal.classList.add('hidden');
}

function updateModalOfficials() {
    const dateInput = document.getElementById('apptDate');
    const timeSlotSelect = document.getElementById('appTimeSlot');
    const officialSelect = document.getElementById('apptOfficial');
    if (!dateInput || !officialSelect) return;

    const minTomorrow = getTomorrowDateString();
    if (dateInput.value < minTomorrow) {
        dateInput.value = minTomorrow;
    }

    const selectedDateVal = dateInput.value;
    const d = new Date(selectedDateVal + 'T00:00:00');
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const selectedDayName = dayNames[d.getDay()];

    const roster = getWeeklyRoster();
    const matchingDayShifts = roster.filter(r => r.day === selectedDayName);

    let targetShiftName = 'Morning Shift';
    const selectedSlot = timeSlotSelect ? timeSlotSelect.value : '';

    if (selectedSlot.includes('PM') && (selectedSlot.includes('04:') || selectedSlot.includes('05:') || selectedSlot.includes('06:'))) {
        targetShiftName = 'Evening Shift';
    }

    let targetShiftObj = matchingDayShifts.find(s => s.shift.includes(targetShiftName));
    if (!targetShiftObj && matchingDayShifts.length > 0) {
        targetShiftObj = matchingDayShifts[0];
    }

    let onDutyOfficials = [];
    if (targetShiftObj && targetShiftObj.officialList && Array.isArray(targetShiftObj.officialList)) {
        targetShiftObj.officialList.forEach(off => {
            const itemStr = `${off.name} — ${off.role}`;
            if (!onDutyOfficials.includes(itemStr)) {
                onDutyOfficials.push(itemStr);
            }
        });
    }

    if (onDutyOfficials.length === 0) {
        onDutyOfficials = [
            'Kagawad Juan Dela Cruz — Duty Desk Lead',
            'Kagawad Elena Roxas — Peace & Order Lead'
        ];
    }

    officialSelect.innerHTML = `<option value="">Select On-Duty Official for ${selectedDayName} (${targetShiftName})...</option>` +
        onDutyOfficials.map(o => `<option value="${o}">${o}</option>`).join('');
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

    const newAppointment = {
        id: code,
        residentName: name,
        phone: phone,
        service: service,
        official: official,
        date: date,
        timeSlot: time,
        notes: notes,
        status: 'Pending',
        createdAt: new Date().toLocaleString()
    };

    const appointments = JSON.parse(localStorage.getItem('brgy_appointments') || '[]');
    appointments.unshift(newAppointment);
    localStorage.setItem('brgy_appointments', JSON.stringify(appointments));

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
                            <h4 class="font-extrabold text-sm text-white leading-tight">Appointment Booked Successfully!</h4>
                            <p class="text-[11px] text-emerald-100 font-medium">Barangay San Jose Official Consultation Pass</p>
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
                        <span class="text-[10px] uppercase font-bold text-emerald-200 block mb-0.5">On-Duty Official</span>
                        <strong class="text-white text-xs block">${official}</strong>
                    </div>
                    <div class="bg-white/10 rounded-xl p-3">
                        <span class="text-[10px] uppercase font-bold text-emerald-200 block mb-0.5">Service</span>
                        <span class="font-medium text-white">${service}</span>
                    </div>
                    <div class="bg-white/10 rounded-xl p-3">
                        <span class="text-[10px] uppercase font-bold text-emerald-200 block mb-0.5">Schedule Date & Time</span>
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

function resetAppointmentForm() {
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
}

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
    const input = document.getElementById('trackInput');
    if (input) {
        const val = input.value.trim().toUpperCase();
        if (val) quickTrack(val);
    }
}

function updateFormFeeNotice() {
    const typeEl = document.getElementById('formType');
    const badge = document.getElementById('feeBadge');
    if (!typeEl || !badge) return;
    const type = typeEl.value;
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

function initClockAndShift() {
    const updateTime = () => {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const dateStr = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
        const timeEl = document.getElementById('currentTimeStr');
        if (timeEl) timeEl.innerText = `${dateStr} • ${timeStr}`;

        const currentHour = now.getHours();
        const roster = getWeeklyRoster();
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const todayName = dayNames[now.getDay()];

        let shiftIdx = 0;
        if (currentHour >= 16 || currentHour < 8) shiftIdx = 1;

        const currentShiftData = roster.find(r => r.day === todayName && r.shift.includes(SHIFTS_LIST[shiftIdx].name)) || roster[0];

        const cardsContainer = document.getElementById('currentDutyCards');
        if (cardsContainer && currentShiftData && currentShiftData.officialList) {
            cardsContainer.innerHTML = currentShiftData.officialList.map(o => `
                <div class="bg-slate-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
                    <div>
                        <span class="text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">Active Duty</span>
                        <h4 class="font-bold text-slate-900 text-sm mt-1">${o.name}</h4>
                        <p class="text-xs text-slate-500">${o.role} • ${currentShiftData.station}</p>
                    </div>
                    <a href="tel:09171234567" class="bg-emerald-600 hover:bg-emerald-700 text-white w-9 h-9 rounded-full flex items-center justify-center text-sm shadow">
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
    getWeeklyRoster();
}

function renderTodaySchedule() {
    const list = document.getElementById('todayScheduleList');
    if (!list) return;
    const announcements = JSON.parse(localStorage.getItem('brgy_announcements') || '[]');
    if (announcements.length === 0) return;
    
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
    const events = JSON.parse(localStorage.getItem('brgy_events') || '[]');
    if (events.length === 0) return;
    
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

// BIND ALL FUNCTIONS TO WINDOW SCOPE
window.renderWeeklyMatrix = renderWeeklyMatrix;
window.openAppointmentModal = openAppointmentModal;
window.closeAppointmentModal = closeAppointmentModal;
window.openWeeklyRosterModal = openWeeklyRosterModal;
window.closeWeeklyRosterModal = closeWeeklyRosterModal;
window.closeReportSuccessModal = closeReportSuccessModal;
window.updateModalOfficials = updateModalOfficials;
window.handleAppointmentSubmit = handleAppointmentSubmit;
window.resetAppointmentForm = resetAppointmentForm;
window.handleReportSubmit = handleReportSubmit;
window.quickTrack = quickTrack;
window.trackComplaint = trackComplaint;
window.updateFormFeeNotice = updateFormFeeNotice;
window.handleFormDraftSubmit = handleFormDraftSubmit;
window.printClaimSlip = printClaimSlip;
window.initClockAndShift = initClockAndShift;
window.initLocalStorage = initLocalStorage;
window.renderTodaySchedule = renderTodaySchedule;
window.renderCalendar = renderCalendar;
window.initDates = initDates;