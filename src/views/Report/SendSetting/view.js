import React, { Component } from "react";
import { Col, Row, Card, CardBody, Button, CardHeader } from "reactstrap";
import { Link } from "react-router-dom";
import { Loading, Table } from "../../../component/revel-strap";
import Swal from "sweetalert2";
import SendSettingModel from "../../../models/SendSettingModel";

const send_setting_model = new SendSettingModel();

class View extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      send_setting: [],
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
        const send_setting = await send_setting_model.getSendSettingBy({
          params: params,
        });

        this.setState({
          loading: false,
          send_setting: send_setting,
        });
      }
    );
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
            send_setting_model
              .deleteSendSettingByCode({ send_setting_code: code })
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
    return (
      <div>
        <Loading show={this.state.loading} />
        <Card>
          <CardHeader>
            <Row>
              <Col md={1}>
                {" "}
                <Link to="/report">
                  <Button
                    type="button"
                    style={{ height: "80px", width: "120px" }}
                  >
                    {" "}
                    <i className="fas fa-arrow-left"></i>
                  </Button>
                </Link>
              </Col>
              <Col style={{ textAlign: "center", alignSelf: "center" }}>
                <h1>ตั้งค่าการส่งอีเมลอัตโนมัติ</h1>
              </Col>{" "}
              <Col md={1}>
                {" "}
                <Link to={`/report/send-setting/insert`}>
                  <Button
                    type="button"
                    className="btn btn-success float-right"
                    style={{ height: "80px", width: "140px" }}
                  >
                    <i className="fa fa-plus" aria-hidden="true"></i>{" "}
                    การส่งอีเมล์
                  </Button>
                </Link>
              </Col>
            </Row>
          </CardHeader>
          <CardBody style={{ height: "70vh" }}>
            <Table
              onChange={(e) => this._fetchData(e)}
              showRowNo={true}
              dataSource={this.state.send_setting.data}
              dataTotal={this.state.send_setting.total}
              rowKey="send_setting_code"
              columns={[
                {
                  title: "รหัสการส่ง",
                  dataIndex: "send_setting_code",
                  filterAble: true,
                  ellipsis: true,
                  width: 80,
                },
                {
                  title: " หัวข้อการส่ง",
                  dataIndex: "send_setting_name",
                  filterAble: true,
                  ellipsis: true,
                  width: 240,
                },
                {
                  title: "เวลาในการส่ง",
                  dataIndex: "send_setting_time",
                  filterAble: true,
                  ellipsis: true,
                  width: 80,
                },
                {
                  title: "การรับสินค้า",
                  filterAble: true,
                  ellipsis: true,
                  render: (cell) => {
                    return cell.send_setting_receive == 1 ? (
                      <div style={{ textAlign: "center" }}>
                        <i
                          className="fas fa-check-circle"
                          style={{ fontSize: 24, color: "#0AA96D" }}
                        ></i>
                      </div>
                    ) : (
                      <></>
                    );
                  },
                  width: 80,
                },
                {
                  title: "การเบิกสินค้า",
                  filterAble: true,
                  ellipsis: true,
                  render: (cell) => {
                    return cell.send_setting_issue == 1 ? (
                      <div style={{ textAlign: "center" }}>
                        <i
                          className="fas fa-check-circle"
                          style={{ fontSize: 24, color: "#0AA96D" }}
                        ></i>
                      </div>
                    ) : (
                      <></>
                    );
                  },
                  width: 80,
                },
                {
                  title: "สินค้าคงเหลิอ",
                  filterAble: true,
                  ellipsis: true,
                  render: (cell) => {
                    return cell.send_setting_balance == 1 ? (
                      <div style={{ textAlign: "center" }}>
                        <i
                          className="fas fa-check-circle"
                          style={{ fontSize: 24, color: "#0AA96D" }}
                        ></i>
                      </div>
                    ) : (
                      <></>
                    );
                  },
                  width: 80,
                },
                {
                  title: "สินค้าที่มีปัญหา",
                  dataIndex: "send_setting_incident",
                  filterAble: true,
                  ellipsis: true,
                  render: (cell) => {
                    return cell == 1 ? (
                      <div style={{ textAlign: "center" }}>
                        <i
                          className="fas fa-check-circle"
                          style={{ fontSize: 24, color: "#0AA96D" }}
                        ></i>
                      </div>
                    ) : (
                      <></>
                    );
                  },
                  width: 80,
                },
                {
                  title: "สินค้าเคลื่อนไหว",
                  filterAble: true,
                  ellipsis: true,
                  render: (cell) => {
                    return cell.send_setting_transaction == 1 ? (
                      <div style={{ textAlign: "center" }}>
                        <i
                          className="fas fa-check-circle"
                          style={{ fontSize: 24, color: "#0AA96D" }}
                        ></i>
                      </div>
                    ) : (
                      <></>
                    );
                  },
                  width: 80,
                },
                {
                  title: "สินค้าต่ำกว่าเกณท์",
                  filterAble: true,
                  ellipsis: true,
                  render: (cell) => {
                    return cell.send_setting_low_stock == 1 ? (
                      <div style={{ textAlign: "center" }}>
                        <i
                          className="fas fa-check-circle"
                          style={{ fontSize: 24, color: "#0AA96D" }}
                        ></i>
                      </div>
                    ) : (
                      <></>
                    );
                  },
                  width: 80,
                },
                {
                  title: "รายงานทุกการเบิก",
                  filterAble: true,
                  ellipsis: true,
                  render: (cell) => {
                    return cell.send_setting_issue_alway == 1 ? (
                      <div style={{ textAlign: "center" }}>
                        <i
                          className="fas fa-check-circle"
                          style={{ fontSize: 24, color: "#0AA96D" }}
                        ></i>
                      </div>
                    ) : (
                      <></>
                    );
                  },
                  width: 80,
                },

                {
                  title: "",
                  dataIndex: "",
                  render: (cell) => {
                    const row_accessible = [];

                    row_accessible.push(
                      <Link
                        key="update"
                        to={`/report/send-setting/update/${cell.send_setting_code}`}
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
                        onClick={() => this._onDelete(cell.send_setting_code)}
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
