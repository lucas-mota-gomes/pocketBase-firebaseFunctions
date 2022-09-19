
# Introduction
This project was created to implement an Api using PocketBase as the main authentication method and data/file storage.

# Getting Started

## Install


```bash
  cd functions
  npm install
  npm run serve
```
    
## Upload to functions

Configure firebase.json and .firebaserc to upload to firebase functions.

```bash
  cd functions
  firebase use default
  firebase login
  firebase deploy --only functions
```