
exports.up = function(knex, Promise) {
    return knex.schema.createTable('pregunta', (table) => {
        table.increments();
        //table.integer('id_capitulo').notNullable();
        table.integer('id_capitulo').references('id').inTable('capitulo');
        table.text('pregunta').notNullable();
        table.text('pregunta_1').notNullable();
        table.text('pregunta_2').notNullable();
        table.text('pregunta_3').notNullable();
        table.text('pregunta_4').notNullable();
        table.integer('respuesta').notNullable();
        table.text('pregunta_1_img').notNullable();
        table.text('pregunta_2_img').notNullable();
        table.text('pregunta_3_img').notNullable();
        table.text('pregunta_4_img').notNullable();
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('pregunta');
};
