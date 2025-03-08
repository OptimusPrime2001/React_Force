import React, {useEffect} from "react";
import {
    NotificationMessageType,
    DomainAdminSide,
    TokenKey,
    getUserInfo,
    removeCookies,
    APIUrlDefault,
    setCookies,
    getCookies,
} from "../../utils/configuration";
const NoLayout = (props) => {
    const isLogin = getUserInfo() ? true : false;
    const user = getUserInfo();
    useEffect(() => {
        if (isLogin && user && user.userRole) return;
        else {
            removeCookies(TokenKey.returnUrl);
            setCookies(TokenKey.returnUrl, window.location.href);
            window.location.replace(DomainAdminSide + "/dang-nhap");
        }
    }, [user])
    return (
        <div>
            {props.children}
        </div>
    )
}

export default NoLayout;