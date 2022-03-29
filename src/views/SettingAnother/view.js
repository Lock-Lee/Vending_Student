import React, { Component } from "react";
import { FaSitemap, FaRegCalendarAlt } from "react-icons/fa";

import {
  Col,
  Button,
  Row,
  Card,
  CardBody,
  CardImg,
  CardHeader,
} from "reactstrap";
import { Link } from "react-router-dom";

class SettingAnother extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount = () => {
    console.log(this.props);
  };

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
              <Col style={{ textAlign: "center" }}>
                {" "}
                <h1>ตั้งค่าขั้นสูง</h1>
              </Col>
              <Col style={{ textAlign: "center" }}> </Col>
            </Row>
          </CardHeader>
          <CardBody style={{ marginBottom: "10vh" }}>
            {" "}
            <>
              <Row>
                {this.props.PERMISSION[4].permission_view ? (
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
                      to={`/settinganother/user`}
                      style={{
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <Row>
                        <Col>
                          <div>
                            {" "}
                            <br />
                            <br />
                            <i
                              className="fas fa-id-card icon"
                              style={{ color: "#0052CC" }}
                            ></i>{" "}
                            <br />
                            <br /> <br />
                            <h2>จัดการข้อมูลผู้ใช้</h2>
                          </div>
                        </Col>
                      </Row>
                    </Link>
                  </Col>
                ) : (
                  ""
                )}

                {this.props.PERMISSION[5].permission_view ? (
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
                      to={`/settinganother/stock`}
                      style={{
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      {" "}
                      <Row>
                        <Col>
                          <div>
                            {" "}
                            <br /> <br />
                            <i
                              className="fas fa-warehouse icon"
                              style={{ color: "#0052CC" }}
                            ></i>{" "}
                            <br />
                            <br /> <br />
                            <h2>จัดการข้อมูลตู้</h2>
                          </div>
                        </Col>
                      </Row>{" "}
                    </Link>
                  </Col>
                ) : (
                  ""
                )}
                {this.props.PERMISSION[1].permission_view ? (
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
                      to={`/settinganother/job`}
                      style={{
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      {" "}
                      <Row>
                        <Col>
                          <div>
                            {" "}
                            <br /> <br />
                            <FaSitemap
                              className="icon"
                              style={{ color: "#0052CC" }}
                            />
                            <br />
                            <br /> <br />
                            <h2>จัดการข้อมูลงาน</h2>
                          </div>
                        </Col>
                      </Row>{" "}
                    </Link>
                  </Col>
                ) : (
                  ""
                )}
                {this.props.PERMISSION[3].permission_view ? (
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
                      to={`/settinganother/machine`}
                      style={{
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      {" "}
                      <Row>
                        <Col>
                          <div>
                            {" "}
                            <br /> <br />
                            <i
                              className="fa fa-cogs icon"
                              style={{ color: "#0052CC" }}
                            ></i>{" "}
                            <br /> <br />
                            <br />
                            <h2>จัดการข้อมูลเครื่องจักร</h2>
                          </div>
                        </Col>
                      </Row>{" "}
                    </Link>
                  </Col>
                ) : (
                  ""
                )}

                {this.props.PERMISSION[7].permission_view ? (
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
                      to={`/settinganother/product`}
                      style={{
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      {" "}
                      <Row>
                        <Col>
                          <div>
                            {" "}
                            <br />
                            <br />
                            <i
                              className="fas fa-toolbox icon"
                              style={{ color: "#0052CC" }}
                            ></i>{" "}
                            <br />
                            <br />
                            <br />
                            <h2>จัดการข้อมูลสินค้า</h2>
                          </div>
                        </Col>
                      </Row>
                    </Link>
                  </Col>
                ) : (
                  ""
                )}
              </Row>
              <Row>
                {this.props.PERMISSION[2].permission_view ? (
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
                      to={`/settinganother/production`}
                      style={{
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      {" "}
                      <Row>
                        <Col>
                          <div>
                            {" "}
                            <br /> <br />
                            <FaRegCalendarAlt
                              className="icon"
                              style={{ color: "#0052CC" }}
                            />
                            <br />
                            <br /> <br />
                            <h2>จัดการแผนการผลิต</h2>
                          </div>
                        </Col>
                      </Row>{" "}
                    </Link>
                  </Col>
                ) : (
                  ""
                )}
                {this.props.PERMISSION[0].permission_view ? (
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
                      to={`/settinganother/supplier`}
                      style={{
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      {" "}
                      <Row>
                        <Col>
                          <div>
                            {" "}
                            <br /> <br />
                            <i
                              className="fas fa-truck icon"
                              style={{ color: "#0052CC" }}
                            ></i>
                            <br />
                            <br /> <br />
                            <h2>จัดการผู้ผลิต</h2>
                          </div>
                        </Col>
                      </Row>{" "}
                    </Link>
                  </Col>
                ) : (
                  ""
                )}
                {this.props.PERMISSION[6].permission_view ? (
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
                      to={`/settinganother/TRP`}
                      style={{
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      {" "}
                      <Row>
                        <Col>
                          <div>
                            {" "}
                            <br /> <br />
                            <i
                              class="fas fa-tools icon"
                              style={{ color: "#0052CC" }}
                            ></i>
                            <br />
                            <br /> <br />
                            <h2>จัดการการทดสอบเครื่องมือ</h2>
                          </div>
                        </Col>
                      </Row>{" "}
                    </Link>
                  </Col>
                ) : (
                  ""
                )}
                {this.props.PERMISSION[9].permission_view ? (
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
                      to={`/settinganother/abnormal`}
                      style={{
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      {" "}
                      <Row>
                        <Col>
                          <div>
                            {" "}
                            <br /> <br />
                            <i
                              className="fas fa-trash-restore icon"
                              style={{ color: "#0052CC" }}
                            ></i>
                            <br />
                            <br /> <br />
                            <h2>จัดการข้อมูลเครื่องมือที่ชำรุด</h2>
                          </div>
                        </Col>
                      </Row>{" "}
                    </Link>
                  </Col>
                ) : (
                  ""
                )}
                {this.props.PERMISSION[8].permission_view ? (
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
                      to={`/settinganother/ToolslifeReccord`}
                      style={{
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      {" "}
                      <Row>
                        <Col>
                          <div>
                            {" "}
                            <br /> <br />
                            <i
                              class="fas fa-screwdriver icon"
                              style={{ color: "#0052CC" }}
                            ></i>
                            <br />
                            <br /> <br />
                            <h2>จัดการข้อมูลเครื่องมือที่ใช้แล้ว</h2>
                          </div>
                        </Col>
                      </Row>{" "}
                    </Link>
                  </Col>
                ) : (
                  ""
                )}
              </Row>
            </>
          </CardBody>
        </Card>
      </>
    );
  }
}

export default SettingAnother;
