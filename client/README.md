# onrent

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

##Inside src/firebase
**Add a file firebase.ts with following code snippet**
```typescript
// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

//You can get this o your firebase project settings
// Your web app's Firebase configuration
const Config = {
  apiKey: "##################",
  authDomain: "###############",
  projectId: "###########",
  storageBucket: "################",
  messagingSenderId: "################",
  appId: "##############",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(Config);
export const db = firebaseApp.firestore();

//firebase auth
export const auth = firebaseApp.auth();

```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

