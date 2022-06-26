import Vue from "vue";
import VueRouter from "vue-router";
import '@mdi/font/css/materialdesignicons.css'

Vue.use(VueRouter);

function importComponent(path) {
    return () => import(`./components/${path}.vue`);
}

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/",
            component: importComponent("Home"),
            name: "Home",
            meta: { title: "Home" },
        },
        {
            path: "/login",
            component: importComponent("Login"),
            name: "Login",
            meta: { title: "Login" },
        },
        {
          path: "/register",
          component: importComponent("Register"),
          name: "Register",
          meta: { title: "Register" },
        },
        {
            path: "/profile",
            component: importComponent("Profile"),
            name: "Profile",
            meta: { title: "Profile" },
        },
        {
            path: "/editprofile",
            component: importComponent("EditProfile"),
            name: "EditProfile",
            meta: { title: "EditProfile" },
        },
        {
            path: "/ordermobil",
            component: importComponent("OrderMobil"),
            name: "OrderMobil",
            meta: { title: "OrderMobil" },
        },
        {
            path: "/trackoder",
            component: importComponent("TrackOrder"),
            name: "TrackOrder",
            meta: { title: "TrackOrder" },
        },
        {
            path: "/cs",
            name: "CS",
            meta: { title: "CS" },
            component: importComponent("CS/DashboardLayout"),
            children: [
                //Dashboard
                {
                    path: "/dashboardcs",
                    name: "CS | Dashboard",
                    meta: { title: "Dashboardcs" },
                    component: importComponent("CS/Dashboardcs"),
                },

                {
                    path: "/datatransaksi",
                    name: "CS | Data Transaksi",
                    meta: { title: "Data Transaksi" },
                    component: importComponent("CS/DataTransaksi"),
                },

            ],
        },
        {
            path: "/manager",
            name: "Manager",
            meta: { title: "Manager" },
            component: importComponent("Manager/DashboardLayout"),
            children: [
                //Dashboard
                {
                    path: "/dashboardman",
                    name: "Manager | Dashboard",
                    meta: { title: "Dashboardman" },
                    component: importComponent("Manager/Dashboardman"),
                },

                {
                    path: "/jadwal",
                    name: "Manager | Jadwal",
                    meta: { title: "Jadwal" },
                    component: importComponent("Manager/Jadwal"),
                },

                {
                    path: "/promo",
                    name: "Manager | Promo",
                    meta: { title: "Promo" },
                    component: importComponent("Manager/Promo"),
                },

            ],
        },
        {
            path: "/admin",
            name: "Admin",
            meta: { title: "Admin" },
            component: importComponent("Admin/DashboardLayout"),
            children: [
                //Dashboard
                {
                    path: "/dashboardadm",
                    name: "Admin | Dashboard",
                    meta: { title: "Dashboard" },
                    component: importComponent("Admin/Dashboardadm"),
                },

                {
                    path: "/datapeg",
                    name: "Admin | DataPeg",
                    meta: { title: "DataPeg" },
                    component: importComponent("Admin/DataPeg"),
                },

                {
                    path: "/mobil",
                    name: "Admin | Mobil",
                    meta: { title: "Mobil" },
                    component: importComponent("Admin/Mobil"),
                },

                {
                    path: "/driver",
                    name: "Admin | Driver",
                    meta: { title: "Driver" },
                    component: importComponent("Admin/Driver"),
                },

                
                {
                    path: "/mitra",
                    name: "Admin | Mitra",
                    meta: { title: "Mitra" },
                    component: importComponent("Admin/Mitra"),
                },
            ],
        },
        
        // {
        //     path: "/cek/:email/:password/:date",
        //     component: importComponent("CekEmail"),
        //     name: "CekEmail",
        //     meta: { title: "CekEmail" },
        // },
        {
            path: "*",
            name: "Not Found",
            component: importComponent("404"),
        },
    ],
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next();
});

export default router;