import Users from "../../assets/icon/sidebar-icon/users.svg"
import Setting from "../../assets/icon/sidebar-icon/settings.svg"
import Dashboard from "../../assets/icon/sidebar-icon/bar-chart-2.svg"
import Card from "../../assets/icon/sidebar-icon/card.svg"
import Logout from "../../assets/icon/sidebar-icon/Button.svg"
import ManageCharges from "../../assets/icon/sidebar-icon/check-square.svg"
import Logs from "../../assets/icon/sidebar-icon/DocumentAlignLeft.svg"
import Terminal from "../../assets/icon/sidebar-icon/Situation.svg"
import Support from "../../assets/icon/sidebar-icon/Happy.svg"
import Merchant from "../../assets/icon/sidebar-icon/bank.svg"







export const  SidebarTopUtils = [

    {name:"Dashboard", icon:Dashboard, active:'active-nav', route:'/dashboard'},
    {name:"Transaction", icon:Card,active:'active-nav', route:'/transactions'},
    {name:"Organizations", icon:Merchant,active:'active-nav', route:'/merchants'},
    {name:"Terminals", icon:Terminal,active:'active-nav', route:'/terminals'},
    {name:"Manage Charges", icon:ManageCharges,active:'active-nav', route:'/charges'},
    {name:"Users", icon:Users,active:'active-nav', route:'/users'},
    {name:"Logs", icon:Logs,active:'active-nav', route:'#'},

]

export const  SidebarBottomUtils = [

    {name:"Support", icon:Support,active:'active-nav', route:'#'},
    {name:"Settings", icon:Setting,active:'active-nav', route:'#'},
    {name:"Log out", icon:Logout,active:'active-nav', route:'/'},

]
