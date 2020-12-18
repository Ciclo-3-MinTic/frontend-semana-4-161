<template>
  <div>
    
    <v-app id="inspire">
      <v-app id="sandbox">
        <v-navigation-drawer
          v-model="primaryDrawer.model"
          
          app
         
        >
          <v-list dense class="py-0">
            <template> 
              <v-card align="center ">
                <v-card-text class="pb-0 pt-7">
                  <v-row align="center" justify="space-around">
                    <v-col align-self="start" class="pa-0" cols="2">
                      <v-avatar color="orange ml-3" size="62">
                        <span class="white--text headline">A</span>
                      </v-avatar>
                    </v-col>
                    <v-col class="py-0" cols="10">
                      <v-list-item>
                        <v-list-item-content class="text-right">
                          <v-list-item-title class="title">
                            rol
                          </v-list-item-title>
                          <v-list-item-subtitle>Name</v-list-item-subtitle>
                          <v-list-item-subtitle>Email</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-col>
                  </v-row>

                  <v-row align="center" justify="space-around">
                    <v-col cols="6">
                      <v-btn tile color="error" small>
                        <v-icon left> mdi-keyboard-backspace </v-icon>
                        Salir
                      </v-btn>
                    </v-col>
                    <v-col cols="6">
                      <v-btn-toggle v-model="$vuetify.theme.dark" rounded small>
                        <v-btn small>
                          <v-icon>mdi-brightness-5</v-icon>
                        </v-btn>

                        <v-btn small>
                          <v-icon>mdi-brightness-4</v-icon>
                        </v-btn>
                      </v-btn-toggle>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
              <v-list-item @click="home">
                <v-list-item-action>
                  <v-icon>home</v-icon>
                </v-list-item-action>
                <v-list-item-title> Inicio </v-list-item-title>
              </v-list-item>
            </template>
            <template>
              <v-list-group>
                <v-list-item slot="activator">
                  <v-list-item-content>
                    <v-list-item-title> Almacén </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item :to="{ name: 'adminLoginAdmin' }">
                  <v-list-item-action>
                    <v-icon>table_chart</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title> Categorías </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item :to="{ name: 'adminLoginAdmin' }">
                  <v-list-item-action>
                    <v-icon>table_chart</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title> Artículos </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
            </template>
          </v-list>
        </v-navigation-drawer>

        <v-app-bar :clipped-left="false" app>
          <v-app-bar-nav-icon
            @click.stop="primaryDrawer.model = !primaryDrawer.model"
          ></v-app-bar-nav-icon>
          <v-toolbar-title>Vuetify</v-toolbar-title>
        </v-app-bar>

        <v-main col="12">
        
            <v-container  col="12"
              ><!-- <v-row align="center" justify="center">
              <v-col cols="10"> </v-col>
            </v-row> -->
              <v-slide-y-transition >
                <router-view/>
              </v-slide-y-transition>
            </v-container>
          
        </v-main>

        <v-footer app>
          <span class="px-4">&copy; {{ new Date().getFullYear() }}</span>
        </v-footer>
      </v-app>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "HomeAdmin",

  data() {
    return {
      drawers: ["Default (no property)", "Permanent"],
      primaryDrawer: {
        model: null,
        type: "default (no property)",
      },
    };
  },

  computed: {
    logueado() {
      /* return this.$store.state.usuario; */
      return null;
    },
  },
  methods: {
    salir() {
      /* this.$store.dispatch("salir"); */
      this.estado = 1;
    },

    ingresar() {
      this.estado = 0;
    },

    home() {
      this.estado = 1;
    },
  },
  created() {
    /* this.$store.dispatch("autoLogin"); */
  },
};
</script>

<style>
</style>