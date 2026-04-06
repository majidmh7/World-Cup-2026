// ==========================================
// 1. HET GROTE WOORDENBOEK (VERTALINGEN)
// ==========================================
const translations = {
    nl: { 
        title: "WK 2026 Poule", welcome: "Welkom bij de Familie Poule!", instructions: "Vul hieronder de uitslagen in.",
        nameTitle: "Wie ben je?", namePlaceholder: "Je naam...", btnStart: "Starten", 
        koTitle: "Knock-out Fase", koDesc: "Kies de winnaars van elke ronde.",
        bonusTitle: "Bonus Vragen 🎁", bonusDesc: "Verdien extra punten met deze voorspellingen!",
        btnSave: "Opslaan", btnSaving: "Opslaan...", btnToKnockout: "Knock-outs ➡️", btnBack: "⬅️ Terug",
        btnToBonus: "Naar Bonus 🎁", btnSaveAll: "Alles Opslaan ✅", alertFillGroup: "Vul de groepsfase in!",
        alertSaved: "Alles succesvol opgeslagen! 🎉", alertError: "Fout bij opslaan. Check je internetverbinding.",
        alertName: "Geldige naam a.u.b.", koSelectCountry: "Selecteer land...", koWinMethod: "Manier van winnen?",
        koWin1: "Winnaar met 1 goal verschil", koWin2: "Winnaar met 2 goals verschil", koWin3: "Winnaar met 3+ goals verschil",
        koWinPen: "Gewonnen na Penalty's", r32: "1/16e Finale (Round of 32)", r16: "1/8e Finale (Achtste Finale)",
        qf: "Kwartfinale", sf: "Halve Finale", f: "De Finale 🏆",
        bq1: "1. Wie wordt de Topscorer van het toernooi? (Spelersnaam)", bq2: "2. Welk land pakt de meeste Gele/Rode kaarten?",
        bq3: "3. Welk land scoort de meeste eigen doelpunten?", bq4: "4. In welke minuut valt het allereerste doelpunt van het WK?",
        bExPlayer: "Bijv: Cody Gakpo", bExMin: "Bijv: 14", debugMsg: "🤖 Debug Mode Actief: Alle uitslagen willekeurig ingevuld!",
        koUnknown: "Nog onbekend"
    },
    es: { 
        title: "Quiniela Mundial 2026", welcome: "¡Bienvenidos a la Quiniela Familiar!", instructions: "Introduce los resultados a continuación.",
        nameTitle: "¿Quién eres?", namePlaceholder: "Tu nombre...", btnStart: "Empezar",
        koTitle: "Fase Eliminatoria", koDesc: "Elige los ganadores de cada ronda.",
        bonusTitle: "Preguntas Extra 🎁", bonusDesc: "¡Gana puntos extra con estas predicciones!",
        btnSave: "Guardar", btnSaving: "Guardando...", btnToKnockout: "Eliminatorias ➡️", btnBack: "⬅️ Volver",
        btnToBonus: "Extra 🎁", btnSaveAll: "Guardar Todo ✅", alertFillGroup: "¡Completa la fase de grupos!",
        alertSaved: "¡Todo guardado con éxito! 🎉", alertError: "Error al guardar. Revisa tu conexión.",
        alertName: "Nombre válido por favor.", koSelectCountry: "Selecciona un país...", koWinMethod: "¿Cómo ganaron?",
        koWin1: "Ganador por 1 gol", koWin2: "Ganador por 2 goles", koWin3: "Ganador por 3+ goles",
        koWinPen: "Ganador por Penaltis", r32: "Dieciseisavos de final", r16: "Octavos de final",
        qf: "Cuartos de final", sf: "Semifinal", f: "La Final 🏆",
        bq1: "1. ¿Quién será el máximo goleador del torneo? (Jugador)", bq2: "2. ¿Qué país recibirá más tarjetas amarillas/rojas?",
        bq3: "3. ¿Qué país marcará más autogoles?", bq4: "4. ¿En qué minuto se marcará el primer gol del Mundial?",
        bExPlayer: "Ej: Lamine Yamal", bExMin: "Ej: 14", debugMsg: "🤖 Modo Debug: ¡Resultados aleatorios generados!",
        koUnknown: "Por determinar"
    }
};

