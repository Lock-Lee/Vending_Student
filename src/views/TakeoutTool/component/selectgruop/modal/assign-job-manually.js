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
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import GLOBAL from "../../../../../GLOBAL";

export class Assign_job_manually extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      keyword: "",
      title_modal: "",
      layoutName: "default",
      languageKeyboard: "english",
      show_Keyboard: true,
      product_select: [],
    };
  }
  componentDidMount() {
    let product_select = this.props.product_select;
    let stock_job_name = this.props.stock_job_name;

    this.setState({
      product_select: product_select,
      keyword: stock_job_name,
    });
  }

  _optionDisplayback() {

    this.props._displayback({
      event_page_current: 'event_page_job_manually',
    });

  }

  _languageKeyboard() {
    const { languageKeyboard } = this.state;
    if (languageKeyboard === "english") {
      return (
        <Keyboard
          layout={{
            default: [
              "Th 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
              "{tab} q w e r t y u i o p [ ] \\",
              "{lock} a s d f g h j k l ; ' {enter}",
              "{shift} z x c v b n m . - / {shift}",
              ".com @ {space}",
            ],
            shift: [
              "Th ! @ # $ % ^ & * ) ( _ + {bksp}",
              "{tab} Q W E R T Y U I O P { } |",
              '{lock} A S D F G H J K L : " {enter}',
              "{shift} Z X C V B N M < > ? {shift}",
              ".com @ {space}",
            ],
          }}
          layoutName={this.state.layoutName}
          // onChange={this._onChange}
          onKeyPress={this._onKeyPress}
        />
      );
    } else if (languageKeyboard === "thai") {
      return (
        <Keyboard
          layout={{
            default: [
              "En ๅ / - ภ ถ ุ ึ ค ฅ จ ข ช {bksp}",
              "{tab} ๆ ไ ำ พ ะ ั ี ร น ย บ ล ฃ",
              "{lock} ฟ ห ก ด เ ้ ่ า ส ว ง {enter}",
              "{shift} ผ ป แ อ ิ ื ท ม ใ ฝ {shift}",
              ".com @ {space}",
            ],
            shift: [
              "En + ๑ ๒ ๓ ๔ ู ฿ ๕ ๖ ๗ ๘ ๙ {bksp}",
              '{tab} ๐ " ฎ ฑ ธ ํ ๊ ณ ฯ ญ ฐ , ฅ',
              "{lock} ฤ ฆ ฏ โ ฌ ็ ๋ ษ ศ ซ . {enter}",
              "{shift} ( ) ฉ ฮ ฺ ์ ? ฒ ฬ ฦ {shift}",
              ".com @ {space}",
            ],
          }}
          layoutName={this.state.layoutName}
          // onChange={this._onChange}
          onKeyPress={this._onKeyPress}
        />
      );
    }
  }
  _onKeyPress = (button) => {
    let keyword = this.state.keyword.toString();
    let space = " ";
    if (button === "{shift}" || button === "{lock}") this._handleShift();
    if (button === "Th") {
      this.setState({
        languageKeyboard: "thai",
      });
    }
    if (button === "En") {
      this.setState({
        languageKeyboard: "english",
      });
    }

    if (
      button !== "{bksp}" &&
      button !== "" &&
      button !== "{enter}" &&
      button !== "{space}" &&
      button !== "{shift}" &&
      button !== "{lock}" &&
      button !== "{tab}" &&
      button !== "Th" &&
      button !== "En"
    ) {
      keyword += button;
    } else if (button === "{bksp}") {
      keyword = keyword.substring(0, keyword.length - 1);
    } else if (button === "{space}") {
      keyword += space;
    }
    this.setState({
      keyword: keyword,
    });
  };
  _handleShift = () => {
    const layoutName = this.state.layoutName;
    this.setState({
      layoutName: layoutName === "default" ? "shift" : "default",
    });
  };

  _handleSave = () => {
    const keyword = this.state.keyword;

    if (keyword === "") {
      Swal.fire({ title: "กรุณาระบุการเลือกงาน", icon: "warning" });
    } else {
      this.props._inputKeyboardAssignJobManually(keyword);
    }
  };

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
            <h3>{"เลือกงาน"}</h3>
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
        <ModalBody>
          <CardBody>
            <>
              <Row>
                <Input
                  type="text"
                  value={this.state.keyword}
                  onChange={(e) => this.setState({ keyword: e.target.value })}
                />
              </Row>
              <br />
              {this._languageKeyboard()}
            </>
          </CardBody>
        </ModalBody>
        <ModalFooter className="bodymodal">
          <Row>
            <Col>
              <FormGroup>
                <Button
                  className="btn btn-success"
                  style={{
                    width: "180px",
                    height: "80px",
                    marginLeft: "50px",

                    fontSize: "18px",
                  }}
                  onClick={() => this._handleSave()}
                >
                  <i className="fas fa-check"></i>
                  {"\u00A0"} ยืนยัน
                </Button>

                <Button
                  color="info"
                  style={{
                    width: "180px",
                    height: "80px",
                    marginLeft: "50px",
                    backgroundColor: "#808088",
                    fontSize: "18px",
                  }}
                  onClick={() => this._optionDisplayback()}
                >
                  <i className="fas fa-undo"></i>
                  {"\u00A0"} ย้อนกลับ
                </Button>
              </FormGroup>
            </Col>
          </Row>
        </ModalFooter>
      </>
    );
  }
}
export default Assign_job_manually;
