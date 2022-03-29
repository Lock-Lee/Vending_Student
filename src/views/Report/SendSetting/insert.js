import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Row,
} from "reactstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import { TimePicker } from "antd";
import moment from "moment";

import { Loading } from "../../../component/revel-strap";
import ModalKeyboard from "../../../component/modals/ModalKeyboard";
import ModalUser from "../../../component/modals/ModalUser";
import SendSettingModel from "../../../models/SendSettingModel";
const send_setting_model = new SendSettingModel();
const format = "HH:mm:ss";

class Insert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      show_modal: false,
      title_modal: "",
      data_modal: "",
      code_validate: {
        value: "",
        status: "",
        class: "",
        text: "",
      },
      send_setting_code: "",
      send_setting_name: "",
      send_setting_time: "00:00:00",
      send_setting_receive: 0,
      send_setting_issue: 0,
      send_setting_balance: 0,
      send_setting_incident: 0,
      send_setting_transaction: 0,
      send_setting_low_stock: 0,
      send_setting_issue_alway: 0,
      send_setting_list: [],
      choose_user: false,
    };
  }

  componentDidMount() {
    this._fetchData();
  }

  async _fetchData() {
    const now = new Date();
    const last_code = await send_setting_model.generateSendSettingLastCode({
      code: `SSR`,
      digit: 4,
    });

    this.setState({
      loading: false,

      send_setting_code: last_code.data,
    });
  }

  _handleSubmit(event) {
    event.preventDefault();

    if (this._checkSubmit()) {
      this.setState(
        {
          loading: true,
        },
        async () => {
          const res = await send_setting_model.insertSendSetting({
            send_setting_code: this.state.send_setting_code,
            send_setting_name: this.state.send_setting_name,
            send_setting_time: this.state.send_setting_time,
            send_setting_receive: this.state.send_setting_receive,
            send_setting_issue: this.state.send_setting_issue,
            send_setting_balance: this.state.send_setting_balance,
            send_setting_incident: this.state.send_setting_incident,
            send_setting_transaction: this.state.send_setting_transaction,
            send_setting_low_stock: this.state.send_setting_low_stock,
            send_setting_issue_alway: this.state.send_setting_issue_alway,
            send_setting_list: this.state.send_setting_list,
          });

          if (res.require) {
            Swal.fire({ title: "บันทึกข้อมูลสำเร็จ !", icon: "success" });
            this.props.history.push("/report/send-setting/");
          } else {
            this.setState(
              {
                loading: false,
              },
              () => {
                Swal.fire({
                  title: "เกิดข้อผิดพลาดในการบันทึก !",
                  icon: "error",
                });
              }
            );
          }
        }
      );
    }
  }

  _onChangetime = (time, timeString) => {
    this.setState({
      send_setting_time: timeString,
    });
  };

  _checkSubmit() {
    if (this.state.send_setting_code === "") {
      Swal.fire({
        title: "กรุณาระบุรหัส !",
        text: "Please Enter name",
        icon: "warning",
      });
      return false;
    } else if (this.state.send_setting_name === "") {
      Swal.fire({
        title: "กรุณาระบุชื่อ !",
        text: "Please Enter Full Name",
        icon: "warning",
      });
      return false;
    } else {
      return true;
    }
  }

  _inputdata = (e) => {
    this.setState({
      send_setting_name: e,
      show_modal: false,
    });
  };

  _onChangeUsers = (data) => {
    this.setState({
      send_setting_list: data,
    });
  };

  _deleteSendSettingList = async (val) => {
    let send_setting_list = [...this.state.send_setting_list];
    let arr = send_setting_list
      ? send_setting_list.filter((item) => item.user_code !== val.user_code)
      : 0;
    await this.setState({ send_setting_list: arr });
  };

  render() {
    return (
      <div>
        <Loading show={this.state.loading} />
        <Card>
          <CardHeader>
            <Row>
              <Col>
                {" "}
                <Link to="/report/send-setting">
                  <Button
                    type="button"
                    style={{ height: "80px", width: "120px" }}
                  >
                    {" "}
                    <i className="fas fa-arrow-left"></i>
                  </Button>
                </Link>
              </Col>
              <Col>
                {" "}
                <label>
                  <center>
                    {" "}
                    <h1> เพิ่มการส่งอีเมล์</h1>
                  </center>
                </label>
              </Col>{" "}
              <Col></Col>
            </Row>
          </CardHeader>
          <Form onSubmit={(event) => this._handleSubmit(event)}>
            <CardBody style={{ height: "60vh" }}>
              <Row>
                <Col md={4}>
                  <label>
                    รหัสการส่งอีเมล์{" "}
                    <font color="#F00">
                      <b>*</b>
                    </font>
                  </label>
                  <Input
                    type="text"
                    value={this.state.send_setting_code}
                    readOnly
                    onChange={(e) =>
                      this.setState({ send_setting_code: e.target.value })
                    }
                    placeholder="รหัสการส่งอีเมล์"
                  />
                  <p className="text-muted">Example :</p>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <label>
                      หัวข้อการส่งอีเมล์{" "}
                      <font color="#F00">
                        <b>*</b>
                      </font>
                    </label>
                    <Input
                      type="text"
                      value={this.state.send_setting_name}
                      placeholder="หัวข้อการส่งอีเมล์"
                      onClick={() =>
                        this.setState({
                          show_modal: true,
                          title_modal: "หัวข้อการส่งอีเมล์",
                          data_modal: this.state.send_setting_name,
                        })
                      }
                    />
                    <p className="text-muted"> Example : </p>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <label>
                      ส่ง ณ เวลา{" "}
                      <font color="#F00">
                        <b>*</b>
                      </font>
                    </label>{" "}
                    <br />
                    <TimePicker
                      format={format}
                      defaultValue={moment(
                        this.state.send_setting_time,
                        format
                      )}
                      onChange={(time, timeString) =>
                        this._onChangetime(time, timeString)
                      }
                    />
                    <p className="text-muted"> Example : </p>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <label>
                    เลือกรายงาน{" "}
                    <font color="#F00">
                      <b>*</b>
                    </font>
                  </label>
                  <table className="table">
                    <thead>
                      <tr>
                        <td style={{ textAlign: "center", padding: 8 }}>
                          รายงานการรับสินค้า{" "}
                        </td>

                        <td style={{ textAlign: "center", padding: 8 }}>
                          รายงานการเบิกสินค้า{" "}
                        </td>

                        <td style={{ textAlign: "center", padding: 8 }}>
                          รายงานสินค้าคงเหลือ{" "}
                        </td>

                        <td style={{ textAlign: "center", padding: 8 }}>
                          รายงานสินค้าที่มีปัญหา{" "}
                        </td>

                        <td style={{ textAlign: "center", padding: 8 }}>
                          รายงานสินค้าเคลื่อนไหว{" "}
                        </td>

                        <td style={{ textAlign: "center", padding: 8 }}>
                          รายงานสินค้าต่ำกว่าเกณฑ์{" "}
                        </td>

                        <td style={{ textAlign: "center", padding: 8 }}>
                          รายงานทุกการเบิก{" "}
                        </td>

                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ textAlign: "center", padding: 8 }}>
                          {this.state.send_setting_receive === 1 ? (
                            <a
                              onClick={() => {
                                this.setState({ send_setting_receive: 0 });
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
                                this.setState({ send_setting_receive: 1 });
                              }}
                            >
                              {" "}
                              <i
                                className="fas fa-check-circle"
                                style={{ fontSize: 24, color: "#8e8e8e" }}
                              ></i>
                            </a>
                          )}
                        </td>
                        <td style={{ textAlign: "center", padding: 8 }}>
                          {this.state.send_setting_issue === 1 ? (
                            <a
                              onClick={() => {
                                this.setState({ send_setting_issue: 0 });
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
                                this.setState({ send_setting_issue: 1 });
                              }}
                            >
                              {" "}
                              <i
                                className="fas fa-check-circle"
                                style={{ fontSize: 24, color: "#8e8e8e" }}
                              ></i>
                            </a>
                          )}
                        </td>
                        <td style={{ textAlign: "center", padding: 8 }}>
                          {this.state.send_setting_balance === 1 ? (
                            <a
                              onClick={() => {
                                this.setState({ send_setting_balance: 0 });
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
                                this.setState({ send_setting_balance: 1 });
                              }}
                            >
                              {" "}
                              <i
                                className="fas fa-check-circle"
                                style={{ fontSize: 24, color: "#8e8e8e" }}
                              ></i>
                            </a>
                          )}
                        </td>
                        <td style={{ textAlign: "center", padding: 8 }}>
                          {this.state.send_setting_incident === 1 ? (
                            <a
                              onClick={() => {
                                this.setState({ send_setting_incident: 0 });
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
                                this.setState({ send_setting_incident: 1 });
                              }}
                            >
                              {" "}
                              <i
                                className="fas fa-check-circle"
                                style={{ fontSize: 24, color: "#8e8e8e" }}
                              ></i>
                            </a>
                          )}
                        </td>
                        <td style={{ textAlign: "center", padding: 8 }}>
                          {this.state.send_setting_transaction === 1 ? (
                            <a
                              onClick={() => {
                                this.setState({ send_setting_transaction: 0 });
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
                                this.setState({ send_setting_transaction: 1 });
                              }}
                            >
                              {" "}
                              <i
                                className="fas fa-check-circle"
                                style={{ fontSize: 24, color: "#8e8e8e" }}
                              ></i>
                            </a>
                          )}
                        </td>
                        <td style={{ textAlign: "center", padding: 8 }}>
                          {this.state.send_setting_low_stock === 1 ? (
                            <a
                              onClick={() => {
                                this.setState({ send_setting_low_stock: 0 });
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
                                this.setState({ send_setting_low_stock: 1 });
                              }}
                            >
                              {" "}
                              <i
                                className="fas fa-check-circle"
                                style={{ fontSize: 24, color: "#8e8e8e" }}
                              ></i>
                            </a>
                          )}
                        </td>
                        <td style={{ textAlign: "center", padding: 8 }}>
                          {this.state.send_setting_issue_alway === 1 ? (
                            <a
                              onClick={() => {
                                this.setState({ send_setting_issue_alway: 0 });
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
                                this.setState({ send_setting_issue_alway: 1 });
                              }}
                            >
                              {" "}
                              <i
                                className="fas fa-check-circle"
                                style={{ fontSize: 24, color: "#8e8e8e" }}
                              ></i>
                            </a>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <label>
                    เลือกผู้รับรายงาน{" "}
                    <font color="#F00">
                      <b>*</b>
                    </font>
                  </label>
                  <table className="table">
                    <thead>
                      <tr>
                        <td style={{ textAlign: "center", padding: 8 }}>
                          ลำดับ{" "}
                        </td>

                        <td style={{ textAlign: "center", padding: 8 }}>
                          รหัสผู้ใช้งาน{" "}
                        </td>
                        <td style={{ textAlign: "center", padding: 8 }}>
                          ชื่อ-นามสกุล{" "}
                        </td>

                        <td style={{ textAlign: "center", padding: 8 }}>
                          อีเมล์{" "}
                        </td>

                        <td style={{ textAlign: "center", padding: 8 }}>
                          จัดการ{" "}
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.send_setting_list.map((item, index) => {
                        return (
                          <tr key={"insert_" + item.user_code}>
                            <td style={{ textAlign: "center", padding: 8 }}>
                              {index + 1}
                            </td>
                            <td style={{ textAlign: "center", padding: 8 }}>
                              {item.user_code}
                            </td>
                            <td style={{ textAlign: "center", padding: 8 }}>
                              {item.user_firstname} {item.user_lastname}
                            </td>
                            <td style={{ textAlign: "center", padding: 8 }}>
                              {item.user_email}
                            </td>
                            <td style={{ textAlign: "center", padding: 8 }}>
                              <a
                                onClick={() => {
                                  this._deleteSendSettingList(item);
                                }}
                              >
                                {" "}
                                <i
                                  className="fas fa-times-circle"
                                  style={{ fontSize: 24, color: "#F00" }}
                                ></i>
                              </a>
                            </td>
                          </tr>
                        );
                      })}
                      <tr>
                        <td
                          colSpan="5"
                          style={{ textAlign: "center", padding: 8 }}
                        >
                          <a
                            onClick={() => {
                              this.setState({ choose_user: true });
                            }}
                          >
                            <i
                              className="fas fa-plus-circle"
                              style={{ fontSize: 24, color: "#0AA96D" }}
                            ></i>
                            เพิ่มผู้รับอีเมล์
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Col>
              </Row>
            </CardBody>
            <CardFooter className="text-right">
              <Button
                type="reset"
                style={{ height: "80px", width: "120px" }}
                color="danger"
              >
                Reset
              </Button>
              <Button
                type="submit"
                style={{ height: "80px", width: "120px" }}
                color="success"
              >
                Save
              </Button>
            </CardFooter>
          </Form>
        </Card>

        <ModalKeyboard
          show={this.state.show_modal}
          data_modal={this.state.data_modal}
          title_modal={this.state.title_modal}
          onSave={this._inputdata}
          onClose={() => this.setState({ show_modal: false })}
        />

        <ModalUser
          show={this.state.choose_user}
          users_selected={this.state.send_setting_list}
          title_modal={"เลือกผู้รับอีเมล์"}
          onSave={this._onChangeUsers}
          onClose={() => this.setState({ choose_user: false })}
        />
      </div>
    );
  }
}

export default Insert;
