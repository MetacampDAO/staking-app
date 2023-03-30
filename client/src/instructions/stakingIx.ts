import * as web3 from '@solana/web3.js'
import * as borsh from '@project-serum/borsh'

import dotenv from 'dotenv'
dotenv.config()

enum TokenInstruction {
    InitializeStakeAccount,
    Stake,
    Redeem,
    Unstake
}

export const initializeStakeAccountInstructionData = borsh.struct([
    borsh.u8('instruction')
]);

export const StakeInstructionData = borsh.struct([
    borsh.u8('instruction')
]);

export const UnstakeInstructionData = borsh.struct([
    borsh.u8('instruction')
]);

export const RedeemInstructionData = borsh.struct([
    borsh.u8('instruction')
]);

export function InitializeStakeAccountInstruction (owner: web3.PublicKey, nftTokenAccount: web3.PublicKey) {

    const programId : web3.PublicKey = new web3.PublicKey(process.env.PROGRAM_ID ?? "") 
    const [stakeState, bump] = web3.PublicKey.findProgramAddressSync([owner.toBuffer(), nftTokenAccount.toBuffer()], programId)

    const keys = [
        { 
            pubkey: owner,
            isSigner: true,
            isWritable: true
        },
        { 
            pubkey: nftTokenAccount,
            isSigner: false,
            isWritable: false
        },
        { 
            pubkey: stakeState,
            isSigner: false,
            isWritable: true
        },
        {
            pubkey: web3.SystemProgram.programId,
            isSigner: false,
            isWritable: false
        }

    ]

    const data = Buffer.alloc(initializeStakeAccountInstructionData.span);
    initializeStakeAccountInstructionData.encode(
        { 
            instruction: TokenInstruction.InitializeStakeAccount 
        },
        data
    );

    return new web3.TransactionInstruction({ keys, programId, data});

}

export function StakeInstruction (owner: web3.PublicKey, nftTokenAccount: web3.PublicKey) {

    const programId : web3.PublicKey = new web3.PublicKey(process.env.PROGRAM_ID ?? "") 
    const [stakeState, bump] = web3.PublicKey.findProgramAddressSync([owner.toBuffer(), nftTokenAccount.toBuffer()], programId)

    const keys = [
        { 
            pubkey: owner,
            isSigner: true,
            isWritable: true
        },
        { 
            pubkey: nftTokenAccount,
            isSigner: false,
            isWritable: false
        },
        { 
            pubkey: stakeState,
            isSigner: false,
            isWritable: true
        },
        {
            pubkey: web3.SystemProgram.programId,
            isSigner: false,
            isWritable: false
        }

    ]

    const data = Buffer.alloc(initializeStakeAccountInstructionData.span);
    initializeStakeAccountInstructionData.encode(
        { 
            instruction: TokenInstruction.InitializeStakeAccount 
        },
        data
    );

    return new web3.TransactionInstruction({ keys, programId, data});

}