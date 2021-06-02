<template>
  <v-app>
    <v-main>
      <navbar v-if="userAuth" />
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Navbar from "./components/Navigation/Navbar.vue";
import { FIRE } from "./settings/CONST_REFS";

@Component({
  name: "App",
  components: {
    Navbar,
  },
})
export default class App extends Vue {
  private userAuth = false;

  mounted() {
    this.userLogged();
  }

  //* We check if the user is logged.
  userLogged() {
    FIRE.auth().onAuthStateChanged((user) => {
      console.log(
        `This is the User -> ${JSON.stringify(
          user?.displayName ? user.displayName : user?.email
        )}`
      );
      //* Valid user to show the navbar
      user ? (this.userAuth = true) : (this.userAuth = false);
    });
  }
}
</script>
