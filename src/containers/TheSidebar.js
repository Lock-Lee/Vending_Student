import React from "react";
import { useSelector, useDispatch } from "react-redux";

const TheSidebar = (props) => {
  useDispatch();
  useSelector((state) => state.sidebarShow);

  return;
};

export default React.memo(TheSidebar);
