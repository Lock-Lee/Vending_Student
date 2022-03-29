import React from "react";
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
import { Link } from "react-router-dom";
import GLOBAL from "../../../GLOBAL";
import { Loading } from "../../../component/revel-strap";
import JobModel from "../../../models/JobModel";
const job_model = new JobModel();
class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      upload_path: "jobs/",
      active_tab: [],
      jobs: {
        job_code: "",
        job_name: "",
        job_no: "",
        job_cpp: "",
        job_start: "",
        job_end: "",
        job_hardness: "",
        job_material: "",
        deleted: "",
        addby: "",
        adddate: "",
        adddate: "",
        updateby: "",
        job_ops: [
          {
            job_op_code: "",
            job_code: "",
            job_op_name: "",
            job_op_no: "",

            job_op_machines: [
              {
                job_op_machine_code: "",
                job_op_code: "",
                machine_code: "",
                production: "",
                date_start: "",
                date_end: "",
              },
            ],
            job_op_tools: [
              {
                job_op_tools_code: "",
                job_op_code: "",
                job_op_tools_name: "",
                job_op_tools_drawing: {
                  src: "",
                  file: null,
                  old: "",
                },

                job_op_tools_no: "1",
                job_op_tools_uses: [
                  {
                    job_op_tools_use_code: "",
                    job_op_tools_code: "",
                    toollife: "",
                    product_code: "",
                    job_op_tools_use_min: "",
                    job_op_tools_use_max: "",
                    job_op_tools_use_reorder: "",
                    job_op_tools_use_inactive: "",
                  },
                ],
              },
            ],
          },
        ],
      },
    };
  }

  componentDidMount() {
    this._fetchData();

    this.setState(
      {
        loading: true,
      },
      async () => {
        const { code } = this.props.match.params;

        const jobs_data = await job_model.getJobByCode({
          job_code: code,
        });

        this.setState({
          loading: false,
          jobs: jobs_data.data,
        });
      }
    );
  }

  async _fetchData() {
    const now = new Date();

    this.setState({
      loading: false,
    });
  }

  _refreshData() {
    this.setState({
      job: this.state.job,
    });
  }

  render() {
    return (
      <div>
        <Loading show={this.state.loading} />
        <Form onSubmit={(event) => this._handleSubmit(event)}>
          <Card>
            <CardHeader>
              <h3 className="text-header">รายละเอียดของงาน</h3>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md={4}>
                  <label>
                    รหัสงาน{" "}
                    <font color="#F00">
                      <b>*</b>
                    </font>
                  </label>
                  <br></br>
                  <label>{this.state.jobs.job_code}</label>
                </Col>
                <Col md={4}>
                  <label>
                    ชื่องาน{" "}
                    <font color="#F00">
                      <b>*</b>
                    </font>
                  </label>
                  <br></br>
                  <label>{this.state.jobs.job_name}</label>
                </Col>
                <Col md={4}>
                  <label>
                    ลำดับงาน{" "}
                    <font color="#F00">
                      <b>*</b>
                    </font>
                  </label>
                  <br></br>
                  <label>{this.state.jobs.job_no}</label>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <label>
                    จำนวนการผลิต{" "}
                    <font color="#F00">
                      <b>*</b>
                    </font>
                  </label>
                  <br></br>
                  <label>{this.state.jobs.job_cpp}</label>
                </Col>
                <Col md={4}>
                  <label>
                    วัสดุ{" "}
                    <font color="#F00">
                      <b>*</b>
                    </font>
                  </label>
                  <br></br>
                  <label>{this.state.jobs.job_material}</label>
                </Col>
                <Col md={4}>
                  <label>
                    ความแข็งของวัสดุ{" "}
                    <font color="#F00">
                      <b>*</b>
                    </font>
                  </label>
                  <br></br>
                  <label>{this.state.jobs.job_hardness}</label>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <FormGroup>
                    <label>
                      วันที่เริ่มการผลิต{" "}
                      <font color="#F00">
                        <b>*</b>
                      </font>
                    </label>
                    <br></br>
                    <label>{this.state.jobs.job_start}</label>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <label>
                      วันที่สิ้นสุดการผลิต{" "}
                      <font color="#F00">
                        <b>*</b>
                      </font>
                    </label>
                    <br></br>
                    <label>{this.state.jobs.job_end}</label>
                  </FormGroup>
                </Col>
              </Row>
              {this.state.jobs.job_ops.map((item_op, index_op) => {
                return (
                  <Row key={index_op}>
                    <Col md={12}>
                      <Card>
                        <CardHeader>กระบวนการ {index_op + 1} </CardHeader>

                        <CardBody>
                          <Row>
                            <Col md={2}>
                              <label>
                                ลำดับ{" "}
                                <font color="#F00">
                                  <b>*</b>
                                </font>
                              </label>
                              <br></br>
                              <label>{item_op.job_op_no}</label>
                            </Col>
                            <Col md={4}>
                              <label>
                                ชื่อกระบวนการ{" "}
                                <font color="#F00">
                                  <b>*</b>
                                </font>
                              </label>
                              <br></br>
                              <label>{item_op.job_op_name}</label>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={12}>
                              <Nav tabs>
                                <li
                                  className={`nav-link ${
                                    this.state.active_tab["op_" + index_op] !==
                                    "machine"
                                      ? "active"
                                      : ""
                                  }`}
                                  onClick={() => {
                                    let { active_tab } = this.state;
                                    active_tab["op_" + index_op] = "op";
                                    this.setState({ active_tab: active_tab });
                                  }}
                                >
                                  กระบวนการ{" "}
                                </li>

                                <li
                                  className={`nav-link ${
                                    this.state.active_tab["op_" + index_op] ===
                                    "machine"
                                      ? "active"
                                      : ""
                                  }`}
                                  onClick={() => {
                                    let { active_tab } = this.state;
                                    active_tab["op_" + index_op] = "machine";
                                    this.setState({ active_tab: active_tab });
                                  }}
                                >
                                  เครื่องจักร{" "}
                                </li>
                              </Nav>
                              <TabContent
                                activeTab={
                                  this.state.active_tab["op_" + index_op]
                                    ? this.state.active_tab["op_" + index_op]
                                    : "op"
                                }
                                style={{ border: "unset" }}
                              >
                                <TabPane
                                  tabId="op"
                                  style={{ padding: "unset" }}
                                >
                                  {item_op.job_op_tools.map(
                                    (item_op_tools, index_op_tools) => {
                                      return (
                                        <Card key={index_op_tools}>
                                          <CardBody>
                                            <CardHeader>
                                              ขั้นตอนที่ {index_op_tools + 1}
                                            </CardHeader>

                                            <Row>
                                              <Col md={4}>
                                                <label>
                                                  ชื่อขั้นตอน{" "}
                                                  <font color="#F00">
                                                    <b>*</b>
                                                  </font>
                                                </label>
                                                <br></br>
                                                <label>
                                                  {
                                                    item_op_tools.job_op_tools_name
                                                  }
                                                </label>
                                              </Col>
                                              <Col>
                                                <label>
                                                  ลำดับขั้นตอน{" "}
                                                  <font color="#F00">
                                                    <b>*</b>
                                                  </font>
                                                </label>
                                                <br></br>
                                                <label>
                                                  {
                                                    item_op_tools.job_op_tools_no
                                                  }
                                                </label>
                                              </Col>
                                              <Col md={4}>
                                                <label>
                                                  drawing{" "}
                                                  <font color="#F00">
                                                    <b>*</b>
                                                  </font>
                                                </label>
                                                <br></br>
                                                <label>
                                                  {" "}
                                                  <a
                                                    href={
                                                      GLOBAL.BASE_SERVER.URL +
                                                      item_op_tools.job_op_tools_drawing
                                                    }
                                                    target="_blank"
                                                  >
                                                    <i
                                                      className="fa fa-folder-open-o"
                                                      aria-hidden="true"
                                                    ></i>
                                                  </a>
                                                </label>
                                              </Col>
                                            </Row>
                                            <Row>
                                              <CardBody>
                                                <table className="table table-bordered center">
                                                  <thead>
                                                    <tr align="center">
                                                      <th width={50}>ลำดับ</th>
                                                      <th width={200}>
                                                        สินค้า
                                                      </th>
                                                      <th width={80}>อายุ</th>
                                                      <th width={80}>
                                                        จำนวนต่ำสุด
                                                      </th>
                                                      <th width={80}>
                                                        จำนวนสูงสุด
                                                      </th>
                                                      <th width={80}>
                                                        จุดสั่งซื้อใหม่
                                                      </th>
                                                      <th width={150}>สถานะ</th>
                                                    </tr>
                                                  </thead>
                                                  <tbody>
                                                    {item_op_tools.job_op_tools_uses.map(
                                                      (
                                                        item_op_tools_uses,
                                                        index_op_tools_uses
                                                      ) => {
                                                        return (
                                                          <tr
                                                            key={
                                                              index_op_tools_uses
                                                            }
                                                          >
                                                            <td>
                                                              {index_op_tools_uses +
                                                                1}
                                                            </td>
                                                            <td>
                                                              <label>
                                                                {
                                                                  item_op_tools_uses.product_name
                                                                }
                                                              </label>
                                                            </td>
                                                            <td>
                                                              <label>
                                                                {
                                                                  item_op_tools_uses.toollife
                                                                }
                                                              </label>
                                                            </td>
                                                            <td>
                                                              <label>
                                                                {
                                                                  item_op_tools_uses.job_op_tools_use_min
                                                                }
                                                              </label>
                                                            </td>
                                                            <td>
                                                              <label>
                                                                {
                                                                  item_op_tools_uses.job_op_tools_use_max
                                                                }
                                                              </label>
                                                            </td>
                                                            <td>
                                                              <label>
                                                                {
                                                                  item_op_tools_uses.job_op_tools_use_reorder
                                                                }
                                                              </label>
                                                            </td>
                                                            <td>
                                                              <label>
                                                                {
                                                                  item_op_tools_uses.job_op_tools_use_inactive
                                                                }
                                                              </label>
                                                            </td>
                                                          </tr>
                                                        );
                                                      }
                                                    )}
                                                  </tbody>
                                                  <tfoot></tfoot>
                                                </table>
                                              </CardBody>
                                            </Row>
                                          </CardBody>
                                        </Card>
                                      );
                                    }
                                  )}
                                </TabPane>
                                <TabPane
                                  tabId="machine"
                                  style={{ padding: "unset" }}
                                >
                                  <table className="table table-bordered table-hover">
                                    <thead>
                                      <tr>
                                        <th>ลำดับ</th>
                                        <th>เครื่องจักร</th>
                                        <th>จำนวนการผลิต</th>
                                        <th>วันที่เริ่มการผลิต</th>
                                        <th>วันที่สิ้นสุดการผลิต</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {item_op.job_op_machines.map(
                                        (item_machine, index_machine) => {
                                          return (
                                            <tr key={index_machine}>
                                              <td>{index_machine + 1}</td>
                                              <td>
                                                <label>
                                                  {item_machine.machine_name}
                                                </label>
                                              </td>
                                              <td>{item_machine.production}</td>
                                              <td>
                                                <label>
                                                  {item_machine.date_start}
                                                </label>
                                              </td>
                                              <td>
                                                <label>
                                                  {item_machine.date_end}
                                                </label>
                                              </td>
                                            </tr>
                                          );
                                        }
                                      )}
                                    </tbody>
                                    <tfoot></tfoot>
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
              })}
            </CardBody>
            <CardFooter className="text-right">
              <Link to="/job">
                <Button type="button">Back</Button>
              </Link>
            </CardFooter>
          </Card>
        </Form>
      </div>
    );
  }
}

export default Detail;
