exports.seed = function(knex, Promise) {
  return knex('excursion').del()
    .then(function () {
      const excursion = [{
        titulo: 'Viaje por la selva',
        descripcion: 'Viaja con nuestro amigos y explora',
        creditos: 'Guion: Ana Maria',
        portada: 'https://k30.kn3.net/taringa/B/3/7/4/8/2/MagazineGames/FEF.jpg',
        id_usuario: 3

      }, {
        titulo: 'Conociendo las frutas',
        descripcion: 'Aprende y come sano',
        creditos: 'Guion: Roberto M.',
        portada: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdvi9vJsleoDQDnW-XgZ1NoJQIBltBl4k_ivPJkWiclEiDL-Kx',
        id_usuario: 3
      }];
      return knex('excursion').insert(excursion);
    });
};
