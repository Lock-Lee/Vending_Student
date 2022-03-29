import React, { Component } from "react";
import Keyboard from "react-simple-keyboard";
import "../../../../node_modules/react-simple-keyboard/build/css/index.css";
import {
  Button,
  Col,
  ModalFooter,
  Row,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Card,
} from "reactstrap";

import Swal from "sweetalert2";
import StockLayoutModel from "../../../models/StockLayoutModel";

const stocklayout_model = new StockLayoutModel();
export default class Inputnumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      confirm: false,
      status: "",
      maxslot: "",
      product: [],
      slot_null: "",
    };
  }
  componentDidMount = () => {
    this.setState(
      {
        status: this.props.slot_status,
        product: this.props.product,
      },
      () => this._fetchData()
    );
  };
  _finish() {
    this.setState({ confirm: false });
    this.props._finish();
  }
  _onKeyPress = (button) => {
    let keyword = this.state.keyword.toString();

    if (button === "{bksp}" || button === "←") {
      keyword = keyword.substring(0, keyword.length - 1);
    } else if (button === "Clear") {
      keyword = "";
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
        () => {}
      );
    }
  };
  _confirm() {
    if (this.state.keyword === "" && parseInt(this.state.keyword) !== 0) {
      Swal.fire({
        icon: "warning",
        title: "กรุณากรอกข้อมูล",
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (
      parseInt(this.state.keyword) > parseInt(this.state.maxslot) ||
      parseInt(this.state.keyword) === 0
    ) {
      Swal.fire({
        icon: "warning",
        title: "กรุณาใสจำนวนให้ถูกต้อง",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      this.props.display("comfirm");
      this.props.amonut(this.state.keyword);
    }
  }
  async _fetchData() {
    let { maxslot } = this.state;
    const { slot_Remain } = this.props;
    const slot_null = await stocklayout_model.getSlotisNull({
      product_code: this.state.product.product_code,
    });
    if (this.state.status === "New") {
      maxslot = slot_Remain.new_max - slot_Remain.new_qty;
    } else if (this.state.status === "RF") {
      maxslot = slot_Remain.rf_max - slot_Remain.rf_qty;
    } else if (this.state.status === "Loan") {
      maxslot = slot_Remain.loan_max - slot_Remain.loan_qty;
    } else if (this.state.status === "Old") {
      maxslot = slot_Remain.old_max - slot_Remain.old_qty;
    }

    this.setState(
      {
        maxslot: maxslot,
        slot_null: slot_null.data[0].slot_is_free,
      },
      () => {}
    );
  }
  render() {
    return (
      <>
        {" "}
        <Row>
          <Col></Col>
          <Col>
            {" "}
            <InputGroup>
              <Input
                type="number"
                value={this.state.keyword}
                onChange={(e) => this.setState({ keyword: e.target.value })}
              />
              <InputGroupAddon addonType="append">
                <InputGroupText>{this.state.maxslot}</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Col>
          <Col></Col>
        </Row>
        <br></br>
        <Row>
          <Col></Col>
          <Col>
            {" "}
            <Keyboard
              layout={{
                default: ["1 2 3", "4 5 6", "7 8 9", "Clear 0 ←"],
              }}
              onKeyPress={this._onKeyPress}
            />
          </Col>{" "}
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
              backgroundColor: "#0E9D57",
            }}
            onClick={() => {
              this._confirm();
            }}
          >
            <i
              className="far fa-check-circle"
              style={{ fontSize: "36px", paddingRight: "30px" }}
            ></i>{" "}
            <br />
            ตกลง
          </Button>{" "}
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
              this.props._handleClose();
              this.setState({ keyword: "" });
            }}
          >
            <i
              className="fas fa-arrow-left"
              style={{ fontSize: "36px", paddingRight: "30px" }}
            ></i>{" "}
            <br />
            ย้อนกลับ
          </Button>
        </ModalFooter>{" "}
      </>
    );
  }
}
