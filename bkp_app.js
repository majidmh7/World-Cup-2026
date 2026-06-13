// ---> PLAK HIER JOUW GOOGLE SCRIPT LINK TUSSEN DE AANHALINGSTEKENS <---
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwsvpBcZFTEWBdVvskYtM1slnLNi116ru5zS7v6PdVjBIF22KXoXTPvYlXyJpXJMa6E/exec'; 

const rawGroups = {
    A: [ [{nl: "Mexico", es: "México"}, "🇲🇽"], [{nl: "Zuid-Afrika", es: "Sudáfrica"}, "🇿🇦"], [{nl: "Zuid-Korea", es: "Corea del Sur"}, "🇰🇷"], [{nl: "Tsjechië", es: "Rep. Checa"}, "🇨🇿"] ],
    B: [ [{nl: "Canada", es: "Canadá"}, "🇨🇦"], [{nl: "Bosnië & Herz.", es: "Bosnia y Herz."}, "🇧🇦"], [{nl: "Qatar", es: "Catar"}, "🇶🇦"], [{nl: "Zwitserland", es: "Suiza"}, "🇨🇭"] ],
    C: [ [{nl: "Brazilië", es: "Brasil"}, "🇧🇷"], [{nl: "Marokko", es: "Marruecos"}, "🇲🇦"], [{nl: "Haïti", es: "Haití"}, "🇭🇹"], [{nl: "Schotland", es: "Escocia"}, "🏴󠁧󠁢󠁳󠁣󠁴󠁿"] ],
    D: [ [{nl: "Verenigde Staten", es: "Estados Unidos"}, "🇺🇸"], [{nl: "Paraguay", es: "Paraguay"}, "🇵🇾"], [{nl: "Australië", es: "Australia"}, "🇦🇺"], [{nl: "Turkije", es: "Turquía"}, "🇹🇷"] ],
    E: [ [{nl: "Duitsland", es: "Alemania"}, "🇩🇪"], [{nl: "Curaçao", es: "Curazao"}, "🇨🇼"], [{nl: "Ivoorkust", es: "Costa de Marfil"}, "🇨🇮"], [{nl: "Ecuador", es: "Ecuador"}, "🇪🇨"] ],
    F: [ [{nl: "Nederland", es: "Países Bajos"}, "🇳🇱"], [{nl: "Japan", es: "Japón"}, "🇯🇵"], [{nl: "Zweden", es: "Suecia"}, "🇸🇪"], [{nl: "Tunesië", es: "Túnez"}, "🇹🇳"] ],
    G: [ [{nl: "België", es: "Bélgica"}, "🇧🇪"], [{nl: "Egypte", es: "Egipto"}, "🇪🇬"], [{nl: "Iran", es: "Irán"}, "🇮🇷"], [{nl: "Nieuw-Zeeland", es: "Nueva Zelanda"}, "🇳🇿"] ],
    H: [ [{nl: "Spanje", es: "España"}, "🇪🇸"], [{nl: "Kaapverdië", es: "Cabo Verde"}, "🇨🇻"], [{nl: "Saoedi-Arabië", es: "Arabia Saudita"}, "🇸🇦"], [{nl: "Uruguay", es: "Uruguay"}, "🇺🇾"] ],
    I: [ [{nl: "Frankrijk", es: "Francia"}, "🇫🇷"], [{nl: "Senegal", es: "Senegal"}, "🇸🇳"], [{nl: "Irak", es: "Irak"}, "🇮🇶"], [{nl: "Noorwegen", es: "Noruega"}, "🇳🇴"] ],
    J: [ [{nl: "Argentinië", es: "Argentina"}, "🇦🇷"], [{nl: "Algerije", es: "Argelia"}, "🇩🇿"], [{nl: "Oostenrijk", es: "Austria"}, "🇦🇹"], [{nl: "Jordanië", es: "Jordania"}, "🇯🇴"] ],
    K: [ [{nl: "Portugal", es: "Portugal"}, "🇵🇹"], [{nl: "DR Congo", es: "RD Congo"}, "🇨🇩"], [{nl: "Oezbekistan", es: "Uzbekistán"}, "🇺🇿"], [{nl: "Colombia", es: "Colombia"}, "🇨🇴"] ],
    L: [ [{nl: "Engeland", es: "Inglaterra"}, "🏴󠁧󠁢󠁥󠁮󠁧󠁿"], [{nl: "Kroatië", es: "Croacia"}, "🇭🇷"], [{nl: "Ghana", es: "Ghana"}, "🇬🇭"], [{nl: "Panama", es: "Panamá"}, "🇵🇦"] ]
};

// =========================================================================
// 2. GLOBAL MUTABLE STATE CONTAINERS
// =========================================================================
let currentLang = localStorage.getItem('poule_lang') || 'nl';
let savedDatabaseData = {};
let allGroups = {};
let allTeamsFlat = [];
let fifa3rdPlaceTable = {};

// =========================================================================
// 3. RUN INITIAL SETUP CALLS
// =========================================================================
setupLanguageData();
generateFifa495Table();
// ==========================================
// 4. HET GROTE WOORDENBOEK (VERTALINGEN)
// ==========================================
const translations = {
  en: {
    title: "World Cup 2026 Pool",
    welcome: "Welcome to the Family Pool!",
    instructions: "Fill in the results below.",
    nameTitle: "Who are you?",
    namePlaceholder: "Your name...",
    btnStart: "Start",
    koTitle: "Knock-out Phase",
    koDesc: "Choose the winners of each round.",
    bonusTitle: "Bonus Questions 🎁",
    bonusDesc: "Earn extra points with these predictions!",
    btnSave: "Save",
    btnSaving: "Saving...",
    btnToKnockout: "Knock-outs ➡️",
    btnBack: "⬅️ Back",
    btnToBonus: "To Bonus 🎁",
    btnSaveAll: "Save All ✅",
    alertFillGroup: "Please fill in the group stage!",
    alertSaved: "Everything successfully saved! 🎉",
    alertError: "Error saving. Check your internet connection.",
    alertName: "Please enter a valid name.",
    koSelectCountry: "Select country...",
    koWinMethod: "Method of winning?",
    koWin1: "Winner by 1 goal margin",
    koWin2: "Winner by 2 goals margin",
    koWin3: "Winner by 3+ goals margin",
    koWinPen: "Won after Penalties",
    r32: "Round of 32",
    r16: "Round of 16",
    qf: "Quarter-final",
    sf: "Semi-final",
    f: "The Final 🏆",
    bq1: "1. Who will be the Tournament Top Scorer? (Player Name)",
    bq2: "2. Which country will get the most Yellow/Red cards?",
    bq3: "3. Which country will score the most own goals?",
    bq4: "4. In which minute will the very first goal of the World Cup be scored?",
    bExPlayer: "E.g., Cody Gakpo",
    bExMin: "E.g., 14",
    debugMsg: "🤖 Debug Mode Active: All results randomly filled!",
    koUnknown: "To be determined",
    // New Menu Keys
    menuToday: "📅 Today's Matches",
    menuStandings: "📊 Score Standings",
    menuPredictions: "📝 My Prediction",
    todayTitle: "Today's Matches & Predictions",
    matchday: "Matchday",
    noMatches: "No matches scheduled for today.",
    predBy: "Prediction by",
    pointsEarned: "Points earned",
    exactScore: "Exact Score (+5 pts)",
    outcomeOnly: "Outcome Only (+2 pts)",
    missed: "Missed (0 pts)",
    rank: "Rank",
    participant: "Participant",
    points: "Total Points",
    loading: "Loading data..."
  },
  nl: {
    title: "WK 2026 Poule",
    welcome: "Welkom bij de Familie Poule!",
    instructions: "Vul hieronder de uitslagen in.",
    nameTitle: "Wie ben je?",
    namePlaceholder: "Je naam...",
    btnStart: "Starten",
    koTitle: "Knock-out Fase",
    koDesc: "Kies de winnaars van elke ronde.",
    bonusTitle: "Bonus Vragen 🎁",
    bonusDesc: "Verdien extra punten met deze voorspellingen!",
    btnSave: "Opslaan",
    btnSaving: "Opslaan...",
    btnToKnockout: "Knock-outs ➡️",
    btnBack: "⬅️ Terug",
    btnToBonus: "Naar Bonus 🎁",
    btnSaveAll: "Alles Opslaan ✅",
    alertFillGroup: "Vul de groepsfase in!",
    alertSaved: "Alles succesvol opgeslagen! 🎉",
    alertError: "Fout bij opslaan. Check je internetverbinding.",
    alertName: "Geldige naam a.u.b.",
    koSelectCountry: "Selecteer land...",
    koWinMethod: "Manier van winnen?",
    koWin1: "Winnaar met 1 goal verschil",
    koWin2: "Winnaar met 2 goals verschil",
    koWin3: "Winnaar met 3+ goals verschil",
    koWinPen: "Gewonnen na Penalty's",
    r32: "1/16e Finale (Round of 32)",
    r16: "1/8e Finale (Achtste Finale)",
    qf: "Kwartfinale",
    sf: "Halve Finale",
    f: "De Finale 🏆",
    bq1: "1. Wie wordt de Topscorer van het toernooi? (Spelersnaam)",
    bq2: "2. Welk land pakt de meeste Gele/Rode kaarten?",
    bq3: "3. Welk land scoort de meeste eigen doelpunten?",
    bq4: "4. In welke minuut valt het allereerste doelpunt van het WK?",
    bExPlayer: "Bijv: Cody Gakpo",
    bExMin: "Bijv: 14",
    debugMsg: "🤖 Debug Mode Actief: Alle uitslagen willekeurig ingevuld!",
    koUnknown: "Nog onbekend",
    // New Menu Keys
    menuToday: "📅 Wedstrijden Vandaag",
    menuStandings: "📊 Standen",
    menuPredictions: "📝 Mijn Voorspelling",
    todayTitle: "Wedstrijden van Vandaag & Voorspellingen",
    matchday: "Speelronde",
    noMatches: "Geen wedstrijden gepland voor vandaag.",
    predBy: "Voorspelling van",
    pointsEarned: "Punten verdiend",
    exactScore: "Exacte Uitslag (+5 pts)",
    outcomeOnly: "Alleen Winnaar/Gelijk (+2 pts)",
    missed: "Fout (0 pts)",
    rank: "Positie",
    participant: "Deelnemer",
    points: "Totale Punten",
    loading: "Data laden..."
  },
  es: {
    title: "Quiniela Mundial 2026",
    welcome: "¡Bienvenidos a la Quiniela Familiar!",
    instructions: "Introduce los resultados a continuación.",
    nameTitle: "¿Quién eres?",
    namePlaceholder: "Tu nombre...",
    btnStart: "Empezar",
    koTitle: "Fase Eliminatoria",
    koDesc: "Elige los ganadores de cada ronda.",
    bonusTitle: "Preguntas Extra 🎁",
    bonusDesc: "¡Gana puntos extra con estas predicciones!",
    btnSave: "Guardar",
    btnSaving: "Guardando...",
    btnToKnockout: "Eliminatorias ➡️",
    btnBack: "⬅️ Volver",
    btnToBonus: "Extra 🎁",
    btnSaveAll: "Guardar Todo ✅",
    alertFillGroup: "¡Completa la fase de grupos!",
    alertSaved: "¡Todo guardado con éxito! 🎉",
    alertError: "Error al guardar. Revisa tu conexión.",
    alertName: "Nombre válido por favor.",
    koSelectCountry: "Selecciona un país...",
    koWinMethod: "¿Cómo ganaron?",
    koWin1: "Ganador por 1 gol",
    koWin2: "Ganador por 2 goles",
    koWin3: "Ganador por 3+ goles",
    koWinPen: "Ganador por Penaltis",
    r32: "Dieciseisavos de final",
    r16: "Octavos de final",
    qf: "Cuartos de final",
    sf: "Semifinal",
    f: "La Final 🏆",
    bq1: "1. ¿Quién será el máximo goleador del torneo? (Jugador)",
    bq2: "2. ¿Qué país recibirá más tarjetas amarillas/rojas?",
    bq3: "3. ¿Qué país marcará más autogoles?",
    bq4: "4. ¿En qué minuto se marcará el primer gol del Mundial?",
    bExPlayer: "Ej: Lamine Yamal",
    bExMin: "Ej: 14",
    debugMsg: "🤖 Modo Debug: ¡Resultados aleatorios generados!",
    koUnknown: "Por determinar",
    // New Menu Keys
    menuToday: "📅 Partidos de Hoy",
    menuStandings: "📊 Tabla de Posiciones",
    menuPredictions: "📝 Mi Predicción",
    todayTitle: "Partidos de Hoy y Predicciones",
    matchday: "Jornada",
    noMatches: "No hay partidos programados para hoy.",
    predBy: "Predicción de",
    pointsEarned: "Puntos ganados",
    exactScore: "Resultado Exacto (+5 pts)",
    outcomeOnly: "Solo Ganador/Empate (+2 pts)",
    missed: "Raspado (0 pts)",
    rank: "Puesto",
    participant: "Participante",
    points: "Puntos Totales",
    loading: "Cargando datos..."
  }
};


