import { defineStore } from 'pinia'
import {OrganisationController} from "@/service/OrganisationController.ts";
import { currentOrganisation } from '@/models/response/organisation/CurrentOrganisation';
export const useOrganisationStore = defineStore('organisation_Store', {
    state: () => ({
        loading: false,
        organisations:null,
        currentOrganisation:{} as currentOrganisation
    }),

    getters: {
        getOrganisation:state => state.organisations,
        getLoading: state => state.loading,
        getCurrentOrganisation:state => state.currentOrganisation
    },

    actions: {
        async readCustomerOrganisation(payload:any){
            const response = await OrganisationController.readOrganisation(payload)
            const responseData = response.data

            try{
                if(responseData.responseCode === '00'){
                    this.organisations= responseData.data
                    this.currentOrganisation = responseData.data[0]
                    console.log(responseData)
                }else{
                    console.log(responseData.responseCode)
                }
            }catch(e){}
        },

        async createOrganisation(payload:any, toast:any){
            const response = await OrganisationController.createOrganisation(payload)
            const responseData = response.data
            try{
                if(responseData.responseCode === '00'){
                    toast.success(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })

                }else{
                    toast.error(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })
                }
            }catch(e){}
        },


    }
})