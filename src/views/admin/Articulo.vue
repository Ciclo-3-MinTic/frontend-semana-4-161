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
               <v-flex xs8 sm9 md10>
                <v-text-field v-model="nombre" label="Nombre"> </v-text-field>
              </v-flex>
                <v-flex xs4 sm3 md2>
                <v-text-field v-model="id" label="codigo" disabled v-show="typeDialog" type='text' > </v-text-field>
              </v-flex>
           
            
              <v-flex xs12>
                <v-textarea  v-model="descripcion" outlined rows="3" auto-grow label="descripcion">
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


    <data-table-base
      :title="titles"
      :data="dataArticulos"
      :headers="headers"
      :isloading="isloading"
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
      dialogpass: false,
      dialogAlert: false,
      typeDialog: 0, //add=0, edit=1;
      isloading: true,
      title: "Articulo",
      titles: "Articulos",
      dataArticulos: [],
      roles: [],
      tipo_documentos: [],
      headers: [
        { text: "Código", value: "codigo", sortable: true, align: "center" },
        { text: "Nombre", value: "nombre", sortable: true, align: "center" },
        { text: "articulo", value: "categoria.nombre", sortable: true, align: "center" },
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
      id: "",
      nombre: "",
      descripcion: "",
      estado: 0
    };
  },

  created() {
    this.listar();
  },
  methods: {
    editItem(item) {
      (this.id = item.id),
        (this.nombre = item.nombre),
        (this.descripcion = item.descripcion),
        (this.estado = item.estado)
       
    },
    clearItem() {
       (this.id = ""),
        (this.nombre = ""),
        (this.descripcion = ""),
        (this.estado = "")
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
      if (this.validar) {
        if (this.typeDialog) {
          this.updateArticulo({
            id: this.id,
            nombre: this.nombre,
            descripcion: this.descripcion

          })
        } else {
          this.newArticulo({
            
            nombre: this.nombre,
            descripcion: this.descripcion
          })
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