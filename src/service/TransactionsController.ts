import { apiClient } from "./BaseService.ts"
export default {
    readTransactions(){
        return apiClient.appClient.get(`/dev/transaction/read`)
    },
    
}