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

export class Select_job extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      product_select: [],
      loading: true,
    };
  }
  componentDidMount() {
    let product_select = this.props.product_select;
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 300);
    this.setState({
      product_select: product_select,
    });
  }

  _optionDisplayback() {
    let product_issue_type = this.state.product_select.product_issue_type;
    if (product_issue_type === "Full" || product_issue_type === "Piecemeal") {
      this.props.count_issue[0][this.props.TypeComp] =
        this.props.count_issue[0][this.props.TypeComp] - 1;

      this.props._displayback({
        event_page_current: 'event_page_job',
        product_issue_type: product_issue_type,
      });

    }

    else {
      this.props._displayback({
        event_page_current: 'event_page_job',
        product_issue_type: product_issue_type,
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
            <h3>เลือกงาน</h3>
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
            {this.state.loading ? (
              <>
                {" "}
                <div style={{ textAlign: "center" }}>
                  {" "}
                  <div className="lds-spinner" style={{ textAlign: "center" }}>
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
                </div>
              </>
            ) : (
              <>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto auto auto auto auto auto",
                  }}
                >
                  <Card
                    color="info"
                    className="btn"
                    // key={idx}
                    style={{ width: "11rem", margin: "7px" }}
                    onClick={() => this.props._oncilckManually()}
                  >
                    <Row>
                      <Col style={{ height: "96px" }}>
                        <div>
                          <i
                            className="far fa-keyboard"
                            style={{
                              fontSize: 96,
                              marginLeft: -90,
                              color: "white",
                            }}
                          ></i>
                        </div>
                      </Col>
                    </Row>

                    <CardBody>
                      <p style={{ height: "50px", color: "white" }}>
                        <CardTitle>
                          <b>{"ระบุเอง"}</b>
                        </CardTitle>
                      </p>
                    </CardBody>
                  </Card>

                  {this.props.jobs.map((item, idx) => (
                    <Row key={"jobs_" + idx}>
                      <Col md={6}>
                        <Card
                          color="info"
                          className="btn"
                          key={idx}
                          style={{ width: "11rem", margin: "7px" }}
                          onClick={() =>
                            this.props._onSelectJob(
                              item.job_code,
                              item.job_name
                            )
                          }
                        >
                          <Row>
                            <Col style={{ height: "96px" }}>
                              <div>
                                <i
                                  className="fas  fa-file-signature"
                                  style={{
                                    fontSize: 96,
                                    marginLeft: -72,
                                    color: "white",
                                  }}
                                ></i>
                              </div>
                            </Col>
                          </Row>

                          <CardBody>
                            <p style={{ height: "50px", color: "white" }}>
                              <CardTitle>
                                <b>{item.job_code}</b>
                              </CardTitle>
                              <CardTitle>
                                <b>{item.job_name}</b>
                              </CardTitle>
                            </p>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  ))}
                </div>
              </>
            )}
          </CardBody>
        </ModalBody>
        <ModalFooter className="bodymodal">
          <Row>
            <Col>
              <FormGroup>
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
export default Select_job;
