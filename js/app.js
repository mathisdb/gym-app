const EXERCISES = {
  push: [
    {id:'bench',name:'Bench press',type:'Barbell'},
    {id:'incline_db',name:'Incline dumbbell press',type:'Dumbbell'},
    {id:'ohp',name:'Overhead press',type:'Barbell'},
    {id:'lateral_raise',name:'Lateral raise',type:'Dumbbell'},
    {id:'tricep_pushdown',name:'Tricep pushdown',type:'Cable'},
    {id:'chest_fly',name:'Cable chest fly',type:'Cable'},
    {id:'dips',name:'Dips',type:'Bodyweight'},
    {id:'shoulder_machine',name:'Shoulder press machine',type:'Machine'},
    {id:'pec_deck',name:'Pec deck',type:'Machine'},
    {id:'skull_crushers',name:'Skull crushers',type:'Barbell'},
  ],
  pull: [
    {id:'deadlift',name:'Deadlift',type:'Barbell'},
    {id:'pullup',name:'Pull-up',type:'Bodyweight'},
    {id:'seated_row',name:'Seated cable row',type:'Cable'},
    {id:'lat_pulldown',name:'Lat pulldown',type:'Cable'},
    {id:'db_row',name:'Dumbbell row',type:'Dumbbell'},
    {id:'face_pull',name:'Face pull',type:'Cable'},
    {id:'barbell_curl',name:'Barbell curl',type:'Barbell'},
    {id:'hammer_curl',name:'Hammer curl',type:'Dumbbell'},
    {id:'cable_curl',name:'Cable curl',type:'Cable'},
    {id:'rear_delt_fly',name:'Rear delt fly',type:'Dumbbell'},
  ],
  legs: [
    {id:'squat',name:'Squat',type:'Barbell'},
    {id:'rdl',name:'Romanian deadlift',type:'Barbell'},
    {id:'leg_press',name:'Leg press',type:'Machine'},
    {id:'leg_curl',name:'Leg curl',type:'Machine'},
    {id:'leg_ext',name:'Leg extension',type:'Machine'},
    {id:'calf_raise',name:'Calf raise',type:'Machine'},
    {id:'lunges',name:'Lunges',type:'Dumbbell'},
    {id:'hip_thrust',name:'Hip thrust',type:'Barbell'},
    {id:'goblet_squat',name:'Goblet squat',type:'Dumbbell'},
  ],
  arms: [
    {id:'barbell_curl',name:'Barbell curl',type:'Barbell'},
    {id:'hammer_curl',name:'Hammer curl',type:'Dumbbell'},
    {id:'cable_curl',name:'Cable curl',type:'Cable'},
    {id:'concentration_curl',name:'Concentration curl',type:'Dumbbell'},
    {id:'tricep_pushdown',name:'Tricep pushdown',type:'Cable'},
    {id:'skull_crushers',name:'Skull crushers',type:'Barbell'},
    {id:'overhead_ext',name:'Cable overhead extension',type:'Cable'},
    {id:'dips',name:'Dips',type:'Bodyweight'},
  ],
  chest_back: [
    {id:'bench',name:'Bench press',type:'Barbell'},
    {id:'incline_db',name:'Incline dumbbell press',type:'Dumbbell'},
    {id:'chest_fly',name:'Cable chest fly',type:'Cable'},
    {id:'pec_deck',name:'Pec deck',type:'Machine'},
    {id:'deadlift',name:'Deadlift',type:'Barbell'},
    {id:'seated_row',name:'Seated cable row',type:'Cable'},
    {id:'lat_pulldown',name:'Lat pulldown',type:'Cable'},
    {id:'db_row',name:'Dumbbell row',type:'Dumbbell'},
  ],
};

const ALL_EX = Object.values(EXERCISES).flat().filter((ex, idx, arr) =>
  arr.findIndex(e => e.id === ex.id) === idx
);

const DAY_LABELS = {
  push: 'Push',
  pull: 'Pull',
  legs: 'Legs',
  arms: 'Arms',
  chest_back: 'Chest / Back',
};

function getAccentColors() {
  const style = getComputedStyle(document.documentElement);
  return {
    accent: style.getPropertyValue('--accent').trim() || '#E83B3B',
    accentLight: style.getPropertyValue('--accent-light').trim() || 'rgba(232,59,59,0.18)',
  };
}

function getDB() {
  try { return JSON.parse(localStorage.getItem('fittrack_db') || '{"workouts":[],"bw":[]}'); }
  catch { return {workouts:[],bw:[]}; }
}
function saveDB(db) { localStorage.setItem('fittrack_db', JSON.stringify(db)); }

function getCustomExercises() {
  try { return JSON.parse(localStorage.getItem('customExercises') || '[]'); }
  catch { return []; }
}
function saveCustomExercises(list) { localStorage.setItem('customExercises', JSON.stringify(list)); }
function addCustomExerciseToStore(ex) { const list=getCustomExercises(); list.push(ex); saveCustomExercises(list); }
function removeCustomExercise(id) { const list=getCustomExercises().filter(e=>e.id!==id); saveCustomExercises(list); }

function getAllExercises() {
  return [...ALL_EX, ...getCustomExercises().map(e=>({ ...e, custom: true }))];
}
function getExercisesForDay(day) {
  const custom = getCustomExercises().filter(e=>e.day===day).map(e=>({ ...e, custom: true }));
  return [...(EXERCISES[day]||[]), ...custom];
}

function showAddExerciseForm() {
  document.getElementById('add-ex-form').style.display='block';
  document.getElementById('new-ex-day').value = currentDay;
  document.getElementById('new-ex-name').focus();
}
function hideAddExerciseForm() {
  document.getElementById('add-ex-form').style.display='none';
  document.getElementById('new-ex-name').value='';
}

function addCustomExercise() {
  const nameEl = document.getElementById('new-ex-name');
  const day = document.getElementById('new-ex-day').value;
  const type = document.getElementById('new-ex-equip').value; // FIX: store as 'type'
  const name = nameEl.value.trim();
  if(!name){ showToast('Enter a name'); nameEl.focus(); return; }
  const id = 'custom_' + Date.now();
  addCustomExerciseToStore({id, name, day, type}); // FIX: was {id,name,day,equipment}
  showToast('Exercise added');
  hideAddExerciseForm();
  loadDayExercises();
  populateProgressSelect();
}

function deleteCustomExercise(id) {
  removeCustomExercise(id);
  showToast('Exercise removed');
  loadDayExercises();
  populateProgressSelect();
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), 2200);
}

let currentDay = 'push';
let currentSets = {};
let currentSupersets = [];   // [[exId, exId], ...] — active groups this session
let currentExercises = null; // null = use day lookup; set for program workouts
let ssLinkMode = false;
let ssLinkSelected = [];
let ssRoundDone = {};        // gIdx → Set of exIds completed in current round

function showTab(t) {
  document.querySelectorAll('.tab-btn').forEach((b,i)=>b.classList.toggle('active',['workout','bodyweight','progress','history','profile','program','analytics'][i]===t));
  document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
  document.getElementById('tab-'+t).classList.add('active');
  if(t==='bodyweight') renderBW();
  if(t==='progress') { populateProgressSelect(); renderProgressChart(); }
  if(t==='history') renderHistory();
  if(t==='profile') renderProfile();
  if(t==='program') renderProgram();
  if(t==='analytics') renderAnalytics();
}

function startWorkout(day) {
  currentDay = day;
  document.getElementById('workout-choose').style.display = 'none';
  document.getElementById('workout-logging').style.display = 'block';
  document.getElementById('workout-day-label').textContent = DAY_LABELS[day] || day;
  loadDayExercises();
}

function backToChoose() {
  stopRestTimer(true);
  cancelLinkMode();
  currentSupersets = [];
  ssRoundDone = {};
  currentExercises = null;
  document.getElementById('workout-logging').style.display = 'none';
  document.getElementById('workout-choose').style.display = 'block';
  document.getElementById('exercises-list').innerHTML = '';
  hideAddExerciseForm();
  currentSets = {};
}

// ============================================================
// REST TIMER
// ============================================================
const RT_CIRCUMFERENCE = 2 * Math.PI * 32; // 201.06

const rt = { remaining: 0, total: 0, intervalId: null, active: false };

function getRestTimePref() {
  const v = parseInt(localStorage.getItem('restTimeSetting'));
  return v > 0 ? v : null;
}
function setRestTimePref(v) {
  if (v > 0) localStorage.setItem('restTimeSetting', String(v));
  else localStorage.removeItem('restTimeSetting');
}
function onSaveRestTimePref() {
  const v = parseInt(document.getElementById('rest-time-input')?.value);
  setRestTimePref(v || 0);
  showToast(v > 0 ? `Rest timer set to ${v}s` : 'Using goal-based defaults');
}

function getRestDuration() {
  const pref = getRestTimePref();
  if (pref) return pref;
  const profile = getUserProfile();
  return {muscle: 90, strength: 180, weight: 60}[profile?.goal] || 90;
}

function startRestTimer(duration) {
  if (rt.intervalId) clearInterval(rt.intervalId);
  rt.total     = duration;
  rt.remaining = duration;
  rt.active    = true;

  const widget = document.getElementById('rest-timer');
  // Reset arc to full before animating so transition fires correctly
  const arc = document.getElementById('rt-arc');
  if (arc) {
    arc.style.transition = 'none';
    arc.style.strokeDasharray  = String(RT_CIRCUMFERENCE);
    arc.style.strokeDashoffset = '0';
    // Re-enable transition on next frame
    requestAnimationFrame(() => { arc.style.transition = ''; });
  }

  widget.style.display = 'flex';
  widget.classList.add('rt-active');
  widget.classList.remove('rt-warning', 'rt-hiding');
  updateTimerDisplay();

  rt.intervalId = setInterval(() => {
    rt.remaining--;
    updateTimerDisplay();
    if (rt.remaining <= 0) {
      stopRestTimer(false);
      beepSound();
      if (navigator.vibrate) navigator.vibrate([200, 80, 200]);
    }
  }, 1000);
}

function stopRestTimer(isSkip) {
  if (rt.intervalId) { clearInterval(rt.intervalId); rt.intervalId = null; }
  rt.active = false;

  const widget = document.getElementById('rest-timer');
  widget.classList.remove('rt-active', 'rt-warning');
  widget.classList.add('rt-hiding');
  setTimeout(() => {
    widget.style.display = 'none';
    widget.classList.remove('rt-hiding');
    const arc = document.getElementById('rt-arc');
    if (arc) { arc.style.transition = 'none'; arc.style.strokeDashoffset = '0'; }
  }, 280);
}

function adjustRestTimer(delta) {
  if (!rt.active && !rt.intervalId) { startRestTimer(getRestDuration() + delta); return; }
  rt.remaining = Math.max(5, rt.remaining + delta);
  if (rt.remaining > rt.total) rt.total = rt.remaining;
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const rem  = Math.max(0, rt.remaining);
  const mins = Math.floor(rem / 60);
  const secs = rem % 60;
  const el   = document.getElementById('rt-time');
  if (el) el.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;

  const arc = document.getElementById('rt-arc');
  if (arc) {
    const offset = RT_CIRCUMFERENCE * (1 - rem / Math.max(rt.total, 1));
    arc.style.strokeDashoffset = String(offset);
  }

  const widget = document.getElementById('rest-timer');
  if (widget) widget.classList.toggle('rt-warning', rem > 0 && rem <= 10);
}

function logSetDone(exId, idx) {
  const row = document.getElementById('srow-' + exId + '-' + idx);
  if (row) {
    row.classList.remove('set-logged');
    void row.offsetWidth;
    row.classList.add('set-logged');
    const btn = row.querySelector('.done-set');
    if (btn) btn.classList.add('done-set-active');
  }

  const gIdx = currentSupersets.findIndex(g => g.includes(exId));
  if (gIdx !== -1) {
    // Superset: only fire timer after all exercises in the group have done a set
    if (!ssRoundDone[gIdx]) ssRoundDone[gIdx] = new Set();
    ssRoundDone[gIdx].add(exId);
    updateSupersetProgress(gIdx);

    if (ssRoundDone[gIdx].size >= currentSupersets[gIdx].length) {
      ssRoundDone[gIdx] = new Set(); // reset for next round
      updateSupersetProgress(gIdx);
      startRestTimer(getRestDuration());
    }
    // else: mid-superset — skip to next exercise, no rest timer
  } else {
    startRestTimer(getRestDuration());
  }
}

function updateSupersetProgress(gIdx) {
  const el = document.getElementById('ss-prog-' + gIdx);
  if (!el) return;
  const done  = ssRoundDone[gIdx] ? ssRoundDone[gIdx].size : 0;
  const total = (currentSupersets[gIdx] || []).length;
  el.textContent = done > 0 ? `${done}/${total} done` : '';
}

function beepSound() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    // Two-tone chime: lower then higher
    [[0, 660], [0.17, 880]].forEach(([delay, freq]) => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.value = freq;
      const t = ctx.currentTime + delay;
      gain.gain.setValueAtTime(0.45, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
      osc.start(t);
      osc.stop(t + 0.25);
    });
  } catch(e) {}
}

function loadDayExercises() {
  currentSets = {};
  currentSupersets = [];
  ssRoundDone = {};
  currentExercises = null;
  const exs = getExercisesForDay(currentDay);
  const db = getDB();
  exs.forEach(ex => {
    currentSets[ex.id] = [];
  });
  reRenderExerciseList();
}

