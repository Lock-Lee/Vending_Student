import React, { Component } from "react";
import {
  Col,
  Row,
  Card,
  CardBody,
  Button,
  CardImg,
  CardHeader,
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
            <Row>
              <Col>
                {" "}
                <Link to="/settinganother">
                  <Button
                    type="button"
                    style={{ height: "80px", width: "120px" }}
                  >
                    {" "}
                    <i className="fas fa-arrow-left "></i>
                  </Button>
                </Link>
              </Col>
              <Col style={{ textAlign: "center" }}>
                <h1>จัดการข้อมูลสินค้า</h1>
              </Col>
              <Col></Col>
            </Row>
          </CardHeader>
          <CardBody style={{ marginBottom: "10vh" }}>
            <>
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
                    to={`/settinganother/product/product`}
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
                            className="fas fa-tools icon"
                            style={{ color: "#0052CC" }}
                          ></i>
                          <br />
                          <br />
                          <br /> <h2>จัดการสินค้า</h2>
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
                    to={`/settinganother/product/product-type`}
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
                            className="fas fa-tasks icon"
                            style={{ color: "#0052CC" }}
                          ></i>
                          <br />
                          <br />
                          <br /> <h2>จัดการประเภทสินค้า</h2>
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
                    to={`/settinganother/product/product-group`}
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
                            className="fa fa-cubes icon"
                            style={{ color: "#0052CC" }}
                          ></i>
                          <br />
                          <br />
                          <br /> <h2>จัดการกลุ่มสินค้า</h2>
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
                    to={`/settinganother/product/product-brand`}
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
                          <h2>จัดการแบนด์สินค้า</h2>
                        </div>
                      </Col>
                    </Row>
                  </Link>
                </Col>
              </Row>
            </>{" "}
          </CardBody>
        </Card>
      </>
    );
  }
}

export default View;
