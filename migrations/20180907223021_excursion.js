
exports.up = function(knex, Promise) {
    return knex.schema.createTable('excursion', (table) => {
        table.increments();
        table.text('titulo').notNullable();
        table.text('descripcion');
        table.text('creditos');
        table.text('portada');
        //table.integer('id_usuario').notNullable();
        table.integer('id_usuario').references('id').inTable('usuarios');
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('excursion');
};
