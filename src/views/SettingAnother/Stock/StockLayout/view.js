import React, { Component } from "react";
import { Col, Row, Card, CardBody, CardHeader, Button } from "reactstrap";
import { Loading, Select } from "../../../../component/revel-strap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import StockLayoutModal from "./modal";
import SelectStockLayoutModal from "./modalselectstock";
import StockModel from "../../../../models/StockModel";
import StockLayoutModel from "../../../../models/StockLayoutModel";

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
      product_name: "",
    };
  }

  componentDidMount = () => {
    this._fetchData();
    this._getStockLayout("SC001");
  };

  _fetchData() {
    const { stock_code } = this.state;
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
    const stock_code = this.state.stock_code;

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
              .deleteStockLayoutByStockYCode({ stock_y, stock_code })
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
            {" "}
            <Row>
              <Col>
                {" "}
                <Link to="/settinganother/stock">
                  <Button
                    type="button"
                    style={{ height: "80px", width: "120px" }}
                  >
                    {" "}
                    <i className="fas fa-arrow-left"></i>
                  </Button>
                </Link>
              </Col>
              <Col> </Col>
              <Col>
                {" "}
                <button
                  className="btn btn-success float-right"
                  onClick={() => this._addclass()}
                  style={{ height: "80px", width: "120px" }}
                >
                  <i className="fa fa-plus" aria-hidden="true"></i> เพิ่มชั้น
                </button>
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
                              stock_layout.stock_use == 0 ? true : false
                            }
                            key={stock_layout_idx}
                            style={
                              stock_layout.stock_use == 0
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
                                    background: "#94FA92",
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
                                <i
                                  className="fas fa-th"
                                  style={{ fontSize: 96, marginLeft: 0 }}
                                ></i>
                                <p style={{ height: "30px" }}>
                                  <br />
                                  <b>{stock_layout.stock_layout_code}</b>
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
                    {stock_y_idx == 0 ? (
                      <button
                        className="btn btn-danger"
                        onClick={() => this._onDeleteClass()}
                      >
                        ลบฃั้น
                      </button>
                    ) : (
                      <div></div>
                    )}
                  </Col>
                </Row>
              </div>
            ))}
          </CardBody>
        </Card>
        <StockLayoutModal
          show={this.state.show_modal}
          stock_code={this.state.stock_code}
          onClose={() =>
            this.setState({ show_modal: false }, () =>
              this._getStockLayout(this.state.stock_code)
            )
          }
        />
        <SelectStockLayoutModal
          show={this.state.show_select_stock_modal}
          product_unit={this.state.product_unit}
          product_name={this.state.product_name}
          onClose={() =>
            this.setState({ show_select_stock_modal: false }, () =>
              this._getStockLayout(this.state.stock_code)
            )
          }
        />
      </div>
    );
  }
}

export default View;
