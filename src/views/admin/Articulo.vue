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
              <v-flex xs12 sm6 md6>
                <v-text-field v-model="codigo" label="Código"> </v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-select
                  v-model="categoria"
                  :items="categorias"
                  label="Categoría"
                >
                </v-select>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field v-model="nombre" label="Nombre"> </v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field type="number" v-model="stock" label="Stock">
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field v-model="precio_venta" label="precio_venta">
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field v-model="descripcion" label="Descripción">
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12 v-show="valida">
                <div
                  class="red--text"
                  v-for="v in validaMensaje"
                  :key="v"
                  v-text="v"
                ></div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1">Cancelar</v-btn>
          <v-btn color="blue darken-1">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <data-table-base
      :title="titles"
      :data="articulos"
      :headers="headers"
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
      title: "articulo",
      titles: "articulos",
      articulos: [
        {
          codigo: "1",
          nombre: "a",
          categoria_nombre: "aa",
          stock: 0,
          precio_venta: 1000,
          descripcion: "loren loren loren",
          estado: 0,
          opciones: 0,
        },
        {
          codigo: "2",
          nombre: "b",
          categoria_nombre: "bb",
          stock: 1,
          precio_venta: 200,
          descripcion: "loren loren loren",
          estado: 1,
          opciones: 1,
        },
        {
          codigo: "3",
          nombre: "c",
          categoria_nombre: "cc",
          stock: 40,
          precio_venta: 500,
          descripcion: "loren loren loren",
          estado: 0,
          opciones: 2,
        },
        {
          codigo: "4",
          nombre: "d",
          categoria_nombre: "dd",
          stock: 0,
          precio_venta: 100,
          descripcion: "loren loren loren",
          estado: 1,
          opciones: 3,
        },
        {
          codigo: "4",
          nombre: "d",
          categoria_nombre: "dd",
          stock: 0,
          precio_venta: 100,
          descripcion: "loren loren loren",
          estado: 1,
          opciones: 3,
        },
      ],
      headers: [
        { text: "Código", value: "codigo", sortable: true, align: "center" },
        { text: "Nombre", value: "nombre", sortable: true, align: "center" },
        {
          text: "Categoría",
          value: "categoria.nombre",
          sortable: true,
          align: "center",
        },
        { text: "Stock", value: "stock", sortable: true, align: "center" },
        {
          text: "Precio Venta",
          value: "precio_venta",
          sortable: true,
          align: "end",
        },
        {
          text: "Descripción",
          value: "descripcion",
          sortable: false,
          align: "center",
        },
        { text: "Estado", value: "estado", sortable: true, align: "center" },
        {
          text: "Opciones",
          value: "opciones",
          sortable: false,
          align: "center",
        },
      ],
      

      id: "",
      editedIndex: -1,
      categoria: "",
      categorias: [],
      codigo: "",
      nombre: "",
      stock: 0,
      precio_venta: 0,
      descripcion: "",
      valida: 0,
      validaMensaje: [],
      adModal: 0,
      adAccion: 0,
      adNombre: "",
      adId: "",
    };
  },
  computed: {
    formTitle() {
      /* return this.editedIndex === -1 ? "Nuevo registro" : "Editar registro"; */
    },
  },
  watch: {
    dialog(val) {
      /* val || this.close(); */
    },
  },
  created() {
    /* this.listar();
    this.selectCategoria(); */
  },
  methods: {
    editItem(item) {
      
     /*  this.categoria = item.categoria.id; */
      this.codigo = item.codigo;
      this.nombre = item.nombre;
      this.stock = item.stock;
      this.precio_venta = item.precio_venta;
      this.descripcion = item.descripcion;
      this.editedIndex = 1;
    },
    clearItem() {
      
     /*  this.categoria = item.categoria.id; */
      this.codigo = "";
      this.nombre = "";
      this.stock = "";
      this.precio_venta = "";
      this.descripcion = "";
      this.editedIndex = "";
    },
    activarDesactivarMostrar(accion, item) {
      this.adModal = 1;
      this.adNombre = item.nombre;
      this.adId = item.id;
      if (accion == 1) {
        this.adAccion = 1;
      } else if (accion == 2) {
        this.adAccion = 2;
      } else {
        this.adModal = 0;
      }
    },
    activarDesactivarCerrar() {
      this.adModal = 0;
    },

    closeInfo() {
      this.dialog = false;
    },
    openInfo(){
      this.dialog = true;
    },

    reroll() {
      console.log("reroll");
    },
    add() {
      this.clearItem();
      this.openInfo();
    },
    edit(item) {
      console.log(item);
      this.editItem(item);
      this.openInfo();
    },
    desactive(item) {
      console.log("desactive");
    },
    active(item) {
      console.log("active");
    },
  },
};
</script>
