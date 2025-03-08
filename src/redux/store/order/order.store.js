import Service from "../../../api/api-service";
import { ApiUrl } from "../../../api/api-url";

const service = new Service();

export const GetAll = (data) => {
    const params = new URLSearchParams();

    data.pageIndex && params.append('pageIndex', data.pageIndex);
    data.pageSize && params.append('pageSize', data.pageSize);
    data.sorting && params.append('sorting', data.sorting);
    data.code && params.append('Code', data.code);
    data.userId && params.append('UserId', data.userId);
    data.fromDate && params.append('fromDate', data.fromDate);
    data.toDate && params.append('toDate', data.toDate);

    return service.get(ApiUrl.Order_GetAll, params)
        .then(res => { return res })
        .catch(err => { throw err });
}

export const CreateOrder = (body) => {
    return service.post(ApiUrl.Order_Create, body)
        .then(res => { return res })
        .catch(err => { throw err });
}

export const UpdateOrder = (body) => {
    return service.post(ApiUrl.Order_Update, body)
        .then(res => { return res })
        .catch(err => { throw err });
}

export const DeleteOrder = (id) => {
    return service.delete(ApiUrl.Order_Delete(id))
        .then(res => { return res })
        .catch(err => { throw err });
}

export const GetDetailOrder = (id) => {
    return service.get(ApiUrl.Order_GetDetail(id))
        .then(res => { return res })
        .catch(err => { throw err });
}

export const GetLookupOrder = () => {
    return service.get(ApiUrl.Order_GetLookup)
        .then(res => { return res })
        .catch(err => { throw err });
}

export const GetAllVideo = (data) => {
    const params = new URLSearchParams();

    data.pageIndex && params.append('pageIndex', data.pageIndex);
    data.pageSize && params.append('pageSize', data.pageSize);
    data.sorting && params.append('sorting', data.sorting);
    data.code && params.append('OrderCode', data.code);

    return service.get(ApiUrl.Video_GetAll, params)
        .then(res => { return res })
        .catch(err => { throw err });
}

export const UpdateOrderStatus = (body) => {
    return service.post(ApiUrl.UpdateOrderStatus, body)
        .then(res => { return res })
        .catch(err => { throw err });
}
