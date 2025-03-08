import Service from "../../../api/api-service";
import { ApiUrl } from "../../../api/api-url";

const service = new Service();

export const GetQr = () => {
    return service.post('api/Account/GetQR').then((res) => { return res }).catch((err) => { throw err })
}

export const GetQrByScanner = (id) => {
    return service.post(`api/cms/Desk/GetEndOrderQR?id=${id}`).then((res) => { return res }).catch((err) => { throw err })
}


export const ChangeSecretKey = (body) => {
    return service.post('api/Account/ChangeSecretKey',body).then((res) => { return res }).catch((err) => { throw err })
}
