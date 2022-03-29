import React, { Component } from "react";
import {
  Col,
  Row,
  Card,
  Input,
  CardBody,
  CardHeader,
  Button,
  Table,
  InputGroupAddon,
  InputGroup,
  CardFooter,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Loading, Select } from "../../../../component/revel-strap";
import Swal from "sweetalert2";
import GLOBAL from "../../../../GLOBAL";
import UserGroupProductModel from "../../../../models/UserGroupProductModel";
import ProductModel from "../../../../models/ProductModel";
import Modalproduct from "./component/modal-product";
import UserGroupModel from "../../../../models/UserGroupModel";

const usergroupproduct_model = new UserGroupProductModel();
const product_model = new ProductModel();
const user_group_model = new UserGroupModel();

class Productbygroup extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      user_group_code: "",
      group_products: [],
      user_group_name: "",
      modal: false,
      modaledit: false,
      keyword: "",
      index: 0,
      productby_group: [],
      check: 0,
      group_name: "",
    };
  }

  componentDidMount() {
    const { code } = this.props.match.params;

    this._Getdata(code);
    this.setState({
      loading: true,
      user_group_code: code,
    });
  }
  async _Getdata(code) {
    let { productby_group } = this.state;
    let products = await usergroupproduct_model.getUserGroupProductByGroup({
      user_group_code: code,
    });
    const user_group = await user_group_model.getUserGroupByCode({
      user_group_code: code,
    });

    let { check } = this.state;
    let stack = 0;
    let count = 0;
    for (let index = 0; index < products.data?.length; index++) {
      const element = products.data[index];

      count++;
      if (count == 4) {
        const res = await product_model.getProductByCode({
          product_code: element.product_code,
        });

        productby_group.push({
          0: products.data[check + 0],
          1: products.data[check + 1],
          2: products.data[check + 2],
          3: products.data[check + 3],
          user_group_code: code,
          product_code: res.data[stack].product_code,
          product_image: res.data[stack].product_image,
          product_name: res.data[stack].product_name,
        });

        check += 4;
        stack++;
        count = 0;
      } else {
        stack = 0;
      }
    }

    this.setState({
      productby_group: productby_group,
      check: check,
      group_name: user_group.data[0].user_group_name,
      loading: false,
    });
  }
  _filterData(data) {
    this.setState(
      {
        productby_group: data,
      },
      () => {}
    );
  }
  _handleData(key, text, idx, idx_of_type) {
    let { productby_group } = this.state;
    productby_group[idx][idx_of_type][`${key}`] = text;

    this.setState(
      {
        productby_group: productby_group,
      },
      () => {}
    );
  }
  _removeRow(data, idx) {
    // Swal.fire({
    //   title: "Are you sure?",
    //   text: "You won't be able to revert this!",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Yes, delete it!",
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     Swal.fire({
    //       title: "Deleted",
    //       text: "Your file has been deleted.!",
    //       icon: "success",
    //       timer: 1000,
    //     });

    //   }
    // });
    let { productby_group } = this.state;
    productby_group.splice(idx, 1);

    this.setState(
      {
        productby_group: productby_group,
      },
      () => {}
    );
  }
  async _handleInsert() {
    Swal.fire({
      title: "คุณต้องการบันทึก?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่!",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        this._Insert();
        this.setState({
          loading: true,
        });
      }
    });
  }
  async _Insert() {
    const { productby_group } = this.state;

    if (productby_group[0]?.user_group_code === undefined) {
      const res = await usergroupproduct_model.insertUserGroupProduct(
        this.state.user_group_code
      );

      if (res) {
        Swal.fire({
          icon: "success",
          title: "บันทึกสำเร็จ",
          showConfirmButton: false,
          timer: 1000,
        });
        this.props.history.push(`/settinganother/user/userby-group`);
        this.setState({
          loading: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "บันทึกไม่สำเร็จ",
          showConfirmButton: false,
          timer: 1000,
        });
        this.setState({
          loading: false,
        });
      }
    } else {
      const res = await usergroupproduct_model.insertUserGroupProduct(
        productby_group,
        this.state.user_group_code
      );

      if (res) {
        Swal.fire({
          icon: "success",
          title: "บันทึกสำเร็จ",
          showConfirmButton: false,
          timer: 1000,
        });
        this.props.history.push(`/settinganother/user/userby-group`);
        this.setState({
          loading: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "บันทึกไม่สำเร็จ",
          showConfirmButton: false,
          timer: 1000,
        });
        this.setState({
          loading: false,
        });
      }
    }
  }
  render() {
    let { productby_group } = this.state;
    const time_type_options = [
      { label: "เลือก", value: "" },
      { label: "เดือน", value: "Month" },
      { label: "สัปดาห์", value: "Week" },
      { label: "วัน", value: "Day" },
    ];
    return (
      <div>
        <Loading show={this.state.loading} />
        <Card>
          <CardHeader>
            <Row>
              <Col>
                <Link to={`/settinganother/user/userby-group`}>
                  <Button
                    type="button"
                    style={{ height: "80px", width: "120px" }}
                  >
                    {" "}
                    <i className="fas fa-arrow-left"></i>
                  </Button>
                </Link>
              </Col>
              <Col style={{ textAlign: "center" }}>
                {" "}
                <label>
                  <h3>{this.state.group_name}</h3>
                </label>
              </Col>
              <Col style={{ textAlign: "right" }}>
                {" "}
                <Button
                  color="success"
                  style={{ height: "80px", width: "120px" }}
                  onClick={() => {
                    this.setState({
                      modal: true,
                    });
                  }}
                >
                  เพิ่ม
                </Button>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <table className="group">
              <thead>
                <tr>
                  <th style={{ width: "8px" }}>ลำดับ</th>
                  <th style={{ width: "64px" }}>รหัสสินค้า</th>
                  <th style={{ width: "64px" }}>ชื่อสินค้า</th>
                  <th style={{ width: "64px" }}>ชื่อสินค้า</th>
                  <th style={{ width: "64px" }}>ประเภท</th>
                  <th style={{ width: "64px" }}>จำกัด</th>
                  <th style={{ width: "64px" }}>ประเภทเวลา</th>
                  <th style={{ width: "64px" }}>จำนวน</th>
                  <th style={{ width: "64px" }}></th>
                </tr>
              </thead>
              <tbody>
                {productby_group.map((data, idx) => {
                  return (
                    <>
                      <tr>
                        <td>{idx + 1}</td>
                        <td>{data.product_code}</td>
                        <td>{data.product_name}</td>
                        <td>
                          {" "}
                          <img
                            width={"60%"}
                            height={"40%"}
                            src={`${GLOBAL.BASE_SERVER.URL_IMG}${
                              data.product_image === "" ||
                              data.product_image === undefined
                                ? "default.png"
                                : data.product_image
                            }`}
                            alt="product_image"
                            style={{
                              border: "1px solid #ddd",
                              borderRadius: " 4px",
                              padding: "5px",
                            }}
                          />
                        </td>
                        <td>
                          <h4>
                            <label>{data[0].stock_product_type}</label>
                          </h4>
                          <h4>
                            <label>{data[1].stock_product_type}</label>
                          </h4>
                          <h4>
                            <label>{data[2].stock_product_type}</label>
                          </h4>
                          <h4>
                            <label>{data[3].stock_product_type}</label>
                          </h4>
                        </td>
                        <td>
                          {" "}
                          <h4>
                            <input
                              style={{ width: 30, height: 30 }}
                              checked={
                                data[0].withdraw_type == 1 ? true : false
                              }
                              type="checkbox"
                              onClick={(e) => {
                                this._handleData(
                                  "withdraw_type",
                                  e.target.checked,
                                  idx,
                                  0
                                );
                              }}
                            />
                          </h4>
                          <h4>
                            <input
                              style={{ width: 30, height: 30 }}
                              checked={
                                data[1].withdraw_type == 1 ? true : false
                              }
                              type="checkbox"
                              onClick={(e) => {
                                this._handleData(
                                  "withdraw_type",
                                  e.target.checked,
                                  idx,
                                  1
                                );
                              }}
                            />
                          </h4>
                          <h4>
                            <input
                              style={{ width: 30, height: 30 }}
                              checked={
                                data[2].withdraw_type == 1 ? true : false
                              }
                              type="checkbox"
                              onClick={(e) => {
                                this._handleData(
                                  "withdraw_type",
                                  e.target.checked,
                                  idx,
                                  2
                                );
                              }}
                            />
                          </h4>
                          <h4>
                            <input
                              style={{ width: 30, height: 30 }}
                              checked={
                                data[3].withdraw_type == 1 ? true : false
                              }
                              type="checkbox"
                              onClick={(e) => {
                                this._handleData(
                                  "withdraw_type",
                                  e.target.checked,
                                  idx,
                                  3
                                );
                              }}
                            />
                          </h4>
                        </td>
                        <td>
                          {" "}
                          <h4>
                            {" "}
                            <Select
                              options={time_type_options}
                              value={data[0].withdraw_time_type}
                              onChange={(e) => {
                                this._handleData(
                                  "withdraw_time_type",
                                  e,
                                  idx,
                                  0
                                );
                              }}
                              disabled={
                                data[0].withdraw_type == 1 ? false : true
                              }
                            />{" "}
                          </h4>
                          <h4>
                            {" "}
                            <Select
                              options={time_type_options}
                              value={data[1].withdraw_time_type}
                              onChange={(e) => {
                                this._handleData(
                                  "withdraw_time_type",
                                  e,
                                  idx,
                                  1
                                );
                              }}
                              disabled={
                                data[1].withdraw_type == 1 ? false : true
                              }
                            />{" "}
                          </h4>
                          <h4>
                            {" "}
                            <Select
                              options={time_type_options}
                              value={data[2].withdraw_time_type}
                              onChange={(e) => {
                                this._handleData(
                                  "withdraw_time_type",
                                  e,
                                  idx,
                                  2
                                );
                              }}
                              disabled={
                                data[2].withdraw_type == 1 ? false : true
                              }
                            />{" "}
                          </h4>
                          <h4>
                            {" "}
                            <Select
                              options={time_type_options}
                              value={data[3].withdraw_time_type}
                              onChange={(e) => {
                                this._handleData(
                                  "withdraw_time_type",
                                  e,
                                  idx,
                                  3
                                );
                              }}
                              disabled={
                                data[3].withdraw_type == 1 ? false : true
                              }
                            />{" "}
                          </h4>
                        </td>
                        <td>
                          {" "}
                          <h4>
                            {" "}
                            <InputGroup>
                              <Input
                                placeholder="จำนวน"
                                style={{ width: "64px" }}
                                disabled={
                                  data[0].withdraw_type == 1 ? false : true
                                }
                                value={data[0].withdraw_qty}
                                onChange={(e) => {
                                  this._handleData(
                                    "withdraw_qty",
                                    e.target.value,
                                    idx,
                                    0
                                  );
                                }}
                              />
                              <InputGroupAddon addonType="append">
                                ครั้ง
                              </InputGroupAddon>
                            </InputGroup>
                          </h4>
                          <h4>
                            {" "}
                            <InputGroup>
                              <Input
                                placeholder="จำนวน"
                                style={{ width: "64px" }}
                                disabled={
                                  data[1].withdraw_type == 1 ? false : true
                                }
                                value={data[1].withdraw_qty}
                                onChange={(e) => {
                                  this._handleData(
                                    "withdraw_qty",
                                    e.target.value,
                                    idx,
                                    1
                                  );
                                }}
                              />
                              <InputGroupAddon addonType="append">
                                ครั้ง
                              </InputGroupAddon>
                            </InputGroup>
                          </h4>
                          <h4>
                            {" "}
                            <InputGroup>
                              <Input
                                placeholder="จำนวน"
                                style={{ width: "64px" }}
                                disabled={
                                  data[2].withdraw_type == 1 ? false : true
                                }
                                value={data[2].withdraw_qty}
                                onChange={(e) => {
                                  this._handleData(
                                    "withdraw_qty",
                                    e.target.value,
                                    idx,
                                    2
                                  );
                                }}
                              />
                              <InputGroupAddon addonType="append">
                                ครั้ง
                              </InputGroupAddon>
                            </InputGroup>
                          </h4>
                          <h4>
                            <InputGroup>
                              <Input
                                placeholder="จำนวน"
                                style={{ width: "64px" }}
                                disabled={
                                  data[3].withdraw_type == 1 ? false : true
                                }
                                value={data[3].withdraw_qty}
                                onChange={(e) => {
                                  this._handleData(
                                    "withdraw_qty",
                                    e.target.value,
                                    idx,
                                    3
                                  );
                                }}
                              />
                              <InputGroupAddon addonType="append">
                                ครั้ง
                              </InputGroupAddon>
                            </InputGroup>
                          </h4>
                        </td>{" "}
                        <td>
                          <button
                            style={{ width: "60x" }}
                            className="btn btn-danger"
                            onClick={() => {
                              this._removeRow(data, idx);
                            }}
                          >
                            ลบ
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
          <CardFooter style={{ textAlign: "end" }}>
            <Button
              color="success"
              style={{ width: "120px", height: "80px" }}
              onClick={() => {
                this._handleInsert();
              }}
            >
              บันทึก
            </Button>
          </CardFooter>
        </Card>
        <Modalproduct
          show={this.state.modal}
          user_group_code={this.state.user_group_code}
          productby_group={this.state.productby_group}
          _addproduct={(e) => {
            this._filterData(e);
          }}
          _handleClose={() => {
            this.setState({
              modal: false,
            });
          }}
          _onSave={() => {
            this._handleSubmit();
          }}
        />
      </div>
    );
  }
}

export default Productbygroup;
