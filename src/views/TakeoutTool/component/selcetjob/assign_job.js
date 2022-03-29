import React, { Component } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  Col,
  Row,
} from "reactstrap";

export class Assign_job extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  componentDidMount() { }

  render() {
    return (
      <div>
        <CardHeader style={{ backgroundColor: "#0052cc" }}>
          <Row>
            <Col md={1}></Col>
            <Col md={9}>
              <h1
                style={{
                  textAlign: "center",
                  marginTop: "1.5%",
                  marginLeft: "5%",
                  color: "white",
                }}
              >
                เบิกแบบระบุงาน - เลือกงาน
              </h1>
            </Col>
          </Row>
        </CardHeader>

        <CardBody style={{ backgroundColor: "white", height: "50vh" }}>
          <Row>
            {this.props.jobs.map((item, idx) => (
              <Row key={"jobs_" + idx}>
                <Col md={1}>
                  <Card
                    color="info"
                    className="btn"
                    key={idx}
                    style={{ width: "11rem", margin: "2.5vw" }}
                    onClick={() =>
                      this.props._onSelectJob(item.job_code, item.job_name)
                    }
                  >
                    <Row>
                      <Col style={{ height: "96px" }}>
                        <div>
                          <i
                            className="fas  fa-file-signature"
                            style={{
                              fontSize: 96,
                              marginLeft: -72,
                              color: "white",
                            }}
                          ></i>
                        </div>
                      </Col>
                    </Row>

                    <CardBody>
                      <p style={{ height: "50px", color: "white" }}>
                        <CardTitle>
                          <b>{item.job_code}</b>
                        </CardTitle>
                        <CardTitle>
                          <b>{item.job_name}</b>
                        </CardTitle>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            ))}
          </Row>
        </CardBody>

        <CardFooter style={{ backgroundColor: "white", height: "20vh" }}>
          <Row>
            <Col md={10}></Col>{" "}
            <Button
              style={{
                width: "180px",
                height: "80px",
                marginLeft: "50px",
                backgroundColor: "#808088",
                fontSize: "18px",
                borderRadius: "12px",
                color: "white",
                boxShadow: "0 4px 8px 0 rgb(0 0 0 / 34%)",
              }}
              onClick={() =>
                this.props._displayback({
                  current_display: "",
                  title: "Select_Job",
                })
              }
            >
              <i className="fas fa-undo"></i>
              {"\u00A0"} ย้อนกลับ
            </Button>
          </Row>
        </CardFooter>
      </div>
    );
  }
}
export default Assign_job;
