import React, { Component } from "react";
import {
  Button,
  Badge,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  CardTitle,
  Col,
  Input,
  Row,
} from "reactstrap";

import { Select } from "../../../../../component/revel-strap";
import GLOBAL from "../../../../../GLOBAL";
import ProductModel from "../../../../../models/ProductModel";
import ProductGroupModel from "../../../../../models/ProductGroupModel";
import ProductTypeModel from "../../../../../models/ProductTypeModel";
import ProductBrandModel from "../../../../../models/ProductBrandModel";
import ModalKeyboard from "../../../../../component/modals/ModalKeyboard";
import Main_modal_assign_job from "./OptionIssueAssignJob/main-modal-assign-job";
import SrceenBasket from "../../selectgruop/srceen_basket";

const product_model = new ProductModel();
const product_brandModel = new ProductBrandModel();
const producttype_model = new ProductTypeModel();
const productgroup_model = new ProductGroupModel();

export class Select_Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btn_selec: true,
      loading: true,
      product: [],
      product_brand: [],
      product_type: [],
      product_group: [],
      product_list: [],
      product_group_code: "",
      product_type_code: "",
      product_select: [],
      list_in_basket: [],
      check_list_Articles: false,
      show_modals: false,
      input_Search: "",
      show_Keyboard: false,
      show_basket: false,
      title_modal: "",
      product_code: "",
      product_issue_type: "",
      issue_by_list: [],
      user_code: "",
      user_firstname: "",
      user_lastname: "",
      cost_center: [],
      count_page_number: 0,
      page_size: 24,
      page_number: 1,
    };
  }
  async componentDidMount() {
    this._fetchData();
  }
  async _fetchData() {
    let product_target = this.props.product_target;
    const cost_center = this.props.cost_center;

    let keyword = this.state.input_Search;
    const user_code = this.props.user_code;
    const user_firstname = this.props.user_firstname;
    const user_lastname = this.props.user_lastname;
    const productgroup = await productgroup_model.getProductGroupBy();
    const producttype = await producttype_model.getProductTypeBy();
    const productbrand = await product_brandModel.getProductBrandBy();
    const products = await product_model.getProductByGroup({
      product_group_code: this.state.product_group_code,
      product_type_code: this.state.product_type_code,
      keyword: keyword,
    });

    let products_filter = products.data[0].filter((val) => {
      for (let i = 0; i < this.state.list_in_basket.length; i++) {
        if (val.product_code == this.state.list_in_basket[i].product_code)
          return false;
      }
      return val.product_code !== this.state.product_code;
    });

    let new_product_target = [];

    products_filter.filter((new_pro) => {
      product_target.map((pro_tar) => {
        if (new_pro.product_code === pro_tar.product_code) {
          new_product_target.push(pro_tar);
        }
      });
    });

    const data = [];
    data.push({
      loading: false,
      product_brand: productbrand.data,
      product_type: producttype.data,
      product_group: productgroup.data,
      product_list: new_product_target,
      check_list_Articles: false,
      user_code: user_code,
      user_firstname: user_firstname,
      user_lastname: user_lastname,
      cost_center: cost_center,
    });

    this._paginate(data, new_product_target);
  }

  _paginate = (data, products_filter) => {
    const {
      loading,
      product_brand,
      product_type,
      product_group,
      check_list_Articles,
      user_code,
      user_firstname,
      user_lastname,
      cost_center,
    } = data[0];

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
      loading: loading,
      product_brand: product_brand,
      product_type: product_type,
      product_group: product_group,
      check_list_Articles: check_list_Articles,
      user_code: user_code,
      user_firstname: user_firstname,
      user_lastname: user_lastname,
      cost_center: cost_center,
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

  _deleteRowInBasket(idx) {
    this.setState(
      (state) => {
        state.list_in_basket.splice(idx, 1);
        return {
          list_in_basket: state.list_in_basket,
        };
      },
      () => { }
    );
  }

  _inputkeyboard = (e) => {
    this.setState(
      {
        input_Search: e,
        data_modal: e,
        show_Keyboard: false,
      },
      () => this._fetchData()
    );
  };

  _filterdatasearch() {
    let input_Search = this.state.input_Search;
    let product_list = this.state.product_list;
    let products_filter = [];
    if (input_Search !== "") {
      product_list.forEach((val) => {
        if (
          val.product_name.search(input_Search) > -1 ||
          val.product_code.search(input_Search) > -1
        ) {
          products_filter.push(val);
        }
      });
    } else if (input_Search === "") {
      this._fetchData();
    }
    this.setState({
      product_list: products_filter,
    });
  }

  _onselectproduct = async (product) => {
    this.setState({
      product_select: product,
      show_modals: true,
    });
  };

  _onSaveSelectProductOption = async (list_basket) => {
    let list_in_basket = this.state.list_in_basket;
    const user_code = this.state.user_code;
    const user_firstname = this.state.user_firstname;
    const user_lastname = this.state.user_lastname;

    list_basket["user_code"] = user_code;
    list_basket["user_firstname"] = user_firstname;
    list_basket["user_lastname"] = user_lastname;
    list_in_basket.push(list_basket);

    this.setState({
      show_modals: false,
      list_in_basket: list_in_basket,
    });
  };

  render() {
    let list_in_basket = this.state.list_in_basket;
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
        <Card style={{ height: "85vh" }}>
          <CardHeader>
            <Row>
              <Col>
                {" "}
                <Button
                  className="btn "
                  type="button"
                  style={{ height: "80px", width: "120px" }}
                  onClick={() =>
                    this.props._displayback({
                      current_display: "job-op-machine-tool",
                    })
                  }
                >
                  {" "}
                  <i className="fas fa-arrow-left"></i>
                </Button>
              </Col>
              <Col style={{ textAlign: "center" }}>
                {" "}
                <h1>เบิกสินค้า</h1>
              </Col>
              <Col style={{ textAlign: "end" }}>
                <Button
                  className="btn btn-info"
                  type="button"
                  style={{
                    height: "80px",
                    width: "120px",
                  }}
                  onClick={() =>
                    this.setState({
                      show_basket: true,
                    })
                  }
                >
                  {" "}
                  <i
                    className="fas fa-shopping-cart fa-3x"
                    style={{ paddingRight: "30px" }}
                  ></i>
                  <Badge
                    // style={{ paddingRight: '30px' }}
                    color="danger"
                    pill
                  >
                    {list_in_basket.length}
                  </Badge>
                </Button>
              </Col>
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
                        });
                        this._fetchData();
                      }}
                    />
                  </Col>
                  <Col md={5}>
                    <label>ค้นหา</label>
                    <div className="input-group-append">
                      <Input
                        placeholder="ค้นหา..."
                        value={this.state.input_Search}
                        onChange={(e) =>
                          this.setState({ input_Search: e.target.value }, () =>
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
                              show_Keyboard: true,
                              title_modal: "ค้นหา",
                              data_modal: this.state.machine_type_name,
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
                  {this.state.product_list.map((item, idx) => (
                    <Col
                      key={"product_list_" + idx}
                      md={1}
                      style={{ textAlign: "center" }}
                    >
                      <Card
                        key={idx}
                        className="product"
                        onClick={() => this._onselectproduct(item)}
                      >
                        <CardBody>
                          <img
                            src={`${GLOBAL.BASE_SERVER.URL_IMG}${item.product_image === "" ||
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
                          <p style={{ height: "50px" }}>
                            <CardTitle>
                              <p
                                style={{
                                  width: "120px",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                }}
                              >
                                <p
                                  style={{
                                    width: "110px",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    margin: "auto",
                                  }}
                                >
                                  <b>
                                    {item.product_name}
                                  </b>
                                </p>
                              </p>
                            </CardTitle>
                            <CardTitle>
                              <p
                                style={{
                                  width: "120px",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                }}
                              >
                                <p
                                  style={{
                                    width: "110px",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    margin: "auto",
                                  }}
                                >
                                  <b>
                                    {item.article_code}
                                  </b>
                                </p>
                              </p>
                            </CardTitle>
                            <CardTitle></CardTitle>
                          </p>
                        </CardBody>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Col>
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
        <ModalKeyboard
          show={this.state.show_Keyboard}
          data_modal={this.state.data_modal}
          title_modal={this.state.title_modal}
          onSave={this._inputkeyboard}
          onClose={() => this.setState({ show_Keyboard: false })}
        />
        <Main_modal_assign_job
          show={this.state.show_modals}
          list_in_basket={this.state.list_in_basket}
          cost_center={this.state.cost_center}
          product_select={this.state.product_select}
          product_brand={this.state.product_brand}
          product_type={this.state.product_type}
          product_group={this.state.product_group}
          onSave={this._onSaveSelectProductOption}
          onClose={() => this.setState({ show_modals: false })}
        />
        <SrceenBasket
          show={this.state.show_basket}
          list_in_basket={this.state.list_in_basket}
          onClose={() => this.setState({ show_basket: false })}
        />
      </div>
    );
  }
}
export default Select_Product;
