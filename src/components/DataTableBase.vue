<template>
  <v-flex>
    <v-toolbar d-flex class="elevation-2">
      <v-btn
        color="warning"
        fab
        small
        class="elevation-0"
        @click="$emit('reroll')"
        :loading="isloading"
        
        ><v-icon>mdi-update</v-icon></v-btn
      >
      <v-spacer></v-spacer>
      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-text-field
        class="text-xs-center"
        v-model="buscar"
        append-icon="mdi-magnify"
        label="Búsqueda"
        single-line
        hide-details
      ></v-text-field>

      <v-spacer></v-spacer>

      <v-btn color="primary" fab small class="elevation-0" @click="$emit('add')"
        ><v-icon>mdi-plus</v-icon></v-btn
      >
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="data"
      :search="buscar"
      :loading="isloading"
      class="elevation-1"
    >
      <template v-slot:[`item.opciones`]="{ item }">
        <v-icon class="mr-2" @click="$emit('edit', item)" color="accent">
          mdi-pencil-circle-outline</v-icon
        >
        <v-icon
          v-if="item.estado"
          color="error"
          @click="$emit('desactive', item)"
        >
          mdi-close-circle-outline
        </v-icon>

        <v-icon v-else @click="$emit('active', item)" color="success">
          mdi-checkbox-marked-circle-outline
        </v-icon>
      </template>
      <template v-slot:[`item.estado`]="{ item }">
        <div v-if="item.estado">
          <span class="success--text">Activo</span>
        </div>
        <div v-else>
          <span class="error--text">Inactivo</span>
        </div>
      </template>
    </v-data-table>
  </v-flex>
</template>

<script>
export default {
  props: {
    title: String,
    data: Array,
    headers: Array,
    buscar: String,
    isloading: Boolean,
  },
  data() {
    return {};
  },
};
</script>

<style>
</style>