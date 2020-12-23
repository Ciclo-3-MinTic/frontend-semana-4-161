import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import es from 'vuetify/lib/locale/es';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light: {
        primary: '#66BB6A',
        secondary: '#424242',
        text:'#000000',

        accent: '#82B1FF',
        error: '#FF5252',
        
        warning: '#FFC107',
        success: '#4CAF50',
        info: '#2196F3',

        while: '#ffffff'
      },
      Dark: {
        primary: '#66BB6A',
        secondary: '#424242',
        text:'#000000',
        
        accent: '#82B1FF',
        error: '#FF5252',
        
        warning: '#FFC107',
        success: '#4CAF50',
        info: '#2196F3',

        while: '#ffff'
      },
    },
  },
    lang: {
      locales: { es },
      current: 'es',
    },
});
