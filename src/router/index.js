import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Auth from '../components/Auth'
import LocationList from '../components/LocationList'
import LocationCreate from '../components/LocationCreate'
import PatientList from '../components/PatientList'
import PatientCreate from '../components/PatientCreate'
import PrescriptionList from "../components/PrescriptionList";
import PrescriptionCreate from "../components/PrescriptionCreate";

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/location-list',
      name: 'LocationList',
      component: LocationList
    },
    {
      path: '/location-list/:msg',
      name: 'LocationUpdatedList',
      component: LocationList
    },
    {
      path: '/location-create',
      name: 'LocationCreate',
      component: LocationCreate
    },
    {
      path: '/location-create/:pk',
      name: 'LocationUpdate',
      component: LocationCreate
    },

    {
      path: '/patient-list',
      name: 'PatientList',
      component: PatientList
    },
    {
      path: '/patient-list/:msg',
      name: 'PatientUpdatedList',
      component: PatientList
    },
    {
      path: '/patient-create',
      name: 'PatientCreate',
      component: PatientCreate
    },
    {
      path: '/patient-create/:pk',
      name: 'PatientUpdate',
      component: PatientCreate
    },
    {
      path: '/prescription-list',
      name: 'PrescriptionList',
      component: PrescriptionList
    },
    {
      path: '/prescription-list/:msg',
      name: 'PrescriptionUpdatedList',
      component: PrescriptionList
    },
    {
      path: '/prescription-create',
      name: 'PrescriptionCreate',
      component: PrescriptionCreate
    },
    {
      path: '/prescription-create/:pk',
      name: 'PrescriptionUpdate',
      component: PrescriptionCreate
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    }
  ]
})
