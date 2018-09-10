exports.seed = function(knex, Promise) {
  return knex('capitulo').del()
    .then(function () {
      const capitulo = [{
        youtube_url: 'https://www.youtube.com/watch?v=pq3Eya5e-oY',
        id_excursion: 1,
      }, {
        youtube_url: 'https://www.youtube.com/watch?v=OXgMVyY3NL4',
        id_excursion: 1,
      },{
        youtube_url: 'https://www.youtube.com/watch?v=N9TTN5smxcs',
        id_excursion: 2,
      }, {
        youtube_url: 'https://www.youtube.com/watch?v=FPZhCp5pOFE',
        id_excursion: 2,
      }];
      return knex('capitulo').insert(capitulo);
    });
};
