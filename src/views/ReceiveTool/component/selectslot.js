import React, { Component } from "react";

import { Button, Col, ModalBody, Row } from "reactstrap";
export default class Selectslot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      input: false,
      satatus: "",
    };
  }
  componentDidMount() {}

  render() {
    return (
      <>
        <ModalBody>
          <Row>
            <Col>
              <Button
                type="button"
                className="btn  "
                style={{
                  height: "180px",
                  width: "100%",
                  backgroundColor: "#0052CC",
                }}
                onClick={() => {
                  this.props.display("Manually");
                }}
              >
                <h3>เลือกช่องเอง</h3>
              </Button>
            </Col>
            <Col>
              {" "}
              <Button
                type="button"
                className="btn  "
                style={{
                  height: "180px",
                  width: "100%",
                  backgroundColor: "#0052CC",
                }}
                onClick={() => {
                  this.props.display("Auto");
                }}
              >
                <h3>เลือกช่องอัติโนมัติ</h3>
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </>
    );
  }
}
