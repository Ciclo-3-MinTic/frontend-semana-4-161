<template>
  <div id="app">
    <v-app id="inspire">
      <v-app id="inspire">
        <v-main>
          <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
              <v-col cols="12" sm="8" md="4">
                <v-card class="elevation-12">
                  <v-toolbar color="primary" dark flat>
                    <v-toolbar-title>Login</v-toolbar-title>

                    <v-speed-dial absolute top right direction="left">
                      <template v-slot:activator>
                        <v-btn v-model="fab" color="info " fab>
                          <v-icon v-if="fab"> mdi-close </v-icon>
                          <v-icon v-else> mdi-account-circle </v-icon>
                        </v-btn>
                      </template>
                      <v-btn
                        fab
                        dark
                        small
                        color="secondary"
                        @click="
                          (user = 'admin@gmail.com'), (password = 'admin1234')
                        "
                      >
                        <v-icon>mdi-account-cog</v-icon>
                      </v-btn>
                      <v-btn
                        fab
                        dark
                        small
                        color="accent"
                        @click="
                          (user = 'almacenero@gmail.com'), (password = 'almacenero1234')
                        "
                      >
                        <v-icon>mdi-account-hard-hat</v-icon>
                      </v-btn>
                      <v-btn
                        fab
                        dark
                        small
                        color="success"
                        @click="
                          (user = 'vendedor@gmail.com'), (password = 'vendedor1234')
                        "
                      >
                        <v-icon>mdi-account-cash</v-icon>
                      </v-btn>
                      <v-btn
                        fab
                        dark
                        small
                        color="error"
                        @click="(user = ''), (password = '')"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-speed-dial>
                  </v-toolbar>
                  <v-card-text>
                    <v-form>
                      <v-text-field
                        label="Email"
                        name="login"
                        prepend-icon="mdi-account"
                        type="text"
                        v-model="user"
                      ></v-text-field>

                      <v-text-field
                        id="password"
                        label="Password"
                        name="password"
                        prepend-icon="mdi-lock"
                        type="password"
                        v-model="password"
                      ></v-text-field>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary"
                      @click="$emit('login', user, password)"
                      >Login</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-main>
      </v-app>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "LoginBase",

  data() {
    return {
      user: "admin@gmail.com",
      password: "admin1234",
      fab: false,
    };
  },
};
</script>

<style>
</style>