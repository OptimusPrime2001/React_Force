import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UrlCollection } from "./common/url-collection";
import history from "./common/history";
import ProtectedRoute from "./route-config.jsx";

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
    isRetina: isRetina,
  };

  return (
    <React.Fragment>
      <DialogWarningExpired />
      <BrowserRouter history={history}>
        <AppLoading />
        <Routes>
          <Route
            path={UrlCollection.Login}
            element={
              <ProtectedRoute
                layout={LayoutUserView}
                element={Login}
                isSetActive={false}
              />
            }
          />
          <Route
            path={UrlCollection.ForgotPassword}
            element={
              <ProtectedRoute
                layout={LayoutUserView}
                element={ForgotPassword}
                isSetActive={false}
              />
            }
          />
          <Route
            path={UrlCollection.ResetPassword}
            element={
              <ProtectedRoute
                layout={LayoutUserView}
                element={ResetPassword}
                isSetActive={false}
              />
            }
          />
          <Route
            path={UrlCollection.Home}
            element={
              <ProtectedRoute
                layout={() => (
                  <NoLayout>
                    <HomePage />
                  </NoLayout>
                )}
                element={HomePage}
              />
            }
          />
          <Route
            path={UrlCollection.ScannerManagement}
            element={
              <ProtectedRoute
                layout={() => (
                  <LayoutViewWithHook title="Quản lý bàn làm việc">
                    <ScannerManagement />
                  </LayoutViewWithHook>
                )}
                element={ScannerManagement}
              />
            }
          />
          <Route
            path={UrlCollection.CameraManagement}
            element={
              <ProtectedRoute
                layout={() => (
                  <LayoutViewWithHook title="Quản lý camera">
                    <CameraManagement />
                  </LayoutViewWithHook>
                )}
                element={CameraManagement}
              />
            }
          />
          <Route
            path={UrlCollection.OrderManagement}
            element={
              <ProtectedRoute
                layout={() => (
                  <LayoutViewWithHook title="Quản lý Đơn hàng">
                    <OrderManagement />
                  </LayoutViewWithHook>
                )}
                element={OrderManagement}
              />
            }
          />
          <Route
            path={UrlCollection.OrderVideo + "/:orderCode"}
            element={
              <ProtectedRoute
                layout={() => (
                  <LayoutViewWithHook>
                    <VideoView />
                  </LayoutViewWithHook>
                )}
                element={VideoView}
              />
            }
          />
          <Route
            path={UrlCollection.TopUser}
            element={
              <ProtectedRoute
                layout={() => (
                  <LayoutViewWithHook
                    title={!isTabletOrMobile ? "Xếp hạng nhân viên" : null}
                  >
                    <TopUser isTabletOrMobile={isTabletOrMobile} />
                  </LayoutViewWithHook>
                )}
                element={TopUser}
              />
            }
          />
          <Route
            path={UrlCollection.MyReport}
            element={
              <ProtectedRoute
                layout={() => (
                  <LayoutViewWithHook
                    title={!isTabletOrMobile ? "Báo cáo của tôi" : null}
                  >
                    <MyReport isTabletOrMobile={isTabletOrMobile} />
                  </LayoutViewWithHook>
                )}
                element={MyReport}
              />
            }
          />
          <Route
            path={UrlCollection.MySalaryReport}
            element={
              <ProtectedRoute
                layout={() => (
                  <LayoutViewWithHook
                    title={!isTabletOrMobile ? "Báo lương của tôi" : null}
                  >
                    <MySalaryReport isTabletOrMobile={isTabletOrMobile} />
                  </LayoutViewWithHook>
                )}
                element={MySalaryReport}
              />
            }
          />
          <Route
            path={UrlCollection.AllReport}
            element={
              <ProtectedRoute
                layout={() => (
                  <LayoutViewWithHook
                    title={!isTabletOrMobile ? "Báo cáo tổng" : null}
                  >
                    <AllReport isTabletOrMobile={isTabletOrMobile} />
                  </LayoutViewWithHook>
                )}
                element={AllReport}
              />
            }
          />
          <Route
            path={UrlCollection.Report}
            element={
              <ProtectedRoute
                layout={() => {
                  if (isTabletOrMobile)
                    return (
                      <LayoutDetail title="Báo cáo">
                        <Report isTabletOrMobile={isTabletOrMobile} />
                      </LayoutDetail>
                    );
                  else
                    return (
                      <LayoutViewWithHook title="Báo cáo">
                        <Report isTabletOrMobile={isTabletOrMobile} />
                      </LayoutViewWithHook>
                    );
                }}
                element={Report}
              />
            }
          />

          {/* ---------- video store ---------- */}

          <Route
            path={UrlCollection.Home}
            element={
              <ProtectedRoute
                layout={() => <HomePage reactMediaQuery={reactMediaQuery} />}
                element={HomePage}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}
export default App;
