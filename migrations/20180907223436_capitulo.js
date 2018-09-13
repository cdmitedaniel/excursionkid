
exports.up = function(knex, Promise) {
    return knex.schema.createTable('capitulo', (table) => {
        table.increments();
        table.text('youtube_url').notNullable();
        table.text('portada');
        table.text('titulo');
        table.integer('id_excursion');
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('capitulo');
};
