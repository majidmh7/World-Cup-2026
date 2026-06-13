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
// 3. HET GROTE WOORDENBOEK (VERTALINGEN)
// =========================================================================
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

// =========================================================================
// 4. RUN INITIAL SETUP CALLS (Na initialisatie variabelen)
// =========================================================================
generateFifa495Table();
setupLanguageData();

// ==========================================
// FIFA 2026: 495-RIJEN LOOKUP TABEL LOGICA
// ==========================================
function generateFifa495Table() {
    const hostGroups = ['E', 'I', 'A', 'L', 'D', 'G', 'B', 'K'];
    const allGroupsList = ['A','B','C','D','E','F','G','H','I','J','K','L'];
    
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

    all495Combinations.forEach(combo => {
        const comboKey = combo.join('');
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
        fifa3rdPlaceTable[comboKey] = assignment;
    });
}

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
// 5. INITIALISATIE & NAVIGATIE
// ==========================================
function initApp(lang) {
  console.log("➡️ initApp started with language:", lang);
  currentLang = lang;
  localStorage.setItem('poule_lang', lang);
  
  setupLanguageData();
  applyTranslations();

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
        loadPredictions();
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
  
  localStorage.setItem('poule_user_name', name);
  
  const nameScreen = document.getElementById('name-screen');
  if (nameScreen) {
    nameScreen.classList.remove('active');
    nameScreen.style.display = 'none'; 
  }
  
  const groupScreen = document.getElementById('group-stage-screen');
  if (groupScreen) {
    groupScreen.classList.add('active');
    groupScreen.style.display = 'block'; 
  }
  
  loadPredictions();
}

function switchScreen(hideId, showId) {
  const hideEl = document.getElementById(hideId);
  const showEl = document.getElementById(showId);

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
// 6. GROEPSFASE (TABELLEN)
// ==========================================
const optionsHTML = `<option value="" disabled selected>-</option><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5+">5+</option>`;

function renderMatches() {
    const t = translations[currentLang];
    const container = document.getElementById('groups-container');
    if (!container) return;
    let html = '';
    const matchOrder = [ [0,1], [2,3], [0,2], [3,1], [3,0], [1,2] ];

    for (const group in allGroups) {
        html += `<h3 class="group-title">Groep ${group} / Grupo ${group}</h3>`;
        
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

// Corregido: Agregada la función renderStandingsTable que faltaba de forma explícita
function renderStandingsTable(group, stats) {
    const container = document.getElementById(`standings-${group}`);
    if (!container) return;
    let html = `<table class="standings-table"><thead><tr><th>Team</th><th>W</th><th>D</th><th>L</th><th>GD</th><th>Pts</th></tr></thead><tbody>`;
    stats.forEach((team, index) => { html += `<tr><td class="team-name">${index + 1}. ${team.name}</td><td>${team.w}</td><td>${team.d}</td><td>${team.l}</td><td>${team.gd}</td><td class="pts">${team.pts}</td></tr>`; });
    html += `</tbody></table>`;
    container.innerHTML = html;
}

// ==========================================
// 7. KNOCK-OUT FASE (BRACKET LOGICA)
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
            
            target.innerHTML = `<option value="" disabled selected>${t.koSelectCountry}</option>`;
            if (opt1) target.innerHTML += `<option value="${opt1}">${opt1}</option>`;
            if (opt2) target.innerHTML += `<option value="${opt2}">${opt2}</option>`;
            
            if (currentVal && (currentVal === opt1 || currentVal === opt2)) {
                target.value = currentVal;
            } else {
                target.value = "";
            }

            if (labelEl) {
                const label1 = opt1 ? opt1 : t.koUnknown;
                const label2 = opt2 ? opt2 : t.koUnknown;
                labelEl.innerHTML = `${label1} <span style="color:#9ca3af; font-size: 12px; margin: 0 5px;">VS</span> ${label2}`;
            }
        });
    });
    updateVisualBracket(); 
}

