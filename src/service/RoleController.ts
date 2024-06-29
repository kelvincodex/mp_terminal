import { apiClient } from "./BaseService.js"
export default {
    readRoles(){
        return apiClient.appClient.get(`/dev/role/read`)
    },

    createRole(){
        return apiClient.appClient.get(`/dev/role/create`)
    },

    deleteRole(){
        return apiClient.appClient.get(`/dev/role/delete`)
    },

    updateeRole(){
        return apiClient.appClient.get(`/dev/role/update`)
    },
    
}