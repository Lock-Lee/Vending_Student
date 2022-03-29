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
import GLOBAL from "../../../GLOBAL";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { TimeFormat } from "../../../utils";
import { Loading, Select, DatePicker } from "../../../component/revel-strap";
import { BaseServerFile } from "../../../utils";
import SuccessModel from "../../../models/SuccessModel";
import JobModel from "../../../models/JobModel";
import JobOPModel from "../../../models/JobOPModel";
import JobOPToolsModel from "../../../models/JobOPToolsModel";
import ProductModel from "../../../models/ProductModel";
const success_model = new SuccessModel();
const product_model = new ProductModel();
const jobop_model = new JobOPModel();
const job_model = new JobModel();
const joboptools_model = new JobOPToolsModel();
const base_server_file = new BaseServerFile();
const time_format = new TimeFormat();
class Insert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      success_code: "",
      success_name: "",
      job_code: "",
      job_op_tools_code: "",
      job_op_code: "",
      product_code: "",
      success_date: "",
      success_result: "",
      success_detail: "",
      success_image: {
        src: `${GLOBAL.BASE_SERVER.URL_IMG}default.png`,
        file: null,
        old: "",
      },
      success_partname: "",
      success_material: "",
      addby: "",
      adddate: "",
      updateby: "",
      lastupdate: "",
      prodcut: [],
      job: [],
      job_op: [],
      job_op_tools: [],
      upload_path: "success/",
    };
  }

  async componentDidMount() {
    const now = new Date();
    const last_code = await success_model.getSuccessLastCode({
      code: `SC${now.getFullYear()}${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`,
      digit: 2,
    });
    const job = await job_model.getJobBy();

    const prodcut = await product_model.getProductBy();

    this.setState({
      success_code: last_code.data,
      prodcut: prodcut.data,
      job: job.data,
    });
  }
  async _Selecjob_op(data) {
    const job_op = await jobop_model.getJobOPByCode({ job_code: data });
    this.setState({
      job_op: job_op.data,
    });
  }
  async _Selecjob_op_tools(data) {
    const job_op_tools = await joboptools_model.getJobOPToolsByCode({
      job_op_code: data,
      key: "tools",
    });

    this.setState({
      job_op_tools: job_op_tools.data,
    });
  }
  _handleSubmit(event) {
    event.preventDefault();

    if (this._checkSubmit()) {
      this.setState({}, async () => {
        const res = await success_model.insertSuccess({
          success_code: this.state.success_code,
          success_name: this.state.success_name,
          job_code: this.state.job_code,
          job_op_tools_code: this.state.job_op_tools_code,
          job_op_code: this.state.job_op_code,
          product_code: this.state.product_code,
          success_date: time_format.dateToStr(this.state.success_date),
          success_result: this.state.success_result,
          success_detail: this.state.success_detail,
          success_image: await base_server_file.uploadFile({
            src: this.state.success_image,
            upload_path: this.state.upload_path,
          }),
          success_partname: this.state.success_partname,
          success_material: this.state.success_material,
          addby: this.state.addby,
          adddate: this.state.adddate,
          updateby: this.state.updateby,
          lastupdate: this.state.lastupdate,
        });
        if (res.require) {
          Swal.fire({ title: "บันทึกข้อมูลสำเร็จ !", icon: "success" });
          this.props.history.push("/settinganother/TRP");
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
      });
    }
  }
  _onReset() {
    this.setState({});
  }

  _checkSubmit() {
    if (this.state.product_code === "") {
      Swal.fire("กรุณากรอกเครื่องมือ !", "", "error");
      return false;
    } else if (this.state.success_name === "") {
      Swal.fire("กรุณากรอกชื่อการทดสอบ !", "", "error");
      return false;
    } else if (this.state.job_code === "") {
      Swal.fire("กรุณากรอกงาน !", "", "error");
      return false;
    } else if (this.state.product_code === "") {
      Swal.fire("กรุณากรอกเครื่องมือ !", "", "error");
      return false;
    } else if (this.state.success_date === "") {
      Swal.fire("กรุณากรอกวันที่ !", "", "error");
      return false;
    } else if (this.state.success_result === "") {
      Swal.fire("กรุณากรอกผลลัพท์ !", "", "error");
      return false;
    } else if (this.state.success_partname === "") {
      Swal.fire("กรุณากรอกชิ้นส่วน !", "", "error");
      return false;
    } else if (this.state.success_material === "") {
      Swal.fire("กรุณากรอกวัสดุ !", "", "error");
      return false;
    } else {
      return true;
    }
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
            if (img_name === "success_image") {
              return {
                success_image: {
                  src: reader.result,
                  file: file,
                  old: state.success_image.old,
                },
              };
            }
          });
        };
        reader.readAsDataURL(file);
      }
    }
  }
  render() {
    const prodcut_options = [
      { label: "- เลือกสินค้า -", value: "" },
      ...this.state.prodcut.map((item) => ({
        label: item.product_name,
        value: item.product_code,
      })),
    ];
    const job_op_options = [
      { label: "- เลือกกระบวนการ -", value: "" },
      ...this.state.job_op.map((item) => ({
        label: item.job_op_name,
        value: item.job_op_code,
      })),
    ];
    const job_options = [
      { label: "- เลือกงาน -", value: "" },
      ...this.state.job.map((item) => ({
        label: item.job_name,
        value: item.job_code,
      })),
    ];
    const job_op_tools_options = [
      { label: "- เลือกขั้นตอน -", value: "" },
      ...this.state.job_op_tools.map((item) => ({
        label: item.job_op_tools_name,
        value: item.job_op_tools_code,
      })),
    ];
    const success_result_options = [
      { label: "- เลือก -", value: "" },
      { label: "ผ่าน", value: "Finish" },
      { label: "ไม่สำเร็จ", value: "Failed" },
    ];
    return (
      <div>
        <Loading show={this.state.loading} />
        <Card>
          <CardHeader>
            <Row>
              <Col>
                {" "}
                <Link to="/settinganother/TRP">
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
                  <h2>เพิ่มการทดสอบเครื่องมือ</h2>
                </lable>
              </Col>{" "}
              <Col></Col>
            </Row>
          </CardHeader>
          <Form onSubmit={(event) => this._handleSubmit(event)}>
            <CardBody>
              <Row>
                <Col>
                  <Row>
                    <Col md={3}>
                      {" "}
                      <label>
                        รหัสการทดสอบ{" "}
                        <font color="#F00">
                          <b>*</b>
                        </font>
                      </label>
                      <Input
                        type="text"
                        value={this.state.success_code}
                        readOnly
                        onChange={(e) =>
                          this.setState({ success_code: e.target.value })
                        }
                        placeholder="success_code"
                      />
                      <p className="text-muted">Example :</p>
                    </Col>
                    <Col md={3}>
                      {" "}
                      <label>
                        ชื่อการทดสอบ{" "}
                        <font color="#F00">
                          <b>*</b>
                        </font>
                      </label>
                      <Input
                        type="text"
                        value={this.state.success_name}
                        onChange={(e) =>
                          this.setState({ success_name: e.target.value })
                        }
                        placeholder="ชื่อการทดสอบ"
                      />
                      <p className="text-muted">Example :</p>
                    </Col>
                    <Col md={3}>
                      <label>
                        {" "}
                        ชื่องาน
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
                  </Row>
                  <Row>
                    <Col md={3}>
                      <label>
                        {" "}
                        ชื่อกระบวนการ
                        <font color="#F00"></font>
                      </label>
                      <div className="input-group">
                        <Select
                          options={job_op_options}
                          value={this.state.job_op_code}
                          onChange={(e) => {
                            this.setState(
                              {
                                job_op_code: e,
                              },
                              () => {
                                this._Selecjob_op_tools(this.state.job_op_code);
                              }
                            );
                          }}
                        />
                      </div>
                      <p className="text-muted">Example :</p>
                    </Col>
                    <Col md={3}>
                      <label>
                        {" "}
                        ชื่อขั้นตอน
                        <font color="#F00"></font>
                      </label>
                      <div className="input-group">
                        <Select
                          options={job_op_tools_options}
                          value={this.state.job_op_tools_code}
                          onChange={(e) => {
                            this.setState({
                              job_op_tools_code: e,
                            });
                          }}
                        />
                      </div>
                      <p className="text-muted">Example :</p>
                    </Col>
                    <Col md={3}>
                      {" "}
                      <label>
                        วัสดุ{" "}
                        <font color="#F00">
                          <b>*</b>
                        </font>
                      </label>
                      <Input
                        type="text"
                        value={this.state.success_material}
                        onChange={(e) =>
                          this.setState({ success_material: e.target.value })
                        }
                        placeholder="success_code"
                      />
                      <p className="text-muted">Example :</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={3}>
                      <label>
                        {" "}
                        เครื่องมือ
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
                    <Col md={3}>
                      {" "}
                      <label>
                        วันที่{" "}
                        <font color="#F00">
                          <b>*</b>
                        </font>
                      </label>
                      <DatePicker
                        format={"DD/MM/YYYY"}
                        value={time_format.dateToStr(this.state.success_date)}
                        onChange={(e) => {
                          this.setState({
                            success_date: e,
                          });
                        }}
                      />
                      <p className="text-muted">Example :</p>
                    </Col>
                  </Row>
                  <Row>
                    {" "}
                    <Col md={3}>
                      {" "}
                      <label>
                        ชื่อชิ้นส่วน{" "}
                        <font color="#F00">
                          <b>*</b>
                        </font>
                      </label>
                      <Input
                        type="text"
                        value={this.state.success_partname}
                        onChange={(e) =>
                          this.setState({ success_partname: e.target.value })
                        }
                        placeholder="success_partname"
                      />
                      <p className="text-muted">Example :</p>
                    </Col>
                    <Col md={3}>
                      <label>
                        {" "}
                        ผลลัพท์
                        <font color="#F00">
                          <b>*</b>
                        </font>
                      </label>
                      <div className="input-group">
                        <Select
                          options={success_result_options}
                          value={this.state.success_result}
                          onChange={(e) => {
                            this.setState({
                              success_result: e,
                            });
                          }}
                        />
                      </div>
                      <p className="text-muted">Example :</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      {" "}
                      <label>รายละเอียด</label>
                      <Input
                        type="textarea"
                        name="text"
                        id="exampleText"
                        onChange={(e) => {
                          this.setState({
                            success_detail: e.target.value,
                          });
                        }}
                        value={this.state.success_detail}
                      />
                      <p className="text-muted">Example :</p>
                    </Col>
                  </Row>
                </Col>
                <Col md={4}>
                  <label>รูป </label>
                  <FormGroup className="text-center">
                    <img
                      style={{ maxWidth: 150 }}
                      src={this.state.success_image.src}
                      alt="success_image"
                    />
                  </FormGroup>
                  <FormGroup className="text-center">
                    <Input
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={(e) =>
                        this._handleImageChange("success_image", e)
                      }
                    />
                  </FormGroup>
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
