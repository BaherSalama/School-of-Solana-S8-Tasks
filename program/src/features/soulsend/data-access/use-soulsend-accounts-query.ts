import { useSolana } from '@/components/solana/use-solana'
import { useQuery } from '@tanstack/react-query'
import { getSoulsendProgramAccounts } from '@project/anchor'
import { useSoulsendAccountsQueryKey } from './use-soulsend-accounts-query-key'

export function useSoulsendAccountsQuery() {
  const { client } = useSolana()

  return useQuery({
    queryKey: useSoulsendAccountsQueryKey(),
    queryFn: async () => await getSoulsendProgramAccounts(client.rpc),
  })
}