let currentLang = 'nl';
let savedDatabaseData = {};

// ---> PLAK HIER JOUW GOOGLE SCRIPT LINK TUSSEN DE AANHALINGSTEKENS <---
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwsvpBcZFTEWBdVvskYtM1slnLNi116ru5zS7v6PdVjBIF22KXoXTPvYlXyJpXJMa6E/exec'; 

// ==========================================
// FIFA 2026: 495-RIJEN LOOKUP TABEL
// ==========================================
let fifa3rdPlaceTable = {};

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

let allGroups = {};
let allTeamsFlat = [];

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
    currentLang = lang;
    setupLanguageData(); 
    applyTranslations();
    const savedName = localStorage.getItem('poule_user_name');
    document.getElementById('language-screen').classList.remove('active');
    
    if (savedName) showMainApp(savedName);
    else document.getElementById('name-screen').classList.add('active');
}

function applyTranslations() {
    const t = translations[currentLang];
    if (document.getElementById('ui-title')) document.getElementById('ui-title').innerText = t.title;
    if (document.getElementById('ui-welcome')) document.getElementById('ui-welcome').innerText = t.welcome;
    if (document.getElementById('ui-instructions')) document.getElementById('ui-instructions').innerText = t.instructions;
    
    // Toegevoegd voor het naam scherm
    if (document.getElementById('ui-name-title')) document.getElementById('ui-name-title').innerText = t.nameTitle;
    if (document.getElementById('name-input')) document.getElementById('name-input').placeholder = t.namePlaceholder;
    if (document.getElementById('ui-btn-start')) document.getElementById('ui-btn-start').innerText = t.btnStart;

    if (document.getElementById('ui-ko-title')) document.getElementById('ui-ko-title').innerText = t.koTitle;
    if (document.getElementById('ui-ko-desc')) document.getElementById('ui-ko-desc').innerText = t.koDesc;
    if (document.getElementById('ui-bonus-title')) document.getElementById('ui-bonus-title').innerText = t.bonusTitle;
    if (document.getElementById('ui-bonus-desc')) document.getElementById('ui-bonus-desc').innerText = t.bonusDesc;

    if (document.getElementById('groups-container').innerHTML !== '') {
        renderMatches();
        if (document.getElementById('knockout-screen').classList.contains('active')) startKnockouts();
        if (document.getElementById('bonus-screen').classList.contains('active')) renderBonus();
    }
}

function submitName() {
    let inputName = document.getElementById('name-input').value;
    if (inputName.length < 2) return alert(translations[currentLang].alertName);
    const cleanName = inputName.trim().toLowerCase();
    localStorage.setItem('poule_user_name', cleanName);
    showMainApp(cleanName);
}

function showMainApp(name) {
    document.getElementById('name-screen').classList.remove('active');
    document.getElementById('app-screen').classList.add('active');
    renderMatches();
    
    if (name === 'majiddebug') fillRandomScores();
    else loadPredictions();
}

