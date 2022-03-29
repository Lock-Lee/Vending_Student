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
import { DatePicker } from "antd";

import { Select, Loading } from "../../../component/revel-strap";
import SupplierModel from "../../../models/SupplierModel";

import JobModel from "../../../models/JobModel";
import Production from "../../../models/Production";
import { TimeFormat } from "../../../utils";
const time_format = new TimeFormat();

const production_model = new Production();
const job_model = new JobModel();
class Insert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,

      production_code: "",
      production_date: "",
      production_qty: "",
      production_really: "",
      job_code: "",
      addby: "",
      adddate: "",
      jobs: [],
    };
  }

  componentDidMount() {
    this._fetchData();
  }

  async _fetchData() {
    const now = new Date();
    const last_code = await production_model.getProductionLastCode({
      code: `PC${now.getFullYear()}${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`,
      digit: 3,
    });
    const jobs = await job_model.getJobBy();
    this.setState({
      loading: false,
      production_code: last_code.data,
      jobs: jobs.data,
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
          const res = await production_model.insertProduction({
            production_code: this.state.production_code,
            production_date: time_format.dateToStrMY(
              this.state.production_date
            ),
            production_qty: this.state.production_qty,
            production_really: this.state.production_really,
            job_code: this.state.job_code,
            addby: this.props.USER.user_code,
            adddate: this.state.adddate,
          });

          if (res.require) {
            Swal.fire({ title: "บันทึกข้อมูลสำเร็จ !", icon: "success" });
            this.props.history.push("/settinganother/production");
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

  _checkSubmit() {
    if (this.state.production_code === "") {
      Swal.fire({
        title: "กรุณาระบุรหัส !",
        text: "Please Enter name",
        icon: "warning",
      });
      return false;
    } else if (this.state.job_code === "") {
      Swal.fire({
        title: "กรุณาเลือกงาน !",
        text: "Please Enter Job",
        icon: "warning",
      });
      return false;
    } else if (this.state.production_date === "") {
      Swal.fire({
        title: "กรุณาเลือกเดือนปี !",
        text: "Please Enter Job",
        icon: "warning",
      });
      return false;
    } else if (this.state.production_really === "") {
      Swal.fire({
        title: "กรุณาระบุจำนวนผลิตได้จริง !",
        text: "Please Enter Job",
        icon: "warning",
      });
      return false;
    } else if (this.state.production_qty === "") {
      Swal.fire({
        title: "กรุณาระบุจำนวนที่ตั้งเป้าหมายไว้ !",
        text: "Please Enter Job",
        icon: "warning",
      });
      return false;
    } else {
      return true;
    }
  }
  _onReset() {
    this.setState({
      production_date: "",
      production_qty: "",
      production_really: "",
      job_code: "",
    });
  }
  render() {
    const job_option = [
      { value: "", label: "เลือกงาน" },
      ...this.state.jobs.map((item) => ({
        value: item.job_code,
        label: item.job_name,
      })),
    ];

    return (
      <div>
        <Loading show={this.state.loading} />
        <Card>
          <CardHeader>
            <Row>
              {" "}
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
                <center>
                  {" "}
                  <h2 className="text-header">เพิ่มแผนผลิต</h2>
                </center>
              </Col>
              <Col></Col>
            </Row>
          </CardHeader>

          <Form onSubmit={(event) => this._handleSubmit(event)}>
            <CardBody>
              <Row>
                <Col md={2}>
                  <label>
                    รหัสแผนการผลิต
                    <font color="#F00"></font>
                  </label>
                  <Input
                    type="text"
                    value={this.state.production_code}
                    readOnly
                    onChange={(e) =>
                      this.setState({ production_code: e.target.value })
                    }
                    placeholder="รหัสแผนการผลิต"
                  />
                  <p className="text-muted">Example :</p>
                </Col>

                <Col md={2}>
                  <label>
                    รหัสงาน
                    <font color="#F00">
                      <b>*</b>
                    </font>
                  </label>
                  <Select
                    options={job_option}
                    value={this.state.job_code}
                    onChange={(e) => {
                      this.setState({ job_code: e });
                    }}
                  />

                  <p className="text-muted">Example :</p>
                </Col>
              </Row>
              <Row>
                {" "}
                <Col md={2}>
                  <label>
                    วันที่ผลิต{" "}
                    <font color="#F00">
                      <b>*</b>
                    </font>
                  </label>
                  <br></br>
                  <DatePicker
                    picker="month"
                    value={this.state.production_date}
                    onChange={(e) => {
                      this.setState({ production_date: e });
                    }}
                  />

                  <p className="text-muted"> Example : </p>
                </Col>
              </Row>
              <Row>
                <Col md={2}>
                  <label>
                    จำนวนที่ตั้งเป้าหมายไว้{" "}
                    <font color="#F00">
                      <b>*</b>
                    </font>
                  </label>
                  <Input
                    className="text-right"
                    type="number"
                    value={this.state.production_qty}
                    onChange={(e) =>
                      this.setState({ production_qty: e.target.value })
                    }
                    placeholder="จำนวนที่ตั้งเป้าหมายไว้"
                  />
                  <p className="text-muted">Example :</p>
                </Col>
                <Col md={2}>
                  <label>
                    จำนวนที่ผลิตได้จริง{" "}
                    <font color="#F00">
                      <b>*</b>
                    </font>
                  </label>
                  <Input
                    className="text-right"
                    type="number"
                    value={this.state.production_really}
                    onChange={(e) =>
                      this.setState({ production_really: e.target.value })
                    }
                    placeholder="จำนวนที่ผลิตได้จริง"
                  />
                  <p className="text-muted">Example :</p>
                </Col>
              </Row>
            </CardBody>

            <CardFooter className="text-right">
              <Button
                type="reset"
                onClick={() => this._onReset()}
                color="danger"
                style={{ height: "80px", width: "120px" }}
              >
                Reset
              </Button>
              <Button
                type="submit"
                color="success"
                style={{ height: "80px", width: "120px" }}
              >
                Save
              </Button>
            </CardFooter>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Insert;
