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
              Please verify patient information.
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
                      v-model="patient.patient_number"
                      label="Patient Number"
                      required
                      type="number"
                    />
                    <v-text-field
                      v-model="patient.first_name"
                      label="First Name"
                      required
                    />
                    <v-text-field
                      v-model="patient.last_name"
                      label="Last Name"
                      required
                    />
                    <v-text-field
                      v-model="patient.date_of_birth"
                      label="Date of Birth"
                      required
                      type="date"
                    />

                    <v-text-field
                      v-model="patient.address"
                      label="Address"
                      required
                    />
                    <v-text-field
                      v-model="patient.city"
                      label="City"
                      required
                    />
                    <v-text-field
                      v-model="patient.state"
                      label="State"
                      required
                    />
                    <v-text-field
                      v-model="patient.zipcode"
                      label="ZipCode"
                      required
                    />
                    <v-text-field
                      v-model="patient.email"
                      label="Email"
                      required
                      type="email"
                    />
                    <v-text-field
                      v-model="patient.cell_phone"
                      label="Phone"
                      required
                    />

                  </v-container>
                  <v-btn v-if="!isUpdate" class="blue white--text" @click="createPatient">Save</v-btn>
                  <v-btn v-if="isUpdate" class="blue white--text" @click="updatePatient">Update</v-btn>
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
  name: 'PatientCreate',
  components: {},
  data() {
    return {
      showError: false,
      patient: {},
      pageTitle: "Add New Patient",
      isUpdate: false,
      showMsg: '',
    };
  },
  methods: {
    createPatient() {
      apiService.addNewPatient(this.patient).then(response => {
        if (response.status === 201) {
          this.patient = response.data;
          this.showMsg = "";
          router.push('/patient-list/new');
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
      router.push("/patient-list");
    },
    updatePatient() {
      apiService.updatePatient(this.patient).then(response => {
        if (response.status === 200) {
          this.patient = response.data;
          router.push('/patient-list/update');
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
      this.pageTitle = "Edit Patient Information";
      this.isUpdate = true;
      apiService.getPatient(this.$route.params.pk).then(response => {
        this.patient = response.data;
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

