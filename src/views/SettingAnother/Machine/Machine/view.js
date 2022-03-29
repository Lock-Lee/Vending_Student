import React, { Component } from "react";
import { Col, Row, Card, CardBody, CardHeader, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { Loading, Table } from "../../../../component/revel-strap";
import Swal from "sweetalert2";
import GLOBAL from "../../../../GLOBAL";
import MachineModel from "../../../../models/MachineModel";

const machine_model = new MachineModel();
class View extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      machine: [],
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
        const machine = await machine_model.getMachineBy({ params });
        console.log(machine);
        this.setState({
          loading: false,
          machine: machine,
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
            machine_model
              .deleteMachineByCode({ machine_code: code })
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
                <h1> จัดการเครื่องจักร </h1>
              </Col>

              <Col>
                {" "}
                <Link to={`/settinganother/machine/machine/insert`}>
                  <Button
                    type="button"
                    className="btn btn-success float-right"
                    style={{ height: "80px", width: "140px" }}
                  >
                    <i className="fa fa-plus" aria-hidden="true"></i>{" "}
                    เครื่องจักร
                  </Button>
                </Link>
              </Col>
            </Row>
          </CardHeader>
          <CardBody style={{ height: "70vh" }}>
            <Table
              onChange={(e) => this._fetchData(e)}
              showRowNo={true}
              dataSource={this.state.machine.data}
              dataTotal={this.state.machine.total}
              rowKey="machine_code"
              columns={[
                {
                  title: "รหัสเครื่องจักร",
                  dataIndex: "machine_code",
                  filterAble: true,
                  ellipsis: true,
                  width: 150,
                },
                {
                  title: "ชื่อเครื่องจักร",
                  dataIndex: "machine_name",
                  filterAble: true,
                  ellipsis: true,
                  width: 100,
                },

                // {
                //   title: "รูป",
                //   dataIndex: "machine_image",
                //   width: 100,
                //   render: (cell) => {
                //     return (
                //       <img
                //         className="image-list"
                //         src={GLOBAL.BASE_SERVER.URL_IMG + cell}
                //         style={{ width: "80px" }}
                //         alt="machine_image"
                //       />
                //     );
                //   },
                // },

                {
                  title: "",
                  dataIndex: "",

                  render: (cell) => {
                    const row_accessible = [];

                    row_accessible.push(
                      <Link
                        key="update"
                        to={`/settinganother/machine/machine/update/${cell.machine_code}`}
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
                        onClick={() => this._onDelete(cell.machine_code)}
                      >
                        ลบ
                      </button>
                    );

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
