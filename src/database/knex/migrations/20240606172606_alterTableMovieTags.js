exports.up = (knex) => 
  knex.schema.alterTable("movieTags", table => {
    table.dropForeign("note_id")
    table.foreign("note_id").references('id').inTable('movieNotes').onDelete('CASCADE')
  }) 


exports.down = (knex) => 
knex.schema.alterTable("movieTags", table => {
  table.dropForeign("note_id")
  table.foreign("note_id").references('id').inTable('movieNotes')
}) 
  

