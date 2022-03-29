import React from "react";
import {
  Col,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";

import Keyboard from "react-simple-keyboard";
import { Select } from "../../component/revel-strap";
import "react-simple-keyboard/build/css/index.css";
import UserModel from "../../models/UserModel";
import UserTypeModel from "../../models/UserTypeModel";
import DepartmentModel from "../../models/DepartmentModel";
const department_model = new DepartmentModel();
const usertype_model = new UserTypeModel();
const user_model = new UserModel();

class ModalUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      title_modal: "",
      layoutName: "default",
      languageKeyboard: "english",
      department_code: "",
      user_type_code: "",
      users: [],
      users_selected: [],
      user_types: [],
      departments: [],
      show_keyboard: false,
    };
  }

  componentDidUpdate(props_old) {
    if (props_old.show === false && this.props.show) {
      this._fetchData();
    }
  }

  async _fetchUserData() {
    this.setState({ loading: true }, async () => {
      const users = await user_model.getUserBy({});
      this.setState({
        loading: false,
        users: users.data,
      });
    });
  }

  async _fetchData() {
    let title_modal = this.props.title_modal;
    let users_selected = [];
    if (this.props.users_selected) {
      users_selected = this.props.users_selected;
    } else {
      users_selected = [];
    }

    const user_types = await usertype_model.getUserTypeBy();
    const departments = await department_model.getDepartmentBy();

    this.setState({ loading: true }, async () => {
      this.setState({
        loading: false,
        users_selected: users_selected,
        user_types: user_types.data,
        departments: departments.data,
        title_modal: title_modal,
      });
    });
  }

  _languageKeyboard() {
    const { languageKeyboard } = this.state;
    if (languageKeyboard === "english") {
      return (
        <Keyboard
          layout={{
            default: [
              "Th 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
              "{tab} q w e r t y u i o p [ ] \\",
              "{lock} a s d f g h j k l ; ' {enter}",
              "{shift} z x c v b n m . - / {shift}",
              ".com @ {space}",
            ],
            shift: [
              "Th ! @ # $ % ^ & * ) ( _ + {bksp}",
              "{tab} Q W E R T Y U I O P { } |",
              '{lock} A S D F G H J K L : " {enter}',
              "{shift} Z X C V B N M < > ? {shift}",
              ".com @ {space}",
            ],
          }}
          layoutName={this.state.layoutName}
          // onChange={this._onChange}
          onKeyPress={this._onKeyPress}
        />
      );
    } else if (languageKeyboard === "thai") {
      return (
        <Keyboard
          layout={{
            default: [
              "En ๅ / - ภ ถ ุ ึ ค ฅ จ ข ช {bksp}",
              "{tab} ๆ ไ ำ พ ะ ั ี ร น ย บ ล ฃ",
              "{lock} ฟ ห ก ด เ ้ ่ า ส ว ง {enter}",
              "{shift} ผ ป แ อ ิ ื ท ม ใ ฝ {shift}",
              ".com @ {space}",
            ],
            shift: [
              "En + ๑ ๒ ๓ ๔ ู ฿ ๕ ๖ ๗ ๘ ๙ {bksp}",
              '{tab} ๐ " ฎ ฑ ธ ํ ๊ ณ ฯ ญ ฐ , ฅ',
              "{lock} ฤ ฆ ฏ โ ฌ ็ ๋ ษ ศ ซ . {enter}",
              "{shift} ( ) ฉ ฮ ฺ ์ ? ฒ ฬ ฦ {shift}",
              ".com @ {space}",
            ],
          }}
          layoutName={this.state.layoutName}
          // onChange={this._onChange}
          onKeyPress={this._onKeyPress}
        />
      );
    }
  }

  _onKeyPress = (button) => {
    let keyword = this.state.keyword.toString();
    let space = " ";
    if (button === "{enter}") {
      this.setState({ show_keyboard: false });
      this._fetchUserData();
    }

    if (button === "{shift}" || button === "{lock}") this._handleShift();
    if (button === "Th") {
      this.setState({
        languageKeyboard: "thai",
      });
    }

    if (button === "En") {
      this.setState({
        languageKeyboard: "english",
      });
    }

    if (
      button !== "{bksp}" &&
      button !== "" &&
      button !== "{enter}" &&
      button !== "{space}" &&
      button !== "{shift}" &&
      button !== "{lock}" &&
      button !== "{tab}" &&
      button !== "Th" &&
      button !== "En"
    ) {
      keyword += button;
    } else if (button === "{bksp}") {
      keyword = keyword.substring(0, keyword.length - 1);
    } else if (button === "{space}") {
      keyword += space;
    }
    this.setState({
      keyword: keyword,
    });
  };

  _handleShift = () => {
    const layoutName = this.state.layoutName;
    this.setState({
      layoutName: layoutName === "default" ? "shift" : "default",
    });
  };

  _handleSave = () => {
    const users_selected = this.state.users_selected;
    this.props.onSave(users_selected);
    this.props.onClose();
  };

  _handleClose = () => this.props.onClose();

  _pushUserSelected = async (item) => {
    let users_selected = [...this.state.users_selected];
    users_selected.push({
      user_code: item.user_code,
      user_firstname: item.user_firstname,
      user_lastname: item.user_lastname,
      user_email: item.user_email,
    });
    await this.setState({ users_selected: users_selected });
  };

  _popUserSelected = async (val) => {
    let users_selected = [...this.state.users_selected];
    let arr = users_selected
      ? users_selected.filter((item) => item.user_code !== val.user_code)
      : 0;
    await this.setState({ users_selected: arr });
  };

  _renderUser() {
    let component_result = [];
    let { users_selected } = this.state;
    for (let index = 0; index < this.state.users.length; index++) {
      const item = this.state.users[index];
      const _has = users_selected
        ? users_selected.filter((val) => val.user_code === item.user_code)
        : 0;
      component_result.push(
        <tr key={"ModalUserList_" + item.user_code}>
          <td style={{ textAlign: "center", padding: 8 }}>
            {_has.length > 0 ? (
              <a
                onClick={() => {
                  this._popUserSelected(item);
                }}
              >
                <i
                  className="fas fa-check-circle"
                  style={{ fontSize: 24, color: "#0AA96D" }}
                ></i>
              </a>
            ) : (
              <a
                onClick={() => {
                  this._pushUserSelected(item);
                }}
              >
                <i
                  className="fas fa-check-circle"
                  style={{ fontSize: 24, color: "#8e8e8e" }}
                ></i>
              </a>
            )}
          </td>
          <td style={{ textAlign: "center", padding: 8 }}>{item.user_code}</td>
          <td style={{ textAlign: "center", padding: 8 }}>
            {item.user_firstname} {item.user_lastname}
          </td>
          <td style={{ textAlign: "center", padding: 8 }}>{item.user_email}</td>
        </tr>
      );
    }
    return component_result;
  }

  render() {
    const user_type_options = [
      { label: "- เลือกประเภทผู้ใช้  -", value: "" },
      ...this.state.user_types.map((item) => ({
        value: item.user_type_code,
        label: item.user_type_name,
      })),
    ];
    const department_options = [
      { label: "- เลือกแผนก -", value: "" },
      ...this.state.departments.map((item) => ({
        value: item.department_code,
        label: item.department_name,
      })),
    ];
    return (
      <Modal
        size="xl"
        centered
        isOpen={this.props.show}
        toggle={this._handleClose}
      >
        <ModalHeader toggle={this._handleClose}>
          <label>{this.state.title_modal}</label>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col md={3}>
              <FormGroup>
                <label>
                  <b>แผนก</b>
                </label>
                <Select
                  options={department_options}
                  value={this.state.department_code}
                  onChange={(e) => this.setState({ department_code: e })}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <label>
                  <b>ประเภทผู้ใช้</b>
                </label>
                <Select
                  options={user_type_options}
                  value={this.state.user_type_code}
                  onChange={(e) => this.setState({ user_type_code: e })}
                  placeholder="นามสกุล"
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <label>
                  <b>คำค้น</b>
                </label>
                <div
                  className="form-control"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    onClick={() =>
                      this.setState({
                        show_keyboard: !this.state.show_keyboard,
                      })
                    }
                    style={{ flex: 1 }}
                  >
                    {this.state.keyword}
                  </span>
                  <span
                    onClick={() =>
                      this.setState({
                        show_keyboard: !this.state.show_keyboard,
                      })
                    }
                  >
                    <i
                      className="fas fa-keyboard"
                      style={{
                        fontSize: 24,
                        color: this.state.show_keyboard ? "#0AA96D" : "#8e8e8e",
                      }}
                    ></i>
                  </span>
                </div>
              </FormGroup>
            </Col>
            <Col md={3}>
              <button
                className="btn btn-primary"
                style={{ width: 120, height: 64 }}
                onClick={() => {
                  this._fetchUserData();
                }}
              >
                ค้นหา
              </button>
            </Col>
          </Row>
          <Row>
            <Col>
              {this.state.show_keyboard ? this._languageKeyboard() : null}
            </Col>
          </Row>
          <Row>
            <Col>
              <table className="table">
                <thead>
                  <tr>
                    <td style={{ textAlign: "center", padding: 8 }}>ลำดับ </td>
                    <td style={{ textAlign: "center", padding: 8 }}>
                      รหัสผู้ใช้งาน{" "}
                    </td>

                    <td style={{ textAlign: "center", padding: 8 }}>
                      ชื่อ-นามสกุล{" "}
                    </td>

                    <td style={{ textAlign: "center", padding: 8 }}>อีเมล์ </td>
                  </tr>
                </thead>
                <tbody>{this._renderUser()}</tbody>
              </table>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <button
            className="btn btn-success"
            style={{ height: "80px", width: "120px" }}
            onClick={() => this._handleSave()}
          >
            Done
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ModalUser;
