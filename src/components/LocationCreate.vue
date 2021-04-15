<template>
  <v-container grid-list-md>
    <v-row align="center" justify="center">
      <v-col class="align-center">
        <v-row class="align-center" justify="center">
          <v-col cols="12" sm="10" md="10" lg="6" class="align-center">
            <v-alert v-if="showMsg === 'error'"
                     dismissible
                     :value="true"
                     type="error"
            >
              Please verify Store information.
            </v-alert>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="10" md="10" lg="6" class="align-center">
            <v-card class="login-card">
              <v-card-title>
                <span class="headline">{{ pageTitle }}</span>
              </v-card-title>
              <v-spacer/>

              <v-card-text>
                <v-form ref="form" lazy-validation>
                  <v-container>

                    <v-text-field
                      v-model="location.store_number"
                      label="Store Number"
                      required
                      type="number"
                    />

                    <v-text-field
                      v-model="location.address"
                      label="Address"
                      required
                    />
                    <v-text-field
                      v-model="location.phone_number"
                      label="Phone"
                      required
                    />
                    <v-text-field
                      v-model="location.city"
                      label="City"
                      required
                    />
                    <v-text-field
                      v-model="location.state"
                      label="State"
                      required
                    />
                    <v-text-field
                      v-model="location.zipcode"
                      label="ZipCode"
                      required
                    />

                  </v-container>
                  <v-btn v-if="!isUpdate" class="blue white--text" @click="createLocation">Save</v-btn>
                  <v-btn v-if="isUpdate" class="blue white--text" @click="updateLocation">Update</v-btn>
                  <v-btn class="white black--text" @click="cancelOperation">Cancel</v-btn>

                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import router from '../router';
import {APIService} from '../http/APIService';

const apiService = new APIService();

export default {
  name: 'LocationCreate',
  components: {},
  data() {
    return {
      showError: false,
      location: {},
      pageTitle: "Add New Store Location",
      isUpdate: false,
      showMsg: '',
    };
  },
  methods: {
    createLocation() {
      apiService.addNewLocation(this.location).then(response => {
        if (response.status === 201) {
          this.location = response.data;
          this.showMsg = "";
          router.push('/location-list/new');
        } else {
          this.showMsg = "error";
        }
      }).catch(error => {
        if (error.response.status === 401) {
          router.push("/auth");
        } else if (error.response.status === 400) {
          this.showMsg = "error";
        }
      });
    },
    cancelOperation() {
      router.push("/location-list");
    },
    updateLocation() {
      apiService.updateLocation(this.location).then(response => {
        if (response.status === 200) {
          this.location = response.data;
          router.push('/location-list/update');
        } else {
          this.showMsg = "error";
        }
      }).catch(error => {
        if (error.response.status === 401) {
          router.push("/auth");
        } else if (error.response.status === 400) {
          this.showMsg = "error";
        }
      });
    }
  },
  mounted() {
    if (this.$route.params.pk) {
      this.pageTitle = "Edit Store Information";
      this.isUpdate = true;
      apiService.getLocation(this.$route.params.pk).then(response => {
        this.location = response.data;
      }).catch(error => {
        if (error.response.status === 401) {
          router.push("/auth");
        }
      });
    }
  },
}
</script>
<style scoped>
.aform {
  margin-left: auto;
  width: 60%;
}
</style>