setupLanguageData();


// ==========================================
// FIFA 2026: 495-RIJEN LOOKUP TABEL
// ==========================================

function generateFifa495Table() {
    // De 8 groepswinnaars die tegen een 3e plek spelen
    const hostGroups = ['E', 'I', 'A', 'L', 'D', 'G', 'B', 'K'];
    const allGroupsList = ['A','B','C','D','E','F','G','H','I','J','K','L'];
    
    // Wiskundige functie om alle 495 mogelijke combinaties van 8 letters te vinden
    function getCombinations(array, size) {
        const result = [];
        function p(t, i) {
            if (t.length === size) { result.push(t); return; }
            if (i + 1 > array.length) return;
            p(t.concat(array[i]), i + 1);
            p(t, i + 1);
        }
        p([], 0);
        return result;
    }

    const all495Combinations = getCombinations(allGroupsList, 8);

    // Bouw de tabel met 495 rijen
    all495Combinations.forEach(combo => {
        const comboKey = combo.join(''); // Bijv: "ABCDEFGH"
        let assignment = {};
        
        function backtrack(index) {
            if (index === 8) return true;
            for (let i = 0; i < 8; i++) {
                const host = hostGroups[i];
                const third = combo[index];
                if (!assignment[host] && third !== host) {
                    assignment[host] = third;
                    if (backtrack(index + 1)) return true;
                    delete assignment[host];
                }
            }
            return false;
        }
        
        backtrack(0);
        fifa3rdPlaceTable[comboKey] = assignment; // Sla de specifieke mapping op in de tabel
    });
}

// Genereer de 495-rijen tabel direct bij het inladen van de code
generateFifa495Table();

// ==========================================
// 2. ALLE 12 GROEPEN (MEERTALIG)
// ==========================================




function setupLanguageData() {
    allGroups = {};
    allTeamsFlat = [];
    for (let key in rawGroups) {
        allGroups[key] = rawGroups[key].map(team => [team[0][currentLang], team[1]]);
        allGroups[key].forEach(t => allTeamsFlat.push(`${t[1]} ${t[0]}`));
    }
    allTeamsFlat.sort();
}

// ==========================================
// 3. INITIALISATIE & NAVIGATIE
// ==========================================
function initApp(lang) {
  console.log("➡️ initApp started with language:", lang);
  currentLang = lang;
  localStorage.setItem('poule_lang', lang);
  
  // 1. Setup Data & Translations
  setupLanguageData();
  applyTranslations();

  // 2. CRITICAL FIX: Draw the match grids into the HTML before loading data!
  const groupStage = document.getElementById('group-stage-screen');
  if (groupStage) {
    if (typeof renderMatches === 'function') {
      console.log("➡️ Drawing match layout...");
      renderMatches();
    }
    if (typeof renderBonus === 'function') {
      renderBonus();
    }
  }
  
  // 3. Screen Management
  const langScreen = document.getElementById('language-screen');
  if (langScreen) {
    langScreen.classList.remove('active');  
    langScreen.style.display = 'none';
  }

  const nameScreen = document.getElementById('name-screen');
  const savedName = localStorage.getItem('poule_user_name');
  
  if (nameScreen) {
    if (savedName) {
      console.log("➡️ Found saved name:", savedName, "- Skipping name screen.");
      nameScreen.classList.remove('active');
      nameScreen.style.display = 'none';
      
      if (groupStage) {
        console.log("➡️ Showing group stage screen.");
        groupStage.style.display = 'block'; 
        groupStage.classList.add('active');
        loadPredictions(); // Now it has boxes to fill!
      }
    } else {
      console.log("➡️ No saved name found. Showing name prompt.");
      nameScreen.style.display = 'block'; 
      nameScreen.classList.add('active');
      
      if (groupStage) {
        groupStage.style.display = 'none';
        groupStage.classList.remove('active');
      }
    }
  } else {
    // Fallback if there is no name screen at all
    if (groupStage) {
      console.log("➡️ Fallback: Showing group stage screen.");
      groupStage.style.display = 'block'; 
      groupStage.classList.add('active');
      loadPredictions();
    }
  }
}

function applyTranslations() {
  const t = translations[currentLang] || translations['nl'];
  if (!t) return;

  const uiTitle = document.getElementById('ui-title');
  if (uiTitle) uiTitle.innerText = t.title;

  const uiWelcome = document.getElementById('ui-welcome');
  if (uiWelcome) uiWelcome.innerText = t.welcome;

  const uiInstructions = document.getElementById('ui-instructions');
  if (uiInstructions) uiInstructions.innerText = t.instructions;

  const uiNameTitle = document.getElementById('ui-name-title');
  if (uiNameTitle) uiNameTitle.innerText = t.nameTitle;

  const nameInput = document.getElementById('name-input');
  if (nameInput) nameInput.placeholder = t.namePlaceholder;

  // FIXED: Looks for either ID to ensure the translation applies
  const startBtn = document.getElementById('ui-btn-start') || document.getElementById('start-btn');
  if (startBtn) startBtn.innerText = t.btnStart;
}

function submitName() {
  const nameInput = document.getElementById('name-input');
  if (!nameInput) return;
  
  const name = nameInput.value.trim();
  if (!name) {
    alert(translations[currentLang].alertName);
    return;
  }
  
  // Save the name to browser memory
  localStorage.setItem('poule_user_name', name);
  
  // FIXED: Force the name screen to hide completely
  const nameScreen = document.getElementById('name-screen');
  if (nameScreen) {
    nameScreen.classList.remove('active');
    nameScreen.style.display = 'none'; 
  }
  
  // FIXED: Force the prediction form to appear
  const groupScreen = document.getElementById('group-stage-screen');
  if (groupScreen) {
    groupScreen.classList.add('active');
    groupScreen.style.display = 'block'; 
  }
  
  // Load any existing data from Google Sheets
  loadPredictions();
}



