import React, { Suspense, useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CContainer, CFade } from "@coreui/react";

import routes from "../routes";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const TheContent = (props) => {
  const [status_manchine, setStatus_manchine] = useState("");
  const { USER } = props;
  let { PERMISSIONS } = props;

  useEffect(() => {
    setStatus_manchine(props.status_manchine);
  });

  const _generatePermission = (data) => {
    console.log(data.key);
    if (data.key === "Vending-Home") {
      PERMISSIONS = PERMISSIONS?.filter(
        (item) =>
          item.menu_name_en === "Vending-Receive-Tool" ||
          item.menu_name_en === "Vending-Setting-Another" ||
          item.menu_name_en === "Vending-Address" ||
          item.menu_name_en === "Vending-Takeout-Tool" ||
          item.menu_name_en === "Vending-Reoder" ||
          item.menu_name_en === "Vending-Report"
      );
    } else if (data.key === "Vending-Setting-Another") {
      PERMISSIONS = PERMISSIONS?.filter(
        (item) =>
          item.menu_name_en === "Vending-User" ||
          item.menu_name_en === "Vending-Job" ||
          item.menu_name_en === "Vending-Stock" ||
          item.menu_name_en === "Vending-Production" ||
          item.menu_name_en === "Vending-Machine" ||
          item.menu_name_en === "Vending-TPR" ||
          item.menu_name_en === "Vending-Supplier" ||
          item.menu_name_en === "Vending-Product" ||
          item.menu_name_en === "Vending-Record" ||
          item.menu_name_en === "Vending-Abnormal" ||
          item.menu_name_en === "Vending-Toollife-Record"
      );
    } else if (data.key === "Vending-Etc") {
      PERMISSIONS = PERMISSIONS?.filter(
        (item) => item.menu_name_en === "Vending-Costcenter"
      );
    } else {
      PERMISSIONS = PERMISSIONS?.find((item) => item.menu_name_en === data.key);
    }

    if (PERMISSIONS === undefined) {
      return {
        permission_add: false,
        permission_approve: false,
        permission_cancel: false,
        permission_delete: false,
        permission_edit: false,
        permission_view: false,
      };
    } else {
      return PERMISSIONS;
    }
  };

  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              return (
                route.component && (
                  <Route
                    key={"route_" + idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={(props) => (
                      <CFade>
                        <route.component
                          {...props}
                          SESSION={{
                            USER: USER,
                            status_manchine: status_manchine,
                            PERMISSION: _generatePermission({
                              key: route.permission_name,
                            }),
                          }}
                        />
                      </CFade>
                    )}
                  />
                )
              );
            })}
            <Redirect from="/" to="/" />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  );
};

export default React.memo(TheContent);
