import Service from "../../../api/api-service";
import { ApiUrl } from "../../../api/api-url";

const service = new Service();

export const GetAll = (data) => {
    const params = new URLSearchParams();

    data.pageIndex && params.append('pageIndex', data.pageIndex);
    data.pageSize && params.append('pageSize', data.pageSize);
    data.sorting && params.append('sorting', data.sorting);
    data.name && params.append('Name', data.name);

    return service.get(ApiUrl.Scanner_GetAll, params)
        .then(res => { return res })
        .catch(err => { throw err });
}

export const CreateScanner = (body) => {
    return service.post(ApiUrl.Scanner_Create, body)
        .then(res => { return res })
        .catch(err => { throw err });
}

export const UpdateScanner = (body) => {
    return service.post(ApiUrl.Scanner_Update, body)
        .then(res => { return res })
        .catch(err => { throw err });
}

export const DeleteScanner = (id) => {
    return service.delete(ApiUrl.Scanner_Delete(id))
        .then(res => { return res })
        .catch(err => { throw err });
}

export const GetDetailScanner = (id) => {
    return service.get(ApiUrl.Scanner_GetDetail(id))
        .then(res => { return res })
        .catch(err => { throw err });
}

export const GetLookupScanner = () => {
    return service.get(ApiUrl.Scanner_GetLookup)
        .then(res => { return res })
        .catch(err => { throw err });
}