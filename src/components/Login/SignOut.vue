<template>
  <v-tooltip top>
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on" text class="btn__icon__style mt-2">
        <v-list-item active-class="" @click="signOut" class="btn__icon__style">
          <v-icon dark color="white" right>fas fa-sign-out-alt</v-icon>
        </v-list-item>
      </v-btn>
    </template>
    <span>Exit</span>
  </v-tooltip>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import { FIRE } from "../../settings/CONST_REFS";
import { pushNotifcation } from "../../services/notification";
import { sessionsTracker } from "../../services/FirebaseQueries";

@Component
export default class SignOut extends Vue {

  // Data props
  private loggedIn = false;

  public signOut() {
    const username = FIRE.auth().currentUser?.displayName;
    
    const notification: any = {
      title: `Back soon ${
        FIRE.auth().currentUser?.displayName ? username : "Test"
      } 😥`,
      body: "Have a good night 😎",
      icon:
        "https://www.pinclipart.com/picdir/big/548-5485193_iphone-7-push-technology-apple-push-notification-push.png",
    };
 
    const user: any = JSON.parse(Object(localStorage.getItem('user')));
    const isMs = user.jobTitle ? true : false;
    localStorage.removeItem("user");
    FIRE.auth()
      .signOut()
      .then(() => {
        sessionsTracker(user, true, isMs)
        pushNotifcation(notification);
        this.$router.replace({ name: "Login" });
      });
  }
}
</script>

<style scoped>
.v-btn__icon__style{
  background-color: none;
  color: transparent;
}

</style>