// Rebuild exercise DOM from currentSets + currentSupersets (preserves input values)
function reRenderExerciseList() {
  const exs = currentExercises || getExercisesForDay(currentDay);
  const db = getDB();
  const list = document.getElementById('exercises-list');
  list.innerHTML = '';

  // Map exId → group index
  const inGroup = {};
  currentSupersets.forEach((g, i) => g.forEach(id => { inGroup[id] = i; }));
  const renderedGroups = new Set();

  exs.forEach(ex => {
    const gIdx = inGroup[ex.id];
    if (gIdx !== undefined) {
      if (renderedGroups.has(gIdx)) return;
      renderedGroups.add(gIdx);
      list.appendChild(buildSupersetGroupDOM(gIdx, exs, db));
    } else {
      list.appendChild(buildStandaloneExBlock(ex, db));
    }
  });

  lucide.createIcons();
}

function buildStandaloneExBlock(ex, db) {
  const lastW = db.workouts.slice().reverse().find(w => w.sets && w.sets[ex.id]);
  const lastSets = lastW ? JSON.parse(JSON.stringify(lastW.sets[ex.id])) : null;
  const lastDate = lastW ? lastW.date : null;
  if (!currentSets[ex.id]) currentSets[ex.id] = [];
  return buildExBlock(ex, currentSets[ex.id], lastDate, lastSets);
}

function buildSupersetGroupDOM(gIdx, exs, db) {
  const group = currentSupersets[gIdx];
  const isCircuit = group.length >= 3;
  const typeLabel = isCircuit ? 'Circuit' : 'Superset';

  const wrapper = document.createElement('div');
  wrapper.className = 'superset-group';
  wrapper.id = 'ss-grp-' + gIdx;

  const header = document.createElement('div');
  header.className = 'ss-group-header';
  header.innerHTML = `
    <span class="ss-badge${isCircuit ? ' ss-badge-circuit' : ''}">${typeLabel}</span>
    <span class="ss-progress-text" id="ss-prog-${gIdx}"></span>
    <button class="ss-unlink-btn" onclick="unlinkSuperset(${gIdx})">
      <i data-lucide="unlink-2" style="width:11px;height:11px;"></i> Unlink
    </button>`;
  wrapper.appendChild(header);

  group.forEach(exId => {
    const ex = exs.find(e => e.id === exId);
    if (!ex) return;
    wrapper.appendChild(buildStandaloneExBlock(ex, db));
  });

  return wrapper;
}

// lastSets = actual data from previous session (for display only)
// initialSets = pre-filled values shown in inputs (may have suggestion applied)
function buildExBlock(ex, initialSets, lastDate, lastSets) {
  const div = document.createElement('div');
  div.className = 'ex-block';
  div.id = 'ex-'+ex.id;
  const deleteBtn = ex.custom ? `<button class="del-ex-btn" onclick="deleteCustomExercise('${ex.id}');event.stopPropagation();"><i data-lucide="x" style="width:16px;height:16px;"></i></button>` : '';
  const infoBtn = (typeof EXERCISE_GUIDES !== 'undefined' && EXERCISE_GUIDES[ex.id])
    ? `<button class="ex-info-btn" onclick="showGuide('${ex.id}');event.stopPropagation();" title="Form guide"><i data-lucide="info" style="width:15px;height:15px;"></i></button>`
    : '';
  const equipDisplay = ex.type || ex.equipment || '';

  // Progression dot shown in collapsed header
  const progression = getSuggestionForExercise(ex.id);
  const progDot = progression?.suggestion
    ? `<span class="ex-prog-dot ex-prog-${progression.suggestion.type}" title="${progression.suggestion.type}"></span>`
    : '';

  const progressionHTML = buildProgressionIndicator(ex, lastSets || (lastDate ? initialSets : null), lastDate);

  div.innerHTML = `
    <div class="ex-header" onclick="toggleEx('${ex.id}')">
      <span class="ss-sel-indicator" id="ss-sel-${ex.id}">✓</span>
      <div style="flex:1;min-width:0;">
        <div class="ex-name-row">${ex.name}${infoBtn}</div>
        <div style="font-size:12px;color:var(--text-3);margin-top:2px">${equipDisplay}</div>
      </div>
      <div class="ex-meta">
        ${progDot}
        <span id="badge-${ex.id}">${initialSets.length} set${initialSets.length!==1?'s':''}</span>
        ${deleteBtn}
        <i data-lucide="chevron-down" class="ex-arrow" id="arrow-${ex.id}" style="width:16px;height:16px;"></i>
      </div>
    </div>
    <div class="ex-body" id="body-${ex.id}">
      <div class="progression-panel">${progressionHTML}</div>
      <div class="sets-header">
        <span>#</span><span>Reps</span><span>kg</span><span class="sets-hdr-done">✓</span><span></span>
      </div>
      <div id="sets-${ex.id}"></div>
      <button class="add-set-btn" onclick="addSet('${ex.id}')" style="display:flex;align-items:center;gap:4px;"><i data-lucide="plus" style="width:14px;height:14px;"></i> Add set</button>
    </div>`;
  setTimeout(()=>{ initialSets.forEach((_,i)=>renderSetRow(ex.id,i)); lucide.createIcons(); },0);
  return div;
}

function renderSetRow(exId, idx) {
  const container = document.getElementById('sets-'+exId);
  let row = document.getElementById('srow-'+exId+'-'+idx);
  if(!row){ row=document.createElement('div'); row.className='set-row'; row.id='srow-'+exId+'-'+idx; container.appendChild(row); }
  const s = (currentSets[exId]||[])[idx]||{reps:10,weight:''};
  row.innerHTML = `
    <span class="set-num">${idx+1}</span>
    <input type="number" inputmode="numeric" min="1" max="100" value="${s.reps||''}" placeholder="10" oninput="updateSet('${exId}',${idx},'reps',this.value)">
    <input type="number" inputmode="decimal" min="0" max="500" step="0.5" value="${s.weight||''}" placeholder="kg" oninput="updateSet('${exId}',${idx},'weight',this.value)">
    <button class="done-set" onclick="logSetDone('${exId}',${idx})" title="Set done — start rest timer">✓</button>
    <button class="del-set" onclick="removeSet('${exId}',${idx})">×</button>`;
}

function updateSet(exId,idx,field,val) {
  if(!currentSets[exId]) currentSets[exId]=[];
  if(!currentSets[exId][idx]) currentSets[exId][idx]={};
  currentSets[exId][idx][field] = field==='reps'?parseInt(val)||0:parseFloat(val)||'';
}

function addSet(exId) {
  if(!currentSets[exId]) currentSets[exId]=[];
  const newIdx = currentSets[exId].length;
  // Pre-fill from the corresponding set in the last workout, fall back to last added set
  const db = getDB();
  const lastW = db.workouts.slice().reverse().find(w => w.sets && w.sets[exId]);
  const lastSets = lastW ? lastW.sets[exId] : null;
  let prefill;
  if (lastSets && lastSets[newIdx]) {
    prefill = {reps: lastSets[newIdx].reps, weight: lastSets[newIdx].weight};
  } else {
    const prev = currentSets[exId][newIdx-1];
    prefill = prev ? {...prev} : {reps:10, weight:''};
  }
  currentSets[exId].push(prefill);
  renderSetRow(exId, newIdx);
  updateBadge(exId);
}

function removeSet(exId,idx) {
  if(!currentSets[exId]||currentSets[exId].length<=1) return;
  currentSets[exId].splice(idx,1);
  document.getElementById('sets-'+exId).innerHTML='';
  currentSets[exId].forEach((_,i)=>renderSetRow(exId,i));
  updateBadge(exId);
}

function updateBadge(exId) {
  const n=(currentSets[exId]||[]).length;
  const b=document.getElementById('badge-'+exId);
  if(b) b.textContent=n+' set'+(n!==1?'s':'');
}

function toggleEx(exId) {
  if (ssLinkMode) { toggleSsSelection(exId); return; }
  const body=document.getElementById('body-'+exId);
  const arrow=document.getElementById('arrow-'+exId);
  body.classList.toggle('open');
  arrow.classList.toggle('open');
}

function saveWorkout() {
  stopRestTimer(true);
  const filled = Object.entries(currentSets).filter(([,sets])=>sets.some(s=>s.weight||s.reps));
  if(!filled.length){ showToast('No exercises logged'); return; }
  const db=getDB();
  const date=new Date().toISOString().split('T')[0];
  const setsToSave={};
  filled.forEach(([id,sets])=>{ setsToSave[id]=sets; });
  db.workouts.push({date, day:currentDay, sets:setsToSave,
    supersets: currentSupersets.length ? JSON.parse(JSON.stringify(currentSupersets)) : undefined});
  saveDB(db);
  updateProgressionAfterWorkout(setsToSave);
  // Build summary toast
  const log = getProgressionLog();
  const counts = {increase:0, maintain:0, deload:0};
  Object.keys(setsToSave).forEach(id => { const t=log[id]?.suggestion?.type; if(t) counts[t]++; });
  let msg = 'Workout saved!';
  const parts = [];
  if(counts.increase) parts.push(`${counts.increase}↑`);
  if(counts.maintain) parts.push(`${counts.maintain}→`);
  if(counts.deload)   parts.push(`${counts.deload} deload`);
  if(parts.length) msg += '  ' + parts.join(' · ');
  showToast(msg);
  backToChoose();
}

// ============================================================
// SUPERSET LINK MODE
// ============================================================
function enterLinkMode() {
  if (ssLinkMode) { cancelLinkMode(); return; }
  ssLinkMode = true;
  ssLinkSelected = [];
  document.getElementById('exercises-list').classList.add('ss-link-mode');
  document.getElementById('ss-link-bar').style.display = 'flex';
  document.getElementById('ss-chain-btn').classList.add('ss-chain-active');
  updateLinkBar();
}

function cancelLinkMode() {
  ssLinkMode = false;
  ssLinkSelected = [];
  const list = document.getElementById('exercises-list');
  if (list) list.classList.remove('ss-link-mode');
  const bar = document.getElementById('ss-link-bar');
  if (bar) bar.style.display = 'none';
  const btn = document.getElementById('ss-chain-btn');
  if (btn) btn.classList.remove('ss-chain-active');
  document.querySelectorAll('.ex-block.ss-selected').forEach(el => el.classList.remove('ss-selected'));
}

function toggleSsSelection(exId) {
  if (currentSupersets.some(g => g.includes(exId))) {
    showToast('Already grouped — unlink first'); return;
  }
  const block = document.getElementById('ex-' + exId);
  if (!block) return;
  if (ssLinkSelected.includes(exId)) {
    ssLinkSelected = ssLinkSelected.filter(id => id !== exId);
    block.classList.remove('ss-selected');
  } else {
    if (ssLinkSelected.length >= 3) { showToast('Max 3 exercises per group'); return; }
    ssLinkSelected.push(exId);
    block.classList.add('ss-selected');
  }
  updateLinkBar();
}

function updateLinkBar() {
  const n    = ssLinkSelected.length;
  const info = document.getElementById('ss-link-info');
  const btn  = document.getElementById('ss-confirm-btn');
  if (info) {
    if (n === 0) info.textContent = 'Tap 2–3 exercises to group';
    else if (n === 1) info.textContent = '1 selected — pick 1–2 more';
    else info.textContent = `${n} selected${n >= 3 ? ' (max)' : ''}`;
  }
  if (btn) btn.disabled = n < 2;
}

function confirmLink() {
  if (ssLinkSelected.length < 2) return;
  currentSupersets.push([...ssLinkSelected]);
  const type = ssLinkSelected.length >= 3 ? 'Circuit' : 'Superset';
  cancelLinkMode();
  reRenderExerciseList();
  showToast(`${type} created!`);
}

function unlinkSuperset(gIdx) {
  currentSupersets.splice(gIdx, 1);
  // Re-index ssRoundDone
  const rebuilt = {};
  Object.keys(ssRoundDone).forEach(k => {
    const ki = parseInt(k);
    if (ki < gIdx) rebuilt[ki] = ssRoundDone[k];
    else if (ki > gIdx) rebuilt[ki - 1] = ssRoundDone[k];
  });
  ssRoundDone = rebuilt;
  reRenderExerciseList();
  showToast('Exercises unlinked');
}

