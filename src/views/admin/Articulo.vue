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
              <v-flex xs12 sm4 md3>
                <v-select
                  v-model="categoria"
                  :items="dataCategorias"
                  label="tipo de articulos"
                  :hint="`${categoria.id} : ${categoria.nombre}`"
                  item-text="nombre"
                  item-value="id"
                  persistent-hint
                  return-object
                  single-line
                  :loading="loadingCategorias"
                >
                </v-select>
              </v-flex>
              <v-flex xs8 sm6 md6>
                <v-text-field v-model="nombre" label="Nombre"> </v-text-field>
              </v-flex>
              <v-flex xs4 sm2 md3>
                <v-text-field v-model="codigo" label="codigo"> </v-text-field>
              </v-flex>

              <v-flex xs8>
                <v-text-field
                  type="number"
                  v-model="precio_venta"
                  label="precio"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-text-field type="number" v-model="stock" label="Stock">
                </v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  v-model="descripcion"
                  outlined
                  rows="3"
                  auto-grow
                  label="descripcion"
                >
                </v-textarea>
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
      :data="dataArticulos"
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
      dialog: false,
      typeDialog: 0, //add=0, edit=1;

      dialogAlert: false,
      textDialogAler: "",
      coloAlert: "",
      timeout: 2000,

      derechos: {},
      isloading: true,
      loadingCategorias: true,

      title: "Articulo",
      titles: "Articulos",
      dataArticulos: [],
      dataCategorias: [],
      articulos: [],
      tipo_documentos: [],
      headers: [
        { text: "Código", value: "codigo", sortable: true, align: "center" },
        { text: "Nombre", value: "nombre", sortable: true, align: "center" },
        {
          text: "articulo",
          value: "categoria.nombre",
          sortable: true,
          align: "center",
        },
        {
          text: "Descripcion",
          value: "descripcion",
          sortable: false,
          align: "center",
        },
        {
          text: "Precio",
          value: "precio_venta",
          sortable: true,
          align: "center",
        },
        {
          text: "Stock",
          value: "stock",
          sortable: true,
          align: "center",
        },
        {
          text: "Estado",
          value: "estado",
          sortable: true,
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

      categoria: {},

      id: "",
      categoriaId: "",
      nombre: "",
      codigo: "",
      precio_venta: "",
      stock: "",
      descripcion: "",
      estado: 0,
    };
  },

  created() {
    this.listar();
    this.derechos = this.$store.state.derechos.articulos;
  },
  methods: {
    editItem(item) {
      (this.categoria = item.categoria),
        (this.id = item.id),
        (this.categoriaId = item.categoriaId),
        (this.nombre = item.nombre),
        (this.codigo = item.codigo),
        (this.precio_venta = item.precio_venta),
        (this.stock = item.stock),
        (this.descripcion = item.descripcion),
        (this.estado = item.estado);
    },
    clearItem() {
      (this.categoria = ""),
        (this.id = ""),
        (this.categoriaId = ""),
        (this.nombre = ""),
        (this.codigo = ""),
        (this.precio_venta = ""),
        (this.stock = ""),
        (this.descripcion = ""),
        (this.estado = "");
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
      this.deactivateArticulo(item);
    },
    active(item) {
      this.isloading = true;
      this.activateArticulo(item);
    },
    //----fin metodos data table base

    //-- inicio dialogos
    openDialog() {
      this.dialog = true;
      this.loadingCategorias = true;
      this.listar_categorias();
    },
    closeDialog() {
      this.clearItem();
      this.dialog = false;
      this.typeDialog = 0;
    },

    openDialogResponse(type, mensaje) {
      this.reroll();

      this.closeDialog();
      this.isloading = false;
      console.log(mensaje);
    },
    //-- fin dialogos

    //---inicio validaciones
    validar() {
      this.valida = 0;

      if (this.nombre.length < 1 || this.nombre.length > 50) {
        // nombre muy corto o muy largo
      }

      if (this.descripcion < 1) {
        // telefono muy corto
      }
      return this.valida;
    },

    //-- fin validaciones

    dialogAcepter() {
      console.log(this.categoria);

      if (this.validar) {
        if (this.typeDialog) {
          this.updateArticulo({
            id: this.id,
            categoriaId: this.categoria.id,
            nombre: this.nombre,
            codigo: this.codigo,
            precio_venta: this.precio_venta,
            stock: this.stock,
            descripcion: this.descripcion,
            estado: this.estado,
          });
        } else {
          this.newArticulo({
            categoriaId: this.categoria.id,
            nombre: this.nombre,
            codigo: this.codigo,
            precio_venta: this.precio_venta,
            stock: this.stock,
            descripcion: this.descripcion,
            estado: this.estado,
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
        .get("articulo/list", this.headerToken())
        .then(function (response) {
          me.dataArticulos = response.data;
          me.isloading = false;
        })
        .catch(function (error) {
          me.isloading = false;
          console.log(error);
        });
    },
    listar_categorias() {
      let me = this;
      axios
        .get("categoria/list", this.headerToken())
        .then(function (response) {
          me.dataCategorias = response.data;
          me.loadingCategorias = false;
        })
        .catch(function (error) {
          me.loadingCategorias = false;
          console.log(error);
        });
    },

    newArticulo(articulo) {
      let me = this;
      axios
        .post("articulo/add", articulo, this.headerToken())
        .then(function (response) {
          me.openDialogResponse(1, "nuevo articulo creado");
        })
        .catch(function (error) {
          me.openDialogResponse(0, "no se puede crear usuaro");
          console.log(error);
        });
    },
    updateArticulo(articulo) {
      let me = this;
      axios
        .put("articulo/update", articulo, this.headerToken())
        .then(function (response) {
          me.openDialogResponse(1, "articulo actualizado");
        })
        .catch(function (error) {
          me.openDialogResponse(0, "no se puede actualizar usuaro");
          console.log(error);
        });
    },

    activateArticulo(articulo) {
      let me = this;
      axios
        .put("articulo/activate", { id: articulo.id }, this.headerToken())
        .then(function (response) {
          me.openDialogResponse(1, "articulo activado");
        })
        .catch(function (error) {
          me.openDialogResponse(0, "no se puede activar articulo");
        });
    },
    deactivateArticulo(articulo) {
      let me = this;
      axios
        .put("articulo/deactivate", { id: articulo.id }, this.headerToken())
        .then(function (response) {
          me.openDialogResponse(1, "articulo activado");
        })
        .catch(function (error) {
          me.openDialogResponse(0, "no se puede activar articulo");
        });
    },

    //--- fin accions hacia la api--
  },
};
</script>

<style>
</style>