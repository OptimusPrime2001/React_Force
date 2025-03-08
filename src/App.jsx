import React from "react";
import { Router, Routes } from "react-router-dom";
import RouteComponent from "./route-config.jsx";
import { UrlCollection } from "./common/url-collection";
import history from "./common/history";

//--- Loading
import AppLoading from "./components/loading/loading.view";

//--- Layout
import LayoutView from "./components/layout/layout.view";
import LayoutViewWithHook from "./components/layout/layout.view.withHook";
import LayoutUserView from "./components/layout/layout-user.view.jsx";
import LayoutDetail from "./components/layout/layout-detail.view";
import NoLayout from "./components/layout/no-layout.view.jsx";

//--- Home
//--- Admin
import Login from "./modules/login/login.view.jsx";
import ForgotPassword from "./modules/forgot-password/forgot-password.view.jsx";
import ResetPassword from "./modules/reset-password/reset-password.view.jsx";

//--- Consult the community
import EmailTemplate from "./modules/email-template/email-template";
import RoleManagement from "./modules/role-management/role-management";
import ContactManagement from "./modules/contact-management/contact-management.view";
import EmailGenerated from "./modules/email-generated/email-generated.view";
import UserManagement from "./modules/user-management/user-management.view";
import UserLogHistory from "./modules/user-log/user-log-history.view";
//---Log
import Log from "./modules/log/log.jsx";

//--- Slider

//--- News
import News from "./modules/news/news.view.jsx";
// --- PlanningSync

//--- Map

//--- Records management
//--- Link

//--- Opinion form

//--- Table Layer Structure

//--- Access denied
import AccessDenied from "./modules/access-denied/access-denied.view.jsx";
//--- booking

//--- soundWave
//--- soundWave

//--- video store
import ScannerManagement from "./modules/scanner/scanner-management.jsx";
import CameraManagement from "./modules/camera-management/camera-management.jsx";
import OrderManagement from "./modules/order-management/order-management.jsx";
import TopUser from "./modules/dashboard/top-user.jsx";
import MyReport from "./modules/dashboard/my-report.jsx";
import MySalaryReport from "./modules/dashboard/my-salary-report.jsx";
import AllReport from "./modules/dashboard/all-report.jsx";
import Report from "./modules/dashboard/report.jsx";
import VideoView from "./modules/order-management/video-view.jsx";
//--- video store

import DocumentManagement from "./modules/document-management/document-management.view.jsx";
import MyAccount from "./modules/my-account/my-account.view.jsx";
import HomePage from "./modules/home/home.view.jsx";
import DialogWarningExpired from "./components/dialog-warning-expired/dialog-warning-expired.view";
import LockScreen from "./components/lock-screen/lock-screen.view.jsx";
import { useMediaQuery } from "react-responsive";

