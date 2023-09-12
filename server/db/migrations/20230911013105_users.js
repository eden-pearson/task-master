export function up(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.string('auth0_id').unique()
    table.string('display_name')
    table.string('favourite_colour')
    table.text('image')
  })
}

export function down(knex) {
  return knex.schema.dropTable('users')
}
