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
              Please verify Prescription.
            </v-alert>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="10" md="10" lg="6" class="align-center">
            <v-card class="login-card">
              <v-card-title>
                <span class="headline">{{pageTitle}}</span>
              </v-card-title>
              <v-spacer/>

              <v-card-text>
                <v-form ref="form" lazy-validation>
                  <v-container>

                    <v-select
                      v-model="prescription.patient"
                      label="Patient Number"
                      :items="list"
                      item-value='pk'
                      item-text='patient_number'
                    ></v-select>

                    <v-text-field
                      v-model="prescription.rx_number"
                      label="RX Number"
                      required
                      type="number"
                    />
                    <v-text-field
                      v-model="prescription.name"
                      label="Name"
                      required
                    />
                    <v-text-field
                      v-model="prescription.dosage"
                      label="Dosage"
                      required
                    />
                    <v-text-field
                      v-model="prescription.description"
                      label="Description"
                      required
                    />
                    <v-text-field
                      v-model="prescription.refill"
                      label="Refills"
                      required
                      type="number"
                    />
                    <v-text-field
                      v-model="prescription.cost"
                      label="Cost"
                      required
                      type="number"
                    />
                    <v-text-field
                      v-model="prescription.prescription_date"
                      label="Date Prescribed"
                      required
                      type="date"
                    />
                    <v-text-field
                      v-model="prescription.status"
                      label="Status"
                      required
                    />
                    <v-text-field
                      v-model="prescription.pickup_date"
                      label="Date Picked Up"
                      required
                      type="date"
                    />

                  </v-container>
                  <v-btn v-if="!isUpdate" class="blue white--text" @click="createPrescription">Save</v-btn>
                  <v-btn v-if="isUpdate" class="blue white--text" @click="updatePrescription">Update</v-btn>
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
  name: 'PrescriptionCreate',
  components: {},
  data() {
    return {
      patients: [],
      showError: false,
      prescription: {},
      pageTitle: "Add New Prescription",
      isUpdate: false,
      showMsg: '',
    };
  },
  computed:{
    list:{
      get () {
        return this.patients
      },
      set (newValue) {
        this.patients = newValue
      }
    }
  },
  methods: {
    getPrescription() {
      apiService.getPrescriptionList().then(response => {
        this.patients = response.data.data;
        if (localStorage.getItem("isAuthenticates")
          && JSON.parse(localStorage.getItem("isAuthenticates")) === true) {
          this.validUserName = JSON.parse(localStorage.getItem("log_user"));
        }
      }).catch(error => {
        if (error.response.status === 401) {
          localStorage.removeItem('isAuthenticates');
          localStorage.removeItem('log_user');
          localStorage.removeItem('token');
          router.push("/auth");
        }
      });
    },
    createPrescription() {
      apiService.addNewPrescription(this.prescription).then(response => {
        if (response.status === 201) {
          this.prescription = response.data;
          this.showMsg = "";
          router.push('/prescription-list/new');
        }else{
          this.showMsg = "error";
        }
      }).catch(error => {
        if (error.response.status === 401) {
          router.push("/auth");
        }else if (error.response.status === 400) {
          this.showMsg = "error";
        }
      });
    },
    cancelOperation(){
      router.push("/prescription-list");
    },
    updatePrescription() {
      apiService.updatePrescription(this.prescription).then(response => {
        if (response.status === 200) {
          this.prescription = response.data;
          router.push('/prescription-list/update');
        }else{
          this.showMsg = "error";
        }
      }).catch(error => {
        if (error.response.status === 401) {
          router.push("/auth");
        }else if (error.response.status === 400) {
          this.showMsg = "error";
        }
      });
    }
  },
  mounted() {
    this.getPrescription();
    if (this.$route.params.pk) {
      this.pageTitle = "Edit Prescription";
      this.isUpdate = true;
      apiService.getPrescription(this.$route.params.pk).then(response => {
        this.prescription = response.data;
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
