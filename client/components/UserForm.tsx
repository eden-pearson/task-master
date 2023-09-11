import { useAuth0 } from '@auth0/auth0-react'
import { useState, useEffect } from 'react'
import { UpdateUser } from '../../models/users'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { useProfile } from '../hooks/users.ts'

export default function UserForm() {
  const navigate = useNavigate()
  const { getAccessTokenSilently, user } = useAuth0()
  const profile = useProfile()
  const queryClient = useQueryClient()

  const initialFormData: UpdateUser = {
    username: user?.nickname ? user.nickname : '',
    favouriteColour: '',
    location: '',
    image: user?.picture ? user.picture : '/images/girl.png',
  }
  const [newUser, setNewUser] = useState<UpdateUser>(initialFormData)

  useEffect(() => {
    setNewUser({
      username: user?.name ? user.name : '',
      favouriteColour: '',
      location: '',
      image: user?.picture ? user.picture : '/images/girl.png',
    })
  }, [user])

  // navigate the user away from this form if profile is already created
  useEffect(() => {
    if (profile.data) navigate('/')
  }, [profile.data, navigate])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setNewUser({
      ...newUser,
      [name]: value,
    } as UpdateUser)
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target

    setNewUser({
      ...newUser,
      [name]: value,
    } as UpdateUser)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await queryClient.invalidateQueries(['users'])
    const token = await getAccessTokenSilently()
    profile.add.mutate({ newUser, token })
  }
  return (
    <>
      <div className="flex justify-center my-20">
        <div className="flex justify-center flex-col p-5">
          <p className="text-center text-lg mb-2">Sign Up to TaskMaster</p>
          <p>
            <img
              className="px-8 h-40"
              src={newUser.image}
              alt={newUser.username}
            ></img>
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <label className="my-2">
              Username:
              <input
                onChange={handleChange}
                type="text"
                name="username"
                placeholder={user?.nickname}
                value={newUser.username}
                className="text-center my-2 mt-5"
                required
              ></input>
            </label>
            <label className="my-2">
              <b>Favourite Colour:</b>
              <select
                id="colour"
                name="colour"
                className=""
                onChange={handleSelectChange}
                defaultValue={'none'}
              >
                <option value={'none'} disabled>
                  choose one
                </option>
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
                <option value="purple">Purple</option>
                <option value="gray">Grey</option>
                <option value="yellow">Yellow</option>
              </select>
            </label>
            <label className="my-2">
              Location:
              <input
                onChange={handleChange}
                type="text"
                name="location"
                value={newUser.location}
                placeholder="country"
                className="text-center my-2 mt-5"
              ></input>
            </label>
            <button
              type="submit"
              className="m-auto text-white w-60  focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Create account
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
