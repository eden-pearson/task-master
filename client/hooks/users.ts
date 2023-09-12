import { useAuth0 } from '@auth0/auth0-react'
import { addUser, fetchUserByToken } from '../apis/users'
import {
  MutationFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

export function useUserMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries(['userData'])
    },
  })
}

export function useAddUser() {
  return useUserMutation(addUser)
}

export function useUser() {
  const { user, getAccessTokenSilently } = useAuth0()

  const query = useQuery({
    queryKey: ['userData'],
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      return fetchUserByToken(token)
    },
    enabled: !!user,
  })

  return {
    ...query,
    add: useAddUser(),
  }
}
