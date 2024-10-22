document.addEventListener('DOMContentLoaded', () => {
    fetch('/static/svg/usa_map.svg')
        .then(response => response.text())
        .then(svgText => {
            insertSVG(svgText);
            initializeStates();
            initializeButtons();
        })
        .catch(error => {
            console.error('Erreur lors du chargement du SVG:', error);
        });
});

// Fonction pour insérer le SVG dans le DOM
function insertSVG(svgText) {
    const svgContainer = document.createElement('div');
    svgContainer.innerHTML = svgText;
    document.body.appendChild(svgContainer);
}

// Fonction pour initialiser les interactions avec les états
function initializeStates() {
    const states = document.querySelectorAll('.state');
    const tooltip = document.getElementById('tooltip');

    states.forEach(state => {
        // Ajoute un événement pour le survol (hover) de l'état
        state.addEventListener('mouseover', (event) => {
            const stateName = state.getAttribute('data-name');
            console.log('state name : ' + stateName);
            const electors = getElectorsForState(stateName);
            tooltip.style.display = 'block';
            tooltip.textContent = `${stateName}: ${electors} grands électeurs`;
        });

        // Ajoute un événement pour déplacer le tooltip avec la souris
        state.addEventListener('mousemove', (event) => {
            tooltip.style.left = `${event.pageX + 10}px`;
            tooltip.style.top = `${event.pageY + 10}px`;
        });

        // Ajoute un événement pour cacher le tooltip quand la souris quitte l'état
        state.addEventListener('mouseout', () => {
            tooltip.style.display = 'none';
        });

        // Ajoute un événement pour cliquer sur l'état
        state.addEventListener('click', () => {
            toggleStateColor(state);
        });
    });
}

// Fonction pour initialiser les boutons de mise à jour globale
function initializeButtons() {
    document.getElementById('all-red').addEventListener('click', () => {
        updateAllStates('red');
    });

    document.getElementById('all-blue').addEventListener('click', () => {
        updateAllStates('blue');
    });
}

// Fonction pour basculer la couleur d'un état
function toggleStateColor(state) {
    const currentColor = state.classList.contains('red') ? 'red' : 'blue';
    const newColor = currentColor === 'red' ? 'blue' : 'red';
    state.classList.remove('red', 'blue');
    state.classList.add(newColor);
    const stateName = state.getAttribute('data-name');
    updateStateColor(stateName, newColor);
}

// Fonction pour mettre à jour tous les états à une couleur
function updateAllStates(color) {
    const states = document.querySelectorAll('.state');
    states.forEach(state => {
        const stateName = state.getAttribute('data-name');
        state.classList.remove('red', 'blue');
        state.classList.add(color);
        updateStateColor(stateName, color);
    });
}

// Fonction pour mettre à jour la couleur d'un état dans le backend
function updateStateColor(state, color) {
    fetch('/update_state', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ state: state, color: color }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        updateElectorCount(data);
    })
    .catch(error => {
        console.error('Erreur lors de la mise à jour de l\'état:', error);
    });
}

// Fonction pour mettre à jour le compteur des électeurs
function updateElectorCount(data) {
    const electorCountDemocrats = document.getElementById('elector-count-democrats');
    const electorCountRepublicans = document.getElementById('elector-count-republicans');
    const barDemocrats = document.getElementById('bar-democrats');
    const barRepublicans = document.getElementById('bar-republicans');
    let totalDemocrats = 0;
    let totalRepublicans = 0;

    for (const state in data) {
        if (data[state].color === 'blue') {
            totalDemocrats += data[state].electors;
        } else if (data[state].color === 'red') {
            totalRepublicans += data[state].electors;
        }
    }

    electorCountDemocrats.textContent = totalDemocrats;
    electorCountRepublicans.textContent = totalRepublicans;

    // Mise à jour des barres
    const percentageDemocrats = (totalDemocrats / 538) * 100;
    const percentageRepublicans = (totalRepublicans / 538) * 100;

    barDemocrats.style.width = `${percentageDemocrats}%`;
    barRepublicans.style.width = `${percentageRepublicans}%`;
}


// Fonction pour obtenir le nombre de grands électeurs d'un état
function getElectorsForState(stateName) {
    // Cherche les données des états dans le backend
    const statesData = {
        "Alabama": {"electors": 9},
        "Alaska": {"electors": 3},
        "Arizona": {"electors": 11},
        "Arkansas": {"electors": 6},
        "California": {"electors": 54},
        "Colorado": {"electors": 10},
        "Connecticut": {"electors": 7},
        "Delaware": {"electors": 3},
        "District of Columbia": {"electors": 3},
        "Florida": {"electors": 30},
        "Georgia": {"electors": 16},
        "Hawaii": {"electors": 4},
        "Idaho": {"electors": 4},
        "Illinois": {"electors": 19},
        "Indiana": {"electors": 11},
        "Iowa": {"electors": 6},
        "Kansas": {"electors": 6},
        "Kentucky": {"electors": 8},
        "Louisiana": {"electors": 8},
        "Maine": {"electors": 4},
        "Maryland": {"electors": 10},
        "Massachusetts": {"electors": 11},
        "Michigan": {"electors": 15},
        "Minnesota": {"electors": 10},
        "Mississippi": {"electors": 6},
        "Missouri": {"electors": 10},
        "Montana": {"electors": 4},
        "Nebraska": {"electors": 5},
        "Nevada": {"electors": 6},
        "New Hampshire": {"electors": 4},
        "New Jersey": {"electors": 14},
        "New Mexico": {"electors": 5},
        "New York": {"electors": 28},
        "North Carolina": {"electors": 16},
        "North Dakota": {"electors": 3},
        "Ohio": {"electors": 17},
        "Oklahoma": {"electors": 7},
        "Oregon": {"electors": 8},
        "Pennsylvania": {"electors": 19},
        "Rhode Island": {"electors": 4},
        "South Carolina": {"electors": 9},
        "South Dakota": {"electors": 3},
        "Tennessee": {"electors": 11},
        "Texas": {"electors": 40},
        "Utah": {"electors": 6},
        "Vermont": {"electors": 3},
        "Virginia": {"electors": 13},
        "Washington": {"electors": 12},
        "West Virginia": {"electors": 4},
        "Wisconsin": {"electors": 10},
        "Wyoming": {"electors": 3},
    };

    return statesData[stateName] ? statesData[stateName].electors : 0;
}

