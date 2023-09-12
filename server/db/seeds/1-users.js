export async function seed(knex) {
  await knex('users').insert([
    {
      id: 1,
      auth0_id: 'auth0|567',
      display_name: 'Ashley',
      favourite_colour: 'purple',
      image: '/images/girl.png',
    },
    {
      id: 2,
      auth0_id: 'auth0|987',
      display_name: 'Kelly',
      favourite_colour: 'pink',
      image: '/images/boy.png',
    },
  ])
}
