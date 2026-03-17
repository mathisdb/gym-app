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
  ]
};
const ALL_EX = [...EXERCISES.push,...EXERCISES.pull,...EXERCISES.legs];

function getAccentColors() {
  const style = getComputedStyle(document.documentElement);
  return {
    accent: style.getPropertyValue('--accent').trim() || '#3B9EE8',
    accentLight: style.getPropertyValue('--accent-light').trim() || 'rgba(59,158,232,0.18)',
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
  const custom = getCustomExercises().filter(e=>day==='all' || e.day===day).map(e=>({ ...e, custom: true }));
  if(day==='all') return [...ALL_EX, ...custom];
  return [...EXERCISES[day], ...custom];
}

function showAddExerciseForm() {
  document.getElementById('add-ex-form').style.display='block';
  document.getElementById('new-ex-name').focus();
}
function hideAddExerciseForm() {
  document.getElementById('add-ex-form').style.display='none';
  document.getElementById('new-ex-name').value='';
}

function addCustomExercise() {
  const nameEl = document.getElementById('new-ex-name');
  const day = document.getElementById('new-ex-day').value;
  const equipment = document.getElementById('new-ex-equip').value;
  const name = nameEl.value.trim();
  if(!name){ showToast('Enter a name'); nameEl.focus(); return; }
  const id = 'custom_' + Date.now();
  addCustomExerciseToStore({id,name,day,equipment});
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

function showTab(t) {
  document.querySelectorAll('.tab-btn').forEach((b,i)=>b.classList.toggle('active',['workout','bodyweight','progress'][i]===t));
  document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
  document.getElementById('tab-'+t).classList.add('active');
  if(t==='bodyweight') renderBW();
  if(t==='progress') { populateProgressSelect(); renderProgressChart(); }
}

function selectDay(el, day) {
  document.querySelectorAll('.day-chip').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  currentDay = day;
}

function loadDayExercises() {
  const exs = getExercisesForDay(currentDay);
  currentSets = {};
  const db = getDB();
  const list = document.getElementById('exercises-list');
  list.innerHTML = '';
  exs.forEach(ex => {
    const lastW = db.workouts.slice().reverse().find(w=>w.sets&&w.sets[ex.id]);
    const lastSets = lastW ? JSON.parse(JSON.stringify(lastW.sets[ex.id])) : [{reps:10,weight:''}];
    const lastDate = lastW ? lastW.date : null;
    currentSets[ex.id] = JSON.parse(JSON.stringify(lastSets));
    list.appendChild(buildExBlock(ex, lastSets, lastDate));
  });
}

function buildExBlock(ex, initialSets, lastDate) {
  const div = document.createElement('div');
  div.className = 'ex-block';
  div.id = 'ex-'+ex.id;
  const lastInfo = lastDate
    ? `Last: ${lastDate} · ${initialSets.length}×${initialSets[0]?.weight||'–'}kg`
    : 'No previous session';
  const deleteBtn = ex.custom ? `<button class="del-ex-btn" onclick="deleteCustomExercise('${ex.id}');event.stopPropagation();">×</button>` : '';
  div.innerHTML = `
    <div class="ex-header" onclick="toggleEx('${ex.id}')">
      <div>
        <div class="ex-name">${ex.name}</div>
        <div style="font-size:12px;color:var(--text-3);margin-top:2px">${ex.type}</div>
      </div>
      <div class="ex-meta">
        <span id="badge-${ex.id}">${initialSets.length} set${initialSets.length!==1?'s':''}</span>
        ${deleteBtn}
        <span class="ex-arrow" id="arrow-${ex.id}">▼</span>
      </div>
    </div>
    <div class="ex-body" id="body-${ex.id}">
      <div class="last-session">${lastInfo}</div>
      <div class="sets-header">
        <span>#</span><span>Reps</span><span>kg</span><span></span>
      </div>
      <div id="sets-${ex.id}"></div>
      <button class="add-set-btn" onclick="addSet('${ex.id}')">+ Add set</button>
    </div>`;
  setTimeout(()=>{ initialSets.forEach((_,i)=>renderSetRow(ex.id,i)); },0);
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
    <button class="del-set" onclick="removeSet('${exId}',${idx})">×</button>`;
}

function updateSet(exId,idx,field,val) {
  if(!currentSets[exId]) currentSets[exId]=[];
  if(!currentSets[exId][idx]) currentSets[exId][idx]={};
  currentSets[exId][idx][field] = field==='reps'?parseInt(val)||0:parseFloat(val)||'';
}

function addSet(exId) {
  if(!currentSets[exId]) currentSets[exId]=[];
  const last = currentSets[exId][currentSets[exId].length-1]||{reps:10,weight:''};
  currentSets[exId].push({...last});
  renderSetRow(exId, currentSets[exId].length-1);
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
  const body=document.getElementById('body-'+exId);
  const arrow=document.getElementById('arrow-'+exId);
  body.classList.toggle('open');
  arrow.classList.toggle('open');
}

function saveWorkout() {
  const filled = Object.entries(currentSets).filter(([,sets])=>sets.some(s=>s.weight||s.reps));
  if(!filled.length){ showToast('No exercises logged'); return; }
  const db=getDB();
  const date=new Date().toISOString().split('T')[0];
  const setsToSave={};
  filled.forEach(([id,sets])=>{ setsToSave[id]=sets; });
  db.workouts.push({date,day:currentDay,sets:setsToSave});
  saveDB(db);
  showToast('Workout saved!');
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
  bwChart=new Chart(ctx,{
    type:'line',
    data:{labels,datasets:[{data:weights,borderColor:accent,backgroundColor:accentLight,tension:0.3,pointRadius:4,pointBackgroundColor:accent,borderWidth:2,fill:true}]},
    options:{plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>c.raw+' kg'}}},scales:{y:{suggestedMin:Math.min(...weights)-5,suggestedMax:Math.max(...weights)+5,ticks:{font:{size:11},callback:v=>v+'kg'},grid:{color:'rgba(128,128,128,0.1)'}},x:{ticks:{font:{size:10},maxTicksLimit:7},grid:{display:false}}},responsive:true,maintainAspectRatio:false}
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
  progressChart=new Chart(ctx,{
    type:'line',
    data:{labels,datasets:[{data,borderColor:accent,backgroundColor:accentLight,tension:0.3,pointRadius:5,pointBackgroundColor:accent,borderWidth:2,fill:true}]},
    options:{plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>c.raw+' kg'}}},scales:{y:{suggestedMin:Math.min(...data)-5,suggestedMax:Math.max(...data)+5,ticks:{font:{size:11},callback:v=>v+'kg'},grid:{color:'rgba(128,128,128,0.1)'}},x:{ticks:{font:{size:10},maxTicksLimit:7},grid:{display:false}}},responsive:true,maintainAspectRatio:false}
  });
}

loadDayExercises();
