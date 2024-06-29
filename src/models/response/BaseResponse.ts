export type BaseResponse<payload=any>  = {
    responseCode: string,
    responseMessage: string
    data: payload
}