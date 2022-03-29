import React, { Component } from "react";
import {
  Col,
  Row,
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Loading, Table } from "../../../../component/revel-strap";
import Swal from "sweetalert2";
import StockModel from "../../../../models/StockModel";

const stock_model = new StockModel();

class View extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      stock: [],
    };
  }

  componentDidMount = () => {
    this._fetchData();
  };

  _fetchData(params = { pagination: { current: 1, pageSize: 10 } }) {
    this.setState(
      {
        loading: true,
      },
      async () => {
        const stock = await stock_model.getStock(params);

        this.setState({
          loading: false,
          stock: stock,
        });
      }
    );
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
            loading: true,
          },
          () => {
            stock_model.deleteStockByCode({ stock_code: code }).then((res) => {
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
    const { permission_add, permission_delete } = this.props.PERMISSION;
    return (
      <div>
        <Loading show={this.state.loading} />
        <Card>
          <CardHeader>
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
              <Col>
                {" "}
                <center>
                  <lable>
                    <h1>จัดการตู้</h1>
                  </lable>
                </center>
              </Col>
              <Col>
                {" "}
                <Link to={`/settinganother/stock/stock/insert`}>
                  <Button
                    type="button"
                    className="btn btn-success float-right"
                    style={{ height: "80px", width: "140px" }}
                  >
                    <i className="fa fa-plus" aria-hidden="true"></i> ตู้
                  </Button>
                </Link>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Table
              onChange={(e) => this._fetchData(e)}
              showRowNo={true}
              dataSource={this.state.stock.data}
              dataTotal={this.state.stock.total}
              rowKey="stock_code"
              columns={[
                {
                  title: "รหัสตู้",
                  dataIndex: "stock_code",
                  filterAble: true,
                  ellipsis: true,
                  width: 240,
                },
                {
                  title: "ชื่อตู้",
                  dataIndex: "stock_name",
                  filterAble: true,
                  ellipsis: true,
                  width: 240,
                },

                {
                  title: "",
                  dataIndex: "",
                  render: (cell) => {
                    const row_accessible = [];

                    row_accessible.push(
                      <Link
                        key="update"
                        to={`/settinganother/stock/stock/update/${cell.stock_code}`}
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
                        style={{ width: "58.6px" }}
                        className="btn btn-danger"
                        onClick={() => this._onDelete(cell.stock_code)}
                      >
                        ลบ
                      </button>
                    );

                    return row_accessible;
                  },
                  width: 80,
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
