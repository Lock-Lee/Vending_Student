import React, { Component } from "react";
import { Loading, Select } from "../../../component/revel-strap";
import Swal from "sweetalert2";
import { Button, Col, Row, ModalFooter } from "reactstrap";
import StockModel from "../../../models/StockModel";

import StockLayoutModel from "../../../models/StockLayoutModel";
import { AiFillAppstore } from "react-icons/ai";
const stock_model = new StockModel();
const stock_layout_model = new StockLayoutModel();
class Manually extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show_modal: false,
      show_select_stock_modal: false,
      loading: true,
      stock_code: "SC001",
      stocks: [],
      product_code: "",
      product: [],
      stock_status: "",
      reseved_slot: [],
      amount: "",
      slot: [],
      sum: 0,
      qty: 0,
      slot_refill: [],
      reseved_slot_null: [],
      x: 0,
    };
  }

  componentDidMount = () => {
    this.setState({
      product_code: this.props.product_code,
      stock_status: this.props.slot_status,
      amount: this.props.amonut,
      product: this.props.product,
    });
    this._fetchData();
  };

  _fetchData() {
    this.setState(
      {
        loading: true,
      },
      async () => {
        const { stock_code } = this.state;
        const stocks = await stock_model.getStock();
        const slot = await stock_layout_model.getResevedSlotbyCode({
          product_code: this.state.product_code,
          stock_status: this.state.stock_status,
        });
        const slot_null = await stock_layout_model.getResevedSlotisNull({
          product_code: this.state.product_code,
          stock_status: this.state.stock_status,
        });
        console.log(slot.data, slot_null.data);
        this._getStockLayout(stock_code);
        this.setState(
          {
            loading: false,
            stocks: stocks.data,
            reseved_slot: slot.data,
            reseved_slot_null: slot_null.data,
          },
          () => {}
        );
      }
    );
  }
  _addslotbyreseved = (data, index) => {
    let {
      x,
      amount,
      reseved_slot,
      product,
      sum,
      slot_refill,
      reseved_slot_null,
    } = this.state;

    if (
      reseved_slot.find(
        (v) => v.stock_y === data.stock_y && v.stock_x === data.stock_x
      ) !== undefined ||
      reseved_slot_null.find(
        (v) => v.stock_y === data.stock_y && v.stock_x === data.stock_x
      ) !== undefined
    ) {
      if (parseInt(amount) !== 0) {
        reseved_slot = reseved_slot.filter(
          (v) => v.stock_y !== data.stock_y || v.stock_x !== data.stock_x
        );
        reseved_slot_null = reseved_slot_null.filter(
          (v) => v.stock_y !== data.stock_y || v.stock_x !== data.stock_x
        );
        slot_refill.push(data);

        if (parseInt(amount) > parseInt(data.stock_layout_qty)) {
          if (
            parseInt(amount) +
              data.stock_layout_qty * product.product_package_qty <
            product.product_refill_unit * product.product_package_qty
          ) {
            slot_refill[x].stock_qty = parseInt(amount);
            slot_refill[x].balance_qty =
              data.stock_layout_qty * product.product_package_qty;
            sum = parseInt(sum) + parseInt(amount);
            amount = parseInt(amount) - parseInt(amount);
          } else {
            amount =
              amount -
              parseInt(
                product.product_refill_unit * product.product_package_qty -
                  data.stock_layout_qty
              );
            sum =
              parseInt(sum) +
              parseInt(
                product.product_refill_unit * product.product_package_qty -
                  data.stock_layout_qty
              );

            slot_refill[x].stock_qty =
              parseInt(
                product.product_refill_unit * product.product_package_qty
              ) - parseInt(data.stock_layout_qty);
            slot_refill[x].balance_qty = data.stock_layout_qty;
          }
        } else {
          slot_refill[x].stock_qty = parseInt(amount);
          slot_refill[x].balance_qty = data.stock_layout_qty;
          sum = parseInt(sum) + parseInt(amount);
          amount = parseInt(amount) - parseInt(amount);
        }
      } else {
        Swal.fire({
          icon: "warning",
          title: "ครบแล้ว",
          showConfirmButton: false,
          timer: 1500,
        });
      }

      x++;
    }

    slot_refill.sort((a, b) => {
      if (a.stock_layout_qty > b.stock_layout_qty + b.stock_qty) {
        return 1;
      }
      if (a.stock_layout_qty < b.stock_layout_qty + b.stock_qty) {
        return -1;
      }
      return 0;
    });
    this.setState(
      {
        reseved_slot: reseved_slot,
        amount: amount,
        slot_refill: slot_refill,
        sum: sum,
        x: x,
        reseved_slot_null: reseved_slot_null,
      },
      () => {}
    );
  };
  _remove = (data) => {
    let { reseved_slot, amount, sum, slot_refill, reseved_slot_null } =
      this.state;
    slot_refill = slot_refill.filter(
      (v) => v.stock_y !== data.stock_y || v.stock_x !== data.stock_x
    );
    amount += parseInt(data.stock_qty);
    sum -= parseInt(data.stock_qty);
    slot_refill.sort((a, b) => {
      if (a.stock_layout_qty < b.stock_layout_qty) {
        return 1;
      }
      if (a.stock_layout_qty > b.stock_layout_qty) {
        return -1;
      }
      return 0;
    });
    data.stock_qty = 0;
    if (data.stock_status === "") {
      reseved_slot_null.push(data);
    } else {
      reseved_slot.push(data);
    }

    this.setState({
      reseved_slot: reseved_slot,
      slot_refill: slot_refill,
      amount: amount,
      sum: sum,
      x: 0,
    });
  };
  _getStockLayout(stock_code) {
    this.setState(
      {
        loading: true,
      },
      async () => {}
    );
  }
  _handleSubmit() {
    if (parseInt(this.state.sum) === parseInt(this.props.amonut)) {
      this.props._Confirm("comfirmManually");
      this.props.shotfall({ receive: this.state.slot_refill, index: 0 });
    } else {
      Swal.fire({
        icon: "warning",
        title: "กรุณาเลือกช่องให้ครบ",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
  render() {
    const option_slot = [{ label: "All", value: "" }];
    return (
      <div style={{ textAlign: "center" }}>
        <Loading show={this.state.loading} />
        <Row>
          <Col
            style={{
              backgroundColor: "#0052CC",
              color: "white",
            }}
          >
            <Row>
              <Col> </Col>
              <Col> ช่องที่เลือก</Col>
              <Col>
                {" "}
                {this.state.sum}/{this.props.amonut}
              </Col>
            </Row>
          </Col>
        </Row>{" "}
        <br></br>
        <Row>
          <Col>
            <Row
              style={{
                height: "96px",
                overflowY: "auto",
                paddingRight: "15px",
                paddingLeft: "15px",
              }}
            >
              {" "}
              {this.state.slot_refill.map((value, index) => {
                return (
                  <Col
                    key={index}
                    style={{
                      padding: "2px",
                      border: "0px",
                      height: "72px",
                      width: "72px",
                      margin: "0px",
                      maxWidth: "max-content",
                      display: "block",
                    }}
                  >
                    {" "}
                    <div
                      className=""
                      onClick={() => {
                        this._remove(value, index);
                      }}
                      style={{
                        height: "72px",
                        width: "72px",
                        display: "grid",
                      }}
                    >
                      <label
                        style={{
                          margin: "0px",
                          borderRadius: "4px 4px 0px 0px",
                          borderLeft: "1px  solid #808088",
                          borderRight: "1px  solid #808088",
                          borderTop: "1px  solid #808088",
                        }}
                      >
                        <AiFillAppstore
                          style={{ fontSize: "36px", color: "#0052CC" }}
                        />
                      </label>{" "}
                      <label
                        style={{
                          margin: "0px",
                          borderLeft: "1px  solid #808088",
                          borderRight: "1px  solid #808088",
                        }}
                      >
                        {value.stock_qty}/{" "}
                        {parseInt(value?.stock_qty) === null ? 0 : 0}
                      </label>{" "}
                      <label
                        style={{
                          margin: "0px",
                          backgroundColor: "#0052CC",
                          color: "white",
                          borderRadius: "0px 0px 4px 4px",
                        }}
                      >
                        {parseInt(value.stock_y)} ,{parseInt(value.stock_x)}
                      </label>{" "}
                    </div>
                  </Col>
                );
              })}
            </Row>

            <Row>
              <Col
                style={{
                  backgroundColor: "#0052CC",
                  color: "white",
                }}
              >
                ช่องที่จอง
              </Col>
            </Row>
            <br></br>
            <Row
              style={{
                height: "96px",
                overflowY: "auto",
                paddingRight: "15px",
                paddingLeft: "15px",
              }}
            >
              {this.state.reseved_slot.map((value, index) => {
                <Select options={option_slot} />;
                return (
                  <Col
                    key={index}
                    style={{
                      padding: "2px",
                      border: "0px",
                      height: "72px",
                      width: "72px",
                      margin: "0px",
                      maxWidth: "max-content",
                      display: "block",
                    }}
                  >
                    {" "}
                    <div
                      className=""
                      onClick={() => {
                        this._addslotbyreseved(value, index);
                      }}
                      style={{
                        height: "72px",
                        width: "72px",
                        display: "grid",
                      }}
                    >
                      <label
                        style={{
                          margin: "0px",
                          borderRadius: "4px 4px 0px 0px",
                          borderLeft: "1px  solid #808088",
                          borderRight: "1px  solid #808088",
                          borderTop: "1px  solid #808088",
                        }}
                      >
                        <AiFillAppstore
                          style={{ fontSize: "36px", color: "#0052CC" }}
                        />
                      </label>{" "}
                      <label
                        style={{
                          margin: "0px",
                          borderLeft: "1px  solid #808088",
                          borderRight: "1px  solid #808088",
                        }}
                      >
                        {parseInt(value?.stock_qty) === null ? 0 : 0}/
                        {value.stock_layout_qty}
                      </label>{" "}
                      <label
                        style={{
                          margin: "0px",
                          backgroundColor: "#0052CC",
                          color: "white",
                          borderRadius: "0px 0px 4px 4px",
                        }}
                      >
                        {parseInt(value.stock_y)} ,{parseInt(value.stock_x)}
                      </label>{" "}
                    </div>
                  </Col>
                );
              })}
            </Row>
            {/* <Row>
              <Col>
                <Row>
                  <Col md={3}></Col>
                </Row>
                <Row>
                  <Col
                    style={{
                      backgroundColor: "#0052CC",
                      color: "white",
                    }}
                  >
                    ช่องที่ไม่ได้จอง
                    <br></br>
                  </Col>
                </Row>{" "}
                <br></br>
                <Row
                  style={{
                    height: "96px",
                    overflowY: "auto",
                    paddingRight: "15px",
                    paddingLeft: "15px",
                  }}
                >
                  {this.state.reseved_slot_null.map((value, index, array) => {
                    return (
                      <Col
                        key={index}
                        style={{
                          padding: "2px",
                          border: "0px",
                          height: "72px",
                          width: "72px",
                          margin: "0px",
                          maxWidth: "max-content",
                          display: "block",
                        }}
                      >
                        {" "}
                        <div
                          className=""
                          onClick={() => {
                            this._addslotbyreseved(value, index);
                          }}
                          style={{
                            height: "72px",
                            width: "72px",
                            display: "grid",
                          }}
                        >
                          <label
                            style={{
                              margin: "0px",
                              borderRadius: "4px 4px 0px 0px",
                              borderLeft: "1px  solid #808088",
                              borderRight: "1px  solid #808088",
                              borderTop: "1px  solid #808088",
                            }}
                          >
                            <AiFillAppstore
                              style={{ fontSize: "36px", color: "#0052CC" }}
                            />
                          </label>{" "}
                          <label
                            style={{
                              margin: "0px",
                              borderLeft: "1px  solid #808088",
                              borderRight: "1px  solid #808088",
                            }}
                          >
                            {parseInt(value?.stock_qty) === null ? 0 : 0}/
                            {value.stock_layout_qty}
                          </label>{" "}
                          <label
                            style={{
                              margin: "0px",
                              backgroundColor: "#0052CC",
                              color: "white",
                              borderRadius: "0px 0px 4px 4px",
                            }}
                          >
                            {parseInt(value.stock_y)} ,{parseInt(value.stock_x)}
                          </label>{" "}
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              </Col>
            </Row> */}
          </Col>
        </Row>
        <ModalFooter>
          <Button
            color="info"
            style={{
              width: "180px",
              height: "80px",
              marginLeft: "50px",
              fontSize: "18px",
              backgroundColor: "#0E9D57",
            }}
            onClick={() => {
              this._handleSubmit();
            }}
          >
            <i
              className="far fa-check-circle"
              style={{ fontSize: "36px", paddingRight: "30px" }}
            ></i>
            <br />
            ตกลง
          </Button>
          <Button
            color="info"
            style={{
              width: "180px",
              height: "80px",
              marginLeft: "50px",
              fontSize: "18px",
              backgroundColor: "#808088",
              textAlign: "center",
              alignItems: "center",
            }}
            onClick={() => {
              this.props._Confirm("input");
            }}
          >
            <i
              className="fas fa-arrow-left"
              style={{ fontSize: "36px", paddingRight: "25px" }}
            ></i>
            <br />
            ย้อนกลับ
          </Button>
        </ModalFooter>{" "}
      </div>
    );
  }
}

export default Manually;
