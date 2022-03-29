import React, { Component } from "react";
import {
  Button,
  Col,
  Card,
  CardBody,
  CardHeader,
  FormGroup,
  Nav,
  Row,
  Form,
  CardFooter,
  TabContent,
  TabPane,
  Input,
} from "reactstrap";
import {
  DatePicker,
  Loading,
  Select,
  AsyncTypeahead,
} from "../../../../component/revel-strap";
import { TimeFormat } from "../../../../utils";
import JobModel from "../../../../models/JobModel";
import ProductModel from "../../../../models/ProductModel";
import MachineModel from "../../../../models/MachineModel";
import { BaseServerFile } from "../../../../utils";
import Optools from "./optools";
import Opmachine from "./opmachine";

const time_format = new TimeFormat();
const job_model = new JobModel();
const product_model = new ProductModel();
const machine_model = new MachineModel();
const base_server_file = new BaseServerFile();
export default class Op extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      machines: [],
      upload_path: "job/",
      job_op: [],
      active_tab: "",
    };
  }
  componentDidUpdate() {}
  componentDidMount() {
    this.setState({
      job_op: this.props.job_op,
    });
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextState.is_render == false ? false : true;
  }

  _setStateOP(key, text) {
    let { job_op } = this.state;
    job_op[key] = text;
    this.setState({
      job_op: job_op,
    });
    this.props.onChange(job_op);
  }
  _addJobOPMachine() {
    let { job_op } = this.state;

    job_op.job_op_machines.push({
      job_op_machine_code: "",
      machine_code: "",
      production: "",
      date_start: "",
      date_end: "",
    });
    this.setState({ job_op: job_op });
  }
  _addJobOPTools() {
    let { job_op } = this.state;
    job_op.job_op_tools?.push({
      job_op_tools_code: "",
      job_op_tools_name: "",
      job_op_tools_drawing: {
        src: `default.png`,
        file: null,
        old: "",
      },
      job_op_tools_no: "",
      job_op_tools_uses: [],
    });
    this.setState({ job_op: job_op });
  }

  _deleteRow_OP_Tools(index_op_tools) {
    let { job_op } = this.state;
    job_op.job_op_tools.splice(index_op_tools, 1);
    this.setState(
      {
        job_op: job_op,
      },
      () => {}
    );
  }
  _deleteRow_OP_Machine(index_op_machine) {
    let { job_op_machines } = this.state.job_op;
    job_op_machines.splice(index_op_machine, 1);

    this.setState(
      {
        job_op_machines: job_op_machines,
      },
      () => {}
    );
  }

  render() {
    return (
      <Row key={"op_" + this.props.index_op}>
        <Col md={12}>
          <Card>
            <CardHeader>
              กระบวนการ {this.props.index_op + 1}{" "}
              <button
                type="button"
                className="icon-button color-danger float-right"
                title="ลบรายการ"
                onClick={() => this.props.onDelete()}
              >
                <i className="fa fa-times-circle fa-2x" aria-hidden="true" />
              </button>
            </CardHeader>

            <CardBody>
              <Row>
                <Col md={2}>
                  <label>
                    ลำดับ <font color="#F00"></font>
                  </label>
                  <Input
                    type="text"
                    value={this.props.job_op.job_op_no}
                    onChange={(e) =>
                      this._setStateOP("job_op_no", e.target.value)
                    }
                    placeholder="ลำดับ"
                  />
                  <p className="text-muted">Example : </p>
                </Col>
                <Col md={4}>
                  <label>
                    ชื่อกระบวนการ <font color="#F00"></font>
                  </label>
                  <Input
                    type="text"
                    value={this.props.job_op.job_op_name}
                    onChange={(e) =>
                      this._setStateOP("job_op_name", e.target.value)
                    }
                    placeholder="ชื่อกระบวนการ"
                  />
                  <p className="text-muted">Example : </p>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Nav tabs>
                    <li
                      className={`nav-link ${
                        this.state.active_tab !== "machine" ? "active" : ""
                      }`}
                      onClick={() => {
                        let { active_tab } = this.state;
                        active_tab = "op";
                        this.setState({ active_tab: active_tab });
                      }}
                    >
                      กระบวนการ{" "}
                    </li>

                    <li
                      className={`nav-link ${
                        this.state.active_tab === "machine" ? "active" : ""
                      }`}
                      onClick={() => {
                        let { active_tab } = this.state;
                        active_tab = "machine";
                        this.setState({ active_tab: active_tab });
                      }}
                    >
                      เครื่องจักร{" "}
                    </li>
                  </Nav>
                  <TabContent
                    activeTab={
                      this.state.active_tab ? this.state.active_tab : "op"
                    }
                    style={{ border: "unset" }}
                  >
                    <TabPane tabId="op" style={{ padding: "unset" }}>
                      {this.state.job_op.job_op_tools?.map(
                        (item_op_tools, index_op_tools) => {
                          return (
                            <Optools
                              key={"optools_" + index_op_tools}
                              job_op_tools={item_op_tools}
                              index_op_tools={index_op_tools}
                              onDelete={() => {
                                this._deleteRow_OP_Tools(index_op_tools);
                              }}
                              onChange={(item) => {
                                let { job_op } = this.state;
                                job_op.job_op_tools[index_op_tools] = item;

                                this.props.onChange(job_op);
                                this.setState({
                                  job_op: job_op,
                                  is_render: true,
                                });
                              }}
                            ></Optools>
                          );
                        }
                      )}
                      <Row>
                        {" "}
                        <Col className="text-center">
                          <span
                            className="text-button"
                            onClick={() => this._addJobOPTools()}
                          >
                            <i className="fa fa-plus" aria-hidden="true" />{" "}
                            เพิ่มขั้นตอน
                          </span>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="machine" style={{ padding: "unset" }}>
                      <table className="table table-bordered table-hover">
                        <thead>
                          <tr>
                            <th>ลำดับ</th>
                            <th>เครื่องจักร</th>
                            <th>จำนวนการผลิต</th>
                            <th>วันที่เริ่มการผลิต</th>
                            <th>วันที่สิ้นสุดการผลิต</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.job_op.job_op_machines?.map(
                            (item_op_machine, index_op_machine) => {
                              return (
                                <Opmachine
                                  key={"opmachime_" + index_op_machine}
                                  item_op_machine={item_op_machine}
                                  index_op_machine={index_op_machine}
                                  onDelete={() => {
                                    this._deleteRow_OP_Machine(
                                      index_op_machine
                                    );
                                  }}
                                  onChange={(item) => {
                                    let { job_op } = this.state;
                                    job_op.job_op_machines[index_op_machine] =
                                      item;
                                    this.props.onChange(job_op);
                                    this.setState({
                                      job_op: job_op,
                                      is_render: true,
                                    });
                                  }}
                                ></Opmachine>
                              );
                            }
                          )}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colSpan="7" align="center">
                              <span
                                className="text-button"
                                onClick={() => this._addJobOPMachine()}
                              >
                                <i className="fa fa-plus" aria-hidden="true" />{" "}
                                เพิ่มเครื่องจักร
                              </span>
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </TabPane>
                  </TabContent>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}
