<template>
  <v-layout align-start>
    <data-table-base
      :title="title"
      :dialog="dialog"
      :articulos="articulos"
      :headers="headers"
    >
    </data-table-base>
  </v-layout>
</template>
<script>
import axios from "axios";
import DataTableBase from "../components/DataTableBase.vue";
export default {
  components: {
    DataTableBase,
  },
  data() {
    return {
      title: "articulos",
      dialog: false,
      search: "",
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
          codigo: "5",
          nombre: "e",
          categoria_nombre: "ee",
          stock: 10,
          precio_venta: 25000,
          descripcion: "loren loren loren",
          estado: 1,
          opciones: true,
        },
        {
          codigo: "5",
          nombre: "e",
          categoria_nombre: "ee",
          stock: 10,
          precio_venta: 25000,
          descripcion: "loren loren loren",
          estado: 1,
          opciones: true,
        },
        {
          codigo: "5",
          nombre: "e",
          categoria_nombre: "ee",
          stock: 10,
          precio_venta: 25000,
          descripcion: "loren loren loren",
          estado: 1,
          opciones: true,
        },
      ],
      headers: [
        { text: "Código", value: "codigo", sortable: true },
        { text: "Nombre", value: "nombre", sortable: true },
        { text: "Categoría", value: "categoria.nombre", sortable: true },
        { text: "Stock", value: "stock", sortable: true },
        { text: "Precio Venta", value: "precio_venta", sortable: true },
        { text: "Descripción", value: "descripcion", sortable: false },
        { text: "Estado", value: "estado", sortable: true },
        { text: "Opciones", value: "opciones", sortable: false },
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
      return this.editedIndex === -1 ? "Nuevo registro" : "Editar registro";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  created() {
    this.listar();
    this.selectCategoria();
  },
  methods: {
    listar() {
      let me = this;
      let header = { Token: this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .get("articulo/list", configuracion)
        .then(function (response) {
          me.articulos = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    selectCategoria() {
      let me = this;
      let categoriaArray = [];
      let header = { Token: this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .get("categoria/list", configuracion)
        .then(function (response) {
          categoriaArray = response.data;
          categoriaArray.map(function (x) {
            me.categorias.push({ text: x.nombre, value: x.id });
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    limpiar() {
      this.id = "";
      this.nombre = "";
      this.codigo = "";
      this.stock = 0;
      this.precio_venta = 0;
      this.descripcion = "";
      this.valida = 0;
      this.validaMensaje = [];
      this.editedIndex = -1;
    },
    validar() {
      this.valida = 0;
      this.validaMensaje = [];
      if (!this.categoria) {
        this.validaMensaje.push("Seleccione una categoría");
      }
      if (this.codigo.length > 64) {
        this.validaMensaje.push("El código no debe tener más de 64 caracteres");
      }
      if (this.nombre.length < 1 || this.nombre.length > 50) {
        this.validaMensaje.push(
          "El nombre del artículo debe tener entre 1-50 caracteres."
        );
      }
      if (this.descripcion.length > 255) {
        this.validaMensaje.push(
          "La descripción del artículo no debe tener más de 255 caracteres."
        );
      }
      if (this.stock < 0) {
        this.validaMensaje.push("Ingrese un stock valido");
      }
      if (this.precio_venta < 0) {
        this.validaMensaje.push("Ingrese un precio de venta valido");
      }
      if (this.validaMensaje.length) {
        this.valida = 1;
      }
      return this.valida;
    },
    guardar() {
      let me = this;
      let header = { Token: this.$store.state.token };
      let configuracion = { headers: header };
      if (this.validar()) {
        return;
      }
      if (this.editedIndex > -1) {
        axios
          .put(
            "articulo/update",
            {
              id: this.id,
              categoriaId: this.categoria,
              codigo: this.codigo,
              nombre: this.nombre,
              stock: this.stock,
              precio_venta: this.precio_venta,
              descripcion: this.descripcion,
            },
            configuracion
          )
          .then(function (response) {
            me.limpiar();
            me.close();
            me.listar();
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        //Código para guardar
        axios
          .post(
            "articulo/add",
            {
              categoriaId: this.categoria,
              codigo: this.codigo,
              nombre: this.nombre,
              stock: this.stock,
              precio_venta: this.precio_venta,
              descripcion: this.descripcion,
            },
            configuracion
          )
          .then(function (response) {
            me.limpiar();
            me.close();
            me.listar();
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    editItem(item) {
      this.id = item.id;
      this.categoria = item.categoria.id;
      this.codigo = item.codigo;
      this.nombre = item.nombre;
      this.stock = item.stock;
      this.precio_venta = item.precio_venta;
      this.descripcion = item.descripcion;
      this.dialog = true;
      this.editedIndex = 1;
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
    activar() {
      let me = this;
      let header = { Token: this.$store.state.token };
      let configuracion = { headers: header };

      axios
        .put("articulo/activate", { id: this.adId }, configuracion)
        .then(function (response) {
          me.adModal = 0;
          me.adAccion = 0;
          me.adNombre = "";
          me.adId = "";
          me.listar();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    desactivar() {
      let me = this;
      let header = { Token: this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .put("articulo/deactivate", { id: this.adId }, configuracion)
        .then(function (response) {
          me.adModal = 0;
          me.adAccion = 0;
          me.adNombre = "";
          me.adId = "";
          me.listar();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    close() {
      this.dialog = false;
    },
     impri() {
      console.log('accion');
    },
  },
};
</script>
