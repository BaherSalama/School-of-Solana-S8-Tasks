#![allow(clippy::result_large_err)]

use anchor_lang::{prelude::*, solana_program::hash::hash};

declare_id!("7gLZpemQseJZJWo5tcSWVCL4g1Y6GN1xmdiptkQUo2rZ");

#[program]
pub mod soulsend {
    use super::*;

    pub fn initialize(ctx: Context<AddSoul>, content: String, heading: String) -> Result<()> {
        require!(content.bytes().len() < SOUL_LENGTH, SoulError::Blogtoobig);
        require!(
            heading.bytes().len() < HEADING_LENGTH,
            SoulError::Headingtoobig
        );
        ctx.accounts.soul.owner = ctx.accounts.payer.key();
        ctx.accounts.soul.content = content;
        ctx.accounts.soul.heading = heading;
        ctx.accounts.soul.bump = ctx.bumps.soul;
        Ok(())
    }

    pub fn delete_soul(_ctx: Context<DeleteSoul>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(content: String)]
pub struct AddSoul<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(
        init,
        space = 8 + Soul::INIT_SPACE,
        payer = payer,
        seeds=[payer.key().as_ref(),&sha256_hash(&content)],
        bump
    )]
    pub soul: Account<'info, Soul>,
    pub system_program: Program<'info, System>,
}

fn sha256_hash(content: &str) -> [u8; 32] {
    hash(content.as_bytes()).to_bytes()
}

#[derive(Accounts)]
pub struct DeleteSoul<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(
        mut,
        close = payer,
        seeds= [
            payer.key().as_ref(),
            &sha256_hash(&soul.content)
        ],
        bump
    )]
    pub soul: Account<'info, Soul>,
}

pub const SOUL_LENGTH: usize = 1000;
pub const HEADING_LENGTH: usize = 100;

#[account]
#[derive(InitSpace)]
pub struct Soul {
    pub owner: Pubkey,
    pub bump: u8,
    #[max_len(HEADING_LENGTH)]
    pub heading: String,
    #[max_len(SOUL_LENGTH)]
    pub content: String,
}

#[error_code]
pub enum SoulError {
    #[msg("No more than 1Mb")]
    Blogtoobig,
    #[msg("Smaller Heading plz")]
    Headingtoobig,
}
