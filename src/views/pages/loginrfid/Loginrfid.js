import { Card, CardBody, CardGroup, Col, Container, Row } from "reactstrap";
import { AuthConsumer } from "../../../role-accress/authContext";
import React, { useState, useEffect, useRef } from "react";
import useScanDetection from "use-scan-detection";
import logo from "../../../assets/img/logo.jpeg";
const Loginrfid = () => {
  let form = useRef(null);
  const [user, setUser] = useState({
    user_RFID: "",
  });
  useEffect(() => {
    if (user.user_RFID !== "" && user.user_RFID) {
      form.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
      );
    }
  }, [user]);
  useScanDetection({
    onComplete: (e) => {
      _checkLogin(e);
    },
    onError: (e) => {},
  });

  const _checkLogin = (d) => {
    setUser({ user_RFID: d });
  };

  return (
    <AuthConsumer>
      {({ _handleLoginRFID }) => {
        return (
          <div className="c-app c-default-layout flex-row align-items-center">
            <Container>
              <Row className="justify-content-center">
                <Col md={6}>
                  <CardGroup>
                    <Card className="p-4">
                      <CardBody>
                        <form
                          ref={(ref) => (form = ref)}
                          onChange={(e) => {}}
                          onSubmit={(e) => {
                            _handleLoginRFID(user);
                          }}
                        >
                          <Row>
                            <Col xs={12} style={{ textAlign: "center" }}>
                              <img src={`${logo}`} height={128} alt="" />
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={12} style={{ textAlign: "center" }}>
                              <h1>กรุณาแสกน RFID เพื่อเข้าสู่ระบบ</h1>
                            </Col>
                          </Row>
                        </form>
                      </CardBody>
                    </Card>
                  </CardGroup>
                </Col>
              </Row>
            </Container>
          </div>
        );
      }}
    </AuthConsumer>
  );
};

export default Loginrfid;
