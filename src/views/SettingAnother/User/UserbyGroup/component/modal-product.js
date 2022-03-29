import React, { Component } from "react";
import Keyboard from "react-simple-keyboard";
import {
  Button,
  Col,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Form,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
  Card,
  CardBody,
  CardTitle,
  CardFooter,
  CardHeader,
} from "reactstrap";
import Swal from "sweetalert2";
import Modalkeyboard from "../../../../../component/modals/ModalKeyboard";

import { Select, Loading } from "../../../../../component/revel-strap";
import GLOBAL from "../../../../../GLOBAL";
import ProductModel from "../../../../../models/ProductModel";
import ProductGroupModel from "../../../../../models/ProductGroupModel";
import ProductTypeModel from "../../../../../models/ProductTypeModel";
import { Link } from "react-router-dom";
const product_model = new ProductModel();
const producttype_model = new ProductTypeModel();
const productgroup_model = new ProductGroupModel();

export default class Modalproduct extends Component {
  constructor() {
    super();
    this.state = {
      product_list: [],
      product_type: [],
      product_group: [],
      show_modal: false,
      product_group_code: "",
      product_type_code: "",

      user_group_code: "",

      products: [],
      user_group: [],
      autoFocus: "",
      keyword: "",
      productby_group: [],
    };
  }
  componentDidUpdate() {
    if (this.state.productby_group === undefined) {
      this.setState({
        productby_group: this.props.productby_group,
      });
    }
  }
  componentDidMount() {
    this.setState({
      productby_group: this.props.productby_group,
    });
    this._fetchData();
  }
  async _fetchData(params = { pagination: { current: 1, pageSize: 36 } }) {
    const productgroup = await productgroup_model.getProductGroupBy();
    const producttype = await producttype_model.getProductTypeBy();
    let product_list = await product_model.getProductByGroup({
      product_group_code: this.state.product_group_code,
      product_type_code: this.state.product_type_code,
      params: params,
      keyword: this.state.keyword,
    });

    this.setState({
      product_list: product_list.data[0],
      product_type: producttype.data,
      product_group: productgroup.data,
    });
  }
  _addRow(data) {
    let { productby_group } = this.state;

    let { product_image, product_name, product_code } = data;
    if (productby_group.find((e) => e.product_code === data.product_code)) {
    } else {
      productby_group.push({
        0: {
          user_group_product_code: "",
          product_code: product_code,
          stock_product_type: "New",
          user_group_code: this.props.user_group_code,
          withdraw_type: false,
          withdraw_time_type: "",
          withdraw_qty: "",
          withdraw_time: "",
        },
        1: {
          user_group_product_code: "",
          product_code: product_code,
          stock_product_type: "RF",
          user_group_code: this.props.user_group_code,
          withdraw_type: false,
          withdraw_time_type: "",
          withdraw_qty: "",
          withdraw_time: "",
        },
        2: {
          user_group_product_code: "",
          product_code: product_code,
          stock_product_type: "Old",
          user_group_code: this.props.user_group_code,
          withdraw_type: false,
          withdraw_time_type: "",
          withdraw_qty: "",
          withdraw_time: "",
        },
        3: {
          user_group_product_code: "",
          product_code: product_code,
          stock_product_type: "Loan",
          user_group_code: this.props.u0102ser_group_code,
          withdraw_type: false,
          withdraw_time_type: "",
          withdraw_qty: "",
          withdraw_time: "",
        },
        user_group_code: this.props.user_group_code,
        product_code: product_code,
        product_image: product_image,
        product_name: product_name,
      });
    }

    this.setState(productby_group, () =>
      this.props._addproduct(productby_group)
    );
  }
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
      <>
        {" "}
        <Modal
          isOpen={this.props.show}
          toggle={this._handleClose}
          style={{ width: "95vw", maxWidth: "100%" }}
        >
          <ModalBody>
            <div>
              <Card style={{ height: "65vh" }}>
                <CardHeader>เลือกสินค้า</CardHeader>
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
                          return (
                            <Col
                              key={"product_list_" + idx}
                              md={1}
                              style={{ textAlign: "center", padding: "1px" }}
                            >
                              {" "}
                              <Card
                                key={idx}
                                style={{
                                  width: "7vw",
                                  height: "17vh",
                                  paddingTop: "10px",
                                  alignItems: "center",
                                  borderRadius: "10px",
                                  border: "solid 1px #BEBEBE",
                                }}
                                onClick={() => {
                                  this._addRow(item);
                                }}
                              >
                                <img
                                  width={"60%"}
                                  height={"40%"}
                                  src={`${GLOBAL.BASE_SERVER.URL_IMG}${
                                    item.product_image === "" ||
                                    item.product_image === undefined
                                      ? "default.png"
                                      : item.product_image
                                  }`}
                                  alt="product_image"
                                  style={{
                                    border: "1px solid #ddd",
                                    borderRadius: " 4px",
                                    padding: "5px",
                                  }}
                                />

                                <p
                                  style={{
                                    width: "5vw",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    marginBottom: "0px",
                                  }}
                                >
                                  <b>{item.product_name}</b>
                                </p>
                                <p
                                  style={{
                                    width: "5vw",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    marginBottom: "0px",
                                  }}
                                >
                                  {" "}
                                  <b>{item.product_code}</b>
                                </p>
                              </Card>
                            </Col>
                          );
                        })}
                      </Row>
                      <Row>
                        <Col> </Col>
                      </Row>
                      <br></br>
                    </Col>
                  </Row>
                </CardBody>
              </Card>

              <Modalkeyboard
                show={this.state.show_modal}
                data_modal={this.state.data_modal}
                title_modal={this.state.title_modal}
                onSave={this._inputdata}
                onClose={() => this.setState({ show_modal: false })}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => {
                this.props._handleClose();
              }}
              style={{ width: "120px", height: "80px" }}
            >
              Save
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
