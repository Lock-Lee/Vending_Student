import React, { Component } from "react";
import { Col, Row, Card, CardBody, CardHeader, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { Loading, Table } from "../../../component/revel-strap";
import Swal from "sweetalert2";
import IncidentModel from "../../../models/IncidentModel";

const incident_model = new IncidentModel();

class View extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      incident: [],
    };
  }

  componentDidMount = () => {
    this._fetchData();
    console.log(this.props);
  };
  _fetchData = (params = { pagination: { current: 1, pageSize: 10 } }) =>
    this.setState({ loading: true }, async () => {
      const incident = await incident_model.getIncidentBy({ params });
      console.log(incident);
      this.setState({
        loading: false,
        incident: incident,
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
            incident_model
              .deleteIncidentByCode({ incident_code: code })
              .then((res) => {
                if (res.require) {
                  Swal.fire("ลบสำเร็จ!", "", "incident");
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
                <h2> จัดการเครื่องมือที่ชำรุด </h2>
              </Col>{" "}
              <Col>
                {" "}
                <Link to={`/settinganother/abnormal/insert`}>
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
          <CardBody style={{ height: "70vh" }}>
            <Table
              onChange={(e) => this._fetchData(e)}
              showRowNo={true}
              dataSource={this.state.incident.data}
              dataTotal={this.state.incident.total}
              rowKey="incident_code"
              columns={[
                {
                  title: "รหัส",
                  dataIndex: "incident_code",
                  filterAble: true,
                  ellipsis: true,
                  width: 100,
                },
                {
                  title: "ชื่อ",
                  dataIndex: "incident_name",
                  filterAble: true,
                  ellipsis: true,
                  width: 100,
                },

                {
                  title: "incident_date",
                  dataIndex: "incident_date",
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
                        to={`/settinganother/abnormal/update/${cell.incident_code}`}
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
                        onClick={() => this._onDelete(cell.incident_code)}
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
