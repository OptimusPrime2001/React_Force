import Service from "../../../api/api-service";
import { ApiUrl } from "../../../api/api-url";

const service = new Service();

export const GetTopUser = (data) => {
    const params = new URLSearchParams();

    // params.append('isWeek', true)
    data.isYear && params.append('isYear', data.isYear);
    data.isWeek && params.append('isWeek', data.isWeek);
    data.isMonth && params.append('isMonth', data.isMonth);
    if (data.isfromTo && data.fromDate && data.toDate) {
        params.append('isfromTo', data.isfromTo);
        params.append('fromDate', data.fromDate);
        params.append('toDate', data.toDate);
    }

    return service.get(ApiUrl.GetTopUser, params)
        .then(res => { return res })
        .catch(err => { throw err });
}

export const GetAllReport = (data) => {
    const params = new URLSearchParams();
    
    // params.append('isWeek', true)
    data.userId && params.append('UserId', data.userId);
    data.isYear && params.append('isYear', data.isYear);
    data.isWeek && params.append('isWeek', data.isWeek);
    data.isMonth && params.append('isMonth', data.isMonth);
    if (data.isfromTo && data.fromDate && data.toDate) {
        params.append('isfromTo', data.isfromTo);
        params.append('fromDate', data.fromDate);
        params.append('toDate', data.toDate);
    }

    return service.get(ApiUrl.GetAllReport, params)
        .then(res => { return res })
        .catch(err => { throw err });
}

export const GetMyReport = (data) => {
    const params = new URLSearchParams();

    // params.append('isWeek', true)
    data.isYear && params.append('isYear', data.isYear);
    data.isWeek && params.append('isWeek', data.isWeek);
    data.isMonth && params.append('isMonth', data.isMonth);
    if (data.isfromTo && data.fromDate && data.toDate) {
        params.append('isfromTo', data.isfromTo);
        params.append('fromDate', data.fromDate);
        params.append('toDate', data.toDate);
    }

    return service.get(ApiUrl.GetMyReport, params)
        .then(res => { return res })
        .catch(err => { throw err });
}

export const GetMySalaryReport = (data) => {
    const params = new URLSearchParams();

    // params.append('isWeek', true)
    data.isYear && params.append('isYear', data.isYear);
    data.isWeek && params.append('isWeek', data.isWeek);
    data.isMonth && params.append('isMonth', data.isMonth);
    if (data.isfromTo && data.fromDate && data.toDate) {
        params.append('isfromTo', data.isfromTo);
        params.append('fromDate', data.fromDate);
        params.append('toDate', data.toDate);
    }

    return service.get(ApiUrl.GetMySalaryReport, params)
        .then(res => { return res })
        .catch(err => { throw err });
}