//-------------------------------------------------------------------------------
use crate::errors::TwitterError;
use crate::states::*;
///
/// TASK: Implement the add comment functionality for the Twitter program
///
/// Requirements:
/// - Validate that comment content doesn't exceed maximum length
/// - Initialize a new comment account with proper PDA seeds
/// - Set comment fields: content, author, parent tweet, and bump
/// - Use content hash in PDA seeds for unique comment identification
///
///-------------------------------------------------------------------------------
use anchor_lang::prelude::*;
use anchor_lang::solana_program::hash::hash;

pub fn add_comment(ctx: Context<AddCommentContext>, comment_content: String) -> Result<()> {
    require!(
        comment_content.as_bytes().len() <= COMMENT_LENGTH,
        TwitterError::CommentTooLong
    );
    let tweet = &mut ctx.accounts.tweet;
    let comment = &mut ctx.accounts.comment;
    let comment_auth = &mut ctx.accounts.comment_author;
    comment.comment_author = comment_auth.key();
    comment.bump = ctx.bumps.comment;
    comment.content = comment_content;
    comment.parent_tweet = tweet.key();
    Ok(())
}

#[derive(Accounts)]
#[instruction(comment_content: String)]
pub struct AddCommentContext<'info> {
    #[account(mut)]
    pub comment_author: Signer<'info>,
    #[account(
        init,
        payer=comment_author,
        seeds=[
            COMMENT_SEED.as_bytes(),
            comment_author.key().as_ref(),
            &sha256_hash(&comment_content),
            tweet.key().as_ref()
        ],
        space = 8 + Comment::INIT_SPACE,
        bump
    )]
    pub comment: Account<'info, Comment>,
    pub tweet: Account<'info, Tweet>,
    pub system_program: Program<'info, System>,
}

fn sha256_hash(content: &str) -> [u8; 32] {
    hash(content.as_bytes()).to_bytes()
}
