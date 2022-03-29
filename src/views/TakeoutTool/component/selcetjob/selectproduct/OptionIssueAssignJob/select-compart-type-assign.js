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
import GLOBAL from "../../../../../../GLOBAL";

export class Select_compart_type_assign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      count_slot: [],
    };
  }
  componentDidMount() {}

  componentDidUpdate(props_old) {
    let count_slot = this.props.count_slot;
    if (this.state.count_slot != count_slot) {
      this.setState({
        count_slot: count_slot,
      });
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
        <ModalBody className="bodymodal">
          <CardBody>
            <Row style={{ justifyContent: "center" }}>
              <Col md={3}>
                <Button
                  className="btn btn-info"
                  type="button"
                  style={{
                    height: "180px",
                    width: "100%",
                  }}
                  disabled={this.props.count_slot.count_product_type_new === 0}
                  onClick={() => {
                    this.props._onSelectTypeCompartment("New", {
                      product_unit_thai: product_unit_thai,
                      product_issue_type_thai: product_issue_type_thai,
                    });
                  }}
                >
                  {" "}
                  <h4>New</h4>
                  <h2 style={{ color: "#FFFFFF" }}>
                    {this.props.count_slot.count_product_type_new}
                  </h2>
                </Button>
              </Col>

              <Col md={3}>
                <button
                  color="light "
                  type="button"
                  className="btn btn-info"
                  style={{
                    height: "180px",
                    width: "100%",
                  }}
                  disabled={this.props.count_slot.count_product_type_rf === 0}
                  onClick={() => {
                    this.props._onSelectTypeCompartment("RF", {
                      product_unit_thai: product_unit_thai,
                      product_issue_type_thai: product_issue_type_thai,
                    });
                  }}
                >
                  {" "}
                  <h4>RF</h4>
                  <h2 style={{ color: "#FFFFFF" }}>
                    {this.props.count_slot.count_product_type_rf}
                  </h2>
                </button>
              </Col>

              <Col md={3}>
                <button
                  color="light "
                  type="button"
                  className="btn btn-info"
                  style={{
                    height: "180px",
                    width: "100%",
                  }}
                  disabled={this.props.count_slot.count_product_type_loan === 0}
                  onClick={() => {
                    this.props._onSelectTypeCompartment("Loan", {
                      product_unit_thai: product_unit_thai,
                      product_issue_type_thai: product_issue_type_thai,
                    });
                  }}
                >
                  {" "}
                  <h4>Loan</h4>
                  <h2 style={{ color: "#FFFFFF" }}>
                    {this.props.count_slot.count_product_type_loan}
                  </h2>
                </button>
              </Col>

              <Col md={3}>
                <Button
                  type="button"
                  className="btn btn-info"
                  style={{
                    height: "180px",
                    width: "100%",
                  }}
                  disabled={this.props.count_slot.count_product_type_old === 0}
                  onClick={() => {
                    this.props._onSelectTypeCompartment("Old", {
                      product_unit_thai: product_unit_thai,
                      product_issue_type_thai: product_issue_type_thai,
                    });
                  }}
                >
                  {" "}
                  <h4>Old</h4>
                  <h2 style={{ color: "#FFFFFF" }}>
                    {this.props.count_slot.count_product_type_old}
                  </h2>
                </Button>
              </Col>
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
export default Select_compart_type_assign;
