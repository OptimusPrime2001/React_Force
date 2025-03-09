import React, { useState } from "react";
//---img
import planningIcon from "../../assets/icon/presentation.png";
import adminstratorIcon from "../../assets/icon/adminstrator.png";
import remoteIcon from "../../assets/icon/qr-code.png";
import userIcon from "../../assets/icon/user-management.png";
import { UrlCollection } from "../../common/url-collection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import ShowNotification from "../../components/react-notifications/react-notifications";

import {
  NotificationMessageType,
  DomainAdminSide,
  TokenKey,
  getUserInfo,
  removeCookies,
  APIUrlDefault,
} from "../../utils/configuration";
import ModalQr from "../../components/modal-qr/modal-qr";
import { GetQr } from "../../redux/store/qr/qr.store";

import "./home.scss";
export default function HomePage() {
  const user = getUserInfo();
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState();

  const onLogout = () => {
    // removeCookies('DeviceId')
    removeCookies(TokenKey.token);
    removeCookies(TokenKey.returnUrl);
    window.location.replace(DomainAdminSide);
  };

  const listEntry = [
    {
      name: "Xem QR",
      img: remoteIcon,
      linkUrl: null,
      action: true,
    },
    {
      name: "Báo cáo",
      img: planningIcon,
      linkUrl: UrlCollection.Report,
    },
    {
      name: "Thông tin cá nhân",
      img: userIcon,
      linkUrl: UrlCollection.MyAccount,
    },
    {
      name: "Quản lý hệ thống",
      img: adminstratorIcon,
      linkUrl: UrlCollection.OrderManagement,
    },
  ];

  const onGetQr = () => {
    GetQr()
      .then((res) => {
        if (res && res.content && res.content.status) {
          setData(res.content);
        } else {
          ShowNotification(
            "Chưa có phiên làm việc",
            NotificationMessageType.Error
          );
          setIsOpen(false);
        }
      })
      .catch((e) => {
        ShowNotification(
          "Xảy ra lỗi, vui lòng liên hệ Admin",
          NotificationMessageType.Error
        );
      });
  };

  const handleGetQr = () => {
    onGetQr();
    setIsOpen(true);
  };

  const handleCloseQr = () => {
    setData();
    setIsOpen(false);
  };

  return (
    <div className="container entry_screen">
      <div className="entry_header">
        <div className="entry_header_logo">
          <img src={"../../assets/images/logo.png"} alt="logo" />
        </div>

        {/* <div className="entry_header_title">
                    PHẦN MỀM XÂY DỰNG CƠ SỞ DỮ LIỆU QUY HOẠCH, ĐÔ THỊ LIÊN THÔNG TRÊN ĐỊA BÀN TỈNH HÀ NAM 
                </div> */}

        <div className="nav-item dropdown no-arrow">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="userDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">
              {user && user.fullName}
            </span>
            <img
              className="img-profile rounded-circle"
              src={
                //require("../../assets/images/user-default.png"
                user && user.avatar && user.avatar !== "null"
                  ? APIUrlDefault + user.avatar
                  : import.meta.env.PUBLIC_URL + "/user-default.png"
              }
            />
          </a>

          <div
            className="dropdown-menu dropdown-menu-right shadow"
            aria-labelledby="userDropdown"
          >
            {/* <a className="dropdown-item" href="#">
                <FontAwesomeIcon icon={faUser} className="fa-sm fa-fw mr-2 text-gray-400" />Profile
              </a> */}
            {/* <div className="dropdown-divider"></div> */}
            <a className="dropdown-item" href="" onClick={() => onLogout()}>
              <FontAwesomeIcon
                icon={faSignOutAlt}
                className="fa-sm fa-fw mr-2 text-gray-400"
              />
              Logout
            </a>
          </div>
        </div>
      </div>
      <div className="entry_box">
        {listEntry.map((item, index) => {
          if (!item.action)
            return (
              <a key={index} href={item.linkUrl} className="entry_item">
                <img src={item.img} alt={item.name} />
                <div>{item.name}</div>
              </a>
            );
          else
            return (
              <a
                key={index}
                className="cursor-pointer entry_item"
                onClick={() => handleGetQr()}
              >
                <img src={item.img} alt={item.name} />
                <div>{item.name}</div>
              </a>
            );
        })}
      </div>
      {isOpen && (
        <ModalQr isOpen={isOpen} onClose={handleCloseQr} data={data} />
      )}
    </div>
  );
}