function switchScreen(hideId, showId) {
  const hideEl = document.getElementById(hideId);
  const showEl = document.getElementById(showId);

  // Safety check: Only perform operations if the elements actually exist
  if (hideEl) {
    hideEl.classList.remove('active');
    hideEl.style.display = 'none';
  } else {
    console.warn("⚠️ switchScreen: Element to hide not found:", hideId);
  }

  if (showEl) {
    showEl.classList.add('active');
    showEl.style.display = 'block';
  } else {
    console.warn("⚠️ switchScreen: Element to show not found:", showId);
  }
}

// ==========================================
// 4. GROEPSFASE (TABELLEN)
// ==========================================
const optionsHTML = `<option value="" disabled selected>-</option><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5+">5+</option>`;

function renderMatches() {
    const t = translations[currentLang];
    const container = document.getElementById('groups-container');
    let html = '';
    const matchOrder = [ [0,1], [2,3], [0,2], [3,1], [3,0], [1,2] ];

    for (const group in allGroups) {
        html += `<h3 class="group-title">Groep ${group} / Grupo ${group}</h3>`;
        
        // FIX: Loop over matchOrder (6 wedstrijden) in plaats van de 4 teams.
        matchOrder.forEach((m, index) => { 
            const matchId = `${group}${index + 1}`;
            html += `
            <div class="match-card">
                <div class="team"><span>${allGroups[group][m[0]][1]} ${allGroups[group][m[0]][0]}</span><select id="${matchId}_home" class="score-input" onchange="calculateGroupStandings('${group}')">${optionsHTML}</select></div>
                <div class="vs">VS</div>
                <div class="team away"><span>${allGroups[group][m[1]][0]} ${allGroups[group][m[1]][1]}</span><select id="${matchId}_away" class="score-input" onchange="calculateGroupStandings('${group}')">${optionsHTML}</select></div>
            </div>`;
        });
        html += `<div id="standings-${group}" class="standings-container"></div>`;
    }

    // FIX: Back, Save, en Knockouts knoppen
    html += `
    <div style="display: flex; gap: 8px; margin-top: 20px; margin-bottom: 50px;">
        <button class="btn-primary" onclick="switchScreen('app-screen', 'name-screen')" style="flex: 1; background-color: #6b7280; font-size: 14px;">${t.btnBack}</button>
        <button id="save-btn" class="btn-primary" onclick="collectAndSave()" style="flex: 1; background-color: #10b981; font-size: 14px;">${t.btnSave}</button>
        <button class="btn-primary" onclick="startKnockouts()" style="flex: 1; font-size: 14px;">${t.btnToKnockout}</button>
    </div>`;
    container.innerHTML = html;
    
    for (const key in savedDatabaseData) {
        const input = document.getElementById(key);
        if (input) input.value = savedDatabaseData[key];
    }
    for (const group in allGroups) calculateGroupStandings(group);
}

function calculateGroupStandings(group) {
    const teams = allGroups[group];
    let stats = teams.map((team, index) => ({ index, name: `${team[1]} ${team[0]}`, mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 }));
    const matchOrder = [ [0,1], [2,3], [0,2], [3,1], [3,0], [1,2] ];

    matchOrder.forEach((match, index) => {
        const homeSelect = document.getElementById(`${group}${index + 1}_home`);
        const awaySelect = document.getElementById(`${group}${index + 1}_away`);
        if (homeSelect && awaySelect && homeSelect.value !== "" && awaySelect.value !== "") {
            let h = homeSelect.value === "5+" ? 5 : parseInt(homeSelect.value);
            let a = awaySelect.value === "5+" ? 5 : parseInt(awaySelect.value);
            stats[match[0]].mp++; stats[match[1]].mp++;
            stats[match[0]].gf += h; stats[match[1]].gf += a;
            stats[match[0]].ga += a; stats[match[1]].ga += h;
            stats[match[0]].gd = stats[match[0]].gf - stats[match[0]].ga;
            stats[match[1]].gd = stats[match[1]].gf - stats[match[1]].ga;
            if (h > a) { stats[match[0]].w++; stats[match[0]].pts += 3; stats[match[1]].l++; } 
            else if (h < a) { stats[match[1]].w++; stats[match[1]].pts += 3; stats[match[0]].l++; } 
            else { stats[match[0]].d++; stats[match[1]].d++; stats[match[0]].pts += 1; stats[match[1]].pts += 1; }
        }
    });

    stats.sort((a, b) => { if (b.pts !== a.pts) return b.pts - a.pts; if (b.gd !== a.gd) return b.gd - a.gd; if (b.gf !== a.gf) return b.gf - a.gf; return a.index - b.index; });
    renderStandingsTable(group, stats);
}

function renderStandingsTable(group, stats) {
    const container = document.getElementById(`standings-${group}`);
    if (!container) return;
    let html = `<table class="standings-table"><thead><tr><th>Team</th><th>W</th><th>D</th><th>L</th><th>GD</th><th>Pts</th></tr></thead><tbody>`;
    stats.forEach((team, index) => { html += `<tr><td class="team-name">${index + 1}. ${team.name}</td><td>${team.w}</td><td>${team.d}</td><td>${team.l}</td><td>${team.gd}</td><td class="pts">${team.pts}</td></tr>`; });
    html += `</tbody></table>`;
    container.innerHTML = html;
}

// ==========================================
// 5. KNOCK-OUT FASE (BRACKET LOGICA)
// ==========================================
const bracketFlow = {
    "R16_1": ["R32_1", "R32_2"], "R16_2": ["R32_3", "R32_4"], "R16_3": ["R32_5", "R32_6"], "R16_4": ["R32_7", "R32_8"],
    "R16_5": ["R32_9", "R32_10"], "R16_6": ["R32_11", "R32_12"], "R16_7": ["R32_13", "R32_14"], "R16_8": ["R32_15", "R32_16"],
    "QF_1": ["R16_1", "R16_2"], "QF_2": ["R16_3", "R16_4"], "QF_3": ["R16_5", "R16_6"], "QF_4": ["R16_7", "R16_8"],
    "SF_1": ["QF_1", "QF_2"], "SF_2": ["QF_3", "QF_4"], "F_1": ["SF_1", "SF_2"]
};

function updateKnockoutOptions() {
    const t = translations[currentLang];
    const roundsOrder = [
        ["R16_1", "R16_2", "R16_3", "R16_4", "R16_5", "R16_6", "R16_7", "R16_8"],
        ["QF_1", "QF_2", "QF_3", "QF_4"], ["SF_1", "SF_2"], ["F_1"]
    ];

    roundsOrder.forEach(roundMatches => {
        roundMatches.forEach(targetId => {
            const target = document.getElementById(targetId + "_winner");
            const labelEl = document.getElementById(targetId + "_label");
            if (!target) return;

            const source1 = document.getElementById(bracketFlow[targetId][0] + "_winner");
            const source2 = document.getElementById(bracketFlow[targetId][1] + "_winner");
            
            const currentVal = target.value;
            const opt1 = source1 && source1.value ? source1.value : "";
            const opt2 = source2 && source2.value ? source2.value : "";
            
            // 1. Update de dropdown opties
            target.innerHTML = `<option value="" disabled selected>${t.koSelectCountry}</option>`;
            if (opt1) target.innerHTML += `<option value="${opt1}">${opt1}</option>`;
            if (opt2) target.innerHTML += `<option value="${opt2}">${opt2}</option>`;
            
            if (currentVal && (currentVal === opt1 || currentVal === opt2)) {
                target.value = currentVal;
            } else {
                target.value = "";
            }

            // 2. Update de visuele titelbalk (Wie tegen wie?)
            if (labelEl) {
                const label1 = opt1 ? opt1 : t.koUnknown;
                const label2 = opt2 ? opt2 : t.koUnknown;
                labelEl.innerHTML = `${label1} <span style="color:#9ca3af; font-size: 12px; margin: 0 5px;">VS</span> ${label2}`;
            }
        });
    });
    updateVisualBracket(); // Zorgt dat de visuele bracket bovenaan ook update
}

// function startKnockouts() {
//     const t = translations[currentLang];
//     let firstPlaces = [], secondPlaces = [], thirdPlaces = [];
//     const groupLetters = ['A','B','C','D','E','F','G','H','I','J','K','L'];
    
//     for (const group of groupLetters) {
//         const table = document.querySelector(`#standings-${group} tbody`);
//         if (!table) return alert(t.alertFillGroup);
//         const rows = table.querySelectorAll('tr');
//         rows.forEach((row, index) => {
//             const name = row.querySelectorAll('td')[0].innerText.substring(3).trim();
//             const pts = parseInt(row.querySelectorAll('td')[5].innerText);
//             const gd = parseInt(row.querySelectorAll('td')[4].innerText);
//             const teamObj = { group, name, pts, gd };
//             if (index === 0) firstPlaces.push(teamObj);
//             else if (index === 1) secondPlaces.push(teamObj);
//             else if (index === 2) thirdPlaces.push(teamObj);
//         });
//     }

// function startKnockouts() {
//     const t = translations[currentLang];
    
//     // 1. CHECK: Are there group results? (Your new safety logic)
//     let filled = false;
//     for (const group in allGroups) {
//         const container = document.getElementById(`standings-${group}`);
//         if (container && container.innerHTML !== "") filled = true;
//     }
    
//     if (!filled) {
//         alert(t.alertFillGroup);
//         return; // Don't switch screens
//     }

//     // 2. SWITCH SCREEN (Safe version)
//     switchScreen('group-stage-screen', 'knockout-screen');

//     // 3. CALCULATE: Find 1st and 2nd places (Your existing code)
//     let firstPlaces = [], secondPlaces = [], thirdPlaces = [];
//     const groupLetters = ['A','B','C','D','E','F','G','H','I','J','K','L'];
    
