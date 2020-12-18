<template>
  <div>
    <h1>admin</h1>
    <v-app id="inspire">
      <v-app id="sandbox">
        <v-navigation-drawer
          v-model="primaryDrawer.model"
          :clipped="true"
                   
          app
          overflow
        ></v-navigation-drawer>

        <v-app-bar :clipped-left="true" app>
          <v-app-bar-nav-icon
            
            @click.stop="primaryDrawer.model = !primaryDrawer.model"
          ></v-app-bar-nav-icon>
          <v-toolbar-title>Vuetify</v-toolbar-title>
        </v-app-bar>

        <v-main>
          <v-container fluid>
            <v-row align="center" justify="center">
              <v-col cols="10">
                <v-card>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12" md="6">
                        <span>Scheme</span>
                        <v-switch
                          v-model="$vuetify.theme.dark"
                          primary
                          label="Dark"
                        ></v-switch>
                      </v-col>
                      <v-col cols="12" md="6">
                        
                        
                        
                      </v-col>
                      <v-col cols="12" md="6">
                        <span>Footer</span>
                       
                      </v-col>
                    </v-row>
                  </v-card-text>
                  
                </v-card>
              </v-col>
            </v-row>
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
  /* vuetify: new Vuetify(), */
  data() {
    return {
      drawers: ["Default (no property)", "Permanent"],
      primaryDrawer: {
        model: null,
        type: "default (no property)",
        
        
      },
    };
  },
};
</script>

<style>
</style>