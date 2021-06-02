<template>
  <nav>
    <v-navigation-drawer v-model="drawer" dark app class="grey darken-3 py-0" :mini-variant.sync="mini">
  <v-container>
    <v-row>
      <v-col md="8" v-bind:class="[ !mini ? 'v-progress-circular' : 'v-progress-circular-mini']">
        <v-progress-circular  
          :torate="300"
          :size="50"
          :width="7"
          :value="value"
          color="lime accent-3"
          class="circular-icon mt-1"
        >
          {{ value }}
        </v-progress-circular>
      </v-col>
      <v-col md="3">
        <v-app-bar-nav-icon
          right
          class="mt-1"
          @click.stop="mini = !mini"
        />
      </v-col>
    </v-row>
  </v-container>
      <routes />
      <user />
    </v-navigation-drawer>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
import User from "./User.vue";
import Routes from "./Routes.vue";

@Component({
  name: "nav-bar",
  components: {
    User,
    Routes
  },
})
export default class Navbar extends Vue {
  private drawer = true;
  private mini = false;

  // hideMenu(hide: boolean){
  //   if(this.drawer === false){
  //     console.log('se oculta')
  //     this.drawer = hide
  //   }else{
  //     console.log('se muestra')
  //     this.drawer = hide
  //   }
  // }
    private interval: any = {};
  private value = 0;
  private isHide = false;

  // https://randomuser.me/api/portraits/women/10.jpg
  // https://randomuser.me/api/portraits/men/10.jpg

  hideMenu(){
    this.isHide = true;
    this.$emit('hide')
  }

  beforeDestroy() {
    clearInterval(this.interval);
  }

  mounted() {
    this.interval = setInterval(() => {
      if (this.value === 100) {
        return (this.value = 0);
      }
      this.value += 10;
    }, 1000);
  }
}

</script>

<style lang="scss" scoped>

.v-progress-circular {
  margin: 5px;
  display: table-cell;
  .circular-icon{
    padding-left: 0;
  }
}

.v-progress-circular-mini {
  margin: 8px;
  margin-bottom: 0px;
  padding:0px;
   .circular-icon{
    padding: 10px;
  }
}

</style>