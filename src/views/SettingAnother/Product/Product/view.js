import React from "react";
import { Card, CardBody, Row, Col, Button, CardHeader } from "reactstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import { Loading, Table, Select } from "../../../../component/revel-strap";

import ProductModel from "../../../../models/ProductModel";
import StockLayoutModel from "../../../../models/StockLayoutModel";
const product_model = new ProductModel();
const StockLayout_Model = new StockLayoutModel();
class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      product: [],
      deleted: "",
    };
  }

  componentDidMount() {
    this._fetchData();
  }

  _fetchData(params = { pagination: { current: 1, pageSize: 10 } }) {
    this.setState(
      {
        loading: true,
      },
      async () => {
        let product = [];
        product = await product_model.getProductBy(params);
        let conut = await StockLayout_Model.getCountReserve();

        let slot = [];

        conut.data.filter((item, idx) => {
          if (
            item.product_code !==
            slot.find((data) => data.product_code == item.product_code)
              ?.product_code
          ) {
            slot.push(item);
          } else {
            slot.find((data, idx) => {
              if (data.product_code == item.product_code) {
                slot[idx]["stock_status_RF"] = item.stock_status;
                slot[idx]["count_slot_RF"] = item.count_slot;
                slot[idx]["sum_slot_RF"] = item.sum_slot;
              }
            });
          }
        });

        product.data.filter((item, idx) => {
          if (slot.find((data) => data.product_code == item.product_code)) {
            if (item.product_type_consumable == "Consumable") {
              product.data[idx]["count_slot"] = parseInt(
                item.product_refill_unit *
                  slot.find((data) => data.product_code == item.product_code)
                    .count_slot
              );
              product.data[idx]["count_slot_RF"] = parseInt(
                item.product_refill_unit *
                  slot.find((data) => data.product_code == item.product_code)
                    .count_slot_RF
              );
              product.data[idx]["stock_status"] = parseInt(
                slot.find((data) => data.product_code == item.product_code)
                  .stock_status
              );
              product.data[idx]["stock_status_RF"] = parseInt(
                slot.find((data) => data.product_code == item.product_code)
                  .stock_status_RF
              );
              product.data[idx]["sum_slot"] = parseInt(
                slot.find((data) => data.product_code == item.product_code)
                  .sum_slot
              );
              product.data[idx]["sum_slot_RF"] = parseInt(
                slot.find((data) => data.product_code == item.product_code)
                  .sum_slot_RF
              );
            } else {
              product.data[idx]["count_slot"] = parseInt(
                item.product_refill_unit *
                  slot.find((data) => data.product_code == item.product_code)
                    .count_slot
              );
              product.data[idx]["stock_status"] = parseInt(
                slot.find((data) => data.product_code == item.product_code)
                  .stock_status
              );
              product.data[idx]["sum_slot"] = parseInt(
                slot.find((data) => data.product_code == item.product_code)
                  .sum_slot
              );
            }
          }
        });

        this.setState(
          {
            loading: false,
            product: product,
          },
          () => {}
        );
      }
    );
  }
  async _onChange(index, cell) {
    let product = [];
    product = cell;
    product.deleted = parseInt(index);

    const res = await product_model.updateProductBy(product);

    this.props.history.push("/settinganother/product/product");
  }
  _onDelete(code) {
    Swal.fire({
      title: "Are you sure ?",
      text: "Confirm to delete this item",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        this.setState(
          {
            // loading: true,
          },
          () => {
            product_model
              .deleteProductByCode({ product_code: code })
              .then((res) => {
                if (res.require) {
                  Swal.fire("Success Deleted!", "", "success");
                  this._fetchData();
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
            <Row>
              <Col>
                {" "}
                <Link to="/settinganother/product">
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
                <h1> จัดการสินค้า </h1>
              </Col>
              <Col>
                {" "}
                <Link to={`/settinganother/product/product/insert`}>
                  <Button
                    type="button"
                    className="btn btn-success float-right"
                    style={{ height: "80px", width: "140px" }}
                  >
                    <i className="fa fa-plus" aria-hidden="true"></i> สินค้า
                  </Button>
                </Link>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Table
              onChange={(e) => this._fetchData(e)}
              showRowNo={true}
              dataSource={this.state.product.data}
              dataTotal={this.state.product.total}
              rowKey="product_code"
              columns={[
                {
                  title: "รหัสสินค้า",
                  dataIndex: "product_code",
                  filterAble: true,
                  ellipsis: true,
                  width: 140,
                },
                {
                  title: "ชื่อสินค้า",
                  dataIndex: "product_name",
                  filterAble: true,
                  ellipsis: true,
                  width: 140,
                },
                {
                  title: "คงเหลือ/สูงสุด",
                  dataIndex: "",
                  render: (cell) => {
                    const row_slot = [];
                    if (cell.product_type_consumable === "Consumable") {
                      row_slot.push(
                        <table>
                          <tr>
                            <td>
                              {cell.sum_slot ? cell.sum_slot : 0}/{" "}
                              {cell.count_slot ? cell.count_slot : 0}
                            </td>
                            <td>
                              {cell.sum_slot_RF ? cell.sum_slot_RF : 0}/
                              {cell.count_slot_RF ? cell.count_slot_RF : 0}
                            </td>
                          </tr>
                        </table>
                      );
                    } else {
                      row_slot.push(
                        <table>
                          <tr>
                            <td>
                              {cell.sum_slot ? cell.sum_slot : 0}/
                              {cell.count_slot ? cell.count_slot : 0}
                            </td>
                          </tr>
                        </table>
                      );
                    }
                    return row_slot;
                  },
                  width: 100,
                },
                {
                  title: "จัดการตำแหน่งสินค้า",
                  dataIndex: "",
                  render: (cell) => {
                    const row_accessible = [];

                    if (cell.product_type_consumable === "Consumable") {
                      row_accessible.push(
                        <Link
                          key="New"
                          to={`/settinganother/location/update/${cell.product_code}+New`}
                          title="แก้ไขรายการ"
                        >
                          <button
                            style={{ width: "58.6px" }}
                            className="btn btn-info"
                          >
                            New
                          </button>
                        </Link>
                      );
                      row_accessible.push(
                        <Link
                          key="RF"
                          to={`/settinganother/location/update/${cell.product_code}+RF`}
                          title="แก้ไขรายการ"
                        >
                          <button
                            style={{ width: "58.6px" }}
                            className="btn btn-info"
                          >
                            RF
                          </button>
                        </Link>
                      );
                    } else if (cell.product_type_consumable === "Loan") {
                      row_accessible.push(
                        <Link
                          key="Loan"
                          to={`/settinganother/location/update/${cell.product_code}+Loan`}
                          title="แก้ไขรายการ"
                        >
                          <button
                            style={{ width: "58.6px" }}
                            className="btn btn-info"
                          >
                            Loan
                          </button>
                        </Link>
                      );
                    }

                    return row_accessible;
                  },
                  width: 100,
                },
                {
                  title: "",
                  dataIndex: "",
                  render: (cell) => {
                    const row_accessible = [];

                    row_accessible.push(
                      <Link
                        key="update"
                        to={`/settinganother/product/product/update/${cell.product_code}`}
                        title="แก้ไขรายการ"
                      >
                        <button
                          style={{ width: "58.6px" }}
                          className="btn btn-info"
                        >
                          แก้ไข
                        </button>
                      </Link>
                    );

                    row_accessible.push(
                      <button
                        key="delete"
                        style={{ width: "58.6px" }}
                        className="btn btn-danger"
                        onClick={() => this._onDelete(cell.product_code)}
                      >
                        ลบ
                      </button>
                    );

                    return row_accessible;
                  },
                  width: 100,
                },
              ]}
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default View;
