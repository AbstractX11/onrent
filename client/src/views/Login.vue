<template>
    <logo></logo>
    <main>
        <log-in></log-in>
        <img src="../assets/Image/login.svg">
    </main>
</template>

<script>
import logIn from "../components/logIn.vue"
import logo from "../components/logo.vue"
export default {
    components:{logIn,logo}
}
</script>

<style scoped>
    main{
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }
</style>