import {
  Address,
  Blockhash,
  createSolanaClient,
  createTransaction,
  generateKeyPairSigner,
  getAddressEncoder,
  getProgramDerivedAddress,
  Instruction,
  isSolanaError,
  KeyPairSigner,
  signTransactionMessageWithSigners,
} from 'gill'
import {
  fetchSoul,
  DeleteSoulInstruction,
  getInitializeInstruction,
  getDeleteSoulInstruction,
} from '../src'
// @ts-ignore error TS2307 suggest setting `moduleResolution` but this is already configured
import { loadKeypairSignerFromFile } from 'gill/node'
import CryptoJS from 'crypto-js';

const { rpc, sendAndConfirmTransaction } = createSolanaClient({ urlOrMoniker: process.env.ANCHOR_PROVIDER_URL! })
const message = "# hello";
const heding = "hi"
describe('soulsend', () => {
  let payer: KeyPairSigner
  let another: KeyPairSigner
  let soulsend: Address
  let bump

  const hash = CryptoJS.SHA256(message).toString();
  let buffer = Buffer.from(hash.toString(CryptoJS.enc.Hex), 'hex');
  let array = new Uint8Array(buffer);
  const addressEncoder = getAddressEncoder();
  beforeAll(async () => {
    payer = await loadKeypairSignerFromFile(process.env.ANCHOR_WALLET!);
    another = await generateKeyPairSigner();
    [soulsend, bump]
      = await getProgramDerivedAddress({
        programAddress: '7gLZpemQseJZJWo5tcSWVCL4g1Y6GN1xmdiptkQUo2rZ' as Address,
        seeds: [
          addressEncoder.encode(payer.address),
          array
        ]
      });

  })

  it('Add Soulsend', async () => {
    // ARRANGE
    expect.assertions(2)
    const ix = getInitializeInstruction({ payer: payer, soul: soulsend, content: message, heading: heding })

    // ACT
    await sendAndConfirm({ ix, payer })

    // ASSER
    const currentSoulsend = await fetchSoul(rpc, soulsend)
    expect(currentSoulsend.data.content).toBe(message)
    expect(currentSoulsend.data.heading).toBe(heding)
  })

  it('delete soulsend blog', async () => {
    // ARRANGE
    expect.assertions(1)
    const ix = getDeleteSoulInstruction({
      payer: payer,
      soul: soulsend,
    })

    // ACT
    await sendAndConfirm({ ix, payer })

    // ASSERT
    try {
      await fetchSoul(rpc, soulsend)
    } catch (e) {
      if (!isSolanaError(e)) {
        throw new Error(`Unexpected error: ${e}`)
      }
      expect(e.message).toEqual(`Account not found at address: ${soulsend}`)
    }
  })

  it('adding a bigger than 100 byte title fails', async () => {
    // ARRANGE
    // expect.assertions(1)
    let bigboi= "h".repeat(101);
    const ix = getInitializeInstruction({ payer: payer, soul: soulsend, content: message, heading: bigboi})
    // ACT
    try{
      await sendAndConfirm({ ix, payer })
    }catch (e){
      expect(isSolanaError(e)).toEqual(true)
    }

  })
})

// Helper function to keep the tests DRY
let latestBlockhash: Awaited<ReturnType<typeof getLatestBlockhash>> | undefined
async function getLatestBlockhash(): Promise<Readonly<{ blockhash: Blockhash; lastValidBlockHeight: bigint }>> {
  if (latestBlockhash) {
    return latestBlockhash
  }
  return await rpc
    .getLatestBlockhash()
    .send()
    .then(({ value }) => value)
}
async function sendAndConfirm({ ix, payer }: { ix: Instruction; payer: KeyPairSigner }) {
  const tx = createTransaction({
    feePayer: payer,
    instructions: [ix],
    version: 'legacy',
    latestBlockhash: await getLatestBlockhash(),
  })
  const signedTransaction = await signTransactionMessageWithSigners(tx)
  return await sendAndConfirmTransaction(signedTransaction)
}
