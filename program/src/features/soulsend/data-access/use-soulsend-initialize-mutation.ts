import { useSolana } from '@/components/solana/use-solana'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UiWalletAccount, useWalletUiSigner } from '@wallet-ui/react'
import { useWalletUiSignAndSend } from '@wallet-ui/react-gill'
import { install as installEd25519 } from '@solana/webcrypto-ed25519-polyfill'
import { Address, generateKeyPairSigner, getAddressEncoder, getProgramDerivedAddress } from 'gill'
import { getInitializeInstruction } from '@project/anchor'
import { toastTx } from '@/components/toast-tx'
import { toast } from 'sonner'
import CryptoJS from 'crypto-js';
import { useMarkdown } from '@/components/markdown/markdown-provider'
import { useHeading } from '@/components/markdown/heading-provider'

// polyfill ed25519 for browsers (to allow `generateKeyPairSigner` to work)
installEd25519()

export function useSoulsendInitializeMutation({ account }: { account: UiWalletAccount }) {
  const { cluster } = useSolana()
  const queryClient = useQueryClient()
  const signer = useWalletUiSigner({ account })
  const signAndSend = useWalletUiSignAndSend()
  const { markdown, setMarkdown } = useMarkdown();
  const { heading, setHeading } = useHeading();
  const hash = CryptoJS.SHA256(markdown).toString();
  const buffer = Buffer.from(hash.toString(), 'hex');
  const array = new Uint8Array(buffer);
  return useMutation({
    mutationFn: async () => {
      const addressEncoder = getAddressEncoder();
      const [soul, bump] = await getProgramDerivedAddress({
        programAddress: '7gLZpemQseJZJWo5tcSWVCL4g1Y6GN1xmdiptkQUo2rZ' as Address,
        seeds: [
          addressEncoder.encode(account.address as Address),
          array
        ]
      });
      const soulsend = await generateKeyPairSigner()
      return await signAndSend(getInitializeInstruction({
        payer: signer,
        soul: soul,
        heading: heading,
        content: markdown
      }), signer)
    },
    onSuccess: async (tx) => {
      toastTx(tx)
      await queryClient.invalidateQueries({ queryKey: ['soulsend', 'accounts', { cluster }] })
    },
    onError: () => toast.error('Failed to run program'),
  })
}
