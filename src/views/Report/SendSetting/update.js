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
  Modal,
} from "reactstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { NumberFormat, TimeFormat } from "../../../utils";
import { TimePicker } from "antd";
import moment from "moment";

import { Loading, DatePicker } from "../../../component/revel-strap";
import ModalKeyboard from "../../../component/modals/ModalKeyboard";
import ModalUser from "../../../component/modals/ModalUser";
import SendSettingModel from "../../../models/SendSettingModel";
const send_setting_model = new SendSettingModel();
const format = "HH:mm:ss";

class Update extends React.Component {
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
    const { code } = this.props.match.params;

    const send_setting = await send_setting_model.getSendSettingByCode({
      send_setting_code: code,
    });

    const {
      send_setting_code = "",
      send_setting_name = "",
      send_setting_time = "00:00:00",
      send_setting_receive = 0,
      send_setting_issue = 0,
      send_setting_balance = 0,
      send_setting_incident = 0,
      send_setting_transaction = 0,
      send_setting_low_stock = 0,
      send_setting_issue_alway = 0,
      send_setting_list = [],
    } = send_setting.data[0];
    this.setState(
      {
        loading: false,
        send_setting_code: send_setting_code,
        send_setting_name: send_setting_name,
        send_setting_time: send_setting_time,
        send_setting_receive: send_setting_receive,
        send_setting_issue: send_setting_issue,
        send_setting_balance: send_setting_balance,
        send_setting_incident: send_setting_incident,
        send_setting_transaction: send_setting_transaction,
        send_setting_low_stock: send_setting_low_stock,
        send_setting_list: send_setting_list,
        send_setting_issue_alway: send_setting_issue_alway,
      },
      async () => { }
    );

    if (send_setting.require === false) {
      Swal.fire("??????????????????????????????????????????????????????????????????????????????????????? !", "", "error");
      this.props.history.push("/report/send_setting");
    } else if (send_setting.data.length === 0) {
      Swal.fire("???????????????????????????????????????????????????????????? !", "", "warning");
      this.props.history.push("/report/send_setting");
    } else {
    }
  }

  _handleSubmit(event) {
    event.preventDefault();

    if (this._checkSubmit()) {
      this.setState(
        {
          loading: true,
        },
        async () => {
          const res = await send_setting_model.updateSendSettingBy({
            send_setting_code: this.state.send_setting_code,
            send_setting_name: this.state.send_setting_name,
            send_setting_time: this.state.send_setting_time,
            send_setting_receive: this.state.send_setting_receive,
            send_setting_issue: this.state.send_setting_issue,
            send_setting_balance: this.state.send_setting_balance,
            send_setting_incident: this.state.send_setting_incident,
            send_setting_transaction: this.state.send_setting_transaction,
            send_setting_low_stock: this.state.send_setting_low_stock,
            send_setting_list: this.state.send_setting_list,
            send_setting_issue_alway: this.state.send_setting_issue_alway,
          });

          if (res.require) {
            Swal.fire({ title: "?????????????????????????????????????????????????????? !", icon: "success" });
            this.props.history.push("/report/send-setting/");
          } else {
            this.setState(
              {
                loading: false,
              },
              () => {
                Swal.fire({
                  title: "??????????????????????????????????????????????????????????????????????????? !",
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
        title: "??????????????????????????????????????? !",
        text: "Please Enter name",
        icon: "warning",
      });
      return false;
    } else if (this.state.send_setting_name === "") {
      Swal.fire({
        title: "??????????????????????????????????????? !",
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
      ? send_setting_list.filter((item) => item.user_code != val.user_code)
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
                    <h1> ???????????????????????????????????????????????????</h1>
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
                    ????????????????????????????????????????????????{" "}
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
                    placeholder="????????????????????????????????????????????????"
                  />
                  <p className="text-muted">Example :</p>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <label>
                      ??????????????????????????????????????????????????????{" "}
                      <font color="#F00">
                        <b>*</b>
                      </font>
                    </label>
                    <Input
                      type="text"
                      value={this.state.send_setting_name}
                      placeholder="??????????????????????????????????????????????????????"
                      onClick={() =>
                        this.setState({
                          show_modal: true,
                          title_modal: "??????????????????????????????????????????????????????",
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
                      ????????? ??? ????????????{" "}
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
                    ?????????????????????????????????{" "}
                    <font color="#F00">
                      <b>*</b>
                    </font>
                  </label>
                  <table className="table">
                    <thead>
                      <tr>
                        <td style={{ textAlign: "center", padding: 8 }}>
                          ??????????????????????????????????????????????????????{" "}
                        </td>

                        <td style={{ textAlign: "center", padding: 8 }}>
                          ?????????????????????????????????????????????????????????{" "}
                        </td>

                        <td style={{ textAlign: "center", padding: 8 }}>
                          ?????????????????????????????????????????????????????????{" "}
                        </td>

                        <td style={{ textAlign: "center", padding: 8 }}>
                          ??????????????????????????????????????????????????????????????????{" "}
                        </td>

                        <td style={{ textAlign: "center", padding: 8 }}>
                          ??????????????????????????????????????????????????????????????????{" "}
                        </td>

                        <td style={{ textAlign: "center", padding: 8 }}>
                          ????????????????????????????????????????????????????????????????????????{" "}
                        </td>

                        <td style={{ textAlign: "center", padding: 8 }}>
                          ????????????????????????????????????????????????{" "}
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ textAlign: "center", padding: 8 }}>
                          {this.state.send_setting_receive == 1 ? (
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
                          {this.state.send_setting_issue == 1 ? (
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
                          {this.state.send_setting_balance == 1 ? (
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
                          {this.state.send_setting_incident == 1 ? (
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
                          {this.state.send_setting_transaction == 1 ? (
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
                          {this.state.send_setting_low_stock == 1 ? (
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
                          {this.state.send_setting_issue_alway == 1 ? (
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
                    ???????????????????????????????????????????????????{" "}
                    <font color="#F00">
                      <b>*</b>
                    </font>
                  </label>
                  <table className="table">
                    <thead>
                      <tr>
                        <td style={{ textAlign: "center", padding: 8 }}>
                          ???????????????{" "}
                        </td>

                        <td style={{ textAlign: "center", padding: 8 }}>
                          ???????????????????????????????????????{" "}
                        </td>
                        <td style={{ textAlign: "center", padding: 8 }}>
                          ????????????-?????????????????????{" "}
                        </td>

                        <td style={{ textAlign: "center", padding: 8 }}>
                          ??????????????????{" "}
                        </td>

                        <td style={{ textAlign: "center", padding: 8 }}>
                          ??????????????????{" "}
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
                            ???????????????????????????????????????????????????
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
          title_modal={"???????????????????????????????????????????????????"}
          onSave={this._onChangeUsers}
          onClose={() => this.setState({ choose_user: false })}
        />
      </div>
    );
  }
}

export default Update;
