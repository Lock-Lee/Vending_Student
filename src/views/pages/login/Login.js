import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import logo from "../../../assets/img/logo.jpeg";
import { AuthConsumer } from "../../../role-accress/authContext";
import Modalkeyboard from "../../../../src/component/modals/ModalKeyboard";

const Loginrfid = React.lazy(() => import("../../pages/loginrfid/Loginrfid"));
const Login = () => {
  const [user, setUser] = React.useState({
    user_username: "",
    user_password: "",
    show_modal: false,
    title_modal: "",
  });
  const [modal, setModal] = React.useState(false);

  const _onSetValue = (value) => {
    if (user.title_modal === "Username") {
      setUser({ ...user, show_modal: false, user_username: value });
    } else if (user.title_modal === "Password") {
      setUser({ ...user, show_modal: false, user_password: value });
    }
  };

  return (
    <AuthConsumer>
      {({ _handleLogin }) => {
        return (
          <div className="c-app c-default-layout flex-row align-items-center">
            <Container>
              <Row className="justify-content-center">
                <Col md={6}>
                  <CardGroup>
                    <Card className="p-4">
                      <CardBody>
                        <Form
                          onSubmit={(e) => {
                            e.preventDefault();
                            _handleLogin(user);
                          }}
                        >
                          <Row>
                            <Col xs={12} style={{ textAlign: "center" }}>
                              <img src={`${logo}`} height={128} alt="" />
                            </Col>
                          </Row>
                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="fa fa-user" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              type="text"
                              placeholder="Username"
                              value={user.user_username}
                              autoComplete="username"
                              required
                              onChange={(e) =>
                                setUser({
                                  ...user,
                                  user_username: e.target.value,
                                })
                              }
                            />
                            {/* <div className="input-group-append">
                              <button
                                className="btn btn-secondary"
                                type="button"
                                onClick={() =>
                                  setUser({
                                    ...user,
                                    show_modal: true,
                                    title_modal: "Username",
                                  })
                                }
                              >
                                <i className="fas fa-keyboard"></i>
                              </button>
                            </div> */}
                          </InputGroup>
                          <InputGroup className="mb-4">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="fa fa-lock" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              type="password"
                              placeholder="Password"
                              value={user.user_password}
                              onChange={(e) =>
                                setUser({
                                  ...user,
                                  user_password: e.target.value,
                                })
                              }
                              autoComplete="current-password"
                              required
                            />
                            {/* <div className="input-group-append">
                              <button
                                className="btn btn-secondary"
                                type="button"
                                onClick={() =>
                                  setUser({
                                    ...user,
                                    show_modal: true,
                                    title_modal: "Password",
                                  })
                                }
                              >
                                <i className="fas fa-keyboard"></i>
                              </button>
                            </div> */}
                          </InputGroup>
                          <Row>
                            <Col
                              xs="12"
                              style={{
                                flexDirection: "row",
                                justifyContent: "flex-end",
                                textAlign: "right",
                              }}
                            >
                              {" "}
                              <Button
                                color="secondary"
                                onClick={() => {
                                  setModal(true);
                                }}
                              >
                                RFID Login
                              </Button>
                              <Button
                                type={"reset"}
                                color="danger"
                                className="px-4"
                                onClick={() => window.location.reload()}
                              >
                                Reset
                              </Button>
                              <Button color="primary" className="px-4">
                                Login
                              </Button>
                            </Col>
                          </Row>
                        </Form>
                      </CardBody>
                    </Card>
                  </CardGroup>
                </Col>
              </Row>
            </Container>
            {/* <Modalkeyboard
              show={user.show_modal}
              data_modal={
                user.title_modal === "Username"
                  ? user.user_username
                  : user.user_password
              }
              title_modal={user.title_modal}
              onSave={_onSetValue}
              onClose={() => setUser({ ...user, show_modal: false })}
            /> */}
            <Modal
              isOpen={modal}
              style={{
                width: "80vw",
                maxWidth: "100%",
              }}
            >
              <ModalHeader>RFID</ModalHeader>
              <ModalBody>
                <Loginrfid />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="secondary"
                  onClick={() => {
                    setModal(false);
                  }}
                >
                  ยกเลิก
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        );
      }}
    </AuthConsumer>
  );
};

export default Login;
