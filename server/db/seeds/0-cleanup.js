export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('tasks').del()
  await knex('users').del()
}
