import React, { Component } from "react";
import {
  Col,
  Row,
  Card,
  CardBody,
  CardImg,
  h2,
  Button,
  CardGroup,
  CardHeader,
} from "reactstrap";
import { Link } from "react-router-dom";
import {
  ImUserPlus,
  ImEyePlus,
  ImUserTie,
  ImUsers,
  ImUserCheck,
} from "react-icons/im";
class User extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount = () => {};

  render() {
    return (
      <div>
        <Card>
          <CardHeader>
            {" "}
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
                <h1>จัดการข้อมูลผู้ใช้</h1>
              </Col>{" "}
              <Col></Col>
            </Row>
          </CardHeader>

          <CardBody style={{ marginBottom: "10vh" }}>
            <Row>
              {this.props.PERMISSION[0].permission_view ? (
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
                    to={`/settinganother/user/user`}
                    style={{
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Row>
                      <Col style={{ height: "128px" }}>
                        <div>
                          {" "}
                          <br /> <br />
                          <ImUserPlus
                            className="fas fa-users icon"
                            style={{ color: "#0052CC" }}
                          />{" "}
                          <br />
                          <br /> <br />
                          <h2>จัดการผู้ใช้</h2>
                        </div>
                      </Col>
                    </Row>
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
                  <Link
                    exact
                    to={`/settinganother/user/premission`}
                    style={{
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Row>
                      <Col>
                        <div>
                          <br /> <br />
                          <ImEyePlus
                            className="fas fa-user-check icon"
                            style={{ color: "#0052CC" }}
                          />
                          <br />
                          <br /> <br />
                          <h2>จัดการสิทธิ์การใช้งาน</h2>
                        </div>
                      </Col>
                    </Row>
                  </Link>
                </Col>
              ) : (
                ""
              )}
              {this.props.PERMISSION[2].permission_view ? (
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
                    to={`/settinganother/user/department`}
                    style={{
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Row>
                      <Col>
                        <div>
                          {" "}
                          <br /> <br />
                          <ImUsers
                            className="fas fa-user-edit icon"
                            style={{ color: "#0052CC" }}
                          />{" "}
                          <br /> <br /> <br />
                          <h2>จัดการแผนก</h2>
                        </div>
                      </Col>
                    </Row>
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
                  <Link
                    exact
                    to={`/settinganother/user/user-type`}
                    style={{
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Row>
                      <Col>
                        <div>
                          {" "}
                          <br /> <br />
                          <ImUserTie
                            className="icon"
                            style={{ color: "#0052CC" }}
                          />{" "}
                          <br /> <br /> <br />
                          <h2>จัดการประเภทผู้ใช้</h2>
                        </div>
                      </Col>
                    </Row>
                  </Link>
                </Col>
              ) : (
                ""
              )}
              {/* <Col
                className="home"
                style={{
                  paddingLeft: "0px",
                  paddingRight: "0px",
                  backgroundColor: "white",
                }}
              >
                <Link
                  exact
                  to={`/settinganother/user/userby-group`}
                  style={{
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Row>
                    <Col>
                      <div>
                        {" "}
                        <br /> <br />
                        <ImUserCheck
                          className="fas fa-user-tag icon"
                          style={{ color: "#0052CC" }}
                        />{" "}
                        <br /> <br /> <br />
                        <h2>จัดการกลุ่มการเข้าถึงสินค้า</h2>
                      </div>
                    </Col>
                  </Row>
                </Link>
              </Col>{" "} */}
            </Row>
            <br></br>
            <Row>
              <Col></Col>
              <Col></Col>
              <Col></Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default User;
