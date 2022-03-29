import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row, Button } from "reactstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Loading, Table } from "../../../../component/revel-strap";

import MachineTypeModel from "../../../../models/MachineTypeModel";
const machinetype_model = new MachineTypeModel();

class View extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      machinetype: [],
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
        const machinetype = await machinetype_model.getMachineTypeBy(params);

        this.setState({
          loading: false,
          machinetype: machinetype,
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
          () => {
            machinetype_model
              .deleteMachineTypeByCode({ machine_type_code: code })
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
              <Col>
                {" "}
                <Link to="/settinganother/machine">
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
                <h1> จัดการประเภทเครื่องจักร </h1>
              </Col>

              <Col>
                {" "}
                <Link to={`/settinganother/machine/machinetype/insert`}>
                  <Button
                    type="button"
                    className="btn btn-success float-right"
                    style={{ height: "80px", width: "140px" }}
                  >
                    <i className="fa fa-plus" aria-hidden="true"></i>{" "}
                    ประเภทเครื่องจักร
                  </Button>
                </Link>
              </Col>
            </Row>
          </CardHeader>
          <CardBody style={{ height: "70vh" }}>
            <Table
              onChange={(e) => this._fetchData(e)}
              showRowNo={true}
              dataSource={this.state.machinetype.data}
              dataTotal={this.state.machinetype.total}
              rowKey="machine_type_code"
              columns={[
                {
                  title: "รหัสประเภทเครื่องจักร",
                  dataIndex: "machine_type_code",
                  filterAble: true,
                  ellipsis: true,
                  width: 240,
                },

                {
                  title: "ชื่อประเภทเครื่องจักร",
                  dataIndex: "machine_type_name",
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
                        to={`/settinganother/machine/machinetype/update/${cell.machine_type_code}`}
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
                        onClick={() => this._onDelete(cell.machine_type_code)}
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
