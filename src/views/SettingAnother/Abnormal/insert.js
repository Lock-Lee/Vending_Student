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
import { TimeFormat } from "../../../utils";

import { Loading, Select, DatePicker } from "../../../component/revel-strap";
import { BaseServerFile } from "../../../utils";
import IncidentModel from "../../../models/IncidentModel";
import IncidentTypeModel from "../../../models/IncidentTypeModel";
import ProductModel from "../../../models/ProductModel";
import JobModel from "../../../models/JobModel";
import JobOPModel from "../../../models/JobOPModel";
import MachineModel from "../../../models/MachineModel";
import UserModel from "../../../models/UserModel";
import GLOBAL from "../../../GLOBAL";
const jobop_model = new JobOPModel();
const job_model = new JobModel();
const base_server_file = new BaseServerFile();
const incident_model = new IncidentModel();
const product_model = new ProductModel();
const incidenttype_model = new IncidentTypeModel();
const machine_model = new MachineModel();
const user_model = new UserModel();
const time_format = new TimeFormat();
class Insert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      incident_code: "",
      incident_name: "",
      job_code: "",
      job_op_code: "",
      machine_code: "",
      product_code: "",
      shift: "",
      incident_type_code: "",
      user_code: "",
      incident_date: "",
      incident_detail: "",

      incident_image: {
        src: `${GLOBAL.BASE_SERVER.URL_IMG}default.png`,
        file: null,
        old: "",
      },
      addby: "",
      adddate: "",
      updateby: "",
      lastupdate: "",
      prodcut: [],
      incident_type: [],
      prodcut: [],
      job: [],
      job_op: [],
      machine: [],

      user: [],
      upload_path: "incident/",
    };
  }

  async componentDidMount() {
    const now = new Date();
    const last_code = await incident_model.getIncidentLastCode({
      code: `IC${now.getFullYear()}${(now.getMonth() + 1)
        .toString()
        .padStart(3, "0")}`,
      digit: 3,
    });

    const prodcut = await product_model.getProductBy();
    const job = await job_model.getJobBy();
    const job_op = await jobop_model.getJobOPBy({ job_code: "data" });
    const machine = await machine_model.getMachineBy();
    const user = await user_model.getUserBy();
    console.log(user);

    this.setState({
      incident_code: last_code.data,
      prodcut: prodcut.data,
      job: job.data,
      job_op: job_op.data,
      machine: machine.data,
      user: user.data,
    });
  }

  _handleSubmit(event) {
    event.preventDefault();

    this.setState(
      {
        loading: true,
      },
      async () => {
        if (this._checkSubmit()) {
          const res = await incident_model.insertIncident({
            incident_code: this.state.incident_code,
            incident_name: this.state.incident_name,
            job_code: this.state.job_code,
            job_op_code: this.state.job_op_code,
            machine_code: this.state.machine_code,
            product_code: this.state.product_code,
            shift: this.state.shift,
            incident_type_code: this.state.incident_type_code,
            user_code: this.state.user_code,
            incident_date: time_format.dateToStr(this.state.incident_date),
            incident_detail: this.state.incident_detail,
            incident_image: await base_server_file.uploadFile({
              src: this.state.incident_image,
              upload_path: this.state.upload_path,
            }),
            addby: this.state.addby,
            adddate: this.state.adddate,
          });
          if (res.require) {
            Swal.fire({ title: "บันทึกข้อมูลสำเร็จ !", icon: "success" });
            this.props.history.push("/settinganother/abnormal");
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
      }
    );
  }
  _onReset() {
    this.setState({});
  }
  _handleImageChange(img_name, e) {
    if (e.target.files.length) {
      let file = new File([e.target.files[0]], e.target.files[0].name, {
        type: e.target.files[0].type,
      });

      if (file) {
        let reader = new FileReader();

        reader.onloadend = () => {
          this.setState((state) => {
            if (img_name === "incident_image") {
              return {
                incident_image: {
                  src: reader.result,
                  file: file,
                  old: state.incident_image.old,
                },
              };
            }
          });
        };
        reader.readAsDataURL(file);
      }
    }
  }
  _checkSubmit() {
    if (this.state.product_code === "") {
      Swal.fire("กรุณาเลือกสินค้า !", "", "error");
      this.setState({
        loading: false,
      });
    } else if (this.state.incident_name === "") {
      Swal.fire("กรุณากรอกชื่อ !", "", "error");
      this.setState({
        loading: false,
      });
    } else if (this.state.job_code === "") {
      Swal.fire("กรุณาเลือกงาน !", "", "error");
      this.setState({
        loading: false,
      });
    } else if (this.state.incident_date === "") {
      Swal.fire("กรุณาเลือกสิวันที่ !", "", "error");
      this.setState({
        loading: false,
      });
    } else if (this.state.user_code === "") {
      Swal.fire("กรุณาเลือกผู้ใช้ !", "", "error");
      this.setState({
        loading: false,
      });
    } else if (this.state.machine_code === "") {
      Swal.fire("กรุณาเลือกเครื่องจักร !", "", "error");
      this.setState({
        loading: false,
      });
    } else if (this.state.shift === "") {
      Swal.fire("กรุณาเลือกเวลาการทำงาน !", "", "error");
      this.setState({
        loading: false,
      });
    } else if (this.state.incident_type_code === "") {
      Swal.fire("กรุณาเลือกประเภท!", "", "error");
      this.setState({
        loading: false,
      });
    } else {
      return true;
    }
  }
  async _Selecjob_op(data) {
    const job_op = await jobop_model.getJobOPByCode({ job_code: data });
    this.setState({
      job_op: job_op.data,
    });
  }
  render() {
    const prodcut_options = [
      { label: "- เลือกสินค้า -", value: "" },
      ...this.state.prodcut.map((item) => ({
        label: item.product_name,
        value: item.product_code,
      })),
    ];
    const job_options = [
      { label: "- เลือกสินค้า -", value: "" },
      ...this.state.job.map((item) => ({
        label: item.job_name,
        value: item.job_code,
      })),
    ];
    const job_op_options = [
      { label: "- เลือกสินค้า -", value: "" },
      ...this.state.job_op.map((item) => ({
        label: item.job_op_name,
        value: item.job_op_code,
      })),
    ];
    const machine_options = [
      { label: "- เลือกสินค้า -", value: "" },
      ...this.state.machine.map((item) => ({
        label: item.machine_name,
        value: item.machine_code,
      })),
    ];
    const incident_type_options = [
      { label: "- เลือกประเภท -", value: "" },
      { label: "เสื่อมสภาพ", value: "wornout" },
      { label: "สูญหาย", value: "lost" },
      { label: "แตกหัก", value: "ิbroken" },
      { label: "อื่นๆ", value: "etc" },
    ];
    const shift_options = [
      { label: "- เลือกเวลาการทำงาน -", value: "" },
      { label: "กลางวัน", value: "D" },
      { label: "กลางคืน", value: "N" },
    ];
    const user_options = [
      { label: "- เลือกสินค้า -", value: "" },
      ...this.state.user.map((item) => ({
        value: item.user_code,
        label: item.fullname,
      })),
    ];

    return (
      <div>
        <Loading show={this.state.loading} />
        <Card>
          <CardHeader>
            <Row>
              <Col>
                {" "}
                <Link to="/settinganother/abnormal">
                  <Button
                    type="button"
                    style={{ height: "80px", width: "120px" }}
                  >
                    {" "}
                    <i className="fas fa-arrow-left"></i>
                  </Button>
                </Link>
              </Col>
              <Col style={{ textAlign: "center" }}>
                {" "}
                <lable>
                  <h2> เพิ่มเครื่องมือที่ชำรุด </h2>
                </lable>
              </Col>{" "}
              <Col></Col>
            </Row>
          </CardHeader>
          <Form onSubmit={(event) => this._handleSubmit(event)}>
            <CardBody>
              <Row>
                <Col md={6}>
                  <Row>
                    <Col>
                      {" "}
                      <label>
                        รหัสรายการสินค้าชำรุด{" "}
                        <font color="#F00">
                          <b>*</b>
                        </font>
                      </label>
                      <Input
                        type="text"
                        value={this.state.incident_code}
                        readOnly
                        onChange={(e) =>
                          this.setState({ incident_code: e.target.value })
                        }
                        placeholder="incident_code"
                      />
                      <p className="text-muted">Example :</p>
                    </Col>
                    <Col>
                      {" "}
                      <label>
                        ชื่อ{" "}
                        <font color="#F00">
                          <b>*</b>
                        </font>
                      </label>
                      <Input
                        type="text"
                        value={this.state.incident_name}
                        onChange={(e) =>
                          this.setState({ incident_name: e.target.value })
                        }
                        placeholder="incident_name"
                      />
                      <p className="text-muted">Example :</p>
                    </Col>
                    <Col></Col>
                  </Row>
                  <Row>
                    <Col>
                      <label>
                        {" "}
                        งาน
                        <font color="#F00">
                          <b>*</b>
                        </font>
                      </label>
                      <div className="input-group">
                        <Select
                          options={job_options}
                          value={this.state.job_code}
                          onChange={(e) => {
                            this.setState(
                              {
                                job_code: e,
                              },
                              () => {
                                this._Selecjob_op(this.state.job_code);
                              }
                            );
                          }}
                        />
                      </div>
                      <p className="text-muted">Example :</p>
                    </Col>
                    <Col>
                      <label>
                        {" "}
                        กระบวนการ
                        <font color="#F00"></font>
                      </label>
                      <div className="input-group">
                        <Select
                          options={job_op_options}
                          value={this.state.job_op_code}
                          onChange={(e) => {
                            this.setState({
                              job_op_code: e,
                            });
                          }}
                        />
                      </div>
                      <p className="text-muted">Example :</p>
                    </Col>
                    <Col>
                      <label>
                        {" "}
                        เครื่องจักร
                        <font color="#F00">
                          <b>*</b>
                        </font>
                      </label>
                      <div className="input-group">
                        <Select
                          options={machine_options}
                          value={this.state.machine_code}
                          onChange={(e) => {
                            this.setState({
                              machine_code: e,
                            });
                          }}
                        />
                      </div>
                      <p className="text-muted">Example :</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <label>
                        {" "}
                        สินค้า
                        <font color="#F00">
                          <b>*</b>
                        </font>
                      </label>
                      <div className="input-group">
                        <Select
                          options={prodcut_options}
                          value={this.state.product_code}
                          onChange={(e) => {
                            this.setState({
                              product_code: e,
                            });
                          }}
                        />
                      </div>
                      <p className="text-muted">Example :</p>
                    </Col>
                    <Col>
                      <label>
                        {" "}
                        ประเภทการชำรุด
                        <font color="#F00">
                          <b>*</b>
                        </font>
                      </label>
                      <div className="input-group">
                        <Select
                          options={incident_type_options}
                          value={this.state.incident_type_code}
                          onChange={(e) => {
                            this.setState({
                              incident_type_code: e,
                            });
                          }}
                        />
                      </div>
                      <p className="text-muted">Example :</p>
                    </Col>
                    <Col>
                      <label>
                        {" "}
                        เวลาการทำงาน
                        <font color="#F00">
                          <b>*</b>
                        </font>
                      </label>
                      <div className="input-group">
                        <Select
                          options={shift_options}
                          value={this.state.shift}
                          onChange={(e) => {
                            this.setState({
                              shift: e,
                            });
                          }}
                        />
                      </div>
                      <p className="text-muted">Example :</p>
                    </Col>
                  </Row>{" "}
                  <Row>
                    <Col>
                      <label>
                        {" "}
                        ผู้ใช้
                        <font color="#F00">
                          <b>*</b>
                        </font>
                      </label>
                      <div className="input-group">
                        <Select
                          options={user_options}
                          value={this.state.user_code}
                          onChange={(e) => {
                            this.setState({
                              user_code: e,
                            });
                          }}
                        />
                      </div>
                      <p className="text-muted">Example :</p>
                    </Col>
                    <Col>
                      <label>
                        {" "}
                        วันที่
                        <font color="#F00">
                          <b>*</b>
                        </font>
                      </label>
                      <div className="input-group">
                        <DatePicker
                          format={"DD/MM/YYYY"}
                          value={time_format.dateToStr(
                            this.state.incident_date
                          )}
                          onChange={(e) => {
                            this.setState({
                              incident_date: e,
                            });
                          }}
                        />
                      </div>
                      <p className="text-muted">Example :20/02/2022</p>
                    </Col>
                    <Col>
                      <label>
                        {" "}
                        รายละเอียด
                        <font color="#F00"></font>
                      </label>
                      <div className="input-group">
                        <Input
                          type="textarea"
                          value={this.state.incident_detail}
                          onChange={(e) =>
                            this.setState({ incident_detail: e.target.value })
                          }
                        />
                      </div>
                      <p className="text-muted">Example :</p>
                    </Col>
                  </Row>
                </Col>
                <Col md={6}>
                  <Row>
                    {" "}
                    <Col>
                      <center>
                        {" "}
                        <label>รูป </label>
                        <FormGroup className="text-center">
                          <img
                            style={{ maxWidth: 280 }}
                            src={this.state.incident_image.src}
                            alt="incident_image"
                          />
                        </FormGroup>
                        <FormGroup
                          className="text-center"
                          style={{ display: "inline-table" }}
                        >
                          <div>
                            {" "}
                            <Input
                              type="file"
                              accept="image/png, image/jpeg"
                              onChange={(e) =>
                                this._handleImageChange("incident_image", e)
                              }
                            />
                          </div>
                        </FormGroup>
                      </center>
                    </Col>
                  </Row>
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
                onChange={(e) => this._onReset()}
                color="danger"
              >
                {" "}
                รีเซ็ต
              </Button>
            </CardFooter>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Insert;
