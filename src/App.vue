<template>
  <v-app>
      <navegacaolateral/>
      <v-content>
          <router-view></router-view>
      </v-content>
  </v-app>
</template>

<script>
import Navegacao from './views/navegacao/Navegacao.vue'
import NavegacaoLateral from './views/navegacao/NavegacaoLateral.vue'
import Rodape from './views/navegacao/Rodape.vue'

export default {
    components: {
      'navegacao': Navegacao,
      'navegacaolateral': NavegacaoLateral,
      'rodape': Rodape
    },    
  }
</script>

<style>

</style>