import { SoulsendAccount } from '@project/anchor'
import { UiWalletAccount } from '@wallet-ui/react'
import { Button } from '@/components/ui/button'

import { useSoulsendCloseMutation } from '@/features/soulsend/data-access/use-soulsend-close-mutation'

export function SoulsendUiButtonClose({ account, soulsend }: { account: UiWalletAccount; soulsend: SoulsendAccount }) {
  const closeMutation = useSoulsendCloseMutation({ account, soulsend })

  return (
    <Button
      variant="destructive"
      onClick={() => {
        if (!window.confirm('Are you sure you want to close this account?')) {
          return
        }
        return closeMutation.mutateAsync()
      }}
      disabled={closeMutation.isPending}
    >
      Delete
    </Button>
  )
}
