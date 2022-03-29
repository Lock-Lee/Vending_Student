import React, { Component } from "react";
import { Card, CardBody, CardHeader, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { Loading, Table } from "../../../../component/revel-strap";
import Swal from "sweetalert2";
import DepartmentModel from "../../../../models/DepartmentModel";

const depament_model = new DepartmentModel();

class View extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      department: [],
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
        const department = await depament_model.getDepartmentBy(params);

        this.setState({
          loading: false,
          department: department,
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
            depament_model
              .deleteDepartmentByCode({ department_code: code })
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
    const { permission_add, permission_edit, permission_delete } = this.props;
    return (
      <div>
        <Loading show={this.state.loading} />
        <Card>
          <CardHeader>
            <Row>
              <Col md={3}>
                {" "}
                <Link to={`/settinganother/user`}>
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
                <h1>จัดการแผนก </h1>
              </Col>{" "}
              <Col>
                {" "}
                {permission_add ? (
                  <Link to={`/settinganother/user/department/insert`}>
                    <Button
                      type="button"
                      className="btn btn-success float-right"
                      style={{ height: "80px", width: "140px" }}
                    >
                      <i className="fa fa-plus" aria-hidden="true"></i> แผนก
                    </Button>
                  </Link>
                ) : (
                  ""
                )}
              </Col>
            </Row>
          </CardHeader>
          <CardBody style={{ height: "70vh" }}>
            <Table
              onChange={(e) => this._fetchData(e)}
              showRowNo={true}
              dataSource={this.state.department.data}
              dataTotal={this.state.department.total}
              rowKey="department_code"
              columns={[
                {
                  title: "รหัสแผนก",
                  dataIndex: "department_code",
                  filterAble: true,
                  ellipsis: true,
                  width: 240,
                },
                {
                  title: "ชื่อแผนก",
                  dataIndex: "department_name",
                  filterAble: true,
                  ellipsis: true,
                  width: 120,
                },

                {
                  title: "",
                  dataIndex: "",
                  render: (cell) => {
                    const row_accessible = [];

                    row_accessible.push(
                      permission_edit ? (
                        <Link
                          key="update"
                          to={`/settinganother/user/department/update/${cell.department_code}`}
                          title="แก้ไขรายการ"
                        >
                          <button
                            style={{ width: "58.6px" }}
                            className="btn btn-info"
                          >
                            แก้ไข
                          </button>
                        </Link>
                      ) : (
                        ""
                      )
                    );

                    row_accessible.push(
                      permission_delete ? (
                        <button
                          style={{ width: "58.6px" }}
                          className="btn btn-danger"
                          onClick={() => this._onDelete(cell.department_code)}
                        >
                          ลบ
                        </button>
                      ) : (
                        ""
                      )
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
