import Service from "../../../api/api-service";
import { ApiUrl } from "../../../api/api-url";

const service = new Service();

export const GetAll = (data) => {
    const params = new URLSearchParams();

    data.pageIndex && params.append('pageIndex', data.pageIndex);
    data.pageSize && params.append('pageSize', data.pageSize);
    data.sorting && params.append('sorting', data.sorting);
    data.name && params.append('name', data.name);

    return service.get(ApiUrl.Track_GetAll, params)
        .then(res => { return res })
        .catch(err => { throw err });
}

export const CreateTrack = (body) => {
    return service.post(ApiUrl.Track_Create, body)
        .then(res => { return res })
        .catch(err => { throw err });
}

export const UpdateTrack = (body) => {
    return service.post(ApiUrl.Track_Update, body)
        .then(res => { return res })
        .catch(err => { throw err });
}

export const DeleteTrack = (id) => {
    return service.delete(ApiUrl.Track_Delete(id))
        .then(res => { return res })
        .catch(err => { throw err });
}

export const GetDetailTrack = (id) => {
    return service.get(ApiUrl.Track_GetDetail(id))
        .then(res => { return res })
        .catch(err => { throw err });
}