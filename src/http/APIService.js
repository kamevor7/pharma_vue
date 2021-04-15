import axios from 'axios';

const API_URL = 'https://mypharmaapp.herokuapp.com/';

export class APIService {
  constructor() {

  }

  getLocation(param_id) {
    const url = `${API_URL}/api/locations/${param_id}`;
    let jwtToken = localStorage.getItem('token');
    console.log(":::jwtToken:::::" + jwtToken);
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.get(url, {headers: {Authorization: `jwt ${jwtToken}`}});
  }

  getLocationList() {
    const url = `${API_URL}/api/locations/`;
    let jwtToken = localStorage.getItem('token');
    console.log(":::jwtToken:::::" + jwtToken);
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.get(url, {headers: headers});

  }

  addNewLocation(location) {
    const url = `${API_URL}/api/locations/`;
    let jwtToken = localStorage.getItem('token');
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.post(url, location, {headers: headers});
  }

  updateLocation(location) {
    const url = `${API_URL}/api/locations/${location.id}`;
    let jwtToken = localStorage.getItem('token');
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.put(url, location, {headers: headers});
  }

  deleteLocation(location_Pk) {
    const url = `${API_URL}/api/locations/${location_Pk}`;
    let jwtToken = localStorage.getItem('token');
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.delete(url, {headers: headers});
  }

  getPatient(param_id) {
    const url = `${API_URL}/api/patients/${param_id}`;
    let jwtToken = localStorage.getItem('token');
    console.log(":::jwtToken:::::" + jwtToken);
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.get(url, {headers: {Authorization: `jwt ${jwtToken}`}});
  }

  getPatientList() {
    const url = `${API_URL}/api/patients`;
    let jwtToken = localStorage.getItem('token');
    console.log(":::jwtToken:::::" + jwtToken);
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.get(url, {headers: headers});

  }

  addNewPatient(patient) {
    const url = `${API_URL}/api/patients/`;
    let jwtToken = localStorage.getItem('token');
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.post(url, patient, {headers: headers});
  }

  updatePatient(patient) {
    const url = `${API_URL}/api/patients/${patient.id}`;
    let jwtToken = localStorage.getItem('token');
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.put(url, patient, {headers: headers});
  }

  deletePatient(patient_Pk) {
    const url = `${API_URL}/api/patients/${patient_Pk}`;
    let jwtToken = localStorage.getItem('token');
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.delete(url, {headers: headers});
  }

  getPrescription(param_id) {
    const url = `${API_URL}/api/prescriptions/${param_id}`;
    let jwtToken = localStorage.getItem('token');
    console.log(":::jwtToken:::::" + jwtToken);
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.get(url, {headers: {Authorization: `jwt ${jwtToken}`}});
  }

  getPrescriptionList() {
    const url = `${API_URL}/api/prescriptions`;
    let jwtToken = localStorage.getItem('token');
    console.log(":::jwtToken:::::" + jwtToken);
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.get(url, {headers: headers});

  }

  addNewPrescription(prescription) {
    const url = `${API_URL}/api/prescriptions/`;
    let jwtToken = localStorage.getItem('token');
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.post(url, prescription, {headers: headers});
  }

  updatePrescription(prescription) {
    const url = `${API_URL}/api/prescriptions/${prescription.id}`;
    let jwtToken = localStorage.getItem('token');
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.put(url, prescription, {headers: headers});
  }

  deletePrescription(prescription_Pk) {
    const url = `${API_URL}/api/prescriptions/${prescription_Pk}`;
    let jwtToken = localStorage.getItem('token');
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.delete(url, {headers: headers});
  }

  authenticateLogin(credentials) {
    const url = `${API_URL}/auth/`;
    return axios.post(url, credentials);
  }
}
