import React, { Component } from "react";
import {
  Col,
  Row,
  Card,
  CardBody,
  CardImg,
  CardHeader,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
class View extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount = () => {};

  render() {
    return (
      <>
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
              </Col>{" "}
              <Col style={{ textAlign: "center" }}>
                <h1 className="header">จัดการข้อมูลเครื่องจักร</h1>
              </Col>
              <Col></Col>
            </Row>
          </CardHeader>
          <CardBody style={{ marginBottom: "10vh" }}>
            <>
              {" "}
              <Row>
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
                    to={`/settinganother/machine/machine`}
                    style={{
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Row>
                      <Col>
                        <div>
                          <br />
                          <br />
                          <i
                            className="fab fa-whmcs icon"
                            style={{ color: "#0052CC" }}
                          ></i>
                          <br />
                          <br />
                          <br />
                        </div>
                      </Col>
                    </Row>
                    <h2>จัดการเครื่องจักร</h2>
                  </Link>
                </Col>

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
                    to={`/settinganother/machine/machinetype`}
                    style={{
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Row>
                      <Col>
                        <div>
                          <br />
                          <br />
                          <i
                            className="fas fa-cube icon"
                            style={{ color: "#0052CC" }}
                          ></i>
                          <br />
                          <br />
                          <br />
                        </div>
                      </Col>
                    </Row>
                    <h2>จัดการประเภทเครื่องจักร</h2>
                  </Link>
                </Col>

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
                    to={`/settinganother/machine/machinemodel`}
                    style={{
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Row>
                      <Col>
                        <div>
                          <br />
                          <br />
                          <i
                            className="fab fa-codepen icon"
                            style={{ color: "#0052CC" }}
                          ></i>
                          <br />
                          <br />
                          <br />
                        </div>
                      </Col>
                    </Row>
                    <h2>จัดการโมเดลเครื่องจักร</h2>
                  </Link>
                </Col>

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
                    to={`/settinganother/machine/machinebrand`}
                    style={{
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Row>
                      <Col>
                        <div>
                          <br />
                          <br />
                          <i
                            className="fas fa-dice-d6 icon"
                            style={{ color: "#0052CC" }}
                          ></i>
                          <br />
                          <br />
                          <br />
                        </div>
                      </Col>
                    </Row>
                    <h2>จัดการแบนด์เครื่องจักร</h2>
                  </Link>
                </Col>
              </Row>
            </>
          </CardBody>
        </Card>
      </>
    );
  }
}

export default View;
