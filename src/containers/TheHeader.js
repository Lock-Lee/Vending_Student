import React from "react";

import { CHeader, CHeaderNav } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { TheHeaderDropdown } from "./index";
import logo from "../assets/img/logo.jpeg";

const TheHeader = (props) => {
  return (
    <CHeader withSubheader style={{ justifyContent: "space-between" }}>
      <CHeaderNav>
        <img
          style={{ padding: "3px" }}
          src={logo}
          height={64}
          className="mx-auto d-block bottom-shadow"
          alt="logo"
        />
      </CHeaderNav>
      <CHeaderNav style={{ marginLeft: "12vw" }}></CHeaderNav>
      <CHeaderNav>
        <CIcon name="cil-user" size={"3xl"} className="mfe-2" />

        <label style={{ width: "-webkit-fill-available", paddingTop: "10px" }}>
          {props.USER.user_firstname + " " + props.USER.user_lastname}
        </label>

        <TheHeaderDropdown />
      </CHeaderNav>
    </CHeader>
  );
};

export default TheHeader;
