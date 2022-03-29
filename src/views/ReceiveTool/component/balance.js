import React, { Component } from "react";
import Keyboard from "react-simple-keyboard";
import { Button, Col, ModalFooter, Input, Row } from "reactstrap";
import Swal from "sweetalert2";

import socketIOClient from "socket.io-client";

const endpoint = "http://localhost7001";
export default class Shotfall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      receive: [],
      display: "",
      index: 0,
      status_machine: "",
      messages_slot: "",
      product: [],
    };
  }
  componentDidMount() {
    this.setState(
      {
        receive: this.props._receive,
        display: this.props.status_type_reveice,
        index: this.props.index,
        messages_slot: this.props.messages_slot,
        product: this.props.product,
      },
      () => {
        // this._scoketSetup();
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
          this.setState({ messages_slot: "DOORCLOSE" });
        }
      }
    });
  }
  _onKeyPress = (button) => {
    let keyword = this.state.keyword.toString();

    if (button === "{bksp}" || button === "backspace") {
      keyword = keyword.substring(0, keyword.length - 1);
    } else {
      keyword += button;
    }

    if (parseInt(keyword) > parseInt(this.state.maxslot)) {
      Swal.fire({
        icon: "warning",
        title: "กรุณากรอกข้อมูลให้ถูกต้อง",
        showConfirmButton: false,
        timer: 1500,
      });
      this.setState(
        {
          keyword: "",
        },
        () => this._fetchData()
      );
    } else {
      this.setState(
        {
          keyword: keyword,
        },
        () => { }
      );
    }
  };
  _Confirm = () => {
    let { index, receive, keyword } = this.state;

    receive[index].stock_layout_qty = parseInt(keyword);

    index++;

    if (parseInt(keyword) >= 0) {
      this._verify(index);
      if (this.state.messages_slot === "DOORCLOSE") {
        if (index >= receive.length) {
          this.props.display("report");
          this.props.shotfall({
            receive: receive,
            index: index,
            messages_slot: this.state.messages_slot,
          });
          this.setState({
            index: 0,
          });
        }
      } else {
        Swal.fire({
          icon: "warning",
          title: "กรุณาปิดประตู",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      index = index - 1;
      Swal.fire({
        icon: "warning",
        title: "ใส่จำนวน",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    this.setState(
      {
        index: index,
        receive: receive,
      },
      () => {
        this.props.shotfall({
          receive: receive,
          index: index,
          messages_slot: this.state.messages_slot,
        });
      }
    );
  };
  _verify(idx) {
    let { receive } = this.state;

    if (this.state.display === "Manually") {
      this.props.display("comfirmManually");
      this.props.shotfall({
        receive: receive,
        index: idx,
        messages_slot: this.state.messages_slot,
      });
      this.props._insertStockLog(receive[0]);
    }
    if (this.state.display === "Auto") {
      this.props.display("comfirm");
      this.props.shotfall({
        receive: receive,
        index: idx,
        messages_slot: this.state.messages_slot,
      });
      this.props._insertStockLog(receive[0]);
    } else {
      this.setState({
        receive: receive,
      });
    }
  }
  _CheckInput(data) {
    if (parseInt(data) < parseInt(this.product[0].product_refill_unit)) {
      this.setState({ keyword: data });
    } else {
      Swal.fire({
        icon: "warning",
        title: "กรุณากรอกจำนวนให้ถูกต้อง",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
  render() {
    return (
      <>
        {" "}
        <Row>
          <Col></Col>
          <Col>
            {" "}
            <Input
              type="number"
              value={this.state.keyword}
              onChange={(e) => this._CheckInput(e.target.value)}
            />{" "}
            <br></br>
            <Keyboard
              layout={{
                default: ["1 2 3", "4 5 6", "7 8 9", " 0 backspace"],
              }}
              onKeyPress={this._onKeyPress}
            />
          </Col>
          <Col></Col>
        </Row>
        <br></br>
        <ModalFooter>
          {" "}
          <Button
            color="info"
            style={{
              width: "180px",
              height: "80px",
              marginLeft: "50px",
              fontSize: "18px",
            }}
            onClick={() => {
              this.props.display("report");
            }}
          >
            {" "}
            <i className="far fa-calendar-check"></i> {"\u00A0"}
            ใช่ สิ้นสุด
          </Button>{" "}
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
              fontSize: "18px",
              backgroundColor: "#808088",
            }}
            onClick={() => {
              this.props.display("shotfall");
              this.props.shotfall({
                receive: this.state.receive,
                index: this.state.index,
                messages_slot: this.state.messages_slot,
              });
            }}
          >
            {" "}
            <i className="fas fa-undo fa-xs"></i> <br />
            {"\u00A0"}ย้อนกลับ
          </Button>
        </ModalFooter>{" "}
      </>
    );
  }
}
