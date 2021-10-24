<template>
  <div class="edit-form">
    <button type="button" @click="popupToggle(0)" class="close">
      <img src="../../assets/Image/exiticon.svg" />
    </button>
    <h2>Edit Details of your product</h2>
    <form @submit.prevent="handleSubmit">
   <label>Name of Product</label>
      <input
        class="details"
        v-model="form.name"
        type="text"
        required
      />
      <label>Choose type of Product</label>
      <div class="details type" title="Type cannot be edited">{{ form.type }}</div>
      <label>Address</label>
      <input
        class="details"
        v-model="form.address"
        type="text"
        required
      />
      <label>Price</label>
      <input
        class="details"
        v-model="form.price"
        type="text"
        required
      />
      <label>Description</label>
      <div
        class="details description"
        :html="form.description"
        @input="onDivInput($event)"
        contentEditable="true"
      >{{form.description}}
      </div>
      <label>Choose image</label>
       <div class="image-container">
        <input
        class="imguploader"
        @change="imgChosen($event)"
        accept=".png,.jpeg,.jpg"
        type="file"
      />
      <div class="cover-photo">
        <img class="photo" v-if="form.image.length" :src="form.image" />
        <img class="svg" v-else src="../../assets/Image/addphoto.svg" />
      </div>
      </div>
      <br />
      <p class="error" v-if="errors">
        {{ errors }}
      </p>
      <button type="submit" class="submit">Save Changes</button>
    </form>
  </div>
</template>

<script>
import { ref, reactive, computed } from "vue";
import { updateProduct } from "../../firebase/productCollection";
import router from "../../router/index";
import { resizeFile } from "../../helper";
export default {
  props: ["uid", "productdata", "popupToggle"],
  setup(props) {
    const product = props.productdata;
    const form = reactive({
      image: product.Image,
      name: product.Name,
      type: product.type,
      address: product.Address,
      price: product.Price,
      description: product.Description,
      uid: computed(() => props.uid),
      id: product.id,
    });
    const errors = ref("");

    form.collectionPath = `/products/types/${form.type}`;
    const imgChosen = async (event) => {
      if (event.target.files) {
        const image = event.target.files[0];
        const compressed_image = await resizeFile(image);
        form.image = compressed_image;
        errors.value =
          compressed_image.length > 1000000 ? "Larger image size" : "";
      }
    };
    const onDivInput = (e) => {
      form.description = e.target.innerText;
    };
    const handleSubmit = async () => {
      if (errors.value.length === 0) {
        await updateProduct(form);
        router.go();
      }
      console.log(errors.value.length);
    };
    return {
      form,
      imgChosen,
      handleSubmit,
      onDivInput,
      errors,
      product,
    };
  },
};
</script>

<style scoped>
.edit-form {
  width: 40vw;
  height:95vh;
  position: relative;
  display: flex;
  overflow-y:scroll;
  flex-direction: column;
  align-items: center;
}
label{
  color: #ffff;
  margin-bottom:5px;
}
h2 {
  margin-top: 10px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  color: #ce5050;
  margin-bottom: 0;
}
form {
  margin: 10px;
  width: 75%;
  display: flex;
  flex-direction: column;
}
.details {
  border: none;
  outline: none;
  background: transparent;
  border: 1px solid #ce5050;
  border-radius:5px;
  margin-bottom: 25px;
  padding: 10px 15px;
  color: #ffffff;
  font-size: 15px;
}
.type{
  background: rgb(78, 78, 78);
}
::placeholder {
  color: #ffffff;
}
.description {
  height: 100px;
  font-family: Poppins;
  letter-spacing: 1px;
  overflow-y:scroll;
}
.image-container{
  position: relative;
}
.imguploader {
  width: 90px;
  height: 90px;
  position: relative;
  z-index: 5;
  opacity: 0;
  cursor: pointer;
}
.cover-photo {
  width: 90px;
  height: 90px;
  position: absolute;
  border-radius:5px;
  top:0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #ce5050;
}
.cover-photo .photo {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.cover-photo .svg {
  border-radius: 50%;
}
::-webkit-file-upload-button {
  cursor:pointer;
}
.close {
  background: transparent;
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50%;
  position: absolute;
  top: 10px;
  right: 0;
  cursor: pointer;
}
select,input{
  font-family:Poppins;
  letter-spacing: 1px;
}

.submit {
  font-family: Montserrat;
  text-align: center;
  font-size: small;
  font-weight: 600;
  letter-spacing: 1px;
  margin: 10px auto;
  width: 140px;
  height: 40px;
  background: #ce5050;
  border: none;
  border-radius: 5px;
  outline: none;
  color: #ffffff;
  cursor: pointer;
}
.error {
  font-size: small;
  color: #ce5050;
}
/* Scrollbar styles
/* width */
::-webkit-scrollbar {
  background: transparent;
  width: 5px;
}
/* Track */
::-webkit-scrollbar-track {
  background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: transparent;
  border-radius: 10px;
} 
@media screen and (max-width:1170px) {
  .edit-form{
    width:50vw;
  }
  
}
@media screen and (max-width:970px) {
  .edit-form{
    width:55vw;
  }
  
}
@media screen and (max-width:870px) {
  .edit-form{
    width:65vw;
  }
  
}
@media screen and (max-width:670px) {
  .edit-form{
    width:85vw;
  }
  
}
</style>
