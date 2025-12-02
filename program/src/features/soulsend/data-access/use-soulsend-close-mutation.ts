import { SoulsendAccount, DeleteSoulInstruction, getDeleteSoulInstruction } from '@project/anchor'
import { useMutation } from '@tanstack/react-query'
import { UiWalletAccount, useWalletUiSigner } from '@wallet-ui/react'
import { useWalletUiSignAndSend } from '@wallet-ui/react-gill'
import { toastTx } from '@/components/toast-tx'
import { useSoulsendAccountsInvalidate } from './use-soulsend-accounts-invalidate'
import { Address, getAddressEncoder, getProgramDerivedAddress } from 'gill'
import CryptoJS from 'crypto-js';

export function useSoulsendCloseMutation({ account, soulsend }: { account: UiWalletAccount; soulsend: SoulsendAccount }) {
  const invalidateAccounts = useSoulsendAccountsInvalidate()
  const signAndSend = useWalletUiSignAndSend()
  const signer = useWalletUiSigner({ account })

  return useMutation({
    mutationFn: async () => {
      const addressEncoder = getAddressEncoder();
      console.log(soulsend.data.content)
      const hash = CryptoJS.SHA256(soulsend.data.content.toString()).toString();
      const buffer = Buffer.from(hash.toString(), 'hex');
      const array = new Uint8Array(buffer);
      const [soul, bump] = await getProgramDerivedAddress({
        programAddress: '7gLZpemQseJZJWo5tcSWVCL4g1Y6GN1xmdiptkQUo2rZ' as Address,
        seeds: [
          addressEncoder.encode(account.address as Address),
          array
        ]
      });
      return await signAndSend(getDeleteSoulInstruction({
        payer: signer,
        //        soulsend: soulsend.address,
        soul: soul
      }), signer)
    },
    onSuccess: async (tx) => {
      toastTx(tx)
      await invalidateAccounts()
    },
  })
}