//     for (const group of groupLetters) {
//         const table = document.querySelector(`#standings-${group} tbody`);
//         if (!table) continue;
//         const rows = table.querySelectorAll('tr');
//         rows.forEach((row, index) => {
//             const name = row.querySelectorAll('td')[0].innerText.substring(3).trim();
//             const pts = parseInt(row.querySelectorAll('td')[5].innerText);
//             const gd = parseInt(row.querySelectorAll('td')[4].innerText);
//             const teamObj = { group, name, pts, gd };
//             if (index === 0) firstPlaces.push(teamObj);
//             else if (index === 1) secondPlaces.push(teamObj);
//             else if (index === 2) thirdPlaces.push(teamObj);
//         });
//     }

//     // [Keep the rest of your existing logic here: bestThirds, comboKey, matchUps, etc.]
//     // ...
//     // ...
    
//     // 4. TRIGGER UPDATES
//     renderKnockoutBracket(matchUps); 
//     if (typeof updateVisualBracket === "function") updateVisualBracket();
//     console.log("➡️ Knockout phase started and screens switched.");


//     // 1. Vind de 8 beste nummers 3
//     let bestThirds = thirdPlaces.sort((a, b) => { 
//         if(b.pts !== a.pts) return b.pts - a.pts; 
//         return b.gd - a.gd; 
//     }).slice(0, 8);

//     // 2. TABEL LOOKUP: Zoek de exacte combinatie op in de 495-rijen tabel
//     // Sorteer de letters eerst alfabetisch (bijv. "ABCEFGHI")
//     const comboKey = [...bestThirds].map(t => t.group).sort().join('');
    
//     // Haal het exacte FIFA antwoord uit de tabel
//     const tableResult = fifa3rdPlaceTable[comboKey]; 

//     // Koppel het antwoord aan de teamnamen
//     let thirdsMatched = {};
//     for (const hostGroup in tableResult) {
//         const thirdLetter = tableResult[hostGroup];
//         thirdsMatched[hostGroup] = bestThirds.find(t => t.group === thirdLetter);
//     }

//     // Hulpfunctie om makkelijk namen op te halen
//     const get1st = (g) => firstPlaces.find(t => t.group === g).name;
//     const get2nd = (g) => secondPlaces.find(t => t.group === g).name;
//     const get3rd = (g) => thirdsMatched[g] ? thirdsMatched[g].name : t.koUnknown;

//     // 3. HET OFFICIËLE 2026 ROUND OF 32 SCHEMA
//     const matchUps = [
//         [ get2nd('A'), get2nd('B') ],       // Match 1
//         [ get1st('E'), get3rd('E') ],       // Match 2
//         [ get1st('F'), get2nd('C') ],       // Match 3
//         [ get1st('C'), get2nd('F') ],       // Match 4
//         [ get1st('I'), get3rd('I') ],       // Match 5
//         [ get2nd('E'), get2nd('I') ],       // Match 6
//         [ get1st('A'), get3rd('A') ],       // Match 7
//         [ get1st('L'), get3rd('L') ],       // Match 8
//         [ get1st('D'), get3rd('D') ],       // Match 9
//         [ get1st('G'), get3rd('G') ],       // Match 10
//         [ get2nd('K'), get2nd('L') ],       // Match 11
//         [ get1st('H'), get2nd('J') ],       // Match 12
//         [ get1st('B'), get3rd('B') ],       // Match 13
//         [ get1st('J'), get2nd('H') ],       // Match 14
//         [ get1st('K'), get3rd('K') ],       // Match 15
//         [ get2nd('D'), get2nd('G') ]        // Match 16
//     ];

//     switchScreen('app-screen', 'knockout-screen');
//     if (typeof renderVisualBracket === "function") renderVisualBracket(matchUps);
//     renderKnockoutBracket(matchUps);
//     if (typeof updateVisualBracket === "function") updateVisualBracket();
// }

function startKnockouts() {
    const t = translations[currentLang];
    
    // 1. Safety Check
    let filled = false;
    for (const group in allGroups) {
        const container = document.getElementById(`standings-${group}`);
        if (container && container.innerHTML !== "") filled = true;
    }
    if (!filled) { alert(t.alertFillGroup); return; }

    // 2. Switch
    switchScreen('group-stage-screen', 'knockout-screen');

    // 3. Logic: Find 1st, 2nd, 3rd places
    let firstPlaces = [], secondPlaces = [], thirdPlaces = [];
    const groupLetters = ['A','B','C','D','E','F','G','H','I','J','K','L'];
    
    for (const group of groupLetters) {
        const table = document.querySelector(`#standings-${group} tbody`);
        if (!table) continue;
        const rows = table.querySelectorAll('tr');
        rows.forEach((row, index) => {
            const name = row.querySelectorAll('td')[0].innerText.substring(3).trim();
            const pts = parseInt(row.querySelectorAll('td')[5].innerText);
            const gd = parseInt(row.querySelectorAll('td')[4].innerText);
            const teamObj = { group, name, pts, gd };
            if (index === 0) firstPlaces.push(teamObj);
            else if (index === 1) secondPlaces.push(teamObj);
            else if (index === 2) thirdPlaces.push(teamObj);
        });
    }

    let bestThirds = thirdPlaces.sort((a, b) => { if(b.pts !== a.pts) return b.pts - a.pts; return b.gd - a.gd; }).slice(0, 8);
    const comboKey = [...bestThirds].map(t => t.group).sort().join('');
    const tableResult = fifa3rdPlaceTable[comboKey]; 
    let thirdsMatched = {};
    for (const hostGroup in tableResult) {
        thirdsMatched[hostGroup] = bestThirds.find(t => t.group === tableResult[hostGroup]);
    }
    const get1st = (g) => firstPlaces.find(t => t.group === g).name;
    const get2nd = (g) => secondPlaces.find(t => t.group === g).name;
    const get3rd = (g) => thirdsMatched[g] ? thirdsMatched[g].name : t.koUnknown;

    const matchUps = [
        [ get2nd('A'), get2nd('B') ], [ get1st('E'), get3rd('E') ], [ get1st('F'), get2nd('C') ], [ get1st('C'), get2nd('F') ],
        [ get1st('I'), get3rd('I') ], [ get2nd('E'), get2nd('I') ], [ get1st('A'), get3rd('A') ], [ get1st('L'), get3rd('L') ],
        [ get1st('D'), get3rd('D') ], [ get1st('G'), get3rd('G') ], [ get2nd('K'), get2nd('L') ], [ get1st('H'), get2nd('J') ],
        [ get1st('B'), get3rd('B') ], [ get1st('J'), get2nd('H') ], [ get1st('K'), get3rd('K') ], [ get2nd('D'), get2nd('G') ]
    ];

    // 4. TRIGGER: This is the important change
    renderKnockoutBracket(matchUps); 
    
    // Add a tiny delay before updating the visual bracket to ensure HTML exists
    setTimeout(() => {
        if (typeof renderVisualBracket === "function") renderVisualBracket(matchUps);
        if (typeof updateVisualBracket === "function") updateVisualBracket();
        console.log("➡️ Knockout phase fully rendered.");
    }, 100); 
}

// function renderKnockoutBracket(matchUps) {
//     const t = translations[currentLang];
//     const container = document.getElementById('knockout-container');
//     let html = '';
    
//     // We genereren de standaard opties zonder direct data in te vullen
//     const winMethods = `<option value="" disabled selected>${t.koWinMethod}</option><option value="1">${t.koWin1}</option><option value="2">${t.koWin2}</option><option value="3">${t.koWin3}</option><option value="pen">${t.koWinPen}</option>`;

//     const rounds = [
//         { id: "R32", title: t.r32, count: 16 },
//         { id: "R16", title: t.r16, count: 8 },
//         { id: "QF", title: t.qf, count: 4 },
//         { id: "SF", title: t.sf, count: 2 },
//         { id: "F", title: t.f, count: 1 }
//     ];

//     rounds.forEach(round => {
//         html += `<div class="round-title">${round.title}</div>`;
//         for (let i = 1; i <= round.count; i++) {
//             const matchId = `${round.id}_${i}`;
            
//             let optionsHtml = `<option value="" disabled selected>${t.koSelectCountry}</option>`;
//             let teamsLabel = "";

//             if (round.id === "R32") {
//                 const t1 = matchUps[i-1][0];
//                 const t2 = matchUps[i-1][1];
//                 optionsHtml += `<option value="${t1}">${t1}</option><option value="${t2}">${t2}</option>`;
//                 teamsLabel = `${t1} <span style="color:#9ca3af; font-size: 12px; margin: 0 5px;">VS</span> ${t2}`;
//             } else {
//                 teamsLabel = `${t.koUnknown} <span style="color:#9ca3af; font-size: 12px; margin: 0 5px;">VS</span> ${t.koUnknown}`;
//             }

//             html += `
//             <div class="ko-card">
//                 <div class="ko-match-title">Match ${i}</div>
//                 <div id="${matchId}_label" class="ko-match-label">${teamsLabel}</div>
//                 <div class="ko-controls">
//                     <select id="${matchId}_winner" class="ko-select" onchange="updateKnockoutOptions()">
//                         ${optionsHtml}
//                     </select>
//                     <select id="${matchId}_margin" class="ko-select">
//                         ${winMethods}
//                     </select>
//                 </div>
//             </div>`;
//         }
//     });

