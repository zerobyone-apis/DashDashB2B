<template>
  <v-layout row>
    <v-flex md3>
      <v-app style="background-color: #f5f5f5" class="ma-n4">
        <v-container mx-5 mt-8>
          <h4 class="ml-2 mb-5">FILTERS</h4>
          <v-list-item>
            <v-list-item-action>
              <v-icon small>fas fa-user-plus</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>New Campaign</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-icon small="">fas fa-user-plus</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Folower Campaign</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-icon small>fas fa-user-cog</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Still in progress</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-text-field
            label="Custom Search"
            prepend-icon="search"
            class="ml-3 mr-12"
          >
          </v-text-field>
          <v-select
            v-model="value"
            :items="items"
            chips
            attach
            clearable
            label="keyword"
            multiple=""
            class="ml-3 mr-12"
          />

          <v-select
            v-model="campaign"
            :items="campaigns"
            chips
            attach
            clearable
            label="Campaigns"
            multiple=""
            class="ml-3 mr-12"
          />
        </v-container>
      </v-app>
    </v-flex>
    <v-flex md9>
      <v-app style="background-color: white" class="ma-n4">
        <v-container>
          <template>
            <v-data-table
              v-model="selected"
              :single-select="singleSelect"
              item-key="name"
              show-select
              :headers="headers"
              :items="desserts"
              sort-by="applied"
              class="mr-2"
            >
              <template v-slot:top>
                <v-toolbar flat color="white">
                  <v-toolbar-title class="mt-5">Dashboard</v-toolbar-title>
                  <v-divider class="mx-4 mt-5" inset vertical=""></v-divider>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="grey lighten-1"
                    dark
                    class="mb-2 mr-2 mt-5"
                    v-on="{on}"
                    text
                    ><v-icon left>fas fa-upload</v-icon>CSV Import</v-btn
                  >
                  <v-btn color="success" dark class="mb-2 mt-5" v-on="{on}" text>
                    <v-icon left>add</v-icon>
                    Add User
                  </v-btn>
                </v-toolbar>
              </template>

              <template v-slot:item.avatar="{ item }">
                <v-avatar size="30px"> <img :src="item.avatar" /></v-avatar>
              </template>

              <template v-slot:item.rating="{ item }">
                <v-rating
                  v-model="item.rating"
                  background-color="purple lighten-3"
                  color="purple"
                  small
                  dense
                ></v-rating>
              </template>

              <template v-slot:item.progress="{ item }">
                <v-progress-linear
                  color="light-blue"
                  height="6"
                  v-model="item.progress"
                  striped=""
                ></v-progress-linear>
              </template>

              <template v-slot:item.action="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)" color="green"
                  >edit</v-icon
                >
                <v-icon small class="mr-2" @click="deleteItem(item)" color="red"
                  >delete</v-icon
                >
              </template>

              <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">Reset</v-btn>
              </template>
            </v-data-table>
          </template>
        </v-container>
      </v-app>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { FIRE, DB } from "../settings/CONST_REFS";
import { transformData, UserType } from "../services/firebaseAuths";
//import axios from "axios";

@Component({
  name: "dashboard",
  components: {
    // sub-components
  },
})
export default class Dashboard extends Vue {
  private items: any[] = ["Names", "Dates"];
  private value: any[] = ["Roberto Santos", "	01/12/2020"];
  private campaigns: any[] = ["VIVO", "SHELL"];
  private campaign: any[] = ["Vivo", "Shell"];
  private singleSelect = false;
  private selected: any[] = [];
  private headers: any[] = [
    { text: "PICTURE", align: "right", sortable: false, value: "avatar" },
    { text: "NAMES", align: "left", sortable: false, value: "name" },
    { text: "DATE", value: "applied" },
    { text: "PROGRESS", value: "progress" },
    { text: "RATING", value: "rating" },
    { text: "", value: "action", sortable: false },
  ];
  private desserts = [{}];
  private access: any = "";
  private user: any = "";