// BODYWEIGHT
let bwChart=null;
function renderBW() {
  const db=getDB();
  const entries=db.bw.slice(-30);
  const hist=document.getElementById('bw-history');
  const bwEmpty=document.getElementById('bw-empty');
  const summaryCard=document.getElementById('bw-summary-card');
  if(!entries.length){
    hist.innerHTML='<div class="empty">No entries yet</div>';
    bwEmpty.style.display='block';
    summaryCard.style.display='none';
    if(bwChart){bwChart.destroy();bwChart=null;}
    return;
  }
  bwEmpty.style.display='none';
  summaryCard.style.display='block';
  const weights=entries.map(e=>e.weight);
  const latest=weights[weights.length-1];
  const highest=Math.max(...weights);
  const lowest=Math.min(...weights);
  document.getElementById('bw-stats').innerHTML=`
    <div class="stat-box"><div class="sv">${latest}</div><div class="sl">Latest (kg)</div></div>
    <div class="stat-box"><div class="sv">${lowest}</div><div class="sl">Lowest (kg)</div></div>
    <div class="stat-box"><div class="sv">${highest}</div><div class="sl">Highest (kg)</div></div>`;
  hist.innerHTML=entries.slice(-7).reverse().map(e=>`
    <div class="history-item">
      <span class="history-date">${e.date}</span>
      <span class="history-val">${e.weight} kg</span>
    </div>`).join('');
  const labels=entries.map(e=>e.date.slice(5));
  const ctx=document.getElementById('bw-chart').getContext('2d');
  if(bwChart) bwChart.destroy();
  const {accent, accentLight} = getAccentColors();
  const bwCenter=(Math.min(...weights)+Math.max(...weights))/2;
  const bwHalf=Math.max((Math.max(...weights)-Math.min(...weights))/2+1,5);
  bwChart=new Chart(ctx,{
    type:'line',
    data:{labels,datasets:[{data:weights,borderColor:accent,backgroundColor:accentLight,tension:0.3,pointRadius:4,pointBackgroundColor:accent,borderWidth:2,fill:true}]},
    options:{animation:false,plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>c.raw+' kg'}}},scales:{y:{min:Math.floor(bwCenter-bwHalf),max:Math.ceil(bwCenter+bwHalf),ticks:{font:{size:11},callback:v=>v+'kg'},grid:{color:'rgba(128,128,128,0.1)'}},x:{ticks:{font:{size:10},maxTicksLimit:7},grid:{display:false}}},responsive:true,maintainAspectRatio:false}
  });
}

function logBodyweight() {
  const val=parseFloat(document.getElementById('bw-input').value.replace(',','.'));
  if(!val||isNaN(val)||val<30||val>300){ showToast('Enter a valid weight'); return; }
  const db=getDB();
  const date=new Date().toISOString().split('T')[0];
  const i=db.bw.findIndex(e=>e.date===date);
  if(i>=0) db.bw[i].weight=val; else db.bw.push({date,weight:val});
  db.bw.sort((a,b)=>a.date.localeCompare(b.date));
  saveDB(db);
  document.getElementById('bw-input').value='';
  showToast('Weight logged!');
  renderBW();
}

// PROGRESS
let progressChart=null;
function populateProgressSelect() {
  const sel=document.getElementById('progress-ex-select');
  sel.innerHTML=getAllExercises().map(e=>`<option value="${e.id}">${e.name}</option>`).join('');
}

function renderProgressChart() {
  const exId=document.getElementById('progress-ex-select').value;
  const db=getDB();
  const sessions=db.workouts.filter(w=>w.sets&&w.sets[exId]).map(w=>({
    date:w.date,
    maxWeight:Math.max(...w.sets[exId].map(s=>parseFloat(s.weight)||0)),
    totalVol:w.sets[exId].reduce((a,s)=>a+(parseFloat(s.weight)||0)*(parseInt(s.reps)||0),0),
    sets:w.sets[exId]
  }));
  const stats=document.getElementById('progress-stats');
  const hist=document.getElementById('progress-history');
  const empty=document.getElementById('progress-empty');
  const canvas=document.getElementById('progress-chart');
  if(!sessions.length){
    stats.innerHTML='';
    hist.innerHTML='<div class="empty">No sessions logged yet for this exercise</div>';
    empty.style.display='none';
    canvas.style.display='none';
    if(progressChart){progressChart.destroy();progressChart=null;}
    return;
  }
  canvas.style.display='block';
  empty.style.display='none';
  const maxEver=Math.max(...sessions.map(s=>s.maxWeight));
  const last=sessions[sessions.length-1];
  const diff=sessions.length>1?(last.maxWeight-sessions[sessions.length-2].maxWeight):0;
  const diffStr=diff===0?'—':(diff>0?'+'+diff:diff)+' kg';
  stats.innerHTML=`
    <div class="stat-box"><div class="sv">${maxEver}</div><div class="sl">Best kg</div></div>
    <div class="stat-box"><div class="sv">${last.maxWeight}</div><div class="sl">Last kg</div></div>
    <div class="stat-box"><div class="sv" style="color:${diff>0?'var(--accent)':diff<0?'#E24B4A':'var(--text-2)'}">${diffStr}</div><div class="sl">vs prev</div></div>`;
  hist.innerHTML=sessions.slice(-5).reverse().map(s=>`
    <div class="history-item">
      <span class="history-date">${s.date}</span>
      <span class="history-val">${s.sets.length}×${s.maxWeight}kg</span>
    </div>`).join('');
  const labels=sessions.map(s=>s.date.slice(5));
  const data=sessions.map(s=>s.maxWeight);
  const ctx=canvas.getContext('2d');
  if(progressChart) progressChart.destroy();
  const {accent, accentLight} = getAccentColors();
  const pCenter=(Math.min(...data)+Math.max(...data))/2;
  const pHalf=Math.max((Math.max(...data)-Math.min(...data))/2+1,5);
  progressChart=new Chart(ctx,{
    type:'line',
    data:{labels,datasets:[{data,borderColor:accent,backgroundColor:accentLight,tension:0.3,pointRadius:5,pointBackgroundColor:accent,borderWidth:2,fill:true}]},
    options:{animation:false,plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>c.raw+' kg'}}},scales:{y:{min:Math.floor(pCenter-pHalf),max:Math.ceil(pCenter+pHalf),ticks:{font:{size:11},callback:v=>v+'kg'},grid:{color:'rgba(128,128,128,0.1)'}},x:{ticks:{font:{size:10},maxTicksLimit:7},grid:{display:false}}},responsive:true,maintainAspectRatio:false}
  });
}

// ============================================================
// HISTORY TAB
// ============================================================
let historyFilter  = 'all';
let historyEditData = null;
let historyView    = 'cal';   // 'cal' | 'list'
let calYear, calMonth;        // currently displayed month

function calculateStreak(workouts) {
  if (!workouts.length) return 0;
  const uniqueDates = [...new Set(workouts.map(w => w.date))].sort().reverse();
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  if (uniqueDates[0] !== today && uniqueDates[0] !== yesterday) return 0;
  let streak = 1;
  for (let i = 1; i < uniqueDates.length; i++) {
    const a = new Date(uniqueDates[i-1]+'T12:00:00');
    const b = new Date(uniqueDates[i]+'T12:00:00');
    const diff = Math.round((a - b) / 86400000);
    if (diff === 1) streak++;
    else break;
  }
  return streak;
}

// Main dispatcher — called by showTab('history') and after data changes
function renderHistory() {
  if (historyView === 'cal') renderCalendar();
  else renderHistoryListView();
}

function switchHistoryView(view) {
  historyView = view;
  document.getElementById('history-cal').style.display       = view === 'cal'  ? 'block' : 'none';
  document.getElementById('history-list-view').style.display = view === 'list' ? 'block' : 'none';
  document.getElementById('hvt-cal').classList.toggle('hvt-active',  view === 'cal');
  document.getElementById('hvt-list').classList.toggle('hvt-active', view === 'list');
  renderHistory();
}

// ── Calendar view ─────────────────────────────────────────────
const CAL_MONTHS = ['January','February','March','April','May','June',
                    'July','August','September','October','November','December'];

function renderCalendar() {
  // Lazy-initialise to current month
  if (calYear === undefined) {
    const now = new Date();
    calYear  = now.getFullYear();
    calMonth = now.getMonth();
  }

  const db = getDB();

  // Build date → [{workout, idx}] map
  const wMap = {};
  db.workouts.forEach((w, i) => {
    (wMap[w.date] = wMap[w.date] || []).push({w, i});
  });

  const todayStr   = new Date().toISOString().split('T')[0];
  const yrStr      = String(calYear);
  const moStr      = String(calMonth + 1).padStart(2, '0');
  const monthPfx   = `${yrStr}-${moStr}`;

  const firstDow   = new Date(calYear, calMonth, 1).getDay();      // 0=Sun
  const daysInMon  = new Date(calYear, calMonth + 1, 0).getDate();

  // Leading blanks + day cells
  let cells = '';
  for (let b = 0; b < firstDow; b++) cells += `<div class="cal-cell"></div>`;

  for (let d = 1; d <= daysInMon; d++) {
    const ds         = `${monthPfx}-${String(d).padStart(2,'0')}`;
    const entries    = wMap[ds];
    const hasW       = !!entries;
    const isToday    = ds === todayStr;
    const isFuture   = ds > todayStr;
    const dotCount   = hasW ? Math.min(entries.length, 3) : 0;

    let cls = 'cal-cell cal-day';
    if (isToday)   cls += ' cal-today';
    if (isFuture)  cls += ' cal-future';
    if (hasW)      cls += ' cal-has-workout';

    const dots = dotCount
      ? `<div class="cal-dots">${'<span class="cal-dot"></span>'.repeat(dotCount)}</div>`
      : `<div class="cal-dots"></div>`;

    const tap = hasW ? `onclick="openDayDetail('${ds}')"` : '';
    cells += `<div class="${cls}" ${tap}><span class="cal-day-num">${d}</span>${dots}</div>`;
  }

  // Trailing blanks to complete last row
  const total = firstDow + daysInMon;
  const tail  = (7 - (total % 7)) % 7;
  for (let b = 0; b < tail; b++) cells += `<div class="cal-cell"></div>`;

  document.getElementById('cal-grid').innerHTML = cells;
  document.getElementById('cal-month-title').textContent = `${CAL_MONTHS[calMonth]} ${calYear}`;

  // Stat bar
  const monthCount = db.workouts.filter(w => w.date.startsWith(monthPfx)).length;
  const streak     = calculateStreak(db.workouts);
  document.getElementById('cal-stat-bar').innerHTML = `
    <span class="cal-stat-pill">${monthCount} workout${monthCount !== 1 ? 's' : ''} this month</span>
    <span class="cal-stat-pill"><strong>${streak}</strong> day streak</span>
  `;

  // Horizontal swipe to change month
  _initCalSwipe();
}

function navCalendar(delta) {
  calMonth += delta;
  if (calMonth > 11) { calMonth = 0; calYear++; }
  if (calMonth < 0)  { calMonth = 11; calYear--; }
  // Slide the grid out then back in
  const grid = document.getElementById('cal-grid');
  grid.classList.add(delta > 0 ? 'cal-slide-out-left' : 'cal-slide-out-right');
  setTimeout(() => {
    renderCalendar();
    grid.classList.remove('cal-slide-out-left', 'cal-slide-out-right');
    grid.classList.add(delta > 0 ? 'cal-slide-in-right' : 'cal-slide-in-left');
    setTimeout(() => grid.classList.remove('cal-slide-in-right', 'cal-slide-in-left'), 260);
  }, 160);
}

let _calSwipeStartX = null, _calSwipeStartY = null;
function _initCalSwipe() {
  const wrap = document.getElementById('cal-wrap');
  if (!wrap || wrap._swipeInit) return;
  wrap._swipeInit = true;
  wrap.addEventListener('touchstart', e => {
    _calSwipeStartX = e.touches[0].clientX;
    _calSwipeStartY = e.touches[0].clientY;
  }, {passive: true});
  wrap.addEventListener('touchend', e => {
    if (_calSwipeStartX === null) return;
    const dx = e.changedTouches[0].clientX - _calSwipeStartX;
    const dy = e.changedTouches[0].clientY - _calSwipeStartY;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.5) navCalendar(dx < 0 ? 1 : -1);
    _calSwipeStartX = _calSwipeStartY = null;
  }, {passive: true});
}

// ── Day detail sheet ──────────────────────────────────────────
let _ddSwipeY = null;

function openDayDetail(dateStr) {
  const db      = getDB();
  const entries = db.workouts
    .map((w, i) => ({w, i}))
    .filter(e => e.w.date === dateStr);
  if (!entries.length) return;

  const d = new Date(dateStr + 'T12:00:00');
  const dateLabel = d.toLocaleDateString('en-US', {weekday:'long', month:'long', day:'numeric', year:'numeric'});
  const allEx = getAllExercises();

  let html = `<div class="dd-date">${dateLabel}</div>`;

  entries.forEach(({w, i}, ei) => {
    const sets    = w.sets || {};
    const exIds   = Object.keys(sets);
    const nSets   = exIds.reduce((a, id) => a + (sets[id]||[]).length, 0);
    const vol     = exIds.reduce((a, id) =>
      a + (sets[id]||[]).reduce((b, s) => b + (parseFloat(s.weight)||0)*(parseInt(s.reps)||0), 0), 0);

    if (entries.length > 1) html += `<div class="dd-session-lbl">Session ${ei + 1}</div>`;

    html += `
      <div class="dd-meta-row">
        <span class="hc-type-tag">${DAY_LABELS[w.day] || w.day}</span>
        <span class="dd-chip">${exIds.length} exercises</span>
        <span class="dd-chip">${nSets} sets</span>
        <span class="dd-chip">${Math.round(vol)} kg vol</span>
      </div>
      <div class="dd-ex-list">`;

    exIds.forEach(exId => {
      const ex     = allEx.find(e => e.id === exId);
      const name   = ex ? ex.name : exId;
      const exSets = sets[exId] || [];
      const scheme = exSets.map(s => `${s.reps||0}×${s.weight||0}kg`).join('  ');
      html += `
        <div class="dd-ex-row">
          <span class="dd-ex-name">${name}</span>
          <span class="dd-ex-sets">${scheme}</span>
        </div>`;
    });

    html += `</div>
      <button class="save-btn dd-redo-btn" onclick="redoWorkout(${i});closeDayDetail();">
        <i data-lucide="repeat" style="width:16px;height:16px;"></i> Repeat this workout
      </button>`;
  });

  document.getElementById('day-detail-content').innerHTML = html;
  lucide.createIcons();

  const sheet    = document.getElementById('day-detail-sheet');
  const backdrop = document.getElementById('day-detail-backdrop');
  backdrop.classList.add('dd-open');
  sheet.classList.add('dd-open');

  sheet.addEventListener('touchstart', _ddTouchStart, {passive: true});
  sheet.addEventListener('touchmove',  _ddTouchMove,  {passive: true});
  sheet.addEventListener('touchend',   _ddTouchEnd,   {passive: true});
}

