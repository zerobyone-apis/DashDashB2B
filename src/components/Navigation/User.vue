<template>
  <div>
    <v-layout row style="position: absolute; bottom: 0">
      <v-flex md-1>
        <v-list-item dense>
          <v-list-item-avatar class="ml-1">
            <v-img
              src="https://avatars0.githubusercontent.com/u/37275050?s=460&u=c49f5cbc971167f07bde8cf0c601b9f8bcebbdbd&v=4"
            ></v-img>
          </v-list-item-avatar>
        </v-list-item>
      </v-flex>
      <v-flex>
        <v-list-item dense>
          <v-list-item-action class="ml-1">
            <v-badge color="error" overlap>
              <template slot="badge">3</template>
              <v-icon color="tertiary">mdi-bell</v-icon>
            </v-badge>
          </v-list-item-action>
        </v-list-item>
      </v-flex>

      <v-flex ml-1>
        <v-list-item>
          <sign-out />
        </v-list-item>
      </v-flex>
      <v-flex md12 mr-1>
        <v-card color="grey darken-1">
          <v-list-item dense>
            <v-list-item-action class="mx-0">
              <v-btn class="mx-1 mr-3" fab dark small color="blue">
                <v-icon dark>mdi-heart</v-icon>
              </v-btn>
            </v-list-item-action>
            <v-list-item-content class="mr-0">
              <v-list-item-title>Wunderman Thompson UY</v-list-item-title>
            </v-list-item-content>
            <v-icon dark class="mx-2">fas fa-chevron-down </v-icon>
          </v-list-item>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SignOut from "../Login/SignOut.vue";

@Component({
  name: "user",
  components: {
    SignOut,
  },
})
export default class User extends Vue {


  
}
</script>

<style scoped>
</style>