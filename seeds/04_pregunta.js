exports.seed = function(knex, Promise) {
  return knex('pregunta').del()
    .then(function () {
      const pregunta = [{
        pregunta: '¿Cuántos amigos verdes aparecieron?',
        id_capitulo: 1,
        pregunta_1: '10',
        pregunta_2: '1',
        pregunta_3: '5',
        pregunta_4: '3',
        pregunta_1_img: 'https://c3352096.ssl.cf0.rackcdn.com/rana_cocinera.jpg',
        pregunta_2_img: 'https://c3352096.ssl.cf0.rackcdn.com/rana_cocinera.jpg',
        pregunta_3_img: 'https://c3352096.ssl.cf0.rackcdn.com/rana_cocinera.jpg',
        pregunta_4_img: 'https://c3352096.ssl.cf0.rackcdn.com/rana_cocinera.jpg',
        respuesta: 1
      }, {
        pregunta: '¿Nuestro amigo Mario cuantos años tiene?',
        id_capitulo: 1,
        pregunta_1: '10',
        pregunta_2: '12',
        pregunta_3: '15',
        pregunta_4: '13',
        pregunta_1_img: 'https://c3352096.ssl.cf0.rackcdn.com/rana_cocinera.jpg',
        pregunta_2_img: 'https://c3352096.ssl.cf0.rackcdn.com/rana_cocinera.jpg',
        pregunta_3_img: 'https://c3352096.ssl.cf0.rackcdn.com/rana_cocinera.jpg',
        pregunta_4_img: 'https://c3352096.ssl.cf0.rackcdn.com/rana_cocinera.jpg',
        respuesta: 2
      },{
        pregunta: '¿Que fruta canto mas fuerte?',
        id_capitulo: 1,
        pregunta_1: 'Manzana',
        pregunta_2: 'Pera',
        pregunta_3: 'Piña',
        pregunta_4: 'Sandia',
        pregunta_1_img: 'https://c3352096.ssl.cf0.rackcdn.com/rana_cocinera.jpg',
        pregunta_2_img: 'https://c3352096.ssl.cf0.rackcdn.com/rana_cocinera.jpg',
        pregunta_3_img: 'https://c3352096.ssl.cf0.rackcdn.com/rana_cocinera.jpg',
        pregunta_4_img: 'https://c3352096.ssl.cf0.rackcdn.com/rana_cocinera.jpg',
        respuesta: 4
      }, {
        pregunta: '¿Quién ayudo a nuestra amiga Pera?',
        id_capitulo: 1,
        pregunta_1: 'Fresa',
        pregunta_2: 'Mango',
        pregunta_3: 'Manzana',
        pregunta_4: 'Kiwi',
        pregunta_1_img: 'https://c3352096.ssl.cf0.rackcdn.com/rana_cocinera.jpg',
        pregunta_2_img: 'https://c3352096.ssl.cf0.rackcdn.com/rana_cocinera.jpg',
        pregunta_3_img: 'https://c3352096.ssl.cf0.rackcdn.com/rana_cocinera.jpg',
        pregunta_4_img: 'https://c3352096.ssl.cf0.rackcdn.com/rana_cocinera.jpg',
        respuesta: 1
      }];
      return knex('pregunta').insert(pregunta);
    });
};