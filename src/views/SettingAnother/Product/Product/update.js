import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Row,
  Label,
  InputGroupAddon,
} from "reactstrap";
import { Radio } from "antd";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import GLOBAL from "../../../../GLOBAL";
import { Select, Loading } from "../../../../component/revel-strap";
import { BaseServerFile } from "../../../../utils";
import ProductModel from "../../../../models/ProductModel";
import ProductGroupModel from "../../../../models/ProductGroupModel";
import ProductBrandModel from "../../../../models/ProductBrandModel";
import ManageProductSupplier from "./selection/productsupplier";
import ProductTypeModel from "../../../../models/ProductTypeModel";
import ProductSupplierModel from "../../../../models/ProductSupplierModel";
import Modalkeyboard from "../../../../component/modals/ModalKeyboard";
import StockLayoutModel from "../../../../models/StockLayoutModel";
import Slotlayout from "../Product/slotlayout";
const base_server_file = new BaseServerFile();
const productgroup_model = new ProductGroupModel();
const productbrand_model = new ProductBrandModel();
const producttype_model = new ProductTypeModel();
const product_model = new ProductModel();
const productsupplier_model = new ProductSupplierModel();
const stocklayout_model = new StockLayoutModel();
class Update extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      show_modal: false,
      title_modal: "",
      data_modal: "",
      produts: [],
      product_code: "",
      article_code: "",
      internal_code: "",
      product_barcode: "",
      product_type_consumable: "",
      product_name: "",
      product_image: {
        src: `${GLOBAL.BASE_SERVER.URL_IMG}default.png`,
        file: null,
        old: "",
      },
      product_type_code: "",
      product_brand_code: "",
      product_group_code: "",
      product_package_qty: "",
      product_unit_qty: "",
      product_size: "",
      product_refill_qty: "",
      product_refill_unit: "",
      product_issue_type: "",
      product_issue_qty: "",
      product_issue_unit: "",
      product_min_qty: "",
      product_max_qty: "",
      product_safety_qty: "",
      product_unit: "",
      update: "",
      lastupdate: "",
      product_group: [],
      product_type: [],
      product_brand: [],
      product_suppliers: [],
      stock_layout: [],
      product_size: "",
      supplier_code: "",
      price: "",
      upload_path: "product/",
      display: "",
      product_rf_price: "",
      product_price: "",
      product_consignment: "",
      product_circulation: "",
    };
  }

  componentDidMount() {
    this._fetchData();

    this.setState(
      {
        loading: true,
      },
      async () => {
        const { code } = this.props.match.params;
        const product = await product_model.getProductByCode({
          product_code: code,
        });

        const product_suppliers =
          await productsupplier_model.getProductSupplierByCode({
            product_code: code,
          });
        const stocklayout = await stocklayout_model.getStockLayoutByGroup();

        if (product.require === false) {
          Swal.fire({
            title: "ข้อผิดพลาด !",
            text: "ไม่สามารถโหลดข้อมูล",
            icon: "error",
          });
          //  this.props.history.push("/product");
        } else if (product.data.length === 0) {
          Swal.fire({
            title: "ไม่พบรายการนี้ในระบบ !",
            text: code,
            icon: "warning",
          });
          //  this.props.history.push("/product");
        } else {
          const {
            product_code,
            product_name,
            article_code,
            internal_code,
            product_consignment,
            product_circulation,
            product_barcode,
            product_type_code,
            product_group_code,
            product_brand_code,
            product_package_qty,
            product_unit_qty,
            product_refill_qty,
            product_refill_unit,
            product_issue_type,
            product_issue_qty,
            product_issue_unit,
            product_unit,
            product_size,
            product_image,
            product_min_qty,
            product_max_qty,
            product_safety_qty,
            product_type_consumable,
            product_price,
            product_rf_price,
          } = product.data[0];

          this.setState({
            loading: false,
            stock_layout: stocklayout.data,
            product_consignment: product_consignment,
            product_circulation: product_circulation,
            product_suppliers: product_suppliers,
            product_code: product_code,
            product_name: product_name,
            article_code: article_code,
            internal_code: internal_code,
            product_barcode: product_barcode,
            product_type_code: product_type_code,
            product_group_code: product_group_code,
            product_brand_code: product_brand_code,
            product_type_consumable: product_type_consumable,
            product_image: {
              src: `${GLOBAL.BASE_SERVER.URL_IMG}${
                product_image === "" ? "default.png" : product_image
              }`,
              file: null,
              old: product_image,
            },
            product_size: product_size,
            product_rf_price: product_rf_price,
            product_price: product_price,
            product_package_qty: product_package_qty,
            product_unit_qty: product_unit_qty,
            product_refill_qty: product_refill_qty,
            product_refill_unit: product_refill_unit,
            product_issue_type: product_issue_type,
            product_issue_qty: product_issue_qty,
            product_issue_unit: product_issue_unit,
            product_unit: product_unit,

            updateby: this.props.USER.user_code,
            product_min_qty: product_min_qty,
            product_max_qty: product_max_qty,
            product_safety_qty: product_safety_qty,
          });
        }
      }
    );
  }
  _handleImageChange(img_name, e) {
    if (e.target.files.length) {
      let file = new File([e.target.files[0]], e.target.files[0].name, {
        type: e.target.files[0].type,
      });

      if (file) {
        let reader = new FileReader();

        reader.onloadend = () => {
          this.setState((state) => {
            if (img_name === "product_image") {
              return {
                product_image: {
                  src: reader.result,
                  file: file,
                  old: state.product_image.old,
                },
              };
            }
          });
        };
        reader.readAsDataURL(file);
      }
    }
  }

  async _fetchData() {
    const now = new Date();

    const producttype = await producttype_model.getProductTypeBy();
    const productgroup = await productgroup_model.getProductGroupBy();
    const productbrand = await productbrand_model.getProductBrandBy();
    this.setState({
      loading: false,
      product_brand: productbrand.data,
      product_group: productgroup.data,
      product_type: producttype.data,
    });
  }

  async _handleSubmit(event) {
    const now = new Date();
    let event_date = `${now.getFullYear()}${"-"}${(now.getMonth() + 1)
      .toString()
      .padStart(
        2,
        "0"
      )}${"-"}${now.getDate()} ${" "}${now.getHours()}${":"}${now.getMinutes()}${":"}${now.getSeconds()}`;

    event.preventDefault();

    if (this._checkSubmit()) {
      const res = await product_model.updateProductBy({
        product_code: this.state.product_code,
        product_name: this.state.product_name,
        article_code: this.state.article_code,
        internal_code: this.state.internal_code,
        product_package_qty: this.state.product_package_qty,
        product_type_consumable: this.state.product_type_consumable,
        product_unit_qty: this.state.product_unit_qty,
        product_issue_unit: this.state.product_issue_unit,
        product_issue_qty: this.state.product_issue_qty,
        product_issue_type: this.state.product_issue_type,
        product_refill_unit: this.state.product_refill_unit,
        product_refill_qty: this.state.product_refill_qty,
        product_consignment: this.state.product_consignment,
        product_circulation: this.state.product_circulation,

        product_size: this.state.product_size,
        product_image: await base_server_file.uploadFile({
          src: this.state.product_image,
          upload_path: this.state.upload_path,
        }),
        product_type_code: this.state.product_type_code,
        product_brand_code: this.state.product_brand_code,
        product_group_code: this.state.product_group_code,
        product_unit: this.state.product_unit,
        product_barcode: this.state.product_barcode,
        deleted: this.state.deleted,
        // product_suppliers: this.state.product_suppliers.map((item) => ({
        //   how2buy_code: this.state.how2buy_code,
        //   supplier_code: item.supplier_code,
        //   product_code: this.state.product_code,
        //   how2buy_qty: item.how2buy_qty
        //     .toString()
        //     .replace(new RegExp(",", "g"), ""),
        //   how2buy_price: item.how2buy_price
        //     .toString()
        //     .replace(new RegExp(",", "g"), ""),
        //   how2buy_leadtime: item.how2buy_leadtime
        //     .toString()
        //     .replace(new RegExp(",", "g"), ""),
        //   how2buy_remark: item.how2buy_remark
        //     .toString()
        //     .replace(new RegExp(",", "g"), ""),
        // })),
        updateby: this.props.USER.user_code,
        product_min_qty: this.state.product_min_qty,
        product_max_qty: this.state.product_max_qty,
        product_safety_qty: this.state.product_safety_qty,
        lastupdate: event_date,
        product_rf_price: this.state.product_rf_price,
        product_price: this.state.product_price,
      });

      if (res.require) {
        Swal.fire("อัพเดตข้อมูลสำเร็จ !", "", "success");
        this.props.history.push("/settinganother/product/product");
      } else {
        Swal.fire("เกิดข้อผิดพลาด !", "", "error");
      }
    }
  }
  _checkSubmit() {
    if (
      this.state.product_qty === "piece" &&
      this.state.product_package_qty === ""
    ) {
      this.setState({
        product_package_qty: 1,
      });
    }

    if (this.state.product_name === "") {
      Swal.fire({
        title: "กรุณาระบุชื่อสินค้า !",
        text: "Please Enter name",
        icon: "warning",
      });
      return false;
    } else if (this.state.product_group_code === "") {
      Swal.fire({
        title: "กรุณาระบุกลุ่มสินค้า !",
        text: "Please Enter Group Name",
        icon: "warning",
      });
      return false;
    } else if (this.state.product_type_code === "") {
      Swal.fire({
        title: "กรุณาระบุประเภทสินค้า !",
        text: "Please Enter Type Name",
        icon: "warning",
      });
      return false;
    } else if (this.state.product_brand_code === "") {
      Swal.fire({
        title: "กรุณาระบุยี่ห้อสินค้า !",
        text: "Please Enter Brand Name",
        icon: "warning",
      });
      return false;
    } else if (this.state.product_issue_type === "") {
      Swal.fire({
        title: "กรุณาระบุประเภทการเบิก !",
        text: "Please Enter Issue Type",
        icon: "warning",
      });
      return false;
    } else if (this.state.product_unit === "") {
      Swal.fire({
        title: "กรุณาระบุหน่วยต่อการเติมและการเบิก !",
        text: "Please Enter Unit Product",
        icon: "warning",
      });
      return false;
    } else if (this.state.product_min_qty === "") {
      Swal.fire({
        title: "กรุณาระบุMin2 !",
        text: "Please Enter Product Minimum",
        icon: "warning",
      });
      return false;
    } else if (this.state.product_safety_qty === "") {
      Swal.fire({
        title: "กรุณาระบุMin1 !",
        text: "Please Enter Point Of Purchase",
        icon: "warning",
      });
      return false;
    } else if (this.state.product_max_qty === "") {
      Swal.fire({
        title: "กรุณาระบุMax !",
        text: "Please Enter Product Maximum",
        icon: "warning",
      });
      return false;
    } else if (this.state.product_refill_unit === "") {
      Swal.fire({
        title: "กรุณาระบุจำนวนสินค้าต่อช่อง !",
        text: "Please Enter Unit Product Refill",
        icon: "warning",
      });
      return false;
    } else if (this.state.product_size === "") {
      Swal.fire({
        title: "กรุณาเลือกขนาดช่อง !",
        text: "Please Enter Product Size",
        icon: "warning",
      });
      return false;
    } else if (this.state.product_price === "") {
      Swal.fire({
        title: "กรุณาระบุราคา !",
        text: "Please Enter Product Price",
        icon: "warning",
      });
      return false;
    } else if (
      this.state.product_package_qty === "" &&
      this.state.product_qty === "box"
    ) {
      Swal.fire({
        title: "กรุณาระบุจำนวนต่อกล่อง !",
        text: "Please Enter Product Package",
        icon: "warning",
      });
      return false;
    } else {
      return true;
    }
  }

  _inputdata = (e) => {
    if (this.state.title_modal === "ชื่อสินค้า") {
      this.setState({
        product_name: e,
        show_modal: false,
      });
    } else if (this.state.title_modal === "รหัสสินค้า2") {
      this.setState({
        article_code: e,
        show_modal: false,
      });
    } else if (this.state.title_modal === "รหัสสินค้า3") {
      this.setState({
        internal_code: e,
        show_modal: false,
      });
    } else if (this.state.title_modal === "จำนวนต่อกล่อง") {
      this.setState({
        product_package_qty: e,
        show_modal: false,
      });
    } else if (this.state.title_modal === "product_barcode") {
      this.setState({
        product_barcode: e,
        show_modal: false,
      });
    } else if (this.state.title_modal === "จำนวนสินค้าต่อช่อง") {
      this.setState({
        product_refill_unit: e,
        show_modal: false,
      });
    } else if (this.state.title_modal === "product_issue_type") {
      this.setState({
        product_issue_type: e,
        show_modal: false,
      });
    } else if (this.state.title_modal === "product_qty") {
      this.setState({
        product_qty: e,
        show_modal: false,
      });
    } else if (this.state.title_modal === "product_issue_unit") {
      this.setState({
        product_issue_unit: e,
        show_modal: false,
      });
    } else if (this.state.title_modal === "Min2") {
      this.setState({
        product_min_qty: e,
        show_modal: false,
      });
    } else if (this.state.title_modal === "Max") {
      this.setState({
        product_max_qty: e,
        show_modal: false,
      });
    } else if (this.state.title_modal === "Min1") {
      this.setState({
        product_safety_qty: e,
        show_modal: false,
      });
    } else if (this.state.title_modal === "ราคา") {
      this.setState({
        product_price: e,
        show_modal: false,
      });
    } else if (this.state.title_modal === "ราคา RF") {
      this.setState({
        product_rf_price: e,
        show_modal: false,
      });
    }
  };
  _display() {
    const product_group_option = [
      {
        value: "",
        label: "- เลือกกลุ่ม -",
      },
      ...this.state.product_group.map((item) => ({
        value: item.product_group_code,
        label: item.product_group_name,
      })),
    ];
    const product_issue_type_option = [
      {
        value: "",
        label: "- เลือกประเภทการเบิก -",
      },
      {
        value: "Full",
        label: "เบิกแบบเต็มจำนวน",
      },
      {
        value: "Piecemeal",
        label: "เบิกแบบกำหนดจำนวนต่อการเบิก",
      },
      {
        value: "Setpiece",
        label: "เบิกแบบระบุจำนวน",
      },
    ];
    const product_type_option = [
      {
        value: "",
        label: "- เลือกประเภทสินค้า -",
      },
      ...this.state.product_type.map((item) => ({
        value: item.product_type_code,
        label: item.product_type_name,
      })),
    ];
    const product_brand_option = [
      {
        value: "",
        label: "- เลือกแบนด์ -",
      },
      ...this.state.product_brand.map((item) => ({
        value: item.product_brand_code,
        label: item.product_brand_name,
      })),
    ];

    const stock_layout_option = [
      {
        value: "",
        label: "- เลือกขนาดช่อง -",
      },
      ...this.state.stock_layout.map((item) => ({
        value: item.stock_layout_option + "," + item.stock_type,

        label:
          item.stock_layout_option +
          "," +
          (item.stock_type == "Headland" ? "แหลม" : "ยาว"),
      })),
    ];
    const product_unit = [
      {
        value: "",
        label: "- เลือกหน่วย -",
      },
      {
        value: "box",
        label: "กล่อง",
      },
      {
        value: "piece",
        label: "ชิ้น",
      },
    ];
    const select_value = [
      {
        value: "1",
        label: "Yes",
      },
      {
        value: "0",
        label: "No",
      },
    ];

    const product_type = [
      {
        value: "",
        label: "- เลือกประเภทสินค้าในการเบิก - ",
      },
      {
        value: "Consumable",
        label: "สิ้นเปลือง",
      },
      {
        value: "Loan",
        label: "ยืม",
      },
    ];
    const product_qty = [
      {
        value: "",
        label: "- เลือกหน่วย -",
      },
      {
        value: "box",
        label: "กล่อง",
      },
      {
        value: "piece",
        label: "ชิ้น",
      },
    ];
    if (this.state.display == "") {
      return (
        <>
          <Loading show={this.state.loading} />
          <Form onSubmit={(event) => this._handleSubmit(event)}>
            <Card>
              <CardHeader>
                <Row>
                  <Col>
                    {" "}
                    <Link to="/settinganother/product/product">
                      <Button
                        type="button"
                        style={{ height: "80px", width: "120px" }}
                      >
                        {" "}
                        <i className="fas fa-arrow-left"></i>
                      </Button>
                    </Link>
                  </Col>
                  <Col>
                    {" "}
                    <center>
                      {" "}
                      <lable>
                        <h1>แก้ไขสินค้า </h1>
                      </lable>
                    </center>
                  </Col>
                  <Col></Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md={8}>
                    <Row>
                      <Col md={3}>
                        <label>
                          รหัสสินค้า{" "}
                          <font color="#F00">
                            <b>*</b>
                          </font>
                        </label>
                        <Input
                          type="text"
                          value={this.state.product_code}
                          onChange={(e) =>
                            this.setState({ product_code: e.target.value })
                          }
                          readOnly
                          placeholder="รหัสสินค้า"
                        />
                      </Col>
                      <Col md={3}>
                        <FormGroup>
                          <label>
                            รหัสสินค้า2{" "}
                            <font color="#F00">{/* <b>*</b> */}</font>
                          </label>
                          <div className="input-group-append">
                            <Input
                              type="text"
                              placeholder="รหัสสินค้า2"
                              value={this.state.article_code}
                              onChange={(e) =>
                                this.setState({ article_code: e.target.value })
                              }
                            />
                          </div>
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup>
                          <label>
                            รหัสสินค้า3{" "}
                            <font color="#F00">{/* <b>*</b> */}</font>
                          </label>
                          <div className="input-group-append">
                            <Input
                              type="text"
                              placeholder="รหัสสินค้า3"
                              value={this.state.internal_code}
                              onChange={(e) =>
                                this.setState({ internal_code: e.target.value })
                              }
                            />
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={3}>
                        <label>
                          barcode <font color="#F00">{/* <b>*</b> */}</font>
                        </label>{" "}
                        <FormGroup>
                          <InputGroupAddon addonType="prepend">
                            {" "}
                            <Input
                              type="text"
                              placeholder="บาร์โค้ด"
                              value={this.state.product_barcode}
                              onChange={(e) =>
                                this.setState({
                                  product_barcode: e.target.value,
                                })
                              }
                            />{" "}
                            <Button
                              onClick={() => {
                                this.setState({
                                  product_barcode: this.state.product_code,
                                });
                              }}
                            >
                              สร้างบาร์โค้ดอัตโนมัติ
                            </Button>{" "}
                          </InputGroupAddon>{" "}
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup>
                          <label>
                            ชื่อสินค้า{" "}
                            <font color="#F00">
                              <b>*</b>
                            </font>
                          </label>
                          <div className="input-group-append">
                            <Input
                              type="text"
                              placeholder="ชื่อสินค้า"
                              value={this.state.product_name}
                              onChange={(e) =>
                                this.setState({ product_name: e.target.value })
                              }
                            />
                          </div>
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <label>
                          ขนาดช่อง{" "}
                          <font color="#F00">
                            <b>*</b>
                          </font>
                        </label>
                        <Select
                          options={stock_layout_option}
                          value={this.state.product_size}
                          onChange={(e) => {
                            this.setState({ product_size: e });
                          }}
                        />
                      </Col>
                    </Row>{" "}
                    <Row>
                      <Col md={3}>
                        <label>
                          กลุ่มสินค้า{" "}
                          <font color="#F00">
                            <b>*</b>
                          </font>
                        </label>
                        <Select
                          options={product_group_option}
                          value={this.state.product_group_code}
                          onChange={(e) => {
                            this.setState({ product_group_code: e });
                          }}
                        />
                      </Col>
                      <Col md={3}>
                        <label>
                          ประเภทสินค้า{" "}
                          <font color="#F00">
                            <b>*</b>
                          </font>
                        </label>
                        <Select
                          options={product_type_option}
                          value={this.state.product_type_code}
                          onChange={(e) => {
                            this.setState({ product_type_code: e });
                          }}
                        />
                      </Col>
                      <Col md={3}>
                        <label>
                          แบนด์สินค้า{" "}
                          <font color="#F00">
                            <b>*</b>
                          </font>
                        </label>
                        <Select
                          options={product_brand_option}
                          value={this.state.product_brand_code}
                          onChange={(e) => {
                            this.setState({ product_brand_code: e });
                          }}
                        />
                      </Col>
                    </Row>
                    <br></br>
                    <Row>
                      <Col md={3}>
                        {" "}
                        <FormGroup>
                          <label>
                            Max{" "}
                            <font color="#F00">
                              <b>*</b>
                            </font>
                          </label>
                          <div className="input-group-append">
                            <Input
                              type="text"
                              className="float text-right"
                              placeholder="Max"
                              value={this.state.product_max_qty}
                              onChange={(e) =>
                                this.setState({
                                  product_max_qty: e.target.value,
                                })
                              }
                            />
                          </div>
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        {" "}
                        <FormGroup>
                          <label>
                            Min1{" "}
                            <font color="#F00">
                              <b>*</b>
                            </font>
                          </label>
                          <div className="input-group-append">
                            <Input
                              type="text"
                              className="float text-right"
                              placeholder="Min1"
                              value={this.state.product_safety_qty}
                              onChange={(e) =>
                                this.setState({
                                  product_safety_qty: e.target.value,
                                })
                              }
                            />
                          </div>
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        {" "}
                        <FormGroup>
                          <label>
                            Min2{" "}
                            <font color="#F00">
                              <b>*</b>
                            </font>
                          </label>
                          <div className="input-group-append">
                            <Input
                              type="text"
                              className="float text-right"
                              placeholder="Min2"
                              value={this.state.product_min_qty}
                              onChange={(e) =>
                                this.setState({
                                  product_min_qty: e.target.value,
                                })
                              }
                            />
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      {" "}
                      <Col>
                        <label>
                          จำนวนสินค้าต่อช่อง{" "}
                          <font color="#F00">
                            <b>*</b>
                          </font>
                        </label>
                        <div className="input-group-append">
                          <Input
                            type="text"
                            className="float text-right"
                            placeholder="	จำนวนสินค้าต่อช่อง"
                            value={this.state.product_refill_unit}
                            onChange={(e) =>
                              this.setState({
                                product_refill_unit: e.target.value,
                              })
                            }
                          />
                        </div>
                      </Col>{" "}
                      <Col>
                        <label>
                          หน่วยต่อการเติมและการเบิก{" "}
                          <font color="#F00">
                            <b>*</b>
                          </font>
                        </label>
                        <Select
                          options={product_qty}
                          value={this.state.product_qty}
                          onChange={(e) => {
                            this.setState({ product_qty: e });
                          }}
                        />
                      </Col>
                      {this.state.product_qty === "box" ? (
                        <Col md={3}>
                          <FormGroup>
                            <label>
                              จำนวนต่อกล่อง{" "}
                              <font color="#F00">
                                <b>*</b>
                              </font>
                            </label>
                            <div className="input-group-append">
                              <Input
                                type="text"
                                className="float text-right"
                                placeholder="จำนวนต่อกล่อง"
                                value={this.state.product_package_qty}
                                onChange={(e) =>
                                  this.setState({
                                    product_package_qty: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </FormGroup>
                        </Col>
                      ) : (
                        <Col md={3} />
                      )}
                      <Col> </Col>
                    </Row>
                    <Row>
                      <Col md={3}>
                        {" "}
                        <label>
                          ประเภทสินค้าในการเบิก{" "}
                          <font color="#F00">
                            <b>*</b>
                          </font>
                        </label>{" "}
                        <Select
                          options={product_type}
                          value={this.state.product_type_consumable}
                          onChange={(e) => {
                            this.setState({ product_type_consumable: e });
                          }}
                        />{" "}
                      </Col>
                      <Col md={3}>
                        <label>
                          ประเภทการเบิก{" "}
                          <font color="#F00">
                            <b>*</b>
                          </font>
                        </label>
                        <Select
                          options={product_issue_type_option}
                          value={this.state.product_issue_type}
                          onChange={(e) => {
                            this.setState({ product_issue_type: e });
                          }}
                        />
                      </Col>{" "}
                      {this.state.product_issue_type === "Piecemeal" ? (
                        <>
                          <Col>
                            <label>
                              จำนวนต่อการเบิก{" "}
                              <font color="#F00">
                                <b>*</b>
                              </font>
                            </label>
                            <Input
                              type="text"
                              className="float text-right"
                              placeholder="	จำนวนต่อการเบิก"
                              value={this.state.product_issue_unit}
                              onChange={(e) =>
                                this.setState({
                                  product_issue_unit: e.target.value,
                                })
                              }
                            />
                          </Col>{" "}
                          <Col></Col>
                          <Col></Col>
                        </>
                      ) : (
                        <Col md={3}></Col>
                      )}
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <label>
                            ราคา{" "}
                            <font color="#F00">
                              <b>*</b>
                            </font>
                          </label>
                          <div className="input-group-append">
                            <Input
                              type="text"
                              className="float text-right"
                              placeholder="ราคา"
                              value={this.state.product_price}
                              onChange={(e) =>
                                this.setState({
                                  product_price: e.target.value,
                                })
                              }
                            />
                            <div className="input-group-append"></div>
                          </div>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <label>
                            ราคา RF{" "}
                            <font color="#F00">
                              <b>*</b>
                            </font>
                          </label>
                          <div className="input-group-append">
                            <Input
                              type="text"
                              className="float text-right"
                              placeholder="ราคา RF"
                              value={this.state.product_rf_price}
                              onChange={(e) =>
                                this.setState({
                                  product_rf_price: e.target.value,
                                })
                              }
                            />
                          </div>
                        </FormGroup>
                      </Col>
                      <Col></Col>
                    </Row>
                  </Col>
                  <Col md={3}>
                    <Row>
                      <Col md={12}>
                        <center>
                          <label>รูปสินค้า </label>
                          <FormGroup className="text-center">
                            <img
                              style={{ maxWidth: 280, maxHeight: 280 }}
                              src={this.state.product_image.src}
                              alt="product_image"
                            />
                          </FormGroup>
                        </center>
                      </Col>
                      <Col>
                        {" "}
                        <center>
                          <FormGroup className="text-center">
                            <Input
                              type="file"
                              accept="image/png, image/jpeg"
                              onChange={(e) =>
                                this._handleImageChange("product_image", e)
                              }
                            />
                          </FormGroup>
                        </center>
                      </Col>
                    </Row>
                    <br></br>
                    <Row md={12}>
                      <Col>
                        <FormGroup>
                          {" "}
                          <label>
                            จ่ายที่หลัง <font color="#F00"></font>
                          </label>
                          <div className="input-group-append">
                            {" "}
                            <Radio.Group
                              options={select_value}
                              optionType="button"
                              buttonStyle="solid"
                              value={`${this.state.product_consignment}`}
                              onChange={(e) => {
                                this.setState({
                                  product_consignment: e.target.value,
                                });
                              }}
                            />
                          </div>
                        </FormGroup>
                      </Col>{" "}
                      {this.state.product_type_consumable === "Consumable" ? (
                        <>
                          {" "}
                          <Col>
                            <FormGroup>
                              {" "}
                              <label>
                                ระบบคืนซาก <font color="#F00"></font>
                              </label>
                              <div className="input-group-append">
                                {" "}
                                <Radio.Group
                                  options={select_value}
                                  optionType="button"
                                  buttonStyle="solid"
                                  value={`${this.state.product_circulation}`}
                                  onChange={(e) => {
                                    this.setState({
                                      product_circulation: e.target.value,
                                    });
                                  }}
                                />
                              </div>
                            </FormGroup>
                          </Col>
                        </>
                      ) : (
                        <></>
                      )}
                    </Row>
                    <Row>
                      {this.state.product_type_consumable === "Consumable" ? (
                        <>
                          {" "}
                          {/* <Col>
                            <Button
                              className="btn btn-info"
                              style={{ width: "10vh", height: "10vh" }}
                              onClick={() => {
                                this.setState({ display: "New" });
                              }}
                            >
                              New
                              <Label></Label>
                            </Button>
                          </Col>{" "}
                          <Col>
                            <Button
                              className="btn btn-info"
                              style={{ width: "10vh", height: "10vh" }}
                              onClick={() => {
                                this.setState({ display: "RF" });
                              }}
                            >
                              RF
                              <Label></Label>
                            </Button>
                          </Col>{" "}
                          <Col></Col> */}
                        </>
                      ) : (
                        <></>
                      )}
                      {this.state.product_type_consumable === "Loan" ? (
                        <>
                          {/* {" "}
                          <Col>
                            <Button
                              className="btn btn-info"
                              style={{ width: "10vh", height: "10vh" }}
                              onClick={() => {
                                this.setState({ display: "Loan" });
                              }}
                            >
                              Loan
                            </Button>
                          </Col>
                          <Col></Col>
                          <Col></Col> */}
                        </>
                      ) : (
                        <></>
                      )}

                      {/* <Col>
                        <Button
                          className="btn btn-info"
                          style={{ width: "10vh", height: "10vh" }}
                          onClick={() => {
                            this.setState({ display: "Old" });
                          }}
                        >
                          Old
                        </Button>
                      </Col> */}
                    </Row>
                  </Col>
                </Row>{" "}
                <br></br>
                <Row>
                  <Col md={12}>
                    {/* <ManageProductSupplier
                      onRefresh={({
                        product_supplier_validate,
                        product_suppliers,
                      }) =>
                        this.setState({
                          product_supplier_validate,
                          product_suppliers,
                        })
                      }
                      product_code={this.state.product_code}
                    /> */}
                  </Col>
                </Row>
              </CardBody>{" "}
              <CardFooter className="text-right">
                <Button
                  type="submit"
                  style={{ height: "80px", width: "120px" }}
                  color="success"
                >
                  บันทึก
                </Button>
                <Button
                  type="reset"
                  style={{ height: "80px", width: "120px" }}
                  color="danger"
                >
                  รีเซ็ต
                </Button>
              </CardFooter>
            </Card>
          </Form>
        </>
      );
    } else if (this.state.display == "New") {
      return (
        <Slotlayout
          displayclose={() => this.setState({ display: "" })}
          status={"New"}
          product_code={this.state.product_code}
        />
      );
    } else if (this.state.display == "RF") {
      return (
        <Slotlayout
          displayclose={() => this.setState({ display: "" })}
          status={"RF"}
          product_code={this.state.product_code}
        />
      );
    } else if (this.state.display == "Loan") {
      return (
        <Slotlayout
          displayclose={() => this.setState({ display: "" })}
          status={"Loan"}
          product_code={this.state.product_code}
        />
      );
    } else if (this.state.display == "Old") {
      return (
        <Slotlayout
          displayclose={() => this.setState({ display: "" })}
          status={"Old"}
          product_code={this.state.product_code}
        />
      );
    }
  }
  render() {
    return <div>{this._display()}</div>;
  }
}

export default Update;
