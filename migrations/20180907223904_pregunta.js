
exports.up = function(knex, Promise) {
    return knex.schema.createTable('pregunta', (table) => {
        table.increments();
        table.integer('id_capitulo');
        table.text('pregunta').notNullable()
        table.integer('respuesta').notNullable();
        table.text('pregunta_1_img').notNullable();
        table.text('pregunta_2_img').notNullable();
        table.text('pregunta_3_img').notNullable();
        table.text('pregunta_4_img').notNullable();
        table.text('pregunta_audio').notNullable();
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('pregunta');
};
