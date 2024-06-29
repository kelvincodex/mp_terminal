import { defineStore } from 'pinia'
import {TerminalController} from "@/service/TerminalController.ts";
import StoreUtils from '@/util/storeUtils';

export type TerminalStoreState = {
    loading: boolean,
    terminalOrganisations: null
}

export const useTerminalStore = defineStore('terminal_store', {
    state: ():TerminalStoreState  => ({
        loading: false,
        terminalOrganisations: null,
    }),

    getters: {
        getTerminalOrganisations:state => state.terminalOrganisations,
        getLoading: state => state.loading,
    },

    actions: {
        async getOrganisationTerminal(payload: string){
            const response = await TerminalController.readOrganisationTerminal(payload)
            const responseData = response.data
            try{
                if(responseData.responseCode === '00'){
                    this.terminalOrganisations= responseData.data
                }else{
                    console.log(responseData)
                }
            }catch(e){
                console.log('readOrganizationTerminal error', e)
            }
        },

        async createNewTerminal(payload:any, toast:any){
            const response = await TerminalController.createTerminal(payload)
            const responseData = response.data
            console.log('readOrganizationTerminal', response)

            try{
                if(responseData.responseCode === '00'){
                    toast.success(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })
                    StoreUtils.getter()?.terminal.getOrganisationTerminal(payload.terminalOrganisationId)
                }else{
                    console.log(responseData)
                    toast.error(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })

                }
            }catch(e){
                console.log('readOrganizationTerminal error', e)
            }
        },

        async updateTerminal(payload:any, toast:any){
            const response = await TerminalController.updateTerminal(payload)
            const responseData = response.data

            try{
                if(responseData.responseCode === '00'){
                    toast.success(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })
                    StoreUtils.getter()?.terminal.getOrganisationTerminal(payload.terminalOrganisationId)
                }else{
                    console.log(responseData)
                    toast.error(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })

                }
            }catch(e){
                console.log('readOrganizationTerminal error', e)
            }
        },

        async deleteTerminal(payload:{}, toast:any){
            const response = await TerminalController.deleteTerminal(payload)
            const responseData = response.data

            try{
                if(responseData.responseCode === '00'){
                    toast.success(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })
                }else{
                    console.log(responseData)
                    toast.error(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })

                }
            }catch(e){
                console.log('readOrganizationTerminal error', e)
            }
        },

    }
})