
exports.up = function(knex, Promise) {
    return knex.schema.createTable('capitulo', (table) => {
        table.increments();
        table.text('youtube_url').notNullable();
        //table.integer('id_excursion').notNullable();
        table.integer('id_excursion').references('id').inTable('excursion');
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('capitulo');
};
