<template>
  <div class="product-form">
    <button type="button" @click="popupToggle" class="close">
      <img src="../../assets/Image/exiticon.svg" />
    </button>
    <h2>Fill up the form below</h2>
    <form @submit.prevent="handleSubmit">
      <input
        class="details"
        v-model="form.name"
        type="text"
        placeholder="Name of Product"
        required
      />
      <select class="details" @change="onChange($event)" name="Type" required>
        <option value="" disabled selected hidden
          >Choose type of Product</option
        >
        <option value="rooms">Rooms</option>
        <option value="vehicles">Vehicles</option>
        <option value="electronics">Electronics</option>
        <option value="houses">Houses</option>
      </select>
      <input
        class="details"
        v-model="form.address"
        type="text"
        placeholder="Address"
        required
      />
      <input
        class="details"
        v-model="form.price"
        type="text"
        placeholder="Price"
        required
      />
      <div
        class="details description"
        :html="form.description"
        @input="onDivInput($event)"
        contentEditable="true"
      >
        Description
      </div>
       <div class="image-container">
        <input
        class="imguploader"
        @change="imgChosen($event)"
        accept=".png,.jpeg,.jpg"
        type="file"
        required
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
      <button type="submit" class="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import { ref, reactive, computed } from "vue";
import { saveProduct } from "../../firebase/productCollection";
import router from "../../router/index";
import { resizeFile } from "../../helper";
export default {
  props: ["uid", "popupToggle"],
  setup(props) {
    const form = reactive({
      image: "",
      name: "",
      type: "",
      collectionPath: "",
      address: "",
      price: "",
      description: "",
      uid: computed(() => props.uid),
    });
    const errors = ref("");
    const onChange = (e) => {
      form.type = e.target.value;
      form.collectionPath = `/products/types/${form.type}`;
    };
    const imgChosen = async (event) => {
      if (event.target.files) {
        const image = event.target.files[0];
        const compressed_image = await resizeFile(image);
        form.image = compressed_image;
      }
    };
    const onDivInput = (e) => {
      form.description = e.target.innerText;
    };
    const handleSubmit = async () => {
      errors.value = await saveProduct(form);
      if (errors.value.length === 0) {
        router.go();
      }
      console.log(errors.value.length);
    };
    return { form, onChange, imgChosen, handleSubmit, onDivInput, errors };
  },
};
</script>

<style scoped>
.product-form {
  width: 40vw;
  position: relative;
  display: flex;
  overflow-y:scroll;
  flex-direction: column;
  align-items: center;
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
  margin-top: 20px;
  width: 75%;
  display: flex;
  flex-direction: column;
}
.details {
  border: none;
  outline: none;
  background: transparent;
  border-bottom: 1px solid #ce5050;
  margin-bottom: 25px;
  padding: 10px 15px;
  color: #ffffff;
  font-size: 15px;
}
select option {
  background: #ce5050;
  font-family: Poppins;
}
::placeholder {
  color: #ffffff;
}
.description {
  height: 100px;
  font-family: Poppins;
  letter-spacing: 1px;
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
/* Scrollbar styles */
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
  .product-form{
    width:50vw;
  }
  
}
@media screen and (max-width:970px) {
  .product-form{
    width:55vw;
  }
  
}
@media screen and (max-width:870px) {
  .product-form{
    width:65vw;
  }
  
}
@media screen and (max-width:670px) {
  .product-form{
    width:85vw;
  }
  
}
</style>
