exports.seed = function(knex, Promise) {
  return knex('usuarios').del()
    .then(function () {
      const usuarios = [{
        nombre: 'Charlie Mite',
        usuario: 'cmite',
        clave: '123',
        rol: 'A',
        foto_perfil: 'http://www.adeevee.com/images/website/profile-default-pic-creative.png'

      }, {
        nombre: 'Wacho',
        usuario: 'wacho',
        clave: '123',
        rol: 'A',
        foto_perfil: 'http://www.adeevee.com/images/website/profile-default-pic-creative.png'
      }, {
        nombre: 'Dam',
        usuario: 'dam',
        clave: '123',
        rol: 'N',
        foto_perfil: 'http://www.naranxadul.com/sites/default/files/styles/thumbnail/public/pictures/2018-02/foto_8.jpg?itok=UB350A9H'
      }];
      return knex('usuarios').insert(usuarios);
    });
};
