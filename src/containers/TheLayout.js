import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";
import React, { useState, useEffect, useRef } from "react";

import { AuthConsumer } from "../role-accress/authContext";

const Login = React.lazy(() => import("../views/pages/login/Login"));
const Loginrfid = React.lazy(() =>
  import("../views/pages/loginrfid/Loginrfid")
);

const TheLayout = (props) => {
  return (
    <AuthConsumer>
      {({ authenticated, user, permissions, _scoket, status_manchine }) =>
        authenticated ? (
          <div className="c-app c-default-layout">
            <TheSidebar
              PERMISSIONS={permissions}
              status_manchine={status_manchine}
            />
            <div className="c-wrapper">
              <TheHeader
                _socket={_scoket}
                status_manchine={status_manchine}
                USER={user}
                PERMISSIONS={permissions}
              />
              <div className="c-body">
                <TheContent
                  PERMISSIONS={permissions}
                  status_manchine={status_manchine}
                  _scoket={_scoket}
                  USER={user}
                  _PERMISSIONS={(e) => {}}
                />
              </div>
              <TheFooter />
            </div>
          </div>
        ) : (
          <Loginrfid />
        )
      }
    </AuthConsumer>
  );
};

export default TheLayout;
