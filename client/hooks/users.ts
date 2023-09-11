import { useAuth0 } from '@auth0/auth0-react'
import { addProfile, fetchProfileByToken } from '../apis/users'
import {
  MutationFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

export function useProfileMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries(['profile'])
    },
  })
}

export function useAddProfile() {
  return useProfileMutation(addProfile)
}

export function useProfile() {
  const { user, getAccessTokenSilently } = useAuth0()

  const query = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      return fetchProfileByToken(token)
    },
    enabled: !!user,
  })

  return {
    ...query,
    add: useAddProfile(),
  }
}
