
exports.up = function(knex, Promise) {

    return knex.schema.createTable('usuarios', (table) => {
        table.increments();
        table.text('nombre').notNullable();
        table.text('usuario').notNullable();
        table.text('clave').notNullable();
        table.text('rol').notNullable();
        table.text('foto_perfil');
      });
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('usuarios');
};
