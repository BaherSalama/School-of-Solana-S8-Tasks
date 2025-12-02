// Here we export some useful types and functions for interacting with the Anchor program.
import { Account, getBase58Decoder, SolanaClient } from 'gill'
import { getProgramAccountsDecoded } from './helpers/get-program-accounts-decoded'
import { Soul, SOUL_DISCRIMINATOR, SOULSEND_PROGRAM_ADDRESS, getSoulDecoder } from './client/js'
import SoulsendIDL from '../target/idl/soulsend.json'

export type SoulsendAccount = Account<Soul, string>

// Re-export the generated IDL and type
export { SoulsendIDL }

export * from './client/js'

export function getSoulsendProgramAccounts(rpc: SolanaClient['rpc']) {
  return getProgramAccountsDecoded(rpc, {
    decoder: getSoulDecoder(),
    filter: getBase58Decoder().decode(SOUL_DISCRIMINATOR),
    programAddress: SOULSEND_PROGRAM_ADDRESS,
  })
}
