import React from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  Button,
  CardHeader,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { NumberFormat, TimeFormat } from "../../../utils";

import { Loading, DatePicker } from "../../../component/revel-strap";

import ReportModel from "../../../models/ReportModel";

const report_model = new ReportModel();
const number_format = new NumberFormat();
const time_format = new TimeFormat();

class View extends React.Component {
  constructor(props) {
    super(props);

    var date = new Date();

    this.state = {
      loading: true,
      data: [],
      date_start: new Date(date.getFullYear(), date.getMonth(), 1),
      date_end: new Date(date.getFullYear(), date.getMonth() + 1, 0),
    };
  }

  componentDidMount() {
    this._fetchData();
  }

  _sendEmail() {
    Swal.fire({
      title: "คุณต้องการ ?",
      text: "ส่งรายงานสินค้าที่มีปัญหาไปยังอิเมล !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        this.setState(
          {
            loading: true,
          },
          async () => {
            const data = await report_model.sendIncidentReport({
              date_start: time_format.dateToStr(this.state.date_start),
              date_end: time_format.dateToStr(this.state.date_end),
              user_email: this.props.USER.user_email,
            });

            if (data) {
              Swal.fire(
                "ส่งอิเมลสำเร็จ!",
                "ระบบได้ทำการส่งอีเมล์ให้คุณเรียบร้อยแล้ว.",
                "success"
              );
            } else {
            }

            this.setState({
              loading: false,
            });
          }
        );
      }
    });
  }

  _fetchData() {
    this.setState(
      {
        loading: true,
      },
      async () => {
        const data = await report_model.getIncidentReport({
          date_start: time_format.dateToStr(this.state.date_start),
          date_end: time_format.dateToStr(this.state.date_end),
        });

        this.setState({
          loading: false,
          data: data.data,
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
              <Col md={1}>
                {" "}
                <Link to="/report">
                  <Button
                    type="button"
                    style={{ height: "80px", width: "120px" }}
                  >
                    {" "}
                    <i className="fas fa-arrow-left"></i>
                  </Button>
                </Link>
              </Col>
              <Col style={{ textAlign: "center", alignSelf: "center" }}>
                <h1>รายงานสินค้าที่มีปัญหา</h1>
              </Col>{" "}
              <Col md={1}></Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Row>
              <Col md="3">
                <Label>ตั่งเเต่วันที่ </Label>
                <DatePicker
                  format="DD/MM/YYYY"
                  id="date_start"
                  name="date_start"
                  value={this.state.date_start}
                  onChange={(e) => this.setState({ date_start: e })}
                  required
                  placeholder="dd/mm/yyyy"
                />
              </Col>
              <Col md="3">
                <Label>ถึงวันที่ </Label>
                <DatePicker
                  format="DD/MM/YYYY"
                  id="date_end"
                  name="date_end"
                  value={this.state.date_end}
                  onChange={(e) => this.setState({ date_end: e })}
                  required
                  placeholder="dd/mm/yyyy"
                />
              </Col>
              <Col md="6">
                <Label>ออกรายงาน </Label>
                <div>
                  <Button
                    type="button"
                    color="primary"
                    onClick={() => {
                      this._fetchData();
                    }}
                  >
                    ดูรายงาน
                  </Button>

                  <Button
                    type="button"
                    color="primary"
                    onClick={() => {
                      this._sendEmail();
                    }}
                  >
                    ส่งอีเมล์
                  </Button>
                </div>
              </Col>
            </Row>
            <br />
            <hr />
            <br />
            <Row>
              <Col>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <td style={{ textAlign: "center", fontWeight: "bold" }}>
                        วันที่
                      </td>
                      <td style={{ textAlign: "center", fontWeight: "bold" }}>
                        สินค้า
                      </td>
                      <td style={{ textAlign: "center", fontWeight: "bold" }}>
                        ประเภท
                      </td>
                      <td style={{ textAlign: "center", fontWeight: "bold" }}>
                        ประเภทการดำเนินการ
                      </td>
                      <td style={{ textAlign: "center", fontWeight: "bold" }}>
                        ช่องที่
                      </td>
                      <td style={{ textAlign: "center", fontWeight: "bold" }}>
                        ผู้ดำเนินการ
                      </td>
                      <td style={{ textAlign: "center", fontWeight: "bold" }}>
                        จำนวน
                      </td>
                      <td style={{ textAlign: "center", fontWeight: "bold" }}>
                        คงเหลือหลังดำเนินการ
                      </td>
                      <td style={{ textAlign: "center", fontWeight: "bold" }}>
                        ยืนยันคงเหลือหลังดำเนินการ
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.data?.map((item) => (
                      <tr
                        style={{
                          color:
                            parseInt(item.balance_qty) !==
                            parseInt(item.balance_confirm_qty)
                              ? "red"
                              : "#3c4b64",
                        }}
                      >
                        <td style={{ textAlign: "center" }}>
                          {item.event_date}
                        </td>
                        <td>
                          [{item.product_code}] {item.product_name}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.stock_product_type}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.stock_type}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.stock_layout_code}
                        </td>
                        <td style={{ textAlign: "center" }}>{item.fullname}</td>
                        <td style={{ textAlign: "right" }}>
                          {number_format.strFix(parseInt(item.stock_qty))}
                        </td>
                        <td style={{ textAlign: "right" }}>
                          {number_format.strFix(parseInt(item.balance_qty))}
                        </td>
                        <td style={{ textAlign: "right" }}>
                          {number_format.strFix(
                            parseInt(item.balance_confirm_qty)
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot></tfoot>
                </table>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default View;
