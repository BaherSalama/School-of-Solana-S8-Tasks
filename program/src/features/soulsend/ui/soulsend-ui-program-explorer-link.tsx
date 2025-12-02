import { SOULSEND_PROGRAM_ADDRESS } from '@project/anchor'
import { AppExplorerLink } from '@/components/app-explorer-link'
import { ellipsify } from '@wallet-ui/react'

export function SoulsendUiProgramExplorerLink() {
  return <AppExplorerLink address={SOULSEND_PROGRAM_ADDRESS} label={ellipsify(SOULSEND_PROGRAM_ADDRESS)} />
}
