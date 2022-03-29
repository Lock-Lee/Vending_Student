import React, { Component } from "react";
import { Col, Row, Card, CardBody, CardHeader, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { Loading, Table } from "../../../../component/revel-strap";
import Swal from "sweetalert2";
import UserGroupModel from "../../../../models/UserGroupModel";

const user_group_model = new UserGroupModel();

class View extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      user_group: [],
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
        const user_group = await user_group_model.getUserGroupBy(params);

        this.setState({
          loading: false,
          user_group: user_group,
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
            loading: true,
          },
          async () => {
            user_group_model
              .deleteUserGroupByCode({ user_group_code: code })
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
            {" "}
            <Row>
              <Col>
                {" "}
                <Link to="/settinganother/user">
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
                <Col style={{ textAlign: "center" }}>
                  {" "}
                  <h1>จัดการกลุ่มการเข้าถึงสินค้า</h1>
                </Col>{" "}
              </Col>{" "}
              <Col>
                {" "}
                <Link to={`/settinganother/user/userby-group/insert`}>
                  <Button
                    type="button"
                    className="btn btn-success float-right"
                    style={{ height: "80px", width: "140px" }}
                  >
                    <i className="fa fa-plus" aria-hidden="true"></i>{" "}
                    เพิ่มกลุ่มผู้ใช้
                  </Button>
                </Link>
              </Col>
            </Row>
          </CardHeader>
          <CardBody style={{ height: "70vh" }}>
            <Table
              onChange={(e) => this._fetchData(e)}
              showRowNo={true}
              dataSource={this.state.user_group.data}
              dataTotal={this.state.user_group.total}
              rowKey="user_group_code"
              columns={[
                {
                  title: "รหัสกลุ่ม",
                  dataIndex: "user_group_code",
                  filterAble: true,
                  ellipsis: true,
                  width: 200,
                },
                {
                  title: "ชื่อกลุ่ม",
                  dataIndex: "user_group_name",
                  filterAble: true,
                  ellipsis: true,
                  width: 200,
                },

                {
                  title: "",
                  dataIndex: "",
                  width: 360,
                  render: (cell) => {
                    const row_accessible = [];
                    row_accessible.push(
                      <>
                        <Link
                          key="productbygroup"
                          to={`/settinganother/user/userby-group/productbyproduct/${cell.user_group_code}`}
                          title="เพิ่ม"
                        >
                          <button
                            style={{ width: "60x" }}
                            className="btn btn-info"
                          >
                            เพิ่มสินค้า
                          </button>
                        </Link>
                        <Link
                          key="update"
                          to={`/settinganother/user/userby-group/update/${cell.user_group_code}`}
                          title="แก้ไขรายการ"
                        >
                          <button
                            style={{ width: "58.6px" }}
                            className="btn btn-info"
                          >
                            แก้ไข
                          </button>
                        </Link>
                        <button
                          style={{ width: "58.6px" }}
                          className="btn btn-danger"
                          onClick={() => this._onDelete(cell.user_group_code)}
                        >
                          ลบ
                        </button>
                      </>
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
