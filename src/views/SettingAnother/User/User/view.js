import React, { Component } from "react";
import { Col, Row, Card, CardBody, CardHeader, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { Loading, Table } from "../../../../component/revel-strap";
import Swal from "sweetalert2";
import UserModel from "../../../../models/UserModel";

const user_model = new UserModel();

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
      const users = await user_model.getUserBy(params);

      this.setState({
        loading: false,
        users: users,
      });
    });

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
          async () => {
            user_model.deleteUserByCode({ user_code: code }).then((res) => {
              if (res.require) {
                Swal.fire("Success Deleted!", "", "success");
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
              <Col style={{ textAlign: "center" }}>
                {" "}
                <h1>จัดการผู้ใช้</h1>
              </Col>{" "}
              <Col>
                {" "}
                <Link to={`/settinganother/user/user/insert`}>
                  <Button
                    type="button"
                    className="btn btn-success float-right"
                    style={{ height: "80px", width: "140px" }}
                  >
                    <i className="fa fa-plus" aria-hidden="true"></i>{" "}
                    เพิ่มพนักงาน
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
              rowKey="user_code"
              columns={[
                {
                  title: "รหัสพนักงาน",
                  dataIndex: "user_code",
                  filterAble: true,
                  ellipsis: true,
                  width: 100,
                },
                {
                  title: "ชื่อ",
                  dataIndex: "fullname",
                  filterAble: true,
                  ellipsis: true,
                  width: 100,
                },

                {
                  title: "ประเภทผู้ใช้",
                  dataIndex: "license_name",
                  filterAble: true,
                  ellipsis: true,
                  width: 100,
                },
                {
                  title: "แผนก ",
                  dataIndex: "department_name",
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
                        to={`/settinganother/user/user/update/${cell.user_code}`}
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
                        onClick={() => this._onDelete(cell.user_code)}
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
