import React, { Component } from "react";
import { Col, Row, Card, CardBody, CardHeader, Button } from "reactstrap";
import { Loading } from "../../component/revel-strap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import StockModel from "../../models/StockModel";
import StockLayoutModel from "../../models/StockLayoutModel";
import GLOBAL from "../../GLOBAL";
const stock_model = new StockModel();
const stock_layout_model = new StockLayoutModel();

class View extends Component {
  constructor() {
    super();
    this.state = {
      show_modal: false,
      show_select_stock_modal: false,
      loading: true,
      stock_code: "",
      stocks: [],
      stock_ys: [],
      stock_layout_code: "",
      product_code: "",
      supplier_code: "",
      product_unit: "",
      product_name: "ss",
    };
  }

  componentDidMount = () => {
    this._fetchData();
    this._getStockLayout("SC001");
  };

  _fetchData() {
    this.setState(
      {
        loading: true,
      },
      async () => {
        const stocks = await stock_model.getStock();
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
          stock_code: stock_code,
        });

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

        stock_ys.forEach((stock_ys) => {
          stock_ys.stock_layouts.reverse();
        });

        this.setState({
          loading: false,
          stock_code,
          stock_ys,
        });
      }
    );
  }

  _onselectstocklayout(product_name, stock_layout_qty) {
    this.setState({
      show_select_stock_modal: true,
      product_name: product_name,
      product_unit: stock_layout_qty,
    });
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
      title: "คุณแน่ใจไหม ?",
      text: "ยืนยันการลบรายการนี้",
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
                  Swal.fire("ลบสำเร็จ!", "", "success");
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

  render() {
    return (
      <div>
        <Loading show={this.state.loading} />
        <Card>
          <CardHeader>
            {" "}
            <Row>
              <Col>
                {" "}
                <Link to="/">
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
                <h2>ตำแหน่งของสินค้า</h2>{" "}
              </Col>
              <Col></Col>
              {/* <Col>
                {" "}
                <button
                  className="btn btn-success float-right"
                  onClick={() => this._addclass()}
                  style={{ height: "80px", width: "120px" }}
                >
                  <i className="fa fa-plus" aria-hidden="true"></i> เพิ่มชั้น
                </button>
              </Col> */}
            </Row>
          </CardHeader>

          <CardBody>
            {this.state.stock_ys.map((stock_y, stock_y_idx) => (
              <div
                key={"stock_ys_" + stock_y_idx}
                style={{
                  border: "1px solid #BEBEBE",
                  background: "#EBFFE5",
                  borderRadius: "4px",
                }}
              >
                <Row>
                  <Col
                    className="col-md-1 align-items-center justify-content-center d-flex"
                    style={{
                      border: "1px solid #BEBEBE",
                      background: "#EBFFE5",
                      borderRadius: "4px",
                      textAlign: "center",
                      verticalAlign: "center",
                    }}
                  >
                    <p>{parseInt(stock_y.stock_y)}</p>
                  </Col>
                  <Col md={10}>
                    <div>
                      {stock_y.stock_layouts.map(
                        (stock_layout, stock_layout_idx) => (
                          <button
                            disabled={
                              stock_layout.stock_use === 0 ? true : false
                            }
                            key={stock_layout_idx}
                            style={
                              stock_layout.stock_use === 0
                                ? {
                                    margin: "15px",
                                    background: "#FFFFFF",
                                    border: "1px solid #BEBEBE",
                                    borderRadius: "4px",
                                    width: "130px",
                                    height: "179px",
                                  }
                                : {
                                    margin: "15px",
                                    background: "#FFFFFF",
                                    border: "1px solid #BEBEBE",
                                    borderRadius: "4px",
                                    width: "130px",
                                    height: "179px",
                                  }
                            }
                            onClick={() =>
                              this._onselectstocklayout(
                                stock_layout.product_name,
                                stock_layout.stock_layout_qty
                              )
                            }
                          >
                            <Col style={{ height: "128px" }}>
                              <div>
                                <p style={{ height: "30px" }}>
                                  <br />
                                  <img
                                    style={{ maxWidth: 80 }}
                                    src={
                                      `${GLOBAL.BASE_SERVER.URL_IMG}` +
                                      `${stock_layout.product_image}`
                                    }
                                    alt="product_image"
                                  />
                                  <b>{stock_layout.product_name}</b>
                                  <br />
                                  {/* {stock_layout.product_name}<br />
                          {stock_layout.product_unit} */}
                                </p>
                              </div>
                            </Col>
                          </button>
                        )
                      )}
                    </div>
                  </Col>
                  <Col className="col-md-1 align-items-center justify-content-center d-flex">
                    {stock_y_idx === 0 ? (
                      // <button
                      //   className="btn btn-danger"
                      //   onClick={() => this._onDeleteClass()}
                      // >
                      //   ลบฃั้น
                      // </button>
                      <></>
                    ) : (
                      <div></div>
                    )}
                  </Col>
                </Row>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default View;
