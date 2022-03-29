import React, { Component } from "react";
import Swal from "sweetalert2";
import { Button, Col, ModalFooter, Row } from "reactstrap";
import socketIOClient from "socket.io-client";
import StockLayoutModel from "../../../models/StockLayoutModel";
import { Result } from "antd";
const stock_layout_model = new StockLayoutModel();
const endpoint = "http://localhost:7001";

export default class Autoconfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: "",
      receive: [],
      status_display: "",
      receive_show: [],
      index: 0,
      report: [],
      stock_status: "",
      product_code: "",
      slot_reseved: [],
      product: [],
      reseved_slot: [],
      status_machine: true,
      sum: 0,
      refill: "",
      add: [],
      // messages_slot: "DOORCLOSE", // กรณ๊ทดสอบ
      messages_slot: "", //กรณีใช้งานจริง
    };
  }
  componentDidUpdate = (old) => {};
  componentDidMount() {
    this.setState(
      {
        amount: this.props.amount,
        status_display: this.props.display,
        reseved_slot: this.props._receive,
        index: this.props.index,
        stock_status: this.props.slot_status,
        product_code: this.props.product.product_code,

        product: this.props.product,
      },
      () => {
        this._fetchData();
        this._scoketSetup();
        // setTimeout(() => {
        //   this.setState({ status_machine: false });
        // }, 2000);
      }
    );
  }
  _scoketSetup() {
    const socket = socketIOClient(endpoint);
    socket.on("answer-micro", (messageNew) => {
      console.log(messageNew);
      let messages = messageNew.split("-");

      if (messages[0] === "CC") {
        if (messages[1] === "RUNNING\r") {
          this.setState({ status_machine: true, messages_slot: "RUNNING" });
        } else if (messages[1] === "FINISH\r") {
          this.setState({ status_machine: false, messages_slot: "FINISH" });
        }

        if (messages[1] === "DOORCLOSE\r") {
          this.setState({ status_machine: false, messages_slot: "DOORCLOSE" });
        }
      }
    });
  }
  _sendMessage = ({ event_button }) => {
    this.setState(
      {
        event_button,
      },
      () => {
        const socket = socketIOClient(endpoint);
        socket.emit("connect-micro", event_button);
      }
    );
  };
  _Confirm = () => {
    let { index, reseved_slot } = this.state;
    if (this.state.messages_slot === "DOORCLOSE") {
      this.setState(
        {
          status_machine: true,
        },
        () => {
          setTimeout(() => {
            this.setState({ status_machine: false });
          }, 2000);
        }
      );
      reseved_slot = reseved_slot.filter(
        (value) => value.stock_qty !== 0 && value.stock_qty !== undefined
      );

      index++;
      if (index >= reseved_slot.length) {
        this.setState({
          index: 0,
        });
        this.props.display("report");
        this.props.shotfall({
          receive: this.state.reseved_slot,
          index: this.state.index++,
          messages_slot: this.state.messages_slot,
        });

        this.props._insertStockLog(reseved_slot[index - 1]);
      } else {
        this.setState(
          {
            index: index,
            receive_show: reseved_slot[index],
            reseved_slot: reseved_slot,
          },
          () => {
            this._sendMessage({
              event_button: [
                this.state.receive_show.stock_code,
                this.state.receive_show.stock_x,
                this.state.receive_show.stock_y,
              ],
            });

            this.props._insertStockLog(reseved_slot[index - 1]);
          }
        );
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "กรุณาปิดประตู",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  _finish = () => {
    let { receive } = this.state;
    const result = receive.filter((element, index, array) => {
      if (index <= this.state.index) {
        return true;
      } else {
        return false;
      }
    });
    this.setState(
      {
        receive: result,
      },
      () => {
        this.props.display("report");
        this.props.shotfall({
          receive: this.state.receive,
          index: this.state.index,
          status_machine: this.state.status_machine,
          messages_slot: this.state.messages_slot,
        });
      }
    );
  };
  async _fetchData() {
    const { index, reseved_slot } = this.state;
    let { add } = this.state;
    if (reseved_slot.length === 0) {
      const slot = await stock_layout_model.getResevedSlotbyCode({
        product_code: this.state.product_code,
        stock_status: this.state.stock_status,
      });

      let slot_null = await stock_layout_model.getResevedSlotisNull({
        product_code: this.state.product_code,
        stock_status: this.state.stock_status,
      });
      for (let index = 0; index < slot_null.data.length; index++) {
        slot_null.data[index].stock_use = "1";
      }

      add.push(...slot.data, ...slot_null.data);

      this.setState(
        {
          reseved_slot: add,
          receive_show: add[index],
        },
        () => {
          this._addslotbyreseved();
        }
      );
    } else {
      this.setState(
        {
          receive_show: this.props._receive[index],
        },
        () => {
          this._addslotbyreseved();
        }
      );
    }
  }
  _addslotbyreseved = () => {
    let { amount, product, sum, reseved_slot, index } = this.state;

    reseved_slot.forEach((val) => {
      if (val.stock_qty === undefined) {
        if (parseInt(amount) > 0) {
          if (parseInt(amount) > parseInt(val.stock_layout_qty)) {
            if (
              parseInt(amount) + parseInt(val.stock_layout_qty) <
              parseInt(
                product.product_refill_unit * product.product_package_qty
              )
            ) {
              val.stock_qty = parseInt(amount);
              val.balance_qty = parseInt(val.stock_layout_qty);
              sum = parseInt(sum + amount);
              amount = parseInt(amount - amount);
            } else {
              val.balance_qty = parseInt(val.stock_layout_qty);
              val.stock_qty = parseInt(
                product.product_refill_unit * product.product_package_qty -
                  val.balance_qty
              );

              amount = parseInt(
                amount -
                  (product.product_refill_unit * product.product_package_qty -
                    val.balance_qty)
              );

              sum = parseInt(
                sum +
                  (product.product_refill_unit * product.product_package_qty -
                    val.balance_qty)
              );
            }
          } else {
            val.stock_qty = parseInt(amount);
            val.balance_qty = parseInt(val.stock_layout_qty);
            sum = parseInt(sum + amount);
            amount = parseInt(amount - amount);
          }
        }
      }
    });
    reseved_slot = reseved_slot.filter(
      (value) => value.stock_qty !== 0 && value.stock_qty !== undefined
    );

    this.setState(
      {
        reseved_slot: reseved_slot,
        amount: amount,
        receive_show: reseved_slot[index],
        sum: sum,
      },
      () => {
        this._sendMessage({
          event_button: [
            this.state.receive_show.stock_code,
            this.state.receive_show.stock_x,
            this.state.receive_show.stock_y,
          ],
        });
        this._scoketSetup();
      }
    );
  };
  _showResult() {
    return (
      <>
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
      </>
    );
  }
  render() {
    let { receive_show } = this.state;

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
                {this._showResult()}{" "}
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
            <Row className="comfrim">
              <Col>
                <center>
                  {" "}
                  <h3>
                    ชั้นที่ {parseInt(receive_show?.stock_y)} ช่องที่{" "}
                    {parseInt(receive_show?.stock_x)}
                  </h3>
                  <br></br>
                  <i className="fas fa-exclamation-triangle fa-10x"></i>
                  <br></br>
                  <br></br>
                  <br></br>
                  <h3>
                    เติม {receive_show?.stock_qty} ในช่องมี
                    {"   "} {receive_show?.stock_layout_qty} รวม {"   "}
                    {parseInt(receive_show?.stock_qty) +
                      parseInt(receive_show?.stock_layout_qty)}
                    {"   "}
                    ใช่ไหม
                  </h3>
                </center>
              </Col>
            </Row>
            <ModalFooter>
              <Button
                color="info"
                style={{
                  width: "180px",
                  height: "80px",
                  marginLeft: "50px",
                  backgroundColor: "#4CB56F",
                  fontSize: "18px",
                }}
                onClick={() => {
                  this._Confirm();
                }}
              >
                {" "}
                <i className="far fa-check-circle"></i> <br />
                {"\u00A0"}
                {"\u00A0"}
                ใช่
              </Button>
              <Button
                color="info"
                style={{
                  width: "180px",
                  height: "80px",
                  marginLeft: "50px",
                  backgroundColor: "#F1A71F",
                  fontSize: "18px",
                }}
                onClick={() => {
                  this.props.display("shotfall");
                  this.props.shotfall({
                    receive: this.state.reseved_slot,
                    index: this.state.index,
                    messages_slot: this.state.messages_slot,
                  });
                }}
              >
                {" "}
                <i className="fas fa-exclamation"></i> <br />
                {"\u00A0"}
                ไม่ใช่
              </Button>
              {/* <Button
                color="info"
                style={{
                  width: "180px",
                  height: "80px",
                  marginLeft: "50px",
                  fontSize: "18px",
                }}
                onClick={() => {
                  this._finish();
                }}
              >
                <i className="far fa-calendar-check"></i> <br />
                {"\u00A0"}
                {"\u00A0"}
                สิ้นสุด
              </Button>{" "} */}
            </ModalFooter>{" "}
          </>
        )}{" "}
      </>
    );
  }
}
