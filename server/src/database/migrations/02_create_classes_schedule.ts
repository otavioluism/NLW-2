import Knex from 'knex';

// método up as alteraçoes que faço
export async function up(knex: Knex){
  return knex.schema.createTable('class_schedule', table => { 
    table.increments('id').primary();

    table.integer('week_day').notNullable();
    table.integer('from').notNullable();
    table.integer('to').notNullable();

    // chave estrangeira ou secundária
    table.integer('class_id')
      .notNullable()
      .references('id')
      .inTable('classes')
      .onUpdate('CASCADE')  // caso for modificado o id na tabela de users modificara automaticamente na de classes 
      .onDelete('CASCADE'); // caso o professor seja removido, remove junto todas suas aulas associadas
  });
}

// método down as alterações que desfaço
export async function down(knex: Knex){ 
  knex.schema.dropTable('class_schedule');
}