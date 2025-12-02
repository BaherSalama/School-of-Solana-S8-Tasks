import { useSolana } from '@/components/solana/use-solana'

export function useSoulsendAccountsQueryKey() {
  const { cluster } = useSolana()

  return ['soulsend', 'accounts', { cluster }]
}
