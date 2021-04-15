<template>
  <v-main>
    <v-container fluid>
      <v-row>
        <v-col align="center" justify="center" cols="12">
          <blockquote>
            &#8220;Welcome {{ validUserName }}!&#8221;
          </blockquote>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid>
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          cols="12"
          sm="10"
          md="10"
        >
          <v-card class="elevation-2">
            <v-container
              fluid
              grid-list-md
            >
              <v-row>
                <v-col>
                  <v-card>
                    <v-img
                      :src="require('../assets/images/store.png')" height="350px">
                    </v-img>
                    <v-card-text>
                      <div class="blue--text text-h6">
                        Our Locations
                      </div>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn flat color="orange" @click="viewLocations">View Details</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
                <v-col>
                  <v-card>
                    <v-img
                      :src="require('../assets/images/patient.png')" height="350px">
                    </v-img>
                    <v-card-text>
                      <div class="blue--text text-h6">
                        Patients
                      </div>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn flat color="orange" @click="viewPatients">View Details</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
                <v-col>
                  <v-card>
                    <v-img
                      :src="require('../assets/images/patient.png')" height="350px">
                    </v-img>
                    <v-card-text>
                      <div class="blue--text text-h6">
                        Prescriptions
                      </div>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn flat color="orange" @click="viewPrescriptions">View Details</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import router from '../router';

export default {
  name: 'Home',
  data: () => ({
    validUserName: "Guest"
  }),
  mounted() {
    this.getUser();
  },
  methods: {
    viewLocations() {
      router.push('/location-list');
    },
    viewPatients() {
      router.push('/patient-list');
    },
    viewPrescriptions() {
      router.push('/prescription-list');
    },
    getUser() {
      if (localStorage.getItem("isAuthenticates")
        && JSON.parse(localStorage.getItem("isAuthenticates")) === true) {
        this.validUserName = JSON.parse(localStorage.getItem("log_user"));
      }
    }
  }
}
</script>
