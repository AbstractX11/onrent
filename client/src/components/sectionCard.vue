<template>
  <div class="section-card">
    <div v-if="product.sellerid === uid" class="edit">
      <img src="../assets/Image/edit.svg">
    </div>
    <div class="img">
        <img :src="product.Image"/>
    </div>
    <main style="width:50%;">
      <div id="name-add">
        <div id="name">{{ product.Name }}</div>
        <div id="address">{{ product.Address }}</div>
      </div>
      <p>PRICE</p>
      <div id="price">Rs {{ product.Price }}</div>
      <p class="description">Description</p>
      <div id="description">{{ product.Description }}</div>
      <button>Rent Now</button>
    </main>
  </div>
</template>

<script>
export default {
  props: ["product","uid"],
};
</script>

<style scoped>
.section-card {
  width:1000px;
  height:400px;
  font-family: Poppins;
  background: linear-gradient(
    to top right,
    rgba(1, 1, 1, 0.7),
    rgba(1, 1, 1, 0.4)
  );
  margin: 10px;
  padding: 15px;
  border-radius: 5px;
  display: flex;
  align-items:top;
  position: relative;
}
.edit{
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right:0;
  top:0;
  margin:10px;
  padding:5px;
  background: #ce5050;
  border-radius:5px;
}
.img{
    width:50%;
    border-radius: 5px;
    background: white;
    margin:-15px;
    margin-right:10px;
    overflow: hidden;
}
.img img{
    width:100%;
    height:100%;
    object-fit: cover;
}
#name-add {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 25px;

}
#name {
  text-transform: uppercase;
  font-size:30px;
  font-weight: bold;
  color: #ce5050;
}
#address {
  font-size: medium;
  margin-top:-5px;
  font-weight: bold;
  color: rgba(144, 142, 142, 0.7);
}
#price {
  font-weight: bold;
  font-size: 30px;
  color: white;
  margin-bottom: 25px;
}
#description {
  padding: 15px 5px;
  font-size: small;
  color: rgba(214, 115, 115, 0.7);
}
p{
  font-size: small;
  font-weight:bold;
  text-transform: uppercase;
  color: rgba(144, 142, 142, 0.7);
}
.description{
  padding:5px;
  border-bottom:1px solid rgba(144, 142, 142, 0.3);
}
button {
  border: none;
  outline: none;
  cursor: pointer;
  margin: 10px auto;
  font-weight: bold;
  text-transform: uppercase;
  width: 140px;
  border-radius: 50px;
  height: 40px;
  background: #ce5050;
  color: #ffffff;
  position: absolute;
  bottom:10px;
}
</style>
