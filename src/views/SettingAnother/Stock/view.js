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

  componentDidMount = () => { };

  render() {
    return (
      <>
        <Card>
          <CardHeader>
            <Row>
              <Col>
                {" "}
                <Link
                  to="/settinganother"
                  style={{
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
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
                <h1>จัดการตู้</h1>
              </Col>{" "}
              <Col style={{ textAlign: "center" }}></Col>
            </Row>
          </CardHeader>
          <CardBody style={{ marginBottom: "10vh" }}>
            <>
              <Row>
                <Col></Col>
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
                    to={`/settinganother/stock/stock`}
                    style={{
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Row>
                      <Col style={{ height: "128px" }}>
                        <div>
                          <br />
                          <br />
                          <i
                            className="fas fa-boxes"
                            style={{ fontSize: 96, color: "#0052CC" }}
                          ></i>
                          <br />
                          <br />
                          <br />
                          <h2>จัดการตู้</h2>
                        </div>
                      </Col>
                    </Row>
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
                    to={`/settinganother/stock/stock-layout`}
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
                            className="fas fa-layer-group"
                            style={{ fontSize: 96, color: "#0052CC" }}
                          ></i>
                          <br />
                          <br />
                          <br />
                          <h2>จัดการช่อง</h2>
                        </div>
                      </Col>
                    </Row>
                  </Link>
                </Col>
                <Col></Col>
              </Row>
            </>{" "}
          </CardBody>
        </Card>
      </>
    );
  }
}

export default View;
