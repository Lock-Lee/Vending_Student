import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardImg,
  CardTitle,
  Col,
  FormGroup,
  Input,
  Row,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import GLOBAL from "../../../../../GLOBAL";
import Swal from "sweetalert2";
import ReportModel from "../../../../../models/ReportModel";
const report_model = new ReportModel();
export class Select_compart_type extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      count_slot: [],
      date_issue: [],
      count_isuse: [],
      isuse_New: [],
      isuse_RF: [],
      isuse_Loan: [],
      isuse_Old: [],
      disabled: [],
    };
  }
  componentDidMount() {
    this._fetchData();
  }

  componentDidUpdate(props_old) {
    let count_slot = this.props.count_slot;
    if (this.state.count_slot != count_slot) {
      this.setState({
        count_slot: count_slot,
        loading: false,
      });
    }
  }
  _getlastWeek(d) {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6 : 6);
    var result = new Date(d.setDate(diff));
    var event_date = `${result.getFullYear()}${"-"}${(result.getMonth() + 1)
      .toString()
      .padStart(2, "0")}${"-"}${result.getDate()} `;
    return event_date;
  }
  _getstartWeek(d) {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6 : 0);
    var result = new Date(d.setDate(diff));
    var event_date = `${result.getFullYear()}${"-"}${(result.getMonth() + 1)
      .toString()
      .padStart(2, "0")}${"-"}${result.getDate()}`;

    return event_date;
  }
  _getstartMonth() {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

    var event_date = `${firstDay.getFullYear()}${"-"}${(firstDay.getMonth() + 1)
      .toString()
      .padStart(2, "0")}${"-"}${firstDay.getDate()}`;
    return event_date;
  }
  _getlastMonth() {
    var date = new Date();
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    var event_date = `${lastDay.getFullYear()}${"-"}${(lastDay.getMonth() + 1)
      .toString()
      .padStart(2, "0")}${"-"}${lastDay.getDate()}`;
    return event_date;
  }
  _fetchData() {
    var date = new Date();
    var date_start = `${date.getFullYear()}${"-"}${date.getMonth() + 1
      }${"-"}${date.getDate()}`;
    var date_end = `${date.getFullYear()}${"-"}${date.getMonth() + 1}${"-"}${date.getDate() + 1
      }`;

    let { date_issue } = this.state;
    this.props.license_product.filter((val) => {
      if (val.withdraw_time_type === "Week") {
        date_issue.push({
          stock_product_type: val.stock_product_type,
          date_start: this._getstartWeek(new Date()),
          date_end: this._getlastWeek(new Date()),
        });
      } else if (val.withdraw_time_type === "Month") {
        date_issue.push({
          stock_product_type: val.stock_product_type,
          date_start: this._getstartMonth(new Date()),
          date_end: this._getlastMonth(new Date()),
        });
      } else if (val.withdraw_time_type === "Day") {
        date_issue.push({
          stock_product_type: val.stock_product_type,
          date_start: date_start,
          date_end: date_end,
        });
      }
    });

    this.setState(
      {
        date_issue: date_issue,
      },
      () => {
        this._handleCheck_issue();
      }
    );
  }
  async _handleCheck_issue() {
    let { date_issue } = this.state;
    this.props.license_product.filter((val, i) => {
      if (val.withdraw_type === "1") {
        if (
          date_issue.find(
            (data) => data.stock_product_type == val.stock_product_type
          )
        ) {
          this.setState({ loading: true }, () => {
            this._dataIssue(date_issue[i], val.stock_product_type);
          });
        }
      }
    });
  }
  async _dataIssue(date_issue, stock_product_type) {
    let { count_isuse, isuse_RF, isuse_New, isuse_Loan, isuse_Old } =
      this.state;
    const sum_of_products = await report_model.getIssueReport({
      user_code: this.props.user_code,
      product_code: this.props.product_select.product_code,
      date_start: date_issue.date_start,
      date_end: date_issue.date_end,
      stock_product_type: stock_product_type,
    });

    sum_of_products.data.filter((val) => {
      if (val.stock_product_type === "New") {
        isuse_New.push(val);
      } else if (val.stock_product_type === "RF") {
        isuse_RF.push(val);
      } else if (val.stock_product_type === "Loan") {
        isuse_Loan.push(val);
      } else if (val.stock_product_type === "Old") {
        isuse_Old.push(val);
      }
    });

    this.setState(
      {
        isuse_New: isuse_New,
        isuse_RF: isuse_RF,
        isuse_Loan: isuse_Loan,
        isuse_Old: isuse_Old,
      },
      () => {
        let { count_isuse, disabled } = this.state;

        if (stock_product_type === "New") {
          if (
            this.props.product_select.product_issue_type === "Full" ||
            this.props.product_select.product_issue_type === "Piecemeal"
          ) {
            count_isuse.push({
              withdraw_qty: isuse_New.length,
              stock_product_type: "New",
            });
          } else {
            this.state.isuse_New.forEach((val) => {
              count_isuse.push({
                withdraw_qty: count_isuse.withdraw_qty + val.stock_qty,
                stock_product_type: "New",
              });
            });
          }
        }
        if (stock_product_type === "RF") {
          if (
            this.props.product_select.product_issue_type === "Full" ||
            this.props.product_select.product_issue_type === "Piecemeal"
          ) {
            count_isuse.push({
              withdraw_qty: isuse_RF.length,
              stock_product_type: "RF",
            });
          } else {
            this.state.isuse_RF.forEach((val) => {
              count_isuse.push({
                withdraw_qty: count_isuse.withdraw_qty + val.stock_qty,
                stock_product_type: "RF",
              });
            });
          }
        }
        if (stock_product_type === "Loan") {
          if (
            this.props.product_select.product_issue_type === "Full" ||
            this.props.product_select.product_issue_type === "Piecemeal"
          ) {
            count_isuse.push({
              withdraw_qty: isuse_Loan.length,
              stock_product_type: "Loan",
            });
          } else {
            this.state.isuse_Loan.forEach((val) => {
              count_isuse.push({
                withdraw_qty: isuse_Loan.withdraw_qty + val.stock_qty,
                stock_product_type: "Loan",
              });
            });
          }
        }

        if (stock_product_type === "Old") {
          if (
            this.props.product_select.product_issue_type === "Full" ||
            this.props.product_select.product_issue_type === "Piecemeal"
          ) {
            count_isuse.push({
              withdraw_qty: isuse_Old.length,
              stock_product_type: "Old",
            });
          } else {
            this.state.isuse_Old.forEach((val) => {
              count_isuse.push({
                withdraw_qty: count_isuse.withdraw_qty + val.stock_qty,
                stock_product_type: "Old",
              });
            });
          }
        }

        this.props.license_product.filter((val, index) => {
          if (
            count_isuse.find(
              (data) => val.stock_product_type === data.stock_product_type
            )
          ) {
            if (
              val.withdraw_qty >=
              count_isuse.find(
                (data) => val.stock_product_type === data.stock_product_type
              ).withdraw_qty ||
              count_isuse.find(
                (data) => val.stock_product_type === data.stock_product_type
              ).withdraw_qty >= val.withdraw_qty
            ) {
              if (disabled[index]?.stock_product_type === undefined) {
                disabled.push({
                  stock_product_type: val.stock_product_type,
                  disabled: true,
                });
              } else {
              }
            } else {
              if (disabled[index]?.stock_product_type === undefined) {
                disabled.push({
                  stock_product_type: val.stock_product_type,
                  disabled: false,
                });
              }
            }
          }
        });

        this.setState(
          {
            count_isuse: count_isuse,
            loading: false,
            disabled: disabled,
          },
          () => { }
        );
      }
    );
  }

  render() {
    let product_issue_type_thai = "";
    let product_issue_type = this.props.product_select.product_issue_type;

    if (product_issue_type === "Full") {
      product_issue_type_thai = "เต็มจำนวน";
    } else if (product_issue_type === "Setpiece") {
      product_issue_type_thai = "ระบุจำนวน";
    } else if (product_issue_type === "Piecemeal") {
      product_issue_type_thai = "กำหนดจำนวน";
    }
    let product_unit = this.props.product_select.product_unit;
    let product_unit_thai = "";
    if (product_unit === "piece") {
      product_unit_thai = "ชิ้น";
    } else if (product_unit === "box") {
      product_unit_thai = "กล่อง";
    }

    let name_thai = [{
      product_unit_thai: product_unit_thai,
      product_issue_type_thai: product_issue_type_thai,
    }]

    return (
      <>
        <ModalHeader style={{ display: "block" }} className="haedermodel">
          <center>
            <h3>เลือกประเภทช่อง</h3>
          </center>
        </ModalHeader>
        <CardHeader>
          <Row>
            <Col md={4}>
              <Row>
                <CardImg
                  variant="top"
                  style={{ width: "150px", height: "150px", margin: "auto" }}
                  src={
                    this.props.product_select?.product_image
                      ? GLOBAL.BASE_SERVER.URL_IMG +
                      this.props.product_select.product_image
                      : GLOBAL.BASE_SERVER.URL_IMG + "default.png"
                  }
                />
              </Row>
            </Col>
            <Col md={4}>
              <Col>
                <h3>
                  <b>ชื่อสินค้า:</b> {this.props.product_select.product_name}
                </h3>
              </Col>
              <Col>
                <h6>
                  <b>รหัสสินค้า:</b> {this.props.product_select.product_code}
                </h6>
              </Col>
              <Col>
                <h6>
                  <b>ประเภทสินค้า:</b> {this.props.product_type_name}
                </h6>
              </Col>
              <Col>
                <h6>
                  <b>กลุ่มสินค้า:</b> {this.props.product_group_name}
                </h6>
              </Col>
              <Col>
                <h6>
                  <b>ยี่ห้อสินค้า:</b> {this.props.product_brand_name}
                </h6>
              </Col>
            </Col>
            <Col md={4}>
              <Col>
                <h3>
                  <br></br>
                </h3>
              </Col>
              <Col>
                <h6>
                  <b>ขนาดช่อง:</b> {this.props.product_select.product_size}{" "}
                  <b>{"มม."}</b>
                </h6>
              </Col>
              <Col>
                <h6>
                  <b>หน่วยต่อจำนวน:</b>{" "}
                  {this.props.product_select.product_package_qty}{" "}
                  <b>{product_unit_thai}</b>
                </h6>
              </Col>
              <Col>
                <h6>
                  <b>หน่วยต่อการเบิก:</b> {product_unit_thai}
                </h6>
              </Col>
              <Col>
                <h6>
                  <b>ประเภทการเบิก:</b> {product_issue_type_thai}
                </h6>
              </Col>
              <Col>
                <h6>
                  <b>จำนวนสินค้าต่อช่อง:</b>{" "}{this.props.product_select.product_refill_unit}{" "}<b>{product_unit_thai}</b>
                </h6>
              </Col>
            </Col>
          </Row>
        </CardHeader>
        <ModalBody className="bodymodal">
          <CardBody>
            <Row style={{ justifyContent: "center" }}>
              {this.state.loading === true ? (
                <>
                  <div
                    class="lds-spinner"
                    style={{ textAlign: "center", paddingTop: "" }}
                  >
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>{" "}
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                </>
              ) : (
                <>
                  <Col md={6}>
                    {
                      <>
                        {" "}
                        <Button
                          className="btn btn-info"
                          type="button"
                          style={{
                            height: "180px",
                            width: "100%",
                          }}
                          disabled={
                            this.props.count_slot.count_product_type_new ===
                            0 ||
                            this.state.disabled.find(
                              (data) => data.stock_product_type === "New"
                            )?.disabled
                          }
                          onClick={() => {
                            this.props._onSelectTypeCompartment("New", name_thai);
                          }}
                        >
                          {" "}
                          <h4>New</h4>
                          <h2 style={{ color: "#FFFFFF" }}>
                            {this.props.count_slot.count_product_type_new}
                          </h2>
                        </Button>
                      </>
                    }
                  </Col>
                  <Col md={6}>
                    <button
                      color="light "
                      type="button"
                      className="btn btn-info"
                      style={{
                        height: "180px",
                        width: "100%",
                      }}
                      disabled={
                        this.props.count_slot.count_product_type_rf === 0 ||
                        this.state.disabled.find(
                          (data) => data.stock_product_type === "RF"
                        )?.disabled
                      }
                      onClick={() => {
                        this.props._onSelectTypeCompartment("RF", name_thai);
                      }}
                    >
                      {" "}
                      <h4>RF</h4>
                      <h2 style={{ color: "#FFFFFF" }}>
                        {this.props.count_slot.count_product_type_rf}
                      </h2>
                    </button>
                  </Col>
                  {/* <Col md={4}>
                    <button
                      color="light "
                      type="button"
                      className="btn btn-info"
                      style={{
                        height: "180px",
                        width: "100%",
                      }}
                      disabled={
                        this.props.count_slot.count_product_type_loan === 0 ||
                        this.state.disabled.find(
                          (data) => data.stock_product_type === "Loan"
                        )?.disabled
                      }
                      onClick={() => {
                        this.props._onSelectTypeCompartment("Loan", name_thai);
                      }}
                    >
                      {" "}
                      <h4>Loan</h4>
                      <h2 style={{ color: "#FFFFFF" }}>
                        {this.props.count_slot.count_product_type_loan}
                      </h2>
                    </button>
                  </Col> */}
                  {/* <Col md={3}>
                    <Button
                      type="button"
                      className="btn btn-info"
                      style={{
                        height: "180px",
                        width: "100%",
                      }}
                      disabled={
                        this.props.count_slot.count_product_type_old === 0 ||
                        this.state.disabled.find(
                          (data) => data.stock_product_type === "Old"
                        )?.disabled
                      }
                      onClick={() => {
                        this.props._onSelectTypeCompartment("Old", name_thai);
                      }}
                    >
                      {" "}
                      <h4>Old</h4>
                      <h2 style={{ color: "#FFFFFF" }}>
                        {this.props.count_slot.count_product_type_old}
                      </h2>
                    </Button>
                  </Col> */}
                </>
              )}
            </Row>
          </CardBody>
        </ModalBody>
        <ModalFooter className="bodymodal">
          <Button
            color="info"
            style={{
              width: "180px",
              height: "80px",
              marginLeft: "50px",
              backgroundColor: "#EE6E73",
              fontSize: "18px",
            }}
            onClick={() => {
              this.props._handleClose();
            }}
          >
            <i className="far fa-times-circle"></i> {"\u00A0"}
            ยกเลิก
          </Button>
        </ModalFooter>
      </>
    );
  }
}
export default Select_compart_type;
