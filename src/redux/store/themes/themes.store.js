import Service from "../../../api/api-service";
import { ApiUrl } from "../../../api/api-url";

const service = new Service();

export const GetAll = (data) => {
    const params = new URLSearchParams();

    data.pageIndex && params.append('pageIndex', data.pageIndex);
    data.pageSize && params.append('pageSize', data.pageSize);
    data.sorting && params.append('sorting', data.sorting);
    data.name && params.append('name', data.name);

    return service.get(ApiUrl.Themes_GetAll, params)
        .then(res => { return res })
        .catch(err => { throw err });
}

export const CreateThemes = (body) => {
    return service.post(ApiUrl.Themes_Create, body)
        .then(res => { return res })
        .catch(err => { throw err });
}

export const UpdateThemes = (body) => {
    return service.post(ApiUrl.Themes_Update, body)
        .then(res => { return res })
        .catch(err => { throw err });
}

export const DeleteThemes = (id) => {
    return service.delete(ApiUrl.Themes_Delete(id))
        .then(res => { return res })
        .catch(err => { throw err });
}

export const GetDetailThemes = (id) => {
    return service.get(ApiUrl.Themes_GetDetail(id))
        .then(res => { return res })
        .catch(err => { throw err });
}

export const GetLookupThemes = () => {
    return service.get(ApiUrl.Themes_GetLookup)
        .then(res => { return res })
        .catch(err => { throw err });
}