function App() {
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

  return (
    <div>
      <DialogWarningExpired />
      <Router history={history}>
        <AppLoading />
        <LockScreen />
        <Routes>
          <RouteComponent
            exact
            layout={LayoutUserView}
            component={Login}
            path={UrlCollection.Login}
            isSetActive={false}
          />
          <RouteComponent
            exact
            layout={LayoutUserView}
            component={ForgotPassword}
            path={UrlCollection.ForgotPassword}
            isSetActive={false}
          />
          <RouteComponent
            exact
            layout={LayoutUserView}
            component={ResetPassword}
            path={UrlCollection.ResetPassword}
            isSetActive={false}
          />
          <RouteComponent
            exact
            layout={() => (
              <NoLayout>
                <HomePage />
              </NoLayout>
            )}
            component={HomePage}
            path={UrlCollection.Home}
          />

          {/* ---------- video store ---------- */}
          <RouteComponent
            exact
            layout={() => (
              <LayoutViewWithHook title="Quản lý bàn làm việc">
                <ScannerManagement />
              </LayoutViewWithHook>
            )}
            path={UrlCollection.ScannerManagement}
          />

          <RouteComponent
            exact
            layout={() => (
              <LayoutViewWithHook title="Quản lý camera">
                <CameraManagement />
              </LayoutViewWithHook>
            )}
            path={UrlCollection.CameraManagement}
          />

          <RouteComponent
            exact
            layout={() => (
              <LayoutViewWithHook title="Quản lý Đơn hàng">
                <OrderManagement />
              </LayoutViewWithHook>
            )}
            path={UrlCollection.OrderManagement}
          />
          <RouteComponent
            exact
            layout={() => (
              <LayoutViewWithHook>
                <VideoView />
              </LayoutViewWithHook>
            )}
            path={UrlCollection.OrderVideo + '/:orderCode'}
          />
          <RouteComponent
            exact
            layout={() => (
              <LayoutViewWithHook title={!isTabletOrMobile? "Xếp hạng nhân viên" : null}>
                <TopUser isTabletOrMobile={isTabletOrMobile} />
              </LayoutViewWithHook>
            )}
            path={UrlCollection.TopUser}
          />
          <RouteComponent
            exact
            layout={() => (
              <LayoutViewWithHook title={!isTabletOrMobile? "Báo cáo của tôi" : null}>
                <MyReport isTabletOrMobile={isTabletOrMobile} />
              </LayoutViewWithHook>
            )}
            path={UrlCollection.MyReport}
          />
          <RouteComponent
            exact
            layout={() => (
              <LayoutViewWithHook title={!isTabletOrMobile? "Báo lương của tôi" : null}>
                <MySalaryReport isTabletOrMobile={isTabletOrMobile} />
              </LayoutViewWithHook>
            )}
            path={UrlCollection.MySalaryReport}
          />
          <RouteComponent
            exact
            layout={() => (
              <LayoutViewWithHook title={!isTabletOrMobile? "Báo cáo tổng" : null}>
                <AllReport isTabletOrMobile={isTabletOrMobile} />
              </LayoutViewWithHook>
            )}
            path={UrlCollection.AllReport}
          />
          <RouteComponent
            exact
            layout={() => {
              if (isTabletOrMobile) return (
                <LayoutDetail title="Báo cáo">
                  <Report isTabletOrMobile={isTabletOrMobile} />
                </LayoutDetail>
              )
              else return (
                <LayoutViewWithHook title="Báo cáo">
                  <Report isTabletOrMobile={isTabletOrMobile} />
                </LayoutViewWithHook>
              )
            }}
            path={UrlCollection.Report}
          />

          {/* ---------- video store ---------- */}

          {/* <RouteComponent
            exact
            layout={() => (<HomePage reactMediaQuery={reactMediaQuery}/>)}
            component={HomePage}
            path={UrlCollection.Home}
          /> */}
          {/* Role Management */}

          {/* Email Template */}
          <RouteComponent
            exact
            layout={() => (
              <LayoutViewWithHook title="Email Template">
                <EmailTemplate />
              </LayoutViewWithHook>
            )}
            path={UrlCollection.EmailTemplate}
          />
          {/*Email Generated */}
          <RouteComponent
            exact
            layout={() => (
              <LayoutViewWithHook title="Email Generated">
                <EmailGenerated />
              </LayoutViewWithHook>
            )}
            path={UrlCollection.EmailGenerated}
          />

          {/* Role Management */}
          <RouteComponent
            exact
            layout={() => (
              <LayoutViewWithHook title="Role Management">
                <RoleManagement />
              </LayoutViewWithHook>
            )}
            path={UrlCollection.RoleManagement}
          />
          {/* Contact Management */}
          <RouteComponent
            exact
            layout={() => (
              <LayoutViewWithHook title="Liên hệ">
                <ContactManagement />
              </LayoutViewWithHook>
            )}
            path={UrlCollection.ContactManagement}
          />
          {/* Log */}
          <RouteComponent
            exact
            layout={() => (
              <LayoutViewWithHook title="Quản lý log">
                <Log />
              </LayoutViewWithHook>
            )}
            path={UrlCollection.Log}
          />
          <RouteComponent
            exact
            layout={() => (
              <LayoutViewWithHook title="Role Management">
                <RoleManagement />
              </LayoutViewWithHook>
            )}
            path={UrlCollection.RoleManagement}
          />

          {/* User Management */}
          <RouteComponent
            exact
            layout={() => (
              <LayoutViewWithHook title="Quản lý người dùng">
                <UserManagement />
              </LayoutViewWithHook>
            )}
            path={UrlCollection.UserManagement}
          />

          {/* User log */}
          <RouteComponent
            exact
            layout={() => (
              <LayoutViewWithHook title="Nhật ký người dùng">
                <UserLogHistory />
              </LayoutViewWithHook>
            )}
            path={UrlCollection.UserLogHistory}
          />

          {/* my account */}
          <RouteComponent
            exact
            layout={() => (
              <LayoutDetail title="Quản lý tài khoản">
                <MyAccount isTabletOrMobile={isTabletOrMobile} />
              </LayoutDetail>
            )}
            path={UrlCollection.MyAccount}
          />
          {/* Access Denied */}
          <RouteComponent
            exact
            layout={() => (
              <LayoutView title="">
                <AccessDenied />
              </LayoutView>
            )}
            path={UrlCollection.AccessDenied}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
