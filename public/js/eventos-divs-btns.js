$( document ).ready(function() {

    var posicion_usuario = -1 //Variable para conocer que usuario hizo login
    var arregloUsuarios;
    //console.log(localStorage.getItem('arregloUsuarios'))
    if(localStorage.getItem('arregloUsuarios') != null){
        arregloUsuarios = JSON.parse(localStorage.getItem('arregloUsuarios'));

        //console.log(localStorage.getItem('arregloUsuarios'))
        //
        //Comprobar si ya ha iniciado sesion el usuario (Se carga la posicion del usuario del localStorage)
            // posicion_usuario = localStorage.getItem('arregloUsuarios');

            //cargarExcursiones(); //Se llama a la funcion que lista las excursiones visualmente
            //
        if(localStorage.getItem('excursion_usuario') != null){
            //Comprobar si ya ha iniciado sesion el usuario (Se carga la posicion del usuario del localStorage)
            posicion_usuario = localStorage.getItem('excursion_usuario');

            cargarExcursiones(); //Se llama a la funcion que lista las excursiones visualmente
        }else{
            // Si no esta logeado muestra el formulario de login
            $("#login-form").toggleClass("oculto");
        }

        }

        //}else{
        // Si no esta logeado muestra el formulario de login
        // $("#login-form").toggleClass("oculto");
        // }

    $("#login").on("click", function(e){

        //Evento que controla el click al inciar sesion

        let usuario = $("#user").val(); //Se toma el texto del input user
        let clave = $("#clave").val(); //Se toma el texto del input clave

        posicion_usuario = validarUsuario(usuario, clave); // La funcion me devuelve un numero, que es la posicion del usuario en el arreglo, si no existe devuelve -1

        if(posicion_usuario != -1) {
            //Si la posicion es diferente de -1 entonces es un usuario correcto

            localStorage.setItem('excursion_usuario',posicion_usuario); //Se guarda el usuario en el localStorage

            cargarExcursiones(); //Se cargan las excursiones del usuario


        } else{
            //Si el usuario no existe se alerta
            alert("Datos incorrectos");

        }
    });

    $(document).on('click','.item-excursion', function() {
        cargarExcursion(this.id)
        //Funcion para reconocer el click en cada excursion
        //$('body').css("background-image","none");

        //Detectar cuando termine de reproducirse el video
        $('#main-video').on('ended',function(){

            console.log('El video se ha terminado');
            $("#continuar").show();

        });
    });

    $("#salir").on("click", function(e){
        //Funcion que borra del localStorage la posicion del usuario y se recarga el sitio
        localStorage.removeItem("excursion_usuario");
        location.reload();

    })


    function cargarExcursiones () {
        $("#login-form").addClass("oculto"); //Si esta todo OK se oculta el formulario de login.

        //toggleClass() intercala las clases, es decir si existe la quita y si no esta la agrega.

        $("#menu").toggleClass("oculto");
        $("#excursiones").toggleClass("oculto");


        $.each( arregloUsuarios[posicion_usuario].excursiones, function(index, excursion){

            //Recorrer cada excursion y agregarlos visualmente
              //<h4 class="bg-light">${excursion.descripcion}
              //
            $(`<div class='col-6 mx-auto'>
            <div class='item-excursion' id=${index}>
            <h2 class="bg-dark text-white">${excursion.titulo}
            <div class="imagen">
            <img src=${excursion.portada} class='img-fluid'></div></div></h2></div></div>`).appendTo("#excursiones");

        });
    }

    function validarUsuario(_usuario, _clave) {
        posicion_temp = -1

        $.each(arregloUsuarios, function(index, usuario){
            //Buscar por cada usuario para comprobar usuario y clave.
            //Si existe, se guarda la posicion del usuario en 'posicion_temp' por defecto es -1 (en caso que no lo encuentre)
            if(usuario.usuario == _usuario && usuario.clave == _clave){
                posicion_temp = arregloUsuarios.indexOf(usuario);
            }
        })
        //arregloUsuarios.forEach(function(usuario){});

        return posicion_temp;
    }

    //La funcion recibe la posicion de una excursion y la carga
    function cargarExcursion (posicion_excursion) {

        let excursion = arregloUsuarios[posicion_usuario].excursiones[posicion_excursion];

        localStorage.setItem("posicion_excursion", posicion_excursion);//Guardar en localStorage la excursion actual

        $("#excursiones").toggleClass("oculto")
        $("#excursion").toggleClass("oculto")

        $("#continuar").toggleClass("oculto")

        $("#titulo").text(excursion.titulo)

        var link = convertirURL(excursion.video);
        $("#main-video").attr("src", "https://www.youtube.com/embed/"+link+"?controls");



        $("#descripcion").text(excursion.descripcion)
        $("#credito").text(excursion.credito)

    }

    $("#continuar").on("click", function(){


        let excursion_actual = localStorage.getItem("posicion_excursion");
        //console.log(localStorage.getItem("posicion_excursion"))
        //$("#contenedor-pregunta").toggleClass("oculto");
        $("#contenedor-pregunta").show();

        var audio = document.createElement("audio");
        audio.src = arregloUsuarios[posicion_usuario].excursiones[excursion_actual].pregunta.audio;
        //arregloUsuarios[posicion_usuario].excursiones[excursion_actual].pregunta.audio;
        //console.log(arregloUsuarios[posicion_usuario].excursiones[excursion_actual].pregunta.audio)
        audio.play();

        $("#pregunta").empty();


        $.each(arregloUsuarios[posicion_usuario].excursiones[excursion_actual].pregunta.opciones, function(index, opcion){
            //Recorrer por cada opcion de la pregunta

            console.log(opcion)
            $(`<label><div class="jumbotron bg-info w-75 p-3">
                <div class="radio">
            <input type="radio" name="opcion" value="${index}"> ${opcion.descripcion}
            <img src="${opcion.url}"/>
          </div></div></label>`).appendTo("#pregunta");

        })

        $("#pregunta-descripcion").text(arregloUsuarios[posicion_usuario].excursiones[excursion_actual].pregunta.pregunta);

        //$(`<ul>`).appendTo("#pregunta")

    });



    $("#verificar-respuesta").on("click", function(){

        //Comprobar si la respuesta esta OK
        //console.log($('input[name=opcion]:checked').val()) //Esta linea toma el radio seleccionado

        let excursion_actual = localStorage.getItem("posicion_excursion");
        let opcion_elegida = $('input[name=opcion]:checked').val();

        let pregunta = arregloUsuarios[posicion_usuario].excursiones[excursion_actual].pregunta;

        console.log(pregunta)

        //La respuesta est guarda en el objeto Pregunta.

        if(opcion_elegida != undefined){

            if(opcion_elegida == pregunta.respuesta) {

                alert("Felicitaciones");
                location.reload();


            }else {
                alert("La respuesta correcta era:" +pregunta.opciones[pregunta.respuesta].descripcion)
                location.reload();
            }

        }else {
            alert("Eliga una opcion valida")
        }

    })

   

//URL obtener el ultimo codigo

function convertirURL(url){
          var ID = '';
          url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
          if(url[2] !== undefined) {
            ID = url[2].split(/[^0-9a-z_\-]/i);
            ID = ID[0];
          }
          else {
            ID = url;
          }
            return ID;
    }