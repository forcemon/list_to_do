from flask import Flask, jsonify, request, render_template

app = Flask(__name__)
tareas = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/tareas', methods=['GET', 'POST'])
def api_tareas():
    if request.method == 'POST':
        tarea = request.json.get('tarea')
        tareas.append(tarea)
        return jsonify(tarea), 201
    return jsonify(tareas)

@app.route('/api/tareas/<int:indice>', methods=['DELETE', 'PUT'])
def modificar_tarea(indice):
    if request.method == 'DELETE':
        if 0 <= indice < len(tareas):
            del tareas[indice]
            return jsonify({'mensaje': 'Tarea eliminada'}), 200
        return jsonify({'mensaje': 'Índice fuera de rango'}), 404
    elif request.method == 'PUT':
        nueva_tarea = request.json.get('tarea')
        if 0 <= indice < len(tareas):
            tareas[indice] = nueva_tarea
            return jsonify({'mensaje': 'Tarea actualizada'}), 200
        return jsonify({'mensaje': 'Índice fuera de rango'}), 404

@app.route('/api/reordenar', methods=['POST'])
def reordenar_tareas():
    data = request.get_json()
    
    if not data or 'nueva_orden' not in data:
        return jsonify({'mensaje': 'Datos inválidos o faltantes'}), 400

    nueva_orden = data['nueva_orden']

    # Ensure nueva_orden is a list of integers
    if not isinstance(nueva_orden, list) or not all(isinstance(i, int) for i in nueva_orden):
        return jsonify({'mensaje': 'Datos inválidos, se espera una lista de números'}), 400

    # Verify indices are within the range
    if not all(0 <= i < len(tareas) for i in nueva_orden):
        return jsonify({'mensaje': 'Índices fuera de rango'}), 400

    # Verify no duplicate indices
    if len(nueva_orden) != len(set(nueva_orden)):
        return jsonify({'mensaje': 'Índices duplicados'}), 400

    # Reorder tasks
    tareas[:] = [tareas[i] for i in nueva_orden]
    return jsonify({'mensaje': 'Tareas reordenadas'}), 200

if __name__ == '__main__':
    app.run(debug=True)