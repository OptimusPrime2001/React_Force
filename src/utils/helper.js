import ShowNotification from "../components/react-notifications/react-notifications";
import { NotificationMessageType } from "./configuration";
import * as viVN from "../language/vi-VN.json";
import { GetLookupGenres } from "../redux/store/genres/genres.store";
import { GetLookupMoods } from "../redux/store/moods/moods.store";
import { GetLookupThemes } from "../redux/store/themes/themes.store";
import { GetLookupSoundEffect } from "../redux/store/sound-effects/sound-effects.store";
import { GetListUserManagement } from "../redux/store/user-management/user-management.store";
import { GetLookupScanner } from "../redux/store/scanner/scanner.store";

export const getLookupUser = () => {
    return new Promise((resolve, reject) => {
        GetListUserManagement(1, 100).then(
            (res) => {
                resolve(res);
            },
            (err) => {
                reject(err);
                err &&
                    err.errorType &&
                    ShowNotification(
                        viVN.Errors[err.errorType],
                        NotificationMessageType.Error
                    );
            }
        );
    });
};

export const getLookupScanner = () => {
    return new Promise((resolve, reject) => {
        GetLookupScanner().then(
            (res) => {
                resolve(res);
            },
            (err) => {
                reject(err);
                err &&
                    err.errorType &&
                    ShowNotification(
                        viVN.Errors[err.errorType],
                        NotificationMessageType.Error
                    );
            }
        );
    });
};


export const getLookupGenres = () => {
    return new Promise((resolve, reject) => {
        GetLookupGenres().then(
            (res) => {
                resolve(res);
            },
            (err) => {
                reject(err);
                err &&
                    err.errorType &&
                    ShowNotification(
                        viVN.Errors[err.errorType],
                        NotificationMessageType.Error
                    );
            }
        );
    });
};

export const getLookupMoods = () => {
    return new Promise((resolve, reject) => {
        GetLookupMoods().then(
            (res) => {
                resolve(res);
            },
            (err) => {
                reject(err);
                err &&
                    err.errorType &&
                    ShowNotification(
                        viVN.Errors[err.errorType],
                        NotificationMessageType.Error
                    );
            }
        );
    });
};

export const getLookupThemes = () => {
    return new Promise((resolve, reject) => {
        GetLookupThemes().then(
            (res) => {
                resolve(res);
            },
            (err) => {
                reject(err);
                err &&
                    err.errorType &&
                    ShowNotification(
                        viVN.Errors[err.errorType],
                        NotificationMessageType.Error
                    );
            }
        );
    });
};

export const getLookupSoundEffect = () => {
    return new Promise((resolve, reject) => {
        GetLookupSoundEffect().then(
            (res) => {
                resolve(res);
            },
            (err) => {
                reject(err);
                err &&
                    err.errorType &&
                    ShowNotification(
                        viVN.Errors[err.errorType],
                        NotificationMessageType.Error
                    );
            }
        );
    });
};

export const lookupStatus = [
    {
        id: 0,
        name: 'Đang đóng hàng'
    },
    {
        id: 1,
        name: 'Hoàn thành'
    },
    {
        id: 2,
        name: 'Lỗi'
    },
]

export const lookupOrderStatus = [
    {
        id: 0,
        name: 'Không thành công'
    },
    {
        id: 1,
        name: 'Thành công'
    },
]