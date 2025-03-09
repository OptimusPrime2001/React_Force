import React from "react";
import ActivityDetector from "react-activity-detector";
import {
  getCookies,
  removeCookies,
  setIsShowDialogConfirmRefresh,
} from "./utils/configuration";
const ProtectedRoute = ({
  element: Element,
  layout: Layout,
  isSetActive = true,
}) => {
  const customActivityEvents = [
    "click",
    "mousemove",
    "keydown",
    "DOMMouseScroll",
    "mousewheel",
    "mousedown",
    "touchstart",
    "touchmove",
    "focus",
  ];

  const onIdle = () => {
    if (getCookies("isLockScreen") !== "true") {
      setIsShowDialogConfirmRefresh(true);
    }
  };

  const onActive = () => {
    if (getCookies("isShowDialog") === "false") {
      removeCookies("isShowDialog");
    }
  };

  return (
    <Layout>
      {isSetActive && (
        <ActivityDetector
          activityEvents={customActivityEvents}
          enabled={true}
          timeout={5 * 60 * 1000}
          onIdle={onIdle}
          onActive={onActive}
        />
      )}
      <Element />
    </Layout>
  );
};
export default ProtectedRoute;
