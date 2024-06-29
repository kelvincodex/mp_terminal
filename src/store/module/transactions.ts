import { defineStore } from 'pinia'
import TransactionsController from "@/service/TransactionsController"

export const useTransactionStore = defineStore('transaction_Store', {
    state: () => ({
        loading: false,
        transactions:null,
    }),

    getters: {
        getTransactions:state => state.transactions,
        getLoading: state => state.loading,
    },

    actions: {

    
        async readCustomerOrganisationTransactions(){
            const response = await TransactionsController.readTransactions()
            const responseData = response.data

            try{
                if(responseData.responseCode === '00'){
                    this.transactions= responseData.data
                    console.log(responseData)
                }else{
                    console.log(responseData.responseCode)
                }
            }catch(e){}
        },



    }
})