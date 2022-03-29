import React from "react";
import { Card, CardBody, Row, Col, Button, CardHeader } from "reactstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import { Loading, Table, Select } from "../../../component/revel-strap";

import ProductModel from "../../../models/ProductModel";

const product_model = new ProductModel();

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
        const product = await product_model.getProductBy(params);

        this.setState({
          loading: false,
          product: product,
        });
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
      title: "คุณแน่ใจไหม ?",
      text: "ยืนยันการลบรายการนี้",
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
                  Swal.fire("ลบสำเร็จ!", "", "success");
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
    const product_status = [
      {
        value: "1",
        label: "ทำงาน",
      },
      {
        value: "0",
        label: "ไม่ทำงาน",
      },
    ];
    return (
      <div>
        <Loading show={this.state.loading} />
        <Card>
          <CardHeader>
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
                {" "}
                <h1> จัดการตำแหน่งสินค้า</h1>
              </Col>
              <Col>
                {" "}
                <Link to={`/settinganother/overview`}>
                  <Button
                    type="button"
                    className="btn  btn-info float-right"
                    style={{ height: "80px", width: "140px" }}
                  >
                    ภาพรวม
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
                  title: "ชื่อสินค้า",
                  dataIndex: "product_name",
                  filterAble: true,
                  ellipsis: true,
                  width: 140,
                },

                {
                  title: "",
                  dataIndex: "",
                  render: (cell) => {
                    const row_accessible = [];

                    if (cell.product_type_consumable === "Consumable") {
                      row_accessible.push(
                        <Link
                          key="update"
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
                          key="update"
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
                          key="update"
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
              ]}
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default View;
