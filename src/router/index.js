import Vue from 'vue'
import Router from 'vue-router'
import Index from "../views/Index"
import Login from "../views/Login"
import Home from "../views/Home"
import adminInvoice from "../views/sys/adminInvoice"
import adminEditStaff from "../views/sys/adminEditStaff"
import adminRole from "../views/sys/adminRole"
import adminOrga from "../views/sys/adminOrga"
import adminInvoice_Setting from "../views/sys/adminInvoice_Setting"
import adminEmployeeScore from "../views/sys/adminEmployeeScore"
import adminSign from "../views/sys/adminSign"
import adminStaff from "../views/sys/adminStaff"
import adminExportFile from "../views/sys/adminExportFile"
import adminInvoice_record from "../views/sys/adminInvoice_record"
import adminEditStaffForm from "../views/sys/adminEditStaffForm"
import adminAllStaff from "../views/sys/adminAllStaff"
import adminConsumptionProject from "../views/sys/adminConsumptionProject"
import adminConsumptionAmount from "../views/sys/adminConsumptionAmount"
import adminCare_score_content from "../views/sys/adminCare_score_content"
import adminConsumptionOrder from "../views/sys/adminConsumptionOrder"
import adminEnterpriseScore from "../views/sys/adminEnterpriseScore"
import adminRecharge from "../views/sys/adminRecharge"
import adminStaffHome from "../views/sys/adminStaffHome"
import adminStaffInformation from "../views/sys/adminStaffInformation"
import adminStaffSet from "../views/sys/adminStaffSet"
import adminConsumption from "../views/sys/adminConsumption"
import adminStaffConsumption from "../views/sys/adminStaffConsumption"
import adminNoSign from "../views/sys/adminNoSign"
import adminUserQuery from "../views/sys/adminUserQuery"
import Care_score from "../views/sys/Care_score"
import Recharge_integral from "../views/sys/Recharge_integral"
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '*',
      redirect:'/Login'
    },
    {
      path: '/Index',
      component: Index
    },
    {
      path: '/sys/adminInvoice',
      component: adminInvoice
    },
    {
      path: '/sys/adminUserQuery',
      component: adminUserQuery
    },
    {
      path: '/sys/Care_score',
      component: Care_score
    },
    {
      path: '/sys/adminStaffHome',
      component: adminStaffHome
    },
    {
      path: '/sys/adminStaffInformation',
      component: adminStaffInformation
    },
    {
      path: '/sys/adminStaffSet',
      component: adminStaffSet
    },
    {
      path: '/sys/Recharge_integral',
      component: Recharge_integral
    },
    {
      path: '/sys/adminNoSign',
      component: adminNoSign
    },
    {
      path: '/sys/adminStaffConsumption',
      component: adminStaffConsumption
    },
    {
      path: '/sys/adminRecharge',
      component: adminRecharge
    },
    {
      path: '/sys/adminEnterpriseScore',
      component: adminEnterpriseScore
    },
    {
      path: '/sys/adminConsumption',
      component: adminConsumption
    },
    {
      path: '/sys/adminConsumptionAmount',
      component: adminConsumptionAmount
    },
    {
      path: '/sys/adminConsumptionOrder',
      component: adminConsumptionOrder
    },
    {
      path: '/sys/adminCare_score_content',
      component: adminCare_score_content
    },
    {
      path: '/sys/adminConsumptionProject',
      component: adminConsumptionProject
    },
    {
      path: '/sys/adminEditStaffForm',
      component: adminEditStaffForm
    },
    {
      path: '/sys/adminInvoice_record',
      component: adminInvoice_record
    },
    {
      path: '/sys/adminAllStaff',
      component: adminAllStaff
    },
    {
      path: '/sys/adminExportFile',
      component: adminExportFile
    },
    {
      path: '/sys/adminStaff',
      component: adminStaff
    },
    {
      path: '/sys/adminSign',
      component: adminSign
    },
    {
      path: '/sys/adminEmployeeScore',
      component: adminEmployeeScore
    },
    {
      path: '/sys/adminInvoice_Setting',
      component: adminInvoice_Setting
    },
    {
      path: '/sys/adminEditStaff',
      component: adminEditStaff
    },
    {
      path: '/sys/adminOrga',
      component: adminOrga
    },
    {
      path: '/sys/adminRole',
      component: adminRole
    },
    {
      path: '/Login',
      component: Login
    },
    {
      path: '/Home',
      component: Home
    }
  ]
})
