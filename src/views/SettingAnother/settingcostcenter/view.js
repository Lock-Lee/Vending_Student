import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  Row,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Loading } from "../../../component/revel-strap";
import Swal from "sweetalert2";
import SettingCostCenterModel from "../../../models/SettingCostCenterModel";
const setting_costCenter_model = new SettingCostCenterModel();

class View extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      setting_cost: [],
      assign_job: 0,
      assign_op: 0,
      assign_machine: 0,
      assign_procress: 0,
    };
  }

  componentDidMount = () => {
    this._fetchData();
  };
  _fetchData = () =>
    this.setState({ loading: true }, async () => {
      const setting_cost =
        await setting_costCenter_model.getsettingcostcenter();
      this.setState({
        loading: false,
        assign_job: setting_cost.data[0].assign_job,
        assign_op: setting_cost.data[0].assign_op,
        assign_machine: setting_cost.data[0].assign_machine,
        assign_procress: setting_cost.data[0].assign_procress,
      });
    });

  _handleSubmit(event) {
    event.preventDefault();
    this.setState(
      {
        loading: true,
      },
      async () => {
        const res = await setting_costCenter_model.updatesettingcostcenter({
          assign_job: this.state.assign_job,
          assign_op: this.state.assign_op,
          assign_machine: this.state.assign_machine,
          assign_procress: this.state.assign_procress,
        });

        if (res.require) {
          Swal.fire({ title: "บันทึกข้อมูลสำเร็จ !", icon: "success" });
          this.setState({ loading: false });
          this.props.history.push("/settinganother/settingcostcenter");
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

  _onReset() {
    this.setState(
      {
        loading: true,
      },
      async () => {
        const setting_cost =
          await setting_costCenter_model.getsettingcostcenter();

        this.setState({
          loading: false,
          assign_job: setting_cost.data[0].assign_job,
          assign_op: setting_cost.data[0].assign_op,
          assign_machine: setting_cost.data[0].assign_machine,
          assign_procress: setting_cost.data[0].assign_procress,
        });
      }
    );
  }

  render() {
    return (
      <div>
        <Loading show={this.state.loading} />
        <Card>
          <CardHeader>
            <Row>
              <Col>
                {" "}
                <Link to="/settinganother">
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
                    <h1> ตั้งค่าเมนูค่าใช้จ่าย</h1>
                  </center>
                </label>
              </Col>{" "}
              <Col></Col>
            </Row>
          </CardHeader>
          <Form onSubmit={(event) => this._handleSubmit(event)}>
            <CardBody style={{ height: "60vh" }}>
              <Row>
                <Col md={12}>
                  <label>
                    เลือกเมนูค่าใช้จ่าย{" "}
                    <font color="#F00">
                      <b>*</b>
                    </font>
                  </label>
                  <table className="table">
                    <thead>
                      <tr>
                        <td style={{ textAlign: "center", padding: 14 }}>
                          ระบุงาน{" "}
                        </td>

                        <td style={{ textAlign: "center", padding: 14 }}>
                          ระบุกระบวนการ{" "}
                        </td>

                        <td style={{ textAlign: "center", padding: 14 }}>
                          ระบุเครื่องจักร{" "}
                        </td>

                        <td style={{ textAlign: "center", padding: 14 }}>
                          ระบุขั้นตอน{" "}
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ textAlign: "center", padding: 14 }}>
                          {this.state.assign_job === 1 ? (
                            <a
                              onClick={() => {
                                this.setState({ assign_job: 0 });
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
                                this.setState({ assign_job: 1 });
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
                        <td style={{ textAlign: "center", padding: 14 }}>
                          {this.state.assign_op === 1 ? (
                            <a
                              onClick={() => {
                                this.setState({ assign_op: 0 });
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
                                this.setState({ assign_op: 1 });
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
                        <td style={{ textAlign: "center", padding: 14 }}>
                          {this.state.assign_machine === 1 ? (
                            <a
                              onClick={() => {
                                this.setState({ assign_machine: 0 });
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
                                this.setState({ assign_machine: 1 });
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
                        <td style={{ textAlign: "center", padding: 14 }}>
                          {this.state.assign_procress === 1 ? (
                            <a
                              onClick={() => {
                                this.setState({ assign_procress: 0 });
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
                                this.setState({ assign_procress: 1 });
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
            </CardBody>
            <CardFooter className="text-right">
              <Button
                type="submit"
                style={{ height: "80px", width: "120px" }}
                color="success"
              >
                บันทึก
              </Button>
              <Button
                type="reset"
                style={{ height: "80px", width: "120px" }}
                color="danger"
                onClick={() => this._onReset()}
              >
                รีเซ็ต
              </Button>
            </CardFooter>
          </Form>
        </Card>
      </div>
    );
  }
}

export default View;