function closeDayDetail() {
  const sheet    = document.getElementById('day-detail-sheet');
  const backdrop = document.getElementById('day-detail-backdrop');
  sheet.style.transform = '';
  backdrop.classList.remove('dd-open');
  sheet.classList.remove('dd-open');
  sheet.removeEventListener('touchstart', _ddTouchStart);
  sheet.removeEventListener('touchmove',  _ddTouchMove);
  sheet.removeEventListener('touchend',   _ddTouchEnd);
  _ddSwipeY = null;
}

function _ddTouchStart(e) { _ddSwipeY = e.touches[0].clientY; }
function _ddTouchMove(e) {
  if (_ddSwipeY === null) return;
  const dy = e.touches[0].clientY - _ddSwipeY;
  if (dy > 0) document.getElementById('day-detail-sheet').style.transform = `translateY(${dy}px)`;
}
function _ddTouchEnd(e) {
  const dy = _ddSwipeY !== null ? e.changedTouches[0].clientY - _ddSwipeY : 0;
  if (dy > 80) closeDayDetail();
  else { document.getElementById('day-detail-sheet').style.transform = ''; _ddSwipeY = null; }
}

// ── List view ─────────────────────────────────────────────────
function renderHistoryListView() {
  const db = getDB();
  const allWorkouts = db.workouts;
  const historyList = document.getElementById('history-list');
  const historyEmpty = document.getElementById('history-empty');
  const summaryCard = document.getElementById('history-summary-card');

  if (!allWorkouts.length) {
    historyList.innerHTML = '';
    historyEmpty.style.display = 'block';
    summaryCard.style.display = 'none';
    return;
  }
  historyEmpty.style.display = 'none';
  summaryCard.style.display = 'block';

  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());
  weekStart.setHours(0,0,0,0);
  const weekStartStr = weekStart.toISOString().split('T')[0];
  const thisWeek = allWorkouts.filter(w => w.date >= weekStartStr).length;
  const streak = calculateStreak(allWorkouts);

  document.getElementById('history-stats').innerHTML = `
    <div class="stat-box"><div class="sv">${allWorkouts.length}</div><div class="sl">Total</div></div>
    <div class="stat-box"><div class="sv">${thisWeek}</div><div class="sl">This week</div></div>
    <div class="stat-box"><div class="sv">${streak}</div><div class="sl">Day streak</div></div>`;

  const indexed = allWorkouts.map((w, i) => ({w, i})).reverse();
  const filtered = historyFilter === 'all' ? indexed : indexed.filter(({w}) => w.day === historyFilter);

  historyList.innerHTML = '';
  filtered.forEach(({w, i}) => historyList.appendChild(buildHistoryCard(w, i)));
  lucide.createIcons();
}

function buildHistoryCard(workout, idx) {
  const div = document.createElement('div');
  div.className = 'card hcard';
  div.id = 'hcard-' + idx;

  const sets = workout.sets || {};
  const exIds = Object.keys(sets);
  const exCount = exIds.length;
  const totalSets = exIds.reduce((a, id) => a + (sets[id]||[]).length, 0);
  const totalVol = exIds.reduce((a, id) =>
    a + (sets[id]||[]).reduce((b, s) => b + (parseFloat(s.weight)||0) * (parseInt(s.reps)||0), 0), 0);

  const allEx = getAllExercises();
  const exPreview = exIds.slice(0, 2).map(id => {
    const ex = allEx.find(e => e.id === id);
    return ex ? ex.name : id;
  }).join(', ') + (exCount > 2 ? ` +${exCount-2}` : '');

  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  let dateStr;
  if (workout.date === today) dateStr = 'Today';
  else if (workout.date === yesterday) dateStr = 'Yesterday';
  else {
    const d = new Date(workout.date + 'T12:00:00');
    dateStr = d.toLocaleDateString('en-US', {weekday:'short', month:'short', day:'numeric'});
  }

  div.innerHTML = `
    <div class="hc-header" onclick="toggleHistoryCard(${idx})">
      <div class="hc-left">
        <div class="hc-date-row">
          <span class="hc-date">${dateStr}</span>
          <span class="hc-type-tag">${DAY_LABELS[workout.day]||workout.day}</span>
        </div>
        <div class="hc-ex-preview">${exPreview || 'No exercises'}</div>
      </div>
      <div class="hc-right">
        <div class="hc-meta">${exCount} ex · ${totalSets} sets</div>
        <div class="hc-vol">${Math.round(totalVol)} kg vol</div>
        <i data-lucide="chevron-down" class="ex-arrow" id="hc-arrow-${idx}" style="width:16px;height:16px;"></i>
      </div>
    </div>
    <div class="hc-body" id="hc-body-${idx}" style="display:none"></div>`;

  return div;
}

function toggleHistoryCard(idx) {
  const body = document.getElementById('hc-body-' + idx);
  const arrow = document.getElementById('hc-arrow-' + idx);
  if (body.style.display === 'block') {
    body.style.display = 'none';
    arrow.classList.remove('open');
  } else {
    body.style.display = 'block';
    arrow.classList.add('open');
    renderHistoryBody(idx, false);
  }
}

function renderHistoryBody(idx, editMode) {
  const db = getDB();
  const workout = db.workouts[idx];
  const body = document.getElementById('hc-body-' + idx);
  const srcSets = editMode && historyEditData && historyEditData.idx === idx
    ? historyEditData.sets
    : (workout.sets || {});
  const allEx = getAllExercises();

  // Build superset membership map for badge display
  const hcSsMap = {};
  (workout.supersets || []).forEach((g, i) => {
    const lbl = g.length >= 3 ? 'Circuit' : 'SS';
    g.forEach(id => { hcSsMap[id] = lbl; });
  });

  let html = '<div class="hc-exercises">';
  Object.entries(srcSets).forEach(([exId, exSets]) => {
    const ex = allEx.find(e => e.id === exId);
    const exName = ex ? ex.name : exId;
    const exType = ex ? (ex.type || ex.equipment || '') : '';
    const ssBadge = hcSsMap[exId] ? `<span class="hc-ss-badge">${hcSsMap[exId]}</span>` : '';
    html += `<div class="hc-ex-item">
      <div class="hc-ex-name">${ssBadge}${exName}<span class="hc-ex-type">${exType ? ' · '+exType : ''}</span></div>`;

    if (editMode) {
      html += `<div class="sets-header sets-header-edit"><span>#</span><span>Reps</span><span>kg</span><span></span></div>`;
      exSets.forEach((s, si) => {
        html += `<div class="set-row">
          <span class="set-num">${si+1}</span>
          <input type="number" inputmode="numeric" value="${s.reps||''}" placeholder="10"
            onchange="updateHistorySet(${idx},'${exId}',${si},'reps',this.value)">
          <input type="number" inputmode="decimal" step="0.5" value="${s.weight||''}" placeholder="kg"
            onchange="updateHistorySet(${idx},'${exId}',${si},'weight',this.value)">
          <button class="del-set" onclick="removeHistorySet(${idx},'${exId}',${si})">×</button>
        </div>`;
      });
      html += `<button class="add-set-btn" onclick="addHistorySet(${idx},'${exId}')" style="display:flex;align-items:center;gap:4px;margin-top:4px;">
        <i data-lucide="plus" style="width:13px;height:13px;"></i> Add set</button>`;
    } else {
      html += `<div class="hc-sets-row">` +
        exSets.map((s, si) => `<span class="hc-set-chip">${si+1}: ${s.reps||0}×${s.weight||0}kg</span>`).join('') +
        `</div>`;
    }
    html += `</div>`;
  });
  html += `</div>`;

  // Action buttons
  html += `<div class="hc-actions" id="hc-actions-${idx}">`;
  if (editMode) {
    html += `
      <button class="hc-btn hc-save" onclick="saveHistoryEdit(${idx})">
        <i data-lucide="check" style="width:14px;height:14px;"></i> Save
      </button>
      <button class="hc-btn hc-cancel" onclick="cancelHistoryEdit(${idx})">Cancel</button>`;
  } else {
    html += `
      <button class="hc-btn hc-edit" onclick="startHistoryEdit(${idx})">
        <i data-lucide="pencil" style="width:14px;height:14px;"></i> Edit
      </button>
      <button class="hc-btn hc-redo" onclick="redoWorkout(${idx})">
        <i data-lucide="repeat" style="width:14px;height:14px;"></i> Redo
      </button>
      <button class="hc-btn hc-delete" onclick="deleteWorkout(${idx})">
        <i data-lucide="trash-2" style="width:14px;height:14px;"></i> Delete
      </button>`;
  }
  html += `</div>`;

  body.innerHTML = html;
  lucide.createIcons();
}

function startHistoryEdit(idx) {
  const db = getDB();
  historyEditData = { idx, sets: JSON.parse(JSON.stringify(db.workouts[idx].sets || {})) };
  renderHistoryBody(idx, true);
}

function updateHistorySet(idx, exId, si, field, val) {
  if (!historyEditData || historyEditData.idx !== idx) return;
  if (!historyEditData.sets[exId][si]) historyEditData.sets[exId][si] = {};
  historyEditData.sets[exId][si][field] = field === 'reps' ? parseInt(val)||0 : parseFloat(val)||'';
}

function addHistorySet(idx, exId) {
  if (!historyEditData || historyEditData.idx !== idx) return;
  const sets = historyEditData.sets[exId] || [];
  const last = sets[sets.length-1] || {reps:10, weight:''};
  historyEditData.sets[exId].push({...last});
  renderHistoryBody(idx, true);
}

function removeHistorySet(idx, exId, si) {
  if (!historyEditData || historyEditData.idx !== idx) return;
  if ((historyEditData.sets[exId]||[]).length <= 1) return;
  historyEditData.sets[exId].splice(si, 1);
  renderHistoryBody(idx, true);
}

function saveHistoryEdit(idx) {
  if (!historyEditData || historyEditData.idx !== idx) return;
  const db = getDB();
  db.workouts[idx].sets = historyEditData.sets;
  saveDB(db);
  historyEditData = null;
  showToast('Workout updated!');
  renderHistoryBody(idx, false);
}

function cancelHistoryEdit(idx) {
  historyEditData = null;
  renderHistoryBody(idx, false);
}

function deleteWorkout(idx) {
  // Inline confirmation
  const actions = document.getElementById('hc-actions-' + idx);
  actions.innerHTML = `
    <span class="hc-confirm-msg">Delete this workout?</span>
    <button class="hc-btn hc-delete" onclick="confirmDeleteWorkout(${idx})">Yes, delete</button>
    <button class="hc-btn hc-cancel" onclick="renderHistoryBody(${idx},false)">Cancel</button>`;
  lucide.createIcons();
}

function confirmDeleteWorkout(idx) {
  const db = getDB();
  db.workouts.splice(idx, 1);
  saveDB(db);
  showToast('Workout deleted');
  renderHistory();
}

function redoWorkout(idx) {
  const db = getDB();
  const w = db.workouts[idx];
  currentDay = w.day;
  currentSets = JSON.parse(JSON.stringify(w.sets || {}));

  // Switch to workout tab and show logging view
  showTab('workout');
  document.getElementById('workout-choose').style.display = 'none';
  document.getElementById('workout-logging').style.display = 'block';
  document.getElementById('workout-day-label').textContent = (DAY_LABELS[w.day]||w.day) + ' (repeat)';

  const list = document.getElementById('exercises-list');
  list.innerHTML = '';
  const allEx = getAllExercises();
  Object.keys(w.sets||{}).forEach(exId => {
    const ex = allEx.find(e => e.id === exId) || {id:exId, name:exId, type:''};
    list.appendChild(buildExBlock(ex, w.sets[exId], w.date));
  });

  showToast('Workout loaded — edit & save!');
}

