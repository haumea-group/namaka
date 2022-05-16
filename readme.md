
<br/>

# ⁓ 🌑 namaka ⁓

namaka is a fullstack user comments and 5-star reviews system for web applications.

### [🕹️ live demo of namaka](https://namaka.chasemoskal.com/)  

📦 `npm install @haumea/namaka`  
🛠️ typescript library and nodejs server  
🌐 universal web components  
💖 made with open source love, just for you  

<br/>

# <center>Components Description</center>

`<namaka-textarea>`

- A text input component that has validation functionanlity.
  

---

`<namaka-author-reply> ` (probably should be renamed to `<namaka-reply>`)

- A componet that provides the interface to reply a thread.
  
- A component that displays the reply to a thread.
  

---

`<namaka-my-review>` (probably should be renamed to `<namaka-user-stats>`)

- A component that displays the overall rating of a user (also display the breakdown of the rating?).
  

---

`<namaka-horizontal-review>` (probably should be wrapped inside `<namaka-user-stats>`)

- A component that displays user 5 star rating in form of a horizontal progress bar.
  

---

`<namaka-empty-review>` (should probably be wrapped in `<namaka-comment-list>` as a representation of it's empty state)

- A component that communicates an *empty comment* state.
  

---

`<namaka-edit-review>`

- A component that allows the author of a review to edit their review text and 5 star rating.
  

---

`<namaka-banned-users>` (should probably be renamed to `<namaka-bans>`, although the current name is kinda more descriptive)

- A component that displays the list of banned users for an admin user.
  
- Allows the admin user to search, filter and unban a user.
  

---

`<namaka-comments>` (should probably be renamed to `<namaka-comment-list>`)

- A component that display the list of review threads(or comments) available for a user.
  
- Allow a user to load more comments/threads, and sort them.
  

---

`<namaka-unban-user>`

- A component that displays a modal that prompts an admin user before they unban a user.
  

---

`<namaka-suspend-user>`

- A component that displays a modal that prompts an admin user before they suspend a user.
  
- Allows the admin user select how long the suspension will last.
  

---

`<namaka-delete-user>`

- A component that displays a modal that prompts an admin user before they delete a user.
  do we really want this? I doubt
  

---

`<namaka-delete-review>`

- A component that displays a modal that prompts a user (admin / review author) before they delete a review.
  

---

`<namaka-review-comment>` (should probably be renamed to `<namaka-comment>`)

- A component that displays the review given to a user, also referred to as the root comment/thread
  

---

`<namaka-demo-auth>` (should probably be renamed to `<namaka-auth>`)

- A component that handles authentication of a user (admin / regular user).
  
- Allows a user to login and log out. It's state determines the view and controls avaliable to a user
  

---

`<namaka-post-review>` (not avalable yet??)

- A component (a modal most likely) that allows users to post a review
  
  - type text and leave a five-star rating
