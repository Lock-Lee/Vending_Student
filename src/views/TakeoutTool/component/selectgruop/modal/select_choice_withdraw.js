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

export class Select_choice_withdraw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      status_show_withdraw: false,
      change_color_card: -1,
      job_level_1_name: "",
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        status_show_withdraw: this.props.status_show_withdraw,
        loading: false,
      });
    }, 300);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.status_show_withdraw !== this.state.status_show_withdraw) {
      this.setState({
        status_show_withdraw: this.props.status_show_withdraw,
      });
    }
  }

  _onselct_jobcard(job_name, name_thai, index) {
    this.setState({
      job_level_1_name: job_name,
    });

    this.props._onSelectJobLevel1(job_name, name_thai);
    this._selct_card_change_color(index);
  }

  _selct_card_change_color = (idx) => {
    this.setState({
      change_color_card: idx,
    });
  };

  _option_displayback = () => {
    const { pre_page } = this.props;

    if (pre_page == "select-job-level1") {
      this.props._displayback({
        event_page_current: "select_job_level2",
      });
    } else if (pre_page == "select-job-level2") {
      this.props._displayback({
        event_page_current: "select_job_level3",
      });
    } else if (pre_page == "select-job-level3") {
      this.props._displayback({
        event_page_current: "select_job_level4",
      });
    } else if (pre_page == "select-job-level4") {
      this.props._displayback({
        event_page_current: "select_job_last",
      });
    }
  };

  render() {
    // let { status_show_withdraw } = this.props

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
            <h3>กรุณาเลือก</h3>
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
              <Col>
                <h6>
                  <b>จำนวนสินค้าต่อช่อง:</b>{" "}
                  {this.props.product_select.product_refill_unit}{" "}
                  <b>{product_unit_thai}</b>
                </h6>
              </Col>
            </Col>
          </Row>
        </CardHeader>
        <ModalBody className="bodymodal">
          <CardBody>
            {this.state.loading ? (
              <>
                {" "}
                <div style={{ textAlign: "center" }}>
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
                <Row>
                  <Col>
                    <Button
                      color="success"
                      type="button"
                      className="btn"
                      style={{
                        height: "180px",
                        width: "100%",
                        // backgroundColor: "#0052CC",
                      }}
                      onClick={() => {
                        this.props._onSelect_withdraw_now();
                      }}
                    >
                      <i
                        class="fas fa-hand-holding"
                        style={{ fontSize: "11vh", marginRight: "5vw" }}
                      ></i>{" "}
                      <br></br>
                      <br></br>
                      <h3>เบิกสินค้า</h3>
                    </Button>
                  </Col>

                  <Col>
                    {" "}
                    <Button
                      color="success"
                      type="button"
                      className="btn"
                      style={{
                        height: "180px",
                        width: "100%",
                        // backgroundColor: "#0052CC",
                      }}
                      onClick={() => {
                        this.props._onSelect_add_in_basket();
                      }}
                    >
                      <i
                        class="fas fa-cart-arrow-down "
                        style={{ fontSize: "11vh", marginRight: "6vw" }}
                      ></i>

                      <br></br>
                      <br></br>

                      <h3>เพิ่มลงตะกร้า</h3>
                    </Button>
                  </Col>
                </Row>
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
                  onClick={() => this._option_displayback()}
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
export default Select_choice_withdraw;
