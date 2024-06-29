import { apiClient } from "./BaseService.js"
export default {
    readUsers(){
        return apiClient.appClient.get(`/dev/user/read`)
    },

    readByUsersID(payload:string){
        return apiClient.appClient.get(`/dev/user/read-by-user-id/${payload}`)
    },

    createUsers(payload:any){
        return apiClient.appClient.post(`/dev/user/create`, payload)
    },
    
}