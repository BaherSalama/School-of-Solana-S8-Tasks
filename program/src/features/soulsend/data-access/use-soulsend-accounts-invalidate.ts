import { useQueryClient } from '@tanstack/react-query'
import { useSoulsendAccountsQueryKey } from './use-soulsend-accounts-query-key'

export function useSoulsendAccountsInvalidate() {
  const queryClient = useQueryClient()
  const queryKey = useSoulsendAccountsQueryKey()

  return () => queryClient.invalidateQueries({ queryKey })
}