//     // Navigatie knoppen
//     html += `
//     <div style="display: flex; gap: 8px; margin-top: 20px; margin-bottom: 50px;">
//         <button class="btn-primary" onclick="switchScreen('knockout-screen', 'app-screen')" style="flex: 1; background-color: #6b7280; font-size: 14px;">${t.btnBack}</button>
//         <button id="save-btn-ko" class="btn-primary" onclick="collectAndSave()" style="flex: 1; background-color: #10b981; font-size: 14px;">${t.btnSave}</button>
//         <button class="btn-primary" onclick="startBonus()" style="flex: 1; font-size: 14px;">${t.btnToBonus}</button>
//     </div>`;
    
//     container.innerHTML = html;
    
//     // NUDAT DE HTML ER STAAT: Vul de opgeslagen data in voor Winnaars én de Manier van winnen
//     ['R32', 'R16', 'QF', 'SF', 'F'].forEach(roundId => {
//         const count = rounds.find(r => r.id === roundId).count;
//         for (let i = 1; i <= count; i++) {
//             const matchId = `${roundId}_${i}`;
            
//             // 1. Herstel de opgeslagen winnaar
//             const savedWinner = savedDatabaseData[`${matchId}_winner`];
//             const selectWinner = document.getElementById(`${matchId}_winner`);
//             if (savedWinner && selectWinner) {
//                 for (let j = 0; j < selectWinner.options.length; j++) {
//                     if (selectWinner.options[j].value === savedWinner) {
//                         selectWinner.value = savedWinner;
//                         break;
//                     }
//                 }
//             }

//             // 2. Herstel de manier van winnen (DIT WAS HET MISSENDE/BUGGY STUKJE!)
//             const savedMargin = savedDatabaseData[`${matchId}_margin`];
//             const selectMargin = document.getElementById(`${matchId}_margin`);
//             if (savedMargin && selectMargin) {
//                 selectMargin.value = savedMargin;
//             }
//         }
//         updateKnockoutOptions(); 
//     });
// }

function renderKnockoutBracket(matchUps) {
    const t = translations[currentLang];
    const container = document.getElementById('knockout-container');
    if (!container) return;
    
    let html = '';
    const winMethods = `<option value="" disabled selected>${t.koWinMethod}</option><option value="1">${t.koWin1}</option><option value="2">${t.koWin2}</option><option value="3">${t.koWin3}</option><option value="pen">${t.koWinPen}</option>`;

    const rounds = [
        { id: "R32", title: t.r32, count: 16 },
        { id: "R16", title: t.r16, count: 8 },
        { id: "QF", title: t.qf, count: 4 },
        { id: "SF", title: t.sf, count: 2 },
        { id: "F", title: t.f, count: 1 }
    ];

    rounds.forEach(round => {
        html += `<div class="round-title">${round.title}</div>`;
        for (let i = 1; i <= round.count; i++) {
            const matchId = `${round.id}_${i}`;
            let optionsHtml = `<option value="" disabled selected>${t.koSelectCountry}</option>`;
            
            if (round.id === "R32") {
                const t1 = matchUps[i-1][0];
                const t2 = matchUps[i-1][1];
                optionsHtml += `<option value="${t1}">${t1}</option><option value="${t2}">${t2}</option>`;
            }

            html += `
            <div class="ko-card">
                <div class="ko-match-title">Match ${i}</div>
                <div id="${matchId}_label" class="ko-match-label">${t.koUnknown} VS ${t.koUnknown}</div>
                <div class="ko-controls">
                    <select id="${matchId}_winner" class="ko-select" onchange="updateKnockoutOptions()">
                        ${optionsHtml}
                    </select>
                    <select id="${matchId}_margin" class="ko-select">
                        ${winMethods}
                    </select>
                </div>
            </div>`;
        }
    });

    html += `
    <div style="display: flex; gap: 8px; margin-top: 20px; margin-bottom: 50px;">
        <button class="btn-primary" onclick="switchScreen('knockout-screen', 'group-stage-screen')" style="flex: 1; background-color: #6b7280; font-size: 14px;">${t.btnBack}</button>
        <button id="save-btn-ko" class="btn-primary" onclick="collectAndSave()" style="flex: 1; background-color: #10b981; font-size: 14px;">${t.btnSave}</button>
        <button class="btn-primary" onclick="startBonus()" style="flex: 1; font-size: 14px;">${t.btnToBonus}</button>
    </div>`;
    
    // Inject HTML once
    container.innerHTML = html;

    // --- DATA RESTORE MET UNIVERSELE VLAGGEN MATCH ---
    console.log("➡️ Startte data herstel...");
    
    rounds.forEach(round => {
        for (let i = 1; i <= round.count; i++) {
            const matchId = `${round.id}_${i}`;
            const savedWinner = savedDatabaseData[`${matchId}_winner`];
            const selectWinner = document.getElementById(`${matchId}_winner`);
            
            if (savedWinner && selectWinner) {
                // 1. Zoek de vlag (emoji) in de ruwe data op basis van de opgeslagen naam
                let teamFlag = null;
                for (const groupKey in rawGroups) {
                    for (const team of rawGroups[groupKey]) {
                        // team[1] is de vlag, bijv "🇨🇭"
                        if (savedWinner.includes(team[1])) {
                            teamFlag = team[1];
                            break;
                        }
                    }
                    if (teamFlag) break;
                }

                // 2. Koppel de dropdown optie met DEZELFDE vlag, ongeacht de taal
                for (let j = 0; j < selectWinner.options.length; j++) {
                    const optVal = selectWinner.options[j].value;
                    
                    // Als de tekst exact klopt, OF als ze dezelfde vlag delen
                    if (optVal === savedWinner || (teamFlag && optVal.includes(teamFlag))) {
                        selectWinner.value = optVal;
                        selectWinner.dispatchEvent(new Event('change')); // Forceer update
                        break;
                    }
                }
            }

            // Herstel ook de doelpuntenmarge
            const savedMargin = savedDatabaseData[`${matchId}_margin`];
            const selectMargin = document.getElementById(`${matchId}_margin`);
            if (savedMargin && selectMargin) {
                selectMargin.value = savedMargin;
            }
        }
    });

    // 3. Wacht kort en update de visualisatie
    setTimeout(() => {
        updateKnockoutOptions(); 
        if (typeof updateVisualBracket === "function") updateVisualBracket();
    }, 200);
}

//     // --- DATA RESTORE VOLGORDE ---
//     console.log("➡️ Startte data herstel...");
    
//     // 1. Eerst alle data invullen
//     rounds.forEach(round => {
//         for (let i = 1; i <= round.count; i++) {
//             const matchId = `${round.id}_${i}`;
            
//             // Winnaar herstellen
//             const savedWinner = savedDatabaseData[`${matchId}_winner`];
//             const selectWinner = document.getElementById(`${matchId}_winner`);
//             if (savedWinner && selectWinner) {
//                 selectWinner.value = savedWinner;
//                 console.log(`✅ Herstelde winnaar voor ${matchId}: ${savedWinner}`);
//             }

//             // Margin herstellen
//             const savedMargin = savedDatabaseData[`${matchId}_margin`];
//             const selectMargin = document.getElementById(`${matchId}_margin`);
//             if (savedMargin && selectMargin) {
//                 selectMargin.value = savedMargin;
//             }
//         }
//     });

//     // 2. DAARNA pas de bracket doorrekenen zodat de R16/QF/SF namen verschijnen
//     updateKnockoutOptions(); 
    
//     // 3. Tot slot visuele bracket updaten
//     if (typeof updateVisualBracket === "function") updateVisualBracket();
//     console.log("➡️ Data herstel compleet.");
// }

function renderVisualBracket(matchUps) {
    const container = document.getElementById('bracket-visualization');
    if (!container) return;
    
    const rounds = ["R32", "R16", "QF", "SF", "F"];
    const counts = [16, 8, 4, 2, 1];
    const t = translations[currentLang];
    
    let html = '<div class="bracket-wrapper">';
    
    rounds.forEach((round, rIdx) => {
        html += `<div class="bracket-column" id="bracket-col-${round}">`;
        for (let i = 1; i <= counts[rIdx]; i++) {
            const matchId = `${round}_${i}`;
            let t1 = "", t2 = "";
            if (round === "R32") {
                t1 = matchUps[i-1][0];
                t2 = matchUps[i-1][1];
            }
            html += `
                <div class="bracket-match" id="vis_match_${matchId}">
                    <div class="bracket-team ${round==='R32'?'':'empty'}" id="vis_team1_${matchId}">${t1 || t.koUnknown}</div>
                    <div class="bracket-team ${round==='R32'?'':'empty'}" id="vis_team2_${matchId}">${t2 || t.koUnknown}</div>
                </div>
            `;
        }
        html += `</div>`;
    });
    
    html += '</div>';
    container.innerHTML = html;
}
function updateVisualBracket() {
    const rounds = ["R32", "R16", "QF", "SF", "F"];
    const counts = [16, 8, 4, 2, 1];
    const t = translations[currentLang];
    
    rounds.forEach((round, rIdx) => {
        for (let i = 1; i <= counts[rIdx]; i++) {
            const matchId = `${round}_${i}`;
            const targetEl1 = document.getElementById(`vis_team1_${matchId}`);
            const targetEl2 = document.getElementById(`vis_team2_${matchId}`);
            
            // 1. DEFINE WINNER AT THE TOP (This fixes the ReferenceError)
            const winnerSelect = document.getElementById(`${matchId}_winner`);
            const winner = winnerSelect ? winnerSelect.value : null; 
            
            // 2. Logic for subsequent rounds
            if (round !== "R32") {
                if (!bracketFlow[matchId]) continue;
                const source1Select = document.getElementById(`${bracketFlow[matchId][0]}_winner`);
                const source2Select = document.getElementById(`${bracketFlow[matchId][1]}_winner`);
                
                const team1 = source1Select && source1Select.value ? source1Select.value : "";
                const team2 = source2Select && source2Select.value ? source2Select.value : "";
                
                if (targetEl1) {
                    targetEl1.innerText = team1 || t.koUnknown;
                    targetEl1.className = `bracket-team ${!team1 ? 'empty' : ''}`;
                }
                if (targetEl2) {
                    targetEl2.innerText = team2 || t.koUnknown;
                    targetEl2.className = `bracket-team ${!team2 ? 'empty' : ''}`;
                }
            }
            
            // 3. Mark the winner (Now 'winner' is guaranteed to exist here)
            if (winner) {
                if (targetEl1 && targetEl1.innerText === winner) targetEl1.classList.add('winner');
                else if (targetEl1) targetEl1.classList.remove('winner');
                
                if (targetEl2 && targetEl2.innerText === winner) targetEl2.classList.add('winner');
                else if (targetEl2) targetEl2.classList.remove('winner');
            }
        }
    });
}
// function updateVisualBracket() {
//     const rounds = ["R32", "R16", "QF", "SF", "F"];
//     const counts = [16, 8, 4, 2, 1];
//     const t = translations[currentLang];
    
