import Login from "./auth/Login";
import Landing from "./landing/Landing";
import RedirectLogin from "./utils/RedirectLogin";
import Logs from "./pages/modules/logs/Logs";
import Users from "./pages/modules/users/Users";
import Dashboard from "./pages/home/Dashboard";
import Products from "./pages/modules/products/Products";
import Shipments from "./pages/modules/shipments/Shipments";
import Packages from "./pages/modules/packages/Packages";
import PackageTypes from "./pages/modules/packages-type/PackageTypes";
import Employees from "./pages/modules/employees/Employees";
import Customers from "./pages/modules/customers/Customers";

const routePath = [
   
    // {path: '/component/landing', component: Landing, esAdmin: true},
    // {path: '/component/login', component: Login},
    // {path: '/', component: Home}
    
    {path: '/dashboard', component: Dashboard, esAdmin: true},
    {path: '/products', component: Products, esAdmin: true},
    {path: '/users', component: Users, esAdmin: true},
    {path: '/employees', component: Employees, esAdmin: true},
    {path: '/customers', component: Customers, esAdmin: true},
    {path: '/packages', component: Packages, esAdmin: true},
    {path: '/package-types', component: PackageTypes, esAdmin: true},
    {path: '/shipments', component: Shipments, esAdmin: true},
    

    {path: '/logs', component: Logs, esAdmin: true},
    // {path:'/config', component: Configurations, esAdmin: true},

];
const routeNoAuthentication = [   

    {path: '/login', component: Login },
    // {path: '*', component: RedirectLogin}

];

const routes = [
    ...routePath,
    ...routeNoAuthentication
];


export { routes as default, routePath, routeNoAuthentication };
