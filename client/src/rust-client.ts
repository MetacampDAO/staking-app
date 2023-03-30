import * as web3 from '@solana/web3.js'
import * as borsh from '@project-serum/borsh'

import {initializeSolSignerKeypair, airdropSolIfNeeded, initializeEthSignerKeypair } from './initializeKeypair'

import { InitializeStakeAccountInstruction } from './instructions/stakingIx'

import dotenv from 'dotenv'
dotenv.config()



async function initializeStakeAccount(signer: web3.Keypair, nftTokenAccount: web3.PublicKey, connection: web3.Connection) {
    
    // Create and send tx to target program
    const transaction = new web3.Transaction()
    const instruction = InitializeStakeAccountInstruction(signer.publicKey, nftTokenAccount)
    transaction.add(instruction)
    const tx = await web3.sendAndConfirmTransaction(connection, transaction, [signer])
    console.log(`https://explorer.solana.com/tx/${tx}?cluster=devnet`)

}


async function main() {
    const signer = initializeSolSignerKeypair()
    const connection = new web3.Connection(web3.clusterApiUrl('devnet'))

    await airdropSolIfNeeded(signer, connection)
    await initializeStakeAccount(signer, new web3.PublicKey("6gxdkDfXQjfnifRjT3W8BSK2EvYaiYtc7K9yVG8Mg4fg"), connection)
}

main().then(() => {
    console.log('Finished successfully')
    process.exit(0)
}).catch(error => {
    console.log(error)
    process.exit(1)
})