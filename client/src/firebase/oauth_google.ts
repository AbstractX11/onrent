import { getAuth, signInWithRedirect,GoogleAuthProvider} from "firebase/auth";
// import firebase from "firebase/compat/app";

const provider = new GoogleAuthProvider();
const auth = getAuth();
signInWithRedirect(auth, provider);