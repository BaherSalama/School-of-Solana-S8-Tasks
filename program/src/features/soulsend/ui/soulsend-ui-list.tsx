import { SoulsendUiCard } from './soulsend-ui-card'
import { useSoulsendAccountsQuery } from '@/features/soulsend/data-access/use-soulsend-accounts-query'
import { UiWalletAccount } from '@wallet-ui/react'

export function SoulsendUiList({ account }: { account: UiWalletAccount }) {
  const soulsendAccountsQuery = useSoulsendAccountsQuery()

  if (soulsendAccountsQuery.isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>
  }

  if (!soulsendAccountsQuery.data?.length) {
    return (
      <div className="text-center">
        <h2 className={'text-2xl'}>No Blogs found</h2>
        Be the first to post
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {soulsendAccountsQuery.data?.map((soulsend) => (
        <SoulsendUiCard account={account} key={soulsend.address} soulsend={soulsend} />
      ))}
    </div>
  )
}
