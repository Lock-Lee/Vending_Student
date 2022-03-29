import React from "react";

import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Row,
} from "reactstrap";
import { Loading, Table } from "../../../component/revel-strap";

import Production from "../../../models/Production";

const production_model = new Production();

class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      production: [],
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
        const production = await production_model.getProductionBy(params);

        this.setState({
          loading: false,
          production: production,
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
            production_model
              .deleteProductionByCode({ production_code: code })
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
                <Link to={`/settinganother`}>
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
                <h2>จัดการแผนการผลิต</h2>
              </Col>{" "}
              <Col>
                {" "}
                <Link to={`/settinganother/production/insert`}>
                  <Button
                    type="button"
                    className="btn btn-success float-right"
                    style={{ height: "80px", width: "140px" }}
                  >
                    <i className="fa fa-plus" aria-hidden="true"></i>{" "}
                    เพิ่มแผนผลิต
                  </Button>
                </Link>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Table
              onChange={(e) => this._fetchData(e)}
              showRowNo={true}
              dataSource={this.state.production.data}
              dataTotal={this.state.production.total}
              rowKey="production_code"
              columns={[
                {
                  title: "ชื่องาน",
                  dataIndex: "job_code",
                  filterAble: true,
                  ellipsis: true,
                  width: 240,
                },
                {
                  title: "วันที่ผลิต",
                  dataIndex: "production_date",
                  filterAble: true,
                  ellipsis: true,
                  width: 240,
                },
                {
                  title: "จำนวนที่ตั้งเป้าหมายไว้",
                  dataIndex: "production_qty",
                  filterAble: true,
                  ellipsis: true,
                  width: 240,
                },
                {
                  title: "จำนวนที่ผลิตได้จริง",
                  dataIndex: "production_really",
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
                        to={`/settinganother/production/update/${cell.production_code}`}
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
                        key="delete"
                        style={{ width: "58.6px" }}
                        className="btn btn-danger"
                        onClick={() => this._onDelete(cell.production_code)}
                      >
                        ลบ
                      </button>
                    );

                    return row_accessible;
                  },
                  width: 240,
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
