<template>
  <v-flex>
    <v-toolbar text color="white">
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-text-field
        class="text-xs-center"
        v-model="search"
        append-icon="mdi-search"
        label="Búsqueda"
        single-line
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">Nuevo</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
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
            <v-btn color="blue darken-1" @click="close">Cancelar</v-btn>
            <v-btn color="blue darken-1" @click="guardar">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="adModal" max-width="290">
        <v-card>
          <v-card-title class="headline" v-if="adAccion == 1">
            Activar Item
          </v-card-title>
          <v-card-title class="headline" v-if="adAccion == 2">
            Desactivar Item
          </v-card-title>
          <v-card-text>
            Estás a punto de <span v-if="adAccion == 1">activar </span>
            <span v-if="adAccion == 2">desactivar </span> el item {{ adNombre }}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="activarDesactivarCerrar()" color="green darken-1">
              Cancelar
            </v-btn>
            <v-btn
              v-if="adAccion == 1"
              @click="activar()"
              color="orange darken-4"
            >
              Activar
            </v-btn>
            <v-btn
              v-if="adAccion == 2"
              @click="desactivar()"
              color="orange darken-4"
            >
              Desactivar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>

    <v-data-table
      :headers="headers"
      :items="articulos"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:[`item.opciones`]="{ item }">
        <v-icon small class="mr-2" @click="impri()"> edit </v-icon>
        <v-icon
          v-if="item.estado"
          small
          @click="activarDesactivarMostrar(2, item)"
        >
          block
        </v-icon>

        <v-icon v-else small @click="activarDesactivarMostrar(1, item)">
          check
        </v-icon>
      </template>
      <template v-slot:[`item.estado`]="{ item }">
        <div v-if="item.estado">
          <span class="blue--text">Activo</span>
        </div>
        <div v-else>
          <span class="red--text">Inactivo</span>
        </div>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="impri()">Resetear</v-btn>
      </template>
    </v-data-table>
  </v-flex>
</template>

<script>
export default {
  data() {
    return {
      headers: headers,
      dialog: dialog,
      search: search,
      articulos: articulos,
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

  props: {
    title: String,
    dialog: Boolean,
    search: String,
    articulos: [],
    headers: [],
  },
};
</script>

<style>
</style>