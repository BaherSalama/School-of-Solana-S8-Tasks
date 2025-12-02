import { Button } from '@/components/ui/button'
import { UiWalletAccount } from '@wallet-ui/react'

import { useSoulsendInitializeMutation } from '@/features/soulsend/data-access/use-soulsend-initialize-mutation'

export function SoulsendUiButtonInitialize({ account }: { account: UiWalletAccount }) {
  const mutationInitialize = useSoulsendInitializeMutation({ account })

  return (
    <Button onClick={() => mutationInitialize.mutateAsync()} disabled={mutationInitialize.isPending}>
      Add Soulsend Blog {mutationInitialize.isPending && '...'}
    </Button>
  )
}