//     rounds.forEach((round, rIdx) => {
//         for (let i = 1; i <= counts[rIdx]; i++) {
//             const matchId = `${round}_${i}`;
//             const targetEl1 = document.getElementById(`vis_team1_${matchId}`);
//             const targetEl2 = document.getElementById(`vis_team2_${matchId}`);
//             const winnerSelect = document.getElementById(`${matchId}_winner`);
//             const winner = winnerSelect ? winnerSelect.value : null;
            
//             if (round !== "R32") {
//                 if (!bracketFlow[matchId]) continue;
//                 const source1Select = document.getElementById(`${bracketFlow[matchId][0]}_winner`);
//                 const source2Select = document.getElementById(`${bracketFlow[matchId][1]}_winner`);
                
//                 const team1 = source1Select && source1Select.value ? source1Select.value : "";
//                 const team2 = source2Select && source2Select.value ? source2Select.value : "";
                
//                 if (targetEl1) {
//                     targetEl1.innerText = team1 || t.koUnknown;
//                     targetEl1.className = `bracket-team ${!team1 ? 'empty' : ''}`;
//                 }
//                 if (targetEl2) {
//                     targetEl2.innerText = team2 || t.koUnknown;
//                     targetEl2.className = `bracket-team ${!team2 ? 'empty' : ''}`;
//                 }
//             }
            
//             // Markeer de winnaar in het groen
//             if (winner && targetEl1 && targetEl1.innerText === winner) targetEl1.classList.add('winner');
//             else if (targetEl1) targetEl1.classList.remove('winner');
            
//             if (winner && targetEl2 && targetEl2.innerText === winner) targetEl2.classList.add('winner');
//             else if (targetEl2) targetEl2.classList.remove('winner');
//         }
//     });
// }

// ==========================================
// 6. BONUS VRAGEN
// ==========================================
function startBonus() {
    switchScreen('knockout-screen', 'bonus-screen');
    renderBonus();
}

function renderBonus() {
    const t = translations[currentLang];
    const container = document.getElementById('bonus-container');
    const teamOptions = `<option value="" disabled selected>${t.koSelectCountry}</option>` + allTeamsFlat.map(team => `<option value="${team}">${team}</option>`).join('');
    
    // 1. Bouw de schone HTML, ZONDER direct de opgeslagen data erin te proppen
    container.innerHTML = `
        <div class="bonus-card">
            <h4>${t.bq1}</h4>
            <input type="text" id="bonus_topscorer" class="ko-select" placeholder="${t.bExPlayer}">
        </div>
        <div class="bonus-card">
            <h4>${t.bq2}</h4>
            <select id="bonus_kaarten" class="ko-select">${teamOptions}</select>
        </div>
        <div class="bonus-card">
            <h4>${t.bq3}</h4>
            <select id="bonus_owngoals" class="ko-select">${teamOptions}</select>
        </div>
        <div class="bonus-card">
            <h4>${t.bq4}</h4>
            <input type="number" id="bonus_minuut" class="ko-select" placeholder="${t.bExMin}">
        </div>
        <div style="display: flex; gap: 8px; margin-top: 20px; margin-bottom: 50px;">
            <button class="btn-primary" onclick="switchScreen('bonus-screen', 'knockout-screen')" style="flex: 1; background-color: #6b7280; font-size: 14px;">${t.btnBack}</button>
            <button class="btn-primary" id="save-btn-final" onclick="collectAndSave()" style="flex: 2; background-color: #10b981; font-size: 14px;">${t.btnSaveAll}</button>
        </div>
    `;

    // 2. NADAT de HTML op het scherm staat: Vul de opgeslagen data veilig in
    const bonusIds = ['bonus_topscorer', 'bonus_kaarten', 'bonus_owngoals', 'bonus_minuut'];
    bonusIds.forEach(id => {
        const element = document.getElementById(id);
        // Als het element bestaat én we hebben er data voor opgeslagen in Google Sheets
        if (element && savedDatabaseData[id]) {
            element.value = savedDatabaseData[id];
        }
    });
}

// ==========================================
// 7. ALLES OPSLAAN & INLADEN
// ==========================================
function collectAndSave() {
    let alleData = {};
    const matchOrder = [ [0,1], [2,3], [0,2], [3,1], [3,0], [1,2] ];
    
    for (const group in allGroups) {
        matchOrder.forEach((match, index) => {
            const h = document.getElementById(`${group}${index + 1}_home`);
            const a = document.getElementById(`${group}${index + 1}_away`);
            if (h && a && h.value !== "" && a.value !== "") {
                alleData[`${group}${index + 1}_home`] = h.value;
                alleData[`${group}${index + 1}_away`] = a.value;
            }
        });
    }

    const selects = document.querySelectorAll('#knockout-container select');
    selects.forEach(select => { if(select.value) alleData[select.id] = select.value; });

    const bonusInputs = ['bonus_topscorer', 'bonus_kaarten', 'bonus_owngoals', 'bonus_minuut'];
    bonusInputs.forEach(id => {
        const el = document.getElementById(id);
        if(el && el.value) alleData[id] = el.value;
    });

    savePredictions(alleData);
}

async function savePredictions(dataObj) {
    const t = translations[currentLang];
    const userName = localStorage.getItem('poule_user_name');
    
    const saveBtn = document.getElementById('save-btn');
    const saveBtnKo = document.getElementById('save-btn-ko'); // Added voor Knockout
    const saveBtnFinal = document.getElementById('save-btn-final');
    
    if (saveBtn) saveBtn.innerText = t.btnSaving;
    if (saveBtnKo) saveBtnKo.innerText = t.btnSaving;
    if (saveBtnFinal) saveBtnFinal.innerText = t.btnSaving;

    try {
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify({ naam: userName, voorspellingen: dataObj })
        });
        const result = await response.json();
        if (result.status === 'success') {
            alert(t.alertSaved);
            savedDatabaseData = dataObj;
        }
    } catch (error) {
        console.error("Fout bij opslaan:", error);
        alert(t.alertError);
    } finally {
        if (saveBtn) saveBtn.innerText = t.btnSave;
        if (saveBtnKo) saveBtnKo.innerText = t.btnSave;
        if (saveBtnFinal) saveBtnFinal.innerText = t.btnSaveAll;
    }
}

async function loadPredictions() {
    const userName = localStorage.getItem('poule_user_name');
    try {
        // FIX 1: Add a "cache buster" timestamp to the URL.
        // This forces the browser to pull fresh data from Google Sheets every single time.
        const cacheBuster = new Date().getTime();
        const response = await fetch(`${SCRIPT_URL}?naam=${userName}&t=${cacheBuster}`);
        const data = await response.json();
        
        if (data.status !== "niet gevonden" && !data.error) {
            
            // FIX 2: Smart Parsing. 
            // Depending on how your Google Script is written, the data might be structured differently.
            // This safely checks where your predictions are hidden without crashing.
            if (data.voorspellingen) {
                // If it's wrapped in a 'voorspellingen' key
                savedDatabaseData = typeof data.voorspellingen === 'string' ? JSON.parse(data.voorspellingen) : data.voorspellingen;
            } else if (typeof data === 'string') {
                // If the entire response is a stringified JSON
                savedDatabaseData = JSON.parse(data);
            } else {
                // If the response is already a perfect Object
                savedDatabaseData = data;
            }

            // Fill the group stage inputs
            for (const key in savedDatabaseData) {
                const input = document.getElementById(key);
                if (input) input.value = savedDatabaseData[key];
            }
            // Recalculate tables so the loaded scores reflect in the standings
            for (const group in allGroups) calculateGroupStandings(group);
        }
    } catch (error) { 
        console.error("Fout bij inladen data:", error); 
    }
}

// ==========================================
// 8. DEBUG LOGICA (TEST ACCOUNT)
// ==========================================
function fillRandomScores() {
    const possibleScores = ["0", "1", "2", "3", "4", "5+"];
    const matchOrder = [ [0,1], [2,3], [0,2], [3,1], [3,0], [1,2] ];

    for (const group in allGroups) {
        matchOrder.forEach((match, index) => {
            const homeSelect = document.getElementById(`${group}${index + 1}_home`);
            const awaySelect = document.getElementById(`${group}${index + 1}_away`);
            if (homeSelect && awaySelect) {
                homeSelect.value = possibleScores[Math.floor(Math.random() * possibleScores.length)];
                awaySelect.value = possibleScores[Math.floor(Math.random() * possibleScores.length)];
            }
        });
        calculateGroupStandings(group); 
    }
    
    alert(translations[currentLang].debugMsg);
}

