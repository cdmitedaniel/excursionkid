exports.seed = function(knex, Promise) {
  return knex('capitulo').del()
    .then(function () {
      const capitulo = [{
        youtube_url: 'https://www.youtube.com/watch?v=pq3Eya5e-oY',
        id_excursion: 1,
        portada:'http://humorsapiens.com/sites/default/files/styles/large/public/Portadas/portada-pepito-chistes-para-ninos-1.jpg?itok=LEMJqD6w',
        titulo: 'Capitulo ejemplo 1'
      }, {
        youtube_url: 'https://www.youtube.com/watch?v=OXgMVyY3NL4',
        id_excursion: 1,
        portada:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5mKmD0vL4v7mr1lNWQcK9aPW10oaGiF-hQSeNs6EEnBDDawB9',
        titulo: 'Capitulo ejemplo 2'
      },{
        youtube_url: 'https://www.youtube.com/watch?v=N9TTN5smxcs',
        id_excursion: 2,
        portada:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvVaT2q6Y3DLanFm-Bd8udQjOGQCJt8N3N1fXmEdINfgw_pMJo',
        titulo: 'Capitulo ejemplo 3'
      }, {
        youtube_url: 'https://www.youtube.com/watch?v=FPZhCp5pOFE',
        id_excursion: 2,
        portada:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4iOhgeUqXKUN2hJO8dfwF3WzHj_3fYEPDdpSy6YtilGWkE2Oq',
        titulo: 'Capitulo ejemplo 4'
      }];
      return knex('capitulo').insert(capitulo);
    });
};
