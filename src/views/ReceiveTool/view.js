import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Input,
  Row,
  CardTitle,
} from "reactstrap";
import Swal from "sweetalert2";
import Modalkeyboard from "../../component/modals/ModalKeyboard";
import socketIOClient from "socket.io-client";
import { Link } from "react-router-dom";

import { Select, Loading } from "../../component/revel-strap";
import GLOBAL from "../../GLOBAL";
import ProductModel from "../../models/ProductModel";
import ProductGroupModel from "../../models/ProductGroupModel";
import ProductTypeModel from "../../models/ProductTypeModel";
import Modalshow from "./component/modalshow";
import BarcodeReader from "react-barcode-reader";
const endpoint = "http://localhost:7001";
const product_model = new ProductModel();
const producttype_model = new ProductTypeModel();
const productgroup_model = new ProductGroupModel();

export class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      product_type: [],
      product_group: [],
      product_type_code: "",
      product_group_code: "",
      keyword: "",
      product_code: "",
      product_list: [],
      stock_status: "",
      modal: false,
      show_modal: false,
      title_modal: "",
      count_page_number: 0,
      page_size: 24,
      page_number: 1,
      status_manchine: "",
    };
  }
  componentDidUpdate(props) {
    if (this.props.status_manchine !== this.state.status_manchine) {
      this.setState(
        {
          status_manchine: this.props.status_manchine,
        },
        () => {
          this._CheckReady();
        }
      );
    }
  }
  componentDidMount() {
    if (
      this.props.status_manchine === "ไม่พร้อม" ||
      this.props.status_manchine === "เชื่อมต่อไม่ได้"
    ) {
      Swal.fire({
        title: "เชื่อมต่อไม่สำเร็จ",
        html: "กรุณาตรวจสอบตู้ ?",
        icon: "error",
      }).then((result) => {
        this.props.history.push("/");
      });
    } else if (this.props.status_manchine === "ประตูเปิดอยู่") {
      Swal.fire({
        title: "ประตูเปิดอยู่",
        html: "กรุณาตรวจสอบประตู ?",
        icon: "error",
      }).then((result) => {});
    }

    this._fetchData();
  }
  async _fetchData(params = { pagination: { current: 1, pageSize: 36 } }) {
    const productgroup = await productgroup_model.getProductGroupBy();
    const producttype = await producttype_model.getProductTypeBy();
    const product_list = await product_model.getProductALLByGroup({
      product_group_code: this.state.product_group_code,
      product_type_code: this.state.product_type_code,
      params: params,
      keyword: this.state.keyword,
    });

    this.setState({
      loading: false,
      product_type: producttype.data,
      product_group: productgroup.data,
    });

    this._paginate(product_list.data[0]);
  }
  _scoketSetup() {
    const socket = socketIOClient(endpoint);
    socket.on("answer-micro", (messageNew) => {
      let messages = messageNew.split("-");

      if (messages[0] === "CR") {
        if (messages[1] === "READY\r") {
          this.setState({
            status_manchine: true,
          });
        } else if (messages[1] === "DOORCLOSE\r") {
          this.setState({
            status_manchine: true,
          });
        } else if (messages[1] === "DOOROPEN\r") {
          this.setState({
            status_manchine: false,
          });
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
  _CheckReady() {
    if (this.state.status_manchine === "ไม่พร้อม") {
      return false;
    } else if (this.state.status_manchine === "ประตูเปิดอยู่") {
      return false;
    } else if (this.state.status_manchine === "พร้อม") {
      return true;
    }
  }
  _StatusVending(data) {
    if (data === "เชื่อมต่อไม่ได้") {
      Swal.fire({
        title: "เชื่อมต่อไม่สำเร็จ",
        html: "กรุณาตรวจสอบตู้ ?",
        icon: "error",
      }).then((result) => {
        this.props.history.push("/");
      });
    }

    if (data === "ประตูเปิดอยู่") {
      Swal.fire({
        title: "ประตูเปิดอยู่",
        html: "กรุณาตรวจสอบประตู ?",
        icon: "error",
      }).then((result) => {});
    }
  }
  _paginate = (products_filter) => {
    let { page_size, page_number } = this.state;
    let after_count_page_number = products_filter.length;
    let count_page_number = this.state.count_page_number;

    if (after_count_page_number % page_size != 0) {
      count_page_number =
        parseInt((count_page_number = after_count_page_number / page_size)) + 1;
    } else if (after_count_page_number % page_size == 0) {
      count_page_number = parseInt(
        (count_page_number = after_count_page_number / page_size)
      );
    }

    let products_filter_paginate = products_filter.slice(
      (page_number - 1) * page_size,
      page_number * page_size
    );

    this.setState({
      count_page_number: count_page_number,
      product_list: products_filter_paginate,
    });
  };

  _display_paginate() {
    let button_page_number = [];

    for (let i = 1; i <= this.state.count_page_number; i++) {
      button_page_number.push(
        this.state.page_number === i ? (
          <Button
            style={{
              lineHeight: "22px",
              borderBlockColor: "#40a9ff",
              backgroundColor: "#39f",
              color: "#fff",
            }}
            onClick={() =>
              this.setState(
                {
                  page_number: i,
                },
                () => this._fetchData()
              )
            }
          >
            {i}
          </Button>
        ) : (
          <Button
            style={{
              lineHeight: "22px",
              borderBlockColor: "#40a9ff",
              backgroundColor: "#fff",
            }}
            onClick={() =>
              this.setState(
                {
                  page_number: i,
                },
                () => this._fetchData()
              )
            }
          >
            {i}
          </Button>
        )
      );
    }
    return button_page_number;
  }

  _SelectType(type) {
    this.setState({
      stock_status: type,
    });
  }

  async _SelectData(code) {
    const product = await product_model.getProductByCode({
      product_code: code,
    });
    this.setState({ modal: true, product: product.data[0] });
  }

  _handleClose() {
    this.setState({
      modal: false,
    });
  }
  _inputdata = (e) => {
    if (this.state.title_modal === "ค้นหา") {
      this.setState(
        {
          keyword: e,
          show_modal: false,
        },
        () => {
          this._fetchData();
        }
      );
    }
  };

  _handleScan = (code) => {
    // console.log("code : ", code);

    const check_reg = code.replace(/[^a-z0-9]/gi, "");
    if (!check_reg) {
      Swal.fire({
        title: "กรุณาเปลี่ยนภาษา !",
        icon: "warning",
        timer: 1500,
      });
    } else {
      let { product_list } = this.state;
      product_list.find((val) => {
        if (val.product_barcode == code) {
          this._SelectData(val.product_code);
        }
      });
    }
  };

  _handleError = (error) => {
    console.log("error : ", error);
  };

  render() {
    const { product_list } = this.state;
    const product_type_option = [
      { label: "- ทั้งหมด -", value: "" },
      ...this.state.product_type.map((val) => ({
        value: val.product_type_code,
        label: val.product_type_name,
      })),
    ];
    const product_group_option = [
      { label: "- ทั้งหมด -", value: "" },
      ...this.state.product_group.map((val) => ({
        value: val.product_group_code,
        label: val.product_group_name,
      })),
    ];
    return (
      <div>
        <Loading show={this.state.loading} />
        <Card style={{ height: "85vh" }}>
          <CardHeader>
            <Row>
              <Col>
                {" "}
                <Link to="/">
                  <Button
                    type="button"
                    style={{
                      width: "120px",
                      height: "80px",
                    }}
                  >
                    {" "}
                    <i className="fas fa-arrow-left"></i>
                  </Button>
                </Link>
              </Col>
              <Col style={{ textAlign: "center" }}>
                {" "}
                <h1>เติมสินค้า</h1>
              </Col>
              <Col style={{ textAlign: "center" }}> </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Row>
              <Col>
                <Row>
                  <Col md={2}>
                    <label>ประเภท</label>
                    <Select
                      options={product_type_option}
                      value={this.state.product_type_code}
                      onChange={(e) => {
                        this.setState({
                          product_type_code: e,
                          keyword: "",
                        });
                        this._fetchData();
                      }}
                    />
                  </Col>
                  <Col md={2}>
                    <label>กลุ่ม</label>
                    <Select
                      options={product_group_option}
                      value={this.state.product_group_code}
                      onChange={(e) => {
                        this.setState({
                          product_group_code: e,
                          keyword: "",
                        });
                        this._fetchData();
                      }}
                    />
                  </Col>{" "}
                  <Col md={3}>
                    <label>ค้นหา</label>
                    <div className="input-group-append">
                      <Input
                        placeholder="ค้นหา..."
                        onChange={(e) =>
                          this.setState({ keyword: e.target.value }, () =>
                            this._fetchData()
                          )
                        }
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-secondary"
                          type="button"
                          onClick={() =>
                            this.setState({
                              show_modal: true,
                              title_modal: "ค้นหา",
                            })
                          }
                        >
                          <i className="fas fa-keyboard"></i>
                        </button>
                      </div>
                    </div>
                  </Col>
                </Row>
                <hr></hr>
                <br></br>
                <Row>
                  {product_list?.map((item, idx) => {
                    console.log(item.product_image);
                    return (
                      <div>
                        {" "}
                        <div
                          className="card1"
                          key={idx}
                          onClick={() => {
                            if (this._CheckReady()) {
                              this._SelectData(item.product_code);
                            } else {
                              this._StatusVending(this.state.status_manchine);
                            }
                          }}
                        >
                          <div>
                            {" "}
                            <img
                              src={`${GLOBAL.BASE_SERVER.URL_IMG}${
                                item.product_image === "" ||
                                item.product_image === undefined ||
                                item.product_image === null
                                  ? "default.png"
                                  : item.product_image
                              }`}
                              alt="product_image"
                              style={{
                                marginTop: "5px",
                                border: "1px solid #ddd",

                                width: "80px",
                                height: "60px",
                              }}
                            />
                          </div>
                          <div>
                            <b>{item.product_name}</b>
                          </div>

                          <div>
                            <b>
                              {item.internal_code != "" ? (
                                item.internal_code
                              ) : (
                                <></>
                              )}
                            </b>
                          </div>

                          <div>
                            <b>{item.article_code}</b>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Row>
                <Row>
                  <Col> </Col>
                </Row>
                <br></br>
              </Col>
            </Row>
            <Row>
              <Col></Col>
            </Row>
          </CardBody>
          <CardFooter>
            <Row>
              <Col style={{ textAlign: "center" }}>
                {this._display_paginate()}
              </Col>
            </Row>
          </CardFooter>
        </Card>

        <BarcodeReader onError={this._handleError} onScan={this._handleScan} />

        <Modalshow
          machine_status={this.props}
          props={this.props.USER}
          modal={this.state.modal}
          product={this.state.product}
          _handleClose={() => this._handleClose()}
        />
        <Modalkeyboard
          show={this.state.show_modal}
          data_modal={this.state.data_modal}
          title_modal={this.state.title_modal}
          onSave={this._inputdata}
          onClose={() => this.setState({ show_modal: false })}
        />
      </div>
    );
  }
}

export default View;
