import axios from "axios";
import appConfig from "../config/app-config"

export const appClient = axios.create({
    baseURL: appConfig.baseUrl,
    withCredentials: false,
    headers: {
         Accept: "application/json",
        // "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
    }
});
export const appClient1 = axios.create({
    baseURL: appConfig.baseUrl,
    withCredentials: false,
    headers: {
         //Accept: "application/json",
        // "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
    }
});


appClient.interceptors.request.use(config => {
    config.headers.Authorization = sessionStorage.token;
        console.log(config.headers.Authorization)
    // !localStorage.organisationId ?
    // config.headers.mid = localStorage.customerId
    // :
    // config.headers.mid = localStorage.organisationId
    return config
})

appClient.interceptors.response.use(response => {
    if (response != null) {
        if (response.data != null) {
            if (response.data.responseCode === '22') {
                console.log(response.data)
                // StoreUtils.getter().auth.commitSessionStory(true)
                // sessionStorage.removeItem('token')
                // localStorage.clear();
                // let timerInterval
                // if (router.currentRoute.meta.layout !== "auth"){
                //     isTimedOut = true
                //     localStorage.clear()
                //     StoreUtils.dispatch(StoreUtils.actions.auth.logOut,{customerEmail: StoreUtils.rootGetters(StoreUtils.getters.auth.getUserInfo).customerEmail}).then()
                //     // Swal.fire({
                //     //   title: 'Session timed out',
                //     //   html: 'Please re-authenticate',
                //     //   icon:"info",
                //     // })
                //     //     .then((result) => {
                //     // })
                // }
            }
        }
    }
    return response
});


export const apiClient = {
    appClient: appClient,
    appClient1: appClient1
}
  