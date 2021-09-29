<template>
  <div class="section-card">
    {{product.Name}}
    {{product.Address}}
    {{product.Description}}
    {{product.Price}}
    {{product.sellerid}}
  </div>
</template>

<script>
export default{
    props:['product'],
    setup(props){
        console.log(props.product)
    }
    
}

</script>

<style scoped>
    .section-card{
        background: white;
        margin:10px;
    }
</style>