<template>
  <div class="edit-form">
    <button type="button" @click="popupToggle" class="close">
      <img src="../../assets/Image/exiticon.svg" />
    </button>
    <h2>Edit Details of your product</h2>
    <form @submit.prevent="handleSubmit">
      <input
        class="details"
        v-model="form.name"
        type="text"
        placeholder="Name of Product"
        required
      />
      <div class="details" title="Type cannot be edited">{{ form.type }}</div>
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
        {{ form.description }}
      </div>
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
import { useRoute } from "vue-router";
export default {
  props: ["uid", "productdata", "popupToggle"],
  setup(props) {
    const product = props.productdata;
    const route = useRoute();
    const form = reactive({
      image: product.Image,
      name: product.Name,
      type: route.name.toLowerCase(),
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
  overflow-y: scroll;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
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
h2 {
  margin-top: 5px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  color: #ce5050;
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
select,
input {
  font-family: Poppins;
  letter-spacing: 1px;
}
.image-container {
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
  border-radius: 5px;
  top: 0;
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
  cursor: pointer;
}
.close {
  background: transparent;
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50%;
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
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
@media screen and (max-width: 1170px) {
  .edit-form {
    width: 50vw;
  }
}
@media screen and (max-width: 970px) {
  .edit-form {
    width: 55vw;
  }
}
@media screen and (max-width: 870px) {
  .edit-form {
    width: 65vw;
  }
}
@media screen and (max-width: 670px) {
  .edit-form {
    width: 85vw;
  }
}
</style>
