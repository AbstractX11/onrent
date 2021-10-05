<template>
  <div class="navlinks">
    <router-link style="text-decoration: none" :to="{ name: 'Rooms' }"
      ><p>Rooms</p></router-link
    >
    <router-link style="text-decoration: none" :to="{ name: 'Vehicles' }"
      ><p>Vehicles</p></router-link
    >
    <router-link style="text-decoration: none" :to="{ name: 'Electronics' }"
      ><p>Electronics</p></router-link
    >
    <router-link style="text-decoration: none" :to="{ name: 'Houses' }"
      ><p>Houses</p></router-link
    >
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.navlinks{
  min-width: 400px;
  position: static;
  display: flex;
  margin-right:100px;
  align-items: center;
  justify-content: space-between;
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 36px;
}
a{
    color:white;
}
.navlinks .router-link-active {
  border-bottom: 4px solid #ce5050;
}</style>
