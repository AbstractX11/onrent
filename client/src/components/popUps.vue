<template>
  <div class="popup">
    <div class="popup-inner">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: ["togglepopUp"],
};
</script>

<style scoped>
.popup {
  font-family: Poppins;
  position: fixed;
  top: 0;
  left: 0;
  right: 0; 
  min-height:100vh;
  background: rgba(151, 145, 145, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index:10;
}
.popup-inner {
  background: rgba(44, 44, 44, 1);
  padding: 10px;
  border-radius: 5px;
}
</style>