function setHistoryFilter(day, btn) {
  historyFilter = day;
  document.querySelectorAll('.hf-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderHistoryListView();
}

// ============================================================
// PROFILE TAB
// ============================================================
function getUserProfile() {
  try { return JSON.parse(localStorage.getItem('userProfile') || 'null'); }
  catch { return null; }
}
function saveUserProfile(p) { localStorage.setItem('userProfile', JSON.stringify(p)); }

function renderProfile() {
  const profile = getUserProfile();
  const el = document.getElementById('profile-content');
  if (!profile) {
    el.innerHTML = `<div class="empty">No profile yet.</div>`;
    return;
  }
  const goalLabels = {muscle:'Build Muscle', weight:'Lose Weight', strength:'Gain Strength'};
  const expLabels  = {beginner:'Beginner', intermediate:'Intermediate', advanced:'Advanced'};
  el.innerHTML = `
    <div class="prof-row"><span class="prof-label">Goal</span><span class="prof-val">${goalLabels[profile.goal]||profile.goal||'—'}</span></div>
    <div class="prof-row"><span class="prof-label">Experience</span><span class="prof-val">${expLabels[profile.experience]||profile.experience||'—'}</span></div>
    <div class="prof-row"><span class="prof-label">Training days</span><span class="prof-val">${profile.trainingDays||'—'} days / week</span></div>
    <div class="prof-row"><span class="prof-label">Equipment</span><span class="prof-val">${(profile.equipment||[]).join(', ')||'—'}</span></div>
    <div class="prof-row"><span class="prof-label">Body weight</span><span class="prof-val">${profile.bodyWeight||'—'} kg</span></div>`;

  // Populate rest timer input
  const rtInput = document.getElementById('rest-time-input');
  if (rtInput) rtInput.value = getRestTimePref() || '';
}

function editProfile() {
  const profile = getUserProfile();
  if (profile) {
    obData = {...profile, equipment: [...(profile.equipment||[])]};
  } else {
    obData = {goal:null, experience:null, trainingDays:4, equipment:[], bodyWeight:null};
  }
  // Reset all selections
  document.querySelectorAll('.ob-goal-card, .ob-exp-card').forEach(el => el.classList.remove('selected'));
  document.querySelectorAll('.ob-chip').forEach(el => el.classList.remove('selected'));
  document.querySelectorAll('.ob-day-opt').forEach(b => b.classList.remove('ob-day-active'));

  if (obData.goal) {
    const g = document.querySelector(`.ob-goal-card[data-value="${obData.goal}"]`);
    if (g) g.classList.add('selected');
  }
  if (obData.experience) {
    const e = document.querySelector(`.ob-exp-card[data-value="${obData.experience}"]`);
    if (e) e.classList.add('selected');
  }
  const days = obData.trainingDays || 4;
  document.getElementById('ob-days-val').textContent = days;
  const dayBtn = document.querySelector(`.ob-day-opt[data-val="${days}"]`);
  if (dayBtn) dayBtn.classList.add('ob-day-active');

  (obData.equipment || []).forEach(eq => {
    const chip = document.querySelector(`.ob-chip[data-value="${eq}"]`);
    if (chip) chip.classList.add('selected');
  });
  if (obData.bodyWeight) document.getElementById('ob-bw-input').value = obData.bodyWeight;

  obStep = 1;
  goToObStep(1, true);
  document.getElementById('onboarding-overlay').style.display = 'flex';
}

function clearAllData() {
  const actions = document.querySelector('#tab-profile .danger-btn');
  // Simple two-tap confirm via toast + flag
  if (!clearAllData._confirm) {
    clearAllData._confirm = true;
    showToast('Tap again to confirm clear');
    setTimeout(() => { clearAllData._confirm = false; }, 3000);
    return;
  }
  clearAllData._confirm = false;
  saveDB({workouts:[], bw:[]});
  showToast('All data cleared');
}

// ============================================================
// ONBOARDING
// ============================================================
let obStep = 1;
const OB_TOTAL = 5;
let obData = {goal:null, experience:null, trainingDays:4, equipment:[], bodyWeight:null};

function goToObStep(newStep, instant) {
  const allSteps = document.querySelectorAll('.ob-step');
  if (instant) {
    allSteps.forEach((s, i) => {
      s.classList.remove('ob-active', 'ob-prev', 'ob-next');
      const n = i + 1;
      if (n === newStep) s.classList.add('ob-active');
      else if (n < newStep) s.classList.add('ob-prev');
      else s.classList.add('ob-next');
    });
    obStep = newStep;
    updateObNav();
    return;
  }

  const dir = newStep > obStep ? 1 : -1;
  const currentEl = document.getElementById('ob-step-' + obStep);
  const nextEl    = document.getElementById('ob-step-' + newStep);

  // Stage next step off-screen
  nextEl.classList.remove('ob-active', 'ob-prev', 'ob-next');
  nextEl.classList.add(dir > 0 ? 'ob-next' : 'ob-prev');

  // Force reflow then animate
  requestAnimationFrame(() => requestAnimationFrame(() => {
    currentEl.classList.remove('ob-active');
    currentEl.classList.add(dir > 0 ? 'ob-prev' : 'ob-next');
    nextEl.classList.remove('ob-prev', 'ob-next');
    nextEl.classList.add('ob-active');
  }));

  obStep = newStep;
  updateObNav();
}

function updateObNav() {
  const backBtn = document.getElementById('ob-back-btn');
  const nextBtn = document.getElementById('ob-next-btn');
  backBtn.style.visibility = obStep === 1 ? 'hidden' : 'visible';
  nextBtn.innerHTML = obStep === OB_TOTAL
    ? 'Finish <i data-lucide="check" style="width:18px;height:18px;"></i>'
    : 'Next <i data-lucide="arrow-right" style="width:18px;height:18px;"></i>';
  document.getElementById('ob-step-counter').textContent = obStep + ' of ' + OB_TOTAL;
  document.getElementById('ob-progress-fill').style.width = ((obStep / OB_TOTAL) * 100) + '%';
  lucide.createIcons();
}

function obNext() {
  if (!validateObStep()) return;
  if (obStep === OB_TOTAL) { finishOnboarding(); return; }
  goToObStep(obStep + 1);
}

function obBack() {
  if (obStep > 1) goToObStep(obStep - 1);
}

function validateObStep() {
  switch (obStep) {
    case 1:
      if (!obData.goal) { showToast('Please select a goal'); return false; }
      break;
    case 2:
      if (!obData.experience) { showToast('Please select your experience level'); return false; }
      break;
    case 4:
      if (!obData.equipment.length) { showToast('Select at least one equipment type'); return false; }
      break;
    case 5: {
      const bwVal = parseFloat(document.getElementById('ob-bw-input').value);
      if (!bwVal || bwVal < 30 || bwVal > 300) { showToast('Enter a valid weight (30–300 kg)'); return false; }
      obData.bodyWeight = bwVal;
      break;
    }
  }
  return true;
}

function finishOnboarding() {
  saveUserProfile(obData);
  // Also log body weight entry
  if (obData.bodyWeight) {
    const db = getDB();
    const date = new Date().toISOString().split('T')[0];
    const i = db.bw.findIndex(e => e.date === date);
    if (i >= 0) db.bw[i].weight = obData.bodyWeight; else db.bw.push({date, weight: obData.bodyWeight});
    db.bw.sort((a,b) => a.date.localeCompare(b.date));
    saveDB(db);
  }
  document.getElementById('onboarding-overlay').style.display = 'none';
  showToast('Profile saved!');
  renderProfile();
}

function selectGoal(el) {
  document.querySelectorAll('.ob-goal-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  obData.goal = el.dataset.value;
}

function selectExperience(el) {
  document.querySelectorAll('.ob-exp-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  obData.experience = el.dataset.value;
}

function selectObDays(el) {
  document.querySelectorAll('.ob-day-opt').forEach(b => b.classList.remove('ob-day-active'));
  el.classList.add('ob-day-active');
  obData.trainingDays = parseInt(el.dataset.val);
  document.getElementById('ob-days-val').textContent = el.dataset.val;
}

function toggleObEquip(el) {
  const val = el.dataset.value;
  if (obData.equipment.includes(val)) {
    obData.equipment = obData.equipment.filter(e => e !== val);
    el.classList.remove('selected');
  } else {
    obData.equipment.push(val);
    el.classList.add('selected');
  }
}

// ============================================================
// EXERCISE DATABASE  (flat list with muscle tags, used by program generator)
// ============================================================
const EXERCISE_DB = [
  // CHEST
  {id:'bench',            name:'Bench press',             type:'Barbell',    muscles:['chest','triceps'],             compound:true},
  {id:'incline_bench',    name:'Incline bench press',     type:'Barbell',    muscles:['chest','shoulders'],           compound:true},
  {id:'db_bench',         name:'Dumbbell bench press',    type:'Dumbbell',   muscles:['chest','triceps'],             compound:true},
  {id:'incline_db',       name:'Incline dumbbell press',  type:'Dumbbell',   muscles:['chest','shoulders'],           compound:true},
  {id:'chest_fly',        name:'Cable chest fly',         type:'Cable',      muscles:['chest'],                       compound:false},
  {id:'pec_deck',         name:'Pec deck',                type:'Machine',    muscles:['chest'],                       compound:false},
  {id:'dips',             name:'Dips',                    type:'Bodyweight', muscles:['chest','triceps'],             compound:true},
  {id:'pushup',           name:'Push-up',                 type:'Bodyweight', muscles:['chest','triceps'],             compound:true},
  {id:'db_fly',           name:'Dumbbell fly',            type:'Dumbbell',   muscles:['chest'],                       compound:false},
  // BACK
  {id:'deadlift',         name:'Deadlift',                type:'Barbell',    muscles:['back','hamstrings','glutes'],  compound:true},
  {id:'barbell_row',      name:'Barbell row',             type:'Barbell',    muscles:['back','biceps'],               compound:true},
  {id:'pullup',           name:'Pull-up',                 type:'Bodyweight', muscles:['back','biceps'],               compound:true},
  {id:'lat_pulldown',     name:'Lat pulldown',            type:'Cable',      muscles:['back','biceps'],               compound:true},
  {id:'seated_row',       name:'Seated cable row',        type:'Cable',      muscles:['back','biceps'],               compound:true},
  {id:'db_row',           name:'Dumbbell row',            type:'Dumbbell',   muscles:['back','biceps'],               compound:true},
  {id:'face_pull',        name:'Face pull',               type:'Cable',      muscles:['back','shoulders'],            compound:false},
  {id:'cs_row',           name:'Chest-supported row',     type:'Dumbbell',   muscles:['back'],                        compound:false},
  // SHOULDERS
  {id:'ohp',              name:'Overhead press',          type:'Barbell',    muscles:['shoulders','triceps'],         compound:true},
  {id:'db_ohp',           name:'Dumbbell shoulder press', type:'Dumbbell',   muscles:['shoulders','triceps'],         compound:true},
  {id:'shoulder_machine', name:'Machine shoulder press',  type:'Machine',    muscles:['shoulders'],                   compound:true},
  {id:'lateral_raise',    name:'Lateral raise',           type:'Dumbbell',   muscles:['shoulders'],                   compound:false},
  {id:'cable_lateral',    name:'Cable lateral raise',     type:'Cable',      muscles:['shoulders'],                   compound:false},
  {id:'rear_delt_fly',    name:'Rear delt fly',           type:'Dumbbell',   muscles:['shoulders','back'],            compound:false},
  // BICEPS
  {id:'barbell_curl',     name:'Barbell curl',            type:'Barbell',    muscles:['biceps'],                      compound:false},
  {id:'hammer_curl',      name:'Hammer curl',             type:'Dumbbell',   muscles:['biceps'],                      compound:false},
  {id:'cable_curl',       name:'Cable curl',              type:'Cable',      muscles:['biceps'],                      compound:false},
  {id:'incline_curl',     name:'Incline dumbbell curl',   type:'Dumbbell',   muscles:['biceps'],                      compound:false},
  {id:'concentration_curl',name:'Concentration curl',     type:'Dumbbell',   muscles:['biceps'],                      compound:false},
  // TRICEPS
  {id:'tricep_pushdown',  name:'Tricep pushdown',         type:'Cable',      muscles:['triceps'],                     compound:false},
  {id:'skull_crushers',   name:'Skull crushers',          type:'Barbell',    muscles:['triceps'],                     compound:false},
  {id:'overhead_ext',     name:'Overhead cable extension',type:'Cable',      muscles:['triceps'],                     compound:false},
  {id:'db_tricep_ext',    name:'DB tricep extension',     type:'Dumbbell',   muscles:['triceps'],                     compound:false},
  {id:'close_grip',       name:'Close-grip bench press',  type:'Barbell',    muscles:['triceps','chest'],             compound:true},
  // QUADS
  {id:'squat',            name:'Squat',                   type:'Barbell',    muscles:['quads','glutes'],              compound:true},
  {id:'front_squat',      name:'Front squat',             type:'Barbell',    muscles:['quads'],                       compound:true},
  {id:'leg_press',        name:'Leg press',               type:'Machine',    muscles:['quads','glutes'],              compound:true},
  {id:'hack_squat',       name:'Hack squat',              type:'Machine',    muscles:['quads'],                       compound:true},
  {id:'goblet_squat',     name:'Goblet squat',            type:'Dumbbell',   muscles:['quads','glutes'],              compound:true},
  {id:'lunges',           name:'Lunges',                  type:'Dumbbell',   muscles:['quads','glutes'],              compound:true},
  {id:'split_squat',      name:'Bulgarian split squat',   type:'Dumbbell',   muscles:['quads','glutes'],              compound:true},
  {id:'leg_ext',          name:'Leg extension',           type:'Machine',    muscles:['quads'],                       compound:false},
  {id:'bw_squat',         name:'Bodyweight squat',        type:'Bodyweight', muscles:['quads','glutes'],              compound:true},
  // HAMSTRINGS
  {id:'rdl',              name:'Romanian deadlift',       type:'Barbell',    muscles:['hamstrings','glutes'],         compound:true},
  {id:'db_rdl',           name:'Dumbbell RDL',            type:'Dumbbell',   muscles:['hamstrings','glutes'],         compound:true},
  {id:'leg_curl',         name:'Leg curl',                type:'Machine',    muscles:['hamstrings'],                  compound:false},
  {id:'nordic_curl',      name:'Nordic curl',             type:'Bodyweight', muscles:['hamstrings'],                  compound:false},
  {id:'good_morning',     name:'Good morning',            type:'Barbell',    muscles:['hamstrings','back'],           compound:true},
  // GLUTES
  {id:'hip_thrust',       name:'Hip thrust',              type:'Barbell',    muscles:['glutes','hamstrings'],         compound:true},
  {id:'db_hip_thrust',    name:'Dumbbell hip thrust',     type:'Dumbbell',   muscles:['glutes'],                      compound:true},
  {id:'cable_kickback',   name:'Cable kickback',          type:'Cable',      muscles:['glutes'],                      compound:false},
  {id:'glute_bridge',     name:'Glute bridge',            type:'Bodyweight', muscles:['glutes'],                      compound:false},
  // CALVES
  {id:'calf_raise',       name:'Calf raise',              type:'Machine',    muscles:['calves'],                      compound:false},
  {id:'standing_calf',    name:'Standing calf raise',     type:'Barbell',    muscles:['calves'],                      compound:false},
  {id:'seated_calf',      name:'Seated calf raise',       type:'Dumbbell',   muscles:['calves'],                      compound:false},
  {id:'bw_calf_raise',    name:'Bodyweight calf raise',   type:'Bodyweight', muscles:['calves'],                      compound:false},
];

// ============================================================
// SPLIT TEMPLATES
// ============================================================
// muscles object: { muscleName: baseExerciseCount }
// baseExerciseCount is scaled down for beginners before selection
const SPLIT_TEMPLATES = {
  fullbody: {
    2: [
      {id:'fb_a', label:'Full Body A', dayType:'full_body',
       muscles:{quads:2, chest:2, back:2, hamstrings:1, shoulders:1}},
      {id:'fb_b', label:'Full Body B', dayType:'full_body',
       muscles:{hamstrings:2, glutes:2, back:2, chest:1, biceps:1}},
    ],
    3: [
      {id:'fb_a', label:'Full Body A', dayType:'full_body',
       muscles:{quads:2, chest:2, back:2, hamstrings:1}},
      {id:'fb_b', label:'Full Body B', dayType:'full_body',
       muscles:{hamstrings:2, glutes:1, back:2, chest:1, triceps:1, biceps:1}},
      {id:'fb_c', label:'Full Body C', dayType:'full_body',
       muscles:{quads:1, shoulders:2, back:2, chest:1, biceps:1, calves:1}},
    ],
  },
  upperlower: {
    4: [
      {id:'upper_a', label:'Upper A', dayType:'upper',
       muscles:{chest:2, back:2, shoulders:1, triceps:1, biceps:1}},
      {id:'lower_a', label:'Lower A', dayType:'lower',
       muscles:{quads:3, hamstrings:2, glutes:1, calves:1}},
      {id:'upper_b', label:'Upper B', dayType:'upper',
       muscles:{back:2, chest:2, shoulders:2, biceps:1, triceps:1}},
      {id:'lower_b', label:'Lower B', dayType:'lower',
       muscles:{hamstrings:2, glutes:2, quads:2, calves:1}},
    ],
  },
  ppl: {
    5: [
      {id:'push',  label:'Push',  dayType:'push',  muscles:{chest:3, shoulders:2, triceps:2}},
      {id:'pull',  label:'Pull',  dayType:'pull',  muscles:{back:3, biceps:2, shoulders:1}},
      {id:'legs',  label:'Legs',  dayType:'legs',  muscles:{quads:3, hamstrings:2, glutes:1, calves:1}},
      {id:'upper', label:'Upper', dayType:'upper', muscles:{chest:2, back:2, shoulders:2, biceps:1, triceps:1}},
      {id:'lower', label:'Lower', dayType:'lower', muscles:{quads:2, hamstrings:2, glutes:2, calves:1}},
    ],
    6: [
      {id:'push_a', label:'Push A', dayType:'push', muscles:{chest:3, shoulders:2, triceps:2}},
      {id:'pull_a', label:'Pull A', dayType:'pull', muscles:{back:3, biceps:2, shoulders:1}},
      {id:'legs_a', label:'Legs A', dayType:'legs', muscles:{quads:3, hamstrings:2, glutes:1, calves:1}},
      {id:'push_b', label:'Push B', dayType:'push', muscles:{chest:2, shoulders:3, triceps:2}},
      {id:'pull_b', label:'Pull B', dayType:'pull', muscles:{back:2, biceps:2, shoulders:2}},
      {id:'legs_b', label:'Legs B', dayType:'legs', muscles:{hamstrings:3, glutes:2, quads:2, calves:1}},
    ],
  },
};

// Weekly sets per muscle targets (used for validation/display)
const WEEKLY_SETS_TARGET = {
  beginner:     {min:10, max:12},
  intermediate: {min:14, max:18},
  advanced:     {min:18, max:22},
};

// ============================================================
// PROGRAM GENERATION
// ============================================================
function getSplitType(days) {
  if (days <= 3) return 'fullbody';
  if (days === 4) return 'upperlower';
  return 'ppl';
}

function getRepScheme(goal, experience) {
  const schemes = {
    muscle:   {beginner:{sets:3,reps:'8-12'},  intermediate:{sets:4,reps:'8-12'},  advanced:{sets:4,reps:'6-12'}},
    weight:   {beginner:{sets:3,reps:'12-15'}, intermediate:{sets:3,reps:'12-15'}, advanced:{sets:4,reps:'12-15'}},
    strength: {beginner:{sets:3,reps:'5-8'},   intermediate:{sets:4,reps:'4-6'},   advanced:{sets:5,reps:'3-5'}},
  };
  return (schemes[goal] || schemes.muscle)[experience] || {sets:3, reps:'8-12'};
}

// Map exercise type → profile equipment key
function equipmentAvailable(type, userEquip) {
  const map = {Dumbbell:'Dumbbells', Cable:'Cables', Machine:'Machines', Barbell:'Barbell', Bodyweight:'Bodyweight'};
  return userEquip.includes(map[type] || type);
}

function lookupExercise(id) {
  return EXERCISE_DB.find(e => e.id === id) || ALL_EX.find(e => e.id === id) || null;
}

function parseRepsForInput(repsStr) {
  // '8-12' → 8,  '3-5' → 3,  '10' → 10
  return parseInt(repsStr.split('-')[0]) || 10;
}

function getCurrentProgram() {
  try { return JSON.parse(localStorage.getItem('currentProgram') || 'null'); }
  catch { return null; }
}
function saveCurrentProgram(p) { localStorage.setItem('currentProgram', JSON.stringify(p)); }

function generateProgram(profile, seed) {
  const {goal, experience, trainingDays, equipment} = profile;
  const userEquip = (equipment && equipment.length) ? equipment : ['Bodyweight'];
  const seed_ = seed || 0;

  const splitType = getSplitType(trainingDays || 3);

  // Pick the closest template key (handles edge cases like trainingDays=5 but only 6-day template exists)
  const splitTemplates = SPLIT_TEMPLATES[splitType];
  const templateKey = Object.keys(splitTemplates).map(Number)
    .sort((a,b) => Math.abs(a-(trainingDays||3)) - Math.abs(b-(trainingDays||3)))[0];
  const templates = splitTemplates[templateKey];

  const repScheme = getRepScheme(goal, experience);

  // Scale exercises-per-muscle by experience
  const expScale = {beginner:0.5, intermediate:0.75, advanced:1.0}[experience] || 0.7;

  const days = templates.map((template, dayIdx) => {
    const exercises = [];
    const usedIds = new Set();

    Object.entries(template.muscles).forEach(([muscle, baseCount]) => {
      const count = Math.max(1, Math.round(baseCount * expScale));

      // Filter by primary muscle + available equipment
      const candidates = EXERCISE_DB.filter(ex =>
        ex.muscles[0] === muscle &&
        equipmentAvailable(ex.type, userEquip) &&
        !usedIds.has(ex.id)
      );
      if (!candidates.length) return;

      // Compounds first, then stable alphabetical sort
      candidates.sort((a, b) => {
        if (b.compound !== a.compound) return b.compound ? 1 : -1;
        return a.name.localeCompare(b.name);
      });

      // Rotate by (dayIdx + seed) so different days and re-generates pick different exercises
      const rot = (dayIdx + seed_) % candidates.length;
      const rotated = [...candidates.slice(rot), ...candidates.slice(0, rot)];

      rotated.slice(0, count).forEach(ex => {
        usedIds.add(ex.id);
        exercises.push({
          id: ex.id, name: ex.name, type: ex.type,
          muscles: ex.muscles,
          sets: repScheme.sets,
          reps: repScheme.reps,
        });
      });
    });

    // Suggest antagonist supersets for intermediate/advanced
    const suggestedSupersets = [];
    if (experience !== 'beginner') {
      const ANTA_PAIRS = [['biceps','triceps'],['chest','back'],['quads','hamstrings']];
      const ssUsed = new Set();
      ANTA_PAIRS.forEach(([m1, m2]) => {
        const e1 = exercises.find(e => e.muscles[0] === m1 && !ssUsed.has(e.id));
        const e2 = exercises.find(e => e.muscles[0] === m2 && !ssUsed.has(e.id));
        if (e1 && e2) {
          suggestedSupersets.push([e1.id, e2.id]);
          ssUsed.add(e1.id); ssUsed.add(e2.id);
        }
      });
    }

    return {...template, exercises, suggestedSupersets};
  });

  const splitLabels = {fullbody:'Full Body', upperlower:'Upper / Lower', ppl:'Push / Pull / Legs'};

  return {
    split: splitType, splitLabel: splitLabels[splitType],
    goal, experience, trainingDays, seed: seed_,
    generatedAt: new Date().toISOString().split('T')[0],
    days,
  };
}

// Estimate weekly sets per primary muscle group across all training days
function calculateWeeklyVolume(days) {
  const vol = {};
  days.forEach(day => {
    day.exercises.forEach(ex => {
      const m = ex.muscles[0];
      vol[m] = (vol[m] || 0) + ex.sets;
    });
  });
  return vol;
}

// ============================================================
// PROGRAM TAB
// ============================================================
function renderProgram() {
  const profile = getUserProfile();
  const noProf = document.getElementById('prog-no-profile');
  const content = document.getElementById('prog-content');

  if (!profile) {
    noProf.style.display = 'block';
    content.style.display = 'none';
    return;
  }
  noProf.style.display = 'none';
  content.style.display = 'block';

  let program = getCurrentProgram();
  // Re-generate if profile changed since last generation
  if (!program ||
      program.trainingDays !== profile.trainingDays ||
      program.experience   !== profile.experience ||
      program.goal         !== profile.goal) {
    program = generateProgram(profile, 0);
    saveCurrentProgram(program);
  }

  renderProgramContent(program, profile);
}

function renderProgramContent(program, profile) {
  const goalLabels = {muscle:'Build Muscle', weight:'Lose Weight', strength:'Gain Strength'};
  const expLabels  = {beginner:'Beginner', intermediate:'Intermediate', advanced:'Advanced'};

  document.getElementById('prog-split-name').textContent = program.splitLabel;
  document.getElementById('prog-meta').textContent =
    `${goalLabels[program.goal]||program.goal} · ${expLabels[program.experience]||program.experience} · ${program.trainingDays} days/week`;
  document.getElementById('prog-date').textContent = 'Generated ' + program.generatedAt;

  // Weekly volume bars
  const vol = calculateWeeklyVolume(program.days);
  const target = WEEKLY_SETS_TARGET[program.experience] || {min:12, max:18};
  const muscleOrder = ['chest','back','shoulders','biceps','triceps','quads','hamstrings','glutes','calves'];
  const volHTML = muscleOrder
    .filter(m => vol[m])
    .map(m => {
      const sets = vol[m];
      const pct = Math.min(100, Math.round((sets / target.max) * 100));
      const label = m.charAt(0).toUpperCase() + m.slice(1);
      const statusColor = sets < target.min ? '#f59e0b' : sets <= target.max ? 'var(--accent)' : '#22c55e';
      return `<div class="vol-row">
        <span class="vol-label">${label}</span>
        <div class="vol-bar-wrap"><div class="vol-bar" style="width:${pct}%;background:${statusColor}"></div></div>
        <span class="vol-num">${sets} sets</span>
      </div>`;
    }).join('');
  document.getElementById('prog-volume-list').innerHTML = volHTML;

  // Day cards
  const daysList = document.getElementById('prog-days-list');
  daysList.innerHTML = '';
  program.days.forEach((day, i) => daysList.appendChild(buildProgramDayCard(day, i)));
  lucide.createIcons();
}

function buildProgramDayCard(day, idx) {
  const div = document.createElement('div');
  div.className = 'card prog-day-card';

  // Collect unique primary muscles for subtitle
  const muscleSet = [];
  day.exercises.forEach(ex => {
    if (ex.muscles[0] && !muscleSet.includes(ex.muscles[0])) muscleSet.push(ex.muscles[0]);
  });
  const muscleLabel = muscleSet.map(m => m.charAt(0).toUpperCase() + m.slice(1)).join(' · ');

  const progSsMap = {};
  (day.suggestedSupersets || []).forEach(pair => {
    const lbl = pair.length >= 3 ? 'Circuit' : 'SS';
    pair.forEach(id => { progSsMap[id] = lbl; });
  });

  const exListHTML = day.exercises.map(ex => {
    const badge = progSsMap[ex.id]
      ? `<span class="prog-ss-badge">${progSsMap[ex.id]}</span>` : '';
    return `<div class="prog-ex-row">
      <div class="prog-ex-left">
        <span class="prog-ex-name">${badge}${ex.name}</span>
        <span class="prog-ex-type">${ex.type}</span>
      </div>
      <span class="prog-ex-scheme">${ex.sets}×${ex.reps}</span>
    </div>`;
  }).join('');

  div.innerHTML = `
    <div class="prog-day-header">
      <div>
        <div class="prog-day-label">Day ${idx+1} — <span class="prog-day-tag">${day.label}</span></div>
        <div class="prog-day-muscles">${muscleLabel}</div>
      </div>
      <button class="prog-start-btn" onclick="startProgramWorkout(${idx})">
        <i data-lucide="play" style="width:13px;height:13px;"></i> Start
      </button>
    </div>
    <div class="prog-ex-list">${exListHTML}</div>`;

  return div;
}

function startProgramWorkout(dayIdx) {
  const program = getCurrentProgram();
  if (!program) { showToast('No program — generate one first'); return; }
  const day = program.days[dayIdx];
  if (!day || !day.exercises.length) { showToast('No exercises in this day'); return; }

  currentDay = day.dayType || 'push';
  currentSets = {};
  currentSupersets = JSON.parse(JSON.stringify(day.suggestedSupersets || []));
  ssRoundDone = {};
  currentExercises = day.exercises.map(ex => ({id:ex.id, name:ex.name, type:ex.type, muscles:ex.muscles}));

  const db = getDB();
  day.exercises.forEach(ex => {
    const lastW = db.workouts.slice().reverse().find(w => w.sets && w.sets[ex.id]);
    const lastSets = lastW ? JSON.parse(JSON.stringify(lastW.sets[ex.id])) : null;
    const prog = getSuggestionForExercise(ex.id);
    let initialSets;
    if (prog && prog.suggestion) {
      const setCount = lastSets ? lastSets.length : ex.sets;
      initialSets = Array(setCount).fill(null).map(() => ({
        reps: prog.suggestion.targetReps || parseRepsForInput(ex.reps),
        weight: prog.suggestion.weight || ''
      }));
    } else if (lastSets) {
      initialSets = lastSets;
    } else {
      initialSets = Array(ex.sets).fill(null).map(() => ({reps: parseRepsForInput(ex.reps), weight: ''}));
    }
    currentSets[ex.id] = JSON.parse(JSON.stringify(initialSets));
  });

  showTab('workout');
  document.getElementById('workout-choose').style.display = 'none';
  document.getElementById('workout-logging').style.display = 'block';
  document.getElementById('workout-day-label').textContent = day.label;
  reRenderExerciseList();
  showToast(`${day.label} loaded — let's go!`);
}

function regenerateProgram() {
  const profile = getUserProfile();
  if (!profile) { showToast('Complete your profile first'); return; }
  const seed = (getCurrentProgram()?.seed || 0) + 1;
  const program = generateProgram(profile, seed);
  saveCurrentProgram(program);
  renderProgramContent(program, profile);
  showToast('New program generated!');
}

// ============================================================
// PROGRESSIVE OVERLOAD
// ============================================================

// Weight increment per equipment type when user hits all target reps
const WEIGHT_INCREMENT = {
  Barbell:    2.5,
  Dumbbell:   2,
  Cable:      2,
  Machine:    2,
  Bodyweight: 0,   // bodyweight: no weight to increment
};

function getProgressionLog() {
  try { return JSON.parse(localStorage.getItem('progressionLog') || '{}'); }
  catch { return {}; }
}
function saveProgressionLog(log) { localStorage.setItem('progressionLog', JSON.stringify(log)); }

function getSuggestionForExercise(exId) {
  const log = getProgressionLog();
  return log[exId] || null;
}

// Resolve the target reps for an exercise: program → progression log → default 10
function getTargetRepsForExercise(exId) {
  const program = getCurrentProgram();
  if (program) {
    for (const day of program.days) {
      const found = day.exercises.find(e => e.id === exId);
      if (found) return parseRepsForInput(found.reps);
    }
  }
  const log = getProgressionLog();
  if (log[exId]?.targetReps) return log[exId].targetReps;
  return 10;
}

// Return sets pre-filled with the progression suggestion weight/reps.
// Falls back to lastSets or a clean default if no suggestion exists.
function buildSuggestedSets(ex, lastSets) {
  const prog = getSuggestionForExercise(ex.id);
  if (prog && prog.suggestion) {
    const { weight, targetReps } = prog.suggestion;
    const setCount = lastSets ? lastSets.length : (prog.lastSetsCount || 3);
    return Array(setCount).fill(null).map(() => ({
      reps: targetReps || 10,
      weight: weight || ''
    }));
  }
  if (lastSets) return JSON.parse(JSON.stringify(lastSets));
  return [{reps: getTargetRepsForExercise(ex.id), weight: ''}];
}

// Build the HTML for the progression info panel inside an expanded exercise block
function buildProgressionIndicator(ex, lastSets, lastDate) {
  const prog = getSuggestionForExercise(ex.id);

  // No history at all
  if (!lastDate && !prog) {
    return `<div class="pi-none">No previous session — enter your starting weight</div>`;
  }

  // Have session data but progression hasn't been computed yet (first workout with this exercise)
  if (!prog || !prog.suggestion) {
    if (lastDate && lastSets) {
      const w = lastSets[0]?.weight || '—';
      const n = lastSets.length;
      const r = Math.min(...lastSets.map(s => parseInt(s.reps)||0));
      return `<div class="pi-none">Last: ${lastDate} · ${n}×${w}kg · ${r} reps/set</div>`;
    }
    return `<div class="pi-none">No previous session</div>`;
  }

  const { suggestion, lastWeight, lastReps, lastSetsCount, consecutiveFails, targetReps } = prog;
  const lastLine = lastDate
    ? `${lastDate} · ${lastSetsCount||'?'}×${lastWeight||'—'}kg · ${lastReps||'—'} reps/set`
    : `${lastSetsCount||'?'}×${lastWeight||'—'}kg · ${lastReps||'—'} reps/set`;

  const { type, weight: sugWeight, targetReps: sugReps } = suggestion;

  const cfg = {
    increase: { cls:'pi-increase', icon:'trending-up',   text:`${sugWeight}kg × ${sugReps} reps` },
    maintain: { cls:'pi-maintain', icon:'minus',          text:`${sugWeight}kg × ${sugReps} reps` },
    deload:   { cls:'pi-deload',   icon:'trending-down',  text:`${sugWeight}kg × ${sugReps} reps` },
  }[type] || { cls:'pi-maintain', icon:'minus', text:`${sugWeight}kg × ${sugReps} reps` };

  const typeLabel = {increase:'Increase', maintain:'Maintain', deload:'Deload'}[type] || type;

  let failNote = '';
  if (type === 'deload') {
    failNote = `<span class="pi-fail-note"> · 2+ fails in a row — reset &amp; rebuild</span>`;
  } else if (type === 'maintain' && consecutiveFails >= 1) {
    failNote = `<span class="pi-fail-note"> · failed to hit target last session</span>`;
  }

  return `
    <div class="pi-row pi-last-row">
      <span class="pi-label">Last</span>
      <span class="pi-value">${lastLine}</span>
    </div>
    <div class="pi-row ${cfg.cls}">
      <span class="pi-icon"><i data-lucide="${cfg.icon}" style="width:13px;height:13px;"></i></span>
      <span class="pi-value"><strong>${typeLabel}:</strong> ${cfg.text}${failNote}</span>
    </div>`;
}

// Called from saveWorkout() — analyses performance and writes new suggestion to progressionLog
function updateProgressionAfterWorkout(setsToSave) {
  const log = getProgressionLog();

  Object.entries(setsToSave).forEach(([exId, sets]) => {
    if (!sets || !sets.length) return;

    // Resolve equipment type for increment lookup
    const exMeta = lookupExercise(exId)
      || getAllExercises().find(e => e.id === exId)
      || {type: 'Barbell'};
    const type = exMeta.type || exMeta.equipment || 'Barbell';
    const increment = WEIGHT_INCREMENT[type] !== undefined ? WEIGHT_INCREMENT[type] : 2.5;

    // Use the maximum weight logged across all sets as the session weight
    const maxWeight = Math.max(...sets.map(s => parseFloat(s.weight) || 0));
    if (!maxWeight) return; // skip exercises with no weight (bodyweight, unlogged)

    const targetReps = getTargetRepsForExercise(exId);

    // "Hit target" means EVERY set reached the target rep count
    const hitTarget = sets.every(s => (parseInt(s.reps) || 0) >= targetReps);

    const prev = log[exId] || {consecutiveFails: 0};
    let consecutiveFails = prev.consecutiveFails || 0;

    let suggestionType, suggestedWeight;
    if (hitTarget) {
      suggestionType = increment > 0 ? 'increase' : 'maintain';
      suggestedWeight = maxWeight + increment;
      consecutiveFails = 0;
    } else {
      consecutiveFails++;
      if (consecutiveFails >= 2) {
        // Two consecutive failures → deload 10%, round to nearest 2.5 kg
        suggestedWeight = Math.max(2.5, Math.round(maxWeight * 0.9 / 2.5) * 2.5);
        suggestionType = 'deload';
        consecutiveFails = 0;
      } else {
        suggestedWeight = maxWeight;
        suggestionType = 'maintain';
      }
    }

    // minReps = worst performing set (most conservative measure)
    const minReps = Math.min(...sets.map(s => parseInt(s.reps) || 0));

    log[exId] = {
      targetReps,
      consecutiveFails,
      lastWeight: maxWeight,
      lastReps: minReps,
      lastSetsCount: sets.length,
      suggestion: { type: suggestionType, weight: suggestedWeight, targetReps },
    };
  });

  saveProgressionLog(log);
}

// ============================================================
// ANALYTICS TAB
// ============================================================
let anVolumeChart = null;
let anE1rmChart   = null;
let anBwChart     = null;

const MUSCLE_ORDER  = ['chest','back','shoulders','biceps','triceps','quads','hamstrings','glutes','calves'];
const MUSCLE_LABELS_MAP = {
  chest:'Chest', back:'Back', shoulders:'Shoulders', biceps:'Biceps',
  triceps:'Triceps', quads:'Quads', hamstrings:'Hamstrings', glutes:'Glutes', calves:'Calves',
};

function calcE1rm(weight, reps) {
  if (!weight || !reps || reps < 1) return 0;
  return Math.round(weight * (1 + reps / 30) * 10) / 10;
}

// Count sets per primary muscle group across workouts in the last `daysBack` days
function getWeeklyMuscleSets(workouts, daysBack) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - (daysBack || 7));
  const cutoffStr = cutoff.toISOString().split('T')[0];

  const sets = {};
  MUSCLE_ORDER.forEach(m => { sets[m] = 0; });

  workouts.filter(w => w.date >= cutoffStr).forEach(w => {
    Object.entries(w.sets || {}).forEach(([exId, exSets]) => {
      const ex = EXERCISE_DB.find(e => e.id === exId) || getAllExercises().find(e => e.id === exId);
      if (!ex || !ex.muscles || !ex.muscles.length) return;
      const primary = ex.muscles[0];
      if (MUSCLE_ORDER.includes(primary)) sets[primary] += exSets.length;
    });
  });

  return sets;
}

function renderAnalytics() {
  const db = getDB();
  const profile = getUserProfile();
  renderAnWeekCards(db);
  renderAnVolumeChart(db, profile);
  populateAnE1rmSelect();
  renderE1rmChart();
  renderHeatmap(db);
  renderAnBwChart(db);
}

// ── Weekly summary cards ──────────────────────────────────────
function renderAnWeekCards(db) {
  const now      = new Date();
  const d7Str    = new Date(now - 7  * 86400000).toISOString().split('T')[0];
  const d14Str   = new Date(now - 14 * 86400000).toISOString().split('T')[0];
  const todayStr = now.toISOString().split('T')[0];

  const thisW = db.workouts.filter(w => w.date > d7Str  && w.date <= todayStr);
  const lastW = db.workouts.filter(w => w.date > d14Str && w.date <= d7Str);

  function vol(arr) {
    return arr.reduce((t, w) =>
      t + Object.values(w.sets || {}).reduce((a, sets) =>
        a + sets.reduce((b, s) => b + (parseFloat(s.weight)||0)*(parseInt(s.reps)||0), 0), 0), 0);
  }
  function totalSets(arr) {
    return arr.reduce((t, w) =>
      t + Object.values(w.sets || {}).reduce((a, s) => a + s.length, 0), 0);
  }

  const thisVol  = vol(thisW),  lastVol  = vol(lastW);
  const thisSets = totalSets(thisW), lastSets = totalSets(lastW);

  function arrow(curr, prev) {
    if (!prev) return '';
    const pct = Math.round((curr - prev) / prev * 100);
    if (pct > 0)  return `<span class="an-arrow an-up">↑ ${pct}%</span>`;
    if (pct < 0)  return `<span class="an-arrow an-down">↓ ${Math.abs(pct)}%</span>`;
    return `<span class="an-arrow an-flat">→ 0%</span>`;
  }

  const volDisp  = thisVol  >= 1000 ? (thisVol /1000).toFixed(1)+'k' : Math.round(thisVol).toString();

  document.getElementById('an-week-cards').innerHTML = `
    <div class="an-card">
      <div class="an-card-val">${thisW.length}</div>
      <div class="an-card-label">Workouts</div>
      ${arrow(thisW.length, lastW.length)}
    </div>
    <div class="an-card">
      <div class="an-card-val">${volDisp}</div>
      <div class="an-card-label">Volume kg</div>
      ${arrow(thisVol, lastVol)}
    </div>
    <div class="an-card">
      <div class="an-card-val">${thisSets}</div>
      <div class="an-card-label">Total sets</div>
      ${arrow(thisSets, lastSets)}
    </div>
  `;
}

// ── Volume per muscle bar chart ───────────────────────────────
function renderAnVolumeChart(db, profile) {
  const experience = profile?.experience || 'intermediate';
  const target = WEEKLY_SETS_TARGET[experience] || {min:14, max:18};
  const muscleSets = getWeeklyMuscleSets(db.workouts, 7);

  const labels  = MUSCLE_ORDER.map(m => MUSCLE_LABELS_MAP[m]);
  const data    = MUSCLE_ORDER.map(m => muscleSets[m] || 0);
  const hasData = data.some(v => v > 0);

  const empty  = document.getElementById('an-volume-empty');
  const canvas = document.getElementById('an-volume-chart');

  if (!hasData) {
    empty.style.display = 'block';
    canvas.style.display = 'none';
    if (anVolumeChart) { anVolumeChart.destroy(); anVolumeChart = null; }
    return;
  }
  empty.style.display = 'none';
  canvas.style.display = 'block';

  const bgColors = data.map(v => {
    if (v === 0 || v < target.min) return '#f59e0b';
    if (v > target.max) return 'rgba(232,59,59,0.85)';
    return '#22c55e';
  });

  const ctx = canvas.getContext('2d');
  if (anVolumeChart) anVolumeChart.destroy();

  anVolumeChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: bgColors,
        borderRadius: 4,
        borderSkipped: false,
      }]
    },
    options: {
      indexAxis: 'y',
      animation: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: c => `${c.raw} sets  (target ${target.min}–${target.max})`,
          }
        }
      },
      scales: {
        x: {
          min: 0,
          ticks: { font: {size:11}, stepSize: 2 },
          grid: { color: 'rgba(128,128,128,0.1)' },
        },
        y: {
          ticks: { font: {size:11} },
          grid: { display: false },
        }
      },
      responsive: true,
      maintainAspectRatio: false,
    }
  });
}

