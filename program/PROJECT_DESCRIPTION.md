# Project Description

**Deployed Frontend URL:** [website](https://program-baher-salama.vercel.app/)

**Solana Program ID:** 7gLZpemQseJZJWo5tcSWVCL4g1Y6GN1xmdiptkQUo2rZ

## Project Overview

### Description
A Blog with markdown where the users are auumss and its up for the user to verify there claims on there own

### Key Features
- Feature 1: Markdown Editor for blogs
- Feature 2: The owner of the blog is unknown
  
### How to Use the dApp
1. **Connect Wallet in devnet**
2. **Main Action 1:** Go to the /write page start writing your blog and its title
3. **Main Action 2:** Post the blog in the /soulsend page
4. **look at other people blogs**

## Program Architecture
3 accounts 1 for PDA for blog and one for add and one for deleting

### PDA Usage
blogs are PDA and the seed is the hash of the content with the id of the writer so that each blog is uniq

**PDAs Used:**
- PDA 1: allowing more than one blog

### Program Instructions
1. add/init blog (soulsend)
2. Delete blog

**Instructions Implemented:**
- Instruction 1: adds a blog
- Instruction 2: delets a blog

### Account Structure
TODO: Describe your main account structures and their purposes

```rust
// Example account structure (replace with your actual structs)
#[account]
pub struct Soulsend{
    pub owner: Pubkey,// to know the owner
    pub bump: u8,// to know the PDA bump
    #[max_len(HEADING_LENGTH)]
    pub heading: String, // title of the blog
    #[max_len(SOUL_LENGTH)]
    pub content: String,// markdown content
}
```

## Testing

### Test Coverage
**Happy Path Tests:**
- Test 1: adding a blog gets added
- Test 2: deleteing a blog gets deleted

**Unhappy Path Tests:**
- Test 1: adding a blog title with a bigger than 100bytes should fail

### Running Tests
```bash
# Commands to run your tests
pnpm run anchor-test
```

### Additional Notes for Evaluators

+ project should be a place for people to write there blogs in markdown freely
+ project title should be good to get people attention
+ make sure to use devnet in the dropdown in the app
