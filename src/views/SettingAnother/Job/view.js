import React from "react";
import { Card, CardBody, CardHeader, Col, Button, Row } from "reactstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import { Loading, Table } from "../../../component/revel-strap";

import JobModel from "../../../models/JobModel";

const job_model = new JobModel();

class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      jobs: [],
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
        const jobs = await job_model.getJobBy(params);

        this.setState({
          loading: false,
          jobs: jobs,
        });
      }
    );
  }

  _onDelete(code) {
    const { jobs } = this.state;
    jobs.job_code = code;
    jobs.deleted = 1;
    this.setState({
      jobs: jobs,
    });
    Swal.fire({
      title: "คุณแน่ใจไหม ?",
      text: "ยืนยันการลบรายการนี้",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        this.setState(
          {
            //   loading: true,
          },
          () => {
            job_model.deleteJobByCode({ jobs }).then((res) => {
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
              {" "}
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
                <h1>จัดการข้อมูลงาน</h1>{" "}
              </Col>
              <Col>
                {" "}
                {
                  <Link to="/settinganother/job/insert">
                    <Button
                      type="button"
                      className="btn btn-success float-right"
                      style={{ height: "80px", width: "140px" }}
                    >
                      <i className="fa fa-plus" aria-hidden="true"></i> งาน
                    </Button>
                  </Link>
                }
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Table
              onChange={(e) => this._fetchData(e)}
              showRowNo={true}
              dataSource={this.state.jobs.data}
              dataTotal={this.state.jobs.total}
              rowKey="job_code"
              columns={[
                {
                  title: "รหัสงาน",
                  dataIndex: "job_code",
                  filterAble: true,
                  ellipsis: true,
                  width: 100,
                },
                {
                  title: "ชื่องาน",
                  dataIndex: "job_name",
                  filterAble: true,
                  ellipsis: true,
                  width: 240,
                },

                {
                  title: "",
                  dataIndex: "",
                  render: (cell) => {
                    const row_accessible = [
                      // <Link
                      //   key="detail"
                      //   to={`/settinganother/job/detail/${cell.job_code}`}
                      //   title="รายละเอียด"
                      // >
                      //   <button
                      //     style={{ width: "100.6px" }}
                      //     className="btn btn-secondary"
                      //   >
                      //     รายละเอียด
                      //   </button>
                      // </Link>,
                    ];

                    row_accessible.push(
                      <Link
                        key="update"
                        to={`/settinganother/job/update/${cell.job_code}`}
                        title="แก้ไข"
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
                        key="delete"
                        type="button"
                        onClick={() => this._onDelete(cell.job_code)}
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
