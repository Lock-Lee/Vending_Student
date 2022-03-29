import React, { Component } from "react";
import { Col, Row, Card, CardBody, CardHeader, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { Loading, Table } from "../../../component/revel-strap";
import Swal from "sweetalert2";
import ToolsLifeRecordModel from "../../../models/ToolsLifeRecordModel";

const tools_model = new ToolsLifeRecordModel();

class View extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      users: [],
    };
  }

  componentDidMount = () => {
    this._fetchData();
  };
  _fetchData = (params = { pagination: { current: 1, pageSize: 10 } }) =>
    this.setState({ loading: true }, async () => {
      const users = await tools_model.getToolsLifeRecordBy(params);

      this.setState({
        loading: false,
        users: users,
      });
    });

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
            loading: true,
          },
          async () => {
            tools_model
              .deleteToolsLifeRecordByCode({ records_code: code })
              .then((res) => {
                if (res.require) {
                  Swal.fire("ลบสำเร็จ!", "", "success");
                  this._fetchData();
                } else {
                  this.setState({ loading: false });
                  Swal.fire("Sorry, Someting worng !", "", "error");
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
                <Link to="/settinganother">
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
                <h1>จัดการสินค้าที่ใช้แล้ว</h1>
              </Col>{" "}
              <Col>
                {" "}
                <Link to={`/settinganother/ToolslifeReccord/insert`}>
                  <Button
                    type="button"
                    className="btn btn-success float-right"
                    style={{ height: "80px", width: "140px" }}
                  >
                    <i className="fa fa-plus" aria-hidden="true"></i>{" "}
                    เพิ่มสินค้า
                  </Button>
                </Link>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Table
              onChange={(e) => this._fetchData(e)}
              showRowNo={true}
              dataSource={this.state.users.data}
              dataTotal={this.state.users.total}
              rowKey="records_code"
              columns={[
                {
                  title: "รหัส",
                  dataIndex: "records_code",
                  filterAble: true,
                  ellipsis: true,
                  width: 100,
                },
                {
                  title: "ชื่อ",
                  dataIndex: "product_name",
                  filterAble: true,
                  ellipsis: true,
                  width: 100,
                },

                {
                  title: "วันที่",
                  dataIndex: "records_date",
                  filterAble: true,
                  ellipsis: true,
                  width: 100,
                },
                {
                  title: "ครั้ง ",
                  dataIndex: "record_toolife",
                  filterAble: true,
                  ellipsis: true,
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
                        to={`/settinganother/ToolslifeReccord/update/${cell.records_code}`}
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
                        onClick={() => this._onDelete(cell.records_code)}
                      >
                        ลบ
                      </button>
                    );

                    return row_accessible;
                  },
                  width: 120,
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
