<template>
  <div class="product-form">
    <button type="button" @click="popupToggle" class="close"><img src="../assets/Image/exiticon.svg"></button>
    <h2>Wanna rent your products? Fill up the form below!!</h2>
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
      <input
        class="imguploader"
        @change="imgChosen($event)"
        accept=".png,.jpeg,.jpg"
        type="file"
        required
      />
      <br/><p class="error" v-if="errors">
        {{errors}}
      </p>
      <button type="submit" class="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import { ref,reactive, computed } from "vue";
import { saveProduct } from "../firebase/productCollection";
import router from "../router/index";
export default {
  props: ["uid","popupToggle"],
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
    const errors = ref('')
    const onChange = (e) => {
      form.type = e.target.value;
      form.collectionPath = `/products/types/${form.type}`;
    };
    const imgChosen = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        form.image = reader.result;
      };
      reader.readAsDataURL(file);
    };
    const onDivInput = (e) => {
      form.description = e.target.innerText;
    };
    const handleSubmit = async() => {
      errors.value = await saveProduct(form);
      if (errors.value.length===0){
        router.go()
      }
      console.log(errors.value.length)
    };
    return { form, onChange, imgChosen, handleSubmit, onDivInput ,errors};
  },
};
</script>

<style scoped>
.product-form{
    position: relative;
    display: flex;
    flex-direction:column;
    align-items: center;
}
h2 {
    margin-top:40px;
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    color: #ce5050;
    margin-bottom: 0;
}
form {
  margin-top: 20px;
  width: 75%;
  font-family: poppins;
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
}
.imguploader {
  width: 400px;
  font-family: Poppins;
  background: white;
  border-radius: 50px;
  box-shadow: 5px 5px 10px black;
  outline: none;
}
::-webkit-file-upload-button {
  font-family: Poppins;
  color: white;
  background: #ce5050;
  outline: none;
  border: none;
  padding: 10px;
  border-radius: 50px;
  box-shadow: 1px 0 1px 1px #6b4559;
}
.close{
    background: transparent;
    width:30px;
    height:30px;
    border:none;
    border-radius:50%;
    position: absolute;
    top:0;
    right:0;
    cursor: pointer;
}

.submit{
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
.error{
  font-size:small;
  color: #ce5050;
}
</style>
