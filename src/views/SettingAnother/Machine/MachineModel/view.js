import React, { Component } from "react";
import { Card, CardBody, CardHeader, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Loading, Table } from "../../../../component/revel-strap";
import MachineModelModel from "../../../../models/MachineModelModel";
const machinemodel_model = new MachineModelModel();

class View extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      machinemodel: [],
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
        const machinemodel = await machinemodel_model.getMachineModelBy(params);

        this.setState({
          loading: false,
          machinemodel: machinemodel,
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
            machinemodel_model
              .deleteMachineModelByCode({ machine_model_code: code })
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
                <h1> จัดการโมเดลเครื่องจักร </h1>
              </Col>
              <Col>
                {" "}
                <Link to={`/settinganother/machine/machinemodel/insert`}>
                  <Button
                    type="button"
                    className="btn btn-success float-right"
                    style={{ height: "80px", width: "140px" }}
                  >
                    <i className="fa fa-plus" aria-hidden="true"></i>{" "}
                    โมเดลเครื่องจักร
                  </Button>
                </Link>
              </Col>
            </Row>
          </CardHeader>
          <CardBody style={{ height: "70vh" }}>
            <Table
              onChange={(e) => this._fetchData(e)}
              showRowNo={true}
              dataSource={this.state.machinemodel.data}
              dataTotal={this.state.machinemodel.total}
              rowKey="machine_model_code"
              columns={[
                {
                  title: "รหัสโมเดลเครื่องจักร",
                  dataIndex: "machine_model_code",
                  filterAble: true,
                  ellipsis: true,
                  width: 240,
                },

                {
                  title: "ชื่อโมเดลเครื่องจักร",
                  dataIndex: "machine_model_name",
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
                        to={`/settinganother/machine/machinemodel/update/${cell.machine_model_code}`}
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
                        onClick={() => this._onDelete(cell.machine_model_code)}
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
