import Service from "../../../api/api-service";
import { ApiUrl } from "../../../api/api-url";

const service = new Service();

export const GetAll = (data) => {
    const params = new URLSearchParams();

    data.pageIndex && params.append('pageIndex', data.pageIndex);
    data.pageSize && params.append('pageSize', data.pageSize);
    data.sorting && params.append('sorting', data.sorting);
    data.name && params.append('name', data.name);

    return service.get(ApiUrl.Playlist_GetAll, params)
        .then(res => { return res })
        .catch(err => { throw err });
}

export const CreatePlaylist = (body) => {
    return service.post(ApiUrl.Playlist_Create, body)
        .then(res => { return res })
        .catch(err => { throw err });
}

export const UpdatePlaylist = (body) => {
    return service.post(ApiUrl.Playlist_Update, body)
        .then(res => { return res })
        .catch(err => { throw err });
}

export const DeletePlaylist = (id) => {
    return service.delete(ApiUrl.Playlist_Delete(id))
        .then(res => { return res })
        .catch(err => { throw err });
}

export const GetDetailPlaylist = (id) => {
    return service.get(ApiUrl.Playlist_GetDetail(id))
        .then(res => { return res })
        .catch(err => { throw err });
}