<template>
  <div class="profile">
    <div class="cover-container">
      <div class="cover-art">
        <div class="empty-cover" v-if="!user.coverimg"></div>
        <img v-else :src="user.coverimg" alt="" />
        <div class="cover-upload">
        <input
          id="imguploader"
          @change="imgChosen($event, 'cover')"
          accept=".png,.jpeg,.jpg"
          type="file"
          required
        />
        <span class="material-icons">
          photo_camera
        </span>
        <p>Edit Cover Photo</p>
      </div>
      </div>
      
    </div>
    <div class="profile-container">
      <div id="image">
        <img id="avatar" :src="user.image" />
        <div class="camera-icon">
          <input
            @change="imgChosen($event, 'profile')"
            id="imguploader"
            accept=".png,.jpeg,.jpg"
            type="file"
            required
          />
          <span class="material-icons">
            photo_camera
          </span>
        </div>
      </div>
      <div id="username">{{ user.username }}</div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from "vue";
import { resizeFile } from "../helper";
import { updateUser } from "../firebase/userCollection";
export default {
  props: ["userData", "uid"],
  setup(props) {
    const user = reactive({
      username: computed(() => props.userData.username),
      image: computed(() => props.userData.image),
      coverimg: computed(() => props.userData.coverimg),
    });
    const imgChosen = async (event, type) => {
      if (event.target.files) {
        const image = event.target.files[0];
        const compressed_image = await resizeFile(image);
        if (type === "profile") {
          const newForm = {
            image: compressed_image,
          };
          await updateUser(props.uid, newForm);
        } else {
          const newForm = {
            coverimg: compressed_image,
          };
          await updateUser(props.uid, newForm);
        }
      }
    };
    return { user, imgChosen };
  },
};
</script>

<style scoped>
.profile {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cover-container {
  width: inherit;
  min-height:200px;
  height: 45vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(to top, #242526, #414346, #d6d6d4);
}
.cover-art {
  width: 70vw;
  min-height: inherit;
  height: inherit;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}
#avatar,
.cover-art img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.empty-cover {
  height: 100%;
  width: 100%;
  background: #575858;
}
.cover-art img {
  border-radius: 10px;
}
.cover-upload {
  background: white;
  padding: 5px;
  border-radius: 5px;
  font-family: sans-serif;
  font-weight: bold;
  position: absolute;
  bottom: 5px;
  right: 10px;
  display: flex;
  align-items: center;
  padding: 5px 10px;
}
.profile-container{
  width:100vw;
  height:100px;
  background:#242526;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
#image {
  min-height:100px;
  min-width:100px;
  height: 10vh;
  width:10vh;
  background: rgb(236, 236, 236);
  border-radius: 50%;
  border: 4px #242526 solid;
  position: absolute;
  top:-70%;
}

#avatar {
  border-radius: 50%;
}
.camera-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 5px;
  right: -3px;
  padding: 5px;
  border-radius: 50%;
  position: absolute;
  background: #575858;
}
.camera-icon span {
  color: white;
  cursor: pointer;
}
#username {
  font-size: 2rem;
  font-family: Poppins;
  letter-spacing: 2px;
  padding: 5px;
  font-weight: bold;
  color: white;
  position: absolute;
  bottom:0;
}
#imguploader {
  height: 100%;
  width: 100%;
  position: absolute;
  opacity: 0;
  cursor: pointer;
  object-fit: cover;
}
::-webkit-file-upload-button {
  cursor: pointer;
}
@media screen and (max-width:400px) {
  .cover-art{
    width:100%;
  }
  
}
</style>
