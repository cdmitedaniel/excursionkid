exports.seed = function(knex, Promise) {
  return knex('pregunta').del()
    .then(function () {
      const pregunta = [{
        pregunta: '¿Cuántos amigos verdes aparecieron?',
        id_capitulo: 1,
        pregunta_1_img: '/images/ovejaNegra.png',
        pregunta_2_img: '/images/ovejaAzul.png',
        pregunta_3_img: '/images/ovejaAmarilla.png',
        pregunta_4_img: '/images/ovejaRoja.png',
        respuesta: 1,
        pregunta_audio : '/audios/cuantos_animales_viste.mp3'
      }, {
        pregunta: '¿Cuanto es 2 + 2?',
        id_capitulo: 2,
        pregunta_1_img: '/images/cinco.png',
        pregunta_2_img: '/images/cuatro.png',
        pregunta_3_img: '/images/uno.png',
        pregunta_4_img: '/images/dos.png',
        respuesta: 2,
        pregunta_audio : '/audios/uno_mas_uno.mp3'
      }];
      return knex('pregunta').insert(pregunta);
    });
};