import { useSolana } from '@/components/solana/use-solana'
import { WalletDropdown } from '@/components/wallet-dropdown'
import { AppHero } from '@/components/app-hero'
import { SoulsendUiButtonInitialize } from './ui/soulsend-ui-button-initialize'
import { SoulsendUiList } from './ui/soulsend-ui-list'
import { SoulsendUiProgramExplorerLink } from './ui/soulsend-ui-program-explorer-link'
import { SoulsendUiProgramGuard } from './ui/soulsend-ui-program-guard'
import { useMarkdown } from '@/components/markdown/markdown-provider'

export default function SoulsendFeature() {
  const { account } = useSolana()
  const { markdown, setMarkdown } = useMarkdown();

  return (
    <SoulsendUiProgramGuard>
      <AppHero
        title="Soulsend"
        subtitle={
          account
            ? <p>Add or view blogs before adding check that did write something <a href="/write" style={{ "color": "blue" }} > here</a> </p>
            : 'Select a wallet to run the program.'
        }
      >
        <p className="mb-6">
          <SoulsendUiProgramExplorerLink />
        </p>
        {
          account ? (
            <SoulsendUiButtonInitialize account={account} />
          ) : (
            <div style={{ display: 'inline-block' }}>
              <WalletDropdown />
            </div>
          )
        }
      </AppHero >
      {account ? <SoulsendUiList account={account} /> : null}
    </SoulsendUiProgramGuard >
  )
}
