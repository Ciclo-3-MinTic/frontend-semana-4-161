<template>
  <v-layout align-start d-block flex-column block>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title>
          <span class="headline">{{ title }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs4 sm3 md2>
                <v-select v-model="rol" :items="roles" label="Rol"> </v-select>
              </v-flex>
              <v-flex xs8 sm4 md5>
                <v-text-field v-model="nombre" label="Nombre"> </v-text-field>
              </v-flex>
              <v-flex xs12 sm5 md5>
                <v-text-field type="email" v-model="email" label="email">
                </v-text-field>
              </v-flex>
              <v-flex xs5 sm4 md3>
                <v-select
                  v-model="tipo_documento"
                  :items="tipo_documentos"
                  label="tipo de num_documento"
                >
                </v-select>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-text-field
                  v-model="num_documento"
                  label="num_documento"
                  type="number"
                >
                </v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md6>
                <v-text-field type="number" v-model="telefono" label="telefono">
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field
                  v-model="direccion"
                  label="direccion"
                  type="direccion"
                >
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" @click="dialog = false">Cancelar</v-btn>
          <v-btn color="blue darken-1" @click="dialogAcepter">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogpass">
      <v-card>
        <v-card-title>
          <span class="headline">{{ title }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md6>
                <v-text-field
                  type="password"
                  v-model="password"
                  label="password"
                >
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" @click="dialogpass = false"
            >Cancelar</v-btn
          >
          <v-btn color="blue darken-1" @click="dialogPasswordAcepter"
            >Guardar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="dialogAlert"
      :timeout="timeout"
      center
      shaped
      bottom
      right
      transition="slide-y-reverse-transition"
      :color="coloAlert"
    >
      <div class="text-center title text">
        {{ textDialogAler }}
      </div>

      <template v-slot:action="{ attrs }">
        <v-btn
          small
          icon
          class="elevation-0"
          v-bind="attrs"
          @click="snackbar = dialogAlert"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>

    <data-table-base
      :title="titles"
      :data="dataUsers"
      :headers="headers"
      :isloading="isloading"
      :derechos="derechos"
      @reroll="reroll"
      @add="add"
      @edit="edit"
      @desactive="desactive"
      @active="active"
    >
    </data-table-base>
  </v-layout>
</template>

<script>
import axios from "axios";
import DataTableBase from "@/components/DataTableBase.vue";
export default {
  components: {
    DataTableBase,
  },

  data() {
    return {
      dialogpass: false,

      dialog: false,
      typeDialog: 0, //add=0, edit=1;

      dialogAlert: false,
      textDialogAler: "",
      coloAlert: "",
      timeout: 2000,

      derechos: {},
      isloading: true,

      title: "Usuario",
      titles: "Usuarios",
      dataUsers: [],
      roles: [],
      tipo_documentos: [],
      headers: [
        { text: "Código", value: "id", sortable: true, align: "center" },
        { text: "Nombre", value: "nombre", sortable: true, align: "center" },
        {
          text: "Rol",
          value: "rol",
          sortable: true,
          align: "center",
        },
        { text: "Email", value: "email", sortable: true, align: "center" },

        {
          text: "num_documento",
          value: "num_documento",
          sortable: false,
          align: "center",
        },
        {
          text: "Direccion",
          value: "direccion",
          sortable: false,
          align: "center",
        },
        {
          text: "Telefono",
          value: "telefono",
          sortable: false,
          align: "center",
        },
        {
          text: "Estado",
          value: "estado",
          sortable: false,
          align: "center",
        },
        {
          text: "Opciones",
          value: "opciones",
          sortable: false,
          align: "center",
        },
      ],

      valida: 0,
      id: "",
      nombre: "",
      rol: "",
      email: "",
      num_documento: "",
      direccion: "",
      telefono: "",
      password: "",
      tipo_documento: "",
    };
  },

  created() {
    this.listar();
    this.derechos = this.$store.state.derechos.usuarios;
  /*   console.log(new Date('2020-12-22').toISOString().substr(0, 10));
    console.log(new Date('2020-12-22')-Date.now()); */
  },
  methods: {
    editItem(item) {
      this.id = item.id;
      (this.nombre = item.nombre),
        (this.rol = item.rol),
        (this.email = item.email),
        (this.num_documento = item.num_documento),
        (this.direccion = item.direccion),
        (this.telefono = item.telefono),
        (this.tipo_documento = item.tipo_documento);
    },
    clearItem() {
      this.id = "";
      (this.nombre = ""),
        (this.rol = ""),
        (this.email = ""),
        (this.num_documento = ""),
        (this.direccion = ""),
        (this.telefono = ""),
        (this.tipo_documento = "");
    },
    ///----inicio metodos de data table base
    reroll() {
      this.isloading = true;

      this.listar();
    },
    add() {
      this.typeDialog = 0;
      this.clearItem();
      this.openDialog();
    },
    edit(item) {
      this.typeDialog = 1;
      this.editItem(item);
      this.openDialog();
    },
    desactive(item) {
      this.isloading = true;
      this.deactivateUsuario(item);
    },
    active(item) {
      this.isloading = true;
      this.activateUsuario(item);
    },

    
    //----fin metodos data table base

    //-- inicio dialogos
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.clearItem();
      this.dialog = false;
      this.typeDialog = 0;
    },

    openDialogPassword() {
      this.dialogpass = true;
    },
    closeDialogPass() {
      this.dialogpass = false;
      this.password = "";
    },
    openDialogResponse(type, mensaje) {
      this.reroll();

      this.closeDialog();
      this.closeDialogPass();
      this.isloading = false;
      console.log(mensaje);
    },
    //-- fin dialogos

    //---inicio validaciones
    validar() {
      this.valida = 0;

      if (!this.rol) {
        //falta de rol
      }
      if (!this.tipo_documento) {
        //falta de rol
      }

      if (this.nombre.length < 1 || this.nombre.length > 50) {
        // nombre muy corto o muy largo
      }
      if (this.email.length < 1) {
        // email muy corto
      }
      if (this.num_documento < 1) {
        // num_documento muy corto
      }
      if (this.telefono < 1) {
        // telefono muy corto
      }
      return this.valida;
    },
    validarPass() {
      return this.password.length > 6;
    },
    isEmailUser(email) {
      return this.dataUsers.find((user) => user.email === email);
    },
    isDocumentoUser(documento) {
      return this.dataUsers.find((user) => user.num_documento === documento);
    },
    //-- fin validaciones

    dialogAcepter() {
      if (this.validar) {
        if (this.typeDialog) {
          this.openDialogPassword();
        } else {
          //add
          if (this.isEmailUser(this.email)) {
            this.openDialogResponse(0, "email ya usado");
          } else if (this.isDocumentoUser(this.num_documento)) {
            this.openDialogResponse(0, "numero documento ya usado");
          } else {
            this.openDialogPassword();
          }
        }
      }
    },
    dialogPasswordAcepter() {
      if (this.typeDialog) {
        //edit
        if (this.validarPass) {
          this.updateUsuario({
            id: this.id,
            rol: this.rol,
            nombre: this.nombre,
            password: this.password,
            tipo_documento: this.tipo_documento,
            num_documento: this.num_documento,
            direccion: this.direccion,
            telefono: this.telefono,
          });
        } else {
          this.updateUsuario({
            id: this.id,
            rol: this.rol,
            nombre: this.nombre,
            tipo_documento: this.tipo_documento,
            num_documento: this.num_documento,
            direccion: this.direccion,
            telefono: this.telefono,
          });
        }
      } else {
        //add
        if (this.validarPass) {
          this.newUsuario({
            rol: this.rol,
            nombre: this.nombre,
            password: this.password,
            email: this.email,
            tipo_documento: this.tipo_documento,
            num_documento: this.num_documento,
            direccion: this.direccion,
            telefono: this.telefono,
            estado: 0,
          });
        }
      }
    },

    //--- accions hacia la api--
    headerToken() {
      let header = { Token: this.$store.state.token };
      return { headers: header };
    },

    listar() {
      let me = this;
      axios
        .get("usuario/list", this.headerToken())
        .then(function (response) {
          me.dataUsers = response.data;
          me.isloading = false;
        })
        .catch(function (error) {
          me.isloading = false;
          console.log(error);
        });
    },

    newUsuario(usuario) {
      let me = this;
      axios
        .post("usuario/add", usuario, this.headerToken())
        .then(function (response) {
          me.openDialogResponse(1, "nuevo usuario creado");
        })
        .catch(function (error) {
          me.openDialogResponse(0, "no se puede crear usuaro");
          console.log(error);
        });
    },
    updateUsuario(usuario) {
      let me = this;
      axios
        .put("usuario/update", usuario, this.headerToken())
        .then(function (response) {
          me.openDialogResponse(1, "usuario actualizado");
        })
        .catch(function (error) {
          me.openDialogResponse(0, "no se puede actualizar usuaro");
          console.log(error);
        });
    },

    activateUsuario(usuario) {
      let me = this;
      axios
        .put("usuario/activate", { id: usuario.id }, this.headerToken())
        .then(function (response) {
          me.openDialogResponse(1, "usuario activado");
        })
        .catch(function (error) {
          me.openDialogResponse(0, "no se puede activar usuario");
        });
    },
    deactivateUsuario(usuario) {
      let me = this;
      axios
        .put("usuario/deactivate", { id: usuario.id }, this.headerToken())
        .then(function (response) {
          me.openDialogResponse(1, "usuario activado");
        })
        .catch(function (error) {
          me.openDialogResponse(0, "no se puede activar usuario");
        });
    },

    //--- fin accions hacia la api--
  },
};
</script>

<style>
</style>