// ── e1RM line chart ───────────────────────────────────────────
function populateAnE1rmSelect() {
  document.getElementById('an-e1rm-select').innerHTML =
    getAllExercises().map(e => `<option value="${e.id}">${e.name}</option>`).join('');
}

function renderE1rmChart() {
  const exId = document.getElementById('an-e1rm-select').value;
  const db   = getDB();

  const sessions = db.workouts
    .filter(w => w.sets && w.sets[exId])
    .map(w => {
      const best = Math.max(...w.sets[exId].map(s =>
        calcE1rm(parseFloat(s.weight)||0, parseInt(s.reps)||0)));
      return { date: w.date, e1rm: best };
    })
    .filter(s => s.e1rm > 0);

  const empty  = document.getElementById('an-e1rm-empty');
  const canvas = document.getElementById('an-e1rm-chart');

  if (!sessions.length) {
    empty.style.display = 'block';
    canvas.style.display = 'none';
    if (anE1rmChart) { anE1rmChart.destroy(); anE1rmChart = null; }
    return;
  }
  empty.style.display = 'none';
  canvas.style.display = 'block';

  const labels = sessions.map(s => s.date.slice(5));
  const data   = sessions.map(s => Math.round(s.e1rm * 10) / 10);
  const {accent, accentLight} = getAccentColors();
  const yMin = Math.floor(Math.min(...data) * 0.93);
  const yMax = Math.ceil(Math.max(...data)  * 1.07);

  const ctx = canvas.getContext('2d');
  if (anE1rmChart) anE1rmChart.destroy();

  anE1rmChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'e1RM',
        data,
        borderColor: accent,
        backgroundColor: accentLight,
        tension: 0.3,
        pointRadius: 4,
        pointBackgroundColor: accent,
        borderWidth: 2,
        fill: true,
      }]
    },
    options: {
      animation: false,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: c => `e1RM: ${c.raw} kg` } }
      },
      scales: {
        y: {
          min: yMin, max: yMax,
          ticks: { font: {size:11}, callback: v => v+' kg' },
          grid: { color: 'rgba(128,128,128,0.1)' },
        },
        x: {
          ticks: { font: {size:10}, maxTicksLimit: 7 },
          grid: { display: false },
        }
      },
      responsive: true,
      maintainAspectRatio: false,
    }
  });
}

