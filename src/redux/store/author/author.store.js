import Service from "../../../api/api-service";
import { ApiUrl } from "../../../api/api-url";

const service = new Service();

export const GetAll = (data) => {
    const params = new URLSearchParams();

    data.pageIndex && params.append('pageIndex', data.pageIndex);
    data.pageSize && params.append('pageSize', data.pageSize);
    data.sorting && params.append('sorting', data.sorting);
    data.name && params.append('name', data.name);

    return service.get(ApiUrl.Author_GetAll, params)
        .then(res => { return res })
        .catch(err => { throw err });
}

export const CreateAuthor = (body) => {
    return service.post(ApiUrl.Author_Create, body)
        .then(res => { return res })
        .catch(err => { throw err });
}

export const UpdateAuthor = (body) => {
    return service.post(ApiUrl.Author_Update, body)
        .then(res => { return res })
        .catch(err => { throw err });
}

export const DeleteAuthor = (id) => {
    return service.delete(ApiUrl.Author_Delete(id))
        .then(res => { return res })
        .catch(err => { throw err });
}

export const GetDetailAuthor = (id) => {
    return service.get(ApiUrl.Author_GetDetail(id))
        .then(res => { return res })
        .catch(err => { throw err });
}