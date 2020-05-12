<template>
  <v-app>
    <navegacao/>
    <v-content>
      <router-view></router-view>
    </v-content>
    <rodape/>
  </v-app>
</template>

<script>
import Navegacao from './views/navegacao/Navegacao.vue'
import Rodape from './views/navegacao/Rodape.vue'

export default {
    components: {
      'navegacao': Navegacao,
      'rodape': Rodape
    },    
  }
</script>

<style>

</style>