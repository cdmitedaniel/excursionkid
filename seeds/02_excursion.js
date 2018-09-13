exports.seed = function(knex, Promise) {
  return knex('excursion').del()
    .then(function () {
      const excursion = [{
        titulo: 'Viaje por la selva',
        descripcion: 'Viaja con nuestro amigos y explora',
        creditos: 'Guion: Ana Maria',
        portada: '/images/excursion1.gif'

      }];
      return knex('excursion').insert(excursion);
    });
};
