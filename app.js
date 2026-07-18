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

const globalTeamTranslations = {
    "Mexico": { nl: "Mexico", es: "México", en: "Mexico" },
    "South Africa": { nl: "Zuid-Afrika", es: "Sudáfrica", en: "South Africa" },
    "South Korea": { nl: "Zuid-Korea", es: "Corea del Sur", en: "South Korea" },
    "Czech Republic": { nl: "Tsjechië", es: "Rep. Checa", en: "Czech Republic" },
    "Canada": { nl: "Canada", es: "Canadá", en: "Canada" },
    "Bosnia & Herzegovina": { nl: "Bosnië & Herz.", es: "Bosnia y Herz.", en: "Bosnia & Herzegovina" },
    "Qatar": { nl: "Qatar", es: "Catar", en: "Qatar" },
    "Switzerland": { nl: "Zwitserland", es: "Suiza", en: "Switzerland" },
    "Brazil": { nl: "Brazilië", es: "Brasil", en: "Brazil" },
    "Morocco": { nl: "Marokko", es: "Marruecos", en: "Morocco" },
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

// --- GLOBAL HELPER FUNCTIONS ---

// --- 3E PLAATS PARSER (Frankrijk vs Engeland) ---
function parseThirdPlacePick(pickStr) {
    if (!pickStr || pickStr === "-" || pickStr === "0-" || pickStr === "undefined") return null;
    const clean = String(pickStr).toUpperCase().trim();
    
    let team = null;
    if (clean.includes("F")) team = "F"; // Frankrijk
    else if (clean.includes("E")) team = "E"; // Engeland
    
    if (!team) return null; // Zonder geldig land geen voorspelling
    
    let method = null;
    if (clean.includes("P")) method = "P"; // Penalty's
    else if (clean.includes("1")) method = "1";
    else if (clean.includes("2")) method = "2";
    else if (clean.includes("3") || clean.includes("4") || clean.includes("5")) method = "3"; // 3+ goals
    
    return { team, method, raw: clean };
}

// Removes accents, emojis, spaces, and dashes, converting to lowercase
const normalizeTeamName = (str) => {
    if (!str) return "";
    return String(str).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z]/g, "");
};

