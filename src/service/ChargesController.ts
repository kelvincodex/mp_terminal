import { apiClient } from "./BaseService.ts"
export  class  ChargesController {
    static readCharges(){
        return apiClient.appClient.get(`/dev/pricing/read`)
    }

    static createCharges(payload:{}){
        return apiClient.appClient.post('/dev/pricing/create', payload)
    }

    static deleteCharges(payload:{}){
        return apiClient.appClient.post('/dev/pricing/delete', payload)
    }

    static updateCharges(payload:{}){
        return apiClient.appClient.post('/dev/pricing/update', payload)
    }
    
}