  created() {
    this.initialize();
  }

  mounted() {
    this.getAccess();
    this.checkingUserData();
    this.persistUserLS();
    this.getSessions();
  }

  on() {
    console.log("This on was pressed 😁");
  }

  initialize() {
    this.desserts = [
      {
        avatar: "https://randomuser.me/api/portraits/women/10.jpg",
        name: "Karla Daishi",
        applied: "10/12/2020",
        progress: 85,
        rating: 4,
      },
      {
        avatar: "https://randomuser.me/api/portraits/women/13.jpg",
        name: "Sophia Seppia",
        applied: "10/12/2020",
        progress: 79,
        rating: 5,
      },
      {
        avatar: "https://randomuser.me/api/portraits/men/17.jpg",
        name: "Roberto Santos",
        applied: "01/12/2020",
        progress: 80,
        rating: 3,
      },
      {
        avatar: "https://randomuser.me/api/portraits/women/5.jpg",
        name: "Arys Trite",
        applied: "10/12/2020",
        progress: 85,
        rating: 4,
      },
      {
        avatar: "https://randomuser.me/api/portraits/men/22.jpg",
        name: "Haldo Daichi",
        applied: "10/12/2020",
        progress: 90,
        rating: 3,
      },
      {
        avatar: "https://randomuser.me/api/portraits/women/12.jpg",
        name: "Karla Itadachi",
        applied: "10/12/2020",
        progress: 85,
        rating: 4,
      },
      {
        avatar: "https://randomuser.me/api/portraits/men/10.jpg",
        name: "Fulanguen Strepi",
        applied: "10/12/2020",
        progress: 90,
        rating: 5,
      },
      {
        avatar: "https://randomuser.me/api/portraits/women/19.jpg",
        name: "Misako Daishi",
        applied: "10/12/2020",
        progress: 95,
        rating: 5,
      },
      {
        avatar: "https://randomuser.me/api/portraits/men/12.jpg",
        name: "Ivere Atio",
        applied: "10/12/2020",
        progress: 75,
        rating: 3,
      },
      {
        avatar: "https://randomuser.me/api/portraits/women/14.jpg",
        name: "Imari Houske",
        applied: "10/12/2020",
        progress: 85,
        rating: 4,
      },
      {
        avatar: "https://randomuser.me/api/portraits/women/18.jpg",
        name: "Nixoann Maishi",
        applied: "10/12/2020",
        progress: 60,
        rating: 4,
      },
      {
        avatar: "https://randomuser.me/api/portraits/women/10.jpg",
        name: "Leifra Nasake",
        applied: "10/12/2020",
        progress: 98,
        rating: 5,
      },
    ];
  }

  public async checkingUserData() {
    const info = await FIRE.auth().currentUser;
    // console.log("this is the user info -> ", info);
    const user: UserType = transformData(info);
    // console.log("this is the user user -> ", user);
    if (user) {
      this.user = user;
      // console.log("Se paso.. ", user);
    }
  }

  public persistUserLS() {
    if (this.user) {
      localStorage.user = this.user;
    }
  }

  public async getSessions(){
    const sessions = [{ }]
    
    await DB.collection("user")
    .doc("events")
    .collection("sessions")
    .get()
    .then((res: any) => {
      // console.log("Session save it successfuly!");
      // console.log("Res -> ", res);

      return sessions.push(res);
    })
    .catch((err: Error) => {
      console.log("Error: ", err);
      console.log("Error Message: Saving this session: ", err.message);
      return err;
    });    
    // const strSessions = JSON.stringify(sessions);
    // console.log("This is de list of sessions",  strSessions);
  }

  public async getAccess() {
    const token = await FIRE.auth().currentUser!.getIdToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // const response = await axios.get("http://localhost:3000/Zero", config);
    // this.access = response.data;
  }
}
</script>

<style scoped>
</style>