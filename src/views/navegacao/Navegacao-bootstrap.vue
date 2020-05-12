<template>
<div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand to="/"><img src="../assets/home.png" width="25px" height="25px"/></b-navbar-brand>
    <b-navbar-brand to="/entrar" v-show="!loggedIn">Entrar</b-navbar-brand>
    <b-navbar-brand to="/home" v-show="loggedIn">Notícias</b-navbar-brand>
    <b-button v-show="loggedIn" @click="logout" variant="light">Logout</b-button>
  </b-navbar>
</div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        computed: {
            ...
            mapGetters(['loggedIn'])
        },
        methods: {
            logout(){
                this.$store.dispatch('ActionLogout')
            }
        }
    }
</script>

<style scoped>

</style>