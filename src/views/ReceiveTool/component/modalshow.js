import React, { Component } from "react";
import Swal from "sweetalert2";
import {
  Button,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { Result } from "antd";
import StockLayoutModel from "../../../models/StockLayoutModel";
import StockLogModel from "../../../models/StockLogModel";
import ReceiveToolModel from "../../../models/ReceiveToolModel";
import GLOBAL from "../../../GLOBAL";
import Selectslot from "./selectslot";
import Inputnumber from "./inputnumber";
import Confirm from "./confirm";
import Shotfall from "./shotfall";
import Manually from "./manually";
import Autoconfirm from "./autoconfirm";
import Report from "./report";
import Balance from "./balance";
const stocklog_modal = new StockLogModel();
const stocklayout_model = new StockLayoutModel();

const receiveTool_model = new ReceiveToolModel();
export default class Modalshow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      product: [],
      modal: false,
      display: "",
      status_type_reveice: "",
      amount: "",
      slot_status: "",
      receive: [],
      index: 0,
      slot_Remain: [],
      status_machine: "",
      messages_slot: "",
      stock_log: [],
      status_server: false,
      result_server: [],
    };
  }
  componentDidUpdate = (old) => {
    if (old.product === undefined && this.props.product) {
      this._fetchData();
    } else if (old.product?.product_code !== this.props.product?.product_code) {
      this._fetchData();
    }
  };
  async _fetchData() {
    const slot_Remain = await stocklayout_model.getRemainSlotbyCode({
      product_code: this.props.product?.product_code,
    });

    this.setState(
      {
        product: this.props.product,
        slot_Remain: slot_Remain.data[0],
      },
      () => {}
    );
  }
  componentDidMount = () => {
    this.setState({
      product: this.props.product,
    });
    this._fetchData();
  };
  _amonut = (amount) => {
    this.setState({
      amount: amount,
    });
  };
  _handleClose() {
    this.props._handleClose();
    setTimeout(() => {
      this.setState({ amount: "", display: "", index: 0, receive: [] });
    }, 500);
  }
  _insertStockLog = (e) => {
    const {
      balance_qty,
      stock_layout_qty,
      stock_qty,
      stock_code,

      stock_layout_code,
    } = e;

    this.setState({}, async () => {
      const now = new Date();
      var event_date = "";
      const last_code = await stocklog_modal.getStockLogLastCode({
        code: `SL${now.getFullYear()}${(now.getMonth() + 1)
          .toString()
          .padStart(2, "0")}`,
        digit: 3,
      });
      event_date = `${now.getFullYear()}${"-"}${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}${"-"}${now
        .getDate()
        .toString()
        .padStart(2, "0")}${"  "}${now
        .getHours()
        .toString()
        .padStart(2, "0")}${":"}${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}${":"}${now
        .getSeconds()
        .toString()
        .padStart(2, "0")}`;

      const res = await receiveTool_model.ReceiveTools({
        stock_log_code: last_code.data,
        product_code: this.state.product.product_code,
        job_code: "",
        job_op_code: "",
        machine_code: "",
        job_op_tools_code: "",
        stock_code: stock_code,
        stock_layout_code: stock_layout_code,
        stock_log_ref_code: "",
        TypeComp: this.state.slot_status,
        user_code: this.props.props.user_code,
        stock_type: "IN",
        balance_qty: balance_qty + stock_qty,
        balance_confirm_qty: stock_layout_qty + stock_qty,
        stock_qty: stock_qty,
        stock_price:
          this.state.product.product_price === null
            ? 0
            : this.state.product.product_price,
        event_date: event_date,
        stock_remark: "",
        stock_status: this.state.slot_status,
        stock_issue_code: "",
        stock_return_code: "",
      });
      if (res.require) {
        Swal.fire({
          title: "บันทึกสำเร็จ",
          icon: "success",
        });
        this.setState({
          status_server: true,
        });
        this._fetchData();
      } else {
        this.setState(
          {
            status_server: false,
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
  };
  _Detail_data() {
    let { product } = this.state;
    return (
      <>
        {" "}
        <Row>
          <Col
            style={{
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              display: "grid",
            }}
          >
            <img
              width={"160px"}
              height={"80px"}
              src={`${GLOBAL.BASE_SERVER.URL_IMG}${
                product?.product_image === "" ||
                product?.product_image === undefined
                  ? "default.png"
                  : product?.product_image
              }`}
              alt="product_image"
              style={{
                border: "1px solid #ddd",
                borderRadius: " 4px",
                padding: "5px",
                width: " 150px",
              }}
            />
          </Col>
          <Col>
            <Row>
              <Col>
                <b>ชื่อสินค้า :</b> <label>{product?.product_name}</label>
              </Col>
              <Col>
                <b>ขนาดช่อง :</b>{" "}
                <label>
                  {product?.product_size} <b> มม.</b>
                </label>
              </Col>
            </Row>
            <Row>
              <Col>
                <b>รหัสสินค้า :</b> <label>{product?.product_code}</label>
              </Col>{" "}
              <Col>
                <b>ช่องละ :</b>{" "}
                <label>
                  {product?.product_refill_unit}
                  <b> ชิ้น</b>
                </label>{" "}
              </Col>
            </Row>
            <Row>
              <Col>
                <b>ประเภทสินค้า :</b>{" "}
                <label>{product?.product_type_name}</label>
              </Col>{" "}
              <Col>
                <b>ราคา :</b> <label>{product?.product_price}</label>
              </Col>
            </Row>
            <Row>
              <Col>
                <b>ยี่ห้อสินค้า :</b>{" "}
                <label>{product?.product_brand_name}</label>
              </Col>{" "}
              <Col>
                <b>ราคา Refurbish :</b>{" "}
                <label>{product?.product_rf_price}</label>
              </Col>
            </Row>
          </Col>
        </Row>
        <br />
      </>
    );
  }

  _shotfall = (e) => {
    this.setState(
      {
        receive: e.receive,
        index: e.index,
        status_machine: e.status_machine,
        messages_slot: e.messages_slot,
      },
      () => {}
    );
  };
  _showdisplay = (display) => {
    if (display === "Auto") {
      this.setState({ status_type_reveice: "Auto", display: "input" });
    } else if (display === "Manually") {
      this.setState({ status_type_reveice: "Manually", display: "input" });
    } else if (display === "comfirm") {
      this.setState({ display: "comfirm" });
    } else if (display === "shotfall") {
      this.setState({ display: "shotfall" });
    } else if (display === "input") {
      this.setState({ display: "input" });
    } else if (display === "comfirmManually") {
      this.setState({ display: "comfirmManually" });
    } else if (display === "report") {
      this.setState({ display: "report" });
    } else if (display === "balance") {
      this.setState({ display: "balance" });
    } else if (display === "finish") {
      this.setState({ display: "report" });
    }

    if (this.state.display === "") {
      if (this.state.product?.product_type_consumable === "Consumable") {
        return (
          <>
            {" "}
            <ModalHeader style={{ display: "block" }} className="haedermodel">
              <div>
                {" "}
                <Row>
                  <Col>
                    <center>
                      <h3>เลือกประเภทของสินค้า</h3>
                    </center>
                  </Col>
                </Row>
              </div>
            </ModalHeader>
            <ModalBody className="bodymodal">
              {this._Detail_data()}
              <Row>
                <Col>
                  <Button
                    color="light "
                    type="button"
                    className="btn  "
                    style={{
                      height: "180px",
                      width: "100%",
                      backgroundColor: "#0052CC",
                    }}
                    onClick={() => {
                      this.setState({
                        display: "selectslot",
                        slot_status: "New",
                      });
                    }}
                  >
                    <h3>New</h3>
                    <h4>
                      {this.state.slot_Remain?.new_qty} /{" "}
                      {this.state.slot_Remain?.new_max}
                    </h4>
                  </Button>
                </Col>
                <Col>
                  {" "}
                  <Button
                    color="light "
                    type="button"
                    className="btn  "
                    style={{
                      height: "180px",
                      width: "100%",
                      backgroundColor: "#0052CC",
                    }}
                    onClick={() => {
                      this.setState({
                        display: "selectslot",
                        slot_status: "RF",
                        backgroundColor: "#0052CC",
                      });
                    }}
                  >
                    <h3>RF</h3>{" "}
                    <h4>
                      {this.state.slot_Remain.rf_qty} /{" "}
                      {this.state.slot_Remain.rf_max}
                    </h4>
                  </Button>
                </Col>{" "}
              </Row>{" "}
              <br />
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
                  <i
                    className="far fa-times-circle"
                    style={{ fontSize: "36px", paddingRight: "35px" }}
                  ></i>{" "}
                  <br />
                  ยกเลิก
                </Button>
              </ModalFooter>
            </ModalBody>
          </>
        );
      } else if (this.state.product?.product_type_consumable === "Loan") {
        return (
          <>
            {" "}
            <ModalHeader style={{ display: "block" }} className="haedermodel">
              <div>
                {" "}
                <Row>
                  <Col>
                    <center>
                      <h3>เลือกประเภทช่อง</h3>
                    </center>
                  </Col>
                </Row>
              </div>
            </ModalHeader>
            <ModalBody className="bodymodal">
              {this._Detail_data()}
              <Row>
                <Col>
                  {" "}
                  <Button
                    color="light "
                    type="button"
                    className="btn  "
                    style={{
                      height: "180px",
                      width: "100%",
                      backgroundColor: "#0052CC",
                    }}
                    onClick={() => {
                      this.setState({
                        display: "selectslot",
                        slot_status: "Loan",
                        backgroundColor: "#0052CC",
                      });
                    }}
                  >
                    <h3>Loan</h3>{" "}
                    <h4>
                      {this.state.slot_Remain.loan_qty} /{" "}
                      {this.state.slot_Remain.loan_max}
                    </h4>
                  </Button>
                </Col>{" "}
              </Row>{" "}
              <br />
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
                  <i
                    className="far fa-times-circle"
                    style={{ fontSize: "36px", paddingRight: "35px" }}
                  ></i>{" "}
                  <br />
                  ยกเลิก
                </Button>
              </ModalFooter>
            </ModalBody>
          </>
        );
      }
    } else if (this.state.display === "selectslot") {
      return (
        <>
          <ModalHeader className="haedermodel">
            <Row>
              <Col>
                <center>
                  <h3>เลือกประเภทการเติม</h3>
                </center>
              </Col>
            </Row>
          </ModalHeader>
          <ModalBody className="bodymodal">
            {this._Detail_data()}
            <Selectslot
              product={this.state.product}
              slot_status={this.state.slot_status}
              display={(e) => this._showdisplay(e)}
              _handleClose={() => {
                this.setState({
                  display: "",
                });
              }}
            />{" "}
            <ModalFooter className="bodymodal">
              <Button
                color="info"
                style={{
                  width: "180px",
                  height: "80px",
                  fontSize: "18px",
                  backgroundColor: "#808088",
                }}
                onClick={() => {
                  this._handleClose();
                }}
              >
                <i
                  className="fas fa-arrow-left"
                  style={{ fontSize: "36px", paddingRight: "30px" }}
                ></i>
                <br />
                ย้อนกลับ
              </Button>
            </ModalFooter>{" "}
          </ModalBody>
        </>
      );
    } else if (this.state.display === "input") {
      return (
        <>
          <ModalHeader className="haedermodel">
            <Row>
              <Col>
                <center>
                  <h3>ระบุจำนวนครื่องมือที่จะเติม</h3>
                </center>
              </Col>
            </Row>
          </ModalHeader>
          <ModalBody className="bodymodal">
            {" "}
            {this._Detail_data()}
            <Inputnumber
              slot_Remain={this.state.slot_Remain}
              product={this.state.product}
              slot_status={this.state.slot_status}
              display={(e) => this._showdisplay(e)}
              amonut={(e) => {
                this._amonut(e);
              }}
              _handleClose={() => {
                this.setState({
                  display: "selectslot",
                });
              }}
            />
          </ModalBody>
        </>
      );
    } else if (
      this.state.display === "comfirm" &&
      this.state.status_type_reveice === "Auto"
    ) {
      return (
        <>
          {" "}
          <>
            {" "}
            <ModalHeader className="haedermodel">
              <Row>
                <Col>
                  <center>
                    <h3>ยืนยัน</h3>
                  </center>
                </Col>
              </Row>
            </ModalHeader>
            <ModalBody className="bodymodal">
              {" "}
              {this._Detail_data()}
              <Autoconfirm
                product={this.state.product}
                amount={this.state.amount}
                slot_status={this.state.slot_status}
                _handleClose={() => {
                  this._handleClose();
                }}
                display={(e) => {
                  this._showdisplay(e);
                }}
                index={this.state.index}
                _receive={this.state.receive}
                shotfall={(e) => {
                  this._shotfall(e);
                }}
                _insertStockLog={(e) => {
                  this._insertStockLog(e);
                }}
              />
            </ModalBody>
          </>
        </>
      );
    } else if (
      this.state.display === "comfirm" &&
      this.state.status_type_reveice === "Manually"
    ) {
      return (
        <>
          <ModalHeader className="haedermodel">
            <Row>
              <Col>
                <center>
                  <h3>เลือกช่องที่จะการเติม</h3>
                </center>
              </Col>
            </Row>
          </ModalHeader>
          <ModalBody className="bodymodal">
            {" "}
            {this._Detail_data()}
            <Manually
              amonut={this.state.amount}
              slot_status={this.state.slot_status}
              _Confirm={(e) => {
                this._showdisplay(e);
              }}
              product={this.state.product}
              index={this.state.index}
              product_code={this.state.product.product_code}
              shotfall={(e) => {
                this._shotfall(e);
              }}
            />{" "}
          </ModalBody>
        </>
      );
    } else if (this.state.display === "comfirmManually") {
      return (
        <>
          <ModalHeader className="haedermodel">
            <Row>
              <Col>
                <center>
                  <h3>ยืนยัน</h3>
                </center>
              </Col>
            </Row>
          </ModalHeader>
          <ModalBody className="bodymodal">
            {this._Detail_data()}
            <Confirm
              product={this.state.product}
              amount={this.state.amount}
              slot_status={this.state.slot_status}
              status_type_reveice={this.state.status_type_reveice}
              index={this.state.index}
              _handleClose={() => {
                this._handleClose();
              }}
              display={(e) => {
                this._showdisplay(e);
              }}
              _receive={this.state.receive}
              shotfall={(e) => {
                this._shotfall(e);
              }}
              _insertStockLog={(e) => {
                this._insertStockLog(e);
              }}
            />
          </ModalBody>
        </>
      );
    } else if (this.state.display === "shotfall") {
      return (
        <>
          {" "}
          <ModalHeader className="haedermodel">
            <Row>
              <Col>
                <center>
                  <h3>ระบุจำนวนครื่องมือที่จะเติมช่อง </h3>
                </center>
              </Col>
            </Row>
          </ModalHeader>
          <ModalBody className="bodymodal">
            {" "}
            {this._Detail_data()}
            <Shotfall
              display={(e) => {
                this._showdisplay(e);
              }}
              _handleClose={() => {
                this._handleClose();
              }}
              product={this.state.product}
              _receive={this.state.receive}
              slot_status={this.state.slot_status}
              status_type_reveice={this.state.status_type_reveice}
              status_machine={this.state.status_machine}
              messages_slot={this.state.messages_slot}
              shotfall={(e) => {
                this._shotfall(e);
              }}
              index={this.state.index}
            />{" "}
          </ModalBody>
        </>
      );
    } else if (this.state.display === "report") {
      return (
        <>
          {" "}
          <ModalHeader className="haedermodel">
            <Row>
              <Col>
                <center>
                  <h3>สรุปการเติม </h3>
                </center>
              </Col>
            </Row>
          </ModalHeader>
          <ModalBody className="bodymodal">
            {" "}
            {this._Detail_data()}
            <Report
              _receive={this.state.receive}
              _handleClose={() => {
                this._handleClose();
              }}
            />
          </ModalBody>
        </>
      );
    } else if (this.state.display === "balance") {
      return (
        <>
          {" "}
          <ModalHeader className="haedermodel">
            <Row>
              <Col>
                <center>
                  <h3>ระบุจำนวนครื่องมือที่คงเหลือ</h3>
                </center>
              </Col>
            </Row>
          </ModalHeader>
          <ModalBody className="bodymodal">
            {" "}
            {this._Detail_data()}
            <Balance
              display={(e) => {
                this._showdisplay(e);
              }}
              _handleClose={() => {
                this._handleClose();
              }}
              product={this.state.product}
              _receive={this.state.receive}
              slot_status={this.state.slot_status}
              status_type_reveice={this.state.status_type_reveice}
              status_machine={this.state.status_machine}
              messages_slot={this.state.messages_slot}
              shotfall={(e) => {
                this._shotfall(e);
              }}
              index={this.state.index}
              _insertStockLog={(e) => {
                this._insertStockLog(e);
              }}
              _finish={() => {}}
            />
          </ModalBody>
        </>
      );
    }
  };
  render() {
    return (
      <>
        {this.state.status_machine ? (
          <>
            {" "}
            <Row>
              <Col
                style={{
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "50vh",
                }}
              >
                {" "}
                <div
                  className="lds-spinner"
                  style={{ textAlign: "center", paddingTop: "20vh" }}
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
                <div style={{ textAlign: "center", paddingTop: "15vh" }}>
                  {" "}
                  <h2>กรุณารอสักครู่</h2>
                </div>
              </Col>
            </Row>{" "}
            <Row>
              {" "}
              <Col></Col>
            </Row>
          </>
        ) : (
          <>
            <Modal
              isOpen={this.props.modal}
              style={{
                maxWidth: "80%",
                width: "60%",
                height: "90hv",
              }}
            >
              {this._showdisplay()}{" "}
            </Modal>
          </>
        )}{" "}
      </>
    );
  }
}
