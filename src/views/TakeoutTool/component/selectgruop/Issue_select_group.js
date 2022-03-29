import React, { Component } from "react";
import {
  Button,
  Badge,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Input,
  Row,
} from "reactstrap";
import Swal from "sweetalert2";
import { Select, Loading } from "../../../../component/revel-strap";
import GLOBAL from "../../../../GLOBAL";
import ProductModel from "../../../../models/ProductModel";
import ProductGroupModel from "../../../../models/ProductGroupModel";
import ProductTypeModel from "../../../../models/ProductTypeModel";
import ProductBrandModel from "../../../../models/ProductBrandModel";
import UserGroupProductModel from "../../../../models/UserGroupProductModel";
import UserLicenseGroupModel from "../../../../models/UserLicenseGroupModel";
import IssueOptionModal from "./modal/main-select-option.modal";
import ModalKeyboard from "../../../../component/modals/ModalKeyboard";
import SrceenBasket from "./srceen_basket";
import BarcodeReader from "react-barcode-reader";
const user_group_model = new UserGroupProductModel();
const product_model = new ProductModel();
const product_brandModel = new ProductBrandModel();
const producttype_model = new ProductTypeModel();
const productgroup_model = new ProductGroupModel();
const user_license_model = new UserLicenseGroupModel();
export class Issue_select_group extends Component {
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
      product_select_license: [],
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
      user_group: [],
      products_filter: [],
      license_product: [],
      count_issue: [],
      count_page_number: 0,
      page_size: 24,
      page_number: 1,
      status_manchine: "",
      type_withdraw: "",
      list_in_withdraw_now: [],
    };
  }
  componentDidUpdate(props) {
    // console.log(this.props);
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
  async componentDidMount() {
    this._fetchData();
    // console.log(this.props);
    this._CheckReady();
  }
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
      }).then((result) => {
        // window.location.replace("http://localhost:3000/#/");
      });
    }
  }
  async _fetchData() {
    let keyword = this.state.input_Search;
    const user_code = this.props.user_code;
    const user_firstname = this.props.user_firstname;
    const user_lastname = this.props.user_lastname;
    const productgroup = await productgroup_model.getProductGroupBy();
    const producttype = await producttype_model.getProductTypeBy();
    const productbrand = await product_brandModel.getProductBrandBy();
    const products = await product_model.getProductALLByGroup({
      product_group_code: this.state.product_group_code,
      product_type_code: this.state.product_type_code,
      keyword: keyword,
      product_type_consumable: undefined,
    });

    const user_license = await user_license_model.getUserLicenseGroupbyCode({
      user_code: this.props.user_code,
    });

    this.setState(
      {
        loading: true,
        product_brand: productbrand.data,
        product_type: producttype.data,
        product_group: productgroup.data,
        products_filter: products.data[0],
        check_list_Articles: false,
        user_code: user_code,
        user_firstname: user_firstname,
        user_lastname: user_lastname,
        user_group: user_license.data,
      },
      async () => {
        let { products_filter } = this.state;
        let product_lists = [];
        let user_groups = [];

        let user_group = await user_group_model.getUserGroupProductByMutiGroup({
          user_group: this.state.user_group,
        });
        console.log(user_group);
        user_group.data.forEach((val, index, arr) => {
          if (
            user_groups.find((data) => data.product_code === val.product_code)
          ) {
            if (
              user_groups.find(
                (e) => e.stock_product_type !== val.stock_product_type
              )
            ) {
              user_groups.push(val);
            } else {
              if (val.withdraw_type === "0") {
                user_groups.splice(
                  user_groups.findIndex(
                    (e) => e.product_code === val.product_code
                  ),
                  1,
                  val
                );
              }
            }
          } else {
            user_groups.push(val);
          }
        });
        console.log(user_groups);
        products_filter.forEach((val, index) => {
          if (
            user_group.data.findIndex(
              (data) => data.product_code === val.product_code
            ) !== -1
          ) {
            product_lists.push(products_filter[index]);
          }

          // if (val.product_type_consumable === "Loan") {
          //   product_lists.push(products_filter[index]);
          // }
        });

        let { list_in_basket } = this.state;

        if (list_in_basket.length > 0) {
          product_lists.filter((val) => {
            for (let i = 0; i < list_in_basket.length; i++) {
              if (val.product_code == list_in_basket[i].product_code) {
                val.product_amount =
                  val.product_amount - list_in_basket[i].Issue_qty;
              }
            }

            return val;
          });
        }

        this._paginate(product_lists, user_groups);
      }
    );
  }

  _paginate = (products_filter, user_groups) => {
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
      loading: false,
      product_list: products_filter_paginate,
      license_product: user_groups,
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
      () => {}
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
    if (product.product_amount == 0) {
      Swal.fire({
        title: "สินค้าหมด !",
        icon: "warning",
        timer: 1000,
      });
    } else {
      let { license_product } = this.state;
      let { product_select_license } = this.state;
      product_select_license = [];

      license_product.forEach((val) => {
        console.log(val);
        if (val.product_code === product.product_code) {
          if (
            license_product.find(
              (data) =>
                val.stock_product_type === data.stock_product_type &&
                val.withdraw_type === "1"
            )
          ) {
            product_select_license.push(val);
          } else {
            //  product_select_license.splice(index, 1);
          }
        }
      });

      this.setState(
        {
          product_select: product,
          show_modals: true,
          product_select_license: product_select_license,
        },
        () => {}
      );
    }
  };

  _onSaveSelectProductOption = async (list_basket, type_withdraw) => {
    // console.log('type_withdraw', type_withdraw);

    if (type_withdraw == "withdraw-now") {
      let list_in_withdraw_now = this.state.list_in_withdraw_now;
      let { count_issue } = this.state;
      count_issue = list_basket.count_issue;
      const user_code = this.state.user_code;
      const user_firstname = this.state.user_firstname;
      const user_lastname = this.state.user_lastname;
      list_basket["user_code"] = user_code;
      list_basket["user_firstname"] = user_firstname;
      list_basket["user_lastname"] = user_lastname;

      list_in_withdraw_now.push(list_basket);

      this.setState({
        show_modals: false,
        show_basket: true,
        list_in_withdraw_now: list_in_withdraw_now,
        count_issue: count_issue,
        type_withdraw: type_withdraw,
      });
    }

    if (type_withdraw == "add-in-basket") {
      let list_in_basket = this.state.list_in_basket;
      let { count_issue } = this.state;
      count_issue = list_basket.count_issue;
      const user_code = this.state.user_code;
      const user_firstname = this.state.user_firstname;
      const user_lastname = this.state.user_lastname;
      list_basket["user_code"] = user_code;
      list_basket["user_firstname"] = user_firstname;
      list_basket["user_lastname"] = user_lastname;

      list_in_basket.push(list_basket);

      this.setState(
        {
          show_modals: false,
          list_in_basket: list_in_basket,
          count_issue: count_issue,
          type_withdraw: type_withdraw,
        },
        () => this._fetchData()
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
          this._onselectproduct(val);
        }
      });
    }
  };

  _handleError = (error) => {
    console.log("error : ", error);
  };

  _fetchNewData = () => {
    this.setState(
      {
        show_basket: false,
        loading: true,
        type_withdraw: "",
      },
      () => this._fetchData()
    );
  };

  render() {
    let list_in_basket = this.state.list_in_basket;
    // console.log("list_in_basket", list_in_basket);
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
                <Button
                  className="btn "
                  type="button"
                  style={{ height: "80px", width: "120px" }}
                  onClick={() =>
                    this.props._displayback({ current_display: "" })
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
                      type_withdraw: "add-in-basket",
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
                      {/* <div className="input-group-append">
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
                      </div> */}
                    </div>
                  </Col>
                </Row>{" "}
                <hr></hr>
                <br></br>
                <Row>
                  {this.state.product_list.map((item, idx) => (
                    <>
                      <div>
                        {" "}
                        <div
                          className="card1"
                          style={
                            item.product_amount == 0
                              ? {
                                  backgroundColor: "#C3C3C3",
                                }
                              : []
                          }
                          color={item.product_amount == 0 ? "secondary" : null}
                          key={idx}
                          onClick={() => {
                            if (this._CheckReady()) {
                              this._onselectproduct(item);
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
                    </>
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

        <BarcodeReader onError={this._handleError} onScan={this._handleScan} />

        <ModalKeyboard
          show={this.state.show_Keyboard}
          data_modal={this.state.data_modal}
          title_modal={this.state.title_modal}
          onSave={this._inputkeyboard}
          onClose={() => this.setState({ show_Keyboard: false })}
        />
        <IssueOptionModal
          count_issue={this.state.count_issue}
          user_code={this.state.user_code}
          license_product={this.state.product_select_license}
          show={this.state.show_modals}
          list_in_basket={this.state.list_in_basket}
          product_select={this.state.product_select}
          product_brand={this.state.product_brand}
          product_type={this.state.product_type}
          product_group={this.state.product_group}
          onSave={this._onSaveSelectProductOption}
          onClose={() => this.setState({ show_modals: false })}
        />
        <SrceenBasket
          show={this.state.show_basket}
          type_withdraw={this.state.type_withdraw}
          list_in_basket={this.state.list_in_basket}
          list_in_withdraw_now={this.state.list_in_withdraw_now}
          onClose={this._fetchNewData}
        />
      </div>
    );
  }
}
export default Issue_select_group;
