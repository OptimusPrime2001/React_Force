import Service from "../../../api/api-service";
import { ApiUrl } from "../../../api/api-url";

const service = new Service();

export const GetAll = (data) => {
    const params = new URLSearchParams();

    data.pageIndex && params.append('pageIndex', data.pageIndex);
    data.pageSize && params.append('pageSize', data.pageSize);
    data.sorting && params.append('sorting', data.sorting);
    data.name && params.append('name', data.name);

    return service.get(ApiUrl.SoundEffect_GetAll, params)
        .then(res => { return res })
        .catch(err => { throw err });
}

export const CreateSoundEffect = (body) => {
    return service.post(ApiUrl.SoundEffect_Create, body)
        .then(res => { return res })
        .catch(err => { throw err });
}

export const UpdateSoundEffect = (body) => {
    return service.post(ApiUrl.SoundEffect_Update, body)
        .then(res => { return res })
        .catch(err => { throw err });
}

export const DeleteSoundEffect = (id) => {
    return service.delete(ApiUrl.SoundEffect_Delete(id))
        .then(res => { return res })
        .catch(err => { throw err });
}

export const GetDetailSoundEffect = (id) => {
    return service.get(ApiUrl.SoundEffect_GetDetail(id))
        .then(res => { return res })
        .catch(err => { throw err });
}

export const GetLookupSoundEffect = () => {
    return service.get(ApiUrl.SoundEffect_GetLookup)
        .then(res => { return res })
        .catch(err => { throw err });
}