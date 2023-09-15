import { useAuth0 } from '@auth0/auth0-react'
import { useState, useEffect } from 'react'
import { User } from '../../models/users'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../hooks/users.ts'

export default function UserForm() {
  const navigate = useNavigate()
  const { getAccessTokenSilently, user } = useAuth0()
  const userData = useUser()

  const initialFormData: User = {
    displayName: user?.given_name ? user.given_name : '',
    favouriteColour: '',
    image: user?.picture ? user.picture : '/images/girl.png',
  }
  const [newUser, setNewUser] = useState<User>(initialFormData)

  useEffect(() => {
    setNewUser({
      displayName: user?.given_name
        ? user.given_name
        : user?.nickname
        ? user.nickname
        : '',
      favouriteColour: '',
      image: user?.picture ? user.picture : '/images/girl.png',
    })
  }, [user])

  useEffect(() => {
    if (userData.data) navigate('/')
  }, [userData.data, navigate])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setNewUser({
      ...newUser,
      [name]: value,
    } as User)
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target

    setNewUser({
      ...newUser,
      [name]: value,
    } as User)
  }
  if (user) {
    console.log(user)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const token = await getAccessTokenSilently()
    userData.add.mutate({ newUser, token })
  }
  return (
    <>
      <div className="flex justify-center my-20">
        <div className="flex flex-col items-center">
          <p className="text-center text-lg mb-2">Sign Up to TaskMaster</p>
          <img
            className="h-40 w-40"
            src={newUser.image}
            alt={`${newUser.displayName}'s profile`}
          ></img>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <label className="my-2 ml-4">
              Name:
              <input
                onChange={handleChange}
                type="text"
                name="displayName"
                placeholder={user?.name}
                value={newUser.displayName}
                className="text-center my-2 mt-5 border-2 border-red-700 rounded-md mx-4"
                required
              ></input>
            </label>
            <label className="my-2 ml-4">
              Favourite Colour:
              <select
                id="favouriteColour"
                name="favouriteColour"
                className="px-3 border-2 border-red-700 rounded-md mx-4"
                onChange={handleSelectChange}
              >
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
                <option value="purple">Purple</option>
                <option value="gray">Grey</option>
                <option value="yellow">Yellow</option>
              </select>
            </label>
            <button
              type="submit"
              className="text-white w-60 bg-red-700  font-medium rounded-lg text-sm px-5 py-2.5 mt-4 mb-2"
            >
              Create account
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
