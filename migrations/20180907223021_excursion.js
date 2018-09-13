
exports.up = function(knex, Promise) {
    return knex.schema.createTable('excursion', (table) => {
        table.increments();
        table.text('titulo').notNullable();
        table.text('descripcion');
        table.text('creditos');
        table.text('portada');
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('excursion');
};