// ── Training heatmap ──────────────────────────────────────────
function renderHeatmap(db) {
  const container  = document.getElementById('an-heatmap');
  const trainedSet = new Set(db.workouts.map(w => w.date));

  const today = new Date();
  today.setHours(12,0,0,0);
  const todayStr = today.toISOString().split('T')[0];

  // Start on the Monday 12 weeks ago (so we always show full weeks Mon–Sun)
  const dowOffset = (today.getDay() + 6) % 7; // 0=Mon … 6=Sun
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - dowOffset - 11 * 7);

  const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const DAY_INITIALS = ['M','T','W','T','F','S','S'];

  // Build 12-week matrix [week][day]
  const weeks = [];
  const cur = new Date(startDate);
  for (let w = 0; w < 12; w++) {
    const days = [];
    for (let d = 0; d < 7; d++) {
      const ds = cur.toISOString().split('T')[0];
      days.push({
        date: ds,
        trained: trainedSet.has(ds),
        isToday: ds === todayStr,
        isFuture: ds > todayStr,
        month: cur.getMonth(),
      });
      cur.setDate(cur.getDate() + 1);
    }
    weeks.push(days);
  }

  // Month label row
  let lastMonth = -1;
  let monthRow = '<div class="hm-day-gap"></div>';
  weeks.forEach(week => {
    const m = week[0].month;
    monthRow += `<div class="hm-month-lbl">${m !== lastMonth ? MONTH_NAMES[m] : ''}</div>`;
    lastMonth = m;
  });

  // Day rows
  let dayRows = '';
  DAY_INITIALS.forEach((lbl, dIdx) => {
    let row = `<div class="hm-day-lbl">${lbl}</div>`;
    weeks.forEach(week => {
      const cell = week[dIdx];
      let cls = 'hm-cell';
      if (cell.isFuture)      cls += ' hm-future';
      else if (cell.trained)  cls += ' hm-trained';
      else                    cls += ' hm-rest';
      if (cell.isToday)       cls += ' hm-today';
      row += `<div class="${cls}" title="${cell.date}"></div>`;
    });
    dayRows += `<div class="hm-row">${row}</div>`;
  });

  container.innerHTML = `
    <div class="hm-grid">
      <div class="hm-row hm-month-row">${monthRow}</div>
      ${dayRows}
    </div>
    <div class="hm-legend">
      <div class="hm-legend-item"><div class="hm-cell hm-rest"></div><span>Rest</span></div>
      <div class="hm-legend-item"><div class="hm-cell hm-trained"></div><span>Trained</span></div>
    </div>
  `;
}

