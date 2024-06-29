import { apiClient } from "./BaseService.ts"
export  class  TerminalController {
    static readTerminals(){
        return apiClient.appClient.get(`/dev/terminal/read`)
    }

    static createTerminal(payload:{}){
        return apiClient.appClient.post('/dev/terminal/create', payload)
    }

    static updateTerminal(payload:{}){
        return apiClient.appClient.post('/dev/terminal/update', payload)
    }

    static readOrganisationTerminal(payload: string){
        return apiClient.appClient.get(`/dev/terminal/read-by-terminal-organization-id/${payload}`)
    }

    static deleteTerminal(payload: {}){
        return apiClient.appClient.post(`/dev/terminal/delete`, payload)
    }
    
}