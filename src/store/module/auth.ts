import { defineStore } from 'pinia'
import AuthController from '../../service/AuthController.js'
import {router} from "@/router";
import StoreUtils from '@/util/storeUtils.js';
import {LoginResponse} from "@/models/response/auth/LoginResponse.ts";

export type AuthType = {
    loading: boolean,
    data: any[],
    userInfo: LoginResponse,
    enrolmentStage:'1'|'2',
    passwordResetStage:'1'|'2',
    sessionExpired:boolean
}
export const useAuthStore = defineStore('auth_store', {
    state: (): AuthType => ({
        loading: false,
        data:[] as any[],
        userInfo:{} as LoginResponse,
        enrolmentStage:'1',
        passwordResetStage:'1',
        sessionExpired:false
    }),

    getters: {
        getData:state => state.data,
        getUserInfo:state => state.userInfo,
        getLoading: state => state.loading,
        getEnrolmentStage: state => state.enrolmentStage,
        getPasswordResetStage: state => state.passwordResetStage,
        getSessionExpired:state => state.sessionExpired
    },

    actions: {
        commitSessionStory(payload:any){
            this.sessionExpired = payload
        },

        async initiateEnrolment(payload:any, toast:any){
            const response = await AuthController.initiateEnrolment(payload)
            const responseData = response.data
            try{
                if(responseData.responseCode === '00'){
                    this.enrolmentStage = '2'
                    console.log(responseData)
                }else{
                    toast.error(responseData.responseMessage, { position: 'top-right', timeout: 3000 })
                }
            }catch(e){}
        },

        async completeEnrolment(payload:any, toast:any){
            const response = await AuthController.completeEnrolment(payload)
            const responseData = response.data


            try{
                if(responseData.responseCode === '00'){
                    toast.success(responseData.responseMessage, { position: 'top-right', timeout: 3000 })
                    setTimeout(()=> {
                        router.push({path:'/login'})
                    },3000)
                }else{
                    toast.error(responseData.responseMessage, { position: 'top-right', timeout: 3000 })
                }
            }catch(e){}
        },

        async login(payload:any, toast:any){
            const response = await AuthController.login(payload)
            const responseData = response.data
            const redirectRoute = router.currentRoute.value.query.redirectFrom
            console.log(redirectRoute)
            sessionStorage.setItem('token', responseData.token)
            try{
                if(responseData.responseCode === '00'){
                    this.userInfo = responseData
                    await router.push({path: JSON.stringify(router.currentRoute.value.query.redirectFrom) ? JSON.stringify(router.currentRoute.value.query.redirectFrom) : '/dashboard'})
                    StoreUtils.getter()?.organisation.readCustomerOrganisation(responseData.userId)
                }else{
                    toast.error(responseData.responseMessage, { position: 'top-right', timeout: 3000 })
                }
            }catch(e){}
            
        },

        async initiatePasswordReset(payload:any, toast:any){
            const response = await AuthController.initiatePasswordReset(payload)
            const responseData = response.data

            try{
                if(responseData.responseCode === '00'){
                    this.passwordResetStage = '2'
                    console.log(responseData)
                }else{
                    toast.error(responseData.responseMessage, { position: 'top-right', timeout: 3000 })
                }
            }catch(e){}
        },

        async completePasswordReset(payload:any, toast:any){
            const response = await AuthController.completePasswordReset(payload)
            const responseData = response.data

            try{
                if(responseData.responseCode === '00'){
                    toast.success(responseData.responseMessage, { position: 'top-right', timeout: 3000 })
                    location.href='/login'
                }else{
                    toast.error(responseData.responseMessage, { position: 'top-right', timeout: 3000 })
                }
            }catch(e){}
        },

        async userDetails(toast:any){
            const response = await AuthController.userDetails()
            const responseData = response.data

            try{
                if(responseData.responseCode === '00'){
                    this.userInfo = responseData
                    console.log(this.userInfo)
                }else if(responseData.responseCode === '22'){
                    toast.error('Session Expired', {
                        action: {
                          func: () => new Promise(async () => {
                             sessionStorage.removeItem('token')
                             await router.push({path:'/login'})
                          }),
                          text: 'Login Again',
                        }
                      })
                    this.sessionExpired = true
                
                }
                else{
                    toast.error(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })
                }
            }catch(e){}
        }
    }
})