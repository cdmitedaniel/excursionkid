exports.seed = function(knex, Promise) {
  return knex('usuarios').del()
    .then(function () {
      const usuarios = [{
        nombre: 'Charlie Mite',
        usuario: 'cmite',
        clave: '123',
        rol: 'A',
        foto_perfil: '/images/cuenta.png'

      }, {
        nombre: 'Wacho',
        usuario: 'wacho',
        clave: '123',
        rol: 'A',
        foto_perfil: '/images/cuenta.png'
      }, {
        nombre: 'Dam',
        usuario: 'dam',
        clave: '123',
        rol: 'N',
        foto_perfil: '/images/oveja.png'
      }];
      return knex('usuarios').insert(usuarios);
    });
};
