<template>
  <div class="section-card">
    <div class="img">
        <img :src="product.Image"/>
    </div>
    <main style="width:75%;">
      <div id="name-add">
        <div id="name">{{ product.Name }}</div>
        <div id="address">{{ product.Address }}</div>
      </div>
      <div id="price">Rs {{ product.Price }}</div>
      <div id="description">{{ product.Description }}</div>
    </main>
  </div>
</template>

<script>
export default {
  props: ["product"],
};
</script>

<style scoped>
.section-card {
  width:1000px;
  height:200px;
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
}
.img{
    width:25%;
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
  align-items: center;
}
#name {
  text-transform: uppercase;
  font-weight: bold;
  color: #ce5050;
}
#address {
  font-size: small;
  font-weight: bold;
  margin-left: 10px;
  color: rgba(255, 255, 255, 0.7);
}
#price {
  font-weight: bold;
  font-size: medium;
  color: white;
}
#description {
  font-size: small;
  color: rgba(214, 115, 115, 0.7);
}
</style>
