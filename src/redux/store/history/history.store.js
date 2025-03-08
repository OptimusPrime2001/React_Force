import Service from "../../../api/api-service";
import { ApiUrl } from "../../../api/api-url";

const service = new Service();

export const GetAll = (data) => {
    const params = new URLSearchParams();

    data.pageIndex && params.append('pageIndex', data.pageIndex);
    data.pageSize && params.append('pageSize', data.pageSize);
    data.sorting && params.append('sorting', data.sorting);
    data.name && params.append('name', data.name);

    return service.get(ApiUrl.History_GetAll, params)
        .then(res => { return res })
        .catch(err => { throw err });
}

export const CreateHistory = (body) => {
    return service.post(ApiUrl.History_Create, body)
        .then(res => { return res })
        .catch(err => { throw err });
}

export const UpdateHistory = (body) => {
    return service.post(ApiUrl.History_Update, body)
        .then(res => { return res })
        .catch(err => { throw err });
}

export const DeleteHistory = (id) => {
    return service.delete(ApiUrl.History_Delete(id))
        .then(res => { return res })
        .catch(err => { throw err });
}

export const GetDetailHistory = (id) => {
    return service.get(ApiUrl.History_GetDetail(id))
        .then(res => { return res })
        .catch(err => { throw err });
}