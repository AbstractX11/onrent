<template>
  <div>
    <router-view :userData="userData" :uid="uid" :authStatus="authStatus">
    </router-view>
  </div>
</template>
<script>
import { ref } from "vue";
import { auth } from "./firebase/firebase";
import { getuser, usersCollection } from "./firebase/userCollection";
export default {
  setup() {
    const uid = ref("");
    const authStatus = ref(false);
    const userData = ref({});
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        uid.value = user.uid;
        console.log("user logged in");
        authStatus.value = true;
        const getuserData = async () => {
          const response = await getuser(uid.value);
          userData.value = { ...response };
        };
        await getuserData();
      } else {
        console.log("user logged out");
        authStatus.value = false;
      }
    });
    usersCollection.onSnapshot(async () => {
      const getuserData = async () => {
        const response = await getuser(uid.value);
        userData.value = { ...response };
      };
      await getuserData();
    });
    return { authStatus, uid, userData};
  },
};
</script>
<style></style>
