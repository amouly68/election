from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Données initiales des États et des grands électeurs
states_data = {
    "Alabama": {"electors": 9, "color": "gray"},
    "Alaska": {"electors": 3, "color": "gray"},
    "Arizona": {"electors": 11, "color": "gray"},
    "Arkansas": {"electors": 6, "color": "gray"},
    "California": {"electors": 54, "color": "gray"},
    "Colorado": {"electors": 10, "color": "gray"},
    "Connecticut": {"electors": 7, "color": "gray"},
    "Delaware": {"electors": 3, "color": "gray"},
    "Florida": {"electors": 30, "color": "gray"},
    "Georgia": {"electors": 16, "color": "gray"},
    "Hawaii": {"electors": 4, "color": "gray"},
    "Idaho": {"electors": 4, "color": "gray"},
    "Illinois": {"electors": 19, "color": "gray"},
    "Indiana": {"electors": 11, "color": "gray"},
    "Iowa": {"electors": 6, "color": "gray"},
    "Kansas": {"electors": 6, "color": "gray"},
    "Kentucky": {"electors": 8, "color": "gray"},
    "Louisiana": {"electors": 8, "color": "gray"},
    "Maine": {"electors": 4, "color": "gray"},
    "Maryland": {"electors": 10, "color": "gray"},
    "Massachusetts": {"electors": 11, "color": "gray"},
    "Michigan": {"electors": 15, "color": "gray"},
    "Minnesota": {"electors": 10, "color": "gray"},
    "Mississippi": {"electors": 6, "color": "gray"},
    "Missouri": {"electors": 10, "color": "gray"},
    "Montana": {"electors": 4, "color": "gray"},
    "Nebraska": {"electors": 5, "color": "gray"},
    "Nevada": {"electors": 6, "color": "gray"},
    "New Hampshire": {"electors": 4, "color": "gray"},
    "New Jersey": {"electors": 14, "color": "gray"},
    "New Mexico": {"electors": 5, "color": "gray"},
    "New York": {"electors": 28, "color": "gray"},
    "North Carolina": {"electors": 16, "color": "gray"},
    "North Dakota": {"electors": 3, "color": "gray"},
    "Ohio": {"electors": 17, "color": "gray"},
    "Oklahoma": {"electors": 7, "color": "gray"},
    "Oregon": {"electors": 8, "color": "gray"},
    "Pennsylvania": {"electors": 19, "color": "gray"},
    "Rhode Island": {"electors": 4, "color": "gray"},
    "South Carolina": {"electors": 9, "color": "gray"},
    "South Dakota": {"electors": 3, "color": "gray"},
    "Tennessee": {"electors": 11, "color": "gray"},
    "Texas": {"electors": 40, "color": "gray"},
    "Utah": {"electors": 6, "color": "gray"},
    "Vermont": {"electors": 3, "color": "gray"},
    "Virginia": {"electors": 13, "color": "gray"},
    "Washington": {"electors": 12, "color": "gray"},
    "West Virginia": {"electors": 4, "color": "gray"},
    "Wisconsin": {"electors": 10, "color": "gray"},
    "Wyoming": {"electors": 3, "color": "gray"},
    "District of Columbia": {"electors": 3, "color": "gray"}
}

@app.route('/')
def index():
    return render_template('index.html', states=states_data)

@app.route('/update_state', methods=['POST'])
def update_state():
    state = request.json.get('state')
    color = request.json.get('color')
    if state in states_data:
        states_data[state]['color'] = color
    return jsonify(states_data)


if __name__ == '__main__':
    app.run(debug=True)
