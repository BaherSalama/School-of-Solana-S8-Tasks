//-------------------------------------------------------------------------------
///
/// TASK: Implement the deposit functionality for the on-chain vault
/// 
/// Requirements:
/// - Verify that the user has enough balance to deposit
/// - Verify that the vault is not locked
/// - Transfer lamports from user to vault using CPI (Cross-Program Invocation)
/// - Emit a deposit event after successful transfer
/// 
///-------------------------------------------------------------------------------

use anchor_lang::prelude::*;
use anchor_lang::solana_program::program::invoke;
use anchor_lang::solana_program::system_instruction::transfer;
use crate::state::Vault;
use crate::errors::VaultError;
use crate::events::DepositEvent;

#[derive(Accounts)]
pub struct Deposit<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
    #[account(mut)]
    pub vault: Account<'info, Vault>,
}

pub fn _deposit(ctx: Context<Deposit>, amount: u64) -> Result<()> {
    let vault = &mut ctx.accounts.vault;
    let user = &mut ctx.accounts.user;
    
    require!(!vault.locked, VaultError::VaultLocked);
    require!(user.lamports() > amount, VaultError::InsufficientBalance);

    invoke(
        &transfer(&user.key(),&vault.key(),amount),
        &[user.to_account_info(),
        vault.to_account_info()]
    )?;
    
    emit!(DepositEvent{
        vault:vault.key(),
        user:user.key(),
        amount:amount,
    });

    Ok(())
}