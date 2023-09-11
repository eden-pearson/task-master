export async function seed(knex) {
  await knex('users').insert([
    {
      id: 1,
      auth0_id: 'auth0|123',
      username: 'paigeturner',
      favourite_colour: 'purple',
      location: 'Auckland',
      image: '/images/girl.png',
    },
    {
      id: 2,
      auth0_id: 'auth0|234',
      username: 'idapizza',
      favourite_colour: 'pink',
      location: 'Auckland',
      image: '/images/boy.png',
    },
  ])
}
