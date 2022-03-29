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
import { NumberFormat, TimeFormat } from "../../../utils";
import Swal from "sweetalert2";
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
      date_end: new Date(date.getFullYear(), date.getMonth() + 1, 0),
      cost_sum: 0,
      qty_sum: 0,
    };
  }

  componentDidMount() {
    this._fetchData();
  }

  _sendEmail() {
    Swal.fire({
      title: "คุณต้องการ ?",
      text: "ส่งรายงานสินค้าคงเหลือไปยังอิเมล !",
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
            const data = await report_model.sendLowStockReport({
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
        const data = await report_model.getLowStockReport({
          date_end: time_format.dateToStr(this.state.date_end),
        });

        let cost_sum = 0;
        let qty_sum = 0;

        for (let index = 0; index < data.data.length; index++) {
          const element = data.data[index];
          cost_sum +=
            parseInt(element.stock_amount) * parseFloat(element.product_price);
          qty_sum += parseInt(element.stock_amount);
        }

        this.setState({
          loading: false,
          data: data.data,
          cost_sum: cost_sum,
          qty_sum: qty_sum,
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
                <h1>รายงานสินค้าต่ำกว่าเกณฑ์</h1>
              </Col>{" "}
              <Col md={1}></Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Row>
              <Col md="3">
                <Label>ณ วันที่ </Label>
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
                        ลำดับ
                      </td>
                      <td style={{ textAlign: "center", fontWeight: "bold" }}>
                        สินค้า
                      </td>
                      <td style={{ textAlign: "center", fontWeight: "bold" }}>
                        จุดต่ำสุด (ชิ้น)
                      </td>
                      <td style={{ textAlign: "center", fontWeight: "bold" }}>
                        จุดสั่งซื้อ (ชิ้น)
                      </td>
                      <td style={{ textAlign: "center", fontWeight: "bold" }}>
                        จุดสูงสุด (ชิ้น)
                      </td>
                      {/* <td style={{ textAlign: "center", fontWeight: "bold" }}>
                        ยกยอดมา (ชิ้น)
                      </td>
                      <td style={{ textAlign: "center", fontWeight: "bold" }}>
                        รับเข้า (ชิ้น)
                      </td>
                      <td style={{ textAlign: "center", fontWeight: "bold" }}>
                        เบิกออก (ชิ้น)
                      </td> */}
                      <td style={{ textAlign: "center", fontWeight: "bold" }}>
                        จำนวนคงเหลือ (ชิ้น)
                      </td>

                      <td style={{ textAlign: "center", fontWeight: "bold" }}>
                        ราคาต่อชิ้น
                      </td>
                      <td style={{ textAlign: "center", fontWeight: "bold" }}>
                        ราคารวม
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.data?.map((item, index) => {
                      return (
                        <tr
                          style={{
                            color: item.stock_amount < 0 ? "red" : "#3c4b64",
                          }}
                        >
                          <td style={{ textAlign: "center" }}>
                            {number_format.strFix(parseInt(index + 1))}
                          </td>
                          <td>
                            [{item.product_code}] {item.product_name}
                          </td>
                          <td style={{ textAlign: "right" }}>
                            {number_format.strFix(
                              parseInt(item.product_min_qty)
                            )}
                          </td>
                          <td style={{ textAlign: "right" }}>
                            {number_format.strFix(
                              parseInt(item.product_safety_qty)
                            )}
                          </td>
                          <td style={{ textAlign: "right" }}>
                            {number_format.strFix(
                              parseInt(item.product_max_qty)
                            )}
                          </td>
                          {/* <td style={{ textAlign: "right" }}>
                            {number_format.strFix(parseInt(item.stock_balance))}
                          </td>
                          <td style={{ textAlign: "right" }}>
                            {number_format.strFix(parseInt(item.stock_in))}
                          </td>
                          <td style={{ textAlign: "right" }}>
                            {number_format.strFix(parseInt(item.stock_out))}
                          </td> */}
                          <td style={{ textAlign: "right" }}>
                            {number_format.strFix(parseInt(item.stock_amount))}
                          </td>
                          <td style={{ textAlign: "right" }}>
                            {number_format.strFix(
                              parseFloat(item.product_price),
                              2
                            )}
                          </td>
                          <td style={{ textAlign: "right" }}>
                            {number_format.strFix(
                              parseInt(item.stock_amount) *
                                parseFloat(item.product_price),
                              2
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td
                        colSpan={5}
                        style={{ textAlign: "center", fontWeight: "bold" }}
                      >
                        รวม
                      </td>
                      <td colSpan={1} style={{ textAlign: "right" }}>
                        {number_format.strFix(this.state.qty_sum)}
                      </td>
                      <td colSpan={1} style={{ textAlign: "right" }}>
                        -
                      </td>
                      <td colSpan={1} style={{ textAlign: "right" }}>
                        {number_format.strFix(this.state.cost_sum, 2)}
                      </td>
                    </tr>
                  </tfoot>
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
