import Service from "../../../api/api-service";
import { ApiUrl } from "../../../api/api-url";

const service = new Service();

export const GetAll = (data) => {
    const params = new URLSearchParams();

    data.pageIndex && params.append('pageIndex', data.pageIndex);
    data.pageSize && params.append('pageSize', data.pageSize);
    data.sorting && params.append('sorting', data.sorting);
    data.name && params.append('name', data.name);

    return service.get(ApiUrl.Camera_GetAll, params)
        .then(res => { return res })
        .catch(err => { throw err });
}

export const CreateCamera = (body) => {
    return service.post(ApiUrl.Camera_Create, body)
        .then(res => { return res })
        .catch(err => { throw err });
}

export const UpdateCamera = (body) => {
    return service.post(ApiUrl.Camera_Update, body)
        .then(res => { return res })
        .catch(err => { throw err });
}

export const DeleteCamera = (id) => {
    return service.delete(ApiUrl.Camera_Delete(id))
        .then(res => { return res })
        .catch(err => { throw err });
}

export const GetDetailCamera = (id) => {
    return service.get(ApiUrl.Camera_GetDetail(id))
        .then(res => { return res })
        .catch(err => { throw err });
}

export const GetLookupCamera = () => {
    return service.get(ApiUrl.Camera_GetLookup)
        .then(res => { return res })
        .catch(err => { throw err });
}