var arregloUsuarios;



/////////////////////Presentacion de las tablas///////////////////////////

dibujarTablaUsuarios();
dibujarTablaExcursiones();
dibujarTablaPreguntas();

function dibujarTablaUsuarios() {

    $("#usuarios").empty();

    $('#usuarios').append($('<tr>')
        .append($('<th>').append("Usuario"))
        .append($('<th>').append("Contraseña"))
        .append($('<th>').append("Editar"))
        .append($('<th>').append("Eliminar"))
    )
    listarUsuarios();
}

function listarUsuarios() {
    $.each(arregloUsuarios, function(index, usuario){
    $('#usuarios').append($('<tr>')
        .append($('<td>').append(usuario.usuario))
        .append($('<td>').append(usuario.clave))
        .append($("<td>").append(`<button onclick=editarUsuario(${index})>Editar</button>`))
        .append($("<td>").append(`<button onclick=eliminarUsuario(${index})>Eliminar</button>`))
    )
    })
}

function dibujarTablaExcursiones() {

    $("#excursiones").empty();

    $('#excursiones').append($('<tr>')
    .append($('<th>').append("Usuario"))
        .append($('<th>').append("Titulo"))
        .append($('<th>').append("Descripcion"))
        .append($('<th>').append("Credito"))
        .append($('<th>').append("Portada"))
        .append($('<th>').append("Video"))
        .append($('<th>').append("Editar"))
        .append($('<th>').append("Eliminar"))
    )
    listarExcursiones();
}

function listarExcursiones() {
//alert("ok..");

    $.each(arregloUsuarios, function(index_usuario, usuario){

        $.each(usuario.excursiones, function(indice_excursion, excursion){

            $('#excursiones').append($('<tr>')
            .append($('<td>').append(usuario.usuario))
            .append($('<td>').append(excursion.titulo))
            .append($('<td>').append(excursion.descripcion))
            .append($('<td>').append(excursion.credito))
            .append($('<td>').append(`<img src=${excursion.portada} class="lista-img">`))
            .append($('<td>').append(excursion.video))
            .append($('<td>').append(`<button onclick=editarExcursion(${index_usuario},${indice_excursion})>Editar</button>`))
            .append($('<td>').append(`<button onclick=eliminarExcursion(${index_usuario},${indice_excursion})>Eliminar</button>`))
            )
        })
    })
}

function dibujarTablaPreguntas() {

    $("#preguntas").empty();

    $('#preguntas').append($('<tr>')
    .append($('<th>').append("Usuario"))
        .append($('<th>').append("Excursion"))
        .append($('<th>').append("Pregunta"))
        .append($('<th>').append("Opcion 1"))
        .append($('<th>').append("Opcion 2"))
        .append($('<th>').append("Opcion 3"))
        .append($('<th>').append("Opcion 4"))
        /*.append($('<th>').append("Eliminar"))*/
    )
    listarPreguntas();
}

function listarPreguntas() {
//alert("ok..");

    $.each(arregloUsuarios, function(index_usuario, usuario){

        $.each(usuario.excursiones, function(indice_excursion, excursion){

            $('#preguntas').append($('<tr>')
            .append($('<td>').append(usuario.usuario))
            .append($('<td>').append(excursion.titulo))
            .append($('<td>').append(excursion.pregunta.pregunta))
            .append($('<td>').append(`<img src=${excursion.pregunta.opciones[0].url} class="lista-img">`))
            .append($('<td>').append(`<img src=${excursion.pregunta.opciones[1].url} class="lista-img">`))
            .append($('<td>').append(`<img src=${excursion.pregunta.opciones[2].url} class="lista-img">`))
            .append($('<td>').append(`<img src=${excursion.pregunta.opciones[3].url} class="lista-img">`))
            .append($('<td>').append(`<button onclick=editarPregunta(${index_usuario},${indice_excursion})>Editar</button>`))
            //.append($('<td>').append(`<button onclick=eliminarPregunta(${index_usuario},${indice_excursion})>Eliminar</button>`))
            )
        })
    })
}



///////////////////////Eventos para abrir los popup de creacion de nuevos objetos////////////////////////////


$("#btn-nuevo").click(function(){
    $("#agregar-usuario").show();
     $(".agregar-usuario").show();
})

$("#btn-nueva-excursion").click(function(){
    $("#agregar-excursion").show();
    $(".agregar-excursion").show();

    
    
    $("#usuario-select").empty();

    $.each(arregloUsuarios, function(index, usuario){
        $("#usuario-select").append('<option value="'+index+'"+>'+usuario.usuario+'</option>');
    })
    
})

$("#btn-nueva-pregunta").click(function(){
    $("#agregar-pregunta").show();
    $(".agregar-pregunta").show();
    
    $("#usuario-select-pregunta").empty();

    
    $.each(arregloUsuarios, function(index, usuario){
        $("#usuario-select-pregunta").append('<option value="'+index+'"+>'+usuario.usuario+'</option>');
        
       $.each(arregloUsuarios[index].excursiones, function(index, excursion){
            $("#excursion-select-pregunta").append('<option value="'+index+'"+>'+excursion.titulo+'</option>');
        })
    })
    
    
    //llena el combo de excursiones 
    $("#usuario-select-pregunta").change(function(){
            let index = this.value;
        
        $("#excursion-select-pregunta").empty();
        $.each(arregloUsuarios[index].excursiones, function(index, excursion){
            $("#excursion-select-pregunta").append('<option value="'+index+'"+>'+excursion.titulo+'</option>');
        })
    })

})



/////////////////////funciones de edicion de objetos///////////////////////

