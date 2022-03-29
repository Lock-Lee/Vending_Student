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
import moment from "moment";
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
class Update extends React.Component {
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
    const { code } = this.props.match.params;
    const data = await production_model.getProductionByCode({
      production_code: code,
    });
    const {
      production_code,
      production_date,
      production_qty,
      production_really,
      job_code,
    } = data.data[0];
    const jobs = await job_model.getJobBy();
    console.log(time_format.dateToStrMY(production_date));
    this.setState({
      loading: false,
      production_code,
      production_date,
      production_qty,
      production_really,
      job_code,
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
          const res = await production_model.updateProductionBy({
            production_code: this.state.production_code,
            production_date: time_format.dateToStrMY(
              this.state.production_date
            ),
            production_qty: this.state.production_qty,
            production_really: this.state.production_really,
            job_code: this.state.job_code,
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
        title: "กรุณาระบุชื่อ !",
        text: "Please Enter Full Name",
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
    const job_option = this.state.jobs.map((item) => ({
      value: item.job_code,
      label: item.job_name,
    }));
    const monthFormat = "YYYY/MM";
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
                  <h2 className="text-header">แก้ไขแผนผลิต</h2>
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
                    <font color="#F00">
                      <b>*</b>
                    </font>
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
                    งาน
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
                    value={moment(`${this.state.production_date}`, monthFormat)}
                    format={monthFormat}
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

export default Update;
