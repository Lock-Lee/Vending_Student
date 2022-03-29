import React, { Component } from "react";
import { Loading, Select } from "../../../../component/revel-strap";
import Swal from "sweetalert2";
import { Button, Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import StockModel from "../../../../models/StockModel";
import StockLayoutModel from "../../../../models/StockLayoutModel";
const stock_model = new StockModel();
const stock_layout_model = new StockLayoutModel();
class Slotlayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show_modal: false,
      show_select_stock_modal: false,
      loading: true,
      stock_code: "SC001",
      stocks: [],
      stock_ys: [],
      stock_layout_code: "",
      product_code: "",
      stock_status: "",
      display: "",
      slot_reserves: [],
      restore_slot: [],
    };
  }

  componentDidMount = () => {
    this.setState({
      product_code: this.props.product_code,
      stock_status: this.props.status,
    });
    this._fetchData();
    this._getStockLayout("SC001");
  };

  _fetchData() {
    this.setState(
      {
        loading: true,
      },
      async () => {
        const { stock_code } = this.state;
        const stocks = await stock_model.getStock();

        this._getStockLayout(stock_code);
        this.setState({
          loading: false,
          stocks: stocks.data,
        });
      }
    );
  }

  _getStockLayout(stock_code) {
    this.setState(
      {
        loading: true,
      },
      async () => {
        const stock_layouts = await stock_layout_model.getStockLayout({
          stock_code,
        });

        let stock_ys = [];

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

        stock_ys.forEach((stock_ys) => {
          stock_ys.stock_layouts.reverse();
        });

        this.setState(
          {
            loading: false,
            stock_code,
            stock_ys,
          },
          () => {}
        );
      }
    );
  }

  _addclass() {
    if (this.state.stock_code === "") {
      Swal.fire({
        title: "กรุณาเลือกคลัง !",
        text: "Please Select stock",
        icon: "warning",
      });
      return false;
    } else {
      this.setState({
        show_modal: true,
      });
    }
  }

  _onDeleteClass() {
    const stock_y = this.state.stock_ys[0].stock_y;

    Swal.fire({
      title: "Are you sure ?",
      text: "Confirm to delete this item",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        this.setState(
          {
            loading: true,
          },
          () => {
            stock_layout_model
              .deleteStockLayoutByStockYCode({ stock_y })
              .then((res) => {
                if (res.require) {
                  Swal.fire("Success Deleted!", "", "success");
                  this._getStockLayout(this.state.stock_code);
                } else {
                  this.setState(
                    {
                      loading: false,
                    },
                    () => {
                      Swal.fire("Sorry, Someting worng !", "", "error");
                    }
                  );
                }
              });
          }
        );
      }
    });
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
      this.setState({ slot_reserves });
    }
  };
  async _addReserves() {
    const { slot_reserves, restore_slot } = this.state;
    let update_slot = [...slot_reserves, ...restore_slot];

    const res = await stock_layout_model.updateStockLayout({ update_slot });
    if (res.require) {
      Swal.fire("อัพเดตข้อมูลสำเร็จ !", "", "success");
      this.props.displayclose();
    } else {
      Swal.fire("เกิดข้อผิดพลาด !", "", "error");
    }
  }
  render() {
    const stock_options = this.state.stocks.map((item) => ({
      value: item.stock_code,
      label: item.stock_name,
    }));

    return (
      <div>
        <Loading show={this.state.loading} />
        <Card>
          <CardHeader>
            <Row>
              <Col>
                {" "}
                <Button
                  type="button"
                  style={{ height: "80px", width: "120px" }}
                  onClick={() => {
                    this.props.displayclose();
                  }}
                >
                  {" "}
                  <i className="fas fa-arrow-left"></i>
                </Button>
              </Col>
              <Col style={{ textAlign: "center" }}>
                {" "}
                <lable>
                  <h1>จัดการช่อง </h1>
                </lable>
              </Col>
              <Col>
                {" "}
                <Button
                  type="button"
                  color="success"
                  style={{ height: "80px", width: "120px", float: "right" }}
                  onClick={() => {
                    this._addReserves();
                  }}
                >
                  Finished
                </Button>
              </Col>
            </Row>
          </CardHeader>

          <CardHeader>
            <Row>
              <Col md={3}>
                <Select
                  options={stock_options}
                  value={this.state.stock_code}
                  onChange={(e) => this._getStockLayout(e)}
                />
              </Col>
              <Col md={7} />
            </Row>
          </CardHeader>

          <CardBody style={{ textAlign: "center" }}>
            {this.state.stock_ys.map((stock_y, stock_y_idx) => (
              <div
                key={"stock_ys_" + stock_y_idx}
                style={{
                  border: "1px solid #BEBEBE",
                  background: "#EBFFE5",
                  borderRadius: "4px",
                  paddingTop: "5px",
                }}
              >
                <Row>
                  <Col md={1}>
                    <h3 style={{ paddingTop: "4vh" }}>{stock_y.stock_y}</h3>
                  </Col>

                  {stock_y.stock_layouts.map(
                    (stock_layout, stock_layout_idx) => {
                      let is_reserve = this.state.slot_reserves.find(
                        (slot_reserve) =>
                          slot_reserve.stock_y_idx === stock_y_idx &&
                          slot_reserve.stock_layout_idx === stock_layout_idx &&
                          slot_reserve.stock_code === this.state.stock_code
                      );

                      let restore = this.state.restore_slot.find(
                        (slot_reserve) =>
                          slot_reserve.stock_y_idx === stock_y_idx &&
                          slot_reserve.stock_layout_idx === stock_layout_idx &&
                          slot_reserve.stock_code === this.state.stock_code
                      );

                      let item_style = [];
                      if (stock_layout.stock_use === "1") {
                        item_style = {
                          margin: "15px",
                          paddingTop: "8px",
                          background: "#FF0033",
                          border: "1px solid #A6A29E",
                          borderRadius: "4px",
                          flex: 1,
                          height: "120px",
                          width: "-webkit-fill-available",
                        };
                      } else if (
                        stock_layout.stock_use === "2" &&
                        stock_layout.stock_layout_qty == "0" &&
                        !restore
                      ) {
                        item_style = {
                          margin: "15px",
                          paddingTop: "8px",
                          background: "#94FA92",
                          border: "1px solid #A6A29E",
                          borderRadius: "4px",
                          flex: 1,
                          height: "120px",
                          width: "-webkit-fill-available",
                        };
                      } else if (stock_layout.stock_use === "2" && !restore) {
                        item_style = {
                          margin: "15px",
                          paddingTop: "8px",
                          background: "#FF0033",
                          border: "1px solid #A6A29E",
                          borderRadius: "4px",
                          flex: 1,
                          height: "120px",
                          width: "-webkit-fill-available",
                        };
                      } else if (is_reserve && !restore) {
                        item_style = {
                          margin: "15px",
                          paddingTop: "8px",
                          background: "#94FA92",
                          border: "1px solid #BEBEBE",
                          borderRadius: "4px",
                          flex: 1,
                          height: "120px",
                          width: "-webkit-fill-available",
                        };
                      } else if (restore) {
                        item_style = {
                          margin: "15px",
                          paddingTop: "8px",
                          background: "#FFFFFF",
                          border: "1px solid #BEBEBE",
                          borderRadius: "4px",
                          flex: 1,
                          height: "120px",
                          width: "-webkit-fill-available",
                        };
                      } else {
                        item_style = {
                          margin: "15px",
                          paddingTop: "8px",
                          background: "#FFFFFF",
                          border: "1px solid #BEBEBE",
                          borderRadius: "4px",
                          flex: 1,
                          height: "120px",
                          width: "-webkit-fill-available",
                        };
                      }
                      return (
                        <>
                          <Col
                            md={6}
                            style={{
                              flex: 1,
                              flexDirection: "row",
                              justifyContent: "stretch",
                            }}
                          >
                            <button
                              disabled={
                                stock_layout.stock_use == 0 ||
                                (stock_layout.stock_use == 2 &&
                                  stock_layout.stock_layout_qty == 0)
                                  ? false
                                  : true
                              }
                              key={stock_layout_idx}
                              style={item_style}
                              onClick={(e) =>
                                this._reserveSlot(
                                  stock_layout,
                                  stock_y_idx,
                                  stock_layout_idx,
                                  stock_layout.stock_layout_code,
                                  stock_layout.stock_layout_qty,
                                  stock_layout.stock_use
                                )
                              }
                            >
                              <i
                                className="fas fa-th"
                                style={{ fontSize: 32, marginLeft: 0 }}
                              ></i>
                              <p>
                                <b>{stock_layout.stock_layout_code}</b>
                                <br></br>
                                <b>
                                  {stock_layout.stock_status
                                    ? stock_layout.stock_status
                                    : "Free"}
                                </b>
                                <br></br>
                                <b>{stock_layout.product_name}</b>
                              </p>
                            </button>
                          </Col>
                        </>
                      );
                    }
                  )}
                </Row>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Slotlayout;
