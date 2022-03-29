import React, { Component } from "react";
import { Col, Row, Card, CardBody, CardHeader, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { Loading, Table } from "../../../component/revel-strap";
import Swal from "sweetalert2";
import SuccessModel from "../../../models/SuccessModel";

const success_model = new SuccessModel();

class View extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      success: [],
    };
  }

  componentDidMount = () => {
    this._fetchData();
  };
  _fetchData = (params = { pagination: { current: 1, pageSize: 10 } }) =>
    this.setState({ loading: true }, async () => {
      const success = await success_model.getSuccessBy(params);

      this.setState({
        loading: false,
        success: success,
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
            success_model
              .deleteSuccessByCode({ success_code: code })
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
                <h1>จัดการการทดสอบเครื่องมือ</h1>
              </Col>{" "}
              <Col>
                {" "}
                <Link to={`/settinganother/TRP/insert`}>
                  <Button
                    type="button"
                    className="btn btn-success float-right"
                    style={{ height: "80px", width: "140px" }}
                  >
                    <i className="fa fa-plus" aria-hidden="true"></i>{" "}
                    การทดสอบเครื่องมือ
                  </Button>
                </Link>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Table
              onChange={(e) => this._fetchData(e)}
              showRowNo={true}
              dataSource={this.state.success.data}
              dataTotal={this.state.success.total}
              rowKey="success_code"
              columns={[
                {
                  title: "รหัส",
                  dataIndex: "success_code",
                  filterAble: true,
                  ellipsis: true,
                  width: 100,
                },
                {
                  title: "ชื่อ",
                  dataIndex: "success_name",
                  filterAble: true,
                  ellipsis: true,
                  width: 100,
                },

                {
                  title: "วันที่",
                  dataIndex: "success_date",
                  filterAble: true,
                  ellipsis: true,
                  width: 100,
                },
                {
                  title: "ผลลัพธ์",
                  render: (cell) => {
                    console.log(cell);
                    if (cell === "Finish") {
                      return "ผ่าน";
                    } else {
                      return "ไม่ผ่าน";
                    }
                  },
                  dataIndex: "success_result",
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
                        to={`/settinganother/TRP/update/${cell.success_code}`}
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
                        onClick={() => this._onDelete(cell.success_code)}
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