function switchScreen(hideId, showId) {
    document.getElementById(hideId).classList.remove('active');
    document.getElementById(showId).classList.add('active');
    window.scrollTo(0,0);
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

function startKnockouts() {
    const t = translations[currentLang];
    let firstPlaces = [], secondPlaces = [], thirdPlaces = [];
    const groupLetters = ['A','B','C','D','E','F','G','H','I','J','K','L'];
    
    for (const group of groupLetters) {
        const table = document.querySelector(`#standings-${group} tbody`);
        if (!table) return alert(t.alertFillGroup);
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

    // 1. Vind de 8 beste nummers 3
    let bestThirds = thirdPlaces.sort((a, b) => { 
        if(b.pts !== a.pts) return b.pts - a.pts; 
        return b.gd - a.gd; 
    }).slice(0, 8);

    // 2. TABEL LOOKUP: Zoek de exacte combinatie op in de 495-rijen tabel
    // Sorteer de letters eerst alfabetisch (bijv. "ABCEFGHI")
    const comboKey = [...bestThirds].map(t => t.group).sort().join('');
    
    // Haal het exacte FIFA antwoord uit de tabel
    const tableResult = fifa3rdPlaceTable[comboKey]; 

    // Koppel het antwoord aan de teamnamen
    let thirdsMatched = {};
    for (const hostGroup in tableResult) {
        const thirdLetter = tableResult[hostGroup];
        thirdsMatched[hostGroup] = bestThirds.find(t => t.group === thirdLetter);
    }

    // Hulpfunctie om makkelijk namen op te halen
    const get1st = (g) => firstPlaces.find(t => t.group === g).name;
    const get2nd = (g) => secondPlaces.find(t => t.group === g).name;
    const get3rd = (g) => thirdsMatched[g] ? thirdsMatched[g].name : t.koUnknown;

    // 3. HET OFFICIËLE 2026 ROUND OF 32 SCHEMA
    const matchUps = [
        [ get2nd('A'), get2nd('B') ],       // Match 1
        [ get1st('E'), get3rd('E') ],       // Match 2
        [ get1st('F'), get2nd('C') ],       // Match 3
        [ get1st('C'), get2nd('F') ],       // Match 4
        [ get1st('I'), get3rd('I') ],       // Match 5
        [ get2nd('E'), get2nd('I') ],       // Match 6
        [ get1st('A'), get3rd('A') ],       // Match 7
        [ get1st('L'), get3rd('L') ],       // Match 8
        [ get1st('D'), get3rd('D') ],       // Match 9
        [ get1st('G'), get3rd('G') ],       // Match 10
        [ get2nd('K'), get2nd('L') ],       // Match 11
        [ get1st('H'), get2nd('J') ],       // Match 12
        [ get1st('B'), get3rd('B') ],       // Match 13
        [ get1st('J'), get2nd('H') ],       // Match 14
        [ get1st('K'), get3rd('K') ],       // Match 15
        [ get2nd('D'), get2nd('G') ]        // Match 16
    ];

    switchScreen('app-screen', 'knockout-screen');
    if (typeof renderVisualBracket === "function") renderVisualBracket(matchUps);
    renderKnockoutBracket(matchUps);
    if (typeof updateVisualBracket === "function") updateVisualBracket();
}

function renderKnockoutBracket(matchUps) {
    const t = translations[currentLang];
    const container = document.getElementById('knockout-container');
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
            const savedMargin = savedDatabaseData[`${matchId}_margin`] || "";
            
            let optionsHtml = `<option value="" disabled selected>${t.koSelectCountry}</option>`;
            let teamsLabel = "";

            if (round.id === "R32") {
                const t1 = matchUps[i-1][0];
                const t2 = matchUps[i-1][1];
                optionsHtml += `<option value="${t1}">${t1}</option><option value="${t2}">${t2}</option>`;
                teamsLabel = `${t1} <span style="color:#9ca3af; font-size: 12px; margin: 0 5px;">VS</span> ${t2}`;
            } else {
                teamsLabel = `${t.koUnknown} <span style="color:#9ca3af; font-size: 12px; margin: 0 5px;">VS</span> ${t.koUnknown}`;
            }

            html += `
            <div class="ko-card">
                <div class="ko-match-title">Match ${i}</div>
                <div id="${matchId}_label" class="ko-match-label">${teamsLabel}</div>
                <div class="ko-controls">
                    <select id="${matchId}_winner" class="ko-select" onchange="updateKnockoutOptions()">
                        ${optionsHtml}
                    </select>
                    <select id="${matchId}_margin" class="ko-select">
                        <option value="${savedMargin}" selected>${savedMargin || t.koWinMethod}</option>
                        ${winMethods}
                    </select>
                </div>
            </div>`;
        }
    });

    // FIX: Back, Save, en Bonus knoppen
    html += `
    <div style="display: flex; gap: 8px; margin-top: 20px; margin-bottom: 50px;">
        <button class="btn-primary" onclick="switchScreen('knockout-screen', 'app-screen')" style="flex: 1; background-color: #6b7280; font-size: 14px;">${t.btnBack}</button>
        <button id="save-btn-ko" class="btn-primary" onclick="collectAndSave()" style="flex: 1; background-color: #10b981; font-size: 14px;">${t.btnSave}</button>
        <button class="btn-primary" onclick="startBonus()" style="flex: 1; font-size: 14px;">${t.btnToBonus}</button>
    </div>`;
    
    container.innerHTML = html;
    
    ['R32', 'R16', 'QF', 'SF', 'F'].forEach(roundId => {
        const count = rounds.find(r => r.id === roundId).count;
        for (let i = 1; i <= count; i++) {
            const matchId = `${roundId}_${i}`;
            const savedWinner = savedDatabaseData[`${matchId}_winner`];
            const select = document.getElementById(`${matchId}_winner`);
            if (savedWinner && select) {
                for (let j = 0; j < select.options.length; j++) {
                    if (select.options[j].value === savedWinner) {
                        select.value = savedWinner;
                        break;
                    }
                }
            }
        }
        updateKnockoutOptions(); 
    });
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
            
            // Markeer de winnaar in het groen
            if (winner && targetEl1 && targetEl1.innerText === winner) targetEl1.classList.add('winner');
            else if (targetEl1) targetEl1.classList.remove('winner');
            
            if (winner && targetEl2 && targetEl2.innerText === winner) targetEl2.classList.add('winner');
            else if (targetEl2) targetEl2.classList.remove('winner');
        }
    });
}

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
    
    const sTop = savedDatabaseData['bonus_topscorer'] || "";
    const sKaarten = savedDatabaseData['bonus_kaarten'] || "";
    const sOwn = savedDatabaseData['bonus_owngoals'] || "";
    const sMin = savedDatabaseData['bonus_minuut'] || "";

    container.innerHTML = `
        <div class="bonus-card">
            <h4>${t.bq1}</h4>
            <input type="text" id="bonus_topscorer" class="ko-select" placeholder="${t.bExPlayer}" value="${sTop}">
        </div>
        <div class="bonus-card">
            <h4>${t.bq2}</h4>
            <select id="bonus_kaarten" class="ko-select"><option value="${sKaarten}" selected>${sKaarten || t.koSelectCountry}</option>${teamOptions}</select>
        </div>
        <div class="bonus-card">
            <h4>${t.bq3}</h4>
            <select id="bonus_owngoals" class="ko-select"><option value="${sOwn}" selected>${sOwn || t.koSelectCountry}</option>${teamOptions}</select>
        </div>
        <div class="bonus-card">
            <h4>${t.bq4}</h4>
            <input type="number" id="bonus_minuut" class="ko-select" placeholder="${t.bExMin}" value="${sMin}">
        </div>
        <div style="display: flex; gap: 8px; margin-top: 20px; margin-bottom: 50px;">
            <button class="btn-primary" onclick="switchScreen('bonus-screen', 'knockout-screen')" style="flex: 1; background-color: #6b7280; font-size: 14px;">${t.btnBack}</button>
            <button class="btn-primary" id="save-btn-final" onclick="collectAndSave()" style="flex: 2; background-color: #10b981; font-size: 14px;">${t.btnSaveAll}</button>
        </div>
    `;
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