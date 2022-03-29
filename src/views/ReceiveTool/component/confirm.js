import React, { Component } from "react";

import Swal from "sweetalert2";
import { Button, Col, ModalFooter, Row } from "reactstrap";

import socketIOClient from "socket.io-client";

const endpoint = "http://localhost:7001";

export default class Confirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: "",
      receive: [],
      status_display: "",
      receive_show: [],
      index: 0,
      report: [],
      iswait_micro: false,
      status_machine: true,
      //messages_slot: "DOORCLOSE", // กรณ๊ทดสอบ

      messages_slot: "", //กรณีใช้งานจริง
    };
  }
  componentDidUpdate = (old) => {};
  componentDidMount() {
    this._scoketSetup();

    this.setState(
      {
        amount: this.props.amount,
        status_display: this.props.status_type_reveice,
        receive: this.props._receive,
        receive_show: this.props._receive,
        index: this.props.index,
      },
      () => {
        this._fetchData();
      }
    );
  }
  _scoketSetup() {
    const socket = socketIOClient(endpoint);
    socket.on("answer-micro", (messageNew) => {
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
    let { index, receive } = this.state;
    if (this.state.messages_slot === "DOORCLOSE") {
      this.setState(
        {
          status_machine: true,
        },
        () => {
          setTimeout(() => {
            this.setState({ status_machine: false });
          }, 1500);
        }
      );
      index++;
      if (index >= receive.length) {
        this.props.display("report");
        this.setState({
          index: 0,
        });
        this.props._insertStockLog(receive[index - 1]);
      } else {
        this.setState(
          {
            index: index,
            receive_show: receive[index],
          },
          () => {
            this.props._insertStockLog(receive[index - 1]);
            this._sendMessage({
              event_button: [
                this.state.receive_show.stock_code,
                this.state.receive_show.stock_x,
                this.state.receive_show.stock_y,
              ],
            });
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
        this.props._insertStockLog(this.state.receive[this.state.index]);
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
  _fetchData() {
    // setTimeout(() => {
    //   this.setState({ status_machine: false });
    // }, 1500);
    let { receive, index } = this.state;

    receive = receive.filter((value) => value.stock_qty !== undefined);
    receive.sort((a, b) => {
      if (a.stock_qty < b.stock_layout_qty + b.stock_qty) {
        return 1;
      }
      if (a.stock_qty > b.stock_layout_qty + b.stock_qty) {
        return -1;
      }
      return 0;
    });
    if (index >= receive.length) {
      index = index - 1;
    }

    this.setState(
      {
        receive: receive,
        receive_show: receive[index],
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
  }

  render() {
    const { receive_show } = this.state;

    return (
      <>
        {" "}
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
            {" "}
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
                    เติม {receive_show?.stock_qty} ในช่องมี{" "}
                    {receive_show?.stock_layout_qty} รวม{" "}
                    {parseInt(receive_show?.stock_qty) +
                      parseInt(receive_show?.stock_layout_qty)}{" "}
                    ใช่ไหม
                  </h3>
                </center>
              </Col>
            </Row>
            <ModalFooter className="bodymodal">
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
                    receive: this.state.receive,
                    index: this.state.index,
                    status_machine: this.state.status_machine,
                    messages_slot: this.state.messages_slot,
                  });
                }}
              >
                <i className="fas fa-exclamation"></i> <br />
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
                สิ้นสุด
              </Button>{" "} */}
            </ModalFooter>{" "}
          </>
        )}
      </>
    );
  }
}