function startKnockouts() {
    const t = translations[currentLang];
    
    let filled = false;
    for (const group in allGroups) {
        const container = document.getElementById(`standings-${group}`);
        if (container && container.innerHTML !== "") filled = true;
    }
    if (!filled) { alert(t.alertFillGroup); return; }

    switchScreen('group-stage-screen', 'knockout-screen');

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

    renderKnockoutBracket(matchUps); 
    
    setTimeout(() => {
        if (typeof renderVisualBracket === "function") renderVisualBracket(matchUps);
        if (typeof updateVisualBracket === "function") updateVisualBracket();
        console.log("➡️ Knockout phase fully rendered.");
    }, 100); 
}

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
    
    container.innerHTML = html;

    console.log("➡️ Startte data herstel...");
    
    rounds.forEach(round => {
        for (let i = 1; i <= round.count; i++) {
            const matchId = `${round.id}_${i}`;
            const savedWinner = savedDatabaseData[`${matchId}_winner`];
            const selectWinner = document.getElementById(`${matchId}_winner`);
            
            if (savedWinner && selectWinner) {
                let teamFlag = null;
                for (const groupKey in rawGroups) {
                    for (const team of rawGroups[groupKey]) {
                        if (savedWinner.includes(team[1])) {
                            teamFlag = team[1];
                            break;
                        }
                    }
                    if (teamFlag) break;
                }

                for (let j = 0; j < selectWinner.options.length; j++) {
                    const optVal = selectWinner.options[j].value;
                    if (optVal === savedWinner || (teamFlag && optVal.includes(teamFlag))) {
                        selectWinner.value = optVal;
                        selectWinner.dispatchEvent(new Event('change')); 
                        break;
                    }
                }
            }

            const savedMargin = savedDatabaseData[`${matchId}_margin`];
            const selectMargin = document.getElementById(`${matchId}_margin`);
            if (savedMargin && selectMargin) {
                selectMargin.value = savedMargin;
            }
        }
    });

    setTimeout(() => {
        updateKnockoutOptions(); 
        if (typeof updateVisualBracket === "function") updateVisualBracket();
    }, 200);
}

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
            
            const winnerSelect = document.getElementById(`${matchId}_winner`);
            const winner = winnerSelect ? winnerSelect.value : null; 
            
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
            
            if (winner) {
                if (targetEl1 && targetEl1.innerText === winner) targetEl1.classList.add('winner');
                else if (targetEl1) targetEl1.classList.remove('winner');
                
                if (targetEl2 && targetEl2.innerText === winner) targetEl2.classList.add('winner');
                else if (targetEl2) targetEl2.classList.remove('winner');
            }
        }
    });
}

// ==========================================
// 8. BONUS VRAGEN
// ==========================================
function startBonus() {
    switchScreen('knockout-screen', 'bonus-screen');
    renderBonus();
}

function renderBonus() {
    const t = translations[currentLang];
    const container = document.getElementById('bonus-container');
    if (!container) return;
    const teamOptions = `<option value="" disabled selected>${t.koSelectCountry}</option>` + allTeamsFlat.map(team => `<option value="${team}">${team}</option>`).join('');
    
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

    const bonusIds = ['bonus_topscorer', 'bonus_kaarten', 'bonus_owngoals', 'bonus_minuut'];
    bonusIds.forEach(id => {
        const element = document.getElementById(id);
        if (element && savedDatabaseData[id]) {
            element.value = savedDatabaseData[id];
        }
    });
}

// ==========================================
// 9. ALLES OPSLAAN & INLADEN
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
    const saveBtnKo = document.getElementById('save-btn-ko'); 
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
        const cacheBuster = new Date().getTime();
        const response = await fetch(`${SCRIPT_URL}?naam=${userName}&t=${cacheBuster}`);
        const data = await response.json();
        
        if (data.status !== "niet gevonden" && !data.error) {
            if (data.voorspellingen) {
                savedDatabaseData = typeof data.voorspellingen === 'string' ? JSON.parse(data.voorspellingen) : data.voorspellingen;
            } else if (typeof data === 'string') {
                savedDatabaseData = JSON.parse(data);
            } else {
                savedDatabaseData = data;
            }

            for (const key in savedDatabaseData) {
                const input = document.getElementById(key);
                if (input) input.value = savedDatabaseData[key];
            }
            for (const group in allGroups) calculateGroupStandings(group);
        }
    } catch (error) { 
        console.error("Fout bij inladen data:", error); 
    }
}

// ==========================================
// 10. DEBUG & LIVE DATA FETCH LOGICA
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
                awaySelect.value = possibleScores