// ── Body weight + 7-day MA ────────────────────────────────────
function renderAnBwChart(db) {
  const entries = db.bw.slice(-60);
  const canvas  = document.getElementById('an-bw-chart');
  const empty   = document.getElementById('an-bw-empty');

  if (entries.length < 2) {
    empty.style.display = 'block';
    canvas.style.display = 'none';
    if (anBwChart) { anBwChart.destroy(); anBwChart = null; }
    return;
  }
  empty.style.display = 'none';
  canvas.style.display = 'block';

  const labels  = entries.map(e => e.date.slice(5));
  const weights = entries.map(e => e.weight);

  // 7-day moving average
  const ma7 = weights.map((_, i) => {
    const slice = weights.slice(Math.max(0, i - 6), i + 1);
    return Math.round(slice.reduce((a, b) => a + b, 0) / slice.length * 10) / 10;
  });

  const {accent, accentLight} = getAccentColors();
  const allVals = [...weights, ...ma7];
  const yCenter = (Math.min(...allVals) + Math.max(...allVals)) / 2;
  const yHalf   = Math.max((Math.max(...allVals) - Math.min(...allVals)) / 2 + 1, 3);

  const ctx = canvas.getContext('2d');
  if (anBwChart) anBwChart.destroy();

  anBwChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Daily',
          data: weights,
          borderColor: 'rgba(150,150,150,0.45)',
          backgroundColor: 'transparent',
          tension: 0,
          pointRadius: 2,
          borderWidth: 1,
          fill: false,
        },
        {
          label: '7-day avg',
          data: ma7,
          borderColor: accent,
          backgroundColor: accentLight,
          tension: 0.4,
          pointRadius: 0,
          borderWidth: 2.5,
          fill: true,
        }
      ]
    },
    options: {
      animation: false,
      plugins: {
        legend: {
          display: true, position: 'top',
          labels: { font: {size:11}, boxWidth: 18, padding: 10 }
        },
        tooltip: { callbacks: { label: c => c.dataset.label + ': ' + c.raw + ' kg' } }
      },
      scales: {
        y: {
          min: Math.floor(yCenter - yHalf),
          max: Math.ceil(yCenter + yHalf),
          ticks: { font: {size:11}, callback: v => v + ' kg' },
          grid: { color: 'rgba(128,128,128,0.1)' },
        },
        x: {
          ticks: { font: {size:10}, maxTicksLimit: 8 },
          grid: { display: false },
        }
      },
      responsive: true,
      maintainAspectRatio: false,
    }
  });
}

// ============================================================
// EXERCISE GUIDE MODAL
// ============================================================
let _guideSwipeY = null;

function showGuide(exId) {
  if (typeof EXERCISE_GUIDES === 'undefined') return;
  const guide = EXERCISE_GUIDES[exId];
  if (!guide) return;

  const stepsHTML = guide.steps.map((s,i) =>
    `<div class="guide-step"><span class="guide-step-num">${i+1}</span><span>${s}</span></div>`
  ).join('');

  const mistakesHTML = guide.mistakes.map(m =>
    `<div class="guide-mistake"><span class="guide-mistake-dot"></span><span>${m}</span></div>`
  ).join('');

  document.getElementById('guide-content').innerHTML = `
    <div class="guide-header">
      <div class="guide-ex-name">${guide.name}</div>
      <div class="guide-ex-meta">
        <span class="guide-tag">${guide.muscle}</span>
        <span class="guide-tag">${guide.equipment}</span>
      </div>
    </div>
    <div class="guide-svg-wrap">${guide.svg}</div>
    <div class="guide-section-title">How to perform</div>
    <div class="guide-steps">${stepsHTML}</div>
    <div class="guide-section-title">Common mistakes</div>
    <div class="guide-mistakes">${mistakesHTML}</div>
  `;

  const sheet = document.getElementById('guide-sheet');
  const backdrop = document.getElementById('guide-backdrop');
  backdrop.classList.add('guide-open');
  sheet.classList.add('guide-open');

  // Swipe-down to dismiss
  sheet.addEventListener('touchstart', _guideTouchStart, {passive: true});
  sheet.addEventListener('touchmove', _guideTouchMove, {passive: true});
  sheet.addEventListener('touchend', _guideTouchEnd, {passive: true});
}

function closeGuide() {
  const sheet = document.getElementById('guide-sheet');
  const backdrop = document.getElementById('guide-backdrop');
  sheet.style.transform = '';
  backdrop.classList.remove('guide-open');
  sheet.classList.remove('guide-open');
  sheet.removeEventListener('touchstart', _guideTouchStart);
  sheet.removeEventListener('touchmove', _guideTouchMove);
  sheet.removeEventListener('touchend', _guideTouchEnd);
  _guideSwipeY = null;
}

function _guideTouchStart(e) { _guideSwipeY = e.touches[0].clientY; }
function _guideTouchMove(e) {
  if (_guideSwipeY === null) return;
  const dy = e.touches[0].clientY - _guideSwipeY;
  if (dy > 0) document.getElementById('guide-sheet').style.transform = `translateY(${dy}px)`;
}
function _guideTouchEnd(e) {
  const sheet = document.getElementById('guide-sheet');
  const dy = _guideSwipeY !== null ? (e.changedTouches[0].clientY - _guideSwipeY) : 0;
  if (dy > 80) { closeGuide(); } else { sheet.style.transform = ''; _guideSwipeY = null; }
}

// ============================================================
// INIT
// ============================================================
function initApp() {
  lucide.createIcons();
  const profile = getUserProfile();
  if (!profile) {
    document.getElementById('onboarding-overlay').style.display = 'flex';
    updateObNav();
  } else {
    document.getElementById('onboarding-overlay').style.display = 'none';
  }
}

initApp();
