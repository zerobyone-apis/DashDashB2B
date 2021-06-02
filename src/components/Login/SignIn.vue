<template>
  <v-row>
    <v-col cols="12" md="8">
      <v-card-text class="mt-12 mb-8">
        <h1 class="text-center display-2 teal--text text--accent-3">
          Sign in to BigOne
        </h1>
        <div class="text-center mt-4">
          <v-btn text class="btn__icon__style mx-2" fab color="black" @click="singleSignOnMs">
            <v-icon >fab fa-microsoft</v-icon>
          </v-btn>
        </div>
        <h4 class="text-center mt-2">Ensure your email for registration</h4>
        <v-form>
          <v-text-field
            label="Email"
            name="Email"
            v-model="email"
            prepend-icon="email"
            type="text"
            color="teal accent-3"
          />
          <v-text-field
            id="password"
            label="Password"
            v-model="password"
            name="Password"
            prepend-icon="lock"
            type="password"
            color="teal accent-3"
          />
        </v-form>
        <h3 class="text-center mt-3">Forget your password ?</h3>
      </v-card-text>
      <div class="text-center mt-4 mb-6">
        <v-btn rounded color="teal accent-3" dark @click="LoginWithNormalEmailAndPassword">SIGN IN</v-btn>
      </div>
    </v-col>
    <v-col cols="12" md="4" class="teal accent-3">
      <v-card-text class="white--text mt-12">
        <h1 class="text-center display-1">Hello, Friends !</h1>
        <h5 class="text-center">
          Enter your personal details and start jurnay with us
        </h5>
      </v-card-text>
      <div class="text-center">
        <v-btn rounded outlined dark @click="nextStep">SIGN UP</v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";
import {
  signInWithEmailAndPassword,
  signInWithSSOMicrosoft,
  UserType,
} from "../../services/firebaseAuths";
import { pushNotifcation } from "../../services/notification";
import { sessionsTracker } from "../../services/FirebaseQueries";

@Component({
  name:'SignIn',
  components: {}
})
export default class SignIn extends Vue {
  private step = 1;

  private nextStep() {
    console.log("Going to step -> ", 2);
    this.$emit("nextStep", 2);
  }

  // ? Login info.
  private email= "test@gmail.com";
  private password= "smoketest";
  private error = "";

  get fillEmail() {
    return this.email;
  }
  set fillEmail(event: string) {
    this.email = event;
  }

  get fillPass() {
    return this.password;
  }

  set fillPass(event: string) {
    this.password = event;
  }

  public async LoginWithNormalEmailAndPassword(event: any) {
    console.log(`Login with -> ${this.email} & ${this.password}`);
    const response: any = await signInWithEmailAndPassword(
      this.email,
      this.password
    );

    if (response.code === 200) {
      console.log("User Response -> ", response.data);
      console.log("Redirecting to Dashboard 😁 ");
      const notification: any = {
        title: `Welcome ${response.data.name} 😳`,
        body: "Today is good day to work with firebase 😏 🎈",
        icon:
          "https://www.pinclipart.com/picdir/big/548-5485193_iphone-7-push-technology-apple-push-notification-push.png",
      };

      pushNotifcation(notification);
  
      this.$router.replace({ name: "Dashboard" });
    } else {
      console.error("Ocurrio un error 😥 ");
      this.error = response;
    }
  }

  public async singleSignOnMs() {
    console.log(`Login With microsoft account`);
    const response: any = await signInWithSSOMicrosoft();

    if (response.code === 200) {
      console.log("User Response -> ", response.data);
      console.log("Redirecting to Dashboard 😁 ");

      const notification: any = {
        title: `Welcome ${response.data.name} 😳`,
        body: "Today is good day to work with firebase 😏 🎈",
        icon:
          "https://www.pinclipart.com/picdir/big/548-5485193_iphone-7-push-technology-apple-push-notification-push.png",
      };
      pushNotifcation(notification);
      this.$router.replace({ name: "Dashboard" });
    } else if (response.code === 400) {
      console.error("Ocurrio un error 😥 ");
      this.error = response;
    }
  }
}
</script>

<style scoped lang="scss">
.btn__icon__style:hover {
  i {
    color: #1de9b6dc !important;
  }
}
.v-icon.v-icon::after{
   color: #1de9b6dc !important;
}
</style>