// Fetches official, live match results from openfootball
async function fetchWorldCupData() {
  const url = 'https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json';
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error("Error fetching tournament data:", error);
    return null;
  }
}

// Fetches the entire pool database (all rows) from your Google Apps Script
async function fetchAllDatabasePredictions() {
  try {
    const cacheBuster = new Date().getTime();
    // Calling without a specific "naam" parameter instructs the script to fetch all records
    const response = await fetch(`${SCRIPT_URL}?t=${cacheBuster}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching database predictions:", error);
    return {};
  }
}

// Maps English team names from openfootball to your localized rawGroups data
function getLocalTeamName(englishName) {
  const translationMap = {
    "Mexico": { nl: "Mexico", es: "México", en: "Mexico" },
    "South Africa": { nl: "Zuid-Afrika", es: "Sudáfrica", en: "South Africa" },
    "South Korea": { nl: "Zuid-Korea", es: "Corea del Sur", en: "South Korea" },
    "Czech Republic": { nl: "Tsjechië", es: "Rep. Checa", en: "Czech Republic" },
    "Canada": { nl: "Canada", es: "Canadá", en: "Canada" },
    "Bosnia & Herzegovina": { nl: "Bosnië & Herz.", es: "Bosnia y Herz.", en: "Bosnia & Herzegovina" },
    "Qatar": { nl: "Qatar", es: "Catar", en: "Qatar" },
    "Switzerland": { nl: "Zwitserland", es: "Suiza", en: "Switzerland" },
    "Brazil": { nl: "Brazilië", es: "Brasil", en: "Brazil" },
    "Morocco": { nl: "Marruecos", es: "Marruecos", en: "Morocco" },
    "Haiti": { nl: "Haïti", es: "Haití", en: "Haiti" },
    "Scotland": { nl: "Schotland", es: "Escocia", en: "Scotland" },
    "United States": { nl: "Verenigde Staten", es: "Estados Unidos", en: "United States" },
    "Paraguay": { nl: "Paraguay", es: "Paraguay", en: "Paraguay" },
    "Australia": { nl: "Australië", es: "Australia", en: "Australia" },
    "Turkey": { nl: "Turkije", es: "Turquía", en: "Turkey" },
    "Germany": { nl: "Duitsland", es: "Alemania", en: "Germany" },
    "Curaçao": { nl: "Curaçao", es: "Curazao", en: "Curaçao" },
    "Ivory Coast": { nl: "Ivoorkust", es: "Costa de Marfil", en: "Ivory Coast" },
    "Ecuador": { nl: "Ecuador", es: "Ecuador", en: "Ecuador" },
    "Netherlands": { nl: "Nederland", es: "Países Bajos", en: "Netherlands" },
    "Japan": { nl: "Japan", es: "Japón", en: "Japan" },
    "Sweden": { nl: "Zweden", es: "Suecia", en: "Sweden" },
    "Tunisia": { nl: "Tunesië", es: "Túnez", en: "Tunisia" },
    "Belgium": { nl: "België", es: "Bélgica", en: "Belgium" },
    "Egypt": { nl: "Egypte", es: "Egipto", en: "Egypt" },
    "Iran": { nl: "Iran", es: "Irán", en: "Iran" },
    "New Zealand": { nl: "Nieuw-Zeeland", es: "Nueva Zelanda", en: "New Zealand" },
    "Spain": { nl: "Spanje", es: "España", en: "Spain" },
    "Cape Verde": { nl: "Kaapverdië", es: "Cabo Verde", en: "Cape Verde" },
    "Saudi Arabia": { nl: "Saoedi-Arabië", es: "Arabia Saudita", en: "Saudi Arabia" },
    "Uruguay": { nl: "Uruguay", es: "Uruguay", en: "Uruguay" },
    "France": { nl: "Frankrijk", es: "Francia", en: "France" },
    "Senegal": { nl: "Senegal", es: "Senegal", en: "Senegal" },
    "Iraq": { nl: "Irak", es: "Irak", en: "Iraq" },
    "Norway": { nl: "Noorwegen", es: "Noruega", en: "Norway" },
    "Argentina": { nl: "Argentinië", es: "Argentina", en: "Argentina" },
    "Algeria": { nl: "Algerije", es: "Argelia", en: "Algeria" },
    "Austria": { nl: "Oostenrijk", es: "Austria", en: "Austria" },
    "Jordan": { nl: "Jordanië", es: "Jordania", en: "Jordan" },
    "Portugal": { nl: "Portugal", es: "Portugal", en: "Portugal" },
    "DR Congo": { nl: "DR Congo", es: "RD Congo", en: "DR Congo" },
    "Uzbekistan": { nl: "Oezbekistan", es: "Uzbekistán", en: "Uzbekistan" },
    "Colombia": { nl: "Colombia", es: "Colombia", en: "Colombia" },
    "England": { nl: "Engeland", es: "Inglaterra", en: "England" },
    "Croatia": { nl: "Kroatië", es: "Croacia", en: "Croatia" },
    "Ghana": { nl: "Ghana", es: "Ghana", en: "Ghana" },
    "Panama": { nl: "Panama", es: "Panamá", en: "Panama" }
  };
  return translationMap[englishName] ? translationMap[englishName][currentLang] : englishName;
}

// Cross-references team combinations with matchOrder index to determine prediction IDs (e.g., "A1")
// function findMatchPredictionsKey(t1, t2) {
//   const clean = (name) => name.toLowerCase().replace(/[^a-z]/g, '');
//   for (const key in rawGroups) {
//     const teams = rawGroups[key].map(t => clean(t[0].nl));
//     const matchOrder = [ [0,1], [2,3], [0,2], [3,1], [3,0], [1,2] ];
    
//     for (let i = 0; i < matchOrder.length; i++) {
//       const homeIdx = matchOrder[i][0];
//       const awayIdx = matchOrder[i][1];
//       if ((teams[homeIdx] === clean(t1) || teams[homeIdx] === clean(getLocalTeamName(t1))) && 
//           (teams[awayIdx] === clean(t2) || teams[awayIdx] === clean(getLocalTeamName(t2)))) {
//         return `${key}${i + 1}`;
//       }
//     }
//   }
//   return '';
// }
function findMatchPredictionsKey(t1, t2) {
  const normalize = (name) => {
    if (!name) return "";
    const clean = name.toLowerCase().trim();
    if (clean.includes("unite") || clean.includes("usa") || clean.includes("verenigde")) return "united states";
    if (clean.includes("korea") || clean.includes("zuid-korea")) return "south korea";
    if (clean.includes("africa") || clean.includes("zuid-afrika")) return "south africa";
    if (clean.includes("czech") || clean.includes("tsjechi")) return "czech republic";
    if (clean.includes("bosnia") || clean.includes("bosni")) return "bosnia & herzegovina";
    if (clean.includes("nether") || clean.includes("nederland")) return "netherlands";
    return clean;
  };

  const cleanT1 = normalize(t1);
  const cleanT2 = normalize(t2);

  const referenceGroups = {
    A: ["mexico", "south africa", "south korea", "czech republic"],
    B: ["canada", "bosnia & herzegovina", "qatar", "switzerland"],
    C: ["brazil", "morocco", "haiti", "scotland"],
    D: ["united states", "paraguay", "australia", "turkey"],
    E: ["germany", "curaçao", "ivory coast", "ecuador"],
    F: ["netherlands", "japan", "sweden", "tunisia"],
    G: ["belgium", "egypt", "iran", "new zealand"],
    H: ["spain", "cape verde", "saudi arabia", "uruguay"],
    I: ["france", "senegal", "iraq", "norway"],
    J: ["argentina", "algeria", "austria", "jordan"],
    K: ["portugal", "dr congo", "uzbekistan", "colombia"],
    L: ["england", "croatia", "ghana", "panama"]
  };

  for (const groupKey in referenceGroups) {
    const list = referenceGroups[groupKey];
    const matchOrder = [ [0,1], [2,3], [0,2], [3,1], [3,0], [1,2] ];
    
    for (let i = 0; i < matchOrder.length; i++) {
      const hIdx = matchOrder[i][0];
      const aIdx = matchOrder[i][1];
      if ((list[hIdx] === cleanT1 && list[aIdx] === cleanT2) || 
          (list[hIdx] === cleanT2 && list[aIdx] === cleanT1)) {
        return `${groupKey}${i + 1}`;
      }
    }
  }
  return '';
}

async function renderTodayMatches(targetDateString) {
  const container = document.getElementById('container-today-matches');
  const t = translations[currentLang] || translations['nl'];
  container.innerHTML = `<p style="text-align:center; color:#666; font-family:sans-serif; margin-top:20px;">${t.loading}</p>`;
  
  const data = await fetchWorldCupData();
  if (!data || !data.matches) {
    container.innerHTML = `<p style="text-align:center; padding:20px; font-family:sans-serif;">${t.noMatches}</p>`;
    return;
  }
  
  // Strict string match filtering to prevent wrong game assignments
  const selectedMatches = data.matches.filter(m => String(m.date).trim() === String(targetDateString).trim());
  
  if (selectedMatches.length === 0) {
    container.innerHTML = `<p style="text-align:center; padding:30px 10px; color:#777; font-family:sans-serif;">${t.noMatches} (${targetDateString})</p>`;
    return;
  }
  
  const allParticipants = await fetchAllDatabasePredictions();
  let html = '';
  
  selectedMatches.forEach(match => {
    const isFinished = match.score && match.score.ft;
    const actH = isFinished ? match.score.ft[0] : null;
    const actA = isFinished ? match.score.ft[1] : null;
    
    // Forced mobile container layout overrides
    html += `
      <div style="background:#ffffff; border:1px solid #e0e0e0; border-radius:12px; padding:16px; margin-bottom:20px; box-sizing:border-box; width:100%; display:flex; flex-direction:column; clear:both; text-align:left; font-family:sans-serif; box-shadow:0 2px 5px rgba(0,0,0,0.05);">
        
        <div style="font-size:12px; color:#888; font-weight:bold; text-transform:uppercase; margin-bottom:6px; letter-spacing:0.5px;">
          ${t.matchday} ${match.round.replace('Matchday ', '')} ${match.group ? `• ${match.group}` : ''}
        </div>
        
        <div style="font-size:18px; font-weight:8px; color:#111; margin:5px 0; line-height:1.3;">
          ${getLocalTeamName(match.team1)} vs ${getLocalTeamName(match.team2)}
        </div>
        
        <div style="font-size:13px; color:#666; margin-bottom:12px; display:flex; align-items:center; gap:4px;">
          ⏰ ${match.time} @ ${match.ground}
        </div>
    `;
    
    // Status / Score Indicator Block
    if (isFinished) {
      html += `<div style="background:#e2f0d9; color:#385723; padding:10px; border-radius:8px; font-weight:bold; font-size:14px; margin-bottom:15px; border-left:4px solid #385723;">Uitslag: ${actH} - ${actA}</div>`;
    } else {
      html += `<div style="background:#fff3cd; color:#856404; padding:10px; border-radius:8px; font-weight:bold; font-size:14px; margin-bottom:15px; border-left:4px solid #856404;">Scheduled / In Progress</div>`;
    }
    
    // Predictions Segment (Forced to stack below)
    html += `
      <div style="background:#f8f9fa; padding:14px; border-radius:8px; box-sizing:border-box; width:100%; display:flex; flex-direction:column; gap:8px;">
        <div style="font-weight:bold; font-size:13px; color:#444; border-bottom:1px solid #e9ecef; padding-bottom:6px; margin-bottom:4px;">📋 ${t.predBy}:</div>
    `;
    
    const matchKey = findMatchPredictionsKey(match.team1, match.team2);
    let totalPredsCount = 0;
    
    for (const pName in allParticipants) {
      const userPreds = allParticipants[pName];
      const predH = userPreds[`${matchKey}_home`];
      const predA = userPreds[`${matchKey}_away`];
      
      if (predH !== undefined && predA !== undefined) {
        totalPredsCount++;
        let calculationText = '';
        if (isFinished) {
          const points = calculateGroupPoints(predH, predA, actH, actA);
          calculationText = ` ➡️ <span style="color:#007bff; font-weight:bold;">(${points} pts)</span>`;
        }
        
        html += `
          <div style="display:flex; justify-content:space-between; font-size:14px; padding:4px 0; border-bottom:1px dashed #e9ecef; color:#333;">
            <span style="font-weight:500;">${pName}</span>
            <span>${predH} - ${predA}${calculationText}</span>
          </div>
        `;
      }
    }
    
    if (totalPredsCount === 0) {
      html += `<div style="font-size:13px; color:#999; font-style:italic; padding:5px 0;">Geen voorspellingen ingevuld voor deze wedstrijd.</div>`;
    }
    
    html += `</div></div>`;
  });
  
  container.innerHTML = html;
}

function calculateGroupPoints(predHome, predAway, actualHome, actualAway) {
  const pH = parseInt(predHome);
  const pA = parseInt(predAway);
  const aH = parseInt(actualHome);
  const aA = parseInt(actualAway);
  
  if (isNaN(pH) || isNaN(pA) || isNaN(aH) || isNaN(aA)) return 0;
  if (pH === aH && pA === aA) return 5; // Exact Match Score
  if (Math.sign(pH - pA) === Math.sign(aH - aA)) return 2; // Correct Outcome (Winner or Draw)
  return 0; // Missed
}

async function renderLeaderboard() {
  const container = document.getElementById('container-leaderboard');
  const t = translations[currentLang];
  container.innerHTML = `<p>${t.loading}</p>`;
  
  const apiData = await fetchWorldCupData();
  const poolData = await fetchAllDatabasePredictions();
  
  if (!apiData || !poolData) {
    container.innerHTML = '<p>Error loading leaderboard.</p>';
    return;
  }
  
  let scoreboard = [];
  
  // Set real tournament final resolutions here once determined by FIFA:
  const finalTopScorer = "PorDefinir";
  const finalMostCards = "PorDefinir";
  const finalMostOwnGoals = "PorDefinir";
  const finalFirstGoalMinute = 14; 
  
  for (const user in poolData) {
    const preds = poolData[user];
    let totalScore = 0;
    
    apiData.matches.forEach(match => {
      if (!match.score || !match.score.ft) return;
      const actH = match.score.ft[0];
      const actA = match.score.ft[1];
      const winner = actH > actA ? match.team1 : (actA > actH ? match.team2 : 'Draw');
      
      // Is it a Group Stage match?
      if (!match.round.includes("Round") && !match.round.includes("Quarter") && !match.round.includes("Semi") && !match.round.includes("Final")) {
        const matchKey = findMatchPredictionsKey(match.team1, match.team2);
        if (matchKey && preds[`${matchKey}_home`] !== undefined) {
          totalScore += calculateGroupPoints(preds[`${matchKey}_home`], preds[`${matchKey}_away`], actH, actA);
        }
      } else {
        // Knockout Phase Advancement Logic
        let advancedTargetTeam = winner; 
        if (winner === 'Draw' && match.score.p) {
          advancedTargetTeam = match.score.p[0] > match.score.p[1] ? match.team1 : match.team2;
        }
        
        let roundBonusAdded = false;
        if (match.round === "Round of 32" && verifyAdvancementSelection(preds, 'r32', advancedTargetTeam)) {
          totalScore += 3; roundBonusAdded = true;
        } else if (match.round === "Round of 16" && verifyAdvancementSelection(preds, 'r16', advancedTargetTeam)) {
          totalScore += 5; roundBonusAdded = true;
        } else if (match.round === "Quarter-final" && verifyAdvancementSelection(preds, 'qf', advancedTargetTeam)) {
          totalScore += 8; roundBonusAdded = true;
        } else if (match.round === "Semi-final" && verifyAdvancementSelection(preds, 'sf', advancedTargetTeam)) {
          totalScore += 12; roundBonusAdded = true;
        } else if (match.round === "Final" && verifyAdvancementSelection(preds, 'f', advancedTargetTeam)) {
          totalScore += 20; roundBonusAdded = true; // Champion
        }
        
        // Method of victory evaluation (+3 extra bonus points)
        if (roundBonusAdded) {
          const userMethodSelection = preds[`match_${match.num}_method`];
          let actualMethod = 'koWin1'; // Default margin
          const diff = Math.abs(actH - actA);
          if (match.score.p) actualMethod = 'koWinPen';
          else if (diff === 2) actualMethod = 'koWin2';
          else if (diff >= 3) actualMethod = 'koWin3';
          
          if (userMethodSelection === actualMethod) {
            totalScore += 3;
          }
        }
      }
    });
    
    // Bonus Section Points Evaluation
    if (preds['bq1'] === finalTopScorer) totalScore += 15;
    if (preds['bq2'] === finalMostCards) totalScore += 10;
    if (preds['bq3'] === finalMostOwnGoals) totalScore += 10;
    
    if (preds['bq4'] !== undefined) {
      const guessedMin = parseInt(preds['bq4']);
      if (guessedMin === finalFirstGoalMinute) totalScore += 15;
      else if (Math.abs(guessedMin - finalFirstGoalMinute) <= 3) totalScore += 5;
    }
    
    scoreboard.push({ name: user, score: totalScore });
  }
  
  scoreboard.sort((a, b) => b.score - a.score);
  
  let html = `
    <table style="width:100%; border-collapse: collapse; text-align: left; background:#fff; box-shadow: 0 2px 5px rgba(0,0,0,0.05); border-radius:6px; overflow:hidden;">
      <thead>
        <tr style="background-color: #f8f9fa; border-bottom: 2px solid #dee2e6;">
          <th style="padding: 12px; font-weight:600;">${t.rank}</th>
          <th style="padding: 12px; font-weight:600;">${t.participant}</th>
          <th style="padding: 12px; font-weight:600;">${t.points}</th>
        </tr>
      </thead>
      <tbody>
  `;
  scoreboard.forEach((row, idx) => {
    html += `
      <tr style="border-bottom: 1px solid #dee2e6;">
        <td style="padding: 12px;"><strong>${idx + 1}</strong></td>
        <td style="padding: 12px;">${row.name}</td>
        <td style="padding: 12px; color: #28a745; font-weight: bold;">${row.score} pts</td>
      </tr>
    `;
  });
  html += '</tbody></table>';
  container.innerHTML = html;
}

function verifyAdvancementSelection(userObj, prefix, team) {
  const normalizedTeam = team.toLowerCase().replace(/[^a-z]/g, '');
  for (const inputId in userObj) {
    if (inputId.includes(prefix)) {
      const selection = String(userObj[inputId]).toLowerCase().replace(/[^a-z]/g, '');
      if (selection === normalizedTeam) return true;
    }
  }
  return false;
}
