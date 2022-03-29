import React, { Component } from "react";

import { Card, CardBody, Row, Col, Button, CardHeader } from "reactstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import { Loading, Table, Select } from "../../../component/revel-strap";
import StockModel from "../../../models/StockModel";
import ProductModel from "../../../models/ProductModel";
import StockLayoutModel from "../../../models/StockLayoutModel";
const stock_model = new StockModel();
const Product_Model = new ProductModel();
const stock_layout_model = new StockLayoutModel();
export default class update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      row: [],
      col: [],
      table: [],
      stock_code: "SC001",
      checkproduct: true,
      loading: true,
      stock_xs: [],
      stocks: [],
      stock_ys: [],
      stock_layout_code: "",
      product_code: "",
      stock_status: "",
      display: "",
      slot_reserves: [],
      restore_slot: [],
      stock: [],
      stock_type: [],
      product: [],
    };
  }
  componentDidMount() {
    const code = this.props.match.params.code.split("+");
    this.setState({
      product_code: code[0],
      stock_status: code[1],
    });

    this._fetchData();
  }
  async _fetchData() {
    const stock = await stock_model.getStock({});
    this._getStockLayout(this.state.stock_code);
    const product = await Product_Model.getProductByCode({
      product_code: this.state.product_code,
    });
    this.setState({
      stock_type: stock.data,
      product: product.data[0],
    });
  }
  _getStockLayout(stock_code) {
    this.setState(
      {
        loading: true,
      },
      async () => {
        const stock = await stock_model.getStockByCode({
          stock_code: this.state.stock_code,
        });

        const stock_layouts = await stock_layout_model.getStockLayout({
          stock_code: stock_code,
        });

        let { stock_xs } = this.state;

        const stock_ys = [];

        for (let stock_layout of stock_layouts.data) {
          let stock_y = stock_ys.find(
            (val) => val.stock_y === stock_layout.stock_y
          );
          if (stock_y) {
            stock_y.stock_layouts.push(stock_layout);
          } else {
            stock_ys.push({
              stock_y: stock_layout.stock_y,
              stock_layouts: [stock_layout],
            });
          }
        }

        stock_ys.find((stock_ys, idx) => {
          if (idx >= 0) {
            if (stock_xs.length >= stock_ys.stock_layouts.length) {
            } else {
              stock_xs = stock_ys.stock_layouts;
            }
          } else {
            stock_xs = stock_ys.stock_layouts;
          }
        });

        stock_ys.forEach((stock_ys, idx) => {
          stock_ys.stock_layouts.reverse();
        });

        this.setState(
          {
            loading: false,
            stock_code,
            stock_ys,
            stock_xs,
            stock: stock.data[0],
          },
          () => {}
        );
      }
    );
  }
  async _addReserves() {
    const { slot_reserves, restore_slot } = this.state;
    let update_slot = [...slot_reserves, ...restore_slot];

    const res = await stock_layout_model.updateStockLayout({ update_slot });
    if (res.require) {
      Swal.fire("อัพเดตข้อมูลสำเร็จ !", "", "success");
    } else {
      Swal.fire("เกิดข้อผิดพลาด !", "", "error");
    }
  }
  _reserveSlot = (
    data,
    stock_y_idx,
    stock_layout_idx,
    stock_layout_code,
    stock_layout_qty,
    stock_use_input
  ) => {
    let { slot_reserves, stock_status, product_code, restore_slot } =
      this.state;
    let { stock_use, stock_x, stock_y, stock_code } = data;

    if (stock_use_input == 2 && stock_layout_qty == 0) {
      stock_use = "0";
      if (
        restore_slot.find(
          (v) =>
            v.stock_y_idx === stock_y_idx &&
            v.stock_layout_idx === stock_layout_idx
        ) !== undefined
      ) {
        restore_slot = restore_slot.filter(
          (v) =>
            v.stock_y_idx !== stock_y_idx ||
            v.stock_layout_idx !== stock_layout_idx
        );
      } else {
        restore_slot.push({
          stock_layout_code,
          stock_y_idx,
          stock_layout_idx,
          stock_status: "",
          product_code: "",
          stock_use,
          stock_x,
          stock_y,
          stock_code,
        });
      }

      this.setState({ restore_slot });
    }

    if (stock_use_input == 0) {
      stock_use = "2";
      if (
        slot_reserves.find(
          (v) =>
            v.stock_y_idx === stock_y_idx &&
            v.stock_layout_idx === stock_layout_idx
        ) !== undefined
      ) {
        slot_reserves = slot_reserves.filter(
          (v) =>
            v.stock_y_idx !== stock_y_idx ||
            v.stock_layout_idx !== stock_layout_idx
        );
      } else {
        slot_reserves.push({
          stock_layout_code,
          stock_y_idx,
          stock_layout_idx,
          stock_status,
          product_code,
          stock_use,
          stock_x,
          stock_y,
          stock_code,
        });
      }
      this.setState({ slot_reserves }, () => {});
    }
  };
  render() {
    const stock_options = [
      ...this.state.stock_type.map((item) => ({
        value: item.stock_code,
        label: item.stock_name,
      })),
    ];
    return (
      <div>
        {" "}
        <Card>
          <CardHeader>
            <Row>
              <Col>
                {" "}
                <Link to="/settinganother/location">
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
                <h1> จัดการตำแหน่งสินค้า</h1>
              </Col>
              <Col>
                <Button
                  type="button"
                  color="success"
                  style={{ height: "80px", width: "120px", float: "right" }}
                  onClick={() => {
                    this._addReserves();
                  }}
                >
                  บันทึก
                </Button>
              </Col>
            </Row>
          </CardHeader>
          <CardBody style={{ height: "auto", maxHeight: "100%" }}>
            {" "}
            <Row>
              <Col md={2}>
                {" "}
                <Select
                  options={stock_options}
                  value={this.state.stock_code}
                  onChange={(e) => {
                    this.setState({ stock_code: e }, () => {
                      this._fetchData();
                    });
                  }}
                />
              </Col>
              <Col>
                <label>
                  {" "}
                  <b>{this.state.product.product_name}</b>[{" "}
                  {this.state.stock_status}]
                </label>
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                {this.state.stock.stock_type === "Rotating" ? (
                  <>
                    <div className="overivew" cellpadding="0" cellspacing="0">
                      <table
                        style={{
                          height: "100vh",
                          maxHeight: "100%",
                          width: "100%",
                        }}
                      >
                        {this.state.stock_ys.map((stock_y, stock_y_idx) => {
                          return (
                            <tr key={stock_y + stock_y_idx}>
                              {stock_y_idx == 0 ? (
                                <>
                                  <td
                                    style={{
                                      writingMode: "vertical-lr",
                                      fontSize: "10px",
                                    }}
                                    rowSpan={this.state.stock_ys.length % 10}
                                  >
                                    {stock_y.stock_y}-
                                    {parseInt(stock_y.stock_y / 10)}1
                                  </td>
                                </>
                              ) : (stock_y_idx -
                                  (this.state.stock_ys.length % 10)) %
                                  10 ==
                                0 ? (
                                <td
                                  rowSpan={10}
                                  style={{
                                    writingMode: "vertical-lr",
                                    fontSize: "10px",
                                  }}
                                >
                                  {" "}
                                  {stock_y.stock_y}-
                                  {parseInt(stock_y.stock_y - 9)}
                                </td>
                              ) : null}
                              {stock_y.stock_layouts.map(
                                (stock_layout, stock_layout_idx) => {
                                  let is_reserve =
                                    this.state.slot_reserves.find(
                                      (slot_reserve) =>
                                        slot_reserve.stock_y_idx ===
                                          stock_y_idx &&
                                        slot_reserve.stock_layout_idx ===
                                          stock_layout_idx &&
                                        slot_reserve.stock_code ===
                                          this.state.stock_code
                                    );
                                  let item_style = [];
                                  let restore = this.state.restore_slot.find(
                                    (slot_reserve) =>
                                      slot_reserve.stock_y_idx ===
                                        stock_y_idx &&
                                      slot_reserve.stock_layout_idx ===
                                        stock_layout_idx &&
                                      slot_reserve.stock_code ===
                                        this.state.stock_code
                                  );

                                  if (stock_layout.stock_use === "1") {
                                    item_style = {
                                      background: "#FF0033",
                                    };
                                  } else if (
                                    stock_layout.stock_use === "2" &&
                                    stock_layout.stock_layout_qty == "0" &&
                                    !restore &&
                                    stock_layout.product_code != "" &&
                                    stock_layout.product_code != undefined &&
                                    stock_layout.product_code !=
                                      this.state.product_code
                                  ) {
                                    item_style = {
                                      background: "#AFA7A0",
                                    };
                                  } else if (
                                    stock_layout.stock_use === "2" &&
                                    !restore &&
                                    stock_layout.product_code !=
                                      this.state.product_code
                                  ) {
                                    item_style = {
                                      background: "#54585D",
                                    };
                                  } else if (is_reserve && !restore) {
                                    item_style = {
                                      background: "#94FA92",
                                    };
                                  } else if (restore?.product_code == "") {
                                    item_style = {
                                      background: "#FFFFFF",
                                    };
                                  } else if (
                                    stock_layout.product_code != undefined &&
                                    stock_layout.product_code ==
                                      this.state.product_code &&
                                    stock_layout.stock_layout_qty == "0"
                                  ) {
                                    item_style = {
                                      background: "#16BE14",
                                    };
                                  } else if (
                                    stock_layout.product_code ==
                                      this.state.product_code &&
                                    stock_layout.stock_layout_qty != "0"
                                  ) {
                                    item_style = {
                                      background: "#006130",
                                    };
                                  } else if (
                                    restore?.product_code !== "" &&
                                    restore?.product_code !== undefined
                                  ) {
                                    item_style = {
                                      background: "#16BE14",
                                    };
                                  } else {
                                    item_style = {
                                      background: "#FFFFFF",
                                    };
                                  }
                                  if (
                                    stock_y.stock_layouts.length <
                                      this.state.stock_xs.length &&
                                    parseInt(
                                      this.state.stock_xs.length %
                                        stock_y.stock_layouts.length
                                    ) == 0
                                  ) {
                                    return (
                                      <>
                                        <td
                                          key={"" + stock_layout_idx}
                                          style={item_style}
                                          colSpan={parseInt(
                                            this.state.stock_xs.length /
                                              stock_y.stock_layouts.length
                                          )}
                                          onClick={() => {
                                            if (
                                              stock_layout.product_code ===
                                                this.state.product_code ||
                                              stock_layout.product_code ==
                                                undefined
                                            ) {
                                              this._reserveSlot(
                                                stock_layout,
                                                stock_y_idx,
                                                stock_layout_idx,
                                                stock_layout.stock_layout_code,
                                                stock_layout.stock_layout_qty,
                                                stock_layout.stock_use
                                              );
                                            } else {
                                            }
                                          }}
                                        ></td>
                                      </>
                                    );
                                  } else {
                                    return (
                                      <>
                                        <td
                                          style={item_style}
                                          key={
                                            stock_layout +
                                            "+" +
                                            stock_layout_idx
                                          }
                                          onClick={() => {
                                            if (
                                              stock_layout.product_code ===
                                                this.state.product_code ||
                                              stock_layout.product_code ==
                                                undefined
                                            ) {
                                              this._reserveSlot(
                                                stock_layout,
                                                stock_y_idx,
                                                stock_layout_idx,
                                                stock_layout.stock_layout_code,
                                                stock_layout.stock_layout_qty,
                                                stock_layout.stock_use
                                              );
                                            } else {
                                            }
                                          }}
                                        ></td>
                                      </>
                                    );
                                  }
                                }
                              )}
                            </tr>
                          );
                        })}{" "}
                        <tr>
                          <td
                            style={{
                              fontSize: "10px",
                            }}
                          >
                            Y/X
                          </td>
                          {this.state.stock_xs.map((stock_xs, idx) => {
                            return (
                              <>
                                {idx == 0 ? (
                                  <>
                                    <td
                                      style={{
                                        fontSize: "10px",
                                      }}
                                      colSpan={10}
                                    >
                                      {idx + 1} - 10
                                    </td>
                                  </>
                                ) : (idx - (this.state.stock_xs.length % 10)) %
                                    10 ==
                                  0 ? (
                                  <td
                                    colSpan={10}
                                    style={{
                                      fontSize: "10px",
                                    }}
                                  >
                                    {idx < 61 ? (
                                      <>
                                        {" "}
                                        {idx - 1 + 10}-{idx - 2 + 20}
                                      </>
                                    ) : (
                                      <>
                                        {" "}
                                        {idx + 10 - 1}-{idx + 10}
                                      </>
                                    )}
                                  </td>
                                ) : null}
                              </>
                            );
                          })}
                        </tr>
                      </table>
                    </div>
                  </>
                ) : (
                  <>
                    <Row>
                      <Col></Col>
                      <Col>
                        <div style={{ width: "100%", textAlign: "center" }}>
                          <table className="locker">
                            {this.state.stock_ys.map(
                              (stock_y, stock_y_idx, arr) => {
                                return (
                                  <tr key={stock_y + stock_y_idx}>
                                    {stock_y.stock_layouts.map(
                                      (stock_layout, stock_layout_idx) => {
                                        let is_reserve =
                                          this.state.slot_reserves.find(
                                            (slot_reserve) =>
                                              slot_reserve.stock_y_idx ===
                                                stock_y_idx &&
                                              slot_reserve.stock_layout_idx ===
                                                stock_layout_idx &&
                                              slot_reserve.stock_code ===
                                                this.state.stock_code
                                          );
                                        let item_style = [];
                                        let restore =
                                          this.state.restore_slot.find(
                                            (slot_reserve) =>
                                              slot_reserve.stock_y_idx ===
                                                stock_y_idx &&
                                              slot_reserve.stock_layout_idx ===
                                                stock_layout_idx &&
                                              slot_reserve.stock_code ===
                                                this.state.stock_code
                                          );

                                        if (stock_layout.stock_use === "1") {
                                          item_style = {
                                            background: "#FF0033",
                                          };
                                        } else if (
                                          stock_layout.stock_use === "2" &&
                                          stock_layout.stock_layout_qty ==
                                            "0" &&
                                          !restore &&
                                          stock_layout.product_code != "" &&
                                          stock_layout.product_code !=
                                            undefined &&
                                          stock_layout.product_code !=
                                            this.state.product_code
                                        ) {
                                          item_style = {
                                            background: "#AFA7A0",
                                          };
                                        } else if (
                                          stock_layout.stock_use === "2" &&
                                          !restore &&
                                          stock_layout.product_code !=
                                            this.state.product_code
                                        ) {
                                          item_style = {
                                            background: "#54585D",
                                          };
                                        } else if (is_reserve && !restore) {
                                          item_style = {
                                            background: "#94FA92",
                                          };
                                        } else if (
                                          restore?.product_code == ""
                                        ) {
                                          item_style = {
                                            background: "#FFFFFF",
                                          };
                                        } else if (
                                          stock_layout.product_code !=
                                            undefined &&
                                          stock_layout.product_code ==
                                            this.state.product_code &&
                                          stock_layout.stock_layout_qty == "0"
                                        ) {
                                          item_style = {
                                            background: "#16BE14",
                                          };
                                        } else if (
                                          stock_layout.product_code ==
                                            this.state.product_code &&
                                          stock_layout.stock_layout_qty != "0"
                                        ) {
                                          item_style = {
                                            background: "#006130",
                                          };
                                        } else if (
                                          restore?.product_code !== "" &&
                                          restore?.product_code !== undefined
                                        ) {
                                          item_style = {
                                            background: "#16BE14",
                                          };
                                        } else {
                                          item_style = {
                                            background: "#FFFFFF",
                                          };
                                        }
                                        if (
                                          stock_y.stock_layouts.length <
                                            this.state.stock_xs.length &&
                                          parseInt(
                                            this.state.stock_xs.length %
                                              stock_y.stock_layouts.length
                                          ) == 0
                                        ) {
                                          return (
                                            <>
                                              <td
                                                key={"" + stock_layout_idx}
                                                style={item_style}
                                                colSpan={parseInt(
                                                  this.state.stock_xs.length /
                                                    stock_y.stock_layouts.length
                                                )}
                                                onClick={() => {
                                                  if (
                                                    stock_layout.product_code ===
                                                      this.state.product_code ||
                                                    stock_layout.product_code ==
                                                      undefined
                                                  ) {
                                                    this._reserveSlot(
                                                      stock_layout,
                                                      stock_y_idx,
                                                      stock_layout_idx,
                                                      stock_layout.stock_layout_code,
                                                      stock_layout.stock_layout_qty,
                                                      stock_layout.stock_use
                                                    );
                                                  } else {
                                                  }
                                                }}
                                              ></td>
                                            </>
                                          );
                                        } else {
                                          return (
                                            <>
                                              <td
                                                style={item_style}
                                                key={
                                                  stock_layout +
                                                  "+" +
                                                  stock_layout_idx
                                                }
                                                onClick={() => {
                                                  if (
                                                    stock_layout.product_code ===
                                                      this.state.product_code ||
                                                    stock_layout.product_code ==
                                                      undefined
                                                  ) {
                                                    this._reserveSlot(
                                                      stock_layout,
                                                      stock_y_idx,
                                                      stock_layout_idx,
                                                      stock_layout.stock_layout_code,
                                                      stock_layout.stock_layout_qty,
                                                      stock_layout.stock_use
                                                    );
                                                  } else {
                                                  }
                                                }}
                                              ></td>
                                            </>
                                          );
                                        }
                                      }
                                    )}
                                  </tr>
                                );
                              }
                            )}{" "}
                          </table>
                        </div>
                      </Col>
                      <Col></Col>
                    </Row>
                  </>
                )}
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}
