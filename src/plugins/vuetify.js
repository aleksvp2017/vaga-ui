// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)


import ptbr from '../vuetify/locale/ptbr'

const opts = {
    lang: {
        locales: {
            ptbr
        },
        current: 'ptbr'
      }
}



export default new Vuetify(opts)