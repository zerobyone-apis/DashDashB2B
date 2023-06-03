<template>
  <v-app>
    <v-main class="pl-0">
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center" class="ml-6">
          <v-col cols="12" sm="8" md="8" lg="8">
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-window-item  :value="1">
                  <sign-in @nextStep="updateStep"/>
                </v-window-item>

                <v-window-item :value="2">
                  <v-window-item>
                    <sign-up @beforeStep="updateStep"/>
                  </v-window-item>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";
import SignIn from "../components/Login/SignIn.vue";
import SignUp from "../components/Login/SignUp.vue";
import { createUserWithEmailAndPassowrd } from '../services/firebaseAuths';
//import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

@Component({
  components: {
    SignIn,
    SignUp
  },
})
export default class Home extends Vue {
  public step = 1;
   

  public updateStep(comeStep: number){
    this.step = comeStep;
  } 
  
}
</script>
