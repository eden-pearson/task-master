export function up(knex) {
  return knex.schema.createTable('tasks', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.boolean('completed').notNullable().defaultTo(false)
    table.timestamps(true, true)
    table.string('user_id').references('users.id')
  })
}

export function down(knex) {
  return knex.schema.dropTable('tasks')
}
