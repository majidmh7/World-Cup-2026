// ==========================================
// 1. HET GROTE WOORDENBOEK (VERTALINGEN)
// ==========================================
const translations = {
    nl: { 
        title: "WK 2026 Poule", welcome: "Welkom bij de Familie Poule!", instructions: "Vul hieronder de uitslagen in.",
        nameTitle: "Wie ben je?", koTitle: "Knock-out Fase", koDesc: "Kies de winnaars van elke ronde.",
        bonusTitle: "Bonus Vragen 🎁", bonusDesc: "Verdien extra punten met deze voorspellingen!",
        btnSave: "Opslaan", btnSaving: "Opslaan...", btnToKnockout: "Knock-outs ➡️", btnBack: "⬅️ Terug",
        btnToBonus: "Naar Bonus Vragen 🎁", btnSaveAll: "Alles Opslaan ✅", alertFillGroup: "Vul de groepsfase in!",
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
        nameTitle: "¿Quién eres?", koTitle: "Fase Eliminatoria", koDesc: "Elige los ganadores de cada ronda.",
        bonusTitle: "Preguntas Extra 🎁", bonusDesc: "¡Gana puntos extra con estas predicciones!",
        btnSave: "Guardar", btnSaving: "Guardando...", btnToKnockout: "Eliminatorias ➡️", btnBack: "⬅️ Volver",
        btnToBonus: "Preguntas Extra 🎁", btnSaveAll: "Guardar Todo ✅", alertFillGroup: "¡Completa la fase de grupos!",
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
    if (document.getElementById('ui-name-title')) document.getElementById('ui-name-title').innerText = t.nameTitle;
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
        allGroups[group].forEach((_, index) => { if(index >= matchOrder.length) return; 
            const matchId = `${group}${index + 1}`;
            const m = matchOrder[index];
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
    <div style="display: flex; gap: 10px; margin-top: 20px; margin-bottom: 50px;">
        <button id="save-btn" class="btn-primary" onclick="collectAndSave()" style="flex: 1; background-color: #6b7280;">${t.btnSave}</button>
        <button class="btn-primary" onclick="startKnockouts()" style="flex: 2;">${t.btnToKnockout}</button>
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

    let bestThirds = thirdPlaces.sort((a, b) => { if(b.pts !== a.pts) return b.pts - a.pts; return b.gd - a.gd; }).slice(0, 8);

    const matchUps = [
        [ secondPlaces[0].name, secondPlaces[1].name ], // 2A vs 2B
        [ firstPlaces[4].name, bestThirds[0].name ],   // 1E vs 3e
        [ firstPlaces[5].name, secondPlaces[2].name ], // 1F vs 2C
        [ firstPlaces[2].name, secondPlaces[5].name ], // 1C vs 2F
        [ firstPlaces[8].name, bestThirds[1].name ],   // 1I vs 3e
        [ secondPlaces[4].name, secondPlaces[8].name ],// 2E vs 2I
        [ firstPlaces[0].name, bestThirds[2].name ],   // 1A vs 3e
        [ firstPlaces[11].name, bestThirds[3].name ],  // 1L vs 3e
        [ firstPlaces[6].name, bestThirds[4].name ],   // 1G vs 3e
        [ firstPlaces[3].name, bestThirds[5].name ],   // 1D vs 3e
        [ firstPlaces[7].name, secondPlaces[9].name ], // 1H vs 2J
        [ secondPlaces[10].name, secondPlaces[11].name ], // 2K vs 2L
        [ firstPlaces[1].name, bestThirds[6].name ],   // 1B vs 3e
        [ secondPlaces[3].name, secondPlaces[6].name ],// 2D vs 2G
        [ firstPlaces[9].name, secondPlaces[7].name ], // 1J vs 2H
        [ firstPlaces[10].name, bestThirds[7].name ]   // 1K vs 3e
    ];

    switchScreen('app-screen', 'knockout-screen');
    renderKnockoutBracket(matchUps);
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

    html += `
    <div style="display: flex; gap: 10px; margin-top: 20px; margin-bottom: 50px;">
        <button class="btn-primary" onclick="switchScreen('knockout-screen', 'app-screen')" style="flex: 1; background-color: #6b7280;">${t.btnBack}</button>
        <button class="btn-primary" onclick="startBonus()" style="flex: 2;">${t.btnToBonus}</button>
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
        <div style="display: flex; gap: 10px; margin-top: 20px; margin-bottom: 50px;">
            <button class="btn-primary" onclick="switchScreen('bonus-screen', 'knockout-screen')" style="flex: 1; background-color: #6b7280;">${t.btnBack}</button>
            <button class="btn-primary" id="save-btn-final" onclick="collectAndSave()" style="flex: 2; background-color: #10b981;">${t.btnSaveAll}</button>
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
    const saveBtnFinal = document.getElementById('save-btn-final');
    
    if (saveBtn) saveBtn.innerText = t.btnSaving;
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
        if (saveBtnFinal) saveBtnFinal.innerText = t.btnSaveAll;
    }
}

async function loadPredictions() {
    const userName = localStorage.getItem('poule_user_name');
    try {
        const response = await fetch(`${SCRIPT_URL}?naam=${userName}`);
        const data = await response.json();
        
        if (data.status !== "niet gevonden" && !data.error) {
            savedDatabaseData = JSON.parse(data);
            for (const key in savedDatabaseData) {
                const input = document.getElementById(key);
                if (input) input.value = savedDatabaseData[key];
            }
            for (const group in allGroups) calculateGroupStandings(group);
        }
    } catch (error) { console.error("Fout bij inladen data:", error); }
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