/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UrlCollection } from "../../common/url-collection";
import LinkAdministratorItems from "./child-components/link-adminstrator-items.view";
import LinkSubMenu from "./child-components/link-sub-items.view";


//--- Material Icon
import HomeIcon from "@material-ui/icons/Home";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AssignmentIcon from "@material-ui/icons/Assignment";
import SettingsIcon from "@material-ui/icons/Settings";
//--- Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faSignOutAlt, faChevronDown, faUser } from "@fortawesome/free-solid-svg-icons";

import * as clientSettingAction from "../../redux/store/client_setting/client_setting.store";
import * as appActions from "../../core/app.store";

//--- Style
import "./sidebar.scss";

import { useMediaQuery } from "react-responsive";
import { none } from "ol/centerconstraint";
import {
  DomainAdminSide,
  TokenKey,
  getUserInfo,
  removeCookies,
  APIUrlDefault,
  setCookies,
} from "../../utils/configuration";
import * as accAction from "../../redux/store/account/account.store";
import { modules } from "../../common/profileModules";

function Sidebar(props) {
  const {
    settings,
    getSettings,
    isCollapsed,
    expandSidebar,
    collapseSidebar,
    isDirty,
    setToggle,
  } = props;
const navigate = useNavigate();

  const isMobile = window.innerWidth < 1281;

  const [isSubMenuOpen, setSubMenuOpen] = useState(true);
  const [openQLQH, setOpenQLQH] = useState(false);
  const [openQHHTKT, setOpenQHHTKT] = useState(false);
  const [openQHCC, setOpenQHCC] = useState(false);

  // useEffect(() => {
  //   getSettings();
  // }, [getSettings]);

  useEffect(() => {
    setClientSetting(settings);
  }, [settings]);

  useEffect(() => {
    if (isMobile) {
      collapseSidebar();
    }
  }, [collapseSidebar, isMobile]);

  const [clientSetting, setClientSetting] = useState();
  const currentLocation = useLocation();

  const onMouseEnter = () => {
    (isDirty || isMobile) && isCollapsed && expandSidebar();
  };

  const onMouseLeave = () => {
    (isDirty || isMobile) && collapseSidebar();
  };


  const isCamera = currentLocation.pathname === UrlCollection.CameraManagement;
  const isScanner = currentLocation.pathname === UrlCollection.ScannerManagement;
  const isUserManagement = currentLocation.pathname === UrlCollection.UserManagement;
  const isRoleManagement = currentLocation.pathname === UrlCollection.RoleManagement;
  const isOrderManagement = currentLocation.pathname === UrlCollection.OrderManagement;

  const currentIsManagement =
    isCamera ||
    isScanner ||
    isUserManagement ||
    isUserManagement ||
    isOrderManagement;

  const isManagement = currentLocation.pathname.includes('/management');
  const isReport = currentLocation.pathname.includes('/report');

  useEffect(() => {
    setSubMenuOpen(currentIsManagement);
  }, [currentIsManagement]);



  //media query
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  const reactMediaQuery = {
    isDesktopOrLaptop: isDesktopOrLaptop,
    isTabletOrMobile: isTabletOrMobile,
    isPortrait: isPortrait,
    isRetina: isRetina
  }

  console.log('Sidebar reactMediaQuery :  ', reactMediaQuery);

  const getSideBarClassName = () => {
    var className = "";
    // Class cho desktop
    if (isDesktopOrLaptop) {
      className += 'aside';
      if (isCollapsed) {
        className += ' toggled';
      }
    }

    if (isTabletOrMobile) {
      className = 'overlay__wrapper';
      if (!isCollapsed) {
        className += '';
      }
    }
    return className;
  }

  const getSideBarInlineStyle = () => {
    //style for tablet and mobile
    if (isTabletOrMobile) {
      if (isCollapsed) {
        return { display: "none" }
      }
      return { display: "block" }
    }
  }

  const getIconMenuInlineStyle = () => {
    // var style = {alignSelf:'center', flex:'auto',display:'flex',justifyContent: 'center', flexGrow:0, flexShrink:0, flexBasis:'10%'}
    // if(isTabletOrMobile){
    //   return style;
    // }
    if (isDesktopOrLaptop) {
      if (isCollapsed) {
        return { width: '100%' }
      }
    }
  }

  const [user, setUser] = useState(getUserInfo());
  const [isLogin, setIsLogin] = useState(getUserInfo() ? true : false);
  const [screenAllow, setScreenAllow] = useState([]);

  const getScreenAllow = () => {
    accAction.GetScreenAllow().then(res => {
      setScreenAllow(modules.filter(item => {
        if (res.content.some(x => x.code === item.code))
          return item
      }))
    }).catch(error => console.log(error))
  }

  const onLogout = () => {
    removeCookies("isShowDialog");
    removeCookies("isLockScreen");
    removeCookies(TokenKey.token);
    removeCookies(TokenKey.refreshToken);
    removeCookies(TokenKey.returnUrl);
    window.location.replace(DomainAdminSide);
  }

  // useEffect(() => {
  //   if (isTabletOrMobile) {
  //     getScreenAllow();
  //   }
  // }, [])

  // useEffect(()=>{
  //   if (!isTabletOrMobile) return;
  //   if (isLogin && user && user.userRole) {
  //     if (user.email.toLowerCase() === "xinykien_sonla@gmail.com")
  //       window.location.replace(DomainAdminSide + "/dang-nhap");
  //     else return;
  //   } else {
  //     removeCookies("isShowDialog");
  //     removeCookies("isLockScreen");
  //     removeCookies(TokenKey.token);
  //     removeCookies(TokenKey.refreshToken);
  //     removeCookies(TokenKey.returnUrl);
  //     setCookies(TokenKey.returnUrl, window.location.href);
  //     window.location.replace(DomainAdminSide + "/dang-nhap");
  //   }
  // },[])

  console.log("SIDEBAR : ", user, screenAllow);
  const isAdmin = user.userRole == "ADMIN"

  return (
    <div id="sidebar-custom" className={getSideBarClassName()}
      style={getSideBarInlineStyle()} >
      {
        isTabletOrMobile &&
        <div className="d-flex justify-content-end close-btn">
          <a href='#' onClick={() => { collapseSidebar(); setToggle(); }} >
            &times;
          </a>
        </div>
      }

      {
        isTabletOrMobile &&
        <div className="d-flex flex-column overlay__avatar-section">
          <div className="d-flex justify-content-center row overlay__avatar" style={{ width: '100%' }}>
            <a
              className="nav-link col-6"
              href="#"
            >
              {/* <img
                className="img-profile rounded-circle"
                src={
                  user && user.avatar && user.avatar !== "null"
                    ? APIUrlDefault + user.avatar
                    : process.env.PUBLIC_URL + "/user-default.png"
                }
                alt="avatar-img"
                style={{ width: '100px' }}
              /> */}
            </a>
          </div>
          <div className="row overlay__avatar-buttons">
            <div className="col-1">{ }</div>
            <div className="col-5 d-flex flex-column justify-content-end overlay__avatar-button"
              style={{ borderRight: 'solid 1px' }}
            >
              {/* <FontAwesomeIcon
                icon={faUser}
                className="fa-sm fa-fw mr-2 text-gray-400"
              /> */}
              <img
                className="img-profile rounded-circle"
                src={
                  user && user.avatar && user.avatar !== "null"
                    ? APIUrlDefault + user.avatar
                    : process.env.PUBLIC_URL + "/user-default.png"
                }
                alt="avatar-img"
                style={{ width: '30px' }}
              />
              <Link to={UrlCollection.MyAccount}>
                <span>{user && user.fullName}</span>
              </Link>
            </div>
            <div className="col-6 d-flex flex-column justify-content-start overlay__avatar-button"
              onClick={onLogout} style={{ borderLeft: 'solid 1px' }}
            >
              <FontAwesomeIcon
                icon={faSignOutAlt}
                className="fa-sm fa-fw mr-2 text-gray-400"
              />
              <a href={DomainAdminSide + "/dang-nhap"}>
                <span>Đăng xuất</span>
              </a>
            </div>
          </div>
        </div>
      }

      <div
        onMouseEnter={isDesktopOrLaptop ? onMouseEnter : () => { }}
        onMouseLeave={isDesktopOrLaptop ? onMouseLeave : () => { }}
      >
        <ul
          className={
            (isDesktopOrLaptop ? "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion aside__menu" : "") +
            (isTabletOrMobile ? "overlay__menu-list" : "") +
            ((isCollapsed && isDesktopOrLaptop) ? " toggled" : "")
          }
          id="accordionSidebar"
        >
          {isDesktopOrLaptop && <hr className="sidebar-divider my-0" />}
          {isManagement && (
            <>
              <li className="nav-item overlay__menu__item">
                <div className={`nav-link overlay__menu-link__wrapper ${isOrderManagement && "is-active"}`} style={!isCollapsed ? { display: 'flex', width: '100%', borderBottom: `${isDesktopOrLaptop ? '' : 'solid 1px'}` } : {}}
                  onClick={() => {
                    navigate(UrlCollection.OrderManagement);
                  }}
                >
                  <div className="overlay__menu-link__icon" style={getIconMenuInlineStyle()}>
                    <AssignmentIcon fontSize="small" className="mr-2" />
                  </div>
                  <a to={UrlCollection.OrderManagement} style={isTabletOrMobile ? { fontSize: '0.85rem' } : {}}>
                    {!isCollapsed && <span>Quản lý Đơn hàng</span>}
                  </a>
                </div>
              </li>

              {isAdmin && (
                <>
                  <li className="nav-item overlay__menu__item">
                    <div className={`nav-link overlay__menu-link__wrapper ${isCamera && "is-active"}`} style={!isCollapsed ? { display: 'flex', width: '100%', borderBottom: `${isDesktopOrLaptop ? '' : 'solid 1px'}` } : {}}
                      onClick={() => {
                        navigate(UrlCollection.CameraManagement);
                      }}
                    >
                      <div className="overlay__menu-link__icon" style={getIconMenuInlineStyle()}>
                        <AssignmentIcon fontSize="small" className="mr-2" />
                      </div>
                      <a to={UrlCollection.CameraManagement} style={isTabletOrMobile ? { fontSize: '0.85rem' } : {}}>
                        {!isCollapsed && <span>Quản lý Camera</span>}
                      </a>
                    </div>
                  </li>
                  <li className="nav-item overlay__menu__item">
                    <div className={`nav-link overlay__menu-link__wrapper ${isScanner && "is-active"}`} style={!isCollapsed ? { display: 'flex', width: '100%', borderBottom: `${isDesktopOrLaptop ? '' : 'solid 1px'}` } : {}}
                      onClick={() => {
                        navigate(UrlCollection.ScannerManagement);
                      }}
                    >
                      <div className="overlay__menu-link__icon" style={getIconMenuInlineStyle()}>
                        <AssignmentIcon fontSize="small" className="mr-2" />
                      </div>
                      <a to={UrlCollection.ScannerManagement} style={isTabletOrMobile ? { fontSize: '0.85rem' } : {}}>
                        {!isCollapsed && <span>Quản lý bàn làm việc</span>}
                      </a>
                    </div>
                  </li>
                  <li className="nav-item overlay__menu__item">
                    <div className={`nav-link overlay__menu-link__wrapper ${isUserManagement && "is-active"}`} style={!isCollapsed ? { display: 'flex', width: '100%', borderBottom: `${isDesktopOrLaptop ? '' : 'solid 1px'}` } : {}}
                      onClick={() => {
                        navigate(UrlCollection.UserManagement);
                      }}
                    >
                      <div className="overlay__menu-link__icon" style={getIconMenuInlineStyle()}>
                        <AssignmentIcon fontSize="small" className="mr-2" />
                      </div>
                      <a to={UrlCollection.UserManagement} style={isTabletOrMobile ? { fontSize: '0.85rem' } : {}}>
                        {!isCollapsed && <span>Quản lý người dùng</span>}
                      </a>
                    </div>
                  </li>
                  <li className="nav-item overlay__menu__item">
                    <div className={`nav-link overlay__menu-link__wrapper ${isRoleManagement && "is-active"}`} style={!isCollapsed ? { display: 'flex', width: '100%', borderBottom: `${isDesktopOrLaptop ? '' : 'solid 1px'}` } : {}}
                      onClick={() => {
                        navigate(UrlCollection.RoleManagement);
                      }}
                    >
                      <div className="overlay__menu-link__icon" style={getIconMenuInlineStyle()}>
                        <AssignmentIcon fontSize="small" className="mr-2" />
                      </div>
                      <a to={UrlCollection.RoleManagement} style={isTabletOrMobile ? { fontSize: '0.85rem' } : {}}>
                        {!isCollapsed && <span>Phân quyền</span>}
                      </a>
                    </div>
                  </li>
                </>
              )}
            </>
          )}
          {isReport && (
            <>
              <li className="nav-item overlay__menu__item">
                <div className={`nav-link overlay__menu-link__wrapper ${currentLocation.pathname === UrlCollection.TopUser && "is-active"}`} style={!isCollapsed ? { display: 'flex', width: '100%', borderBottom: `${isDesktopOrLaptop ? '' : 'solid 1px'}` } : {}}
                  onClick={() => {
                    navigate(UrlCollection.TopUser);
                  }}
                >
                  <div className="overlay__menu-link__icon" style={getIconMenuInlineStyle()}>
                    <AssignmentIcon fontSize="small" className="mr-2" />
                  </div>
                  <a to={UrlCollection.TopUser} style={isTabletOrMobile ? { fontSize: '0.85rem' } : {}}>
                    {!isCollapsed && <span>Xếp hạng nhân viên</span>}
                  </a>
                </div>
              </li>
              <li className="nav-item overlay__menu__item">
                <div className={`nav-link overlay__menu-link__wrapper ${currentLocation.pathname === UrlCollection.MyReport && "is-active"}`} style={!isCollapsed ? { display: 'flex', width: '100%', borderBottom: `${isDesktopOrLaptop ? '' : 'solid 1px'}` } : {}}
                  onClick={() => {
                    navigate(UrlCollection.MyReport);
                  }}
                >
                  <div className="overlay__menu-link__icon" style={getIconMenuInlineStyle()}>
                    <AssignmentIcon fontSize="small" className="mr-2" />
                  </div>
                  <a to={UrlCollection.MyReport} style={isTabletOrMobile ? { fontSize: '0.85rem' } : {}}>
                    {!isCollapsed && <span>Báo cáo của tôi</span>}
                  </a>
                </div>
              </li>
              <li className="nav-item overlay__menu__item">
                <div className={`nav-link overlay__menu-link__wrapper ${currentLocation.pathname === UrlCollection.MySalaryReport && "is-active"}`} style={!isCollapsed ? { display: 'flex', width: '100%', borderBottom: `${isDesktopOrLaptop ? '' : 'solid 1px'}` } : {}}
                  onClick={() => {
                    navigate(UrlCollection.MySalaryReport);
                  }}
                >
                  <div className="overlay__menu-link__icon" style={getIconMenuInlineStyle()}>
                    <AssignmentIcon fontSize="small" className="mr-2" />
                  </div>
                  <a to={UrlCollection.MySalaryReport} style={isTabletOrMobile ? { fontSize: '0.85rem' } : {}}>
                    {!isCollapsed && <span>Báo lương của tôi</span>}
                  </a>
                </div>
              </li>
              {isAdmin && (
                <li className="nav-item overlay__menu__item">
                  <div className={`nav-link overlay__menu-link__wrapper ${currentLocation.pathname === UrlCollection.AllReport && "is-active"}`} style={!isCollapsed ? { display: 'flex', width: '100%', borderBottom: `${isDesktopOrLaptop ? '' : 'solid 1px'}` } : {}}
                    onClick={() => {
                      navigate(UrlCollection.AllReport);
                    }}
                  >
                    <div className="overlay__menu-link__icon" style={getIconMenuInlineStyle()}>
                      <AssignmentIcon fontSize="small" className="mr-2" />
                    </div>
                    <a to={UrlCollection.AllReport} style={isTabletOrMobile ? { fontSize: '0.85rem' } : {}}>
                      {!isCollapsed && <span>Báo cáo tổng</span>}
                    </a>
                  </div>
                </li>
              )}
            </>
          )}

          {/* hệ thông */}
          {/* {isManagement && (
            <>
              <li className="nav-item overlay__menu__item">
                <div className={`nav-link overlay__menu-link__wrapper ${isAuthor && "is-active"}`} style={!isCollapsed ? { display: 'flex', width: '100%', borderBottom: `${isDesktopOrLaptop ? '' : 'solid 1px'}` } : {}}
                  onClick={() => {
                    navigate(UrlCollection.AuthorManagement);
                  }}
                >
                  <div className="overlay__menu-link__icon" style={getIconMenuInlineStyle()}>
                    <AssignmentIcon fontSize="small" className="mr-2" />
                  </div>
                  <a to={UrlCollection.AuthorManagement} style={isTabletOrMobile ? { fontSize: '0.85rem' } : {}}>
                    {!isCollapsed && <span>Phân quyền</span>}
                  </a>
                </div>
              </li>
              <li className="nav-item overlay__menu__item">
                <div className={`nav-link overlay__menu-link__wrapper ${isAuthor && "is-active"}`} style={!isCollapsed ? { display: 'flex', width: '100%', borderBottom: `${isDesktopOrLaptop ? '' : 'solid 1px'}` } : {}}
                  onClick={() => {
                    navigate(UrlCollection.AuthorManagement);
                  }}
                >
                  <div className="overlay__menu-link__icon" style={getIconMenuInlineStyle()}>
                    <AssignmentIcon fontSize="small" className="mr-2" />
                  </div>
                  <a to={UrlCollection.AuthorManagement} style={isTabletOrMobile ? { fontSize: '0.85rem' } : {}}>
                    {!isCollapsed && <span>Quản lý người dùng</span>}
                  </a>
                </div>
              </li>


              <li className={`nav-item overlay__menu__item ${isSubMenuOpen && !isCollapsed ? "is-open" : ""}`}>
                <div className="overlay__submenu-list__wrapper">
                  <div className={`nav-link overlay__submenu-list__title-wrapper ${currentIsAdministratorPages && "is-active"}`}
                    onClick={() => {
                      // navigate(UrlCollection.EmailTemplate);
                      setSubMenuOpen(!isSubMenuOpen);
                    }}
                  >
                    <div className="overlay__submenu-list__title-icon aside__submenu-list__title-icon">
                      <SettingsIcon fontSize="small" className="mr-2" />
                    </div>
                    <a to={'#'}
                    >
                      {!isCollapsed && <span>Administrator</span>}
                    </a>
                    {!isCollapsed ? (
                      <span className="overlay__submenu-list__title-chevron aside__submenu-list__title-chevron">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="float-right mt-1 chevron"
                        />
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className="float-right mt-1 chevron"
                        />
                      </span>
                    ) : null}
                  </div>
                  <div className="overlay__submenu-list__content-wrapper">
                    <ul className="aside__menu-sub overlay__submenu-list__content">
                      <li>
                        <LinkAdministratorItems
                          //  icon={PeopleIcon}
                          pageLink={UrlCollection.RoleManagement}
                          title="Phân quyền"
                        />
                      </li>
                      <li>
                        <LinkAdministratorItems
                          //  icon={AccountBoxIcon}
                          pageLink={UrlCollection.Log}
                          title="Quản lý log"
                        />
                      </li>
                      <li>
                        <LinkAdministratorItems
                          //  icon={AccountBoxIcon}
                          pageLink={UrlCollection.UserManagement}
                          title="Quản lý người dùng"
                        />
                      </li>
                    </ul>
                  </div>
                </div>

              </li>
            </>
          )} */}
          {/* <>
            <li className={`nav-item overlay__menu__item ${isSubMenuOpen && !isCollapsed ? "is-open" : ""}`}>
              <div className="overlay__submenu-list__wrapper">
                <div className={`nav-link overlay__submenu-list__title-wrapper ${currentIsAdministratorPages && "is-active"}`}
                  onClick={() => {
                    setSubMenuOpen(!isSubMenuOpen);
                  }}
                >
                  <div className="overlay__submenu-list__title-icon aside__submenu-list__title-icon">
                    <SettingsIcon fontSize="small" className="mr-2" />
                  </div>
                  <a to={'#'}
                  >
                    {!isCollapsed && <span>Administrator</span>}
                  </a>
                  {!isCollapsed ? (
                    <span className="overlay__submenu-list__title-chevron aside__submenu-list__title-chevron">
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="float-right mt-1 chevron"
                      />
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className="float-right mt-1 chevron"
                      />
                    </span>
                  ) : null}
                </div>
                <div className="overlay__submenu-list__content-wrapper">
                  <ul className="aside__menu-sub overlay__submenu-list__content">
                    <li>
                      <LinkAdministratorItems
                        pageLink={UrlCollection.EmailTemplate}
                        title="Email Template"
                      />
                    </li>
                    <li>
                      <LinkAdministratorItems
                        pageLink={UrlCollection.EmailGenerated}
                        title="Khởi tạo email"
                      />
                    </li>
                    <li>
                      <LinkAdministratorItems
                        pageLink={UrlCollection.ContactManagement}
                        title="Liên hệ"
                      />
                    </li>
                    <li>
                      <LinkAdministratorItems
                        pageLink={UrlCollection.RoleManagement}
                        title="Phân quyền"
                      />
                    </li>
                    <li>
                      <LinkAdministratorItems
                        pageLink={UrlCollection.Log}
                        title="Quản lý log"
                      />
                    </li>
                    <li>
                      <LinkAdministratorItems
                        pageLink={UrlCollection.UserManagement}
                        title="Quản lý người dùng"
                      />
                    </li>
                  </ul>
                </div>
              </div>

            </li>
          </> */}


          {isDesktopOrLaptop && <hr className="sidebar-divider d-none d-md-block" />}

          {/* {isTabletOrMobile && (
            screenAllow.map((x, index) => (
              <li key={`nav-key-${index}`} className="nav-item overlay__menu__item">
                <div className={`nav-link overlay__menu-link__wrapper ${currentIsPTQD && "is-active"}`} style={!isCollapsed ? { display: 'flex', width: '100%' } : {}}
                >
                  <div style={isTabletOrMobile ? { alignSelf: 'center', flex: 'auto', display: 'flex', justifyContent: 'center', flexGrow: 0, flexShrink: 0, flexBasis: '10%' } : {}}>
                    <img
                      src={x.logo}
                      alt="Folder"
                      style={{ width: 15, height: 15 }}
                    />
                  </div>
                  <a href={x.url} target={x.url === UrlCollection.PAHT ? "_blank" : ""} style={{ fontSize: '0.85rem' }}>
                    {x.title}
                  </a>
                </div>
              </li>
            ))
          )} */}
        </ul>
      </div>
      <div className={(isTabletOrMobile ? ' footer-menu-mobile' : ' d-flex flex-column sidebar sidebar-dark w-100')}>
        <div class="copyright">
          <p>Copyright © Video Store 2024</p>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  settings: state.clientSetting.clientSetting,
  isCollapsed: state.app.isCollapsed,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getSettings: clientSettingAction.getSettings,
      expandSidebar: appActions.ExpandSidebar,
      collapseSidebar: appActions.CollapseSidebar,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
