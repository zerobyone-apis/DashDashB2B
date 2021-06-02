<template>
  <v-list nav>
    <v-list-item router to="/home">
      <v-list-item-action>
        <v-icon small>fas fa-home</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-content>Home</v-list-item-content>
      </v-list-item-content>
    </v-list-item>
    <v-list-item router to="/dashboard">
      <v-list-item-action>
        <v-icon small>fas fa-tachometer-alt</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-content>Dashboard</v-list-item-content>
      </v-list-item-content>
    </v-list-item>
    <v-list-item router to="/campaign">
      <v-list-item-action>
        <v-icon small>fas fa-briefcase</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-content>Campañas</v-list-item-content>
      </v-list-item-content>
      <v-chip color="yellow darken-3" small>3</v-chip>
    </v-list-item>
    <v-list-item router to="/clients">
      <v-list-item-action>
        <v-icon small>fas fa-users</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-content>Clientes</v-list-item-content>
      </v-list-item-content>
    </v-list-item>
    <v-list-item router to="/calendar">
      <v-list-item-action>
        <v-icon small>fas fa-calendar-alt</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-content>Calendar</v-list-item-content>
      </v-list-item-content>
    </v-list-item>
    <v-list-item router to="/reports">
      <v-list-item-action>
        <v-icon small>fas fa-clipboard-list</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-content>Reports</v-list-item-content>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "routes",
  components: {},
})
export default class Routes extends Vue {}
</script>

<style scoped lang="scss">
.v-icon:hover{
  color: #1de9b6dc !important;
}
</style>