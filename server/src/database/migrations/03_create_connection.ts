import Knex from 'knex';

// método up as alteraçoes que faço
export async function up(knex: Knex){
  return knex.schema.createTable('connections', table => { 
    table.increments('id').primary();

    // chave estrangeira ou secundária
    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')  // caso for modificado o id na tabela de users modificara automaticamente na de classes 
      .onDelete('CASCADE'); // caso o professor seja removido, remove junto todas suas aulas associadas

    table.timestamp('created_at')
         .defaultTo(knex.raw('CURRENT_TIMESTAMP')) //pega o horario atual
         .notNullable();
  });
}

// método down as alterações que desfaço
export async function down(knex: Knex){ 
  knex.schema.dropTable('connections');
}