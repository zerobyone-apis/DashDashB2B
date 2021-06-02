<template>
  <v-row class="fill-height">
    <v-col cols="12" md="4" class="teal accent-3">
      <v-card-text class="white--text mt-12">
        <h1 class="text-center display-1">Welcome Back !</h1>
        <h5 class="text-center">
          To Keep connected with us please login with you personal info
        </h5>
      </v-card-text>
      <div class="text-center">
        <v-btn rounded outlined dark @click="beforeStep">SIGN IN</v-btn>
      </div>
    </v-col>
    <v-col cols="12" md="8">
      <v-card-text class="mt-12">
        <h1 class="text-center display-2 teal--text text--accent-3">
          Create Account
        </h1>
        <div class="text-center mt-4">
          <v-btn
            text
            class="btn__icon__style mx-2"
            fab
            color="black"
            @click="singleSignOnMs"
          >
            <v-icon>fab fa-microsoft</v-icon>
          </v-btn>
        </div>
        <h4 class="text-center mt-4">Ensure your email for registration</h4>
        <v-form>
          <v-text-field
            label="Full Name "
            name="FullName"
            v-model="fullName"
            prepend-icon="person"
            type="text"
            color="teal accent-3"
          />
          <v-text-field
            label="Phone"
            name="Phone"
            v-model="phone"
            prepend-icon="phone"
            type="text"
            color="teal accent-3"
          />
          <v-text-field
            label="Email"
            name="Email"
            v-model="email"
            prepend-icon="email"
            type="text"
            color="teal accent-3"
          />
          <v-text-field
            label="Password"
            name="Password"
            v-model="password"
            prepend-icon="lock"
            type="password"
            color="teal accent-3"
          />

          <v-text-field
            label="Avatar link"
            name="Avatar"
            v-model="avatarUrl"
            prepend-icon="image"
            type="text"
            color="teal accent-3"
          />
          <v-checkbox
            label="User is available to create Users?"
            name="isCreator"
            v-model="isCreator"
            type="checkbox"
            color="teal accent-3"
          />
          <v-select
            :items="team"
            chips
            attach
            clearable
            label="Team"
            multiple=""
            class="ml-3 mr-12"
          />
          <v-select
            :items="rol"
            chips
            attach
            clearable
            label="Rol"
            class="ml-3 mr-12"
          />
        </v-form>
      </v-card-text>
      <div class="text-center mt-5 mb-5">
        <v-btn rounded color="teal accent-3" dark @click="registerUser"
          >SING UP</v-btn
        >
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { createUserWithEmailAndPassowrd } from "../../services/firebaseAuths";
import { signInWithSSOMicrosoft, UserType } from "../../services/firebaseAuths";
import { pushNotifcation } from "../../services/notification";
import { sessionsTracker, userBackUp } from "../../services/FirebaseQueries";

@Component({})
export default class SignUp extends Vue {
  private step = 1;

  // New data()
  private email = "prueba2@gmail.com";
  private phone = "091223366";
  private fullName = "prueba1";
  private password = "smoketest";
  private team = [
    "MEDIA",
    "ADOPS",
    "FINANCIERO",
    "ATENDIMIENTO",
    "PLATAFORMA",
    "BI - DATOS",
  ];
  private rol = ["Supervisor", "Agent"];
  private isCreator = false;
  private isAdmin = false;
  private avatarUrl =
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Flucuketawangakak.blogspot.com%2F2019%2F12%2Ffunny-avatars.html&psig=AOvVaw3fCqTC8Nk39y5uA3jSJeMo&ust=1610772816983000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCICBgtCSne4CFQAAAAAdAAAAABAG";
  private error = "";

  public beforeStep() {
    this.$emit("beforeStep", this.step);
  }

  get fillFullName() {
    return this.fullName;
  }

  set fillFullName(newName: any) {
    console.log("Este es el name -> ", newName);
    this.fullName = newName.target.value;
  }

  get fillPhone() {
    return this.email;
  }
  set fillPhone(phone: any) {
    console.log("Este es el cel -> ", phone);
    this.phone = phone.target.value;
  }
  
  get fillEmail() {
    return this.email;
  }
  set fillEmail(email: any) {
    console.log("Este es el email -> ", email);
    this.email = email.target.value;
  }

  get fillPass() {
    return this.password;
  }

  set fillPass(password: any) {
    console.log("Este es el pass -> ", password);
    this.password = password.target.value;
  }
  get fillIsAdmin() {
    return this.isAdmin;
  }

  set fillIsAdmin(event: any) {
    console.log(" isAdmin -> ", event);
    this.isAdmin = event.target.value;
  }

  get fillTeam() {
    return this.team;
  }

  set fillTeam(event: any) {
    console.log(" This is the Team selected -> ", event);
    this.team = event.target.value;
  }

  get fillRol() {
    return this.rol;
  }

  set fillRol(event: any) {
    console.log(" This is the Team selected -> ", event);
    this.rol = event.target.value;
  }

  get fillAvatar() {
    return this.avatarUrl;
  }

  set fillAvatar(event: any) {
    console.log(" This is the avatar -> ", event);
    this.avatarUrl = event.target.value;
  }

  get fillIsCreator() {
    return this.isCreator;
  }

  set fillIsCreator(event: any) {
    console.log(" isCreator -> ", event);
    this.isCreator = event.target.value;
  }

  /**
   * ! Saving user info to our DataBase.
   * * @params: Whole this set's params -> the idea is create an object user to do things with that info. like save a record on this case.
   * * @output: UserInfo Object to save on Database.
   */
  private createUserInfoTrack = () => {
    console.log(`START: User Track Method..`);

    const user: any = {
      email: this.fillEmail,
      phone: this.fillPhone,
      fullName: this.fillFullName,
      team: this.fillTeam,
      rol: this.fillRol,
      isCreator: this.fillIsCreator,
      isAdmin: this.fillIsAdmin,
      avatarUrl: this.fillAvatar,
    };

    console.log(`User object to save -> ${user}`);
    console.log(`END: User Track Method..`);
    return user;
  };

  //! Register new User
  // todo: We need to add, whole logic to admit just the credentials availables for the users
  // todo: we need to add, the check if user is already created - working on this.
  // todo: We need to manage the exeptions on the right way, showing a popup with control message
  // todo: We need to implement validation controls in all fields.
  // todo: ...
  public async registerUser() {
    const response: any = await createUserWithEmailAndPassowrd(
      this.fillEmail,
      this.fillPass
    );

    if (response.code === 200) {
      console.log(`User response -> ${JSON.stringify(response.data)}`);
      console.log("Redirecting to Dashboard 😁 ");
      sessionsTracker(response.data, false, false);
      userBackUp(this.createUserInfoTrack());
      this.$router.replace({ name: "Dashboard" });
    } else if (response.code === 400) {
      console.error("Ocurrio un error 😥 ");
      this.error = response;
    }
  }

  //! Microsoft Login
  // todo: Check if the user exist on our Table on DB.
  // todo: Manage the exeptions do not crash the system
  // todo: We need to implement validation controls in all fields.
  // todo: ...
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
      // console.log('Error message -> ', response.data);
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
</style>let