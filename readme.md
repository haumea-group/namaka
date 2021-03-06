
<br/>

# â đ namaka â

namaka is a fullstack library, for web apps, that provides features for user comments, replies, and 5-star reviews.

đ§ **namaka is currently under construction.**

### [đšī¸ live demo of namaka](https://namaka.chasemoskal.com/)  

đĻ `npm install @haumea/namaka`  
đ ī¸ typescript library and nodejs server  
đ universal web components  
đ made with open source love, just for you  
đ¨ [*figma designs*](https://www.figma.com/file/bkPYDb9SsfhJllBvR4mAkz/Review-System?node-id=1%3A20)  
đ¨âđĢ [**namaka devboard**](https://github.com/orgs/haumea-group/projects/3/views/1) *for tracking work and priorities*  

<br/>

## how to work on namaka as a developer

### first time

- git checkout the codebase
- `npm install` â install package dependencies
- `npm run build` â run a full project build

### each development session

- `npm run watch` â background process that rebuilds typescript code
- `npm start` â background process http server
- browse to http://localhost:8080/ to access demo page

### technologies to read up on

- [đĨ lit](https://lit.dev/) web component library
- [đŽ snapstate](https://github.com/chase-moskal/snapstate) state management
- [đ§ââī¸ dbmage](https://github.com/chase-moskal/dbmage) database library
- [âŠī¸ renraku](https://github.com/chase-moskal/renraku) api library
- [đ§ cynic](https://github.com/chase-moskal/cynic) testing library

<br/>

## components and renderers

### first-class components

- `<namaka-board>`  
  a board that lists comments or reviews. every comment or review "belongs" to a board. each board has a "load more" button at the bottom, and sorting functionality.

- `<namaka-comment>`  
  display a comment. it might be a thread or a reply. it might also have a score (we call comments that have scores "reviews").

- `<namaka-write-a-comment>`  
  a user can author a new comment or review thread, and post it onto the board.

- `<namaka-edit-comment>`  
  a user can edit an existing comment or review, whether it be a thread, or a reply.

- `<namaka-board-stats>`  
  display interesting statistics about the given board's comments and reviews. statistics like the average review score, total number of comments, things like that.

- `<namaka-bans>`  
  displays a list of banned users (for admins).

- `<namaka-demo>`  
  helps developers test and work on namaka in "mock mode", without a real auth integration.

### modal components

- `<namaka-modals>`  
  in-viewport popups. these grab the user's attention, and requires them to take an action before allowing them to get back to the rest of the page.

- `<namaka-ban>`  
  confirm whether you want to ban a specific user, and provide a timeframe for how long you want the ban to last.

- `<namaka-unban>`  
  confirm whether you want to repeal a ban for a specific user.

- `<namaka-archive-comment>`  
  confirm whether you want to archive a specific comment. this appears to delete a comment.

### utility components

- `<namaka-textarea>`  
  a smart textarea input with validation functionality.

### render functions

- `renderFiveStarDisplay`  
  renders a 0 to 100 score as a five-star-rating.
