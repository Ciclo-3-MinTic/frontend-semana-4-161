<template>
  <div>
    <v-app id="inspire">
      <v-app id="sandbox">
        <v-navigation-drawer v-model="primaryDrawer.model" :clipped="true" app>
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
                            {{nombre}}
                          </v-list-item-title>
                          <v-list-item-subtitle>{{
                            rol
                          }}</v-list-item-subtitle>
                          <v-list-item-subtitle>{{
                            email
                          }}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-col>
                  </v-row>

                  <v-row align="center" justify="space-around">
                    <v-col cols="6">
                      <v-btn tile color="error" small @click="salir">
                        <v-icon left> mdi-keyboard-backspace </v-icon>
                        Salir
                      </v-btn>
                    </v-col>
                    <v-col cols="6">
                      <v-btn-toggle v-model="$vuetify.theme.dark" rounded small>
                        <v-btn small>
                          <v-icon>mdi-brightness-7</v-icon>
                        </v-btn>

                        <v-btn small>
                          <v-icon>mdi-brightness-4</v-icon>
                        </v-btn>
                      </v-btn-toggle>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>

              <v-list-item :to="{ name: 'Usuarios' }">
                <v-list-item-action>
                  <v-icon>mdi-table-account</v-icon>
                </v-list-item-action>
                <v-list-item-title> Usuarios </v-list-item-title>
              </v-list-item>
              <v-list-item :to="{ name: 'Articulos' }">
                <v-list-item-action>
                  <v-icon>mdi-file-table-box-multiple</v-icon>
                </v-list-item-action>
                <v-list-item-title> Articulos </v-list-item-title>
              </v-list-item>
              <v-list-item :to="{ name: 'Categotias' }">
                <v-list-item-action>
                  <v-icon>mdi-folder-table</v-icon>
                </v-list-item-action>
                <v-list-item-title> Categorias </v-list-item-title>
              </v-list-item>
            </template>
          </v-list>
        </v-navigation-drawer>

        <v-app-bar :clipped-left="true" app>
          <v-app-bar-nav-icon
            @click.stop="primaryDrawer.model = !primaryDrawer.model"
            :loading='isloading'
          ></v-app-bar-nav-icon>
          <v-toolbar-title>Vuetify</v-toolbar-title>
        </v-app-bar>

        <v-main col="12">
          <v-container col="12"
            ><!-- <v-row align="center" justify="center">
              <v-col cols="10"> </v-col>
            </v-row> -->
            <v-slide-y-transition>
              <router-view />
            </v-slide-y-transition>
          </v-container>
        </v-main>

        <v-footer app class="justify-center">
          <span class="px-4 text-center"
            >&copy; {{ new Date().getFullYear() }}</span
          >
        </v-footer>
      </v-app>
    </v-app>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HomeAdmin",

  data() {
    return {
      drawers: ["Default (no property)", "Permanent"],

      primaryDrawer: {
        model: null,
        type: "default (no property)",
      },
      rolUser:{},
      dataRoles: {},
      isloading: true,

      rol: "",
      nombre: "",
      email: "",
    };
  },
  created() {
    let user = this.$store.state.usuario;
    this.rol = user.rol;
    this.nombre = user.nombre;
    this.email = user.email;
    this.listarRoles();
  },
  methods: {
    salir() {
      this.$store.dispatch("salirAdmin");
    },

    ingresar() {
      this.estado = 0;
    },

    home() {
      this.estado = 1;
    },

    edituser(usuario) {},
    headerToken() {
      let header = { Token: this.$store.state.token };
      return { headers: header };
    },

    listarRoles() {
      let me = this;
      axios
        .get("usuario/listRoles", this.headerToken())
        .then(function (response) {
          me.derechos = response.data[me.rol];
          me.isloading = false;
          me.$store.dispatch("guardarDerechos", me.derechos)
          
        })
        .catch(function (error) {
          me.isloading = false;
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>