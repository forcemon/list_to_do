$(document).ready(function(){
    cargarTareas();

    $('#boton-agregar').click(function(){
        agregarTarea();
    });
});

function cargarTareas() {
    $.get('/api/tareas', function(tareas) {
        $('#lista-tareas').empty();
        tareas.forEach(function(tarea, indice) {
            $('#lista-tareas').append(`
                <li class="list-group-item">
                    <span id="texto-tarea-${indice}">${tarea}</span>
                    <input type="text" class="form-control d-none tarea-editable" value="${tarea}" id="input-tarea-${indice}">
                    <div class="btn-group" role="group" aria-label="Acciones de Tarea">
                        <button id="boton-editar-${indice}" class="btn btn-outline-primary btn-sm mx-1" onclick="mostrarEdicion(${indice})"><i class="fas fa-pencil-alt"></i></button>
                        <button id="boton-guardar-${indice}" class="btn btn-outline-success btn-sm mx-1 d-none" onclick="guardarEdicion(${indice})"><i class="fas fa-save"></i></button>
                        <button class="btn btn-outline-danger btn-sm mx-1" onclick="eliminarTarea(${indice})"><i class="fas fa-trash"></i></button>
                        <button class="btn btn-outline-secondary btn-sm mx-1" onclick="moverArriba(${indice})"><i class="fas fa-arrow-up"></i></button>
                        <button class="btn btn-outline-secondary btn-sm mx-1" onclick="moverAbajo(${indice})"><i class="fas fa-arrow-down"></i></button>
                    </div>
                </li>
            `);
        });
    });
}

function agregarTarea() {
    let tarea = $('#nueva-tarea').val();
    $.ajax({
        url: '/api/tareas',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ tarea: tarea }),
        success: function() {
            $('#nueva-tarea').val('');
            cargarTareas();
        }
    });
}

function mostrarEdicion(indice) {
    $(`#texto-tarea-${indice}`).addClass('d-none');
    $(`#input-tarea-${indice}`).removeClass('d-none').focus();
    $(`#boton-editar-${indice}`).addClass('d-none');
    $(`#boton-guardar-${indice}`).removeClass('d-none');
}

function guardarEdicion(indice) {
    let nuevaTarea = $(`#input-tarea-${indice}`).val();
    $.ajax({
        url: `/api/tareas/${indice}`,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({ tarea: nuevaTarea }),
        success: function() {
            cargarTareas();
        }
    });
}

function obtenerNuevaOrden() {
    let nuevaOrden = [];
    $('#lista-tareas .tarea-editable').each(function() {
        nuevaOrden.push(parseInt($(this).attr('id').split('-')[2]));
    });
    return nuevaOrden;
}

function moverArriba(indice) {
    let nuevaOrden = obtenerNuevaOrden();
    if (indice > 0) {
        [nuevaOrden[indice], nuevaOrden[indice - 1]] = [nuevaOrden[indice - 1], nuevaOrden[indice]];
        reordenarTareas(nuevaOrden);
    }
}

function moverAbajo(indice) {
    let nuevaOrden = obtenerNuevaOrden();
    let totalTareas = $('#lista-tareas .tarea-editable').length;
    if (indice < totalTareas - 1) {
        [nuevaOrden[indice], nuevaOrden[indice + 1]] = [nuevaOrden[indice + 1], nuevaOrden[indice]];
        reordenarTareas(nuevaOrden);
    }
}

function reordenarTareas(nuevaOrden) {
    console.log("Enviando nueva orden al servidor:", nuevaOrden);
    $.ajax({
        url: '/api/reordenar',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ nueva_orden: nuevaOrden }),
        success: function(response) {
            console.log("Respuesta del servidor:", response);
            cargarTareas();
        },
        error: function(xhr, status, error) {
            console.error('Error al reordenar:', xhr.responseText);
        }
    });
}

function eliminarTarea(indice) {
    $.ajax({
        url: `/api/tareas/${indice}`,
        method: 'DELETE',
        success: function() {
            cargarTareas();
        }
    });
}