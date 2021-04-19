<template>
  <v-main>
    <!-- Welcome title -->
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" align="center" justify="center">
          <blockquote>
            Welcome {{validUserName}}!
          </blockquote>
        </v-col>
        <v-col  cols="12" md="10" lg="10" align="center" justify="center">
          <v-alert v-if="showMsg === 'new'"
                   dismissible
                   :value="true"
                   type="success"
          >
            New Prescription has been added.
          </v-alert>
          <v-alert v-if="showMsg === 'update'" dismissible
                   :value="true"
                   type="success"
          >
            Prescription has been updated.
          </v-alert>
          <v-alert v-if="showMsg === 'deleted'" dismissible
                   :value="true"
                   type="success"
          >
            Selected Prescription has been deleted.
          </v-alert>
        </v-col>
      </v-row>

      <!-- Data table -->
      <v-row align="center" justify="center">
        <v-col cols="12" md="10" v-resize="onResize">
          <v-data-table
            :headers="headers"
            :items="prescriptions"
            class="elevation-1"
            style="max-height: 300px; overflow-y: auto"
            v-if="!isMobile"
          >
            <template v-slot:item="props">
              <tr>
                <td align="left">{{ props.item.patient_number }}</td>
                <td align="left">{{ props.item.rx_number }}</td>
                <td nowrap="true" align="left">{{ props.item.name }}</td>
                <td nowrap="true" align="left">{{ props.item.dosage }}</td>
                <td nowrap="true" align="left">{{ props.item.description }}</td>
                <td nowrap="true" align="left">{{ props.item.refill }}</td>
                <td nowrap="true" align="left">{{ props.item.cost }}</td>
                <td nowrap="true" align="left">{{ props.item.prescription_date }}</td>
                <td nowrap="true" align="left">{{ props.item.status }}</td>
                <td nowrap="true" align="left">{{ props.item.pickup_date }}</td>
                <td align="center"><v-icon @click="updatePrescription(props.item)">mdi-pencil</v-icon></td>
                <td align="center"><v-icon @click="deletePrescription(props.item)">mdi-delete</v-icon></td>
              </tr>
            </template>
          </v-data-table>
          <v-data-iterator
            :items="prescriptions"
            hide-default-footer
            v-else
          >
            <template v-slot:default="{ items, isExpanded, expand }">
              <v-row>
                <v-col
                  v-for="item in items"
                  :key="item.rx_number"
                  cols="12"
                >
                  <v-card>
                    <v-card-title class="pb-0 pt-0 pl-0">
                      <v-col cols="9" class="text-left body-2 text-truncate">{{item.patient_number}} - {{item.rx_number }}</v-col>
                      <v-col cols="3" class="text-center">
                        <v-card-actions>
                          <v-icon @click="updatePrescription(item)" class="small">mdi-pencil</v-icon>
                          <v-icon @click="deletePrescription(item)" class="small">mdi-delete</v-icon>
                          <v-icon @click.native="expand(item, !isExpanded(item))" class="small">mdi-dots-horizontal</v-icon>
                        </v-card-actions>
                      </v-col>
                    </v-card-title>
                    <v-divider></v-divider>

                    <v-list v-show="isExpanded(item)" dense>
                      <v-list-item>
                        <v-list-item-content>Name:</v-list-item-content>
                        <v-list-item-content class="align-end">{{ item.name }}</v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>Dosage:</v-list-item-content>
                        <v-list-item-content class="align-end">{{ item.dosage }}</v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>Description:</v-list-item-content>
                        <v-list-item-content class="align-end">{{ item.description }}</v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>Refill:</v-list-item-content>
                        <v-list-item-content class="align-end">{{ item.refill }} </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>Cost:</v-list-item-content>
                        <v-list-item-content class="align-end">{{ item.cost }} </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>Prescription Date:</v-list-item-content>
                        <v-list-item-content class="align-end">{{ item.prescription_date }} </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>Status:</v-list-item-content>
                        <v-list-item-content class="align-end">{{ item.status }} </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>Pickup Date:</v-list-item-content>
                        <v-list-item-content class="align-end">{{ item.pickup_date }} </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </v-col>
              </v-row>
            </template>
          </v-data-iterator>
          <v-btn class="blue mt-4 white--text" @click="addNewPrescription">Add Prescription</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>


<script>

import router from '../router';
import {APIService} from '../http/APIService';
const apiService = new APIService();

export default {
  name: "PrescriptionList",
  data: () => ({
    prescriptions: [],
    validUserName: "Guest",
    prescriptionSize: 0,
    showMsg: '',
    isMobile: false,
    headers: [
      {text: 'Patient Number', sortable: false, align: 'left',},
      {text: 'RX Number', sortable: false, align: 'left',},
      {text: 'Name', sortable: false, align: 'left',},
      {text: 'Dosage', sortable: false, align: 'left',},
      {text: 'Description', sortable: false, align: 'left',},
      {text: 'Refill', sortable: false, align: 'left',},
      {text: 'Cost', sortable: false, align: 'left',},
      {text: 'Date Prescribed', sortable: false, align: 'left',},
      {text: 'Status', sortable: false, align: 'left',},
      {text: 'Pickup Date', sortable: false, align: 'left',},
      {text: 'Update', sortable: false, align: 'left',},
      {text: 'Delete', sortable: false, align: 'left',}

    ],

  }),
  mounted() {
    this.getPrescriptions();
    this.showMessages();
  },
  methods: {
    onResize() {
      if (window.innerWidth < 600)
        this.isMobile = true;
      else
        this.isMobile = false;
    },

    showMessages(){
      console.log(this.$route.params.msg)
      if (this.$route.params.msg) {
        this.showMsg = this.$route.params.msg;
      }
    },
    getPrescriptions() {
      apiService.getPrescriptionList().then(response => {
        this.prescriptions = response.data.data;
        this.prescriptionSize = this.prescriptions.length;
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
    addNewPrescription() {
      if (localStorage.getItem("isAuthenticates")
        && JSON.parse(localStorage.getItem("isAuthenticates")) === true) {
        router.push('/prescription-create');
      } else {
        router.push("/auth");
      }
    },
    updatePrescription(prescription) {
      router.push('/prescription-create/' + prescription.pk);
    },
    deletePrescription(prescription) {
      apiService.deletePrescription(prescription.pk).then(response => {
        if (response.status === 204) {
          router.push('/prescription-list/deleted/')
          this.getPrescriptions()
        }
      }).catch(error => {
        if (error.response.status === 401) {
          localStorage.removeItem('isAuthenticates');
          localStorage.removeItem('log_user');
          localStorage.removeItem('token');
          router.push("/auth");
        }
      });
    }
  }
};
</script>


<style scoped>

</style>
