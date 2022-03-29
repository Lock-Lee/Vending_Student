import React from "react";
import { IoIosLogOut } from "react-icons/io";
import { CDropdownItem } from "@coreui/react";

import { AuthConsumer } from "../role-accress/authContext";

const TheHeaderDropdown = () => {
  return (
    <AuthConsumer>
      {({ user, _handleLogout }) => (
        <CDropdownItem onClick={() => _handleLogout()}>
          <IoIosLogOut size={25} />
          {"\u00A0"}
          ออกจากระบบ
        </CDropdownItem>
      )}
    </AuthConsumer>
  );
};

export default TheHeaderDropdown;
