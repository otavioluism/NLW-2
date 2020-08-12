import Knex from 'knex';

// método up as alteraçoes que faço
export async function up(knex: Knex){
  return knex.schema.createTable('users', table => { 
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('avatar').notNullable();
    table.string('whatsapp').notNullable();
    table.string('bio').notNullable();
  })
}

// método down as alterações que desfaço
export async function down(knex: Knex){ 
  knex.schema.dropTable('users');
}