// The "Bloodhound" function: fetches all language aliases for a team
function getAllTeamAliases(apiTeamName) {
    const aliases = new Set();
    aliases.add(normalizeTeamName(apiTeamName)); // Always add the base English name

    // Look directly into the global translation dictionary
    if (globalTeamTranslations[apiTeamName]) {
        const team = globalTeamTranslations[apiTeamName];
        if (team.nl) aliases.add(normalizeTeamName(team.nl));
        if (team.es) aliases.add(normalizeTeamName(team.es));
    }

    return Array.from(aliases);
}

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
            
            // 1. Voeg deze variabele weer toe
            let teamsLabel = `${t.koUnknown} <span style="color:#9ca3af; font-size: 12px; margin: 0 5px;">VS</span> ${t.koUnknown}`;
            
            if (round.id === "R32") {
                const t1 = matchUps[i-1][0];
                const t2 = matchUps[i-1][1];
                optionsHtml += `<option value="${t1}">${t1}</option><option value="${t2}">${t2}</option>`;
                
                // 2. Koppel hier de landnamen van R32 aan het label
                teamsLabel = `${t1} <span style="color:#9ca3af; font-size: 12px; margin: 0 5px;">VS</span> ${t2}`;
            }

            html += `
            <div class="ko-card">
                <div class="ko-match-title">Match ${i}</div>
                <!-- 3. Gebruik teamsLabel in plaats van hardcoded t.koUnknown -->
                <div id="${matchId}_label" class="ko-match-label">${teamsLabel}</div>
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
                awaySelect.value = possibleScores[Math.floor(Math.random() * possibleScores.length)];
            }
        });
        calculateGroupStandings(group); 
    }
    
    alert(translations[currentLang].debugMsg);
}

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

async function fetchAllDatabasePredictions() {
  try {
    const cacheBuster = new Date().getTime();
    const response = await fetch(`${SCRIPT_URL}?t=${cacheBuster}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching database predictions:", error);
    return {};
  }
}

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
  if (!container) return;
  const t = translations[currentLang] || translations['nl'];
  container.innerHTML = `<p style="text-align:center; color:#666; font-family:sans-serif; margin-top:20px;">${t.loading}</p>`;
  
  const data = await fetchWorldCupData();
  if (!data || !data.matches) {
    container.innerHTML = `<p style="text-align:center; padding:20px; font-family:sans-serif;">${t.noMatches}</p>`;
    return;
  }
  
  const selectedMatches = data.matches.filter(m => String(m.date).trim() === String(targetDateString).trim());
  
  if (selectedMatches.length === 0) {
    container.innerHTML = `<p style="text-align:center; padding:30px 10px; color:#777; font-family:sans-serif;">${t.noMatches} (${targetDateString})</p>`;
    return;
  }
  
  const allParticipants = await fetchAllDatabasePredictions();
  let html = '';
  
  selectedMatches.forEach(match => {
    const isFinished = match.score && match.score.ft;
    let actH = isFinished ? match.score.ft[0] : null;
    let actA = isFinished ? match.score.ft[1] : null;
    
    // OVERRIDE: If Extra Time was played, update the scores for the UI and calculations!
    if (isFinished && match.score.et) {
        actH = match.score.et[0];
        actA = match.score.et[1];
    }
    
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
    
    if (isFinished) {
      html += `<div style="background:#e2f0d9; color:#385723; padding:10px; border-radius:8px; font-weight:bold; font-size:14px; margin-bottom:15px; border-left:4px solid #385723;">Uitslag: ${actH} - ${actA}</div>`;
    } else {
      html += `<div style="background:#fff3cd; color:#856404; padding:10px; border-radius:8px; font-weight:bold; font-size:14px; margin-bottom:15px; border-left:4px solid #856404;">Scheduled / In Progress</div>`;
    }
    
    html += `
      <div style="background:#f8f9fa; padding:14px; border-radius:8px; box-sizing:border-box; width:100%; display:flex; flex-direction:column; gap:8px;">
        <div style="font-weight:bold; font-size:13px; color:#444; border-bottom:1px solid #e9ecef; padding-bottom:6px; margin-bottom:4px;">📋 ${t.predBy}:</div>
    `;
    
    // --- BEPAAL FASE ---
    // --- BEPAAL FASE (Met case-insensitive & landnamen fix) ---
    const roundLower = String(match.round || "").toLowerCase();
    const t1Norm = normalizeTeamName(match.team1);
    const t2Norm = normalizeTeamName(match.team2);
    const isFrEnMatch = (t1Norm === "france" && t2Norm === "england") || (t1Norm === "england" && t2Norm === "france");
    
    const isThirdPlaceMatch = roundLower.includes("third") || roundLower.includes("3rd") || roundLower.includes("play-off") || isFrEnMatch;
    const isKnockout = roundLower.includes("round") || roundLower.includes("quarter") || roundLower.includes("semi") || roundLower.includes("final") || isThirdPlaceMatch;

    // 🕵️‍♂️ DEBUG LOGGING IN DE CONSOLE
    console.groupCollapsed(`🔍 Check Match: ${match.team1} vs ${match.team2} (${match.round})`);
    console.log("Is 3e plaats wedstrijd?", isThirdPlaceMatch);

    if (isThirdPlaceMatch) {
      // ==========================================
      // 3E PLAATS LOGICA (Kolom E / Third)
      // ==========================================
      let totalPredsCount = 0;
      
      for (const pName in allParticipants) {
        const preds = allParticipants[pName];
        // Check alle mogelijke hoofdletter-variaties van de kolomnaam uit Google Sheets
        const rawThirdVal = preds.third || preds.Third || preds.THIRD || preds.third_place || "";
        const thirdPick = parseThirdPlacePick(rawThirdVal);
        
        console.log(`Deelnemer: ${pName} | Ruwe data uit sheet: "${rawThirdVal}" | Geparst:`, thirdPick);

        if (thirdPick || (rawThirdVal && rawThirdVal !== "-" && rawThirdVal !== "0-" && rawThirdVal !== "undefined")) {
          totalPredsCount++;
          let pointsEarned = 0;
          let calculationText = '';
          
          if (isFinished) {
            const diff = Math.abs(actH - actA);
            let actualMethodVal = "1";
            if (match.score.p) actualMethodVal = "P";
            else if (diff === 2) actualMethodVal = "2";
            else if (diff >= 3) actualMethodVal = "3";
            
            let actualWinnerTeam = null;
            const winnerName = actH > actA ? match.team1 : (actA > actH ? match.team2 : 'Draw');
            if (winnerName === 'Draw' && match.score.p) {
              const penWinner = match.score.p[0] > match.score.p[1] ? match.team1 : match.team2;
              actualWinnerTeam = normalizeTeamName(penWinner) === "france" ? "F" : "E";
            } else {
              actualWinnerTeam = normalizeTeamName(winnerName) === "france" ? "F" : "E";
            }
            
            if (thirdPick && thirdPick.team === actualWinnerTeam) {
              pointsEarned += 14;
              if (thirdPick.method === actualMethodVal) {
                pointsEarned += 3;
              }
            }
            calculationText = ` ➡️ <span style="color:${pointsEarned > 0 ? '#007bff' : '#ef4444'}; font-weight:bold; margin-left:4px;">(${pointsEarned} pts)</span>`;
          }
          
          let pickDisplay = rawThirdVal;
          if (thirdPick) {
            const pickWinnerName = thirdPick.team === "F" ? "Frankrijk" : "Engeland";
            const pickMethodName = thirdPick.method === "P" ? "(pen)" : `(+${thirdPick.method})`;
            pickDisplay = `<b>${pickWinnerName}</b> <span style="color:#6b7280; font-size: 11px;">${pickMethodName}</span>`;
          }
          
          html += `
            <div style="display:flex; justify-content:space-between; font-size:14px; padding:4px 0; border-bottom:1px dashed #e9ecef; color:#333;">
              <span style="font-weight:500;">${pName}</span>
              <span style="text-align:right;">${pickDisplay}${calculationText}</span>
            </div>
          `;
        }
      }
      
      console.log(`Totaal aantal gevonden 3e plaats voorspellingen: ${totalPredsCount}`);
      console.groupEnd();
      
      if (totalPredsCount === 0) {
        html += `<div style="font-size:13px; color:#999; font-style:italic; padding:5px 0;">Geen voorspellingen ingevuld voor deze wedstrijd.</div>`;
      }

    } else if (!isKnockout) {
      // ==========================================
      // GROEPSFASE LOGICA (Je originele code)
      // ==========================================
      // ==========================================
      // GROEPSFASE LOGICA (Je originele code)
      // ==========================================
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
      
    } else {
      // ==========================================
      // KNOCKOUT FASE LOGICA (Nieuw & Brute-Force)
      // ==========================================
      let roundPrefix = "";
      let basePoints = 0;
      if (match.round === "Round of 32") { roundPrefix = "R32"; basePoints = 3; }
      else if (match.round === "Round of 16") { roundPrefix = "R16"; basePoints = 5; }
      else if (match.round === "Quarter-final") { roundPrefix = "QF"; basePoints = 8; }
      else if (match.round === "Semi-final") { roundPrefix = "SF"; basePoints = 12; }
      else if (match.round === "Final") { roundPrefix = "F"; basePoints = 20; }

      // Verwijdert accenten, emoji's, spaties, streepjes en maakt er kleine letters van.
      const normalizeTeamName = (str) => {
          if (!str) return "";
          return String(str).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z]/g, "");
      };

      // 🚨 DE "BLOODHOUND" FUNCTIE 🚨
      // Omdat vertaalsleutels soms afwijken (bijv. "South_Africa" vs "South Africa"), 
      // zoekt deze functie het hele woordenboek af naar alle mogelijke alias-namen.
      // 🚨 DE "BLOODHOUND" FUNCTIE (Nu super efficiënt dankzij jouw data!) 🚨
      function getAllTeamAliases(apiTeamName) {
          const aliases = new Set();
          aliases.add(normalizeTeamName(apiTeamName)); // Voeg standaard de Engelse naam toe

          // Kijk direct in jouw eigen vertaalwoordenboek!
          if (globalTeamTranslations[apiTeamName]) {
              const team = globalTeamTranslations[apiTeamName];
              if (team.nl) aliases.add(normalizeTeamName(team.nl));
              if (team.es) aliases.add(normalizeTeamName(team.es));
          }

          return Array.from(aliases);
      }

      console.groupCollapsed(`🔍 Analyseer Match: ${match.team1} vs ${match.team2} (${roundPrefix})`);
      
      const team1Aliases = getAllTeamAliases(match.team1);
      const team2Aliases = getAllTeamAliases(match.team2);
      
      // LOG: Check hier straks of 'zuidafrika' netjes in de array staat!
      console.log(`Geaccepteerde varianten T1 (${match.team1}):`, team1Aliases);
      console.log(`Geaccepteerde varianten T2 (${match.team2}):`, team2Aliases);

      function isTeamMatch(savedValue, isTeam1, isTeam2) {
          if (!savedValue) return false;
          const valNorm = normalizeTeamName(savedValue);
          if (isTeam1 && team1Aliases.includes(valNorm)) return true;
          if (isTeam2 && team2Aliases.includes(valNorm)) return true;
          return false;
      }

      // Voor als de match is afgelopen: bereken de échte winnaar en marge
      let actualWinnerAPI = null;
      let actualMethodVal = null;
      
      if (isFinished) {
          const winner = actH > actA ? match.team1 : (actA > actH ? match.team2 : 'Draw');
          actualWinnerAPI = winner;
          if (winner === 'Draw' && match.score.p) {
              actualWinnerAPI = match.score.p[0] > match.score.p[1] ? match.team1 : match.team2;
          }

          const diff = Math.abs(actH - actA);
          actualMethodVal = '1';
          if (match.score.p) actualMethodVal = 'pen';
          else if (diff === 2) actualMethodVal = '2';
          else if (diff >= 3) actualMethodVal = '3';
      }

      let matchPredictionsList = [];

      for (const pName in allParticipants) {
          const preds = allParticipants[pName];
          let userPicksForThisMatch = [];
          let pointsEarned = 0;
          let userHasSkinInGame = false;

          for (const key in preds) {
              if (key.startsWith(roundPrefix + "_") && key.endsWith("_winner")) {
                  const pickedTeamRaw = String(preds[key]);
                  const isTeam1 = isTeamMatch(pickedTeamRaw, true, false);
                  const isTeam2 = isTeamMatch(pickedTeamRaw, false, true);

                  if (isTeam1 || isTeam2) {
                      userHasSkinInGame = true;
                      const matchNum = key.split('_')[1];
                      const marginKey = `${roundPrefix}_${matchNum}_margin`;
                      const marginVal = preds[marginKey];

                      console.log(`✅ MATCH: ${pName} voorspelde "${pickedTeamRaw}"`);

                      let marginText = marginVal;
                      if (marginVal === "1") marginText = "1 goal";
                      else if (marginVal === "2") marginText = "2 goals";
                      else if (marginVal === "3") marginText = "3+ goals";
                      else if (marginVal === "pen") marginText = "Penalty's";

                      const cleanTeamName = pickedTeamRaw.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '').trim();

                      // Bereken live punten als match klaar is
                      if (isFinished) {
                          const isWinnerPick = (isTeam1 && match.team1 === actualWinnerAPI) || (isTeam2 && match.team2 === actualWinnerAPI);
                          if (isWinnerPick) {
                              pointsEarned += basePoints;
                              if (marginVal === actualMethodVal) {
                                  pointsEarned += 3; // Exact margin bonus!
                              }
                          }
                      }
                      
                      let pickHtml = `<b>${cleanTeamName}</b> <span style="color:#6b7280; font-size: 11px;">(${marginText})</span>`;
                      userPicksForThisMatch.push(pickHtml);
                  }
              }
          }

          if (userHasSkinInGame) {
              let calculationText = '';
              if (isFinished) {
                  calculationText = ` ➡️ <span style="color:${pointsEarned > 0 ? '#007bff' : '#ef4444'}; font-weight:bold; margin-left:4px;">(${pointsEarned} pts)</span>`;
              }

              matchPredictionsList.push(`
                  <div style="display:flex; justify-content:space-between; font-size:14px; padding:4px 0; border-bottom:1px dashed #e9ecef; color:#333;">
                      <span style="font-weight:500;">${pName}</span>
                      <span style="text-align:right;">${userPicksForThisMatch.join(' <span style="color:#9ca3af; margin:0 4px;">&</span> ')}${calculationText}</span>
                  </div>
              `);
          }
      }

      console.groupEnd(); // Sluit de troubleshooting log voor deze wedstrijd

      if (matchPredictionsList.length > 0) {
          html += matchPredictionsList.join('');
      } else {
          html += `<div style="font-size:13px; color:#999; font-style:italic; padding:5px 0;">Geen voorspellingen voor deze landen in de ${match.round}.</div>`;
      }
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
  if (pH === aH && pA === aA) return 5; 
  if (Math.sign(pH - pA) === Math.sign(aH - aA)) return 2; 
  return 0; 
}

