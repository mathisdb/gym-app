// ─────────────────────────────────────────────────────────────
//  EXERCISE FORM GUIDES
//  Each SVG shows two key positions separated by a dashed line.
//  Left = starting position  |  Right = peak-contraction / key position
//  Accent colour #E83B3B highlights the primary working muscle area.
// ─────────────────────────────────────────────────────────────
const EXERCISE_GUIDES = {

  // ── 1. BENCH PRESS ────────────────────────────────────────
  bench: {
    name: 'Bench Press',
    muscle: 'Chest · Triceps · Front Delts',
    equipment: 'Barbell & Bench',
    steps: [
      'Lie flat on the bench; feet flat on the floor, eyes directly under the bar.',
      'Grip the bar just outside shoulder-width with thumbs wrapped fully around.',
      'Unrack and hold the bar over your chest with arms locked out.',
      'Lower the bar in a slight arc to your mid-chest, elbows ~45° from your torso.',
      'Press back up explosively through the same arc until arms are fully extended.',
    ],
    mistakes: [
      'Elbows flared to 90° — increases shoulder impingement risk significantly.',
      'Bouncing the bar off your chest — removes pec tension and risks injury.',
      'Hips rising off the bench — destabilises the lift and reduces power transfer.',
    ],
    svg: `<svg viewBox="0 0 240 110" fill="none" xmlns="http://www.w3.org/2000/svg">
  <text x="60" y="8" font-size="8" fill="#999" text-anchor="middle" font-family="sans-serif">Top</text>
  <!-- bench -->
  <rect x="20" y="72" width="80" height="8" rx="3" fill="#ccc"/>
  <line x1="30" y1="80" x2="28" y2="95" stroke="#aaa" stroke-width="2"/>
  <line x1="90" y1="80" x2="92" y2="95" stroke="#aaa" stroke-width="2"/>
  <!-- figure lying - head left -->
  <circle cx="25" cy="66" r="7" stroke="#888" stroke-width="2" fill="none"/>
  <!-- torso horizontal -->
  <line x1="32" y1="66" x2="82" y2="66" stroke="#888" stroke-width="2.5"/>
  <!-- arms up holding bar -->
  <line x1="50" y1="66" x2="50" y2="44" stroke="#888" stroke-width="2.5"/>
  <line x1="70" y1="66" x2="70" y2="44" stroke="#888" stroke-width="2.5"/>
  <!-- bar at top -->
  <line x1="35" y1="42" x2="85" y2="42" stroke="#aaa" stroke-width="4"/>
  <circle cx="35" cy="42" r="4" fill="#bbb"/>
  <circle cx="85" cy="42" r="4" fill="#bbb"/>
  <!-- legs -->
  <line x1="82" y1="66" x2="90" y2="78" stroke="#888" stroke-width="2.5"/>
  <line x1="90" y1="78" x2="95" y2="95" stroke="#888" stroke-width="2.5"/>
  <line x1="82" y1="66" x2="100" y2="78" stroke="#888" stroke-width="2.5"/>
  <line x1="100" y1="78" x2="105" y2="95" stroke="#888" stroke-width="2.5"/>

  <!-- divider -->
  <line x1="120" y1="5" x2="120" y2="105" stroke="#e0e0e0" stroke-width="1" stroke-dasharray="4,3"/>

  <text x="180" y="8" font-size="8" fill="#999" text-anchor="middle" font-family="sans-serif">Bottom</text>
  <!-- bench -->
  <rect x="140" y="72" width="80" height="8" rx="3" fill="#ccc"/>
  <line x1="150" y1="80" x2="148" y2="95" stroke="#aaa" stroke-width="2"/>
  <line x1="210" y1="80" x2="212" y2="95" stroke="#aaa" stroke-width="2"/>
  <!-- figure - chest highlighted -->
  <circle cx="145" cy="66" r="7" stroke="#888" stroke-width="2" fill="none"/>
  <line x1="152" y1="66" x2="202" y2="66" stroke="#888" stroke-width="2.5"/>
  <!-- arms bent, bar at chest - accent -->
  <line x1="162" y1="66" x2="155" y2="56" stroke="#E83B3B" stroke-width="2.5"/>
  <line x1="155" y1="56" x2="158" y2="46" stroke="#E83B3B" stroke-width="2.5"/>
  <line x1="182" y1="66" x2="189" y2="56" stroke="#E83B3B" stroke-width="2.5"/>
  <line x1="189" y1="56" x2="186" y2="46" stroke="#E83B3B" stroke-width="2.5"/>
  <!-- bar at chest -->
  <line x1="148" y1="48" x2="198" y2="48" stroke="#E83B3B" stroke-width="4"/>
  <circle cx="148" cy="48" r="4" fill="#E83B3B" opacity=".7"/>
  <circle cx="198" cy="48" r="4" fill="#E83B3B" opacity=".7"/>
  <!-- legs -->
  <line x1="202" y1="66" x2="210" y2="78" stroke="#888" stroke-width="2.5"/>
  <line x1="210" y1="78" x2="215" y2="95" stroke="#888" stroke-width="2.5"/>
  <line x1="202" y1="66" x2="220" y2="78" stroke="#888" stroke-width="2.5"/>
  <line x1="220" y1="78" x2="225" y2="95" stroke="#888" stroke-width="2.5"/>
</svg>`,
  },

  // ── 2. SQUAT ──────────────────────────────────────────────
  squat: {
    name: 'Barbell Back Squat',
    muscle: 'Quads · Glutes · Hamstrings',
    equipment: 'Barbell & Squat Rack',
    steps: [
      'Set the bar on your upper traps (high bar) or rear delts (low bar); unrack.',
      'Stand with feet shoulder-width apart, toes slightly flared out (15-30°).',
      'Brace your core and begin the descent by breaking at the hips and knees simultaneously.',
      'Squat until your hip crease is at or below the top of your knee — full depth.',
      'Drive through your whole foot, push knees out, and return to standing.',
    ],
    mistakes: [
      'Knees caving inward (valgus collapse) — actively push knees out over toes.',
      'Rising on the toes — keep your heels down and weight distributed evenly.',
      'Good-morning squat (torso too far forward) — keep chest up and brace hard.',
    ],
    svg: `<svg viewBox="0 0 240 110" fill="none" xmlns="http://www.w3.org/2000/svg">
  <text x="60" y="8" font-size="8" fill="#999" text-anchor="middle" font-family="sans-serif">Standing</text>
  <!-- bar on back -->
  <line x1="36" y1="28" x2="86" y2="28" stroke="#aaa" stroke-width="4"/>
  <circle cx="36" cy="28" r="4" fill="#bbb"/>
  <circle cx="86" cy="28" r="4" fill="#bbb"/>
  <!-- head -->
  <circle cx="61" cy="14" r="7" stroke="#888" stroke-width="2" fill="none"/>
  <!-- torso -->
  <line x1="61" y1="21" x2="61" y2="57" stroke="#888" stroke-width="2.5"/>
  <!-- arms on bar -->
  <line x1="61" y1="35" x2="44" y2="32" stroke="#888" stroke-width="2.5"/>
  <line x1="61" y1="35" x2="78" y2="32" stroke="#888" stroke-width="2.5"/>
  <!-- legs standing straight -->
  <line x1="61" y1="57" x2="53" y2="80" stroke="#888" stroke-width="2.5"/>
  <line x1="53" y1="80" x2="51" y2="100" stroke="#888" stroke-width="2.5"/>
  <line x1="61" y1="57" x2="69" y2="80" stroke="#888" stroke-width="2.5"/>
  <line x1="69" y1="80" x2="71" y2="100" stroke="#888" stroke-width="2.5"/>
  <!-- floor -->
  <line x1="35" y1="100" x2="95" y2="100" stroke="#ddd" stroke-width="1.5"/>

  <line x1="120" y1="5" x2="120" y2="105" stroke="#e0e0e0" stroke-width="1" stroke-dasharray="4,3"/>

  <text x="180" y="8" font-size="8" fill="#999" text-anchor="middle" font-family="sans-serif">Bottom</text>
  <!-- bar on back -->
  <line x1="152" y1="50" x2="208" y2="50" stroke="#aaa" stroke-width="4"/>
  <circle cx="152" cy="50" r="4" fill="#bbb"/>
  <circle cx="208" cy="50" r="4" fill="#bbb"/>
  <!-- head - leaning forward slightly -->
  <circle cx="172" cy="40" r="7" stroke="#888" stroke-width="2" fill="none"/>
  <!-- torso angled -->
  <line x1="172" y1="47" x2="180" y2="64" stroke="#888" stroke-width="2.5"/>
  <!-- arms on bar -->
  <line x1="178" y1="52" x2="162" y2="52" stroke="#888" stroke-width="2.5"/>
  <line x1="178" y1="52" x2="197" y2="52" stroke="#888" stroke-width="2.5"/>
  <!-- quads highlighted - deep squat -->
  <line x1="180" y1="64" x2="162" y2="80" stroke="#E83B3B" stroke-width="2.5"/>
  <line x1="162" y1="80" x2="155" y2="100" stroke="#E83B3B" stroke-width="2.5"/>
  <line x1="180" y1="64" x2="198" y2="80" stroke="#E83B3B" stroke-width="2.5"/>
  <line x1="198" y1="80" x2="205" y2="100" stroke="#E83B3B" stroke-width="2.5"/>
  <!-- knee dots -->
  <circle cx="162" cy="80" r="3" fill="#E83B3B"/>
  <circle cx="198" cy="80" r="3" fill="#E83B3B"/>
  <!-- floor -->
  <line x1="140" y1="100" x2="215" y2="100" stroke="#ddd" stroke-width="1.5"/>
</svg>`,
  },

  // ── 3. DEADLIFT ───────────────────────────────────────────
  deadlift: {
    name: 'Conventional Deadlift',
    muscle: 'Back · Glutes · Hamstrings',
    equipment: 'Barbell',
    steps: [
      'Stand with the bar over mid-foot, feet hip-width apart.',
      'Hinge at the hips and bend the knees until your hands reach the bar — use double overhand grip.',
      'Take a deep breath, brace your core, and squeeze your lats ("protect your armpits").',
      'Drive through your heels, extend hips and knees simultaneously, keeping the bar close to your body.',
      'Lock out at the top by squeezing glutes; lower with control by hinging first, then bending knees.',
    ],
    mistakes: [
      'Rounding the lower back — always maintain a neutral spine from setup to lockout.',
      'Bar drifting away from your body — it should drag up your shins and thighs.',
      'Jerking the bar — build tension before the pull and lift in one smooth motion.',
    ],
    svg: `<svg viewBox="0 0 240 110" fill="none" xmlns="http://www.w3.org/2000/svg">
  <text x="60" y="8" font-size="8" fill="#999" text-anchor="middle" font-family="sans-serif">Setup</text>
  <!-- bar on floor -->
  <line x1="28" y1="94" x2="92" y2="94" stroke="#aaa" stroke-width="5"/>
  <circle cx="28" cy="94" r="6" stroke="#bbb" stroke-width="2" fill="none"/>
  <circle cx="92" cy="94" r="6" stroke="#bbb" stroke-width="2" fill="none"/>
  <!-- figure hinging -->
  <circle cx="55" cy="18" r="7" stroke="#888" stroke-width="2" fill="none"/>
  <!-- torso angled forward -->
  <line x1="55" y1="25" x2="60" y2="58" stroke="#888" stroke-width="2.5"/>
  <!-- arms reaching down -->
  <line x1="57" y1="38" x2="55" y2="60" stroke="#888" stroke-width="2.5"/>
  <line x1="57" y1="38" x2="65" y2="60" stroke="#888" stroke-width="2.5"/>
  <line x1="55" y1="60" x2="50" y2="90" stroke="#888" stroke-width="2.5"/>
  <line x1="65" y1="60" x2="70" y2="90" stroke="#888" stroke-width="2.5"/>
  <!-- legs bent -->
  <line x1="60" y1="58" x2="50" y2="78" stroke="#888" stroke-width="2.5"/>
  <line x1="50" y1="78" x2="48" y2="93" stroke="#888" stroke-width="2.5"/>
  <line x1="60" y1="58" x2="70" y2="78" stroke="#888" stroke-width="2.5"/>
  <line x1="70" y1="78" x2="72" y2="93" stroke="#888" stroke-width="2.5"/>

  <line x1="120" y1="5" x2="120" y2="105" stroke="#e0e0e0" stroke-width="1" stroke-dasharray="4,3"/>

  <text x="180" y="8" font-size="8" fill="#999" text-anchor="middle" font-family="sans-serif">Lockout</text>
  <!-- bar at hips -->
  <line x1="148" y1="62" x2="212" y2="62" stroke="#E83B3B" stroke-width="5"/>
  <circle cx="148" cy="62" r="6" stroke="#E83B3B" stroke-width="2" fill="none" opacity=".6"/>
  <circle cx="212" cy="62" r="6" stroke="#E83B3B" stroke-width="2" fill="none" opacity=".6"/>
  <!-- standing figure - back & glutes highlighted -->
  <circle cx="180" cy="14" r="7" stroke="#888" stroke-width="2" fill="none"/>
  <line x1="180" y1="21" x2="180" y2="60" stroke="#E83B3B" stroke-width="2.5"/>
  <!-- arms holding bar -->
  <line x1="180" y1="38" x2="162" y2="60" stroke="#888" stroke-width="2.5"/>
  <line x1="180" y1="38" x2="198" y2="60" stroke="#888" stroke-width="2.5"/>
  <!-- legs straight -->
  <line x1="180" y1="60" x2="172" y2="82" stroke="#E83B3B" stroke-width="2.5"/>
  <line x1="172" y1="82" x2="170" y2="100" stroke="#888" stroke-width="2.5"/>
  <line x1="180" y1="60" x2="188" y2="82" stroke="#E83B3B" stroke-width="2.5"/>
  <line x1="188" y1="82" x2="190" y2="100" stroke="#888" stroke-width="2.5"/>
  <line x1="150" y1="100" x2="210" y2="100" stroke="#ddd" stroke-width="1.5"/>
</svg>`,
  },

  // ── 4. OVERHEAD PRESS ─────────────────────────────────────
  ohp: {
    name: 'Overhead Press',
    muscle: 'Shoulders · Triceps · Upper Chest',
    equipment: 'Barbell',
    steps: [
      'Stand with feet shoulder-width apart, bar resting on your upper chest / front delts.',
      'Grip just outside shoulder-width; elbows slightly in front of the bar (not flared wide).',
      'Brace your core and glutes hard — no lower-back arch.',
      'Press the bar straight up while moving your head back slightly to let it pass your chin.',
      'Lock out overhead with arms straight, ears between arms at the top.',
    ],
    mistakes: [
      'Excessive lower-back hyperextension — squeeze glutes and brace to stay neutral.',
      'Bar path drifting forward — should travel in a nearly straight vertical line.',
      'Pressing with flared elbows from the start — keep them just forward of the bar.',
    ],
    svg: `<svg viewBox="0 0 240 110" fill="none" xmlns="http://www.w3.org/2000/svg">
  <text x="60" y="8" font-size="8" fill="#999" text-anchor="middle" font-family="sans-serif">Rack pos.</text>
  <!-- bar at chest/shoulder height -->
  <line x1="28" y1="40" x2="92" y2="40" stroke="#aaa" stroke-width="4"/>
  <circle cx="28" cy="40" r="4" fill="#bbb"/>
  <circle cx="92" cy="40" r="4" fill="#bbb"/>
  <circle cx="60" cy="14" r="7" stroke="#888" stroke-width="2" fill="none"/>
  <line x1="60" y1="21" x2="60" y2="60" stroke="#888" stroke-width="2.5"/>
  <!-- forearms up holding bar at shoulder -->
  <line x1="60" y1="32" x2="44" y2="38" stroke="#888" stroke-width="2.5"/>
  <line x1="60" y1="32" x2="76" y2="38" stroke="#888" stroke-width="2.5"/>
  <line x1="60" y1="60" x2="52" y2="80" stroke="#888" stroke-width="2.5"/>
  <line x1="52" y1="80" x2="50" y2="100" stroke="#888" stroke-width="2.5"/>
  <line x1="60" y1="60" x2="68" y2="80" stroke="#888" stroke-width="2.5"/>
  <line x1="68" y1="80" x2="70" y2="100" stroke="#888" stroke-width="2.5"/>
  <line x1="35" y1="100" x2="85" y2="100" stroke="#ddd" stroke-width="1.5"/>

  <line x1="120" y1="5" x2="120" y2="105" stroke="#e0e0e0" stroke-width="1" stroke-dasharray="4,3"/>

  <text x="180" y="8" font-size="8" fill="#999" text-anchor="middle" font-family="sans-serif">Lockout</text>
  <!-- bar overhead -->
  <line x1="148" y1="18" x2="212" y2="18" stroke="#E83B3B" stroke-width="4"/>
  <circle cx="148" cy="18" r="4" fill="#E83B3B" opacity=".7"/>
  <circle cx="212" cy="18" r="4" fill="#E83B3B" opacity=".7"/>
  <circle cx="180" cy="32" r="7" stroke="#888" stroke-width="2" fill="none"/>
  <line x1="180" y1="39" x2="180" y2="74" stroke="#888" stroke-width="2.5"/>
  <!-- arms fully extended overhead -->
  <line x1="180" y1="46" x2="162" y2="22" stroke="#E83B3B" stroke-width="2.5"/>
  <line x1="180" y1="46" x2="198" y2="22" stroke="#E83B3B" stroke-width="2.5"/>
  <line x1="180" y1="74" x2="172" y2="92" stroke="#888" stroke-width="2.5"/>
  <line x1="172" y1="92" x2="170" y2="105" stroke="#888" stroke-width="2.5"/>
  <line x1="180" y1="74" x2="188" y2="92" stroke="#888" stroke-width="2.5"/>
  <line x1="188" y1="92" x2="190" y2="105" stroke="#888" stroke-width="2.5"/>
</svg>`,
  },

  // ── 5. BARBELL ROW ────────────────────────────────────────
  barbell_row: {
    name: 'Barbell Bent-Over Row',
    muscle: 'Back · Biceps · Rear Delts',
    equipment: 'Barbell',
    steps: [
      'Hinge at the hips until your torso is roughly 45° or more parallel to the floor.',
      'Grip the bar just outside shoulder-width with a double overhand grip.',
      'Let the bar hang at arm\'s length, keeping your lower back neutral and core braced.',
      'Drive your elbows back and up, pulling the bar into your lower sternum / upper abdomen.',
      'Squeeze your shoulder blades together at the top, then lower under control.',
    ],
    mistakes: [
      'Using momentum / "English" — keep the torso still and control each rep.',
      'Pulling to the wrong spot — aim for lower chest or stomach, not chin.',
      'Rounding the lower back — maintain a neutral spine for the entire set.',
    ],
    svg: `<svg viewBox="0 0 240 110" fill="none" xmlns="http://www.w3.org/2000/svg">
  <text x="60" y="8" font-size="8" fill="#999" text-anchor="middle" font-family="sans-serif">Start</text>
  <circle cx="55" cy="18" r="7" stroke="#888" stroke-width="2" fill="none"/>
  <line x1="55" y1="25" x2="58" y2="58" stroke="#888" stroke-width="2.5"/>
  <!-- arms hanging -->
  <line x1="57" y1="36" x2="50" y2="56" stroke="#888" stroke-width="2.5"/>
  <line x1="50" y1="56" x2="46" y2="76" stroke="#888" stroke-width="2.5"/>
  <line x1="57" y1="36" x2="66" y2="56" stroke="#888" stroke-width="2.5"/>
  <line x1="66" y1="56" x2="72" y2="76" stroke="#888" stroke-width="2.5"/>
  <!-- bar at bottom -->
  <line x1="32" y1="80" x2="82" y2="80" stroke="#aaa" stroke-width="4"/>
  <circle cx="32" cy="80" r="4" fill="#bbb"/>
  <circle cx="82" cy="80" r="4" fill="#bbb"/>
  <!-- legs -->
  <line x1="58" y1="58" x2="48" y2="76" stroke="#888" stroke-width="2.5"/>
  <line x1="48" y1="76" x2="46" y2="95" stroke="#888" stroke-width="2.5"/>
  <line x1="58" y1="58" x2="68" y2="76" stroke="#888" stroke-width="2.5"/>
  <line x1="68" y1="76" x2="70" y2="95" stroke="#888" stroke-width="2.5"/>
  <line x1="30" y1="95" x2="85" y2="95" stroke="#ddd" stroke-width="1.5"/>

  <line x1="120" y1="5" x2="120" y2="105" stroke="#e0e0e0" stroke-width="1" stroke-dasharray="4,3"/>

  <text x="180" y="8" font-size="8" fill="#999" text-anchor="middle" font-family="sans-serif">Top</text>
  <circle cx="172" cy="18" r="7" stroke="#888" stroke-width="2" fill="none"/>
  <line x1="172" y1="25" x2="175" y2="58" stroke="#888" stroke-width="2.5"/>
  <!-- arms bent, bar pulled to stomach -->
  <line x1="174" y1="36" x2="158" y2="48" stroke="#E83B3B" stroke-width="2.5"/>
  <line x1="158" y1="48" x2="152" y2="60" stroke="#E83B3B" stroke-width="2.5"/>
  <line x1="174" y1="36" x2="190" y2="48" stroke="#E83B3B" stroke-width="2.5"/>
  <line x1="190" y1="48" x2="196" y2="60" stroke="#E83B3B" stroke-width="2.5"/>
  <!-- bar at abdomen -->
  <line x1="142" y1="62" x2="202" y2="62" stroke="#E83B3B" stroke-width="4"/>
  <circle cx="142" cy="62" r="4" fill="#E83B3B" opacity=".7"/>
  <circle cx="202" cy="62" r="4" fill="#E83B3B" opacity=".7"/>
  <!-- legs -->
  <line x1="175" y1="58" x2="165" y2="76" stroke="#888" stroke-width="2.5"/>
  <line x1="165" y1="76" x2="163" y2="95" stroke="#888" stroke-width="2.5"/>
  <line x1="175" y1="58" x2="185" y2="76" stroke="#888" stroke-width="2.5"/>
  <line x1="185" y1="76" x2="187" y2="95" stroke="#888" stroke-width="2.5"/>
  <line x1="148" y1="95" x2="205" y2="95" stroke="#ddd" stroke-width="1.5"/>
</svg>`,
  },

  // ── 6. LAT PULLDOWN ───────────────────────────────────────
  lat_pulldown: {
    name: 'Lat Pulldown',
    muscle: 'Lats · Biceps · Rear Delts',
    equipment: 'Cable Machine',
    steps: [
      'Sit with thighs locked under the pads; grip the bar wide with an overhand grip.',
      'Lean back very slightly (~10°), chest tall, and depress your shoulder blades first.',
      'Pull the bar down toward your upper chest by driving your elbows down and back.',
      'Squeeze your lats hard when the bar is near your chin / collarbone.',
      'Extend arms slowly back to the start, feeling a full lat stretch at the top.',
    ],
    mistakes: [
      'Leaning too far back — turns it into a row; stay mostly upright.',
      'Pulling to your stomach — the bar should stop at your upper chest.',
      'Shrugging shoulders up — actively depress and retract your shoulder blades.',
    ],
    svg: `<svg viewBox="0 0 240 110" fill="none" xmlns="http://www.w3.org/2000/svg">
  <text x="60" y="8" font-size="8" fill="#999" text-anchor="middle" font-family="sans-serif">Start</text>
  <!-- machine top bar indicator -->
  <line x1="25" y1="12" x2="95" y2="12" stroke="#ccc" stroke-width="3"/>
  <!-- cable down to hands -->
  <line x1="60" y1="12" x2="43" y2="32" stroke="#ccc" stroke-width="1.5" stroke-dasharray="3,2"/>
  <line x1="60" y1="12" x2="77" y2="32" stroke="#ccc" stroke-width="1.5" stroke-dasharray="3,2"/>
  <!-- bar -->
  <line x1="35" y1="32" x2="85" y2="32" stroke="#aaa" stroke-width="3"/>
  <!-- seated figure - arms extended up -->
  <circle cx="60" cy="44" r="7" stroke="#888" stroke-width="2" fill="none"/>
  <line x1="60" y1="51" x2="60" y2="80" stroke="#888" stroke-width="2.5"/>
  <!-- arms up -->
  <line x1="60" y1="58" x2="43" y2="36" stroke="#888" stroke-width="2.5"/>
  <line x1="60" y1="58" x2="77" y2="36" stroke="#888" stroke-width="2.5"/>
  <!-- legs horizontal (seated) -->
  <line x1="60" y1="80" x2="45" y2="82" stroke="#888" stroke-width="2.5"/>
  <line x1="45" y1="82" x2="30" y2="82" stroke="#888" stroke-width="2.5"/>
  <line x1="60" y1="80" x2="75" y2="82" stroke="#888" stroke-width="2.5"/>
  <line x1="75" y1="82" x2="90" y2="82" stroke="#888" stroke-width="2.5"/>
  <!-- seat box -->
  <rect x="48" y="80" width="24" height="8" rx="2" fill="#ddd"/>

  <line x1="120" y1="5" x2="120" y2="105" stroke="#e0e0e0" stroke-width="1" stroke-dasharray="4,3"/>

  <text x="180" y="8" font-size="8" fill="#999" text-anchor="middle" font-family="sans-serif">Contracted</text>
  <line x1="145" y1="12" x2="215" y2="12" stroke="#ccc" stroke-width="3"/>
  <circle cx="180" cy="40" r="7" stroke="#888" stroke-width="2" fill="none"/>
  <line x1="180" y1="47" x2="180" y2="78" stroke="#888" stroke-width="2.5"/>
  <!-- bar pulled to chest - elbows down -->
  <line x1="180" y1="54" x2="158" y2="52" stroke="#E83B3B" stroke-width="2.5"/>
  <line x1="158" y1="52" x2="152" y2="40" stroke="#E83B3B" stroke-width="2.5"/>
  <line x1="180" y1="54" x2="202" y2="52" stroke="#E83B3B" stroke-width="2.5"/>
  <line x1="202" y1="52" x2="208" y2="40" stroke="#E83B3B" stroke-width="2.5"/>
  <line x1="148" y1="50" x2="212" y2="50" stroke="#E83B3B" stroke-width="3"/>
  <!-- cables -->
  <line x1="180" y1="12" x2="160" y2="42" stroke="#ccc" stroke-width="1.5" stroke-dasharray="3,2"/>
  <line x1="180" y1="12" x2="200" y2="42" stroke="#ccc" stroke-width="1.5" stroke-dasharray="3,2"/>
  <!-- legs -->
  <line x1="180" y1="78" x2="165" y2="80" stroke="#888" stroke-width="2.5"/>
  <line x1="165" y1="80" x2="150" y2="80" stroke="#888" stroke-width="2.5"/>
  <line x1="180" y1="78" x2="195" y2="80" stroke="#888" stroke-width="2.5"/>
  <line x1="195" y1="80" x2="210" y2="80" stroke="#888" stroke-width="2.5"/>
  <rect x="168" y="78" width="24" height="8" rx="2" fill="#ddd"/>
</svg>`,
  },

  // ── 7. CABLE CHEST FLY ────────────────────────────────────
  chest_fly: {
    name: 'Cable Chest Fly',
    muscle: 'Chest (Sternal) · Front Delts',
    equipment: 'Cable Machine',
    steps: [
      'Set cables to shoulder height; stand in the middle with a staggered stance.',
      'Hold handles with palms facing each other, slight elbow bend (~15°) maintained throughout.',
      'Lean forward slightly from the hips and let arms open wide to your sides.',
      'Arc the handles together in front of you as if hugging a large tree.',
      'Squeeze your chest hard at the centre, then slowly open back to the start.',
    ],
    mistakes: [
      'Bending and straightening the elbows — keep a fixed, slight bend the whole time.',
      'Letting the weight stack drop too fast — eccentric control is half the work.',
      'Standing too upright — a slight forward lean puts the chest fibres under better stretch.',
    ],
    svg: `<svg viewBox="0 0 240 110" fill="none" xmlns="http://www.w3.org/2000/svg">
  <text x="60" y="8" font-size="8" fill="#999" text-anchor="middle" font-family="sans-serif">Open</text>
  <!-- cable anchors -->
  <circle cx="18" cy="38" r="4" fill="#ccc"/>
  <circle cx="102" cy="38" r="4" fill="#ccc"/>
  <!-- figure -->
  <circle cx="60" cy="18" r="7" stroke="#888" stroke-width="2" fill="none"/>
  <line x1="60" y1="25" x2="60" y2="64" stroke="#888" stroke-width="2.5"/>
  <!-- arms wide open -->
  <line x1="60" y1="36" x2="32" y2="40" stroke="#888" stroke-width="2.5"/>
  <line x1="32" y1="40" x2="22" y2="40" stroke="#888" stroke-width="2.5"/>
  <line x1="60" y1="36" x2="88" y2="40" stroke="#888" stroke-width="2.5"/>
  <line x1="88" y1="40" x2="98" y2="40" stroke="#888" stroke-width="2.5"/>
  <!-- cables -->
  <line x1="22" y1="40" x2="18" y2="38" stroke="#ccc" stroke-width="1.5" stroke-dasharray="3,2"/>
  <line x1="98" y1="40" x2="102" y2="38" stroke="#ccc" stroke-width="1.5" stroke-dasharray="3,2"/>
  <line x1="60" y1="64" x2="50" y2="86" stroke="#888" stroke-width="2.5"/>
  <line x1="50" y1="86" x2="48" y2="100" stroke="#888" stroke-width="2.5"/>
  <line x1="60" y1="64" x2="70" y2="86" stroke="#888" stroke-width="2.5"/>
  <line x1="70" y1="86" x2="72" y2="100" stroke="#888" stroke-width="2.5"/>

  <line x1="120" y1="5" x2="120" y2="105" stroke="#e0e0e0" stroke-width="1" stroke-dasharray="4,3"/>

  <text x="180" y="8" font-size="8" fill="#999" text-anchor="middle" font-family="sans-serif">Squeezed</text>
  <circle cx="138" cy="38" r="4" fill="#ccc"/>
  <circle cx="222" cy="38" r="4" fill="#ccc"/>
  <circle cx="180" cy="18" r="7" stroke="#888" stroke-width="2" fill="none"/>
  <line x1="180" y1="25" x2="180" y2="64" stroke="#888" stroke-width="2.5"/>
  <!-- arms together in front - accent -->
  <line x1="180" y1="36" x2="164" y2="44" stroke="#E83B3B" stroke-width="2.5"/>
  <line x1="164" y1="44" x2="172" y2="48" stroke="#E83B3B" stroke-width="2.5"/>
  <line x1="180" y1="36" x2="196" y2="44" stroke="#E83B3B" stroke-width="2.5"/>
  <line x1="196" y1="44" x2="188" y2="48" stroke="#E83B3B" stroke-width="2.5"/>
  <!-- hands meeting -->
  <circle cx="180" cy="50" r="3" fill="#E83B3B"/>
  <!-- cables -->
  <line x1="164" y1="44" x2="138" y2="38" stroke="#ccc" stroke-width="1.5" stroke-dasharray="3,2"/>
  <line x1="196" y1="44" x2="222" y2="38" stroke="#ccc" stroke-width="1.5" stroke-dasharray="3,2"/>
  <line x1="180" y1="64" x2="170" y2="86" stroke="#888" stroke-width="2.5"/>
  <line x1="170" y1="86" x2="168" y2="100" stroke="#888" stroke-width="2.5"/>
  <line x1="180" y1="64" x2="190" y2="86" stroke="#888" stroke-width="2.5"/>
  <line x1="190" y1="86" x2="192" y2="100" stroke="#888" stroke-width="2.5"/>
</svg>`,
  },

  // ── 8. DUMBBELL CURL ──────────────────────────────────────
  barbell_curl: {
    name: 'Dumbbell / Barbell Curl',
    muscle: 'Biceps · Brachialis',
    equipment: 'Dumbbell or Barbell',
    steps: [
      'Stand upright, feet shoulder-width apart, dumbbell/bar held at arm\'s length by your sides.',
      'Keep your elbows pinned to your sides — they should not drift forward or flare out.',
      'Curl the weight by contracting your biceps, rotating palms upward as you lift (supination).',
      'Raise until your forearms are vertical and you feel the peak bicep contraction.',
      'Lower the weight slowly (2–3 sec) back to full extension to maximise the stretch.',
    ],
    mistakes: [
      'Swinging your torso to lift the weight — remove momentum and isolate the bicep.',
      'Elbows drifting forward — keep them fixed at your sides throughout.',
      'Not reaching full extension — the stretched position is critical for hypertrophy.',
    ],
    svg: `<svg viewBox="0 0 240 110" fill="none" xmlns="http://www.w3.org/2000/svg">
  <text x="60" y="8" font-size="8" fill="#999" text-anchor="middle" font-family="sans-serif">Bottom</text>
  <circle cx="60" cy="16" r="7" stroke="#888" stroke-width="2" fill="none"/>
  <line x1="60" y1="23" x2="60" y2="62" stroke="#888" stroke-width="2.5"/>
  <!-- arms at sides, dumbbells hanging -->
  <line x1="60" y1="34" x2="44" y2="52" stroke="#888" stroke-width="2.5"/>
  <line x1="44" y1="52" x2="42" y2="70" stroke="#888" stroke-width="2.5"/>
  <!-- dumbbell L -->
  <rect x="37" y="68" width="12" height="5" rx="2" fill="#bbb"/>
  <line x1="60" y1="34" x2="76" y2="52" stroke="#888" stroke-width="2.5"/>
  <line x1="76" y1="52" x2="78" y2="70" stroke="#888" stroke-width="2.5"/>
  <!-- dumbbell R -->
  <rect x="73" y="68" width="12" height="5" rx="2" fill="#bbb"/>
  <line x1="60" y1="62" x2="52" y2="82" stroke="#888" stroke-width="2.5"/>
  <line x1="52" y1="82" x2="50" y2="100" stroke="#888" stroke-width="2.5"/>
  <line x1="60" y1="62" x2="68" y2="82" stroke="#888" stroke-width="2.5"/>
  <line x1="68" y1="82" x2="70" y2="100" stroke="#888" stroke-width="2.5"/>
  <line x1="35" y1="100" x2="85" y2="100" stroke="#ddd" stroke-width="1.5"/>

  <line x1="120" y1="5" x2="120" y2="105" stroke="#e0e0e0" stroke-width="1" stroke-dasharray="4,3"/>

  <text x="180" y="8" font-size="8" fill="#999" text-anchor="middle" font-family="sans-serif">Peak</text>
  <circle cx="180" cy="16" r="7" stroke="#888" stroke-width="2" fill="none"/>
  <line x1="180" y1="23" x2="180" y2="62" stroke="#888" stroke-width="2.5"/>
  <!-- arms curled up - accent bicep -->
  <line x1="180" y1="34" x2="163" y2="48" stroke="#888" stroke-width="2.5"/>
  <line x1="163" y1="48" x2="152" y2="36" stroke="#E83B3B" stroke-width="3"/>
  <!-- dumbbell at shoulder -->
  <rect x="144" y="30" width="12" height="5" rx="2" fill="#E83B3B" opacity=".7"/>
  <line x1="180" y1="34" x2="197" y2="48" stroke="#888" stroke-width="2.5"/>
  <line x1="197" y1="48" x2="208" y2="36" stroke="#E83B3B" stroke-width="3"/>
  <rect x="204" y="30" width="12" height="5" rx="2" fill="#E83B3B" opacity=".7"/>
  <line x1="180" y1="62" x2="172" y2="82" stroke="#888" stroke-width="2.5"/>
  <line x1="172" y1="82" x2="170" y2="100" stroke="#888" stroke-width="2.5"/>
  <line x1="180" y1="62" x2="188" y2="82" stroke="#888" stroke-width="2.5"/>
  <line x1="188" y1="82" x2="190" y2="100" stroke="#888" stroke-width="2.5"/>
  <line x1="155" y1="100" x2="205" y2="100" stroke="#ddd" stroke-width="1.5"/>
</svg>`,
  },

  // ── 9. TRICEP PUSHDOWN ────────────────────────────────────
  tricep_pushdown: {
    name: 'Tricep Pushdown',
    muscle: 'Triceps (all 3 heads)',
    equipment: 'Cable Machine',
    steps: [
      'Stand facing a high cable with a straight bar or rope attachment at chest/neck height.',
      'Grip the attachment, pin your elbows tight to your sides — they should not move.',
      'Start with forearms roughly parallel to the floor (90° at elbow).',
      'Push the attachment down until your arms are fully extended, squeezing the triceps hard.',
      'Allow the forearms to return slowly to the start — control the weight all the way up.',
    ],
    mistakes: [
      'Elbows flaring out and forwards — keep them glued to your ribcage.',
      'Leaning too far over the bar — stay upright to keep tension on the triceps.',
      'Not locking out — full elbow extension is where the tricep contracts most.',
    ],
    svg: `<svg viewBox="0 0 240 110" fill="none" xmlns="http://www.w3.org/2000/svg">
  <text x="60" y="8" font-size="8" fill="#999" text-anchor="middle" font-family="sans-serif">Start</text>
  <!-- cable from top -->
  <line x1="60" y1="0" x2="60" y2="32" stroke="#ccc" stroke-width="1.5" stroke-dasharray="3,2"/>
  <line x1="48" y1="32" x2="72" y2="32" stroke="#aaa" stroke-width="3"/>
  <circle cx="60" cy="16" r="7" stroke="#888" stroke-width="2" fill="none"/>
  <line x1="60" y1="23" x2="60" y2="62" stroke="#888" stroke-width="2.5"/>
  <!-- forearms parallel -->
  <line x1="60" y1="36" x2="45" y2="38" stroke="#888" stroke-width="2.5"/>
  <line x1="45" y1="38" x2="42" y2="56" stroke="#888" stroke-width="2.5"/>
  <line x1="60" y1="36" x2="75" y2="38" stroke="#888" stroke-width="2.5"/>
  <line x1="75" y1="38" x2="78" y2="56" stroke="#888" stroke-width="2.5"/>
  <!-- bar near chest height -->
  <line x1="37" y1="56" x2="83" y2="56" stroke="#aaa" stroke-width="3"/>
  <line x1="60" y1="62" x2="52" y2="82" stroke="#888" stroke-width="2.5"/>
  <line x1="52" y1="82" x2="50" y2="100" stroke="#888" stroke-width="2.5"/>
  <line x1="60" y1="62" x2="68" y2="82" stroke="#888" stroke-width="2.5"/>
  <line x1="68" y1="82" x2="70" y2="100" stroke="#888" stroke-width="2.5"/>

  <line x1="120" y1="5" x2="120" y2="105" stroke="#e0e0e0" stroke-width="1" stroke-dasharray="4,3"/>

  <text x="180" y="8" font-size="8" fill="#999" text-anchor="middle" font-family="sans-serif">Lockout</text>
  <line x1="180" y1="0" x2="180" y2="24" stroke="#ccc" stroke-width="1.5" stroke-dasharray="3,2"/>
  <circle cx="180" cy="16" r="7" stroke="#888" stroke-width="2" fill="none"/>
  <line x1="180" y1="23" x2="180" y2="62" stroke="#888" stroke-width="2.5"/>
  <!-- arms fully extended down - triceps accent -->
  <line x1="180" y1="36" x2="166" y2="38" stroke="#888" stroke-width="2.5"/>
  <line x1="166" y1="38" x2="162" y2="74" stroke="#E83B3B" stroke-width="3"/>
  <line x1="180" y1="36" x2="194" y2="38" stroke="#888" stroke-width="2.5"/>
  <line x1="194" y1="38" x2="198" y2="74" stroke="#E83B3B" stroke-width="3"/>
  <!-- bar pushed down -->
  <line x1="154" y1="76" x2="204" y2="76" stroke="#E83B3B" stroke-width="3"/>
  <line x1="180" y1="62" x2="172" y2="82" stroke="#888" stroke-width="2.5"/>
  <line x1="172" y1="82" x2="170" y2="100" stroke="#888" stroke-width="2.5"/>
  <line x1="180" y1="62" x2="188" y2="82" stroke="#888" stroke-width="2.5"/>
  <line x1="188" y1="82" x2="190" y2="100" stroke="#888" stroke-width="2.5"/>
</svg>`,
  },

  // ── 10. LEG PRESS ─────────────────────────────────────────
  leg_press: {
    name: 'Leg Press',
    muscle: 'Quads · Glutes · Hamstrings',
    equipment: 'Leg Press Machine',
    steps: [
      'Sit in the machine with your back flat against the pad; position feet hip-width on the platform.',
      'Foot position higher = more glutes/hams; lower = more quad emphasis.',
      'Release the safety handles and lower the platform by bending your knees to ~90°.',
      'Press the platform away by pushing through your whole foot — do not lock knees hard at the top.',
      'Control the descent; do not let the platform crash into the bottom stop.',
    ],
    mistakes: [
      'Knees caving inward — actively push knees out in line with toes throughout.',
      'Lifting your hips off the seat — means you\'ve gone too deep for your flexibility.',
      'Locking out aggressively — keep a micro-bend at the top to maintain tension.',
    ],
    svg: `<svg viewBox="0 0 240 110" fill="none" xmlns="http://www.w3.org/2000/svg">
  <text x="60" y="8" font-size="8" fill="#999" text-anchor="middle" font-family="sans-serif">Bottom</text>
  <!-- machine seat reclined -->
  <rect x="18" y="55" width="50" height="12" rx="3" fill="#ddd"/>
  <rect x="14" y="45" width="12" height="22" rx="3" fill="#ddd"/>
  <!-- platform angled -->
  <line x1="70" y1="26" x2="100" y2="52" stroke="#ccc" stroke-width="4"/>
  <!-- figure reclined -->
  <circle cx="28" cy="52" r="7" stroke="#888" stroke-width="2" fill="none"/>
  <line x1="35" y1="52" x2="62" y2="52" stroke="#888" stroke-width="2.5"/>
  <!-- legs bent (knees near chest) - accent -->
  <line x1="62" y1="52" x2="74" y2="38" stroke="#E83B3B" stroke-width="2.5"/>
  <line x1="74" y1="38" x2="86" y2="28" stroke="#E83B3B" stroke-width="2.5"/>
  <circle cx="74" cy="38" r="3" fill="#E83B3B"/>
  <!-- second leg -->
  <line x1="62" y1="55" x2="74" y2="44" stroke="#E83B3B" stroke-width="2.5"/>
  <line x1="74" y1="44" x2="88" y2="34" stroke="#E83B3B" stroke-width="2.5"/>

  <line x1="120" y1="5" x2="120" y2="105" stroke="#e0e0e0" stroke-width="1" stroke-dasharray="4,3"/>

  <text x="180" y="8" font-size="8" fill="#999" text-anchor="middle" font-family="sans-serif">Extended</text>
  <rect x="138" y="55" width="50" height="12" rx="3" fill="#ddd"/>
  <rect x="134" y="45" width="12" height="22" rx="3" fill="#ddd"/>
  <!-- platform extended further away -->
  <line x1="198" y1="18" x2="220" y2="38" stroke="#ccc" stroke-width="4"/>
  <circle cx="148" cy="52" r="7" stroke="#888" stroke-width="2" fill="none"/>
  <line x1="155" y1="52" x2="182" y2="52" stroke="#888" stroke-width="2.5"/>
  <!-- legs extended -->
  <line x1="182" y1="52" x2="200" y2="36" stroke="#888" stroke-width="2.5"/>
  <line x1="200" y1="36" x2="212" y2="24" stroke="#888" stroke-width="2.5"/>
  <line x1="182" y1="55" x2="200" y2="40" stroke="#888" stroke-width="2.5"/>
  <line x1="200" y1="40" x2="214" y2="28" stroke="#888" stroke-width="2.5"/>
</svg>`,
  },

  // ── 11. ROMANIAN DEADLIFT ─────────────────────────────────
  rdl: {
    name: 'Romanian Deadlift',
    muscle: 'Hamstrings · Glutes · Lower Back',
    equipment: 'Barbell or Dumbbells',
    steps: [
      'Hold the bar at hip height with an overhand grip, feet hip-width apart.',
      'Begin the movement by pushing your hips back, not bending the knees significantly.',
      'Let the bar slide down the front of your thighs; keep it close to your body.',
      'Lower until you feel a strong hamstring stretch (typically bar at mid-shin).',
      'Drive your hips forward to return to standing — squeeze glutes at the top.',
    ],
    mistakes: [
      'Bending knees too much — RDL is a hip hinge, not a squat movement.',
      'Rounding the lower back — maintain a flat spine throughout the entire range.',
      'Bar drifting away from your body — keep it grazing your legs the whole way down.',
    ],
    svg: `<svg viewBox="0 0 240 110" fill="none" xmlns="http://www.w3.org/2000/svg">
  <text x="60" y="8" font-size="8" fill="#999" text-anchor="middle" font-family="sans-serif">Standing</text>
  <!-- bar at hips -->
  <line x1="32" y1="56" x2="92" y2="56" stroke="#aaa" stroke-width="4"/>
  <circle cx="32" cy="56" r="4" fill="#bbb"/>
  <circle cx="92" cy="56" r="4" fill="#bbb"/>
  <circle cx="60" cy="14" r="7" stroke="#888" stroke-width="2" fill="none"/>
  <line x1="60" y1="21" x2="60" y2="60" stroke="#888" stroke-width="2.5"/>
  <line x1="60" y1="38" x2="44" y2="54" stroke="#888" stroke-width="2.5"/>
  <line x1="60" y1="38" x2="76" y2="54" stroke="#888" stroke-width="2.5"/>
  <line x1="60" y1="60" x2="52" y2="80" stroke="#888" stroke-width="2.5"/>
  <line x1="52" y1="80" x2="50" y2="100" stroke="#888" stroke-width="2.5"/>
  <line x1="60" y1="60" x2="68" y2="80" stroke="#888" stroke-width="2.5"/>
  <line x1="68" y1="80" x2="70" y2="100" stroke="#888" stroke-width="2.5"/>
  <line x1="35" y1="100" x2="85" y2="100" stroke="#ddd" stroke-width="1.5"/>

  <line x1="120" y1="5" x2="120" y2="105" stroke="#e0e0e0" stroke-width="1" stroke-dasharray="4,3"/>

  <text x="180" y="8" font-size="8" fill="#999" text-anchor="middle" font-family="sans-serif">Hinge</text>
  <circle cx="172" cy="22" r="7" stroke="#888" stroke-width="2" fill="none"/>
  <!-- torso hinged far forward -->
  <line x1="172" y1="29" x2="185" y2="64" stroke="#888" stroke-width="2.5"/>
  <!-- arms holding bar low - hamstrings accent -->
  <line x1="179" y1="46" x2="168" y2="64" stroke="#888" stroke-width="2.5"/>
  <line x1="168" y1="64" x2="162" y2="82" stroke="#888" stroke-width="2.5"/>
  <line x1="179" y1="46" x2="192" y2="64" stroke="#888" stroke-width="2.5"/>
  <line x1="192" y1="64" x2="198" y2="82" stroke="#888" stroke-width="2.5"/>
  <!-- bar low - near shins -->
  <line x1="150" y1="84" x2="210" y2="84" stroke="#E83B3B" stroke-width="4"/>
  <circle cx="150" cy="84" r="4" fill="#E83B3B" opacity=".7"/>
  <circle cx="210" cy="84" r="4" fill="#E83B3B" opacity=".7"/>
  <!-- legs (slight knee bend) - hamstring highlight -->
  <line x1="185" y1="64" x2="175" y2="88" stroke="#E83B3B" stroke-width="2.5"/>
  <line x1="175" y1="88" x2="173" y2="102" stroke="#888" stroke-width="2.5"/>
  <line x1="185" y1="64" x2="196" y2="88" stroke="#E83B3B" stroke-width="2.5"/>
  <line x1="196" y1="88" x2="198" y2="102" stroke="#888" stroke-width="2.5"/>
</svg>`,
  },

  // ── 12. FACE PULL ─────────────────────────────────────────
  face_pull: {
    name: 'Face Pull',
    muscle: 'Rear Delts · Rotator Cuff · Upper Traps',
    equipment: 'Cable Machine (rope)',
    steps: [
      'Attach a rope to a high cable; set it slightly above head height.',
      'Grip both ends of the rope with palms facing the floor, step back to create tension.',
      'Pull the rope toward your face, aiming for your ears/temples — not your chin.',
      'As you pull, drive your elbows up and out so they end up high and wide.',
      'Pause at the peak contraction, then extend arms slowly back to the start.',
    ],
    mistakes: [
      'Pulling to your chin — this trains the wrong muscles; aim for your ears.',
      'Elbows dropping below the cable line — keeps elbows high throughout the pull.',
      'Using too much weight — keep it light and focus on the rear delt contraction.',
    ],
    svg: `<svg viewBox="0 0 240 110" fill="none" xmlns="http://www.w3.org/2000/svg">
  <text x="60" y="8" font-size="8" fill="#999" text-anchor="middle" font-family="sans-serif">Arms extended</text>
  <!-- cable anchor high -->
  <circle cx="8" cy="30" r="4" fill="#ccc"/>
  <circle cx="60" cy="16" r="7" stroke="#888" stroke-width="2" fill="none"/>
  <line x1="60" y1="23" x2="60" y2="62" stroke="#888" stroke-width="2.5"/>
  <!-- arms extended toward cable -->
  <line x1="60" y1="36" x2="40" y2="32" stroke="#888" stroke-width="2.5"/>
  <line x1="40" y1="32" x2="16" y2="30" stroke="#888" stroke-width="2.5"/>
  <line x1="60" y1="36" x2="40" y2="40" stroke="#888" stroke-width="2.5"/>
  <line x1="40" y1="40" x2="16" y2="32" stroke="#888" stroke-width="2.5"/>
  <!-- rope handles -->
  <circle cx="16" cy="30" r="3" fill="#bbb"/>
  <circle cx="16" cy="32" r="3" fill="#bbb"/>
  <line x1="60" y1="62" x2="52" y2="82" stroke="#888" stroke-width="2.5"/>
  <line x1="52" y1="82" x2="50" y2="100" stroke="#888" stroke-width="2.5"/>
  <line x1="60" y1="62" x2="68" y2="82" stroke="#888" stroke-width="2.5"/>
  <line x1="68" y1="82" x2="70" y2="100" stroke="#888" stroke-width="2.5"/>

  <line x1="120" y1="5" x2="120" y2="105" stroke="#e0e0e0" stroke-width="1" stroke-dasharray="4,3"/>

  <text x="180" y="8" font-size="8" fill="#999" text-anchor="middle" font-family="sans-serif">Pulled to ears</text>
  <circle cx="235" cy="30" r="4" fill="#ccc"/>
  <circle cx="180" cy="16" r="7" stroke="#888" stroke-width="2" fill="none"/>
  <line x1="180" y1="23" x2="180" y2="62" stroke="#888" stroke-width="2.5"/>
  <!-- elbows flared wide and high - rear delt accent -->
  <line x1="180" y1="36" x2="158" y2="26" stroke="#E83B3B" stroke-width="2.5"/>
  <line x1="158" y1="26" x2="166" y2="20" stroke="#E83B3B" stroke-width="2.5"/>
  <line x1="180" y1="36" x2="202" y2="26" stroke="#E83B3B" stroke-width="2.5"/>
  <line x1="202" y1="26" x2="194" y2="20" stroke="#E83B3B" stroke-width="2.5"/>
  <!-- rope at face -->
  <circle cx="166" cy="20" r="3" fill="#E83B3B"/>
  <circle cx="194" cy="20" r="3" fill="#E83B3B"/>
  <!-- cables to anchor -->
  <line x1="166" y1="20" x2="235" y2="30" stroke="#ccc" stroke-width="1.5" stroke-dasharray="3,2"/>
  <line x1="194" y1="20" x2="235" y2="30" stroke="#ccc" stroke-width="1.5" stroke-dasharray="3,2"/>
  <line x1="180" y1="62" x2="172" y2="82" stroke="#888" stroke-width="2.5"/>
  <line x1="172" y1="82" x2="170" y2="100" stroke="#888" stroke-width="2.5"/>
  <line x1="180" y1="62" x2="188" y2="82" stroke="#888" stroke-width="2.5"/>
  <line x1="188" y1="82" x2="190" y2="100" stroke="#888" stroke-width="2.5"/>
</svg>`,
  },

  // ── 13. LATERAL RAISE ─────────────────────────────────────
  lateral_raise: {
    name: 'Lateral Raise',
    muscle: 'Lateral Deltoid',
    equipment: 'Dumbbells or Cables',
    steps: [
      'Stand with feet shoulder-width, dumbbells hanging at your sides with a neutral grip.',
      'Slight bend in the elbows (~15°); keep that angle fixed throughout the movement.',
      'Raise the dumbbells out to your sides in an arc until level with your shoulders.',
      'Lead with your elbows and pinkies — imagine pouring a jug of water as you lift.',
      'Lower slowly over 2–3 seconds back to the start — the negative is just as important.',
    ],
    mistakes: [
      'Using momentum and shrugging — keep your traps depressed and move with control.',
      'Raising above shoulder level — going higher shifts load to the traps, not delts.',
      'Arm too straight — the fixed slight bend protects your elbow joint.',
    ],
    svg: `<svg viewBox="0 0 240 110" fill="none" xmlns="http://www.w3.org/2000/svg">
  <text x="60" y="8" font-size="8" fill="#999" text-anchor="middle" font-family="sans-serif">Start</text>
  <circle cx="60" cy="16" r="7" stroke="#888" stroke-width="2" fill="none"/>
  <line x1="60" y1="23" x2="60" y2="62" stroke="#888" stroke-width="2.5"/>
  <!-- arms at sides -->
  <line x1="60" y1="34" x2="44" y2="50" stroke="#888" stroke-width="2.5"/>
  <line x1="44" y1="50" x2="42" y2="68" stroke="#888" stroke-width="2.5"/>
  <rect x="36" y="66" width="12" height="5" rx="2" fill="#bbb"/>
  <line x1="60" y1="34" x2="76" y2="50" stroke="#888" stroke-width="2.5"/>
  <line x1="76" y1="50" x2="78" y2="68" stroke="#888" stroke-width="2.5"/>
  <rect x="72" y="66" width="12" height="5" rx="2" fill="#bbb"/>
  <line x1="60" y1="62" x2="52" y2="82" stroke="#888" stroke-width="2.5"/>
  <line x1="52" y1="82" x2="50" y2="100" stroke="#888" stroke-width="2.5"/>
  <line x1="60" y1="62" x2="68" y2="82" stroke="#888" stroke-width="2.5"/>
  <line x1="68" y1="82" x2="70" y2="100" stroke="#888" stroke-width="2.5"/>

  <line x1="120" y1="5" x2="120" y2="105" stroke="#e0e0e0" stroke-width="1" stroke-dasharray="4,3"/>

  <text x="180" y="8" font-size="8" fill="#999" text-anchor="middle" font-family="sans-serif">Raised</text>
  <circle cx="180" cy="16" r="7" stroke="#888" stroke-width="2" fill="none"/>
  <line x1="180" y1="23" x2="180" y2="62" stroke="#888" stroke-width="2.5"/>
  <!-- arms raised to shoulder level - accent delts -->
  <line x1="180" y1="34" x2="152" y2="42" stroke="#E83B3B" stroke-width="2.5"/>
  <line x1="152" y1="42" x2="140" y2="46" stroke="#E83B3B" stroke-width="2.5"/>
  <rect x="130" y="43" width="12" height="5" rx="2" fill="#E83B3B" opacity=".7"/>
  <line x1="180" y1="34" x2="208" y2="42" stroke="#E83B3B" stroke-width="2.5"/>
  <line x1="208" y1="42" x2="220" y2="46" stroke="#E83B3B" stroke-width="2.5"/>
  <rect x="218" y="43" width="12" height="5" rx="2" fill="#E83B3B" opacity=".7"/>
  <line x1="180" y1="62" x2="172" y2="82" stroke="#888" stroke-width="2.5"/>
  <line x1="172" y1="82" x2="170" y2="100" stroke="#888" stroke-width="2.5"/>
  <line x1="180" y1="62" x2="188" y2="82" stroke="#888" stroke-width="2.5"/>
  <line x1="188" y1="82" x2="190" y2="100" stroke="#888" stroke-width="2.5"/>
</svg>`,
  },

  // ── 14. LEG CURL ──────────────────────────────────────────
  leg_curl: {
    name: 'Lying Leg Curl',
    muscle: 'Hamstrings (biceps femoris)',
    equipment: 'Leg Curl Machine',
    steps: [
      'Lie face down on the machine; position the pad just above your heels, hips flat on the bench.',
      'Grip the handles to stabilise your upper body — don\'t let hips rise.',
      'Curl your heels toward your glutes as far as the machine allows.',
      'Squeeze the hamstrings hard at peak contraction, hold 1 second.',
      'Lower the weight slowly until legs are nearly straight, maintaining tension.',
    ],
    mistakes: [
      'Hips lifting off the pad — reduces hamstring isolation and stresses the lower back.',
      'Not reaching full range — stop short of full extension risks hamstring cramps.',
      'Rushing the eccentric — slow the lowering phase for maximum muscle stimulus.',
    ],
    svg: `<svg viewBox="0 0 240 110" fill="none" xmlns="http://www.w3.org/2000/svg">
  <text x="60" y="8" font-size="8" fill="#999" text-anchor="middle" font-family="sans-serif">Start (leg straight)</text>
  <!-- machine bench -->
  <rect x="15" y="52" width="90" height="10" rx="3" fill="#ddd"/>
  <!-- figure prone -->
  <circle cx="22" cy="46" r="7" stroke="#888" stroke-width="2" fill="none"/>
  <line x1="29" y1="46" x2="80" y2="46" stroke="#888" stroke-width="2.5"/>
  <!-- arms holding handles -->
  <line x1="38" y1="46" x2="35" y2="38" stroke="#888" stroke-width="2"/>
  <line x1="48" y1="46" x2="45" y2="38" stroke="#888" stroke-width="2"/>
  <!-- legs straight out -->
  <line x1="80" y1="46" x2="95" y2="48" stroke="#888" stroke-width="2.5"/>
  <line x1="95" y1="48" x2="105" y2="50" stroke="#888" stroke-width="2.5"/>
  <!-- pad on heels -->
  <circle cx="106" cy="50" r="4" fill="#bbb"/>

  <line x1="120" y1="5" x2="120" y2="105" stroke="#e0e0e0" stroke-width="1" stroke-dasharray="4,3"/>

  <text x="180" y="8" font-size="8" fill="#999" text-anchor="middle" font-family="sans-serif">Curled</text>
  <rect x="130" y="52" width="90" height="10" rx="3" fill="#ddd"/>
  <circle cx="138" cy="46" r="7" stroke="#888" stroke-width="2" fill="none"/>
  <line x1="145" y1="46" x2="195" y2="46" stroke="#888" stroke-width="2.5"/>
  <line x1="155" y1="46" x2="152" y2="38" stroke="#888" stroke-width="2"/>
  <line x1="165" y1="46" x2="162" y2="38" stroke="#888" stroke-width="2"/>
  <!-- leg curled - hamstring accent -->
  <line x1="195" y1="46" x2="205" y2="46" stroke="#888" stroke-width="2.5"/>
  <line x1="205" y1="46" x2="214" y2="30" stroke="#E83B3B" stroke-width="2.5"/>
  <!-- pad at curled position -->
  <circle cx="215" cy="28" r="4" fill="#E83B3B" opacity=".7"/>
  <!-- knee dot -->
  <circle cx="205" cy="46" r="3" fill="#E83B3B"/>
</svg>`,
  },

  // ── 15. LEG EXTENSION ─────────────────────────────────────
  leg_ext: {
    name: 'Leg Extension',
    muscle: 'Quadriceps',
    equipment: 'Leg Extension Machine',
    steps: [
      'Sit in the machine with your back against the pad, thighs fully supported on the seat.',
      'Position the pad on your shins just above the ankles; adjust the seat so knees align with the pivot.',
      'Extend your legs by straightening the knees until your legs are nearly parallel to the floor.',
      'Hold the peak contraction for 1 second, squeezing the quads.',
      'Lower with control — don\'t drop the weight — until back to 90°.',
    ],
    mistakes: [
      'Sitting too far forward — thighs must be fully supported to protect the knee joint.',
      'Hyper-extending the knees forcefully — control the top of the movement.',
      'Rocking the hips — grip the handles and keep your back firmly against the pad.',
    ],
    svg: `<svg viewBox="0 0 240 110" fill="none" xmlns="http://www.w3.org/2000/svg">
  <text x="60" y="8" font-size="8" fill="#999" text-anchor="middle" font-family="sans-serif">Bent</text>
  <!-- machine seat -->
  <rect x="20" y="40" width="55" height="12" rx="3" fill="#ddd"/>
  <rect x="20" y="28" width="12" height="24" rx="3" fill="#ddd"/>
  <!-- figure seated -->
  <circle cx="35" cy="32" r="7" stroke="#888" stroke-width="2" fill="none"/>
  <line x1="35" y1="39" x2="68" y2="42" stroke="#888" stroke-width="2.5"/>
  <!-- leg hanging down at 90 -->
  <line x1="68" y1="42" x2="70" y2="62" stroke="#888" stroke-width="2.5"/>
  <line x1="70" y1="62" x2="70" y2="82" stroke="#888" stroke-width="2.5"/>
  <line x1="68" y1="44" x2="72" y2="64" stroke="#888" stroke-width="2.5"/>
  <line x1="72" y1="64" x2="72" y2="84" stroke="#888" stroke-width="2.5"/>
  <!-- pad on shin -->
  <circle cx="70" cy="82" r="4" fill="#bbb"/>
  <!-- arms gripping handles -->
  <line x1="35" y1="42" x2="28" y2="50" stroke="#888" stroke-width="2"/>
  <line x1="35" y1="42" x2="42" y2="50" stroke="#888" stroke-width="2"/>

  <line x1="120" y1="5" x2="120" y2="105" stroke="#e0e0e0" stroke-width="1" stroke-dasharray="4,3"/>

  <text x="180" y="8" font-size="8" fill="#999" text-anchor="middle" font-family="sans-serif">Extended</text>
  <rect x="140" y="40" width="55" height="12" rx="3" fill="#ddd"/>
  <rect x="140" y="28" width="12" height="24" rx="3" fill="#ddd"/>
  <circle cx="155" cy="32" r="7" stroke="#888" stroke-width="2" fill="none"/>
  <line x1="155" y1="39" x2="188" y2="42" stroke="#888" stroke-width="2.5"/>
  <!-- legs extended outward - quad accent -->
  <line x1="188" y1="42" x2="195" y2="46" stroke="#888" stroke-width="2.5"/>
  <line x1="195" y1="46" x2="218" y2="46" stroke="#E83B3B" stroke-width="2.5"/>
  <line x1="188" y1="44" x2="195" y2="48" stroke="#888" stroke-width="2.5"/>
  <line x1="195" y1="48" x2="220" y2="48" stroke="#E83B3B" stroke-width="2.5"/>
  <!-- pad at foot -->
  <circle cx="220" cy="47" r="4" fill="#E83B3B" opacity=".7"/>
  <!-- knee dot -->
  <circle cx="195" cy="46" r="3" fill="#E83B3B"/>
  <line x1="155" y1="42" x2="148" y2="50" stroke="#888" stroke-width="2"/>
  <line x1="155" y1="42" x2="162" y2="50" stroke="#888" stroke-width="2"/>
</svg>`,
  },

  // ── 16. CALF RAISE ────────────────────────────────────────
  calf_raise: {
    name: 'Calf Raise',
    muscle: 'Gastrocnemius · Soleus',
    equipment: 'Machine or Bodyweight',
    steps: [
      'Stand with the balls of your feet on the edge of a step or calf raise platform.',
      'Start with heels lowered below the step level for a full stretch (dorsiflexion).',
      'Rise up onto your toes as high as possible, squeezing the calves at the top.',
      'Pause 1 second at the peak, then lower slowly back below the step.',
      'Full range of motion — both the stretch at the bottom and the peak contraction — is key.',
    ],
    mistakes: [
      'Half reps — partial range misses both the stretch and the peak contraction.',
      'Bouncing off the bottom — use the stretch but don\'t use momentum to come back up.',
      'Locking out the knees excessively — a tiny knee bend is fine; avoid hyperextension.',
    ],
    svg: `<svg viewBox="0 0 240 110" fill="none" xmlns="http://www.w3.org/2000/svg">
  <text x="60" y="8" font-size="8" fill="#999" text-anchor="middle" font-family="sans-serif">Stretch</text>
  <!-- step platform -->
  <rect x="30" y="82" width="60" height="8" rx="2" fill="#ccc"/>
  <circle cx="60" cy="14" r="7" stroke="#888" stroke-width="2" fill="none"/>
  <line x1="60" y1="21" x2="60" y2="60" stroke="#888" stroke-width="2.5"/>
  <line x1="60" y1="36" x2="45" y2="46" stroke="#888" stroke-width="2"/>
  <line x1="60" y1="36" x2="75" y2="46" stroke="#888" stroke-width="2"/>
  <line x1="60" y1="60" x2="52" y2="78" stroke="#888" stroke-width="2.5"/>
  <!-- heels dropped below platform -->
  <line x1="52" y1="78" x2="50" y2="92" stroke="#888" stroke-width="2.5"/>
  <line x1="60" y1="60" x2="68" y2="78" stroke="#888" stroke-width="2.5"/>
  <line x1="68" y1="78" x2="70" y2="92" stroke="#888" stroke-width="2.5"/>
  <!-- heel below step line -->
  <circle cx="50" cy="93" r="3" fill="#bbb"/>
  <circle cx="70" cy="93" r="3" fill="#bbb"/>

  <line x1="120" y1="5" x2="120" y2="105" stroke="#e0e0e0" stroke-width="1" stroke-dasharray="4,3"/>

  <text x="180" y="8" font-size="8" fill="#999" text-anchor="middle" font-family="sans-serif">Peak</text>
  <rect x="150" y="82" width="60" height="8" rx="2" fill="#ccc"/>
  <circle cx="180" cy="10" r="7" stroke="#888" stroke-width="2" fill="none"/>
  <line x1="180" y1="17" x2="180" y2="56" stroke="#888" stroke-width="2.5"/>
  <line x1="180" y1="32" x2="165" y2="42" stroke="#888" stroke-width="2"/>
  <line x1="180" y1="32" x2="195" y2="42" stroke="#888" stroke-width="2"/>
  <line x1="180" y1="56" x2="172" y2="74" stroke="#888" stroke-width="2.5"/>
  <!-- on toes, heel raised - accent calves -->
  <line x1="172" y1="74" x2="168" y2="80" stroke="#E83B3B" stroke-width="3"/>
  <line x1="168" y1="80" x2="166" y2="76" stroke="#E83B3B" stroke-width="2.5"/>
  <line x1="180" y1="56" x2="188" y2="74" stroke="#888" stroke-width="2.5"/>
  <line x1="188" y1="74" x2="192" y2="80" stroke="#E83B3B" stroke-width="3"/>
  <line x1="192" y1="80" x2="194" y2="76" stroke="#E83B3B" stroke-width="2.5"/>
  <!-- toes on step, heels high -->
  <circle cx="165" cy="77" r="3" fill="#E83B3B"/>
  <circle cx="195" cy="77" r="3" fill="#E83B3B"/>
</svg>`,
  },

  // ── 17. PULL-UP ───────────────────────────────────────────
  pullup: {
    name: 'Pull-Up',
    muscle: 'Lats · Biceps · Rear Delts',
    equipment: 'Pull-Up Bar',
    steps: [
      'Hang from a bar with an overhand grip slightly wider than shoulder-width.',
      'Before pulling, depress your shoulder blades and engage your lats.',
      'Drive your elbows down toward your hips — think "elbows to pockets".',
      'Pull until your chin is clearly above the bar; chest can touch the bar.',
      'Lower under control until arms are fully extended — don\'t drop from the top.',
    ],
    mistakes: [
      'Kipping or swinging — use strict movement to build real pulling strength.',
      'Partial range — start from a dead hang each rep; half reps don\'t count.',
      'Looking straight up — maintain a neutral neck; slight chin tuck is fine.',
    ],
    svg: `<svg viewBox="0 0 240 110" fill="none" xmlns="http://www.w3.org/2000/svg">
  <text x="60" y="8" font-size="8" fill="#999" text-anchor="middle" font-family="sans-serif">Dead hang</text>
  <!-- bar -->
  <rect x="25" y="14" width="70" height="5" rx="2" fill="#aaa"/>
  <circle cx="60" cy="36" r="7" stroke="#888" stroke-width="2" fill="none"/>
  <!-- arms extended overhead -->
  <line x1="60" y1="30" x2="42" y2="18" stroke="#888" stroke-width="2.5"/>
  <line x1="60" y1="30" x2="78" y2="18" stroke="#888" stroke-width="2.5"/>
  <!-- grips on bar -->
  <circle cx="42" cy="17" r="3" fill="#888"/>
  <circle cx="78" cy="17" r="3" fill="#888"/>
  <line x1="60" y1="43" x2="60" y2="75" stroke="#888" stroke-width="2.5"/>
  <line x1="60" y1="75" x2="52" y2="92" stroke="#888" stroke-width="2.5"/>
  <line x1="52" y1="92" x2="50" y2="105" stroke="#888" stroke-width="2.5"/>
  <line x1="60" y1="75" x2="68" y2="92" stroke="#888" stroke-width="2.5"/>
  <line x1="68" y1="92" x2="70" y2="105" stroke="#888" stroke-width="2.5"/>

  <line x1="120" y1="5" x2="120" y2="105" stroke="#e0e0e0" stroke-width="1" stroke-dasharray="4,3"/>

  <text x="180" y="8" font-size="8" fill="#999" text-anchor="middle" font-family="sans-serif">Chin above bar</text>
  <rect x="145" y="14" width="70" height="5" rx="2" fill="#aaa"/>
  <circle cx="180" cy="26" r="7" stroke="#888" stroke-width="2" fill="none"/>
  <!-- arms bent, chin at bar - accent lats -->
  <line x1="180" y1="22" x2="162" y2="18" stroke="#E83B3B" stroke-width="2.5"/>
  <line x1="162" y1="18" x2="158" y2="17" stroke="#E83B3B" stroke-width="2.5"/>
  <line x1="180" y1="22" x2="198" y2="18" stroke="#E83B3B" stroke-width="2.5"/>
  <line x1="198" y1="18" x2="202" y2="17" stroke="#E83B3B" stroke-width="2.5"/>
  <circle cx="158" cy="17" r="3" fill="#E83B3B"/>
  <circle cx="202" cy="17" r="3" fill="#E83B3B"/>
  <line x1="180" y1="33" x2="180" y2="65" stroke="#888" stroke-width="2.5"/>
  <line x1="180" y1="65" x2="168" y2="82" stroke="#888" stroke-width="2.5"/>
  <line x1="168" y1="82" x2="166" y2="98" stroke="#888" stroke-width="2.5"/>
  <line x1="180" y1="65" x2="192" y2="82" stroke="#888" stroke-width="2.5"/>
  <line x1="192" y1="82" x2="194" y2="98" stroke="#888" stroke-width="2.5"/>
</svg>`,
  },

  // ── 18. DIP ───────────────────────────────────────────────
  dips: {
    name: 'Parallel Bar Dip',
    muscle: 'Chest · Triceps · Front Delts',
    equipment: 'Parallel Bars',
    steps: [
      'Support yourself on parallel bars with arms locked out; slight forward lean for chest focus.',
      'Lower your body by bending the elbows, keeping them close to your body (not flared).',
      'Descend until your upper arms are at least parallel to the floor — full range of motion.',
      'Press back up by straightening the arms, driving through the palms.',
      'Keep the forward lean consistent throughout — leaning back shifts the work to triceps.',
    ],
    mistakes: [
      'Elbows flaring wide — keeps them tracking at ~45° from your torso.',
      'Insufficient depth — going only halfway misses the best stretch portion.',
      'Shrugging shoulders at the bottom — depress and retract to protect the shoulder joint.',
    ],
    svg: `<svg viewBox="0 0 240 110" fill="none" xmlns="http://www.w3.org/2000/svg">
  <text x="60" y="8" font-size="8" fill="#999" text-anchor="middle" font-family="sans-serif">Top</text>
  <!-- parallel bars -->
  <line x1="30" y1="44" x2="90" y2="44" stroke="#aaa" stroke-width="4"/>
  <line x1="30" y1="44" x2="30" y2="80" stroke="#bbb" stroke-width="3"/>
  <line x1="90" y1="44" x2="90" y2="80" stroke="#bbb" stroke-width="3"/>
  <!-- figure arms locked out -->
  <circle cx="60" cy="26" r="7" stroke="#888" stroke-width="2" fill="none"/>
  <line x1="60" y1="33" x2="60" y2="56" stroke="#888" stroke-width="2.5"/>
  <!-- arms down on bars -->
  <line x1="60" y1="42" x2="38" y2="44" stroke="#888" stroke-width="2.5"/>
  <line x1="60" y1="42" x2="82" y2="44" stroke="#888" stroke-width="2.5"/>
  <!-- legs hanging -->
  <line x1="60" y1="56" x2="52" y2="76" stroke="#888" stroke-width="2.5"/>
  <line x1="52" y1="76" x2="50" y2="92" stroke="#888" stroke-width="2.5"/>
  <line x1="60" y1="56" x2="68" y2="76" stroke="#888" stroke-width="2.5"/>
  <line x1="68" y1="76" x2="70" y2="92" stroke="#888" stroke-width="2.5"/>

  <line x1="120" y1="5" x2="120" y2="105" stroke="#e0e0e0" stroke-width="1" stroke-dasharray="4,3"/>

  <text x="180" y="8" font-size="8" fill="#999" text-anchor="middle" font-family="sans-serif">Bottom</text>
  <line x1="148" y1="44" x2="208" y2="44" stroke="#aaa" stroke-width="4"/>
  <line x1="148" y1="44" x2="148" y2="80" stroke="#bbb" stroke-width="3"/>
  <line x1="208" y1="44" x2="208" y2="80" stroke="#bbb" stroke-width="3"/>
  <!-- figure dipped low - chest & triceps accent -->
  <circle cx="178" cy="44" r="7" stroke="#888" stroke-width="2" fill="none"/>
  <line x1="178" y1="51" x2="178" y2="72" stroke="#888" stroke-width="2.5"/>
  <!-- arms bent, elbows back -->
  <line x1="178" y1="60" x2="158" y2="44" stroke="#E83B3B" stroke-width="2.5"/>
  <line x1="178" y1="60" x2="198" y2="44" stroke="#E83B3B" stroke-width="2.5"/>
  <!-- elbows high and back -->
  <circle cx="158" cy="44" r="3" fill="#E83B3B"/>
  <circle cx="198" cy="44" r="3" fill="#E83B3B"/>
  <!-- legs hanging -->
  <line x1="178" y1="72" x2="170" y2="90" stroke="#888" stroke-width="2.5"/>
  <line x1="170" y1="90" x2="168" y2="106" stroke="#888" stroke-width="2.5"/>
  <line x1="178" y1="72" x2="186" y2="90" stroke="#888" stroke-width="2.5"/>
  <line x1="186" y1="90" x2="188" y2="106" stroke="#888" stroke-width="2.5"/>
</svg>`,
  },

  // ── 19. PLANK ─────────────────────────────────────────────
  pushup: {
    name: 'Plank / Push-Up',
    muscle: 'Core · Chest · Shoulders · Triceps',
    equipment: 'Bodyweight',
    steps: [
      'Place forearms (or hands for push-up) on the floor, elbows under shoulders.',
      'Extend your legs behind you, balancing on your toes — body forms a straight line.',
      'Squeeze your glutes and brace your core as if bracing for a punch.',
      'Keep your head in a neutral position — don\'t drop it or look up.',
      'For push-up: lower chest to floor, elbows at 45°, then press back up.',
    ],
    mistakes: [
      'Hips sagging or piking up — your body should be arrow-straight.',
      'Holding your breath — breathe steadily in through nose, out through mouth.',
      'Elbow flare in push-ups — keep arms at 45° from the torso, not 90°.',
    ],
    svg: `<svg viewBox="0 0 240 110" fill="none" xmlns="http://www.w3.org/2000/svg">
  <text x="120" y="8" font-size="8" fill="#999" text-anchor="middle" font-family="sans-serif">Plank — body in a straight line</text>
  <!-- floor -->
  <line x1="20" y1="88" x2="220" y2="88" stroke="#ddd" stroke-width="2"/>
  <!-- figure in plank - head left, feet right -->
  <circle cx="35" cy="62" r="7" stroke="#888" stroke-width="2" fill="none"/>
  <!-- forearm on ground -->
  <line x1="42" y1="65" x2="55" y2="72" stroke="#888" stroke-width="2.5"/>
  <line x1="55" y1="72" x2="55" y2="88" stroke="#888" stroke-width="2.5"/>
  <!-- torso straight - accent core -->
  <line x1="42" y1="65" x2="145" y2="72" stroke="#E83B3B" stroke-width="2.5"/>
  <!-- second forearm -->
  <line x1="75" y1="68" x2="75" y2="88" stroke="#888" stroke-width="2.5"/>
  <!-- hip -->
  <circle cx="145" cy="72" r="3" fill="#888"/>
  <!-- legs horizontal straight -->
  <line x1="145" y1="72" x2="185" y2="78" stroke="#888" stroke-width="2.5"/>
  <line x1="185" y1="78" x2="205" y2="83" stroke="#888" stroke-width="2.5"/>
  <!-- toes on floor -->
  <circle cx="205" cy="84" r="3" fill="#888"/>
  <!-- straight line indicator -->
  <line x1="35" y1="65" x2="205" y2="82" stroke="#E83B3B" stroke-width="1" stroke-dasharray="4,2" opacity=".5"/>
  <!-- elbow dots -->
  <circle cx="55" cy="72" r="3" fill="#888"/>
  <circle cx="75" cy="68" r="3" fill="#888"/>
</svg>`,
  },

  // ── 20. SEATED CABLE ROW ─────────────────────────────────
  seated_row: {
    name: 'Seated Cable Row',
    muscle: 'Mid Back · Lats · Biceps',
    equipment: 'Cable Machine',
    steps: [
      'Sit on the bench, feet on the footrests, knees slightly bent.',
      'Reach forward to grip the handle, letting the weight pull you slightly forward — this is your full stretch.',
      'Sit tall, brace your core, then drive your elbows back while retracting your shoulder blades.',
      'Pull the handle to your lower chest / upper abdomen; elbows should pass your torso.',
      'Hold 1 second at the contracted position, then extend arms slowly back to the stretch.',
    ],
    mistakes: [
      'Rocking back and forth — use a slight stable lean only; no swinging.',
      'Pulling with biceps only — initiate with the shoulder blades, then let the arms follow.',
      'Shrugging shoulders — actively depress and retract the scapulae throughout.',
    ],
    svg: `<svg viewBox="0 0 240 110" fill="none" xmlns="http://www.w3.org/2000/svg">
  <text x="60" y="8" font-size="8" fill="#999" text-anchor="middle" font-family="sans-serif">Stretch</text>
  <!-- cable from left -->
  <circle cx="8" cy="50" r="4" fill="#ccc"/>
  <!-- bench -->
  <rect x="30" y="62" width="60" height="8" rx="3" fill="#ddd"/>
  <line x1="40" y1="70" x2="38" y2="90" stroke="#bbb" stroke-width="2"/>
  <line x1="80" y1="70" x2="82" y2="90" stroke="#bbb" stroke-width="2"/>
  <!-- footrest -->
  <line x1="22" y1="78" x2="22" y2="90" stroke="#bbb" stroke-width="2"/>
  <line x1="15" y1="88" x2="30" y2="88" stroke="#bbb" stroke-width="2.5"/>
  <!-- figure leaning forward, arms extended -->
  <circle cx="75" cy="44" r="7" stroke="#888" stroke-width="2" fill="none"/>
  <line x1="75" y1="51" x2="60" y2="64" stroke="#888" stroke-width="2.5"/>
  <!-- arms reaching forward -->
  <line x1="70" y1="56" x2="42" y2="52" stroke="#888" stroke-width="2.5"/>
  <line x1="42" y1="52" x2="14" y2="50" stroke="#888" stroke-width="2.5"/>
  <!-- cable to handle -->
  <line x1="14" y1="50" x2="8" y2="50" stroke="#ccc" stroke-width="1.5" stroke-dasharray="3,2"/>
  <!-- legs on footrests -->
  <line x1="60" y1="64" x2="42" y2="66" stroke="#888" stroke-width="2.5"/>
  <line x1="42" y1="66" x2="24" y2="66" stroke="#888" stroke-width="2.5"/>
  <line x1="60" y1="66" x2="44" y2="70" stroke="#888" stroke-width="2.5"/>
  <line x1="44" y1="70" x2="24" y2="70" stroke="#888" stroke-width="2.5"/>

  <line x1="120" y1="5" x2="120" y2="105" stroke="#e0e0e0" stroke-width="1" stroke-dasharray="4,3"/>

  <text x="180" y="8" font-size="8" fill="#999" text-anchor="middle" font-family="sans-serif">Contracted</text>
  <circle cx="228" cy="50" r="4" fill="#ccc"/>
  <rect x="148" y="62" width="60" height="8" rx="3" fill="#ddd"/>
  <line x1="158" y1="70" x2="156" y2="90" stroke="#bbb" stroke-width="2"/>
  <line x1="198" y1="70" x2="200" y2="90" stroke="#bbb" stroke-width="2"/>
  <line x1="140" y1="78" x2="140" y2="90" stroke="#bbb" stroke-width="2"/>
  <line x1="132" y1="88" x2="148" y2="88" stroke="#bbb" stroke-width="2.5"/>
  <!-- figure upright, elbows back - back accent -->
  <circle cx="188" cy="42" r="7" stroke="#888" stroke-width="2" fill="none"/>
  <line x1="188" y1="49" x2="178" y2="64" stroke="#888" stroke-width="2.5"/>
  <!-- arms pulled back, elbows behind torso -->
  <line x1="184" y1="54" x2="162" y2="52" stroke="#E83B3B" stroke-width="2.5"/>
  <line x1="162" y1="52" x2="152" y2="55" stroke="#E83B3B" stroke-width="2.5"/>
  <!-- handle at abdomen -->
  <circle cx="152" cy="55" r="4" fill="#E83B3B" opacity=".7"/>
  <!-- cable to anchor -->
  <line x1="152" y1="55" x2="228" y2="50" stroke="#ccc" stroke-width="1.5" stroke-dasharray="3,2"/>
  <!-- legs -->
  <line x1="178" y1="64" x2="160" y2="66" stroke="#888" stroke-width="2.5"/>
  <line x1="160" y1="66" x2="142" y2="66" stroke="#888" stroke-width="2.5"/>
  <line x1="178" y1="66" x2="160" y2="70" stroke="#888" stroke-width="2.5"/>
  <line x1="160" y1="70" x2="142" y2="70" stroke="#888" stroke-width="2.5"/>
</svg>`,
  },

};
