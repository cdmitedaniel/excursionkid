exports.seed = function(knex, Promise) {
  return knex('capitulo').del()
    .then(function () {
      const capitulo = [{
        youtube_url: 'https://www.youtube.com/watch?v=pq3Eya5e-oY',
        id_excursion: 1,
        portada:'/images/excursion2.gif',
        titulo: 'Capitulo ejemplo 1'
      }, {
        youtube_url: 'https://www.youtube.com/watch?v=OXgMVyY3NL4',
        id_excursion: 1,
        portada:'/images/excursion3.gif',
        titulo: 'Capitulo ejemplo 2'
      }];
      return knex('capitulo').insert(capitulo);
    });
};
