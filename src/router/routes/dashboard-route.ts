import {RouteConstantUtil} from "../../util/constant/RouteConstantUtil.ts";
import {BaseRouteProps} from "./base-route.ts";
export const dashboardRoute: BaseRouteProps[] = [
    {
        name: RouteConstantUtil.dashboard.homePage,
        path: '/dashboard',
        component: () => import("@/view/dashboard/HomePageView.vue"),
        meta: {authRequired:RouteConstantUtil.dashboard.authRequired, layout:'dashboard', sub_title:'Track, manage your transactions in real time!'},
    },
    {
        name: RouteConstantUtil.dashboard.terminalPage,
        path: '/terminals',
        component: () => import("@/view/dashboard/TerminalsView.vue"),
        meta: {authRequired:RouteConstantUtil.dashboard.authRequired, layout:'dashboard', sub_title:'Track, manage your terminals in real time!'},
    },
    {
        name: RouteConstantUtil.dashboard.transactions,
        path: '/transactions',
        component: () => import("@/view/dashboard/TransactionsView.vue"),
        meta: {authRequired:RouteConstantUtil.dashboard.authRequired, layout:'dashboard', sub_title:'Track, Manage your transactions in real time!'},
    },
    {
        name: RouteConstantUtil.dashboard.merchants,
        path: '/merchants',
        component: () => import("@/view/dashboard/MerchantView.vue"),
        meta: {authRequired:RouteConstantUtil.dashboard.authRequired, layout:'dashboard', sub_title:'Track, Manage merchants!'},
    },
    {
        name: RouteConstantUtil.dashboard.charges,
        path: '/charges',
        component: () => import("@/view/dashboard/ManageCharges.vue"),
        meta: {authRequired:RouteConstantUtil.dashboard.authRequired, layout:'dashboard', sub_title:'Track, Manage charges!'},
    },

]