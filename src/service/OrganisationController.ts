import { apiClient } from "./BaseService.ts"

export const OrganisationController = {
    readOrganisation(organisationCustomerId: string){
        return apiClient.appClient.get(`/dev/organisation/read-by-organisation-customer-id/${organisationCustomerId}`)
    },

    createOrganisation(payload:any){
        return apiClient.appClient.post(`/dev/organisation/create`, payload)
    },
    
}