async function renderLeaderboard() {
  const container = document.getElementById('container-leaderboard');
  if (!container) return;
  const t = translations[currentLang];
  container.innerHTML = `<p>${t.loading}</p>`;
  
  const apiData = await fetchWorldCupData();
  const poolData = await fetchAllDatabasePredictions();
  
  if (!apiData || !poolData) {
    container.innerHTML = '<p>Error loading leaderboard.</p>';
    return;
  }
  
  window.currentApiData = apiData;
  window.currentPoolData = poolData;
  
  let scoreboard = [];
  const finalTopScorer = "PorDefinir";
  const finalMostCards = "PorDefinir";
  const finalMostOwnGoals = "PorDefinir";
  const finalFirstGoalMinute = 14; 

  // -------------------------------------------------------------
  // 🚨 3e PLAATS (FRANKRIJK - ENGELAND) RESULTAAT BEPAALDER
  // -------------------------------------------------------------
  // Fallback: Mocht de API de wedstrijd (nog) niet hebben, vul hier handmatig de uitslag in:
  // Bijv. Frankrijk wint met 1 goal: { team: "F", method: "1" }
  // Bijv. Engeland wint na penalty's: { team: "E", method: "P" }
  let actualThirdResult = null; 
  
  // We zoeken automatisch in de live API of Frankrijk - Engeland is gespeeld
  const apiThirdMatch = apiData.matches.find(m => {
    if (!m.team1 || !m.team2) return false;
    const t1 = normalizeTeamName(m.team1);
    const t2 = normalizeTeamName(m.team2);
    const isFrEn = (t1 === "france" && t2 === "england") || (t1 === "england" && t2 === "france");
    const isThirdRound = m.round && (m.round.includes("Third") || m.round.includes("3rd") || m.round.includes("Play-off"));
    return (isFrEn || isThirdRound) && m.score && m.score.ft;
  });

  if (apiThirdMatch) {
    let actH = apiThirdMatch.score.ft[0];
    let actA = apiThirdMatch.score.ft[1];
    if (apiThirdMatch.score.et) {
      actH = apiThirdMatch.score.et[0];
      actA = apiThirdMatch.score.et[1];
    }
    
    let winnerTeam = null;
    const winnerName = actH > actA ? apiThirdMatch.team1 : (actA > actH ? apiThirdMatch.team2 : 'Draw');
    if (winnerName === 'Draw' && apiThirdMatch.score.p) {
      const penWinner = apiThirdMatch.score.p[0] > apiThirdMatch.score.p[1] ? apiThirdMatch.team1 : apiThirdMatch.team2;
      winnerTeam = normalizeTeamName(penWinner) === "france" ? "F" : "E";
    } else {
      winnerTeam = normalizeTeamName(winnerName) === "france" ? "F" : "E";
    }
    
    const diff = Math.abs(actH - actA);
    let method = "1";
    if (apiThirdMatch.score.p) method = "P";
    else if (diff === 2) method = "2";
    else if (diff >= 3) method = "3";
    
    actualThirdResult = { team: winnerTeam, method: method };
  }
  
  // Sla op zodat we niet opnieuw hoeven te zoeken in de modal
  window.currentActualThirdResult = actualThirdResult;  
  
  for (const user in poolData) {
    const preds = poolData[user];
    let totalScore = 0;
    
    // Tel handmatige First Goal Bonus uit kolom D mee
    if (preds.first_goal_bonus) {
      totalScore += parseInt(preds.first_goal_bonus) || 0;
    }

    // --- 3E PLAATS BONUS (Kolom E / Third) ---
    const rawThirdVal = preds.third || preds.Third || preds.third_place || "";
    const thirdPick = parseThirdPlacePick(rawThirdVal);
    
    if (thirdPick && actualThirdResult) {
      if (thirdPick.team === actualThirdResult.team) {
        totalScore += 14; // Goede winnaar voorspeld (+14 pts)
        if (thirdPick.method === actualThirdResult.method) {
          totalScore += 3;  // Exacte marge/penalty bonus (+3 pts)
        }
      }
    }
    
    apiData.matches.forEach(match => {
      if (!match.score || !match.score.ft) return;
      // Start with the Full Time score
      let actH = match.score.ft[0];
      let actA = match.score.ft[1];
      
      // OVERRIDE: If Extra Time was played, use the Extra Time score instead!
      if (match.score.et) {
          actH = match.score.et[0];
          actA = match.score.et[1];
      }
      
      const winner = actH > actA ? match.team1 : (actA > actH ? match.team2 : 'Draw');
      
      const isKnockout = match.round.includes("Round") || match.round.includes("Quarter") || match.round.includes("Semi") || match.round.includes("Final");

      if (!isKnockout) {
        // Groepsfase
        const matchKey = findMatchPredictionsKey(match.team1, match.team2);
        if (matchKey && preds[`${matchKey}_home`] !== undefined) {
          totalScore += calculateGroupPoints(preds[`${matchKey}_home`], preds[`${matchKey}_away`], actH, actA);
        }
      } else {
        // Knockout Fase (Gebruikt nu dezelfde slimme aliassen!)
        let roundPrefix = "";
        let basePoints = 0;
        if (match.round === "Round of 32") { roundPrefix = "R32"; basePoints = 3; }
        else if (match.round === "Round of 16") { roundPrefix = "R16"; basePoints = 5; }
        else if (match.round === "Quarter-final") { roundPrefix = "QF"; basePoints = 8; }
        else if (match.round === "Semi-final") { roundPrefix = "SF"; basePoints = 12; }
        else if (match.round === "Final") { roundPrefix = "F"; basePoints = 20; }

        let advancedTargetTeam = winner; 
        if (winner === 'Draw' && match.score.p) {
          advancedTargetTeam = match.score.p[0] > match.score.p[1] ? match.team1 : match.team2;
        }

        const diff = Math.abs(actH - actA);
        let actualMethodVal = '1';
        if (match.score.p) actualMethodVal = 'pen';
        else if (diff === 2) actualMethodVal = '2';
        else if (diff >= 3) actualMethodVal = '3';

        const actualWinnerAliases = getAllTeamAliases(advancedTargetTeam);

        for (const key in preds) {
          if (key.startsWith(roundPrefix + "_") && key.endsWith("_winner")) {
            const pickedTeamRaw = String(preds[key]);
            const valNorm = normalizeTeamName(pickedTeamRaw);

            // Als de speler de échte winnaar ergens in deze ronde had voorspeld:
            if (actualWinnerAliases.includes(valNorm)) {
              totalScore += basePoints;
              
              // Controleer op +3 Exacte Marge Bonus
              const matchNum = key.split('_')[1];
              const marginKey = `${roundPrefix}_${matchNum}_margin`;
              if (preds[marginKey] === actualMethodVal) {
                totalScore += 3;
              }
              break; // Winnaar gevonden, stop met zoeken in deze ronde voor dit team
            }
          }
        }
      }
    });
    
    // Bonusvragen
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
      <tr onclick="showParticipantBreakdown('${row.name.replace(/'/g, "\\'")}')" 
          style="border-bottom: 1px solid #dee2e6; cursor: pointer; transition: background 0.15s;" 
          onmouseover="this.style.backgroundColor='#f1f5f9'" 
          onmouseout="this.style.backgroundColor='transparent'">
        <td style="padding: 12px;"><strong>${idx + 1}</strong></td>
        <td style="padding: 12px;">${row.name}</td>
        <td style="padding: 12px; color: #28a745; font-weight: bold;">${row.score} pts</td>
      </tr>
    `;
  });
  html += '</tbody></table>';
  container.innerHTML = html;
}

function showParticipantBreakdown(userName) {
    const apiData = window.currentApiData;
    const poolData = window.currentPoolData;
    if (!apiData || !poolData || !poolData[userName]) return;

    const preds = poolData[userName];
    
    const finalTopScorer = "PorDefinir";
    const finalMostCards = "PorDefinir";
    const finalMostOwnGoals = "PorDefinir";
    const finalFirstGoalMinute = 14;

    let html = `
        <div style="background: white; padding: 22px; border-radius: 14px; max-width: 550px; width: 92%; max-height: 78vh; overflow-y: auto; box-shadow: 0 12px 30px rgba(0,0,0,0.25); font-family: sans-serif; position: relative; animation: poulePop 0.2s ease-out;">
            <button onclick="closePouleModal()" style="position: absolute; top: 14px; right: 16px; background: none; border: none; font-size: 22px; cursor: pointer; color: #9ca3af; font-weight: bold;">✕</button>
            <h3 style="margin-top: 0; margin-bottom: 15px; color: #111827; border-bottom: 2px solid #f3f4f6; padding-bottom: 10px; font-size: 18px;">📊 Puntenoverzicht: ${userName}</h3>
            
            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13px;">
                <thead>
                    <tr style="background: #f3f4f6; border-bottom: 1px solid #e5e7eb; color: #4b5563;">
                        <th style="padding: 8px;">Onderdeel</th>
                        <th style="padding: 8px; text-align: center;">Voorspelling</th>
                        <th style="padding: 8px; text-align: center;">Uitslag</th>
                        <th style="padding: 8px; text-align: right;">Score</th>
                    </tr>
                </thead>
                <tbody>
    `;

    const firstGoalBonus = parseInt(preds.first_goal_bonus) || 0;
    if (firstGoalBonus > 0) {
        html += `
            <tr style="background: #f0fdf4; font-weight: bold; border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 10px; color: #16a34a;">🎁 First Goal Bonus (Column D)</td>
                <td style="padding: 10px; text-align: center;">-</td>
                <td style="padding: 10px; text-align: center;">-</td>
                <td style="padding: 10px; text-align: right; color: #16a34a;">+${firstGoalBonus} pts</td>
            </tr>
        `;
    }

    // --- 3E PLAATS WEERGAVE IN MODAL ---
    const rawThirdVal = preds.third || preds.Third || preds.third_place || "";
    const thirdPick = parseThirdPlacePick(rawThirdVal);
    const actualThirdResult = window.currentActualThirdResult;

    if (thirdPick || (rawThirdVal !== "" && rawThirdVal !== "-" && rawThirdVal !== "0-")) {
        let thirdPoints = 0;
        let resultText = "-";
        let methodText = "";
        
        if (actualThirdResult) {
            const actualWinnerName = actualThirdResult.team === "F" ? "Frankrijk" : "Engeland";
            const actualMethodName = actualThirdResult.method === "P" ? "(pen)" : `(+${actualThirdResult.method})`;
            resultText = `${actualWinnerName} ${actualMethodName}`;
            
            if (thirdPick && thirdPick.team === actualThirdResult.team) {
                thirdPoints += 14;
                if (thirdPick.method === actualThirdResult.method) {
                    thirdPoints += 3;
                    methodText = " <small style='color:#3b82f6;'>+Uitslag</small>";
                }
            }
        }
        
        let pickText = "-";
        if (thirdPick) {
            const pickWinnerName = thirdPick.team === "F" ? "Frankrijk" : "Engeland";
            const pickMethodName = thirdPick.method === "P" ? "(pen)" : `(+${thirdPick.method})`;
            pickText = `${pickWinnerName} ${pickMethodName}`;
        } else if (rawThirdVal && rawThirdVal !== "-") {
            pickText = rawThirdVal; 
        }
        
        if (pickText !== "-") {
            html += `
                <tr style="background: #f8fafc; border-bottom: 1px solid #e5e7eb;">
                    <td style="padding: 10px; color: #1e293b; font-weight: 500;">🥉 3e Plaats (Frankrijk - Engeland)</td>
                    <td style="padding: 10px; text-align: center; font-weight:500;">${pickText}</td>
                    <td style="padding: 10px; text-align: center; color: #666;">${resultText}</td>
                    <td style="padding: 10px; text-align: right; font-weight: bold; color: ${thirdPoints > 0 ? '#3b82f6' : '#9ca3af'};">${thirdPoints > 0 ? `+${thirdPoints}${methodText}` : '0'} pts</td>
                </tr>
            `;
        }
    }

    apiData.matches.forEach(match => {
        if (!match.score || !match.score.ft) return;
        // Start with the Full Time score
        let actH = match.score.ft[0];
        let actA = match.score.ft[1];
          
        // OVERRIDE: If Extra Time was played, use the Extra Time score instead!
        if (match.score.et) {
            actH = match.score.et[0];
            actA = match.score.et[1];
        }
          
        const winner = actH > actA ? match.team1 : (actA > actH ? match.team2 : 'Draw');
        const matchName = `${getLocalTeamName(match.team1)} - ${getLocalTeamName(match.team2)}`;
        
        let predText = "-";
        let pointsEarned = 0;

        const isKnockout = match.round.includes("Round") || match.round.includes("Quarter") || match.round.includes("Semi") || match.round.includes("Final");

        if (!isKnockout) {
            const matchKey = findMatchPredictionsKey(match.team1, match.team2);
            if (matchKey && preds[`${matchKey}_home`] !== undefined) {
                predText = `${preds[`${matchKey}_home`]} - ${preds[`${matchKey}_away`]}`;
                pointsEarned = calculateGroupPoints(preds[`${matchKey}_home`], preds[`${matchKey}_away`], actH, actA);
            }
            if (predText !== "-") {
                html += `
                    <tr style="border-bottom: 1px solid #f3f4f6;">
                        <td style="padding: 8px; color: #4b5563;">${matchName} <small style="color:#9ca3af;">(Groep)</small></td>
                        <td style="padding: 8px; text-align: center; font-weight:500;">${predText}</td>
                        <td style="padding: 8px; text-align: center; color: #666;">${actH} - ${actA}</td>
                        <td style="padding: 8px; text-align: right; font-weight: bold; color: ${pointsEarned > 0 ? '#10b981' : '#9ca3af'};">${pointsEarned > 0 ? `+${pointsEarned}` : '0'} pts</td>
                    </tr>
                `;
            }
        } else {
            let roundPrefix = "";
            let basePoints = 0;
            if (match.round === "Round of 32") { roundPrefix = "R32"; basePoints = 3; }
            else if (match.round === "Round of 16") { roundPrefix = "R16"; basePoints = 5; }
            else if (match.round === "Quarter-final") { roundPrefix = "QF"; basePoints = 8; }
            else if (match.round === "Semi-final") { roundPrefix = "SF"; basePoints = 12; }
            else if (match.round === "Final") { roundPrefix = "F"; basePoints = 20; }

            let advancedTargetTeam = winner; 
            if (winner === 'Draw' && match.score.p) {
                advancedTargetTeam = match.score.p[0] > match.score.p[1] ? match.team1 : match.team2;
            }
            
            const diff = Math.abs(actH - actA);
            let actualMethodVal = '1';
            if (match.score.p) actualMethodVal = 'pen';
            else if (diff === 2) actualMethodVal = '2';
            else if (diff >= 3) actualMethodVal = '3';

            const actualWinnerAliases = getAllTeamAliases(advancedTargetTeam);
            let koPoints = 0;
            let methodPoints = 0;
            let methodText = "";
            let roundBonusAdded = false;

            for (const key in preds) {
              if (key.startsWith(roundPrefix + "_") && key.endsWith("_winner")) {
                const pickedTeamRaw = String(preds[key]);
                const valNorm = normalizeTeamName(pickedTeamRaw);

                if (actualWinnerAliases.includes(valNorm)) {
                  roundBonusAdded = true;
                  koPoints = basePoints;
                  
                  const matchNum = key.split('_')[1];
                  const marginKey = `${roundPrefix}_${matchNum}_margin`;
                  if (preds[marginKey] === actualMethodVal) {
                    methodPoints = 3;
                    methodText = " <small style='color:#3b82f6;'>+Uitslag</small>";
                  }
                  break;
                }
              }
            }

            pointsEarned = koPoints + methodPoints;
            if (roundBonusAdded) {
                html += `
                    <tr style="border-bottom: 1px solid #f3f4f6; background: #f8fafc;">
                        <td style="padding: 8px; color: #1e293b; font-weight: 500;">${matchName} <small style="color:#3b82f6; font-weight:600;">(KO)</small></td>
                        <td style="padding: 8px; text-align: center; color: #10b981; font-weight:600; font-size:11px;">✔ Door<sup>${methodText}</sup></td>
                        <td style="padding: 8px; text-align: center; color: #666;">${actH} - ${actA}</td>
                        <td style="padding: 8px; text-align: right; font-weight: bold; color: #3b82f6;">+${pointsEarned} pts</td>
                    </tr>
                `;
            }
        }
    });

    // Bonusvragen
    let bonusQuestionsHtml = "";
    if (preds['bq1'] === finalTopScorer) { bonusQuestionsHtml += `<tr style="border-bottom: 1px solid #f3f4f6; background:#fffbeb;"><td style="padding: 8px; font-weight:500;">🏆 Topscorer</td><td style="padding: 8px; text-align:center;">${preds['bq1']}</td><td style="padding: 8px; text-align:center;">${finalTopScorer}</td><td style="padding: 8px; text-align:right; font-weight:bold; color:#d97706;">+15 pts</td></tr>`; }
    if (preds['bq2'] === finalMostCards) { bonusQuestionsHtml += `<tr style="border-bottom: 1px solid #f3f4f6; background:#fffbeb;"><td style="padding: 8px; font-weight:500;">🟨 Meeste Kaarten</td><td style="padding: 8px; text-align:center;">${preds['bq2']}</td><td style="padding: 8px; text-align:center;">${finalMostCards}</td><td style="padding: 8px; text-align:right; font-weight:bold; color:#d97706;">+10 pts</td></tr>`; }
    if (preds['bq3'] === finalMostOwnGoals) { bonusQuestionsHtml += `<tr style="border-bottom: 1px solid #f3f4f6; background:#fffbeb;"><td style="padding: 8px; font-weight:500;">⚽ Eigen Doelpunten</td><td style="padding: 8px; text-align:center;">${preds['bq3']}</td><td style="padding: 8px; text-align:center;">${finalMostOwnGoals}</td><td style="padding: 8px; text-align:right; font-weight:bold; color:#d97706;">+10 pts</td></tr>`; }
    
    if (preds['bq4'] !== undefined) {
        const guessedMin = parseInt(preds['bq4']);
        if (guessedMin === finalFirstGoalMinute) {
            bonusQuestionsHtml += `<tr style="border-bottom: 1px solid #f3f4f6; background:#fffbeb;"><td style="padding: 8px; font-weight:500;">⏱ Minuut 1e Goal</td><td style="padding: 8px; text-align:center;">${guessedMin}'</td><td style="padding: 8px; text-align:center;">${finalFirstGoalMinute}'</td><td style="padding: 8px; text-align:right; font-weight:bold; color:#d97706;">+15 pts</td></tr>`;
        } else if (Math.abs(guessedMin - finalFirstGoalMinute) <= 3) {
            bonusQuestionsHtml += `<tr style="border-bottom: 1px solid #f3f4f6; background:#fffbeb;"><td style="padding: 8px; font-weight:500;">⏱ Minuut 1e Goal (In de buurt)</td><td style="padding: 8px; text-align:center;">${guessedMin}'</td><td style="padding: 8px; text-align:center;">${finalFirstGoalMinute}'</td><td style="padding: 8px; text-align:right; font-weight:bold; color:#d97706;">+5 pts</td></tr>`;
        }
    }
    html += bonusQuestionsHtml;

    html += `
                </tbody>
            </table>
        </div>
        <style>
            @keyframes poulePop { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        </style>
    `;

    let modalOverlay = document.getElementById('poule-modal-overlay');
    if (!modalOverlay) {
        modalOverlay = document.createElement('div');
        modalOverlay.id = 'poule-modal-overlay';
        modalOverlay.style.position = 'fixed';
        modalOverlay.style.top = '0';
        modalOverlay.style.left = '0';
        modalOverlay.style.width = '100%';
        modalOverlay.style.height = '100%';
        modalOverlay.style.background = 'rgba(0, 0, 0, 0.45)';
        modalOverlay.style.backdropFilter = 'blur(4px)';
        modalOverlay.style.display = 'flex';
        modalOverlay.style.justifyContent = 'center';
        modalOverlay.style.alignItems = 'center';
        modalOverlay.style.zIndex = '99999';
        
        modalOverlay.onclick = function(e) { if(e.target === modalOverlay) closePouleModal(); };
        document.body.appendChild(modalOverlay);
    }
    
    modalOverlay.innerHTML = html;
    modalOverlay.style.display = 'flex';
}

function closePouleModal() {
    const modalOverlay = document.getElementById('poule-modal-overlay');
    if (modalOverlay) modalOverlay.style.display = 'none';
}

// --- VERIFICATIE TEST FUNCTIE ---
function checkVersion() {
    const timestamp = "2026-07-19 00:30:00";
    console.log("🚀 LATEST VERSION LOADED!");
    console.log("⏱ Build Timestamp:", timestamp);
    return "Version 8888 is active.";
}
