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
import Swal from "sweetalert2";
import GLOBAL from "../../../../../../GLOBAL";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

export class Assign_product_qty_assign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      keyword: "",
      product_amount: "",
      count_slot: [],
    };
  }
  componentDidMount() {
    this._ConvertUnitToThai();

    let count_slot = this.props.count_slot;
    let TypeComp = this.props.TypeComp;
    let product_amount = this.state.product_amount;

    if (TypeComp == "New") {
      product_amount = count_slot.count_product_type_new;
    } else if (TypeComp == "RF") {
      product_amount = count_slot.count_product_type_rf;
    } else if (TypeComp == "Loan") {
      product_amount = count_slot.count_product_type_loan;
    } else if (TypeComp == "Old") {
      product_amount = count_slot.count_product_type_old;
    }

    this.setState({
      product_amount: product_amount,
    });
  }
  _ConvertUnitToThai = () => {
    let unit_name = this.props.product_select.product_unit;

    if (unit_name === "piece") {
      this.setState({
        unit_name: "ชิ้น",
      });
    } else if (unit_name === "box") {
      this.setState({
        unit_name: "กล่อง",
      });
    }
  };
  _onKeyPress = (button) => {
    let keyword = this.state.keyword.toString();

    if (button === "{bksp}" || button === "backspace") {
      keyword = keyword.substring(0, keyword.length - 1);
    } else {
      keyword += button;
    }
    this.setState({
      keyword: keyword,
    });
  };

  _onSaveProductqty(thai) {
    let keyword = this.state.keyword;
    let product_amount = this.state.product_amount;

    if (keyword <= product_amount && keyword != "") {
      this.props._issueQty(this.state.keyword, thai);
    } else if (keyword > product_amount) {
      Swal.fire({
        title: "จำนวนสินค้ามีแค่ : " + product_amount,
        icon: "warning",
      });
    } else if (keyword === "") {
      Swal.fire({ title: "กรุณาระบุขจำนวนที่ต้องการเบิก ! ", icon: "warning" });
    }
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
    return (
      <>
        <ModalHeader style={{ display: "block" }} className="haedermodel">
          <center>
            <h3>จำนวนที่ต้องการเบิก / หน่วย: {this.state.unit_name}</h3>
          </center>
        </ModalHeader>
        <CardHeader>
          <Row>
            <Col md={4}>
              <CardImg
                variant="top"
                style={{ width: "150px", height: "150px" }}
                src={
                  this.props.product_select?.product_image
                    ? GLOBAL.BASE_SERVER.URL_IMG +
                      this.props.product_select.product_image
                    : GLOBAL.BASE_SERVER.URL_IMG + "default.png"
                }
              />
            </Col>
            <Col md={4}>
              <Col>
                <h6>
                  <b>ชื่อสินค้า:</b> {this.props.product_select.product_name}
                </h6>
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
                  <b>{"ชิ้น"}</b>
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
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Row>
            <Input
              type="text"
              style={{ textAlign: "center" }}
              value={this.state.keyword}
            />
          </Row>
          <Row style={{ marginTop: "10px" }}>
            <Keyboard
              layout={{
                default: ["1 2 3", "4 5 6", "7 8 9", " 0 backspace"],
              }}
              onKeyPress={this._onKeyPress}
            />
          </Row>
        </CardBody>
        <ModalFooter style={{ display: "block" }}>
          <Button
            className="btn btn-success"
            style={{ width: "120px", height: "80px", borderRadius: "12px" }}
            onClick={() =>
              this._onSaveProductqty({
                product_unit_thai: product_unit_thai,
                product_issue_type_thai: product_issue_type_thai,
              })
            }
          >
            <i className="fas fa-check"></i>
            {"\u00A0"} ยืนยัน
          </Button>

          <Button
            style={{
              width: "120px",
              height: "80px",
              borderRadius: "12px",
              marginLeft: "46%",
              backgroundColor: "#808088",
              color: "white",
            }}
            onClick={() =>
              this.props._displayback({
                current_display: "",
                size_modal: "xl",
              })
            }
          >
            <i className="fas fa-undo"></i>
            {"\u00A0"} ย้อนกลับ
          </Button>
        </ModalFooter>
      </>
    );
  }
}
export default Assign_product_qty_assign;
