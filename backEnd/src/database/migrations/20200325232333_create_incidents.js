//Criação da Tabela
exports.up = function(knex) {
    return knex.schema.createTable('incidents',(table)=>{

        table.increments('id');
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.string('value').notNullable();
        
        //Criando chave estrangeira
        table.string('ong_id').notNullable();

        //Referenciando chave estrangeira
        table.foreign('ong_id').references('id').inTable('ongs');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
  };
  