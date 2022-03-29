import React from "react";
import { Card, CardBody, Row, Col, Button, CardHeader } from "reactstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import GLOBAL from "../../../GLOBAL";
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
                <h1> รายการสินค้า </h1>
              </Col>
              <Col> </Col>
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
                  title: "รูป",
                  dataIndex: "product_image",
                  width: 100,
                  render: (cell) => {
                    return (
                      <img
                        className="image-list"
                        src={
                          cell !== ""
                            ? GLOBAL.BASE_SERVER.URL_IMG + cell
                            : GLOBAL.BASE_SERVER.URL_IMG + "/default.png"
                        }
                        style={{ width: "36px", maxHeight: "36px" }}
                        alt="machine_image"
                      />
                    );
                  },
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
