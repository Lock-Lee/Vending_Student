import React, { Component } from "react";
import { Col, Button, Row, Card, CardBody, CardHeader } from "reactstrap";
import { Link } from "react-router-dom";

export class View extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {}

  render() {
    return (
      <>
        <Card>
          <CardHeader>
            {" "}
            <Row>
              <Col>
                {" "}
                <Link to="/">
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
                <h1>รายงาน</h1>
              </Col>
              <Col></Col>
            </Row>
          </CardHeader>
          <CardBody style={{ marginBottom: "10vh" }}>
            <>
              <Row>
                {
                  <Col
                    className="home"
                    style={{
                      paddingLeft: "0px",
                      paddingRight: "0px",
                      backgroundColor: "white",
                    }}
                  >
                    <Link
                      exact
                      to={`/report/receive`}
                      style={{
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <div>
                        {" "}
                        <br />
                        <br />
                        <i
                          className="fas fa-area-chart"
                          style={{ fontSize: 96, color: "#0052CC" }}
                        ></i>{" "}
                        <br />
                        <br /> <br />
                        <h2>รายงานการรับสินค้า</h2>
                      </div>
                    </Link>
                  </Col>
                }

                {
                  <Col
                    className="home"
                    style={{
                      paddingLeft: "0px",
                      paddingRight: "0px",
                      backgroundColor: "white",
                    }}
                  >
                    <Link
                      exact
                      to={`/report/issue`}
                      style={{
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <div>
                        {" "}
                        <br />
                        <br />
                        <i
                          className="fas fa-pie-chart"
                          style={{ fontSize: 96, color: "#0052CC" }}
                        ></i>{" "}
                        <br />
                        <br /> <br />
                        <h2>รายงานการเบิกสินค้า</h2>
                      </div>
                    </Link>
                  </Col>
                }

                {
                  <Col
                    className="home"
                    style={{
                      paddingLeft: "0px",
                      paddingRight: "0px",
                      backgroundColor: "white",
                    }}
                  >
                    {" "}
                    <Link
                      exact
                      to={`/report/balance`}
                      style={{
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <div>
                        {" "}
                        <br />
                        <br />
                        <i
                          className="fas fa-bar-chart"
                          style={{ fontSize: 96, color: "#0052CC" }}
                        ></i>{" "}
                        <br />
                        <br /> <br />
                        <h2>รายงานสินค้าคงเหลือ</h2>
                      </div>
                    </Link>
                  </Col>
                }

                {
                  <Col
                    className="home"
                    style={{
                      paddingLeft: "0px",
                      paddingRight: "0px",
                      backgroundColor: "white",
                    }}
                  >
                    {" "}
                    <Link
                      exact
                      to={`/report/incident`}
                      style={{
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <div>
                        {" "}
                        <br />
                        <br />
                        <i
                          className="fas fa-exclamation-triangle"
                          style={{ fontSize: 96, color: "#0052CC" }}
                        ></i>{" "}
                        <br />
                        <br /> <br />
                        <h2>รายงานสินค้าที่มีปัญหา</h2>
                      </div>
                    </Link>
                  </Col>
                }
              </Row>{" "}
              <br />
              <Row>
                {
                  <Col
                    className="home"
                    style={{
                      paddingLeft: "0px",
                      paddingRight: "0px",
                      backgroundColor: "white",
                    }}
                  >
                    {" "}
                    <Link
                      exact
                      to={`/report/transaction`}
                      style={{
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <div>
                        {" "}
                        <br />
                        <br />
                        <i
                          className="fas fa-tasks"
                          style={{ fontSize: 96, color: "#0052CC" }}
                        ></i>{" "}
                        <br />
                        <br /> <br />
                        <h2>รายงานสินค้าเคลื่อนไหว</h2>
                      </div>
                    </Link>
                  </Col>
                }

                {
                  <Col
                    className="home"
                    style={{
                      paddingLeft: "0px",
                      paddingRight: "0px",
                      backgroundColor: "white",
                    }}
                  >
                    {" "}
                    <Link
                      exact
                      to={`/report/lowstock`}
                      style={{
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <div>
                        {" "}
                        <br />
                        <br />
                        <i
                          className="fas fa-hard-hat"
                          style={{ fontSize: 96, color: "#0052CC" }}
                        ></i>{" "}
                        <br />
                        <br /> <br />
                        <h2>รายงานสินค้าต่ำกว่าเกณฑ์</h2>
                      </div>
                    </Link>
                  </Col>
                }

                {
                  <Col
                    className="home"
                    style={{
                      paddingLeft: "0px",
                      paddingRight: "0px",
                      backgroundColor: "white",
                    }}
                  >
                    {" "}
                    <Link
                      exact
                      to={`/report/send-setting`}
                      style={{
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <div>
                        {" "}
                        <br />
                        <br />
                        <i
                          className="fas fa-paper-plane"
                          style={{ fontSize: 96, color: "#0052CC" }}
                        ></i>{" "}
                        <br />
                        <br /> <br />
                        <h2>ตั้งค่าการส่งอีเมลอัตโนมัติ</h2>
                      </div>
                    </Link>
                  </Col>
                }

                {
                  <Col
                    className="home"
                    style={{
                      paddingLeft: "0px",
                      paddingRight: "0px",
                      backgroundColor: "white",
                    }}
                  >
                    {" "}
                    <Link
                      exact
                      to={`/report/setting`}
                      style={{
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <div>
                        {" "}
                        <br />
                        <br />
                        <i
                          className="fas fa-cog"
                          style={{ fontSize: 96, color: "#0052CC" }}
                        ></i>{" "}
                        <br />
                        <br /> <br />
                        <h2>ตั้งค่าอีเมล์</h2>
                      </div>
                    </Link>
                  </Col>
                }
              </Row>
            </>
          </CardBody>
        </Card>
      </>
    );
  }
}

export default View;
