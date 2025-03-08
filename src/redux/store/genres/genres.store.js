import Service from "../../../api/api-service";
import { ApiUrl } from "../../../api/api-url";

const service = new Service();

export const GetAll = (data) => {
    const params = new URLSearchParams();

    data.pageIndex && params.append('pageIndex', data.pageIndex);
    data.pageSize && params.append('pageSize', data.pageSize);
    data.sorting && params.append('sorting', data.sorting);
    data.name && params.append('name', data.name);

    return service.get(ApiUrl.Genres_GetAll, params)
        .then(res => { return res })
        .catch(err => { throw err });
}

export const CreateGenres = (body) => {
    return service.post(ApiUrl.Genres_Create, body)
        .then(res => { return res })
        .catch(err => { throw err });
}

export const UpdateGenres = (body) => {
    return service.post(ApiUrl.Genres_Update, body)
        .then(res => { return res })
        .catch(err => { throw err });
}

export const DeleteGenres = (id) => {
    return service.delete(ApiUrl.Genres_Delete(id))
        .then(res => { return res })
        .catch(err => { throw err });
}

export const GetDetailGenres = (id) => {
    return service.get(ApiUrl.Genres_GetDetail(id))
        .then(res => { return res })
        .catch(err => { throw err });
}

export const GetLookupGenres = () => {
    return service.get(ApiUrl.Genres_GetLookup)
        .then(res => { return res })
        .catch(err => { throw err });
}